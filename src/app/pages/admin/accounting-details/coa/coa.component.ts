import { Component, OnInit } from '@angular/core';
import { AccountServices } from '../account/account-service';
import { CoaServices } from './coa-service';
import {
  ViewClientCompaniesModel,
  filterMasterModel,
} from '../../client-companies/view-client-companies/view-client-companies-model';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { Account } from '../account/account.model';
import { finalize } from 'rxjs/operators';
import { AccountingServices } from '../accounting-details.service';
import { COAFilter } from './COA-Filter.model';
@Component({
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.scss'],
})
export class CoaComponent implements OnInit {
  CoaList;
  AccountList;
  AccountTypeList;
  AccountDetailsList;
  Account: Account = new Account();
  WKDivFlag = true;
  isLoading: boolean = false;
  IsLoadGrid: boolean = false;
  IsLoadChild: boolean = false;
  IsLoadActivity: boolean = false;
  button: string = 'Save';
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  formUsrCommonGroup: UntypedFormGroup;
  CoaChildList;
  CoaActivityList;
  dropdownSettingsAccountType = {};
  dropdownSettingsAccountTypeDetails = {};
  dropdownSettingsAccountParent = {};
  Filter: COAFilter = new COAFilter();
  MessageFlag: string;
  isHelpActive = false;
  constructor(
    private accountServices: AccountServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    public AccountingServices: AccountingServices
  ) {}

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formBuilder.group({});
    this.GetGridData();
    this.GetDropDownAccountType();
    this.dropdownSettingsAccountType = {
      singleSelection: true,
      idField: 'Acc_Type_pkeyId',
      textField: 'Acc_Account_Type',
      allowSearchFilter: true,
    };
    this.dropdownSettingsAccountTypeDetails = {
      singleSelection: true,
      idField: 'Acc_Type_pkeyId',
      textField: 'Acc_Detail_Type',
      allowSearchFilter: true,
    };
    this.dropdownSettingsAccountParent = {
      singleSelection: true,
      idField: 'Acc_pkeyId',
      textField: 'Acc_Account_Name',
      allowSearchFilter: true,
    };
  }
  editDetails(event, dataItem, AccountFORM) {
    this.Account = new Account();
    this.open(AccountFORM);
    this.accountServices
      .GetAccountDetailsByAccountId(dataItem.Acc_pkeyId)
      .subscribe((result) => {
        if (result.HttpStatusCode == 200 && result.Data != null) {
          this.Account = result.Data[0];

          if (this.Account.Acc_Account_Type > 0) {
            let accounType = this.AccountList.find(
              (x) => x.Acc_Account_Type == this.Account.Acc_Account_Type
            );
            if (accounType != null && accounType != undefined) {
              this.Account.Acc_Account_TypeList = [
                {
                  Acc_Type_pkeyId: accounType.Acc_Account_Type,
                  Acc_Account_Type: accounType.Acc_Account_Type_Name,
                },
              ];
            }
            this.ChangeAccountType(this.Account.Acc_Account_Type, false);
          }
          if (this.Account.Acc_Parent_Account_Id > 0) {
            let accounparent = this.AccountList.find(
              (x) => x.Acc_pkeyId == this.Account.Acc_Parent_Account_Id
            );
            if (accounparent != null && accounparent != undefined) {
              this.Account.Acc_Parent_Account_IdList = [
                {
                  Acc_pkeyId: accounparent.Acc_pkeyId,
                  Acc_Account_Name: accounparent.Acc_Account_Name,
                },
              ];
            }
            
          }
          if (
            this.Account.Acc_Parent_Account_Id != null &&
            this.Account.Acc_Parent_Account_Id != undefined &&
            Number(this.Account.Acc_Parent_Account_Id) > 0
          ) {
            this.Account.Acc_Is_Sub_Account = true;
          } else {
            this.Account.Acc_Is_Sub_Account = false;
            this.Account.Acc_Parent_Account_Id = 0;
          }
          const Acc_Account_Name = this.Account.Acc_Account_Name;
          const Acc_Account_Details = this.Account.Acc_Account_Details;
          if (
            this.Account.Acc_Account_Details != null &&
            this.Account.Acc_Account_Details != undefined
          ) {
            setTimeout(() => {
             
            }, 500);
          }
          if (
            this.Account.Acc_Account_Details == null ||
            this.Account.Acc_Account_Details == undefined
          ) {
            this.Account.Acc_Account_Details = 0;
          }
          this.Account.Acc_Account_Name = this.Account.Acc_Account_Name;
        }
      });
  }

  GetGridData() {
    this.filterMasterModelObj.Type = 3;
    this.IsLoadGrid = true;
    this.accountServices
      .GetAccountList()
      .pipe(finalize(() => (this.IsLoadGrid = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.AccountList = result.Data;
        }
      });
  }
  RemovewhiteSpace(event, field) {
    this.Account[field] = this.AccountingServices.RemoveWhiteSpace(
      event.target.value
    );
  }
  GetchildDetails(Acc_pkeyId, CoaChildFORM) {
    if (Acc_pkeyId != null && Acc_pkeyId != undefined) {
      this.IsLoadChild = true;
      this.accountServices
        .GetAccountChildByAccountId(Acc_pkeyId)
        .pipe(finalize(() => (this.IsLoadChild = false)))
        .subscribe((result) => {
          if (result.HttpStatusCode == 200 && result.Data != null) {
            this.CoaChildList = result.Data;
          }
        });
      this.open(CoaChildFORM);
    }
  }
  GetAccountActivityDetails(Acc_pkeyId, CoaActivityFORM) {
    this.CoaActivityList = [];
    if (Acc_pkeyId != null && Acc_pkeyId != undefined) {
      this.IsLoadActivity = true;
      this.Filter.Acc_pkeyId = Acc_pkeyId;
      this.accountServices
        .GetAccountActivityByAccountId(this.Filter)
        .pipe(finalize(() => (this.IsLoadActivity = false)))
        .subscribe((result) => {
          if (result.HttpStatusCode == 200 && result.Data != null) {
            result.Data.forEach((element) => {
              element.Payment_Date = new Date(element.Payment_Date);
            });
            this.CoaActivityList = result.Data;
          }
        });
      this.open(CoaActivityFORM);
    }
  }
  GetDropDownAccountType() {
    this.filterMasterModelObj.Type = 3;
    this.accountServices.GetAccountTypeList().subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.AccountTypeList = result.Data;
      }
    });
  }

  ChangeAccountType(Id: any, IsChange: boolean) {
    if (Id > 0) {
      this.AccountDetailsList = [];
      true;
      this.accountServices
        .GetDropDownAccountDetailsByAccountTypeIdList(Id)
        .subscribe((result) => {
          if (result.HttpStatusCode == 200) {
            this.AccountDetailsList = result.Data;
            if (IsChange) {
              this.Account.Acc_Account_Details = 0;
              this.Account.Acc_Account_Type_Description = '';
              this.Account.Acc_Account_Name = '';
              this.Account.Acc_Account_DetailsList = [];
            } else {
              let accounTypeDetails = this.AccountDetailsList.find(
                (x) => x.Acc_Type_pkeyId == this.Account.Acc_Account_Details
              );
              if (accounTypeDetails != null && accounTypeDetails != undefined) {
                this.Account.Acc_Account_DetailsList = [
                  {
                    Acc_Type_pkeyId: accounTypeDetails.Acc_Type_pkeyId,
                    Acc_Detail_Type: accounTypeDetails.Acc_Detail_Type,
                  },
                ];
              }
              this.GetNameAccountDetails(Id, false);
            }
          }
        });
    } else {
      this.Account.Acc_Account_Details = 0;
      this.Account.Acc_Account_Type_Description = '';
      this.Account.Acc_Account_Name = '';
      this.AccountDetailsList = [];
      this.Account.Acc_Account_DetailsList = [];
    }
  }
  GetNameAccountDetails(Id: any, isChanges: boolean, Acc_Account_Name?) {
    let obj = this.AccountDetailsList.find((x) => x.Acc_Type_pkeyId == Id);
    if (obj != null && obj != undefined) {
      if (
        Acc_Account_Name == null ||
        Acc_Account_Name == undefined ||
        Acc_Account_Name == ''
      )
        if (isChanges) this.Account.Acc_Account_Name = obj.Acc_Detail_Type;
     
      this.Account.Acc_Account_Type_Description =
        obj.Acc_Account_Type_Description;
    } else {
      if (isChanges) this.Account.Acc_Account_Name = '';
      this.Account.Acc_Account_Type_Description = '';
    }
  }
  FormButtonPOPUp(AccountForm) {
    if (AccountForm.invalid) {
      return;
    }
    if (
      this.Account.Acc_Account_TypeList != null &&
      this.Account.Acc_Account_TypeList.length > 0
    ) {
      this.Account.Acc_Account_Type = Number(
        this.Account.Acc_Account_TypeList[0].Acc_Type_pkeyId
      );
    }
    if (
      this.Account.Acc_Account_DetailsList != null &&
      this.Account.Acc_Account_DetailsList.length > 0
    ) {
      this.Account.Acc_Account_Details = Number(
        this.Account.Acc_Account_DetailsList[0].Acc_Type_pkeyId
      );
    }
    if (
      this.Account.Acc_Parent_Account_IdList != null &&
      this.Account.Acc_Parent_Account_IdList.length > 0
    ) {
      this.Account.Acc_Parent_Account_Id = Number(
        this.Account.Acc_Parent_Account_IdList[0].Acc_pkeyId
      );
    }
    if (
      this.Account.Acc_Account_Type.Acc_Type_pkeyId == 0 ||
      this.Account.Acc_Account_Details == 0 ||
      this.Account.Acc_Account_Name == ''
    ) {
      return;
    }
    if (!this.Account.Acc_Is_Sub_Account) {
      this.Account.Acc_Parent_Account_Id = 0;
    }

    this.button = 'Progressing..';
    this.isLoading = true;
    this.accountServices
      .CreateUpdateAccountData(this.Account)
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.button = 'Save')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.button = 'Save';
          this.isLoading = false;
          this.GetGridData();
          this.close();
        }
        this.commonMessage(result.Message);
      });
  }
  ChangeIsAccountParent(event) {
    if (!event) {
      this.Account.Acc_Parent_Account_Id = 0;
    }
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
  addNewAccount(addNewAccount) {
    this.open(addNewAccount);
  }
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  public state1: State = {};
  public dataStateChange1(state: DataStateChangeEvent): void {
    this.state1 = state;
  }
  public state2: State = {};
  public dataStateChange2(state: DataStateChangeEvent): void {
    this.state2 = state;
  }
  close() {
    this.xmodalService.dismissAll();
    this.Account = new Account();
    this.Filter = new COAFilter();
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
