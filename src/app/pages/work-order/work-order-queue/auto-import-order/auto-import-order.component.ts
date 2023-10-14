
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { __values } from 'tslib';

import { ImportWorkOrderQueueDetailsModel } from "./order-queue-detail-model";
import { ImportWorkOrderQueueDetailServices } from "./auto-import-order.service";
import { WorkOrderQueueService } from '../work-order-queue.service';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { WorkOrderDrodownServices } from 'src/app/pages/services/common-drop-down/drop-down.service';
import { AutoImportWorkOrderService } from "src/app/pages/admin/auto-import-work-order/auto-import-work-order/auto-import-work-order.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./auto-import-order.component.html",
  styleUrls: ['./auto-import-order.component.scss']
})
export class ImportWorkOrderQueueDetailsComponent implements OnInit {

  ImportWorkOrderQueueDetailsModelObj: ImportWorkOrderQueueDetailsModel = new ImportWorkOrderQueueDetailsModel();
  griddata: any[];
  config: any;
  ClientList: any;
  isDisabled: boolean = false;
  state: State = {};
  ImportFromList:any;
  MessageFlag: string;
  ClientListdata: any;
  ImportFromListdata: any;
  ImportNameListdata: any;
  isHelpActive = false;
  Importname:any;
  public defaultItem: { Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name: 'Select', Client_pkeyID: 0 };
  public defaultimportItem: { Import_Form_Name: string, Import_Form_PkeyId: number } = { Import_Form_Name: 'Select', Import_Form_PkeyId: 0 };
  public defaultItemdetail: { WI_FriendlyName: string, WI_Pkey_ID: number } = { WI_FriendlyName: 'Select', WI_Pkey_ID: 0 };

  constructor(
    private xRouter: Router,
    private modalService: NgbModal,
    private xImportWorkOrderQueueDetailServices: ImportWorkOrderQueueDetailServices,
    private workOrderQueueService: WorkOrderQueueService,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xAutoImportWorkOrderService:AutoImportWorkOrderService,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.GetGridData();
    this.GetDropDowndata();
  }

  ngOnInit() {
    this.config = {
      itemsPerPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString()),
      currentPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString()),
      totalItems: 0
    };
  }

  showDetails(event, dataItem) {
    // debugger
    this.workOrderQueueService.saveDataItem(dataItem);
    this.xRouter.navigate(["workorder/queueworkorder/importworkorderqueue"]);
  }



  //get grid
  GetGridData() {
    debugger
    this.ImportWorkOrderQueueDetailsModelObj.PageNumber = parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString());
    this.ImportWorkOrderQueueDetailsModelObj.NoofRows = parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString());
    this.xImportWorkOrderQueueDetailServices
      .WorkOrderimportQueueData(this.ImportWorkOrderQueueDetailsModelObj)
      .subscribe(response => {
        //console.log('mo',response);
        //debugger;
        this.griddata = response[0];
        this.config = {
          itemsPerPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString()),
          currentPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString()),
          totalItems: parseInt(response[1])
        };
        this.spinner.hide();
      });
  }

  //Delete queue
  DeleteQueued(item) {
    let Cnfm = confirm("Are you sure you want to remove this record..?");
    if (Cnfm) {
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_PkeyId = item.Imrt_PkeyId;
      this.ImportWorkOrderQueueDetailsModelObj.Type = 4;

      this.xImportWorkOrderQueueDetailServices
        .DeleteWorkOrderimportQueueData(this.ImportWorkOrderQueueDetailsModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }

  
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  
  CkeckNowData(item,idx) {
    // debugger;
    if (item.Imrt_Import_From_ID == 1 ) {
      this.MessageFlag = "PPW work order import started...!";
      this.commonMessage();
      
      this.griddata.forEach(element => {
        element.Imrt_NewOrderCheck = element.Imrt_Import_From_ID == 1 ? true : element.Imrt_NewOrderCheck;
        element.Imrt_Wo_Count = element.Imrt_IPL_CompanyId == item.Imrt_IPL_CompanyId ? 0 : element.Imrt_Wo_Count;
      });

      setTimeout(()=>{
        this.MessageFlag = "PPW work order import completed...!";
        this.commonMessage();
        this.GetGridData();
      },900000 ); // for 2 minutes = 120000, for 15 iminutes = 900000

      this.ImportWorkOrderQueueDetailsModelObj.Imrt_PkeyId = item.Imrt_PkeyId;
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_Import_ID = item.Imrt_Wo_Import_ID;
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_Import_From_ID = item.Imrt_Import_From_ID;
      this.ImportWorkOrderQueueDetailsModelObj.Type = 5;
      this.xImportWorkOrderQueueDetailServices
        .CheckNowWorkOrderimportQueueData(this.ImportWorkOrderQueueDetailsModelObj)
        .subscribe(response => {
          this.GetGridData();
        });

    }
    else{
      this.griddata[idx].Imrt_NewOrderCheck = true;
      this.griddata[idx].Imrt_Wo_Count = 0;
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_PkeyId = item.Imrt_PkeyId;
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_Wo_Import_ID = item.Imrt_Wo_Import_ID;
      this.ImportWorkOrderQueueDetailsModelObj.Imrt_Import_From_ID = item.Imrt_Import_From_ID;
      this.ImportWorkOrderQueueDetailsModelObj.Type = 5;
      this.xImportWorkOrderQueueDetailServices
        .CheckNowWorkOrderimportQueueData(this.ImportWorkOrderQueueDetailsModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  redirectAdd() {
    this.xImportWorkOrderQueueDetailServices.saveDataItem('auto');
    this.xRouter.navigate(['home/autoimport/autoimportwo/new']);
  }

  redirectview() {
    this.xRouter.navigate(["/home/autoimport/viewautoimport"]);
  }

  onPageChange(event) {
    //console.log(event);
    this.config.currentPage = event;
    this.ImportWorkOrderQueueDetailsModelObj.PageNumber = parseInt(event.toString());
    this.GetGridData();
  }

  PageChange() {
    this.ImportWorkOrderQueueDetailsModelObj.PageNumber = 1;
    this.GetGridData();
  }
 
  GetDropDowndata() {

    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder()
      .subscribe(response => {
      
        if (response.length != 0) {
          //console.log('check',response)
          this.ClientList = response[18];
         this.ClientListdata =  this.ClientList;
          this.ImportFromList = response[12];
          this.ImportFromListdata =  this.ImportFromList;
         
        
          // //console.log('arr',this.Importname);
         this.Importname = response[19];
          this.ImportNameListdata =  this.Importname;
        }
      });
  }
  selectChangeHandler(item){
    //console.log(item)
    this.ImportWorkOrderQueueDetailsModelObj.WI_FriendlyName = 'Select';
    this.ImportWorkOrderQueueDetailsModelObj.ClentId = 0;
    this.ImportWorkOrderQueueDetailsModelObj.WI_ImportFrom = item;
    this.xImportWorkOrderQueueDetailServices
    .ChangeImportClient(this.ImportWorkOrderQueueDetailsModelObj)
      .subscribe(res =>{
        //console.log('client',res);
        this.ClientList = res[0];
        this.ClientListdata =  this.ClientList;
        this.Importname = res[1];
        this.ImportNameListdata =  this.Importname;
      })
  }
  ClientListFilter(value) {
    //debugger;
      if (value!='') {
        var filteredcustomer = this.ClientList.filter(function (el) {
          return el.Client_Company_Name != null;
        });
        this.ClientListdata = filteredcustomer.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
     else{
      this.ClientListdata = this.ClientList.slice();
     }
    }
    ImportListFilter(value) {
      //debugger;
        if (value!='') {
          var filteredcustomer = this.ImportFromList.filter(function (el) {
            return el.Import_Form_Name != null;
          });
          this.ImportFromListdata = filteredcustomer.filter((s) => s.Import_Form_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        }
       else{
        this.ImportFromListdata = this.ImportFromList.slice();
       }
      }

      ImportdataListFilter(value) {
        //debugger;
          if (value!='') {
            var filteredcustomer = this.Importname.filter(function (el) {
              return el.WI_FriendlyName != null;
            });
            this.ImportNameListdata = filteredcustomer.filter((s) => s.WI_FriendlyName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          }
         else{
          this.ImportNameListdata = this.Importname.slice();
         }
        }
  
        selectChangename(item){
          //console.log('check',item)
        }

  FilterDetails() {
    //debugger
    if ( this.ImportWorkOrderQueueDetailsModelObj.WI_FriendlyName == 'Select') {
      this.ImportWorkOrderQueueDetailsModelObj.WI_FriendlyName = '';
    }
    this.ImportWorkOrderQueueDetailsModelObj.WI_ImportFrom =  this.ImportWorkOrderQueueDetailsModelObj.WI_ImportFrom;
    this.ImportWorkOrderQueueDetailsModelObj.PageNumber = parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString());
    this.ImportWorkOrderQueueDetailsModelObj.NoofRows = parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString());
    this.xImportWorkOrderQueueDetailServices
      .WorkOrderimportQueueData(this.ImportWorkOrderQueueDetailsModelObj)
      .subscribe(response => {
        this.griddata = response[0];
        this.config = {
          itemsPerPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.NoofRows.toString()),
          currentPage: parseInt(this.ImportWorkOrderQueueDetailsModelObj.PageNumber.toString()),
          totalItems: parseInt(response[1])
        };
      });
  }

  Reset() {
    this.ImportWorkOrderQueueDetailsModelObj.WI_ImportFrom = 0;
    this.ImportWorkOrderQueueDetailsModelObj.ClentId = 0;
    this.ImportWorkOrderQueueDetailsModelObj.WI_FriendlyName = '';
    this.FilterDetails();
  }

 
  skip: number = 0;
  pageChange(event) {
    this.skip = event.skip;
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
