import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  workspacename: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }
}
