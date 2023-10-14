import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { viewLotPricingFilterModel } from "./view-Lot-Pricing-Model";


@Injectable({
    providedIn: "root"
  })

  export class viewLotPricingFilterService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    
    //Get Lot Pricing Filter
    
    private apiUrlGet = BaseUrl + environment.Admin.GetLotPricingFilter;
    
    public ViewLotPricingFilterData(Modelobj:viewLotPricingFilterModel) {
      // debugger
       var ANYDTO: any = {};
       ANYDTO.Type = Modelobj.Type;
       ANYDTO. Lot_Pricing_PkeyID = Modelobj.Lot_Pricing_PkeyID;
    
       var obj = {
        Lot_Pricing_Name: Modelobj.Lot_Pricing_Name,
        Lot_Pricing_IsActive: Modelobj.Lot_Pricing_IsActive,
        Lot_Pricing_CreatedBy: Modelobj.Lot_Pricing_CreatedBy,
        Lot_Pricing_ModifiedBy: Modelobj.Lot_Pricing_ModifiedBy
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