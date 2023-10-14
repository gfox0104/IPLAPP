
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";

import { WorkOrderImportQueueModel, ImportWorkOrderDataModel } from "./order-import-queue-model";
import { ImportWorkOrderQueueDetailsModel } from '../auto-import-order/order-queue-detail-model';
import { WorkOrderImportQueueServices } from "./order-import-queue.service";
import { WorkOrderDrodownServices } from "../../../services/common-drop-down/drop-down.service";
import { WorkOrderQueueService } from '../work-order-queue.service';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { AddCategoryModel } from 'src/app/pages/admin/work-type/add-work-type/add-work-type-model';
import { AddCategoryServices } from 'src/app/pages/admin/work-type/add-work-type/add-work-type.service';
import { WorkTypeFields } from 'src/app/pages/admin/work-type/work-type-category/constants/work-type-fields';
import { WorkTypeFilters } from 'src/app/components/iplapp-filter-form/user-filter-form';
import { ViewWorkTypeCategoryServices } from 'src/app/pages/admin/work-type/work-type-category/work-type-category.service';
import { ViewWorkTypeCategoryModel } from 'src/app/pages/admin/work-type/work-type-category/work-type-category-model';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  templateUrl: "./order-import-queue.component.html"
})

export class WorkOrderImportQueueComponent implements OnInit {
  WorkOrderImportQueueModelObj: WorkOrderImportQueueModel = new WorkOrderImportQueueModel();
  ImportWorkOrderQueueDetailsModelObj: ImportWorkOrderQueueDetailsModel = new ImportWorkOrderQueueDetailsModel();
  ImportWorkOrderDataModelObj: ImportWorkOrderDataModel = new ImportWorkOrderDataModel();
  addCategoryModelObj: AddCategoryModel = new AddCategoryModel();
  ViewWorkTypeCategoryModelObj: ViewWorkTypeCategoryModel = new ViewWorkTypeCategoryModel();
  public griddata: any[];
  isHelpActive = false;
  MessageFlag: string; // custom msg sathi
  formUsrCommonGroup: UntypedFormGroup;
  dropCkck = false;
  cordinatorvalFlag = false;
  contractorvalFlag = false;
  GetModel: any;
  jsondatalabel: any;
  instructiondata: any;
  chkflag: any;
  contractorlst: any;
  cordinatorlst: any;
  Worktypelst: any;
  Processorlst: any;
  workTypeFields = WorkTypeFields;
  isEditDisable = false;
  loaddata = false;
  loadgrid = true
  submitted = false; // submitted;
  isSubmitted: boolean;
  workTypeFilters = WorkTypeFilters;
  worktypename: any;
  add:boolean=false;
  config: any;
  selectedGridIdx = 0;
  public data: Array<string>;
  public datac: Array<string>;
  public dataWo: Array<string>;
  public datap: Array<string>;
  CategoryList: any;
  public dataCat: Array<string>;
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  public defaultWTItem: { WT_WorkType: string, WT_pkeyID: number } = { WT_WorkType: 'Select', WT_pkeyID: 0 };
  public defaultCatItem: { Cat_Name: string, Cat_ID: number } = { Cat_Name: 'Select', Cat_ID: 0 };
  public defaultFBWT: { Import_Client_OrderTypeCodes_Description: string, Import_Client_OrderTypeCodes_Code: string } = { Import_Client_OrderTypeCodes_Description: 'Select', Import_Client_OrderTypeCodes_Code: '' };
  public dataFBWo: Array<string>;
  FBWorktypelst: any;

  constructor(
    private xmodalService: NgbModal,
    private xRouter: Router,
    private xWorkOrderImportQueueServices: WorkOrderImportQueueServices,
    private formBuilder: UntypedFormBuilder,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private workOrderQueueService: WorkOrderQueueService,
    private xAddCategoryServices: AddCategoryServices,
    private xViewWorkTypeCategoryServices: ViewWorkTypeCategoryServices,
    private spinner: NgxSpinnerService
  ) {
    this.GetCompanyDropDown();
    this.GetGridData();
    //drd call
    // this.GetGridDetails();
  }

  ngOnInit() {
    this.spinner.show()
    this.formUsrCommonGroup = this.formBuilder.group({
      // cordinatorval: ["", Validators.required],
      // contractorval: ["", Validators.required],
      WorkTypeVal: ["", Validators.required],
      disbledFaltu1: ["", Validators.nullValidator],
      disbledFaltu2: ["", Validators.nullValidator],
      Templatevall: ["", Validators.required],
    });
    this.workTypeFields[2].data = [
      { Id: 1, Name: "Preservation" },
      { Id: 2, Name: "Yard Maintenance" },
      { Id: 3, Name: "Inspection" },
      { Id: 4, Name: "Info Needed" },
    ];
    

    this.GetWorkTypeGroup();
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  //get grid
  GetGridData() {
    debugger
    this.loaddata = false;
    this.loadgrid = true;
    this.GetModel = this.workOrderQueueService.getDataItem();
    if (this.GetModel == undefined) {
      this.xRouter.navigate(["workorder/queueworkorder/importqueuedata"]);
    }
    else {
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_PkeyId = this.GetModel.Imrt_PkeyId;
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_Import_From_ID = this.GetModel.Imrt_Import_From_ID;
      this.xWorkOrderImportQueueServices
        .importQueuedata(this.ImportWorkOrderQueueDetailsModelObj)
        .subscribe(response => {
          //console.log('import data', response)
          this.loaddata = true;
          this.loadgrid = false
          if (response[0].length > 0) {
            this.jsondatalabel = response[0];
            this.instructiondata = response[0].WorkOrderItemDetail;
            this.config = {
              itemsPerPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString()),
              currentPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString()),
              totalItems: parseInt(response[1])
            };
          } else {
            this.jsondatalabel = response[0];
            this.instructiondata = response[0].WorkOrderItemDetail;
            this.MessageFlag = "Workorder does not exists...!";
            this.commonMessage();

            this.config = {
              itemsPerPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString()),
              currentPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString()),
              totalItems: 0
            };
          }
          this.spinner.hide()

        });

    }
  }
  checkAll: boolean = false;
  checkRowAll() {
    ////dfebugger
    this.checkAll = !this.checkAll;
    this.jsondatalabel.forEach(item => item.chkflag = this.checkAll ? true : false);
    if (this.checkAll == true) {
      this.jsondatalabel.forEach(element => {
        if (element.chkflag) {
          this.ImportArray.push(element);
        }
      });
      //console.log(this.ImportArray);
      this.isdisable = false;
    }
    else {
      this.ImportArray = [];
      //console.log(this.ImportArray);
      this.isdisable = true;
    }
  }
  //kendo check box event action
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

  GetWorkTypeGroup() {
    this.xWorkOrderDrodownServices
      .GetWorkTypecatDetailsDropdownGet()
      .subscribe(response => {
        this.workTypeFilters[1].data = response[0];
        this.workTypeFields[1].data = response[0];
        this.FBWorktypelst = response[1];
        this.dataFBWo = this.FBWorktypelst;
        // this.spinner.hide()
      });
  }

  //import work order details data on button click
  ImportArray = [];
  isdisable = true;

  SelectedImportWo(val, i) {
    //console.log('drd', val)
    if (val.chkflag == true) {
      this.ImportArray.push(val)
      //console.log('ck', this.ImportArray);
      this.isdisable = false;
     
    } else {
      this.ImportArray.splice(i, 1);
     
    }
   
    this.isdisable = false;
  }

  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  ImportWorkdata() {
    // debugger
  this.dropCkck = false;
  
  this.ImportWorkOrderDataModelObj.ImportWoArray = this.ImportArray;
    // console.log('inputarray',this.ImportArray)
    this.ImportWorkOrderDataModelObj.Imrt_Import_From_ID = this.GetModel.Imrt_Import_From_ID
    this.ImportWorkOrderDataModelObj.Imrt_PkeyId = this.GetModel.Imrt_PkeyId
    this.ImportWorkOrderDataModelObj.Imrt_Wo_Import_ID = this.GetModel.Imrt_Wo_Import_ID

    if(this.ImportArray[0].WorkType_Id != null){
      
      this.add = false ;
      
      this.xWorkOrderImportQueueServices
      .ImportWorkOrderDetailsData(this.ImportWorkOrderDataModelObj)
      .subscribe(response => {
        this.ImportArray = [];
        this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_Number = '';
        this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_WTID = 0;
        this.chkflag = false;
        this.isdisable = true;
        this.submitted = false;
        this.MessageFlag = "Work Order Import Updated...!";
        this.commonMessage();
        this.GetGridData();
      });

      }else {
        alert('Please Select the Work Type')
     this.add = true ;
    
      }  
    // this.xWorkOrderImportQueueServices
    //   .ImportWorkOrderDetailsData(this.ImportWorkOrderDataModelObj)
    //   .subscribe(response => {
    //     this.ImportArray = [];
    //     this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_Number = '';
    //     this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_WTID = 0;
    //     this.chkflag = false;
    //     this.isdisable = true;
    //     this.submitted = false;
    //     this.MessageFlag = "Work Order Import Updated...!";
    //     this.commonMessage();
    //     this.GetGridData();
    //   });
  }

  contractor_Method() {
    this.contractorvalFlag = false;
  }

  cordinator_Method() {
    this.cordinatorvalFlag = false;
  }

  GetCompanyDropDown() {
    this.xWorkOrderDrodownServices.DropdownGetWorkOrder().subscribe(response => {
      this.contractorlst = response[14];
      this.data = this.contractorlst;
      this.cordinatorlst = response[15];
      this.datac = this.cordinatorlst;
      this.Worktypelst = response[1];
      this.dataWo = this.Worktypelst;
      this.CategoryList = response[2];
      this.dataCat = this.CategoryList
      this.Processorlst = response[16];
      this.datap = this.Processorlst;
    });
  }

  Openmodel(contentpop, idx) {
    this.selectedGridIdx = idx;
    this.xmodalService.open(contentpop);
  }

  onSubmit() {
    ////dfebugger
    this.isSubmitted = false;
    this.xAddCategoryServices
      .WorkCategoryPost(this.addCategoryModelObj)
      .subscribe(response => {
        ////dfebugger
        this.isSubmitted = true;
        if (response[0].Status == "1") {
          var WTPkey = response[0].WT_pkeyID;
          this.addCategoryModelObj.WT_pkeyID = parseInt(response[0].WT_pkeyID);
          this.jsondatalabel[this.selectedGridIdx].WorkType_Id = parseInt(response[0].WT_pkeyID);
          this.MessageFlag = "Work Type Data Saved...!";
          this.commonMessage();
          this.GetCompanyDropDown();
          //this.getworktype();
        }
      });
  }
  
  closeModal() {
    this.xmodalService.dismissAll();
    this.addCategoryModelObj = new AddCategoryModel();
  }

  onPageChange(event) {
    //console.log(event);
    this.config.currentPage = event;
    this.ImportWorkOrderQueueDetailsModelObj.PageNumber = parseInt(event.toString());
    this.GetGridData();
  }
  PageChange() {
    ////dfebugger;
    this.ImportWorkOrderQueueDetailsModelObj.PageNumber = 1;
    this.GetGridData();
  }

  workTypehandleFilter(value) {
    ////dfebugger;
    if (value != '') {
      this.dataWo = this.Worktypelst.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.dataWo = this.Worktypelst.slice();
    }
  }
  CordinatorhandleFilter(value) {
    if (value != '') {
      this.datac = this.cordinatorlst.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.datac = this.cordinatorlst.slice();
    }
  }
  ContractorhandleFilter(value) {
    if (value != '') {
      this.data = this.contractorlst.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.data = this.contractorlst.slice();
    }
  }
  ProcessorhandleFilter(value) {
    if (value != '') {
      this.datap = this.Processorlst.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.datap = this.Processorlst.slice();
    }
  }
  CategoryFilter(value) {
    if (value != '') {
      var filteredcustomer = this.CategoryList.filter(function (el) {
      return el.Cat_Name != null;
    });
    this.dataCat = filteredcustomer.filter((s) => s.Cat_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
 
    }
    else{
      this.dataCat = this.CategoryList.slice();
    }
  }
  selectWTHandler(WT)
  {
    var filteredData = this.Worktypelst.filter(function (el) {
      return el.WT_pkeyID == WT;
    });

    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_WTIDName = filteredData.length > 0 ? filteredData[0].WT_WorkType : '';
  }  
  selectCatHandler(Cat)
  {
    var filteredData = this.CategoryList.filter(function (el) {
      return el.Cat_ID == Cat;
    });
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_CatIDName = filteredData.length > 0 ? filteredData[0].Cat_Name : '';
  }
  FilterDetails()
  {
    //debugger
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_PkeyId = this.GetModel.Imrt_PkeyId;
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Import_From_ID = this.GetModel.Imrt_Import_From_ID;
    this.xWorkOrderImportQueueServices
      .importQueuedata(this.ImportWorkOrderQueueDetailsModelObj)
      .subscribe(response => {
        //console.log('import data', response)
        this.loaddata = true;
        this.loadgrid = false
        if (response[0].length > 0) {
          this.jsondatalabel = response[0];
          this.instructiondata = response[0].WorkOrderItemDetail;
          this.config = {
            itemsPerPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString()),
            currentPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString()),
            totalItems: parseInt(response[1])
          };
        } else {
          this.jsondatalabel = response[0];
          this.instructiondata = response[0].WorkOrderItemDetail;
          this.MessageFlag = "Workorder does not exists...!";
          this.commonMessage();

          this.config = {
            itemsPerPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString()),
            currentPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString()),
            totalItems: 0
          };
        }
      });
  } 
  Reset()
  {
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_WTIDName = '';
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_CatIDName = '';
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_WTID = 0;
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_CatID = 0;
    this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_Number = '';
    this.GetGridData();
  }
  
  FBworkTypehandleFilter(value) {
    if (value != '') {
      this.dataFBWo = this.FBWorktypelst.filter((s) => s.Import_Client_OrderTypeCodes_Description.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.dataFBWo = this.FBWorktypelst.slice();
    }
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
