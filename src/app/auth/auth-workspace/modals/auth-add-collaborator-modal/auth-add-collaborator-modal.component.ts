import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

import { AuthModalService } from './../modal-service/modal-service.service';
import { WorkspaceService } from './../../../../services/workspace.service';
import { ToastrService } from 'ngx-toastr';

import { ToasterMessages } from '../../../../../assets/messages/toasterMessages';

@Component({
  selector: 'app-auth-add-collaborator-modal',
  templateUrl: './auth-add-collaborator-modal.component.html',
  styleUrls: ['./auth-add-collaborator-modal.component.scss']
})
export class AuthAddCollaboratorModalComponent implements OnInit {
  public collaboratorsEmail: string = '';
  regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig;
  collaborators = []
  private toasterMessages: ToasterMessages = new ToasterMessages(this.toastr);

  constructor(
    public modalRef: MDBModalRef,
    public authModalService: AuthModalService,
    public workspaceService: WorkspaceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  submitCollaborators(){
    this.collaborators = [];
    this.parseCollaborators(this.collaboratorsEmail.toLowerCase()).forEach(collaboratorEmail => {
      if (collaboratorEmail == null || collaboratorEmail == "" || !this.regexp.test(collaboratorEmail)) return;
      this.collaborators.push(collaboratorEmail);
      this.regexp.test(''); // Reset regex inside bucle
    });
    this.workspaceService.addCollaborators(this.authModalService.userID.getValue(), this.collaborators, this.authModalService.workspaceID.getValue());
    this.toasterMessages.addCollaboratorInfo(this.collaborators);
    this.modalRef.hide();
  }

  private parseCollaborators(collaboratorsEmail: string): Array<string> {
    return collaboratorsEmail.split(/[\s,]+/)
  }
}