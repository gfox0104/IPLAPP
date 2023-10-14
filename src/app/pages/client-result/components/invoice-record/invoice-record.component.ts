import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConRecordColumns, ClientRecordColumns, FormFields } from '../constants';
import {
  Invoice_ContractorDTO,
  Invoice_ClientDTO,
  PaymentRecordModel
} from "../../client-results-invoice/client-results-invoice-model";
import { ClientResultsInvoiceServices } from "../../client-results-invoice/client-results-invoice.service";
import { ClientResultServices } from '../../client-result/client-result.service';
import { ActivatedRoute } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';


@Component({
  selector: 'app-invoice-record',
  templateUrl: 'invoice-record.component.html',
  styleUrls: ['invoice-record.component.scss']
})

export class InvoiceRecordComponent implements OnInit {
  @Input() title;
  @Input() recordPaymentObj: PaymentRecordModel;
  @Input() isContractor: boolean;
  @Input() Invoice_ContractorDTOObj: Invoice_ContractorDTO;
  @Input() Invoice_ClientDTOObj: Invoice_ClientDTO;
  @Output() PaymentUpdate = new EventEmitter();


  columns;
  recordData = [];
  submitted: boolean = false;
  paymentFormGroup: UntypedFormGroup;
  balanceDue: number = 0;
  formFields = FormFields;
  isLoading: boolean = false;
  button = 'Save Payment'
  statusdetails: any;
  workOrderID: any;
  balanceDueStr = "0";
  contractorPaymentHidShow=false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private clientResultInvoiceService: ClientResultsInvoiceServices,
    private xClientResultServices: ClientResultServices,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService
  ) {

    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      let decuser = JSON.parse(decval);
      if (decuser[0].GroupRoleId === 2) {
        this.contractorPaymentHidShow=true;
      }
    }

  }


  ngOnInit() {
    this.paymentFormGroup = this.formBuilder.group({
      paymentDateN: ['', Validators.nullValidator],
      amountN: ['', Validators.required],
      //checkNumberN: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      checkNumberN: ['', [Validators.required]],
      commentN: ['', Validators.nullValidator]
    });

    const workorder1 = this.xRoute.snapshot.params['workorder'];
    this.workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));

    this.recordPaymentObj.paymentDate = new Date();

    this.columns = this.isContractor ? ConRecordColumns : ClientRecordColumns;

    this.getPaymentRecordData();




  }

  getPaymentRecordData() {
    ////dfebugger
    this.Invoice_ContractorDTOObj.Inv_Con_Wo_ID = this.workOrderID;
    this.Invoice_ClientDTOObj.Inv_Client_WO_Id = this.workOrderID;
    let param = {
      Pay_PkeyId: this.isContractor ? this.Invoice_ContractorDTOObj.Inv_Con_pkeyId : this.Invoice_ClientDTOObj.Inv_Client_pkeyId,
      Pay_Wo_Id: this.isContractor ? this.Invoice_ContractorDTOObj.Inv_Con_Wo_ID : this.Invoice_ClientDTOObj.Inv_Client_WO_Id,
      Type: 1
    }

    this.clientResultInvoiceService.PaymentRecordGet(param, this.isContractor)
      .subscribe(response => {
        this.recordData = response[0];
        let total = 0;
        if (this.recordData.length != 0) {
          for (var i = 0; i < this.recordData.length; i++) {

            if (this.recordData[i].Client_Pay_Amount) {
              total += this.recordData[i].Client_Pay_Amount;
              this.balanceDue = total;
              this.recordData[i].Client_Pay_Amount = this.recordData[i].Client_Pay_Amount.toFixed(2).toString()
            }
            if (this.isContractor) {
              if (this.recordData[i].Con_Pay_Amount) {
                total += this.recordData[i].Con_Pay_Amount;
                this.balanceDue = total;
                this.recordData[i].Con_Pay_Amount = this.recordData[i].Con_Pay_Amount.toFixed(2).toString()
              }
            }
          }
        }
        else {
          this.balanceDue = 0;
        }
        //debugger;
        this.balanceDueStr = this.balanceDue.toFixed(2).toString();
        return this.balanceDue.toFixed(2).toString();
      });
  }

  get fx() {
    return this.paymentFormGroup.controls;
  }
  getBalance() {
    if (this.isContractor) {
      if (this.Invoice_ContractorDTOObj != undefined && this.Invoice_ContractorDTOObj && this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != undefined && this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != null) {
        return (this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total - this.balanceDue).toFixed(2);
      }
      else{
        return 0;
      }

    }
    else{
      if (this.Invoice_ClientDTOObj != undefined && this.Invoice_ClientDTOObj && this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != undefined && this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != null) {
        return (this.Invoice_ClientDTOObj.Inv_Client_Sub_Total - this.balanceDue).toFixed(2);
      }
      else{
        return 0;
      }

    }
  }
  getTotal() {
    if (this.isContractor) {
      if (this.Invoice_ContractorDTOObj != undefined && this.Invoice_ContractorDTOObj && this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != undefined && this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total != null) {
        return (this.Invoice_ContractorDTOObj.Inv_Con_Sub_Total).toFixed(2);
      }
      else{
        return 0;
      }
    }
    else{
      if (this.Invoice_ClientDTOObj != undefined && this.Invoice_ClientDTOObj && this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != undefined && this.Invoice_ClientDTOObj.Inv_Client_Sub_Total != null) {
        return (this.Invoice_ClientDTOObj.Inv_Client_Sub_Total).toFixed(2);
      }
      else{
        return 0;
      }
    }
  }
  onRemoveItem(item) {
    let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
    if (Cnfm) {
    let obj = this.isContractor ? {
      Con_Pay_PkeyId: item.Con_Pay_PkeyId,
      Con_Pay_Invoice_Id: item.Con_Pay_Invoice_Id,
      Con_Pay_Wo_Id: item.Con_Pay_Wo_Id,
      Type: 4
    } :
      {
        Client_Pay_PkeyId: item.Client_Pay_PkeyId,
        Client_Pay_Wo_Id: item.Client_Pay_Wo_Id,
        Type: 4
      }

    this.clientResultInvoiceService.PaymentRecrodDelete(obj, this.isContractor)
      .subscribe(response => {
        this.getPaymentRecordData();
        this.PaymentUpdate.emit();
      });
    }
  }

  onSubmit() {
  debugger
    this.submitted = true;
    if (this.paymentFormGroup.invalid) return;
    this.isLoading = true;
    this.button = 'Processing';
    let obj = !this.isContractor ? {
      Client_Pay_PkeyId: this.Invoice_ClientDTOObj.Inv_Client_pkeyId,
      //Client_Pay_Invoice_Id: this.Invoice_ClientDTOObj.Inv_Client_Invoice_Id,
      Client_Pay_Invoice_Id: this.Invoice_ClientDTOObj.Inv_Client_pkeyId,
      Client_Pay_Wo_Id: this.workOrderID,
      Client_Pay_Payment_Date: this.recordPaymentObj.paymentDate,
      Client_Pay_Amount: this.recordPaymentObj.amount,
      Client_Pay_CheckNumber: this.recordPaymentObj.checkNumber.toString(),
      Client_Pay_Comment: this.recordPaymentObj.comment,
      Client_Pay_EnteredBy: this.recordPaymentObj.enteredBy,
      Client_Pay_Balance_Due: null,
      Client_Pay_IsActive: true,
      Client_Pay_IsDelete: 0,
      UserID: this.Invoice_ClientDTOObj.UserID,
      Type: 1
    } :
      {
        Con_Pay_PkeyId: this.Invoice_ContractorDTOObj.Inv_Con_pkeyId,
        // Con_Pay_PkeyId:0,
        // Con_Pay_Invoice_Id: this.Invoice_ContractorDTOObj.Inv_Con_Invoice_Id,
        Con_Pay_Invoice_Id: this.Invoice_ContractorDTOObj.Inv_Con_pkeyId,
        Con_Pay_Wo_Id: this.workOrderID,
        Con_Pay_Payment_Date: this.recordPaymentObj.paymentDate,
        Con_Pay_Amount: this.recordPaymentObj.amount,
        Con_Pay_CheckNumber: this.recordPaymentObj.checkNumber.toString(),
        Con_Pay_Comment: this.recordPaymentObj.comment,
        Con_Pay_EnteredBy: this.recordPaymentObj.comment,
        Con_Pay_Balance_Due: null,
        Con_Pay_IsActive: true,
        Con_Pay_IsDelete: 0,
        UserID: this.Invoice_ContractorDTOObj.UserID,
        Type: 1
      }

    // this.recordData.forEach(item => {
    //   this.balanceDue = this.balanceDue + item.amount;
    // });

    this.clientResultInvoiceService.PaymentRecordPost(obj, this.isContractor)
      .subscribe(response => {
        this.button = 'Save Payment';
        this.isLoading = false;
        this.paymentFormGroup.reset();
        this.submitted = false;
        this.getPaymentRecordData();
        this.PaymentUpdate.emit();
      });
  }
}
