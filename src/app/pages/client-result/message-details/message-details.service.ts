import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HomepageServices } from '../../home/home.service';
import { catchError, tap } from "rxjs/operators";
import { environment } from '../../../../environments/environment';
import { MessageModelData } from './message-details-model';


@Injectable()
export class MessagingDetailsService {
  private token: any;
  baseUrl = environment.domain;
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging,
    private xHomepageServices: HomepageServices, private _http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // console.log('notify token', token);
      },
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.currentMessage.next(payload);
      })
  }

  private apiUrlGet = "https://fcm.googleapis.com/fcm/send";
  public Sendnotification(message, user_name, notify_token) {
    var ANYDTO: any = {};
    ANYDTO = JSON.stringify({
      notification: {
        body: message,
        title: user_name
      },
      to: notify_token
    })

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'key=AAAA_w6Do08:APA91bGbb0ZGirLKgR5Yhi1LkHO6GjJpPrMtVuJ4YR8d5nGKIUU8AVSqFXRBbObQ5yvHAMamZfZ7zpcA5RjtebfxRBOru9_9c-o6Pe-0QRkZmja4BC6pETfqbN7r3Q4XPzdslozn-Rx2')
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //store msge data in sql
  private apiUrlpost = this.baseUrl + environment.ClientResult.PostUserMessage;
  public WorkorderMessagePost(Modelobj: MessageModelData) {
    var ANYDTO: any = {};

    ANYDTO.Msg_PkeyId = Modelobj.Msg_PkeyId;
    ANYDTO.Msg_Wo_Id = Modelobj.Msg_Wo_Id;
    ANYDTO.Msg_From_UserId = Modelobj.Msg_From_UserId;
    ANYDTO.Msg_To_UserId = Modelobj.Msg_To_UserId;
    ANYDTO.Msg_Message_text = Modelobj.Msg_Message_text;
    ANYDTO.Msg_Time = Modelobj.Msg_Time;
    ANYDTO.Msg_Status = Modelobj.Msg_Status;
    ANYDTO.Msg_Message_Id = Modelobj.Msg_Message_Id;
    ANYDTO.Msg_IsActive = Modelobj.Msg_IsActive;
    ANYDTO.Msg_IsDelete = Modelobj.Msg_IsDelete;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlpost, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}