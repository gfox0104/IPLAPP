import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";




import { EncrDecrService } from '../../../../services/util/encr-decr.service';

import { PropertyFilters,  } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from "ngx-spinner";

import {Buttons, FormFields} from "../../Property-type/constants"

import { State } from "@progress/kendo-data-query";
import { viewPropertyModel } from "./view-property-modal";
import { AddPropertyModal } from "../add-property/add-property-modal";
import { viewPropertyService } from "./view-property.service";
import { AddpropertyService } from "../add-property/add-property.service";
import { FilterAdminCommonModelDTO } from "../../admin-link/admin-common-model";
import { AdminCommonService } from "../../admin-link/admin-common-service";



@Component({
  selector: 'app-view-property-type',
  templateUrl: './view-property-type.component.html',
  styleUrls: ['./view-property-type.component.scss']
})
export class ViewPropertyTypeComponent implements OnInit {

  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;

  filterAdminCommon:FilterAdminCommonModelDTO = new  FilterAdminCommonModelDTO();
  viewPropertyModelObj :  viewPropertyModel = new  viewPropertyModel();
  AddPropertyModalObj : AddPropertyModal = new AddPropertyModal();
  public griddata: any[];
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;
  WorkOrderObj: any;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  buttons = Buttons;
  PropertyFilters = PropertyFilters

  isHelpActive = false;
  public state: State = {};


  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private xviewPropertyService:viewPropertyService,
    private xAddpropertyService:AddpropertyService,
    private xAdminCommonService:AdminCommonService,

  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      PropertyName: ["", Validators.required],
      proacsdf: ["", Validators.nullValidator],
    });
  }

  formButton() {
     debugger
    this.isSubmitted = false;

    if (this.WorkOrderObj !== undefined) {
      this.AddPropertyModalObj.PT_PkeyID= this.WorkOrderObj;
    } else {
      this.AddPropertyModalObj.PT_PkeyID = 0;
    }

    this.xAddpropertyService
    .CreateUpdatePropertyDatapost(this.AddPropertyModalObj)
    .subscribe(response => {
      if (response[0].Status != "0") {
        this.AddPropertyModalObj.PT_PkeyID= parseInt(response[0].PT_PkeyID);
        this.MessageFlag = "Property Type Data Saved...!";
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
if (event === 'Create Property type') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddPropertyModalObj = new AddPropertyModal();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }


  //get grid
  GetGridData() {
    this.xviewPropertyService
      .getPropertyData(this.viewPropertyModelObj)
      .subscribe(response => {
        if (response.length > 1 && response[1].length > 0) {
          this.viewPropertyModelObj.PT_Name= response[1][0].Filter_FilterName;
          this.viewPropertyModelObj.PT_IsActive = response[1][0].Filter_FilterIsActive;
          this.viewPropertyModelObj.PT_CreatedBy = response[1][0];
          this.viewPropertyModelObj.PT_ModifiedBy = response[1][0];
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
    this.WorkOrderObj = dataItem.PT_PkeyID;

    this.AddPropertyModalObj.PT_PkeyID = dataItem.PT_PkeyID;
    this.AddPropertyModalObj.PT_Name = dataItem.PT_Name;
    this.AddPropertyModalObj.PT_IsActive = dataItem.PT_IsActive;
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
      this.AddPropertyModalObj.PT_PkeyID = dataItem.PT_PkeyID;
      this.AddPropertyModalObj.PT_IsDelete = true;

      this.MessageFlag = "Deleted Successfully"
      this.commonMessage();

      this.xAddpropertyService
        .CreateUpdatePropertyDatapost(this.AddPropertyModalObj)
        .subscribe(response => {
          this.GetGridData();
        });

    }

  }



  filterCall() {
    this.viewPropertyModelObj.Type = 3;
    this.xviewPropertyService
      . getPropertyData(this.viewPropertyModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });

  }
  clearData(){
    this.filterAdminCommon.Filter_PageType=4;
    this.filterAdminCommon.Filter_FilterName=this.viewPropertyModelObj.PT_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewPropertyModelObj.PT_IsActive;
    this.filterAdminCommon.Type=5;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        this.viewPropertyModelObj = new viewPropertyModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.filterAdminCommon.Filter_PageType=4;
    this.filterAdminCommon.Filter_FilterName=this.viewPropertyModelObj.PT_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.viewPropertyModelObj.PT_IsActive;
    this.filterAdminCommon.Type=1;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
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
    this.AddPropertyModalObj.PT_PkeyID =dataItem.PT_PkeyID;
    this.AddPropertyModalObj.PT_IsActive = !dataItem.PT_IsActive;
    this.AddPropertyModalObj.Type = 3;

    this.xAddpropertyService
      .CreateUpdatePropertyDatapost(this.AddPropertyModalObj)
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
