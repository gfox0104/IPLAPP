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
import { VideoTrainingModel } from "./video-training.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
}) 
export class VideoTrainingServices{
    public Errorcall;
  private token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  private apiUrl = BaseUrl + environment.Support.GetTrainingVedio;
  public GetTrainingVedio(Modelobj: VideoTrainingModel) {
    ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.Training_Vedio_pkeyID = Modelobj.Training_Vedio_pkeyID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
}