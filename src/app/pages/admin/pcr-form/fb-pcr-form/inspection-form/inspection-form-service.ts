
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_Five_Brothers_Inspection_Form_Model } from "./inspection-form-model";

@Injectable({
    providedIn: "root"
})

export class PCRInspectionFormService {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostPCRInspectionForm;
    public POSTPCRInspectionForm(ModelObj: PCR_Five_Brothers_Inspection_Form_Model) {
        var ANYDTO: any = {};
        ANYDTO.INS_PkeyID = ModelObj.INS_PkeyID;
        ANYDTO.INS_WO_ID = ModelObj.INS_WO_ID;
        ANYDTO.INS_Inspection = ModelObj.INS_Inspection;
        ANYDTO.INS_IsActive = ModelObj.INS_IsActive;
        ANYDTO.INS_IsDelete = ModelObj.INS_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetPCRInspectionForm;
    public GetPCRInspectionForm(ModelObj: PCR_Five_Brothers_Inspection_Form_Model) {
        var ANYDTO: any = {};
        ANYDTO.INS_PkeyID = ModelObj.INS_PkeyID;
        ANYDTO.INS_WO_ID = ModelObj.INS_WO_ID;
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
