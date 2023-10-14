import { Component, Injectable, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components";
import {ContactUsModel} from "./contact-us-model";
import { ContactUsServices } from "./contact-us.service";


@Component({
  templateUrl: "./contact-us.component.html",
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  submitted = false; // submitted;
  formUsrCommonGroup: UntypedFormGroup;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  IsAssigned = false;
  MessageFlag: string; // custom msg sathi
  ContactUsModelObj: ContactUsModel = new ContactUsModel();
	isHelpActive = false;
  constructor(private formBuilder: UntypedFormBuilder,private xContactUsServices:ContactUsServices,
    private xmodalService: NgbModal,) {
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      FName: ["", Validators.required],
      Emailval: ["", [Validators.required, Validators.email]],
      Numberval: ["", Validators.nullValidator],
      Messageval: ["", Validators.required],
      subject:["", Validators.required],
    });
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  FormButton() {
    this.submitted = true;
 
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";
    this.ContactUsModelObj.Con_Us_ValType = 0;
    this.xContactUsServices
      .ContactDetailPost(this.ContactUsModelObj)
      .subscribe(response => {
        this.isLoading = false;
        this.button = "Save";
        alert('Message has been sent..')
         this.clearForm();
     });
  }
  clearForm() {
    this.ContactUsModelObj = new ContactUsModel();
  }
  commonMessage() {
		const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
		modalRef.componentInstance.MessageFlag = this.MessageFlag;
		modalRef.result.then(result => { }, reason => { });
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
