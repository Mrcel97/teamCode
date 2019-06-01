import { FirebaseUser } from './../../../assets/model/user';
import { AuthService } from './../../services/auth.service';
import { WorkspaceService } from './../../services/workspace.service';
import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/assets/model/workspace';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


import { WorkspaceCreateModalComponent } from './modals/workspace-create-modal/workspace-create-modal.component';
import { WorkspaceDeleteModalComponent } from './modals/workspace-delete-modal/workspace-delete-modal.component';

import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalService } from './modals/modal-service/modal-service.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  modalRef: MDBModalRef;

  myUser: FirebaseUser;
  allWorkspaces: Array<Workspace>;
  workspacePages: BehaviorSubject<number> = new BehaviorSubject(null);
  visibleWorkspaces: Array<Workspace>;
  range: Array<number> = [-3,0];
  projectsLoaded: boolean = false;
  
  constructor(
    private MDBmodalService: MDBModalService,
    private modalService: ModalService,
    public workspaceService: WorkspaceService,
    public authService: AuthService,
    public router: Router
  ) {
    this.workspaceService.localWorkspaces.subscribe(workspaces => {
      if (workspaces == null || workspaces.length == 0) return;
      this.allWorkspaces = workspaces;
      this.workspacePages.next(this.getPagesValue());
      // console.log('Nº of pages: ', this.workspacePages);
      if (this.projectsLoaded == false) {
        this.projectsLoaded = true;
        this.getNextWorkspaces();
      } else {
        this.partialReload();
      }
    });

    this.authService.user$.subscribe(user => {
      this.myUser = user;
      if (user == null) {
        this.router.navigate(['']);
        return;
      }
      this.workspaceService.loadWorkspaces(this.myUser.email);
    })
  }

  ngOnInit() {
  }

  openCreateModal() {
    this.modalRef = this.MDBmodalService.show(WorkspaceCreateModalComponent);
    this.modalService.workspaceOwner.next(this.myUser);
  }

  openDeleteModal(workspaceName: string, workspaceId: string) {
    this.modalRef = this.MDBmodalService.show(WorkspaceDeleteModalComponent);
    this.modalService.workspaceName.next(workspaceName);
    this.modalService.workspaceId.next(workspaceId);
    this.modalService.workspaceOwner.next(this.myUser);
  }

  assignPagesMovement(movement: boolean) {
    movement ? this.getNextWorkspaces() : this.getPreviousWorkspaces();
  }

  getNextWorkspaces() {
    this.sumToArrayValues(this.range, 3);
    if (this.range[0] > this.allWorkspaces.length) {
      this.subToArrayValues(this.range, 3);
      return;
    }
    this.visibleWorkspaces = this.allWorkspaces.slice(this.range[0], this.range[1]);
  }

  getPreviousWorkspaces() {
    this.subToArrayValues(this.range, 3);
    if (this.range[0] < 0) {
      this.sumToArrayValues(this.range, 3);
      return;
    }
    this.visibleWorkspaces = this.allWorkspaces.slice(this.range[0], this.range[1]);
  }

  getSpecificWorkspace(multiplier: number) {
    this.range = [(3*multiplier)-3, 3*multiplier];
    this.visibleWorkspaces = this.allWorkspaces.slice(this.range[0], this.range[1]);
  }

  sumToArrayValues(array: Array<number>, value: number) {
    for (var pos in array) {
      array[pos] = array[pos] + value;
    }
    // console.log('Actual range: ', this.range);
  }

  subToArrayValues(array: Array<number>, value: number) {
    for (var pos in array) {
      array[pos] = array[pos] - value;
    }
    // console.log('Actual range: ', this.range);
  }

  getPagesValue():number { // Future improvements: Add '...' between max_page_amount and total_pages_amount
    if (Math.ceil(this.allWorkspaces.length/3) >= 5) {
      return 5;
    }
    return Math.ceil(this.allWorkspaces.length/3);
  }

  partialReload() {
    if (this.range != [-3,0]) {
      this.range = [this.range[0]-3, this.range[1]-3];
      this.getNextWorkspaces();
    }
  }

  public navigate(path: string, workspaceId: string) {
    this.router.navigate([path, workspaceId]);
  }
}
