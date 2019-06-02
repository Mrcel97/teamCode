import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { StackBlitzService } from '../services/stack-blitz.service';
import { GithubService } from '../services/github.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  @Input() user: boolean;
  @Output() collaborator_email: EventEmitter<String> = new EventEmitter<String>();
  optionsOpen: boolean = false;
  repositoryInput: boolean = false;
  fileInput: boolean = false;
  collaboratorInput: boolean = false;
  repoURL: string;
  fileURL: string;
  collaboratorEmail: string;

  // Workspace Component Filters
  insideWorkspace: Boolean = false;
  regexp = /\/\bworkspace\/\b.*/g;
  
  constructor(
    public router: Router,
    public stackBlitzService: StackBlitzService, 
    public githubService: GithubService
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

  showOptions() {
    this.optionsOpen = this.optionsOpen ? false : true;
  }

  showRepositoryInput() {
    this.repositoryInput = (this.repositoryInput) ? false : true;
  }

  showFileInput() {
    this.fileInput = (this.fileInput) ? false : true;
  }

  showCollaboratorInput() {
    this.collaboratorInput = (this.collaboratorInput) ? false : true;
  }

  loadWebRepo() {
    if (this.repoURL) {
      this.stackBlitzService.loadGithubWorkspace(this.repoURL);
    }
  }

  loadFile() {
    var githubUserName: string = 'MrceL97';

    if (this.fileURL) {
      this.githubService.obtainGithubFile(this.fileURL).subscribe(
        file => {
          this.stackBlitzService.createFile(file.name + '.' + file.language, file.content);
        }
      );
    }
  }

  loadCollaborator() {
    this.collaborator_email.emit(this.collaboratorEmail);
  }
}
