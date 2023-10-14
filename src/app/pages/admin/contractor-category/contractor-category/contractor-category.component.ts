import { Component, OnInit , ViewChild, ElementRef} from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { IplAppModalContent } from 'src/app/components';
import { ContractorCategoryServices } from "./contractor-category.service";
import { ContractorCategoryModel } from "./contractor-category-model";
import { AddContractorCategoryServices } from "../add-contractor-category/add-contractor-category.service";
import { AddContractorCategoryModel } from "../add-contractor-category/add-contractor-category-model";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, Filters } from './constants';
import {FormFields} from './constants/form-fields'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./contractor-category.component.html"
})

export class ViewContractorCategoryComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  ViewContractorCategoryModelObj: ContractorCategoryModel = new ContractorCategoryModel();
  AddContractorCategoryModelObj: AddContractorCategoryModel = new AddContractorCategoryModel();
  public griddata: any[];
  isSubmitted: boolean;
  submitted = false;
  MessageFlag:String;
  buttons = Buttons;
  button: string;
  filters = Filters;
  isUpdateDisable = false;
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  myFormGroup: UntypedFormGroup;
  contractorName: string = "";
  Con_Cat_Icon = new UntypedFormControl();
  // categoryName : string = '';
  // iconColor : string = '#000000';
  // isActive : boolean = true;
  // fallbackIcon = 'fas fa-user';
  isLoading: boolean;
  // conId: Number = 0;
  public state: State = {};
  isHelpActive = false;

  constructor(
    private xViewContractorCategoryServices: ContractorCategoryServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddContractorCategoryServices: AddContractorCategoryServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.GetGridData();
  }

  ngOnInit() {
    this.spinner.show();
   this.myFormGroup = new UntypedFormGroup({Con_Cat_Icon: this.Con_Cat_Icon});
   this.button = this.isUpdateDisable ? 'Update' : ' Save';
   this.formUsrCommonGroup = this.formBuilder.group({
    Con_Cat_Name: ["", Validators.required],
    Con_Cat_IsActive:[true],
    Con_Cat_Icon:[""],
    Con_Cat_Back_Color:[""]
    // disbledFaltu1: ["", Validators.nullValidator],
    // disbledFaltu2: ["", Validators.nullValidator],
  });}
  //get grid
  GetGridData() {
    // debugger
    this.xViewContractorCategoryServices
      .ViewmainCategoryData(this.ViewContractorCategoryModelObj)
      .subscribe(response => {
        // console.log("concat",response)
        if (response.length > 1 && response[1].length > 0) {
          this.ViewContractorCategoryModelObj.Con_Cat_Name = response[1][0].ConCat_Filter_Name;
          this.ViewContractorCategoryModelObj.Con_Cat_IsActive  = response[1][0].ConCat_Filter_CatIsActive;
          this.ViewContractorCategoryModelObj.Con_Cat_CreatedBy= response[1][0];
          this.ViewContractorCategoryModelObj.Con_Cat_ModifiedBy= response[1][0];
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
    this.AddContractorCategoryModelObj.Con_Cat_PkeyID=0;
    this.AddContractorCategoryModelObj.Con_Cat_Name="";
    this.Con_Cat_Icon.setValue('fas fa-user');
    this.AddContractorCategoryModelObj.Con_Cat_Back_Color="#000000";
    this.AddContractorCategoryModelObj.Con_Cat_IsActive=true;
    this.AddContractorCategoryModelObj.Con_Cat_Icon="fas fa-user";
    this.isHelpActive = false;
    if (event === 'Create Category') {
      // this.formUsrCommonGroup.enable()
      this.isUpdateDisable = false;
      this.AddContractorCategoryModelObj = new AddContractorCategoryModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  // ModelObj: any;
  formButton() {
    // debugger;
    this.submitted = true;
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    if (this.AddContractorCategoryModelObj.Con_Cat_Back_Color == "") {
      this.AddContractorCategoryModelObj.Con_Cat_Back_Color = '#000000';
    }
    this.xAddContractorCategoryServices
      .CategoryDataPost(this.AddContractorCategoryModelObj)
      .subscribe(response => {
        if (response[0].Status != "0") {
          this.AddContractorCategoryModelObj.Con_Cat_PkeyID = parseInt(
            response[0].Con_Cat_PkeyID
          );
          this.MessageFlag = "Contractor Category Data Saved...!";
          this.submitted = false;
          this.commonMessage();
          this. GetGridData() ;
          this.formUsrCommonGroup.reset();
        }
        else {
          if (response[0] == 'Index was outside the bounds of the array.') {
            this.MessageFlag = "Some Think Wrong...!";
            this.commonMessage();
            this.submitted = false;
          }
        }
      });
  }

  // saveForms() {
  //   debugger;
  //   this.submitted = true;
  //   if (this.formUsrCommonGroup.invalid) {
  //    return;
  //  }
  //   this.AddContractorCategoryModelObj.Con_Cat_Name = this.categoryName;
  //   this.AddContractorCategoryModelObj.Con_Cat_Icon = this.Con_Cat_Icon.value;
  //   this.AddContractorCategoryModelObj.Con_Cat_Back_Color = this.iconColor;
  //   this.AddContractorCategoryModelObj.Con_Cat_IsActive = this.isActive;
  //   this.isUpdateDisable = false;
  //   this.xAddContractorCategoryServices
  //     .CategoryDataPost(this.AddContractorCategoryModelObj)
  //     .subscribe(response => {
  //       //console.log(response);
  //       if (response[0].Status != "0") {
  //         this.AddContractorCategoryModelObj.Con_Cat_PkeyID = parseInt(
  //           response[0].Con_Cat_PkeyID
  //         );

  //         this.MessageFlag = "Contractor Category Data Saved...!";
  //         this.isSubmitted = true;
  //         this.commonMessage();
  //         this. GetGridData() ;
  //         this.formUsrCommonGroup.reset();
  //       }
  //       else {
  //         if (response[0].Status == "0") {
  //           this.MessageFlag = "This Record Already Exist";
  //           this.commonMessage();
  //         }
  //         if (response[0] == 'Index was outside the bounds of the array.') {
  //           this.MessageFlag = "Some Think Wrong...!";
  //           this.commonMessage();
  //         }
  //       }
  //     });
  // }
  //update category
  // updateForms(){
  //   this.AddContractorCategoryModelObj.Con_Cat_Name = this.categoryName;
  //   this.AddContractorCategoryModelObj.Con_Cat_Icon = this.fallbackIcon;
  //   this.AddContractorCategoryModelObj.Con_Cat_Back_Color = this.iconColor;
  //   this.AddContractorCategoryModelObj.Con_Cat_IsActive = this.isActive;
  //   this.AddContractorCategoryModelObj.Con_Cat_PkeyID = this.conId;
  //   this.xAddContractorCategoryServices
  //   .CategoryDataPost(this.AddContractorCategoryModelObj)
  //   .subscribe(response => {
  //     //console.log(response);
  //     if (response[0].Status != "0") {


  //       this.MessageFlag = "Contractor Category Data Updated...!";
  //       this.isSubmitted = true;
  //       this.commonMessage();
  //       this. GetGridData() ;
  //       this.formUsrCommonGroup.reset();
  //     }
  //     else {
  //       if (response[0] == 'Index was outside the bounds of the array.') {
  //         this.MessageFlag = "Some Think Wrong...!";
  //         this.commonMessage();
  //       }
  //     }
  //   });
  // }
  //contractor category
  contractorCategoryHandler($event){
    // this.categoryName = $event.target.value;
  }
  //color picker
  colorPicker($event){
    // this.iconColor = $event.target.value;
    this.AddContractorCategoryModelObj.Con_Cat_Back_Color=$event.target.value
  }
  //icon picker
  onIconPickerSelect(icon: string): void {
    this.Con_Cat_Icon.setValue(icon);
  }
  checkValue(state){
    //console.log(state);
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
    // debugger;
    this.formUsrCommonGroup.reset();
    this.isHelpActive = false;
    // this.ModelObj = dataItem.Con_Cat_PkeyID;
    //console.log('dataItem', dataItem);
    // this.categoryName = dataItem.Con_Cat_Name;
    // this.fallbackIcon = dataItem.Con_Cat_Icon;
    this.Con_Cat_Icon.setValue(dataItem.Con_Cat_Icon);
    this.AddContractorCategoryModelObj.Con_Cat_PkeyID = dataItem.Con_Cat_PkeyID;
    this.AddContractorCategoryModelObj.Con_Cat_Name = dataItem.Con_Cat_Name;
    this.AddContractorCategoryModelObj.Con_Cat_Icon = dataItem.Con_Cat_Icon;
    // this.AddContractorCategoryModelObj.Con_Cat_Back_Color = dataItem.Con_Cat_Back_Color;
    // this.conId = dataItem.Con_Cat_PkeyID;
    if (dataItem.Con_Cat_Back_Color != '') {
      //console.log('color');
      var str1 = new String("#");
      var str2 = dataItem.Con_Cat_Back_Color;
      if (str2 == null) {
        str2 = '000000'
      }
      this.AddContractorCategoryModelObj.Con_Cat_Back_Color = str1.concat(str2);
    }

    this.AddContractorCategoryModelObj.Con_Cat_IsActive = dataItem.Con_Cat_IsActive;

    this.isUpdateDisable = true;
    // this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);

  }
  closeModal() {
    this.xmodalService.dismissAll();
  }
  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddContractorCategoryModelObj.Con_Cat_PkeyID = dataItem.Con_Cat_PkeyID;
      this.AddContractorCategoryModelObj.Con_Cat_IsDelete = true;
      this.xAddContractorCategoryServices
        .deleteCategoryDataPost(this.AddContractorCategoryModelObj)
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
  this.ViewContractorCategoryModelObj.Type = 3;
    this.xViewContractorCategoryServices
      .ViewfiltercatData( this.ViewContractorCategoryModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;

        this.griddata = response[0];
      });
  }

  clearData() {
   this.ViewContractorCategoryModelObj.Type = 5;
    this.xViewContractorCategoryServices
    .AddUpdateFilterAdminConCatData( this.ViewContractorCategoryModelObj)
    .subscribe(response => {
      this.ViewContractorCategoryModelObj = new ContractorCategoryModel();
      this.GetGridData();
    })

  }

  saveFilterData() {
    this.ViewContractorCategoryModelObj.Type = 1;
    this.xViewContractorCategoryServices
    .AddUpdateFilterAdminConCatData( this.ViewContractorCategoryModelObj)
    .subscribe(response => {
      this.MessageFlag = "Contractor Category filter saved...!";
      this.commonMessage();
      this.filterCall();
    })
  }

  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddContractorCategoryModelObj.Con_Cat_PkeyID = dataItem.Con_Cat_PkeyID;
    this.AddContractorCategoryModelObj.Con_Cat_IsActive = !dataItem.Con_Cat_IsActive;
    this.AddContractorCategoryModelObj.Type = 3;

    this.xAddContractorCategoryServices
    .deleteCategoryDataPost(this.AddContractorCategoryModelObj)
    .subscribe(response => {
      this.MessageFlag = "Contractor Category status update...!";


      this.commonMessage();
        this.GetGridData();
      });
  }
  //kendo check box event action

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }

  DispalyInfo(event: Event, lblName)
  {
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }
}
