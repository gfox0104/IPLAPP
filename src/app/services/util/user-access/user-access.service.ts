import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseUrl } from "../../apis/rest-api";
import { HomepageServices } from '../../../pages/home/home.service';
import { UserAccessModel } from './user-access-model';
import { EncrDecrService } from '../encr-decr.service';


@Injectable({
  providedIn: "root"
})

export class CommonMenuServices {
  public Errorcall;
  public token: any;
  constructor(
    private _http: HttpClient,
    private xHomepageServices: HomepageServices,
    private EncrDecr: EncrDecrService
  ) { }

  private apiUrlGet = BaseUrl + "api/RESTIPL/GetUserMenuAccess";

  public UserAccessGet(Modelobj: UserAccessModel) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    let ANYDTO: any = {};

    ANYDTO.MenuID = Modelobj.MenuID;
    ANYDTO.UserID = Modelobj.UserID;

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

  userRestrict(office_result?) {
    if (localStorage.getItem('usertemp_') != null) {
      const encuser = JSON.parse(localStorage.getItem('usertemp_'));
      const decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      const decuser = JSON.parse(decval);

      let restrictions = {};

      switch (decuser[0].GroupRoleId) {
        case 1:
          {
            restrictions['OfficeResulth'] = false;
            restrictions['processorh'] = false;
            restrictions['tabhide'] = false;
            break;
          }
        case 2:
          {
            restrictions['OfficeResulth'] = false;
            restrictions['processorh']= false;
            restrictions['tabhide'] = true;
            restrictions['fieldtab'] = false;
            break;
          }
        case 3:
          {
            restrictions['OfficeResulth'] = false;
            restrictions['processorh'] = false;
            restrictions['tabhide'] = false;
            break;
          }
        case 4:
          {
            restrictions['OfficeResulth'] = false;
            restrictions['processorh'] = true;
            restrictions['tabhide'] = false;
            restrictions['fieldtab']  = true;
            break;
          }
        case 5:
          {
            restrictions['OfficeResulth'] = false;
            restrictions['processorh'] = false;
            restrictions['tabhide'] = office_result ? false : true;
            restrictions['fieldtab']  = false;
            break;
          }
      }

      return restrictions;
    }
  }
}
