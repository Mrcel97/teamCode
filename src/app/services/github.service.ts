import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { File, fileFactory } from '../../assets/model/file';
import { userFactory } from '../../assets/model/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  obtainGithubFile(fileURL: string): Subject<File> {
    var file: Subject<File> = new Subject();
    var fileId: number = 0; // TODO
    var userId: string = '1'; // TODO

    var fileData = this.parseGithubURL(fileURL);
    
    this.http.get(fileData.apiUrl, {responseType: 'text'}).subscribe(
      response => {
        file.next(
          fileFactory(
            fileData.file_name,
            userFactory(userId, fileData.owner),
            response
          )
        )
      },
      err => {
        alert('The file URL provided was incorrect. Please check it and be sure this isn\'t a folder');
      }
    );
    return file;
  }

  private parseGithubURL(url: string) {
    var owner: string;
    var fileName: string;
    var filePath: string;
    var apiUrl = 'https://raw.githubusercontent.com/';

    var url_content = this.divideURL(url);

    owner = url_content[3];
    fileName = url_content[url_content.length-1];
    filePath = url_content.slice(3).join("/");
    apiUrl = apiUrl.concat(filePath);

    return {owner: owner, file_name: fileName, url: url, apiUrl}
  }

  private divideURL(url: string) {
    var url_content = url.split("/");
    url_content = url_content.filter( function (element) {
      return element != "blob";
    })
    return url_content;
  }
}
