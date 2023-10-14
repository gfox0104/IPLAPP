
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseUrl, CloudUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { UserProfileModel } from './user-profile-model'
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class UserProfileService {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }


  private apiUrl = BaseUrl+ environment.Login.GetUserProfile;
  public GetUserProfileData(Modelobj: UserProfileModel) {
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    ANYDTO.Type = 5;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrl, ANYDTO, { headers: headers })
      .pipe(tap(data => {
        return data;
      }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlpost = BaseUrl+ environment.Login.UpdateProfile;

  public UpdateUserProfileData(Modelobj: UserProfileModel) {
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    ANYDTO.User_FirstName = Modelobj.User_FirstName;
    ANYDTO.User_LastName = Modelobj.User_LastName;
    ANYDTO.User_LoginName = Modelobj.User_LoginName;
    ANYDTO.User_Password = Modelobj.User_Password;
    ANYDTO.User_CellNumber = Modelobj.User_CellNumber;
    ANYDTO.User_CompanyName = Modelobj.User_CompanyName;
    ANYDTO.User_ImagePath = Modelobj.User_ImagePath;
    ANYDTO.User_Token_val = Modelobj.User_Token_val;
    ANYDTO.User_Address = Modelobj.User_Address;
    ANYDTO.User_City = Modelobj.User_City;
    ANYDTO.User_Zip = Modelobj.User_Zip;
    ANYDTO.User_State_strval = Modelobj.User_State_strval;
    ANYDTO.User_Email = Modelobj.User_Email;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 8;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrlpost, ANYDTO, { headers: headers })
      .pipe(tap(data => {
        return data;
      }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  /// image upload
  public readFile(file, w, h) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = () => {
        const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;

        const image = new Image();
        image.src = fr.result.toString();
        image.onload = function () {
          ctx.drawImage(image, 0, 0, w, h);
          resolve(canvas.toDataURL());
        }
      }

      fr.readAsDataURL(file);
    });
  }

  public async ImageUpdate(Modelobj: UserProfileModel) {
    let ANYDTO: any = {};
    ANYDTO.IPLNO = 'User_Profile';
    ANYDTO.Client_Result_Photo_StatusType = 1;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Filedata.name;
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.User_ImagePath;
    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.Client_Result_Photo_Type = 1;
    ANYDTO.ReqType = 2;
    ANYDTO.ContentType = 3;
    ANYDTO.Image = Modelobj.Filedata;
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    ANYDTO.User_FirstName = Modelobj.User_FirstName;
    ANYDTO.User_LastName = Modelobj.User_LastName;
    ANYDTO.User_LoginName = Modelobj.User_LoginName;
    ANYDTO.User_Password = Modelobj.User_Password;
    ANYDTO.User_CellNumber = Modelobj.User_CellNumber;
    ANYDTO.User_CompanyName = Modelobj.User_CompanyName;
    ANYDTO.User_Address = Modelobj.User_Address;
    ANYDTO.User_City = Modelobj.User_City;
    ANYDTO.User_Zip = Modelobj.User_Zip;
    ANYDTO.User_State_strval = Modelobj.User_State_strval;
    ANYDTO.User_Email = Modelobj.User_Email;
    ANYDTO.Type = 8;

    const uploadapi = CloudUrl + 'upload';
    const ImageLg = await this.readFile(Modelobj.Filedata, 1024, 768);
    const Image = await this.readFile(Modelobj.Filedata, 640, 480);
    const ImageSm = await this.readFile(Modelobj.Filedata, 320, 240);
    ANYDTO.Image = Image;
    ANYDTO.ImageLg = ImageLg;
    ANYDTO.ImageSm = ImageSm;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }
}
