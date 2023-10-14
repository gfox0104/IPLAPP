import { Component, OnInit } from "@angular/core";
import { process } from "@progress/kendo-data-query";
import { Router } from "@angular/router";
import { tickets } from "./tickets";
import { Buttons } from "./buttons";

import { SupportTicketHistoryService } from "./support-ticket-history.service";
import { SupportSettingModel } from "../support-setting.model";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	templateUrl: "./support-ticket-history.component.html",
	styleUrls: ["./support-ticket-history.component.scss"]
})
export class SupportTicketHistoryComponent implements OnInit {
	SupportSettingModelObj:SupportSettingModel = new SupportSettingModel();
	public gridData: any[] = tickets;
	public gridView: any[];
	public mySelection: string[] = [];
	isHelpActive = false; // for set help tag flag
	MessageFlag: string; // custom msg sathi
	chkclick = true;
	checkAll: boolean = false;
	locked: boolean = false;
	user;
	buttons = Buttons;
	constructor(private xRouter: Router,
		private xSupportTicketHistoryService: SupportTicketHistoryService,
		private EncrDecr: EncrDecrService,private xmodalService: NgbModal, private spinner: NgxSpinnerService,) {

				this.xSupportTicketHistoryService
				.GetSupportTicketPost(this.SupportSettingModelObj)
				.subscribe(response => {
				console.log('grid',response)
				this.gridView = response[0];
				})

		}

	public ngOnInit(): void {
		this.gridView = this.gridData;
	}

	public onFilter(inputValue: string): void {
		this.gridView = process(this.gridData, {
			filter: {
				logic: "or",
				filters: [
					{
						field: "AddDate",
						operator: "contains",
						value: inputValue
					},
					{
						field: "Sup_Tickets_Subject",
						operator: "contains",
						value: inputValue
					},
					{
						field: "Sup_Tickets_Ticket_Status",
						operator: "contains",
						value: inputValue
					},
					{
						field: "LastUpdate",
						operator: "contains",
						value: inputValue
					}
				]
			}
		}).data;
	}
	showDetails(event, dataItem) {
		//this.xRouter.navigate(["/support/supportdetail/ticketdetail/detail"]);
		var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.Sup_Tickets_Pkey_ID);
    this.xRouter.navigate(["/support/supportdetail/ticketdetail/detail/", btoa(encrypted)]);
	}
	createTicket() {}


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

// common message modal popup
commonMessage() {
	const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
	modalRef.componentInstance.MessageFlag = this.MessageFlag;
	modalRef.result.then(result => { }, reason => { });
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
