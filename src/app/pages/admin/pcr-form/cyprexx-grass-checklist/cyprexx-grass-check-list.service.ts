
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { PCR_Cyprexx_Grass_Checklist_Master_Model } from "./cyprexx-crass-check-list-model";

@Injectable({
  providedIn: 'root'
})
export class CyprexxGrassCheckListService {

  public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }


    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostCyprexxGrassCheckData;
    public PostCyprexxGrassCheckData(ModelObj: PCR_Cyprexx_Grass_Checklist_Master_Model) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.CG_PkeyID = ModelObj.CG_PkeyID;
        ANYDTO.CG_WO_Id = ModelObj.CG_WO_Id;
        ANYDTO.CG_General_Property_Info = ModelObj.CG_General_Property_Info;
        ANYDTO.CG_Property_Maintenance = ModelObj.CG_Property_Maintenance;
        ANYDTO.CG_Pool_Information = ModelObj.CG_Pool_Information;
        ANYDTO.CG_Utilities = ModelObj.CG_Utilities;
        ANYDTO.CG_Recommended_Services = ModelObj.CG_Recommended_Services;
        ANYDTO.CG_General_Comments = ModelObj.CG_General_Comments;
        ANYDTO.CG_Order_Completion = ModelObj.CG_Order_Completion;
        ANYDTO.CG_IsActive = ModelObj.CG_IsActive;
        ANYDTO.CG_IsDelete = ModelObj.CG_IsDelete;
        ANYDTO.Type = ModelObj.Type;
        ANYDTO.fwo_pkyeId = ModelObj.fwo_pkyeId;
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

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetCyprexxGrassCheckListData;
    public GetCyprexxGrassCheckListData(ModelObj: PCR_Cyprexx_Grass_Checklist_Master_Model) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.CG_WO_Id = ModelObj.CG_WO_Id;
        ANYDTO.CG_PkeyID = ModelObj.CG_PkeyID;
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
