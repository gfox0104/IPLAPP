import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from 'firebase/app';
import md5 from "md5";

@Component({
  selector: 'iplapp-chat-box',
  template: `
              <div class="row">
                <div class="col-11">
                  <textarea class="box" placeholder="Type message.." [(ngModel)]='messages' name="msg"></textarea>
                </div>
                <div class="col-1">
                  <button type="submit" (click)="SentMessage(messages)" class="btn btn-primary" [disabled]="messages.length === 0"
                    style="text-align: right">Send</button>
                </div>
              </div>
            `,
  styles: [`
              .wrapper {
                
              }
              .box {
                border: 1px solid #73AD21;
                border-radius: 5px;
                width: 100%;
                height: 100px;
              }
              textarea:focus {
                outline: none;
                border: 2px solid #73AD21 !important;
                border-radius: 5px !important;
              }
            `
  ]
})

export class IplAppChatBox {
  @Input() IPLNO;
  @Input() workOrderId;
  @Output() setLastUpdate = new EventEmitter();

  decuserr: any;
  messages: string = '';

  constructor(
    private xdatabase: AngularFireDatabase,
    private EncrDecr: EncrDecrService
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuserr = JSON.parse(decval);
      // console.log('user data:', this.decuserr);
    }
  }

  async SentMessage(text) {
    let name = this.decuserr[0].User_FirstName + " " + this.decuserr[0].User_LastName;

    this.messages = text;
    let messageRef = this.xdatabase.database.ref("messages");
    if (this.messages.length > 0) {
      if (localStorage.getItem('UserName') != '') {
        let logged_in_user = localStorage.getItem('UserName');
        let messageId = (await messageRef.push()).key;
        let message = {
          message: this.messages,
          from: logged_in_user,
          time: firebase.database.ServerValue.TIMESTAMP,
          // avatar: `http://gravatar.com/avatar/${md5(logged_in_user)}?d=identicon`,
          avatar: '',
          name: name,
          threadtype: 'contractor',
          threadid: this.workOrderId + '_contractor'
        }

        messageRef
          .child(this.IPLNO)
          .child(messageId)
          .update(message)
          .then(() => console.log("Message added"))
          .catch((err) => console.error("Error while entering text: ", err));

        this.setLastUpdate.emit();
      }
    }

    this.messages = '';
  }
}
