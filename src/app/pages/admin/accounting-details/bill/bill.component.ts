import { Component, OnInit } from '@angular/core';
import { BillService } from './bill-service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { ViewUserModel } from '../../../user/view-user/view-user-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankDeposit, Bill, Bill_Payment } from './bill.model';
import { IplAppModalContent } from 'src/app/components';
import { finalize } from 'rxjs/operators';
import { TaskServices } from '../task/task-service';
import { Vendor } from '../contractors/contractors.model';
import { ContractorsServices } from '../contractors/contractors-service';
import { AccountingServices } from '../accounting-details.service';
import { ReceivePayment } from './bill.model';
import { AccountServices } from '../account/account-service';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  isHelpActive = false;
  MessageFlag: string;
  BillList;
  VendorList;
  TaskItemList;
  WKDivFlag = true;
  IsValid: boolean = false;
  isLoading: boolean = false;
  isLoadingPayment: boolean = false;
  button: string = 'Save';
  buttonPayment: string = 'Save Payment';
  depositbutton: string = 'Deposit';
  Bill: Bill = new Bill();
  Bill_Payment: Bill_Payment = new Bill_Payment();
  formbillCommonGroup: UntypedFormGroup;
  formbillPaymentGroup: UntypedFormGroup;
  formBillReceivePaymentGroup: UntypedFormGroup;
  formBillBankDepositGroup: UntypedFormGroup;
  filterMasterModelObj: Vendor = new Vendor();
  ViewUserModelObj: ViewUserModel = new ViewUserModel();
  CcBccLabelList = [];
  meridian = true;
  validEmail: boolean = false;
  EmailSubmit: boolean = false;
  BillPaymentPay: any = 0;
  IsLoad: boolean = false;
  ReceivePayment: ReceivePayment = new ReceivePayment();
  dropdownSettingsProductServices = {};
  dropdownSettingsDepositTo = {};
  DepositAccountList: any = [];
  Payment_Method_List = [];
  ReceivePaymentBillList: any;
  IsAlreadyDeposit: boolean = false;
  TotalReceivedAmount: any = 0.0;
  BankDeposit: BankDeposit = new BankDeposit();
  PaidInvoiceList: any = [];
  constructor(
    private taskServices: TaskServices,
    private billService: BillService,
    private contractorsServices: ContractorsServices,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private AccountingServices: AccountingServices,
    private accountServices: AccountServices
  ) {}

  ngOnInit(): void {
    this.formbillCommonGroup = this.formBuilder.group({
      Bill_Vendor_Email: [
        '',
        Validators.compose([Validators.email]), //Validators.required,
      ],
      // Bill_Due_Date: ['', Validators.required],
    });
    this.formBillReceivePaymentGroup = this.formBuilder.group({});
    this.Payment_Method_List = this.AccountingServices.GetPayment_Method_List();
    this.formbillPaymentGroup = this.formBuilder.group({
      Bill_Pay_Amount: [
        '',
        Validators.compose([Validators.required]), //Validators.required,
      ],
      Bill_Pay_CheckNumber: [
        '',
        Validators.compose([Validators.required]), //Validators.required,
      ],
    });
    this.formBillBankDepositGroup = this.formBuilder.group({});
    this.GetGridData();
    this.GetVendorList();
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

  CheckIsOverDueDate(Bill_Due_Date): boolean {
    let Result = false;
    let Number;
    Number = this.AccountingServices.DateCompare(new Date(Bill_Due_Date));
    if (Number == 1) {
      Result = true;
    }
    return Result;
  }
  GetVendorList() {
    this.filterMasterModelObj = new Vendor();
    this.contractorsServices
      .GetVendorListData(this.filterMasterModelObj)
      .subscribe((result) => {
        this.VendorList = result.Data[0];
      });
  }

  GetGridData() {
    this.IsLoad = true;
    this.billService
      .GetBillList()
      .pipe(finalize(() => (this.IsLoad = false)))
      .subscribe((result) => {
        this.BillList = result.Data;
        if (
          this.BillList != null &&
          this.BillList != undefined &&
          this.BillList.length > 0
        )
          this.BillList.forEach((element) => {
            element.Bill_Date = new Date(element.Bill_Date);
          });
      });
  }
  AddNewBill(BillFORM) {
    this.open(BillFORM);
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
  FormButtonPOPUp(EditBillForm) {
    if (EditBillForm.invalid) {
      return;
    }

    this.IsValid = true;
    if (
      this.Bill.Bill_VendorId == null ||
      this.Bill.Bill_VendorId == undefined ||
      this.Bill.Bill_VendorId == 0
    ) {
      return;
    }
    if (this.Bill.Bill_Items != null && this.Bill.Bill_Items.length > 0) {
      let index = 0;
      this.Bill.Bill_Items.forEach((element) => {
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
      this.Bill.Bill_Send_to != null &&
      this.Bill.Bill_Send_to != undefined &&
      !this.Bill.Bill_Send_to
    ) {
      this.Bill.Bill_Send_to_DateTime = null;
      this.Bill.Bill_Send_to_Time = null;
    } else {
      var date = new Date(this.Bill.Bill_Send_to_DateTime);
      date.setHours(
        this.Bill.Bill_Send_to_Time.hour,
        this.Bill.Bill_Send_to_Time.minute,
        0
      ); // Set hours, minutes and seconds
      this.Bill.Bill_Send_to_DateTime = date;
    }

    this.Bill.Bill_Balance_Due = this.Bill.Bill_Total;
    this.changeTaxbleAmount();
    this.Bill.Bill_CcBcc_Label = Array.prototype.map
      .call(this.CcBccLabelList, function (item) {
        return item.Label;
      })
      .join(',');
    if (
      this.Bill.Bill_Due_Date == null ||
      this.Bill.Bill_Due_Date == undefined
    ) {
      this.Bill.Bill_Due_Date = new Date();
    }
    if (
      this.Bill.Bill_Send_to_DateTime == null ||
      this.Bill.Bill_Send_to_DateTime == undefined
    ) {
      this.Bill.Bill_Send_to_DateTime = new Date();
    }
    this.billService
      .CreateUpdateBillData(this.Bill)
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
  CheckBillPaymentValid() {
    if (
      Number(this.Bill_Payment.Bill_Pay_Amount) > 0 &&
      Number(this.Bill.Bill_Balance_Due) > 0
    ) {
      if (
        Number(this.Bill_Payment.Bill_Pay_Amount) >
        Number(this.Bill.Bill_Balance_Due)
      ) {
        this.Bill_Payment.Bill_Pay_Amount = Number(this.Bill.Bill_Balance_Due);
      }
    } else {
      this.Bill_Payment.Bill_Pay_Amount = 0;
    }
  }
  FormButtonPOPUpPayment(EditBillPaymentForm) {
    if (EditBillPaymentForm.invalid) {
      return;
    }
    if (Number(this.Bill_Payment.Bill_Pay_Amount) == 0) {
      return;
    }
    if (Number(this.Bill_Payment.Bill_Pay_CheckNumber) == 0) {
      return;
    }
    this.buttonPayment = 'Payment Progressing..';
    this.isLoadingPayment = true;
    this.Bill_Payment.Bill_Pay_Vendor_Id = this.Bill.Bill_VendorId;
    this.Bill_Payment.Bill_Pay_Bill_Id = this.Bill.Bill_pkeyId;
    this.billService
      .CreateUpdateBillPaymentData(this.Bill_Payment)
      .pipe(finalize(() => (this.isLoadingPayment = false)))
      .pipe(finalize(() => (this.buttonPayment = 'Save Payment')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.Bill_Payment = new Bill_Payment();
          this.commonMessage('Bill Payment Successfully Save..');
          this.GetBillDetail(this.Bill.Bill_pkeyId);
          EditBillPaymentForm.submitted = false;
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
  GetBillDetail(Id, BillFORM?) {
    if (Id > 0) {
      this.billService.GetBill(Id).subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.Bill = result.Data;
          this.Bill.Bill_Date = new Date(this.Bill.Bill_Date);
          this.Bill.Bill_Send_to_DateTime = this.convertTimeLocalToUTC(
            new Date(this.Bill.Bill_Send_to_DateTime)
          );
          if (
            this.Bill.Bill_Send_to_DateTime != null &&
            this.Bill.Bill_Send_to_DateTime != undefined
          ) {
            this.Bill.Bill_Send_to_Time = { hour: 0, minute: 0 };
            this.Bill.Bill_Send_to_Time.hour = this.Bill.Bill_Send_to_DateTime.getHours();
            this.Bill.Bill_Send_to_Time.minute = this.Bill.Bill_Send_to_DateTime.getMinutes();
          }
          this.Bill.Bill_Due_Date = new Date(this.Bill.Bill_Due_Date);
          if (
            this.Bill.Bill_Terms == null ||
            this.Bill.Bill_Terms == undefined
          ) {
            this.Bill.Bill_Terms = 0;
          }
          if (
            this.Bill.Bill_Items == null ||
            this.Bill.Bill_Items == undefined ||
            this.Bill.Bill_Items.length == 0
          ) {
            this.AddBillItem();
          } else {
            this.Bill.Bill_Items.forEach((element) => {
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
          this.BillPaymentPay = 0;
          if (
            this.Bill.Bill_Payments != null &&
            this.Bill.Bill_Payments != undefined &&
            this.Bill.Bill_Payments.length > 0
          ) {
            this.Bill.Bill_Payments.forEach((element) => {
              this.BillPaymentPay += Number(element.Bill_Pay_Amount);
              element.Bill_Pay_Payment_Date = this.getFormattedDate(
                element.Bill_Pay_Payment_Date
              );
            });
            this.Bill.Bill_Balance_Due =
              this.Bill.Bill_Balance_Due - this.BillPaymentPay;
          }
          if (BillFORM != null && BillFORM != undefined) this.open(BillFORM);
          this.Bill.Bill_CcBcc = true;
          if (
            this.Bill.Bill_CcBcc_Label != null &&
            this.Bill.Bill_CcBcc_Label != undefined &&
            this.Bill.Bill_CcBcc_Label != ''
          ) {
            let item = this.Bill.Bill_CcBcc_Label.split(',');
            if (item != null && item.length > 0) {
              item.forEach((element) => {
                this.CcBccLabelList.push({
                  Id: this.CcBccLabelList.length + 1,
                  Label: element,
                });
              });
            }
          }
          this.Bill.Bill_CcBcc_Label = '';
          this.TotalReceivedAmount = 0;
          this.Bill.Receive_Bill_Items.forEach((element) => {
            this.TotalReceivedAmount += Number(element.Bill_Rec_Payment);
          });
        }
      });
    }
  }
  RemoveBillPayment(BillPayment) {
    BillPayment.Type = 3;
    this.billService
      .CreateUpdateBillPaymentData(BillPayment)
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.GetBillDetail(this.Bill.Bill_pkeyId);
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
    this.Bill.Bill_Items[index][item] = this.RemoveWhiteSpaceText(str);
  }
  RemoveWhiteSpaceBill(label) {
    this.Bill.Bill_CcBcc_Label = this.RemoveWhiteSpaceText(label);
    this.onChange(this.Bill.Bill_CcBcc_Label);
  }
  RemoveWhiteSpaceBillPayemnt(field, str) {
    this.Bill_Payment[field] = this.RemoveWhiteSpaceText(str);
  }
  onChangeBillItems(item) {
    if (item != null) {
      item.QTY = Number(item.QTY);
      item.Rate = Number(item.Rate);
      item.Amount = Number(item.Amount);
      item.Amount = item.QTY * item.Rate;
      this.Bill.Bill_Sub_total = 0;
      this.Bill.Bill_Items.forEach((element) => {
        this.Bill.Bill_Sub_total += Number(element.Amount);
      });
      this.Bill.Bill_Total = 0;
      this.Bill.Bill_Total =
        Number(this.Bill.Bill_Sub_total) + Number(this.Bill.Bill_Taxble_Amount);
      this.Bill.Bill_Balance_Due = 0;
      this.Bill.Bill_Balance_Due = this.Bill.Bill_Total;
    }
  }
  changeTaxbleAmount() {
    this.Bill.Bill_Sub_total = 0;
    this.Bill.Bill_Items.forEach((element) => {
      this.Bill.Bill_Sub_total += Number(element.Amount);
    });
    this.Bill.Bill_Total = 0;
    this.Bill.Bill_Total =
      Number(this.Bill.Bill_Sub_total) + Number(this.Bill.Bill_Taxble_Amount);
    this.Bill.Bill_Balance_Due = 0;
    this.Bill.Bill_Balance_Due = this.Bill.Bill_Total;
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
      this.Bill.Bill_CcBcc_Label != null &&
      this.Bill.Bill_CcBcc_Label != undefined &&
      this.Bill.Bill_CcBcc_Label != ''
    ) {
      this.EmailSubmit = true;
      this.onChange(this.Bill.Bill_CcBcc_Label);
      if (this.validEmail) {
        this.CcBccLabelList.push({
          Id: this.CcBccLabelList.length + 1,
          Label: this.Bill.Bill_CcBcc_Label,
        });
        this.Bill.Bill_CcBcc_Label = '';
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
  changeBillVendor(Vendor_Id) {
    let obj = this.VendorList.find(
      (x) => x.Acc_Vendor_pkeyId == Number(Vendor_Id)
    );
    if (obj != null && obj != undefined) {
      this.Bill.Bill_Vendor_Email = obj.Email;
    } else {
      this.Bill.Bill_Vendor_Email = '';
    }
  }
  reset() {
    this.Bill = new Bill();
    this.Bill_Payment = new Bill_Payment();
    this.CcBccLabelList = [];
    this.BillPaymentPay = 0;
  }
  AddBillItem() {
    this.Bill.Bill_Items.push({
      Bill_Items_PkeyId: 0,
      Bill_Id: 0,
      Task_Id: '0',
      TaskListId: [],
      QTY: '0',
      Rate: '0',
      Amount: '0',
      Tax: false,
      Class: 0,
      Descp: '',
      Bill_Con_Ch_pkeyId: 0,
      Bill_Con_Ch_Wo_Id: 0,
      Bill_Con_pkeyId: 0,
    });
  }
  RemoveBillItems(index) {
    this.Bill.Bill_Items.splice(index, 1);
    this.changeTaxbleAmount();
  }
  RemoveAll() {
    this.Bill.Bill_Items = [];
    this.changeTaxbleAmount();
  }
  get fx() {
    return this.formbillCommonGroup.controls;
  }
  get fp() {
    return this.formbillPaymentGroup.controls;
  }
  open(content) {
    this.WKDivFlag = false;
    this.xmodalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
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
  ReceivePaymentModel(Bill, ReceivePaymentFORM) {
    if (
      Bill.Bill_VendorId != null &&
      Bill.Bill_VendorId != undefined &&
      Bill.Bill_VendorId > 0
    ) {
      this.GetBillDetailsForReceivePayment(
        Bill.Bill_VendorId,
        Bill.Bill_pkeyId,
        this.ReceivePayment.Bill_Number
      );
    }
    this.open(ReceivePaymentFORM);
  }
  FormButtonBillNumber(Bill_Number) {
    if (Bill_Number != null && Bill_Number != undefined && Bill_Number != '') {
      this.GetBillDetailsForReceivePayment(0, 0, Bill_Number);
    } else {
      if (
        this.ReceivePayment.Bill_Rec_Vendor_Id != null &&
        this.ReceivePayment.Bill_Rec_Vendor_Id != undefined &&
        this.ReceivePayment.Bill_Rec_Vendor_Id > 0
      )
        this.GetBillDetailsForReceivePayment(
          this.ReceivePayment.Bill_Rec_Vendor_Id,
          0,
          null
        );
    }
  }
  changeReceivePaymentAmount(items, index) {
    if (
      items.Bill_Rec_Items_Payment != null &&
      items.Bill_Rec_Items_Payment != undefined &&
      items.Bill_Rec_Items_Payment > 0
    ) {
      items.Bill_Rec_Items_Payment = Number(items.Bill_Rec_Items_Payment);
      if (
        Number(items.Bill_Rec_Items_Payment) >
        items.Bill_Rec_Items_Original_Amount
      ) {
        items.Bill_Rec_Items_Payment = items.Bill_Rec_Items_Original_Amount;
      }
    }
    this.CalculateReceivePaymentAmount();
  }
  ChangesSelectAll(status) {
    this.ReceivePayment.Receive_Bill_Items.forEach((element) => {
      element.Select = status;
      if (!element.Select) element.Pending_Amount = 0;
      else element.Pending_Amount = element.Bill_Rec_Original_Amount;
    });
    this.CalculateReceivePaymentAmount();
  }
  ChangeSelect(status, index) {
    this.ReceivePayment.Receive_Bill_Items[index].Select = status;
    if (!this.ReceivePayment.Receive_Bill_Items[index].Select) {
      this.ReceivePayment.Receive_Bill_Items[index].Pending_Amount = 0;
    } else {
      this.ReceivePayment.Receive_Bill_Items[
        index
      ].Pending_Amount = this.ReceivePayment.Receive_Bill_Items[
        index
      ].Bill_Rec_Original_Amount;
    }
    let GetLendgth = this.ReceivePayment.Receive_Bill_Items.length;
    if (
      GetLendgth ===
      this.ReceivePayment.Receive_Bill_Items.filter((x, i) => {
        return x.Select;
      }).length
    ) {
      this.ReceivePayment.SelectAll = true;
    } else {
      this.ReceivePayment.SelectAll = false;
    }
    this.CalculateReceivePaymentAmount();
  }
  GetBillDetailsForReceivePayment(Bill_Vendor_Id, Bill_Id, Bill_Number) {
    this.ReceivePayment = new ReceivePayment();
    this.ReceivePayment.Bill_Rec_Vendor_Id = Bill_Vendor_Id;
    this.billService
      .GetBillByVendorId(Bill_Vendor_Id, Bill_Number)
      .subscribe((response) => {
        if (response.HttpStatusCode == 200) {
          //debugger;
          this.ReceivePaymentBillList = response.Data;
          this.ReceivePayment.Receive_Bill_Items = [];
          this.ReceivePayment.Bill_Rec_Vendor_Id = this.ReceivePaymentBillList.Receive_Bill_Items[0].Bill_VendorId;
          this.ReceivePayment.Receive_Bill_Items = this.ReceivePaymentBillList.Receive_Bill_Items;
          this.ReceivePayment.Receive_Bill_Items.forEach((element) => {
            if (
              element.Bill_Rec_Deposit_To != null &&
              element.Bill_Rec_Deposit_To != undefined &&
              element.Bill_Rec_Deposit_To > 0
            ) {
              this.ReceivePayment.Payment_Deposit_To_ListId = [
                {
                  Acc_pkeyId: element.Bill_Rec_Deposit_To,
                  Acc_Account_Name: this.DepositAccountList.find(
                    (x) => x.Acc_pkeyId == element.Bill_Rec_Deposit_To
                  ).Acc_Account_Name,
                },
              ];
              this.IsAlreadyDeposit = true;
            }
            if (Bill_Id == element.Bill_Rec_Bill_Id) element.Select = true;
            else element.Select = false;
          });
          let GetLendgth = this.ReceivePayment.Receive_Bill_Items.length;
          if (
            GetLendgth ===
            this.ReceivePayment.Receive_Bill_Items.filter((x, i) => {
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
  CalculateReceivePaymentAmount() {
    this.ReceivePayment.Bill_Rec_Amount = 0;
    this.ReceivePayment.Receive_Bill_Items.forEach((element) => {
      if (element.Select)
        this.ReceivePayment.Bill_Rec_Amount += Number(element.Pending_Amount);
    });
    this.ReceivePayment.Amount_Receive = this.ReceivePayment.Bill_Rec_Amount;
  }
  changeVendor(Vendor_Id, Bill_Numbe) {
    if (Vendor_Id > 0) {
      this.GetBillDetailsForReceivePayment(Vendor_Id, 0, Bill_Numbe);
    } else {
      this.ReceivePayment = new ReceivePayment();
    }
  }
  FormButtonPOPUpReceivePayment(ReceivePaymentForm) {
    if (ReceivePaymentForm.invalid) {
      return;
    }
    if (this.ReceivePayment.Bill_Rec_Vendor_Id == 0) {
      return;
    }
    if (
      this.ReceivePayment.Receive_Bill_Items.filter((x, i) => {
        return x.Select;
      }).length == 0
    ) {
      this.commonMessage('Please Select any Bill..');
      return;
    }
    let OnlySelectedItems = this.ReceivePayment.Receive_Bill_Items.filter(
      (x, i) => {
        return x.Select;
      }
    );
    this.ReceivePayment.Receive_Bill_Items = OnlySelectedItems;
    this.button = 'Progressing..';
    this.isLoading = true;
    //debugger;
    if (
      this.ReceivePayment.Payment_Deposit_To_ListId != null &&
      this.ReceivePayment.Payment_Deposit_To_ListId != undefined &&
      this.ReceivePayment.Payment_Deposit_To_ListId.length > 0
    )
      this.ReceivePayment.Bill_Rec_Deposit_To = this.ReceivePayment.Payment_Deposit_To_ListId[0].Acc_pkeyId;
    this.billService
      .CreateUpdateBillReceivePaymentData(this.ReceivePayment)
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.button = 'Save')))
      .subscribe((result) => {
        //debugger;
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
  ReceivePaymentClick(Bill_VendorId, Bill_pkeyId, ReceivePaymentFORM) {
    this.close();

    this.GetBillDetailsForReceivePayment(Bill_VendorId, Bill_pkeyId, null);
    this.open(ReceivePaymentFORM);

  }
  BankDepositModel(BankDepositFORM) {
    this.BankDeposit = new BankDeposit();
    this.billService.GetPaidBillList().subscribe((result) => {
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
    this.billService
      .BankDeposit(this.BankDeposit)
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
  ChangesPaidBillSelectAll(status) {
    this.BankDeposit.BankDeposit_Items.forEach((element) => {
      element.Select = status;
    });
    this.CalculateBankDepositAmount();
  }
  ChangePaidBillSelect(status, index) {
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
