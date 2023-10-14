import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { LoginModel } from "../../models/login-model";
import { environment } from "../../../environments/environment";
import { EncrDecrService } from '../util/encr-decr.service';
import {ClientPhotoNotificationModel, MenuMasterModel, WoNotificationModel } from '../../pages/user/add-group/add-group-model';

@Injectable({
  providedIn: "root"
})

export class AuthService {
  token: any;
  MenuMasterModelObj: MenuMasterModel = new MenuMasterModel();
  menuList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  userDetail: any;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private baseUrl = environment.domain;
  private GetUserverificatonDetails = this.baseUrl + environment.Login.GetUserViryficationDetails;
  private apiUrlPost = this.baseUrl + environment.Login.PostUserLoginData;
  
  constructor(
    private _http: HttpClient,
    private EncrDecr: EncrDecrService,
  ) {
    if (localStorage.getItem('TOKEN') != null) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.userDetail = JSON.parse(decval)[0];
    }
  }

  public LoginuserPost(loginModel: LoginModel) {
    //debugger
    var anydTo: any = {};
    anydTo.User_LoginName = loginModel.user_LoginName;
    anydTo.User_Password = loginModel.user_Password;
    anydTo.User_Token_val = loginModel.tokendetails;
    anydTo.Type = loginModel.type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .post<any>(this.apiUrlPost, anydTo, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  private apiUrlPOSTForToken = this.baseUrl + "/token";
  public LoginuserGetToken(loginModel: LoginModel) {
    //debugger
    let userData = "username=" + loginModel.user_LoginName + "&password=" + loginModel.user_Password + "&ip=" + loginModel.IP + "&macid=" + loginModel.MacIp + "&device=" + loginModel.User_Acc_Log_Device_Name + "&grant_type=password" ;
    //console.log('test', userData)
    let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded", 'No-Auth': 'True' });
    return this._http
      .post<any>(this.apiUrlPOSTForToken, userData, { headers: headers })
      .pipe(
        tap(data => {
          this.loggedIn.next(true);
          return data;
        })
     
      );
  }

  private apiUrlPOST2 = this.baseUrl + environment.Login.ForgotPassword;
  public ForgotpasswordPost(loginModel: LoginModel) {
    var ANYDTO: any = {};
    ANYDTO.User_LoginName = loginModel.user_LoginNameForgot;
    ANYDTO.User_Source = loginModel.User_Source;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST2, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  // change password;
  private apiUrlPOST3 = this.baseUrl + environment.Login.ChangePassword;

  public ChangepasswordPost(loginModel: LoginModel) {
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = loginModel.user_pkeyID;
    ANYDTO.User_Password = loginModel.user_PasswordNew;
    ANYDTO.User_Token_val = loginModel.tokendetails;
    ANYDTO.User_Token_val = loginModel.User_Token_val;

    ANYDTO.Type = 2;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST3, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
  private apiUrlPOSTc = this.baseUrl + environment.Login.CompanyChangePassword;
  public ChangepasswordPostcompany(loginModel: LoginModel) {
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = loginModel.user_pkeyID;
    ANYDTO.User_Password = loginModel.user_PasswordNew;
    ANYDTO.User_Token_val = loginModel.tokendetails;
    ANYDTO.User_Token_val = loginModel.User_Token_val;

    ANYDTO.Type = 2;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this._http
      .post<any>(this.apiUrlPOSTc, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  public Get_userverificatonDetails(Modelobj: any) {
    var ANYDTO: any = {};
    ANYDTO.UserVerificationID = Modelobj.UserVerificationID;
    ANYDTO.VerificationCode = Modelobj.VerificationCode;
    ANYDTO.User_LoginName = Modelobj.User_LoginName;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.GetUserverificatonDetails, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('TOKEN'));
    this.loggedIn.next(token ? true : false);
    return token ? true : false;
  }

  public isAccess(): boolean {
    var groupRoleId;
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      var decuser = JSON.parse(decval);
      var user = decuser;
      groupRoleId = user[0].GroupRoleId;
    }

    return groupRoleId === 1 ? true : false;
  }

  public getUserDetail(): any {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      var decuser = JSON.parse(decval);
      this.userDetail = decuser[0];
    }

    return this.userDetail || null;
  }

  public groupRole(): number {
    let groupRoleId;
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      var decuser = JSON.parse(decval);
      groupRoleId = decuser[0].GroupRoleId;
    }

    return groupRoleId;
  }

  public getUserName(): string {
    return this.userDetail.User_FirstName + " " + this.userDetail.User_LastName;
  }

  public logout() {
    //debugger
    localStorage.clear();
    this.loggedIn.next(false);
  }

  private apilogoutUrl = this.baseUrl + environment.Login.UserAccessLogLogout;
  public AddUserAccessLogLogoutPost() {
    //debugger
    var ANYDTO: any = {};

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apilogoutUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          this.loggedIn.next(false);
          return data;
        }),
      );
  }

  private apiUrlGet = this.baseUrl + environment.Admin.GetWorkorderNotification;

  public GetWoNotificationData(Modelobj: WoNotificationModel) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    var ANYDTO: any = {};
    ANYDTO.WN_Pkey_Id = Modelobj.WN_Pkey_Id;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  private apiPhotoNotificationUrlGet = this.baseUrl + environment.GetDownloadNotification;

  public GetPhotoDownloadNotificationData(Modelobj: ClientPhotoNotificationModel) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    var ANYDTO: any = {};
    ANYDTO.PN_Pkey_Id = Modelobj.PN_Pkey_Id;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiPhotoNotificationUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
  
  private apiUrlUpdate = this.baseUrl + environment.Admin.AddUpdateWorkorderNotification;

  public AddUpdateWorkorderNotificationData(Modelobj: WoNotificationModel) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    var ANYDTO: any = {};
    ANYDTO.WN_Pkey_Id = Modelobj.WN_Pkey_Id;
    ANYDTO.WN_IsRead = Modelobj.WN_IsRead;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlUpdate, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
}
