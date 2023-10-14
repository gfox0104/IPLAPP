import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddDamageModel, AddApplianceModel } from '../add-damage/add-damage-model';
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ViewDamageServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.GetDamage;

  public ViewDamageData(Modelobj: AddDamageModel) {
    var ANYDTO: any = {};
    ANYDTO.Damage_pkeyID = Modelobj.Damage_pkeyID;
    ANYDTO.Type = Modelobj.Type;

    if (Modelobj.Damage_pkeyID != 0) {
      ANYDTO.Type = 2;
    }

    var obj = {
      Damage_Type: Modelobj.Damage_Type,
    
      Damage_Int: Modelobj.Damage_Int,
      Damage_Location: Modelobj.Damage_Location,
      Damage_Disc: Modelobj.Damage_Disc,
      Damage_IsActive: Modelobj.Damage_IsActive,
      Damage_CreatedBy : Modelobj.Damage_CreatedBy,
      Damage_ModifiedBy: Modelobj.Damage_ModifiedBy
    };

    ANYDTO.FilterData = JSON.stringify(obj);

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlpost = BaseUrl + environment.Admin.PostApplicant;

  public AddApplianceData(Modelobj: AddApplianceModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.ApplianceMasterDTO = Modelobj.Appliancearr;
    ANYDTO.Appl_Wo_Id = Modelobj.Appl_Wo_Id;
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

  // Add/update UOM filter
  private docpostUrl = BaseUrl + environment.Admin.SaveDamageFilter;
  public AddUpdateFilterAdminDamageData(Modelobj: AddDamageModel) {
    let ANYDTO: any = {};
    ANYDTO.Damage_Filter_PkeyID = Modelobj.Damage_pkeyID;
    ANYDTO.Damage_Filter_DamageName = Modelobj.Damage_Type;
    ANYDTO.Damage_Filter_DamageIntExt = Modelobj.Damage_Int;
    ANYDTO.Damage_Filter_DamageLocation = Modelobj.Damage_Location;
    ANYDTO.Damage_Filter_DamageDesc = Modelobj.Damage_Disc;
    ANYDTO.Damage_Filter_DamageIsActive = Modelobj.Damage_IsActive;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.docpostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

}
