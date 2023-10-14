import { Component, OnInit , ViewChild, ElementRef} from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { IplAppModalContent } from 'src/app/components';
import { ViewMainCategoryServices } from "./view-main-category.service";
import { ViewMainCategoryModel } from "./view-main-category-model";
import { AddCategoryServices } from "../add-main-category/add-main-category.service";
import { AddCategoryModel } from "../add-main-category/add-main-category-model";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, Filters } from './constants';
import {FormFields} from './constants/form-fields'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./view-main-category.component.html"
})

export class ViewMainCategoryComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  ViewMainCategoryModelObj: ViewMainCategoryModel = new ViewMainCategoryModel();
  AddCategoryModelObj: AddCategoryModel = new AddCategoryModel();
  public griddata: any[];
  isSubmitted: boolean;
  MessageFlag:String;
  buttons = Buttons;
  filters = Filters;
  isEditDisable = false;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  isHelpActive = false;
  public state: State = {};
  constructor(
    private xViewMainCategoryServices: ViewMainCategoryServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddCategoryServices: AddCategoryServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.GetGridData();
  }

  ngOnInit() {
    this.spinner.show();
   this.formUsrCommonGroup = this.formBuilder.group({
    CategoryName: ["", Validators.required],
    disbledFaltu1: ["", Validators.nullValidator],
    disbledFaltu2: ["", Validators.nullValidator]
  });}
  //get grid
  GetGridData() {
    this.xViewMainCategoryServices
      .ViewmainCategoryData(this.ViewMainCategoryModelObj)
      .subscribe(response => {
        //console.log("category", response);
        if (response.length > 1 && response[1].length > 0) {
          this.ViewMainCategoryModelObj.Main_Cat_Name =  response[1][0].Category_Filter_CategoryName;
          this.ViewMainCategoryModelObj.Main_Cat_Active =  response[1][0].Category_Filter_CategoryIsActive;
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

  addcategory(event, content) {

    if (event === 'Create Category') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddCategoryModelObj = new AddCategoryModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }


  ModelObj: any;
  formButton() {
   this.isSubmitted = false;

    if (this.AddCategoryModelObj.Main_Cat_Back_Color == "") {
      this.AddCategoryModelObj.Main_Cat_Back_Color = '#000000';
    }

    if (this.ModelObj == undefined) {
      this.AddCategoryModelObj.Main_Cat_pkeyID = 0;
    } else {
      this.AddCategoryModelObj.Main_Cat_pkeyID = this.ModelObj;
    }

    this.xAddCategoryServices
      .CategoryDataPost(this.AddCategoryModelObj)
      .subscribe(response => {
        //debugger
        if (response[0].Status != "0") {
          this.AddCategoryModelObj.Main_Cat_pkeyID = parseInt(
            response[0].Main_Cat_pkeyID
          );

          this.MessageFlag = "Category Data Saved...!";
          this.isSubmitted = true;
          this.commonMessage();
          this. GetGridData() ;
        }
        else {
          if (response[0].Status == "0") {
            this.MessageFlag = "This Category Record Already Exist";
            this.commonMessage();
          }
          if (response[0] == 'Index was outside the bounds of the array.') {
            this.MessageFlag = "Some Thing Wrong...!";
            this.commonMessage();
          }
        }
      });
  }

  // common message modal popup
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

  showDetails(content, dataItem) {
    this.ModelObj = dataItem.Main_Cat_pkeyID;
    this.AddCategoryModelObj.Main_Cat_pkeyID = dataItem.Main_Cat_pkeyID;
    this.AddCategoryModelObj.Main_Cat_Name = dataItem.Main_Cat_Name;
    if (this.ModelObj.Main_Cat_Back_Color != '') {
      var str1 = new String("#");
      var str2 = dataItem.Main_Cat_Back_Color;
      if (str2 == null) {
        str2 = '000000'
      }
      this.AddCategoryModelObj.Main_Cat_Back_Color = str1.concat(str2);
    }

    this.AddCategoryModelObj.Main_Cat_IsActive = dataItem.Main_Cat_IsActive;
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
      this.AddCategoryModelObj.Main_Cat_pkeyID = dataItem.Main_Cat_pkeyID;
      this.AddCategoryModelObj.Main_Cat_IsDelete = true;
      this.AddCategoryModelObj.Main_Cat_IsActive = false;

      this.xAddCategoryServices
        .deleteCategoryDataPost(this.AddCategoryModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  // clear data
  AddNewRecords() {
    this.xRouter.navigate(["/category/addmaincategory", 'new']);
  }

  // common code
  filterCall() {
    this.ViewMainCategoryModelObj.Type = 3;
    this.xViewMainCategoryServices
      .ViewfiltercatData( this.ViewMainCategoryModelObj)
      .subscribe(response => {
        //console.log("category", response);
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });
  }

  clearData() {
    this.ViewMainCategoryModelObj.Type = 5;
    this.xViewMainCategoryServices
      .AddUpdateFilterAdminCategoryData(this.ViewMainCategoryModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.ViewMainCategoryModelObj = new ViewMainCategoryModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.ViewMainCategoryModelObj.Type = 1;
    this.xViewMainCategoryServices
      .AddUpdateFilterAdminCategoryData(this.ViewMainCategoryModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }

  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddCategoryModelObj.Main_Cat_pkeyID = dataItem.Main_Cat_pkeyID;
    this.AddCategoryModelObj.Main_Cat_IsActive = !dataItem.Main_Cat_IsActive;
    this.AddCategoryModelObj.Type = 3;

    this.xAddCategoryServices
    .deleteCategoryDataPost(this.AddCategoryModelObj)
    .subscribe(response => {
      this.MessageFlag = "Category status upated...!";


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
