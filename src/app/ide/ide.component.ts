import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { StackBlitzService } from '../services/stack-blitz.service';

// Project Imports
import { Workspace } from 'src/assets/model/workspace';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  virtualMachine: any = null; // TODO: Find and set the Type. Possibilities { 'StackBlitzComponent', 'more...' }
  workspace: Workspace;
  options: boolean = false;
  userStatus: boolean = false;

  constructor(
    public ideService: StackBlitzService,
    public router: Router
  ) { }

  ngOnInit() {
    this.ideService.createWorkspace();
  }

  createFile() {
    console.log('Creating File');
    var name = 'sampleFile' // TODO
    var language = 'ts' // TODO

    this.ideService.createFile(name, language);
  }

  getSnapshot() {
    this.ideService.getSnapshot();
  }

  receiveUpdates() {
    this.ideService.receiveUpdates();
  }

  refresh() {
    this.ideService.refresh();
  }

  showOptions(status: boolean) {
    this.options = status;
  }

  updateUserStatus(status: boolean) {
    this.userStatus = status;
  }
}
