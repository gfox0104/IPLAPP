import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { viewAccessUserLogModal } from "./view-access-user-log-model";

@Injectable({
    providedIn: "root"
  })

  export class viewAccessUserLogService{
    public token: any;


    constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    //Get Access User Log

    private apiUrlGet = BaseUrl + environment.Admin.GetAccessUserLogNew;

    public ViewAccessUserLogData(Modelobj:viewAccessUserLogModal) {
      // debugger
       var ANYDTO: any = {};
       ANYDTO.Type = Modelobj.Type;
       ANYDTO. Acc_PkeyID = Modelobj.Acc_PkeyID;

       var obj = {
        Acc_UserAction: Modelobj.Acc_UserAction,
        Acc_Access_Log_Data: Modelobj.Acc_Access_Log_Data,
        Acc_Type_of_Log: Modelobj.Acc_Type_of_Log,
        Acc_Log_Details: Modelobj.Acc_Log_Details,
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
