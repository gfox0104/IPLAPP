import { Injectable } from '@angular/core';
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { HomepageServices } from '../../../home/home.service';
import { BaseUrl } from 'src/app/services/apis/rest-api';

@Injectable({
  providedIn: 'root'
})
export class RepairBaseHomeService {
  public Errorcall;
  public token: any;
  // apiUrl = environment.repairbase.testapi;
  // liveApiUrl = environment.repairbase.liveapi;
  orderTypeID = 9;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  public getEstimate(apiGetUrl,AuthHeader){
    //let apiGetUrl = this.apiUrl + '/api/v1/orders/orderTypes/'+this.orderTypeID+'/search?pageSize=100&api_key=MCCO'
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', AuthHeader);
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      catchError((err) => {
        //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
  }

  private apiUrlGetUser = BaseUrl + environment.RepairBase.GetRepairBaseUserMaster;

  public GetRepairBaseUserMasterDetail() {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetUser, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  handleError(error: HttpErrorResponse){
    //debugger
    let rArray = [];
    //console.log(error);
    return "";
    }

  // public deleteArea(id){

  // }
}
