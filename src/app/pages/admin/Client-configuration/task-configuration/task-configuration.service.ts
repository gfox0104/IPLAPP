import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { AddTaskConfigurationModel } from "./task-configuration-model";
import { DropdownModel } from "src/app/pages/models/dropdown-model";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class TaskConfigurationServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.ConfigurationDrd;

  public GetTaskConfigurationDropDown(Modelobj: DropdownModel) {
  // debugger;
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;

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

  private apiUrlGetTask = BaseUrl + environment.Admin.GetTaskConfigration;

  public GetTaskConfigurationMasterDetails(Modelobj: AddTaskConfigurationModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetTask, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOST3 =  BaseUrl + environment.Admin.PostTaskConfigration;

  public PostTaskConfigurationMasterDetails(param: any) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Task_Configuration_List = param;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST3, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetWT = BaseUrl + environment.Admin.GetWorkTypeConfigration;

  public GetWorkTypeConfigurationDetails(Modelobj: AddTaskConfigurationModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetWT, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOSTWT =  BaseUrl + environment.Admin.PostWorkTypeConfigration;

  public PostWorkTypeConfigurationDetails(param: any) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.WorkType_Configuration_List = param;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTWT, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetMC = BaseUrl + environment.Admin.GetMainCategoryConfigration;

  public GetMainCategoroyConfigurationDetails(Modelobj: AddTaskConfigurationModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetMC, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiMCUrlPOST =  BaseUrl + environment.Admin.PostMainCategoryConfigration;

  public PostMainCategoroyConfigurationDetails(param: any) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.MainCategoroy_Configuration_List = param;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiMCUrlPOST, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOSTp = BaseUrl + environment.Admin.AddOrdertypecodes;
    public AddOrdertypecodes() {
      var ANYDTO: any = {};

      ANYDTO.WI_ImportFrom = 4;
      ANYDTO.Type = 1;
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPOSTp, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }

    private apiUrlPOSTIC = BaseUrl + environment.Admin.AddItemCodes;
    public AddItemCodes() {
      var ANYDTO: any = {};

      ANYDTO.WI_ImportFrom = 4;
      ANYDTO.Type = 1;
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPOSTIC, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }
  
}
