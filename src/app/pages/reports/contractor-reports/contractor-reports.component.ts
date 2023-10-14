import { Component } from '@angular/core';
import { from } from 'rxjs';
import { PaidInvoice } from './paid';
import { PendingInvoice } from './pending';
import { ContractorReportsService } from './contractor-reports.service';
import { ContractorReportsModel } from './contractor-reports.model';
import { Columns } from './constants/columns';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { WorkOrderDrodownServices } from '../../services/common-drop-down/drop-down.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { saveAs } from '@progress/kendo-file-saver';
import { Workbook } from '@progress/kendo-angular-excel-export';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { Observable, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'my-app',
  templateUrl: './contractor-reports.component.html',
  styles: [`
        kendo-tabstrip p {
            margin: 0;
            padding: 8px;
        }

    `]
})
export class ContractorReportsComponent {
  ContractorReportsModelObj: ContractorReportsModel = new ContractorReportsModel();

  public paidInvoice: any[] = PaidInvoice;
  pendingInvoice: any;
  pendingInvoice_all: any;
  isToSelect = false;
  isFromSelect = false;
  formArrayVal: any[];
  public onTabSelect(e) {
    this.showSpinner();
    //console.log(e);
  }
  columns = Columns;
  DateStripArr: any[];
  PendingHold_all: any;
  PendingHold: any;
  completeinv_all: any;
  completeinv: any;
  config: any;
  formUsrCommonGroup: UntypedFormGroup;
  disablePaidCon = false;
  disablePendingCon = false;
  paidSearch = "Search";
  pendingSearch = "Search";
  ispaidLoading = false;
  ispendingLoading = false;
  MessageFlag: string;
  public state: State = {
    skip: 0,
    take: 15,
    group: []
  };
  isHelpActive = false;
  currencySymbol=environment.currencySymbol;

  invoiceTotalSum_Due=0
  amountPaidSum_Due=0

  invoiceTotalSum_Done=0
  amountPaidSum_Done=0

  invoiceTotalSum_Hold=0
  amountPaidSum_Hold=0

  invoiceTotalSum_Paid=0
  amountPaidSum_Paid=0

  constructor(
    private xContractorReportsService: ContractorReportsService,
    private EncrDecr: EncrDecrService, private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,) {
    var fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);

    this.ContractorReportsModelObj.FromDatePaidInvoice = this.getFormattedDate(fromDate);//new Date().toLocaleDateString();
    this.ContractorReportsModelObj.ToDateDatePaidInvoice = this.getFormattedDate(new Date());//new Date().toLocaleDateString();



    this.ContractorReportsModelObj.From_InvoiceDate = this.getFormattedDate(fromDate);// fromDate.toLocaleDateString();
    this.ContractorReportsModelObj.To_InvoiceDate = this.getFormattedDate(new Date());//new Date().toLocaleDateString();

    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      var decuser = JSON.parse(decval);

      if (decuser[0].GroupRoleId == 2) {
        this.disablePaidCon = true;
        this.disablePendingCon = true;
        var data = {
          User_pkeyID: decuser[0].User_pkeyID,
          User_FirstName: decuser[0].User_FirstName + ' ' + decuser[0].User_LastName
        }
        this.ContractorReportsModelObj.Contractorarr = [];
        this.ContractorReportsModelObj.Contractorarr.push(data);
        this.ContractorReportsModelObj.PendingTabCon = [];
        this.ContractorReportsModelObj.PendingTabCon.push(data);
      }
      else {
        this.disablePaidCon = false;
        this.disablePendingCon = false;
      }
    }

    this.GetDropDowndata();
    this.GetContractorPaidDetails();

    this.dropdownSettings = {
      singleSelection: false,
      idField: "User_pkeyID",
      textField: "User_FirstName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

  }

  dropdownList = [];

  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
    });


    this.config = {
      itemsPerPage: parseInt(this.ContractorReportsModelObj.NoofRows.toString()),
      currentPage: parseInt(this.ContractorReportsModelObj.PageNumber.toString()),
      totalItems: 0
    };
    this.showSpinner()
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
  isFormReturn = false;
  GetContractorPaidDetails() {
    //debugger
    this.paidSearch = "Processing";
    this.showSpinner();
    this.ispaidLoading = true;
    this.ContractorReportsModelObj.PageNumber = parseInt(this.ContractorReportsModelObj.PageNumber.toString());
    this.ContractorReportsModelObj.NoofRows = parseInt(this.ContractorReportsModelObj.NoofRows.toString());

    if (this.ContractorReportsModelObj.FromDatePaidInvoice == '') {
      this.isFormReturn = true;
      this.isFromSelect = true;
    }
    else {
      this.isFromSelect = false;
    }
    if (this.ContractorReportsModelObj.ToDateDatePaidInvoice == '') {
      this.isFormReturn = true;
      this.isToSelect = true;
    }
    else {
      this.isToSelect = false;
    }
    if (this.isFormReturn) {
      return;
    }
    //this.ContractorReportsModelObj.Contractorarr = this.formArrayVal;

    this.ContractorReportsModelObj.Type = 1;
    this.xContractorReportsService.ContactorInvoicePaid(this.ContractorReportsModelObj)
      .subscribe(response => {
        this.paidSearch = "Search";
        this.ispaidLoading = false;
        if (response[0].length > 0) {
          this.DateStripArr = response[0];
        } else {
          this.MessageFlag = "No record found for paid invoice tab";
          this.commonMessage();
        }
        // debugger;
        this.DateStripArr = response[0];

        this.GetPendingInvoiceReport();
        //console.log('page',response)
        this.config = {
          itemsPerPage: parseInt(this.ContractorReportsModelObj.NoofRows.toString()),
          currentPage: parseInt(this.ContractorReportsModelObj.PageNumber.toString()),
          totalItems: parseInt(response[1])
        };
      })
  }
  GetPendingInvoiceReport() {
    // debugger
    this.pendingSearch = "Processing"
    
    this.ispendingLoading = true;
    this.ContractorReportsModelObj.Type = 1;
    this.ContractorReportsModelObj.Inv_Con_Inv_Followup = true;
    this.xContractorReportsService.GetPendingReportData(this.ContractorReportsModelObj)
      .subscribe(response => {
        //debugger;
        //console.log('chec',response)
        this.pendingInvoice_all = response[0].CurrentlyDue;
        this.pendingInvoice = process(this.pendingInvoice_all, this.state);

        this.PendingHold_all = response[0].OnHold;
        this.PendingHold = process(this.PendingHold_all, this.state);

        this.completeinv_all = response[0].Completed;
        this.completeinv = process(this.completeinv_all, this.state);

        // debugger;
        this.getGridFooterSum()
        this.ispendingLoading = false;
        this.pendingSearch = "Search"
      })
      
  }
  // showDetails(event, dataItem) {
  //   //console.log('',dataItem)
  //   var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.Inv_Con_Wo_ID);
  //   let url = "/client/clientresultinvoice/" + btoa(encrypted);
  //   window.open(url, '_blank');
  // }
  getReportDetailsUrl(dataItem) {
    
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.Inv_Con_Wo_ID);
    let url = "/client/clientresultinvoice/" + btoa(encrypted);
    return url
    //  window.open(url,'_blank');
  }
  chkarr: any;
  onItemSelect(item: any) {
    this.formArrayVal = item;
    //console.log('a',item);

  }
  onSelectAll(items: any) {
    this.formArrayVal = items;
    //console.log(items);

  }
  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder()
      .subscribe(response => {
        if (response.length != 0) {
          this.dropdownList = response[14]; // for ContractorList
        }
      });
  }
  onPageChange(event) {
    //console.log(event);
    this.config.currentPage = event;
    this.ContractorReportsModelObj.PageNumber = parseInt(event.toString());
    //this.GetContractorPaidDetails();
  }
  getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }
  GetPendingInvoiceTabData() {
    
    this.GetPendingInvoiceReport();
  }
  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  public onExcelExport(args: any): void {

    //debugger




  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.pendingInvoice = process(this.pendingInvoice_all, this.state);
    this.PendingHold = process(this.PendingHold_all, this.state);
    this.completeinv = process(this.completeinv_all, this.state);

    this.getGridFooterSum();
  }

  SetHelpFlag() {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }

  DispalyInfo(event: Event, lblName) {
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }
  getGridFooterSum() {
    this.invoiceTotalSum_Due=0
    this.amountPaidSum_Due=0

    this.invoiceTotalSum_Done=0
    this.amountPaidSum_Done=0

    this.invoiceTotalSum_Hold=0
    this.amountPaidSum_Hold=0

    this.invoiceTotalSum_Due = this.pendingInvoice.data.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Inv_Con_Sub_Total==null?0:current.Inv_Con_Sub_Total), 0);
    this.amountPaidSum_Due = this.pendingInvoice.data.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Con_Pay_Amount==null?0:current.Con_Pay_Amount), 0);

    this.invoiceTotalSum_Done = this.completeinv.data.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Inv_Con_Sub_Total==null?0:current.Inv_Con_Sub_Total), 0);
    this.amountPaidSum_Done = this.completeinv.data.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Con_Pay_Amount==null?0:current.Con_Pay_Amount), 0);

    this.invoiceTotalSum_Hold = this.PendingHold.data.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Inv_Con_Sub_Total==null?0:current.Inv_Con_Sub_Total), 0);
    this.amountPaidSum_Hold = this.PendingHold.data.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Con_Pay_Amount==null?0:current.Con_Pay_Amount), 0);
  }
}


