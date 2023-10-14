
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_MCS_Maintenance_Vendor_Checklist_Model } from "./mcs-maintenance-vendor-checklist-model";
@Injectable({
    providedIn: "root"
})

export class McsMaintenanceVendorChecklistService {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostMcsMaintenanceVendorChecklistFormMaster;
    public PostMcsMaintenanceVendorChecklistFormMaster(ModelObj: PCR_MCS_Maintenance_Vendor_Checklist_Model) {
        var ANYDTO: any = {};
        ANYDTO.MVC_PkeyID = ModelObj.MVC_PkeyID;
        ANYDTO.MVC_WO_ID = ModelObj.MVC_WO_ID;
        ANYDTO.MVC_Property_Info = ModelObj.MVC_Property_Info;
        ANYDTO.MVC_Completion_Info = ModelObj.MVC_Completion_Info;
        ANYDTO.MVC_Utilities = ModelObj.MVC_Utilities;
        ANYDTO.MVC_Damage = ModelObj.MVC_Damage;
        ANYDTO.MVC_Winterization_Info = ModelObj.MVC_Winterization_Info;
        ANYDTO.MVC_Violation = ModelObj.MVC_Violation;
        ANYDTO.MVC_Validation = ModelObj.MVC_Validation;
        ANYDTO.MVC_Check_Ins = ModelObj.MVC_Check_Ins;
        ANYDTO.MVC_Notes = ModelObj.MVC_Notes;
        ANYDTO.MVC_IsActive = ModelObj.MVC_IsActive;
        ANYDTO.MVC_IsDelete = ModelObj.MVC_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetMcsMaintenanceVendorChecklistFormMaster;
    public GetMcsMaintenanceVendorChecklistFormMaster(ModelObj: PCR_MCS_Maintenance_Vendor_Checklist_Model) {
        var ANYDTO: any = {};
        ANYDTO.MVC_PkeyID = ModelObj.MVC_PkeyID;
        ANYDTO.MVC_WO_ID = ModelObj.MVC_WO_ID;
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
