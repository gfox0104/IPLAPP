
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_MCS_Grass_Cut_Form_Master_Model } from "./mcs-grass-cut-form-model";
@Injectable({
    providedIn: "root"
})

export class MCSGrassCustFormServices {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostMCSGrassCutFormMaster;
    public PostMCSGrassCutFormMaster(ModelObj: PCR_MCS_Grass_Cut_Form_Master_Model) {
        var ANYDTO: any = {};
        ANYDTO.MG_PkeyID = ModelObj.MG_PkeyID;
        ANYDTO.MG_WO_ID = ModelObj.MG_WO_ID;
        ANYDTO.MG_Property_Info = ModelObj.MG_Property_Info;
        ANYDTO.MG_Completion_Info = ModelObj.MG_Completion_Info;
        ANYDTO.MG_Access_Issue = ModelObj.MG_Access_Issue;
        ANYDTO.MG_Validation = ModelObj.MG_Validation;
        ANYDTO.MG_Check_Ins = ModelObj.MG_Check_Ins;
        ANYDTO.MG_Notes = ModelObj.MG_Notes;
        ANYDTO.MG_Expected_Completion_Date = ModelObj.MG_Expected_Completion_Date;
        ANYDTO.MG_IsActive = ModelObj.MG_IsActive;
        ANYDTO.MG_IsDelete = ModelObj.MG_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetMCSGrassCutFormMaster;
    public GetMCSGrassCutFormMaster(ModelObj: PCR_MCS_Grass_Cut_Form_Master_Model) {
        var ANYDTO: any = {};
        ANYDTO.MG_PkeyID = ModelObj.MG_PkeyID;
        ANYDTO.MG_WO_ID = ModelObj.MG_WO_ID;
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
