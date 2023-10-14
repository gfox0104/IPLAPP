import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { SupportSettingModel, SupportTicketDocumentModel, SupportTicketModel } from "./support-setting.model";
import { BaseUrl } from "../../../services/apis/rest-api";
import { HomepageServices } from "../../home/home.service";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class SupportSettingServices {
	public token: any;
	doc: any
	constructor(
		private _http: HttpClient,
		private _Route: Router,
		private xHomepageServices: HomepageServices
	) {
		this.token = JSON.parse(localStorage.getItem("TOKEN"));
	}

	private apiUrlPOST = BaseUrl + environment.Support.PostSupportTicket;

	public SupportTicketPost(Modelobj: SupportSettingModel) {
		//debugger
		var ANYDTO: any = {};
		ANYDTO.Sup_Tickets_Pkey_ID = Modelobj.Sup_Tickets_Pkey_ID;
		ANYDTO.Sup_Tickets_Phone = Modelobj.Sup_Tickets_Phone;
		ANYDTO.Sup_Tickets_Email = Modelobj.Sup_Tickets_Email;
		ANYDTO.Sup_Tickets_Subject = Modelobj.Sup_Tickets_Subject;
		ANYDTO.Sup_Tickets_Message = Modelobj.Sup_Tickets_Message;
		ANYDTO.Sup_Tickets_Ticket_Status = Modelobj.Sup_Tickets_Ticket_Status;
		ANYDTO.Sup_Tickets_IsActive = Modelobj.Sup_Tickets_IsActive;
		ANYDTO.Sup_Tickets_IsDelete = Modelobj.Sup_Tickets_IsDelete;
		ANYDTO.Sup_Tickets_CompanyID = Modelobj.Sup_Tickets_CompanyID;
		ANYDTO.Sup_Tickets_UserID = Modelobj.Sup_Tickets_UserID;
		ANYDTO.Sup_Tickets_ID = Modelobj.Sup_Tickets_ID;
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
	public readDoc(file) {
		//debugger
		const fr = new FileReader();
		return new Promise((resolve, reject) => {
		  fr.onerror = (err) => {
			reject(err);
		  }
	
		  fr.onloadend = () => {
			resolve(fr.result);
		  }
	
		  fr.readAsDataURL(file);
		});
	  }
	  public readFile(file, w, h) {
		  //debugger
		const fr = new FileReader();
		return new Promise((resolve, reject) => {
		  fr.onerror = (err) => {
			reject(err);
		  }
	
		  fr.onloadend = () => {
			const canvas = document.createElement('canvas'),
			  ctx = canvas.getContext('2d');
	
			// set its dimension to target size
			canvas.width = w;
			canvas.height = h;
	
			const image = new Image();
			image.src = fr.result.toString();
			image.onload = function () {
			  // draw source image into the off-screen canvas:
			  ctx.drawImage(image, 0, 0, w, h);
			  resolve(canvas.toDataURL('image/jpeg'));
			}
		  }
	
		  fr.readAsDataURL(file);
		});
	  }
	
	  public async PostSupportDocuments(Modelobj: SupportTicketDocumentModel) {
		//debugger
	  var StrEditDTO: any = {};
	  let ANYDTO: any = {};
	  let formData = new FormData()
	  StrEditDTO.docx = Modelobj.documentx;
	  ANYDTO.Support_Docs_PkeyID = Modelobj.Support_Docs_PkeyID;
	  ANYDTO.Support_Docs_Ticket_ID = Modelobj.Support_Docs_Ticket_ID;
	  ANYDTO.Support_Docs_File_Path = Modelobj.Support_Docs_File_Path;
	  ANYDTO.Support_Docs_File_Size = Modelobj.Support_Docs_File_Size;
	  ANYDTO.Support_Docs_File_Name = Modelobj.Support_Docs_File_Name;
	  ANYDTO.Support_Docs_Bucket_Name = Modelobj.Support_Docs_Bucket_Name;
	  ANYDTO.Support_Docs_Project_Id = Modelobj.Support_Docs_Project_Id;
	  ANYDTO.Support_Docs_Object_Name = Modelobj.Support_Docs_Object_Name;
	  ANYDTO.Support_Docs_UploadedBy = Modelobj.Support_Docs_UploadedBy;
	  ANYDTO.Support_Docs_Folder_Name = "Support Setting";
	  ANYDTO.Support_Docs_Type = Modelobj.Support_Docs_Type;
	  ANYDTO.Support_Docs_IsActive =  Modelobj.Support_Docs_IsActive;
	  ANYDTO.Support_Docs_IsDelete =  Modelobj.Support_Docs_IsDelete;
	  ANYDTO.Type = 1;
	  if (Modelobj.Support_Docs_File_Name == null) {
		  ANYDTO.Support_Docs_File_Name = StrEditDTO.docx.name;
		}
	  if (Modelobj.documentx.type.startsWith("image")) {
		  this.doc = await this.readFile(StrEditDTO.docx, 1024, 768);
	  }
	  else if (Modelobj.documentx.type.startsWith("application")) {
		  this.doc = await this.readDoc(StrEditDTO.docx);
		  
	  }
	  ANYDTO.Image = this.doc;
	  
	  const uploadapi = environment.cloudUrl + 'uploadSupportDocument'; 
	 
	  let headers = new HttpHeaders({ "Content-Type": "application/json" });
	  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  
	  return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
		tap(data => {
		  return data;
		}),
		catchError(this.xHomepageServices.CommonhandleError)
	  );
	}

	  //generate ticket Id
	  private apiUrlGet = BaseUrl + environment.Support.PostIPLAutoSupportticket;

	public GetSupportTicketId() {
		var ANYDTO: any = {};
		ANYDTO.Type = 1;
		let headers = new HttpHeaders({ "Content-Type": "application/json" });
		headers = headers.append("Authorization", "Bearer " + `${this.token}`);
		return this._http
			.post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
			.pipe(
				tap(data => {
					return data;
				}),
				catchError(this.xHomepageServices.CommonhandleError)
			);
	}
	 
}
