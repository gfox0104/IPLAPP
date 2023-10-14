import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { IplAppModalContent } from 'src/app/components';
import { ViewRushServices } from "./view-rush.service";
import { ViewRushModel } from "./view-rush-model";
import { AddRushServices } from "../add-rush/add-rush.service";
import { AddRushModel } from "../add-rush/add-rush-model";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, FormFields } from '../constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Filters } from '../constants/filters'
import { from } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./view-rush.component.html"
})

export class ViewRushComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  ViewRushModelObj: ViewRushModel = new ViewRushModel();
  AddRushModelObj: AddRushModel = new AddRushModel();

  public griddata: any[];
  buttons = Buttons;
  filters = Filters;
  FormFields = FormFields;
  formUsrCommonGroup: UntypedFormGroup;
  isEditDisable = false;
  isSubmitted: boolean;
  submitted: boolean;
  MessageFlag: string;
  isHelpActive = false;
  public state: State = {};
  constructor(
    private xViewRushServices: ViewRushServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddRushServices: AddRushServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.GetGridData();
  }
  ngOnInit() {

    this.formUsrCommonGroup = this.formBuilder.group({
      RushName: ["", Validators.required],
      disbledFaltu1: ["", Validators.nullValidator]
    });
  }

  ngOnDestroy(): void {
    this.submitted = false;
    this.AddRushModelObj = new AddRushModel();
  }
  //get grid
  GetGridData() {
    this.xViewRushServices
      .ViewStateData(this.ViewRushModelObj)
      .subscribe(response => {
        // console.log("resp rush", response);
        if (response.length > 1 && response[1].length > 0) {
          this.ViewRushModelObj.rus_Name = response[1][0].Rush_Filter_RushName;
          this.ViewRushModelObj.rus_IsActive = response[1][0].Rush_Filter_RushIsActive;
          this.ViewRushModelObj.rus_CreatedBy = response[1][0].rus_CreatedBy;
          this.ViewRushModelObj.rus_ModifiedBy = response[1][0].rus_ModifiedBy;
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

  // this code selected event row
  showDetails(content, dataItem) {
    this.AddRushModelObj.rus_pkeyID = dataItem.rus_pkeyID;
    this.AddRushModelObj.rus_Name = dataItem.rus_Name;
    this.AddRushModelObj.rus_IsActive = dataItem.rus_IsActive;
    this.AddRushModelObj.rus_Active = dataItem.rus_Active;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);

  }

  addrus(event, content) {
    if (event === 'Create Rush') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddRushModelObj = new AddRushModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddRushModelObj.rus_pkeyID = dataItem.rus_pkeyID;
      this.AddRushModelObj.rus_IsDelete = true;

      this.xAddRushServices
        .RushDataPost(this.AddRushModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }




  formButton() {
    debugger
    this.isSubmitted = false;
    this.xAddRushServices
      .RushDataPost(this.AddRushModelObj)
      .subscribe(response => {
        if (response[0].Status != "0") {
          this.AddRushModelObj.rus_pkeyID = parseInt(response[0].rus_pkeyID);
          this.MessageFlag = "Rush Data Saved...!";
          this.isSubmitted = true;

          this.commonMessage();
          this.GetGridData()
        }
        else{
          this.MessageFlag = "This Record AllReady Exist";
          this.isSubmitted = true;
          this.commonMessage();
        }
      });
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'OK';
    modalRef.result.then(result => { }, reason => {
      if (!this.isHelpActive) {
        this.xmodalService.dismissAll();
      }
     });
  }

  closeModal() {
    this.xmodalService.dismissAll();
  }

  filterCall() {
    this.ViewRushModelObj.Type = 3;
    this.xViewRushServices
      .ViewStateData(this.ViewRushModelObj)
      .subscribe(response => {
        //console.log("resp rush", response);
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });
  }

  clearData() {
    this.ViewRushModelObj.Type = 5;
    this.xViewRushServices
      .AddUpdateFilterAdminRushData(this.ViewRushModelObj)
      .subscribe(response => {

        this.ViewRushModelObj = new ViewRushModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.ViewRushModelObj.Type = 1;
    this.xViewRushServices
      .AddUpdateFilterAdminRushData(this.ViewRushModelObj)
      .subscribe(response => {

        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }

  checkChange(event, dataItem) {
    ////dfebugger;
    this.AddRushModelObj.rus_pkeyID = dataItem.rus_pkeyID;
    this.AddRushModelObj.rus_IsActive = !dataItem.rus_IsActive;
    this.AddRushModelObj.Type = 3;

    this.xAddRushServices
      .RushDataPost(this.AddRushModelObj)
      .subscribe(response => {
        this.MessageFlag = "Rush status upated...!";


        this.commonMessage();
        this.GetGridData();
      });
  }




  //kendo check box event action

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

  DispalyInfo(event) {
    //debugger;
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
}
