import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ModificationsService } from './modifications.service';
import { StackBlitzService } from './stack-blitz.service';
import { ChatService } from './chat.service';

import { Workspace, defaultFiles, defaultWriterRequest } from '../../assets/model/workspace';
import { FirebaseUser } from '../../assets/model/user';
import { httpOptions, httpWorkspaceOptions } from '../../assets/model/httpOptions'
import { User } from '../../assets/model/user';
import { File } from '../../assets/model/file';
// import { backendURL } from '../../assets/configs/backendConfig';

var backendURL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  localWorkspaces: BehaviorSubject<Array<Workspace>> = new BehaviorSubject(null);
  localWorkspace: BehaviorSubject<Workspace> = new BehaviorSubject(null);
  localCollaborators: Subject<Array<string>> = new Subject();
  localWriteRequests: Subject<Map<string, Number>> = new Subject();
  localIsWriter: BehaviorSubject<boolean> = new BehaviorSubject(false);
  workingFile: BehaviorSubject<File> = new BehaviorSubject(null);
  workingFileContent: BehaviorSubject<Map<string, string>> = new BehaviorSubject(null);
  private user: FirebaseUser;

  private localWorkspaceCopy: Workspace;

  constructor(
    private router: Router,
    public http: HttpClient,
    private ideService: StackBlitzService,
    private modificationsService: ModificationsService,
    private chatService: ChatService
  ) {
    this.ideService.localFiles$.subscribe(files => {
      var content: {additions: Array<File>, supresions: Array<File>, contentUpdated: Array<File>};
      
      content = files != null ? this.modificationsService.findModifications(files) : null;
      this.contentModification(content);
    });

    this.chatService.actionEmitter$.subscribe(actionEmit => {
      actionEmit.action == "create" ? this.ideService.createFile(actionEmit.file, actionEmit.content) : 
        actionEmit.action == "delete" && this.ideService.deleteFile(actionEmit.file);
    })
  }

  createWorksapace(name: string, owner: FirebaseUser) {
    if (!owner) { 
      alert('You must be logged to use chatComponent'); 
      return; 
    }
    this.user = owner;
    var ws = new Workspace(name, this.user, this.user.email, [this.user.email], [defaultFiles(new User(this.user.uid,this.user.name))], defaultWriterRequest(this.user.email, 0));
    //console.log('Providing: ', ws);
    this.http.post<Workspace>(backendURL + '/api/workspaces', ws, httpOptions).subscribe(
      data => {
        console.log('Workspace successfully created ', data);
        this.loadWorkspaces(this.user.uid);
      },
      err => {
        console.error('Error while creating the resource ', err);
      }
    );
  }

  loadWorkspaces(owner: string) { // TODO: Add findByOwnerId() on Backend
    if (!owner || owner === null) { 
      alert('You must be logged to use chatComponent'); 
      return; 
    }
    this.http.get(backendURL + '/api/workspaces/', httpWorkspaceOptions)
      .pipe(
        map( (data:any) => {
          return data._embedded.workspaces as Workspace[];
        })
      )
      .subscribe( workspaces => {
        this.localWorkspaces.next(workspaces.filter(workspace => workspace.owner.email == owner));
      });
  }

  loadLocalWorkspace(workspaceID: string) {
    // console.log("Downloading workspace: " + workspaceID);

    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
    .subscribe( workspace => {
      console.log("Loading new Workspace...");
      this.localWorkspaceCopy = workspace;
      this.localWorkspace.next(workspace);
      this.modificationsService.loadWorkspaceFiles(this.localWorkspace.getValue());
      //this.setWorkingFile(workspace.files.filter(file => file.name == "README.md")[0].id);
    });
  }

  setWorkingFile(fileID: string) {
    if (this.localWorkspace.getValue().files.map(file => file.id).includes(fileID)) {
      console.log("New workingFile: \n")
      console.log(this.localWorkspace.getValue().files.find(file => file.id == fileID).name);
      this.workingFile.next(this.localWorkspace.getValue().files.find(file => file.id == fileID));
    }
  }

  loadWorkspace(id: string) {
    this.router.navigate(['chat', id]);
  }

  deleteWorkspace(workspaceId: string) {
    console.log('Deleting workspace: ' + workspaceId);
    var tmpWorkspaces:Array<Workspace> = this.localWorkspaces.getValue().filter(workspace => workspace.id != workspaceId);

    if(tmpWorkspaces.length >= this.localWorkspaces.getValue().length) return;
    this.http.delete<Workspace>(backendURL + '/api/workspaces/' + workspaceId, httpWorkspaceOptions).subscribe( _ => {
      this.localWorkspaces.next(tmpWorkspaces);
    });
  }

  isWriter(userEmail: string, workspaceID: string): BehaviorSubject<boolean> {
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
    .subscribe( workspace => {
      if (workspace.writer == userEmail) {
        this.localIsWriter.next(true);
      } else {
        this.localIsWriter.next(false);
      }
    });
    return this.localIsWriter;
  }

  askForWrite(userID: string, userEmail: string, workspaceID: string) {
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
      .subscribe( workspace => {
        if (workspace.collaborators && !workspace.collaborators.includes(userEmail)) return console.error('Not allowed to write!');
        (workspace.writerRequests[userEmail] == 0 || workspace.writerRequests[userEmail] == null) ? workspace.writerRequests[userEmail] = this.getTime() : null;
        let worspaceData: WorkspaceData = new WorkspaceData(workspace, userEmail);
        this.http.post(backendURL + '/api/workspaceAskToWrite/', worspaceData, httpOptions).subscribe(
          data => {
            console.log('Workspace successfully patched ', data);
          },
          err => {
            console.error('Error while patching the resource ', err);
          }
        );
      });
  }

  private getTime(): Number {
    return new Date().getTime();
  }

  addCollaborator(userID: string, collaboratorEmail: string, workspaceID: string) {
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
      .subscribe( workspace => {
        console.log(userID, workspace.owner.uid);
        if (userID != workspace.owner.uid) return console.error("Operation not allowed. Reason: User not owner.");
        workspace.collaborators.includes(collaboratorEmail) ? null : workspace.collaborators.push(collaboratorEmail);
        this.localCollaborators.next(workspace.collaborators);
        this.http.patch(backendURL + '/api/workspaces/' + workspaceID, workspace, httpOptions).subscribe(
          data => {
            console.log('Collaborator successfully added ', data);
          },
          err => {
            console.error('Error while adding the collaborator ', err);
          }
        );
      });
  }

  getCollaborators(userID: string, workspaceID: string) {
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
      .subscribe( workspace => {
        if (userID !== workspace.owner.uid) return console.error("Operation not allowed. Reason: User not owner.");
        this.localCollaborators.next(workspace.collaborators);
      });
    return this.localCollaborators;
  }

  getWriteRequests(userEmail: string, workspaceID: string) {
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
    .subscribe( workspace => {
      if (userEmail !== workspace.writer) return console.error("Operation not allowed. Reason: User not writer.");
      this.localWriteRequests.next(workspace.writerRequests);
    });
    return this.localWriteRequests;
  }

  private contentModification(content: {additions: Array<File>, supresions: Array<File>, contentUpdated: Array<File>}) {
    if (content == null) return;

    let addition: boolean = false;
    let supresion: boolean = false;

    // Files to create? (additions)
    addition = this.treatAddition(content.additions);

    // Files to delete? (supresions)
    supresion = this.treatSupresion(content.supresions);

    // Files to update? (contentUpdate)
    this.treatContentUpdate(content.contentUpdated)

    // PATCH server version using "localWorkspaceCopy"
    if (addition || supresion) {
      console.log('PATCH to Server version, uploading: ', this.localWorkspaceCopy);
      this.http.patch(backendURL + '/api/workspaces/' + this.localWorkspaceCopy.id, this.localWorkspaceCopy, httpOptions).subscribe(
        data => {
          console.log('Success');
        },
        err => {
          console.error('Error while patching... ', err);
        }
      );
    }
  }

  private treatAddition(additions: Array<File>) {
    if (additions.length >= 1) {
      console.log('Found additions');
      additions.forEach(fileAddition => {
        if (this.getExcludedFiles(fileAddition) >= 1) return;
        this.localWorkspaceCopy.files.push(fileAddition);
        this.chatService.sendMessage(fileAddition.content, fileAddition.name, this.localWorkspaceCopy.writer, "create");
      });
      return true;
    }
    return false;
  }

  private treatSupresion(supresions: Array<File>) {
    if (supresions.length >= 1) {
      console.log('Found supresions');
      supresions.forEach(fileSupresion => {
        if (this.getExcludedFiles(fileSupresion) >= 1) return;
        const index = this.localWorkspaceCopy.files.map(file => file.name).indexOf(fileSupresion.name);
        if (index > -1) {
          this.localWorkspaceCopy.files.splice(index, 1);
        }
        this.chatService.sendMessage('', fileSupresion.name, this.localWorkspaceCopy.writer, "delete");
      });
      return true;
    }
    return false;
  }

  private getExcludedFiles(file: File) {
    return file.name.split("/").filter(file => file.charAt(0) == '.').length;
  }

  private treatContentUpdate(contentUpdated: Array<File>) {
    if (contentUpdated.length >= 1) {
      console.log('Found updates');
      contentUpdated.forEach( file => {
        if (!file.content) {
          this.chatService.sendMessage('\0', file.id, this.localWorkspaceCopy.writer)
        } else {
          this.chatService.sendMessage(file.content, file.name, this.localWorkspaceCopy.writer)
        }
      });
    }
  }
}

// Class to PATCH Workspace userEmail
class WorkspaceData {
  workspace: Workspace;
  userEmail: String;

  constructor(workspace: Workspace, userEmail: String) {
    this.workspace = workspace;
    this.userEmail = userEmail;
  }
}

// Class to PATCH Workspace Files