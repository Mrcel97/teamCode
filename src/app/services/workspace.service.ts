import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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
import { WriteRequestData } from './../../assets/model/writeRequestData';
// import { backendURL } from '../../assets/configs/backendConfig';

var backendURL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  localWorkspaces: BehaviorSubject<Array<Workspace>> = new BehaviorSubject(null);
  localWorkspace: BehaviorSubject<Workspace> = new BehaviorSubject(null);
  localCollaborators: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
  localWriteRequests: BehaviorSubject<Map<string, Number>> = new BehaviorSubject(new Map());
  workingFile: BehaviorSubject<File> = new BehaviorSubject(null);
  workingFileContent: BehaviorSubject<Map<string, string>> = new BehaviorSubject(null);
  localIsWriter: BehaviorSubject<boolean> = new BehaviorSubject(false);
  localIsPrivate: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private user: FirebaseUser;
  private userEmail: string;
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
    });

    this.chatService.requestEmitter$.subscribe(request => this.parseRequest(request));

    this.modificationsService.seconds$.subscribe(seconds => {
      var writeRequests = this.localWriteRequests.getValue();

      if (seconds >= 540 && writeRequests != null && writeRequests.size >= 1) {
        var mapKeys = writeRequests.keys();
        var email = mapKeys.next().value;
        email = (email == this.userEmail && writeRequests.size >=2) ? email = mapKeys.next().value : email;
        email != this.userEmail && this.makeWriter(email);
        this.modificationsService.seconds$.next(0); // Reset timer.
      }
    });
  }

  createWorksapace(name: string, owner: FirebaseUser) {
    if (!owner) { 
      alert('You must be logged to use chatComponent'); 
      return; 
    }
    this.user = owner;
    var ws = new Workspace(name, this.user, this.user.email, [this.user.email], [defaultFiles(new User(this.user.uid,this.user.name))], defaultWriterRequest(this.user.email, 0));
    this.http.post<Workspace>(backendURL + '/api/workspaces', ws, httpOptions).subscribe(
      data => {
        console.log('Workspace successfully created');
        this.loadWorkspaces(this.user.email);
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
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
    .subscribe( workspace => {
      console.log("Loading new Workspace...");
      this.localWorkspaceCopy = workspace;
      this.localWorkspace.next(workspace);
      this.localWriteRequests.next(new Map());
      this.localIsPrivate.next(workspace.privacy);
      this.modificationsService.loadWorkspaceFiles(this.localWorkspace.getValue());
      //this.setWorkingFile(workspace.files.filter(file => file.name == "README.md")[0].id);
    });
  }

  setWorkingFile(fileID: string) {
    if (this.localWorkspace.getValue().files.map(file => file.id).includes(fileID)) {
      this.workingFile.next(this.localWorkspace.getValue().files.find(file => file.id == fileID));
    }
  }

  loadWorkspace(id: string) {
    this.router.navigate(['chat', id]);
  }

  patchWorkspace(workspace: Workspace) {
    if (workspace == null) return;
    this.http.patch<Workspace>(backendURL + '/api/workspaces/' + workspace.id, workspace, httpOptions).subscribe( workspace => {
      this.localCollaborators.next(workspace.collaborators);
    });
  }

  deleteWorkspace(workspaceId: string) {
    var tmpWorkspaces:Array<Workspace> = this.localWorkspaces.getValue().filter(workspace => workspace.id != workspaceId);

    if(tmpWorkspaces.length >= this.localWorkspaces.getValue().length) return;
    this.http.delete<Workspace>(backendURL + '/api/workspaces/' + workspaceId, httpWorkspaceOptions).subscribe( _ => {
      console.log(tmpWorkspaces);
      this.localWorkspaces.next(tmpWorkspaces);
    });
  }

  isWriter(userEmail: string): BehaviorSubject<boolean> {
    this.userEmail = userEmail;

    if (this.localWorkspace.getValue() == null) return;
    var localWorkspace = this.localWorkspace.getValue();
    
    if (localWorkspace.writer == userEmail) {
      this.localIsWriter.next(true);
    } else {
      this.localIsWriter.next(false);
    }
    return this.localIsWriter;
  }

  askForWrite() {
    if (this.userEmail == null || this.localWorkspace.getValue() == null || this.localIsWriter.getValue() == null) return;
    var localWorkspace = this.localWorkspace.getValue();

    this.http.get<Workspace>(backendURL + '/api/workspaces/' + localWorkspace.id, httpWorkspaceOptions)
    .subscribe( workspace => {
      if (workspace.collaborators && !workspace.collaborators.includes(this.userEmail)) return alert('You are not a collaborator'); // Always check if collaborators changed before let ask.

      this.chatService.sendWriteRequest(new WriteRequestData(this.userEmail, this.localIsWriter.getValue()));
    });    
  }

  makeWriter(newWriterEmail: string) {
    if (this.userEmail == null || this.localWorkspace.getValue() == null || newWriterEmail == null 
      || newWriterEmail == '' || this.localIsWriter.getValue() == null) return;
    
    if (this.localIsWriter.getValue()) {
      this.chatService.sendWriteRequest(
        new WriteRequestData(
          this.userEmail, 
          this.localIsWriter.getValue(),
          this.localWriteRequests.getValue(),
          newWriterEmail)
        );
        this.localIsWriter.next(false);
    }
  }

  swapWorkspacePrivacy(workspaceId: string, userId: string) {
    const headers = new HttpHeaders({'userId': userId, 'Content-Type': 'application/json'});
    console.log(headers)

    this.http.patch(backendURL + '/api/workspaceSwapPrivacy?id=' + workspaceId, {}, {headers: headers})
    .subscribe((privacy: boolean) => this.localIsPrivate.next(privacy));
  }

  parseRequest(writeRequestData: WriteRequestData) {
    if (this.userEmail == null || writeRequestData == null || this.localIsWriter.getValue() == null) return;

    if (this.localIsWriter.getValue() && !writeRequestData.writer) {
      this.localWriteRequests.next(this.localWriteRequests.getValue().set(writeRequestData.requesterEmail, this.getTime()));
    } else if (writeRequestData.writer && writeRequestData.newWriterEmail == this.userEmail) {
      this.localIsWriter.next(true);
      this.localWriteRequests.next(writeRequestData.requests);
    }
  }

  private getTime(): Number {
    return new Date().getTime();
  }

  addCollaborators(userID: string, collaboratorsEmail: Array<string>, workspaceID: string) {
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
      .subscribe( workspace => {
        if (workspace.collaborators.length >= 8) return alert("Reached max. amount of collaborators.");
        if (userID != workspace.owner.uid) return console.error("Operation not allowed. Reason: User not owner.");
        collaboratorsEmail.forEach(collaboratorEmail => {
          workspace.collaborators.includes(collaboratorEmail) ? null : workspace.collaborators.push(collaboratorEmail);
        });
        this.localCollaborators.next(workspace.collaborators);
        this.http.patch(backendURL + '/api/workspaceAddCollaborator', workspace, httpOptions).subscribe(
          data => {
          }
        );
      });
  }

  getCollaborators(userID: string, workspaceID: string, collaboratorEmail?: string) {
    if (userID == null || workspaceID == null) return;
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
      .subscribe( workspace => {
        if (userID === workspace.owner.uid || this.isCollaborator(workspace, collaboratorEmail)) {
          this.localCollaborators.next(workspace.collaborators);
        } else {
          return console.error("Operation not allowed. Reason: User not owner. User not collaborator.");
        }
      });
    return this.localCollaborators;
  }

  isCollaborator(workspace: Workspace, collaboratorEmail: string) {
    return workspace.collaborators.includes(collaboratorEmail);
  }

  getWriteRequests(userEmail: string, workspaceID: string) {
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
    .subscribe( workspace => {
      if (userEmail !== workspace.writer) return console.error("Operation not allowed. Reason: User not writer.");
      this.localWriteRequests.next(workspace.writerRequests);
    });
    return this.localWriteRequests;
  }

  getPublicWorkspaces() {
    return this.http.get(backendURL + '/api/workspaceGetPublic', httpOptions);
  }

  private contentModification(content: {additions: Array<File>, supresions: Array<File>, contentUpdated: Array<File>}) {
    if (content == null || !this.localIsWriter.getValue()) return console.info('Not allowed to send Data, you are not the Workspace writer');

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
      this.http.patch(backendURL + '/api/workspaces/' + this.localWorkspaceCopy.id, this.localWorkspaceCopy, httpOptions).subscribe(
        data => { },
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
        this.chatService.sendMessage(fileAddition.content, fileAddition.name, this.localIsWriter.getValue(), "create");
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
        this.chatService.sendMessage('', fileSupresion.name, this.localIsWriter.getValue(), "delete");
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
        if (this.getExcludedFiles(file) >= 1) return;
        if (!file.content) {
          this.chatService.sendMessage('\0', file.id, this.localIsWriter.getValue())
        } else {
          this.chatService.sendMessage(file.content, file.name, this.localIsWriter.getValue())
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