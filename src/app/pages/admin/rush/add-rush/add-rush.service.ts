import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddRushModel } from './add-rush-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class AddRushServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.PostRushes;

  public RushDataPost(Modelobj: AddRushModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.rus_pkeyID = Modelobj.rus_pkeyID;
    ANYDTO.rus_Name = Modelobj.rus_Name;
    ANYDTO.rus_IsActive = Modelobj.rus_IsActive;
    ANYDTO.IPL_IsDelete = Modelobj.rus_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
  
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.rus_pkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.rus_IsDelete) {
        ANYDTO.Type = 4;
      }
    }
    else{
      ANYDTO.Type = 3;
    } 

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
