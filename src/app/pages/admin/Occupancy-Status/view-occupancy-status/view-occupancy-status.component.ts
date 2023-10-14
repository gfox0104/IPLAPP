import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";




import { EncrDecrService } from '../../../../services/util/encr-decr.service';

import { OccupancyStatusFilters,  } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from "ngx-spinner";

import {Buttons, FormFields} from "../../Occupancy-Status/constants"
import { viewOccupancyService } from "./view-occupancy.service";
import { viewOccupancyModel } from "./view-Occupancy-model";
import { State } from "@progress/kendo-data-query";

import { AddOccupancyModal } from "../add-occupancy/add-occupancy-modal";
import { AddOccupancyService } from "../add-occupancy/add-occupancy.service";
import { FilterAdminCommonModelDTO } from "../../admin-link/admin-common-model";
import { AdminCommonService } from "../../admin-link/admin-common-service";


@Component({
  selector: 'app-view-occupancy-status',
  templateUrl: './view-occupancy-status.component.html',
  styleUrls: ['./view-occupancy-status.component.scss']
})
export class ViewOccupancyStatusComponent implements OnInit {

  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;

  filterAdminCommon:FilterAdminCommonModelDTO = new  FilterAdminCommonModelDTO();
  viewOccupancyModelObj : viewOccupancyModel = new viewOccupancyModel();
  AddOccupancyModalObj : AddOccupancyModal = new AddOccupancyModal();
  public griddata: any[];
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;
  WorkOrderObj: any;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  buttons = Buttons;

  OccupancyStatusFilters = OccupancyStatusFilters

  isHelpActive = false;
  public state: State = {};
  // public OccupancyStatus:OccupancyStatus = {};



  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private xviewOccupancyService:viewOccupancyService,
    private xAddOccupancyService:AddOccupancyService,
    private xAdminCommonService:AdminCommonService,

  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      OccupancyName: ["", Validators.required],
      occcactive: ["", Validators.nullValidator],
    });
  }

  formButton() {
    // debugger
    this.isSubmitted = false;

    if (this.WorkOrderObj !== undefined) {
      this.AddOccupancyModalObj.OS_PkeyID= this.WorkOrderObj;
    } else {
      this.AddOccupancyModalObj.OS_PkeyID = 0;
    }

    this.xAddOccupancyService
    .ViewOccupancyDatapost(this.AddOccupancyModalObj)
    .subscribe(response => {
      if (response[0].Status != "0") {
        this.AddOccupancyModalObj.OS_PkeyID = parseInt(response[0].OS_PkeyID);
        this.MessageFlag = "Occupancy Status Data Saved...!";
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
if (event === 'Create Occupancy Status') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddOccupancyModalObj = new AddOccupancyModal();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }


  //get grid
  GetGridData() {
    this.xviewOccupancyService
      .ViewoccupancyData(this.viewOccupancyModelObj)
      .subscribe(response => {
        if (response.length > 1 && response[1].length > 0) {
          this.viewOccupancyModelObj.OS_Name= response[1][0].Filter_FilterName;
          this.viewOccupancyModelObj.OS_IsActive = response[1][0].Filter_FilterIsActive;
          this.viewOccupancyModelObj.OS_CreatedBy = response[1][0];
          this.viewOccupancyModelObj.OS_ModifiedBy = response[1][0];
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
    this.WorkOrderObj = dataItem.OS_PkeyID;

    this.AddOccupancyModalObj.OS_PkeyID = dataItem.OS_PkeyID;
    this.AddOccupancyModalObj.OS_Name = dataItem.OS_Name;
    this.AddOccupancyModalObj.OS_IsActive = dataItem.OS_IsActive;
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
      this.AddOccupancyModalObj.OS_PkeyID = dataItem.OS_PkeyID;
      this.AddOccupancyModalObj.OS_IsDelete = true;


      this.commonMessage();
      this.MessageFlag = "Deleted Successfully"
      this.xAddOccupancyService
        .ViewOccupancyDatapost(this.AddOccupancyModalObj)
        .subscribe(response => {
          this.GetGridData();
        });

    }

  }



  filterCall() {
    this.viewOccupancyModelObj.Type = 3;
    this.xviewOccupancyService
      .ViewoccupancyData(this.viewOccupancyModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });

  }
  clearData(){
    this.filterAdminCommon.Filter_PageType=2;
    this.filterAdminCommon.Filter_FilterName=this.viewOccupancyModelObj.OS_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewOccupancyModelObj.OS_IsActive;
    this.filterAdminCommon.Type=5;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        this.viewOccupancyModelObj = new viewOccupancyModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.filterAdminCommon.Filter_PageType=2;
    this.filterAdminCommon.Filter_FilterName=this.viewOccupancyModelObj.OS_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewOccupancyModelObj.OS_IsActive;
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
    this.AddOccupancyModalObj.OS_PkeyID = dataItem.OS_PkeyID;
    this.AddOccupancyModalObj.OS_IsActive = !dataItem.OS_IsActive;
    this.AddOccupancyModalObj.Type = 3;

    this.xAddOccupancyService
      .ViewOccupancyDatapost(this.AddOccupancyModalObj)
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
function closeModal() {
  throw new Error("Function not implemented.");
}

