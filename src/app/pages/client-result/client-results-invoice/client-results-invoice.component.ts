import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BidInvoiceItemViewTaskModel } from '../../admin/bid-invoice-task/bid-invoice-task-model';
import {
  ClientResultsInvoiceModel,
  Invoice_ContractorDTO,
  Invoice_ClientDTO,
  PaymentRecordModel,
  ScoreCards,
  //TempScoreCardData,
  ContractInvoiceModel,
  ClientInvoiceModel,
  TempJobPLData,
  JobCostObj,
  scorecardDTO,
} from './client-results-invoice-model';
import { ClientResultsInvoiceServices } from './client-results-invoice.service';
import {
  BindDataModel,
  TaskBidMasterModel,
} from '../client-result/client-result-model';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { Expense } from '../components/constants/expense';
import { DropdownModel } from '../../models/dropdown-model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { InvoiceTableComponent } from '../components/invoice-table/invoice-table.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: './client-results-invoice.component.html',
  styleUrls: ['./client-results-invoice.component.scss'],
})
export class ClientResultsInvoiceComponent implements OnInit {
  @ViewChild(InvoiceTableComponent)
  invoiceTableComponent: InvoiceTableComponent;

  //@ViewChild(InvoiceTableComponent) invoiceTableComponent1: InvoiceTableComponent
  ContractorInvoiceArray = [];
  ClientInvoiceArray = [];
  BidInvoiceItemViewTaskModelObj: BidInvoiceItemViewTaskModel =
    new BidInvoiceItemViewTaskModel();
  ClientResultsInvoiceModelObj: ClientResultsInvoiceModel =
    new ClientResultsInvoiceModel();
  Invoice_ContractorDTOObj: Invoice_ContractorDTO = new Invoice_ContractorDTO();
  Invoice_ClientDTOObj: Invoice_ClientDTO = new Invoice_ClientDTO();
  BindDataModelObj: BindDataModel = new BindDataModel();
  scorecardDTOObj: scorecardDTO = new scorecardDTO();
  decuser: any;
  OfficeResulth: boolean = false;
  processorh: boolean = false;
  tabhide: boolean = false;
  expences: boolean = false;
  disableScoreCard: boolean = false;
  jobdiv: boolean = false;
  contprint: boolean = true;
  clientprint: boolean = true;
  contractorPaymentObj: PaymentRecordModel = new PaymentRecordModel();
  DropdownModelObj: DropdownModel = new DropdownModel();
  scorCardColumns = ScoreCards;
  //tempScorecardData = TempScoreCardData;
  tempJPData = TempJobPLData;
  expenses: Expense[] = [];
  jobCostObj;
  tempScorecardData: any;
  formUsrCommonGroup: UntypedFormGroup;
  dropCkck = false;
  InvoiceValFlag = false;
  isContractInValid = false;
  isClientInValid = false;
  Contractor: Boolean = true;
  Client: Boolean = true;
  IsInvoiceDataFetched=false;
  selectedtab=1;
  constructor(
    private xClientResultsInvoiceServices: ClientResultsInvoiceServices,
    private modalService: NgbModal,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', encuser);
      this.decuser = JSON.parse(decval);
      switch (this.decuser[0].GroupRoleId) {
        case 1: {
          this.OfficeResulth = false;
          this.processorh = false;
          this.tabhide = false;
          this.disableScoreCard = false;
          break;
        }
        case 2: {
          this.OfficeResulth = true;
          this.processorh = false;
          this.tabhide = true;
          this.expences = true;
          this.disableScoreCard = true;
          break;
        }
        case 3: {
          this.OfficeResulth = false;
          this.processorh = false;
          this.tabhide = false;
          this.jobdiv = true;
          this.disableScoreCard = false;
          break;
        }
        case 4: {
          this.OfficeResulth = false;
          this.processorh = true;
          this.tabhide = false;
          this.expences = false;
          this.jobdiv = true;
          this.disableScoreCard = false;
          break;
        }
        case 5: {
          this.OfficeResulth = false;
          this.processorh = false;
          this.tabhide = false;
          this.expences = false;
          this.jobdiv = false;
          this.disableScoreCard = false;
          break;
        }
      }
    }

    // this.getModelData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      Taskval: ['', Validators.required],
    });
    this.contractorPaymentObj.enteredBy = this.decuser[0].User_FirstName;
    this.jobCostObj = new JobCostObj();
    this.getTaskList();
    this.showSpinner()
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }


  onBlurMethod(){
    var countxx = 0;
    if(this.expenses.length != 0){
      for(let i = 0; i < this.expenses.length; i++){
        var val = this.expenses[i].CCE_Pay_Amount;
        if(val.toString() != '' && val.toString() != "")
        {
          var twoPlacedFloat = parseFloat(val.toString());
          countxx = countxx + twoPlacedFloat;
        }
      }
      this.expenseTotal = parseFloat(countxx.toFixed(2));
    }
    else{
      this.expenseTotal = parseFloat(countxx.toFixed(2));
    }
  }
  getExpense() {
    let obj = {
      CCE_Pay_PkeyId: 0,
      CCE_Pay_Wo_Id: this.ClientResultsInvoiceModelObj.workOrder_ID,
      Type: 1,
    };

    this.xClientResultsInvoiceServices
      .ExpenseGet(obj)
      .subscribe((response) => {});
  }
  ClientResultContractionInvoiceSumbit() {
    debugger
    console.log('save');
    this.isLoading = true;
    this.button = 'Processing';
    this.dropCkck = false;
    this.ContractorInvoiceArray;

    let errCnt = 0;
    this.ContractorInvoiceArray.forEach((item) => {
      if (item.Inv_Con_Ch_TaskId == 0) {
        errCnt++;
      }
      if (item.Inv_Con_Ch_Qty == '0') {
        errCnt++;
      }
    });
    if (errCnt > 0) {
      this.isContractInValid = true;
      this.contprint = true;
      this.isLoading = false;
      this.button = 'Save';
      this.MessageFlag = 'Please fill all required feilds...!';
      this.commonMessage();
    } else {
      this.isContractInValid = false;
      this.Invoice_ContractorDTOObj.Inv_Con_Inv_Date = new Date();
      this.Invoice_ContractorDTOObj.ContractorInvoiceArrayVal =
        this.ContractorInvoiceArray;
      this.Invoice_ContractorDTOObj.Inv_Con_Wo_ID =
        this.ClientResultsInvoiceModelObj.workOrder_ID;
      this.Invoice_ContractorDTOObj.Type = 1;


      this.xClientResultsInvoiceServices
        .ContractorInvoiceDataPOST(this.Invoice_ContractorDTOObj)
        .subscribe((response) => {
          if (response[0].length != 0) {
            this.contprint = false;
            this.Invoice_ContractorDTOObj.Inv_Con_pkeyId = response[0][0];
            this.isLoading = false;
            this.button = 'Save';
            this.MessageFlag = 'Data Saved...!';
            this.commonMessage();
            this.invoiceTableComponent.ngOnInit();
            this.getTaskList()
            this.GetCon_ClintDataByWOId();
          } else {
            alert('ENTERNAL SERVER ERROR ');
          }
        });
    }
  }

  ClientResultClientInvoiceSumbit() {
    // debugger
    this.dropCkck = false;
    this.isLoadingc = true;
    this.buttonc = 'Processing';
    let errCnt = 0;
    this.ClientInvoiceArray.forEach((item) => {
      if (item.Inv_Client_Ch_Task_Id == 0) {
        errCnt++;
      }
      if (item.Inv_Client_Ch_Qty == '0') {
        errCnt++;
      }
    });
    if (errCnt > 0) {
      this.isClientInValid = true;
      this.clientprint = true;
      this.isLoadingc = false;
      this.buttonc = 'Save';
      this.MessageFlag = 'Please fill all required feilds...!';
      this.commonMessage();
    } else {
      this.isClientInValid = false;
      this.Invoice_ClientDTOObj.Inv_Client_Inv_Date = new Date();
      this.Invoice_ClientDTOObj.ClientInvoiceArrayVal = this.ClientInvoiceArray;
      this.Invoice_ClientDTOObj.Inv_Client_WO_Id =
        this.ClientResultsInvoiceModelObj.workOrder_ID;

      this.xClientResultsInvoiceServices
        .ClientInvoiceDataPOST(this.Invoice_ClientDTOObj)
        .subscribe((response) => {
          this.clientprint = false;
          if (response[0].length != 0) {
            this.Invoice_ClientDTOObj.Inv_Client_pkeyId = response[0][0];
            this.isLoadingc = false;
            this.buttonc = 'Save';
            this.MessageFlag = 'Data Saved...!';
            this.invoiceTableComponent.ngOnInit();
            this.invoiceTableComponent.contrOrclient = 'client';
            this.getTaskList();
            this.commonMessage();
          } else {
            alert('ENTERNAL SERVER ERROR ');
          }
        });
    }
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, {size: 'sm',ariaLabelledBy: 'modal-basic-title',});
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Continue';
    modalRef.result.then((result) => {},(reason) => {});
  }

  ModelObj: any;
  BindData: any;
  button = 'Save'; // buttom loading..
  buttonc = 'Save'; // buttom loading..
  isLoading = false; // buttom loading..
  isLoadingc = false; // buttom loading..
  MessageFlag: string; // custom msg sathi
  statusid: any;
  buttonexp = 'Save'; // buttom loading..
  isexpLoading = false; // buttom loading..
  getModelData() {
    this.GetCon_ClintDataByWOId();
  }

  AddClientResultContractorInvoiceAddColl() {
    // debugger;
    this.contprint = true;
    let data = new ContractInvoiceModel();
    if(data.Inv_Con_Ch_Flate_fee==false)
    {
      data.Inv_Con_Ch_Discount=this.BindDataModelObj.Client_Contractor_Discount;
    }
   
    this.ContractorInvoiceArray.push(data);
  }

  TaskList: any;
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  getTaskList() {
    // debugger
    this.DropdownModelObj.WorkOrderID =this.ClientResultsInvoiceModelObj.workOrder_ID
    this.DropdownModelObj.Type=3
    if(this.DropdownModelObj.WorkOrderID==undefined || this.DropdownModelObj.WorkOrderID==0)
    {
      const workorder1 = this.xRoute.snapshot.params['workorder']||this.xRoute.firstChild.firstChild.snapshot.params['workorder'];
      let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
      this.DropdownModelObj.WorkOrderID = parseInt(workOrderID);

    }

    this.xClientResultsInvoiceServices
        .DropdownGetClientResult(this.DropdownModelObj)
        .subscribe((response) => {
          if(response[0]!=undefined)
          {
            this.TaskList = response[0];
            var data = {
              Task_pkeyID: -99,
              Task_Name: 'Custom',
            };
            this.TaskList.push(data);
          }
          else
          {
            console.error("Task List not fetched");
          }
          this.getModelData();
        });
  }

  //button call
  PrintWindow() {
    window.print();
  }

  AddClientResultContractorInvoiceAddCollClinet() {
    // debugger
    this.clientprint = true;
    let data = new ClientInvoiceModel();
    if(data.Inv_Client_Ch_Flate_Fee == false)
    {
      data.Inv_Client_Ch_Discount=this.BindDataModelObj.Client_Discount;
    }
    
    this.ClientInvoiceArray.push(data);
  }

  statusbutton = false;
  GetCon_ClintDataByWOId() {
     debugger
    this.IsInvoiceDataFetched=false;
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    const workorder = parseInt(workOrderID);
    this.ClientResultsInvoiceModelObj.workOrder_ID = workorder;
    this.xClientResultsInvoiceServices
      .ContractorClientGetInvoiceData(this.ClientResultsInvoiceModelObj)
      .subscribe((response) => {
        // debugger
        this.IsInvoiceDataFetched=true;
        if (response[4].length != 0) {
          this.BindDataModelObj = response[4][0];
          var contractorinvoiceModel=new ContractInvoiceModel();
          if (contractorinvoiceModel.Inv_Con_Ch_Flate_fee == false)
          {
            contractorinvoiceModel.Inv_Con_Ch_Discount=this.BindDataModelObj.Client_Contractor_Discount
          }
         
          this.ContractorInvoiceArray = [contractorinvoiceModel];

          var clientInvoiceModel=new ClientInvoiceModel();
          if(clientInvoiceModel.Inv_Client_Ch_Flate_Fee == false)
          {
            clientInvoiceModel.Inv_Client_Ch_Discount=this.BindDataModelObj.Client_Discount
          }
         
          this.ClientInvoiceArray = [clientInvoiceModel];

          this.statusid = response[4][0].statusid;
          if (this.decuser[0].GroupRoleId == 2) {
            if (this.statusid == 2 || this.statusid == 3) {
              this.statusbutton = false;
            } else {
              this.statusbutton = true;
            }
          }
        }
        else
        {
          var contractorinvoiceModel=new ContractInvoiceModel();
          if (contractorinvoiceModel.Inv_Con_Ch_Flate_fee == false)
          {
            contractorinvoiceModel.Inv_Con_Ch_Discount=this.BindDataModelObj.Client_Contractor_Discount
          }   
          
          
          this.ContractorInvoiceArray = [contractorinvoiceModel];

          var clientInvoiceModel=new ClientInvoiceModel();
          if(clientInvoiceModel.Inv_Client_Ch_Flate_Fee ==false)
          {
            clientInvoiceModel.Inv_Client_Ch_Discount=this.BindDataModelObj.Client_Discount
          }
         
          this.ClientInvoiceArray = [clientInvoiceModel];
        }



        if (response[0].length != 0) {
          // debugger;
          this.ContractorInvoiceArray = response[0];
          this.ContractorInvoiceArray.forEach((element) => {
            element.Inv_Con_Ch_Price = element.Inv_Con_Ch_Price.toFixed(2);
            element.Inv_Con_Ch_Total = element.Inv_Con_Ch_Total.toFixed(2);
            if(element.Inv_Con_Ch_Adj_Price>0)
            {
              element.Inv_Con_Ch_Adj_Price =element.Inv_Con_Ch_Adj_Price.toFixed(2);
            }
            else
            {
              element.Inv_Con_Ch_Adj_Price="";
            }

            element.Inv_Con_Ch_Adj_Total =element.Inv_Con_Ch_Adj_Total.toFixed(2);

            if(element.Inv_Con_Ch_Flate_fee == false)
            {
              element.Inv_Con_Ch_Discount=element.Inv_Con_Ch_Discount>0?element.Inv_Con_Ch_Discount:this.BindDataModelObj.Client_Contractor_Discount
            }
            
          });
        }
        if (response[1].length != 0) {
          this.ClientInvoiceArray = response[1];
          this.ClientInvoiceArray.forEach((element) => {
            element.Inv_Client_Ch_Price =element.Inv_Client_Ch_Price.toFixed(2);
            element.Inv_Client_Ch_Total =element.Inv_Client_Ch_Total.toFixed(2);
            if(element.Inv_Client_Ch_Adj_Price>0)
            {
              element.Inv_Client_Ch_Adj_Price =element.Inv_Client_Ch_Adj_Price.toFixed(2);
            }
            else
            {
              element.Inv_Client_Ch_Adj_Price ="";
            }

            element.Inv_Client_Ch_Adj_Total =element.Inv_Client_Ch_Adj_Total.toFixed(2);
            if(element.Inv_Client_Ch_Flate_Fee ==false)
            {
              element.Inv_Client_Ch_Discount=element.Inv_Client_Ch_Discount>0?element.Inv_Client_Ch_Discount:this.BindDataModelObj.Client_Discount
            }
                  
           
          });
        }
        if (response[2].length != 0) {
          if (response[2][0].Inv_Con_pkeyId != 0) {
            this.contprint = false;
          }
          this.Invoice_ContractorDTOObj.Inv_Con_pkeyId =
            response[2][0].Inv_Con_pkeyId;
          this.Invoice_ContractorDTOObj.Inv_Con_ContDiscount =
            response[2][0].Inv_Con_ContDiscount;
          this.Invoice_ContractorDTOObj.Inv_Con_ContTotal =
            response[2][0].Inv_Con_ContTotal;
          this.Invoice_ContractorDTOObj.Inv_Con_DiscountAmount =
            response[2][0].Inv_Con_DiscountAmount;
          this.Invoice_ContractorDTOObj.Inv_Con_Followup_Com =
            response[2][0].Inv_Con_Followup_Com;
          this.Invoice_ContractorDTOObj.Inv_Con_Inv_Comment =
            response[2][0].Inv_Con_Inv_Comment;
          this.Invoice_ContractorDTOObj.Inv_Con_Inv_Date =
            response[2][0].Inv_Con_Inv_Date;
          this.Invoice_ContractorDTOObj.Inv_Con_Inv_Followup =
            response[2][0].Inv_Con_Inv_Followup;
          this.Invoice_ContractorDTOObj.Inv_Con_Invoce_Num =
            response[2][0].Inv_Con_Invoce_Num;
          this.Invoice_ContractorDTOObj.Inv_Con_Invoice_Id =
            response[2][0].Inv_Con_Invoice_Id;
          this.Invoice_ContractorDTOObj.Inv_Con_IsActive =
            response[2][0].Inv_Con_IsActive;
          //this.Invoice_ContractorDTOObj.Inv_Con_IsDelete = response[2][0].Inv_Con_IsDelete;
          this.Invoice_ContractorDTOObj.Inv_Con_Ref_ID =
            response[2][0].Inv_Con_Ref_ID;
          this.Invoice_ContractorDTOObj.Inv_Con_Short_Note =
            response[2][0].Inv_Con_Short_Note;
          this.Invoice_ContractorDTOObj.Inv_Con_Status =
            response[2][0].Inv_Con_Status;
            console.log('02',this.Invoice_ContractorDTOObj.Inv_Con_Status)
          this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total =
            response[2][0].Inv_Con_Sub_Total;
          this.Invoice_ContractorDTOObj.Inv_Con_TaskId =
            response[2][0].Inv_Con_TaskId;
          this.Invoice_ContractorDTOObj.Inv_Con_Uom_Id =
            response[2][0].Inv_Con_Uom_Id;
          this.Invoice_ContractorDTOObj.Inv_Con_Wo_ID =
            response[2][0].Inv_Con_Wo_ID;
          this.Invoice_ContractorDTOObj.Task_Inv_Auto_Invoice =
            response[2][0].Task_Inv_Auto_Invoice;
          this.Invoice_ContractorDTOObj.Inv_Con_Inv_Hold_Date =
            response[2][0].Inv_Con_Inv_Hold_Date;
          this.Invoice_ContractorDTOObj.Inv_Con_Inv_Approve_Date =
            response[2][0].Inv_Con_Inv_Approve_Date;
          this.Invoice_ContractorDTOObj.Inv_Con_Inv_Approve =
            response[2][0].Inv_Con_Inv_Approve;
        }
        if (response[3].length != 0) {
          if (response[3][0].Inv_Client_pkeyId != 0) {
            this.clientprint = false;
          }
          // debugger
          this.Invoice_ClientDTOObj.Inv_Client_pkeyId =
            response[3][0].Inv_Client_pkeyId;
          this.Invoice_ClientDTOObj.Inv_Client_Auto_Invoice =
            response[3][0].Inv_Client_Auto_Invoice;
          this.Invoice_ClientDTOObj.Inv_Client_Client_Dis =
            response[3][0].Inv_Client_Client_Dis;
          this.Invoice_ClientDTOObj.Inv_Client_Client_Total =
            response[3][0].Inv_Client_Client_Total;
          this.Invoice_ClientDTOObj.Inv_Client_Comp_Date =
            response[3][0].Inv_Client_Comp_Date;
          this.Invoice_ClientDTOObj.Inv_Client_Credit_Memo =
            response[3][0].Inv_Client_Credit_Memo;
          this.Invoice_ClientDTOObj.Inv_Client_Discout_Amount =
            response[3][0].Inv_Client_Discout_Amount;
          this.Invoice_ClientDTOObj.Inv_Client_Internal_Note =
            response[3][0].Inv_Client_Internal_Note;
          this.Invoice_ClientDTOObj.Inv_Client_Inv_Complete =
            response[3][0].Inv_Client_Inv_Complete;
          this.Invoice_ClientDTOObj.Inv_Client_Invoice_Id =
            response[3][0].Inv_Client_Invoice_Id;
          this.Invoice_ClientDTOObj.Inv_Client_Invoice_Number =
            response[3][0].Inv_Client_Invoice_Number;
          this.Invoice_ClientDTOObj.Inv_Client_Inv_Date =
            response[3][0].Inv_Client_Inv_Date;
          this.Invoice_ClientDTOObj.Inv_Client_IsActive =
            response[3][0].Inv_Client_IsActive;
          this.Invoice_ClientDTOObj.Inv_Client_Inv_Date =
            response[3][0].Inv_Client_Inv_Date;
          this.Invoice_ClientDTOObj.Inv_Client_Sent_Client =
            response[3][0].Inv_Client_Sent_Client;
          this.Invoice_ClientDTOObj.Inv_Client_Short_Note =
            response[3][0].Inv_Client_Short_Note;
          this.Invoice_ClientDTOObj.Inv_Client_Status =
            response[3][0].Inv_Client_Status;
          this.Invoice_ClientDTOObj.Inv_Client_Sub_Total =
            response[3][0].Inv_Client_Sub_Total;
          this.Invoice_ClientDTOObj.Inv_Client_Task_Id =
            response[3][0].Inv_Client_Task_Id;
          this.Invoice_ClientDTOObj.Inv_Client_Uom_Id =
            response[3][0].Inv_Client_Uom_Id;
          this.Invoice_ClientDTOObj.Inv_Client_Followup =
            response[3][0].Inv_Client_Followup;
          this.Invoice_ClientDTOObj.Inv_Client_Hold_Date =
            response[3][0].Inv_Client_Hold_Date;

          this.Invoice_ClientDTOObj.Inv_Client_IsNoCharge =
            response[3][0].Inv_Client_IsNoCharge;
          this.Invoice_ClientDTOObj.Inv_Client_NoChargeDate =
            response[3][0].Inv_Client_NoChargeDate;
        }

        if (response[7].length != 0) {
          this.expenses = response[7];
          this.expenseTotal = this.expenses.reduce(
            (a, b) => a + (b['CCE_Pay_Amount'] || 0),
            0
          );
        } else {
          this.expenses = [];
          this.expenses.push(new Expense());
          this.expenseTotal = 0;
        }
        if (response[8].length != 0) {
          this.tempScorecardData = response[8][0].ScoreCard_DTO;
          this.scorecardDTOObj.Scd_Comment = response[8][0].Scd_Comment;
          this.scorecardDTOObj.Scd_pkeyId = response[8][0].Scd_pkeyId;
        }
      });
  }

  // print div
  PrintDiv() {
    //debugger
    this.buttonPrint = 'Print Contractor';
    this.isLoadingPrint = false;
    this.PrintDivF = true;
    var divToPrint = document.getElementById('DivIdToPrint');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write(
      '<html><body onload="window.print()"> ' +
        divToPrint.innerHTML +
        ' </body></html>'
    );
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
  }

  //clientdiv print
  clientPrint() {
    this.buttoncPrint = 'Print Client';
    this.isLoadingPrint = false;
    var Printdata = document.getElementById('Divprint');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write(
      '<html><body onload="window.print()">' +
        Printdata.innerHTML +
        '</body></html>'
    );
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
    this.PrintDivcl = true;
  }

  scorecarditem(item) {}

  AsycWaitPhotoscall() {
    var promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
        this.PrintDiv();
      }, 2000);
    });
  }

  AsycWaitPhotoscall1() {
    var promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
        this.clientPrint();
      }, 2000);
    });
  }

  buttonPrint = 'Print Contractor';
  isLoadingPrint = false;
  printArray = [];
  PrintContent: any;
  PrintDivF = true;

  printData() {
    //debugger
    this.PrintDivF = false;
    this.isLoadingPrint = true;
    this.buttonPrint = 'Processing';
    this.printArray = [];
    for (let i = 0; i < this.ContractorInvoiceArray.length; i++) {
      const taskpk = this.ContractorInvoiceArray[i].Inv_Con_Ch_TaskId;
      for (let j = 0; j < this.TaskList.length; j++) {
        const listpkey = this.TaskList[j].Task_pkeyID;
        if (taskpk == listpkey) {
          this.ContractorInvoiceArray[i].Inv_Con_Inv_Comment =
            this.TaskList[j].Task_Name;
          let datax = this.ContractorInvoiceArray[i];
          this.printArray.push(datax);
        }
      }
    }

    this.AsycWaitPhotoscall();
  }
  // client print details data
  clientprintArray = [];
  clientPrintContent: any;
  buttoncPrint = 'Print Client';
  PrintDivcl = true;
  clientPrintdetails() {
    this.PrintDivcl = false;
    this.isLoadingPrint = true;
    this.buttoncPrint = 'Processing';
    this.clientprintArray = [];
    for (let i = 0; i < this.ClientInvoiceArray.length; i++) {
      const taskpk = this.ClientInvoiceArray[i].Inv_Client_Ch_Task_Id;
      for (let j = 0; j < this.TaskList.length; j++) {
        const listpkey = this.TaskList[j].Task_pkeyID;
        if (taskpk == listpkey) {
          this.ClientInvoiceArray[i].Inv_Client_Ch_Comment =
            this.TaskList[j].Task_Name;
          let cdata = this.ClientInvoiceArray[i];

          this.clientprintArray.push(cdata);
        }
      }
    }

    this.AsycWaitPhotoscall1();
  }

  copyItemToClient(item: ContractInvoiceModel) {
    this.clientprint = true;
    let data = {
      Inv_Client_Ch_pkeyId: 0, //item.Inv_Con_Ch_pkeyId
      Inv_Client_Ch_Task_Id: item.Inv_Con_Ch_TaskId,
      Inv_Client_Ch_Uom_Id: item.Inv_Con_Ch_Uom_Id,
      Inv_Client_Ch_Qty: item.Inv_Con_Ch_Qty,
      Inv_Client_Ch_Price: item.Inv_Con_Ch_Price,
      Inv_Client_Ch_Total: item.Inv_Con_Ch_Total,
      Inv_Client_Ch_Adj_Price: item.Inv_Con_Ch_Adj_Price,
      Inv_Client_Ch_Adj_Total: item.Inv_Con_Ch_Adj_Total,
      Inv_Client_Ch_Comment: item.Inv_Con_Ch_Comment,
      Inv_Client_Ch_IsActive: item.Inv_Con_Ch_IsActive,
      Inv_Client_Ch_IsDelete: item.Inv_Con_Ch_IsDelete,
      Inv_Client_Ch_Invoice_Id: item.Inv_Con_Ch_InvoiceId,
      Inv_Client_Ch_Flate_Fee: item.Inv_Con_Ch_Flate_fee,
      Inv_Client_Ch_Discount: item.Inv_Con_Ch_Discount,
      Inv_Client_Ch_Temp_Total: item.Inv_Con_Ch_Temp_Total,
    };

    this.ClientInvoiceArray.push(data);
  }

  copyItemToContractor(item: ClientInvoiceModel) {
    let data = {
      Inv_Con_Ch_pkeyId: 0, //item.Inv_Client_Ch_pkeyId
      Inv_Con_Ch_TaskId: item.Inv_Client_Ch_Task_Id,
      Inv_Con_Ch_Uom_Id: item.Inv_Client_Ch_Uom_Id,
      Inv_Con_Ch_Qty: item.Inv_Client_Ch_Qty,
      Inv_Con_Ch_Price: item.Inv_Client_Ch_Price,
      Inv_Con_Ch_Total: item.Inv_Client_Ch_Total,
      Inv_Con_Ch_Adj_Price: item.Inv_Client_Ch_Adj_Price,
      Inv_Con_Ch_Adj_Total: item.Inv_Client_Ch_Adj_Total,
      Inv_Con_Ch_Comment: item.Inv_Client_Ch_Comment,
      Inv_Con_Ch_IsActive: item.Inv_Client_Ch_IsActive,
      Inv_Con_Ch_IsDelete: item.Inv_Client_Ch_IsDelete,
      Inv_Con_Ch_InvoiceId: item.Inv_Client_Ch_Invoice_Id,
      Inv_Con_Ch_Flate_fee: item.Inv_Client_Ch_Flate_Fee,
      Inv_Con_Ch_Discount: item.Inv_Client_Ch_Discount,
      Inv_Con_Ch_Temp_Total: item.Inv_Client_Ch_Temp_Total,
    };

    this.ContractorInvoiceArray.push(data);
  }

  addExpense() {
    this.expenses.push(new Expense());
  }

  saveExpense() {
    debugger
    // this.isexpLoading = true;
    // this.buttonexp = 'Processing';
    let postObj = {
      CCEP_Data: null,
    };
    let array = [];
    this.expenses.forEach((item) => {
      item.CCE_Pay_Wo_Id = this.ClientResultsInvoiceModelObj.workOrder_ID;
      item.CCE_Con_Pay_Invoice_Id =
        this.Invoice_ContractorDTOObj.Inv_Con_pkeyId;
      item.CCE_Client_Pay_Invoice_Id =
        this.Invoice_ClientDTOObj.Inv_Client_pkeyId;
      item.Type = 1;
    });

    postObj.CCEP_Data = JSON.stringify(this.expenses);
    this.xClientResultsInvoiceServices
      .ExpenseAdd(JSON.stringify(postObj))
      .subscribe((response) => {
        // this.isexpLoading = false;
        // this.buttonexp = 'Save';
        // this.MessageFlag = 'Expenses Saved...!';
        // this.commonMessage();

        this.GetCon_ClintDataByWOId();
      });
  }

  expenseTotal: number;
  onTotalChange(item: Expense) {
    if (!item.CCE_Pay_Amount) return;
    this.expenseTotal = this.expenseTotal + item.CCE_Pay_Amount;
  }

  onRemoveExpense(item: Expense) {
    // //dfebugger
    if (item.CCE_Pay_PkeyId != 0) {
      let removeArray = [
        {
          CCE_Pay_PkeyId: item.CCE_Pay_PkeyId,
          CCE_Pay_Wo_Id: item.CCE_Pay_Wo_Id,
          CCE_Pay_IsActive: false,
          CCE_Pay_IsDelete: true,
          Type: 4,
        },
      ];

      let obj = {};
      obj['CCEP_Data'] = JSON.stringify(removeArray);

      this.xClientResultsInvoiceServices
        .ExpenseDelete(obj)
        .subscribe((response) => {
          this.GetCon_ClintDataByWOId();
        });
    }
  }

  getBalance() {
    if (
      this.Invoice_ClientDTOObj != undefined &&
      this.Invoice_ClientDTOObj &&
      this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != undefined &&
      this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != null
    ) {
      return (
        this.Invoice_ClientDTOObj.Inv_Client_Sub_Total -
        this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total -
        this.expenseTotal
      ).toFixed(2);
    } else {
      return 0;
    }
  }
  getConInv() {
    if (
      this.Invoice_ContractorDTOObj != undefined &&
      this.Invoice_ContractorDTOObj &&
      this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != undefined &&
      this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != null
    ) {
      return this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total.toFixed(2);
    } else {
      return 0;
    }
  }
  getCliInv() {
    if (
      this.Invoice_ClientDTOObj != undefined &&
      this.Invoice_ClientDTOObj &&
      this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != undefined &&
      this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != null
    ) {
      return this.Invoice_ClientDTOObj.Inv_Client_Sub_Total.toFixed(2);
    } else {
      return 0;
    }
  }
  getExpTotal() {
    if (this.expenseTotal != undefined) {
      return this.expenseTotal.toFixed(2);
    }
  }
  getTlExp() {
    return (
      this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total + this.expenseTotal
    ).toFixed(2);
  }
  AddScoreCardDetails(arr, item) {
    this.scorecardDTOObj.Scd_Comment = item;
    this.scorecardDTOObj.ScoreCard_DTO = arr;
    this.scorecardDTOObj.Scd_Wo_Id =
      this.ClientResultsInvoiceModelObj.workOrder_ID;
    this.scorecardDTOObj.Scd_pkeyId = this.scorecardDTOObj.Scd_pkeyId;
    this.xClientResultsInvoiceServices
      .ScoreCardData(this.scorecardDTOObj)
      .subscribe((res) => {
        this.MessageFlag = 'Score Card Data Saved...!';
        this.commonMessage();
      });
  }

  hideClient() {
    this.Client = !this.Client;
  }
  hideContractor() {
    // debugger
    this.Contractor = !this.Contractor;
  }
  blob: any;
  pdfgenerate() {
    //debugger
    if(this.TaskBidMasterModelObj.workOrder_ID==0)
    {
      const workorder1 = this.xRoute.snapshot.params['workorder'];
      let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
      this.TaskBidMasterModelObj.workOrder_ID = parseInt(workOrderID);
    }
    this.Invoice_ContractorDTOObj.Inv_Con_Wo_ID =
      this.TaskBidMasterModelObj.workOrder_ID;
    this.Invoice_ContractorDTOObj.Type = 1;
    this.xClientResultsInvoiceServices
      .GetContractorDetailPdf(this.Invoice_ContractorDTOObj)
      .subscribe((res) => {
        //debugger
        if (res != null) {
          if (res != null) {
            this.blob = new Blob([res], {
              type: 'application/pdf',
            });

            var downloadURL = window.URL.createObjectURL(res);
            var link = document.createElement('a');
            link.href = downloadURL;
            let GetName =
              'Contractor_' + this.Invoice_ContractorDTOObj.Inv_Con_Invoce_Num +"_("+this.BindDataModelObj.workOrderNumber+")";
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
            // self.notificationService.showSuccess(result.Message, "Success");
          } else {
          }
        }
      });
  }

  //clint print
  Clientpdfgenerate() {
    //debugger
    if(this.TaskBidMasterModelObj.workOrder_ID==0)
    {
      const workorder1 = this.xRoute.snapshot.params['workorder'];
      let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
      this.TaskBidMasterModelObj.workOrder_ID = parseInt(workOrderID);
    }
    this.Invoice_ClientDTOObj.Inv_Client_WO_Id =this.TaskBidMasterModelObj.workOrder_ID;
    this.Invoice_ClientDTOObj.Type = 1;
    this.xClientResultsInvoiceServices
      .GetClientDetailPdf(this.Invoice_ClientDTOObj)
      .subscribe((res) => {
        //debugger
        if (res != null) {
          if (res != null) {
            this.blob = new Blob([res], {
              type: 'application/pdf',
            });

            var downloadURL = window.URL.createObjectURL(res);
            var link = document.createElement('a');
            link.href = downloadURL;
            let GetName =
              'Client_' + this.Invoice_ClientDTOObj.Inv_Client_Invoice_Number +"_("+this.BindDataModelObj.workOrderNumber+")";
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
            // self.notificationService.showSuccess(result.Message, "Success");
          } else {
          }
        }
      });
  }
  paymentUpdate(){
    this.GetCon_ClintDataByWOId();
  }
  TabSelection(selTab)
  {
    this.selectedtab=selTab
  }
}

