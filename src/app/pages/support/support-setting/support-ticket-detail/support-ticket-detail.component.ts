import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { SupportSettingReplyModel, SupportTicketDataModel } from "./support-ticket-detail..model";
import { SupportTicketDetailsService } from "./support-ticket-detail.service";


@Component({
	selector: "app-support-ticket-detail",
	templateUrl: "./support-ticket-detail.component.html",
	styleUrls: ["./support-ticket-detail.component.scss"]
})
export class SupportTicketDetailComponent implements OnInit {
	SupportSettingReplyModelObj:SupportSettingReplyModel = new SupportSettingReplyModel();
	AddCommentModelObj:SupportSettingReplyModel = new SupportSettingReplyModel();
	SupportTicketDataModelObj:SupportTicketDataModel = new SupportTicketDataModel();
	SupTicketsIDObj:any;
	Doclist:any;
	button = "Submit";
	isLoading = false;
	comment = '';
	public MsgList: [];
	MessageFlag: string;
	constructor(
		private xRoute: ActivatedRoute,
		private EncrDecr: EncrDecrService,
		private xSupportTicketDetailService:SupportTicketDetailsService,
		private xmodalService: NgbModal,
	) {
			this.getModelData();
		}

	ngOnInit(): void {

	}
	getModelData() {
		//debugger
		const id1 = this.xRoute.snapshot.params['new'];
		if (id1 == 'new') {
		  this.SupportSettingReplyModelObj = new SupportSettingReplyModel();
		} else {
		  let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
		  this.SupTicketsIDObj = parseInt(id);
		 this.GetSupportReply()
		}
	  }
	  GetSupportReply(){
		this.SupportTicketDataModelObj.Sup_Tickets_Pkey_ID =  this.SupTicketsIDObj;
		
		this.xSupportTicketDetailService
		.GetSingleSupportTicket(this.SupportTicketDataModelObj)
		.subscribe(response => {
			//debugger;
		  //console.log('res',response)

		  this.SupportTicketDataModelObj.Sup_Tickets_Pkey_ID = response[0][0].Sup_Tickets_Pkey_ID;
		  this.SupportTicketDataModelObj.Sup_Tickets_Email = response[0][0].Sup_Tickets_Email;
		  this.SupportTicketDataModelObj.Sup_Tickets_ID = response[0][0].Sup_Tickets_ID;
		  this.SupportTicketDataModelObj.Sup_Tickets_Message = response[0][0].Sup_Tickets_Message;
		  this.SupportTicketDataModelObj.Sup_Tickets_Phone = response[0][0].Sup_Tickets_Phone;
		  this.SupportTicketDataModelObj.Sup_Tickets_Subject = response[0][0].Sup_Tickets_Subject;
		  this.SupportTicketDataModelObj.Sup_Tickets_Ticket_Status = response[0][0].Sup_Tickets_Ticket_Status;
		  this.SupportTicketDataModelObj.AddDate = response[0][0].AddDate;
		  this.SupportTicketDataModelObj.User_fullname = response[0][0].User_FirstName + ' '+ response[0][0].User_LastName;
		  this.SupportTicketDataModelObj.Sup_Comment_Show = response[0][0].Sup_Comment_Show;
		  this.Doclist = response[2];
		  this.MsgList = response[1];
		
		});
	}
	SubmitComment()
	{
		this.isLoading = true;
		this.button = "processing"
		this.AddCommentModelObj.Type = 1;
		this.AddCommentModelObj.Support_Rep_Support_Id = this.SupportTicketDataModelObj.Sup_Tickets_Pkey_ID;
		this.AddCommentModelObj.Support_Rep_IsComment = true;
		this.xSupportTicketDetailService
			.SupportCommentPost(this.AddCommentModelObj)
			.subscribe(response => {
				//debugger;
				//console.log('st', response);
				this.isLoading = false;
				this.button = "Submit";
				if (response != 0) {
					this.MessageFlag = "Comment added..";
					this.commonMessage();
					this.getModelData();
				}

				//this.xRouter.navigate(["/support/supportdetail/tickethistory/history"]);
			});
	}
	commonMessage() {
		const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
		modalRef.componentInstance.MessageFlag = this.MessageFlag;
		modalRef.result.then(result => { }, reason => { });
	}
	 
}