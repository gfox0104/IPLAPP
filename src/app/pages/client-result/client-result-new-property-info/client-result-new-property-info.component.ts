import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { IplAppModalContent } from 'src/app/components';
import { WorkOrderDrodownServices } from 'src/app/services/util/dropdown.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { DropdownModel } from '../../models/dropdown-model';
import { ClientResultPIModel, ClientResultPSModel, ClientResultPTModel,ClientResultPLSModel,ClientResultPSDModel } from '../client-result-property-info/client-result-property-info-model';
import { ClientResultPIServices } from '../client-result-property-info/client-result-property-info.service';
import { BindDataModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';


@Component({
  selector: 'app-client-result-new-property-info',
  templateUrl: './client-result-new-property-info.component.html',
  styleUrls: ['./client-result-new-property-info.component.scss']
})
export class ClientResultNewPropertyInfoComponent implements OnInit {


  public defaultItem: { Loan_Type: string, Loan_pkeyId: number } = { Loan_Type: 'Select', Loan_pkeyId: 0 };
  public defaultItem1:{ LS_Name: string, LS_PkeyID: number } = { LS_Name: 'Select', LS_PkeyID: 0 };
  public defaultItem3:{ PT_Name: string, PT_PkeyID: number } = { PT_Name: 'Select', PT_PkeyID: 0 };
  public defaultItem4:{ OS_Name: string, OS_PkeyID: number } = { OS_Name: 'Select', OS_PkeyID: 0 };
  public defaultItem5:{ PA_Name: string, PA_PkeyID: number } = { PA_Name: 'Select', PA_PkeyID: 0 };
  public defaultItem6:{ PS_Name: string, PS_PkeyID: number } = { PS_Name: 'Select', PS_PkeyID: 0 };
  public defaultItem7:{ Lot_Pricing_Name: string, Lot_Pricing_PkeyID: number } = { Lot_Pricing_Name: 'Select', Lot_Pricing_PkeyID: 0 };
  public defaultItem8:{ LockReason_Name: string, LockReason_PkeyID: number } = { LockReason_Name: 'Select', LockReason_PkeyID: 0 };
  public defaultItem9:{ Cust_Num_Number: string, Cust_Num_pkeyId: number } = { Cust_Num_Number : 'Select', Cust_Num_pkeyId: 0 };
  public defaultItem10:{ Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name : 'Select', Client_pkeyID: 0 };

  ClientResultPIModelObj: ClientResultPIModel = new ClientResultPIModel();
  ClientResultPSModel: ClientResultPSModel = new ClientResultPSModel();
  ClientResultPTModel: ClientResultPTModel = new ClientResultPTModel();
  ClientResultPLSModel: ClientResultPLSModel = new ClientResultPLSModel();
  ClientResultPSDModel: ClientResultPSDModel = new ClientResultPSDModel();
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  _bindDataModelObj:BindDataModel=new BindDataModel();
  piButton = "Save"; // buttom loading..
  psButton = "Save"; // buttom loading..
  ptButton = "Save"; // buttom loading..
  plsButton = "Save"; // buttom loading..
  psdButton = "Save"; // buttom loading..
  button = "Save";
  isLoading = false;
  isPILoading = false; // buttom loading..
  isPSLoading = false; // buttom loading..
  isPTLoading = false; // buttom loading..
  isPLSLoading = false; // buttom loading..
  isPSDLoading = false; // buttom loading..
  MessageFlag: string;
  workOrderID = 0;

  Lonetypedetails:any;
  LoanTypeList:any;
  ClientList:any;
  CustomerList:any;

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

  LotPricingList:any;
  LotPricingdetails:any;

  LockReasonList:any;
  LockReasonDetails:any;
  IsIccDate: boolean = true;
  IsExtReqDate: boolean = true;
  PropertyLock:boolean = true;
  Winterize:boolean = true;
  InvTabData: any;
  BidTabData: any;
  dateTabhide: boolean = false;
  invTabhide: boolean = false;
  decuser:any;
  IsVisiable=false;
  constructor( private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xModalService: NgbModal,
    private xClientResultPIServices: ClientResultPIServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xClientResultServices: ClientResultServices,    private spinner: NgxSpinnerService) {

      if(localStorage.getItem('usertemp_') != null)
      {
        var encuser = JSON.parse(localStorage.getItem('usertemp_'));
        var decval  = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
        this.decuser  =JSON.parse(decval) ;

        switch (this.decuser[0].GroupRoleId) {
          case 1:
            {
              this.IsVisiable=true;
              break;
            }
            case 2:
            {
              break;
            }
            case 3:
            {
              break;
            }
            case 4:
            {
              break;
            }
            case 5:
            {
              break;
            }
          }
      } 
    this.GetDropDowndata();
   }

  ngOnInit(): void {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workorder = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workOrderID = parseInt(workorder); 
    this.GetPIDetail();
    this.GetPSDetail();
    this.GetPTDetail();
    this.GetPLSDetail();
    this.GetPSDDetail();
    this.showSpinner()
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }

  TabVal: Number = 1;
  TabClickMethod(TabNo: Number): void {

    switch (this.TabVal) {
      case 1:
        //alert('this tab '+this.TabVal);
        this.FormButton1(false); //property form
        break;

      case 2:
        this.ViolationSubmit(false);
        break;

      case 3:
        this.SecuringSubmit(false);
        break;

      case 4:
        this.SubmitWinterization(false);
        break;

      case 5:
        this.YardMaintananceSubmit(false);
        break;

      case 6:
        this.DebrisSubmit(false);
        break;

      case 7:
        this.PcrRoofData(false);
        break;

      case 8:
        this.PcrRoofData(false);
        break;

      case 9:
        this.PostUtilitiesSubmit(false);
        break;

      case 10:
        this.ApplianceSubmit(false);
        break;

      case 11:
        this.AddPCRDamage(false);
        break;

      case 12:
        this.PCRConveyancesave(false);
        break;

      default:
        break;
    }
    this.TabVal = TabNo;
  }
  PCRConveyancesave(arg0: boolean) {

  }
  AddPCRDamage(arg0: boolean) {

  }
  ApplianceSubmit(arg0: boolean) {

  }
  PostUtilitiesSubmit(arg0: boolean) {

  }
  PcrRoofData(arg0: boolean) {

  }
  DebrisSubmit(arg0: boolean) {

  }
  YardMaintananceSubmit(arg0: boolean) {

  }
  SubmitWinterization(arg0: boolean) {

  }
  SecuringSubmit(arg0: boolean) {

  }
  ViolationSubmit(arg0: boolean) {

  }
  FormButton1(arg0: boolean) {

  }
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

          this.LotPricingdetails=response[6];  // Lot Size List
          this.LotPricingList=response[6]  // Lot Size List

          this.LockReasonDetails=response[7];  // Lot Size List
          this.LockReasonList=response[7]  // Lot Size List
 
          this.ClientList = response[8]; // Client List
          // console.log('customer sandip',this.ClientList)
          this.CustomerList=response[9]; // Customer List
          
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
    else if(filterType=="LotSize"){
      if (value!='') {
        var filteredcustomer = this.LotPricingList.filter(function (el) {
          return el.Lot_Pricing_Name != null;
        });
        this.LotPricingdetails = filteredcustomer.filter((s) => s.Lot_Pricing_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
      else{
      this.LotPricingdetails = this.LotPricingList.slice();
      }
    }
    else if(filterType=="LockReason"){
      if (value!='') {
        var filteredcustomer = this.LockReasonList.filter(function (el) {
          return el.LockReason_Name != null;
        });
        this.LockReasonDetails = filteredcustomer.filter((s) => s.LockReason_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
      else{
      this.LockReasonDetails = this.LockReasonList.slice();
      }
    }
  }
  OpenModal(content) {
    this.xModalService
      .open(content, { windowClass: "smModal" })
      .result.then(result => { }, reason => { });
  }

  processImage(imageInput: any) {
    debugger
    if (imageInput.files.length == 1) {
      console.log('imageinput',imageInput)
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
     debugger;
     this._bindDataModelObj.Client_Result_Photo_FileName = null;
    this.xClientResultPIServices
    .CommonPhotosUpdate(this._bindDataModelObj)
      .then(res => {
        res.subscribe(response => {
          // console.log('img uri',response)
          this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath = response[0].Client_Result_Photo_FilePath
          this.xModalService.dismissAll();
          this.MessageFlag = "Image Saved...!";
          this.commonMessage();
          this.isLoading = false;
          this.button = "Save";
          this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath=response[0].Client_Result_Photo_FilePath
          this.img=this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath;
          // console.log('this.img',this.img)
          //this.GetImageWhenUpdateMeta();
        });
      })
  }
  commonMessage() {
    const modalRef = this.xModalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = "OK";
    modalRef.result.then(result => {
     // this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath=this.img;
      //this.GetImageWhenUpdateMeta();
    }, reason => {
      //this.GetImageWhenUpdateMeta();
     // this.ClientResultPIModelObj.CRPI_Front_Of_HouseImagePath=this.img;
    });
  }
  GetPIDetail() { 
     debugger
    this.ClientResultPIModelObj.PI_WO_ID = this.workOrderID;
    this.ClientResultPIModelObj.Type = 3;
    this.xClientResultPIServices
      .GetClientResultPropertyInfo(this.ClientResultPIModelObj)
      .subscribe(response => {  
      console.log('response',response)
        if (response[0].length != 0) { 
          this.ClientResultPIModelObj.PI_PkeyID = response[0][0].CRPI_PkeyID; 
          this.ClientResultPIModelObj.PI_WO_ID = response[0][0].CRPI_WO_ID;
          this.ClientResultPIModelObj.PI_LockCode = response[0][0].CRPI_LockCode;
          this.ClientResultPIModelObj.PI_LockBox = response[0][0].CRPI_LockBox;
          // this.ClientResultPIModelObj.PI_LotSize =parseInt(response[0][0].CRPI_LotSize);

          this.ClientResultPIModelObj.PI_LotSize = response[0][0].CRPI_LotSize;
         this.ClientResultPIModelObj.CRPI_Lot_Size_Pricing = parseInt(response[0][0].CRPI_Lot_Size_Pricing)

   
          this.ClientResultPIModelObj.PI_InitDefaultDate = response[0][0].CRPI_InitDefaultDate;
          this.ClientResultPIModelObj.PI_PtvDate = response[0][0].CRPI_PtvDate;
          this.ClientResultPIModelObj.PI_InitSecureDate = response[0][0].CRPI_InitSecureDate;
          this.ClientResultPIModelObj.PI_DidRecDate = response[0][0].CRPI_DidRecDate;

          this.ClientResultPIModelObj.PI_OrCovDate = response[0][0].CRPI_OrCovDate;
          this.ClientResultPIModelObj.PI_ExtReqDate = response[0][0].CRPI_ExtReqDate;
          this.ClientResultPIModelObj.PI_NewCovDate = response[0][0].CRPI_NewCovDate;

          this.ClientResultPIModelObj.CRPI_Loan_Status = response[0][0].CRPI_Loan_Status;
          this.ClientResultPIModelObj.CRPI_Occupanct_Status = response[0][0].CRPI_Occupanct_Status;
          this.ClientResultPIModelObj.CRPI_Property_Locked = response[0][0].CRPI_Property_Locked;
          this.ClientResultPIModelObj.CRPI_Property_Alert = response[0][0].CRPI_Property_Alert; 
          this.ClientResultPIModelObj.CRPI_Property_Status = response[0][0].CRPI_Property_Status;


          this.ClientResultPIModelObj.PI_Gason = response[0][0].CRPI_Gason;
          this.ClientResultPIModelObj.PI_Wateron = response[0][0].CRPI_Wateron;
          this.ClientResultPIModelObj.PI_Elcton = response[0][0].CRPI_Elcton;
          this.ClientResultPIModelObj.PI_GasLR = response[0][0].CRPI_GasLR;
          this.ClientResultPIModelObj.PI_GasTS = response[0][0].CRPI_GasTS;
          this.ClientResultPIModelObj.PI_WaterLR = response[0][0].CRPI_WaterLR;
          this.ClientResultPIModelObj.PI_WaterTS = response[0][0].CRPI_WaterTS;
          this.ClientResultPIModelObj.PI_ElctLR = response[0][0].CRPI_ElctLR;
          this.ClientResultPIModelObj.PI_ElctTS = response[0][0].CRPI_ElctTS;

            // debugger;
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
          
          this.ClientResultPIModelObj.PI_ExtReq =response[0][0].CRPI_ExtReq

          this.calculateDays(this.ClientResultPIModelObj.PI_InitDefaultDate);
          this.IsExtReq(this.ClientResultPIModelObj.PI_ExtReq);

          this.ClientResultPIModelObj.PI_VPSCode =response[0][0].CRPI_VPSCode
          this.ClientResultPIModelObj.PI_ConveyanceCondition =response[0][0].CRPI_ConveyanceCondition
          this.ClientResultPIModelObj.PI_Winterized =response[0][0].CRPI_Winterized
          this.ClientResultPIModelObj.PI_WinterizedDate =response[0][0].CRPI_WinterizedDate
          this.ClientResultPIModelObj.PI_LockReason =response[0][0].CRPI_PropertyLockReason
          this.ClientResultPIModelObj.CRPI_OccupancyDate =response[0][0].CRPI_OccupancyDate


          this.ClientResultPIModelObj.CRPI_Stop_Work_Date =response[0][0].CRPI_Stop_Work_Date
          this.ClientResultPIModelObj.CRPI_Stop_Work_Reason =response[0][0].CRPI_Stop_Work_Reason
          this.ClientResultPIModelObj.CRPI_DaysInDefault =response[0][0].CRPI_DaysInDefault
          this.ClientResultPIModelObj.CRPI_VPRExpirationDate =response[0][0].CRPI_VPRExpirationDate
          this.ClientResultPIModelObj.CRPI_VPRFiled =response[0][0].CRPI_VPRFiled
          this.ClientResultPIModelObj.CRPI_ConfirmedSaleDate =response[0][0].CRPI_ConfirmedSaleDate
          this.ClientResultPIModelObj.CRPI_REODate =response[0][0].CRPI_REODate
          this.ClientResultPIModelObj.CRPI_FirstInspectionDate =response[0][0].CRPI_FirstInspectionDate
          this.ClientResultPIModelObj.CRPI_LockChangeDate =response[0][0].CRPI_LockChangeDate
          this.ClientResultPIModelObj.CRPI_LastGrasscutDate =response[0][0].CRPI_LastGrasscutDate
          this.ClientResultPIModelObj.CRPI_ForeclosureSaleDate =response[0][0].CRPI_ForeclosureSaleDate
          this.ClientResultPIModelObj.CRPI_DeedRecordedDate =response[0][0].CRPI_DeedRecordedDate
          this.ClientResultPIModelObj.CRPI_RoutingDate =response[0][0].CRPI_RoutingDate
          this.ClientResultPIModelObj.CRPI_ICC =response[0][0].CRPI_ICC
          this.ClientResultPIModelObj.CRPI_ICCDate =response[0][0].CRPI_ICCDate
          this.ClientResultPIModelObj.CRPI_DateLoanFellOutOfICC =response[0][0].CRPI_DateLoanFellOutOfICC
          this.ClientResultPIModelObj.CRPI_LatestICCDate =response[0][0].CRPI_LatestICCDate
          this.ClientResultPIModelObj.CRPI_ConveyanceDueDate =response[0][0].CRPI_ConveyanceDueDate
          this.ClientResultPIModelObj.CRPI_ExtensionApprovalDate =response[0][0].CRPI_ExtensionApprovalDate
          this.ClientResultPIModelObj.CRPI_NewConveyanceDueDate =response[0][0].CRPI_NewConveyanceDueDate
          this.ClientResultPIModelObj.CRPI_OrgEstimatedClosingDate =response[0][0].CRPI_OrgEstimatedClosingDate
           
          this.piButton = "Update"; 
        }
        // debugger;
        if (response[2].length > 0) {
          this.InvTabData = response[2][0]; 
          this.InvTabData.Client_InvoicePaid = this.InvTabData.Client_InvoicePaid != undefined ? this.InvTabData.Client_InvoicePaid.toFixed(2) : 0.00;
          this.InvTabData.Client_InvoiceTotal = this.InvTabData.Client_InvoiceTotal != undefined ? this.InvTabData.Client_InvoiceTotal.toFixed(2) : 0.00;
          this.InvTabData.Con_InvoicePaid = this.InvTabData.Con_InvoicePaid != undefined ? this.InvTabData.Con_InvoicePaid.toFixed(2) : 0.00;
          this.InvTabData.Inv_Con_Sub_Total = this.InvTabData.Inv_Con_Sub_Total != undefined ? this.InvTabData.Inv_Con_Sub_Total.toFixed(2) : 0.00;
        }
        if (response[3].length > 0) {
          this.BidTabData = response[3][0];
          this.BidTabData.BidCount = this.BidTabData.BidCount != undefined ? this.BidTabData.BidCount : 0;
          this.BidTabData.ApproveCount = this.BidTabData.ApproveCount != undefined ? this.BidTabData.ApproveCount : 0;
          this.BidTabData.PendingCount = this.BidTabData.PendingCount != undefined ? this.BidTabData.PendingCount : 0;
          this.BidTabData.RejectCount = this.BidTabData.RejectCount != undefined ? this.BidTabData.RejectCount : 0;

        }   
        else 
        {
          this.piButton = "Save";
        } 
      });
  }
  GetPSDetail() { 
    // debugger

  
    this.ClientResultPSModel.PS_WO_ID = this.workOrderID;
    this.ClientResultPSModel.Type = 3;
    this.xClientResultPIServices
      .GetClientResultSettingsInfo(this.ClientResultPSModel)
      .subscribe(response => {   
        // debugger

        // console.log('response',response)
        if (response.length != 0)
        {

        if (response[0].length != 0) {  
          this.ClientResultPSModel.CRPS_Property_Type = response[0][0].CRPS_Property_Type;
          this.ClientResultPSModel.CRPS_Client =response[0][0].CRPS_Client
          this.ClientResultPSModel.CRPS_Customer =response[0][0].CRPS_Customer
          this.ClientResultPSModel.CRPS_Property_Id =response[0][0].CRPS_Property_Id
          this.ClientResultPSModel.CRPS_Customer =response[0][0].CRPS_Customer
          this.ClientResultPSModel.CRPS_Client =response[0][0].CRPS_Client
          this.ClientResultPSModel.CRPS_HOA_Name =response[0][0].CRPS_HOA_Name
          this.ClientResultPSModel.CRPS_HOA_Identifier =response[0][0].CRPS_HOA_Identifier
          this.ClientResultPSModel.CRPS_HOA_PhoneNo =response[0][0].CRPS_HOA_PhoneNo
          this.ClientResultPSModel.CRPS_Tax_Parcel_Number =response[0][0].CRPS_Tax_Parcel_Number
          this.ClientResultPSModel.CRPS_Vacant_Land_Identifier =response[0][0].CRPS_Vacant_Land_Identifier
          this.ClientResultPSModel.CRPS_Recurring_Grass_Cuts =response[0][0].CRPS_Recurring_Grass_Cuts
          this.ClientResultPSModel.CRPS_Pool_On_Site =response[0][0].CRPS_Pool_On_Site
          this.ClientResultPSModel.CRPS_Sump_Pump_On_Site =response[0][0].CRPS_Sump_Pump_On_Site
          this.ClientResultPSModel.CRPS_Sump_Pump_Operational =response[0][0].CRPS_Sump_Pump_Operational
          this.ClientResultPSModel.CRPS_AssetID =response[0][0].CRPS_AssetID
          this.ClientResultPSModel.CRPS_Inspection_Required =response[0][0].CRPS_Inspection_Required
          this.ClientResultPSModel.CRPS_VPR_Required =response[0][0].CRPS_VPR_Required
          this.ClientResultPSModel.CRPS_Environmental_Flag =response[0][0].CRPS_Environmental_Flag
          this.ClientResultPSModel.CRPS_PkeyID = response[0][0].CRPS_PkeyID; 

          if(response[0][0].CRPS_PkeyID > 0) 
          this.psButton = "Update" 
        else
          this.psButton = "Save" 

        }
        else
        {
          /// No data for the first time
          this.ClientResultPSModel.CRPS_PkeyID = 0; 
          this.psButton = "Save"
        }  
      
        
      }
      });
  }
  GetPTDetail() { 
    // debugger
    this.ClientResultPTModel.CRPT_WO_ID = this.workOrderID;
    this.ClientResultPTModel.Type = 3;
    this.xClientResultPIServices
      .GetClientResultTeamInfo(this.ClientResultPTModel)
      .subscribe(response => {   
        // console.log('response',response)
        if (response[0].length != 0) {   
          this.ClientResultPTModel.CRPT_PkeyID = response[0][0].CRPT_PkeyID; 
          this.ClientResultPTModel.CRPT_InspectionVendor = response[0][0].CRPT_InspectionVendor; 
          this.ClientResultPTModel.CRPT_PMVendor = response[0][0].CRPT_PMVendor; 
          this.ClientResultPTModel.CRPT_PrimaryVendor = response[0][0].CRPT_PrimaryVendor; 
          this.ClientResultPTModel.CRPT_GeneralContractor = response[0][0].CRPT_GeneralContractor; 
          this.ClientResultPTModel.CRPT_SalesSpecialist = response[0][0].CRPT_SalesSpecialist; 
          this.ClientResultPTModel.CRPT_Investor = response[0][0].CRPT_Investor; 
          this.ClientResultPTModel.CRPT_InvestorCaseNumber = response[0][0].CRPT_InvestorCaseNumber; 
          this.ClientResultPTModel.CRPT_ServicerFamily = response[0][0].CRPT_ServicerFamily; 
          this.ClientResultPTModel.CRPT_ServicerLoan = response[0][0].CRPT_ServicerLoan;  

          if(response[0][0].CRPT_PkeyID > 0) 
          this.ptButton = "Update" 
        else
          this.ptButton = "Save" 
        } 
        
        else
        {
          /// No data for the first time
          this.ClientResultPTModel.CRPT_PkeyID= 0; 
          this.ptButton = "Save" 
        }  
       
      });
  }
  GetPLSDetail() { 
    // debugger
    this.ClientResultPLSModel.CRPLS_WO_ID = this.workOrderID;
    this.ClientResultPLSModel.Type = 3;
    this.xClientResultPIServices
      .GetClientResultLoanSettingsInfo(this.ClientResultPLSModel)
      .subscribe(response => {   
        // console.log('response loan setting',response)
        if (response[0].length != 0) {   
          this.ClientResultPLSModel.CRPLS_PkeyID = response[0][0].CRPLS_PkeyID; 
          this.ClientResultPLSModel.CRPLS_BorrowerEmail = response[0][0].CRPLS_BorrowerEmail; 
          this.ClientResultPLSModel.CRPLS_BorrowerPhone = response[0][0].CRPLS_BorrowerPhone; 
          this.ClientResultPLSModel.CRPLS_BorrowerName = response[0][0].CRPLS_BorrowerName; 
          this.ClientResultPLSModel.CRPLS_LoanNumber = response[0][0].CRPLS_LoanNumber; 
          this.ClientResultPLSModel.CRPLS_LoanStatus = response[0][0].CRPLS_LoanStatus; 
          this.ClientResultPLSModel.CRPLS_LoanType = response[0][0].CRPLS_LoanType; 
          this.ClientResultPLSModel.CRPLS_PropertyMortgagee = response[0][0].CRPLS_PropertyMortgagee; 
          this.ClientResultPLSModel.CRPLS_UnpaidPrincipalBalance = response[0][0].CRPLS_UnpaidPrincipalBalance; 
          
          if(response[0][0].CRPLS_PkeyID > 0) 
          this.plsButton = "Update" 
        else
          this.plsButton = "Save" 
        }  
        else
        {
          /// No data for the first time
          this.ClientResultPLSModel.CRPLS_PkeyID = 0; 
          this.plsButton = "Save" 
        } 
        
      });
  }
  GetPSDDetail() { 
    this.ClientResultPSDModel.CRPSD_WO_ID = this.workOrderID;
    this.ClientResultPSDModel.Type = 3;
    this.xClientResultPIServices
      .GetClientResultServiceDatesInfo(this.ClientResultPSDModel)
      .subscribe(response => {   
        // console.log('response',response)
        if (response[0].length != 0) {  
          this.ClientResultPSDModel.CRPSD_PkeyID = response[0][0].CRPSD_PkeyID; 
          this.ClientResultPSDModel.CRPSD_BoardingDate = response[0][0].CRPSD_BoardingDate; 
          this.ClientResultPSDModel.CRPSD_CleanOutComplete = response[0][0].CRPSD_CleanOutComplete; 
          this.ClientResultPSDModel.CRPSD_InitialInspectionComplete = response[0][0].CRPSD_InitialInspectionComplete; 
          this.ClientResultPSDModel.CRPSD_InspectionCycle = response[0][0].CRPSD_InspectionCycle; 
          this.ClientResultPSDModel.CRPSD_LastInspectedDate = response[0][0].CRPSD_LastInspectedDate; 
          this.ClientResultPSDModel.CRPSD_LastInteriorCleanDate = response[0][0].CRPSD_LastInteriorCleanDate; 
          
          if(response[0][0].CRPSD_PkeyID > 0) 
          this.psdButton = "Update" 
        else
          this.psdButton = "Save"
        }  

        else
        {
          /// No data for the first time
          this.ClientResultPSDModel.CRPSD_PkeyID  = 0; 
          this.psdButton = "Save"
        } 
         
      });
  }
  IsExtReq(arg) { 
    if (arg == true) {
      this.IsExtReqDate = false;
    } else {
      this.IsExtReqDate = true;
      this.ClientResultPIModelObj.PI_ExtReqDate = "";

    }
  }
  // PropertyLocked(arg) { 
  //   if (arg == true) {
  //     this.PropertyLock = false;
  //   } else {
  //     this.PropertyLock = true;
  //     this.ClientResultPIModelObj.PI_LockReason = "";

  //   }
  
  // }
 
  // WinterizedYN(arg) { 
  //   if (arg == true) {
  //     this.Winterize = false;
  //   } else {
  //     this.Winterize = true;
  //     this.ClientResultPIModelObj.PI_WinterizedDate  = "";

  //   }
  // }
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

      // this.ClientResultPIModelObj.PI_DaysInDefault = days_difference.toFixed(0).toString();
    }
    else {
      // this.ClientResultPIModelObj.PI_DaysInDefault = "0";
    }

  }
  SavePIForm() {
     debugger
    this.isPILoading = true;
    this.piButton = "Processing";
    // debugger;
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
          this.ClientResultPIModelObj.PI_PkeyID = response[0].CRPI_PkeyID;
          this.MessageFlag = this.ClientResultPIModelObj.PI_PkeyID > 0 ? "Property Info Saved...!" : "Property Info Updated...!";
          this.commonMessage();
          this.GetPIDetail();

        }
      });
  }
  SavePSForm() {
    // debugger
    this.isPSLoading = true;
    this.psButton = "Processing";
     this.ClientResultPSModel.PS_WO_ID = this.workOrderID;
    this.ClientResultPSModel.PS_IsActive = true; 
    this.ClientResultPSModel.Type = this.ClientResultPSModel.CRPS_PkeyID > 0 ? 2 : 1;
    this.xClientResultPIServices
      .AddClientResultPropertySettingPost(this.ClientResultPSModel)
      .subscribe(response => {
        this.isPSLoading = false;
        this.psButton = "Save";
        if (response.length > 0) {   
          this.MessageFlag = this.ClientResultPSModel.CRPS_PkeyID == 0 ? "Property Settings Saved...!" : "Property Settings Updated...!";
          this.commonMessage();
          this.GetPSDetail(); 
        }
      });
  }
  SavePTForm() {
    this.isPTLoading = true;
    this.ptButton = "Processing";
     this.ClientResultPTModel.CRPT_WO_ID = this.workOrderID;
    this.ClientResultPTModel.CRPT_IsActive = true; 
    this.ClientResultPTModel.Type = this.ClientResultPTModel.CRPT_PkeyID > 0 ? 2 : 1;
    this.xClientResultPIServices
      .AddClientResultPropertyTeamPost(this.ClientResultPTModel)
      .subscribe(response => {
        this.isPTLoading = false;
        this.ptButton = "Save";
        if (response.length > 0) {   
          this.MessageFlag = this.ClientResultPTModel.CRPT_PkeyID == 0 ? "Property Team Saved...!" : "Property Team Updated...!";
          this.commonMessage();
          this.GetPTDetail(); 
        }
      });
  }
  SavePLSForm() {
    this.isPTLoading = true;
    this.ptButton = "Processing";
     this.ClientResultPLSModel.CRPLS_WO_ID = this.workOrderID;
    this.ClientResultPLSModel.CRPLS_IsActive = true; 
    this.ClientResultPLSModel.Type = this.ClientResultPLSModel.CRPLS_PkeyID > 0 ? 2 : 1;
    this.xClientResultPIServices
      .AddClientResultPropertyLoanSettingsPost(this.ClientResultPLSModel)
      .subscribe(response => {
        this.isPTLoading = false;
        this.plsButton = "Save";
        if (response.length > 0) {   
          this.MessageFlag = this.ClientResultPLSModel.CRPLS_PkeyID == 0 ? "Property Loan Settings Saved...!" : "Property Loan Settings Updated...!";
          this.commonMessage();
          this.GetPLSDetail(); 
        }
      });
  }
  SavePSDForm() {
    // debugger
    this.isPSDLoading = true;
    this.psdButton = "Processing";
     this.ClientResultPSDModel.CRPSD_WO_ID = this.workOrderID;
    this.ClientResultPSDModel.CRPSD_IsActive = true; 
    this.ClientResultPSDModel.Type = this.ClientResultPSDModel.CRPSD_PkeyID > 0 ? 2 : 1;
    this.xClientResultPIServices
      .AddClientResultPropertyServiceDatesPost(this.ClientResultPSDModel)
      .subscribe(response => {
        this.isPSDLoading = false;
        this.psdButton = "Save";
        if (response.length > 0) {   
          this.MessageFlag = this.ClientResultPSDModel.CRPSD_PkeyID == 0 ? "Property Service dates Saved...!" : "Property Service dates Updated...!";
          this.commonMessage();
          this.GetPSDDetail(); 
        }
      });
  }
  hideDatetab() {
    this.dateTabhide = !this.dateTabhide;
  }
  hideInvtab() {
    this.invTabhide = !this.invTabhide;
  }
}
