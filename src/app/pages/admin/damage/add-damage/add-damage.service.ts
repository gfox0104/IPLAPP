import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddDamageModel } from './add-damage-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class AddDamageServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostDamage;

  public AddDamageDataPost(Modelobj: AddDamageModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Damage_pkeyID = Modelobj.Damage_pkeyID;
    ANYDTO.Damage_Type = Modelobj.Damage_Type;
    ANYDTO.Damage_Int = Modelobj.Damage_Int;
    ANYDTO.Damage_Location = Modelobj.Damage_Location;
    ANYDTO.Damage_Qty = Modelobj.Damage_Qty;
    ANYDTO.Damage_Estimate = Modelobj.Damage_Estimate;
    ANYDTO.Damage_Disc = Modelobj.Damage_Disc;
    ANYDTO.Damage_IsActive = Modelobj.Damage_IsActive;
    ANYDTO.Damage_IsDelete = Modelobj.Damage_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;

    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Damage_pkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Damage_IsDelete) {
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

  private apiUrlDelte = BaseUrl + environment.Admin.DeletePreset;
  public PreTextDeleteDataPost(Modelobj: AddDamageModel) {
    let ANYDTO: any = {};
    ANYDTO.Damage_Preset_pkeyId = Modelobj.Damage_Preset_pkeyId;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlDelte, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
