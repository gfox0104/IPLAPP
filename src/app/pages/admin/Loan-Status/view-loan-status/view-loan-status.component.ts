import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";




import { EncrDecrService } from '../../../../services/util/encr-decr.service';

import { LoanStatusFilters,  } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from "ngx-spinner";

import {Buttons, FormFields} from "../../Loan-Status/constants"

import { State } from "@progress/kendo-data-query";
import { viewLoanStatusModel } from "./view-Loan-status-modal";
import { AddLoanStatusModal } from "../add-Loan-status/add-Loan-status-modal";
import { viewLoanStatusService } from "./view-Loan-status.service";
import { AddLoanStatusService } from "../add-Loan-status/add-Loan-status.service";
import { AdminCommonService } from "../../admin-link/admin-common-service";
import { FilterAdminCommonModelDTO } from "../../admin-link/admin-common-model";


@Component({
  selector: 'app-view-loan-status',
  templateUrl: './view-loan-status.component.html',
  styleUrls: ['./view-loan-status.component.scss']
})
export class ViewLoanStatusComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;

  filterAdminCommon:FilterAdminCommonModelDTO = new  FilterAdminCommonModelDTO();
  viewLoanStatusModelObj :  viewLoanStatusModel = new  viewLoanStatusModel();
  AddLoanStatusModalObj : AddLoanStatusModal = new AddLoanStatusModal();
  public griddata: any[];
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;
  WorkOrderObj: any;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  buttons = Buttons;
  LoanStatusFilters = LoanStatusFilters

  isHelpActive = false;
  public state: State = {};


  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private xviewLoanStatusService:viewLoanStatusService,
    private xAddLoanStatusService:AddLoanStatusService,
    private xAdminCommonService:AdminCommonService,

  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      LoanstatusName: ["", Validators.required],
      loansta: ["", Validators.nullValidator],
    });
  }

  formButton() {
    // debugger
    this.isSubmitted = false;

    if (this.WorkOrderObj !== undefined) {
      this.AddLoanStatusModalObj.LS_PkeyID= this.WorkOrderObj;
    } else {
      this.AddLoanStatusModalObj.LS_PkeyID = 0;
    }

    this.xAddLoanStatusService
    .CreateUpdateLoanStatusDatapost(this.AddLoanStatusModalObj)
    .subscribe(response => {
      // console.log('sandip',response)
      if (response[0].Status != "0") {
        this.AddLoanStatusModalObj.LS_PkeyID = parseInt(response[0].LS_PkeyID);
        this.MessageFlag = "Loan Status Data Saved...!";
        this.isSubmitted = true;
        this.commonMessage();
        this.GetGridData();

      }else {
        this.MessageFlag = "This Record Allready Exist";
        this.isSubmitted = true;
        this.commonMessage();
      }
    });

  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
      if (!this.isHelpActive) {
        this.xmodalService.dismissAll()
      }
    });
  }

  addstate(event, content) {
if (event === 'Create Loan Status') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddLoanStatusModalObj = new AddLoanStatusModal();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }
GetGridData() {
    // debugger
    this.xviewLoanStatusService
      .ViewLoanStatusData(this.viewLoanStatusModelObj)
      .subscribe(response => {
        // console.log('sandip',response)
        if (response.length > 1 && response[1].length > 0) {
          this.viewLoanStatusModelObj.LS_Name= response[1][0].Filter_FilterName;
          this.viewLoanStatusModelObj.LS_IsActive = response[1][0].Filter_FilterIsActive;
          this.viewLoanStatusModelObj.LS_CreatedBy = response[1][0];
          this.viewLoanStatusModelObj.LS_ModifiedBy = response[1][0];
          this.filterCall();
          this.spinner.hide();
        }
        else {
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
          }
          this.spinner.hide();
        }

      });
      // console.log()
  }
showDetails(content, dataItem) {
    // debugger
    this.WorkOrderObj = dataItem.LS_PkeyID;
    this.AddLoanStatusModalObj.LS_PkeyID = dataItem.LS_PkeyID;
    this.AddLoanStatusModalObj.LS_Name = dataItem.LS_Name;
    this.AddLoanStatusModalObj.LS_IsActive = dataItem.LS_IsActive;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);
  }


  closeModal() {
    this.xmodalService.dismissAll();
  }

  // clear data
  AddNewState() {
    this.xRouter.navigate(["/state/addstate", 'new']);
  }

  deleteDetails(event, dataItem) {
    //  debugger
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddLoanStatusModalObj.LS_PkeyID = dataItem.LS_PkeyID;
      this.AddLoanStatusModalObj.LS_IsDelete = true;


      this.commonMessage();
      this.MessageFlag = "Deleted Successfully"
      this.xAddLoanStatusService
        .CreateUpdateLoanStatusDatapost(this.AddLoanStatusModalObj)
        .subscribe(response => {
          this.GetGridData();
        });

    }

  }



  filterCall() {
    this.viewLoanStatusModelObj.Type = 3;
    this.xviewLoanStatusService
      .ViewLoanStatusData(this.viewLoanStatusModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });
  }
  clearData(){
    this.filterAdminCommon.Filter_PageType=1;
    this.filterAdminCommon.Filter_FilterName=this.viewLoanStatusModelObj.LS_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLoanStatusModelObj.LS_IsActive;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLoanStatusModelObj.LS_IsActive;
    this.filterAdminCommon.Type=5;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        this.viewLoanStatusModelObj = new viewLoanStatusModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.filterAdminCommon.Filter_PageType=1;
    this.filterAdminCommon.Filter_FilterName=this.viewLoanStatusModelObj.LS_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLoanStatusModelObj.LS_IsActive;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLoanStatusModelObj.LS_IsActive;
    this.filterAdminCommon.Type=1;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        //console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }
  // checkChange(event, dataItem) {
  //   ////dfebugger;
  //   this.AddStateModelObj.IPL_StateID = dataItem.IPL_StateID;
  //   this.AddStateModelObj.IPL_State_IsActive = !dataItem.IPL_State_IsActive;
  //   this.AddStateModelObj.Type = 3;

  //   this.xAddStateServices
  //     .StateDataPost(this.AddStateModelObj)
  //     .subscribe(response => {
  //       this.MessageFlag = "Status upated...!";


  //       this.commonMessage();
  //       this.GetGridData();
  //     });
  // }

  DispalyInfo(event) {
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
  checkChange(event, dataItem) {
    ////dfebugger;
    this.AddLoanStatusModalObj.LS_PkeyID =dataItem.LS_PkeyID;
    this.AddLoanStatusModalObj.LS_IsActive = !dataItem.LS_IsActive;
    this.AddLoanStatusModalObj.Type = 3;

    this.xAddLoanStatusService
      .CreateUpdateLoanStatusDatapost(this.AddLoanStatusModalObj)
      .subscribe(response => {
        this.MessageFlag = "Status upated...!";


        this.commonMessage();
        this.GetGridData();
      });
  }

  // kendo check box event action

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }


}
