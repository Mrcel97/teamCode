import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

import { AuthModalService } from './../modal-service/modal-service.service';
import { WorkspaceService } from './../../../../services/workspace.service';

@Component({
  selector: 'app-auth-add-collaborator-modal',
  templateUrl: './auth-add-collaborator-modal.component.html',
  styleUrls: ['./auth-add-collaborator-modal.component.scss']
})
export class AuthAddCollaboratorModalComponent implements OnInit {
  public collaboratorsEmail: string = '';
  regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig;

  constructor(
    public modalRef: MDBModalRef,
    public authModalService: AuthModalService,
    public workspaceService: WorkspaceService
  ) { }

  ngOnInit() {
  }

  submitCollaborators(){
    this.parseCollaborators(this.collaboratorsEmail).forEach(collaboratorEmail => {
      if (collaboratorEmail == null || collaboratorEmail == "" || !this.regexp.test(collaboratorEmail)) return;
      this.regexp.test(''); // Reset regex inside bucle
      this.workspaceService.addCollaborator(this.authModalService.userID.getValue(), collaboratorEmail, this.authModalService.workspaceID.getValue());
    });
    this.modalRef.hide();
  }

  private parseCollaborators(collaboratorsEmail: string): Array<string> {
    return collaboratorsEmail.split(/[\s,]+/)
  }
}