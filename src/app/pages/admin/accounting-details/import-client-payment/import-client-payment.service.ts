import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ClientPaymentModel } from "./import-client-payment-model";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class ImportClientPaymentService {
	public token: any;

	constructor(
		private _http: HttpClient,
		private _Route: Router,
		private xHomepageServices: HomepageServices
	) {
		this.token = JSON.parse(localStorage.getItem("TOKEN"));
	}

	private apiUrlPOST = BaseUrl + environment.Support.PostContact;

	public ClientPaymentImport(Modelobj: ClientPaymentModel) {
		var ANYDTO: any = {};
		ANYDTO.ICP_Number = Modelobj.ICP_Number;
		ANYDTO.ICP_Date = Modelobj.ICP_Date;
		ANYDTO.ICP_Company = Modelobj.ICP_Company;
		ANYDTO.ICP_Attach = Modelobj.ICP_Attach;
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

	private apiUrlGETCompany = BaseUrl + environment.Accounting.GetClientCompanyList;
	public GetCompanyList() {
	  var ANYDTO: any = {};
	  let headers = new HttpHeaders({ "Content-Type": "application/json" });
	  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  
	  return this._http
		.post<any>(this.apiUrlGETCompany, ANYDTO, { headers: headers })
		.pipe(
		  tap(data => {
			return data;
		  }),
		  catchError(this.handleError)
		);
	}
	private handleError(error: HttpErrorResponse) {
		alert("Something bad happened; please try again later....");
		if (error.error instanceof ErrorEvent) {
		 
		} else {
		
		}
		return throwError("Something bad happened; please try again later.");
	  }
}
