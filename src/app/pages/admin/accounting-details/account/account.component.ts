import { Component, Input, OnInit } from '@angular/core';
import { AccountServices } from './account-service';
import {
  ViewClientCompaniesModel,
  filterMasterModel,
} from '../../client-companies/view-client-companies/view-client-companies-model';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { Account } from './account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  AccountList;
  AccountTypeList;
  AccountDetailsList;
  isLoading: boolean = false;
  button: string = 'Save';
  Account: Account = new Account();
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  WKDivFlag = true;
  formUsrCommonGroup: UntypedFormGroup;
  FilterParentAccountList = [];
  FilterChildAccountList = [];
  FilterAccountList = [];
  dropdownSettings: any = {};
  constructor(
    private accountServices: AccountServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formBuilder.group({});
    this.GetGridData();
    this.GetDropDownAccountType();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Acc_Type_pkeyId',
      textField: 'Acc_Account_Type',
      allowSearchFilter: true,
    };
  }

  GetGridData() {
    this.filterMasterModelObj.Type = 3;
    this.accountServices.GetAccountList().subscribe((result) => {
      this.AccountList = result;
      this.FilterParentAccountList = this.AccountList.filter(
        (x) => x.Acc_Parent_Account_Id == 0
      );
      this.FilterChildAccountList = this.AccountList.filter(
        (x) => x.Acc_Parent_Account_Id > 0
      );
      this.FilterParentAccountList.forEach((element) => {
        let obj = null;
        this.FilterAccountList.push(element);
        if (
          this.FilterChildAccountList != null &&
          this.FilterChildAccountList != undefined &&
          this.FilterChildAccountList.length > 0
        ) {
          obj = this.FilterChildAccountList.filter(
            (x) => x.Acc_Parent_Account_Id == element.Acc_pkeyId
          );
          if (obj != null && obj != undefined) {
            obj.forEach((child) => {
              this.FilterAccountList.push(child);
            });
          }
        }
      });
    });
  }
  GetDropDownAccountType() {
    this.filterMasterModelObj.Type = 3;
    this.accountServices.GetAccountTypeList().subscribe((result) => {
      if (result.HttpStatusCode == 200) this.AccountTypeList = result.Data;
    });
  }
  editDetails(event, dataItem, AccountFORM) {
    this.Account = new Account();
    this.open(AccountFORM);

    if (dataItem.Acc_Account_Type > 0) {
      this.ChangeAccountType(dataItem.Acc_Account_Type, false);
    }
    let obj = dataItem;
    this.Account = obj;
    this.Account.Acc_Account_Name = obj.Acc_Account_Type_Detail_Name;
    if (
      obj.Acc_Parent_Account_Id != null &&
      obj.Acc_Parent_Account_Id != undefined &&
      Number(obj.Acc_Parent_Account_Id) > 0
    ) {
      this.Account.Acc_Is_Sub_Account = true;
    } else {
      this.Account.Acc_Is_Sub_Account = false;
      this.Account.Acc_Parent_Account_Id = 0;
    }
    if (
      obj.Acc_Account_Details != null &&
      obj.Acc_Account_Details != undefined
    ) {
      setTimeout(() => {
        this.GetNameAccountDetails(obj.Acc_Account_Details);
      }, 500);
    }
    if (
      this.Account.Acc_Account_Details == null ||
      this.Account.Acc_Account_Details == undefined
    ) {
      this.Account.Acc_Account_Details = 0;
    }
  }
  ChangeAccountType(Id: any, IsChange: boolean) {
    if (Id > 0) {
      this.AccountDetailsList = [];
      true;
      this.accountServices
        .GetDropDownAccountDetailsByAccountTypeIdList(Id)
        .subscribe((result) => {
          if (result.HttpStatusCode == 200)
            this.AccountDetailsList = result.Data;
          if (IsChange) {
            this.Account.Acc_Account_Details = 0;
            this.Account.Acc_Account_Type_Description = '';
            this.Account.Acc_Account_Name = '';
          }
        });
    } else {
      this.Account.Acc_Account_Details = 0;
      this.Account.Acc_Account_Type_Description = '';
      this.Account.Acc_Account_Name = '';
    }
  }
  GetNameAccountDetails(Id: any) {
    //console.log(this.Account);
    let obj = this.AccountDetailsList.find((x) => x.Acc_Type_pkeyId == Id);
    if (obj != null && obj != undefined) {
      this.Account.Acc_Account_Name = obj.Acc_Detail_Type;
      this.Account.Acc_Account_Type_Description =
        obj.Acc_Account_Type_Description;
    } else {
      this.Account.Acc_Account_Name = '';
      this.Account.Acc_Account_Type_Description = '';
    }
  }
  addNewAccount(addNewAccount) {
   
    this.open(addNewAccount);
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
  FormButtonPOPUp(AccountForm) {
    if (AccountForm.invalid) {
      return;
    }
    if (
      this.Account.Acc_Account_Details == 0 ||
      this.Account.Acc_Account_Name == ''
    ) {
      return;
    }
    this.button = 'Progressing..';
    this.isLoading = true;
    this.accountServices
      .CreateUpdateAccountData(this.Account)
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
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
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
  close() {
    this.xmodalService.dismissAll();
    this.Account = new Account();
    this.GetGridData();
  }
}
