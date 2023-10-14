import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, throwError } from 'rxjs'
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from "rxjs/operators";

import { BindChatDataModel } from './message-wo-model';
import { environment } from 'src/environments/environment';
import { HomepageServices } from '../../home/home.service';
import { WorkOderViewModel } from '../../work-order/work-order-view/work-order-view-model';

@Injectable({
  providedIn: 'root'
})

export class WoMessageService {
  private token: any;
  baseUrl = environment.domain;
  currentMessage = new BehaviorSubject(null);
  public unreadCounts: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private angularFireMessaging: AngularFireMessaging,
    private xHomepageServices: HomepageServices, private _http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        //console.log('notify token', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        //console.log("new message received. ", payload);
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

  public async ChatFileUpLoad(Modelobj: BindChatDataModel) {
    var StrEditDTO: any = {};
    StrEditDTO.docx = Modelobj.documentx;
    var data = new FormData();
    const pkeyId = Modelobj.Common_pkeyID.toString();// work order nmber
    let ANYDTO: any = {};
    ANYDTO.Client_Result_Photo_Ch_ID = 0;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Chat_FileName;
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.Chat_FilePath;
    ANYDTO.Client_Result_Photo_ID = 0;
    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.Client_Result_Photo_StatusType = Modelobj.Chat_File_StatusType;
    ANYDTO.Client_Result_Photo_Type = 1;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString();// work order nmber;
    ANYDTO.IPLNO = Modelobj.IPLNO;;
    if (StrEditDTO.docx.type.startsWith("image")) {
      ANYDTO.Client_PageCalled = 9;
      ANYDTO.ContentType = 1; // 1 for Image 2 for Doc
      const Image = await this.readFile(StrEditDTO.docx, 640, 480);
      ANYDTO.Image = Image;
    }
    else if (StrEditDTO.docx.type.startsWith("application")) {
      ANYDTO.ContentType = 2; // 1 for Image 2 for Doc
      ANYDTO.Client_PageCalled = 9;
      const doc = await this.readDoc(StrEditDTO.docx);
      ANYDTO.Image = doc;
    }
    ANYDTO.ReqType = 1;  // 1 for Desktop 2 for Mobile
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
    ANYDTO.Wo_Office_Doc_Company_Id = 0;
    ANYDTO.Folder_File_Master_FKId = 0;
    ANYDTO.Wo_Msg_Doc_Processor_ID = Modelobj.Processor;
    ANYDTO.Wo_Msg_Doc_Contractor_ID = Modelobj.Contractor;
    ANYDTO.Wo_Msg_Doc_Cordinator_ID = Modelobj.Cordinator;
    ANYDTO.Wo_Msg_Doc_Client_ID = Modelobj.Customer_Number;
    ANYDTO.Wo_Msg_Doc_IPLNO = Modelobj.IPLNO;

    const uploadapi = environment.cloudUrl + 'upload';
    //
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
      tap(data => {
        return data;
      }),
      catchError(
        this.handleError)
    );
  }

  public async getChatFileDetails(Modelobj: BindChatDataModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Wo_Msg_Doc_PkeyId = Modelobj.Chat_File_Ch_ID;
    ANYDTO.Wo_Msg_Doc_Wo_ID = Modelobj.Common_pkeyID;
    ANYDTO.Wo_Msg_Doc_Company_Id = 0;
    ANYDTO.Type = 2;
    const apiUrlget = this.baseUrl + environment.ClientResult.GetIPLChatFile;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(apiUrlget, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public allWorkOrderData(Modelobj: WorkOderViewModel) {
    const apiUrlGet = this.baseUrl + environment.ClientResult.GetAllWorkOrderData;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body: any = {};
    body.workOrder_ID = Modelobj.workOrder_ID;
    body.UserID = Modelobj.UserID;
    body.Type = 1;
    return this._http
      .post<any>(apiUrlGet, body, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
  // get user data
  public WorkorderViewPostData(Modelobj: WorkOderViewModel, Skip: number, Take: number) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.Skip = Skip;
    ANYDTO.Take = Take;
    const apiUrlget = this.baseUrl + environment.ClientResult.GetmessageWOData;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(apiUrlget, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
  // get user data
  public getWorkOrderOnSearch(Modelobj: WorkOderViewModel, SearchStr: string) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.SearchStr = SearchStr;
    const apiUrlget = this.baseUrl + environment.ClientResult.GetWorkOrderDataOnSearch;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(apiUrlget, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  public readFile(file, w, h) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = () => {
        const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');

        // set its dimension to target size
        canvas.width = w;
        canvas.height = h;

        const image = new Image();
        image.src = fr.result.toString();
        image.onload = function () {
          // draw source image into the off-screen canvas:
          ctx.drawImage(image, 0, 0, w, h);
          resolve(canvas.toDataURL());
        }
      }

      fr.readAsDataURL(file);
    });
  }
  // common handler
  private handleError(error: HttpErrorResponse) {
    //dfebugger;
    if (error.status == 401) {
      alert('Unauthorized User...');
      window.location.href = '/admin/login';
    } else {
      alert("Invalid Request...");
    }

    // return an observable wi bad happenedth a user-facing error message
    return throwError("Something's wrong, please try again later...");
  }

  public readDoc(file) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = () => {
        resolve(fr.result);
      }

      fr.readAsDataURL(file);
    });
  }

}
