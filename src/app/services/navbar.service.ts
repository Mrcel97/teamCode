import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { WorkspaceService } from 'src/app/services/workspace.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public section: String;
  public workspace: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    public router: Router,
    private workspaceService: WorkspaceService
  ) {
    router.events.subscribe(event => {
      this.section = router.url.split("/")[1];
    });

    workspaceService.localWorkspace.subscribe(workspace => {
      if (workspace == null) return;
      this.workspace.next(workspace.name);
    });
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
