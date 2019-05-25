import { ChatService } from './chat.service';
import { project } from './../../assets/projects/project-info';
import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk'

// Project Imports
import { connectionError } from '../../assets/messages/error';
import { File } from '../../assets/model/file';
import { Workspace, workspaceSnapshotFactory } from 'src/assets/model/workspace';
import { Update, sampleUpdateClass } from 'src/assets/model/update';
import { BehaviorSubject } from 'rxjs';
import { VM } from '@stackblitz/sdk/typings/VM';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class StackBlitzService {
  virtualMachine$: BehaviorSubject<VM>;
  localFiles$: BehaviorSubject<Array<File>> = new BehaviorSubject<Array<File>>(null);
  workspace: Workspace;

  constructor(
    private chatService: ChatService
  ) {
    this.virtualMachine$ = new BehaviorSubject<VM>(null);
    this.chatService.fileEmitter$.subscribe(message => {
      if (message == null || message == undefined) return;
      message.forEach((value: string, key: string) => {
        this.updateFile(key, value);
      })
    })
  }

  createWorkspace(project) {
    sdk.embedProject('editor', project, {
      clickToLoad: false,
      view: 'editor',
      hideNavigation: false,
      forceEmbedLayout: true
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
      console.error("Your Virtualmachine is undefined, refresh the website")
      throw new TypeError;
    }
  }

  createFile(name: string, content?: string) {
    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!')
    }

    if (!content) {
      content = '';
    }

    this.virtualMachine$.value.applyFsDiff({
      create: {
        [name]: content
      },
      destroy: ['']
    });
  }

  deleteFile(name: string) {
    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!')
    }

    this.virtualMachine$.value.applyFsDiff({
      create: { },
      destroy: [name]
    });
  }

  updateFile(fileId: string, content: string) {
    console.log('Updating file: ', fileId, ' with new content: ', content);

    this.virtualMachine$.value.applyFsDiff({ // Comprovar explicació a la documentació!
      create: {
        [fileId]: content
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
        var files: File[] = [];
        var language: string;

        for(var file in snapshot) {
          // console.log(file, snapshot[file], files);
          language = file.split('.').length > 1 ? file.split('.')[1] : 'None';
          files.push(new File(file, undefined, language, snapshot[file]));
        }
        this.localFiles$.next(files);
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

    // console.log('Update file:', update.files[0].name, 'Adding content: ', update.files[0].content);

    this.virtualMachine$.value.applyFsDiff({
      create: {
        [update.files[0].name]: update.files[0].content,
        [update.files[1].name]: update.files[1].content
      },
      destroy: ['']
    });

  }

  refresh(project) {
    sdk.embedProject('editor', project, {
      openFile: 'sampleProject.ts'
    }).then( vm => {
      this.virtualMachine$.next(vm);
    })
  }
}
