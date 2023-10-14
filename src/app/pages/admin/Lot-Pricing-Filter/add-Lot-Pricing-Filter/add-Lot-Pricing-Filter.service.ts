import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { AddLotPricingFiltrerModal } from "./add-Lot-Pricing-Filter-Model";


@Injectable({
    providedIn: "root"
  })

  export class AddLotPricingFilterService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    //  CreateUpdateLotPricingFilter

private apiUrlPOST = BaseUrl + environment.Admin.CreateUpdateLotPricingFilter;

public CreateUpdateLotPricingFilterDatapost(Modelobj:AddLotPricingFiltrerModal){
    //  debugger
    let ANYDTO: any = {};
        ANYDTO.Type = Modelobj.Type;
        ANYDTO.Lot_Pricing_PkeyID = Modelobj.Lot_Pricing_PkeyID;
        ANYDTO.Lot_Pricing_Name = Modelobj.Lot_Pricing_Name;
        ANYDTO.Lot_Pricing_IsActive = Modelobj.Lot_Pricing_IsActive;
        ANYDTO.Lot_Pricing_IsDelete = Modelobj.Lot_Pricing_IsDelete;
        ANYDTO.UserID = Modelobj.UserID;

    if (Modelobj.Type != 3) {
       ANYDTO.Type = 1;
  
        if (Modelobj.Lot_Pricing_PkeyID != 0) {
          ANYDTO.Type = 2;
        }
        if (Modelobj.Lot_Pricing_IsDelete) {
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