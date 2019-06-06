import { WorkspaceService } from 'src/app/services/workspace.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workspace } from 'src/assets/model/workspace';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  workspaces: Array<Workspace> = [];

  constructor(
    private router: Router,
    private workspaceService:WorkspaceService
  ) {
    this.getPublicWorkspaces();
  }

  ngOnInit() {
  }

  getPublicWorkspaces() {
    this.workspaceService.getPublicWorkspaces()
      .subscribe((workspaces:Array<Workspace>) => this.workspaces = workspaces);
  }

  public navigateToWokspace(roomId: string) {
    this.router.navigateByUrl('/workspace/' + roomId);
  }
}
