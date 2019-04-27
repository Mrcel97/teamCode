export class User {
  constructor(
    public id: string,
    public name: string
  ){}
}

export class FirebaseUser {
  constructor(
    public uid: string,
    public email: string,
    public displayName: string,
    public photoURL: string,
    public since: number
  ){}
}

export function userFactory(id: string, name: string) {
  return new User(id, name);
}

export function firebaseUserFactory(uid: string, email: string, displayName: string, photoURL: string, since: number) {
  return new FirebaseUser(uid, email, displayName, photoURL, since);
}