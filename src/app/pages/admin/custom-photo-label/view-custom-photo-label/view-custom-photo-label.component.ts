import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";

import { ViewCustomPhotoLabelServices } from './view-custom-photo-label.service';
import { CustomPhotoLabelGroupModel, ViewCustomPhotoLabelModel } from './view-custom-photo-label-model'
import { AddCustomPhotoServices } from '../add-custom-photo-label/custom-photo-label.service';
import { AddCustomLableModel } from '../add-custom-photo-label/custom-photo-label-model';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, FormFields } from '../constants';
import {CustomPhototFilters} from '../../../../components/iplapp-filter-form/user-filter-form'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { WorkOrderDrodownServices } from 'src/app/pages/services/common-drop-down/drop-down.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./view-custom-photo-label.component.html"
})

export class ViewCustomPhotoLabelComponent implements OnInit {
  ViewCustomPhotoLabelModelObj: ViewCustomPhotoLabelModel = new ViewCustomPhotoLabelModel();
  AddCustomLableModelObj: AddCustomLableModel = new AddCustomLableModel();
  public griddata: any[];
  buttons = Buttons;
  CustomPhototFilters = CustomPhototFilters;
  photoLabelGroupArray = [];
  messageFlag: string;
  isEditDisable = false;
  formUsrCommonGroup: UntypedFormGroup;
  formFields = FormFields;
  submitted = false;
  CompanyList: any; // temp array
  WorkTypeList: any; // temp array
  customPhotoLabelGroupModel: CustomPhotoLabelGroupModel = new CustomPhotoLabelGroupModel();
  photoLableId:any;
  public state: State = {};
  @ViewChild('photoLableGroupForm') photoLableGroupForm: ElementRef;

  constructor(
    private xViewCustomPhotoLabelServices: ViewCustomPhotoLabelServices,
    private EncrDecr: EncrDecrService,
    private xRouter: Router,
    private xAddCustomPhotoServices: AddCustomPhotoServices,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private spinner: NgxSpinnerService,
  ) {
    this.GetCustomPhotoLabelGroup();
   }

  ngOnInit() {
    this.spinner.show();
    this.formUsrCommonGroup = this.formBuilder.group({
      CustomName: ["", Validators.required],
      disbledFaltu1: ["", Validators.nullValidator],
      disbledFaltu2: ["", Validators.nullValidator],
      disbledFaltu3: ["", Validators.required],
      disbledFaltu4: ["", Validators.nullValidator],
      disbledFaltu5: ["", Validators.nullValidator],
    });
    this.GetGridData();
    this.GetDropDowndata();
  }

  ngOnDestroy(): void {
    this.submitted = false;
    this.AddCustomLableModelObj = new AddCustomLableModel();
  }

  //get grid
  GetGridData() {
    // //dfebugger;
    this.ViewCustomPhotoLabelModelObj = new ViewCustomPhotoLabelModel();
    this.xViewCustomPhotoLabelServices
      .ViewCustomData(this.ViewCustomPhotoLabelModelObj)
      .subscribe(response => {
        if (response.length > 1 && response[1].length > 0) {
          this.ViewCustomPhotoLabelModelObj.PhotoLabel_Name = response[1][0].CustPhLbl_Filter_CustPhLblName;
          this.ViewCustomPhotoLabelModelObj.PhotoLabel_CreatedBy = response[1][0].PhotoLabel_CreatedBy;  //sandip
          this.ViewCustomPhotoLabelModelObj.PhotoLabel_ModifiedBy = response[1][0].PhotoLabel_ModifiedBy;  //sandip
          this.ViewCustomPhotoLabelModelObj.PhotoLabel_IsActive = response[1][0].CustPhLbl_Filter_CustPhLblIsActive;
          this.filterCall();
          this.spinner.hide();
        }
        else {
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.PhotoLabel_pkeyID);
              element.ViewUrl = "/home/customphoto/lableAdd/" + btoa(encrypted);

            });
          }
          this.spinner.hide();
      }
      });
  }

  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder()
      .subscribe(response => {
        if (response.length != 0) {
          this.CompanyList = response[0];
          this.formFields[2].data = response[0];
          this.WorkTypeList = response[1];
          this.formFields[3].data = response[1];
        }
      });
  }

  // this code selected event row
  showDetails(content, dataItem) {
     var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.PhotoLabel_pkeyID);
     this.xRouter.navigate(["/home/customphoto/lableAdd", btoa(encrypted)]);

  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddCustomLableModelObj.PhotoLabel_IsDelete = true;
      this.AddCustomLableModelObj.PhotoLabel_pkeyID = dataItem.PhotoLabel_pkeyID;
      this.xAddCustomPhotoServices
        .CustomPhotoDataPost(this.AddCustomLableModelObj)
        .subscribe(response => {
          this.GetGridData();
          this.AddCustomLableModelObj = new AddCustomLableModel();
        });
    }
  }

  // clear data
  AddNewCustom() {
    this.xRouter.navigate(["/customphoto/lableAdd", 'new']);
  }

  filterCall() {
    this.ViewCustomPhotoLabelModelObj.Type = 5;
    this.xViewCustomPhotoLabelServices
    .ViewCustomData(this.ViewCustomPhotoLabelModelObj)
    .subscribe(response => {
      this.state.take = 15;
      this.state.skip = 0;
      if(response[0]!=undefined)
      {
        this.griddata = response[0];
        this.griddata.forEach(element => {
          var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.PhotoLabel_pkeyID);
          element.ViewUrl = "/home/customphoto/lableAdd/" + btoa(encrypted);
        });
      }

    });
  }

  clearData() {
    this.ViewCustomPhotoLabelModelObj.Type = 5;
    this.xViewCustomPhotoLabelServices
      .AddUpdateFilterAdminCustPhLblData(this.ViewCustomPhotoLabelModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.ViewCustomPhotoLabelModelObj = new   ViewCustomPhotoLabelModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.ViewCustomPhotoLabelModelObj.Type = 1;
    this.xViewCustomPhotoLabelServices
      .AddUpdateFilterAdminCustPhLblData(this.ViewCustomPhotoLabelModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.messageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }

  //kendo check box event action
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

  // Get Custom PhotoLabel Group
  GetCustomPhotoLabelGroup() {
    this.xViewCustomPhotoLabelServices
      .GetCustomPhotoLabelGroupData()
      .subscribe(response => {
        this.photoLabelGroupArray = response[0];
        this.formFields[1].data = response[0];
      });
  }

  checkButtonEvent(event,content) {
    // debugger;
    if (event === 'Create Custom Photo Label') {
      // this.isEditDisable = false;
      // this.AddCustomLableModelObj = new AddCustomLableModel();
      // this.modalService.open(content,{ size: 'md' });
      // this.formUsrCommonGroup.enable();

      this.openPhotoLableModal('new',content);
    } else {
      this.modalService.open(this.photoLableGroupForm);
    }
  }

  // submit manage photo label group form
  manageFormSubumit() {
  ////dfebugger;
    this.photoLabelGroupArray;
    if (this.photoLabelGroupArray[this.photoLabelGroupArray.length - 1].Custom_PhotoLabel_Group_Name == "") {
      this.photoLabelGroupArray.splice(this.photoLabelGroupArray.length - 1, 1);
    }
    this.customPhotoLabelGroupModel.Custom_PhotoLabel_Group_Arr = this.photoLabelGroupArray;

    this.xViewCustomPhotoLabelServices
      .CustomPhotoLabelGroupDataPost(this.customPhotoLabelGroupModel)
      .subscribe(response => {
        this.GetCustomPhotoLabelGroup();
        this.messageFlag = "Photo label groups Saved...!";
        this.commonMessage();
        this.GetGridData();
      });
  }
  removePOPdata(item, inx)
  {
    if (item.Custom_PhotoLabel_Group_pkeyID != 0) {
      var cfrm = confirm("Are you want to delete this record...!");
      if (cfrm == true) {
        this.customPhotoLabelGroupModel.Custom_PhotoLabel_Group_pkeyID = item.Custom_PhotoLabel_Group_pkeyID;
        this.xViewCustomPhotoLabelServices
          .DeleteCustomPhotoLabelGroupData(this.customPhotoLabelGroupModel)
          .subscribe(response => {
            this.GetCustomPhotoLabelGroup();
          })
      }
    }
    else {
      this.photoLabelGroupArray.splice(inx, 1);
    }
  }

  addMoreRowpop() {
    var data = { Custom_PhotoLabel_Group_Name: "", Custom_PhotoLabel_Group_pkeyID: 0 };
    if (this.photoLabelGroupArray.length != 0) {
      if (
        this.photoLabelGroupArray[this.photoLabelGroupArray.length - 1].Custom_PhotoLabel_Group_Name != ""
      ) {
        this.photoLabelGroupArray.push(data);
      }
    } else {
      this.photoLabelGroupArray.push(data);
    }
  }

  // submit form
  formButton() {
  ////dfebugger;
    if (this.AddCustomLableModelObj.PhotoLabel_Group_Id > 0) {
      this.submitted = false;

    this.xAddCustomPhotoServices
      .CustomPhotoDataPost(this.AddCustomLableModelObj)
      .subscribe(response => {
        if (response[0][0].Status != "0") {
          this.AddCustomLableModelObj.PhotoLabel_pkeyID = parseInt(response[0][0].PhotoLabel_pkeyID);
          this.messageFlag = "Custom Photos Saved...!";
          this.submitted = true;
          this.AddCustomLableModelObj = new AddCustomLableModel();
          this.commonMessage();
          this.GetGridData();
        }
      });
    }
    else
    {
      this.submitted = true;
      return;
    }
  }

  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddCustomLableModelObj.PhotoLabel_pkeyID = dataItem.PhotoLabel_pkeyID;
    this.AddCustomLableModelObj.PhotoLabel_IsActive = !dataItem.PhotoLabel_IsActive;
    this.AddCustomLableModelObj.Type = 3;

    this.xAddCustomPhotoServices
    .CustomPhotoDataPost(this.AddCustomLableModelObj)
    .subscribe(response => {
      this.messageFlag = "Custom Lable status upated...!";


      this.commonMessage();
        this.GetGridData();
      });
  }


  closeModal() {
    this.submitted = false;
    this.AddCustomLableModelObj = new AddCustomLableModel();
    this.modalService.dismissAll();
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.messageFlag;
    modalRef.result.then(result => { this.modalService.dismissAll() }, reason => { this.modalService.dismissAll() });
  }
  openPhotoLableModal(photoLable,moodalContent) {
    this.photoLableId=photoLable
    this.modalService.open(moodalContent, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }

  afterRecordUpdate() {
    this.GetGridData();
  }
}
