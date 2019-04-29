import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { StackBlitzService } from '../services/stack-blitz.service';
import { GithubService } from '../services/github.service';

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
  
  constructor(
    public stackBlitzService: StackBlitzService, 
    public githubService: GithubService
  ) { }

  ngOnInit() { }

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
          this.stackBlitzService.createFile(file.name, file.language, file.content);
        }
      );
    }
  }

  loadCollaborator() {
    this.collaborator_email.emit(this.collaboratorEmail);
  }
}
