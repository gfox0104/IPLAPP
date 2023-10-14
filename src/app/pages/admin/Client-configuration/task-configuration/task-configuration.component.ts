import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskConfigurationServices } from "./task-configuration.service";
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { IplAppModalContent } from 'src/app/components';
import { MCConfGridColumns, TaskConfGridColumns, WTConfGridColumns } from "../constants/grid-columns";
import { AddMainCatConfigurationModel, AddTaskConfigurationModel, AddWorkTypeConfigurationModel } from "./task-configuration-model";
import { DropdownModel } from "src/app/pages/models/dropdown-model";
import _ from 'underscore';
import { ReportsServices } from "src/app/pages/reports/report-details/report-details.service";

@Component({
  templateUrl: "./task-configuration.component.html",
  styles:[`
            .k-tabstrip > .k-content{
              background:transparent !important;
              border: none !important
            }
          `]
})

export class AddTaskConfigurationComponent implements OnInit {


  submitted = false;
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string;
  dropCkck = false; // common
  IsEditDisable = false;
  isLoading = false; // buttom loading..
  button = "Save"; // buttom loading..
  gridColumns = TaskConfGridColumns;
  wtGridColumns = WTConfGridColumns;
  mcgridColumns = MCConfGridColumns;
  taskList = [];
  loantypeList = [];
  itemCodeList = [];
  bidcatList = [];
  bidDamageList = [];
  catCodeList = [];
  orderTypeList = [];
  wtList = [];
  public griddata: any[];
  public wtGriddata: any[];
  //public mcGriddata: any[];
  AddTaskConfigurationModelObj: AddTaskConfigurationModel = new AddTaskConfigurationModel();
  AddWorkTypeConfigurationModelObj: AddWorkTypeConfigurationModel = new AddWorkTypeConfigurationModel();
  AddMainCatConfigurationModelObj: AddMainCatConfigurationModel = new AddMainCatConfigurationModel();
  DropdownModelObj: DropdownModel = new DropdownModel();
  public drploantypeList: Array<string>;
  public drpitemCodeList: Array<string>;
  public drpbidcatList: Array<string>;
  public drpbidDamageList: Array<string>;
  public drpcatCodeList: Array<string>;
  public drporderTypeCodeList: Array<string>;
  public drpOrderTypeList: Array<string>;
  public drptaskList: Array<string>;
  public drpWTList: Array<string>;
  public defaultTaskItem: { Task_Name: string, Task_pkeyID: number, Allow_Selection: boolean } = { Task_Name: 'Select', Task_pkeyID: 0, Allow_Selection: true };
  public defaultWTItem: { WT_WorkType: string, WT_pkeyID: number, Allow_Selection: boolean } = { WT_WorkType: 'Select', WT_pkeyID: 0, Allow_Selection: true };
  public defaultLoanItem: { Import_Client_ItemCode_LoanType: string, Import_Client_ItemCode_LoanId: string } = { Import_Client_ItemCode_LoanType: 'Select', Import_Client_ItemCode_LoanId: '0' };
  public defaultItemCodeItem: { Import_Client_ItemCode_Code: string, Import_Client_ItemCode_PkeyId: number } = { Import_Client_ItemCode_Code: 'Select', Import_Client_ItemCode_PkeyId: 0 };
  public defaultBidCatItem: { Import_Client_BidCategory_Name: string, Import_Client_BidCategory_PkeyId: number } = { Import_Client_BidCategory_Name: 'Select', Import_Client_BidCategory_PkeyId: 0 };
  public defaultBidDamageItem: { Import_Client_DamageCauses_Name: string, Import_Client_DamageCauses_PkeyId: number } = { Import_Client_DamageCauses_Name: 'Select', Import_Client_DamageCauses_PkeyId: 0 };
  public defaultCatCodeItem: { Import_Client_CategoryCodes_Code: string, Import_Client_CategoryCodes_PkeyId: number } = { Import_Client_CategoryCodes_Code: 'Select', Import_Client_CategoryCodes_PkeyId: 0 };
  public defaultorderTypeCodeItem: { Import_Client_OrderTypeCodes_Description: string, Import_Client_OrderTypeCodes_PkeyID: number } = { Import_Client_OrderTypeCodes_Description: 'Select', Import_Client_OrderTypeCodes_PkeyID: 0 };
  loaddata = false;
  loadgrid = false;
  taskLoaddata = false;
  taskLoadgrid = false;
  mcLoaddata = false;
  mcLoadgrid = false;
  icbutton = "Import"; // buttom loading..
  icLoading = false; // buttom loading..
  ocbutton = "Import"; // buttom loading..
  ocLoading = false; // buttom loading..
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xTaskConfigurationServices: TaskConfigurationServices,
    private xReportsServices: ReportsServices,
  ) {
    this.GetDropDownData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({

    });

  }
  public onTabSelect(e) {
    if (e.title == 'Task') {
      this.GetGridData();
    }
    if (e.title == 'WorkType') {
      this.GetWTGridData();
    }

  }

  //get grid
  GetDropDownData() {
    this.DropdownModelObj.Type = 1;
    this.xTaskConfigurationServices
      .GetTaskConfigurationDropDown(this.DropdownModelObj)
      .subscribe(response => {
        //debugger;

        this.taskList = response[0];
        this.drptaskList = this.taskList;
        this.loantypeList = response[1];
        this.drploantypeList = this.loantypeList;
        this.itemCodeList = response[2];
        this.drpitemCodeList = this.itemCodeList;
        this.bidcatList = response[3];
        this.drpbidcatList = this.bidcatList;
        this.orderTypeList = response[4];
        this.drpOrderTypeList = this.orderTypeList;
        this.catCodeList = response[5];
        this.drpcatCodeList = this.catCodeList;
        this.wtList = response[6];
        this.drpWTList = this.wtList;

        this.GetGridData();
      });
  }

  public taskItemDisabled(itemArgs: { dataItem: any, index: number }) {
    return !itemArgs.dataItem.Allow_Selection;
  }

  public workTypeItemDisabled(itemArgs: { dataItem: any, index: number }) {
    return !itemArgs.dataItem.Allow_Selection;
  }


  //get grid
  GetGridData() {
    this.taskLoaddata = false;
    this.taskLoadgrid = true;
    this.xTaskConfigurationServices
      .GetTaskConfigurationMasterDetails(this.AddTaskConfigurationModelObj)
      .subscribe(response => {
        ////dfebugger;
        //console.log("resp damage", response);
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var selectedItem = _.findIndex(this.taskList, { Task_pkeyID: element.Task_Configuration_Task_Id });
            if (selectedItem >= 0) {
              this.taskList[selectedItem].Allow_Selection = false;
            }
          });

        }

        this.drptaskList = this.taskList;
        this.taskLoaddata = true;
        this.taskLoadgrid = false;
      });
  }
  ChangeTask() {
    this.taskList.forEach(element => { element.Allow_Selection = true });
    this.griddata.forEach(element => {
      var selectedItem = _.findIndex(this.taskList, { Task_pkeyID: element.Task_Configuration_Task_Id });
      if (selectedItem >= 0) {
        this.taskList[selectedItem].Allow_Selection = false;
      }
    });
    this.drptaskList = this.taskList;
  }
  GetWTGridData() {
    this.loaddata = false;
    this.loadgrid = true;
    this.xTaskConfigurationServices
      .GetWorkTypeConfigurationDetails(this.AddTaskConfigurationModelObj)
      .subscribe(response => {
        ////dfebugger;
        //console.log("resp workType", response);
        this.wtGriddata = response[0];
        this.wtGriddata.forEach(element => {
          var selectedItem = _.findIndex(this.wtList, { WT_pkeyID: element.WorkType_Configuration_WorkType_Id });
          if (selectedItem >= 0) {
            this.wtList[selectedItem].Allow_Selection = false;
          }
        });
        this.drpWTList = this.wtList;
        this.loaddata = true;
        this.loadgrid = false;
      });
  }
  ChangeWorkType() {
    this.wtList.forEach(element => { element.Allow_Selection = true });
    this.wtGriddata.forEach(element => {
      var selectedItem = _.findIndex(this.wtList, { WT_pkeyID: element.WorkType_Configuration_WorkType_Id });
      if (selectedItem >= 0) {
        this.wtList[selectedItem].Allow_Selection = false;
      }
    });
    this.drpWTList = this.wtList;
  }




  taskConfList = []
  // submit form
  formButton() {
    ////dfebugger
    this.submitted = false;
    this.isLoading = true;
    this.taskConfList = [];
    this.griddata.forEach(element => {
      this.AddTaskConfigurationModelObj = new AddTaskConfigurationModel();
      this.AddTaskConfigurationModelObj.Task_Configuration_PkeyId = element.Task_Configuration_PkeyId;
      this.AddTaskConfigurationModelObj.Task_Configuration_LoanType = element.Task_Configuration_LoanType;
      this.AddTaskConfigurationModelObj.Task_Configuration_Task_Id = element.Task_Configuration_Task_Id;
      this.AddTaskConfigurationModelObj.Task_Configuration_ItemCode_Id = element.Task_Configuration_ItemCode_Id;
      this.AddTaskConfigurationModelObj.Task_Configuration_BidCategory_Id = element.Task_Configuration_BidCategory_Id;
      this.AddTaskConfigurationModelObj.Task_Configuration_BidDamage_Id = element.Task_Configuration_BidDamage_Id;
      this.AddTaskConfigurationModelObj.Task_Configuration_CategoryCode_Id = element.Task_Configuration_CategoryCode_Id;
      this.AddTaskConfigurationModelObj.Task_Configuration_ItemCode = element.Task_Configuration_ItemCode;
      this.AddTaskConfigurationModelObj.Task_Configuration_ItemCode_Price = element.Task_Configuration_ItemCode_Price
      this.taskConfList.push(this.AddTaskConfigurationModelObj);
    });

    this.xTaskConfigurationServices
      .PostTaskConfigurationMasterDetails(this.taskConfList)
      .subscribe(response => {
        ////dfebugger;
        //console.log("resp task", response);
        this.taskConfList = [];
        this.MessageFlag = "Task configuration saved...!";
        this.commonMessage();
        this.isLoading = false;
        this.GetGridData();
      });

  }
  wtConfList = []
  // submit form
  wtFormButton() {
    ////dfebugger
    this.submitted = false;
    this.isLoading = true;
    this.wtConfList = [];
    this.wtGriddata.forEach(element => {
      this.AddWorkTypeConfigurationModelObj = new AddWorkTypeConfigurationModel();
      this.AddWorkTypeConfigurationModelObj.WorkType_Configuration_PkeyId = element.WorkType_Configuration_PkeyId;
      this.AddWorkTypeConfigurationModelObj.WorkType_Configuration_OrderType_Id = element.WorkType_Configuration_OrderType_Id;
      this.AddWorkTypeConfigurationModelObj.WorkType_Configuration_WorkType_Id = element.WorkType_Configuration_WorkType_Id;
      this.wtConfList.push(this.AddWorkTypeConfigurationModelObj);
    });

    this.xTaskConfigurationServices
      .PostWorkTypeConfigurationDetails(this.wtConfList)
      .subscribe(response => {
        ////dfebugger;
        //console.log("resp task", response);
        this.wtConfList = []
        this.MessageFlag = "WorkType configuration saved...!";
        this.commonMessage();
        this.isLoading = false;
        this.GetWTGridData();
      });

  }



  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  loanTypeFilter(value) {
    if (value != '') {
      this.drploantypeList = this.loantypeList.filter((s) => s.Import_Client_ItemCode_LoanType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drploantypeList = this.loantypeList.slice();
    }
  }
  taskFilter(value) {
    if (value != '') {
      this.drptaskList = this.taskList.filter((s) => s.Task_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drptaskList = this.taskList.slice();
    }
  }

  bidCategoryFilter(value) {
    if (value != '') {
      this.drpbidcatList = this.bidcatList.filter((s) => s.Import_Client_BidCategory_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpbidcatList = this.bidcatList.slice();
    }
  }
  bidDamageFilter(value) {
    if (value != '') {
      this.drpbidDamageList = this.bidDamageList.filter((s) => s.Import_Client_DamageCauses_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpbidDamageList = this.bidDamageList.slice();
    }
  }
  categoryCodeFilter(value) {
    if (value != '') {
      this.drpcatCodeList = this.catCodeList.filter((s) => s.Import_Client_CategoryCodes_Code.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpcatCodeList = this.catCodeList.slice();
    }
  }
  workTypeFilter(value) {
    if (value != '') {
      this.drpWTList = this.wtList.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpWTList = this.wtList.slice();
    }
  }
  importItemCode() {
    this.icLoading = true;
    this.icbutton = "Processing";
    this.xTaskConfigurationServices
      .AddItemCodes()
      .subscribe(response => {
        //debugger;
        this.icLoading = false;
        this.icbutton = "Import";
        if (response.length > 0) {
          //console.log("resp item code", response);
          this.MessageFlag = "Item Code imported...!";
          this.commonMessage();
          this.GetWTGridData();
        }
        else {
          this.MessageFlag = "No record found...!";
          this.commonMessage();
          this.GetWTGridData();
        }

      });
  }
  importOrderTypeCode() {
    this.ocLoading = true;
    this.ocbutton = "Processing";
    this.xTaskConfigurationServices
      .AddOrdertypecodes()
      .subscribe(response => {
        this.ocLoading = false;
        this.ocbutton = "Import";
        if (response.length > 0) {

          this.MessageFlag = "Order Type Code imported...!";
          this.commonMessage();
          this.GetWTGridData();
        }
        else {
          this.MessageFlag = "No record found...!";
          this.commonMessage();
          this.GetWTGridData();
        }

      });
  }

}
