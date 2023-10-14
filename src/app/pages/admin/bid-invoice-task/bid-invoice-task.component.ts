import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

import { BidInvoiceItemViewTaskServices } from "./bid-invoice-task.service";
import { BidInvoiceItemViewTaskModel } from "./bid-invoice-task-model";
import { BidInvoiceItemModel, Task_GroupPopupModel } from './bid-invoice-item/bid-invoice-item-model';
import { BidInvoiceItemServices } from './bid-invoice-item/bid-invoice-item.service';
import { EncrDecrService } from '../../../services/util/encr-decr.service';
import { Buttons, GridColumns } from './constants';
import{TaskInvFilters} from '../../../components/iplapp-filter-form/user-filter-form'
import { IplAppModalContent } from 'src/app/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { filterMasterModel } from "../client-companies/view-client-companies/view-client-companies-model";
import { ViewClientCompaniesServices } from "../client-companies/view-client-companies/view-client-companies.service";
import { GridTaskGroupColumns } from "./constants/grid-columns";

@Component({
  templateUrl: "./bid-invoice-task.component.html"
})

export class BidInvoiceItemViewTaskComponent implements OnInit {
  BidInvoiceItemViewTaskModelObj: BidInvoiceItemViewTaskModel = new BidInvoiceItemViewTaskModel();
  BidInvoiceItemModelObj: BidInvoiceItemModel = new BidInvoiceItemModel();
  public griddata: any[];
  buttons = Buttons;
  gridColumns = GridColumns;
  TaskInvFilters = TaskInvFilters;
  MessageFlag: string;
  WKDivFlag = true;
  public state: State = {};
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  button="Save";
  IsLoad: boolean = false;
  constructor(
    private xBidInvoiceItemViewTaskServices: BidInvoiceItemViewTaskServices,
    private xRouter: Router,
    private xBidInvoiceItemServices: BidInvoiceItemServices,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() { }

  GetGridData() {
    this.xBidInvoiceItemViewTaskServices
      .ViewTaskMasterData(this.BidInvoiceItemViewTaskModelObj)
      .subscribe(response => {
        // console.log('sun',response)
        if (response.length > 1 && response[1].length > 0) {
          this.BidInvoiceItemViewTaskModelObj.Task_Name =  response[1][0].Task_Filter_TaskName;
          this.BidInvoiceItemViewTaskModelObj.Task_Type =  response[1][0].Task_Filter_TaskType;
          this.BidInvoiceItemViewTaskModelObj.Task_Photo_Label_Name =  response[1][0].Task_Filter_TaskPhName;
          this.BidInvoiceItemViewTaskModelObj.Task_IsActive =  response[1][0].Task_Filter_TaskIsActive;
         this.BidInvoiceItemViewTaskModelObj.Task_CreatedBy = response[1][0];
         this.BidInvoiceItemViewTaskModelObj.Task_ModifiedBy = response[1][0];
         this.BidInvoiceItemModelObj.Task_Contractor_UnitPrice = response[1][0];
         this.BidInvoiceItemModelObj.Task_Client_UnitPrice = response[1][0];

          this.filterCall();
          this.spinner.hide();
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata .forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Task_pkeyID);
              element.ViewUrl = "/home/task/addinvoiceitems/" + btoa(encrypted);

            });
          }
          this.spinner.hide();
        }
      });
    }

  filterCall() {
    this.BidInvoiceItemViewTaskModelObj.Type = 3;
    this.xBidInvoiceItemViewTaskServices
      .ViewTaskMasterData(this.BidInvoiceItemViewTaskModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
        this.griddata .forEach(element => {
          var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Task_pkeyID);
          element.ViewUrl = "/home/task/addinvoiceitems/" + btoa(encrypted);
        });
      });
  }

  clearData() {
    this.BidInvoiceItemViewTaskModelObj.Type = 5;
    this.xBidInvoiceItemViewTaskServices
      .AddUpdateFilterAdminTaskData(this.BidInvoiceItemViewTaskModelObj)
      .subscribe(response => {

        this.BidInvoiceItemViewTaskModelObj = new BidInvoiceItemViewTaskModel();
        this.GetGridData();
      });


  }
  saveFilterData() {
    this.BidInvoiceItemViewTaskModelObj.Type = 1;
    this.xBidInvoiceItemViewTaskServices
      .AddUpdateFilterAdminTaskData(this.BidInvoiceItemViewTaskModelObj)
      .subscribe(response => {

        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }

  // this code selected event row
  showDetails(event, dataItem) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.Task_pkeyID);
    this.xRouter.navigate(["/home/task/addinvoiceitems", btoa(encrypted)]);
  }

  deleteDetails(event, dataItem) {
    //dfebugger;
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.BidInvoiceItemModelObj.Task_pkeyID = dataItem.Task_pkeyID;
      this.BidInvoiceItemModelObj.Task_IsDelete = true;
      this.BidInvoiceItemModelObj.Type = 4;
      this.xBidInvoiceItemServices
        .TaskMasterPost(this.BidInvoiceItemModelObj)
        .subscribe(response => {

          this.GetGridData();
        });
    }
  }

  // clear data
  AddNewKr() {
    this.xRouter.navigate(["/task/bidinvoiceitem", 'new']);
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
    this.button="Save";
  }

  open(content) {
    this.WKDivFlag = false;
    this.xmodalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.WKDivFlag = true;
        },
        reason => {
          this.WKDivFlag = true;
        }
      );
  }
  //kendo check box event action


  checkChange(event, dataItem) {
    //dfebugger;
    this.BidInvoiceItemModelObj.Task_pkeyID = dataItem.Task_pkeyID;
    this.BidInvoiceItemModelObj.Task_IsActive = !dataItem.Task_IsActive;
    this.BidInvoiceItemModelObj.Type = 3;

    this.xBidInvoiceItemServices
      .TaskMasterPost(this.BidInvoiceItemModelObj)
      .subscribe(response => {
        this.MessageFlag = "Task status upated...!";
        this.commonMessage();
        this.GetGridData();
      });
  }
   addNewTaskType(event) {
    if (event === 'Add Task Group') {
      this.button="Save";
      this.xmodalService.open(this.contentCateFORM, { windowClass: "lgModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
    }
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }




}
