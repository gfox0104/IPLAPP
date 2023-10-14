
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { NFR_Processing_Form_Master } from "./nfr-processing-form.model";

@Injectable({
    providedIn: "root"
})

export class NRFProcessingFormService {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostNRFProcessingFormMaster;
    public PostNRFProcessingMaster(ModelObj: NFR_Processing_Form_Master) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_PkeyID = ModelObj.PCR_PkeyID;
        ANYDTO.PCR_WO_ID = ModelObj.PCR_WO_ID;
        ANYDTO.PCR_General = ModelObj.PCR_General;
        ANYDTO.PCR_Utilities = ModelObj.PCR_Utilities;
        ANYDTO.PCR_Securing = ModelObj.PCR_Securing;
        ANYDTO.PCR_Winterization = ModelObj.PCR_Winterization;
        ANYDTO.PCR_Bording = ModelObj.PCR_Bording;
        ANYDTO.PCR_Debris = ModelObj.PCR_Debris;
        ANYDTO.PCR_Roof = ModelObj.PCR_Roof;
        ANYDTO.PCR_Moisture = ModelObj.PCR_Moisture;
        ANYDTO.PCR_Yard = ModelObj.PCR_Yard
        ANYDTO.PCR_Damages = ModelObj.PCR_Damages;
        ANYDTO.PCR_Others = ModelObj.PCR_Others;
        ANYDTO.PCR_PhotoCheckList = ModelObj.PCR_PhotoCheckList;
        ANYDTO.PCR_Summary = ModelObj.PCR_Summary;
        ANYDTO.PCR_IsActive = ModelObj.PCR_IsActive;
        ANYDTO.PCR_IsDelete = ModelObj.PCR_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetNRFProcessingMaster;
    public GetNRFProcessingFormMaster(ModelObj: NFR_Processing_Form_Master) {
        var ANYDTO: any = {};
        ANYDTO.PCR_PkeyID = ModelObj.PCR_PkeyID;
        ANYDTO.PCR_WO_ID = ModelObj.PCR_WO_ID;
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
