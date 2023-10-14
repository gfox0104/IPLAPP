import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { viewPropertyAlertModel } from "./view-property-alert-modal";

@Injectable({
    providedIn: "root"
  })

  export class viewPropertyAlertService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

     //GetPropertyAlertStatus

 private apiUrlGet = BaseUrl + environment.Admin.GetPropertyAlert ;

 public ViewPropertyAlertData(Modelobj: viewPropertyAlertModel) {
  // debugger
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.PA_PkeyID = Modelobj.PA_PkeyID;

    var obj = {
      PA_Name : Modelobj.PA_Name,
      PA_IsActive: Modelobj.PA_IsActive,
      PA_CreatedBy: Modelobj.PA_CreatedBy,
      PA_ModifiedBy: Modelobj.PA_ModifiedBy
    };
  
    ANYDTO.FilterData = JSON.stringify(obj);

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  }