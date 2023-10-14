import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WorkOrderSettingsPageModel, GeneralWorkOrderSettingsModel } from "./work-order-settings-model";
import { WorkOrderSettingsPageServices } from './work-order-settings.service';
import { WorkOrderSettings } from './work-order-settings';
import { IplAppModalContent } from '../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { Router } from "@angular/router";

@Component({
  templateUrl: "./work-order-settings.component.html"
})

export class WorkOrderSettingsPageComponent implements OnInit {
  submitted = false; // submitted;
  formUsrCommonGroup: UntypedFormGroup;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  MessageFlag: string; // custom msg sathi
  workOrderSettingsPageModelObj: WorkOrderSettingsPageModel = new WorkOrderSettingsPageModel();
  generalWorkOrderSettingsModelObj: GeneralWorkOrderSettingsModel = new GeneralWorkOrderSettingsModel();
  workOrderSettings = WorkOrderSettings;
  IsEditDisable = false;
  TimezoneList: any;
  isHelpActive = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xWorkOrderSettingsPageServices: WorkOrderSettingsPageServices,
    private xRouter: Router
  ) {
    this.TimezoneList = [
      { Id: 1, Name: "Central(CDT)" },
      { Id: 2, Name: "Eastern(EDT)" },
      { Id: 3, Name: "Mountain (MDT)" },
      { Id: 4, Name: "Pacific (PDT)" },
      { Id: 5, Name: "Hawaii (HST)" },
      { Id: 6, Name: "Guam (ChST)" }
    ];
   }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
    });
    this.workOrderSettings[0].modelObj = this.workOrderSettingsPageModelObj;
    this.workOrderSettings[1].modelObj = this.generalWorkOrderSettingsModelObj;
    this.GetWOSetting();
    
  }
  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  // submit form
  onSubmit() {
  ////dfebugger;
    this.submitted = true;
    this.workOrderSettingsPageModelObj;
    this.generalWorkOrderSettingsModelObj;

    // stop here if form is invalid
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    this.xWorkOrderSettingsPageServices
      .FirstDataPost(this.workOrderSettingsPageModelObj)
      .subscribe(response => {
        if (response[0].Status != "0") {
          this.workOrderSettingsPageModelObj.WO_Sett_pkeyID = parseInt(response[0].WO_Sett_pkeyID);
          this.SencondFormcall();
        }
      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  SencondFormcall() {
    this.xWorkOrderSettingsPageServices
      .SecondGWDataPost(this.generalWorkOrderSettingsModelObj)
      .subscribe(response => {
        //console.log("resp data 2", response);
        if (response[0].Status != "0") {
          this.generalWorkOrderSettingsModelObj.GW_Sett_pkeyID = parseInt(response[0].GW_Sett_pkeyID);
          this.MessageFlag = "Work order settings Saved...!";
          this.isLoading = false;
          this.button = "Update";
          this.commonMessage();
        }
      });
  }
  // clear data
  GetLocal: any;
  AddNewClient() {
    ////dfebugger;
    // this.GetLocal = this.xMasterlayoutComponent.LocalGetmasterfunction();
    if (this.GetLocal != null) {
      const pkeyuserId = this.GetLocal[0].User_pkeyID;
      var data = {
        pkeyuserId: pkeyuserId
      };

      // this.xMasterlayoutComponent.masterFunctionCall(data);
      this.xRouter.navigate(["/company/companyinfo"]);
    } else {
      var faltu = undefined;
      // this.xMasterlayoutComponent.masterFunctionCall(faltu);

      this.xRouter.navigate(["/company/companyinfo"]);
    }
  }
  // end code
  GetWOSetting() {
    this.xWorkOrderSettingsPageServices
      .GetWorkOrderSettingData(this.workOrderSettingsPageModelObj)
      .subscribe(response => {
      ////dfebugger;
        //console.log("resp data 2", response);
        if (response[0].length > 0 ){
          this.workOrderSettingsPageModelObj.WO_Sett_pkeyID = response[0][0].WO_Sett_pkeyID;
          this.workOrderSettingsPageModelObj.WO_Sett_CompanyID = response[0][0].WO_Sett_CompanyID;
          this.workOrderSettingsPageModelObj.WO_Sett_Allow_Dup_Num = response[0][0].WO_Sett_Allow_Dup_Num;
          this.workOrderSettingsPageModelObj.WO_Sett_Auto_Inc_GoBack = response[0][0].WO_Sett_Auto_Inc_GoBack;
          this.workOrderSettingsPageModelObj.WO_Sett_Auto_Inc_NeedInfo = response[0][0].WO_Sett_Auto_Inc_NeedInfo;
          this.workOrderSettingsPageModelObj.WO_Sett_Auto_Inc_Dup = response[0][0].WO_Sett_Auto_Inc_Dup;
          this.workOrderSettingsPageModelObj.WO_Sett_Auto_Inc_Recurring = response[0][0].WO_Sett_Auto_Inc_Recurring;
          this.workOrderSettingsPageModelObj.WO_Sett_Auto_Assign = response[0][0].WO_Sett_Auto_Assign;
          this.workOrderSettingsPageModelObj.WO_Sett_Detect_Pricing = response[0][0].WO_Sett_Detect_Pricing;
          this.workOrderSettingsPageModelObj.WO_Sett_Remove_Doller = response[0][0].WO_Sett_Remove_Doller;
          this.workOrderSettingsPageModelObj.WO_Sett_IsActive = response[0][0].WO_Sett_IsActive;
          this.workOrderSettingsPageModelObj.WO_Sett_UserId = response[0][0].WO_Sett_UserId;
          this.workOrderSettingsPageModelObj.Wo_Sett_Comapny_SAlert = response[0][0].Wo_Sett_Comapny_SAlert;
          this.workOrderSettingsPageModelObj.Wo_Sett_Custom_Titlebar = response[0][0].Wo_Sett_Custom_Titlebar;
          this.workOrderSettingsPageModelObj.Wo_Sett_Default_Time = response[0][0].Wo_Sett_Default_Time;

          this.workOrderSettings[0].modelObj = this.workOrderSettingsPageModelObj;          
        }

        this.xWorkOrderSettingsPageServices
          .GetGeneralWorkOrderSettingData(this.generalWorkOrderSettingsModelObj)
          .subscribe(response => {
          ////dfebugger;
            //console.log("resp data 2", response);
            if (response[0].length > 0 ){
              this.generalWorkOrderSettingsModelObj.GW_Sett_pkeyID = response[0][0].GW_Sett_pkeyID;
              this.generalWorkOrderSettingsModelObj.GW_Sett_CompanyID = response[0][0].GW_Sett_CompanyID;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Field_Complete = response[0][0].GW_Sett_Field_Complete;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Allow_Contractor = response[0][0].GW_Sett_Allow_Contractor;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Assigned_Unread = response[0][0].GW_Sett_Assigned_Unread;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Allow_Estimated = response[0][0].GW_Sett_Allow_Estimated;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Require_Estimated = response[0][0].GW_Sett_Require_Estimated;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Sent_Ass_Cooradinator = response[0][0].GW_Sett_Sent_Ass_Cooradinator;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Sent_Ass_Processor = response[0][0].GW_Sett_Sent_Ass_Processor;
              this.generalWorkOrderSettingsModelObj.GW_Sett_Sent_Email_Multiple = response[0][0].GW_Sett_Sent_Email_Multiple;
              this.generalWorkOrderSettingsModelObj.GW_Sett_StaffName = response[0][0].GW_Sett_StaffName;
              this.generalWorkOrderSettingsModelObj.GW_Sett_IsActive = response[0][0].GW_Sett_IsActive;
              this.generalWorkOrderSettingsModelObj.GW_Sett_UserID = response[0][0].GW_Sett_UserID;
            
              this.workOrderSettings[1].modelObj = this.generalWorkOrderSettingsModelObj;
            }
          });
      });
  }
  SetHelpFlag() {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }

  DispalyInfo(event) {   
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }

  DispalyInfoCust(event: Event, lblName)
  {    
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }    
  }
}
