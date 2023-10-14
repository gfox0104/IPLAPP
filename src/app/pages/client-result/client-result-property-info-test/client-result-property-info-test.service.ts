import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HomepageServices } from "../../home/home.service";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { ClientResultPITModel } from "./client-result-property-info-test-model";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root"
  })

  export class ClientResultPITServices {
    public token: any;
    
    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
      }

      private plspostUrl = BaseUrl + environment.ClientResult.PostClientResultPropertyInfoMasterTest;
  public PostClientResultPropertyInfoMasterTest(Modelobj: ClientResultPITModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.CRPIM_PkeyID = Modelobj.CRPIM_PkeyID;
    ANYDTO.CRPIM_WO_ID = Modelobj.CRPIM_WO_ID;
    ANYDTO.CRPIM_IsActive = Modelobj.CRPIM_IsActive;    
    ANYDTO.CRPIM_Lock_Box_Code = Modelobj.CRPIM_Lock_Box_Code;   
    ANYDTO.CRPIM_LotSize = Modelobj.CRPIM_LotSize;   
    ANYDTO.CRPIM_GPS_Latitude = Modelobj.CRPIM_GPS_Latitude;
    ANYDTO.CRPIM_GPS_Longitude = Modelobj.CRPIM_GPS_Longitude;
    
    ANYDTO.Type = Modelobj.Type; 
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.plspostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }

  private plsGetUrl = BaseUrl + environment.ClientResult.GetClientResultPropertyInfoMasterTest;
  public GetClientResultPropertyInfoMasterTest(Modelobj: ClientResultPITModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.CRPIM_PkeyID = Modelobj.CRPIM_PkeyID;
    ANYDTO.CRPIM_WO_ID = Modelobj.CRPIM_WO_ID;
    ANYDTO.Type = Modelobj.Type;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.plsGetUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          console.log('return',data)
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
  }