import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { AddPropertyAlertModal } from "./add-property-alert-modal";

@Injectable({
    providedIn: "root"
  })

  export class AddProperrtyAlertService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

     // CreateUpdatePropertyAlert

private apiUrlPOST = BaseUrl + environment.Admin.CreateUpdatePropertyAlert;

public CreateUpdatePropertyAlertDatapost(Modelobj:AddPropertyAlertModal){
    // debugger
    let ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type
    ANYDTO.PA_PkeyID = Modelobj.PA_PkeyID;
    ANYDTO.PA_Name = Modelobj.PA_Name;
    ANYDTO.PA_IsActive = Modelobj.PA_IsActive;
    ANYDTO.PA_IsDelete = Modelobj.PA_IsDelete;
   

    if (Modelobj.Type != 3) {
        ANYDTO.Type = 1;
  
        if (Modelobj.PA_PkeyID != 0) {
          ANYDTO.Type = 2;
        }
        if (Modelobj.PA_IsDelete) {
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