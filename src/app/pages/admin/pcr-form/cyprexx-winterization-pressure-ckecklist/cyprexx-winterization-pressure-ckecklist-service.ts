
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_CyprexxWinterizationPressureModel } from "./cyprexx-winterization-pressure-ckecklist.model";
@Injectable({
    providedIn: "root"
})

export class CyprexxWinterizationPressureServices {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostCyprexxWinterizationPressure;
    public PostCyprexxWinterizationPressure(ModelObj: PCR_CyprexxWinterizationPressureModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_CW_PkeyID = ModelObj.PCR_CW_PkeyID;
        ANYDTO.PCR_CW_WO_ID = ModelObj.PCR_CW_WO_ID;
        ANYDTO.PCR_CW_Pressure_Test = ModelObj.PCR_CW_Pressure_Test;
        ANYDTO.PCR_CW_Upload_photo = ModelObj.PCR_CW_Upload_photo;
        ANYDTO.PCR_CW_IsActive = ModelObj.PCR_CW_IsActive;
        ANYDTO.PCR_CW_IsDelete = ModelObj.PCR_CW_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetCyprexxWinterizationPressure;
    public GetCyprexxWinterizationPressure(ModelObj: PCR_CyprexxWinterizationPressureModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_CW_PkeyID = ModelObj.PCR_CW_PkeyID;
        ANYDTO.PCR_CW_WO_ID = ModelObj.PCR_CW_WO_ID;
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
