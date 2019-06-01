import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

import { ModalService } from '../modal-service/modal-service.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace-delete-modal',
  templateUrl: './workspace-delete-modal.component.html',
  styleUrls: ['./workspace-delete-modal.component.scss']
})
export class WorkspaceDeleteModalComponent {
  workspaceName: string = '';

  constructor(
    public modalRef: MDBModalRef,
    public modalService: ModalService,
    public workspaceService: WorkspaceService
  ) { }

  deleteWorkspace() {
    console.log('Deleting: ', this.modalService.workspaceId.getValue())
    this.workspaceService.deleteWorkspace(this.modalService.workspaceId.getValue());
    // this.workspaceService.loadWorkspaces(this.modalService.workspaceOwner.getValue().email);
    this.modalRef.hide();
  }
}
