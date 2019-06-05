import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-ide-chat',
  templateUrl: './ide-chat.component.html',
  styleUrls: ['./ide-chat.component.scss']
})
export class IdeChatComponent implements OnInit, OnDestroy {
  userEmail: string;
  messageFromMe = "<div class='messageMe'>";
  messageEnd =  "</div class='messageOthers'>";
  chatOpen = false;
  notifications = false;
  isCollaborator = false;
  authServicesubscription: Subscription;
  chatServicesubscription: Subscription;

  fromMeContainerStyle = 'flex-end';
  fromOthersContainerStyle = 'flex-start';
  fromMeStyles = "style='padding-left: 0.5em; text-align: left; border: solid 2px #009688; border-radius: 5px; width: 12em; align-items: center; margin: 0.5em'";
  fromOthersStyles = "style='padding-left: 0.5em; text-align: left; border: solid 2px #AAAAAA; border-radius: 5px; width: 12em; align-items: center; margin: 0.5em'";

  constructor(
    private authService: AuthService,
    private workspaceService: WorkspaceService,
    private chatService: ChatService
  ) {
    this.authServicesubscription = this.authService.user$.subscribe(user => {
      if (user == null) return;
      this.userEmail = user.email;
      this.workspaceService.localWorkspace.subscribe(workspace => {
        if (workspace == null || this.userEmail == null) return;
        this.isCollaborator = workspace.collaborators.includes(this.userEmail);
      });
    });

    this.hearChatChanges();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.authServicesubscription.unsubscribe();
    this.chatServicesubscription.unsubscribe();
  }

  private hearChatChanges() {
    this.chatServicesubscription = this.chatService.ideChatMessagesEmitter$.subscribe(chatMessage => {
      if (chatMessage == null) return;

      if (chatMessage.content) {
        if (!this.chatOpen) this.notifications = true;
        var containerStyles = (chatMessage.owner == this.userEmail) ? this.fromMeContainerStyle : this.fromOthersContainerStyle;
        var styles = (chatMessage.owner == this.userEmail) ? this.fromMeStyles : this.fromOthersStyles;
        $(".chat").append(`
          <div style='display: flex; justify-content: ` + containerStyles + `'>
            <div>
              <p style='margin: 0.5em 0 -0.5em 0.5em !important; font-size: 12px'>` + chatMessage.owner + `</p>
              <div ` + styles + `>
                <div style='margin: 0 !important; max-width: 12em; overflow: hidden'>`+
                  chatMessage.content +
                `</div>
              </div>
            </div>
          </div>`
        );
      }
    });
  }

  sendMessage(message, event?){
    if ((event == null || event.keyCode == 13) && message != null) {
      this.chatService.sendIdeChatMessage(message);
      $('#input').val('');
    }
  }

  swapChat() {
    this.chatOpen = this.chatOpen ? false : true;
    this.notifications = false;
  }
}
