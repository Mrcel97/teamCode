import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-project-pages',
  templateUrl: './project-pages.component.html',
  styleUrls: ['./project-pages.component.scss']
})
export class ProjectPagesComponent implements OnInit {
  @Output() getMoreWorkspaces: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() getSpecificWorkspace: EventEmitter<number> = new EventEmitter<number>();
  @Input() workspacePages:BehaviorSubject<number>;

  actualPage = 1;

  constructor() { }

  ngOnInit() {
  }

  getWorkspaces(movement: boolean) { // True: forward | False: backward
    movement ? this.forward() : this.backward();
    movement ? this.getMoreWorkspaces.emit(true) : this.getMoreWorkspaces.emit(false);
  }

  specificWorkspace(page: number) {
    this.actualPage = page;
    this.getSpecificWorkspace.emit(page);
  }

  createRange(number: BehaviorSubject<number>){
    var items: number[] = [];
    for(var i = 1; i <= number.getValue(); i++){
       items.push(i);
    }
    return items;
  }

  forward() {
    var pages = this.workspacePages.getValue();
    pages != null && this.actualPage < pages ? this.actualPage += 1 : null;
  }

  backward() {
    this.actualPage > 1 ? this.actualPage -= 1 : null;
  }
}
