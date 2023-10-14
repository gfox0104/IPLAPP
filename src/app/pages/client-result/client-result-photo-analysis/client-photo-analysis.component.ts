import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientResultOldPhotoServices } from "../client-result-photo/client-result-photo-old.service";
import { ClientResultServices } from '../client-result/client-result.service';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { TaskBidMasterModel } from "../client-result/client-result-model";
import { ClientResultPhotoModel } from "../client-result-photo/client-result-photo-model";

@Component({
  templateUrl: './client-photo-analysis.component.html',
  styleUrls: ['./client-photo-analysis.component.scss']
})

export class ClientPhotoAnalysisComponent implements OnInit {
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

  OrderPastDTOObj = {
    "WorkOrder_ID": 0,
    "Type": 0,
    "WorkOrder_Data": null,
    "UserID": 0
  }

  constructor(
    private xRoute: ActivatedRoute,
    private xClientResultServices: ClientResultServices,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private EncrDecr: EncrDecrService,
  ) { }

  ngOnInit() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    const workorder = parseInt(workOrderID);
    this.taskBidMasterModelObj.workOrder_ID = workorder;
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
        "WorkOrder_ID": workorder
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
  }

  closeCurrentPhotoModal(e) {
    this.currentPhotoOpen = e;
  }

  openPastPhotoModal(img) {
    this.pastPhotoOpen = true;
    this.selectedPastImage = this.pastPhotos.indexOf(img);
  }

  closePastPhotoModal(e) {
    this.pastPhotoOpen = e;
  }
} 
