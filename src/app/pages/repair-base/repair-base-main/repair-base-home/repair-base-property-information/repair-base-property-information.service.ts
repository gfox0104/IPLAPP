import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { environment } from '../../../../../../environments/environment';
import { RepairBasePropertyInformation } from "./repair-base-property-information.model";

@Injectable({
  providedIn: 'root'
})
export class RepairBasePropertyInformationService {

  // apiUrl = environment.repairbase.testapi;
  // liveApiUrl = environment.repairbase.liveapi;
  constructor(private _http: HttpClient) { }

  public getPropertyType(apiGetPropertyUrl,auth){
    //let apiGetPropertyUrl = this.apiUrl + '/api/v1/propertytypescatalog?api_key=MCCO';
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    return this._http.get(apiGetPropertyUrl, { headers: headers });
  }

  public addCharacteristics(ModelObj: RepairBasePropertyInformation,apiUrl,apiKey,auth){
    let apiAddCharacteristics = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/characteristics?api_key=' + apiKey;
    let headers = new HttpHeaders({ "Accept": "application/json" });
    let body = {
      bedrooms: ModelObj.RB_Bedrooms,
      fullBaths: ModelObj.RB_Fullbaths,
      halfBaths: ModelObj.RB_Halfbaths,
      stories: ModelObj.RB_Stories,
      yearBuilt: ModelObj.RB_YearBuilt,
      totalLivingArea: ModelObj.RB_LivingArea,
      structureQuality: ModelObj.RB_StructureQuality,
      condition: ModelObj.RB_Condition,
      basementSizeSF: ModelObj.RB_BasementSize,
      attachedGaragesNumberOfCars: ModelObj.RB_AttachedGarage,
      builtInGaragesNumberOfCars: ModelObj.RB_BuiltInGarage,
      siteLotSizeInSqFt: ModelObj.RB_Site,
      roofPitch: ModelObj.RB_RoofPitch
    }
    headers = headers.append('Authorization', auth);
    return this._http.put(apiAddCharacteristics, body, { headers: headers });
  }

  public getCharacteristics(ModelObj: RepairBasePropertyInformation,apiUrl,apiKey,auth){
    let apiGetCharacteristics = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/characteristics?api_key' + apiKey;
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    return this._http.get(apiGetCharacteristics, { headers: headers });
  }
}
