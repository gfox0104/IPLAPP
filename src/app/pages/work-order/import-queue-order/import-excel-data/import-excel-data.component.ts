import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SaveWorkOrderViewServices } from "../../work-order-view/work-order-view-service";
import { WorOrderColumn } from "../../work-order-view/work-order-view-model";
import { ImportWorkOrder } from './import-work-order.model';
import { ImportQueueServices } from '../import-queue-order.service';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import  _ from 'underscore';

@Component({
  selector: 'app-import-excel-data',
  templateUrl: './import-excel-data.component.html'
})
export class ImportExcelDataComponent implements OnInit {
  public WorOrderColumnObj: WorOrderColumn = new WorOrderColumn();
  public griddata: any[];
  gridColumns = [];
  columns: any;
  button: string = 'Save';
  isLoading: boolean;
  checkAll: boolean = false;
  MappingArray = [];
  isColumCountNotSame = false;
  isAllColumNotMapped = false;
  MessageFlag: string;
  ClientId = '';
  constructor(
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
    private importQueueService: ImportQueueServices,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    //debugger;
    this.griddata = JSON.parse(localStorage.getItem("ExcelData"));
    this.ClientId = localStorage.getItem("ExcelClientId");
    this.gridColumns = Object.keys(this.griddata[0]);
    this.gridColumns = this.gridColumns.map(item => {
      return {
        field: item
      }
    });
    this.griddata.forEach(element => {
      element["IsChecked"] = true;
    });

    this.dropdownAPI();
  }
  workorderdata = [];
  dropdownAPI() {
    this.xSaveWorkOrderViewServices
      .WorkorderColumnPostDatas(this.WorOrderColumnObj)
      .subscribe(Response => {
        this.workorderdata = Response[0];
      });
  }

  ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  importWorkOrders = [];
  onSelectChange(event, columnField) {
    //debugger;
    const key = this.workorderdata.find(item => item.Wo_Column_Name.trim() === event.target.value).Keydata;
    let mapdata = {
      ColumName: columnField,
      MappedKey:key
    }
    if (this.MappingArray.length > 0 ) {
      var IsExists = _.findIndex(this.MappingArray, {ColumName: columnField});
      if (IsExists != -1) {
        this.MappingArray.splice(IsExists, 1);
      }
    }
    this.MappingArray.push(mapdata);



  }
  setPonticType(data) {

  }

  checkRowAll() {
    this.checkAll = !this.checkAll;
    this.griddata.forEach(item => item.IsChecked = this.checkAll ? true : false);
  }

  checkRow(rowIndex) {
    var value = this.griddata[rowIndex];
    //console.log(value);
  }

  selecteWOList = [];
  saveImportedData() {
    //debugger;
    this.isLoading = true;
    this.button = 'Processing';
    let errCnt = 0;
    if (this.gridColumns.length != this.workorderdata.length) {
      errCnt = errCnt + 1;
      this.isColumCountNotSame = true;
      this.isAllColumNotMapped = false;
    }
    else if (this.gridColumns.length != this.MappingArray.length) {
      errCnt = errCnt + 1;
      this.isAllColumNotMapped = true;
      this.isColumCountNotSame = false;
    }
    if (errCnt > 0) {
      this.MessageFlag = this.isColumCountNotSame ? 'Columns are not matched with import column..' : 'Please mapped all column..' ;
      this.commonMessage();
      this.button = 'Save';
      this.isLoading = false;
    }
    else{

      var selectedList = _.where(this.griddata, {IsChecked: true});
      if (selectedList.length > 0) {
        selectedList.forEach(selectedelement => {
          this.selecteWOList.push(selectedelement);
        });
      }


      this.MappingArray.forEach(element => {
        let Mapkeys = this.importWorkOrders.length > 0 ? Object.keys(this.importWorkOrders[0]) : [];
       if (Mapkeys.find(k => k === element.MappedKey)) return;
       Mapkeys.push(element.MappedKey);

       this.importWorkOrders = this.selecteWOList.map((item, index) => {
         let obj: Object = this.importWorkOrders[index] || {};
         obj[element.MappedKey] = item[element.ColumName];
         return obj;
       });
     });

     let postObj: any = {};
     let arrayOfWO = [];
     let keys = Object.keys(this.importWorkOrders[0]);
     this.importWorkOrders.forEach(item => {
       let workorder = new ImportWorkOrder();
       workorder.Company = this.ClientId;
       keys.forEach((key) => {
         workorder[key] = item[key];
       })
       arrayOfWO.push(workorder)
     });
     postObj['ExcelData'] = JSON.stringify(arrayOfWO);
     postObj['Type'] = 1;
     postObj['UserId'] = 45;
     this.importQueueService.ExcelWorkOrderSave(postObj)
       .subscribe(response => {
         //console.log(response);
         this.MessageFlag = 'Data has been imported Sucessfully..';
         this.commonMessage();
         this.button = 'Save';
         this.isLoading = false;
       })

    }

  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
}
