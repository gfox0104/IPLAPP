
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ContactUsModel} from '../../support/contact-us/contact-us-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';

@Injectable({
  providedIn: "root"
})
export class ViewContactUsServices{
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
 
    private apiUrlPOST = BaseUrl + "api/Support/GetContactDetails";
  
    public ViewContactDetail(Modelobj: ContactUsModel) {
      var ANYDTO: any = {};
       ANYDTO.Con_Us_PkeyId = Modelobj.Con_Us_PkeyId;
       ANYDTO.Type = Modelobj.Type;
    
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }
}