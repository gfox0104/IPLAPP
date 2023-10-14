import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
import { HomepageServices } from '../../pages/home/home.service';
import { DropdownModel } from 'src/app/pages/models/dropdown-model';

@Injectable({
  providedIn: "root"
})


export class WorkOrderDrodownServices {
  public Errorcall;
  public token: any;
  baseUrl = environment.domain;
  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse (localStorage.getItem('TOKEN'));
  }
  // get drop down data following data

  private apiUrlGet = this.baseUrl + "/api/RESTIPL/GetDropDownData";

  public DropdownGet() {
    ////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ModelDTO: any = {};

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
   headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrlGet, { headers: headers }).pipe(
      tap(data => {
        console.log("all data", data);
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
      //catchError( this.Errorcall.handleError)
    );
  }

  ////////////////////////////////////////////////

  //admin madhe add user
  //GetGroupDetails
  private apiUrlGet2 = this.baseUrl + "/api/RESTIPL/GetGroupDetails";

  public DropdownGetGroupDetails() {
    ////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ModelDTO: any = {};
    ModelDTO.Grp_pkeyID = 0;
    ModelDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet2, ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  ////////////////////////////////////////////////
  //admin madhe add user
  private apiUrlGet3 = this.baseUrl + "/api/RESTIPL/GetSystemOfRecordsData";

  public DropdownGetSystemOfRecordsData() {
    ////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ModelDTO: any = {};
    ModelDTO.Sys_Of_Rcd_PkeyID = 0;
    ModelDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet3, ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }
  ///////////////////////////////////////////////////
  private apiUrlGet4 =
    this.baseUrl + "/api/RESTIPL/GetClientDataForDropDown";

  public DropdownGetClientnamesData() {
    ////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ModelDTO: any = {};

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet4, ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }


  ///////////////////////////////////////////////////
  //GetInvoiceitem for work type
  private apiUrlGet5 = this.baseUrl + "/api/RESTIPL/GetInvoiceitem";

  public GetInvoiceitemDropdownGet() {
    ////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ModelDTO: any = {};
    ModelDTO.Inv_Itm_pkeyID = 0;
    ModelDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet5, ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  ///////////////////////////////////////////////////

  //GetWorkTypecatDetails Group ka data
  private apiUrlGet6 = this.baseUrl + "/api/RESTIPL/GetWorkTypecatDetails";

  public GetWorkTypecatDetailsDropdownGet() {
    ////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ModelDTO: any = {};
    ModelDTO.Work_Type_Cat_pkeyID = 0;
    ModelDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet6, ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  ///////////////////////////////////////////////////

  // get drop down data following data

  private apiUrlGet7 =
    this.baseUrl + "/api/RESTIPLDROPDOWN/GetDropDownDataWorkOder";

  public DropdownGetWorkOrder(_drpdownmodel:DropdownModel) {
    // debugger
    // let ModelDTO: any = {};
    // ModelDTO.Type=1
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlGet7, _drpdownmodel, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
  }
  public GetDropdownList(drpdownmodel:DropdownModel) {
    let ModelDTO: any = {};
    ModelDTO.WorkOrderID=drpdownmodel.WorkOrderID;
    ModelDTO.FilterID=drpdownmodel.FilterID;
    ModelDTO.PageID=drpdownmodel.PageID;
    ModelDTO.Type=drpdownmodel.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlGet7, ModelDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
  }

  ////////////////////////////////////////////////
  private apiUrlGet8 = this.baseUrl + "api/RESTIPL/GetStateDetail";

  public StateDropDownData() {
    ////dfebugger;
    let ANYDTO: any = {};

    ANYDTO.IPL_StateID = 0;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet8, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  ///////////////////////////////////////////////////

  // get drop down data following data

  private apiUrlGet10 =
    this.baseUrl + "/api/RESTIPLDROPDOWN/GetDropDownDataClientResult";

  public DropdownGetClientResult(Modelobj: DropdownModel) {
    ////dfebugger;
    let ANYDTO: any = {};
    ANYDTO.WorkOrderID = Modelobj.WorkOrderID;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet10,ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  ////////////////////////////////////////////////

  // get drop down UOM data
  private apiUrlGet101 =
    this.baseUrl + "/api/RESTIPLDROPDOWN/GetDropDownUOM";

  public DropdownGetUOM() {
    ////dfebugger;
    let ModelDTO: any = {};
    ModelDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet101,ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  ////////////////////////////////////////////////

  // common handler
  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User Found..!');
    } else {
    alert("Invalid Request..");
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something's wrong, please try again later...");
  }
}
