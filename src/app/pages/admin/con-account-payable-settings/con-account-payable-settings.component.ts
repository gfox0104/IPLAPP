import { Component, Injectable, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import {ContractorAccountSettingModel} from './con-account-payable-settings-model';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import {ContractorAccountServices} from './con-account-payable-settings.service';

@Component({
  templateUrl: "./con-account-payable-settings.component.html"
})

export class  ContractorAccountSettingComponent implements OnInit {
  formUsrCommonGroup: UntypedFormGroup;
  ContractorAccountSettingModelObj:ContractorAccountSettingModel = new ContractorAccountSettingModel();
  MessageFlag: string;
  submitted = false;
  button = "Save";
  isLoading = false;
  IsEditDisable = false;
  InvoicePayOutlist:any;
  PayoutFrequency:any;
  PayReport:any;
  dropCkck = false;
  isHelpActive = false;
  payoutvalFlag = false;
  constructor(
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xRoute: ActivatedRoute,
    private xContractorAccountServices:ContractorAccountServices
  
  ) {
  
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      payoutval: ["", Validators.required],
      Frequencyval: ["", Validators.nullValidator],
      invoiceage: ["", Validators.required],
      enddateval: ["", Validators.nullValidator],
      Reportval: ["", Validators.required],
       
    });
    this.InvoicePayOutlist  = [{ Id: 1, Name: "Field Complete Date" }, 
    { Id: 2, Name: "Sent To Client" }, { Id: 3, Name: "Complete Date" },
    { Id: 4, Name: "Invoice Date" }, { Id: 5, Name: "Invoice Approved" },];

    this.PayoutFrequency= [{ Id: 1, Name: "Net 15" }, 
    { Id: 2, Name: "Net 30" },
    { Id: 3, Name: "Daily" },{ Id: 4, Name: "Weekly" },{ Id: 5, Name: "Bi-Weekly" },{ Id: 6, Name: "Bi-Monthly" },
  ];
    
    this.PayReport= [{ Id: 1, Name: "Yes" }, { Id: 2, Name: "No" }];
    this.getmodeldata();
  }
 
 
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  getmodeldata(){
    this.ContractorAccountSettingModelObj.Type = 2;
    this.xContractorAccountServices.GetContractorAccount(this.ContractorAccountSettingModelObj)
    .subscribe(response =>{
      // debugger
    //console.log('res',response);
    this.ContractorAccountSettingModelObj.Con_Account_Pay_PkeyID = response[0][0].Con_Account_Pay_PkeyID;
    this.ContractorAccountSettingModelObj.Inv_Payout_Criteria = response[0][0].Inv_Payout_Criteria;
    this.ContractorAccountSettingModelObj.Inv_Age_Criteria = response[0][0].Payout_Frequency;
   this.ContractorAccountSettingModelObj.Next_Payout_End_Date = response[0][0].Next_Payout_End_Date;
    this.ContractorAccountSettingModelObj.Sent_Contractor_Pay_Report = response[0][0].Sent_Contractor_Pay_Report;
    this.ContractorAccountSettingModelObj.CompanyID = response[0][0].CompanyID;
    this.ContractorAccountSettingModelObj.IsActive = response[0][0].IsActive;
    this.ContractorAccountSettingModelObj.CreatetedBy = response[0][0].CreatetedBy;
    this.ContractorAccountSettingModelObj.ModifiedBy = response[0][0].ModifiedBy;
  
    this.formUsrCommonGroup.disable();
    this.IsEditDisable = true;
    this.button = "Update";
    })
  }
  // submit form
  FormButton() {
  ////dfebugger
    this.submitted = true;
    this.dropCkck = false;

    if (this.ContractorAccountSettingModelObj.Inv_Payout_Criteria == 0) {
      this.payoutvalFlag = true;
      this.dropCkck = true;
    }

    if (this.dropCkck) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";
    this.xContractorAccountServices
    .AddContractorAccountPost(this.ContractorAccountSettingModelObj)
    .subscribe(res=>{
      //console.log()
      if (res[0].length != 0) {
        this.MessageFlag = "Contractor Account Payable Data Saved...!";
        this.isLoading = false;
        this.button = "update";
        this.commonMessage();
        this.getmodeldata();
      }
    })
  
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  PayOut_Method(val){
    this.payoutvalFlag = false;
  }

  EditForms() {
    this.IsEditDisable = false;
    this.formUsrCommonGroup.enable();
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
