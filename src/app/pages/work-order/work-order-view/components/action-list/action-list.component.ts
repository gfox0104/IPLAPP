import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { SaveWorkOrderViewServices } from "../../work-order-view-service";
import { ClientResultsInvoiceModel, Invoice_ClientDTO } from "../../../../client-result/client-results-invoice/client-results-invoice-model";
import { EventEmitterService } from "../../../../../services/access/event-emitter.service";
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { ClientResultOldPhotoServices } from 'src/app/pages/client-result/client-result-photo/client-result-photo-old.service';
import { ClientResultsInvoiceServices } from "../../../../client-result/client-results-invoice/client-results-invoice.service";
import { BindDataModel } from 'src/app/pages/client-result/client-result/client-result-model';
import * as firebase from 'firebase/app';
import md5 from "md5";
import { DataStateChangeEvent, GridComponent, ResponsiveService } from '@progress/kendo-angular-grid';
import { CommonStatusDTO } from 'src/app/pages/client-result/common-client-header/common-status-model';
import { ActionRecurringModel, UpdateStausDataModel } from '../../../new-work-order/new-work-order-model';
import { SaveWorkOrderServices } from '../../../new-work-order/new-work-order.service';
import { FormsMasterServices } from 'src/app/pages/admin/pcr-form/forms-master.service';
import { State } from '@progress/kendo-data-query';
import { ReportsServices } from 'src/app/pages/reports/report-details/report-details.service';
import _ from 'underscore';
import { LiveMapModel } from 'src/app/pages/contractor/live-map/live-map-model';
import * as moment from 'moment';
import { ClientResultPhotoModel } from 'src/app/pages/client-result/client-result-photo/client-result-photo-model';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from "jquery";
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientResultInstructionModel, SigleEditBoxModel } from 'src/app/pages/client-result/client-result-instruction/client-result-instruction-model';
import { ClientResultInstructionServices } from 'src/app/pages/client-result/client-result-instruction/client-result-instruction.service';
@Component({
  selector: 'action-list',
  templateUrl: './action-list.component.html'
})

export class ActionListComponent implements OnInit {
  @Input() data: Array<any>;
  @Input() griddata: Array<any>;

  @Output() update = new EventEmitter();
  @Output() ClientInvoice = new EventEmitter();
  @Output() excelEvent = new EventEmitter();
  @ViewChild('Mapcontent') Mapcontent: ElementRef;
  ClientResultPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  actionList: Array<any>;
  ClientPaymentarr: any;
  title: string;
  formUsrCommonGroup: UntypedFormGroup;
  actionWorkOrderIds: Array<any>;
  actionIPLNOs: Array<any>;
  actionValue = '0';
  type: number;
  blob: any;
  arr: number;
  num: number = 0;
  inNum: number = 0;
  invoiceNum: number = 0;
  instructionNum: number = 0;
  invoiceOderNum: number = 0;
  labelname: string;
  MessageFlag: string;
  isFormSubmit: boolean;
  ContractorList: Array<any>;
  CordinatorList: Array<any>;
  CompanyList: Array<any>;
  WorkTypeList: Array<any>;
  CategoryList: Array<any>;
  BackgroundList: Array<any>;
  ProcessorList: Array<any>;
  uploadSaveUrl = BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground";
  uploadRemoveUrl = "removeUrl";
  myFiles: string[] = [];
  actionarr: any;
  invoiceList = [];
  ClientInvoiceArray = [];
  statusid: any;
  PrintDivcl: boolean = false;
  TaskList: any;
  clientprintArray = [];
  clientPrintContent: any;
  clientsInvoiceObj = [];
  invoiceData: string = "";
  paymentDate: Date;
  amount: number;
  checkNumber: number;
  enteredBy: string;
  comment: string;
  public state: State = {};
  postclientpaymentarr = []
  gridColumns = [
    {
      title: 'IPL No',
      field: 'IPLNO',
      width: '80'
    },
    {
      title: 'Invoice Number',
      field: 'Inv_Client_Invoice_Number',
      width: '80'
    },
    {
      title: 'Total',
      field: 'Inv_Client_Sub_Total',
      width: '100'
    },
    {
      title: 'Amount',
      field: 'Client_Amount',
      width: '100'
    },
    {
      title: 'Comments',
      field: 'Client_Comment',
      width: '200'
    },]
  BindDataModelObj: BindDataModel = new BindDataModel();
  ClientResultsInvoiceModelObj: ClientResultsInvoiceModel = new ClientResultsInvoiceModel();
  Invoice_ClientDTOObj: Invoice_ClientDTO = new Invoice_ClientDTO();
  ActionRecurringModelObj: ActionRecurringModel = new ActionRecurringModel()
  Statuslst: any;
  CommonStatusDTOObj: CommonStatusDTO = new CommonStatusDTO();
  UpdateStausDataModelObj: UpdateStausDataModel = new UpdateStausDataModel();
  public drpConList: Array<string>;
  public drpCoordinatorList: Array<string>;
  public drpProcessorList: Array<string>;
  public drpComList: Array<string>;
  public drpWTList: Array<string>;
  public drpCatList: Array<string>;
  public drpPcrFormList: Array<string>;
  public drpBackgroundProviderList: Array<string>;
  public defaultConItem: { User_FirstName: string, User_pkeyID: number } = { User_FirstName: 'Select', User_pkeyID: 0 };
  public defaultComItem: { Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name: 'Select', Client_pkeyID: 0 };
  public defaultWTItem: { WT_WorkType: string, WT_pkeyID: number } = { WT_WorkType: 'Select', WT_pkeyID: 0 };
  public defaultCatItem: { Cat_Name: string, Cat_ID: number } = { Cat_Name: 'Select', Cat_ID: 0 };
  public defaultPcrItem: { FormName: string, FormId: number } = { FormName: 'Select', FormId: 0 };
  public defaultProviderItem: { Back_Chk_ProviderName: string, Back_Chk_ProviderID: number } = { Back_Chk_ProviderName: 'Select', Back_Chk_ProviderID: 0 };
  decuserr: any;
  prompMessage: string;
  isDrpValid = false;
  isMessage = false;
  congridData: any;
  unflag: Array<any>;
  conpaymentDate: Date = new Date();;
  concheckNumber: number;
  locations = [];
  mapLat: number = 37.0902//7.119082288502541//37.0902;
  mapLong: number = -95.7129//-73.120029012106//-95.7129;

  Recurs_PeriodList = [
    { Id: 0, Name: "Select" },
    { Id: 1, Name: "Day(s)" },
    { Id: 2, Name: "Week(s)" },
    { Id: 3, Name: "Month(s)" }
  ];
  RecivedDateArray = [];
  DueDateArray = [];
  ClientResultInstructionModelObj: ClientResultInstructionModel = new ClientResultInstructionModel();
  SigleEditBoxModelObj: SigleEditBoxModel = new SigleEditBoxModel();
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private EncrDecr: EncrDecrService,
    private xdatabase: AngularFireDatabase,
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
    private eventEmitterService: EventEmitterService,
    private modalService: NgbModal,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private xClientResultsInvoiceServices: ClientResultsInvoiceServices,
    private xSaveWorkOrderServices: SaveWorkOrderServices,
    private formsMasterServices: FormsMasterServices,
    private xReportsServices: ReportsServices,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private xClientResultInstructionServices: ClientResultInstructionServices,
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuserr = JSON.parse(decval);
    }

  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
    });

    this.actionList = this.data[0];
    this.CompanyList = this.data[3][0];
    this.drpComList = this.CompanyList;

    this.WorkTypeList = this.data[3][1];
    this.drpWTList = this.WorkTypeList;

    this.CategoryList = this.data[3][2];
    this.drpCatList = this.CategoryList;

    this.ContractorList = this.data[3][5];
    this.drpConList = this.ContractorList;

    this.ProcessorList = this.data[3][6];
    this.drpProcessorList = this.ProcessorList;

    this.CordinatorList = this.data[3][7];
    this.drpCoordinatorList = this.CordinatorList;

    this.BackgroundList = this.data[3][8];
    this.drpBackgroundProviderList = this.BackgroundList;

    this.GetStatusDropDown();
    this.GetFBFormTemplateData();
    // console.log('this.actionList', this.actionList)
  }

  actionChanges(item, content) {
    // debugger;

    this.isFormSubmit = true;

    if (item.Wo_Column_PkeyId === 43 || item.Wo_Column_PkeyId === 44 || item.Wo_Column_PkeyId === 158) this.isFormSubmit = false;



    this.title = item.Wo_Column_Name;
    this.labelname = item.Wo_Column_Name;
    this.arr = item.Wo_Column_PkeyId;

    this.type = item.Type;
    this.actionarr = this.griddata.filter(item => item.chkdata);
    this.actionWorkOrderIds = this.actionarr.map(action => {
      return {
        WorkOrderID: action.workOrder_ID
      }
    });
    this.actionIPLNOs = this.actionarr.map(action => {
      return {
        IPLNO: action.IPLNO,
        WorkOrder_Id:action.workOrder_ID
      }
    });

    localStorage.setItem("woArray", JSON.stringify(this.actionWorkOrderIds));
    if (item.Wo_Column_PkeyId === 42) {
      this.isFormSubmit = false;
      this.isMessage = true;
      this.actionValue = "";
    }
    if (item.Wo_Column_PkeyId === 52) {
      this.GetConInvoiceData();
    }
    if (item.Wo_Column_PkeyId === 50) {
      let param = {
        FilterData: JSON.stringify(this.actionWorkOrderIds),
        Type: 1
      }
      this.xSaveWorkOrderViewServices.GetMultipleClientInvoicepayment(param)
        .subscribe(response => {
          this.ClientPaymentarr = response[0];
          // console.log('client payment', response)
        })
    }
    if (item.Wo_Column_PkeyId === 56) {

      this.downloadphoto();
    }
    else if (item.Wo_Column_PkeyId === 54) {
      // debugger

      this.actionarr = this.griddata.filter(item => item.chkdata);

      for (let i = 0; i < this.actionarr.length; i++) {

        this.Invoice_ClientDTOObj.Inv_Client_WO_Id = this.actionarr[i].workOrder_ID;
        this.Invoice_ClientDTOObj.Type = 1;
        this.xClientResultsInvoiceServices
          .GetClientDetailPdf(this.Invoice_ClientDTOObj)
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
                let GetName = 'Client_' + this.actionarr[i].workOrderNumber;
                if (GetName != null) {
                  link.download = GetName + '.pdf';
                }
                link.click();

              } else {
              }
            }

          })
      }








    }
    else if (item.Wo_Column_PkeyId === 53) {


      this.actionWorkOrderIds.forEach(element => {
        const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.WorkOrderID);
        let url = "client/client-result-instruction-print/" + btoa(encrypted);
        window.open(url, '_blank');
      });



    }
    else if (item.Wo_Column_PkeyId === 58) {


    }
    if ((this.arr == 48 || this.arr == 49 || this.arr == 118) && this.actionarr.length > 10) {
      this.MessageFlag = "Please select a maximum of 10 records only..!";
      this.commonMessageModal();
      // alert(this.MessageFlag);
    }

    else {
      this.commonMessage(content);
    }

  }
  // let invoiceData = "";
  invoiceTemplate(data) {
    this.invoiceOderNum++;
    let invoiceInfo = "";

    invoiceInfo += "<div style='display: block; page-break-before: always;'><div><table style='width: 100%'><tr><td colspan='6'>";
    if (data[0] != null) {
      if (data[0].length > 0) {
        invoiceInfo += data[0][0].Ipl_companyname + "<br>" + data[0][0].Ipl_IPLAddress + "<br>" + data[0][0].Ipl_IPLcity + " " + data[0][0].Ipl_IPLstate + " " + data[0][0].Ipl_IPLZip + "<br>" + data[0][0].IPLContactnumber + "<br><br>";
      }
    }
    if (data[1] != null) {
      if (data[1].length > 0) {
        invoiceInfo += "<div>" + data[1][0].ClientName + "<br>" + data[1][0].ClientAddress + "</div></td>";
      }
    }
    invoiceInfo += "<td style='text-align: right'> <table border='1px' style='width: 100%;'><tr><th style='background-color: #000003;'>Invoice Date</th><th style='background-color: #000003;'>Invoice #</th><tr>";
    if (data[3] != null) {
      if (data[3].length > 0) {
        invoiceInfo += "<td>" + data[3][0].Inv_Client_Inv_Date + "</td>";
        invoiceInfo += "<td>" + data[3][0].Inv_Client_Invoice_Number + "</td>";
      }
    }
    invoiceInfo += "</tr></table></td></tr><tr><td colspan='5'></td><td colspan='2'><table border='1px' style='width: 100%; border: 1px solid black;'>";
    invoiceInfo += "<tr><th style='text-align: center;background-color: #000003;'>Work Order Info</th></tr><tr>";
    if (data[1] != null) {
      if (data[1].length > 0) {
        invoiceInfo += "<td style='border: 1px;'>WO #: " + data[1][0].workOrderNumber + "<br>Loan #: " + data[1][0].Loan_Number + "<br>" + data[1][0].ClientAddress + "</td>"
      }
    }
    invoiceInfo += "</tr></table></tr></table></div><br><br><br><div><table border='1px' style='width: 100%;'>";
    invoiceInfo += "<th style='text-align:left; background-color: #000003;'>Description </th>";
    invoiceInfo += "<th style='text-align:left; background-color: #000003;'>Qty </th>";
    invoiceInfo += "<th style='text-align:left; background-color: #000003;'>Price</th>";
    invoiceInfo += "<th style='text-align:left; background-color: #000003;'>Disc</th>";
    invoiceInfo += "<th style='text-align:left; background-color: #000003;'>Total</th>";
    if (data[2] != null) {
      if (data[2].length > 0) {
        data[2].forEach(row => {
          invoiceInfo += "<tr><td>" + row.Task_Name + "</td>";
          invoiceInfo += "<td>" + row.Inv_Client_Ch_Qty + "</td>";
          invoiceInfo += "<td>" + row.Inv_Client_Ch_Price + "</td>";
          invoiceInfo += "<td>" + row.Inv_Client_Ch_Discount + "</td>";
          invoiceInfo += "<td>" + row.Inv_Client_Ch_Total + "</td></tr>";
        });
      }
    }
    invoiceInfo += "<tr><td colspan='4' style='text-align:left;background-color: #000003;'>Total</td>";
    if (data[3] != null) {
      if (data[3].length > 0) {
        invoiceInfo += "<td style='text-align:left'>" + data[3][0].Inv_Client_Sub_Total + "</td>";
      }
    }
    invoiceInfo += "</tr></table></div></div>";

    this.invoiceData += invoiceInfo;
    if (this.invoiceOderNum == this.invoiceNum) {
      this.printInvoice();
    }
  }

  printInvoice() {
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><body onload="window.print()">' + this.invoiceData + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 10);
  }

  instructionTemplate(data) {




  }
  ActionFormButton() {
     debugger;
    this.isDrpValid = false;
    // debugger;
    let errCount = 0;
    if (this.arr === 45 && this.actionValue === "0") {
      errCount = errCount + 1;
    }
    if (this.arr === 31 && this.actionValue === "0") {
      errCount = errCount + 1;
    }
    if (this.arr === 32 && this.actionValue === "0") {
      errCount = errCount + 1;
    }
    if (this.arr === 33 && this.actionValue === "0") {
      errCount = errCount + 1;
    }
    if (this.arr === 47 && this.actionValue === "0") {
      errCount = errCount + 1;
    }
    if (errCount > 0) {
      this.isDrpValid = true;
      return;
    } else {
      this.isDrpValid = false;
      if(this.arr==31)
      {
        this.prompMessage = "Are you sure you want to assign this contractor..?";
      }
      else if(this.arr==32)
      {
        this.prompMessage = "Are you sure you want to assign this coordinator..?";
      }
      else if(this.arr==33)
      {
        this.prompMessage = "Are you sure you want to assign this processor..?";
      }
      else if(this.arr==34)
      {
        this.prompMessage = "Are you sure you want to change client company..?";
      }
      else if(this.arr==35)
      {
        this.prompMessage = "Are you sure you want to change work type..?";
      }
      else if(this.arr==36)
      {
        this.prompMessage = "Are you sure you want to change due date..?";
      }
      else if(this.arr==37)
      {
        this.prompMessage = "Are you sure you want to change start date..?";
      }
      else if(this.arr==38)
      {
        this.prompMessage = "Are you sure you want to change client due date..?";
      }
      else if(this.arr==39)
      {
        this.prompMessage = "Are you sure you want to change recurring order..?";
      }
      else if(this.arr==40)
      {
        this.prompMessage = "Are you sure you want to change comment..?";
      }
      else if(this.arr==41)
      {
        this.prompMessage = "Are you sure you want to change estimated date..?";
      }
      else if(this.arr==45)
      {
        this.prompMessage = "Are you sure you want to change Category..?";
      }
      else if(this.arr==46)
      {
        this.prompMessage = "Are you sure you want to change background provider..?";
      }
      else if(this.arr==47)
      {
        this.prompMessage = "Are you sure you want to assign this form..?";
      }
      else if(this.arr==48)
      {
        this.prompMessage = "Are you sure you want to update work order cancel status..?";
      }
      else if(this.arr==49)
      {
        this.prompMessage = "Are you sure you want to update work order delete status..?";
      }
      else if(this.arr==50)
      {
        this.prompMessage = "Are you sure you want to paid client invoice ..?";
      }
      else if(this.arr==51)
      {
        this.prompMessage = "Are you sure you want to change write off invoice..?";
      }
      else if(this.arr==52)
      {
        this.prompMessage = "Are you sure you want to paid mark contractor invoice..?";
      }
      else if (this.arr === 118) {
        this.prompMessage = " Are you sure you want to change Status..?";
      }
      else {
        this.prompMessage = "Are you sure..?";
      }
      let promp = confirm(this.prompMessage);
      let param = {
        Arr_WorkOrderID: JSON.stringify(this.actionWorkOrderIds),
        Arr_IPLNO: JSON.stringify(this.actionIPLNOs),
        WorkOrder_Action: this.actionValue,
        Type: this.type
      }
      let message = {
        message: this.actionValue,
        id: JSON.stringify(this.actionIPLNOs)
      }
      // console.log(param);

      if (!promp) return;
      if (this.arr === 42) {
        let msgList = [];
        let logged_in_user = localStorage.getItem('UserName');
        let name = this.decuserr[0].User_FirstName + " " + this.decuserr[0].User_LastName;
        //this.SentMessage(message);
        this.actionIPLNOs.forEach(element => {
          let data = {
            message: param.WorkOrder_Action.toString(),
            from: logged_in_user,
            time: "",
            //time : firebase.database.ServerValue.TIMESTAMP.toString(),
            avatar: `http://gravatar.com/avatar/${md5(logged_in_user)}?d=identicon`,
            name: name,
            threadtype: "internal",
            threadid: "0_internal",
            status: "unread",
            IPLNo: element.IPLNO,
          }
          msgList.push(data);
        });
        this.xSaveWorkOrderViewServices.AddFirebaseWoMessage(msgList)
          .subscribe(response => {
            if (response.length > 0) {
              this.MessageFlag = "Message sent Successfully...!";
              this.defaultModal();
            }
          })

      }
      else if (this.arr === 53) {

      }
      else if (this.arr === 118) {
        if (param.WorkOrder_Action === '0')
          return;
        let User = JSON.parse(localStorage.getItem('usertemp_'));
        this.actionWorkOrderIds.forEach(element => {
          this.UpdateStausDataModelObj.workOrder_ID = element.WorkOrderID;
          this.UpdateStausDataModelObj.status = (param.WorkOrder_Action).toString();
          this.UpdateStausDataModelObj.UserId = User[0].User_pkeyID;
          this.UpdateStausDataModelObj.Type = 1;
          this.xSaveWorkOrderServices.Workorderstatus(this.UpdateStausDataModelObj)
            .subscribe(response => {
            });
        });
        this.MessageFlag = "Record has been Updated...!";
        this.defaultModal();
      }
      else if (this.arr === 47) {
        if (param.WorkOrder_Action === '0')
          return;

        this.actionWorkOrderIds.forEach(element => {
          this.formsMasterServices.AddFormWoRelation(param.WorkOrder_Action, element.WorkOrderID)
            .subscribe(response => {
              this.MessageFlag = "Record has been Updated...!";
              this.defaultModal();
            });
        });

      }
      else if (this.arr === 52) {
        let paymentObjList = [];

        var selectedpaymentList = this.congridData.filter(function (el) {
          return el.Pay_Amount > 0;
        });
        if (selectedpaymentList.length > 0) {
          selectedpaymentList.forEach(element => {
            let obj =
            {
              Con_Pay_PkeyId: 0,
              Con_Pay_Invoice_Id: element.Inv_Con_pkeyId,
              Con_Pay_Wo_Id: element.Inv_Con_Wo_ID,
              Con_Pay_Payment_Date: this.conpaymentDate,
              Con_Pay_Amount: element.Pay_Amount,
              Con_Pay_CheckNumber: this.concheckNumber.toString(),
              Con_Pay_Comment: element.Pay_Comment,
              Con_Pay_EnteredBy: 0,
              Con_Pay_Balance_Due: null,
              Con_Pay_IsActive: true,
              Con_Pay_IsDelete: 0,
              UserID: 0,
              Type: 1
            }
            paymentObjList.push(obj);
          });
          this.xReportsServices.PaymentListPost(paymentObjList, true)
            .subscribe(response => {
              //dfebugger;
              //console.log(response);
              this.MessageFlag = "Contractor payment successfully completed...!";
              this.defaultModal();
            });
        }
      }
      else if (this.arr === 50) {
        this.postclientpaymentarr = [];
        var selectedpaymentList = this.ClientPaymentarr.filter(function (el) {
          return el.Client_Amount > 0;
        });
        if (selectedpaymentList.length > 0) {
          selectedpaymentList.forEach(element => {
            let param = {
              Client_Pay_PkeyId: 0,
              Client_Pay_Wo_Id: element.Inv_Client_WO_Id,
              Client_Pay_Payment_Date: this.paymentDate,
              Client_Pay_Amount: element.Client_Amount,
              Client_Pay_CheckNumber: this.checkNumber.toString(),
              Client_Pay_Comment: element.Client_Comment,
              Client_Pay_Invoice_Id: element.Inv_Client_pkeyId,
              Client_Pay_EnteredBy: 0,
              Client_Pay_Balance_Due: null,
              Client_Pay_IsActive: true,
              Client_Pay_IsDelete: 0,
              UserID: 0,
              Type: 1,
            }
            this.postclientpaymentarr.push(param);
          });
          this.xReportsServices.PaymentListPost(this.postclientpaymentarr, false)
            .subscribe(res => {
              // console.log('res', res)
              this.MessageFlag = "Client payment successfully completed...!";
              this.defaultModal();
            });
        }
      }
      else if (this.arr === 39) {
        this.PostRecuredWoData();
      }
      else {
        this.xSaveWorkOrderViewServices.multiActionsWorkOrder(JSON.stringify(param))
          .subscribe(response => {
            //dfebugger;
            if (response[0] == 1) {
              this.MessageFlag = "Record has been Updated...!";
              this.defaultModal();
            }
          })
      }
    }

  }   

  messages: string;
  async SentMessage(item) {
    let name = this.decuserr[0].User_FirstName + " " + this.decuserr[0].User_LastName;
    let IPLNOs = JSON.parse(item.id);
    this.messages = item.message;
    let messageRef = this.xdatabase.database.ref("messages");
    if (this.messages.length > 0) {
      if (localStorage.getItem('UserName') != '') {

        let logged_in_user = localStorage.getItem('UserName');
        let messageId = (await messageRef.push()).key;
        let message = {
          message: this.messages,
          from: logged_in_user,
          time: firebase.database.ServerValue.TIMESTAMP,
          avatar: `http://gravatar.com/avatar/${md5(logged_in_user)}?d=identicon`,
          name: name
        }

        if (IPLNOs.length >= 50) {
          alert("It's available to send message to 50 client maximum!")
        }
        else {
          IPLNOs.forEach(IPL => {
            messageRef
              .child(IPL.IPLNO)
              .child(messageId)
              .update(message)
              .then(() => console.log("Message added"))
              .catch((err) => console.error("Error while entering text: ", err));
          });
          this.setLastUpdate(IPLNOs)
        }

      }
    }

  }
  setLastUpdate(data) {
    let userRef = this.xdatabase.database.ref("users");
    if (localStorage.getItem('UserName') != '') {
      let logged_in_user = localStorage.getItem('UserName');
      data.forEach(IPL => {
        userRef.child(logged_in_user)
          .child("groups")
          .child(IPL.IPLNO)
          .set({
            lastUpdate: firebase.database.ServerValue.TIMESTAMP,
            IPLNO: IPL.IPLNO,
          }).then(() => { })
          .catch(err => { });
      });

    }
  }
  commonMessage(content) {
    // debugger
    //console.log(content);
    let modelSize: string = 'sm';
    if (this.arr === 42 ||this.arr === 43 || this.arr === 44 || this.arr === 57 || this.arr === 52 || this.arr === 50 || this.arr === 158) {

      if(this.actionarr.length==1)
      {
        // debugger

      }

      modelSize = 'lg';
      this.modalService
        .open(content, { windowClass: "xlModal" })
        .result.then(result => { }, reason => { });
    }
    else if (this.arr == 56 || this.arr == 54) {
      this.modalService.dismissAll();
    }
    else if (this.arr === 58) {
      // debugger;

      // That changes was done as per requirement first user location was showing now work order location

      this.locations = this.actionarr.map(action => {
        return {
          Latitude: action.gpsLatitude,
          Longitude: action.gpsLongitude,
          WO_Number:action.workOrderNumber,
          IPLNO:action.IPLNO,
          Address:action.address1,
          workOrder_ID:action.workOrder_ID,
        }
      });
      this.modalService.open(this.Mapcontent, { windowClass: "lgModal" }).result.then(result => { }, reason => { });

      // let param = {
      //   Arr_WorkOrderID: JSON.stringify(this.actionWorkOrderIds),
      //   Arr_IPLNO: JSON.stringify(this.actionIPLNOs),
      //   WorkOrder_Action: this.actionValue,
      //   Type: this.type
      // }

      // this.xSaveWorkOrderViewServices.GetLiveRouteLocationData(JSON.stringify(param))
      //   .subscribe(response => {
      //     debugger;
      //     if (response.length > 0) {
      //       this.locations = response;
      //     }
      //     modelSize = 'lg';
      //     this.modalService
      //       .open(this.Mapcontent, { windowClass: "xlModal" })
      //       .result.then(result => { }, reason => { });
      //   });
    }
    else if (this.arr === 55) {
      this.excelEvent.emit();
    }
    else if (this.arr == 40) {
      this.GetInstuctionDataMain(this.actionWorkOrderIds[0].WorkOrderID,content);
      this.modalService.open(content, { size: "lg", ariaLabelledBy: "modal-basic-title" }).result.then(result => { }, reason => { });
    }
    else {
      this.modalService.open(content);
    }

  }

  defaultModal() {
    debugger
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Close';
    modalRef.result.then(result => { }, reason => {
      this.modalService.dismissAll();
       window.location.reload();
    });
    
    this.update.emit();
    this.actionValue = undefined;

  }

  commonMessageModal() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Close';
    modalRef.result.then(result => { }, reason => {this.modalService.dismissAll();});
  }


  actionAddTaskInstruction(data) {
    // debugger
    let param = {
      WorkOrder_ID_Data: JSON.stringify(this.actionWorkOrderIds),
      Task_Instruction_Data: data
    };

    //(JSON.stringify(param));

    if(this.arr==43)
    {
      this.prompMessage="Are you sure to save those tasks..?";
    }
    else
    {
      this.prompMessage="Are you sure to save those Instructions..?";
    }

    let promp = confirm(this.prompMessage);
    if (!promp) return;

    this.xSaveWorkOrderViewServices.multiActionsTaskInst(JSON.stringify(param))
      .subscribe(response => {
        if (response[0].Status == 1) {
          this.MessageFlag = "Record has been Updated...!";
          this.defaultModal();
        }
      });
  }

  public displayErrorDocument(e: ErrorEvent) {
  }

  public displaySuccessDocument(e) {
    if (e.operation == "upload") {
      this.processDocument(e.files[0].rawFile);
    } else {
      alert("remove img called");
    }
  }

  processDocument(documentInput) {
    // //dfebugger

    if (true) {
      this.BindDataModelObj.WorkOrder_ID_Data = JSON.stringify(this.actionWorkOrderIds);
      this.BindDataModelObj.IPLNO = '202348';
      this.BindDataModelObj.Client_Result_Photo_Ch_ID = 0;
      this.BindDataModelObj.Client_Result_Photo_ID = 0;
      this.BindDataModelObj.Client_PageCalled = 7;
      this.BindDataModelObj.documentx = documentInput;
      this.BindDataModelObj.Client_Result_Photo_FileName = documentInput.name;
      this.BindDataModelObj.Type = 1;
      this.xClientResultOldPhotoServices
        .CommonDocumentsUpdate(this.BindDataModelObj)
        .then((res) => {
          res.subscribe(() => { });

        });
    }
  }
  downloadphoto() {


    this.spinner.show();
    for (let i = 0; i < this.actionarr.length; i++) {
      var selectedWo = _.where(this.griddata, { workOrder_ID: this.actionarr[i].workOrder_ID });

      if (selectedWo.length > 0 && selectedWo[0].photocount > 0) {
        let param = {
          WoId: this.actionarr[i].workOrder_ID,
          WoNum: this.actionarr[i].workOrderNumber,
          address: this.actionarr[i].address1,
        }

        this.GetClientImages(param)
















      }
      else {

      }

    }
  }
  GetStatusDropDown() {
    this.CommonStatusDTOObj.Status_ID = 0;
    this.CommonStatusDTOObj.Type = 2;
    this.xClientResultsInvoiceServices
      .DropdownGetStatus(this.CommonStatusDTOObj)
      .subscribe(response => {
        this.Statuslst = response[0];
      })
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
  companyFilter(value) {
    var filteredcom = this.CompanyList.filter(function (el) {
      return el.Client_Company_Name != null;
    });
    if (value != '') {
      this.drpComList = filteredcom.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpComList = this.CompanyList.slice();
    }
  }
  WTFilter(value) {
    var filteredwt = this.WorkTypeList.filter(function (el) {
      return el.WT_WorkType != null;
    });
    if (value != '') {
      this.drpWTList = filteredwt.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpWTList = this.WorkTypeList.slice();
    }
  }
  CatFilter(value) {
    //dfebugger;
    var filteredwt = this.CategoryList.filter(function (el) {
      return el.Cat_Name != null;
    });
    if (value != '') {
      this.drpCatList = filteredwt.filter((s) => s.Cat_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpCatList = this.CategoryList.slice();
    }
  }
  GetFBFormTemplateData() {
    this.formsMasterServices.GetformsMaster(5).subscribe(res => {
      this.drpPcrFormList = res[0];
    });

  }

  GetConInvoiceData() {
    this.xSaveWorkOrderViewServices.GetWoContractorInvoice(this.actionWorkOrderIds)
      .subscribe(response => {
        if (response[0].length > 0) {
          this.state.take = 15;
          this.state.skip = 0;
          this.congridData = response[0];
        }
        else {
          this.state.take = 15;
          this.state.skip = 0;
          this.congridData = [];
        }
      });

  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  public exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
  }

  PostRecuredWoData() {
    // debugger
    var recWo = [];

    this.actionWorkOrderIds.forEach(element => {

      var selectedWo = _.where(this.griddata, { workOrder_ID: element.WorkOrderID });
      if (selectedWo.length > 0) {
        this.ActionRecurringModelObj.dueDate = selectedWo[0].dueDate;
      }

      // Dates Calculattion Start
      this.RecivedDateArray = [];
      this.DueDateArray = [];

      if (this.ActionRecurringModelObj.Received_Date != null && this.ActionRecurringModelObj.Received_Date != '' && this.ActionRecurringModelObj.Received_Date != undefined && this.ActionRecurringModelObj.Recurs_Day > 0 && this.ActionRecurringModelObj.Recurs_Period > 0) {
        var arrayDate = this.ActionRecurringModelObj.Received_Date;
        arrayDate = new Date(new Date(arrayDate).toDateString());

        var endDate = new Date(new Date().toDateString());
        endDate.setMonth(endDate.getMonth() + 12);

        var addDays = 0;
        if (this.ActionRecurringModelObj.Recurs_Period == 1) {
          addDays = parseInt(this.ActionRecurringModelObj.Recurs_Day);
        }
        else if (this.ActionRecurringModelObj.Recurs_Period == 2) {
          addDays = 7 * this.ActionRecurringModelObj.Recurs_Day
        }

        if (this.ActionRecurringModelObj.Recurs_Period == 1 || this.ActionRecurringModelObj.Recurs_Period == 2) { // Days  // Week
          if (this.ActionRecurringModelObj.Recurs_CutOffDate != undefined) {
            var newArrayDate = new Date(arrayDate);
            this.RecivedDateArray.push(newArrayDate);
            var cutDate = new Date(new Date(this.ActionRecurringModelObj.Recurs_CutOffDate).toDateString());

            while (arrayDate < cutDate) {
              arrayDate.setDate(arrayDate.getDate() + addDays);
              if (this.ActionRecurringModelObj.Recurs_Limit > 0) {
                var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
                if (selectedCom.length >= this.ActionRecurringModelObj.Recurs_Limit) {
                  arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
                }
              }
              var newDate = new Date(arrayDate);
              if (newDate < cutDate) {
                this.RecivedDateArray.push(newDate);
              }
            }
          }
          else {
            var newArrayDate = new Date(arrayDate);
            this.RecivedDateArray.push(newArrayDate);
            while (arrayDate < endDate) {
              arrayDate.setDate(arrayDate.getDate() + addDays);
              if (this.ActionRecurringModelObj.Recurs_Limit > 0) {
                var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
                if (selectedCom.length >= this.ActionRecurringModelObj.Recurs_Limit) {
                  arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
                }
              }
              var newDate = new Date(arrayDate);
              this.RecivedDateArray.push(newDate);
            }
          }

        }
        else if (this.ActionRecurringModelObj.Recurs_Period == 3) { // Month
          if (this.ActionRecurringModelObj.Recurs_CutOffDate != undefined) {
            var newArrayDate = new Date(arrayDate);
            this.RecivedDateArray.push(newArrayDate);
            var cutDate = new Date(new Date(this.ActionRecurringModelObj.Recurs_CutOffDate).toDateString());

            while (arrayDate < cutDate) {
              arrayDate.setMonth(arrayDate.getMonth() + parseInt(this.ActionRecurringModelObj.Recurs_Day));
              if (this.ActionRecurringModelObj.Recurs_Limit > 0) {
                var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
                if (selectedCom.length >= this.ActionRecurringModelObj.Recurs_Limit) {
                  arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
                }
              }
              var newDate = new Date(arrayDate);
              if (newDate < cutDate) {
                this.RecivedDateArray.push(newDate);
              }
            }
          }
          else {
            var newArrayDate = new Date(arrayDate);
            this.RecivedDateArray.push(newArrayDate);
            while (arrayDate < endDate) {
              arrayDate.setMonth(arrayDate.getMonth() + parseInt(this.ActionRecurringModelObj.Recurs_Day));
              if (this.ActionRecurringModelObj.Recurs_Limit > 0) {
                var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
                if (selectedCom.length >= this.ActionRecurringModelObj.Recurs_Limit) {
                  arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
                }
              }
              var newDate = new Date(arrayDate);
              this.RecivedDateArray.push(newDate);
            }
          }

        }
      }
      if (this.ActionRecurringModelObj.dueDate != null && this.ActionRecurringModelObj.dueDate != '' && this.ActionRecurringModelObj.dueDate != undefined && this.ActionRecurringModelObj.Recurs_Day > 0 && this.ActionRecurringModelObj.Recurs_Period > 0) {
        var ReceivedarrayDate = this.ActionRecurringModelObj.Received_Date;
        ReceivedarrayDate = new Date(new Date(ReceivedarrayDate).toDateString());

        var arrayDate = this.ActionRecurringModelObj.dueDate;
        arrayDate = new Date(new Date(arrayDate).toDateString());
        var today = new Date(new Date().toDateString());
        var endDate = new Date(new Date().toDateString());
        endDate.setMonth(endDate.getMonth() + 12);

        var addDays = 0;
        if (this.ActionRecurringModelObj.Recurs_Period == 1) {
          addDays = parseInt(this.ActionRecurringModelObj.Recurs_Day);
        }
        else if (this.ActionRecurringModelObj.Recurs_Period == 2) {
          addDays = 7 * this.ActionRecurringModelObj.Recurs_Day
        }

        if (this.ActionRecurringModelObj.Recurs_Period == 1 || this.ActionRecurringModelObj.Recurs_Period == 2) { // Days  // Week
          var newArrayDate = new Date(arrayDate);
          if (newArrayDate > ReceivedarrayDate) {
            this.DueDateArray.push(newArrayDate);
          }
          while (arrayDate < endDate) {
            arrayDate.setDate(arrayDate.getDate() + addDays);
            if (this.ActionRecurringModelObj.Recurs_Limit > 0) {
              var selectedCom = this.DueDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
              if (selectedCom.length >= this.ActionRecurringModelObj.Recurs_Limit) {
                arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
              }
            }
            var newDate = new Date(arrayDate);
            if (newDate > ReceivedarrayDate) {
              this.DueDateArray.push(newDate);
            }

          }

        }
        else if (this.ActionRecurringModelObj.Recurs_Period == 3) { // Month
          var newArrayDate = new Date(arrayDate);
          if (newArrayDate > ReceivedarrayDate) {
            this.DueDateArray.push(newArrayDate);
          }
          while (arrayDate < endDate) {
            arrayDate.setMonth(arrayDate.getMonth() + parseInt(this.ActionRecurringModelObj.Recurs_Day));
            if (this.ActionRecurringModelObj.Recurs_Limit > 0) {
              var selectedCom = this.DueDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
              if (selectedCom.length >= this.ActionRecurringModelObj.Recurs_Limit) {
                arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
              }
            }
            var newDate = new Date(arrayDate);
            if (newDate > ReceivedarrayDate) {
              this.DueDateArray.push(newDate);
            }
          }

        }
      }
      // Dates Calculattion End

      var recTmpArray = [];
      this.RecivedDateArray.forEach(element => {
        var trnsDate = moment(element.toString()).format('MM/DD/yyyy');
        recTmpArray.push(trnsDate);
      });

      var dueTmpArray = [];
      if (this.DueDateArray.length > 0) {
        for (let i = 0; i < this.RecivedDateArray.length; i++) {
          if (this.RecivedDateArray[i + 1] != undefined) {

            var selectedCom = this.DueDateArray.filter(
              (s) => s > this.RecivedDateArray[i] && s < this.RecivedDateArray[i + 1]
            );

            if (selectedCom.length > 0) {
              var trnsDate = moment(selectedCom[0].toString()).format('MM/DD/yyyy');
              dueTmpArray.push(trnsDate);
            }
            else {
              var trnsDate = moment(this.DueDateArray[0].toString()).format('MM/DD/yyyy');
              dueTmpArray.push(trnsDate);
            }
          }
          else {
            var selectedCom = this.DueDateArray.filter(
              (s) => s >= this.RecivedDateArray[i]);

            if (selectedCom.length > 0) {
              var trnsDate = moment(selectedCom[0].toString()).format('MM/DD/yyyy');
              dueTmpArray.push(trnsDate);
            }
            else {
              var trnsDate = moment(this.DueDateArray[0].toString()).format('MM/DD/yyyy');
              dueTmpArray.push(trnsDate);
            }
          }

        }
      }
      let data = {
        Recurs_ReceivedDateArray: recTmpArray,
        Recurs_DueDateArray: dueTmpArray,
        WorkOrderID: element.WorkOrderID,
        Recurring: true,
        Recurs_Day: this.ActionRecurringModelObj.Recurs_Day,
        Recurs_Period: this.ActionRecurringModelObj.Recurs_Period,
        Recurs_Limit: this.ActionRecurringModelObj.Recurs_Limit,
        Recurs_CutOffDate: this.ActionRecurringModelObj.Recurs_CutOffDate,

      }
      recWo.push(data);
    });

    this.xSaveWorkOrderServices.PostRecuredWorkOrder(recWo)
      .subscribe(response => {
        // console.log('response', response)
        this.MessageFlag = "Workorder Recurring successfully completed...!";
        this.defaultModal();
      });


  }


  //////////////
  ModelObj: any;
  GetClientImages(val) {
    //debugger

    this.ClientResultPhotoModelObj.Client_Result_Photo_ID = 0;
    this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID = val.WoId;

    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataMaster(this.ClientResultPhotoModelObj)
      .subscribe(response => {
        //debugger
        this.unflag = response[0];
        // console.log('this.unflag', this.unflag)

        if (this.unflag.length>0) {
          this.createZip(val);
        }

      });
  }

  async createZip(val) {
    // debugger
    const zip = new JSZip();
    const zipName = val.WoNum + "_" + val.address.replace(/\s+/g, '_') + '_ipl.zip'
    let allPhotos: Array<any> = [];
    allPhotos = this.unflag.map(photo => { return photo });


    const promises = allPhotos.map(photo => {
      //debugger
      return this.getFile(photo.Client_Result_Photo_FilePath);
    })

    await Promise.all(promises).then((files) => {
      files.forEach((file: any, i) => {
        const b: any = new Blob([file], { type: '' + file.type + '' });

        zip.file(allPhotos[i].Client_Result_Photo_FileName, b);

      })
      zip.generateAsync({ type: 'blob' }).then((content) => {
        if (content) {
          FileSaver.saveAs(content, zipName)
        }


      })
    })
    this.spinner.hide();
  }
  async getFile(url: string) {
    const httpOption = {
      responseType: 'blob' as 'json',
    }

    const res = await this.httpClient.get(url, httpOption).toPromise()
      .catch((err: HttpErrorResponse) => {
        const error = err.error;
        return error;
      });
    return res;
  }
  shareMessage(event){

  }
  deleteMessage(event){

  }
  GetInstuctionDataMain(workOrderID:number,content) {
    this.ClientResultInstructionModelObj.Instr_WO_Id = workOrderID;
    this.xClientResultInstructionServices
      .InstructionGetMain(this.ClientResultInstructionModelObj)
      .subscribe(response => {
        // debugger;
        if (response[1][0] && response[1][0].length != 0) {
          ////dfebugger;
          this.SigleEditBoxModelObj.Inst_Ch_pkeyId = response[1][0].Inst_Ch_pkeyId;
          this.SigleEditBoxModelObj.Inst_Ch_Wo_Id = response[1][0].Inst_Ch_Wo_Id;
          this.SigleEditBoxModelObj.Inst_Ch_Text = response[1][0].Inst_Ch_Text;
          this.SigleEditBoxModelObj.Inst_Ch_IsActive = response[1][0].Inst_Ch_IsActive;
          this.SigleEditBoxModelObj.Inst_Ch_Delete = response[1][0].Inst_Ch_Delete;
          this.SigleEditBoxModelObj.UserID = response[1][0].UserID;
          this.actionValue=response[1][0].Inst_Ch_Text
        }
      });
  }
  backgroundProviderFilter(value) {
    if (value != '') {
      this.drpBackgroundProviderList = this.BackgroundList.filter((s) => s.Back_Chk_ProviderName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpBackgroundProviderList = this.BackgroundList.slice();
    }
  }
}
