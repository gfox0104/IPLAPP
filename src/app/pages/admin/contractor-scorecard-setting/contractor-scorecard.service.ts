import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ContractorScoreCardSettingModel } from "./contractor-scorecard-model";
import { BaseUrl } from "../../../services/apis/rest-api";
import { HomepageServices } from "../../home/home.service";
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ContractorScoreCardSettingServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostScoreCard;

  public AddContractorScoreCardPost(Modelobj: ContractorScoreCardSettingModel) {
    var ANYDTO: any = {};

    ANYDTO.Con_score_setting_pkeyId = Modelobj.Con_score_setting_pkeyId;
    ANYDTO.Con_score_setting_picturequality = parseInt(Modelobj.Con_score_setting_picturequality);
    ANYDTO.Con_score_setting_follow_inst = parseInt(Modelobj.Con_score_setting_follow_inst);
    ANYDTO.Con_score_setting_workquality = parseInt(Modelobj.Con_score_setting_workquality);
    ANYDTO.Con_score_setting_duadate = parseInt(Modelobj.Con_score_setting_duadate);
    ANYDTO.Con_score_setting_estdate = parseInt(Modelobj.Con_score_setting_estdate);
    ANYDTO.Con_score_setting_total = Modelobj.Con_score_setting_total;
    ANYDTO.Con_score_setting_Info_needed = Modelobj.Con_score_setting_Info_needed;
    ANYDTO.Con_score_setting_retern_property = Modelobj.Con_score_setting_retern_property;
    ANYDTO.Con_score_setting_escalated_penalty = Modelobj.Con_score_setting_escalated_penalty;
    ANYDTO.Con_score_setting_number_day = Modelobj.Con_score_setting_number_day;
    ANYDTO.Con_score_setting_IsActive = Modelobj.Con_score_setting_IsActive;
    ANYDTO.Con_score_setting_IsDelete = Modelobj.Con_score_setting_IsDelete;
    ANYDTO.Con_score_setting_CompanyId = Modelobj.Con_score_setting_CompanyId;
    ANYDTO.Con_score_setting_UserId = Modelobj.Con_score_setting_UserId;
    if (Modelobj.Con_score_setting_pkeyId != 0) {
      ANYDTO.Type = 2;
    }
    else{
      ANYDTO.Type = 1;

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
  private apiUrlGet = BaseUrl + environment.Admin.GetScoreCard;

  public GetContractorScoreCard(Modelobj: ContractorScoreCardSettingModel) {
    var ANYDTO: any = {};
    ANYDTO.Con_score_setting_pkeyId = Modelobj.Con_score_setting_pkeyId;
    ANYDTO.Con_score_setting_UserId = Modelobj.Con_score_setting_UserId;
    ANYDTO.Type = Modelobj.Type;

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


}
