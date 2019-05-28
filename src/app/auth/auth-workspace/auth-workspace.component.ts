import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { WorkspaceService } from 'src/app/services/workspace.service';
import { AuthService } from './../../services/auth.service';

import { AuthAddCollaboratorModalComponent } from './modals/auth-add-collaborator-modal/auth-add-collaborator-modal.component';
import { AuthCollaboratorsModalComponent } from './modals/auth-collaborators-modal/auth-collaborators-modal.component';

import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthModalService } from './modals/modal-service/modal-service.service';

@Component({
  selector: 'app-auth-workspace',
  templateUrl: './auth-workspace.component.html',
  styleUrls: ['./auth-workspace.component.scss']
})
export class AuthWorkspaceComponent implements OnInit {
  modalRef: MDBModalRef;
  requests: Array<string> = [];

  // Workspace Component Filters
  insideWorkspace: Boolean = false;
  regexp = /\/\bworkspace\/\b.*/g;
  isWriter: boolean = false;
  isOwner: boolean = false;

  public nestedDropdown: boolean = false;

  constructor(
    public router: Router,
    private MDBmodalService: MDBModalService,
    private authModalService: AuthModalService,
    private workspaceService: WorkspaceService,
    private authService: AuthService
  ) {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;
      }
    });

    this.workspaceService.localWriteRequests.subscribe(writeRequests => {
      if (writeRequests == null) return;
      console.log(writeRequests);
      this.requests = Array.from(writeRequests.keys());
    });

    this.authService.user$.subscribe(user => {
      this.workspaceService.localWorkspace.subscribe(workspace => {
        if (user != null && workspace != null) {
          console.log("Owner: ", this.workspaceService.localWorkspace.getValue().owner.email, "Writer: ", this.workspaceService.localWorkspace.getValue().writer, " User: ", user.email);
          this.isWriter = (workspace.writer == user.email);
          this.isOwner = (workspace.owner.email == user.email);
        }
      });
    });
  }

  ngOnInit() {
    this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;
  }

  switchNestedDropdown() {
    this.nestedDropdown = this.nestedDropdown ? false : true;
  }

  openAddCollaboratorModal() {
    this.workspaceService.localWorkspace.subscribe(workspace => {
      if (workspace == null) return;
      this.authModalService.workspaceID.next(workspace.id);
    });

    this.authService.user$.subscribe(user => {
      if (user == null) return;
      this.authModalService.userID.next(user.uid);
    });

    this.modalRef = this.MDBmodalService.show(AuthAddCollaboratorModalComponent);
  }

  openListCollaboratorModal() {
    this.workspaceService.localWorkspace.subscribe(workspace => {
      if (workspace == null) return;
      this.authModalService.workspaceID.next(workspace.id);
    });

    this.authService.user$.subscribe(user => {
      if (user == null) return;
      if (this.isOwner) {
        this.authModalService.userData.next({userID: user.uid});
      } else {
        this.authModalService.userData.next({userID: user.uid, userEmail: user.email});
      }
    });

    this.modalRef = this.MDBmodalService.show(AuthCollaboratorsModalComponent);
  }
}
