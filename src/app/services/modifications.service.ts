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

    // Idle notifications controller
    this.seconds$.next(this.seconds$.getValue() + 1);

    // Case: File modifications: (create/delete/rename/reubicate)
    fileModifications = this.checkNewFiles(files);

    // Case: File content modification:
    fileContentUpdate = this.checkContentUpdate(files, fileModifications);

    // console.log('File Modifications: \n', fileModifications);
    // console.log('File Content Updates: \n', fileContentUpdate);
    this.localFilesLog = files;

    return {
      additions: fileModifications.additions, 
      supresions: fileModifications.supresions, 
      contentUpdated: fileContentUpdate
    }
  }

  public loadWorkspaceFiles(localWorkspaceLog: Workspace) {
    if (localWorkspaceLog == null) return;
    console.log('ModificationService: Workspace files dowloaded');
    // Reset
    this.localFilesLog = [];
    if (this.localWorkspaceLog != undefined) this.localWorkspaceLog.files = [];

    // Download Workspace Files
    this.localWorkspaceLog = localWorkspaceLog;
    this.localWorkspaceLog.files.forEach(file => this.localFilesLog.push(file));
    // console.log(this.localFilesLog);
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
}