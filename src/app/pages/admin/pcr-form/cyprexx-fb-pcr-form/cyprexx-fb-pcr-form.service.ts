
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_CyperexxFormsMasterModel } from "./cyprexx-fb-pcr-form.model";
@Injectable({
    providedIn: "root"
})

export class PCRCyperexxFormsMasterServices {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlIPLDROPDOWN = BaseUrl + environment.Admin.GetFormsDrd;
    public GetPCRCYPREXXFORMSData(ModelObj:PCR_CyperexxFormsMasterModel) {
        var ANYDTO: any = {};
        ANYDTO.PCR_PCFM_pkeyId = ModelObj.PCR_PCFM_pkeyId;
        ANYDTO.Type = ModelObj.Type;

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

        return this._http
            .post<any>(this.apiUrlIPLDROPDOWN, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostPcrCyperxxFORMSMASTERData;
    public PostPCRCYPREXXFORMSMasterData(ModelObj: PCR_CyperexxFormsMasterModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_PCFM_pkeyId = ModelObj.PCR_PCFM_pkeyId;
        ANYDTO.PCR_PCFM_WO_Id = ModelObj.PCR_PCFM_WO_Id;
        ANYDTO.PCR_PCFM_CompanyID = ModelObj.PCR_PCFM_CompanyID;
        ANYDTO.PCR_PCFM_General_Information = ModelObj.PCR_PCFM_General_Information;
        ANYDTO.PCR_PCFM_Property_Accessibility = ModelObj.PCR_PCFM_Property_Accessibility;
        ANYDTO.PCR_PCFM_Property_Type = ModelObj.PCR_PCFM_Property_Type;
        ANYDTO.PCR_PCFM_Utilities = ModelObj.PCR_PCFM_Utilities;
        ANYDTO.PCR_PCFM_Occupancy_Information = ModelObj.PCR_PCFM_Occupancy_Information;
        ANYDTO.PCR_PCFM_Securing__Lock_Changes = ModelObj.PCR_PCFM_Securing__Lock_Changes;
        ANYDTO.PCR_PCFM_Grage_shed_outbuilding_securing = ModelObj.PCR_PCFM_Grage_shed_outbuilding_securing;
        ANYDTO.PCR_PCFM_Window_securing = ModelObj.PCR_PCFM_Window_securing;
        ANYDTO.PCR_PCFM_Pool = ModelObj.PCR_PCFM_Pool;
        ANYDTO.PCR_PCFM_Debris_Hazzards = ModelObj.PCR_PCFM_Debris_Hazzards;
        ANYDTO.PCR_PCFM_Yard = ModelObj.PCR_PCFM_Yard;
        ANYDTO.PCR_PCFM_Hazard_Abatement = ModelObj.PCR_PCFM_Hazard_Abatement;
        ANYDTO.PCR_PCFM_Winterization = ModelObj.PCR_PCFM_Winterization;
        ANYDTO.PCR_PCFM_Damages = ModelObj.PCR_PCFM_Damages;
        ANYDTO.PCR_PCFM_Signage = ModelObj.PCR_PCFM_Signage;
        ANYDTO.PCR_PCFM_Canveyance = ModelObj.PCR_PCFM_Canveyance;
        ANYDTO.PCR_PCFM_General_Comment = ModelObj.PCR_PCFM_General_Comment;
        ANYDTO.PCR_PCFM_Vendor_Signature = ModelObj.PCR_PCFM_Vendor_Signature;
        ANYDTO.PCR_PCFM_IsActive = ModelObj.PCR_PCFM_IsActive;
        ANYDTO.PCR_PCFM_IsDelete = ModelObj.PCR_PCFM_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetPcrCyperxxFORMSMASTERData;
    public getPCRCYPREXXFORMSMasterData(ModelObj: PCR_CyperexxFormsMasterModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.PCR_PCFM_pkeyId = ModelObj.PCR_PCFM_pkeyId;
        ANYDTO.PCR_PCFM_WO_Id = ModelObj.PCR_PCFM_WO_Id;
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
