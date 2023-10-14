import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { AddLoanStatusModal } from "./add-Loan-status-modal";

@Injectable({
    providedIn: "root"
  })

  export class AddLoanStatusService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    // CreateUpdateLoanStatus

private apiUrlPOST = BaseUrl + environment.Admin.CreateUpdateLoanStatus;

public CreateUpdateLoanStatusDatapost(Modelobj:AddLoanStatusModal){
    // debugger
    let ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type
    ANYDTO.LS_PkeyID = Modelobj.LS_PkeyID;
    ANYDTO.LS_Name = Modelobj.LS_Name;
    ANYDTO.LS_IsActive= Modelobj.LS_IsActive;
    ANYDTO.LS_IsDelete = Modelobj.LS_IsDelete;
    ANYDTO. UserID = Modelobj.UserID

    if (Modelobj.Type != 3) {
        ANYDTO.Type = 1;
  
        if (Modelobj.LS_PkeyID != 0) {
          ANYDTO.Type = 2;
        }
        if (Modelobj.LS_IsDelete) {
          ANYDTO.Type = 4;
        }
      }
      else{
        ANYDTO.Type = 3;
      } 

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
   headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
   return this.http
     .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
     .pipe(
       tap(data => {
         return data;
       }),
       catchError(this.xHomepageServices.CommonhandleError)
     );


}
  }