import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ViewWorkTypeCategoryModel } from "./work-type-category-model";
import { ViewWorkTypeCategoryServices } from './work-type-category.service';
import { AddCategoryServices } from '../add-work-type/add-work-type.service';
import { AddCategoryModel, CategoryPopupModel, WorkTypeGroupObject } from '../add-work-type/add-work-type-model';
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, GridColumns, WorkTypeFields } from './constants';
import { WorkTypeFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import * as $ from "jquery";
import { NgxSpinnerService } from 'ngx-spinner';

import { ViewClientCompaniesServices } from '../../client-companies/view-client-companies/view-client-companies.service';
import { filterMasterModel } from '../../client-companies/view-client-companies/view-client-companies-model';
import { S_IFREG } from 'constants';
import { GridWorkTypeGroupColumns } from './constants/grid-columns';

@Component({
  templateUrl: "./work-type-category.component.html",

})

export class ViewWorkTypeCategoryComponent implements OnInit {
  @ViewChild('scrollMe', { static: false }) scrollBottom: ElementRef;
  formUsrCommonGroup: UntypedFormGroup;
  ViewWorkTypeCategoryModelObj: ViewWorkTypeCategoryModel = new ViewWorkTypeCategoryModel();
  addCategoryModelObj: AddCategoryModel = new AddCategoryModel();
  public griddata: any[];
  CategoryList: any;
  buttons = Buttons;
  workTypeFilters = WorkTypeFilters;
  gridColumns = GridColumns;
  gridWorkTypeGroupColumns = GridWorkTypeGroupColumns;
  workTypeFields = WorkTypeFields;
  messageFlag: string;
  workOrderObj: any;
  isEditDisable = false;
  isSubmitted: boolean;
  public popformArray: any[];
  drdClientlist_temp=[];
  drdClientlist=[];
  public defaultClientItem: { Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name: 'Select Client', Client_pkeyID: 0 };
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  isWorktypeGroupValid = false;
  templatelist: any;
  CategoryPopupModelObj:any;

  public state: State = {};
  public state_grid2: State = {};
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  worktypegrouplst: any;
  Templatearr: any;
  isHelpActive = false;
  button="Save";
  AssignedWorkTypeCategoryList:any
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private EncrDecr: EncrDecrService,
    private xViewWorkTypeCategoryServices: ViewWorkTypeCategoryServices,
    private xAddCategoryServices: AddCategoryServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private spinner: NgxSpinnerService,
    private xViewClientCompaniesServices: ViewClientCompaniesServices,
  ) {
    this.spinner.show();
    this.getWorktypedata();
    this.GetWorkTypeGroup();
    this.GetClientList();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      WorkTypeVal: ["", Validators.required],
      disbledFaltu1: ["", Validators.required],
      disbledFaltu2: ["", Validators.nullValidator],
      Templatevall: ["", Validators.required],
    });
    this.Templatearr = [
      { Id: 1, Name: "Preservation" },
      { Id: 2, Name: "Yard Maintenance" },
      { Id: 3, Name: "Inspection" },
      { Id: 4, Name: "Info Needed" },
    ];
    this.workTypeFields[2].data = this.Templatearr;
  }

  getWorktypedata() {
    this.xViewWorkTypeCategoryServices
      .ViewWorkTypeData(this.ViewWorkTypeCategoryModelObj)
      .subscribe(response => {
        if (response.length > 1 && response[1].length > 0) {
          this.ViewWorkTypeCategoryModelObj.WT_WorkType = response[1][0].WT_Filter_Name;
          this.ViewWorkTypeCategoryModelObj.WT_CategoryID = response[1][0].WT_Filter_Group;
          this.ViewWorkTypeCategoryModelObj.WT_IsActive = response[1][0].WT_Filter_WTIsActive;
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
  }

  // clear data
  addNewWorkType(event, content) {
    if (event === 'Add Work Type') {
      this.isEditDisable = false;
      this.addCategoryModelObj = new AddCategoryModel();
      this.modalService.open(content);
      this.formUsrCommonGroup.enable();
    } else {
      this.CategoryPopupModelObj=new CategoryPopupModel()
      this.button="Save";
      this.modalService.open(this.contentCateFORM, { windowClass: "lgModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
      // this.modalService.open(this.contentCateFORM);
    }
  }

  // this code selected event row
  showDetails(content, dataItem) {

    this.addCategoryModelObj.WT_pkeyID = dataItem.WT_pkeyID;
    this.addCategoryModelObj.WT_WorkType = dataItem.WT_WorkType;
    this.addCategoryModelObj.WT_CategoryMultiple =JSON.parse(dataItem.WT_CategoryJson)
        //  response[0][0].WT_CategoryMultiple;
        // this.addCategoryModelObj.WT_CategoryID = response[0].WT_CategoryID;
    this.addCategoryModelObj.WT_Active = dataItem.WT_Active;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.modalService.open(content);

    // this.ViewWorkTypeCategoryModelObj.WT_pkeyID=dataItem.WT_pkeyID
    // this.ViewWorkTypeCategoryModelObj.Type=2
    // this.xViewWorkTypeCategoryServices
    //   .ViewWorkTypeData(this.ViewWorkTypeCategoryModelObj)
    //   .subscribe(response => {
    //     debugger;

    //   });
  }

  filterCall() {
    this.ViewWorkTypeCategoryModelObj.Type = 4;

    this.xViewWorkTypeCategoryServices
      .ViewWorkTypeData(this.ViewWorkTypeCategoryModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        //console.log("User Details", response);
        this.griddata = response[0];
      });
  }

  clearData() {
    this.ViewWorkTypeCategoryModelObj.Type = 5;

    this.xViewWorkTypeCategoryServices
      .AddUpdateFilterAdminWorkTypeData(this.ViewWorkTypeCategoryModelObj)
      .subscribe(response => {
        this.ViewWorkTypeCategoryModelObj = new ViewWorkTypeCategoryModel();
        this.getWorktypedata();
      })

  }

  saveFilterData() {
    this.ViewWorkTypeCategoryModelObj.Type = 1;

    this.xViewWorkTypeCategoryServices
      .AddUpdateFilterAdminWorkTypeData(this.ViewWorkTypeCategoryModelObj)
      .subscribe(response => {
        this.messageFlag = "WorkType filter saved...!";
        this.commonMessage();
        this.filterCall();
      })
  }
  filterdrd(value) {
    if (value.event != '') {
      var filteredcustomer = this.worktypegrouplst.filter(function (el) {return el.Work_Type_Name != "";});
      this.workTypeFilters[1].data = filteredcustomer.filter((s) => s.Work_Type_Name.toLowerCase().indexOf(value.event.toLowerCase()) !== -1);
    }
    else {
      this.workTypeFilters[1].data = this.worktypegrouplst.slice();
    }

  }
  commondrd(value) {
    if (value.val == "disbledFaltu1") {
      if (value.event != '') {
        var filteredcustomer = this.worktypegrouplst.filter(function (el) {return el.Work_Type_Name != "";});
        this.workTypeFields[1].data = filteredcustomer.filter((s) => s.Work_Type_Name.toLowerCase().indexOf(value.event.toLowerCase()) !== -1);
      }
      else {
        this.workTypeFields[1].data = this.worktypegrouplst.slice();
      }
    }
    if (value.val == "Templatevall") {
      var filteredcustomer = this.Templatearr.filter(function (el) {
        return el.Name != "";
      });
      this.workTypeFields[2].data = filteredcustomer.filter((s) => s.Name.toLowerCase().indexOf(value.event.toLowerCase()) !== -1);
    }
    else {
      this.workTypeFields[2].data = this.Templatearr.slice();
    }


  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.addCategoryModelObj.WT_pkeyID = dataItem.WT_pkeyID;
      this.addCategoryModelObj.WT_IsDelete = true;
      this.xAddCategoryServices.WorkCategoryPost(this.addCategoryModelObj)
        .subscribe(response => {
          this.getWorktypedata();
        });
    }
  }

  // get work type group
  GetWorkTypeGroup() {
    this.xWorkOrderDrodownServices
      .GetWorkTypecatDetailsDropdownGet()
      .subscribe(response => {
        // debugger;
        this.workTypeFields[1].data=[];
        this.worktypegrouplst = response[0];
        this.workTypeFields[1].data=response[0];

        // var data = {Work_Type_Cat_pkeyID: 0,Work_Type_Name: "Select"}
        // this.workTypeFields[1].data.push(data);

        // response[0].forEach(element => {this.workTypeFields[1].data.push(element);});

        this.workTypeFilters[1].data=this.worktypegrouplst;
        this.popformArray = response[0];
      });
  }

  //kendo check box event action


  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  public dataStateChange_grid2(state_grid2: DataStateChangeEvent): void {
    this.state_grid2 = state_grid2;
  }
  onSubmit() {
    // debugger;
    // console.log(this.addCategoryModelObj)
    this.isSubmitted = false;
    this.xAddCategoryServices
      .WorkCategoryPost(this.addCategoryModelObj)
      .subscribe(response => {
        this.isSubmitted = true;
        if (response[0].Status == "1") {
          var WTPkey = response[0].WT_pkeyID;
          this.addCategoryModelObj.WT_pkeyID = parseInt(response[0].WT_pkeyID);
          this.messageFlag = "Work Type Data Saved...!";
          this.getWorktypedata();
          this.commonMessage();
        } else if (response[0].Status == "0") {
          this.messageFlag = "This Work Type Record Already Exist";
          this.commonMessage();
        }
        else {

          this.messageFlag = "something went wrongs...Please contact your system admin";
          this.commonMessage();
        }
      });
  }
  checkChange(event, dataItem) {
    ////dfebugger;
    this.addCategoryModelObj.WT_pkeyID = dataItem.WT_pkeyID;
    this.addCategoryModelObj.WT_IsActive = !dataItem.WT_IsActive;
    this.addCategoryModelObj.Type = 3;

    this.xAddCategoryServices
      .WorkCategoryPost(this.addCategoryModelObj)
      .subscribe(response => {
        this.messageFlag = "WorkType status upated...!";
        this.commonMessage();
        this.getWorktypedata();
      });
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.messageFlag;
    modalRef.result.then(result => { }, reason => { });
    this.CategoryPopupModelObj=new CategoryPopupModel()
    this.button="Save";
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  DispalyInfo(event) {
    this.isHelpActive = event.isHelpActive;
    this.messageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
  GetClientList() {
    this.filterMasterModelObj.Type = 6;
    this.xViewClientCompaniesServices
      .ClientComapnyViewData(this.filterMasterModelObj)
      .subscribe(response => {
        this.drdClientlist = response[0];
        this.drdClientlist_temp=response[0]
      });
  }
  FilterClientDropdowen(value) {
    if (value!='') {
      var filteredclient = this.drdClientlist_temp.filter(function (el) {return el.Client_Company_Name != null;});
      this.drdClientlist = filteredclient.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drdClientlist = this.drdClientlist_temp.slice();
   }
  }
  SubmitWorkTypeManage() {
    this.isSubmitted=true;
    this.isWorktypeGroupValid=false
    if(this.CategoryPopupModelObj.Work_Type_Name==undefined || this.CategoryPopupModelObj.Work_Type_Name==null)
    {
      this.isWorktypeGroupValid=true;
    }
    if(!this.isWorktypeGroupValid)
    {
      this.xAddCategoryServices
      .WorkCategoryPOPUPPost(this.CategoryPopupModelObj)
      .subscribe(response => {
        this.CategoryList = response[0];
        this.popformArray = response[0];
        this.isWorktypeGroupValid=false;
        this.isSubmitted=false;
        this.button="Save";
        this.messageFlag = "Work Type Groups Saved...!";
        this.commonMessage();
        this.GetWorkTypeGroup();
      });
    }
  }
  EditWorkTypeManage(data){
    this.button="Update";
    this.CategoryPopupModelObj.Work_Type_Cat_pkeyID =data.Work_Type_Cat_pkeyID;
    this.CategoryPopupModelObj.Work_Type_Client_pkeyID =data.Work_Type_Client_pkeyID;
    this.CategoryPopupModelObj.Work_Type_Name =data.Work_Type_Name;
    this.CategoryPopupModelObj.Work_Type_IsActive =data.Work_Type_IsActive;
  }
  CancleClick(){
    this.button="Save";
    this.isWorktypeGroupValid=false;
    this.CategoryPopupModelObj=new CategoryPopupModel();
  }
  DeleteWorkTypeManage(data){
    if (data.Work_Type_Cat_pkeyID != 0 && !data.Work_Type_IsDeleteAllow) {
      var cfrm = confirm("Are you want to delete this record...!");
      if (cfrm == true) {
        this.CategoryPopupModelObj.Work_Type_Cat_pkeyID = data.Work_Type_Cat_pkeyID;
        this.CategoryPopupModelObj.Work_Type_IsActive = false;
        this.CategoryPopupModelObj.Type = 4;
        this.xAddCategoryServices
          .DeleteWorkCategoryPOPUP(this.CategoryPopupModelObj)
          .subscribe(response => {
            this.GetWorkTypeGroup();
          })
      }
    }
  }
  checkChangeWorkTypeManage(event, data) {
    var obj={
      Work_Type_Cat_pkeyID:data.Work_Type_Cat_pkeyID,
      Work_Type_Client_pkeyID:data.Work_Type_Client_pkeyID,
      Work_Type_Name:data.Work_Type_Name,
      Work_Type_IsActive:!data.Work_Type_IsActive,
      Type:2
    }
    this.xAddCategoryServices
      .WorkCategoryPOPUPPost(obj)
      .subscribe(response => {
        this.CategoryList = response[0];
        this.popformArray = response[0];
        this.isWorktypeGroupValid=false;
        this.isSubmitted=false;
        this.button="Save";
        this.messageFlag = "Status updated";
        this.commonMessage();
        this.GetWorkTypeGroup();
      });
  }
  ShowCategoryList(dataItem,content){
    this.AssignedWorkTypeCategoryList ={ CategoriesList: JSON.parse(dataItem.WT_CategoryJson),WT_pkeyID:dataItem.WT_pkeyID }
    this.modalService.open(content, { windowClass: "small" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  deleteCategory(event, CategoryId,WorkTypeId) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.addCategoryModelObj.WT_pkeyID = WorkTypeId;
      this.addCategoryModelObj.WT_CategoryID = CategoryId;
      this.addCategoryModelObj.WT_IsDelete = true;
      this.addCategoryModelObj.Type = 6;
      this.xAddCategoryServices.WorkCategoryPost(this.addCategoryModelObj)
        .subscribe(response => {
          this.getWorktypedata();
          this.modalService.dismissAll();
        });
    }
  }
}
