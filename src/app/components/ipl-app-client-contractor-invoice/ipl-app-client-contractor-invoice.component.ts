import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BindDataModel } from 'src/app/pages/client-result/client-result/client-result-model';
import {
  ClientInvoiceModel,
  ClientResultsInvoiceModel,
  ContractInvoiceModel,
  Invoice_ClientDTO,
  Invoice_ContractorDTO,
  scorecardDTO,
} from 'src/app/pages/client-result/client-results-invoice/client-results-invoice-model';
import { ClientResultsInvoiceServices } from 'src/app/pages/client-result/client-results-invoice/client-results-invoice.service';
import { Expense } from 'src/app/pages/client-result/components/constants';
import { InvoiceTableComponent } from 'src/app/pages/client-result/components/invoice-table/invoice-table.component';
import { DropdownModel } from 'src/app/pages/models/dropdown-model';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';

@Component({
  selector: 'app-ipl-app-client-contractor-invoice',
  templateUrl: './ipl-app-client-contractor-invoice.component.html',
  styleUrls: ['./ipl-app-client-contractor-invoice.component.scss'],
})
export class IplAppClientContractorInvoiceComponent implements OnInit {
  @Input() workOrderId: number;
  @Input() workOrderId_Multiple: any;

  @ViewChild(InvoiceTableComponent)
  invoiceTableComponent: InvoiceTableComponent;
  ClientResultsInvoiceModelObj: ClientResultsInvoiceModel =
    new ClientResultsInvoiceModel();
  Invoice_ContractorDTOObj: Invoice_ContractorDTO = new Invoice_ContractorDTO();
  Invoice_ClientDTOObj: Invoice_ClientDTO = new Invoice_ClientDTO();
  BindDataModelObj: BindDataModel = new BindDataModel();
  scorecardDTOObj: scorecardDTO = new scorecardDTO();
  DropdownModelObj: DropdownModel = new DropdownModel();
  expenses: Expense[] = [];
  ContractorInvoiceArray = [];
  ClientInvoiceArray = [];
  contprint: boolean = true;
  clientprint: boolean = true;
  statusid: any;
  expenseTotal: number;
  tempScorecardData: any;
  decuser: any;
  OfficeResulth: boolean = false;
  processorh: boolean = false;
  tabhide: boolean = false;
  disableScoreCard: boolean = false;
  expences: boolean = false;
  jobdiv: boolean = false;
  statusbutton = false;

  buttoncPrint = 'Client Print';
  button = 'Save'; // buttom loading..
  buttonc = 'Save'; // buttom loading..
  isLoading = false; // buttom loading..
  isLoadingc = false; // buttom loading..
  MessageFlag: string; // custom msg sathi
  buttonexp = 'Save'; // buttom loading..
  isexpLoading = false; // buttom loading.
  TaskList: any;
  isContractInValid = false;
  isClientInValid = false;

  buttonPrint = 'Print';
  isLoadingPrint = false;
  printArray = [];
  PrintContent: any;
  PrintDivF = true;
  dropCkck = false;

  WorkOrderID_mul: string;
  IsMultipleFunctionality: boolean = true;
  constructor(
    private xClientResultsInvoiceServices: ClientResultsInvoiceServices,
    private EncrDecr: EncrDecrService,
    private modalService: NgbModal
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
  }

  ngOnInit(): void {
    // console.log('workOrderId: ', this.workOrderId);
    // console.log('workOrderId_Multiple: ', this.workOrderId_Multiple);

    this.IsMultipleFunctionality =
      this.workOrderId != undefined || this.workOrderId > 0 ? false : true;
    this.WorkOrderID_mul = this.workOrderId_Multiple
      .map((x) => x.workOrder_ID)
      .join(',');
    if (!this.IsMultipleFunctionality) {
      this.GetDrdData();
    }

    this.ContractorInvoiceArray = [new ContractInvoiceModel()];
    this.ClientInvoiceArray = [new ClientInvoiceModel()];
    this.expenses = [new Expense()];
  }
  AddClientResultContractorInvoiceAddColl() {
    this.contprint = true;
    let data = new ContractInvoiceModel();
    this.ContractorInvoiceArray.push(data);
  }
  AddClientResultContractorInvoiceAddCollClinet() {
    this.clientprint = true;
    let data = new ClientInvoiceModel();
    this.ClientInvoiceArray.push(data);
  }

  GetCon_ClintDataByWOId() {
    if (!this.IsMultipleFunctionality) {
      // console.log('Single functionality');
      this.ClientResultsInvoiceModelObj.workOrder_ID = this.workOrderId;
      this.xClientResultsInvoiceServices
        .ContractorClientGetInvoiceData(this.ClientResultsInvoiceModelObj)
        .subscribe((response) => {
          if (response[0].length != 0) {
            this.ContractorInvoiceArray = response[0];
            this.ContractorInvoiceArray.forEach((element) => {
              element.Inv_Con_Ch_Price = element.Inv_Con_Ch_Price.toFixed(2);
              element.Inv_Con_Ch_Total = element.Inv_Con_Ch_Total.toFixed(2);
              element.Inv_Con_Ch_Adj_Price =
                element.Inv_Con_Ch_Adj_Price.toFixed(2);
              element.Inv_Con_Ch_Adj_Total =
                element.Inv_Con_Ch_Adj_Total.toFixed(2);
            });
          }
          if (response[1].length != 0) {
            this.ClientInvoiceArray = response[1];
            this.ClientInvoiceArray.forEach((element) => {
              element.Inv_Client_Ch_Price =
                element.Inv_Client_Ch_Price.toFixed(2);
              element.Inv_Client_Ch_Total =
                element.Inv_Client_Ch_Total.toFixed(2);
              element.Inv_Client_Ch_Adj_Price =
                element.Inv_Client_Ch_Adj_Price.toFixed(2);
              element.Inv_Client_Ch_Adj_Total =
                element.Inv_Client_Ch_Adj_Total.toFixed(2);
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
            this.Invoice_ContractorDTOObj.Inv_Con_Ref_ID =
              response[2][0].Inv_Con_Ref_ID;
            this.Invoice_ContractorDTOObj.Inv_Con_Short_Note =
              response[2][0].Inv_Con_Short_Note;
            this.Invoice_ContractorDTOObj.Inv_Con_Status =
              response[2][0].Inv_Con_Status;
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
          }
          if (response[4].length != 0) {
            this.BindDataModelObj = response[4][0];
            this.statusid = response[4][0].statusid;
            if (this.decuser[0].GroupRoleId == 2) {
              if (this.statusid == 2 || this.statusid == 3) {
                this.statusbutton = false;
              } else {
                this.statusbutton = true;
              }
            }
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
    } else {
      // console.log('Multiple functionality');
    }
  }

  onTotalChange(item: Expense) {
    if (!item.CCE_Pay_Amount) return;
    this.expenseTotal = this.expenseTotal + item.CCE_Pay_Amount;
  }
  GetDrdData() {
    this.DropdownModelObj.WorkOrderID_mul = this.WorkOrderID_mul;
    this.DropdownModelObj.Type = 2;
    this.xClientResultsInvoiceServices
      .DropdownGetClientResult(this.DropdownModelObj)
      .subscribe((response) => {
        this.TaskList = response[0];
        var data = { Task_pkeyID: -99, Task_Name: 'Custom' };
        this.TaskList.push(data);
        this.GetCon_ClintDataByWOId();
      });
  }

  ClientResultContractionInvoiceSumbit() {
    // console.log('save');
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
      this.Invoice_ContractorDTOObj.WorkOrderID_mul = this.WorkOrderID_mul;
      this.Invoice_ContractorDTOObj.Type = 1;

      this.xClientResultsInvoiceServices
        .ContractorInvoiceDataPOST_Multiple(this.Invoice_ContractorDTOObj)
        .subscribe((response) => {
          if (!this.IsMultipleFunctionality) {
            if (response[0].length != 0) {
              this.contprint = false;
              this.Invoice_ContractorDTOObj.Inv_Con_pkeyId = response[0][0];
              this.isLoading = false;
              this.button = 'Save';
              this.MessageFlag = 'Data Saved...!';
              this.commonMessage();
              this.invoiceTableComponent.ngOnInit();
              this.GetCon_ClintDataByWOId();
            } else {
              alert('ENTERNAL SERVER ERROR ');
            }
          } else {
            this.isLoading = false;
            this.button = 'Save';
            this.MessageFlag = 'Data Saved...!';
            this.commonMessage();
            this.resetModel();
          }
        });
    }
  }
  ClientResultClientInvoiceSumbit() {
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
      this.Invoice_ClientDTOObj.WorkOrderID_mul = this.WorkOrderID_mul;

      this.xClientResultsInvoiceServices
        .ClientInvoiceDataPOST_Multiple(this.Invoice_ClientDTOObj)
        .subscribe((response) => {
          if (!this.IsMultipleFunctionality) {
            this.clientprint = false;
            this.GetDrdData();
            if (response[0].length != 0) {
              this.Invoice_ClientDTOObj.Inv_Client_pkeyId = response[0][0];
              this.isLoadingc = false;
              this.buttonc = 'Save';
              this.MessageFlag = 'Data Saved...!';
              this.commonMessage();
              this.invoiceTableComponent.contrOrclient = 'client';
            } else {
              alert('ENTERNAL SERVER ERROR ');
            }
          } else {
            this.isLoadingc = false;
            this.buttonc = 'Save';
            this.MessageFlag = 'Data Saved...!';
            this.commonMessage();
            this.resetModel();
          }
        });
    }
  }
  copyItemToClient(item: ContractInvoiceModel) {
    this.clientprint = true;
    let data = {
      Inv_Client_Ch_pkeyId: 0,
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
      Inv_Con_Ch_pkeyId: 0,
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

  blob: any;
  pdfgenerate() {
    this.Invoice_ContractorDTOObj.Inv_Con_Wo_ID = this.workOrderId;
    this.Invoice_ContractorDTOObj.Type = 1;
    this.xClientResultsInvoiceServices
      .GetContractorDetailPdf(this.Invoice_ContractorDTOObj)
      .subscribe((res) => {
        if (res != null) {
          if (res != null) {
            this.blob = new Blob([res], {
              type: 'application/pdf',
            });

            var downloadURL = window.URL.createObjectURL(res);
            var link = document.createElement('a');
            link.href = downloadURL;
            let GetName =
              'Contractor_' + this.Invoice_ContractorDTOObj.Inv_Con_Invoce_Num;
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
          } else {
          }
        }
      });
  }
  Clientpdfgenerate() {
    this.Invoice_ClientDTOObj.Inv_Client_WO_Id = this.workOrderId;
    this.Invoice_ClientDTOObj.Type = 1;
    this.xClientResultsInvoiceServices
      .GetClientDetailPdf(this.Invoice_ClientDTOObj)
      .subscribe((res) => {
        if (res != null) {
          if (res != null) {
            this.blob = new Blob([res], {
              type: 'application/pdf',
            });

            var downloadURL = window.URL.createObjectURL(res);
            var link = document.createElement('a');
            link.href = downloadURL;
            let GetName =
              'Client_' + this.Invoice_ClientDTOObj.Inv_Client_Invoice_Number;
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
          } else {
          }
        }
      });
  }
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, {
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Continue';
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
  onBlurMethod() {
    var countxx = 0;
    if (this.expenses.length != 0) {
      for (let i = 0; i < this.expenses.length; i++) {
        var val = this.expenses[i].CCE_Pay_Amount;
        if (val.toString() != '' && val.toString() != '') {
          var twoPlacedFloat = parseFloat(val.toString());
          countxx = countxx + twoPlacedFloat;
        }
      }
      this.expenseTotal = parseFloat(countxx.toFixed(2));
    } else {
      this.expenseTotal = parseFloat(countxx.toFixed(2));
    }
  }
  onRemoveExpense(item: Expense, index: any) {
    if (item.CCE_Pay_PkeyId != 0 && !this.IsMultipleFunctionality) {
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
    } else {
      this.expenses.splice(index, 1);
    }
  }
  getExpTotal() {
    if (this.expenseTotal != undefined) {
      return this.expenseTotal.toFixed(2);
    }
  }
  addExpense() {
    this.expenses.push(new Expense());
  }
  saveExpense() {
    let postObj = { CCEP_Data: null, WorkOrderID_mul: null };
    let array = [];
    this.expenses.forEach((item) => {
      item.WorkOrderID_mul = this.WorkOrderID_mul;
      item.CCE_Con_Pay_Invoice_Id =
        this.Invoice_ContractorDTOObj.Inv_Con_pkeyId;
      item.CCE_Client_Pay_Invoice_Id =
        this.Invoice_ClientDTOObj.Inv_Client_pkeyId;
      item.Type = 1;
    });

    postObj.CCEP_Data = JSON.stringify(this.expenses);
    postObj.WorkOrderID_mul = this.WorkOrderID_mul;
    this.xClientResultsInvoiceServices
      .ExpenseAdd_Multiple(JSON.stringify(postObj))
      .subscribe((response) => {
        this.MessageFlag = 'Data Saved...!';
        this.commonMessage();
        this.GetCon_ClintDataByWOId();
        this.resetModel();
      });
  }
  resetModel() {
    if (this.IsMultipleFunctionality) {
      this.ContractorInvoiceArray = [new ContractInvoiceModel()];
      this.ClientInvoiceArray = [new ClientInvoiceModel()];
      this.expenses = [new Expense()];
    }
  }
}
