import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ClientPhotoRef, ClientResultPhotoModel } from '../client-result-photo/client-result-photo-model';
import { ClientResultOldPhotoServices } from '../client-result-photo/client-result-photo-old.service';
import { BindDataModel, TaskBidMasterModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-client-result-photo-history',
  templateUrl: './client-result-photo-history.component.html',
  styleUrls: ['./client-result-photo-history.component.scss']
})
export class ClientResultPhotoHistoryComponent implements OnInit {

  workOrderID = 0;
  ClientResultPhotoModelGetObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  ClientResultPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  BindDataModelObj: BindDataModel = new BindDataModel();
  ClientPhotoRefObj: ClientPhotoRef = new ClientPhotoRef();
  ModelObj: any;
  divclass = "col-12";
  taskname: Array<any>;
  dataSend = [];
  isButtonShow = true;
  IPLList = [];
  popupImage: any;
  imgCurrentIndex: number;
  popImages: Array<any>;

 // Photo Analysis

  taskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  clientResultPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  pastPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  currentPhotos: Array<any> = [];
  pastOrders: Array<any> = [];
  pastPhotos: Array<any> = [];
  pastWorkOrderId;
  currentPhotoOpen: Boolean;
  pastPhotoOpen: Boolean;
  selectedCurrentImage: any;
  selectedPastImage: any;
  leftcnt: any;
  rightcnt: any;

  OrderPastDTOObj = {
    "WorkOrder_ID": 0,
    "Type": 0,
    "WorkOrder_Data": null,
    "UserID": 0
  }

  constructor(
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xModalService: NgbModal,
    private xClientResultServices: ClientResultServices,
    private xRouter: Router,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workorder = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workOrderID = parseInt(workorder);
    this.GetPhotoAnalysis();
  }

  public onTabSelect(e) {
    if (e.title == 'Photo Analysis') {
      this.GetPhotoAnalysis();
    }
    if (e.title == 'Photo History') {
      this.GetPhotoHistory();
    }
    //console.log(e);
  }


  GetPhotoHistory() {
    //debugger;
    this.ClientResultPhotoModelGetObj.Client_Result_Photo_Wo_ID = this.workOrderID;
    this.ClientResultPhotoModelGetObj.Type = 1;
    this.xClientResultServices
      .GetClientResultPhotoHistory(this.ClientResultPhotoModelGetObj)
      .subscribe(response => {
        //debugger;
        if (response[0].length != 0) {
          this.IPLList = response[0];
        }
      });
  }
  hideGeneraltab(wo,idx)
  {
    debugger
    this.IPLList[idx].IsTabHidden = !this.IPLList[idx].IsTabHidden;
    this.IPLList.forEach(function (value, i) {
      if (i != idx) {
        value.IsTabHidden = true;
      }
  });

    this.spinner.show('loading');
    this.getModelData(wo);
  }

  getModelData(wo) {
    debugger;
    this.TaskBidMasterModelObj.workOrder_ID = wo;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.ModelObj = response[0][0];
        this.xClientResultServices.setPathParam(this.ModelObj);
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(["/workorder"]);
        } else {
          this.BindDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;
          this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
          this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID = this.ModelObj.workOrder_ID;
          this.ClientResultPhotoModelObj.IPLNO = this.ModelObj.IPLNO;
          this.GetClientImages();
        }
      });
  }
  GetClientImages() {
    debugger
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataHistory(this.ClientResultPhotoModelObj)
      .subscribe(response => {
        //debugger
       console.log('history01',response)
        this.taskname = response[0];
        this.spinner.hide('loading')
      });
  }  

  PhotoModel(data, messagecontent) {
    debugger
    this.popupImage = data.itemval.Client_Result_Photo_FilePath;
    this.imgCurrentIndex = data.index;
    this.popImages = data.photos;
    this.commonPhoto(messagecontent);
  }

  GetPhotoAnalysis() {
    this.taskBidMasterModelObj.workOrder_ID = this.workOrderID;
    this.xClientResultServices
      .WorkorderViewClient(this.taskBidMasterModelObj)
      .subscribe(response => {
        const obj = response[0][0];
        this.clientResultPhotoModelObj.Client_Result_Photo_Wo_ID = obj.workOrder_ID;
        this.clientResultPhotoModelObj.IPLNO = obj.IPLNO;
        this.getCurrentImages();
      });

    this.xClientResultServices
      .ClientPastDataPost({
        "Type": 1,
        "WorkOrder_ID": this.workOrderID
      })
      .subscribe(response => {
        this.pastOrders = response[0];
        this.pastWorkOrderId = this.pastOrders[this.pastOrders.length - 1].WorkOrder_ID
        this.pastPhotoModelObj.Client_Result_Photo_Wo_ID = this.pastWorkOrderId;
        this.pastPhotoModelObj.IPLNO = 202994;
        this.getPastImages();
      })
  }

  getCurrentImages() {
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataMaster(this.clientResultPhotoModelObj)
      .subscribe(response => {
        this.currentPhotos = response[0];
      });
  }

  getPastImages() {
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataMaster(this.pastPhotoModelObj)
      .subscribe(response => {
        this.pastPhotos = response[0];
      });
  }

  changeOrder(e) {
    this.pastWorkOrderId = parseInt(e.target.value);
    const order = this.pastOrders.find(e => e.WorkOrder_ID === this.pastWorkOrderId);
    this.pastPhotoModelObj.Client_Result_Photo_Wo_ID = this.pastWorkOrderId;
    this.pastPhotoModelObj.IPLNO = parseInt(order.IPLNO);
    this.getPastImages();
  }

  openCurrentPhotoModal(index) {

    this.currentPhotoOpen = true;
    this.selectedCurrentImage = this.currentPhotos.indexOf(index);
    this.leftcnt = 1;
  }

  closeCurrentPhotoModal(e) {
    this.currentPhotoOpen = e;
  }

  openPastPhotoModal(img) {
    this.pastPhotoOpen = true;
    this.selectedPastImage = this.pastPhotos.indexOf(img);
    this.rightcnt = 0;
  }

  closePastPhotoModal(e) {
    this.pastPhotoOpen = e;
  }

 commonPhoto(content) {
    this.xModalService.open(content, { windowClass: "xlModal" })
      .result.then(result => { }, reason => { });
  }
}
