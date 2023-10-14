import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_Cyprexx_Property_Condition_Checklist } from "./cyprexx-property-condition-checklist-model";


@Injectable({
    providedIn: "root"
})

export class CyprexxPropertyConditionChecklistService {
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.CreateUpdateCyprexxPropertyConditionChecklist;
    public CreateUpdateCyprexxPropertyConditionChecklist(ModelObj: PCR_Cyprexx_Property_Condition_Checklist) {
        var ANYDTO: any = {};
        ANYDTO.PCR_PC_PkeyID = ModelObj.PCR_PC_PkeyID;
        ANYDTO.PCR_PC_WO_ID = ModelObj.PCR_PC_WO_ID;
        ANYDTO.PCR_PC_General_Property_Questions = ModelObj.PCR_PC_General_Property_Questions;
        ANYDTO.PCR_PC_Signature = ModelObj.PCR_PC_Signature;
        ANYDTO.PCR_PC_IsActive = ModelObj.PCR_PC_IsActive;
        ANYDTO.PCR_PC_IsDelete = ModelObj.PCR_PC_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetCyprexxPropertyConditionChecklist
    public GetCyprexxPropertyConditionChecklist(ModelObj:PCR_Cyprexx_Property_Condition_Checklist) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_PC_PkeyID = ModelObj.PCR_PC_PkeyID;
        ANYDTO.PCR_PC_WO_ID = ModelObj.PCR_PC_WO_ID;
        ANYDTO.Type = ModelObj.Type;
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlgetFormsMasterData, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    // debugger
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }
}