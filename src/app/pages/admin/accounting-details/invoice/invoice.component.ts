import { Component, OnInit } from '@angular/core';
import { InvoceService } from './invoce-service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { ViewUserModel } from '../../../user/view-user/view-user-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  BankDeposit,
  Invoice,
  Invoice_Payment,
  ReceivePayment,
} from './invoice.model';
import { ClientServices } from '../client/client-service';
import { BidInvoiceItemViewTaskModel } from '../../bid-invoice-task/bid-invoice-task-model';
import { IplAppModalContent } from 'src/app/components';
import { finalize } from 'rxjs/operators';
import { AccClientfilterMasterModel } from '../client/client.model';
import { TaskServices } from '../task/task-service';
import { AccountServices } from '../account/account-service';
import { AccountingServices } from '../accounting-details.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  isHelpActive = false;
  MessageFlag: string;
  InvoiceList;
  CustomerList;
  TaskItemList;
  WKDivFlag = true;
  IsValid: boolean = false;
  isLoading: boolean = false;
  isLoadingPayment: boolean = false;
  IsLoad: boolean = true;
  button: string = 'Save';
  buttonPayment: string = 'Save Payment';
  depositbutton: string = 'Deposit';
  Invoice: Invoice = new Invoice();
  Invoice_Payment: Invoice_Payment = new Invoice_Payment();
  ReceivePayment: ReceivePayment = new ReceivePayment();
  formInvoiceCommonGroup: UntypedFormGroup;
  formInvoicePaymentGroup: UntypedFormGroup;
  formInvoiceReceivePaymentGroup: UntypedFormGroup;
  formInvoiceBankDepositGroup: UntypedFormGroup;
  filterMasterModelObj: AccClientfilterMasterModel = new AccClientfilterMasterModel();
  ViewUserModelObj: ViewUserModel = new ViewUserModel();
  BidInvoiceItemViewTaskModelObj: BidInvoiceItemViewTaskModel = new BidInvoiceItemViewTaskModel();
  CcBccLabelList = [];
  meridian = true;
  validEmail: boolean = false;
  EmailSubmit: boolean = false;
  InvoicePaymentPay: any = 0;
  dropdownSettingsProductServices = {};
  dropdownSettingsDepositTo = {};
  DepositAccountList: any = [];
  ReceivePaymentInvoiceList: any;
  TotalReceivedAmount: any = 0.0;
  BankDeposit: BankDeposit = new BankDeposit();
  PaidInvoiceList: any = [];
  Payment_Method_List = [];
  IsAlreadyDeposit: boolean = false;
  constructor(
    private taskServices: TaskServices,
    private InvoiceService: InvoceService,
    private clientServices: ClientServices,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private accountServices: AccountServices,
    private AccountingServices: AccountingServices
  ) {}

  ngOnInit(): void {
    this.formInvoiceCommonGroup = this.formBuilder.group({
      Invoice_Custome_Email: [
        '',
        Validators.compose([Validators.email]), //Validators.required,
      ],
      
    });
    this.Payment_Method_List = this.AccountingServices.GetPayment_Method_List();
    this.formInvoicePaymentGroup = this.formBuilder.group({
      Invoice_Pay_Amount: [
        '',
        Validators.compose([Validators.required]), //Validators.required,
      ],
      Invoice_Pay_CheckNumber: [
        '',
        Validators.compose([Validators.required]), //Validators.required,
      ],
    });
    this.formInvoiceReceivePaymentGroup = this.formBuilder.group({
     
    });
    this.formInvoiceBankDepositGroup = this.formBuilder.group({});
    this.GetGridData();
    this.GetCustomerList();
    this.GetTaskData();
    this.GetDepositAccountList();
    this.dropdownSettingsProductServices = {
      singleSelection: true,
      idField: 'Acc_Task_pkeyId',
      textField: 'Task_Name',
      allowSearchFilter: true,
    };
    this.dropdownSettingsDepositTo = {
      singleSelection: true,
      idField: 'Acc_pkeyId',
      textField: 'Acc_Account_Name',
      allowSearchFilter: true,
    };
  }
  GetDepositAccountList() {
    this.accountServices.GetAccountList().subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.DepositAccountList = result.Data;
      }
    });
  }
  GetTaskData() {
    this.taskServices.GetTaskall().subscribe((response) => {
      if (response.HttpStatusCode == 200) {
        if (response.Data[0] != null) {
          this.TaskItemList = response.Data[0].filter(
            (x) => x.Task_IsActive == 1
          );
        }
      }
    });
  }
 

  GetCustomerList() {
    this.filterMasterModelObj = new AccClientfilterMasterModel();
    this.filterMasterModelObj.Type = 3;
    this.clientServices
      .ClientListData(this.filterMasterModelObj)
      .subscribe((result) => {
        this.CustomerList = result[0];
      });
  }
  CheckIsOverDueDate(Invoice_Due_Date): boolean {
    let Result = false;
    let Number;
    Number = this.AccountingServices.DateCompare(new Date(Invoice_Due_Date));
    if (Number == 1) {
      Result = true;
    }
    return Result;
  }
  changeInvoiceCustomer(Customer_Id) {
    let obj = this.CustomerList.find(
      (x) => x.Acc_Client_pkeyId == Number(Customer_Id)
    );
    if (obj != null && obj != undefined) {
      this.Invoice.Invoice_Custome_Email = obj.ContactEmail;
    } else {
      this.Invoice.Invoice_Custome_Email = '';
    }
  }
  GetGridData() {
    this.IsLoad = true;
    this.InvoiceService.GetInvoiceList()
      .pipe(finalize(() => (this.IsLoad = false)))
      .subscribe((result) => {
        this.InvoiceList = result.Data;
        if (
          this.InvoiceList != null &&
          this.InvoiceList != undefined &&
          this.InvoiceList.length > 0
        )
          this.InvoiceList.forEach((element) => {
            element.Invoice_Date = new Date(element.Invoice_Date);
            
          });
      });
  }
  AddNewInvoice(InvoiceFORM) {
    this.open(InvoiceFORM);
  }
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  onChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
    }
  }
  FormButtonPOPUp(EditInvoiceForm) {
    if (EditInvoiceForm.invalid) {
      return;
    }

    this.IsValid = true;
    if (
      this.Invoice.Invoice_CustomeId == null ||
      this.Invoice.Invoice_CustomeId == undefined ||
      this.Invoice.Invoice_CustomeId == 0
    ) {
      return;
    }
    if (
      this.Invoice.Invoice_Items != null &&
      this.Invoice.Invoice_Items.length > 0
    ) {
      let index = 0;
      this.Invoice.Invoice_Items.forEach((element) => {
        if (
          element.TaskListId == null ||
          element.TaskListId == undefined ||
          element.TaskListId.length == 0
        ) {
          this.IsValid = false;
          
        } else {
          element.Task_Id = Number(element.TaskListId[0].Acc_Task_pkeyId);
        }
        index++;
      });
    }
    if (!this.IsValid) return;
    this.button = 'Progressing..';
    this.isLoading = true;
    if (
      this.Invoice.Invoice_Send_to != null &&
      this.Invoice.Invoice_Send_to != undefined &&
      !this.Invoice.Invoice_Send_to
    ) {
      this.Invoice.Invoice_Send_to_DateTime = null;
      this.Invoice.Invoice_Send_to_Time = null;
    } else {
      var date = new Date(this.Invoice.Invoice_Send_to_DateTime);
      date.setHours(
        this.Invoice.Invoice_Send_to_Time.hour,
        this.Invoice.Invoice_Send_to_Time.minute,
        0
      ); // Set hours, minutes and seconds
      this.Invoice.Invoice_Send_to_DateTime = date;
    }
    if (
      this.Invoice.Invoice_Due_Date == null ||
      this.Invoice.Invoice_Due_Date == undefined
    ) {
      this.Invoice.Invoice_Due_Date = new Date();
    }
    this.Invoice.Invoice_Balance_Due = this.Invoice.Invoice_Total;
    this.changeTaxbleAmount();
    this.Invoice.Invoice_CcBcc_Label = Array.prototype.map
      .call(this.CcBccLabelList, function (item) {
        return item.Label;
      })
      .join(',');
    if (
      this.Invoice.Invoice_Due_Date == null ||
      this.Invoice.Invoice_Due_Date == undefined
    ) {
      this.Invoice.Invoice_Due_Date = new Date();
    }
    if (
      this.Invoice.Invoice_Send_to_DateTime == null ||
      this.Invoice.Invoice_Send_to_DateTime == undefined
    ) {
      this.Invoice.Invoice_Send_to_DateTime = new Date();
    }
    this.InvoiceService.CreateUpdateInvoiceData(this.Invoice)
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.button = 'Save')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.button = 'Save';
          this.isLoading = false;
          this.GetGridData();
          this.close();
          this.reset();
        }
        this.commonMessage(result.Message);
      });
  }
  DeleteInvoice(Invoice_Id) {
    var cfrm = confirm('Are you Sure you want to  Delete this Record...!');
    if (cfrm == true) {
      this.Invoice.Invoice_pkeyId = Invoice_Id;
      this.Invoice.Invoice_IsDelete = true;

      this.InvoiceService.CreateUpdateInvoiceData(this.Invoice).subscribe(
        (result) => {
          if (result.HttpStatusCode == 200) {
            this.GetGridData();
            this.reset();
          }
          this.commonMessage(result.Message);
        }
      );
    }
  }
  CheckInvoicePaymentValid() {
    if (
      Number(this.Invoice_Payment.Invoice_Pay_Amount) > 0 &&
      Number(this.Invoice.Invoice_Balance_Due) > 0
    ) {
      if (
        Number(this.Invoice_Payment.Invoice_Pay_Amount) >
        Number(this.Invoice.Invoice_Balance_Due)
      ) {
        this.Invoice_Payment.Invoice_Pay_Amount = Number(
          this.Invoice.Invoice_Balance_Due
        );
      }
    } else {
      this.Invoice_Payment.Invoice_Pay_Amount = 0;
    }
  }

  FormButtonPOPUpPayment(EditInvoicePaymentForm) {
    if (EditInvoicePaymentForm.invalid) {
      return;
    }
    if (Number(this.Invoice_Payment.Invoice_Pay_Amount) == 0) {
      return;
    }
    if (Number(this.Invoice_Payment.Invoice_Pay_CheckNumber) == 0) {
      return;
    }
    this.buttonPayment = 'Payment Progressing..';
    this.isLoadingPayment = true;
    this.Invoice_Payment.Invoice_Pay_Customer_Id = this.Invoice.Invoice_CustomeId;
    this.Invoice_Payment.Invoice_Pay_Invoice_Id = this.Invoice.Invoice_pkeyId;
    this.InvoiceService.CreateUpdateInvoicePaymentData(this.Invoice_Payment)
      .pipe(finalize(() => (this.isLoadingPayment = false)))
      .pipe(finalize(() => (this.buttonPayment = 'Save Payment')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.Invoice_Payment = new Invoice_Payment();
          this.commonMessage('Invoice Payment Successfully Save..');
          this.GetInvoiceDetail(this.Invoice.Invoice_pkeyId);
          EditInvoicePaymentForm.submitted = false;
        }
      });
  }
  GetInvoiceDetail(Id, InvoiceFORM?) {
    if (Id > 0) {
      this.InvoiceService.GetInvoice(Id).subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.Invoice = result.Data;
          this.Invoice.Invoice_Date = new Date(this.Invoice.Invoice_Date);
          this.Invoice.Invoice_Send_to_DateTime = this.convertTimeLocalToUTC(
            new Date(this.Invoice.Invoice_Send_to_DateTime)
          );
          if (
            this.Invoice.Invoice_Send_to_DateTime != null &&
            this.Invoice.Invoice_Send_to_DateTime != undefined
          ) {
            this.Invoice.Invoice_Send_to_Time = { hour: 0, minute: 0 };
            this.Invoice.Invoice_Send_to_Time.hour = this.Invoice.Invoice_Send_to_DateTime.getHours();
            this.Invoice.Invoice_Send_to_Time.minute = this.Invoice.Invoice_Send_to_DateTime.getMinutes();
          }
          this.Invoice.Invoice_Due_Date = this.convertTimeLocalToUTC(
            new Date(this.Invoice.Invoice_Due_Date)
          );
          if (
            this.Invoice.Invoice_Terms == null ||
            this.Invoice.Invoice_Terms == undefined
          ) {
            this.Invoice.Invoice_Terms = 0;
          }
          if (
            this.Invoice.Invoice_Items == null ||
            this.Invoice.Invoice_Items == undefined ||
            this.Invoice.Invoice_Items.length == 0
          ) {
            this.AddInvoiceItem();
          } else {
            this.Invoice.Invoice_Items.forEach((element) => {
              if (element.Task_Id != null && element.Task_Id > 0) {
                let Task = this.TaskItemList.find(
                  (x) => x.Acc_Task_pkeyId == Number(element.Task_Id)
                );
                if (Task != null && Task != undefined) {
                  element.TaskListId = [
                    {
                      Acc_Task_pkeyId: Task.Acc_Task_pkeyId,
                      Task_Name: Task.Task_Name,
                    },
                  ];
                }
              }
            });
          }
          this.InvoicePaymentPay = 0;
          if (
            this.Invoice.Invoice_Payments != null &&
            this.Invoice.Invoice_Payments != undefined &&
            this.Invoice.Invoice_Payments.length > 0
          ) {
            this.Invoice.Invoice_Payments.forEach((element) => {
              this.InvoicePaymentPay += Number(element.Invoice_Pay_Amount);
              element.Invoice_Pay_Payment_Date = this.getFormattedDate(
                element.Invoice_Pay_Payment_Date
              );
            });
            this.Invoice.Invoice_Balance_Due =
              this.Invoice.Invoice_Balance_Due - this.InvoicePaymentPay;
          }
          if (InvoiceFORM != null && InvoiceFORM != undefined)
            this.open(InvoiceFORM);
          this.Invoice.Invoice_CcBcc = true;
          if (
            this.Invoice.Invoice_CcBcc_Label != null &&
            this.Invoice.Invoice_CcBcc_Label != undefined &&
            this.Invoice.Invoice_CcBcc_Label != ''
          ) {
            let item = this.Invoice.Invoice_CcBcc_Label.split(',');
            if (item != null && item.length > 0) {
              item.forEach((element) => {
                this.CcBccLabelList.push({
                  Id: this.CcBccLabelList.length + 1,
                  Label: element,
                });
              });
            }
          }
          this.TotalReceivedAmount = 0;
          this.Invoice.Receive_Invoice_Items.forEach((element) => {
            this.TotalReceivedAmount += Number(element.Invoice_Rec_Payment);
          });
          this.Invoice.Invoice_CcBcc_Label = '';
        }
      });
    }
  }
  RemoveInvoicePayment(InvoicePayment) {
    InvoicePayment.Type = 3;
    this.InvoiceService.CreateUpdateInvoicePaymentData(
      InvoicePayment
    ).subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.GetInvoiceDetail(this.Invoice.Invoice_pkeyId);
        this.commonMessage(result.Message);
      }
    });
  }
  convertTimeLocalToUTC(serverdate) {
    var date = new Date(serverdate);
   
    var locdat = new Date(date + ' UTC');
    return locdat;
  }
  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  RemoveWhiteSpaceText(str: string) {
    if (!str) return str;
    return str.replace(/^\s+/g, '');
  }
  RemoveWhiteSpace(str: string, item, index) {
    this.Invoice.Invoice_Items[index][item] = this.RemoveWhiteSpaceText(str);
  }
  RemoveWhiteSpaceInvoice(label) {
    this.Invoice.Invoice_CcBcc_Label = this.RemoveWhiteSpaceText(label);
    this.onChange(this.Invoice.Invoice_CcBcc_Label);
  }
  RemoveWhiteSpaceInvoicePayemnt(field, str) {
    this.Invoice_Payment[field] = this.RemoveWhiteSpaceText(str);
  }
  onChangeInvoiceItems(item) {
    if (item != null) {
      item.QTY = Number(item.QTY);
      item.Rate = Number(item.Rate);
      item.Amount = Number(item.Amount);
      item.Amount = item.QTY * item.Rate;
      this.Invoice.Invoice_Sub_total = 0;
      this.Invoice.Invoice_Items.forEach((element) => {
        this.Invoice.Invoice_Sub_total += Number(element.Amount);
      });
      this.Invoice.Invoice_Total = 0;
      this.Invoice.Invoice_Total =
        Number(this.Invoice.Invoice_Sub_total) +
        Number(this.Invoice.Invoice_Taxble_Amount);
      this.Invoice.Invoice_Balance_Due = 0;
      this.Invoice.Invoice_Balance_Due = this.Invoice.Invoice_Total;
    }
  }
  changeTaxbleAmount() {
    this.Invoice.Invoice_Sub_total = 0;
    this.Invoice.Invoice_Items.forEach((element) => {
      this.Invoice.Invoice_Sub_total += Number(element.Amount);
    });
    this.Invoice.Invoice_Total = 0;
    this.Invoice.Invoice_Total =
      Number(this.Invoice.Invoice_Sub_total) +
      Number(this.Invoice.Invoice_Taxble_Amount);
    this.Invoice.Invoice_Balance_Due = 0;
    this.Invoice.Invoice_Balance_Due = this.Invoice.Invoice_Total;
  }

  getFormattedDate(date) {
    date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }
  commonMessage(Message) {
    const modalRef = this.xmodalService.open(IplAppModalContent, {
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.MessageFlag = Message;
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
  AddCcBccLabel() {
    if (
      this.Invoice.Invoice_CcBcc_Label != null &&
      this.Invoice.Invoice_CcBcc_Label != undefined &&
      this.Invoice.Invoice_CcBcc_Label != ''
    ) {
      this.EmailSubmit = true;
      this.onChange(this.Invoice.Invoice_CcBcc_Label);
      if (this.validEmail) {
        this.CcBccLabelList.push({
          Id: this.CcBccLabelList.length + 1,
          Label: this.Invoice.Invoice_CcBcc_Label,
        });
        this.Invoice.Invoice_CcBcc_Label = '';
        this.EmailSubmit = false;
      }
    }
  }
  RemoveCcBccLabel(index) {
    this.CcBccLabelList.splice(index, 1);
  }
  close() {
    this.xmodalService.dismissAll();
    this.reset();
  }

  reset() {
    this.Invoice = new Invoice();
    this.Invoice_Payment = new Invoice_Payment();
    this.CcBccLabelList = [];
    this.InvoicePaymentPay = 0;
    this.IsAlreadyDeposit = false;
    this.ReceivePayment = new ReceivePayment();
  }
  AddInvoiceItem() {
    this.Invoice.Invoice_Items.push({
      Invoice_Items_PkeyId: 0,
      Invoice_Id: 0,
      Task_Id: '0',
      TaskListId: [],
      QTY: '0',
      Rate: '0',
      Amount: '0',
      Tax: false,
      Class: 0,
      Descp: '',
      Inv_Client_Ch_pkeyId: 0,
      Inv_Client_Ch_Wo_Id: 0,
      Inv_Client_pkeyId: 0,
    });
  }
  RemoveInvoiceItems(index) {
    this.Invoice.Invoice_Items.splice(index, 1);
    this.changeTaxbleAmount();
  }
  RemoveAll() {
    this.Invoice.Invoice_Items = [];
    this.changeTaxbleAmount();
  }
  ReceivePaymentModel(invoice, ReceivePaymentFORM) {
    if (
      invoice.Invoice_CustomeId != null &&
      invoice.Invoice_CustomeId != undefined &&
      invoice.Invoice_CustomeId > 0
    ) {
      this.GetInvoiceDetailsForReceivePayment(
        invoice.Invoice_CustomeId,
        invoice.Invoice_pkeyId,
        this.ReceivePayment.Invoice_Number
      );
    }
    this.open(ReceivePaymentFORM);
  }
  ReceivePaymentClick(Invoice_CustomeId, Invoice_pkeyId, ReceivePaymentFORM) {
    this.close();
    // setTimeout(() => {
    this.GetInvoiceDetailsForReceivePayment(
      Invoice_CustomeId,
      Invoice_pkeyId,
      null
    );
    this.open(ReceivePaymentFORM);
    //  }, 2000);
  }
  changeCustomer(Invoice_CustomeId, Invoice_Number) {
    if (Invoice_CustomeId > 0) {
      this.GetInvoiceDetailsForReceivePayment(
        Invoice_CustomeId,
        0,
        Invoice_Number
      );
    } else {
      this.ReceivePayment = new ReceivePayment();
    }
  }
  GetInvoiceDetailsForReceivePayment(
    Invoice_CustomeId,
    Invoice_Id,
    Invoice_Number
  ) {
    this.ReceivePayment.Invoice_Rec_Customer_Id = Invoice_CustomeId;
    this.InvoiceService.GetInvoiceByCustomerId(
      Invoice_CustomeId,
      Invoice_Number
    ).subscribe((response) => {
      if (response.HttpStatusCode == 200) {
        //debugger;
        this.ReceivePaymentInvoiceList = response.Data;
        this.ReceivePayment.Receive_Invoice_Items = [];
        this.ReceivePayment.Invoice_Rec_Customer_Id = this.ReceivePaymentInvoiceList.Receive_Invoice_Items[0].Invoice_CustomeId;
        this.ReceivePayment.Receive_Invoice_Items = this.ReceivePaymentInvoiceList.Receive_Invoice_Items;
        this.ReceivePayment.Receive_Invoice_Items.forEach((element) => {
          if (
            element.Invoice_Rec_Deposit_To != null &&
            element.Invoice_Rec_Deposit_To != undefined &&
            element.Invoice_Rec_Deposit_To > 0
          ) {
            this.ReceivePayment.Payment_Deposit_To_ListId = [
              {
                Acc_pkeyId: element.Invoice_Rec_Deposit_To,
                Acc_Account_Name: this.DepositAccountList.find(
                  (x) => x.Acc_pkeyId == element.Invoice_Rec_Deposit_To
                ).Acc_Account_Name,
              },
            ];
            this.IsAlreadyDeposit = true;
          }
          if (Invoice_Id == element.Invoice_Rec_Invoice_Id)
            element.Select = true;
          else element.Select = false;
        });
        let GetLendgth = this.ReceivePayment.Receive_Invoice_Items.length;
        if (
          GetLendgth ===
          this.ReceivePayment.Receive_Invoice_Items.filter((x, i) => {
            return x.Select;
          }).length
        ) {
          this.ReceivePayment.SelectAll = true;
        } else {
          this.ReceivePayment.SelectAll = false;
        }
        this.CalculateReceivePaymentAmount();
      }
    });
  }
  toggleWithGreeting(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
  FormButtonInvoiceNumber(Invoice_Number) {
    if (
      Invoice_Number != null &&
      Invoice_Number != undefined &&
      Invoice_Number != ''
    ) {
      this.GetInvoiceDetailsForReceivePayment(0, 0, Invoice_Number);
    } else {
      if (
        this.ReceivePayment.Invoice_Rec_Customer_Id != null &&
        this.ReceivePayment.Invoice_Rec_Customer_Id != undefined &&
        this.ReceivePayment.Invoice_Rec_Customer_Id > 0
      )
        this.GetInvoiceDetailsForReceivePayment(
          this.ReceivePayment.Invoice_Rec_Customer_Id,
          0,
          null
        );
    }
  }
  ChangesSelectAll(status) {
    this.ReceivePayment.Receive_Invoice_Items.forEach((element) => {
      element.Select = status;
      if (!element.Select) element.Pending_Amount = 0;
      else element.Pending_Amount = element.Invoice_Rec_Original_Amount;
    });
    this.CalculateReceivePaymentAmount();
  }
  ChangeSelect(status, index) {
    this.ReceivePayment.Receive_Invoice_Items[index].Select = status;
    if (!this.ReceivePayment.Receive_Invoice_Items[index].Select) {
      this.ReceivePayment.Receive_Invoice_Items[index].Pending_Amount = 0;
    } else {
      this.ReceivePayment.Receive_Invoice_Items[
        index
      ].Pending_Amount = this.ReceivePayment.Receive_Invoice_Items[
        index
      ].Invoice_Rec_Original_Amount;
    }
    let GetLendgth = this.ReceivePayment.Receive_Invoice_Items.length;
    if (
      GetLendgth ===
      this.ReceivePayment.Receive_Invoice_Items.filter((x, i) => {
        return x.Select;
      }).length
    ) {
      this.ReceivePayment.SelectAll = true;
    } else {
      this.ReceivePayment.SelectAll = false;
    }
    this.CalculateReceivePaymentAmount();
  }
  changeReceivePaymentAmount(items, index) {
    if (
      items.Invoice_Rec_Items_Payment != null &&
      items.Invoice_Rec_Items_Payment != undefined &&
      items.Invoice_Rec_Items_Payment > 0
    ) {
      items.Invoice_Rec_Items_Payment = Number(items.Invoice_Rec_Items_Payment);
      if (
        Number(items.Invoice_Rec_Items_Payment) >
        items.Invoice_Rec_Items_Original_Amount
      ) {
        items.Invoice_Rec_Items_Payment =
          items.Invoice_Rec_Items_Original_Amount;
      }
    }
    this.CalculateReceivePaymentAmount();
  }
  CalculateReceivePaymentAmount() {
    this.ReceivePayment.Invoice_Rec_Amount = 0;
    this.ReceivePayment.Receive_Invoice_Items.forEach((element) => {
      if (element.Select)
        this.ReceivePayment.Invoice_Rec_Amount += Number(
          element.Pending_Amount
        );
    });
    this.ReceivePayment.Amount_Receive = this.ReceivePayment.Invoice_Rec_Amount;
  }
  FormButtonPOPUpReceivePayment(ReceivePaymentForm) {
    if (ReceivePaymentForm.invalid) {
      return;
    }
    if (this.ReceivePayment.Invoice_Rec_Customer_Id == 0) {
      return;
    }
    if (
      this.ReceivePayment.Receive_Invoice_Items.filter((x, i) => {
        return x.Select;
      }).length == 0
    ) {
      this.commonMessage('Please Select any Invoice..');
      return;
    }
    let OnlySelectedItems = this.ReceivePayment.Receive_Invoice_Items.filter(
      (x, i) => {
        return x.Select;
      }
    );
    this.ReceivePayment.Receive_Invoice_Items = OnlySelectedItems;
    this.button = 'Progressing..';
    this.isLoading = true;
    if (
      this.ReceivePayment.Payment_Deposit_To_ListId != null &&
      this.ReceivePayment.Payment_Deposit_To_ListId != undefined &&
      this.ReceivePayment.Payment_Deposit_To_ListId.length > 0
    )
      this.ReceivePayment.Invoice_Rec_Deposit_To = this.ReceivePayment.Payment_Deposit_To_ListId[0].Acc_pkeyId;
    this.InvoiceService.CreateUpdateInvoiceReceivePaymentData(
      this.ReceivePayment
    )
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.button = 'Save')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.ReceivePayment = new ReceivePayment();
          this.commonMessage(result.Message);
          this.GetGridData();
          this.close();
        } else {
          this.commonMessage(result.Message);
        }
      });
  }
  BankDepositModel(BankDepositFORM) {
    this.BankDeposit = new BankDeposit();
    this.InvoiceService.GetPaidInvoiceList().subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.PaidInvoiceList = result.Data;
        this.BankDeposit.BankDeposit_Items = [];
        this.BankDeposit.BankDeposit_Items = this.PaidInvoiceList;
        this.BankDeposit.BankDeposit_Items.forEach((element) => {
          this.BankDeposit.TotalAmount += Number(element.Amount);
        });
      }
    });
    this.open(BankDepositFORM);
  }
  ChangesPaidInvoiceSelectAll(status) {
    this.BankDeposit.BankDeposit_Items.forEach((element) => {
      element.Select = status;
    });
    this.CalculateBankDepositAmount();
  }
  ChangePaidInvoiceSelect(status, index) {
    this.BankDeposit.BankDeposit_Items[index].Select = status;
    let GetLendgth = this.BankDeposit.BankDeposit_Items.length;
    if (
      GetLendgth ===
      this.BankDeposit.BankDeposit_Items.filter((x, i) => {
        return x.Select;
      }).length
    ) {
      this.BankDeposit.SelectAll = true;
    } else {
      this.BankDeposit.SelectAll = false;
    }
    this.CalculateBankDepositAmount();
  }
  CalculateBankDepositAmount() {
    this.BankDeposit.SelectedAmount = 0;
    this.BankDeposit.BankDeposit_Items.forEach((element) => {
      if (element.Select)
        this.BankDeposit.SelectedAmount += Number(element.Amount);
    });
  }
  FormButtonPOPUpBankDeposit(BankDepositForm) {
    if (BankDepositForm.invalid) {
      return;
    }
    if (
      this.BankDeposit.Deposit_To_ListId != null &&
      this.BankDeposit.Deposit_To_ListId != undefined &&
      this.BankDeposit.Deposit_To_ListId.length != 0
    ) {
      this.BankDeposit.Deposit_To = this.BankDeposit.Deposit_To_ListId[0].Acc_pkeyId;
    } else {
      return;
    }
    if (this.BankDeposit.Deposit_To == 0) {
      return;
    }
    if (
      this.BankDeposit.BankDeposit_Items.filter((x, i) => {
        return x.Select;
      }).length == 0
    ) {
      this.commonMessage('Please Select any Item..');
      return;
    }
    let OnlySelectedItems = this.BankDeposit.BankDeposit_Items.filter(
      (x, i) => {
        return x.Select;
      }
    );
    this.BankDeposit.BankDeposit_Items = OnlySelectedItems;
    this.depositbutton = 'Depositing....';
    this.isLoading = true;
    this.InvoiceService.BankDeposit(this.BankDeposit)
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.depositbutton = 'Deposit')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.commonMessage(result.Message);
          this.GetGridData();
          this.close();
        } else {
          this.commonMessage(result.Message);
        }
      });
  }
  get fx() {
    return this.formInvoiceCommonGroup.controls;
  }
  get fp() {
    return this.formInvoicePaymentGroup.controls;
  }
  open(content) {
    this.WKDivFlag = false;
    this.xmodalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.WKDivFlag = true;
        },
        (reason) => {
          this.WKDivFlag = true;
        }
      );
  }
  commMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commMessage();
    }
  }

  DispalyInfo(event: Event, lblName)
  {    
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commMessage();
    }    
  }
}
