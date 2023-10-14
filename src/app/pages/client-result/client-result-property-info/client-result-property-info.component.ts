import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Console } from 'console';
import { type } from 'os';
import { IplAppModalContent } from 'src/app/components';
import { WorkOrderDrodownServices } from 'src/app/services/util/dropdown.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { DropdownModel } from '../../models/dropdown-model';
import { BindDataModel, TaskBidMasterModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { ClientResultPIModel,ClientResultPSModel } from './client-result-property-info-model';
import { ClientResultPIServices } from './client-result-property-info.service';

@Component({
  selector: 'app-client-result-property-info',
  templateUrl: './client-result-property-info.component.html',
  styleUrls: ['./client-result-property-info.component.scss']
})
export class ClientResultPropertyInfoComponent implements OnInit {
  public defaultItem: { Loan_Type: string, Loan_pkeyId: number } = { Loan_Type: 'Select', Loan_pkeyId: 0 };
  public defaultItem1:{ LS_Name: string, LS_PkeyID: number } = { LS_Name: 'Select', LS_PkeyID: 0 };
  public defaultItem3:{ PT_Name: string, PT_PkeyID: number } = { PT_Name: 'Select', PT_PkeyID: 0 };
  public defaultItem4:{ OS_Name: string, OS_PkeyID: number } = { OS_Name: 'Select', OS_PkeyID: 0 };
  public defaultItem5:{ PA_Name: string, PA_PkeyID: number } = { PA_Name: 'Select', PA_PkeyID: 0 };
  public defaultItem6:{ PS_Name: string, PS_PkeyID: number } = { PS_Name: 'Select', PS_PkeyID: 0 };
  generalTabhide: boolean = false;
  dateTabhide: boolean = false;
  invTabhide: boolean = false;
  piButton = "Save"; // buttom loading..
  button = "Save";
  isLoading = false;
  isPILoading = false; // buttom loading..
  ClientResultPIModelObj: ClientResultPIModel = new ClientResultPIModel();
  ClientResultPSModelObj: ClientResultPSModel = new ClientResultPSModel();
  _bindDataModelObj:BindDataModel=new BindDataModel();
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  MessageFlag: string;
  workOrderID = 0;
  IsIccDate: boolean = true;
  IsExtReqDate: boolean = true;
  InvTabData: any;
  BidTabData: any;
  ModelObj
  BindData
  constructor(
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xModalService: NgbModal,
    private xClientResultPIServices: ClientResultPIServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xClientResultServices: ClientResultServices,
  ) {
    this.GetDropDowndata();
   }

  ngOnInit(): void {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workorder = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workOrderID = parseInt(workorder);
    this.GetPIDetail();
    this.getModelDatax();
  }

  hideGeneraltab() {
    this.generalTabhide = !this.generalTabhide;
  }
  hideDatetab() {
    this.dateTabhide = !this.dateTabhide;
  }
  hideInvtab() {
    this.invTabhide = !this.invTabhide;
  }
  SavePIForm() {
    this.isPILoading = true;
    this.piButton = "Processing";
    //debugger;
    this.ClientResultPIModelObj.PI_WO_ID = this.workOrderID;
    this.ClientResultPIModelObj.PI_IsActive = true;
    this.ClientResultPIModelObj.Type = this.ClientResultPIModelObj.PI_PkeyID > 0 ? 2 : 1;
    this.xClientResultPIServices
      .AddClientResultPropertyInfoPost(this.ClientResultPIModelObj)
      .subscribe(response => {
        this.isPILoading = false;
        this.piButton = "Save";
        if (response.length > 0) {
          this.ClientResultPIModelObj = new ClientResultPIModel();
          this.MessageFlag = "Property Info Saved...!";
          this.commonMessage();
          this.GetPIDetail();

        }
      });
  }

  GetPIDetail() {
    this.ClientResultPIModelObj.PI_WO_ID = this.workOrderID;
    this.ClientResultPIModelObj.Type = 3;
    this.xClientResultPIServices
      .GetClientResultPropertyInfo(this.ClientResultPIModelObj)
      .subscribe(response => {
        // console.log('response',response)
        if (response[0].length != 0) {
          this.ClientResultPIModelObj.PI_PkeyID = response[0][0].CRPI_PkeyID;
          this.ClientResultPIModelObj.PI_WO_ID = response[0][0].CRPI_WO_ID;
          this.ClientResultPIModelObj.PI_LockCode = response[0][0].CRPI_LockCode;
          this.ClientResultPIModelObj.PI_LockBox = response[0][0].CRPI_LockBox;
          this.ClientResultPIModelObj.PI_LotSize = response[0][0].CRPI_LotSize;
          this.ClientResultPIModelObj.PI_ICC = response[0][0].CRPI_ICC;
          this.ClientResultPIModelObj.PI_ICCDate = response[0][0].CRPI_ICCDate;
          this.ClientResultPIModelObj.PI_DaysInDefault = response[0][0].CRPI_DaysInDefault;
          this.ClientResultPIModelObj.PI_VPRRequired = response[0][0].CRPI_VPRRequired;
          this.ClientResultPIModelObj.PI_VPRField = response[0][0].CRPI_VPRField;
          this.ClientResultPIModelObj.PI_VPRExpDate = response[0][0].CRPI_VPRExpDate;
          this.ClientResultPIModelObj.PI_InitDefaultDate = response[0][0].CRPI_InitDefaultDate;
          this.ClientResultPIModelObj.PI_PtvDate = response[0][0].CRPI_PtvDate;
          this.ClientResultPIModelObj.PI_InitSecureDate = response[0][0].CRPI_InitSecureDate;
          this.ClientResultPIModelObj.PI_DidRecDate = response[0][0].CRPI_DidRecDate;
          this.ClientResultPIModelObj.PI_RecurringDate = response[0][0].CRPI_RecurringDate;
          this.ClientResultPIModelObj.PI_OrCovDate = response[0][0].CRPI_OrCovDate;
          this.ClientResultPIModelObj.PI_ExtReqDate = response[0][0].CRPI_ExtReqDate;
          this.ClientResultPIModelObj.PI_NewCovDate = response[0][0].CRPI_NewCovDate;
          this.ClientResultPIModelObj.PI_ExtReq = response[0][0].CRPI_ExtReq;

          this.ClientResultPIModelObj.PI_Gason = response[0][0].CRPI_Gason;
          this.ClientResultPIModelObj.PI_Wateron = response[0][0].CRPI_Wateron;
          this.ClientResultPIModelObj.PI_Elcton = response[0][0].CRPI_Elcton;
          this.ClientResultPIModelObj.PI_GasLR = response[0][0].CRPI_GasLR;
          this.ClientResultPIModelObj.PI_GasTS = response[0][0].CRPI_GasTS;
          this.ClientResultPIModelObj.PI_WaterLR = response[0][0].CRPI_WaterLR;
          this.ClientResultPIModelObj.PI_WaterTS = response[0][0].CRPI_WaterTS;
          this.ClientResultPIModelObj.PI_ElctLR = response[0][0].CRPI_ElctLR;
          this.ClientResultPIModelObj.PI_ElctTS = response[0][0].CRPI_ElctTS;
          this.ClientResultPIModelObj.CRPI_BrokerInfo = response[0][0].CRPI_BrokerInfo;
          this.ClientResultPIModelObj.CRPI_LoanNumber = response[0][0].CRPI_LoanNumber;
          this.ClientResultPIModelObj.CRPI_LoanType = response[0][0].CRPI_LoanType;
          this.ClientResultPIModelObj.CRPI_Mortgagor = response[0][0].CRPI_Mortgagor;
          this.ClientResultPIModelObj.CRPI_Loan_Status = response[0][0].CRPI_Loan_Status;
          this.ClientResultPIModelObj.CRPI_Occupanct_Status = response[0][0].CRPI_Occupanct_Status;
          this.ClientResultPIModelObj.CRPI_Property_Locked = response[0][0].CRPI_Property_Locked;
          this.ClientResultPIModelObj.CRPI_Property_Alert = response[0][0].CRPI_Property_Alert;
          this.ClientResultPIModelObj.CRPI_Property_Status = response[0][0].CRPI_Property_Status;
          if (response[0][0].CRPI_Front_Of_HouseImagePath != null) {
            this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath = response[0][0].CRPI_Front_Of_HouseImagePath;
          }
          else
          {
            this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath='';
          }

          this.ClientResultPIModelObj.CRPI_Front_Of_HouseImageName = response[0][0].CRPI_Front_Of_HouseImageName;
          this.ClientResultPIModelObj.CRPI_GPS_Latitude =response[0][0].CRPI_GPS_Latitude
          this.ClientResultPIModelObj.CRPI_GPS_longitude =response[0][0].CRPI_GPS_longitude
          this.IsIcc(this.ClientResultPIModelObj.PI_ICC);
          this.calculateDays(this.ClientResultPIModelObj.PI_InitDefaultDate);
          this.IsExtReq(this.ClientResultPIModelObj.PI_ExtReq);
          this.piButton = "Update";

        }
        if (response[1].length > 0) {
          this.InvTabData = response[1][0];
          this.InvTabData.Client_InvoicePaid = this.InvTabData.Client_InvoicePaid != undefined ? this.InvTabData.Client_InvoicePaid.toFixed(2) : 0.00;
          this.InvTabData.Client_InvoiceTotal = this.InvTabData.Client_InvoiceTotal != undefined ? this.InvTabData.Client_InvoiceTotal.toFixed(2) : 0.00;
          this.InvTabData.Con_InvoicePaid = this.InvTabData.Con_InvoicePaid != undefined ? this.InvTabData.Con_InvoicePaid.toFixed(2) : 0.00;
          this.InvTabData.Inv_Con_Sub_Total = this.InvTabData.Inv_Con_Sub_Total != undefined ? this.InvTabData.Inv_Con_Sub_Total.toFixed(2) : 0.00;
        }
        if (response[2].length > 0) {
          this.BidTabData = response[2][0];
          this.BidTabData.BidCount = this.BidTabData.BidCount != undefined ? this.BidTabData.BidCount : 0;
          this.BidTabData.ApproveCount = this.BidTabData.ApproveCount != undefined ? this.BidTabData.ApproveCount : 0;
          this.BidTabData.PendingCount = this.BidTabData.PendingCount != undefined ? this.BidTabData.PendingCount : 0;
          this.BidTabData.RejectCount = this.BidTabData.RejectCount != undefined ? this.BidTabData.RejectCount : 0;

        }
        else {
          this.piButton = "Save";
        }

      });
  }

  getModelDatax() {
    // const workorder1 = this.xRoute.snapshot.params['workorder'];
    // let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    // const workorder = parseInt(workOrderID);

    this._bindDataModelObj.Common_pkeyID = this.workOrderID;
    this.TaskBidMasterModelObj.workOrder_ID= this.workOrderID;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.BindData = response[0][0];
        //console.log('this.BindData', this.BindData)
        this.xClientResultServices.setPathParam(this.TaskBidMasterModelObj);
        this.ModelObj = this.BindData;
        if (this.ModelObj == undefined) {
          //this.xRouter.navigate(["/workorder"]);
        } else {
          //console.log('@@@@@', this.ModelObj);
          //this.TaskBidMasterModelObj.workOrder_ID = this.ModelObj.workOrder_ID;
          this._bindDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;

          this._bindDataModelObj.IPLNO = this.ModelObj.IPLNO;
        }
      });
  }

  IsIcc(arg) {
    if (arg == true) {
      this.IsIccDate = false;
    } else {
      this.IsIccDate = true;
      this.ClientResultPIModelObj.PI_ICCDate = "";

    }
  }
  IsExtReq(arg) {
    if (arg == true) {
      this.IsExtReqDate = false;
    } else {
      this.IsExtReqDate = true;
      this.ClientResultPIModelObj.PI_ExtReqDate = "";

    }
  }
  changeDate(date)
  {
    this.calculateDays(date);
  }
  calculateDays(fdate) {
    if (fdate != undefined && fdate != "") {
      var date1 = new Date(fdate);
      var date2 = new Date();;

      var time_difference = date2.getTime() - date1.getTime();
      var days_difference = time_difference / (1000 * 60 * 60 * 24);

      this.ClientResultPIModelObj.PI_DaysInDefault = days_difference.toFixed(0).toString();
    }
    else {
      this.ClientResultPIModelObj.PI_DaysInDefault = "0";
    }

  }
  Lonetypedetails:any;
  LoanTypeList:any;

  PropertyTypeList:any;
  PropertyTypedetails:any;


  OccupancyStatusList:any;
  OccupancyStatusdetails:any;

  LoanStatusList:any;
  LoanStatusdetails:any

  PropertyAlertList:any;
  PropertyAlertdetails:any;


  PropertyStatusList:any;
  PropertyStatusdetails:any;
  GetDropDowndata() {
    this._drpdownmodelObj.Type=3;  //change sandip
    this._drpdownmodelObj.PageID=2; //change by sandip
    // debugger
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder(this._drpdownmodelObj)

      .subscribe(response => {
        // debugger;
        if (response.length != 0) {
          this.Lonetypedetails = response[0]; // for LoanTypeList
          this.LoanTypeList = response[0]; // for LoanTypeList

          this.PropertyTypedetails = response[1]; //Property Type List
          this.PropertyTypeList=response[1]  // Property Type List

          this.OccupancyStatusdetails=response[2];  //Occupancy Status List
          this.OccupancyStatusList=response[2]  // Occupancy Status List

          this.LoanStatusdetails=response[3];  //Loan Status List
          this.LoanStatusList=response[3]  // Loan Status List

          this.PropertyAlertdetails=response[4]  //Property Alert List
          this.PropertyAlertList=response[4]  // Property Alert List

          this.PropertyStatusdetails=response[5];  // Property Status List
          this.PropertyStatusList=response[5]  // Property Status List
        }

      });
  }



  ListFilter(value,filterType){
    // debugger;
    if(filterType=="LoanType")
    {
      if (value!='') {
        var filteredcustomer = this.LoanTypeList.filter(function (el) {
          return el.Loan_Type != null;
        });
        this.Lonetypedetails = filteredcustomer.filter((s) => s.Loan_Type.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
     else{
      this.Lonetypedetails = this.LoanTypeList.slice();
     }
    }
    else if(filterType=="PropertyType"){
      if (value!='') {
        var filteredcustomer = this.PropertyTypeList.filter(function (el) {
          return el.PT_Name != null;
        });
        this.PropertyTypedetails = filteredcustomer.filter((s) => s.PT_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
      else{
      this.PropertyTypedetails = this.PropertyTypeList.slice();
      }
    }
    else if(filterType=="OccupanctStatus"){
      if (value!='') {
        var filteredcustomer = this.OccupancyStatusList.filter(function (el) {
          return el.OS_Name != null;
        });
        this.OccupancyStatusdetails = filteredcustomer.filter((s) => s.OS_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
      else{
      this.OccupancyStatusdetails = this.OccupancyStatusList.slice();
      }
    }
    else if(filterType=="LoanStatus"){
      if (value!='') {
        var filteredcustomer = this.LoanStatusList.filter(function (el) {
          return el.LS_Name != null;
        });
        this.LoanStatusdetails = filteredcustomer.filter((s) => s.LS_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
     else{
      this.LoanStatusdetails = this.LoanStatusList.slice();
     }
    }
    else if(filterType=="PropertyStatus"){
      if (value!='') {
        var filteredcustomer = this.PropertyStatusList.filter(function (el) {
          return el.PS_Name != null;
        });
        this.PropertyStatusdetails = filteredcustomer.filter((s) => s.PS_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
      else{
      this.PropertyStatusdetails = this.PropertyStatusList.slice();
      }
    }
    else if(filterType=="PropertyAlert"){
      if (value!='') {
        var filteredcustomer = this.PropertyAlertList.filter(function (el) {
          return el.PA_Name != null;
        });
        this.PropertyAlertdetails = filteredcustomer.filter((s) => s.PA_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
      else{
      this.PropertyAlertdetails = this.PropertyAlertList.slice();
      }
    }
  }

  OpenModal(content) {
    this.xModalService
      .open(content, { windowClass: "smModal" })
      .result.then(result => { }, reason => { });
  }

  processImage(imageInput: any) {
    if (imageInput.files.length == 1) {
      this.isLoading = true;
      this.button = "Processing";
      const getnamefile = imageInput.files[0].name;
      this.ClientResultPIModelObj.CRPI_Front_Of_HouseImageName=getnamefile;
      const extsn = getnamefile.split(".").pop();
      if (extsn != "xlsx") {
        this._bindDataModelObj.documentx = imageInput.files[0];
        this._bindDataModelObj.Client_Result_Photo_StatusType = 99;
        this._bindDataModelObj.Common_pkeyID = this.workOrderID;
        this._bindDataModelObj.Type = 1;

        this.DocumentCall();
      }
    }
    else {
      alert('Please Select Image First');
    }
  }
img
  DocumentCall() {
    this.xClientResultPIServices
      .CommonPhotosUpdate(this._bindDataModelObj)
      .then(res => {
        res.subscribe(response => {
          // console.log('img uri',response)
          this.xModalService.dismissAll();
          this.MessageFlag = "Image Saved...!";
          this.commonMessage();
          this.isLoading = false;
          this.button = "Save";
          this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath=response[0].Client_Result_Photo_FilePath
          this.img=this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath;
          //this.GetImageWhenUpdateMeta();
        });
      })
  }

    //get refresh data
    GetImageWhenUpdateMeta() {
      this.TaskBidMasterModelObj.workOrder_ID =this.workOrderID; //this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID;
      this.xClientResultServices
        .WorkorderViewClient(this.TaskBidMasterModelObj)
        .subscribe(response => {
          this.BindData = response[0][0];
          this._bindDataModelObj.Client_Result_Photo_FilePath = this.BindData.Client_Result_Photo_FilePath;
          this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath=this.BindData.Client_Result_Photo_FilePath;
          this.xClientResultServices.setPathParam(this.BindData);
          this.getModelDatax();
        });
    }
  // common message modal popup
  commonMessage() {
    const modalRef = this.xModalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = "OK";
    modalRef.result.then(result => {
      this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath=this.img;
      //this.GetImageWhenUpdateMeta();
    }, reason => {
      //this.GetImageWhenUpdateMeta();
      this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath=this.img;
    });
  }
}
