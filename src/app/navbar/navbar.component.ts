import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NavbarService } from '../services/navbar.service';
import { AuthService } from './../services/auth.service';

import { FirebaseUser } from '../../assets/model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: FirebaseUser;
  options: boolean = false;
  @Output() options_notification: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() user_status: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() user_uid: EventEmitter<String> = new EventEmitter<String>();
  @Output() user_credentials: EventEmitter<String[]> = new EventEmitter<String[]>();
  @Output() user_data: EventEmitter<FirebaseUser> = new EventEmitter<FirebaseUser>();

  constructor(
    public navbarService: NavbarService,
    public authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.user$.subscribe( user => {
      this.user = user;
      this.user_status.emit(user ? true : false);
      this.user_uid.emit(user ? user.uid : '');
      this.user_credentials.emit(user ? [user.uid, user.email] : ['','']);
      this.user_data.emit(user ? user : null);
    } );
  }

  //// NAVIGATION SECTION ////
  navigate(path: string) {
    this.navbarService.navigate(path);
  }

  checkActivePath(path: string) {
    return path === this.navbarService.section;
  }

  //// AUTH SECTION ////
  login() {
    this.authService.loginWithGithub();
  }

  logout() {
    this.authService.logout();
  }

  showOptions() {
    this.options = (this.options) ? false : true;
    this.options_notification.emit(this.options);
  }
}
