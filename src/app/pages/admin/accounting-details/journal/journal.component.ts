import { Component, OnInit } from '@angular/core';
import { JournalServices } from './journal-service';

import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { JournalModel, AccountModel, JournalEntryModel } from './journal-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { finalize } from 'rxjs/operators';
import { AccountingServices } from '../accounting-details.service';
@Component({
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit {
  JournalModelObj: JournalModel = new JournalModel();
  JournalEntryModelObj: JournalEntryModel = new JournalEntryModel();
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string; // custom msg
  isLoading: boolean = false;
  button: string = 'Save';
  IsLoad: boolean = false;
  TotalDebitAmount = 0;
  TotalCreditAmount = 0;
  isHelpActive = false;
  constructor(
    private journalServices: JournalServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    public AccountingServices: AccountingServices
  ) {}
  JournalList;
  AccountList;
  WKDivFlag = true;
  dropdownSettingsAccount = {};
  drcr: any = [
    { id: 1, name: 'Debit' },
    { id: 2, name: 'Credit' },
  ];
  ngOnInit(): void {
    const self = this;
    this.formUsrCommonGroup = this.formBuilder.group({
      journaldate: ['', Validators.required],
      journalref: ['', Validators.required],
    });
   
    self.GetGridData();
    this.journalServices.GetAccount().subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.AccountList = result.Data;
      }
    });
    this.dropdownSettingsAccount = {
      singleSelection: true,
      idField: 'Acc_pkeyId',
      textField: 'Acc_Account_Name',
      allowSearchFilter: true,
    };
  }
  // common message modal popup
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

  GetGridData() {
    this.IsLoad = true;
    this.journalServices
      .GetJournalList()
      .pipe(finalize(() => (this.IsLoad = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          result.Data.forEach((element) => {
            element.JrnlH_Date = new Date(element.JrnlH_Date);
          });
          this.JournalList = result.Data;
        }
      });
  }
  deleteDetails(event, dataItem) {
    var cfrm = confirm('Are you Sure you want to  Delete this Record...!');
    if (cfrm == true) {
      this.JournalModelObj.JrnlH_pkeyId = dataItem.JrnlH_pkeyId;

      this.journalServices
        .Delete(this.JournalModelObj)
        .subscribe((response) => {
          if (response.HttpStatusCode == 200) {
            this.GetGridData();
          }
          this.commonMessage('Successfully Deleted Record.');
        });
    }
  }
  editDetails(dataItem, JournalFORM) {
    this.TotalDebitAmount = 0;
    this.TotalCreditAmount = 0;
    this.journalServices
      .GetJournal(dataItem.JrnlH_pkeyId)
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.JournalModelObj = result.Data;
          this.JournalModelObj.JrnlH_JournalEntry.forEach((element) => {
            if (Number(element.JrnlE_DrCr) === 1) {
              element.JrnlE_DrAmount = element.JrnlE__Amount;
              element.JrnlE_CrAmount = 0;
              this.TotalDebitAmount += Number(element.JrnlE__Amount);
            } else {
              element.JrnlE_CrAmount = element.JrnlE__Amount;
              this.TotalCreditAmount += Number(element.JrnlE__Amount);
              element.JrnlE_DrAmount = 0;
            }
            if (
              element.JrnlE_AccountId != null &&
              element.JrnlE_AccountId > 0
            ) {
              let account = this.AccountList.find(
                (x) => x.Acc_pkeyId == element.JrnlE_AccountId
              );
              if (account != null && account != undefined) {
                element.JrnlE_AccountIdList = [
                  {
                    Acc_pkeyId: account.Acc_pkeyId,
                    Acc_Account_Name: account.Acc_Account_Name,
                  },
                ];
              }
            }
          });
          this.JournalModelObj.JrnlH_Date = new Date(
            this.JournalModelObj.JrnlH_Date
          );
          this.open(JournalFORM);
        }
      });
  }
  RemovewhiteSpace(event, field) {
    this.JournalModelObj[field] = this.AccountingServices.RemoveWhiteSpace(
      event.target.value
    );
  }
  addNewDetails(JournalFORM) {
    this.JournalModelObj = new JournalModel();
    this.JournalModelObj.JrnlH_Date = new Date();
    this.TotalDebitAmount = 0;
    this.TotalCreditAmount = 0;
    //this.JournalModelObj.JrnlH_JournalEntry = new Array<JournalEntryModel>();
    this.open(JournalFORM);
  }
  addPostJournal(id) {
    this.journalServices.PostJournal(id).subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.GetGridData();
      }
      this.commonMessage(result.Message);
    });
  }
  open(content) {
    this.WKDivFlag = false;
    this.xmodalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.WKDivFlag = true;
        },
        (reason) => {
          this.WKDivFlag = true;
        }
      );
  }
  GetDebitCreditAmount() {
    var DeditAmount = 0;
    this.JournalModelObj.JrnlH_JournalEntry.forEach((element) => {
      DeditAmount += element.JrnlE_DrAmount;
    });
    var CreditAmount = 0;
    this.JournalModelObj.JrnlH_JournalEntry.forEach((element) => {
      CreditAmount += element.JrnlE_CrAmount;
    });
    if (DeditAmount != null && CreditAmount != null) {
      this.TotalCreditAmount = Number(CreditAmount);
      this.TotalDebitAmount = Number(DeditAmount);
    }
  }
  FormButtonPOPUp(journalEditForm) {
    if (journalEditForm.invalid) {
      return;
    }
    if (
      this.JournalModelObj.JrnlH_JournalEntry == null ||
      this.JournalModelObj.JrnlH_JournalEntry.length == 0
    ) {
      return;
    }
    let valid = true;
    this.JournalModelObj.JrnlH_JournalEntry.forEach((element) => {
      if (
        element.JrnlE_AccountIdList != null &&
        element.JrnlE_AccountIdList.length > 0
      ) {
        element.JrnlE_AccountId = Number(
          element.JrnlE_AccountIdList[0].Acc_pkeyId
        );
      } else {
        element.JrnlE_AccountId = 0;
      }
      if (Number(element.JrnlE_AccountId) == 0) {
        valid = false;
      }
    });
    if (!valid) {
      return;
    }
    this.JournalModelObj;
    let index = 0;
    this.JournalModelObj.JrnlH_JournalEntry.forEach((element) => {
      if (
        element.JrnlE_AccountIdList != null &&
        element.JrnlE_AccountIdList.length > 0
      ) {
        element.JrnlE_AccountId = Number(
          element.JrnlE_AccountIdList[0].Acc_pkeyId
        );
      } else {
        element.JrnlE_AccountId = 0;
      }
      if (element.JrnlE_AccountId > 0) {
        if (
          Number(element.JrnlE_DrAmount) > 0 ||
          Number(element.JrnlE_CrAmount) === 0
        ) {
          element.JrnlE_DrCr = 1;
          element.JrnlE__Amount = element.JrnlE_DrAmount;
        }
        if (
          Number(element.JrnlE_CrAmount) > 0 &&
          Number(element.JrnlE_DrAmount) === 0
        ) {
          element.JrnlE_DrCr = 2;
          element.JrnlE__Amount = element.JrnlE_CrAmount;
        }
      } else {
        this.JournalModelObj.JrnlH_JournalEntry.splice(index, 1);
      }
      index++;
    });
    var DeditAmount = 0;
    this.JournalModelObj.JrnlH_JournalEntry.forEach((element) => {
      if (element.JrnlE_DrAmount != null && element.JrnlE_DrAmount != undefined)
        DeditAmount += element.JrnlE_DrAmount;
    });
    var CreditAmount = 0;
    this.JournalModelObj.JrnlH_JournalEntry.forEach((element) => {
      if (element.JrnlE_CrAmount != null && element.JrnlE_CrAmount != undefined)
        CreditAmount += element.JrnlE_CrAmount;
    });
    if (
      DeditAmount != null &&
      CreditAmount != null &&
      Number(DeditAmount) != Number(CreditAmount)
    ) {
      this.commonMessage('Please balance debits and credits.');
      return;
    }
    this.button = 'Progressing..';
    this.isLoading = true;
    this.journalServices
      .Add(this.JournalModelObj)
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.button = 'Save')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.GetGridData();
          this.JournalModelObj = new JournalModel();
          journalEditForm.submitted = false;
          // this.xmodalService.dismissAll();
        }
        this.commonMessage(result.Message);
      });
  }
  deleteEntry(event, objJournal, objEntry) {
    const index: number = objJournal.JrnlH_JournalEntry.indexOf(objEntry);
    if (index !== -1) {
      objJournal.JrnlH_JournalEntry.splice(index, 1);
    }
  }
  AddJournalEntry(objJournal) {
    objJournal.JrnlH_JournalEntry.push({
      JrnlE_AccountId: 0,
      JrnlE_AccountIdList: null,
      JrnlE__Amount: 0,
      JrnlE_DrCr: 1,
      JrnlE_DrAmount: 0,
      JrnlE_CrAmount: 0,
      JrnlE_Name: '',
      JrnlE_Class: '',
      JrnlE_Memo: '',
      JrnlE_AccountType: 0,
    });
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  comMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
      if (!this.isHelpActive) {
        this.xmodalService.dismissAll();
      }
     });
  }
  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.comMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.comMessage();
    }
  }

  DispalyInfo(event: Event, lblName)
  {    
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.comMessage();
    }    
  }
}
