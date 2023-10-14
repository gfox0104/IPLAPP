import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { viewPropertyModel } from "./view-property-modal";

@Injectable({
    providedIn: "root"
  })

  export class viewPropertyService{

    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    
 //GetPropertyType

 private apiUrlGet = BaseUrl + environment.Admin.GetPropertyType ;

 public getPropertyData(Modelobj: viewPropertyModel) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.PT_PkeyID = Modelobj.PT_PkeyID;

    var obj = {
      PT_Name: Modelobj.PT_Name,
      PT_IsActive: Modelobj.PT_IsActive,
      PT_CreatedBy: Modelobj.PT_CreatedBy,
      PT_ModifiedBy: Modelobj.PT_ModifiedBy
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