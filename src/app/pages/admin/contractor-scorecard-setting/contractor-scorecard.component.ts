import { Component, Injectable, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';

import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { ContractorScoreCardSettingModel } from './contractor-scorecard-model';
import { ContractorScoreCardSettingServices } from './contractor-scorecard.service';

@Component({
  templateUrl: "./contractor-scorecard.component.html"
})

export class  ContractorScoreCardSettingComponent implements OnInit {
  formUsrCommonGroup: UntypedFormGroup;
  errormsg: string;
  info: string;
  property: string;
  escalated_penalty:string
  day: string;
  MessageFlag: string;
  submitted = false;
  button = "Save";
  isLoading = false;
  IsEditDisable = false;
  isHelpActive = false;
  ContractorScoreCardSettingModelObj:ContractorScoreCardSettingModel = new ContractorScoreCardSettingModel();
  constructor(
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xRoute: ActivatedRoute,
    private xContractorScoreCardSettingServices:ContractorScoreCardSettingServices,

  ) {

  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({

    });
    this.getmodeldata();
  }


  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  getmodeldata(){
    this.ContractorScoreCardSettingModelObj.Type = 2;
    this.xContractorScoreCardSettingServices
    .GetContractorScoreCard(this.ContractorScoreCardSettingModelObj)
    .subscribe(res =>{
      if (res[0].length != 0) {
        // debugger;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_pkeyId = res[0][0].Con_score_setting_pkeyId;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_picturequality = res[0][0].Con_score_setting_picturequality;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_workquality = res[0][0].Con_score_setting_workquality;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_follow_inst = res[0][0].Con_score_setting_follow_inst;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_duadate = res[0][0].Con_score_setting_duadate;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_estdate = res[0][0].Con_score_setting_estdate;

        this.ContractorScoreCardSettingModelObj.Con_score_setting_retern_property = res[0][0].Con_score_setting_retern_property;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_escalated_penalty = res[0][0].Con_score_setting_escalated_penalty;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_Info_needed = res[0][0].Con_score_setting_Info_needed;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_number_day = res[0][0].Con_score_setting_number_day;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_CreatedBy = res[0][0].Con_score_setting_CreatedBy;
        this.ContractorScoreCardSettingModelObj.Con_score_setting_ModifiedBy = res[0][0].Con_score_setting_ModifiedBy;
        this.formUsrCommonGroup.disable();
        this.IsEditDisable = true;
        this.button = "Update";
      }
    })
  }

  // submit form
  FormButton() {
    // //dfebugger
    this.submitted = true;


    if (this.ContractorScoreCardSettingModelObj.Con_score_setting_total === 100) {
      if (this.ContractorScoreCardSettingModelObj.Con_score_setting_retern_property <= 100) {
        if (this.ContractorScoreCardSettingModelObj.Con_score_setting_escalated_penalty <= 100) {
     if (this.ContractorScoreCardSettingModelObj.Con_score_setting_Info_needed <= 100) {
      if (this.ContractorScoreCardSettingModelObj.Con_score_setting_number_day <= 90) {
           // stop here if form is invalid
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    this.isLoading = true;
    this.button = "Processing";
    this.xContractorScoreCardSettingServices
    .AddContractorScoreCardPost(this.ContractorScoreCardSettingModelObj)
    .subscribe(res=>{
      if (res[0].length != 0) {
        this.MessageFlag = "Contractor ScoreCard Data Saved...!";
        this.isLoading = false;
        this.button = "update";
        this.commonMessage();
        this. getmodeldata();
      }
    });
      }
    }
      }
    }
    }
    else{
      return;
    }

  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  onpicturequantityChange(){
    // //dfebugger
   let total  =
 parseInt(this.ContractorScoreCardSettingModelObj.Con_score_setting_picturequality) +
            parseInt(this.ContractorScoreCardSettingModelObj.Con_score_setting_follow_inst) +
            parseInt(this.ContractorScoreCardSettingModelObj.Con_score_setting_workquality) +
            parseInt(this.ContractorScoreCardSettingModelObj.Con_score_setting_duadate) +
            parseInt(this.ContractorScoreCardSettingModelObj.Con_score_setting_estdate)

            if (total <= 100 ) {
              this.ContractorScoreCardSettingModelObj.Con_score_setting_total = total;
            }
            else{
             this.errormsg = "Please Check Uper values";
             this.ContractorScoreCardSettingModelObj.Con_score_setting_total = total;
            }
  }
  onkyepressneeded(){
    // //dfebugger
    if (this.ContractorScoreCardSettingModelObj.Con_score_setting_Info_needed <= 100) {
    }
    else{
      this.info = "Total weight must equal 100";
    }
  }
  onkyepressproperty(){
    if (this.ContractorScoreCardSettingModelObj.Con_score_setting_retern_property <= 100) {

    }
    else{
      this.property = "Total weight must equal 100";
    }
  }
  onkyepressnumberday(){
    if (this.ContractorScoreCardSettingModelObj.Con_score_setting_number_day <= 100) {

    }
    else{
      this.day = "Total weight must equal 100";
    }

  }
  onkyepressnumberEscalated_penalty(){
    if (this.ContractorScoreCardSettingModelObj.Con_score_setting_escalated_penalty <= 100) {

    }
    else{
      this.escalated_penalty = "Total weight must equal 100";
    }

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
