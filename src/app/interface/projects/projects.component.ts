import { of } from 'rxjs';
import { FirebaseUser } from './../../../assets/model/user';
import { AuthService } from './../../services/auth.service';
import { WorkspaceService } from './../../services/workspace.service';
import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/assets/model/workspace';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  myUser: FirebaseUser;
  allWorkspaces: Array<Workspace>;
  workspacePages: number;
  visibleWorkspaces: Array<Workspace>;
  range: Array<number> = [-3,0];
  projectsLoaded: boolean = false;
  
  constructor(
    public workspaceService: WorkspaceService,
    public authService: AuthService,
    public router: Router
  ) {
    this.workspaceService.localWorkspaces.subscribe(workspaces => {
      this.allWorkspaces = workspaces;
      this.workspacePages = this.getPagesValue();
      if (this.projectsLoaded == false) {
        this.projectsLoaded = true;
        this.getNextWorkspaces();
      }
    });

    this.authService.user$.subscribe(user => {
      this.myUser = user;
      this.workspaceService.loadWorkspaces(this.myUser.email);
    })
    
  }

  ngOnInit() {
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
  }

  subToArrayValues(array: Array<number>, value: number) {
    for (var pos in array) {
      array[pos] = array[pos] - value;
    }
  }

  getPagesValue():number { // Future improvements: Add '...' between max_page_amount and total_pages_amount
    if (Math.ceil(this.allWorkspaces.length/3) >= 5) {
      return 5;
    }
    return Math.ceil(this.allWorkspaces.length/3);
  }

  public navigate(path: string, workspaceId: string) {
    this.router.navigate([path, workspaceId]);
  }
}
