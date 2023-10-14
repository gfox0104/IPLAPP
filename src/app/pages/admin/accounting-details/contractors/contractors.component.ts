import { Component, OnInit } from '@angular/core';
import { ContractorsServices } from './contractors-service';
import { ViewUserModel } from '../../../user/view-user/view-user-model';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { ViewUserServices } from 'src/app/pages/user/view-user/view-user.service';
import { AddUserModel } from 'src/app/pages/user/add-user/add-user-model';
import { Contractors, Vendor } from './contractors.model';
import { filterMasterModel } from '../../company-info/view-company-info/view-company-info-model';
import { AccountServices } from '../account/account-service';
import { WorkOrderDrodownServices } from 'src/app/pages/services/common-drop-down/drop-down.service';
import { finalize } from 'rxjs/operators';
import { AccountingServices } from '../accounting-details.service';

@Component({
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss'],
})
export class ContractorsComponent implements OnInit {
  isHelpActive = false;
  MessageFlag: string;
  ContractorList;
  Contractors: Vendor = new Vendor();
  ContractorsAddress: any;
  isLoading: boolean = false;
  button: string = 'Save';
  StrAddressArray: any = [];
  ViewUserModelObj: ViewUserModel = new ViewUserModel();
  UserModelObj: ViewUserModel = new ViewUserModel();
  WKDivFlag = true;
  formContractorCommonGroup: UntypedFormGroup;
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  ExpenceAccountList = [];
  dropdownSettingsDefaultExpenceAccount = {};
  StateArray: any;
  IsLoad: boolean = false;
  constructor(
    private contractorsServices: ContractorsServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private accountServices: AccountServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    public AccountingServices: AccountingServices
  ) {}

  ngOnInit(): void {
    this.formContractorCommonGroup = this.formBuilder.group({
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
      Company_Name: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
    });
    this.GetGridData();
    this.GetAccountData();
    this.GetStateDropDown();
    this.dropdownSettingsDefaultExpenceAccount = {
      singleSelection: true,
      idField: 'Acc_pkeyId',
      textField: 'Acc_Account_Name',
      allowSearchFilter: true,
    };
  }

  GetGridData() {
    this.IsLoad = true;
    this.contractorsServices
      .GetVendorListData(this.Contractors)
      .pipe(finalize(() => (this.IsLoad = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.ContractorList = result.Data[0];
        }
      });
  }
  editDetails(Acc_Vendor_pkeyId, ContractorsFORM) {

    this.Contractors.Acc_Vendor_pkeyId = Acc_Vendor_pkeyId;
    this.GetsingleData();
    this.open(ContractorsFORM);
  }
  AddNewVendor(ContractorsFORM) {
    this.ViewUserModelObj = new ViewUserModel();

    this.open(ContractorsFORM);
  }
  GetStateDropDown() {
    this.xWorkOrderDrodownServices.StateDropDownData().subscribe((response) => {
      this.StateArray = response[0];
    });
  }
  GetsingleData() {
    if (this.Contractors.Acc_Vendor_pkeyId != 0) {
      this.Contractors.Type = 2;
      this.contractorsServices
        .GetVendorListData(this.Contractors)
        .subscribe((response) => {
          if (response.HttpStatusCode == 200) {
            this.Contractors = response.Data[0][0];
            if (
              this.Contractors.Default_Expence_Account_Id == null ||
              this.Contractors.Default_Expence_Account_Id == undefined
            ) {
              this.Contractors.Default_Expence_Account_Id = 0;
            } else {
              let obj = this.ExpenceAccountList.find(
                (x) =>
                  x.Acc_pkeyId == this.Contractors.Default_Expence_Account_Id
              );
              if (obj != null) {
                this.Contractors.Default_Expence_Account_IdList = [
                  {
                    Acc_pkeyId: obj.Acc_pkeyId,
                    Acc_Account_Name: obj.Acc_Account_Name,
                  },
                ];
              }
            }
          }
        });
    }
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
  RemovewhiteSpace(event, field) {
    this.Contractors[field] = this.AccountingServices.RemoveWhiteSpace(
      event.target.value
    );
  }
  GetAccountData() {
    this.filterMasterModelObj.Type = 3;
    this.accountServices.GetAccountList().subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.ExpenceAccountList = result.Data;
      }

    });
  }
  checkChangeContracors(dataItem) {
    this.Contractors.Acc_Vendor_pkeyId = dataItem.Acc_Vendor_pkeyId;
    this.Contractors.IsActive = !dataItem.IsActive;
    this.Contractors.Type = 3;
    this.contractorsServices
      .CreateUpdateAccVendor(this.Contractors)
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.commonMessage('Vendor Status Updated..');
          this.Contractors=new Vendor();
          this.GetGridData();
        } else {
          this.commonMessage(result.Message);
        }
      });
  }
  FormButtonPOPUp(EditContractorsForm) {
    if (EditContractorsForm.invalid) {
      return;
    }
    this.button = 'Progressing..';
    this.isLoading = true;
    if (
      this.Contractors.Default_Expence_Account_IdList != null &&
      this.Contractors.Default_Expence_Account_IdList.length > 0
    ) {
      this.Contractors.Default_Expence_Account_Id = Number(
        this.Contractors.Default_Expence_Account_IdList[0].Acc_pkeyId
      );
    }

    if (this.Contractors.Acc_Vendor_pkeyId == 0) {
      this.Contractors.Type = 1;
    } else {
      this.Contractors.Type = 2;
    }
    this.contractorsServices
      .CreateUpdateAccVendor(this.Contractors)
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.button = 'Save')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.close();
          this.commonMessage(result.Message);
          this.GetGridData();
        } else {
          this.commonMessage(result.Message);
        }
      });
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
  get fx() {
    return this.formContractorCommonGroup.controls;
  }
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  close() {
    this.xmodalService.dismissAll();
    this.Contractors = new Vendor();
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
