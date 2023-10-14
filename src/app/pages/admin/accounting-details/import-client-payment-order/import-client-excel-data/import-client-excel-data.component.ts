import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";



import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import  _ from 'underscore';
import { ImportClientPayment } from './import-client-payment.model';

import { ImportClientPaymentService } from '../import-client-payment.service';
import { WorOrderColumn } from 'src/app/pages/work-order/work-order-view/work-order-view-model';

@Component({
  selector: 'app-import-client-excel-data',
  templateUrl: './import-client-excel-data.component.html',
 
})
export class ImportClientExcelDataComponent implements OnInit {

  public WorOrderColumnObj: WorOrderColumn = new WorOrderColumn();
  ImportClientPaymentObj:ImportClientPayment = new ImportClientPayment();
  public griddata: any[];
  gridColumns = [];
  columns: any;
  button: string = 'Save Payment';
  isLoading: boolean;
  checkAll: boolean = false;
  MappingArray = [];
  isColumCountNotSame = false;
  isAllColumNotMapped = false;
  MessageFlag: string;
  ClientId = '';
  isHelpActive = false;
  constructor(
    
    private xImportClientPaymentService: ImportClientPaymentService,
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

    console.log('this.griddata', this.griddata)
    console.log(' this.ClientId',  this.ClientId)

    this.dropdownAPI();
  }
  workorderdata = [];
  dropdownAPI() {
    debugger
    this.xImportClientPaymentService
      .WorkorderColumnPostDatas(this.WorOrderColumnObj)
      .subscribe(Response => {
        this.workorderdata = Response[0];
        console.log('this.workorderdata',this.workorderdata)
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
    debugger;
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
  // saveImportedData() {
  //   debugger;
  //   this.isLoading = true;
  //   this.button = 'Processing';
  //   let errCnt = 0;
  //   if (this.gridColumns.length != this.workorderdata.length) {
  //     errCnt = errCnt + 1;
  //     this.isColumCountNotSame = true;
  //     this.isAllColumNotMapped = false;
  //   }
  //   else if (this.gridColumns.length != this.MappingArray.length) {
  //     errCnt = errCnt + 1;
  //     this.isAllColumNotMapped = true;
  //     this.isColumCountNotSame = false;
  //   }
  //   if (errCnt > 0) {
  //     this.MessageFlag = this.isColumCountNotSame ? 'Columns are not matched with import column..' : 'Please mapped all column..' ;
  //     this.commonMessage();
  //     this.button = 'Save';
  //     this.isLoading = false;
  //   }
  //   else{

  //     var selectedList = _.where(this.griddata, {IsChecked: true});
  //     if (selectedList.length > 0) {
  //       selectedList.forEach(selectedelement => {
  //         this.selecteWOList.push(selectedelement);
  //       });
  //     }


  //     this.MappingArray.forEach(element => {
  //       let Mapkeys = this.importWorkOrders.length > 0 ? Object.keys(this.importWorkOrders[0]) : [];
  //      if (Mapkeys.find(k => k === element.MappedKey)) return;
  //      Mapkeys.push(element.MappedKey);

  //      this.importWorkOrders = this.selecteWOList.map((item, index) => {
  //        let obj: Object = this.importWorkOrders[index] || {};
  //        obj[element.MappedKey] = item[element.ColumName];
  //        return obj;
  //      });
  //    });

  //    let postObj: any = {};
  //    let arrayOfWO = [];
  //    let keys = Object.keys(this.importWorkOrders[0]);
  //    this.importWorkOrders.forEach(item => {
  //      let workorder = new ImportClientPayment();
  //      workorder.Company = this.ClientId;
  //      keys.forEach((key) => {
  //        workorder[key] = item[key];
  //      })
  //      arrayOfWO.push(workorder)
  //    });
  //    postObj['ExcelData'] = JSON.stringify(arrayOfWO);
  //    postObj['Type'] = 1;
  //    postObj['UserId'] = 45;
  //    this.xImportClientPaymentService
  //     .ExcelWorkOrderSave(postObj)
  //      .subscribe(response => {
  //        //console.log(response);
  //        this.MessageFlag = 'Data has been imported Sucessfully..';
  //        this.commonMessage();
  //        this.button = 'Save';
  //        this.isLoading = false;
  //      })

  //   }

  // }

  // common message modal popup
  
  
  
  saveImportedData() {
    debugger;
    this.isLoading = true;
    this.button = 'Processing';
    let errCnt = 0;
    // if (this.gridColumns.length != this.workorderdata.length) {
    //   errCnt = errCnt + 1;
    //   this.isColumCountNotSame = true;
    //   this.isAllColumNotMapped = false;
    // }
    // else if (this.gridColumns.length != this.MappingArray.length) {
    //   errCnt = errCnt + 1;
    //   this.isAllColumNotMapped = true;
    //   this.isColumCountNotSame = false;
    // }
    // if (errCnt > 0) {
    //   this.MessageFlag = this.isColumCountNotSame ? 'Columns are not matched with import column..' : 'Please mapped all column..' ;
    //   this.commonMessage();
    //   this.button = 'Save';
    //   this.isLoading = false;
    // }
    // else{

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
    //  let workorder = this.ImportClientPaymentObj;
     this.importWorkOrders.forEach(item => {
      let workorder = {...this.ImportClientPaymentObj};
      //  workorder.Company = this.ClientId;
       keys.forEach((key) => {
         workorder[key] = item[key];
       })
       arrayOfWO.push(workorder)
     });
     postObj['ExcelData'] = JSON.stringify(arrayOfWO);
     postObj['Type'] = 1;
    //  postObj['UserID'] = 45;
     this.xImportClientPaymentService
      .ExcelWorkOrderSave(postObj)
       .subscribe(response => {
         console.log(response);
         this.MessageFlag = 'Data has been imported Sucessfully..';
         this.commonMessage();
         this.button = 'Save';
         this.isLoading = false;
       })

    // }

  }
  
  
  
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  DispalyInfo(event: Event, lblName)
  { 
    //debugger;   
    let isHelpActive = this.isHelpActive;
    if (this.isHelpActive) {
      event.preventDefault();
     
    }    
  }

}
