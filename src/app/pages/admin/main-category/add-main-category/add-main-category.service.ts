import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddCategoryModel } from './add-main-category-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AddCategoryServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.PostCategory;

  public CategoryDataPost(Modelobj: AddCategoryModel) {
    
    var ANYDTO: any = {};
    ANYDTO.Main_Cat_pkeyID = Modelobj.Main_Cat_pkeyID;
    ANYDTO.Main_Cat_Name = Modelobj.Main_Cat_Name;
    ANYDTO.Main_Cat_Back_Color = Modelobj.Main_Cat_Back_Color;
    ANYDTO.Main_Cat_Active = Modelobj.Main_Cat_Active;
    ANYDTO.Main_Cat_IsActive = Modelobj.Main_Cat_IsActive;
    ANYDTO.Main_Cat_IsDelete = Modelobj.Main_Cat_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;

    if (Modelobj.Main_Cat_pkeyID != 0) {
      ANYDTO.Type = 2;
    }
    if (Modelobj.Main_Cat_IsDelete) {
      ANYDTO.Type = 4;
    }

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

  //for categary delete
  private apiUrlde = BaseUrl + environment.Admin.DeleteCategory;
  public deleteCategoryDataPost(Modelobj: AddCategoryModel) {
    var ANYDTO: any = {};
    ANYDTO.Main_Cat_pkeyID = Modelobj.Main_Cat_pkeyID;
    ANYDTO.Main_Cat_Active = 0;
    ANYDTO.Main_Cat_IsActive = Modelobj.Main_Cat_IsActive;
    ANYDTO.Main_Cat_IsDelete = 1;

    if (Modelobj.Type != 3) {
     
      if (Modelobj.Main_Cat_pkeyID) {
        ANYDTO.Type = 4;
      }
    }
    else{
      ANYDTO.Type = 3;
    } 

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlde, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
