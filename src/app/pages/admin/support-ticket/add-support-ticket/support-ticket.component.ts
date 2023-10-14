import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components";
import { BaseUrl } from "src/app/services/apis/rest-api";


@Component({
	templateUrl: "./support-ticket.component.html",
	
})
export class SupportTicketComponent implements OnInit {
	formUsrCommonGroup: FormGroup;
	MessageFlag: String;

	constructor(
		private formBuilder: FormBuilder,
		private xRouter: Router,
		private xmodalService: NgbModal,
	) {
		
	}
	public ngOnInit(): void {
		this.formUsrCommonGroup = this.formBuilder.group({
			//ST_Phone_Number: ["", Validators.required],
			
		});
	}
	get fx() {
		return this.formUsrCommonGroup.controls;
	}

	FormButton() {
		

		if (this.formUsrCommonGroup.invalid) {
			return;
		}


	}


	  commonMessage() {
		const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
		modalRef.componentInstance.MessageFlag = this.MessageFlag;
		modalRef.result.then(result => { }, reason => { });
	  }

}
