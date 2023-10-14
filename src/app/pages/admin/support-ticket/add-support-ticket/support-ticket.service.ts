import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class SupportTicketServices {
	public token: any;
	doc: any
	constructor(
		private _http: HttpClient,
		private _Route: Router,
		private xHomepageServices: HomepageServices
	) {
		this.token = JSON.parse(localStorage.getItem("TOKEN"));
	}

	

	 
	 
}
