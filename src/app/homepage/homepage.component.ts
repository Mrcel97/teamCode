import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }

}
