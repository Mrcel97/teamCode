import { WorkspaceService } from 'src/app/services/workspace.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Workspace } from 'src/assets/model/workspace';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  workspaces: Array<Workspace> = [];
  publicProjectsSubscription: Subscription;

  constructor(
    private router: Router,
    private workspaceService:WorkspaceService
  ) {
    var urlContent = this.router.url.split('/');
    var filter = urlContent.length >= 2 ? urlContent[2] : '';
    this.getPublicWorkspaces(filter);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.publicProjectsSubscription.unsubscribe();
  }

  getPublicWorkspaces(filter: string) {
    this.publicProjectsSubscription = this.workspaceService.getPublicWorkspaces(filter)
      .subscribe((workspaces:Array<Workspace>) => {
        if (workspaces == null) return;
        this.workspaces = workspaces
      });
  }

  public navigateToWokspace(roomId: string) {
    this.router.navigateByUrl('/workspace/' + roomId);
  }
}
