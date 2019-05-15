import { Component, OnInit } from '@angular/core';

import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-auth-workspace',
  templateUrl: './auth-workspace.component.html',
  styleUrls: ['./auth-workspace.component.scss']
})
export class AuthWorkspaceComponent implements OnInit {
  // Workspace Component Filters
  insideWorkspace: Boolean = false;
  regexp = /\/\bworkspace\/\b.*/g;

  constructor(
    public router: Router,
  ) {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;
      }
    });
  }

  ngOnInit() {
    this.insideWorkspace = this.regexp.test(this.router.url) ? true : false;
  }
}
