import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  

  constructor(public navbarService: NavbarService) { }

  ngOnInit() {
  }

  navigate(path: string) {
    this.navbarService.navigate(path);
  }

  checkActivePath(path: string) {
    return path === this.navbarService.section;
  }
}
