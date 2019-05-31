import { BehaviorSubject, timer } from 'rxjs';
import { Injectable } from '@angular/core';

import { Workspace } from '../../assets/model/workspace';
import { File } from '../../assets/model/file';

@Injectable({
  providedIn: 'root'
})
export class ModificationsService {
  localWorkspaceLog: Workspace;
  localFilesLog: Array<File> = [];
  seconds$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  findModifications(files: Array<File>) {
    var fileModifications: {additions: Array<File>, supresions: Array<File> };
    var fileContentUpdate: Array<File> = [];

    // Case: File modifications: (create/delete/rename/reubicate)
    fileModifications = this.checkNewFiles(files);

    // Case: File content modification:
    fileContentUpdate = this.checkContentUpdate(files, fileModifications);

    // DEBUG: console.log('File Modifications: \n', fileModifications); 
    // DEBUG: console.log('File Content Updates: \n', fileContentUpdate);
    this.localFilesLog = files;

    if (!this.existsChanges(fileModifications, fileContentUpdate)) {
      // Idle notifications controller
      this.seconds$.next(this.seconds$.getValue() + 1);
    } else {
      this.seconds$.next(0);
    }

    return {
      additions: fileModifications.additions, 
      supresions: fileModifications.supresions, 
      contentUpdated: fileContentUpdate
    }
  }

  public loadWorkspaceFiles(localWorkspaceLog: Workspace) {
    if (localWorkspaceLog == null) return;
    // Reset
    this.localFilesLog = [];
    if (this.localWorkspaceLog != undefined) this.localWorkspaceLog.files = [];

    // Download Workspace Files
    this.localWorkspaceLog = localWorkspaceLog;
    this.localWorkspaceLog.files.forEach(file => this.localFilesLog.push(file));
  }

  private checkNewFiles(files: Array<File>) {
    var additions: Array<File> = [];
    var supresions: Array<File> = [];
    
    var oldLog: Array<string> = this.localFilesLog.map(file => file.name);
    var newLog: Array<string> = files.map(file => file.name);

    additions = files.filter(file => !oldLog.includes(file.name));
    supresions = this.localFilesLog.filter(file => !newLog.includes(file.name));

    // console.log('Additions: ', additions, 'Supresions: ', supresions);
    return {additions: additions, supresions: supresions};
  }

  private checkContentUpdate(files: Array<File>, fileModifications: {additions: Array<File>, supresions: Array<File> }) {
    var oldFilesContents: Array<string> = this.localFilesLog.map(file => file.content);
    
    return files.filter(file => !oldFilesContents.includes(file.content) && !fileModifications.additions.includes(file));
  }

  private existsChanges(fileModifications: {additions: Array<File>, supresions: Array<File> }, fileContentUpdate: Array<File>): boolean {
    return fileModifications.additions.length != 0 || fileModifications.supresions.length != 0 || fileContentUpdate.length != 0;
  }
}