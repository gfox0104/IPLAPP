import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ViewStateModel } from "./view-state-model";
import { AddStateServices } from "../add-state/add-state.service";
import { AddStateModel } from "../add-state/add-state-model";
import { ViewUserServices } from "./view-state.service";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons } from '../constants';
import { StateFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormFields } from '../constants/form-fields'
import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  templateUrl: "./view-state.component.html"
})

export class ViewStateComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;

  ViewStateModelObj: ViewStateModel = new ViewStateModel();
  AddStateModelObj: AddStateModel = new AddStateModel();
  public griddata: any[];
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;
  WorkOrderObj: any;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  buttons = Buttons;
  StateFilters = StateFilters;
  public state: State = {};
  isHelpActive = false;

  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddStateServices: AddStateServices,
    private xViewUserServices: ViewUserServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      StateName: ["", Validators.required],
      disstatea: ["", Validators.nullValidator],
    });
  }

  formButton() {
    this.isSubmitted = false;
    if (this.WorkOrderObj !== undefined) {
      this.AddStateModelObj.IPL_StateID = this.WorkOrderObj;
    } else {
      this.AddStateModelObj.IPL_StateID = 0;
    }

    this.xAddStateServices
      .StateDataPost(this.AddStateModelObj)
      .subscribe(response => {

        if (response[0].Status != "0") {
          this.AddStateModelObj.IPL_StateID = parseInt(response[0].IPL_StateID);
          this.MessageFlag = "State Data Saved...!";
          this.isSubmitted = true;
          this.commonMessage();
          this.GetGridData();
        }
        else {
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

    if (event === 'Create State') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddStateModelObj = new AddStateModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }

  // this code selected event row
  showDetails(content, dataItem) {
    this.WorkOrderObj = dataItem.IPL_StateID;

    this.AddStateModelObj.IPL_StateID = dataItem.IPL_StateID;
    this.AddStateModelObj.IPL_StateName = dataItem.IPL_StateName;
    this.AddStateModelObj.IPL_State_IsActive = dataItem.IPL_State_IsActive;
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
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddStateModelObj.IPL_StateID = dataItem.IPL_StateID;
      this.AddStateModelObj.IPL_IsDelete = true;

      this.xAddStateServices
        .StateDataPost(this.AddStateModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  //get grid
  GetGridData() {
    this.xViewUserServices
      .ViewStateData(this.ViewStateModelObj)
      .subscribe(response => {
        // console.log('rit',response)
        if (response.length > 1 && response[1].length > 0) {
          this.ViewStateModelObj.IPL_StateName = response[1][0].State_Filter_Name;
          this.ViewStateModelObj.IPL_State_IsActive = response[1][0].State_Filter_IsStateActive;
          this.ViewStateModelObj.IPL_State_CreatedBy = response[1][0].IPL_State_CreatedBy;
          this.ViewStateModelObj.IPL_State_ModifiedBy = response[1][0].IPL_State_ModifiedBy;
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
  }

  filterCall() {

    this.ViewStateModelObj.Type = 3;
    this.xViewUserServices
      .ViewStateData(this.ViewStateModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });
  }

  clearData() {
    this.ViewStateModelObj.Type = 5;
    this.xViewUserServices
      .AddUpdateFilterAdminCustomerData(this.ViewStateModelObj)
      .subscribe(response => {
        this.ViewStateModelObj = new ViewStateModel();
        this.GetGridData();
      })

  }
  saveFilterData() {
    this.ViewStateModelObj.Type = 1;
    this.xViewUserServices
      .AddUpdateFilterAdminCustomerData(this.ViewStateModelObj)
      .subscribe(response => {
        this.MessageFlag = "State filter saved...!";
        this.commonMessage();
        this.filterCall();
      })
  }
  checkChange(event, dataItem) {
    ////dfebugger;
    this.AddStateModelObj.IPL_StateID = dataItem.IPL_StateID;
    this.AddStateModelObj.IPL_State_IsActive = !dataItem.IPL_State_IsActive;
    this.AddStateModelObj.Type = 3;

    this.xAddStateServices
      .StateDataPost(this.AddStateModelObj)
      .subscribe(response => {
        this.MessageFlag = "Status upated...!";


        this.commonMessage();
        this.GetGridData();
      });
  }

  DispalyInfo(event) {
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }


  //kendo check box event action

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
