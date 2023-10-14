import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import { environment } from "../../../../../environments/environment";
import { SupportSettingReplyModel, SupportTicketDataModel } from "./support-ticket-detail..model";

@Injectable({
  providedIn: 'root'
})
export class SupportTicketDetailsService {
  public token: any;
  constructor(private _http: HttpClient,
		private _Route: Router,
		private xHomepageServices: HomepageServices) { 
      this.token = JSON.parse(localStorage.getItem("TOKEN"));
    }
    private apiUrlPOST = BaseUrl + environment.Support.GetSupportTicketReply;

    public GetSupportTicketreply(Modelobj: SupportSettingReplyModel) {
      var ANYDTO: any = {};
      ANYDTO.Support_Rep_PkeyId = Modelobj.Support_Rep_PkeyId;
      ANYDTO.Support_Rep_Support_Id = Modelobj.Support_Rep_Support_Id;
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
    private apiUrlPOST1 = BaseUrl + environment.Support.GetSupportTicket;

    public GetSingleSupportTicket(Modelobj: SupportTicketDataModel) {
      var ANYDTO: any = {};
      ANYDTO.Sup_Tickets_Pkey_ID = Modelobj.Sup_Tickets_Pkey_ID;
      ANYDTO.Sup_Tickets_CompanyID = Modelobj.Sup_Tickets_CompanyID;
      ANYDTO.Sup_Tickets_UserID = Modelobj.Sup_Tickets_UserID;
      ANYDTO.Sup_Tickets_ID = Modelobj.Sup_Tickets_ID;
      ANYDTO.Type = Modelobj.Type;
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append("Authorization", "Bearer " + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPOST1, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

    private apiUrlCmtPOST = BaseUrl + environment.Support.PostSupportTicketReply;

	public SupportCommentPost(Modelobj: SupportSettingReplyModel) {
		var ANYDTO: any = {};
		ANYDTO.Support_Rep_PkeyId = Modelobj.Support_Rep_PkeyId;
		ANYDTO.Support_Rep_Support_Id = Modelobj.Support_Rep_Support_Id;
		ANYDTO.Support_Rep_Reply = Modelobj.Support_Rep_Reply;
		ANYDTO.Support_Rep_Status = Modelobj.Support_Rep_Status;
		ANYDTO.Support_Rep_IsActie = Modelobj.Support_Rep_IsActie;
		ANYDTO.Support_Rep_IsDelete = Modelobj.Support_Rep_IsDelete;
		ANYDTO.Support_Rep_IsComment = Modelobj.Support_Rep_IsComment;
		ANYDTO.Support_Rep_CommentId = Modelobj.Support_Rep_CommentId;
		ANYDTO.Type = Modelobj.Type;
		let headers = new HttpHeaders({ "Content-Type": "application/json" });
		headers = headers.append("Authorization", "Bearer " + `${this.token}`);
		return this._http
			.post<any>(this.apiUrlCmtPOST, ANYDTO, { headers: headers })
			.pipe(
				tap(data => {
					return data;
				}),
				catchError(this.xHomepageServices.CommonhandleError)
			);
	}
}
