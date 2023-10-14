import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { trackmodeldata } from './user-tracking-model';
import * as moment from 'moment';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class UserTrackingServices{
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices ,  private encrDecr: EncrDecrService) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    private apiUrlPOST = BaseUrl + environment.Admin.GetActivityTracking;

    public GetReportDetail(Modelobj:trackmodeldata) {
     // var ANYDTO: any = {};
     var userTracking =  this.encrDecr.get('123456$#@$^@1ERF', localStorage.getItem("UserTrackingTime"));
      var obj =   {
        fromDate: moment(Modelobj.fromDate.toString()).format('MM/DD/yyyy'),
        toDate: moment(Modelobj.toDate.toString()).format('MM/DD/yyyy'),
        // User_Track_IsActive: parseInt(userTracking),
        User_Track_IsActive: true,
       User_Track_UserID : Modelobj.User_Track_UserID,
       NoofRows: Modelobj.NoofRows,
       PageNumber: Modelobj.PageNumber
      }
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPOST, obj, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

    private apiUrlGet = BaseUrl + environment.Admin.GetUserFilterList;
    public ViewUserData() {

      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlGet,{}, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

    private apiUrlDelete = BaseUrl + environment.Admin.DeleteActivityTrackingPhoto;
    public DeleteImage(id) {
      var obj =   {
        User_Track_PkeyId:id,
      }
    ////dfebugger
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlDelete,obj, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }
}
