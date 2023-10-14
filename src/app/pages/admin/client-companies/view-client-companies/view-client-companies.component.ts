import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { ViewClientCompaniesModel, filterMasterModel } from "./view-client-companies-model";
import { ViewClientCompaniesServices } from "./view-client-companies.service";
import { AddClientCompaniesModel } from "../add-client-companies/add-client-companies-model";
import { AddClientCompaniesServices } from "../add-client-companies/add-client-companies.service";
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { Buttons, GridColumns } from './constants';
import { TaskFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./view-client-companies.component.html"
})

export class ViewClientCompaniesComponent implements OnInit {
  ViewClientCompaniesModelObj: ViewClientCompaniesModel = new ViewClientCompaniesModel();
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  AddClientCompaniesModelobj: AddClientCompaniesModel = new AddClientCompaniesModel();
  AddClientCompaniesModelObj: AddClientCompaniesModel = new AddClientCompaniesModel();
  public griddata: any[];
  buttons = Buttons;
  gridColumns = GridColumns;
  taskFilters = TaskFilters;
  MessageFlag: string;
  StateList: any;
  public state: State = {};
  constructor(
    private xViewClientCompaniesServices: ViewClientCompaniesServices,
    private xRouter: Router,
    private xAddClientCompaniesServices: AddClientCompaniesServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {
    this.GetDropDowndata();
    this.GetClientData();
  }

  ngOnInit() {
    this.spinner.show();
  }

  GetClientData() {
    // debugger
    this.filterMasterModelObj.Type = 3;
    this.xViewClientCompaniesServices
      .ClientComapnyViewData(this.filterMasterModelObj)
      .subscribe(response => {
        // debugger
        //console.log('client',response)
        if (response.length > 1 && response[2].length > 0) {
          this.filterMasterModelObj.Client_Company_Name = response[2][0].Client_Filter_ClientName
          this.filterMasterModelObj.Client_Billing_Address = response[2][0].Client_Filter_Address
          this.filterMasterModelObj.Client_City = response[2][0].Client_Filter_City
          this.filterMasterModelObj.Client_StateId = response[2][0].Client_Filter_State
          this.filterMasterModelObj.Client_CreatedBy = response[2][0].Client_CreatedBy  //sandip
          this.filterMasterModelObj.Client_ModifiedBy = response[2][0].Client_ModifiedBy //sandip
          this.filterMasterModelObj.Client_IsActive = response[2][0].Client_Filter_CLTIsActive
          this.filterCall();
          this.spinner.hide();
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Client_pkeyID);
              element.ViewUrl = "/home/client/addclientcompanies/" + btoa(encrypted);
            });
          }
          this.spinner.hide();
        }



        // this.GetStateDropDown();
      });
  }



  filterCall() {
    this.filterMasterModelObj.Type = 4;

    this.xViewClientCompaniesServices.ClientComapnyViewData(this.filterMasterModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Client_pkeyID);
            element.ViewUrl = "/home/client/addclientcompanies/" + btoa(encrypted);
          });
        }

      });
  }
  filterdrd(value){
//debugger
if (value.event !='') {
  //debugger
  var filteredcustomer =  this.StateList.filter(function (el) {
    return el.IPL_StateName != "";
  });
  this.taskFilters[2].data = filteredcustomer.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.event.toLowerCase()) !== -1);
}
else{
  this.taskFilters[2].data = this.StateList.slice();
}

  }

  clearData() {
    //debugger
    this.filterMasterModelObj.Type = 5;
    this.xViewClientCompaniesServices.AddUpdateFilterAdminClientData(this.filterMasterModelObj)
    .subscribe(response => {
      //debugger;
      //console.log('client',response);
      this.filterMasterModelObj = new filterMasterModel();
    this.GetClientData();
    });

  }

  saveFilterData() {
    this.filterMasterModelObj.Type = 1;
    this.xViewClientCompaniesServices.AddUpdateFilterAdminClientData(this.filterMasterModelObj)
    .subscribe(response => {
      //debugger;
      //console.log('client filter',response);
      this.MessageFlag = "Client filter saved...!";
      this.commonMessage();
      this.filterCall();
    });
  }

  // clear data
  AddNewClient() {
    this.xRouter.navigate(["/client/addclientcompanies", 'new']);
  }

  deleteDetails(event, dataItem) {
    //debugger
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddClientCompaniesModelobj.Type = 4;
      this.AddClientCompaniesModelobj.Client_IsDelete = true;
      this.AddClientCompaniesModelobj.Client_pkeyID = dataItem.Client_pkeyID;

      this.xAddClientCompaniesServices
        .AddClientCompaniesPost(this.AddClientCompaniesModelobj)
        .subscribe(response => {
          this.GetClientData();
        });
    }
  }

   StateArray: any

  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder()
      .subscribe(response => {
        //debugger
        if (response.length != 0) {
          this.taskFilters[2].data = response[6];
          this.StateList = response[6]; // for StateList

        }
      });
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddClientCompaniesModelObj.Client_pkeyID = dataItem.Client_pkeyID;
    this.AddClientCompaniesModelObj.Client_IsActive = !dataItem.Client_IsActive;
    this.AddClientCompaniesModelObj.Type = 3;

    this.xAddClientCompaniesServices
    .AddClientCompaniesPost(this.AddClientCompaniesModelObj)
    .subscribe(response => {
      this.MessageFlag = "Client status upated...!";


      this.commonMessage();
        this.GetClientData();
      });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
