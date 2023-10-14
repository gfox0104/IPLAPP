import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PushMessageService {

  currentMessage = new BehaviorSubject(null);

  constructor(public angularFireMessaging: AngularFireMessaging) {

    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      })
  }


  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        localStorage.setItem("push_notification_token",token)
        console.log(token);
      });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (msg) => {
        console.log("show message!", msg);
        this.currentMessage.next(msg);
      })
  }
}

