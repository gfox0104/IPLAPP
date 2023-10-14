import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import {HomeModel} from './home-model';
import {WorkOderViewModel} from '../work-order/work-order-view/work-order-view-model';

import { environment } from '../../../environments/environment';








@Injectable({
  providedIn: "root"
})
export class HomepageServices {
  public Errorcall;
  private token: any; 
  baseUrl = environment.domain
  constructor(private _http: HttpClient, private _Route: Router,  private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlGet = this.baseUrl +"api/RESTIPL/PostAddLoginData";


  public WorkorderGet(HomeModelobj:HomeModel) {
    ////////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    //////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.username = HomeModelobj.username;
    ANYDTO.token = HomeModelobj.token;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.handleError)
        //catchError( this.Errorcall.handleError)
      );
  }

// get work order details
private apiUrl = this.baseUrl + "api/RESTIPL/GetWorkOrderData";

public Workorder(WorkOderViewModelobj:WorkOderViewModel) {
  ////////dfebugger;
  //////dfebugger;
  var ANYDTO: any = {};
  ANYDTO.workOrder_ID  = WorkOderViewModelobj.workOrder_ID;
  ANYDTO.Type = 3;

  let headers = new HttpHeaders({ "Content-Type": "application/json" });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  return this._http
    .post<any>(this.apiUrl, ANYDTO, { headers: headers })
    .pipe(
      tap(data => {
        //console.log(data);
        return data;
      }),
      catchError(this.handleError)
      //catchError( this.Errorcall.handleError)
    );
}



  // common handler
  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User...');
      window.location.href = '/admin/login';
    } else {
    alert("Invalid Request...");
    }
    //////dfebugger;
   
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
}
