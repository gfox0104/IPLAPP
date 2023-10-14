import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { IplLoginModel } from "./ipl-login-model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class IplLoginService {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOSTForToken =  BaseUrl + "/token";  
  public LoginuserGetToken(loginModel: IplLoginModel) {
    let userData = "username=" + loginModel.LoginName + "&ClientName=" + loginModel.ClientName +"&grant_type=password" ;
    //console.log('param',userData)
    let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded",'No-Auth':'True' });
    return this._http
      .post<any>(this.apiUrlPOSTForToken, userData, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
    }
  private apiUrlPost = BaseUrl + environment.Login.PostUserLoginData;
  public LoginuserPost(loginModel: IplLoginModel) {
    //debugger
    var anydTo: any = {};
    anydTo.User_LoginName = loginModel.LoginName;
    anydTo.User_Password = loginModel.user_Password;
    anydTo.User_Token_val = loginModel.tokendetails;
    anydTo.Type = 3;
    anydTo.IsAdminLogin = true;
     
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
}
