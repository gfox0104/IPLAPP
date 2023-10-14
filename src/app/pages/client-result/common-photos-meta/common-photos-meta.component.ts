import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from 'rxjs';

import {
  BindDataModel,
  TaskBidMasterModel,
} from '../client-result/client-result-model';
import { ClientResultPhotoModel } from "../client-result-photo/client-result-photo-model";
import { ClientResultServices } from "../client-result/client-result.service";
import { ClientResultOldPhotoServices } from "../client-result-photo/client-result-photo-old.service";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { IplAppModalContent } from '../../../components';
import { ClientService } from '../client.service';
import { CommonMenuServices } from "src/app/services/util/user-access/user-access.service";
import { OpenWeatherMapRequestHandler } from "../../weather-dashboard/weather-shared/open.weather.map.request.handler";
import { OpenWeatherMapInterface } from "../../weather-dashboard/weather-shared/open.weather.map.interface";
import { SaveWorkOrderServices } from "../../work-order/new-work-order/new-work-order.service";
import { WorkOrderModel } from "../../work-order/new-work-order/new-work-order-model";
import { FLAGS } from "html2canvas/dist/types/dom/element-container";
import { DropdownModel } from "../../models/dropdown-model";
import { WorkOrderDrodownServices } from "src/app/services/util/dropdown.service";


@Component({
  selector: "app-photosMeta-client-result",
  templateUrl: "./common-photos-meta.component.html",

})

export class CommonPhotosMetaComponent implements OnInit {
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  HeaderCoditional: boolean = false;
  button = "Save";
  isLoading = false;
  MessageFlag: string;
  tabhide: boolean = false;
  BindDataModelObj: BindDataModel = new BindDataModel();
  ClientResultPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  WorkOrderModelObj: WorkOrderModel = new WorkOrderModel();
  statusSbuscription: Subscription;
  clientdetails = true;
  ModelObj: any;
  BindData: any;
  statusdetails: any;
  hideClient = true;
  IsCategoryDropdown=false;
  CategoryListData: any;
  CategoryList: any;
  public openWeatherMap: Observable<OpenWeatherMapInterface>;
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  constructor(
    private xRouter: Router,
    private modalService: NgbModal,
    private xClientResultServices: ClientResultServices,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private clientService: ClientService,
    private commonMenuService: CommonMenuServices,
    private openWeatherMapRequestHandler: OpenWeatherMapRequestHandler,
    private xSaveWorkOrderServices: SaveWorkOrderServices,
    private xWorkOrderDrodownServices:WorkOrderDrodownServices
  ) {
    this.GetDropDowndata();
    this.getModelDatax();
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    if (this.xRouter.url === '/client/clientresultinstruction/' + workorder1 || this.xRouter.url === '/client/clientresultfield/' + workorder1) {
      this.HeaderCoditional = true;
    }
    if (this.xRouter.url === '/client/clientresultfield/' + workorder1) {
      this.clientdetails = false;
      this.HeaderCoditional = true;
    }

    this.tabhide = commonMenuService.userRestrict('office_result')['tabhide'];
  }

  ngOnInit() {
    this.statusSbuscription = this.clientService.statusDataObserble.subscribe(value => {
      if (value != null) {
        this.BindDataModelObj.Status_Name = value['Status_Name'];
        this.BindDataModelObj.SentToClient_date = value['SentToClient_date'];
        this.BindDataModelObj.Received_Date = value['Received_Date'];
        this.BindDataModelObj.OfficeApproved_date = value['OfficeApproved_date'];
        this.BindDataModelObj.Field_complete_date = value['Field_complete_date'];
        this.BindDataModelObj.Complete_Date = value['Complete_Date'];
        this.BindDataModelObj.Cancel_Date = value['Cancel_Date'];
      }

    });
  }

  getModelDatax() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    const workorder = parseInt(workOrderID);

    this.TaskBidMasterModelObj.workOrder_ID = workorder;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.BindData = response[0][0];
        //console.log('this.BindData', this.BindData)
        this.xClientResultServices.setPathParam(this.BindData);
        this.ModelObj = this.BindData;
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(["/workorder"]);
        } else {
          //console.log('@@@@@', this.ModelObj);
          this.TaskBidMasterModelObj.workOrder_ID = this.ModelObj.workOrder_ID;
          this.BindDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;
          this.BindDataModelObj.address1 = this.ModelObj.address1;
          this.BindDataModelObj.Cont_Name = this.ModelObj.Cont_Name;
          this.BindDataModelObj.Cordinator_Name = this.ModelObj.Cordinator_Name;
          this.BindDataModelObj.Lock_Code = this.ModelObj.Lock_Code;
          this.BindDataModelObj.startDate = this.ModelObj.startDate;
          this.BindDataModelObj.Work_Type_Name = this.ModelObj.Work_Type_Name;
          this.BindDataModelObj.Category = this.ModelObj.Category;
          this.BindDataModelObj.Lock_Location = this.ModelObj.Lock_Location;
          this.BindDataModelObj.Cust_Num_Number = this.ModelObj.Cust_Num_Number;
          this.BindDataModelObj.Key_Code = this.ModelObj.Key_Code;
          this.BindDataModelObj.Client_Company_Name = this.ModelObj.Client_Company_Name;
          this.BindDataModelObj.Gate_Code = this.ModelObj.Gate_Code;
          this.BindDataModelObj.BATF = this.ModelObj.BATF;
          this.BindDataModelObj.Lotsize = this.ModelObj.Lotsize;
          this.BindDataModelObj.rus_Name = this.ModelObj.rus_Name;
          this.BindDataModelObj.ClientMetaData = this.ModelObj.ClientMetaData;
          this.BindDataModelObj.Loan_Type = this.ModelObj.Loan_Type;
          this.BindDataModelObj.Loan_Number = this.ModelObj.Loan_Number;
          this.BindDataModelObj.Broker_Info = this.ModelObj.Broker_Info;
          this.BindDataModelObj.Received_Date = this.ModelObj.Received_Date;
          this.BindDataModelObj.clientDueDate = this.ModelObj.clientDueDate;
          this.BindDataModelObj.Complete_Date = this.ModelObj.Complete_Date;
          this.BindDataModelObj.Cancel_Date = this.ModelObj.Cancel_Date;
          this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
          this.BindDataModelObj.dueDate = this.ModelObj.dueDate;
          this.BindDataModelObj.assigned_date = this.ModelObj.assigned_date;
          this.BindDataModelObj.EstimatedDate = this.ModelObj.EstimatedDate;
          this.BindDataModelObj.WT_WorkType = this.ModelObj.WT_WorkType;
          this.BindDataModelObj.Back_Chk_ProviderName = this.ModelObj.Back_Chk_ProviderName;
          this.BindDataModelObj.Client_Result_Photo_FileName = this.ModelObj.Client_Result_Photo_FileName;
          this.BindDataModelObj.GPSLatitude = this.ModelObj.gpsLatitude;
          this.BindDataModelObj.GPSLongitude = this.ModelObj.gpsLongitude;
          if (this.ModelObj.Client_Result_Photo_FilePath != null) {
            this.BindDataModelObj.Client_Result_Photo_FilePath = this.ModelObj.Client_Result_Photo_FilePath;
          }

          // asyc photos // get single photos
          this.ClientResultPhotoModelObj.IPLNO = this.ModelObj.IPLNO;
          this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID = this.ModelObj.workOrder_ID;
          this.ClientResultPhotoModelObj.Type = 1;
          this.ClientResultPhotoModelObj.Client_Result_Photo_ID = 0;
          this.BindDataModelObj.fulladdress = this.ModelObj.fulladdress;
          this.BindDataModelObj.Processor_Name = this.ModelObj.Processor_Name;
          this.BindDataModelObj.SentToClient_date = this.ModelObj.SentToClient_date;
          this.BindDataModelObj.OfficeApproved_date = this.ModelObj.OfficeApproved_date;
          this.BindDataModelObj.Field_complete_date = this.ModelObj.Field_complete_date;
          this.BindDataModelObj.Mortgagor = this.ModelObj.Mortgagor;
          this.BindDataModelObj.city = this.ModelObj.city;
          this.BindDataModelObj.zip = this.ModelObj.zip;


          this.statusdetails = this.xClientResultServices.getPathParam();
          if (this.statusdetails != undefined) {
            this.BindDataModelObj.Status_Name = this.statusdetails.Status_Name;
          } else {
            this.BindDataModelObj.Status_Name = this.ModelObj.Status_Name;
          }
          //debugger


        }
      });
  }

  processImage(imageInput: any) {
    if (imageInput.files.length == 1) {
      this.isLoading = true;
      this.button = "Processing";
      const getnamefile = imageInput.files[0].name;
      const extsn = getnamefile.split(".").pop();
      if (extsn != "xlsx") {
        this.BindDataModelObj.documentx = imageInput.files[0];
        this.BindDataModelObj.Client_Result_Photo_StatusType = 99;
        this.BindDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;
        this.BindDataModelObj.Type = 1;

        this.DocumentCall();
      }
    }
    else {
      alert('Please Select Image First');
    }
  }

  // enteract between save btn and document upload
  DocumentCall() {
    this.xClientResultOldPhotoServices
      .CommonPhotosUpdate(this.BindDataModelObj)
      .then(res => {
        res.subscribe(response => {
          // debugger
          this.modalService.dismissAll();
          this.MessageFlag = "Image Saved...!";
          this.commonMessage();
          this.isLoading = false;
          this.button = "Save";

          this.GetImageWhenUpdateMeta();
        });
      })
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Continue...';
    modalRef.result.then(result => {
      this.GetImageWhenUpdateMeta();
    }, reason => {
      this.GetImageWhenUpdateMeta();
    });
  }

  OpenModal(content) {
    this.modalService
      .open(content, { windowClass: "smModal" })
      .result.then(result => { }, reason => { });
  }

  //get refresh data
  GetImageWhenUpdateMeta() {
    this.TaskBidMasterModelObj.workOrder_ID = this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        //debugger
        this.BindData = response[0][0];
        this.BindDataModelObj.Client_Result_Photo_FilePath = this.BindData.Client_Result_Photo_FilePath;
        this.xClientResultServices.setPathParam(this.BindData);
        this.getModelDatax();
      });
  }

  ngOnDestroy() {
    this.statusSbuscription.unsubscribe();
  }

  hideDetails(){
    this.hideClient = !this.hideClient
  }
  Openweather(contentpop) {
    //debugger
    if (this.ModelObj.zip != null) {
      if (this.openWeatherMap == undefined) {
        this.openWeatherMap = this.openWeatherMapRequestHandler.getOpenWeatherMapFiveDayForecast(this.ModelObj.zip);
        //console.log('check weather', this.openWeatherMap)
      }
      this.modalService.open(
        contentpop,
        { windowClass: "xlModal" }
      ).result.then(result => { }, reason => { });
    }
    else{
      this.MessageFlag = "Please Select City...!";
      this.commonMessage();
    }

  }
  CloseModel(){
    Observable.of('');
    this.modalService.dismissAll();
  }
  ShowCategoryDropdown(){
    this.IsCategoryDropdown=this.IsCategoryDropdown?false:true;
  }
  GetDropDowndata() {
    this._drpdownmodelObj.PageID=3;
    this._drpdownmodelObj.Type=3;
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder(this._drpdownmodelObj)
      .subscribe(response => {
        // console.log('response',response);
        if (response.length != 0) {
          this.CategoryList = response[0];
          this.CategoryListData = response[0];
        }
      });
  }
  FilterCategoryDropdown(value) {
    var filteredcustomer = this.CategoryListData.filter(function (el) {
      return el.Cat_Name != null;
    });
   this.CategoryList = filteredcustomer.filter((s) => s.Cat_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  ChangeCategory(event){
    this.WorkOrderModelObj.workOrder_ID=this.ModelObj.workOrder_ID;
    this.WorkOrderModelObj.Category=this.BindDataModelObj.Category
    this.WorkOrderModelObj.Type=10
    this.xSaveWorkOrderServices
    .WorkorderPostData(this.WorkOrderModelObj)
    .subscribe(async response => {
      this.IsCategoryDropdown=false;
      this.getModelDatax();
    });

  }

}
