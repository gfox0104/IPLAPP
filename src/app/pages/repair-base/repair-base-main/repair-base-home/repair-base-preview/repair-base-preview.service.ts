import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { RepairBaseModel } from './repair-base-preview.model';
import { environment } from '../../../../../../environments/environment';
import { HomepageServices } from '../../../../home/home.service';

@Injectable({
  providedIn: 'root'
})
export class RepairBasePreviewService {

  public Errorcall;
  

  constructor(
    private _http: HttpClient,
    private xHomepageServices: HomepageServices
  ) { 
    
  }

  public getCharacteristics(ModelObj: RepairBaseModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/characteristics?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public getPropertyType(ModelObj: RepairBaseModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers})
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    )
  }

  public getRoomData(ModelObj: RepairBaseModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/areas?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers})
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    )
  }

  public getRepairData(ModelObj: RepairBaseModel, areaID,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/areas/'+areaID+'/repairs?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers})
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    )
  }
}
