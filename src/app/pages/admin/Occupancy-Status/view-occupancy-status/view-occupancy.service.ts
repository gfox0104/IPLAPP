import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError,tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { viewOccupancyModel } from "./view-Occupancy-model";

@Injectable({
    providedIn: "root"
  })

  export class viewOccupancyService{
   public token: any;
   

constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
}
  


 //GetOccupancyStatus

 private apiUrlGet = BaseUrl + environment.Admin.GetOccupancyStatus ;

 public ViewoccupancyData(Modelobj: viewOccupancyModel) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO. OS_PkeyID = Modelobj.OS_PkeyID;

    var obj = {
      OS_Name: Modelobj.OS_Name,
      OS_IsActive: Modelobj.OS_IsActive,
      OS_CreatedBy: Modelobj.OS_CreatedBy,
      OS_ModifiedBy: Modelobj.OS_ModifiedBy
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