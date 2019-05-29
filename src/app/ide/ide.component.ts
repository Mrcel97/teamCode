
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// Project Imports
import { StackBlitzService } from '../services/stack-blitz.service';
import { WorkspaceService } from './../services/workspace.service';
import { ChatService } from './../services/chat.service';
import { Workspace } from 'src/assets/model/workspace';
import { IProject } from 'src/assets/model/IProject';
import { File } from './../../assets/model/file';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit, OnDestroy {
  workspace: Workspace = null;
  project: IProject = null;
  options: boolean = false;
  userStatus: boolean = false;
  snapshot: BehaviorSubject<any> = new BehaviorSubject(null);
  roomID: string;

  userUID: string = '';
  userEmail: string = '';
  isWriter: boolean = false;

  interval: any = null;
  timer: number = 0;

  constructor(
    public ideService: StackBlitzService,
    public workspaceService: WorkspaceService,
    public router: Router,
    private route: ActivatedRoute,
    public chatService: ChatService
  ) {
    // this.ideService.virtualMachine$.subscribe( vm => {
    //   this.vmListener();
    // });

    this.workspaceService.localIsWriter.subscribe(status => {
      if (status == null) return;
      !status ? this.clearInterval() : this.vmListener();
    });
  }

  ngOnInit() {
    // Create and send project
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe( params => {
      this.loadWorkspace(params.get("workspace_id"));
    });

    this.chatService.initializeWebSocketConnection();
  }

  ngOnDestroy() {
    console.log("Shutdown timer!")
    clearInterval(this.interval);
  }

  loadWorkspace(workspaceId: string) {
    // Inform about the workspace is going to try to load
    // console.log("Trying to load workspace: " + workspaceId);

    // Load workspace using workspaceService and catch the result of the call.
    console.log("Workspace opened!");
    this.chatService.setRoomID(workspaceId);
    this.workspaceService.loadLocalWorkspace(workspaceId);
    this.workspaceService.localWorkspace.subscribe( workspace => {
      if (workspace != null) {
        var project = this.buildProject(workspace);
        this.ideService.createWorkspace(project);
      }
    })

    // Once we have the result of the call (Workspace), build the project object.

    // Call stackBlitzService with project object as a parameter
  }

  createFile() {
    // console.log('Creating File');
    var name = 'sampleFile' // TODO
    var language = 'ts' // TODO

    this.ideService.createFile(name, language);
  }

  getSnapshot() {
    this.ideService.getSnapshot();
  }

  receiveUpdates() {
    this.ideService.receiveUpdates();
  }

  refresh(project) {
    this.ideService.refresh(project);
  }

  showOptions(status: boolean) {
    this.options = status;
  }

  updateUserStatus(status: boolean) {
    this.userStatus = status;
  }

  private buildProject(workspace: Workspace) {
    // "\nStarting to build Workspace object...");
    // console.log(workspace.owner);
    var fileStack: { [path: string]: string } = {};
    
    this.appendFilesToFilestack(workspace.files, fileStack)

    workspace.files.forEach( file => {
      fileStack[file.name] = file.content;
    });
    
    //Templates: "typescript","create-react-app","angular-cli","javascript","polymer"(default)
    return new IProject(fileStack, workspace.name, "Owner: " + workspace.owner.name, 'polymer');
  }

  private appendFilesToFilestack(files: File[], fileStack: { [path: string]: string } ): void {
    if (files == null || files.length <= 0) {
      fileStack['README.md'] = 'Welcome to TeamCode, enjoy your stay! :)';
    } else {
      files.forEach( file => {
        fileStack[file.name] = file.content;
      });
    }
  }

  private vmListener() {
    if (this.interval != null) return;
    this.interval = setInterval(this.ideService.getSnapshot.bind(this.ideService), 5000, this.ideService.virtualMachine$);
  }

  private clearInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }
}