
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_Cyprexx_Job_Documentation_Checklist } from "./cyprexx-job-documentation-checklist-model";


@Injectable({
    providedIn: "root"
})

export class CyprexxJobDocumentationChecklistService {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostCyprexxJobDocumentationChecklist;
    public PostCyprexxJobDocumentationChecklist(ModelObj: PCR_Cyprexx_Job_Documentation_Checklist) {
        var ANYDTO: any = {};
        ANYDTO.PCR_JD_PkeyID = ModelObj.PCR_JD_PkeyID;
        ANYDTO.PCR_JD_WO_ID = ModelObj.PCR_JD_WO_ID;
        ANYDTO.PCR_JD_Job_Info = ModelObj.PCR_JD_Job_Info;
        ANYDTO.PCR_JD_IsActive = ModelObj.PCR_JD_IsActive;
        ANYDTO.PCR_JD_IsDelete = ModelObj.PCR_JD_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetCyprexxJobDocumentationChecklist;
    public GetCyprexxJobDocumentationChecklist(ModelObj: PCR_Cyprexx_Job_Documentation_Checklist) {
        var ANYDTO: any = {};
        ANYDTO.PCR_JD_PkeyID = ModelObj.PCR_JD_PkeyID;
        ANYDTO.PCR_JD_WO_ID = ModelObj.PCR_JD_WO_ID;
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
