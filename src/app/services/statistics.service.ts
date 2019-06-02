import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { httpOptions, httpWorkspaceOptions } from '../../assets/model/httpOptions'
import { stringify } from '@angular/core/src/util';

// import { backendURL } from '../../assets/configs/backendConfig';

var backendURL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  fileStatistics: BehaviorSubject<Map<string, number>> = new BehaviorSubject(new Map());
  languageStatistics: BehaviorSubject<Map<string, number>> = new BehaviorSubject(new Map());

  constructor(
    public http: HttpClient
  ) { }

  loadFileStatistics(userId: string) {
    this.http.get<Object>(backendURL + '/api/statistics/fileStatistics?id=' + userId, httpOptions)
      .subscribe(statistics => {
        this.fileStatistics.next(new Map(this.xah_obj_to_map(statistics)));
      });
  }

  loadLanguagesStatistics(userId: string) {
    this.http.get<Object>(backendURL + '/api/statistics/languageStatistics?id=' + userId, httpOptions)
      .subscribe(statistics => {
        this.languageStatistics.next(new Map(this.xah_obj_to_map(statistics)));
      });
  }

  xah_obj_to_map = ( obj => {
    const mp = new Map;
    Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
    return mp;
  });
}
