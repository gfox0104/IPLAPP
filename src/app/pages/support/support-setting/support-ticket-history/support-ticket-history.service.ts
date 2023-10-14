import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import { SupportSettingModel } from "../support-setting.model";
import {environment} from '../../../../../environments/environment'
 

@Injectable({
  providedIn: 'root'
})
export class SupportTicketHistoryService {
  public token: any;

  constructor(private _http: HttpClient,
		private _Route: Router,
		private xHomepageServices: HomepageServices) { 
    this.token = JSON.parse(localStorage.getItem("TOKEN"));
  }

  private apiUrlPOST = BaseUrl + environment.Support.GetSupportTicket;

	public GetSupportTicketPost(Modelobj: SupportSettingModel) {
    //debugger
		var ANYDTO: any = {};
		ANYDTO.Sup_Tickets_Pkey_ID = Modelobj.Sup_Tickets_Pkey_ID;
		ANYDTO.Sup_Tickets_CompanyID = Modelobj.Sup_Tickets_CompanyID;
		ANYDTO.Sup_Tickets_UserID = Modelobj.Sup_Tickets_UserID;
		ANYDTO.Type = Modelobj.Type;
		let headers = new HttpHeaders({ "Content-Type": "application/json" });
		headers = headers.append("Authorization", "Bearer " + `${this.token}`);
		return this._http
			.post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
			.pipe(
				tap(data => {
					return data;
				}),
				catchError(this.xHomepageServices.CommonhandleError)
			);
	}
}
