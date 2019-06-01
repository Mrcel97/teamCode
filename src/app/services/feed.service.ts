import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FeedItem } from '../../assets/model/feedItem';
import { httpOptions, httpWorkspaceOptions } from '../../assets/model/httpOptions'

// import { backendURL } from '../../assets/configs/backendConfig';

var backendURL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  feedRelated: BehaviorSubject<Map<string, FeedItem>> = new BehaviorSubject<Map<string, FeedItem>>(new Map());

  constructor(
    public http: HttpClient,
  ) { }

  getFeedElementsRelatedToUser(userId: string) {
    if (!userId) return;
    this.http.get<FeedItem[]>(backendURL + '/api/feed/findByUserId?id=' + userId, httpOptions)
      .subscribe(feedItems => {
        if (feedItems.length == 0) return;
        feedItems.forEach(feedItem => {
          this.feedRelated.next(this.feedRelated.getValue().set(feedItem.id, feedItem));
        });
      });
    return this.feedRelated;
  }

  getFeedElementsRelatedToWorkspace(workspaceId: string) {
    if (!workspaceId) return;
    this.http.get<FeedItem[]>(backendURL + '/api/feed/findByWorkspaceId?id=' + workspaceId, httpOptions)
      .subscribe(feedItems => {
        if (feedItems.length == 0) return;
        feedItems.forEach(feedItem => {
          this.feedRelated.next(this.feedRelated.getValue().set(feedItem.id, feedItem));
        });
      });
  }
}
