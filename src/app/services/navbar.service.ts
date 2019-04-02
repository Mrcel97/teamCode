import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public section: String;

  constructor(public router: Router) {
    router.events.subscribe(event => {
      this.section = router.url.split("/")[1];
      console.log(this.section)
    });
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
