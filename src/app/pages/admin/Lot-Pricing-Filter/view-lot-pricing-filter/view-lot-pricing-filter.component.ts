import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";




import { EncrDecrService } from '../../../../services/util/encr-decr.service';

import { LotPricingFilters,  } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from "ngx-spinner";


import { State } from "@progress/kendo-data-query";
import { AdminCommonService } from "../../admin-link/admin-common-service";
import { FilterAdminCommonModelDTO } from "../../admin-link/admin-common-model";
import { viewLotPricingFilterModel } from "./view-Lot-Pricing-Model";
import { Buttons, FormFields } from "../constants";
import { viewLotPricingFilterService } from "./view-Lot-Pricing.service";
import { AddLotPricingFiltrerModal } from "../add-Lot-Pricing-Filter/add-Lot-Pricing-Filter-Model";
import { AddLotPricingFilterService } from "../add-Lot-Pricing-Filter/add-Lot-Pricing-Filter.service";

@Component({
  selector: 'app-view-lot-pricing-filter',
  templateUrl: './view-lot-pricing-filter.component.html',
  styleUrls: ['./view-lot-pricing-filter.component.scss']
})
export class ViewLotPricingFilterComponent implements OnInit {

  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;

  filterAdminCommon:FilterAdminCommonModelDTO = new  FilterAdminCommonModelDTO();
  viewLotPricingFilterModelObj :  viewLotPricingFilterModel = new  viewLotPricingFilterModel();
  AddLotPricingFiltrerModalObj : AddLotPricingFiltrerModal = new AddLotPricingFiltrerModal();
  public griddata: any[];
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;
  WorkOrderObj: any;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  buttons = Buttons;
  LotPricingFilters = LotPricingFilters

  isHelpActive = false;
  public state: State = {};


  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private xviewLotPricingFilterService:viewLotPricingFilterService,
    private xAddLotPricingFilterService:AddLotPricingFilterService,
    private xAdminCommonService:AdminCommonService,

  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      LotPricingName: ["", Validators.required],
      Lotpri: ["", Validators.nullValidator],
    });
  }

  formButton() {
    //  debugger
    this.isSubmitted = false;

    if (this.WorkOrderObj !== undefined) {
      this.AddLotPricingFiltrerModalObj.Lot_Pricing_PkeyID= this.WorkOrderObj;
    } else {
      this.AddLotPricingFiltrerModalObj.Lot_Pricing_PkeyID = 0;
    }

    this.xAddLotPricingFilterService
    .CreateUpdateLotPricingFilterDatapost(this.AddLotPricingFiltrerModalObj)
    .subscribe(response => {
      // console.log('sandip',response)
      if (response[0].Status != "0") {
        this.AddLotPricingFiltrerModalObj.Lot_Pricing_PkeyID = parseInt(response[0].Lot_Pricing_PkeyID);
        this.MessageFlag = "Lot Pricing Filter Data Saved...!";
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
if (event === 'Create Lot Pricing Filter') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddLotPricingFiltrerModalObj = new AddLotPricingFiltrerModal();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }
GetGridData() {
    // debugger
    this.xviewLotPricingFilterService
      .ViewLotPricingFilterData(this.viewLotPricingFilterModelObj)
      .subscribe(response => {
        // console.log('sandip2',response)
        if (response.length > 1 && response[1].length > 0) {
          this.viewLotPricingFilterModelObj.Lot_Pricing_Name= response[1][0].Filter_FilterName;
          this.viewLotPricingFilterModelObj.Lot_Pricing_IsActive = response[1][0].Filter_FilterIsActive;
          this.viewLotPricingFilterModelObj.Lot_Pricing_CreatedBy = response[1][0];
          this.viewLotPricingFilterModelObj.Lot_Pricing_ModifiedBy = response[1][0];
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
    this.WorkOrderObj = dataItem.Lot_Pricing_PkeyID;

    this.AddLotPricingFiltrerModalObj.Lot_Pricing_PkeyID = dataItem.Lot_Pricing_PkeyID;
    this.AddLotPricingFiltrerModalObj.Lot_Pricing_Name = dataItem.Lot_Pricing_Name;
    this.AddLotPricingFiltrerModalObj.Lot_Pricing_IsActive = dataItem.Lot_Pricing_IsActive;
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
      this.AddLotPricingFiltrerModalObj.Lot_Pricing_PkeyID = dataItem.Lot_Pricing_PkeyID;
      this.AddLotPricingFiltrerModalObj.Lot_Pricing_IsDelete = true;


      this.commonMessage();
      this.MessageFlag = "Deleted Successfully"
      this.xAddLotPricingFilterService
        .CreateUpdateLotPricingFilterDatapost(this.AddLotPricingFiltrerModalObj)
        .subscribe(response => {
          this.GetGridData();
        });

    }

  }



  filterCall() {
    // debugger
    this.viewLotPricingFilterModelObj.Type = 3;
    this.xviewLotPricingFilterService
      .ViewLotPricingFilterData(this.viewLotPricingFilterModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });
  }
  clearData(){
    this.filterAdminCommon.Filter_PageType=1;
    this.filterAdminCommon.Filter_FilterName=this.viewLotPricingFilterModelObj.Lot_Pricing_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLotPricingFilterModelObj.Lot_Pricing_IsActive;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLotPricingFilterModelObj.Lot_Pricing_IsActive;
    this.filterAdminCommon.Type=5;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        this.viewLotPricingFilterModelObj = new viewLotPricingFilterModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.filterAdminCommon.Filter_PageType=1;
    this.filterAdminCommon.Filter_FilterName=this.viewLotPricingFilterModelObj.Lot_Pricing_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLotPricingFilterModelObj.Lot_Pricing_IsActive;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewLotPricingFilterModelObj.Lot_Pricing_IsActive;
    this.filterAdminCommon.Type=1;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        // console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }


  DispalyInfo(event) {
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
  checkChange(event, dataItem) {
    // debugger;
    this.AddLotPricingFiltrerModalObj.Lot_Pricing_PkeyID =dataItem.Lot_Pricing_PkeyID;
    this.AddLotPricingFiltrerModalObj.Lot_Pricing_IsActive = !dataItem.Lot_Pricing_IsActive;
    this.AddLotPricingFiltrerModalObj.Type = 3;

    this.xAddLotPricingFilterService
      .CreateUpdateLotPricingFilterDatapost(this.AddLotPricingFiltrerModalObj)
      .subscribe(response => {
        // console.log('patil',response)
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
