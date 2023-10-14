import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddUOMModel } from './add-UOM-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: "root"
})

export class AddUOMServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  private apiUrlPOST = BaseUrl + environment.Admin.PostUom;

  public UOMDataPost(Modelobj: AddUOMModel) {
    var ANYDTO: any = {};
    ANYDTO.UOM_pkeyId = Modelobj.UOM_pkeyId;
    ANYDTO.UOM_Name = Modelobj.UOM_Name;
    ANYDTO.UOM_IsActive = Modelobj.UOM_IsActive;
    ANYDTO.UOM_IsDelete = Modelobj.UOM_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;


    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.UOM_pkeyId != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.UOM_IsDelete) {
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