import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { PreviouslySentModel } from '../previously-sent/previously-sent.model';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PreviouslySentService {
  public Errorcall;
  private token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
}
private apiUrlPost = BaseUrl + environment.Resources.GetMassEmail;
public GetEmailData(Modelobj: PreviouslySentModel) {
  var ANYDTO: any = {};
  ANYDTO.Mass_Email_PkeyId = Modelobj.Mass_Email_PkeyId;
  ANYDTO.UserID = Modelobj.UserID;
  ANYDTO.WhereClause = Modelobj.WhereClause;
  ANYDTO.Type = Modelobj.Type;

  let headers = new HttpHeaders({ "Content-Type": "application/json" });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  return this._http
    .post<any>(this.apiUrlPost, ANYDTO, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)

    );
}

}
