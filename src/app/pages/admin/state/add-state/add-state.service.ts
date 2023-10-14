import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddStateModel } from './add-state-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment}from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})
export class AddStateServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostState;

  public StateDataPost(Modelobj: AddStateModel) {
    let ANYDTO: any = {};
    ANYDTO.IPL_StateID = Modelobj.IPL_StateID;
    ANYDTO.IPL_StateName = Modelobj.IPL_StateName;
    ANYDTO.IPL_State_IsActive = Modelobj.IPL_State_IsActive;
    ANYDTO.IPL_IsDelete = Modelobj.IPL_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;

  
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.IPL_StateID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.IPL_IsDelete) {
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
