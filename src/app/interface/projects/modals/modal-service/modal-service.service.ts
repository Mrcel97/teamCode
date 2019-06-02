import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FirebaseUser } from '../../../../../assets/model/user';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  workspaceName: BehaviorSubject<string> = new BehaviorSubject(null);
  workspaceId: BehaviorSubject<string> = new BehaviorSubject('');
  workspaceOwner: BehaviorSubject<FirebaseUser> = new BehaviorSubject(null);

  constructor() { }
}
