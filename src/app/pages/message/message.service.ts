import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, throwError } from 'rxjs';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { HomepageServices } from '../../pages/home/home.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  BindChatDataModel,
  MessageWorkOrder,
  ViewUserModel,
} from './message-model';
import { WorkOderViewModel } from '../work-order/work-order-view/work-order-view-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import * as admin from 'firebase/app';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private token: any;
  baseUrl = environment.domain;
  currentMessage = new BehaviorSubject(null);
  public unreadCounts: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public unreadCounts_workOrder: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public unreadCounts_MessageNotification: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public unread_Message: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  subscribe: any;

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private xHomepageServices: HomepageServices,
    private _http: HttpClient
  ) {
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
    this.angularFireMessaging.messages.subscribe((payload) => {
      //console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
  }

  setUnreadCounts(counts) {
    //debugger
    this.unreadCounts.next(counts);
  }

  private apiUrlGet = 'https://fcm.googleapis.com/fcm/send';
  public SendPushNotification(message, user_name, notify_token) {
    // debugger;
    var ANYDTO: any = {};
    ANYDTO = JSON.stringify({
      notification: {
        body: message,
        title: user_name,
      },
      to: notify_token,
    });

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append(
      'Authorization',
      `key=${environment.pushNotification.AuthorizationToken}`
    );
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public async ChatImageUpLoad(Modelobj: BindChatDataModel) {
    //debugger;
    var StrEditDTO: any = {};

    StrEditDTO.docx = Modelobj.documentx;
    var data = new FormData();
    const pkeyId = Modelobj.Common_pkeyID.toString(); // work order nmber
    let ANYDTO: any = {};
    ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Client_Result_Photo_StatusType = Modelobj.Chat_File_StatusType;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString(); // work order nmber;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Chat_FileName;
    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.Client_Result_Photo_Type = 1;

    if (Modelobj.Chat_FileName == null) {
      ANYDTO.Client_Result_Photo_FileName = StrEditDTO.docx.name;
    }
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.Chat_FilePath;
    ANYDTO.Type = Modelobj.Type;

    ANYDTO.Image = StrEditDTO.docx;

    ANYDTO.ReqType = 1; // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 1;
    ANYDTO.Client_Result_Photo_Ch_ID = 0;
    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    if (Modelobj.Client_PageCalled == 11) {
      ANYDTO.Client_PageCalled = 11;
    } else {
      ANYDTO.Client_PageCalled = 9;
    }

    ANYDTO.Client_Result_Photo_GPSLatitude = 54.43553989213321;
    ANYDTO.Client_Result_Photo_GPSLongitude = 28.73842144012451;
    ANYDTO.Client_Result_Photo_GPSAltitude = 3.5415;
    ANYDTO.Client_Result_Photo_Model = 'Model';
    ANYDTO.Client_Result_Photo_Make = 'Make';
    ANYDTO.Client_Result_Photo_DateTimeOriginal = '2010:10:10 10:10:10';
    ANYDTO.Rating = 4;
    ANYDTO.ExposureTime = [1, 2618];
    ANYDTO.ISOSpeedRatings = [100];
    ANYDTO.Saturation = 0;
    ANYDTO.Sharpness = 0;
    ANYDTO.Contrast = 0;
    ANYDTO.MeteringMode = 5;
    ANYDTO.Flash = 24;
    ANYDTO.MaxApertureValue = [169, 100];
    ANYDTO.FocalLength = [24, 5];
    ANYDTO.FocalLengthIn35mmFilm = 10;
    ANYDTO.ShutterSpeedValue = [114234, 10061];

    const uploadapi = environment.cloudUrl + 'uploadChatImage';
    // const uploadapi = 'http://localhost:3000/upload';
    const ImageLg = await this.readFile(StrEditDTO.docx, 1024, 768);
    const Image = await this.readFile(StrEditDTO.docx, 640, 480);
    const ImageSm = await this.readFile(StrEditDTO.docx, 320, 240);
    ANYDTO.Image = Image;
    ANYDTO.ImageSm = ImageSm;
    ANYDTO.ImageLg = ImageLg;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  public async ChatFileUpLoad(Modelobj: BindChatDataModel) {
    //debugger;
    const StrEditDTO: any = {};
    StrEditDTO.docx = Modelobj.documentx;
    const pkeyId = Modelobj.workOrderNumber.toString();
    const ANYDTO: any = {};

    ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Client_Result_Photo_StatusType = Modelobj.Chat_File_StatusType;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString(); // work order nmber;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Chat_FileName;
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.Chat_FilePath;
    ANYDTO.Client_Result_Photo_IsActive = true;
    ANYDTO.Client_Result_Photo_Type = 1;

    ANYDTO.Client_PageCalled = 9;
    ANYDTO.Client_Result_Photo_Ch_ID = 0;
    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;

    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Image = StrEditDTO.docx;
    ANYDTO.ReqType = 1; // 1 for Desktop 2 for Mobile

    if (StrEditDTO.docx.type.startsWith('image')) {
      ANYDTO.ContentType = 1;
    } else if (StrEditDTO.docx.type.startsWith('application')) {
      ANYDTO.ContentType = 2; // 1 for Image 2 for Doc
    }

    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + `${this.token}`,
    });

    if (ANYDTO.ContentType == 2 || ANYDTO.ContentType == 1) {
      const uploadapi = environment.cloudUrl + 'uploadChatImage';
      const formData = new FormData();
      var data = JSON.stringify(ANYDTO);
      formData.append('ANYDTO', 'anydto');
      formData.append('xyz', data);

      formData.append(
        'videoFile',
        ANYDTO.Image,
        ANYDTO.Client_Result_Photo_FileName
      );
      //console.log('request packet', ANYDTO, formData)
      return this._http
        .post<any>(uploadapi, formData, { headers: headers })
        .pipe(
          tap((data) => {
            //debugger;
            return data;
          }),
          catchError(this.handleError)
        );
    }
  }

  public async getChatFileDetails(Modelobj: BindChatDataModel) {
    var ANYDTO: any = {};
    ANYDTO.Wo_Msg_Doc_PkeyId = Modelobj.Chat_File_Ch_ID;
    ANYDTO.Wo_Msg_Doc_Wo_ID = Modelobj.Common_pkeyID;
    ANYDTO.Wo_Msg_Doc_Company_Id = 0;
    ANYDTO.Type = 2;
    const apiUrlget = this.baseUrl + 'api/WOMessage/GetIPLChatFile';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(apiUrlget, ANYDTO, { headers: headers }).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  // save message work order
  private apiUrlcon =
    BaseUrl + environment.ClientResult.GetMessageWorkOrderUser;
  public SaveMessageModelData(Modelobj: MessageWorkOrder) {
    //debugger;
    //console.log('arr',Modelobj)
    var ANYDTO: any = {};
    ANYDTO.MWU_pkeyID = Modelobj.MWU_pkeyID;
    ANYDTO.MWU_User_ID = Modelobj.MWU_User_ID;
    ANYDTO.MWU_workOrder_ID = Modelobj.MWU_workOrder_ID;
    ANYDTO.MWU_IsRead = Modelobj.MWU_IsRead;
    ANYDTO.MWU_Role = Modelobj.MWU_Role;
    ANYDTO.lstmessage_Admin_UserDTO = Modelobj.lstmessage_Admin_UserDTO;

    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlcon, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public allWorkOrderData(Modelobj: WorkOderViewModel) {
    const apiUrlGet = this.baseUrl + 'api/WOMessage/GetAllWorkOrderData';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body: any = {};
    body.workOrder_ID = Modelobj.workOrder_ID;
    body.UserID = Modelobj.UserID;
    body.Type = 1;
    return this._http.post<any>(apiUrlGet, body, { headers: headers }).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  // get user data
  public WorkorderViewPostData(
    Modelobj: WorkOderViewModel,
    Skip: number,
    Take: number
  ) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.Skip = Skip;
    ANYDTO.Take = Take;
    const apiUrlget = this.baseUrl + 'api/WOMessage/GetWorkOrderData';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(apiUrlget, ANYDTO, { headers: headers }).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  // get user data
  public getWorkOrderOnSearch(Modelobj: WorkOderViewModel, SearchStr: string) {
    // debugger;
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.SearchStr = SearchStr;
    const apiUrlget = this.baseUrl + 'api/WOMessage/GetWorkOrderDataOnSearch';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(apiUrlget, ANYDTO, { headers: headers }).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  // add document for mutiple client phtotos

  public readFile(file, w, h) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      };

      fr.onloadend = async () => {
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
          resolve(canvas.toDataURL('image/jpeg'));
        };
      };

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
      alert('Invalid Request...');
    }

    // return an observable wi bad happenedth a user-facing error message
    return throwError("Something's wrong, please try again later...");
  }

  public readDoc(file) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      };

      fr.onloadend = () => {
        resolve(fr.result);
      };

      fr.readAsDataURL(file);
    });
  }

  //delete work type cat
  private apiUrldel = BaseUrl + environment.Admin.DeleteWorkType;

  public DeleteWorkCategoryPOPUP(Modelobj1) {
    var ANYDTO: any = {};
    ANYDTO.MWU_pkeyID = Modelobj1.MWU_pkeyID;
    ANYDTO.Type = Modelobj1.Type;
    ANYDTO.MWU_IsActive = Modelobj1.MWU_IsActive;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrldel, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlgetuserdata =
    BaseUrl + environment.ClientResult.GetMessageAdminUser;
  public getUserModelData(Modelobj: ViewUserModel) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.MWU_workOrder_ID = Modelobj.MWU_workOrder_ID;
    ANYDTO.Type = 1; //Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlgetuserdata, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          // console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }
  // get Wo list for left bar of message page
  public MsgWorkorderLeftBarData(Modelobj: WorkOderViewModel) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    const apiUrlget =
      this.baseUrl + 'api/WOMessage/GetMessageWorkOrderListData';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(apiUrlget, ANYDTO, { headers: headers }).pipe(
      tap((data) => {
        return data;
      })
    );
  }

  // Send Message Notification.
  public SendMessageNotoficationData(Modelobj: WorkOderViewModel) {
    // debugger;
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.Type = 6;
    const apiUrlget = this.baseUrl + 'api/WOMessage/SendMessageNotofication';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(apiUrlget, ANYDTO, { headers: headers }).pipe(
      tap((data) => {
        return data;
      })
    );
  }
  SendEmailNotification(emaiilto, subject, body, attachments) {
    if (attachments != null && attachments!="" && attachments!=undefined) {
      admin
        .firestore()
        .collection('mail')
        .add({
          to: emaiilto,
          message: {
            subject: subject,
            html: "<h3>attachments</h3>",
            attachments: [
              {
                path: attachments,
              },
            ],
          },
        });
    } else {
      admin
        .firestore()
        .collection('mail')
        .add({
          to: emaiilto,
          message: {
            subject: subject,
            html: body,
          },
        });
    }
  }

  //Message Read functionality 23-09-2022 by Mahipatsinh
  SetMessageReadStatus(groupRoleID,message:any){
    if(groupRoleID==1)
    {
      message.readByAdmin=true;
    }
    else if(groupRoleID==2)
    {
      message.readByContractor=true;
    }
    else if(groupRoleID==3)
    {
      message.readByCoordinator=true;
    }
    else if(groupRoleID==4)
    {
      message.readByProcessor=true;
    }
    else if(groupRoleID==5)
    {
      message.readByClient=true;
    }
  }
  setUnreadCounts_ForWorkOrder(counts) {
    //debugger
    this.unreadCounts_workOrder.next(counts);
  }
  setUnreadMessageNotification(msgobj) {
    //debugger
    this.unreadCounts_MessageNotification.next(msgobj);
  }
}
