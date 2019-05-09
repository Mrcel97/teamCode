import { ModalService } from './modal-service/modal-service.service';
import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';


@Component({
  selector: 'app-workspace-delete-modal',
  templateUrl: './workspace-delete-modal.component.html',
  styleUrls: ['./workspace-delete-modal.component.scss']
})
export class WorkspaceDeleteModalComponent {
  workspaceName: string = '';

  constructor(
    public modalRef: MDBModalRef,
    public modalService: ModalService
  ) { }

}
