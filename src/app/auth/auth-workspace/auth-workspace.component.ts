import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { WorkspaceService } from 'src/app/services/workspace.service';
import { FirebaseUser } from '../../../assets/model/user';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-auth-workspace',
  templateUrl: './auth-workspace.component.html',
  styleUrls: ['./auth-workspace.component.scss']
})
export class AuthWorkspaceComponent implements OnInit {
  // Workspace Component Filters
  insideWorkspace: Boolean = false;
  regexp = /\/\bworkspace\/\b.*/g;
  requests: Array<string> = [];
  isWriter: boolean = false;

  public nestedDropdown: boolean = false;

  constructor(
    public router: Router,
    private workspaceService: WorkspaceService,
    private authService: AuthService
  ) {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;
      }
    });

    this.workspaceService.localWriteRequests.subscribe(writeRequests => {
      if (writeRequests == null) return;
      this.requests = Array.from(writeRequests.keys());
    });

    this.authService.user$.subscribe(user => {
      console.log("Writer: ", this.workspaceService.localWorkspace.getValue().writer, " User: ", user.email);
      this.isWriter = (this.workspaceService.localWorkspace.getValue().writer == user.email);
    });
  }

  ngOnInit() {
    this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;
  }

  switchNestedDropdown() {
    this.nestedDropdown = this.nestedDropdown ? false : true;
  }
}
