import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { HomeModel } from './home-model';
import { WorkOderViewModel } from '../work-order/work-order-view/work-order-view-model';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { BaseUrl } from 'src/app/services/apis/rest-api';

@Injectable({
  providedIn: "root"
})

export class HomepageServices {
  public Errorcall;
  public token: any;
  pathParam: any;

  constructor(private _http: HttpClient, private _Route: Router) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlGet = BaseUrl + "api/RESTIPL/PostAddLoginData";

  public WorkorderGet(HomeModelobj: HomeModel) {
    var ANYDTO: any = {};
    ANYDTO.username = HomeModelobj.username;
    ANYDTO.token = HomeModelobj.token;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  // get work order details
  private apiUrl = BaseUrl+ "api/RESTIPL/GetWorkOrderData";
  public Workorder(WorkOderViewModelobj: WorkOderViewModel) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = WorkOderViewModelobj.workOrder_ID;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this._http
      .post<any>(this.apiUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  ///////chart data 
  private apiUrlGetc = BaseUrl + "api/RESTAuthentication/PostChartData";
  public GetChartDetails(HomeModelobj: HomeModel) {
    //debugger
    var ANYDTO: any = {};
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .post<any>(this.apiUrlGetc, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  // common handler
  private handleError(error: HttpErrorResponse) {
    alert("Something bad happened; please try again later....");
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  // common handler
  public CommonhandleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User Found...!');
      // window.location.href = '/';
    } else {
      alert("Something bad happened, please try again later...😌");
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
    return throwError("Something bad happened; please try again later.");
  }

  setPathParam(param) {
    this.pathParam = param;
  }

  getPathParam() {
    return this.pathParam;
  }

}
