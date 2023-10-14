import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {WorkOrderDrodownServices} from '../../../services/common-drop-down/drop-down.service'
import { BidInvoiceItemViewTaskServices } from "../../../admin/bid-invoice-task/bid-invoice-task.service";
import { TaskPresetModel } from '../../client-result/client-result-model';
import { ClientResultServices } from '../../client-result/client-result.service';
@Component({
  selector: '[task-item]',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})

export class TaskItem implements OnInit {
  @Input() workOrder;
  @Input() item: any;
  @Input() indx: number;
  @Input() errorSubmit: boolean;
  @Input() taskList: Array<any>;
  @Input() UOMList: Array<any>;
  @Input() PresetText: Array<any>;
  @Input() BidInvoiceItemViewTaskModelObj;
  @Input() type: string;
  @Output() bidTaskChange = new EventEmitter();
  @Output() removeBidTask = new EventEmitter();
  @Input() processorh: string;
  @Input() OfficeResulth: string;

  bidTaskList: Array<any>;
  properties: any;
  // processorh: boolean = false;
  // OfficeResulth: boolean = false;
  importidflag :boolean;
  decImportd:any;
  damagelst:any;
  DamageItemsList:any;
  ModelObj:any;
  defaultTaskItem: {
    Task_Name: string,
    Task_pkeyID: number
  } = { Task_Name: 'Select', Task_pkeyID: 0 };
  defaultDamageItem: {
    Import_Client_DamageItem_Name: string,
    Import_Client_DamageItem_PkeyID: number
  } = { Import_Client_DamageItem_Name: 'Causes', Import_Client_DamageItem_PkeyID: 0 };
  TaskPresetModelObj: TaskPresetModel =  new TaskPresetModel()
  constructor(
    private bidInvoiceItemViewTaskService: BidInvoiceItemViewTaskServices,
   private xWorkOrderDrodownServices:WorkOrderDrodownServices,
   private xClientResultServices:ClientResultServices,

  ) {
    //dfebugger
    // this.getdamageitemdrd();
    this.ModelObj = this.xClientResultServices.getPathParam();
    //debugger
    if (this.ModelObj != undefined) {
      if ( this.ModelObj.import_from == 4) {
        this.importidflag = false;
      }
      else{
        this.importidflag = true;
      }
    }


  }

  ngOnInit() {
    this.bidTaskList = this.taskList;
    this.properties = {
      pkeyID: `Task_${this.type}_pkeyID`,
      TaskID: `Task_${this.type}_TaskID`,
      WO_ID: `Task_${this.type}_WO_ID`,
      Qty: `Task_${this.type}_Qty`,
      Uom_ID: `Task_${this.type}_Uom_ID`,
      Cont_Price: `Task_${this.type}_Cont_Price`,
      Cont_Total: `Task_${this.type}_Cont_Total`,
      Clnt_Price: `Task_${this.type}_Clnt_Price`,
      Clnt_Total: `Task_${this.type}_Clnt_Total`,
      Comments: `Task_${this.type}_Comments`,
      Violation: `Task_${this.type}_Violation`,
      damage: `Task_${this.type}_damage`,
      IsActive: `Task_${this.type}_IsActive`,
      Task_Inv_Status: 'Task_Inv_Status',
      Other_Task_Name: this.type === 'Bid' ? 'Bid_Other_Task_Name' : 'Com_Other_Task_Name',
      Hazards: `Task_${this.type}_Hazards`
    }
    this.clinetResultQtyBid_Method();
  }

//   getdamageitemdrd(){
// this.xWorkOrderDrodownServices.DropdownDamageItems().subscribe(res =>{
//   this.damagelst = res[0];
//   this.DamageItemsList = this.damagelst;
// })
//   }
  DamageItem_Method(){

  }
  DamageItemFilter(value) {
    this.DamageItemsList
    if (value != '') {
      var filteredcustomer = this.damagelst.filter(function (el) {
        return el.Import_Client_DamageItem_Name != null;
      });
      this.DamageItemsList = filteredcustomer.filter((s) => s.Import_Client_DamageItem_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.DamageItemsList = this.damagelst.slice();
    }
  }
  changetask(item){
    this.TaskPresetModelObj.Task_Preset_ID = item.Task_pkeyID;
    this.xClientResultServices.gettaskpreset(this.TaskPresetModelObj).subscribe(res =>{
      // debugger
      this.PresetText = res[0];
    })
  }
  taskFilter(value) {
    this.bidTaskList
    if (value != '') {
      var filteredcustomer = this.taskList.filter(function (el) {
        return el.Task_Name != null;
      });
      this.bidTaskList = filteredcustomer.filter((s) => s.Task_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.bidTaskList = this.taskList.slice();
    }
  }

  clinetResultBid_Method() {
    this.BidInvoiceItemViewTaskModelObj.Task_pkeyID = this.item[this.properties.TaskID];
    this.BidInvoiceItemViewTaskModelObj.WorkOrderID = this.workOrder;
    this.bidInvoiceItemViewTaskService
      .ViewTaskMasterData(this.BidInvoiceItemViewTaskModelObj)
      .subscribe(response => {
        //debugger
        this.item[this.properties.Uom_ID] = response[0][0].Task_UOM;
        this.item[this.properties.Cont_Price] = response[2] != undefined && response[2].length > 0 ? response[2][0].Task_sett_Con_Unit_Price.toFixed(2) : response[0][0].Task_Contractor_UnitPrice.toFixed(2);
        this.item[this.properties.Clnt_Price] = response[2] != undefined && response[2].length > 0 ? response[2][0].Task_sett_CLI_Unit_Price.toFixed(2) : response[0][0].Task_Client_UnitPrice.toFixed(2);
        this.item[this.properties.Cont_Total] = response[2] != undefined && response[2].length > 0 ? response[2][0].Task_sett_Con_Unit_Price.toFixed(2) : response[0][0].Task_Contractor_UnitPrice.toFixed(2);
        this.item[this.properties.Clnt_Total] = response[2] != undefined && response[2].length > 0 ? response[2][0].Task_sett_CLI_Unit_Price.toFixed(2) : response[0][0].Task_Client_UnitPrice.toFixed(2);
        this.item.isBidPriceDisable = response[0][0].Task_Price_Edit;
        this.item.Task_Inv_Auto_Invoice = response[0][0].Task_AutoInvoiceComplete;
        this.clinetResultQtyBid_Method();
      });
  }

  backdropdown() {
    // debugger
    this.item[this.properties.TaskID] = 0;
    this.item.Task_Bid_PresetTemp = "other";
    this.item.Bid_Other_Task_Name = "";
  }

  clinetResultQtyBid_Method() {
    if (this.item[this.properties.Qty] != "") {
      this.item[this.properties.Cont_Total] = this.item[this.properties.Cont_Price] * this.item[this.properties.Qty];
      this.item[this.properties.Cont_Total] = this.item[this.properties.Cont_Total].toFixed(2);
      this.item[this.properties.Clnt_Total] = this.item[this.properties.Clnt_Price] * this.item[this.properties.Qty];
      this.item[this.properties.Clnt_Total] = this.item[this.properties.Clnt_Total].toFixed(2);
    } else {
      this.item[this.properties.Cont_Total] = this.item[this.properties.Cont_Price].toFixed(2);
      this.item[this.properties.Clnt_Total] = this.item[this.properties.Clnt_Price].toFixed(2);
    }
  }

  validate(e) {
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  clinetResultBid_Cont_Price_Method() {
    if (this.item[this.properties.Cont_Price] != "") {
      this.item[this.properties.Cont_Total] = this.item[this.properties.Cont_Price];
      if (this.item[this.properties.Qty] != "") {
        this.item[this.properties.Cont_Total] = this.item[this.properties.Cont_Price] * this.item[this.properties.Qty];
      }
    }
  }

  clinetResultBid_Clnt_Price_Method() {
    if (this.item[this.properties.Clnt_Price] != "") {
      this.item[this.properties.Clnt_Total] = this.item[this.properties.Clnt_Price];
      if (this.item[this.properties.Qty] != "") {
        this.item[this.properties.Clnt_Total] = this.item[this.properties.Clnt_Price] * this.item[this.properties.Qty];
      }
    }
  }

  clientrsultBid_PresetSET() {
    this.item[this.properties.Comments] = this.item[this.properties.Comments] + " " + this.item.Task_Bid_PresetTemp;
  }

  toggleShow() {
    
    this.item.Task_Bid_PreTextHide = !this.item.Task_Bid_PreTextHide;
   
  }

  removeClientResultBid() {
    this.removeBidTask.emit();
  }
}
