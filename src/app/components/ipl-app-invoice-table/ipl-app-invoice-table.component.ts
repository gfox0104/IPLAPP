import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DropdownModel } from 'src/app/pages/models/dropdown-model';
import { ActivatedRoute } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ClientResultsInvoiceModel, Invoice_ClientDTO, Invoice_ContractorDTO } from 'src/app/pages/client-result/client-results-invoice/client-results-invoice-model';
import { BidInvoiceItemViewTaskModel } from 'src/app/pages/admin/bid-invoice-task/bid-invoice-task-model';
import { BidInvoiceItemViewTaskServices } from 'src/app/pages/admin/bid-invoice-task/bid-invoice-task.service';
import { ClientResultsInvoiceServices } from 'src/app/pages/client-result/client-results-invoice/client-results-invoice.service';

@Component({
  selector: 'app-ipl-app-invoice-table',
  templateUrl: './ipl-app-invoice-table.component.html',
  styleUrls: ['./ipl-app-invoice-table.component.scss']
})
export class IplAppInvoiceTableComponent implements OnInit {

  @Input() title;
  @Input() contrOrclient: String;
  @Input() isContractor: boolean;
  @Input() invoiceArray;
  @Input() Invoice_ClientDTOObj: Invoice_ClientDTO;
  @Input() Invoice_ContractorDTOObj: Invoice_ContractorDTO;
  @Input() TaskList;
  @Input() ClientResultsInvoiceModelObj: ClientResultsInvoiceModel;
  @Input() isContractInValid: boolean;
  @Input() isClientInValid: boolean;
  @Input() WorkOrderID_mul: string;
  @Input() IsMultipleFunctionality: boolean;

  @Output() copyItem = new EventEmitter();
  @Output() addItem = new EventEmitter();
  istxt: boolean = false;
  formUsrCommonGroup: UntypedFormGroup;
  BidInvoiceItemViewTaskModelObj: BidInvoiceItemViewTaskModel = new BidInvoiceItemViewTaskModel();
  invdate: boolean = true;
  DropdownModelObj: DropdownModel = new DropdownModel();
  public drptaskList: Array<string>;
  public defaultTaskItem: { Task_Name: string, Task_pkeyID: number } = { Task_Name: 'Select', Task_pkeyID: 0 };
  keys;
  constructor(
    private xBidInvoiceItemViewTaskServices: BidInvoiceItemViewTaskServices,
    private xClientResultsInvoiceServices: ClientResultsInvoiceServices,
    private formBuilder: UntypedFormBuilder,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
  ) {
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({Taskval: ["", Validators.required]});
    this.DropdownModelObj.WorkOrderID_mul = this.WorkOrderID_mul;
    this.DropdownModelObj.Type=2;
    this.xClientResultsInvoiceServices
      .DropdownGetClientResult(this.DropdownModelObj)
      .subscribe(response => {
        this.TaskList = response[0];
        var data = {Task_pkeyID: -99,Task_Name: "Custom"}
        this.TaskList.push(data);
        this.drptaskList = this.TaskList;
    });

    this.drptaskList = this.TaskList;

    this.keys = this.isContractor ?
      {
        taskId: 'Inv_Con_Ch_TaskId',
        qty: 'Inv_Con_Ch_Qty',
        price: 'Inv_Con_Ch_Price',
        total: 'Inv_Con_Ch_Total',
        adjPrice: 'Inv_Con_Ch_Adj_Price',
        discount: 'Inv_Con_Ch_Discount',
        adjTotal: 'Inv_Con_Ch_Adj_Total',
        comment: 'Inv_Con_Ch_Comment',
        flatFee: 'Inv_Con_Ch_Flate_fee',
        Other_Task_Name: 'Inv_Con_Ch_Other_Task_Name'
      } :
      {
        taskId: 'Inv_Client_Ch_Task_Id',
        qty: 'Inv_Client_Ch_Qty',
        price: 'Inv_Client_Ch_Price',
        total: 'Inv_Client_Ch_Total',
        adjPrice: 'Inv_Client_Ch_Adj_Price',
        discount: 'Inv_Client_Ch_Discount',
        adjTotal: 'Inv_Client_Ch_Adj_Total',
        comment: 'Inv_Client_Ch_Comment',
        flatFee: 'Inv_Client_Ch_Flate_Fee',
        Other_Task_Name: 'Inv_Client_Ch_Other_Task_Name'
      }
    this.drptaskList = this.TaskList;
    // console.log("keys", this.keys)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.BindTaskList();
    if(changes['invoiceArray']!=undefined && changes['invoiceArray'].currentValue!=undefined)
    {
      this.invoiceArray = changes['invoiceArray'].currentValue;
    }
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9 ()-]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  InvoiceValFlag = false;
  onChange(invoice) {
    // console.log(invoice);
    this.InvoiceValFlag = false;
    if (this.isContractor) {
      this.ClientResultCompletionInvoicePage(invoice);
    } else {
      this.ClientResultCompletionInvoicePageClinet(invoice);
    }
  }

  onQtyChange() {
    if (this.isContractor) {
      this.CommonCalculatorContractor();
    } else {
      this.CommonCalculatorClient();
    }
  }

  onPriceChange() {
    if (this.isContractor) {
      this.CommonCalculatorContractor();
    } else {
      this.CommonCalculatorClient();
    }
  }

  onAdjPriceChange() {
    if (this.isContractor) {
      this.CommonCalculatorContractor();
    } else {
      this.CommonCalculatorClient();
    }
  }

  onFlatChange() {
    if (this.isContractor) {
      for (let i = 0; i < this.invoiceArray.length; i++) {
        if (this.invoiceArray[i].Inv_Con_Ch_Flate_fee) {
          this.invoiceArray[i].Inv_Con_Ch_Discount = 0;
        }
      }

      this.CommonCalculatorContractor();
    } else {
      for (let i = 0; i < this.invoiceArray.length; i++) {
        if (this.invoiceArray[i].Inv_Client_Ch_Flate_Fee) {
          this.invoiceArray[i].Inv_Client_Ch_Discount = 0;
        }
      }
      this.CommonCalculatorClient();
    }
  }

  onDiscountChange() {
    if (this.isContractor) {
      this.CommonCalculatorContractor();
    } else {
      this.CommonCalculatorClient();
    }
  }

  ClientResultCompletionInvoicePage(INVOICE) {
    this.BidInvoiceItemViewTaskModelObj.Task_pkeyID = INVOICE.Inv_Con_Ch_TaskId;


    if (INVOICE.Inv_Con_Ch_TaskId != -99) {
      this.xBidInvoiceItemViewTaskServices
        .ViewTaskMasterData(this.BidInvoiceItemViewTaskModelObj)
        .subscribe(response => {


          let task_pkey_id = this.BidInvoiceItemViewTaskModelObj.Task_pkeyID;
          for (let i = 0; i < this.invoiceArray.length; i++) {
            let element = this.invoiceArray[i].Inv_Con_Ch_TaskId;
            if (task_pkey_id == element) {


              this.invoiceArray[i].Inv_Con_Ch_Qty = 1;
              this.invoiceArray[i].Inv_Con_Ch_Price = response[0][0].Task_Contractor_UnitPrice.toFixed(2);
              this.invoiceArray[i].Inv_Con_Ch_Total = response[0][0].Task_Contractor_UnitPrice.toFixed(2);
              this.invoiceArray[i].Inv_Con_Ch_Adj_Total = response[0][0].Task_Contractor_UnitPrice.toFixed(2);
            }
          }
          this.CommonCalculatorContractor();
        });
    }


  }

  ClientResultCompletionInvoicePageClinet(InvoiceClint) {

    this.BidInvoiceItemViewTaskModelObj.Task_pkeyID = InvoiceClint.Inv_Client_Ch_Task_Id;

    if (InvoiceClint.Inv_Client_Ch_Task_Id != -99) {
      this.xBidInvoiceItemViewTaskServices
        .ViewTaskMasterData(this.BidInvoiceItemViewTaskModelObj)
        .subscribe(response => {

          let task_pkey_id = this.BidInvoiceItemViewTaskModelObj.Task_pkeyID;
          for (let i = 0; i < this.invoiceArray.length; i++) {
            let element = this.invoiceArray[i].Inv_Client_Ch_Task_Id;
            if (task_pkey_id == element) {
              this.invoiceArray[i].Inv_Client_Ch_Price = response[0][0].Task_Client_UnitPrice.toFixed(2);
              this.invoiceArray[i].Inv_Client_Ch_Total = response[0][0].Task_Client_UnitPrice.toFixed(2);
            }
          }

          this.CommonCalculatorClient();
        });
    }

  }

  CommonCalculatorClient() {
    if (this.invoiceArray.length != 0) {
      for (let i = 0; i < this.invoiceArray.length; i++) {
        if (this.invoiceArray[i].Inv_Client_Ch_Qty != "") {
          this.invoiceArray[i].Inv_Client_Ch_Total = (this.invoiceArray[i].Inv_Client_Ch_Price * this.invoiceArray[i].Inv_Client_Ch_Qty).toFixed(2);
        } else {
          this.invoiceArray[i].Inv_Client_Ch_Qty = 1;
          this.invoiceArray[i].Inv_Client_Ch_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Price).toFixed(2);
        }

        if (this.invoiceArray[i].Inv_Client_Ch_Price != "") {
          this.invoiceArray[i].Inv_Client_Ch_Total = (this.invoiceArray[i].Inv_Client_Ch_Price *
            this.invoiceArray[i].Inv_Client_Ch_Qty).toFixed(2);
        } else {
          this.invoiceArray[i].Inv_Client_Ch_Price = 0;
        }

        if (this.invoiceArray[i].Inv_Client_Ch_Adj_Price != "") {
          let adjPrice = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Price);
          if(adjPrice == 0)
          {
            this.invoiceArray[i].Inv_Client_Ch_Adj_Total = (parseFloat("0")).toFixed(2);
          }

          else if (adjPrice > 0) {
            this.invoiceArray[i].Inv_Client_Ch_Adj_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Price).toFixed(2);
          }
          else {
            this.invoiceArray[i].Inv_Client_Ch_Adj_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Total).toFixed(2);
          }


          this.invoiceArray[i].Inv_Client_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Total) +
            parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Price);

        } else {
          this.invoiceArray[i].Inv_Client_Ch_Adj_Price = 0;
          this.invoiceArray[i].Inv_Client_Ch_Adj_Total = (parseFloat(this.invoiceArray[i].Inv_Client_Ch_Total) + 0).toFixed(2);
          this.invoiceArray[i].Inv_Client_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Total) + 0;
        }

        if (this.invoiceArray[i].Inv_Client_Ch_Discount != "") {
          this.invoiceArray[i].Inv_Client_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Total) +
            parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Price);
          this.invoiceArray[i].Inv_Client_Ch_Adj_Total = (this.invoiceArray[i].Inv_Client_Ch_Temp_Total - (this.invoiceArray[i].Inv_Client_Ch_Temp_Total * this.invoiceArray[i].Inv_Client_Ch_Discount) / 100).toFixed(2);
          this.CommonSubTotalClient();
        } else {
          this.invoiceArray[i].Inv_Client_Ch_Discount = 0;
          this.invoiceArray[i].Inv_Client_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Total) +
            parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Price);

          let adjPrice = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Price);
          if (adjPrice > 0) {
            this.invoiceArray[i].Inv_Client_Ch_Adj_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Price).toFixed(2);
          }
          else {
            this.invoiceArray[i].Inv_Client_Ch_Adj_Total = parseFloat(this.invoiceArray[i].Inv_Client_Ch_Total).toFixed(2);
          }
          this.CommonSubTotalClient();
        }
      }
    }
    else {
      this.CommonSubTotalClient();
    }

  }

  ClientResultContractorFlatFree() {
    for (let i = 0; i < this.invoiceArray.length; i++) {
      if (this.invoiceArray[i].Inv_Con_Ch_Flate_fee) {
        this.invoiceArray[i].Inv_Con_Ch_Discount = 0;
      }
    }

    this.CommonCalculatorContractor();
  }

  subTotal

  CommonSubTotalClient() {
    var countxx = 0;
    if (this.invoiceArray.length != 0) {
      for (let i = 0; i < this.invoiceArray.length; i++) {
        countxx = countxx + parseFloat(this.invoiceArray[i].Inv_Client_Ch_Adj_Total);
      }

      this.Invoice_ClientDTOObj.Inv_Client_Sub_Total = parseFloat(countxx.toFixed(2));
      this.subTotal = this.Invoice_ClientDTOObj.Inv_Client_Sub_Total;
    }
    else {
      this.Invoice_ClientDTOObj.Inv_Client_Sub_Total = parseFloat(countxx.toFixed(2));
      this.subTotal = this.Invoice_ClientDTOObj.Inv_Client_Sub_Total;
    }

  }

  CommonCalculatorContractor() {
    if (this.invoiceArray.length != 0) {
      for (let i = 0; i < this.invoiceArray.length; i++) {
        if (this.invoiceArray[i].Inv_Con_Ch_Qty != "") {
          this.invoiceArray[i].Inv_Con_Ch_Total = (this.invoiceArray[i].Inv_Con_Ch_Price * this.invoiceArray[i].Inv_Con_Ch_Qty).toFixed(2);
        } else {
          this.invoiceArray[i].Inv_Con_Ch_Qty = 1;
          this.invoiceArray[i].Inv_Con_Ch_Total = (this.invoiceArray[i].Inv_Con_Ch_Price).toFixed(2);
        }
        if (this.invoiceArray[i].Inv_Con_Ch_Price != "") {
          this.invoiceArray[i].Inv_Con_Ch_Total = (this.invoiceArray[i].Inv_Con_Ch_Price *
            this.invoiceArray[i].Inv_Con_Ch_Qty).toFixed(2);
        } else {
          this.invoiceArray[i].Inv_Con_Ch_Price = 0;
        }
        if (this.invoiceArray[i].Inv_Con_Ch_Adj_Price != "") {
          let adjPrice = parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Price);
          if(adjPrice == 0)
          {
            this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (parseFloat("0")).toFixed(2);
          }

         else if (adjPrice > 0) {
            this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Price)).toFixed(2);
          }
          else
          {
            this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (parseFloat(this.invoiceArray[i].Inv_Con_Ch_Total)).toFixed(2);
          }


          this.invoiceArray[i].Inv_Con_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Con_Ch_Total) +
            parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Price);
          this.CommonSubTotalContractar()

        } else {
          this.invoiceArray[i].Inv_Con_Ch_Adj_Price = 0;
          this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (parseFloat(this.invoiceArray[i].Inv_Con_Ch_Total) + 0).toFixed(2);
          this.invoiceArray[i].Inv_Con_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Con_Ch_Total) + 0;
          this.CommonSubTotalContractar()
        }

        if (this.invoiceArray[i].Inv_Con_Ch_Discount != "") {
          this.invoiceArray[i].Inv_Con_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Con_Ch_Total) +
            parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Price);
          this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (this.invoiceArray[i].Inv_Con_Ch_Temp_Total - (this.invoiceArray[i].Inv_Con_Ch_Temp_Total * this.invoiceArray[i].Inv_Con_Ch_Discount) / 100).toFixed(2);
          this.CommonSubTotalContractar();
        } else {
          this.invoiceArray[i].Inv_Con_Ch_Discount = 0;
          this.invoiceArray[i].Inv_Con_Ch_Temp_Total = parseFloat(this.invoiceArray[i].Inv_Con_Ch_Total) +
            parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Price);

          let adjPrice = parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Price);
          if(adjPrice == 0)
          {
            this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (parseFloat("0")).toFixed(2);
          }
          else if (adjPrice > 0) {
            this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Price)).toFixed(2);
          }
          else {
            this.invoiceArray[i].Inv_Con_Ch_Adj_Total = (parseFloat(this.invoiceArray[i].Inv_Con_Ch_Total)).toFixed(2);
          }

          this.CommonSubTotalContractar();
        }
      }
    }
    else {

      this.CommonSubTotalContractar();
    }

  }

  CommonSubTotalContractar() {
    var countxx = 0;
    if (this.invoiceArray.length != 0) {
      for (let i = 0; i < this.invoiceArray.length; i++) {
        var twoPlacedFloat = parseFloat(this.invoiceArray[i].Inv_Con_Ch_Adj_Total);
        countxx = countxx + twoPlacedFloat;
      }
      this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total = parseFloat(countxx.toFixed(2));
    }
    else {
      this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total = parseFloat(countxx.toFixed(2));
    }
  }

  conctRemoveArr = [];

  onRemoveItem(index: any, Items: any) {
    if (this.isContractor) {
      this.clientresultinvoiceContractorRemove(index, Items);
    } else {
      this.clientresultinvoiceRemoveClient(index, Items)
    }
  }

  onCopyItem(item) {
    if (item[this.keys.taskId] === 0) return;
    this.copyItem.emit(item);
  }

  clientresultinvoiceContractorRemove(index: any, Items: any): void {
    let comf = confirm('Are you Sure you want to  Delete this Record');
    if (comf) {
      this.invoiceArray.splice(index, 1);

      if(!this.IsMultipleFunctionality)
      {
        this.CommonCalculatorContractor();
        this.conctRemoveArr.push(Items);
        this.Invoice_ContractorDTOObj.ContractorInvoiceArrayVal = this.conctRemoveArr;
        this.Invoice_ContractorDTOObj.Inv_Con_Wo_ID = this.ClientResultsInvoiceModelObj.workOrder_ID;
        this.Invoice_ContractorDTOObj.Type = 4;

        this.xClientResultsInvoiceServices
          .ContractorInvoiceDataPOST(this.Invoice_ContractorDTOObj)
          .subscribe(response => {
            this.Invoice_ContractorDTOObj.Type = 1;
            this.conctRemoveArr = [];
          });
      }
    }
  }

  ClientRemoveArry = [];
  clientresultinvoiceRemoveClient(index: any, Items: any): void {
    let comf = confirm('Are you Sure you want to  Delete this Record');
    if (comf) {
      this.invoiceArray.splice(index, 1);
      if(!this.IsMultipleFunctionality)
      {
        this.CommonCalculatorClient();
        this.ClientRemoveArry.push(Items);
        this.Invoice_ClientDTOObj.ClientInvoiceArrayVal = this.ClientRemoveArry;
        this.Invoice_ClientDTOObj.Inv_Client_WO_Id = this.ClientResultsInvoiceModelObj.workOrder_ID;
        this.Invoice_ClientDTOObj.Type = 4;

        this.xClientResultsInvoiceServices
          .ClientInvoiceDataPOST(this.Invoice_ClientDTOObj)
          .subscribe(response => {
            this.ClientRemoveArry = [];
            this.Invoice_ClientDTOObj.Type = 1;
          });
      }
    }
  }

  Group_Method() {

  }
  ApproveData(val) {
    this.Invoice_ContractorDTOObj.Inv_Con_Inv_Followup = false;
    this.Invoice_ContractorDTOObj.Inv_Con_Inv_Hold_Date = '';
    this.Invoice_ContractorDTOObj.Inv_Con_Inv_Approve_Date = new Date().toLocaleDateString();
  }
  InvoiceData(val) {
    this.Invoice_ContractorDTOObj.Inv_Con_Inv_Approve = false;
    this.Invoice_ContractorDTOObj.Inv_Con_Inv_Approve_Date = '';
    this.Invoice_ContractorDTOObj.Inv_Con_Inv_Hold_Date = new Date().toLocaleDateString();
  }
  taskFilter(value) {
    if (value != '') {
      this.drptaskList = this.TaskList.filter((s) => s.Task_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drptaskList = this.TaskList.slice();
    }
  }
  backdropdown(item) {
    item[this.keys.taskId] = 0;
    item.Other_Task_Name = "";
    // console.log(item)
  }
  BindTaskList() {
    this.DropdownModelObj.WorkOrderID_mul = this.WorkOrderID_mul;
    this.DropdownModelObj.Type=2
    this.xClientResultsInvoiceServices
      .DropdownGetClientResult(this.DropdownModelObj)
      .subscribe(response => {
        this.TaskList = response[0];
        var data = {Task_pkeyID: -99,Task_Name: "Custom"}
        this.TaskList.push(data);
        this.drptaskList = this.TaskList;
      });
  }
  UpdateItemAndReturn(item,type){
    if(this.TaskList!=undefined)
    {
      // if(type=="contractor")
      // {
      //   var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Inv_Con_Ch_TaskId);
      //   item.Inv_Con_Price_Disable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Disable_Default;
      //   return getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Disable_Default;
      // }

      if(type=="contractor")
      {
        var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Inv_Con_Ch_TaskId);
        item.Inv_Con_Price_Disable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Price_Edit;
        return getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Price_Edit;
      }
      // if(type=="client")
      // {
      //   var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Inv_Client_Ch_Task_Id);
      //   item.Inv_Client_Price_Disable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Disable_Default;
      //   return getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Disable_Default;
      // }

      if(type=="client")
      {
        var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Inv_Client_Ch_Task_Id);
        item.Inv_Client_Price_Disable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Price_Edit;
        return getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Price_Edit;
      }
    }
  }
  getTotal() {
    if (this.isContractor) {
      if (this.Invoice_ContractorDTOObj != undefined && this.Invoice_ContractorDTOObj && this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != undefined && this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != null) {
        return this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total;
      }
      else{
        return 0;
      }
    }
    else{
      if (this.Invoice_ClientDTOObj != undefined && this.Invoice_ClientDTOObj && this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != undefined && this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != null) {
        return this.Invoice_ClientDTOObj.Inv_Client_Sub_Total;
      }
      else{
        return 0;
      }
    }
  }
}
