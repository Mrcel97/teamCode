import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

import { ModalService } from '../modal-service/modal-service.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace-create-modal',
  templateUrl: './workspace-create-modal.component.html',
  styleUrls: ['./workspace-create-modal.component.scss']
})
export class WorkspaceCreateModalComponent {
  workspaceName: string = '';

  constructor(
    public modalRef: MDBModalRef,
    public modalService: ModalService,
    public workspaceService: WorkspaceService
  ) { }

  createWorkspace() {
    this.workspaceService.createWorksapace(this.workspaceName, this.modalService.workspaceOwner.getValue());
    this.modalRef.hide();
  }
}
