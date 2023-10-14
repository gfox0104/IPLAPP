import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UOMFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
import { ViewUOMModel } from "./view-UOM-model";
import { ViewUOMServices } from "./view-UOM.service";
import {AddUOMModel} from '../add-UOM/add-UOM-model'
import { AddUOMServices } from "../add-UOM/add-UOM.service";
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { Buttons } from '../constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { IplAppModalContent } from 'src/app/components';
import {FormFields} from '../constants/form-fields'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  templateUrl: "./view-UOM.component.html"
})

export class ViewUOMComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  ViewUOMModelobj: ViewUOMModel = new ViewUOMModel();
  AddUOMModelObj: AddUOMModel = new AddUOMModel();

  public griddata: any[];
  buttons = Buttons;
  UOMFilters = UOMFilters;
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag:String;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  isHelpActive = false;
  public state: State = {};
  constructor(
    private xRouter: Router,
    private xViewUOMServices: ViewUOMServices,
    private xAddUOMServices: AddUOMServices,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {  this.formUsrCommonGroup = this.formBuilder.group({
    UOMName: ["", Validators.required],
    disuom: ["", Validators.nullValidator],
  });}

  // clear data
  AddNewUom() {
    this.xRouter.navigate(["/uom/adduom", 'new']);
  }
  adduom(event, content) {
    if (event === 'Create UOM') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddUOMModelObj = new AddUOMModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }
  WorkOrderObj:any;
    // submit form
    formButton() {
      this.isSubmitted = false;

      if (this.WorkOrderObj !== undefined) {
        this.AddUOMModelObj.UOM_pkeyId = this.WorkOrderObj;
      } else {
        this.AddUOMModelObj.UOM_pkeyId = 0;
      }

      this.xAddUOMServices
        .UOMDataPost(this.AddUOMModelObj)
        .subscribe(response => {
          if (response[0].Status != "0") {
            this.AddUOMModelObj.UOM_pkeyId = parseInt(response[0].UOM_pkeyId);
            this.MessageFlag = "UOM Data Saved...!";
            this.isSubmitted = true;
            this.commonMessage();
            this.GetGridData();
          }
          else
          {
            this.MessageFlag = "This Record Allready Exist...!";
            this.commonMessage();
          }
        });
    }
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => {
        if (!this.isHelpActive) {
          this.xmodalService.dismissAll();
        }
       });
    }

  // this code selected event row
  showDetails(content, dataItem) {
    this.WorkOrderObj = dataItem.UOM_pkeyId;
    this.AddUOMModelObj.UOM_pkeyId = dataItem.UOM_pkeyId;
    this.AddUOMModelObj.UOM_Name = dataItem.UOM_Name;
    this.AddUOMModelObj.UOM_IsActive = dataItem.UOM_IsActive;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);


  }
  closeModal() {
    this.xmodalService.dismissAll();
  }
  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.ViewUOMModelobj.UOM_pkeyId = dataItem.UOM_pkeyId;
      this.ViewUOMModelobj.UOM_IsDelete = true;

      this.xAddUOMServices
        .UOMDataPost(this.ViewUOMModelobj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  //get grid
  faltu: any;
  GetGridData() {
    this.xViewUOMServices
      .ViewUOMData(this.ViewUOMModelobj)
      .subscribe(response => {
        // console.log('umo1',response)
        if (response.length > 1 && response[1].length > 0) {
          this.ViewUOMModelobj.UOM_Name =  response[1][0].UOM_Filter_UOMName;
          this.ViewUOMModelobj.UOM_IsActive =  response[1][0].UOM_Filter_UOMIsActive;
          this.ViewUOMModelobj.UOM_CreatedBy = response[1][0];
          this.ViewUOMModelobj.UOM_ModifiedBy = response[1][0];
          this.filterCall();
          this.spinner.hide();
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.faltu = response[0];
          }

          this.spinner.hide();
        }
      });
  }

  filterCall() {

    this.ViewUOMModelobj.Type = 3;
    this.xViewUOMServices
      .ViewUOMData(this.ViewUOMModelobj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];

      });
  }

  clearData() {
    this.ViewUOMModelobj.Type = 5;
    this.xViewUOMServices
      .AddUpdateFilterAdminUOMData(this.ViewUOMModelobj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.ViewUOMModelobj = new   ViewUOMModel();
      this.GetGridData();
      });


  }
  saveFilterData() {
    this.ViewUOMModelobj.Type = 1;
    this.xViewUOMServices
      .AddUpdateFilterAdminUOMData(this.ViewUOMModelobj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }

  //kendo check box event action


  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddUOMModelObj.UOM_pkeyId = dataItem.UOM_pkeyId;
    this.AddUOMModelObj.UOM_IsActive = !dataItem.UOM_IsActive;
    this.AddUOMModelObj.Type = 3;
    this.xAddUOMServices
    .UOMDataPost(this.AddUOMModelObj)
    .subscribe(response => {
      this.MessageFlag = "UOM status upated...!";
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
