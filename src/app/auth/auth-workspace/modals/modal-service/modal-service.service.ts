import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  userID: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  workspaceID: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }
}
