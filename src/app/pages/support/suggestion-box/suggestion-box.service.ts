import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { SuggestionModel, SuggestionVoteModel } from './suggestion-box.model';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
}) 
export class SuggestionServices{  
  public Errorcall;
  private token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // public getIPAddress()  
  // {  
  //   return this.http.get("http://api.ipify.org/?format=json");  
  // }  
  private apiUrlAdd = BaseUrl + environment.Support.PostSuggestionBox;
  public AddSuggestion(Modelobj: SuggestionModel) {
    ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.Sug_PkeyID = Modelobj.Sug_PkeyID;
    ANYDTO.Sug_Tittle = Modelobj.Sug_Tittle;
    ANYDTO.Sug_Description = Modelobj.Sug_Description;
    ANYDTO.Sug_UserID = Modelobj.Sug_UserID;
    ANYDTO.Sug_IsActive = Modelobj.Sug_IsActive;
    ANYDTO.Sug_IsDelete = Modelobj.Sug_IsDelete;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlAdd, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
  private apiUrlGet = BaseUrl + environment.Support.GetSuggestionBox;
  public GetSuggestion(Modelobj: SuggestionModel) {
    ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.Sug_PkeyID = Modelobj.Sug_PkeyID;
    ANYDTO.WhereClause = Modelobj.WhereClause;
    ANYDTO.PageNumber = Modelobj.PageNumber;
    ANYDTO.NoofRows = Modelobj.NoofRows;
    ANYDTO.Type = 3;

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
  private apiUrlAddV = BaseUrl + environment.Support.AddSuggestionVote;
  public AddSuggestionVote(Modelobj: SuggestionVoteModel) {
    ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.Sug_Vote_PkeyID = Modelobj.Sug_Vote_PkeyID;
    ANYDTO.Sug_Vote_UserID = Modelobj.Sug_Vote_UserID;
    ANYDTO.Sug_Vote_Sug_PkeyID = Modelobj.Sug_Vote_Sug_PkeyID;
    ANYDTO.Sug_Vote_Val = Modelobj.Sug_Vote_Val;
    ANYDTO.Sug_Vote_IsActive = Modelobj.Sug_Vote_IsActive;
    ANYDTO.Sug_Vote_IsDelete = Modelobj.Sug_Vote_IsDelete;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlAddV, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
} 