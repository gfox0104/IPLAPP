import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ContractorMapModel } from './contractor-map-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class ContractorMapServices {
  public Errorcall;
  private token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Resources.GetContractorMap;
  public GetContractorData(Modelobj: ContractorMapModel) {
    //console.log('GetContractorData',"contrator data")
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

  private apiLatLngGet = BaseUrl + environment.Resources.GetContractorMaplatlong;
  public GetLatLngData(param) {
    var ANYDTO: any = {};
    ANYDTO.Zip_zip = param;
    ANYDTO.UserID =45;
    ANYDTO.Type = 1;


    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiLatLngGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
}
