
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { MSIGarassSubjectPropertyPcrFormModel } from "./msi-grass-pcr-form.model";
@Injectable({
    providedIn: "root"
})

export class MSIGrassPcrFormsServices {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlmsigrassPcr = BaseUrl + environment.ClientResult.GetMsiGrassPcrFORMSMASTERData;
    public GetMsiFORMSData(ModelObj:MSIGarassSubjectPropertyPcrFormModel) {
        var ANYDTO: any = {};
        ANYDTO.MSI_Grass_PkeyId = ModelObj.MSI_Grass_PkeyId;
        ANYDTO.MSI_Grass_WO_Id = ModelObj.MSI_Grass_WO_Id;
        ANYDTO.Type = ModelObj.Type;

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

        return this._http
            .post<any>(this.apiUrlmsigrassPcr, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostMsiGrassPcrFORMSMASTERData;
    public PostMSIGrassFORMSMasterData(ModelObj: MSIGarassSubjectPropertyPcrFormModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.MSI_Grass_PkeyId = ModelObj.MSI_Grass_PkeyId;
        ANYDTO.MSI_Grass_WO_Id = ModelObj.MSI_Grass_WO_Id;
        ANYDTO.MSI_Grass_SubjectProperty = ModelObj.MSI_Grass_SubjectProperty;
        ANYDTO.MSI_Grass_ConditionReport = ModelObj.MSI_Grass_ConditionReport;
        ANYDTO.MSI_Grass_BidItems = ModelObj.MSI_Grass_BidItems;
        ANYDTO.MSI_Grass_PhotoManager = ModelObj.MSI_Grass_PhotoManager;
        ANYDTO.MSI_Grass_Comments = ModelObj.MSI_Grass_Comments;
        ANYDTO.MSI_Grass_FinalReviews = ModelObj.MSI_Grass_FinalReviews;
        ANYDTO.MSI_Grass_IsActive = ModelObj.MSI_Grass_IsActive;
        ANYDTO.MSI_Grass_IsDelete = ModelObj.MSI_Grass_IsDelete;
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

}
