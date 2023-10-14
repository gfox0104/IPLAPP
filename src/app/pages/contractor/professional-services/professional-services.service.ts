
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { HomepageServices } from '../../home/home.service';
import { ProfessionalServiceObject } from "./constants/professional-services.model";
import { ContactTypeMasterDTO } from "src/app/components/ipl-app-contact-type-manage/constant/ipl-app-contact-type-manage.modal";

@Injectable({
  providedIn: "root"
})

export class ProfessionalServices {
  public token: any;
  baseUrl = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = this.baseUrl + environment.Resources.PostProfessionalService;
  public PostProfessionalService(Modelobj: ProfessionalServiceObject) {
    var ANYDTO: any = {};
    ANYDTO.PS_PkeyId = Modelobj.PS_PkeyId;
    ANYDTO.PS_CompanyName = Modelobj.PS_CompanyName;
    ANYDTO.PS_ContactName = Modelobj.PS_ContactName;
    ANYDTO.PS_ContactType = Modelobj.PS_ContactType;
    ANYDTO.PS_Email = Modelobj.PS_Email;
    ANYDTO.PS_Phone = Modelobj.PS_Phone;
    ANYDTO.PS_Notes = Modelobj.PS_Notes;
    ANYDTO.PS_Website = Modelobj.PS_Website;
    ANYDTO.PS_Address = Modelobj.PS_Address;
    ANYDTO.Type=Modelobj.Type

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

  private apiUrlGet = this.baseUrl + environment.Resources.GetProfessionalService;
  public GetProfessionalService(Modelobj: ProfessionalServiceObject) {
    var ANYDTO: any = {};
    ANYDTO.PS_PkeyId = Modelobj.PS_PkeyId;
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

  private apiContactUrlGet = this.baseUrl + environment.Resources.GetContactTypeMaster;
  public GetContactTypeMaster() {
    var ANYDTO: any = {};
    ANYDTO.CT_PkeyId = 0
    ANYDTO.Type = 1;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiContactUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
  private apiContactUrlPost = this.baseUrl + environment.Resources.PostContactTypeMaster;
  public PostContactTypeMaster(Modelobj3: ContactTypeMasterDTO) {
    var ANYDTO: any = {};
    ANYDTO.CT_PkeyId = Modelobj3.CT_PkeyId;
    ANYDTO.CT_Name = Modelobj3.CT_Name;
    ANYDTO.CT_IsActive = Modelobj3.CT_IsActive;
    ANYDTO.UserId = Modelobj3.UserId;
    ANYDTO.Type = Modelobj3.Type

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiContactUrlPost, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }


}
