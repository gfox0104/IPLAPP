import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { FilterAdminCommonModelDTO } from "./admin-common-model";
import { HomepageServices } from "../../home/home.service";

@Injectable({
  providedIn: "root"
})

export class AdminCommonService {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router,private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private docpostUrl = BaseUrl + environment.Admin.AddUpdateFilterAdminCommon;
  public AddUpdateFilterAdminCommonData(Modelobj: FilterAdminCommonModelDTO) {
    let ANYDTO: any = {};
    ANYDTO.Filter_PkeyID = Modelobj.Filter_PkeyID;
    ANYDTO.Filter_PageType = Modelobj.Filter_PageType;
    ANYDTO.Filter_FilterName = Modelobj.Filter_FilterName;
    ANYDTO.Filter_FilterIsActive = Modelobj.Filter_FilterIsActive;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.docpostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

}
