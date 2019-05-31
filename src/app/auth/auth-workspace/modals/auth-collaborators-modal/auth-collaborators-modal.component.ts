import { Component, OnInit, OnDestroy } from '@angular/core';

import { MDBModalRef } from 'angular-bootstrap-md';
import { AuthModalService } from './../modal-service/modal-service.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ToastrService } from 'ngx-toastr';

import { ToasterMessages } from '../../../../../assets/messages/toasterMessages';

@Component({
  selector: 'app-auth-collaborators-modal',
  templateUrl: './auth-collaborators-modal.component.html',
  styleUrls: ['./auth-collaborators-modal.component.scss']
})
export class AuthCollaboratorsModalComponent implements OnInit, OnDestroy {
  public collaborators: Array<string>;
  public collaborator: string;
  public startDelete: boolean = false;
  public isOwner: boolean = false;
  private toasterMessages: ToasterMessages = new ToasterMessages(this.toastr);

  constructor(
    public modalRef: MDBModalRef,
    public authModalService: AuthModalService,
    private workspaceService: WorkspaceService,
    private toastr: ToastrService
  ) {
    
    this.authModalService.userData.subscribe(userData => {
      if (userData == null) return;
      this.isOwner = (this.workspaceService.localWorkspace.getValue().owner.uid == userData.userID);
    });
  }

  ngOnInit() {
    this.getCollaborators();
  }

  ngOnDestroy() {
    this.startDelete = false;
  }

  getCollaborators() {
    this.authModalService.userData.subscribe(userData => {
      if (userData == null) return;
      this.authModalService.workspaceID.subscribe(workspaceID => workspaceID != null && 
        this.workspaceService.getCollaborators(userData.userID, workspaceID, userData.userEmail));
    })
    this.workspaceService.localCollaborators.subscribe(collaborators => this.collaborators = collaborators);
  }

  proceedToDelete(collaborator: string) {
    this.collaborator = collaborator;
    this.startDelete = true;
  }

  undoDelete() {
    this.startDelete = false;
  }

  deleteCollaborator(collaborator: string) {
    var collaborators = this.workspaceService.localCollaborators.getValue();
    const pos = collaborators.indexOf(collaborator, 0);

    if (pos > -1) {
      collaborators.splice(pos, 1);

      var workspace = this.workspaceService.localWorkspace.getValue();
      workspace.collaborators = collaborators;
      this.workspaceService.patchWorkspace(workspace);
    }
    this.toasterMessages.deleteCollaboratorInfo(collaborator);
    this.modalRef.hide();
  }
}
