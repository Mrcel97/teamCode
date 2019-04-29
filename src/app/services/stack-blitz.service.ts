import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk'

// Project Imports
import { project } from '../../assets/projects/project-info';
import { connectionError } from '../../assets/messages/error';
import { Workspace, workspaceSnapshotFactory } from 'src/assets/model/workspace';
import { Update, sampleUpdateClass } from 'src/assets/model/update';
import { BehaviorSubject } from 'rxjs';
import { VM } from '@stackblitz/sdk/typings/VM'

@Injectable({
  providedIn: 'root'
})
export class StackBlitzService {
  virtualMachine$: BehaviorSubject<VM>;
  workspace: Workspace;

  constructor() {
    this.virtualMachine$ = new BehaviorSubject<VM>(null);
  }

  createWorkspace() {
    sdk.embedProject('editor', project, {
      openFile: 'sampleProject.ts'
    }).then( vm => {
      this.virtualMachine$.next(vm);
    })
  }

  loadGithubWorkspace(repositoryURL: string) {
    sdk.embedGithubProject('editor', repositoryURL, {
      openFile: 'sampleProject.ts'
    }).then( vm => {
      this.virtualMachine$.next(vm);
    })
  }

  vmReady() {
    if (this.virtualMachine$.value == null) {
      throw new TypeError;
    }
  }

  createFile(name: string, language: string, content?: string) {
    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!')
    }

    var file_name = name + '.' + language;
    if (!content) {
      content = `// This file was generated in real time using the StackBlitz Virtual Machine.`;
    }

    this.virtualMachine$.value.applyFsDiff({
      create: {
        [file_name]: content
      },
      destroy: ['']
    });
  }

  getSnapshot() {
    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!');
    }
    
    this.virtualMachine$.value.getFsSnapshot().then(
      snapshot => {
        this.workspace = workspaceSnapshotFactory(snapshot);
        console.log(this.workspace);
      }
    );
  }

  // This function is only to simulate the reception of data modified by another user.
  receiveUpdates() {
    var update = sampleUpdateClass();

    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!')
    }

    console.log('Update file:', update.files[0].name, 'Adding content: ', update.files[0].content);

    this.virtualMachine$.value.applyFsDiff({
      create: {
        [update.files[0].name]: update.files[0].content,
        [update.files[1].name]: update.files[1].content
      },
      destroy: ['']
    });

  }

  refresh() {
    sdk.embedProject('editor', project, {
      openFile: 'sampleProject.ts'
    }).then( vm => {
      this.virtualMachine$.next(vm);
    })
  }
}
