
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_MCS_Forms_Master_Model } from "./mcs-form.model";
@Injectable({
    providedIn: "root"
})

export class MCSFormServices {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostMCSFormMaster;
    public PostMCSFormMaster(ModelObj: PCR_MCS_Forms_Master_Model) {
        var ANYDTO: any = {};
        ANYDTO.MCS_PkeyID = ModelObj.MCS_PkeyID;
        ANYDTO.MCS_WO_ID = ModelObj.MCS_WO_ID;
        ANYDTO.MCS_Property_Info = ModelObj.MCS_Property_Info;
        ANYDTO.MCS_Completion_Info = ModelObj.MCS_Completion_Info;
        ANYDTO.MCS_Utilities = ModelObj.MCS_Utilities;
        ANYDTO.MCS_VCL = ModelObj.MCS_VCL;
        ANYDTO.MCS_Check_Ins = ModelObj.MCS_Check_Ins;
        ANYDTO.MCS_IsActive = ModelObj.MCS_IsActive;
        ANYDTO.MCS_IsDelete = ModelObj.MCS_IsDelete;
        ANYDTO.fwo_pkyeId = ModelObj.fwo_pkyeId;
        ANYDTO.Type = ModelObj.Type;
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlFormsMasterData, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetMCSFormMaster;
    public GetMCSFormMaster(ModelObj: PCR_MCS_Forms_Master_Model) {
        var ANYDTO: any = {};
        ANYDTO.MCS_PkeyID = ModelObj.MCS_PkeyID;
        ANYDTO.MCS_WO_ID = ModelObj.MCS_WO_ID;
        ANYDTO.Type = ModelObj.Type;
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlgetFormsMasterData, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

}
