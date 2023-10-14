import { Component, OnInit, QueryList } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ClientResultsInvoiceServices } from '../../client-result/client-results-invoice/client-results-invoice.service';
import { CommonStatusDTO } from '../../client-result/common-client-header/common-status-model';
import { WorkOrderDrodownServices } from '../../services/common-drop-down/drop-down.service';
import { AdvanceReportModel, WOFilterModel } from './advance-report-model';
import { AdvanceReportsServices } from './advance-report.service';
import { FilterReportColumns, GroupByReportColumn } from './grid-columns';
import _ from 'underscore';
import { getStatusColor } from 'src/app/models/status-model';
import { IplAppModalContent } from 'src/app/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from '@progress/kendo-angular-grid';
import { exportPDF, Group } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver'
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-advance-report',
  templateUrl: './advance-report.component.html',
  styleUrls: ['./advance-report.component.scss']
})
export class AdvanceReportComponent implements OnInit {
  button = "Run Save Report"; // buttom loading..
  filterbutton = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  isFLLoading = false; // buttom loading..
  isdeleteDisable = true;
  isRowVisible = true;
  isTableVisible = true;
  isWTHidden = true;
  isStateHidden = true;
  isGRVisible = true;
  isFLVisible = true;
  isEditDisable = false;
  formUsrCommonGroup: UntypedFormGroup;
  ClientList: any; // temp array
  CustomerList: any; // temp array
  ProcessorList: any; // temp array
  ContractorList: any; // temp array
  CordinatorList: any;
  WorkTypeList: any;
  StateList: any;
  ReportTypeList: any;
  WOFeildsList: any;
  WOFilterList: any;
  WoFilterArrayVal = [];
  groupByGridColumns = GroupByReportColumn;
  filterReportColumns = FilterReportColumns;
  public groupByGriddata: any[];
  Statuslst: any;
  MessageFlag: string;
  isWOFilterErr = false;
  isWOFilterName = false;
  isRTInvalid = false;
  isWOFilterInvalid = false;
  isGroupByInvalid = false;
  isFromdateInvalid = false;
  isTodateInvalid = false;
  WOFeildOptList = [
    { optId: '=', optText: 'Is equal to(=)' },
    { optId: '!=', optText: 'Is not equal to(!=)' },
    { optId: '>', optText: 'Greater than(>)' },
    { optId: '>=', optText: 'Greater than equal to(>=)' },
    { optId: '<', optText: 'Less than(<)' },
    { optId: '<=', optText: 'Less than equal to(<=)' },
    {optId: 'Contains', optText: 'Contains'},
    {optId: 'Does not contain', optText: 'Does not contain'},
    {optId: 'Starts with', optText: 'Starts with'},
    {optId: 'Ends with', optText: 'Ends with'},
  ];
  public drpConList: Array<string>;
  public drpCoordinatorList: Array<string>;
  public drpProcessorList: Array<string>;
  public drpClientList: Array<string>;
  public drpCustomerList: Array<string>;
  public drpWTList: Array<string>;
  public drpStateList: Array<string>;
  public defaultConItem: { User_FirstName: string, User_pkeyID: number } = { User_FirstName: 'Select', User_pkeyID: 0 };
  public defaultComItem: { Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name: 'Select', Client_pkeyID: 0 };
  public defaultCustomerItem: { Cust_Num_Number: string, Cust_Num_pkeyId: number } = { Cust_Num_Number: 'Select', Cust_Num_pkeyId: 0 };
  public defaultWTItem: { WT_WorkType: string, WT_pkeyID: number } = { WT_WorkType: 'Select', WT_pkeyID: 0 };
  public defaultStateItem: { IPL_StateName: string, IPL_StateID: number } = { IPL_StateName: 'Select', IPL_StateID: 0 };
  AdvanceReportModelObj: AdvanceReportModel = new AdvanceReportModel();
  CommonStatusDTOObj: CommonStatusDTO = new CommonStatusDTO();
  WOFilterModelObj: WOFilterModel = new WOFilterModel();
  disableexcel: boolean = true;
  hideBox: Boolean = true
  isHelpActive = false;
  currencySymbol=environment.currencySymbol;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xAdvanceReportsServices: AdvanceReportsServices,
    private xClientResultsInvoiceServices: ClientResultsInvoiceServices,
    private xmodalService: NgbModal,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private spinner: NgxSpinnerService,
  ) {
    this.WoFilterArrayVal = [
      {
        Report_WO_Filter_Ch_FeildId: 0,
        Report_WO_Filter_Ch_FeildOperator: 0,
        Report_WO_Filter_Ch_FeildValue: null,
        Report_WO_Filter_Ch_FeildDateValue: null,
        Report_WO_Filter_Ch_FeildName: null,
        Report_WO_Filter_Ch_PkeyId: 0,
        Report_WO_Filter_Ch_Master_FKeyId: 0,
        isDateFeild: false
      }
    ];
    this.GetDropDowndata();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
    });
this.showSpinner()
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder()
      .subscribe(response => {
        //console.log("drd",response);
        if (response.length != 0) {
          this.ClientList = response[0]; // for CompanyList
          this.drpClientList = this.ClientList;
          this.WorkTypeList = response[1]; // for WorkTypeList
          this.drpWTList = this.WorkTypeList;
          this.StateList = response[6]; // for StateList
          this.drpStateList = this.StateList;
          this.CustomerList = response[9]; // for CustomerNumberList
          this.drpCustomerList = this.CustomerList;
          this.ContractorList = response[14]; // for ContractorList
          this.drpConList = this.ContractorList;
          this.ProcessorList = response[16]; // for ProcessorList
          this.drpProcessorList = this.ProcessorList;
          this.CordinatorList = response[4]; // for CoordinatorList
          this.drpCoordinatorList = this.CordinatorList;
        }
        this.GetReportDropdown();
      });
  }
  GetReportDropdown() {
    this.AdvanceReportModelObj.Type = 1;
    this.xAdvanceReportsServices
      .GetAdvanceReportTypeDetail(this.AdvanceReportModelObj)
      .subscribe(response => {
        //console.log("drd",response);
        if (response.length != 0) {
          this.ReportTypeList = response[0][0];
          this.WOFeildsList = response[0][1][0];
          this.Statuslst = response[0][2][0];
          this.WOFilterList = response[0][3][0];
        }
      });
  }
  ChangeReportType(val) {
    this.AdvanceReportModelObj.GroupById = 0;
    this.AdvanceReportModelObj.StatusId = 0;
    this.AdvanceReportModelObj.InvoiceDateFrom = '';
    this.AdvanceReportModelObj.InvoiceDateTo = '';
    this.AdvanceReportModelObj.ClientId = 0;
    this.AdvanceReportModelObj.CustomerId = 0;
    this.AdvanceReportModelObj.ContractorId = 0;
    this.AdvanceReportModelObj.CordinatorId = 0;
    this.AdvanceReportModelObj.ProcessorId = 0;

    this.isGRVisible = true;
    this.isFLVisible = true;
    if (val == 1) {
      this.isTableVisible = false;
      this.isRowVisible = true;
    } else {
      this.isTableVisible = true;
      this.isRowVisible = false;
    }
    if (val == 2) {
      this.isWTHidden = false;
      this.isStateHidden = true;
    }
    if (val == 3) {
      this.isWTHidden = true;
      this.isStateHidden = false;
    }
  }
  ChangeDataType(val, idx) {
    var selectedList = _.where(this.WOFeildsList, { Wo_Column_PkeyId: val });
    if (selectedList.length > 0) {
      this.WoFilterArrayVal[idx].Report_WO_Filter_Ch_FeildName = selectedList[0].Keydata;
    }

    if (val == 3 || val == 5 || val == 7 || val == 10 || val == 13 || val == 18) {
      this.WoFilterArrayVal[idx].isDateFeild = true;
    } else {
      this.WoFilterArrayVal[idx].isDateFeild = false;
    }
  }
  AddMoreRow() {
    var data = {
      Report_WO_Filter_Ch_FeildId: 0,
      Report_WO_Filter_Ch_FeildOperator: 0,
      Report_WO_Filter_Ch_FeildValue: null,
      Report_WO_Filter_Ch_FeildDateValue: null,
      Report_WO_Filter_Ch_FeildName: null,
      Report_WO_Filter_Ch_PkeyId: 0,
      Report_WO_Filter_Ch_Master_FKeyId: 0,
      isDateFeild: false
    };
    this.WoFilterArrayVal.push(data);
  }
  // remove row
  RemoveRow(itemdata, index) {
    let promp = confirm("Are you sure you want to delete this record..?");
    if (promp) {
      this.WoFilterArrayVal.splice(index, 1);
      if (itemdata.Report_WO_Filter_Ch_PkeyId != 0) {
        this.WOFilterModelObj.Report_WO_Filter_ChId = itemdata.Report_WO_Filter_Ch_PkeyId;
        this.xAdvanceReportsServices
          .DeleteWorkOrderFilterChildData(this.WOFilterModelObj)
          .subscribe(response => {
            //dfebugger;
            this.MessageFlag = "Filter data deleted";
            this.commonMessage();
            this.GetChildFilter(this.AdvanceReportModelObj.WoFilterId);
          })
      }
      else {
        this.WoFilterArrayVal.splice(index, 1);
      }
    }
  }
  // remove Filter
  RemoveFilter(itemdata) {
    let promp = confirm("Are you sure you want to delete this record..?");
    if (promp) {
      this.WOFilterModelObj.Report_WO_Filter_IsDelete = true;
      this.xAdvanceReportsServices
        .PostWorkOrderFilterData(this.WOFilterModelObj)
        .subscribe(res => {
          //dfebugger;
          //console.log('Report Responce',res)
          this.MessageFlag = "Filter data deleted";
          this.commonMessage();
          this.WoFilterArrayVal = [];
          var data = {
            Report_WO_Filter_Ch_FeildId: 0,
            Report_WO_Filter_Ch_FeildOperator: 0,
            Report_WO_Filter_Ch_FeildValue: null,
            Report_WO_Filter_Ch_FeildDateValue: null,
            Report_WO_Filter_Ch_FeildName: null,
            Report_WO_Filter_Ch_PkeyId: 0,
            Report_WO_Filter_Ch_Master_FKeyId: 0,
            isDateFeild: false
          };
          this.WoFilterArrayVal.push(data);
          this.WOFilterModelObj.Report_WO_Filter_Name = null;
          this.WOFilterModelObj.Report_WO_Filter_PkeyId = 0;
          this.GetReportDropdown();
        });
    }
  }
  GetChildFilter(FId) {
    if (FId > 0) {
      this.isdeleteDisable = false;
      this.AdvanceReportModelObj.WoFilterId = FId;
      this.xAdvanceReportsServices
        .GetReportWOFilterChildDetail(this.AdvanceReportModelObj)
        .subscribe(response => {
          //dfebugger;
          //console.log("drd",response);
          if (response.length != 0) {
            this.WoFilterArrayVal = response[0];
            this.WoFilterArrayVal.forEach(element => {
              if (element.Report_WO_Filter_Ch_FeildId == 3 || element.Report_WO_Filter_Ch_FeildId == 5 || element.Report_WO_Filter_Ch_FeildId == 7
                || element.Report_WO_Filter_Ch_FeildId == 10 || element.Report_WO_Filter_Ch_FeildId == 13 || element.Report_WO_Filter_Ch_FeildId == 18) {
                element.isDateFeild = true;
              }
              else {
                element.isDateFeild = false;
              }
            });
            var selectedList = _.where(this.WOFilterList, { Report_WO_Filter_PkeyId: FId });
            if (selectedList.length > 0) {
              this.WOFilterModelObj.Report_WO_Filter_Name = selectedList[0].Report_WO_Filter_Name;
            }
            this.WOFilterModelObj.Report_WO_Filter_PkeyId = FId;
            this.filterbutton = "Update";
            this.isEditDisable = true;
          }
        });
    }
    else {
      this.isdeleteDisable = true;
      this.isEditDisable = false;
      this.filterbutton = "Save";
      this.WoFilterArrayVal = [];
      var data = {
        Report_WO_Filter_Ch_FeildId: 0,
        Report_WO_Filter_Ch_FeildOperator: 0,
        Report_WO_Filter_Ch_FeildValue: null,
        Report_WO_Filter_Ch_FeildDateValue: null,
        Report_WO_Filter_Ch_FeildName: null,
        Report_WO_Filter_Ch_PkeyId: 0,
        Report_WO_Filter_Ch_Master_FKeyId: 0,
        isDateFeild: false
      };
      this.WoFilterArrayVal.push(data);
      this.WOFilterModelObj.Report_WO_Filter_Name = null;
      this.WOFilterModelObj.Report_WO_Filter_PkeyId = 0;
    }

  }
  FormButton() {
    //debugger
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    this.groupByGriddata = [];
    this.showSpinner();
    this.isLoading = true;
    this.button = "Processing";
    let errCnt = 0;
    if (this.AdvanceReportModelObj.ReportTypeId == 0) {
      errCnt++;
    }
    if (this.AdvanceReportModelObj.ReportTypeId == 1 && this.AdvanceReportModelObj.WoFilterId == 0) {
      errCnt++;
    }
    if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.GroupById == 0) {
      errCnt++;
    }
    if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateFrom === '') {
      errCnt++;
    }
    if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateTo === '') {
      errCnt++;
    }
    if (errCnt > 0) {
      this.isLoading = false;
      this.button = "Run Save Report";
      if (this.AdvanceReportModelObj.ReportTypeId == 0) {
        this.isRTInvalid = true;
      }
      if (this.AdvanceReportModelObj.ReportTypeId == 1 && this.AdvanceReportModelObj.WoFilterId == 0) {
        this.isWOFilterInvalid = true;
      }
      if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.GroupById == 0) {
        this.isGroupByInvalid = true;
      }
      if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateFrom === '') {
        this.isFromdateInvalid = true;
      }
      if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateTo === '') {
        this.isTodateInvalid = true;
      }
    } else {
      this.isRTInvalid = false;
      this.isWOFilterInvalid = false;
      this.isGroupByInvalid = false;
      this.isFromdateInvalid = false;
      this.isTodateInvalid = false;
      this.xAdvanceReportsServices
        .GetAdvanceReportDetail(this.AdvanceReportModelObj)
        .subscribe(res => {
          //dfebugger;
          this.isLoading = false;
          this.disableexcel = false;
          this.button = "Run Save Report";
          //console.log('Report Responce',res)
          if (this.AdvanceReportModelObj.ReportTypeId == 1) {
            this.isGRVisible = true;
            this.isFLVisible = false;
            this.groupByGriddata = res[0];
          }
          else {
            this.isFLVisible = true;
            this.isGRVisible = false;
            this.groupByGriddata = res[0];
            this.AdvanceReportModelObj.Total = res[1];
            this.AdvanceReportModelObj.Total = this.AdvanceReportModelObj.Total.toFixed(2);
            this.AdvanceReportModelObj.Average = res[2];
            this.AdvanceReportModelObj.Average = this.AdvanceReportModelObj.Average.toFixed(2);
          }
        });
    }

  }
  SaveFilterButton() {
    // debugger
    this.isFLLoading = true;
    let errCnt = 0;
    this.WoFilterArrayVal.forEach(item => {
      //debugger;
      if (item.Report_WO_Filter_Ch_FeildId == 0) {
        errCnt++;
      }
      if (item.Report_WO_Filter_Ch_FeildOperator == 0) {
        errCnt++;
      }
      if ((item.Report_WO_Filter_Ch_FeildValue == null || item.Report_WO_Filter_Ch_FeildValue === "") && !item.isDateFeild) {
        errCnt++;
      }
      if (item.Report_WO_Filter_Ch_FeildDateValue == null && item.isDateFeild) {
        errCnt++;
      }

    });
    if (this.WOFilterModelObj.Report_WO_Filter_Name == null || this.WOFilterModelObj.Report_WO_Filter_Name === "") {
      errCnt++;
    }
    if (errCnt > 0) {
      this.isWOFilterErr = true;
      this.isWOFilterName = true;
      this.isFLLoading = false;
      this.MessageFlag = "Please fill all required feilds...!";
      this.commonMessage();
    }
    else {
      this.isWOFilterErr = false;
      this.isWOFilterName = false;
      this.WOFilterModelObj.ArrayWOFilter = this.WoFilterArrayVal;
      this.xAdvanceReportsServices
        .PostWorkOrderFilterData(this.WOFilterModelObj)
        .subscribe(res => {
          //dfebugger;
          this.isFLLoading = false;
          //console.log('Report Responce',res)
          if (res[0].length > 0) {
            if (this.WOFilterModelObj.Report_WO_Filter_PkeyId > 0) {
              this.MessageFlag = "Filter data updated";
              this.commonMessage();
            } else {
              this.MessageFlag = "Filter data saved";
              this.commonMessage();
            }
            this.GetReportDropdown();
          }
        });
    }

  }
  statusColor(statusId) {
    if (!statusId) return;
    return getStatusColor(parseInt(statusId));
  }
  CancelClick() {
    window.location.reload();
  }
  contractorFilter(value) {
    if (value != '') {
      this.drpConList = this.ContractorList.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpConList = this.ContractorList.slice();
    }
  }
  coordinatorFilter(value) {
    if (value != '') {
      this.drpCoordinatorList = this.CordinatorList.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpCoordinatorList = this.CordinatorList.slice();
    }
  }
  processorFilter(value) {
    if (value != '') {
      this.drpProcessorList = this.ProcessorList.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpProcessorList = this.ProcessorList.slice();
    }
  }
  ClientFilter(value) {
    var filteredcom = this.ClientList.filter(function (el) {
      return el.Client_Company_Name != null;
    });
    if (value != '') {
      this.drpClientList = filteredcom.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpClientList = this.ClientList.slice();
    }
  }
  CustomerFilter(value) {
    var filtereddata = this.CustomerList.filter(function (el) {
      return el.Cust_Num_Number != null;
    });
    if (value != '') {
      this.drpCustomerList = filtereddata.filter((s) => s.Cust_Num_Number.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpCustomerList = this.CustomerList.slice();
    }
  }
  WTFilter(value) {
    var filtereddata = this.WorkTypeList.filter(function (el) {
      return el.WT_WorkType != null;
    });
    if (value != '') {
      this.drpWTList = filtereddata.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpWTList = this.WorkTypeList.slice();
    }
  }
  statehandleFilter(value) {
    if (value != '') {
      var filtereddata = this.StateList.filter(function (el) {
        return el.IPL_StateName != null;
      });
      this.drpStateList = filtereddata.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpStateList = this.StateList.slice();
    }
  }
  EditForms() {
    this.isEditDisable = false;
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
  blob: any;
  public exportToPDF() {
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";
    let errCnt = 0;
    if (this.AdvanceReportModelObj.ReportTypeId == 0) {
      errCnt++;
    }
    if (this.AdvanceReportModelObj.ReportTypeId == 1 && this.AdvanceReportModelObj.WoFilterId == 0) {
      errCnt++;
    }
    if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.GroupById == 0) {
      errCnt++;
    }
    if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateFrom === '') {
      errCnt++;
    }
    if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateTo === '') {
      errCnt++;
    }
    if (errCnt > 0) {
      this.isLoading = false;
      this.button = "Run Save Report";
      if (this.AdvanceReportModelObj.ReportTypeId == 0) {
        this.isRTInvalid = true;
      }
      if (this.AdvanceReportModelObj.ReportTypeId == 1 && this.AdvanceReportModelObj.WoFilterId == 0) {
        this.isWOFilterInvalid = true;
      }
      if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.GroupById == 0) {
        this.isGroupByInvalid = true;
      }
      if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateFrom === '') {
        this.isFromdateInvalid = true;
      }
      if ((this.AdvanceReportModelObj.ReportTypeId == 2 || this.AdvanceReportModelObj.ReportTypeId == 3) && this.AdvanceReportModelObj.InvoiceDateTo === '') {
        this.isTodateInvalid = true;
      }
    } else {
      this.isRTInvalid = false;
      this.isWOFilterInvalid = false;
      this.isGroupByInvalid = false;
      this.isFromdateInvalid = false;
      this.isTodateInvalid = false;
      this.xAdvanceReportsServices
        .GetAdvanceReportDetailPdf(this.AdvanceReportModelObj)
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
              let GetName = 'AdvanceReport';
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

  }
  // showDetails(event, item) {
  //   var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', item.workOrder_ID);
  //   //this.xRouter.navigate(["/client/clientresultinstruction", btoa(encrypted)]);
  //   let url = "/client/clientresultinstruction/" + btoa(encrypted);
  //   window.open(url, '_blank');
  // }
  getReportDetailsUrl(dataItem) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
    let url = "/client/clientresultinstruction/" + btoa(encrypted);
    return url
    //  window.open(url,'_blank');
  }
  showBox() {
    this.hideBox = !this.hideBox
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

  RunDetails() {
    // debugger
    this.groupByGriddata = [];
    this.AdvanceReportModelObj.ReportTypeId = 9;
    this.AdvanceReportModelObj.FilterData = this.WoFilterArrayVal;
    this.xAdvanceReportsServices
      .GetAdvanceReportDetail(this.AdvanceReportModelObj)
      .subscribe(res => {
        //console.log('mohit',res)
        this.isLoading = false;
        this.disableexcel = false;
        if (this.AdvanceReportModelObj.ReportTypeId == 9) {
          this.isGRVisible = true;
          this.isFLVisible = false;
          this.groupByGriddata = res[0];
          this.AdvanceReportModelObj.ReportTypeId = 1;
        }
      })
  }
}

