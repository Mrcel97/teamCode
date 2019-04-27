import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Models
import { FirebaseUser, firebaseUserFactory } from 'src/assets/model/user';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<FirebaseUser>;
  private uid;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) {
    this.user$ = afAuth.authState.pipe(switchMap( user => { 
      if (user) {
        this.uid = firebase.auth().currentUser.uid;
        return this.afs.doc<FirebaseUser>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    } ));
  }

  loginWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( (credential) => {
      this.updateUser(credential.user);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc<FirebaseUser>(`users/${user.uid}`);
    const data = firebaseUserFactory(user.uid, user.email, user.displayName, user.photoURL, this.getTime());

    return userRef.set(Object.assign({}, data));
  }

  haveUser(): boolean {
    return firebase.auth().currentUser != null
  }

  getTime(): number {
    return new Date().getTime();
  }
}