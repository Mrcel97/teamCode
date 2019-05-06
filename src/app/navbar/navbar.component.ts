import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public chatContent: string;
  public message: string;
  //public workspace: Workspace;
  private roomID: string;
  public options: boolean = false;
  public requests: string[] = [];
  userUID: string = '';
  userEmail: string = '';
  userStatus: boolean = false;
  isWriter: boolean = false;
  warningInterval;

  //idle: Idle;
  //notIdle: NotIdle;

  constructor(
    public navbarService: NavbarService
    ) { }

  ngOnInit() {
  }

  //// NAVIGATION SECTION ////
  navigate(path: string) {
    this.navbarService.navigate(path);
  }

  homeNavigate() {
    this.userStatus ? this.navbarService.navigate('interface') : this.navbarService.navigate('');
  }

  checkActivePath(path: string) {
    return path === this.navbarService.section;
  }

  //// AUTH DATA ////
  showOptions(status: boolean) {
    this.options = status;
  }

  updateUserCredentials(status: string) {
    this.userUID = status[0];
    this.userEmail = status[1];
    this.userStatus = (this.userUID !== '') ? true : false;
    /*this.chatService.setUserUID(this.userUID);
    this.workspaceService.isWriter(this.userEmail, this.roomID).subscribe(
      result => { 
        if (result) {
          this.getWriteRequests();
        }
      }
    );*/
  }
}
