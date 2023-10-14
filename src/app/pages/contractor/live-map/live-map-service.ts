import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";


import { LiveMapModel } from './live-map-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root"
})
export class LiveMapServices {
  public Errorcall;
  private token: any;
  constructor(private _http: HttpClient, private _Route: Router,
    private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Resources.GetContractorMap;

  public GetUserLatData(Modelobj: LiveMapModel) {
    var ANYDTO: any = {};
    ANYDTO.IPL_PkeyID = Modelobj.IPL_PkeyID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}