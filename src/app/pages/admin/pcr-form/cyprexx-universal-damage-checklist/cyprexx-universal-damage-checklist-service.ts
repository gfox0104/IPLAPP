
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_Cyprexx_Universal_Damage_Modal } from "./cyprexx-universal-damage-checklist.model";

@Injectable({
    providedIn: "root"
})

export class CyprexxUniversalDamageChecklistServices {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostCyprexxUniversalDamageChecklist;
    public PostCyprexxUniversalDamageChecklist(ModelObj: PCR_Cyprexx_Universal_Damage_Modal) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_CU_PkeyID = ModelObj.PCR_CU_PkeyID;
        ANYDTO.PCR_CU_WO_ID = ModelObj.PCR_CU_WO_ID;
        ANYDTO.PCR_CU_General_Info = ModelObj.PCR_CU_General_Info;
        ANYDTO.PCR_CU_Interior_Access_Information = ModelObj.PCR_CU_Interior_Access_Information;
        ANYDTO.PCR_CU_Upload_Photos = ModelObj.PCR_CU_Upload_Photos;
        ANYDTO.PCR_CU_IsActive = ModelObj.PCR_CU_IsActive;
        ANYDTO.PCR_CU_IsDelete = ModelObj.PCR_CU_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetCyprexxUniversalDamageChecklist;
    public GetCyprexxUniversalDamageChecklist(ModelObj: PCR_Cyprexx_Universal_Damage_Modal) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_CU_PkeyID = ModelObj.PCR_CU_PkeyID;
        ANYDTO.PCR_CU_WO_ID = ModelObj.PCR_CU_WO_ID;
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
