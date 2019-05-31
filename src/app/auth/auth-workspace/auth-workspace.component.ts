import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { WorkspaceService } from 'src/app/services/workspace.service';
import { AuthService } from './../../services/auth.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AuthModalService } from './modals/modal-service/modal-service.service';
import { ToastrService } from 'ngx-toastr';

import { AuthAddCollaboratorModalComponent } from './modals/auth-add-collaborator-modal/auth-add-collaborator-modal.component';
import { AuthCollaboratorsModalComponent } from './modals/auth-collaborators-modal/auth-collaborators-modal.component';
import { ToasterMessages } from '../../../assets/messages/toasterMessages';

@Component({
  selector: 'app-auth-workspace',
  templateUrl: './auth-workspace.component.html',
  styleUrls: ['./auth-workspace.component.scss']
})
export class AuthWorkspaceComponent implements OnInit {
  modalRef: MDBModalRef;
  requests: Array<string> = [];
  userEmail: string = '';
  toasterMessages: ToasterMessages = new ToasterMessages(this.toastr);

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
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.hearRoute();
    this.hearWriteRequests();
    this.hearUser();
  }

  ngOnInit() {
    this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;

    this.workspaceService.localIsWriter.subscribe( status => {
      this.isWriter = status;
      // status ? this.loadUserMode() : null;  Idle system
    });
  }

  askForWrite() { // Need to do a GET to work with updated data
    this.workspaceService.askForWrite();
  }

  makeWriter(newWriterEmail: string) {
    this.workspaceService.makeWriter(newWriterEmail);
  }

  getWriteRequests() {
    console.log('You are the writer, getting write requests...');
  }

  switchNestedDropdown() {
    this.nestedDropdown = this.nestedDropdown ? false : true;
  }

  private hearRoute() {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;
      }
    });
  }

  private hearWriteRequests() {
    this.workspaceService.localWriteRequests.subscribe(writeRequests => {
      if (writeRequests == null) return;
      this.requests = Array.from(writeRequests.keys()).filter(key => key != this.userEmail);
      if (this.requests.length > 0) {
        this.toasterMessages.writeRequestInfo(this.requests);
      } 
    });
  }

  private hearUser() {
    this.authService.user$.subscribe(user => {
      this.workspaceService.localWorkspace.subscribe(workspace => {
        if (user != null && workspace != null) {
          console.log("Owner: ", this.workspaceService.localWorkspace.getValue().owner.email, "Writer: ", this.workspaceService.localWorkspace.getValue().writer, " User: ", user.email);
          this.isOwner = (workspace.owner.email == user.email);
          this.userEmail = user.email;
          this.workspaceService.isWriter(user.email).subscribe(
            result => { 
              if (result) {
                this.getWriteRequests();
                this.toasterMessages.updateStatusInfo('Writer');
              } else {
                this.toasterMessages.updateStatusInfo('Auditor');
                console.log('You are not the writer');
              }
            }
          );
        }
      });
    });
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
