
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { Service_Link_Form_Master_Model } from "./service-link-form.model";
@Injectable({
    providedIn: "root"
})

export class ServiceLinkFormService {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostServiceLinkForm;
    public PostServiceLinkForm(ModelObj: Service_Link_Form_Master_Model) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.SL_Pkey_ID = ModelObj.SL_Pkey_ID;
        ANYDTO.SL_WO_ID = ModelObj.SL_WO_ID;
        ANYDTO.SL_General_Information = ModelObj.SL_General_Information;
        ANYDTO.SL_Property_Condition_Report1 = ModelObj.SL_Property_Condition_Report1;
        ANYDTO.SL_Property_Condition_Report2 = ModelObj.SL_Property_Condition_Report2;
        ANYDTO.SL_Bids = ModelObj.SL_Bids;
        ANYDTO.SL_Other_Result = ModelObj.SL_Other_Result;
        ANYDTO.SL_Summary = ModelObj.SL_Summary;
        ANYDTO.SL_IsActive = ModelObj.SL_IsActive;
        ANYDTO.SL_IsDelete = ModelObj.SL_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetServiceLinkForm;
    public GetServiceLinkForm(ModelObj: Service_Link_Form_Master_Model) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.SL_Pkey_ID = ModelObj.SL_Pkey_ID;
        ANYDTO.SL_WO_ID = ModelObj.SL_WO_ID;
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
