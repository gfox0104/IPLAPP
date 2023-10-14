import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";

import { AddCustomerService } from '../add-customer/add-customer.service';
import { AddCustomerModel } from '../add-customer/add-customer-model';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { ViewCustomerServices } from "./view-customer.service";
import { ViewCustomerModel } from "./view-customer-model";
import { Buttons } from '../constants'
import { UntypedFormGroup, UntypedFormBuilder,Validators } from '@angular/forms';
import { FormFields } from '../constants/form-fields';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';
import { CustomerFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  templateUrl: "./view-customer.component.html"
})

export class ViewCustomerComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  public griddata: any[];
  ViewCustomerModelObj: ViewCustomerModel = new ViewCustomerModel();
  AddCustomerModelObj: AddCustomerModel = new AddCustomerModel();
  buttons = Buttons;
  isEditDisable = false;
  formFields = FormFields;
  CustomerFilters = CustomerFilters;
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string; // custom msg sathi
  isSubmitted: boolean;
  isHelpActive = false;
  public state: State = {};
  constructor(
    private xViewCustomerServices: ViewCustomerServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddCustomerService: AddCustomerService,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {  this.formUsrCommonGroup = this.formBuilder.group({
    CustomerNUM: ["", Validators.required],
    discost: ["", Validators.nullValidator],
  });}

  addcustomer(event, content) {
    // debugger;
    if (event === "Create Customer") {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddCustomerModelObj = new AddCustomerModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }


  formButton() {
    this.isSubmitted = false;
    this.xAddCustomerService
      .CustomerNumberDataPost(this.AddCustomerModelObj)
      .subscribe(response => {
        if (response[0].Status != "0") {
          this.AddCustomerModelObj.Cust_Num_pkeyId = parseInt(response[0].Cust_Num_pkeyId);
          this.MessageFlag = "Customer Saved...!";
          this.isSubmitted = true;
          this.commonMessage();
          this.GetGridData();
        }else{
          this.MessageFlag = "This Customer Record Allready Exist";
          this.isSubmitted = true;
          this.commonMessage();
        }
      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
     if (!this.isHelpActive) {
        this.xmodalService.dismissAll();
      }
     });
  }

  closeModal() {
    this.xmodalService.dismissAll();
  }


  //get grid
  GetGridData() {
    this.xViewCustomerServices
      .ViewCustomerData(this.ViewCustomerModelObj)
      .subscribe(response => {
        // console.log('sun',response)
        if (response.length > 1 && response[1].length > 0) {

          this.ViewCustomerModelObj.Cust_Num_Number = response[1][0].Cust_Filter_Name;
          this.ViewCustomerModelObj.Cust_Num_IsActive = response[1][0].Cust_Filter_IsCustActive;
          this.ViewCustomerModelObj.Cust_Num_CreatedBy = response[1][0].Cust_Num_CreatedBy;
          this.ViewCustomerModelObj.Cust_Num_ModifiedBy = response[1][0].Cust_Num_ModifiedBy;
          this.filterCall();
          this.spinner.hide();
        }
        else{
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
    this.AddCustomerModelObj.Cust_Num_pkeyId = dataItem.Cust_Num_pkeyId;
    this.AddCustomerModelObj.Cust_Num_Number = dataItem.Cust_Num_Number;
    this.AddCustomerModelObj.Cust_Num_Active = dataItem.Cust_Num_Active;
    this.AddCustomerModelObj.Cust_Num_IsActive = dataItem.Cust_Num_IsActive;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);

  }
  filterCall() {

    this.ViewCustomerModelObj.Type = 3;
    this.xViewCustomerServices
      .ViewCustomerData(this.ViewCustomerModelObj)
      .subscribe(response => {
        this.state = {};
        // console.log("cuatomer nu", response);
        this.griddata = response[0];
      });
  }

  clearData() {
    this.ViewCustomerModelObj.Type = 5;
    this.xViewCustomerServices
      .AddUpdateFilterAdminCustomerData(this.ViewCustomerModelObj)
      .subscribe(response => {
        this.ViewCustomerModelObj = new ViewCustomerModel();
        this.GetGridData();
      })

  }
  saveFilterData() {
    this.ViewCustomerModelObj.Type = 1;
    this.xViewCustomerServices
      .AddUpdateFilterAdminCustomerData(this.ViewCustomerModelObj)
      .subscribe(response => {
        this.MessageFlag = "Customer filter saved...!";
        this.commonMessage();
        this.filterCall();
      })
  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddCustomerModelObj.Cust_Num_pkeyId = dataItem.Cust_Num_pkeyId;
      this.AddCustomerModelObj.Cust_Num_IsDelete = true;

      this.xAddCustomerService
        .CustomerNumberDataPost(this.AddCustomerModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  checkChange(event, dataItem) {
    // //dfebugger;
    this.AddCustomerModelObj.Cust_Num_pkeyId = dataItem.Cust_Num_pkeyId;
    this.AddCustomerModelObj.Cust_Num_IsActive = !dataItem.Cust_Num_IsActive;
    this.AddCustomerModelObj.Type = 3;

    this.xAddCustomerService
      .CustomerNumberDataPost(this.AddCustomerModelObj)
      .subscribe(response => {
      this.MessageFlag = "Customer status upated...!";


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
