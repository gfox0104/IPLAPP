
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { MSI_PCR_PreservationFormMasterModel } from "./msi-preservation-pcr-form-model";

@Injectable({
  providedIn: 'root'
})
export class MsiPreservationPcrFormService {

  public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }


    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostMsiPreservationPcrForm;
    public PostMsiPreservationPcrForm(ModelObj: MSI_PCR_PreservationFormMasterModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.MSI_Preservation_PkeyId = ModelObj.MSI_Preservation_PkeyId;
        ANYDTO.MSI_Preservation_WO_ID = ModelObj.MSI_Preservation_WO_ID;
        ANYDTO.MSI_Preservation_SubjectProperty = ModelObj.MSI_Preservation_SubjectProperty;
        ANYDTO.MSI_Preservation_ConditionReport = ModelObj.MSI_Preservation_ConditionReport;

        ANYDTO.MSI_Preservation_IsActive = ModelObj.MSI_Preservation_IsActive;
        ANYDTO.MSI_Preservation_IsDelete = ModelObj.MSI_Preservation_IsDelete;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetMsiPreservationPcrForm;
    public GetMsiPreservationPcrForm(ModelObj: MSI_PCR_PreservationFormMasterModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.MSI_Preservation_PkeyId = ModelObj.MSI_Preservation_PkeyId;
        ANYDTO.MSI_Preservation_WO_ID = ModelObj.MSI_Preservation_WO_ID;
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
