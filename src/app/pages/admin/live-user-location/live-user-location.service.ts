import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { LocationModel } from "./live-user-location-model";
import { HomepageServices } from "../../home/home.service";
@Injectable({
  providedIn: "root"
})

export class LiveUserLocationServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.GetFirebaseLocation;

  public GetFirebaseLocationData(Modelobj: LocationModel) {
    var ANYDTO: any = {};    

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

  private apiUrlDelete = BaseUrl + environment.Admin.DeleteFirebaseLocation;

  public DeleteFirebaseLocationData(Modelobj: any) {
    var ANYDTO: any = {};    
    ANYDTO.Name = Modelobj.Name;
    ANYDTO.IsDeleteChecked = Modelobj.IsDeleteChecked;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlDelete, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlDeleteList = BaseUrl + environment.Admin.DeleteFirebaseLocationList;

  public DeleteFirebaseLocationListData(LocationArray: any) {
    var ANYDTO: any = {};    
    ANYDTO.LiveUserLocationArray = LocationArray;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlDeleteList, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
