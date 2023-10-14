import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { AddOccupancyModal } from "./add-occupancy-modal";

@Injectable({
    providedIn: "root"
  })

  export class AddOccupancyService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    // CreateUpdateOccupancyStatus

private apiUrlPOST = BaseUrl + environment.Admin.CreateUpdateOccupancyStatus;

public ViewOccupancyDatapost(Modelobj:AddOccupancyModal){
    // debugger
    let ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type
    ANYDTO.OS_PkeyID = Modelobj.OS_PkeyID;
    ANYDTO.OS_Name = Modelobj.OS_Name;
    ANYDTO.OS_IsActive = Modelobj.OS_IsActive;
    ANYDTO.OS_IsDelete = Modelobj.OS_IsDelete;
    ANYDTO. UserID = Modelobj.UserID

    if (Modelobj.Type != 3) {
        ANYDTO.Type = 1;
  
        if (Modelobj.OS_PkeyID != 0) {
          ANYDTO.Type = 2;
        }
        if (Modelobj.OS_IsDelete) {
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