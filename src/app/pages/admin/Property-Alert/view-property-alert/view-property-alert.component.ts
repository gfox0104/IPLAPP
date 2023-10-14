import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";




import { EncrDecrService } from '../../../../services/util/encr-decr.service';

import { PropertyAlertFilters,  } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from "ngx-spinner";

import {Buttons, FormFields} from "../../Property-Alert/constants"

import { State } from "@progress/kendo-data-query";
import { viewPropertyAlertModel } from "./view-property-alert-modal";
import { AddPropertyAlertModal } from "../Add-property-alert/add-property-alert-modal";
import { viewPropertyAlertService } from "./view-property-alert.service";
import { AddProperrtyAlertService } from "../Add-property-alert/add-property-alert.service";
import { FilterAdminCommonModelDTO } from "../../admin-link/admin-common-model";
import { AdminCommonService } from "../../admin-link/admin-common-service";




@Component({
  selector: 'app-view-property-alert',
  templateUrl: './view-property-alert.component.html',
  styleUrls: ['./view-property-alert.component.scss']
})
export class ViewPropertyAlertComponent implements OnInit {

  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;

  filterAdminCommon:FilterAdminCommonModelDTO = new  FilterAdminCommonModelDTO();
  viewPropertyAlertModelObj : viewPropertyAlertModel = new viewPropertyAlertModel();
  AddPropertyAlertModalObj : AddPropertyAlertModal = new AddPropertyAlertModal();
  public griddata: any[];
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;
  WorkOrderObj: any;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  buttons = Buttons;

  PropertyAlertFilters = PropertyAlertFilters

  isHelpActive = false;
  public state: State = {};
  // public OccupancyStatus:OccupancyStatus = {};



  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private xviewPropertyAlertService:viewPropertyAlertService,
    private xAddProperrtyAlertService:AddProperrtyAlertService,
    private xAdminCommonService:AdminCommonService,

  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      Propertyname: ["", Validators.required],
      protype: ["", Validators.nullValidator],
    });
  }

  formButton() {
    // debugger
    this.isSubmitted = false;

    if (this.WorkOrderObj !== undefined) {
      this.AddPropertyAlertModalObj.PA_PkeyID= this.WorkOrderObj;
    } else {
      this.AddPropertyAlertModalObj.PA_PkeyID = 0;
    }

    this.xAddProperrtyAlertService
    .CreateUpdatePropertyAlertDatapost(this.AddPropertyAlertModalObj)
    .subscribe(response => {
      if (response[0].Status != "0") {
        this.AddPropertyAlertModalObj.PA_PkeyID= parseInt(response[0].PA_PkeyID);
        this.MessageFlag = "Property Alert Data Saved...!";
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
if (event === 'Create Property Alert') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddPropertyAlertModalObj = new AddPropertyAlertModal();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }


  //get grid
  GetGridData() {
    this.xviewPropertyAlertService
      .ViewPropertyAlertData(this.viewPropertyAlertModelObj)
      .subscribe(response => {
        if (response.length > 1 && response[1].length > 0) {
          this.viewPropertyAlertModelObj.PA_Name= response[1][0].Filter_FilterName;
          this.viewPropertyAlertModelObj.PA_IsActive = response[1][0].Filter_FilterIsActive;
          this.viewPropertyAlertModelObj.PA_CreatedBy = response[1][0];
          this.viewPropertyAlertModelObj.PA_ModifiedBy = response[1][0];
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
      console.log()
  }

  // checkChange(event, dataItem) {
  //   ////dfebugger;
  //   this.viewOccupancyModelObj.OS_PkeyID= dataItem.OS_PkeyID;
  //   this.viewOccupancyModelObj.OS_IsActive = !dataItem.OS_IsActive;
  //   this.viewOccupancyModelObj.Type = 3;

  //   this.xviewOccupancyService
  //     .StateDataPost(this.viewOccupancyModelObj)
  //     .subscribe(response => {
  //       this.MessageFlag = "Status upated...!";


  //       this.commonMessage();
  //       this.GetGridData();
  //     });
  // }

  showDetails(content, dataItem) {
    // debugger
    this.WorkOrderObj = dataItem.PA_PkeyID;

    this.AddPropertyAlertModalObj.PA_PkeyID = dataItem.PA_PkeyID;
    this.AddPropertyAlertModalObj.PA_Name = dataItem.PA_Name;
    this.AddPropertyAlertModalObj.PA_IsActive = dataItem.PA_IsActive;
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
    // debugger
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddPropertyAlertModalObj.PA_PkeyID = dataItem.PA_PkeyID ;
      this.AddPropertyAlertModalObj.PA_IsDelete = true;


      this.commonMessage();
      this.MessageFlag = "Deleted Successfully"
      this.xAddProperrtyAlertService
        .CreateUpdatePropertyAlertDatapost(this.AddPropertyAlertModalObj)
        .subscribe(response => {
          this.GetGridData();
        });

    }

  }



  filterCall() {
    this.viewPropertyAlertModelObj.Type = 3;
    this.xviewPropertyAlertService
      .ViewPropertyAlertData(this.viewPropertyAlertModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });

  }
  clearData(){
    this.filterAdminCommon.Filter_PageType=3;
    this.filterAdminCommon.Filter_FilterName=this.viewPropertyAlertModelObj.PA_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewPropertyAlertModelObj.PA_IsActive;
    this.filterAdminCommon.Type=5;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        this.viewPropertyAlertModelObj = new viewPropertyAlertModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.filterAdminCommon.Filter_PageType=3;
    this.filterAdminCommon.Filter_FilterName=this.viewPropertyAlertModelObj.PA_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewPropertyAlertModelObj.PA_IsActive;
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
    this.AddPropertyAlertModalObj.PA_PkeyID = dataItem.PA_PkeyID ;
    this.AddPropertyAlertModalObj.PA_IsActive = !dataItem.PA_IsActive;
    this.AddPropertyAlertModalObj.Type = 3;

    this.xAddProperrtyAlertService
      .CreateUpdatePropertyAlertDatapost(this.AddPropertyAlertModalObj)
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


