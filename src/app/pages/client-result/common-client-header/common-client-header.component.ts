import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BindDataModel, TaskBidMasterModel, CopyWorkOderModel, PrintPdfObject } from '../client-result/client-result-model';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subscription } from 'rxjs';

import { ClientResultServices } from '../client-result/client-result.service';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { WorkOrderModel, UpdateStausDataModel } from "../../work-order/new-work-order/new-work-order-model";
import { SaveWorkOrderServices } from "../../work-order/new-work-order/new-work-order.service"
import { ClientResultsInvoiceServices } from '../client-results-invoice/client-results-invoice.service'
import { CommonStatusDTO } from './common-status-model';
import { IplAppModalContent } from '../../../components';
import { NavLinks } from './constants/buttons';
import { ClientInfo } from './constants/header';
import { ClientService } from '../client.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ClientResultPhotoModel, TaskBidPhoto } from '../../client-result/client-result-photo/client-result-photo-model';


import { ClientResultOldPhotoServices } from "../client-result-photo/client-result-photo-old.service";
import { parse } from "path";
import { SaveWorkOrderViewServices } from "../../work-order/work-order-view/work-order-view-service";
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthService } from "src/app/services/auth/auth.service";
import { MessageService } from "../../message/message.service";
import { MessageWoComponent } from "../message-wo/message-wo.component";
import { WoMessageService } from "../message-wo/message-wo.service";
import { PrintTypes } from "../common-client-result/constants/tabs";


@Component({
  selector: "app-header-client-result",
  templateUrl: "./common-client-header.component.html"
})

export class CommonClientHeaderComponent implements OnInit {
  UpdateStausDataModelObj: UpdateStausDataModel = new UpdateStausDataModel();
  CommonStatusDTOObj: CommonStatusDTO = new CommonStatusDTO();
  BindDataModelObj: BindDataModel = new BindDataModel();
  CopyWorkOderModelObj: CopyWorkOderModel = new CopyWorkOderModel();
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  WorkOrderModelObj: WorkOrderModel = new WorkOrderModel();

  ClientResultPhotoModelObj: ClientResultPhotoModel =
  new ClientResultPhotoModel();
  PrintPdfObject: PrintPdfObject = new PrintPdfObject();
  MessageFlag: string;
  formUsrCommonGroup: UntypedFormGroup;
  OfficeResulth: boolean = false;
  processorh: boolean = false;
  tabhide: boolean = false;
  HeaderButton: boolean = false;
  navLinks = NavLinks;
  clientCommonInfo = ClientInfo;
  subscription: Subscription;
  ModelObj: any;
  BindData: any;
  workorder: string;
  copydata: any;
  workid: any;
  coppynu: any;
  Statuslst: any;
  statusName: string;
  statusData: any;
  lat; log
  isHelpActive = false;
  prompMessage: any = '';
  title: any = '';
  TaskBidPhotoobj: TaskBidPhoto = new TaskBidPhoto();
  GetTaskPhotos: any;
  bidItems: [];
  completionItems = [];
  inspectionItems = [];
  damageItems = [];
  customItems = [];
  workOrder_ID_encrypted: any;
  actionIPLNOs: Array<any>;
  public GetPhotosCount: any;
  IPL_Company_ID = null;
  groupRoleID: number = 0;
  username:string;
  unreadCounts:number=0;
  constructor(
    private clientService: ClientService,
    private xClientResultServices: ClientResultServices,
    private xSaveWorkOrderServices: SaveWorkOrderServices,
    private modalService: NgbModal,
    private xRouter: Router,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xClientResultsInvoiceServices: ClientResultsInvoiceServices,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
    private xdatabase: AngularFireDatabase,
    private authService: AuthService,
    private messageService: MessageService,
    private woMessageService:WoMessageService
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      const encuser = JSON.parse(localStorage.getItem('usertemp_'));
      const userDetail = this.authService.getUserDetail();
      this.groupRoleID = userDetail.GroupRoleId;
      this.IPL_Company_ID=userDetail.IPL_Company_ID
      this.username=userDetail.username;
      const decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      const decuser = JSON.parse(decval);
      switch (decuser[0].GroupRoleId) {
        case 1:
          {
            this.OfficeResulth = false;
            this.processorh = false;
            this.tabhide = false;
            this.navLinks[0].tabhide = false;
            break;
          }
        case 2:
          this.navLinks.forEach(nav => nav.tabhide = nav.title == 'Office Results' || nav.title == 'Property Info'   ? true : false);
          this.navLinks[7].tabhide = true;
          this.HeaderButton = true;

          break;
        case 3:
          {
            this.OfficeResulth = false;
            this.processorh = false;
            this.tabhide = false;
            this.navLinks[0].tabhide = false;
            //this.navLinks.forEach(nav => nav.tabhide = nav.title == 'Office Results' ? true : false);

            break;
          }
        case 4:
          {
            this.OfficeResulth = false;
            this.processorh = true;
            this.tabhide = false;
            this.navLinks[0].tabhide = false;
            this.navLinks[1].tabhide = false;
            //this.navLinks.forEach(nav => nav.tabhide = nav.title == 'Office Results' ? true : false);
            break;
          }
        case 5:
          {
            this.navLinks.forEach(nav => nav.tabhide = nav.title == 'Office Results' ? true : false);
            this.navLinks[5].tabhide = true;
            this.navLinks[7].tabhide = true;
            break;
          }
      }
    }
  }

  ngOnInit() {
    // debugger;
    this.spinner.show('loading');
    this.GetStatusDropDown();

    this.formUsrCommonGroup = this.formBuilder.group({
    });
    const workorder1 = this.xRoute.firstChild.firstChild.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workorder = workOrderID;
    // console.log(this.workorder);
    this.GetClientImages();
    this.subscription = this.clientService.updateHeaderObserble.subscribe(data => {
      if (data !== null) {
        this.workorder = data;
      }
      this.getModelData();
    });

    // this.messageService.unreadCounts_workOrder.subscribe(value => {
    //   console.log('======', value)
    //   this.unreadCounts = value;
    // })
  }

  GetClientImages() {
    this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID= Number(this.workorder);
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataMaster(this.ClientResultPhotoModelObj)
      .subscribe((response) => {
        //debugger
        this.GetPhotosCount = response[0].length;
      });
  }


  clickNavLink(item) {
    this.navLinks.forEach(nav => nav.active = nav.title === item.title ? 'active' : '');
    if (this.workorder === undefined) return;
    const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.workorder);
    switch (item.title) {
      case 'Office Results':
        localStorage.setItem('currTab', 'Office Results');
        this.xRouter.navigate(["client/clientresult/" + btoa(encrypted)]);
        break;
      case 'Field Results':
        localStorage.setItem('currTab', 'Field Results');
        this.xRouter.navigate(["client/clientresultfield/" + btoa(encrypted)]);
        break;
      case 'Instructions':
        localStorage.setItem('currTab', 'Instructions');
        this.xRouter.navigate(["client/clientresultinstruction/" + btoa(encrypted)]);
        break;
      case 'Invoice':
        localStorage.setItem('currTab', 'Invoice');
        this.getModelData();
        this.xClientResultServices.setPathParam(this.BindData);
        this.xRouter.navigate(["/client/clientresultinvoice/" + btoa(encrypted)]);
        break;
      case 'Photos':
        localStorage.setItem('currTab', 'Photos');
        this.getModelData();
        this.xRouter.navigate(["client/clientresultphoto/" + btoa(encrypted)]);
        break;
      case 'Messages':
        localStorage.setItem('currTab', 'Messages');
        this.xRouter.navigate(["/client/messages/" + btoa(encrypted)]);
        break;
      case 'Photo analysis':
        localStorage.setItem('currTab', 'Photo analysis');
        this.xRouter.navigate(["/client/clientphotoanalysis/" + btoa(encrypted)]);
        break;
      case 'Client Sync':
        localStorage.setItem('currTab', 'Client Sync');
        this.xRouter.navigate(["/client/clientsync/" + btoa(encrypted)]);
        break;
      case 'Property Info':
        localStorage.setItem('currTab', 'Property Info');
        // this.xRouter.navigate(["/client/clientresultpropertyInfo/" + btoa(encrypted)]);
        this.xRouter.navigate(["/client/clientresultnewpropertyInfo/" + btoa(encrypted)]);
        break;
      case 'Photo History':
        localStorage.setItem('currTab', 'Photo History');
        this.xRouter.navigate(["/client/clientresultphotoHistory/" + btoa(encrypted)]);
        break;
      case 'Client Result Property Info Test':
        localStorage.setItem('currTab','Client Result Property Info Test');
        this.xRouter.navigate(["/client/clientresultpropertyinfotest/" + btoa(encrypted)]);
        break;
      default: break;
    }

  }
  getEncryptedWorkorderValue() {
    // debugger;
    const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.workorder);
    return btoa(encrypted);
  }

  GoToBack() {
    this.xRouter.navigate(["/workorder"]);
  }
  blob:any;
  PrintWindow() {
    this.PrintPdfObject.workOrder_ID= parseInt(this.workorder);
    this.PrintPdfObject.Type=PrintTypes.Instruction;
    this.xClientResultServices
    .createworkOrderPdf(this.PrintPdfObject)
    .subscribe(response => {
      // debugger
      if (response != null) {
        if (response != null) {
          this.blob = new Blob([response], {type: 'application/pdf',});
          var downloadURL = window.URL.createObjectURL(response);
          var link = document.createElement('a');
          link.href = downloadURL;
          let GetName ='Task_and_Instruction_('+this.BindDataModelObj.workOrderNumber+")";
          if (GetName != null) {
            link.download = GetName + '.pdf';
          }
          link.click();
        } else {
        }
      }
    });
  }

  EditWorkOrder() {
    const workorder1 = this.xRoute.firstChild.firstChild.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', workOrderID);
    this.xRouter.navigate(["workorder/createworkorder", btoa(encrypted)]);
  }

  RedirectToMessage() {
    const workorder1 = this.xRoute.firstChild.firstChild.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', workOrderID);
    this.xRouter.navigate(["client/messages", btoa(encrypted)]);
  }

  getModelData() {
// debugger;
    this.TaskBidMasterModelObj.workOrder_ID = parseInt(this.workorder);
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        // console.log('metadata', response)
        this.BindData = response[0][0];
        this.xClientResultServices.setPathParam(this.BindData);
        if (this.BindData != undefined) {

          // debugger;
          // Previews code commented on 22-07-2022

          // if (this.BindData.status == 2 || this.BindData.status == 3 || this.BindData.status == 8 || this.BindData.status == 9
          //   || this.BindData.status == 1 || this.BindData.status == 4) {
          //   this.CommonStatusDTOObj.Status_ID = 0;
          // }
          // else {
          //   this.CommonStatusDTOObj.Status_ID = parseInt(this.BindData.status);
          // }

          //new code  22-07-2022

          this.CommonStatusDTOObj.Status_ID = parseInt(this.BindData.status==3?2:this.BindData.status);
        }

        this.ModelObj = this.BindData;
        if (this.ModelObj == undefined) {
        } else {
          this.workorder = this.BindData.workOrder_ID;
          this.BindDataModelObj.WT_WorkType = this.ModelObj.WT_WorkType;
          this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
          this.BindDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;
          this.BindDataModelObj.fulladdress = this.ModelObj.fulladdress;
          this.BindDataModelObj.Client_Company_Name = this.ModelObj.Client_Company_Name;
          this.BindDataModelObj.dueDate = this.ModelObj.dueDate;
          this.BindDataModelObj.Cont_Name = this.ModelObj.Cont_Name.split(',')[0];
          this.BindDataModelObj.Cordinator_Name = this.ModelObj.Cordinator_Name.split(',')[0];
          this.BindDataModelObj.EstimatedDate = this.ModelObj.EstimatedDate;
          if(this.ModelObj.gpsLatitude===null && this.ModelObj.gpsLongitude===null)
          {
            localStorage.setItem('WO_lat',"");
            localStorage.setItem('WO_long',"");
          }
          else
          {
            localStorage.setItem('WO_lat',this.ModelObj.gpsLatitude);
            localStorage.setItem('WO_long',this.ModelObj.gpsLongitude);
          }
          this.actionIPLNOs =[{ IPLNO: this.BindDataModelObj.IPLNO,WorkOrder_Id: this.BindData.workOrder_ID}]
        }
        this.statusName = this.BindData.Status_Name;
        this.GetMessageCount(this.ModelObj.IPLNO);

        // let myCompOneObj = new MessageWoComponent(this.EncrDecr,this.authService,this.xdatabase,this.woMessageService,this.xRoute,this.xClientResultServices,this.messageService);
        // myCompOneObj.loadMessageData(this.ModelObj.IPLNO);
        // if(this.BindData.status==3)
        // {

        //   this.statusName =this.Statuslst.filter(x=>x.Status_ID===2)[0].Status_Name
        // }
        // else
        // {
        //   this.statusName = this.BindData.Status_Name;
        // }
      });
  }

  CopyWorkOrderData(arg) {
    this.CopyWorkOderModelObj.workOrder_ID = this.BindData.workOrder_ID;
    this.CopyWorkOderModelObj.WorkOderInfo = arg;
    this.CopyWorkOderModelObj.Type = 1;
    this.xClientResultServices
      .CopyWorkOrderDetailsPost(this.CopyWorkOderModelObj)
      .subscribe(response => {
        this.workid = response[0].workOrder_ID;
        this.GetWorkOderCopyDetails();
      });
  }

  GetWorkOderCopyDetails() {
    this.TaskBidMasterModelObj.workOrder_ID = this.workid;
    this.TaskBidMasterModelObj.Type = 1;

    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.coppynu = "Edit";
        this.copydata = response[0][0];
        localStorage.setItem("copy", this.coppynu);
        var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.copydata.workOrder_ID);
        this.xRouter.navigate(["workorder/createworkorder", btoa(encrypted)]);
        this.workorder = this.copydata.workOrder_ID;
      })
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Continue...';
    modalRef.result.then(result => { }, reason => { });
  }

  WorkOrderDelete() {
    let promp = confirm("Are you Sure you want to  Delete this Record..?");
    if (promp) {
      if (this.ModelObj.workOrder_ID != "") {
        this.WorkOrderModelObj.workOrder_ID = this.ModelObj.workOrder_ID;
        this.WorkOrderModelObj.IPLNO = this.ModelObj.IPLNO;
        this.WorkOrderModelObj.Type = 4;
        this.xSaveWorkOrderServices.deleteworkorder(this.WorkOrderModelObj)
          .subscribe(response => {
            if (response[0].Status == 1) {
              this.MessageFlag = "Record Deleted...!";
              this.commonMessage();
              this.xRouter.navigate(['/workorder']);
            }
          })
      }
    }
  }

  GetStatusDropDown() {
    this.CommonStatusDTOObj.Status_ID = 0;
    this.CommonStatusDTOObj.Type = 2;
    this.xClientResultsInvoiceServices
      .DropdownGetStatus(this.CommonStatusDTOObj)
      .subscribe(response => {
        //debugger;
        this.Statuslst = response[0];
      })
  }

  StatusUpdate(event) {
    ////dfebugger
    var cfrm = confirm("Are you Sure you want to change the Status of the Workorder...!");
    if (cfrm == true) {
      if (event.target.value === '0') return;
      let User = JSON.parse(localStorage.getItem('usertemp_'));
      this.UpdateStausDataModelObj.workOrder_ID = this.BindData.workOrder_ID;
      this.UpdateStausDataModelObj.status = (this.CommonStatusDTOObj.Status_ID).toString();
      this.UpdateStausDataModelObj.UserId = User[0].User_pkeyID;
      this.UpdateStausDataModelObj.Type = 1;
      this.xSaveWorkOrderServices.Workorderstatus(this.UpdateStausDataModelObj)
        .subscribe(response => {
          this.statusData = response[0][0];
          alert('Status Updated...');
          this.CommonStatusDTOObj.Status_ID = this.statusData.status;
          this.statusName = this.statusData.Status_Name;
          this.clientService.setStatusData(this.statusData);
        });
    }
    else {
      this.CommonStatusDTOObj.Status_ID = parseInt(this.BindData.status);
    }
  }
  onStateChange(previousState: any, state: any, statesEl: HTMLSelectElement): void {
    // If we're changing state from "All" to any, it's OK
    // debugger;
    if (previousState === null) {
      this.CommonStatusDTOObj.Status_ID = state;
      return;
    }
    var cfrm = confirm("Are you Sure you want to change the Status of the Workorder...!");
    if (cfrm == true) {
      let User = JSON.parse(localStorage.getItem('usertemp_'));
      this.UpdateStausDataModelObj.workOrder_ID = this.BindData.workOrder_ID;
      this.UpdateStausDataModelObj.status = (this.CommonStatusDTOObj.Status_ID).toString();
      this.UpdateStausDataModelObj.UserId = User[0].User_pkeyID;
      this.UpdateStausDataModelObj.Type = 1;
      this.xSaveWorkOrderServices.Workorderstatus(this.UpdateStausDataModelObj)
        .subscribe(response => {
          this.statusData = response[0][0];
          alert('Status Updated...');
          this.CommonStatusDTOObj.Status_ID = this.statusData.status;
          this.statusName = this.statusData.Status_Name;
          this.clientService.setStatusData(this.statusData);
        });
    }
    else {
      statesEl.selectedIndex = this.Statuslst.indexOf(previousState) + 1;
    }
  }

  mapdetails() {
    this.TaskBidMasterModelObj.workOrder_ID = parseInt(this.workorder);
    this.TaskBidMasterModelObj.Type = 1;
    this.xClientResultServices.getmapdata(this.TaskBidMasterModelObj)
      .subscribe(res => {
        //console.log('lat',res)
        this.lat = res[0][0].gpsLatitude;
        this.log = res[0][0].gpsLongitude;
        let url = 'https://www.google.com/maps/@' + this.lat + ',' + this.log + ',' + "17z"
        window.open(url, "_blank");
      });
  }

  ngOnDestroy() {
    this.navLinks.forEach(item => item.tabhide = false);
    this.subscription.unsubscribe();
  }

  bid(bidcontent) {
    // console.log("work order id ==>  " + this.workorder);
    //this.clientResultPhotoComponent.bid(bidcontent);
    // debugger
    this.modalService
      .open(bidcontent, { windowClass: "xlModal" })
      .result.then(result => {
        this.getTaskData();
      }, reason => {
        this.getTaskData();
      });
  }

  getTaskData() {
    //  debugger;
    this.TaskBidPhotoobj.Task_Bid_WO_ID = parseInt(this.workorder);
    this.xClientResultOldPhotoServices
      .taskphotoClient(this.TaskBidPhotoobj)
      .subscribe(response => {
        this.GetTaskPhotos = response[1];
        this.bidItems = this.GetTaskPhotos.filter(item => item.ButtonName1 === 'Bid');
        this.completionItems = this.GetTaskPhotos.filter(item => item.ButtonName1 === 'Before');
        this.damageItems = this.GetTaskPhotos.filter(item => item.ButtonName1 === 'Damage');
        this.inspectionItems = this.GetTaskPhotos.filter(item => item.ButtonName1 === 'Inspection');
        this.customItems = this.GetTaskPhotos.filter(item => item.ButtonName1 === 'Label');
      });
  }

  SetHelpFlag() {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }

  actionAddTaskInstruction(data) {
    // //dfebugger
    let param = {
      WorkOrder_ID_Data: `[{ WorkOrderID: ${this.workorder} }]`,
      Task_Instruction_Data: data
    };
    // debugger

    //(JSON.stringify(param));

    let promp = confirm("Are you sure..?");
    if (!promp) return;
    this.xSaveWorkOrderViewServices.multiActionsTaskInst(JSON.stringify(param))
      .subscribe(response => {
        if (response[0].Status == 1) {
          this.MessageFlag = "Record has been Updated...!";
          this.defaultModal();
        }
      });
  }

  defaultModal() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Close';
    modalRef.result.then(result => { }, reason => {
      this.modalService.dismissAll();
      window.location.reload();
    });
    // this.update.emit();
    // this.actionValue = undefined;

  }

  openTaskModel(content) {
    let modelSize: string = 'lg';
    this.modalService
      .open(content, { windowClass: "xlModal" })
      .result.then(result => { }, reason => { });
  }

  ActionFormButton() {
    // this.isDrpValid = false;
    // debugger;
    let errCount = 0;
    let promp = confirm(this.prompMessage);
    // let param = {
    //   Arr_WorkOrderID: JSON.stringify(this.actionWorkOrderIds),
    //   Arr_IPLNO: JSON.stringify(BindDataModelObj.IPLNO),
    //   WorkOrder_Action: this.actionValue,
    //   Type: this.type
    // }
    // let message = {
    //   message: this.actionValue,
    //   id: JSON.stringify(BindDataModelObj.IPLNO)
    // }
    // // console.log(param);
    // this.xSaveWorkOrderViewServices.multiActionsWorkOrder(JSON.stringify(param))
    //       .subscribe(response => {
    //         //dfebugger;
    //         if (response[0] == 1) {
    //           this.MessageFlag = "Record has been Updated...!";
    //           this.defaultModal();
    //         }
    //       })
  }
  openHistoryModel(content) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.workorder);
    this.workOrder_ID_encrypted = btoa(encrypted);

    this.modalService
      .open(content, { windowClass: "xlModal" })
      .result.then(result => {
      }, reason => { window.scroll(0, 0); });
  }
  openMessageBox(messageBox) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.workorder);
    this.workOrder_ID_encrypted = btoa(encrypted);
    this.modalService.open(messageBox, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  updateEstimateDate(){
    if (this.ModelObj.workOrder_ID != "") {
      this.xSaveWorkOrderServices.UpdateWoEstimatedDate(this.ModelObj.workOrder_ID,this.BindDataModelObj.EstimatedDate)
        .subscribe(response => {
          if (response[0].Status == 1) {
            this.MessageFlag = "WO Estimated Date updated...!";
            this.commonMessage();
          }
        })
    }
  }
  OpenECDNotes(ecdNoteContent){
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.workorder);
    this.workOrder_ID_encrypted = btoa(encrypted);
    this.modalService.open(ecdNoteContent, { windowClass: 'lgModal' }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }

  GetMessageCount(IPLNO:string){
    var messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    messageRef.child(IPLNO)
      .on("child_added", value => {
        if (value.key === 'lastUpdate') return;
        const message = value.val();
        message['key'] = value.key;
        this.GetUnreadCount(message);
      });
  }
  GetUnreadCount(message) {
    // debugger;
    if (this.groupRoleID==1 && message.readByAdmin===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==2 && message.readByContractor===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==3 && message.readByCoordinator===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==4 && message.readByProcessor===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==5 && message.readByClient===false && message.from !== this.username) {
      this.unreadCounts++;
    }

    this.messageService.setUnreadCounts_ForWorkOrder(this.unreadCounts);
  }
}
