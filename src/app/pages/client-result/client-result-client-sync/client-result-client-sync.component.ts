import { Component, Injectable, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FileInfo } from "@progress/kendo-angular-upload";
import * as $ from "jquery";
import { IplAppModalContent } from "src/app/components";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { FormsMasterServices } from "../../admin/pcr-form/forms-master.service";
import { ClientResultServices } from "../client-result/client-result.service";
import { ClientResultSyncModel } from "./client-result-client-sync-model";
import { ClientResultSyncServices } from "./client-result-client-sync.service";
import { DamageCyncColumns, GridColumns, InvoiceCyncColumns, PhotoCyncColumns } from "./grid-columns";
import _ from 'underscore';
import { debounceTime } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./client-result-client-sync.component.html",

})

export class ClientResultSyncComponent implements OnInit {
  wobutton = "Sync"; // buttom loading..
  isWoLoading = false; // buttom loading..
  Bidbutton = "Sync"; // buttom loading..
  isBidLoading = false; // buttom loading..
  invoicebutton = "Sync"; // buttom loading..
  isInvoiceLoading = false; // buttom loading..
  prvbutton = "Sync"; // buttom loading..
  isPrvLoading = false; // buttom loading..
  photobutton = "Sync"; // buttom loading..
  isPhotoLoading = false; // buttom loading..
  grassbutton = "Sync"; // buttom loading..
  isgrassLoading = false; // buttom loading..
  damagebutton = "Sync"; // buttom loading..
  isdamageLoading = false; // buttom loading..
  workOrderID = 0;
  MessageFlag: string;
  ClientResultSyncModelObj: ClientResultSyncModel = new ClientResultSyncModel();
  gridColumns = GridColumns;
  invoiceCyncColumns = InvoiceCyncColumns;
  photoCyncColumns = PhotoCyncColumns;
  damageCyncColumns = DamageCyncColumns;
  bidLoad = true;
  invoiceLoad = true;
  photoLoad = true;
  prsvLoad = true;
  grassLoad = true;
  damageLoad = true;
  total = 0;
  success = 0;
  fail = 0;
  PreservationMsg: string;
  grassMsg: string;
  public griddata: any[];
  public invoicedata: any[];
  public photodata: any[];
  public damagedata: any[];
  ModelObj:any;
  importidflag :boolean;
  isPrsvVisible = false;
  isGrassVisible = false;
  fbFormList = [];

  constructor(
    private xRouter: Router,
    private modalService: NgbModal,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xClientResultSyncServices: ClientResultSyncServices,
    private xClientResultServices:ClientResultServices,
    private formsMasterServices: FormsMasterServices,
    private spinner: NgxSpinnerService
  ) {

    this.ModelObj = this.xClientResultServices.getPathParam();
    if (this.ModelObj != undefined) {
      if ( this.ModelObj.import_from == 4) {
        this.importidflag = false;
      }
      else{
        this.importidflag = true;
      }
    }

  }
  ngOnInit() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workorder = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workOrderID = parseInt(workorder);
    this.GetFBFormTemplateData();
this.showSpinner();
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
  async GetFBFormTemplateData() {
    //debugger;
    if (this.ModelObj != undefined) {
      await this.formsMasterServices.GetWorkOrdersFormList(3,this.workOrderID).subscribe(res => {
        if (res[0].length) {
          this.fbFormList = res[0];

          var selectedElement = _.where(this.fbFormList, { Fb_Dynamic_WorkTypeId: this.ModelObj.WorkType })

          if (selectedElement.length > 0) {
            if (selectedElement[0].Fb_Dynamic_Tab_Name == "Grass") {
              this.isGrassVisible = true;
              this.isPrsvVisible = false;
            }
            else if (selectedElement[0].Fb_Dynamic_Tab_Name == "Preservation") {
              this.isGrassVisible = false;
              this.isPrsvVisible = true;
            }
          }
        }
        else {
          this.fbFormList = [];
        }
      });
    }
  }
  SyncBidData()
  {
    this.isBidLoading = true;
    this.Bidbutton = "Processing";
    this.ClientResultSyncModelObj.WO_Id = this.workOrderID;
    this.ClientResultSyncModelObj.Type = 1;
    this.xClientResultSyncServices
      .UploadBid(this.ClientResultSyncModelObj)
      .subscribe(response => {
        this.isBidLoading = false;
        this.Bidbutton = "Sync";

        if (response[0].length > 0) {
          this.invoiceLoad = true;
          this.photoLoad = true;
          this.prsvLoad = true;
          this.grassLoad = true;
          this.damageLoad = true;
          this.bidLoad = false;
          this.griddata = response[0];
          this.total = response[0].length;
          this.success = response[1];
          this.fail = response[2];
          this.MessageFlag = "Bid upload completed...!";
          this.commonMessage();
        }
        else{
          this.MessageFlag = "Records not found...!";
          this.commonMessage();
        }
      });
  }
  SyncInvoiceData()
  {
    this.isInvoiceLoading = true;
    this.invoicebutton = "Processing";
    this.ClientResultSyncModelObj.WO_Id = this.workOrderID;
    this.ClientResultSyncModelObj.Type = 1;
    this.xClientResultSyncServices
      .UploadInvoice(this.ClientResultSyncModelObj)
      .subscribe(response => {
        this.isInvoiceLoading = false;
        this.invoicebutton = "Sync";

        if (response[0].length > 0) {
          this.bidLoad = true;
          this.photoLoad = true;
          this.prsvLoad = true;
          this.grassLoad = true;
          this.damageLoad = true;
          this.invoiceLoad = false;
          this.invoicedata = response[0];
          this.total = response[0].length;
          this.success = response[1];
          this.fail = response[2];
          this.MessageFlag = "Invoice upload completed...!";
          this.commonMessage();
        }
        else{
          this.MessageFlag = "Records not found...!";
          this.commonMessage();
        }


      });
  }
  SyncWorkOrderData()
  {

  }
  SyncPhotoData()
  {
    this.isPhotoLoading = true;
    this.photobutton = "Processing";
    this.ClientResultSyncModelObj.WO_Id = this.workOrderID;
    this.ClientResultSyncModelObj.Type = 1;
    this.xClientResultSyncServices
      .UploadPhoto(this.ClientResultSyncModelObj)
      .subscribe(response => {
        this.isPhotoLoading = false;
        this.photobutton = "Sync";

        if (response[0].length > 0) {
          this.bidLoad = true;
          this.invoiceLoad = true;
          this.prsvLoad = true;
          this.grassLoad = true;
          this.damageLoad = true;
          this.photoLoad = false;
          this.photodata = response[0];
          this.total = response[0].length;
          this.success = response[1];
          this.fail = response[2];
          this.MessageFlag = "Photos upload completed...!";
          this.commonMessage();
        }
        else{
          this.MessageFlag = "Records not found...!";
          this.commonMessage();
        }


      });
  }
  SyncPreservationData()
  {
    this.isPrvLoading = true;
    this.prvbutton = "Processing";
    this.ClientResultSyncModelObj.WO_Id = this.workOrderID;
    this.ClientResultSyncModelObj.Type = 1;
    this.xClientResultSyncServices
      .UploadPreservation(this.ClientResultSyncModelObj)
      .subscribe(response => {
        this.isPrvLoading = false;
        this.prvbutton = "Sync";

        if (response[0].length > 0) {
          this.bidLoad = true;
          this.invoiceLoad = true;
          this.photoLoad = true;
          this.prsvLoad = false;
          this.grassLoad = true;
          this.damageLoad = true;
          //this.invoicedata = response[0];
          this.total = response[0].length;
          this.PreservationMsg = response[0];
          this.success = response[1];
          this.fail = response[2];
          this.MessageFlag = "Preservation upload completed...!";
          this.commonMessage();
        }
        else{
          this.MessageFlag = "Records not found...!";
          this.commonMessage();
        }


      });
  }

  SyncGrassData()
  {
    this.isgrassLoading = true;
    this.grassbutton = "Processing";
    this.ClientResultSyncModelObj.WO_Id = this.workOrderID;
    this.ClientResultSyncModelObj.Type = 1;
    this.xClientResultSyncServices
      .UploadGrass(this.ClientResultSyncModelObj)
      .subscribe(response => {
        this.isgrassLoading = false;
        this.grassbutton = "Sync";

        if (response[0].length > 0) {
          this.bidLoad = true;
          this.invoiceLoad = true;
          this.photoLoad = true;
          this.prsvLoad = true;
          this.grassLoad = false;
          this.damageLoad = true;
          //this.invoicedata = response[0];
          this.total = response[0].length;
          this.grassMsg = response[0];
          this.success = response[1];
          this.fail = response[2];
          this.MessageFlag = "Grass upload completed...!";
          this.commonMessage();
        }
        else{
          this.MessageFlag = "Records not found...!";
          this.commonMessage();
        }


      });
  }

  SyncDamageData()
  {
    this.isdamageLoading = true;
    this.damagebutton = "Processing";
    this.ClientResultSyncModelObj.WO_Id = this.workOrderID;
    this.ClientResultSyncModelObj.Type = 1;
    this.xClientResultSyncServices
      .UploadDamage(this.ClientResultSyncModelObj)
      .subscribe(response => {
        this.isdamageLoading = false;
        this.damagebutton = "Sync";

        if (response[0].length > 0) {
          this.bidLoad = true;
          this.invoiceLoad = true;
          this.photoLoad = true;
          this.prsvLoad = true;
          this.grassLoad = true;
          this.damageLoad = false
          this.damagedata = response[0];
          this.total = response[0].length;
          this.success = response[1];
          this.fail = response[2];
          this.MessageFlag = "Damage upload completed...!";
          this.commonMessage();
        }
        else{
          this.MessageFlag = "Records not found...!";
          this.commonMessage();
        }


      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
}
