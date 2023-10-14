import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { AddBackgroundProviderModal } from "./Add-Background-Provider-Modal";

@Injectable({
    providedIn: "root"
  })

  export class AddBackgroundProviderService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    //  CreateUpdateBackgroundProvider

private apiUrlPOST = BaseUrl + environment.Admin.CreateUpdateBackgroundProvider;

public CreateUpdateBackgroundProviderDatapost(Modelobj:AddBackgroundProviderModal){
    //  debugger
    let ANYDTO: any = {};
        ANYDTO.Type = Modelobj.Type;
        ANYDTO.Back_Chk_ProviderID = Modelobj.Back_Chk_ProviderID;
        ANYDTO.Back_Chk_ProviderName = Modelobj.Back_Chk_ProviderName;
        ANYDTO.Back_Chk_IsActive = Modelobj.Back_Chk_IsActive;
        ANYDTO.Back_Chk_IsDelete = Modelobj.Back_Chk_IsDelete;
        ANYDTO.UserID = Modelobj.UserID;

    if (Modelobj.Type != 3) {
       ANYDTO.Type = 1;
  
        if (Modelobj.Back_Chk_ProviderID != 0) {
          ANYDTO.Type = 2;
        }
        if (Modelobj.Back_Chk_IsDelete) {
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