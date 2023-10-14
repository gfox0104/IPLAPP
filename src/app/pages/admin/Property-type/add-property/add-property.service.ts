import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { AddPropertyModal } from "./add-property-modal";

@Injectable({
    providedIn: "root"
  })

  export class AddpropertyService{
    public token: any;
   

    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

     // CreateUpdateOccupancyStatus

private apiUrlPOST = BaseUrl + environment.Admin.CreateUpdatePropertyType ;

public CreateUpdatePropertyDatapost(Modelobj:AddPropertyModal){
     debugger
    let ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type
    ANYDTO.PT_PkeyID = Modelobj.PT_PkeyID;
    ANYDTO.PT_Name = Modelobj.PT_Name;
    ANYDTO.PT_IsActive = Modelobj.PT_IsActive;
    ANYDTO.PT_IsDelete = Modelobj.PT_IsDelete;
    ANYDTO. UserID = Modelobj.UserID

    if (Modelobj.Type != 3) {
        ANYDTO.Type = 1;
  
        if (Modelobj.PT_PkeyID != 0) {
          ANYDTO.Type = 2;
        }
        if (Modelobj.PT_IsDelete) {
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