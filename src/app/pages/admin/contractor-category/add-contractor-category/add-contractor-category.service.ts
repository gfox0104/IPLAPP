import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddContractorCategoryModel } from './add-contractor-category-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class AddContractorCategoryServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
 
  private apiUrlPOST = BaseUrl + environment.Admin.PostConCate;

  public CategoryDataPost(Modelobj: AddContractorCategoryModel) {
    
    var ANYDTO: any = {};
    ANYDTO.Con_Cat_pkeyID = Modelobj.Con_Cat_PkeyID;
    ANYDTO.Con_Cat_Name = Modelobj.Con_Cat_Name;
    ANYDTO.Con_Cat_Back_Color = Modelobj.Con_Cat_Back_Color;
    ANYDTO.Con_Cat_IsActive = Modelobj.Con_Cat_IsActive;
    ANYDTO.Con_Cat_Icon = Modelobj.Con_Cat_Icon;
    ANYDTO.Con_Cat_IsDelete = Modelobj.Con_Cat_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
  
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Con_Cat_PkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Con_Cat_IsDelete) {
        ANYDTO.Type = 4;
      }
    }
    else{
      ANYDTO.Type = 3;
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

  //for categary deletehttp://localhost:63050/api/RESTIPL/DeleteContractorCateData
  private apiUrlde = BaseUrl + environment.Admin.DeleteConCate;
  public deleteCategoryDataPost(Modelobj: AddContractorCategoryModel) {
    var ANYDTO: any = {};
    ANYDTO.Con_Cat_pkeyID = Modelobj.Con_Cat_PkeyID;
   
      
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 4;
    }
    else{
      ANYDTO.Con_Cat_IsActive = Modelobj.Con_Cat_IsActive;
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
