import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { SupportSettingModel, SupportTicketDocumentModel, SupportTicketModel } from "./support-setting.model";
import { SupportSettingServices } from "./support-setting.service";

@Component({
	templateUrl: "./support-setting.component.html",
	styleUrls: ["./support-setting.component.css"]
})
export class SupportSettingComponent implements OnInit {
	formUsrCommonGroup: UntypedFormGroup;
	uploadSaveUrl =
		BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground";
	uploadRemoveUrl = "removeUrl";
	submitted = false;
	button = "Submit";
	isLoading = false;
	filearr: any;
	Sup_Tickets_Pkey_ID = 0;
	MessageFlag: string;
	isHelpActive = false;

	SupportTicketModelObj: SupportTicketModel = new SupportTicketModel();
	SupportSettingModelObj: SupportSettingModel = new SupportSettingModel();
	SupportTicketDocumentModelObj: SupportTicketDocumentModel = new SupportTicketDocumentModel();
	constructor(
		private formBuilder: UntypedFormBuilder,
		private xSupportSettingServices: SupportSettingServices,
		private xRouter: Router,
		private xmodalService: NgbModal,
	) {
		//this.GetTicketId();
	}
	public ngOnInit(): void {
		this.formUsrCommonGroup = this.formBuilder.group({
			ST_Phone_Number: ["", Validators.required],
			ST_Ext: ["", [Validators.required, Validators.email]],
			ST_Attach: ["", Validators.nullValidator],
			ST_Subject: ["", Validators.required],
			ST_Message: ["", Validators.required]
		});
	}
	get fx() {
		return this.formUsrCommonGroup.controls;
	}
	
	FormButton() {
		
		//debugger
		this.submitted = true;

		if (this.formUsrCommonGroup.invalid) {
			return;
		}

		this.isLoading = true;
		this.button = "Processing";
		this.SupportSettingModelObj.Sup_Tickets_Ticket_Status = 4 // Open Ticket
		this.xSupportSettingServices
			.SupportTicketPost(this.SupportSettingModelObj)
			.subscribe(response => {
				//console.log('st', response);
				this.isLoading = false;
				//this.button = "Save";
				//console.log(response,'filearr');
				if (response != 0) {
					if (this.filearr != undefined && this.filearr.length > 0) {
						this.Sup_Tickets_Pkey_ID = parseInt(response[0].Sup_Tickets_Pkey_ID);
						this.processImage();
					}
					else{
						this.MessageFlag = "Ticket has been created..";
						this.xRouter.navigate(["/support/supportdetail/tickethistory/history"]);
						this.commonMessage();

						this.clearForm();
					}
				}

				
			});
			
	}
	onFileChange(event) {
		this.filearr = event.target.files
		
	}
	processImage() {
		//debugger
		if (this.filearr.length > 0) {
			for (let i = 0; i < this.filearr.length; i++) {
				const getnamefile = this.filearr[i].name;
				const extsn = getnamefile.split(".").pop();
				this.SupportTicketDocumentModelObj.Support_Docs_Ticket_ID = this.Sup_Tickets_Pkey_ID;
				this.SupportTicketDocumentModelObj.Support_Docs_File_Name = this.filearr[i].name;
				this.SupportTicketDocumentModelObj.Support_Docs_File_Size = this.filearr[i].size;
				this.SupportTicketDocumentModelObj.documentx = this.filearr[i];
				if (this.SupportTicketDocumentModelObj.documentx.type.startsWith("image")) {
					this.SupportTicketDocumentModelObj.Support_Docs_Type = 1;
				}
				else if (this.SupportTicketDocumentModelObj.documentx.type.startsWith("application")) {
					this.SupportTicketDocumentModelObj.Support_Docs_Type = 2;
				}
				
				
				this.xSupportSettingServices
					.PostSupportDocuments(this.SupportTicketDocumentModelObj)
					.then((res) => {
						res.subscribe(response => {
							//console.log('sucess', response)
							this.isLoading = false;
							this.button = "Save";
							// alert("Ticket has been created..");
							this.MessageFlag = "Ticket has been created..";
							this.commonMessage();
							this.clearForm();
						});
					})
			}
		}
		else {
			
		}
	}
	commonMessage() {
		const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
		modalRef.componentInstance.MessageFlag = this.MessageFlag;
		modalRef.result.then(result => { }, reason => { });
	}
	clearForm() {
		this.SupportTicketModelObj = new SupportTicketModel();
	}
	ticketHistory() {
		this.xRouter.navigate(["/support/supportdetail/tickethistory/history"]);
	}
	
	  SetHelpFlag()
	  {
		this.isHelpActive = !this.isHelpActive
		if (this.isHelpActive) {
		  this.MessageFlag = "Item Help mode is on...!";
		  this.commonMessage();
		}
		else
		{
		  this.MessageFlag = "Item Help mode is off...!";
		  this.commonMessage();
		}
	  }
	
	  DispalyInfo(event: Event, lblName)
	  {    
		if (this.isHelpActive) {
		  event.preventDefault();
		  this.MessageFlag = "Add Information for " + lblName;
		  this.commonMessage();
		}    
	  }
}
