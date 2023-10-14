import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { HomepageServices } from '../../home/home.service';
import { BaseUrl } from "src/app/services/apis/rest-api";
import { ClientResultSyncModel } from "./client-result-client-sync-model";

@Injectable({
  providedIn: "root"
})

export class ClientResultSyncServices {
  public Errorcall;
  public token: any;
  baseUrl = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private bidSyncUrl = BaseUrl + environment.ClientResult.UploadBidSync;
  public UploadBid(Modelobj: ClientResultSyncModel) {
    //dfebugger
    var ANYDTO: any = {};
    ANYDTO.WO_Id = Modelobj.WO_Id;
    ANYDTO.Type = Modelobj.Type;
  
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.bidSyncUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
       
      );
  }

  private invSyncUrl = BaseUrl + environment.ClientResult.UploadInvoiceSync;
  public UploadInvoice(Modelobj: ClientResultSyncModel) {
    //dfebugger
    var ANYDTO: any = {};
    ANYDTO.WO_Id = Modelobj.WO_Id;
    ANYDTO.Type = Modelobj.Type;
  
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.invSyncUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
       
      );
  } 

  private prvSyncUrl = BaseUrl + environment.ClientResult.UploadPreservationSync;
  public UploadPreservation(Modelobj: ClientResultSyncModel) {
    //dfebugger
    var ANYDTO: any = {};
    ANYDTO.WO_Id = Modelobj.WO_Id;
    ANYDTO.Type = Modelobj.Type;
  
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.prvSyncUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
       
      );
  }

  private photoSyncUrl = BaseUrl + environment.ClientResult.UploadPhotoSync;
  public UploadPhoto(Modelobj: ClientResultSyncModel) {
    //dfebugger
    var ANYDTO: any = {};
    ANYDTO.WO_Id = Modelobj.WO_Id;
    ANYDTO.Type = Modelobj.Type;
  
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.photoSyncUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
       
      );
  }

  private grassSyncUrl = BaseUrl + environment.ClientResult.UploadGrassSync;
  public UploadGrass(Modelobj: ClientResultSyncModel) {
    //dfebugger
    var ANYDTO: any = {};
    ANYDTO.WO_Id = Modelobj.WO_Id;
    ANYDTO.Type = Modelobj.Type;
  
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.grassSyncUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
       
      );
  }

  private damageSyncUrl = BaseUrl + environment.ClientResult.UploadDamageSync;
  public UploadDamage(Modelobj: ClientResultSyncModel) {
    //dfebugger
    var ANYDTO: any = {};
    ANYDTO.WO_Id = Modelobj.WO_Id;
    ANYDTO.Type = Modelobj.Type;
  
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.damageSyncUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
       
      );
  }
}
