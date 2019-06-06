import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from '../../services/feed.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { FeedItem } from 'src/assets/model/feedItem';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public feedItems: FeedItem[] = [];
  public status: string = 'Undefined';
  private userStatus: string = 'Undefined';

  constructor(
    private router: Router,
    private authService: AuthService,
    private feedService: FeedService,
    private workspaceService: WorkspaceService
  ) {
    this.authService.user$.subscribe(user => {
      if (user == null) return;
      this.feedService.getFeedElementsRelatedToUser(user.uid);
    });

    this.workspaceService.localWorkspaces.subscribe(workspaces => {
      if (workspaces == null) return;
      workspaces.forEach(workspace => this.feedService.getFeedElementsRelatedToWorkspace(workspace.id));
    });

    this.workspaceService.localIsWriter.subscribe(status => {
      if (status == null) return;
      this.userStatus = (status == true) ? 'Writer' : 'Auditor';
    });

    this.feedService.feedRelated.subscribe(feedItems => {
      feedItems.forEach((value: FeedItem, key: string) => {
        !this.feedItems.map(feedItem => feedItem.id).includes(key) && this.feedItems.push(value); 
      });
      this.obtainUserNames();
    });
  }

  ngOnInit() {
  }

  public obtainUserNames() {
    this.authService.user$.subscribe(user => {
      if (user == null) return;
      this.feedItems.forEach(feedItem => {
        if (feedItem.type == 'writer') {
          var status = (feedItem.userId == user.uid);
          var role = status ? 'Writer' : 'Auditor';
          feedItem.userName = user.name && feedItem.userId == user.uid ? 
            'Your status changed' : 
            'Auditor swaped status with Writer';
        }
      });
    });
  }

  public navigateToWokspace(roomId: string) {
    this.router.navigateByUrl('/workspace/' + roomId);
  }
}
