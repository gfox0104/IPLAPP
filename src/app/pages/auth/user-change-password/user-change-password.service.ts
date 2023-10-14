import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { UserChangePasswordModel } from "./user-change-password-model";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserChangePasswordServices {
  private token: any;

  constructor(private _http: HttpClient, private _Route: Router) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Login.GetUserLoginPassword;
  public GetUserPasswordData(Modelobj: UserChangePasswordModel) {
    let ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  private apiUrlPOST2 = BaseUrl + environment.Login.ChangeUserLoginPassword;
  public UserChangePasswordData(Modelobj: UserChangePasswordModel) {
    let ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    ANYDTO.User_Password = Modelobj.User_PasswordNew;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST2, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  // common handler
  private handleError(error: HttpErrorResponse) {
    alert("Something bad happened. please try again later...😌");
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
