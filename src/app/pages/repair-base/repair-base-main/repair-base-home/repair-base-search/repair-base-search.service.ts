import { Injectable } from '@angular/core';
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RepairBaseSearchModel } from "./repair-base-search.model";
import { BaseUrl } from "../../../../../services/apis/rest-api";
import { HomepageServices } from "../../../../home/home.service";

@Injectable({
  providedIn: 'root'
})
export class RepairBaseSearchService {
  public token: any;
  
  constructor(
    private _http: HttpClient,
		private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem("TOKEN"));
  }
  private apiUrlPOST = "https://webapi.bluebook.net/api/v1/healthchecks/ping";

  public RepairBaseSearch(Modelobj: RepairBaseSearchModel){
    var ANYDTO: any = {};
		ANYDTO.RB_Startdate = Modelobj.RB_Startdate;
		ANYDTO.RB_Enddate = Modelobj.RB_Enddate;
		ANYDTO.RB_BlueBook_ID = Modelobj.RB_BlueBook_ID;
		ANYDTO.RB_Reference_ID = Modelobj.RB_Reference_ID;
		ANYDTO.RB_Batch_ID = Modelobj.RB_Batch_ID;
		ANYDTO.RB_Order = Modelobj.RB_Order;
		ANYDTO.RB_City = Modelobj.RB_City;
		ANYDTO.RB_State = Modelobj.RB_State;
		ANYDTO.RB_Zip = Modelobj.RB_Zip;
		ANYDTO.RB_Result_Num = Modelobj.RB_Result_Num;
  }
}
