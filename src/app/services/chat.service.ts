import { AuthService } from './auth.service';
import { Workspace } from '../../assets/model/workspace';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { StackBlitzService } from './stack-blitz.service';

import { WriteRequestData, generateRequests } from 'src/assets/model/writeRequestData';
import { httpWorkspaceOptions } from '../../assets/model/httpOptions';
// import  { backendSocketURL, backendURL } from '../../assets/configs/backendConfig';

var ENCODING = 'utf8';
var backendURL = 'http://localhost:8080';
var backendSocketURL = 'http://localhost:8080/socket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient;
  private message: BehaviorSubject<string> = new BehaviorSubject('');
  private messageContent: string;
  private userUID: String = 'None';
  private userEmail: String = 'Nonne';
  private roomID: String = '';

  public requestEmitter$: BehaviorSubject<WriteRequestData> = new BehaviorSubject<WriteRequestData>(null);
  public fileEmitter$: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(new Map()); // fileKey, fileContent
  public actionEmitter$: BehaviorSubject<{file:string, action:string, content?:string}> = 
    new BehaviorSubject<{file:string, action:string, content?:string}>({file: null, action: null, content:null}); // fileKey, fileAction

  constructor(
    public http: HttpClient,
    public authService: AuthService,
    ) {
      this.authService.user$.subscribe(user => {
        if (user != null && user != undefined) {
          this.userUID = user.uid;
          this.userEmail = user.email;
        }
      })
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(backendSocketURL);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = false;

    this.stompClient.connect({'UserID': this.userUID}, () => {
      this.stompClient.subscribe("/chat/" + this.roomID, (message) => { // TODO: Create a STOP MESSAGE Model
        if (message.body || message.body === "") {
          (message.headers.writer) ? this.receiveRequests(message) : 
            (message.headers.UserID != this.userUID && message.headers.action) ? this.receiveActions(message) :  
              message.headers.UserID != this.userUID ? this.receiveMessage(message) : null;
        }
      });
    });
    return this.message;
  }

  sendMessage(message, fileId: string, writer: boolean, action = '') {
    if (!writer) return console.log('Not allowed to send :(');

    this.messageContent = message;
    if(!message) message = '\0';
    // DEBUG: console.log('New message, content: ', message, ' fileId: ', fileId);
    this.stompClient.send("/app/send/message", {
      'UserID':this.userUID, 
      'room_id':this.roomID, 
      'file_id':fileId,
      'action':action
    }, message);
  }

  saveSendMessage(message) {
    if(!message) message = '\0';
    localStorage.setItem('sndMessage', message);
  }

  loadMessages() { // EXTRA FEATURE: Save not send written text locally so we don't lose it if we refresh
    localStorage.length > 0 ? this.message.next(localStorage.getItem('sndMessage')) : null;
    localStorage.clear();
  }

  setUserUID(userUID: String) {
    this.userUID = userUID;
  }

  setRoomID(roomID: String) {
    this.roomID = roomID;
  }

  private receiveMessage(message) {
    if (message !== this.messageContent) {
      this.message.next(message.body);
    }
    
    this.fileEmitter$.next(this.fileEmitter$.getValue().set(message.headers.file_id, message.body));
  }

  sendWriteRequest(writeRequestData: WriteRequestData) {
    writeRequestData.requests && writeRequestData.generateJsonRequests();

    this.stompClient.send("/app/send/request", {
      'UserID':this.userUID,
      'room_id':this.roomID,
      'writer':writeRequestData.writer
    }, JSON.stringify(writeRequestData));
  }

  private receiveRequests(message) {
    var writeRequestData: WriteRequestData = JSON.parse(message.body);

    writeRequestData.writer = (message.headers.writer == "true") ? true : false;
    writeRequestData.requests = writeRequestData.jsonRequests && generateRequests(writeRequestData.jsonRequests);
    this.requestEmitter$.next(writeRequestData);
    // var localRequests = JSON.parse(requests.body)
    // this.localWriteRequests.next(localRequests);
  }

  private receiveActions(message) {
    this.actionEmitter$.next({file:message.headers.file_id, action:message.headers.action, content:message.body});
  }

  private getMinY(map: Map<string, Number>) {
    var mapMin: [string, number] = ['', new Date().getTime()];
    map.forEach( (val: number, key: string) => mapMin = (val != 0) && (mapMin[1] - val >= 0) ? [key, val] : mapMin);
    return mapMin;
  }
}