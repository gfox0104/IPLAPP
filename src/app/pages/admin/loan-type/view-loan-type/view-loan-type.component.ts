import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { ViewLoanTypeServices } from "./view-loan-type.service";
import { ViewLoanTypeModel } from "./view-loan-type-model";
import { AddLoanTypeServices } from '../add-loan-type/add-loan-type.service';
import { AddLoanTypeModel } from '../add-loan-type/add-loan-type-model';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { Buttons } from '../constants';
import {Filters} from '../constants/filters'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {FormFields} from '../constants/form-fields'
import { IplAppModalContent } from 'src/app/components';
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./view-loan-type.component.html"
})

export class ViewLoanTypeComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  public griddata: any[];
  ViewLoanTypeModelObj: ViewLoanTypeModel = new ViewLoanTypeModel();
  AddLoanTypeModelObj: AddLoanTypeModel = new AddLoanTypeModel();
  buttons = Buttons;
  filters = Filters;
  FormFields = FormFields;
  formUsrCommonGroup: UntypedFormGroup;
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag:string;
  public state: State = {};
  isHelpActive = false;
  constructor(
    private xViewLoanTypeServices: ViewLoanTypeServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddLoanTypeServices: AddLoanTypeServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
     this.formUsrCommonGroup = this.formBuilder.group({
    ComName: ["", Validators.required],
    loanactive: ["", Validators.required]
  });}

  addloan(event, content) {
    if (event === 'Create Loan Type') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddLoanTypeModelObj = new AddLoanTypeModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }

    // submit form
    formButton() {
      this.isSubmitted = false;
      this.xAddLoanTypeServices
        .LoanTypeDataPost(this.AddLoanTypeModelObj)
        .subscribe(response => {
          if (response[0].Status != "0") {
            this.AddLoanTypeModelObj.Loan_pkeyId = parseInt(response[0].Loan_pkeyId);
            this.MessageFlag = "Load Type Data Saved...!";
            this.isSubmitted = true;
            this.commonMessage();
            this.GetGridData();
          }
          else{
            this.MessageFlag = "This Load Type Record Already Exist";
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
    this.xViewLoanTypeServices
      .ViewLoanTypeData(this.ViewLoanTypeModelObj)
      .subscribe(response => {
        // console.log('sun1',response)
        if (response.length > 1 && response[1].length > 0) {
          this.ViewLoanTypeModelObj.Loan_Type =  response[1][0].Loan_Filter_LoanName;
          this.ViewLoanTypeModelObj.Loan_IsActive =  response[1][0].Loan_Filter_LoanIsActive;
          this.ViewLoanTypeModelObj.Loan_CreatedBy = response[1][0];
          this.ViewLoanTypeModelObj.Loan_ModifiedBy = response[1][0];
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

    this.AddLoanTypeModelObj.Loan_pkeyId = dataItem.Loan_pkeyId;
    this.AddLoanTypeModelObj.Loan_Type = dataItem.Loan_Type;
    this.AddLoanTypeModelObj.Loan_IsActive = dataItem.Loan_IsActive;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);

  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddLoanTypeModelObj.Loan_pkeyId = dataItem.Loan_pkeyId;
      this.AddLoanTypeModelObj.Loan_IsDelete = true;

      this.xAddLoanTypeServices
        .LoanTypeDataPost(this.AddLoanTypeModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  filterCall() {
    this.ViewLoanTypeModelObj.Type = 3;
    this.xViewLoanTypeServices
    .ViewLoanTypeData(this.ViewLoanTypeModelObj)
    .subscribe(response => {
      this.state.take = 15;
      this.state.skip = 0;
      this.griddata = response[0];
    });

   }

   clearData() {
    this.ViewLoanTypeModelObj.Type = 5;
    this.xViewLoanTypeServices
      .AddUpdateFilterAdminLoanData(this.ViewLoanTypeModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.ViewLoanTypeModelObj = new ViewLoanTypeModel();
        this.GetGridData();
      });
   }

   saveFilterData() {
    this.ViewLoanTypeModelObj.Type = 1;
    this.xViewLoanTypeServices
      .AddUpdateFilterAdminLoanData(this.ViewLoanTypeModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
   }

  // clear data
  AddNewItem() {
    this.xRouter.navigate(["/loan/addloantype", 'new']);
  }
  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddLoanTypeModelObj.Loan_pkeyId = dataItem.Loan_pkeyId;
    this.AddLoanTypeModelObj.Loan_IsActive = !dataItem.Loan_IsActive;
    this.AddLoanTypeModelObj.Type = 3;
    this.xAddLoanTypeServices
    .LoanTypeDataPost(this.AddLoanTypeModelObj)
    .subscribe(response => {
      this.MessageFlag = "Loan status Update...!";
      this.commonMessage();
        this.GetGridData();
      });
  }
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
