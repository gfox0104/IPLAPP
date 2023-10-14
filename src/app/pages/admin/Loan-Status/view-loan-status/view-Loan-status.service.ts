import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { viewLoanStatusModel } from "./view-Loan-status-modal";

@Injectable({
    providedIn: "root"
  })

  export class viewLoanStatusService{
    public token: any;
   

constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
}

//GetLoanStatus

private apiUrlGet = BaseUrl + environment.Admin.GetLoanStatus ;

public ViewLoanStatusData(Modelobj:viewLoanStatusModel ) {
  // debugger
   var ANYDTO: any = {};
   ANYDTO.Type = Modelobj.Type;
   ANYDTO. LS_PkeyID = Modelobj.LS_PkeyID;

   var obj = {
    LS_Name: Modelobj.LS_Name,
     LS_IsActive: Modelobj.LS_IsActive,
     LS_CreatedBy: Modelobj.LS_CreatedBy,
     LS_ModifiedBy: Modelobj.LS_ModifiedBy
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