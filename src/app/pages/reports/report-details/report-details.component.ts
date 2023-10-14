import { Component,  OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { FormFields, ReportDetails } from "./report-details-model";
import { ReportsServices } from "./report-details.service";

import { process, State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { reportmodeldata } from "./report-details-model";
import { GridComponent } from '@progress/kendo-angular-grid';
import { ThemeService } from 'ng2-charts';

import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { WorkOrderDrodownServices } from '../../services/common-drop-down/drop-down.service';
import { MultiDropdowns } from './multi-dropdowns';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Invoice_ClientDTO, Invoice_ContractorDTO, PaymentRecordModel } from '../../client-result/client-results-invoice/client-results-invoice-model';
import { ClientResultsInvoiceServices } from '../../client-result/client-results-invoice/client-results-invoice.service';
import _ from 'underscore';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import * as $ from "jquery";
import { sum } from "lodash";
import { environment } from "src/environments/environment";
import { textShadow } from "html2canvas/dist/types/css/property-descriptors/text-shadow";
import { emitKeypressEvents } from "readline";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  templateUrl: "./report-details.component.html",
  styles: [`
  .disabled .k-dropdown {
  pointer-events: none;
  opacity: 0.5;
}
`
]
  
})

export class ReportsComponent implements OnInit {

  clientReports: any;
  datalist: any;
  locked: boolean = false;
  formArrayVal = [];
  stateList: any;
  customerNumberList: any;
  CompanyList: any; // temp array
  CustomerList: any; // temp array
  AssignedAdminList: any; // temp array
  CategoryList: any; // temp array
  ContractorList: any; // temp array
  CordinatorList: any;
  multiDropdowns = MultiDropdowns;
  button = "Run Report"; // buttom loading..
  disableexcel: boolean = true;
  isLoading = false; // buttom loading..
  isRadioSelect = false; // isRadioSelect
  isFromSelect = false; // isFromSelect
  isToSelect = false; // isToSelect
  isLabelSelect = false; // isLabelSelect
  clientgrid: boolean = true;
  clientgridData: any;
  disableClientRange: boolean = true;
  disableConRange: boolean = true;
  commentBox = true;
  PaymentBox = false;
  rowCheckBox = false;
  paymentclick: boolean = true;
  groupByList = [
    { groupById: 1, groupByText: 'Contractor' },
    { groupById: 2, groupByText: 'Client' },
    { groupById: 3, groupByText: 'Coordinator' },
    { groupById: 4, groupByText: 'Processor' }
  ];
  selectionLable = [
    { lableId: 1, lableText: 'Invoice date' },
    { lableId: 2, lableText: 'Sent to client date' },
    { lableId: 3, lableText: 'Field complete date' },
    { lableId: 4, lableText: 'Complete date' },
    { lableId: 5, lableText: 'Created Date' },
    { lableId: 6, lableText: 'Office approve date' },
    { lableId: 7, lableText: 'Client check date' }
  ];
  extraColumnArray = [
    { columnId: 1, columnText: 'Client' },
    { columnId: 2, columnText: 'Coordinate' },
    { columnId: 3, columnText: 'Processor' },
    { columnId: 4, columnText: 'Sent to client date' },
    { columnId: 5, columnText: 'Feild complete date' },
    { columnId: 6, columnText: 'Office approved date' },
    //{columnId:7,columnText:'Client paid date'},
    { columnId: 8, columnText: 'Category' }
  ];
  dropdownSettings: IDropdownSettings;
  formUsrCommonGroup: UntypedFormGroup;
  paymentFormGroup: UntypedFormGroup;
  ReportsModelObj: reportmodeldata = new reportmodeldata();
  RecordPaymentObj: PaymentRecordModel = new PaymentRecordModel();
  ReportColumns = [
    {
      field: 'Client_Invoice_Number',
      title: 'Client Invoice#',
      width: '100',
      locked: false,
      hidden: false
    },
    {
      field: 'Client_InvoiceDate',
      title: 'Client Invoice Date',
      width: '120',
      locked: false,
      hidden: false
    },

    {
      field: 'Con_Invoice_Number',
      title: 'Contractor Invoice#',
      width: '100',
      locked: false,
      hidden: false
    },
    {
      field: 'Con_InvoiceDate',
      title: 'Contractor Invoice Date',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'IPLNO',
      title: 'IPL#',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'ContractorName',
      title: 'Contractor',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'address1',
      title: 'Address',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'city',
      title: 'City',
      width: '90',
      locked: false,
      hidden: false
    },
    {
      field: 'IPL_StateName',
      title: 'State',
      width: '90',
      locked: false,
      hidden: false
    },
    {
      field: 'zip',
      title: 'Zip',
      width: '90',
      locked: false,
      hidden: false
    },
    {
      field: 'workOrderNumber',
      title: 'WO#',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'WT_WorkType',
      title: 'Work Type',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'dueDate',
      title: 'Due Date',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'Client_Company_Name',
      title: 'Client',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'CordinatorName',
      title: 'Coordinate',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'ProcessorName',
      title: 'Processor',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'SentToClient_date',
      title: 'Sent To Client Date',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'Field_complete_date',
      title: 'Feild Complete Date',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'OfficeApproved_date',
      title: 'Office Approved Date',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'CategoryName',
      title: 'Category',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'Client_InvoicePaid_Date',
      title: 'Client Paid Date',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'Client_InvoiceTotal',
      title: 'Client Total',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'Client_InvoicePaid',
      title: 'Client Paid',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'Con_InvoicePaid_Date',
      title: 'Contractor Paid Date',
      width: '120',
      locked: false,
      hidden: true
    },
    {
      field: 'Con_InvoiceTotal',
      title: 'Contractor Total',
      width: '120',
      locked: false,
      hidden: false
    },
    {
      field: 'Con_InvoicePaid',
      title: 'Contractor Paid',
      width: '120',
      locked: false,
      hidden: false
    },
  ];
  isHelpActive = false;
  clientTotalSum: number = 0;
  clientPaidSum: number = 0;

  totalRecords = [];
  con_clientTotalSum: number = 0;
  con_clientPaidSum: number = 0;
  constructor(private formBuilder: UntypedFormBuilder, private xmodalService: NgbModal,
    private xReportsServices: ReportsServices, private EncrDecr: EncrDecrService,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private spinner: NgxSpinnerService,
    private xRouter: Router,) {
    this.formArrayVal = [
      {
        Task_sett_Company: [],
        Task_sett_Customer: [],
        Task_sett_Contractor: [],
        Task_sett_Admin: [],
        Task_sett_Category: [],
        Task_sett_State: []
      }
    ];
    this.GetDropDowndata();
    console.log('abc',this.clientgrid)
  }

  MessageFlag: string;
  testExtArray: any;
  reportDetails = ReportDetails;
  formFields = FormFields;

  paymentButton = "Save Payment";
  submitted: boolean = false;
  Invoice_ContractorDTOObj: Invoice_ContractorDTO = new Invoice_ContractorDTO();
  Invoice_ClientDTOObj: Invoice_ClientDTO = new Invoice_ClientDTO();
  ispaymentButtonLoading = false;
  currencySymbol=environment.currencySymbol;
  ngOnInit() {
    this.spinner.show('loading');
    this.formUsrCommonGroup = this.formBuilder.group({
    });

    this.paymentFormGroup = this.formBuilder.group({
      paymentDateN: ['', Validators.nullValidator],
      checkNumberN: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });

    this.RecordPaymentObj.paymentDate = new Date();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'columnId',
      textField: 'columnText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
//  $(document).ready(function () {
  
//       $('[data-toggle="tooltip"]');
//     });

    // $(document).ready(function () {
    //   $('[data-toggle="tooltip"]').tooltip();
    // });
this.showSpinner();
}
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
  get fx() {
    return this.paymentFormGroup.controls;
  }
  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder(2)
      .subscribe(response => {
        //console.log("drd",response);
        if (response.length != 0) {

          this.CompanyList = response[0]; // for CompanyList
          this.CategoryList = response[2]; // for CategoryList
          this.stateList = response[6]; // for StateList
          this.customerNumberList = response[9]; // for CustomerNumberList
          this.ContractorList = response[14]; // for ContractorList
          this.AssignedAdminList = response[16]; // for ProcessorList

          let tempMultiDropList = [
            this.CompanyList,
            this.customerNumberList,
            this.ContractorList,
            this.AssignedAdminList,
            this.CategoryList,
            this.stateList
          ]

          tempMultiDropList.forEach((list, index) => {
            //console.log(list, index)
            this.multiDropdowns[index].data = list;
          });

        }
      });
  }

  public aggregates: any[] = [
  { field: 'Client_InvoiceTotal', aggregate: 'count' },
  { field: 'Con_InvoiceTotal', aggregate: 'count' },
  { field: 'Client_InvoiceTotal', aggregate: 'sum' },
  { field: 'Con_InvoiceTotal', aggregate: 'sum' },
  { field: 'Client_InvoicePaid', aggregate: 'sum' },
  { field: 'Con_InvoicePaid', aggregate: 'sum' }];

  state: State = {
    skip: 0,
    take: 100,
    group: [{ field: 'ContractorName', aggregates: this.aggregates }]
  };

  setPaginationSize(){
    debugger
    if(this.totalRecords.length>0)
    {
      var maxValue=  Math.max(...this.totalRecords);
      if(maxValue >0 && maxValue<100)
      {
        return 100;
      }
      else if(maxValue>100 && maxValue<200)
      {
        return 200;
      }
      else if(maxValue>200 && maxValue<300){
        return 300
      }
      else if(maxValue>300 && maxValue<400){
        return 400
      }
      else if(maxValue>400 && maxValue<500){
        return 500
      }
      else{
        return maxValue
      }
    }
    else
    {
      return this.state.take;
    }
  }
 
  dataStateChange(state: DataStateChangeEvent): void {
    debugger;
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }
    this.state = state;
    this.clientgridData = process(this.clientReports, this.state);
    this.getGridFooterSum();
    this.state.take=this.setPaginationSize();
    this.clientgridData = process(this.clientReports, this.state);
    this.getGridFooterSum();
  }

  isFormReturn = false;
  FormButton(content) {
    debugger
    // this.state.group = [];
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    this.ReportsModelObj.IsClientCheck == undefined ? false : this.ReportsModelObj.IsClientCheck
    this.ReportsModelObj.IsContractorCheck == undefined ? false : this.ReportsModelObj.IsClientCheck

    if (!this.ReportsModelObj.IsClientCheck && !this.ReportsModelObj.IsContractorCheck) {
      this.isFormReturn = true;
      this.isRadioSelect = true;
    }
    else {
      this.isRadioSelect = false;
    }
    if (this.ReportsModelObj.LableFromDate == '') {
      this.isFormReturn = true;
      this.isFromSelect = true;
    }
    else {
      this.isFromSelect = false;
    }
    if (this.ReportsModelObj.LableFromTo == '') {
      this.isFormReturn = true;
      this.isToSelect = true;
    }
    else {
      this.isToSelect = false;
    }
    if (this.ReportsModelObj.LabelData == 0) {
      this.isFormReturn = true;
      this.isLabelSelect = true;
    }
    else {
      this.isLabelSelect = false;
    }
    if (!this.isRadioSelect && !this.isFromSelect && !this.isToSelect && !this.isLabelSelect) {
      this.isFormReturn = false;
    }
    if (this.isFormReturn) {
      return;
    }
    this.showSpinner()
    this.isLoading = true;
    this.button = "Processing";

    this.setDateRange();

    this.ReportsModelObj.Valtype = 1;
    this.ReportsModelObj.ReportAutoAssinArray = this.formArrayVal;
    if (this.ReportsModelObj.IsClientCheck) {
      this.ReportsModelObj.ClientInvoiceRangeStart = '';
      this.ReportsModelObj.ClientInvoiceRangeEnd = '';
    }

    this.xReportsServices
      .GetReportDetail(this.ReportsModelObj)
      .subscribe(res => {
        this.isLoading = false;
        this.button = "Run Report";
        this.disableexcel = false;
        //console.log('Report Responce',res);
        this.clientgrid = false;
        this.clientReports = res[0][0];
        this.GroupByChangeEvent(this.ReportsModelObj.GroupByData);
      })
  }

  GroupByChangeEvent(val) {
    debugger
    if (this.state) {
      if (val == 1) {
        this.state.group = [{ field: 'ContractorName', aggregates: this.aggregates }];
      }
      else if (val == 2) {
        this.state.group = [{ field: 'Client_Company_Name', aggregates: this.aggregates }];
      }
      else if (val == 3) {
        this.state.group = [{ field: 'CordinatorName', aggregates: this.aggregates }];
      }
      else if (val == 4) {
        this.state.group = [{ field: 'ProcessorName', aggregates: this.aggregates }];
      }
      else {
        this.state.group = [];
      }
    }
    this.clientgridData = process(this.clientReports, this.state);
    this.getGridFooterSum();
    this.state.take=this.setPaginationSize();
    this.clientgridData = process(this.clientReports, this.state);
    this.getGridFooterSum();

    var Client_Invoice_Numberindex = this.ReportColumns.findIndex(r => r.field == 'Client_Invoice_Number');
    var Client_InvoiceDateindex = this.ReportColumns.findIndex(r => r.field == 'Client_InvoiceDate');
    var Client_InvoiceTotalindex = this.ReportColumns.findIndex(r => r.field == 'Client_InvoiceTotal');
    var Client_InvoicePaidindex = this.ReportColumns.findIndex(r => r.field == 'Client_InvoicePaid');
    var Client_InvoicePaid_Dateindex = this.ReportColumns.findIndex(r => r.field == 'Client_InvoicePaid_Date')
    var Con_Invoice_Numberindex = this.ReportColumns.findIndex(r => r.field == 'Con_Invoice_Number');
    var Con_InvoiceDateindex = this.ReportColumns.findIndex(r => r.field == 'Con_InvoiceDate');
    var Con_InvoiceTotalindex = this.ReportColumns.findIndex(r => r.field == 'Con_InvoiceTotal');
    var Con_InvoicePaidindex = this.ReportColumns.findIndex(r => r.field == 'Con_InvoicePaid');
    var Con_InvoicePaid_Dateindex = this.ReportColumns.findIndex(r => r.field == 'Con_InvoicePaid_Date')


    if (this.ReportsModelObj.IsClientCheck && this.ReportsModelObj.IsContractorCheck) {
      this.ReportColumns[Client_Invoice_Numberindex].hidden = false;
      this.ReportColumns[Client_InvoiceDateindex].hidden = false;
      this.ReportColumns[Client_InvoiceTotalindex].hidden = false;
      this.ReportColumns[Client_InvoicePaidindex].hidden = false;
      this.ReportColumns[Con_Invoice_Numberindex].hidden = false;
      this.ReportColumns[Con_InvoiceDateindex].hidden = false;
      this.ReportColumns[Con_InvoiceTotalindex].hidden = false;
      this.ReportColumns[Con_InvoicePaidindex].hidden = false;
      this.ReportColumns[Client_InvoicePaid_Dateindex].hidden = false;
      this.ReportColumns[Con_InvoicePaid_Dateindex].hidden = false;
    }
    else if (this.ReportsModelObj.IsClientCheck) {
      this.ReportColumns[Client_Invoice_Numberindex].hidden = false;
      this.ReportColumns[Client_InvoiceDateindex].hidden = false;
      this.ReportColumns[Client_InvoiceTotalindex].hidden = false;
      this.ReportColumns[Client_InvoicePaidindex].hidden = false;
      this.ReportColumns[Client_InvoicePaid_Dateindex].hidden = false;
      this.ReportColumns[Con_Invoice_Numberindex].hidden = true;
      this.ReportColumns[Con_InvoiceDateindex].hidden = true;
      this.ReportColumns[Con_InvoiceTotalindex].hidden = true;
      this.ReportColumns[Con_InvoicePaidindex].hidden = true;
      this.ReportColumns[Con_InvoicePaid_Dateindex].hidden = true;
    }
    else if (this.ReportsModelObj.IsContractorCheck) {
      this.ReportColumns[Client_Invoice_Numberindex].hidden = true;
      this.ReportColumns[Client_InvoiceDateindex].hidden = true;
      this.ReportColumns[Client_InvoiceTotalindex].hidden = true;
      this.ReportColumns[Client_InvoicePaidindex].hidden = true;
      this.ReportColumns[Client_InvoicePaid_Dateindex].hidden = true;
      this.ReportColumns[Con_Invoice_Numberindex].hidden = false;
      this.ReportColumns[Con_InvoiceDateindex].hidden = false;
      this.ReportColumns[Con_InvoiceTotalindex].hidden = false;
      this.ReportColumns[Con_InvoicePaidindex].hidden = false;
      this.ReportColumns[Con_InvoicePaid_Dateindex].hidden = false;
    }
    this.OnExtraColumnChange();
  }
  setDateRange() {
    // Reset Date Range
    this.ReportsModelObj.InvoiceDateFrom = '';
    this.ReportsModelObj.InvoiceDateTo = '';
    this.ReportsModelObj.SentToClientDateFrom = '';
    this.ReportsModelObj.SentToClientDateTo = '';
    this.ReportsModelObj.ReadyOfficeDateFrom = '';
    this.ReportsModelObj.ReadyOfficeDateTo = '';
    this.ReportsModelObj.CompletedDateFrom = '';
    this.ReportsModelObj.CompletedDateTo = '';
    this.ReportsModelObj.CreatedDateFrom = '';
    this.ReportsModelObj.CreatedDateTo = '';
    this.ReportsModelObj.OfficeApproveDateFrom = '';
    this.ReportsModelObj.OfficeApproveDateTo = '';
    this.ReportsModelObj.ClientCheckDateFrom = '';
    this.ReportsModelObj.ClientCheckDateTo = '';

    if (this.ReportsModelObj.LabelData == 1) { //Invoice Date
      this.ReportsModelObj.InvoiceDateFrom = this.ReportsModelObj.LableFromDate;
      this.ReportsModelObj.InvoiceDateTo = this.ReportsModelObj.LableFromTo;
    }
    else if (this.ReportsModelObj.LabelData == 2) { //Sent To Client
      this.ReportsModelObj.SentToClientDateFrom = this.ReportsModelObj.LableFromDate;
      this.ReportsModelObj.SentToClientDateTo = this.ReportsModelObj.LableFromTo;
    }
    else if (this.ReportsModelObj.LabelData == 3) { //Field Complete
      this.ReportsModelObj.ReadyOfficeDateFrom = this.ReportsModelObj.LableFromDate;
      this.ReportsModelObj.ReadyOfficeDateTo = this.ReportsModelObj.LableFromTo;
    }
    else if (this.ReportsModelObj.LabelData == 4) { //Complete Date
      this.ReportsModelObj.CompletedDateFrom = this.ReportsModelObj.LableFromDate;
      this.ReportsModelObj.CompletedDateTo = this.ReportsModelObj.LableFromTo;
    }
    else if (this.ReportsModelObj.LabelData == 5) { //Created Date
      this.ReportsModelObj.CreatedDateFrom = this.ReportsModelObj.LableFromDate;
      this.ReportsModelObj.CreatedDateTo = this.ReportsModelObj.LableFromTo;
    }
    else if (this.ReportsModelObj.LabelData == 6) { //Office approve date
      this.ReportsModelObj.OfficeApproveDateFrom = this.ReportsModelObj.LableFromDate;
      this.ReportsModelObj.OfficeApproveDateTo = this.ReportsModelObj.LableFromTo;
    }
    else if (this.ReportsModelObj.LabelData == 7) { //Client check date
      this.ReportsModelObj.ClientCheckDateFrom = this.ReportsModelObj.LableFromDate;
      this.ReportsModelObj.ClientCheckDateTo = this.ReportsModelObj.LableFromTo;
    }
  }

  // showDetails(event, dataItem) {

  //   var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
  //  let url ="/client/clientresultinvoice/" + btoa(encrypted);
  //  window.open(url,'_blank');
  // }
  getReportDetailsUrl(dataItem) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
    let url = "/client/clientresultinvoice/" + btoa(encrypted);
    return url
    //  window.open(url,'_blank');
  }
  CancelClick() {
    window.location.reload();
  }
  OnExtraColumnChange() {
    //dfebugger;
    var Client_Company_Nameindex = this.ReportColumns.findIndex(r => r.field == 'Client_Company_Name');
    var CordinatorNameindex = this.ReportColumns.findIndex(r => r.field == 'CordinatorName');
    var ProcessorNameindex = this.ReportColumns.findIndex(r => r.field == 'ProcessorName');
    var SentToClient_dateindex = this.ReportColumns.findIndex(r => r.field == 'SentToClient_date');
    var Field_complete_dateindex = this.ReportColumns.findIndex(r => r.field == 'Field_complete_date');
    var OfficeApproved_dateindex = this.ReportColumns.findIndex(r => r.field == 'OfficeApproved_date');
    var CategoryNameindex = this.ReportColumns.findIndex(r => r.field == 'CategoryName');
    //var Client_InvoicePaid_Dateindex = this.ReportColumns.findIndex(r => r.field == 'Client_InvoicePaid_Date');

    this.ReportColumns[Client_Company_Nameindex].hidden = true;
    this.ReportColumns[CordinatorNameindex].hidden = true;
    this.ReportColumns[ProcessorNameindex].hidden = true;
    this.ReportColumns[SentToClient_dateindex].hidden = true;
    this.ReportColumns[Field_complete_dateindex].hidden = true;
    this.ReportColumns[OfficeApproved_dateindex].hidden = true;
    this.ReportColumns[CategoryNameindex].hidden = true;
    // this.ReportColumns[Client_InvoicePaid_Dateindex].hidden = true;

    if (this.ReportsModelObj.ExtraColumnData != undefined) {
      this.ReportsModelObj.ExtraColumnData.forEach(col => {

        if (col.columnText == 'Client') {
          this.ReportColumns[Client_Company_Nameindex].hidden = false;
        }
        else if (col.columnText == 'Coordinate') {
          this.ReportColumns[CordinatorNameindex].hidden = false;
        }
        else if (col.columnText == 'Processor') {
          this.ReportColumns[ProcessorNameindex].hidden = false;
        }
        else if (col.columnText == 'Sent to client date') {
          this.ReportColumns[SentToClient_dateindex].hidden = false;
        }
        else if (col.columnText == 'Feild complete date') {
          this.ReportColumns[Field_complete_dateindex].hidden = false;
        }
        else if (col.columnText == 'Office approved date') {
          this.ReportColumns[OfficeApproved_dateindex].hidden = false;
        }

        else if (col.columnText == 'Category') {
          this.ReportColumns[CategoryNameindex].hidden = false;
        }
        else {
          this.ReportColumns[Client_Company_Nameindex].hidden = true;
          this.ReportColumns[CordinatorNameindex].hidden = true;
          this.ReportColumns[ProcessorNameindex].hidden = true;
          this.ReportColumns[SentToClient_dateindex].hidden = true;
          this.ReportColumns[Field_complete_dateindex].hidden = true;
          this.ReportColumns[OfficeApproved_dateindex].hidden = true;
          this.ReportColumns[CategoryNameindex].hidden = true;

        }
      });
    }

  }
  ClientCheckChange() {
    if (this.ReportsModelObj.IsClientCheck && this.ReportsModelObj.IsContractorCheck) {
      this.disableClientRange = true;
      this.disableConRange = true;
    } else {
      this.disableClientRange = this.ReportsModelObj.IsClientCheck ? false : true;
      this.disableConRange = this.ReportsModelObj.IsContractorCheck ? false : true;
    }
  }
  isContractor = false;
  selectedpaymentList = [];
  paymentObjList = [];
  onSubmit() {
    this.submitted = true;
    if (this.paymentFormGroup.invalid) return;
    this.ispaymentButtonLoading = true;
    this.paymentButton = 'Processing';
    //dfebugger;
    //console.log(this.state);

    if (this.clientgridData != undefined && this.clientgridData.data != undefined) {
      if (this.state.group.length > 0) {
        this.clientgridData.data.forEach(groupelement => {
          if (groupelement.items.length > 0) {
            var selectedGroupList = _.where(groupelement.items, { RowCheckBox: true });
            if (selectedGroupList.length > 0) {
              selectedGroupList.forEach(selectedpaymentelement => {
                this.selectedpaymentList.push(selectedpaymentelement);
              });
            }
          }
        });
      }
      else {
        this.selectedpaymentList = _.where(this.clientgridData.data, { RowCheckBox: true });
      }
    }
    //console.log(this.selectedpaymentList);
    //dfebugger;

    if (this.selectedpaymentList.length > 0) {
      this.selectedpaymentList.forEach(element => {
        let obj = !this.isContractor ? {
          Client_Pay_PkeyId: this.Invoice_ClientDTOObj.Inv_Client_pkeyId,
          Client_Pay_Invoice_Id: element.Client_Pay_Invoice_Id,
          Client_Pay_Wo_Id: element.workOrder_ID,
          Client_Pay_Payment_Date: this.RecordPaymentObj.paymentDate,
          Client_Pay_Amount: element.RowAmount,
          Client_Pay_CheckNumber: this.RecordPaymentObj.checkNumber.toString(),
          Client_Pay_Comment: element.RowComment,
          Client_Pay_EnteredBy: this.RecordPaymentObj.enteredBy,
          Client_Pay_Balance_Due: null,
          Client_Pay_IsActive: true,
          Client_Pay_IsDelete: 0,
          UserID: this.Invoice_ClientDTOObj.UserID,
          Type: 1
        } :
          {
            Con_Pay_PkeyId: this.Invoice_ContractorDTOObj.Inv_Con_pkeyId,
            Con_Pay_Invoice_Id: element.Con_Pay_Invoice_Id,
            Con_Pay_Wo_Id: element.workOrder_ID,
            Con_Pay_Payment_Date: this.RecordPaymentObj.paymentDate,
            Con_Pay_Amount: element.RowAmount,
            Con_Pay_CheckNumber: this.RecordPaymentObj.checkNumber.toString(),
            Con_Pay_Comment: element.RowComment,
            Con_Pay_EnteredBy: this.RecordPaymentObj.comment,
            Con_Pay_Balance_Due: null,
            Con_Pay_IsActive: true,
            Con_Pay_IsDelete: 0,
            UserID: this.Invoice_ContractorDTOObj.UserID,
            Type: 1
          }
        this.paymentObjList.push(obj);
      });
      this.xReportsServices.PaymentListPost(this.paymentObjList, this.isContractor)
        .subscribe(response => {
          //dfebugger;
          //console.log(response);
          this.paymentButton = '';
          this.ispaymentButtonLoading = false;
          this.paymentFormGroup.reset();
          this.submitted = false;
          this.paymentclick = true;
          this.isContractor = false;
          this.selectedpaymentList = [];
          this.paymentObjList = [];
          this.MessageFlag = "Payment successfully completed...!";
          this.commonMessage();
          this.LoadGridData();
        });
    } else {
      this.MessageFlag = "Select at least one invoice for payment...!";
      this.commonMessage();
      this.paymentButton = 'Save Payment';
      this.ispaymentButtonLoading = false;
    }
  }
  title: string;
  ShowPaymentBox(Con_Client) {
    //debugger
    if (Con_Client == 1) {
      this.isContractor = false;
      this.title = "Client";

    } else {
      this.isContractor = true;
      this.title = "Contractor";
    }
    this.paymentclick = false;
  }
  LoadGridData() {
    this.xReportsServices
      .GetReportDetail(this.ReportsModelObj)
      .subscribe(res => {
        //console.log('Report Responce',res);
        this.clientgrid = false;
        this.clientReports = res[0][0];
        console.log('this.clientReports',this.clientReports)
        this.GroupByChangeEvent(this.ReportsModelObj.GroupByData);
      });
  }
  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  public exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
  }
  public exportToPDF(grid: GridComponent): void {
    grid.saveAsPDF();
  }
  blob: any;
  pdfgenerate() {
    //debugger
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    this.ReportsModelObj.IsClientCheck == undefined ? false : this.ReportsModelObj.IsClientCheck
    this.ReportsModelObj.IsContractorCheck == undefined ? false : this.ReportsModelObj.IsClientCheck

    if (!this.ReportsModelObj.IsClientCheck && !this.ReportsModelObj.IsContractorCheck) {
      this.isFormReturn = true;
      this.isRadioSelect = true;
    }
    else {
      this.isRadioSelect = false;
    }
    if (this.ReportsModelObj.LableFromDate == '') {
      this.isFormReturn = true;
      this.isFromSelect = true;
    }
    else {
      this.isFromSelect = false;
    }
    if (this.ReportsModelObj.LableFromTo == '') {
      this.isFormReturn = true;
      this.isToSelect = true;
    }
    else {
      this.isToSelect = false;
    }
    if (this.ReportsModelObj.LabelData == 0) {
      this.isFormReturn = true;
      this.isLabelSelect = true;
    }
    else {
      this.isLabelSelect = false;
    }
    if (!this.isRadioSelect && !this.isFromSelect && !this.isToSelect && !this.isLabelSelect) {
      this.isFormReturn = false;
    }
    if (this.isFormReturn) {
      return;
    }
    this.isLoading = true;
    this.button = "Processing";

    this.setDateRange();

    this.ReportsModelObj.Valtype = 1;
    this.ReportsModelObj.ReportAutoAssinArray = this.formArrayVal;
    if (this.ReportsModelObj.IsClientCheck) {
      this.ReportsModelObj.ClientInvoiceRangeStart = '';
      this.ReportsModelObj.ClientInvoiceRangeEnd = '';
    }

    this.xReportsServices
      .GetReportDetailPdf(this.ReportsModelObj)
      .subscribe(res => {
        //debugger
        if (res != null) {
          if (res != null) {
            this.blob = new Blob([res], {
              type: 'application/pdf',
            });

            var downloadURL = window.URL.createObjectURL(res);
            var link = document.createElement('a');
            link.href = downloadURL;
            let GetName = 'ReportDetails';
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
            // self.notificationService.showSuccess(result.Message, "Success");
          } else {
          }
        }

      })
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
  showComment() {
    //debugger
    this.commentBox = !this.commentBox;
  }
  showpayment() {
    //debugger
    this.PaymentBox = !this.PaymentBox;
  }
  getGridFooterSum() {
     debugger;
    this.clientPaidSum=0;
    this.clientTotalSum=0;
    this.con_clientPaidSum=0;
    this.con_clientTotalSum=0;
    this.totalRecords=[];

    if (this.state.group.length==0) {
      this.clientTotalSum = this.clientgridData.data.reduce((client_total_accumulator, client_total_current) => parseFloat(client_total_accumulator) + parseFloat(client_total_current.Client_InvoiceTotal==null?0:client_total_current.Client_InvoiceTotal), 0);
      this.clientPaidSum = this.clientgridData.data.reduce((client_paid_accumulator, client_paid_current) => parseFloat(client_paid_accumulator) + parseFloat(client_paid_current.Client_InvoicePaid==null?0:client_paid_current.Client_InvoicePaid), 0);

      this.con_clientTotalSum = this.clientgridData.data.reduce((con_total_accumulator, con_total_current) => parseFloat(con_total_accumulator) + parseFloat(con_total_current.Con_InvoiceTotal==null?0:con_total_current.Con_InvoiceTotal), 0);
      this.con_clientPaidSum = this.clientgridData.data.reduce((con_paid_accumulator, con_paid_current) => parseFloat(con_paid_accumulator) + parseFloat(con_paid_current.Con_InvoicePaid==null?0:con_paid_current.Con_InvoicePaid), 0);
    }
    else {
      this.clientgridData.data.forEach(clientdata => {

        this.clientTotalSum += clientdata.items.reduce((client_total_accumulator, client_total_current) => parseFloat(client_total_accumulator) + parseFloat(client_total_current.Client_InvoiceTotal==null?0:client_total_current.Client_InvoiceTotal), 0);
        this.clientPaidSum += clientdata.items.reduce((client_paid_accumulator, client_paid_current) => parseFloat(client_paid_accumulator) + parseFloat(client_paid_current.Client_InvoicePaid==null?0:client_paid_current.Client_InvoicePaid), 0);

        this.con_clientTotalSum += clientdata.items.reduce((con_total_accumulator, con_total_current) => parseFloat(con_total_accumulator) + parseFloat(con_total_current.Con_InvoiceTotal==null?0:con_total_current.Con_InvoiceTotal), 0);
        this.con_clientPaidSum += clientdata.items.reduce((con_paid_accumulator, con_paid_current) => parseFloat(con_paid_accumulator) + parseFloat(con_paid_current.Con_InvoicePaid==null?0:con_paid_current.Con_InvoicePaid), 0);

        this.totalRecords.push(clientdata.aggregates.Client_InvoiceTotal.count)
      });
    }
  }

  isDisabled: boolean = true;
  pageSizes: number[] = [50, 100, 200, 300, 400, 500];
  getPageSizes(): number[] {
    if (this.isDisabled) {
      return []; // Return an empty array to disable the page sizes
    } else {
      return this.pageSizes; // Return the original page sizes
    }
  }
}
