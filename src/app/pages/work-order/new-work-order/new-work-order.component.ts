import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WorkOrderDrodownServices } from "../../../services/util/dropdown.service";
import {
  WorkOrderModel,
  GetUserMetaDataModel
} from "./new-work-order-model";
import { SaveWorkOrderServices } from "./new-work-order.service";
import { EncrDecrService } from "../../../services/util/encr-decr.service";
import { ClientResultServices } from "../../client-result/client-result/client-result.service";
import { TaskBidMasterModel } from '../../client-result/client-result/client-result-model';
import { WorkOrderFields } from './work-order-fields';
import { IplAppModalContent } from '../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from 'firebase/app';
import _ from 'underscore';
import md5 from "md5";
import * as moment from 'moment';
import { CountyZipModel } from "../../user/add-user/add-user-model";
import { DropdownModel } from "../../models/dropdown-model";
import { SaveWorkOrderViewServices } from "../work-order-view/work-order-view-service";


@Component({
  templateUrl: "./new-work-order.component.html",
  styles: [`
  @media(max-width:900px){
    .smallBox{
      margin-bottom:3% !important;
    }
  }
  `]
})

export class WorkOrderComponent implements OnInit {
  isHelpActive = false;
  AssignedAdminList: any; // temp array
  BackgroundList: any; // temp array
  submitted = false; // submitted;
  isnew = true;
  formUsrCommonGroup: UntypedFormGroup; // create obj
  WorkOrderModelObj: WorkOrderModel = new WorkOrderModel(); // model obj
  GetUserMetaDataModelObj: GetUserMetaDataModel = new GetUserMetaDataModel();
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  public Cmtvalue = `  `;
  AfterCopy: boolean = true;
  // only drop down
  dropCkck = false;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  MessageFlag: string; // custom msg sathi
  FormDisabledCustom = false;
  //formfiels
  formFields = WorkOrderFields;
  copydetail: any;
  ProcessorList: any;
  CategoryList: any;
  LoanTypeList: any;
  CustomerNumberList: any;
  RushList: any;
  StateList: any;
  encuser: any;
  decuser: any;
  Old_Contractor: Number = 0;
  Old_Processor: Number = 0;
  Old_Cordinator: Number = 0;
  Recurs_PeriodList = [
    { Id: 0, Name: "Select" },
    { Id: 1, Name: "Day(s)" },
    { Id: 2, Name: "Week(s)" },
    { Id: 3, Name: "Month(s)" }
  ];
  IsRecHide: boolean = true;
  RecivedDateArray = [];
  DueDateArray = [];
  CountyZipModelObj: CountyZipModel = new CountyZipModel();

  IsEditEnable=true;
  dropdownModel:DropdownModel=new DropdownModel()
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xSaveWorkOrderServices: SaveWorkOrderServices,
    private modalService: NgbModal,
    private xRouter: Router,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xClientResultServices: ClientResultServices,
    private xdatabase: AngularFireDatabase,
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);
    }


    const id1 = this.xRoute.snapshot.params['id'];
    if(id1!="new")
    {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.workid = parseInt(id);
    }

    this.GetDropDowndata(this.workid,0);

    this.WorkOrderModelObj.Company = 0;
    this.WorkOrderModelObj.CustomerNumber = 0;
    this.WorkOrderModelObj.WorkType = 0;
    this.WorkOrderModelObj.Category = 0;
    this.WorkOrderModelObj.state = 0;
    this.WorkOrderModelObj.Contractor = 0;
    this.WorkOrderModelObj.Rush = 0;
    this.WorkOrderModelObj.Background = 0;
    // var xxx = "2019-10-12T06:30:00.000Z";

    // this.WorkOrderModelObj.ReceivedDate = new Date(xxx);

  }

  ngOnInit() {
    ////dfebugger;
    this.encuser = localStorage.getItem('UserName');
    this.formUsrCommonGroup = this.formBuilder.group({
      WONumber: ["", Validators.required],
      EmailVal: ["", [Validators.email]],
      //CustomerNumberval: ["", Validators.required],
      WorkTypeval: ["", Validators.required],
      //Categoryval: ["", Validators.required],
      AddressVal: ["", Validators.required],
      cityVal: ["", Validators.required],
      stateval: ["", Validators.required],
      ZipVal: ["", Validators.required],
      IPLNumberVal: ["", Validators.required],
      CompanyVal: ["", Validators.nullValidator],
      NameVal: ["", Validators.nullValidator],
      PhoneVal: ["", Validators.nullValidator],
      ContractorVal: ["", Validators.nullValidator],
      CordinatorVal: ["", Validators.nullValidator],
      ProcessorVal: ["", Validators.nullValidator],
      CategoryVal: ["", Validators.nullValidator],
      LoanVal: ["", Validators.nullValidator],
      LoanNumberVal: ["", Validators.nullValidator],
      CustomerVal: ["", Validators.nullValidator],
      BATFVal: ["", Validators.nullValidator],
      IsInspectionVal: ["", Validators.nullValidator],
      LotSizeVal: ["", Validators.nullValidator],
      RushVal: ["", Validators.nullValidator],
      LockCodeVal: ["", Validators.nullValidator],
      LockLocationVal: ["", Validators.nullValidator],
      KeyCodeVal: ["", Validators.nullValidator],
      GateCodeVal: ["", Validators.nullValidator],
      BrokerInfoVal: ["", Validators.nullValidator],
      //CommentsVal: ["", Validators.nullValidator],
      MortVal: ["", Validators.nullValidator],
      BackgroundVal: ["", Validators.nullValidator],
      IsEdit:["",Validators.nullValidator]
    });

    this.copydetail = localStorage.getItem('copy');
    this.getModelData();
    //this.WorkOrderModelObj.Received_Date = new Date().toISOString().split('T')[0];
    // this.CalculateReceivedDate(null);
    //Added by hemant team
    this.formFields[0][1].fields[0].flag = false;
    this.formFields[0][2].fields[0].flag = false;
    this.formFields[0][4].fields[0].flag = false;
    // console.log(this.getModelData)
  }

  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  onSelectChange(cardIndex, index, subIndex) {
    // this.formFields[cardIndex][index].fields[subIndex].flag = false;
    // if (this.formFields[cardIndex][index].fields[subIndex].model === 'Company') {
    //   this.Company_Method();
    //   // this.GetDropDowndata(0,this.WorkOrderModelObj.Company);
    // }
  }
  onValueChange(cardIndex, index, subIndex) {
    this.formFields[cardIndex][index].fields[subIndex].flag = false;
    if (this.formFields[cardIndex][index].fields[subIndex].model === 'Company') {
      this.Company_Method();
      this.GetDropDowndata(0,this.WorkOrderModelObj.Company);
    }
  }
  NweWorkOrderFilter(value, val) {
    //debugger
    if (val == 'WorkTypeval') {
      var filteredcustomer = this.worklist.filter(function (el) {
        return el.WT_WorkType != "";
      });
      this.formFields[0][2].fields[0].data = filteredcustomer.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[0][2].fields[0].data = this.worklist.slice();
    }

    if (val == 'CompanyVal') {
      var filteredcustomer = this.Clientlist.filter(function (el) {
        return el.Client_Company_Name != "";
      });
      this.formFields[0][1].fields[0].data = filteredcustomer.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[0][1].fields[0].data = this.Clientlist.slice();
    }

    if (val == 'ContractorVal') {
      var filteredcustomer = this.Contractorlist.filter(function (el) {
        return el.User_FirstName != "";
      });
      this.formFields[0][6].fields[0].data = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[0][6].fields[0].data = this.Contractorlist.slice();
    }

    if (val == 'CordinatorVal') {
      var filteredcustomer = this.Cordinatorlist.filter(function (el) {
        return el.User_FirstName != "";
      });
      this.formFields[0][7].fields[0].data = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[0][7].fields[0].data = this.Cordinatorlist.slice();
    }

    if (val == 'ProcessorVal') {
      var filteredcustomer = this.ProcessorList.filter(function (el) {
        return el.User_FirstName != "";
      });
      this.formFields[0][8].fields[0].data = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[0][8].fields[0].data = this.ProcessorList.slice();
    }

    if (val == 'CategoryVal') {
      //debugger
      var filteredcustomer = this.CategoryList.filter(function (el) {
        return el.Cat_Name != null;
      });
      this.formFields[1][1].fields[0].data = filteredcustomer.filter((s) => s.Cat_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[1][1].fields[0].data = this.CategoryList.slice();
    }
    if (val == 'LoanVal') {
      var filteredcustomer = this.LoanTypeList.filter(function (el) {
        return el.Loan_Type != null;
      });
      this.formFields[1][2].fields[0].data = filteredcustomer.filter((s) => s.Loan_Type.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[1][2].fields[0].data = this.LoanTypeList.slice();
    }
    if (val == 'CustomerVal') {
      var filteredcustomer = this.CustomerNumberList.filter(function (el) {
        return el.Cust_Num_Number != null;
      });
      this.formFields[1][4].fields[0].data = filteredcustomer.filter((s) => s.Cust_Num_Number.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[1][4].fields[0].data = this.CustomerNumberList.slice();
    }
    if (val == 'RushVal') {
      var filteredcustomer = this.RushList.filter(function (el) {
        return el.rus_Name != "";
      });
      this.formFields[1][6].fields[1].data = filteredcustomer.filter((s) => s.rus_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[1][6].fields[1].data = this.RushList.slice();
    }
    if (val == 'stateval') {
      var filteredcustomer = this.StateList.filter(function (el) {
        return el.IPL_StateName != "";
      });
      this.formFields[0][4].fields[0].data = filteredcustomer.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[0][4].fields[0].data = this.StateList.slice();
    }

    if (val == 'BackgroundVal') {
      var filteredcustomer = this.BackgroundCheckProviderList.filter(function (el) {
        return el.Back_Chk_ProviderName != "";
      });
      this.formFields[0][10].fields[0].data = filteredcustomer.filter((s) => s.Back_Chk_ProviderName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.formFields[0][10].fields[0].data = this.BackgroundCheckProviderList.slice();
    }
  }

  /// button called
  FormButton() {
    //debugger;
    this.WorkOrderModelObj;
    this.submitted = true;

    // only drop down
    this.dropCkck = false;

    if (this.WorkOrderModelObj.WorkType == 0) {
      this.formFields[0][2].fields[0].flag = true;
      this.dropCkck = true;
    }
    if (this.WorkOrderModelObj.Company == 0) {
      this.formFields[0][1].fields[0].flag = true;
      this.dropCkck = true;
    }
    if (this.WorkOrderModelObj.state == 0) {
      this.formFields[0][4].fields[0].flag = true;
      this.dropCkck = true;
    }
    if (!this.WorkOrderModelObj.dueDate) {
      return;

    }



    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    if (this.dropCkck) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    var recTmpArray = [];
    this.RecivedDateArray.forEach(element => {
      var trnsDate = moment(element.toString()).format('MM/DD/yyyy');
      recTmpArray.push(trnsDate);
    });
    this.WorkOrderModelObj.Recurs_ReceivedDateArray = recTmpArray;

    var dueTmpArray = [];
    //debugger;
    if (this.DueDateArray.length > 0) {
      for (let i = 0; i < this.RecivedDateArray.length; i++) {
        if (this.RecivedDateArray[i + 1] != undefined) {

          var selectedCom = this.DueDateArray.filter(
            (s) => s > this.RecivedDateArray[i] && s < this.RecivedDateArray[i + 1]
            );

          if (selectedCom.length > 0) {
            var trnsDate = moment(selectedCom[0].toString()).format('MM/DD/yyyy');
            dueTmpArray.push(trnsDate);
          }
          else
          {
            var trnsDate = moment(this.DueDateArray[0].toString()).format('MM/DD/yyyy');
            dueTmpArray.push(trnsDate);
          }
        }
        else
        {
          var selectedCom = this.DueDateArray.filter(
            (s) => s >= this.RecivedDateArray[i]);

          if (selectedCom.length > 0) {
            var trnsDate = moment(selectedCom[0].toString()).format('MM/DD/yyyy');
            dueTmpArray.push(trnsDate);
          }
          else
          {
            var trnsDate = moment(this.DueDateArray[0].toString()).format('MM/DD/yyyy');
            dueTmpArray.push(trnsDate);
          }
        }

      }
    }





    this.WorkOrderModelObj.Recurs_DueDateArray = dueTmpArray;

    // all valid data to save
    this.xSaveWorkOrderServices
      .WorkorderPostData(this.WorkOrderModelObj)
      .subscribe(async response => {
        // debugger;
        // console.log('wochk', response);
        // Added by Hemant Team
        if (response[0].Status != undefined && response[0].Status == "1") {
          if (this.WorkOrderModelObj.workOrder_ID > 0) {
            this.MessageFlag = "Work Order Updated...!";
            this.isLoading = false;
            this.button = "Save";
            this.isnew = false;
            this.AfterCopy = false;
            this.commonMessage();

            if (this.workid != 0) {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.workid);
              this.xRouter.navigate(["/client/clientresultinstruction/" + btoa(encrypted)]);
            }
          }
          else {
            this.MessageFlag = "Work Order Saved...!";
            this.isLoading = false;
            this.button = "Save";
            this.isnew = false;
            this.commonMessage();

            if (response[0].workOrder_ID != 0) {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', response[0].workOrder_ID);
              this.xRouter.navigate(["/client/clientresultinstruction/" + btoa(encrypted)]);
            }
          }

        }
        else {
          this.isLoading = false;
          if (this.workid != 0) {
            this.button = "Update";
          }
          else {
            this.button = "Save";
          }
        }

      });
  }

  // btn code end

  // drop down valid or not
  Company_Method() {
    if (this.WorkOrderModelObj.Company != 0) {
      this.GetUserMetaDataModelObj.client_pkyeId = this.WorkOrderModelObj.Company;
      this.GetGetUserMetaData();
    } else {
      this.WorkOrderModelObj.clientName = "";
      this.WorkOrderModelObj.clientPhone = "";
      this.WorkOrderModelObj.clientEmail = "";
      this.WorkOrderModelObj.clientTypeName = "";
    }
  }
  worklist: any;
  Clientlist: any;
  Contractorlist: any;
  Cordinatorlist: any;
  GetDropDowndata(workorderId,companyId) {
    this.dropdownModel.WorkOrderID=workorderId;
    this.dropdownModel.FilterID=companyId;
    this.dropdownModel.PageID=1;
    this.dropdownModel.Type=3;

    this.xWorkOrderDrodownServices
      .GetDropdownList(this.dropdownModel)
      .subscribe(response => {
        // console.log('response',response);
        if (response.length != 0) {
          this.formFields[0][1].fields[0].data = response[0]; // for CompanyList
          this.Clientlist = response[0]; // for CompanyList

          this.formFields[0][2].fields[0].data = response[1]; // for WorkTypeList
          this.worklist = response[1]; // for WorkTypeList

          this.formFields[0][4].fields[0].data = response[2]; // for StateList
          this.StateList = response[2]; // for StateList

          this.formFields[0][6].fields[0].data = response[3]; // for ContractorList
          this.Contractorlist = response[3]; // for ContractorList

          this.formFields[0][7].fields[0].data = response[4]; // for CordinatorList
          this.Cordinatorlist = response[4]; // for CordinatorList

          this.formFields[0][8].fields[0].data = response[5]; // for ProcessorList
          this.ProcessorList = response[5]; // for ProcessorList

          this.BackgroundList = response[6]; //Background Provider

          this.formFields[0][10].fields[0].data = response[6];
          this.BackgroundCheckProviderList = response[6];

          this.formFields[1][1].fields[0].data = response[7]; // for CategoryList
          this.CategoryList = response[7];

          this.AssignedAdminList = response[7];

          this.formFields[1][2].fields[0].data = response[8]; // for LoanTypeList
          this.LoanTypeList = response[8]; // for LoanTypeList


          this.formFields[1][4].fields[0].data = response[9]; // for CustomerNumberList
          this.CustomerNumberList = response[9]; // for CustomerNumberList

          this.formFields[1][6].fields[1].data = response[10]; // for RushList
          this.RushList = response[10]; // for RushList
        }

      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  // clear form
  Clear() {
    this.WorkOrderModelObj = new WorkOrderModel();
  }

  GetGetUserMetaData() {
    this.xSaveWorkOrderServices
      .WorkorderGetUserMetaData(this.GetUserMetaDataModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.WorkOrderModelObj.Com_Name = response[0][0].Clnt_Con_List_Name;
          this.WorkOrderModelObj.Com_Phone = response[0][0].Clnt_Con_List_Phone;
          this.WorkOrderModelObj.Com_Email = response[0][0].Clnt_Con_List_Email;
          this.WorkOrderModelObj.clientTypeName =
            response[0][0].Clnt_Con_List_TypeName;
        }
      });
  }

  ModelObj: any;
  copydata: any;
  workid: Number = 0;
  IsEditDisable = false;
  isDisabled = false;
  getModelData() {
    var coppynu = this.xClientResultServices.getPathParam();
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.WorkOrderModelObj = new WorkOrderModel();
      this.GetWorkOrderId();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.workid = parseInt(id);
      this.getworkorderdetails();
    }
  }

  getworkorderdetails() {

    // this.copydata = this.xClientResultServices.geteditPathParam();
    // console.log(this.copydata);
    this.TaskBidMasterModelObj.workOrder_ID = this.workid;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        // console.log('copywork', response);
        this.IsEditEnable=response[0][0].IsEdit;

        this.WorkOrderModelObj.EstimatedDate = response[0][0].EstimatedDate;

        this.WorkOrderModelObj.workOrder_ID = response[0][0].workOrder_ID;
        this.WorkOrderModelObj.BATF = response[0][0].BATF;
        this.WorkOrderModelObj.Broker_Info = response[0][0].Broker_Info;
        this.WorkOrderModelObj.Cancel_Date = response[0][0].Cancel_Date;
        this.WorkOrderModelObj.Category = response[0][0].Category;
        this.WorkOrderModelObj.Com_Email = response[0][0].Com_Email;
        this.WorkOrderModelObj.Com_Name = response[0][0].Com_Name;
        this.WorkOrderModelObj.Com_Phone = response[0][0].Com_Phone;
        this.WorkOrderModelObj.Comments = response[0][0].Comments;
        this.Cmtvalue = this.WorkOrderModelObj.Comments;
        this.WorkOrderModelObj.Company = parseInt(response[0][0].Company);
        this.WorkOrderModelObj.Complete_Date = response[0][0].Complete_Date;
        this.WorkOrderModelObj.Contractor = parseInt(response[0][0].Contractor);
        this.Old_Contractor = parseInt(response[0][0].Contractor);
        this.WorkOrderModelObj.Cordinator = response[0][0].Cordinator;
        this.Old_Cordinator = response[0][0].Cordinator;
        this.WorkOrderModelObj.Customer_Number = response[0][0].Customer_Number;
        this.WorkOrderModelObj.IPLNO = response[0][0].IPLNO;
        this.WorkOrderModelObj.ISInspection = response[0][0].ISInspection;
        this.WorkOrderModelObj.Loan_Info = parseInt(response[0][0].Loan_Info);
        this.WorkOrderModelObj.Lock_Code = response[0][0].Lock_Code;
        this.WorkOrderModelObj.Lotsize = response[0][0].Lotsize;
        this.WorkOrderModelObj.Rush = response[0][0].Rush;
        this.WorkOrderModelObj.WorkType = response[0][0].WorkType;
        this.WorkOrderModelObj.address1 = response[0][0].address1;
        this.WorkOrderModelObj.address2 = response[0][0].address2;
        this.WorkOrderModelObj.city = response[0][0].city;
        this.WorkOrderModelObj.clientDueDate = response[0][0].clientDueDate;
        this.WorkOrderModelObj.clientInstructions = response[0][0].clientInstructions;
        this.WorkOrderModelObj.clientStatus = response[0][0].clientStatus;

        this.WorkOrderModelObj.country = response[0][0].country;
        this.WorkOrderModelObj.currUserId = response[0][0].currUserId;

        this.WorkOrderModelObj.dueDate = response[0][0].dueDate;
        this.WorkOrderModelObj.gpsLatitude = response[0][0].gpsLatitude;
        this.WorkOrderModelObj.gpsLongitude = response[0][0].gpsLongitude;

        this.WorkOrderModelObj.startDate = response[0][0].startDate;
        this.WorkOrderModelObj.state = parseInt(response[0][0].state);
        this.WorkOrderModelObj.status = response[0][0].status;
        this.WorkOrderModelObj.workOrderInfo = response[0][0].workOrderInfo;
        this.WorkOrderModelObj.workOrderNumber = response[0][0].workOrderNumber;
        this.WorkOrderModelObj.zip = response[0][0].zip;
        this.WorkOrderModelObj.Lock_Location = response[0][0].Lock_Location;
        this.WorkOrderModelObj.Key_Code = response[0][0].Key_Code;
        this.WorkOrderModelObj.Gate_Code = response[0][0].Gate_Code;
        this.WorkOrderModelObj.Loan_Number = response[0][0].Loan_Number;
        this.WorkOrderModelObj.Processor = response[0][0].Processor;
        this.Old_Processor = response[0][0].Processor;
        this.WorkOrderModelObj.Mortgagor = response[0][0].Mortgagor;
        this.WorkOrderModelObj.DateCreated = response[0][0].DateCreated;

        //debugger;
        this.WorkOrderModelObj.Received_Date = response[0][0].Received_Date;
        this.WorkOrderModelObj.Recurring = response[0][0].Recurring;
        this.WorkOrderModelObj.Recurs_Day = response[0][0].Recurs_Day;
        this.WorkOrderModelObj.Recurs_Period = response[0][0].Recurs_Period;
        this.WorkOrderModelObj.Recurs_Limit = response[0][0].Recurs_Limit;
        this.WorkOrderModelObj.Recurs_CutOffDate = response[0][0].Recurs_CutOffDate;
        this.WorkOrderModelObj.Background = response[0][0].Background_Provider;

        if (this.WorkOrderModelObj.Recurring != undefined) {
          this.IsRecurring(this.WorkOrderModelObj.Recurring);
        }
        this.CalculateReceivedDate();

        if (this.copydetail == 'Edit') {

          this.isDisabled = true;
          this.FormDisabledCustom = false;
          this.button = "Save";
          this.WorkOrderModelObj.Type = 6;
          localStorage.removeItem('copy');
        } else {
          this.formUsrCommonGroup.disable();
          this.IsEditDisable = true;
          this.isDisabled = true;
          this.FormDisabledCustom = true;
          this.button = "Update";
          this.AfterCopy = false;
          this.WorkOrderModelObj.Type = 2;
        }
      })
  }

  // end code
  EditForms() {
    // this.workOrderEditLockUnlock(true);

    this.IsEditDisable = false;
    this.isDisabled = true;
    this.formUsrCommonGroup.enable();
    this.FormDisabledCustom = false;// for calander

    this.xSaveWorkOrderViewServices.PostNewAccessLog(this.WorkOrderModelObj.workOrder_ID,33)
    .subscribe(res =>{})
  }

  // get auto Work Order id
  GetWorkOrderId() {
    this.xSaveWorkOrderServices.WorkorderAutoGenerateId()
      .subscribe(response => {
        this.WorkOrderModelObj.IPLNO = response[0];
        this.WorkOrderModelObj.Received_Date = new Date();
      });
  }
  // reset fiels from workorder
  Reset() {
    // console.log(this.Reset)
    this.WorkOrderModelObj.workOrder_ID = 0;
    this.WorkOrderModelObj.BATF = false;
    this.WorkOrderModelObj.IsEdit = false;
    this.WorkOrderModelObj.Broker_Info = '';
    this.WorkOrderModelObj.Cancel_Date = '';
    this.WorkOrderModelObj.Category = 0;
    this.WorkOrderModelObj.Com_Email = '';
    this.WorkOrderModelObj.Com_Name = '';
    this.WorkOrderModelObj.Com_Phone = '';
    this.WorkOrderModelObj.Comments = '';
    this.WorkOrderModelObj.Company = 0;
    this.WorkOrderModelObj.Complete_Date = '';
    this.WorkOrderModelObj.Contractor = 0;
    this.WorkOrderModelObj.Cordinator = 0;
    this.WorkOrderModelObj.Customer_Number = '';
    this.WorkOrderModelObj.IPLNO = '';
    this.WorkOrderModelObj.ISInspection = '';
    this.WorkOrderModelObj.Loan_Info = 0;
    this.WorkOrderModelObj.Lock_Code = '';
    this.WorkOrderModelObj.Lotsize = '';
    this.WorkOrderModelObj.Received_Date = '';
    this.WorkOrderModelObj.Rush = 0;
    this.WorkOrderModelObj.WorkType = 0;
    this.WorkOrderModelObj.address1 = '';
    this.WorkOrderModelObj.address2 = '';
    this.WorkOrderModelObj.city = '';
    this.WorkOrderModelObj.clientDueDate = '';

    this.WorkOrderModelObj.clientStatus = '';

    this.WorkOrderModelObj.country = '';
    this.WorkOrderModelObj.currUserId = 0;

    this.WorkOrderModelObj.dueDate = '';
    this.WorkOrderModelObj.gpsLatitude = '';
    this.WorkOrderModelObj.gpsLongitude = '';

    this.WorkOrderModelObj.startDate = '';
    this.WorkOrderModelObj.state = 0;
    this.WorkOrderModelObj.status = '';
    this.WorkOrderModelObj.workOrderInfo = '';
    this.WorkOrderModelObj.workOrderNumber = '';
    this.WorkOrderModelObj.zip = 0;
    this.WorkOrderModelObj.Lock_Location = '';
    this.WorkOrderModelObj.Key_Code = '';
    this.WorkOrderModelObj.Gate_Code = '';
    this.WorkOrderModelObj.Loan_Number = '';
    this.WorkOrderModelObj.Recurs_CutOffDate = '';
    this.WorkOrderModelObj.Recurs_Day = 0;
    this.WorkOrderModelObj.Recurs_Limit = 0;
    this.WorkOrderModelObj.Recurs_Period = 0;
    this.button = "Save";
    this.isnew = true;
    location.reload();

  }
  //   public valueChange(value: any): void {
  //     this.value = this.WorkOrderModelObj.Comments;
  // }
  Back(arg) {
    // this.workOrderEditLockUnlock(false);
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', arg);
    this.xRouter.navigate(["/client/clientresultinstruction/" + btoa(encrypted)]);
  }

  IsRecurring(arg) {
    if (arg == true) {
      this.IsRecHide = false;
    } else {
      this.IsRecHide = true;
      this.WorkOrderModelObj.Recurs_CutOffDate = "";
      this.WorkOrderModelObj.Recurs_Day = 0;
      this.WorkOrderModelObj.Recurs_Limit = 0;
      this.WorkOrderModelObj.Recurs_Period = 0;
    }
  }

  CalculateReceivedDate() {
    //debugger;
    this.RecivedDateArray = [];
    this.DueDateArray = [];


    if (this.WorkOrderModelObj.Received_Date != null && this.WorkOrderModelObj.Received_Date != '' && this.WorkOrderModelObj.Received_Date != undefined && this.WorkOrderModelObj.Recurs_Day > 0 && this.WorkOrderModelObj.Recurs_Period > 0) {
      var arrayDate = this.WorkOrderModelObj.Received_Date;
      arrayDate = new Date(new Date(arrayDate).toDateString());
      //debugger;
      var endDate = new Date(new Date().toDateString());
      endDate.setMonth(endDate.getMonth() + 12);
      //var endDate = new Date(today.getFullYear(), 11, 31);


      var addDays = 0;
      if (this.WorkOrderModelObj.Recurs_Period == 1) {
        addDays = parseInt(this.WorkOrderModelObj.Recurs_Day);
      }
      else if (this.WorkOrderModelObj.Recurs_Period == 2) {
        addDays = 7 * this.WorkOrderModelObj.Recurs_Day
      }

      if (this.WorkOrderModelObj.Recurs_Period == 1 || this.WorkOrderModelObj.Recurs_Period == 2) { // Days  // Week
        if (this.WorkOrderModelObj.Recurs_CutOffDate != undefined) {
          var newArrayDate = new Date(arrayDate);
          this.RecivedDateArray.push(newArrayDate);
          var cutDate = new Date(new Date(this.WorkOrderModelObj.Recurs_CutOffDate).toDateString());

          while (arrayDate < cutDate) {
            arrayDate.setDate(arrayDate.getDate() + addDays);
            if (this.WorkOrderModelObj.Recurs_Limit > 0) {
              var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
              if (selectedCom.length >= this.WorkOrderModelObj.Recurs_Limit) {
                arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
              }
            }
            var newDate = new Date(arrayDate);
            if (newDate < cutDate) {
              this.RecivedDateArray.push(newDate);
            }
          }
        }
        else {
          var newArrayDate = new Date(arrayDate);
          this.RecivedDateArray.push(newArrayDate);
          while (arrayDate < endDate) {
            arrayDate.setDate(arrayDate.getDate() + addDays);
            if (this.WorkOrderModelObj.Recurs_Limit > 0) {
              var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
              if (selectedCom.length >= this.WorkOrderModelObj.Recurs_Limit) {
                arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
              }
            }
            var newDate = new Date(arrayDate);
            this.RecivedDateArray.push(newDate);
          }
        }

      }
      else if (this.WorkOrderModelObj.Recurs_Period == 3) { // Month
        if (this.WorkOrderModelObj.Recurs_CutOffDate != undefined) {
          var newArrayDate = new Date(arrayDate);
          this.RecivedDateArray.push(newArrayDate);
          var cutDate = new Date(new Date(this.WorkOrderModelObj.Recurs_CutOffDate).toDateString());

          while (arrayDate < cutDate) {
            arrayDate.setMonth(arrayDate.getMonth() + parseInt(this.WorkOrderModelObj.Recurs_Day));
            if (this.WorkOrderModelObj.Recurs_Limit > 0) {
              var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
              if (selectedCom.length >= this.WorkOrderModelObj.Recurs_Limit) {
                arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
              }
            }
            var newDate = new Date(arrayDate);
            if (newDate < cutDate) {
              this.RecivedDateArray.push(newDate);
            }
          }
        }
        else {
          var newArrayDate = new Date(arrayDate);
          this.RecivedDateArray.push(newArrayDate);
          while (arrayDate < endDate) {
            arrayDate.setMonth(arrayDate.getMonth() + parseInt(this.WorkOrderModelObj.Recurs_Day));
            if (this.WorkOrderModelObj.Recurs_Limit > 0) {
              var selectedCom = this.RecivedDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
              if (selectedCom.length >= this.WorkOrderModelObj.Recurs_Limit) {
                arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
              }
            }
            var newDate = new Date(arrayDate);
            this.RecivedDateArray.push(newDate);
          }
        }

      }
    }
    if (this.WorkOrderModelObj.dueDate != null && this.WorkOrderModelObj.dueDate != '' && this.WorkOrderModelObj.dueDate != undefined && this.WorkOrderModelObj.Recurs_Day > 0 && this.WorkOrderModelObj.Recurs_Period > 0) {
      var ReceivedarrayDate = this.WorkOrderModelObj.Received_Date;
      ReceivedarrayDate = new Date(new Date(ReceivedarrayDate).toDateString());

      var arrayDate = this.WorkOrderModelObj.dueDate;
      arrayDate = new Date(new Date(arrayDate).toDateString());
      var today = new Date(new Date().toDateString());
      var endDate = new Date(new Date().toDateString());
      endDate.setMonth(endDate.getMonth() + 12);
      //var endDate = new Date(today.getFullYear(), 11, 31);

      var addDays = 0;
      if (this.WorkOrderModelObj.Recurs_Period == 1) {
        addDays = parseInt(this.WorkOrderModelObj.Recurs_Day);
      }
      else if (this.WorkOrderModelObj.Recurs_Period == 2) {
        addDays = 7 * this.WorkOrderModelObj.Recurs_Day
      }

      if (this.WorkOrderModelObj.Recurs_Period == 1 || this.WorkOrderModelObj.Recurs_Period == 2) { // Days  // Week
        var newArrayDate = new Date(arrayDate);
        if (newArrayDate > ReceivedarrayDate) {
          this.DueDateArray.push(newArrayDate);
        }
        while (arrayDate < endDate) {
          arrayDate.setDate(arrayDate.getDate() + addDays);
          if (this.WorkOrderModelObj.Recurs_Limit > 0) {
            var selectedCom = this.DueDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
            if (selectedCom.length >= this.WorkOrderModelObj.Recurs_Limit) {
              arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
            }
          }
          var newDate = new Date(arrayDate);
          if (newDate > ReceivedarrayDate) {
            this.DueDateArray.push(newDate);
          }

        }

      }
      else if (this.WorkOrderModelObj.Recurs_Period == 3) { // Month

        var newArrayDate = new Date(arrayDate);
        if (newArrayDate > ReceivedarrayDate) {
          this.DueDateArray.push(newArrayDate);
        }
        while (arrayDate < endDate) {
          arrayDate.setMonth(arrayDate.getMonth() + parseInt(this.WorkOrderModelObj.Recurs_Day));
          if (this.WorkOrderModelObj.Recurs_Limit > 0) {
            var selectedCom = this.DueDateArray.filter((s) => s.getMonth() == arrayDate.getMonth());
            if (selectedCom.length >= this.WorkOrderModelObj.Recurs_Limit) {
              arrayDate.setMonth(arrayDate.getMonth() + 1, 1);
            }
          }
          var newDate = new Date(arrayDate);
          if (newDate > ReceivedarrayDate) {
            this.DueDateArray.push(newDate);
          }
        }


      }
    }
  }

  public isMeeting(date: Date) {

    var returnClass = "";
    if (this.RecivedDateArray.length > 0 && this.DueDateArray.length > 0 && !!this.RecivedDateArray.find(item => { return item.getTime() == date.getTime() }) &&
      !!this.DueDateArray.find(item => { return item.getTime() == date.getTime() })) {
      returnClass = "commonMeeting";
    }
    else if (this.RecivedDateArray.length > 0 && !!this.RecivedDateArray.find(item => { return item.getTime() == date.getTime() })) {
      returnClass = "meeting";
    }
    else if (this.DueDateArray.length > 0 && !!this.DueDateArray.find(item => { return item.getTime() == date.getTime() })) {
      returnClass = "dueMeeting";
    }

    return returnClass;
  }

  BindZipAddress(zipcode,formcntrl)
  {
    //debugger;
    if (formcntrl == 'ZipVal') {
      this.CountyZipModelObj.Zip_zip = zipcode.target.value;
      this.CountyZipModelObj.Type = 1;

      this.xSaveWorkOrderServices
      .GetZipAddData(this.CountyZipModelObj)
      .subscribe(response => {
        //debugger;
        if (response[0].length != 0) {
          this.WorkOrderModelObj.city = response[0][0].Zip_city;
          this.WorkOrderModelObj.state = response[0][0].ZipState_id;
        }
      });
    }
  }
  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }
  BackgroundCheckProviderList:any;

  DispalyInfo(event: Event, lblName)
  {
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();

    }
    // console.log(event)
  }
  workOrderEditLockUnlock(iseditLock:boolean){
    this.xSaveWorkOrderServices
      .LockUnloadEdit_WorkOrder(this.WorkOrderModelObj.workOrder_ID,iseditLock)
      .subscribe(async response => {
        // console.log('wochk', response);
        this.WorkOrderModelObj.IsEdit=true;
      });
  }

}

