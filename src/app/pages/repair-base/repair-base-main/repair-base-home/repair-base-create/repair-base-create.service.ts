import { Injectable } from '@angular/core';
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { RepairBaseCreatestep1Model } from './repair-base-create.model';
import { environment } from '../../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RepairBaseCreateService {
  public Errorcall;
  
  constructor(private _http: HttpClient) { }

  public getStateData(apiGetStateUrl,auth){
    //let apiGetStateUrl = this.apiUrl + '/api/v1/usstatescatalog?api_key=MCCO'
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    return this._http.get(apiGetStateUrl, { headers: headers });
  }

  public getPropertyType(apiGetPropertyUrl,auth){
    //let apiGetPropertyUrl = this.apiUrl + '/api/v1/propertytypescatalog?api_key=MCCO';
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    return this._http.get(apiGetPropertyUrl, { headers: headers });
  }

  public createEstimate(ModelObj: RepairBaseCreatestep1Model,apiPostEstimateUrl,auth){
    //let apiPostEstimateUrl = this.apiUrl + '/api/v1/orders?api_key=MCCO';
    let headers = new HttpHeaders({ "Accept": "application/json" });
    let body = 
    {
      orderType: 9,
      propertyType: ModelObj.RB_PropertyType,
      address: ModelObj.RB_PropertyAddress,
      city: ModelObj.RB_City,
      state: ModelObj.RB_State,
      zip: ModelObj.RB_State
    }
    headers = headers.append('Authorization', auth);
    return this._http.post(apiPostEstimateUrl, body, { headers: headers})
  }
}
