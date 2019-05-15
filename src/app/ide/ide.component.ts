import { File } from './../../assets/model/file';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { StackBlitzService } from '../services/stack-blitz.service';
import { WorkspaceService } from './../services/workspace.service';

// Project Imports
import { Workspace } from 'src/assets/model/workspace';
import { IProject } from 'src/assets/model/IProject';


@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  workspace: Workspace = null;
  project: IProject = null;
  options: boolean = false;
  userStatus: boolean = false;

  constructor(
    public ideService: StackBlitzService,
    public workspaceService: WorkspaceService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    // If workspace change, IDE change
    
  }

  ngOnInit() {
    //Create project

    // Send project
    this.route.paramMap.subscribe( params => {
      this.loadWorkspace(params.get("workspace_id"));
    })
  }

  loadWorkspace(workspaceId: string) {
    // Inform about the workspace is going to try to load
    // console.log("Trying to load workspace: " + workspaceId);

    // Load workspace using workspaceService and catch the result of the call.
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
}