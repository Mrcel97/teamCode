import { FirebaseUser, firebaseUserFactory, userFactory, User } from "./user";
import { File, fileFactory } from "./file";

import { tutorialMessage } from './../messages/tutorialMessage';

export class Workspace {
  
  constructor(
    public name: string,
    public owner: FirebaseUser,
    public writer: string,
    public collaborators: string[],
    public files: File[],
    public writerRequests: Map<string, Number>,
    public privacy?: boolean,
    public id?: string,
  ){}
}

export function workspaceSnapshotFactory(snapshot): Workspace {
  var files: File[] = [];
  var file_id = 0;
  var user_id = '1'; // TODO
  var workspace_name = 'Example Project'; // TODO
  var owner = firebaseUserFactory(user_id, 'johndoe@gmail.com', 'John Doe', 'www.example.com', 1234567654) // TODO

  for(var file in snapshot) {
    files.push(fileFactory(file, userFactory(user_id, owner.name), snapshot[file]));
  }
  
  return new Workspace(workspace_name, owner, owner.uid, [owner.email], files, this.defaultWriterRequest(owner.uid, 0));
}

export function defaultFiles(owner: User) { // Default file that will exist on every project
  return new File("README.md", owner, ".md", tutorialMessage);
}

export function defaultWriterRequest(userID: string, requestTime: Number) {
  var writerRequests = new Map();
  var convMap: Map<string, Number> = new Map();

  writerRequests.set(userID, requestTime);
  writerRequests.forEach( (val: Number, key: string) => convMap[key] = val);

  return convMap;
}