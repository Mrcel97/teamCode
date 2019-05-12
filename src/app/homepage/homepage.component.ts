import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  validSession: boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService
    ) {
      this.authService.user$.subscribe( user => {
        if (user != null) this.router.navigate(['interface']);
      });
    }

  ngOnInit() {
  }

  public navigate(path: string) {
    if (this.validSession == false) this.authService.loginWithGithub();
  }

}
