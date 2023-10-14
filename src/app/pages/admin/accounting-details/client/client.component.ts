import { Component, Input, OnInit } from '@angular/core';
import { ClientServices } from './client-service';
import {
  ViewClientCompaniesModel,
  filterMasterModel,
} from '../../client-companies/view-client-companies/view-client-companies-model';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { AddClientCompaniesModel } from '../../client-companies/add-client-companies/add-client-companies-model';
import { ViewClientCompaniesServices } from '../../client-companies/view-client-companies/view-client-companies.service';
import { Client, AccClientfilterMasterModel } from './client.model';
import { WorkOrderDrodownServices } from 'src/app/services/util/dropdown.service';
import { finalize } from 'rxjs/operators';
import { AccountingServices } from '../accounting-details.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  @Input() ActiveLink: number;
  ClientList;
  
  Client: Client = new Client();
  filterMasterModelObj: AccClientfilterMasterModel = new AccClientfilterMasterModel();
  WKDivFlag = true;
  isLoading: boolean = false;
  button: string = 'Save';
  WorkOrderObj: any;
  StateArray: any;
  formUsrCommonGroup: UntypedFormGroup;
  IsLoad: boolean = false;
  Statelist: any;
  isHelpActive = false;
  MessageFlag: string;
  constructor(
    private clientServices: ClientServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xViewClientCompaniesServices: ViewClientCompaniesServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    public AccountingServices: AccountingServices
  ) {}

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formBuilder.group({
      ContactName: ['', Validators.required],
      Company_Name: ['', Validators.required],
      Company_First_Name: ['', Validators.required],
      Company_Last_Name: ['', Validators.required],
      ContactEmail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
    this.GetGridData();
    this.GetStateDropDown();
  }
  GetStateDropDown() {
    this.xWorkOrderDrodownServices.StateDropDownData().subscribe((response) => {
      this.StateArray = response[0];
      this.Statelist =  this.StateArray;
    });
  }

  StateFilter(value){
    if (value!='') {
      var filteredcustomer = this.StateArray.filter(function (el) {
        return el.IPL_StateName != null;
      });
      this.Statelist = filteredcustomer.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.Statelist = this.StateArray.slice();
   }
  }

  GetGridData() {
    this.filterMasterModelObj = new AccClientfilterMasterModel();
    this.filterMasterModelObj.Type = 3;
    this.IsLoad = true;
    this.clientServices
      .ClientListData(this.filterMasterModelObj)
      .pipe(finalize(() => (this.IsLoad = false)))
      .subscribe((result) => {
        this.ClientList = result[0];
      });
  }
  editDetails(event, dataItem, ClientFORM) {
    this.WorkOrderObj = parseInt(dataItem.Acc_Client_pkeyId);
    this.Client.Acc_Client_pkeyId = this.WorkOrderObj;
    this.filterMasterModelObj.Acc_Client_pkeyId = this.WorkOrderObj;

    this.GetSingleData();
    this.open(ClientFORM);
  }
  AddClient(ClientFORM) {
    this.Client = new Client();
    this.WorkOrderObj = 0;
    this.filterMasterModelObj.Acc_Client_pkeyId = this.WorkOrderObj;
    this.open(ClientFORM);
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
  checkChangeClient(dataItem) {
    this.Client.Acc_Client_pkeyId = dataItem.Acc_Client_pkeyId;
    this.Client.IsActive = !dataItem.IsActive;
    this.Client.Type = 3;
    this.clientServices.CreateUpdateClient(this.Client).subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.commonMessage('Client Status Updated..');
        this.GetGridData();
      } else {
        this.commonMessage(result.Message);
      }
    });
  }

  GetSingleData() {
    this.Client = new Client();
    this.filterMasterModelObj.Type = 2;
    this.filterMasterModelObj.Single = true;
    this.filterMasterModelObj.Acc_Client_pkeyId = this.WorkOrderObj;
    this.clientServices
      .ClientListData(this.filterMasterModelObj)
      .subscribe((response) => {
        if (response[0][0] != null) {
          this.Client = response[0][0];
          //dfebugger;
          if (
            this.Client.Company_Name != null &&
            this.Client.Company_Name != undefined
          ) {
            let name = this.Client.Company_Name.split(' ');
            if (name != null && name.length > 0) {
              this.Client.Company_First_Name = name[0];
              if (name.length > 1) {
                this.Client.Company_Middle_Name = name[1];
                if (name.length > 2) {
                  this.Client.Company_Last_Name = name[2];
                }
              }
            }
          }
        }
      });
  }
  FormButtonPOPUp(EditClientForm) {
    if (EditClientForm.invalid) {
      return;
    }
    if (this.Client.ContactName == null || this.Client.ContactName == '') {
      return;
    }
    this.button = 'Progressing..';
    this.isLoading = true;
    this.Client.Company_Name =
      this.Client.Company_First_Name +
      ' ' +
      this.Client.Company_Middle_Name +
      ' ' +
      this.Client.Company_Last_Name;
    if (this.Client.Acc_Client_pkeyId == 0) {
      this.Client.Type = 1;
      this.Client.IsActive = true;
    } else {
      this.Client.Type = 2;
    }
    this.clientServices
      .CreateUpdateClient(this.Client)
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
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  RemovewhiteSpace(event, field) {
    this.Client[field] = this.AccountingServices.RemoveWhiteSpace(
      event.target.value
    );
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
  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  close() {
    this.xmodalService.dismissAll();
    this.Client = new Client();
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
