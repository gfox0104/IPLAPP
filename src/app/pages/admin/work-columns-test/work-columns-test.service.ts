import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HomepageServices } from "../../home/home.service";
import { BaseUrl } from '../../../services/apis/rest-api';
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AddWorkColumnModel, workColumnsMenuMasterModel } from "./work-columns-test-model";

@Injectable({
    providedIn: "root"
  })

  export class WorkColumnsTestServices {
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
      }

      private apiUrlGetp = BaseUrl + environment.Admin.GetWorkColumnMasterDetails;
      public GetMenuGroupData(Modelobj: workColumnsMenuMasterModel) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
        // debugger
        var ANYDTO: any = {};
        ANYDTO.Wo_Column_PkeyId = Modelobj.Wo_Column_PkeyId;
        ANYDTO.Wo_Column_Name = Modelobj.Wo_Column_Name;
        ANYDTO. ACG_PKeyID_sel = Modelobj.ACG_PKeyID_sel;
        ANYDTO.Type = 1;
    
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
          .post<any>(this.apiUrlGetp, ANYDTO, { headers: headers })
          .pipe(
            tap(data => {
              return data;
            }),
            catchError(this.xHomepageServices.CommonhandleError)
           
          );
      }


        // Work Column data
  private apiUrlPOST = BaseUrl + environment.Admin.WorkColumnPost;

  public WorkColumnDataPost(Modelobj: AddWorkColumnModel) {
    // debugger;
    var ANYDTO: any = {};
    ANYDTO.ACG_PkeyID = Modelobj.ACG_PkeyID;
    ANYDTO.ACG_GroupID = Modelobj.ACG_GroupID;
    ANYDTO.ACG_ColumnID = Modelobj.ACG_ColumnID;
    ANYDTO.MenuArray = Modelobj.MenuArray;
    ANYDTO.Access_Colum_str = Modelobj.Access_Colum_str;
    ANYDTO.ACG_IsActive = Modelobj.ACG_IsActive;
    ANYDTO.ACG_IsDelete = Modelobj.ACG_IsDelete;
    ANYDTO.ACG_PKeyID_sel = Modelobj.ACG_PKeyID_sel;
    ANYDTO.UserID = Modelobj.UserID;
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