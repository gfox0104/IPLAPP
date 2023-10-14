import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { viewBackgroundProviderModel } from "./view-Background-Provider-Modal";

@Injectable({
    providedIn: "root"
  })

  export class viewBackgroundProviderService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    
    //Get Background Provider
    
    private apiUrlGet = BaseUrl + environment.Admin.GetBackgroundProvider;
    
    public ViewBackgroundProviderData(Modelobj:viewBackgroundProviderModel) {
    //   debugger
       var ANYDTO: any = {};
       ANYDTO.Type = Modelobj.Type;
       ANYDTO. Lot_Pricing_PkeyID = Modelobj.Back_Chk_ProviderID;
    
       var obj = {
        Back_Chk_ProviderName: Modelobj.Back_Chk_ProviderName,
        Back_Chk_IsActive: Modelobj.Back_Chk_IsActive,
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