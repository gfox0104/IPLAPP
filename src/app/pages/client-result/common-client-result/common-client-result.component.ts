import { Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
import { ClientResultServices } from "../client-result/client-result.service";
import { EventEmitterService } from '../../../services/access/event-emitter.service';
import {
  TaskBidMasterModel,
  BindDataModel,
  PrintPdfObject
} from "../client-result/client-result-model";
import { DropdownModel } from '../../models/dropdown-model'
import { BidInvoiceItemViewTaskServices } from "../../admin/bid-invoice-task/bid-invoice-task.service";
import { BidInvoiceItemViewTaskModel } from "../../admin/bid-invoice-task/bid-invoice-task-model";
import { AddDamageModel, AddApplianceModel } from "../../admin/damage/add-damage/add-damage-model";
import { ViewDamageServices } from "../../admin/damage/view-damage/view-damage.service";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { ClientService } from '../client.service';
import { PrintTypes, Tabs } from './constants/tabs';
import { BidTask, CompletionTask, Damage, } from '../components/constants';
import { Subscription } from 'rxjs';
import { ClientResultOldPhotoServices } from '../client-result-photo/client-result-photo-old.service';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { NavLinks } from 'src/app/pages/client-result/common-client-header/constants/buttons';
import { Console } from "console";
import { ViolationTask } from "../components/constants/violation-task";
import { HazardTask } from "../components/constants/hazard-task";
import { SaveWorkOrderViewServices } from "../../work-order/work-order-view/work-order-view-service";
@Component({
  selector: "app-bid-client-result",
  templateUrl: "./common-client-result.component.html"
})

export class CommonClientResultComponent implements OnInit {
  @Input() tabIndex
  @Input() loading:boolean;
  @Input() item: any;
  @Input() type: string;
  @Input() indx: number = 0;
  @Input() DAMAGE:any;
  properties: any;
  @Input() errorSubmit: boolean;
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  BidInvoiceItemViewTaskModelObj: BidInvoiceItemViewTaskModel = new BidInvoiceItemViewTaskModel();
  AddDamageModelObj: AddDamageModel = new AddDamageModel();
  AddApplianceModelObj: AddApplianceModel = new AddApplianceModel();
  BindDataModelObj: BindDataModel = new BindDataModel();
  DropdownModelObj: DropdownModel = new DropdownModel();
  PrintPdfObject: PrintPdfObject = new PrintPdfObject();
  button = "Save";
  isLoading = false;
  ClientResultBidArray = [];
  ClientResultCreateCompletionArray = [];
  ClientResultDamageArray:any = [];
  decuser: any;
  OfficeResulth: boolean = false;
  processorh: boolean = false;
  tabhide: boolean = false;
  tabs = Tabs;
  isOfficeResultBid = false;
  tabhidep: boolean = false;
  isOfficeResultCompletion = false;
  isOfficeResultDamage = false;
  documentdetailslst: any;
  uploadSaveUrl = BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground";
  uploadRemoveUrl = "removeUrl";
  myFiles: string[] = [];
  damageTypeList: Array<string>;
  defaultTypeItem: { Damage_Type: string, Damage_pkeyID: number } = { Damage_Type: 'Select', Damage_pkeyID: 0 };
  statusSbuscription: Subscription;
  ModelObj: any;
  workorder: any;
  TaskList: any;
  DamageList: any;
  UOMList: any;
  IntExtList: any;
  PresetText: any;
  ApllianceName: any;
  selectedpaymentList = [];
  navLinks = NavLinks;

  contractorPriceSum_Bid=0;
  contractorTotalPriceSum_Bid=0.00;
  clientPriceSum_Bid=0.00;
  clientTotalPriceSum_Bid=0.00;
  rowCount_Bid=0;

  contractorPriceSum_Complention=0;
  contractorTotalPriceSum_Complention=0.00;
  clientPriceSum_Complention=0.00;
  clientTotalPriceSum_Complention=0.00;
  rowCount_Complention=0;

  estimatonSum_Estimation=0;
  rowCount_Estimation=0;

  LoadBidGrid=true;
  LoadComplentionGrid=true;
  LoadDamageenGrid=true;
  SelectedTask:any;


  ViolationArray = [];
  HazardArray = [];
  routePage: string;
  printTypes=PrintTypes;

  bidPrint_Disable=true;
  complentionPrint_Disable=true;
  damagePrint_Disable=true;
  violationPrint_Disable=true;
  hazardPrint_Disable=true;
  
  constructor(
    private xRouter: Router,
    private xClientResultServices: ClientResultServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xBidInvoiceItemViewTaskServices: BidInvoiceItemViewTaskServices,
    private eventEmitterService: EventEmitterService,
    private xViewDamageServices: ViewDamageServices,
    private modalService: NgbModal,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private clientService: ClientService,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private ngxSpinner:NgxSpinnerService,
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);
      this.routePage = this.xRouter.url;

      this.tabs[4].tabhidep = false;
      switch (this.decuser[0].GroupRoleId) {
        case 1:
          {
            this.OfficeResulth = false;
            this.processorh = false;
            this.tabhide = false;
            this.tabs[5].tabhidep = true;
            break;
          }
        case 2:
          {
            this.OfficeResulth = true;
            this.processorh = false;
            this.tabhide = true;
            this.tabs[4].tabhidep = true;
            this.tabs[5].tabhidep = true;
            break;
          }
        case 3:
          {
            this.OfficeResulth = false;
            this.processorh = false;
            this.tabhide = false;
            this.tabs[5].tabhidep = true;
            break;
          }
        case 4:
          {
            this.OfficeResulth = false;
            this.processorh = true;
            this.tabhide = true;
            this.tabs[5].tabhidep = true;
            break;
          }
        case 5:
          {
            this.OfficeResulth = false;
            this.processorh = false;
            this.tabhide = false;
            this.tabs[5].tabhidep = true;
            break;
          }
      }
    }
    if (localStorage.getItem('currTab') != null) {

      var currTab = localStorage.getItem('currTab');

      if(currTab == 'Field Results')
      {
        this.tabs[4].tabhidep = true;
      }

    }


    this.getModelData();
    this.GetDropDownData();
  }

  ngOnInit() {
    // debugger;
    // console.log('came here in common client result');
    if(this.loading==true){
      this.ngxSpinner.show()
    }
    
    this.initTasks();
    this.tabs.forEach((tab, index) => tab.active = index === this.tabIndex ? true : false);
    this.statusSbuscription = this.clientService.bidDataObserble.subscribe(value => {
      this.ClientResultTaskBidGetWorkOrderIdGet();
    });
    this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeCommonClientResultComponentFunction.subscribe(() => {
        this.ClientResultTaskBidGetWorkOrderIdGet();
      });

     this.GetDropDownData()

     

      
  }

  initTasks() {
    this.ClientResultBidArray = [new BidTask().data];
    this.ClientResultCreateCompletionArray = [new CompletionTask().data];
    this.ClientResultDamageArray = [new Damage().data];
    this.ViolationArray = [new ViolationTask().data];
    this.HazardArray = [new HazardTask().data];
  }

  getModelData() {
    const workorder1 = this.xRoute.snapshot.params['workorder']||this.xRoute.firstChild.firstChild.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workorder = parseInt(workOrderID);
    this.TaskBidMasterModelObj.workOrder_ID = this.workorder;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.ModelObj = response[0][0];
        this.xClientResultServices.setPathParam(this.ModelObj);
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(["/workorder"]);
        } else {
          this.TaskBidMasterModelObj.workOrder_ID = this.ModelObj.workOrder_ID;
        }
      });
  }


  GetDropDownData() {
    this.IntExtList = [{ Id: "1", Name: "Int" }, { Id: "2", Name: "Ext" }];

    if(this.workorder==undefined || this.workorder==0)
    {
      const workorder1 = this.xRoute.snapshot.params['workorder']||this.xRoute.firstChild.firstChild.snapshot.params['workorder'];
      let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
      this.workorder = parseInt(workOrderID);
    }
    this.DropdownModelObj.WorkOrderID = this.workorder;
    this.xWorkOrderDrodownServices
      .DropdownGetClientResult(this.DropdownModelObj)
      .subscribe(response => {
        if (response.length != 0) {
          // console.log('biddamage',response);
          //debugger;
          this.TaskList = response[0];
          // console.log("task list",this.TaskList)
          var data = {
            Task_pkeyID: -99,
            Task_Name: "Custom"
          }
          this.TaskList.push(data);
          console.log('task',this.TaskList)

          
          this.xClientResultServices.masterFunctionCallClinetTaskDropDown(this.TaskList);
          this.DamageList = response[1];
          
          var data1 = {
            Damage_pkeyID: -99,
            Damage_Type:"Custom"
          }
          this.DamageList.push(data1);
          console.log('damage',this.DamageList)
          
          this.damageTypeList = this.DamageList;
          
          this.UOMList = response[2];
          // console.log('umlist',this.UOMList);
          this.PresetText = response[3];
         
          this.ApllianceName = response[4];

          for (let i = 0; i < this.ApllianceName.length; i++) {
            this.ApllianceName[i].str_Appl_Status_Id = 'No';
          }

          // this.ClientResultTaskBidGetWorkOrderIdGet();
        }

      });
  }

  ClientResultBidSumbit() {
    debugger
    this.button = "Processing";
    let errCnt = 0;
    this.ClientResultBidArray.forEach(item => {
      if (item.Task_Bid_TaskID == 0) {
        errCnt++;
      }
      if (item.Task_Bid_Qty == 0 || item.Task_Bid_Qty == ' ') {
        errCnt++;
      }
      if (item.Task_Bid_Cont_Price === "") {
        errCnt++;
      }
      if (item.Task_Bid_Clnt_Price === "") {
        errCnt++;
      }
    });
    if (errCnt > 0) {
      this.isOfficeResultBid = true;
      this.button = "Save";
      const message = "Please fill all required feilds...!";
      this.commonMessage(message);
    } else {
      this.isLoading = true;
      this.isOfficeResultBid = false;
      this.TaskBidMasterModelObj.ClientResultBidTaskArray = this.ClientResultBidArray;
      this.xClientResultServices
        .ClientResultTaskBidPost(this.TaskBidMasterModelObj)
        .subscribe(response => {
          this.isLoading = false;
          this.button = "Save";
          this.commonMessage('Data Saved...!');
          this.GetDropDownData()
          this.ClientResultTaskBidGetWorkOrderIdGet();
          this.getModelData();
        });
    }
  }

  ClientResultInvoiceSumbit() {
    debugger
    this.button = "Processing";
    let errCnt = 0;
    this.ClientResultCreateCompletionArray.forEach(item => {
      if (item.Task_Inv_TaskID == 0) {
        errCnt++;
      }
      if (item.Task_Inv_Qty == 0 || item.Task_Inv_Qty == ' ') {
        errCnt++;
      }
      if (item.Task_Inv_Cont_Price === "") {
        errCnt++;
      }
      if (item.Task_Inv_Clnt_Price === "") {
        errCnt++;
      }
    });
    if (errCnt > 0) {
      this.isOfficeResultCompletion = true;
      this.isLoading = false;
      this.button = "Save";
      const message = "Please fill all required feilds...!";
      this.commonMessage(message);
    } else {
      this.isLoading = true;
      this.isOfficeResultCompletion = false;
      this.TaskBidMasterModelObj.ClientResultCreateCompletionArray = this.ClientResultCreateCompletionArray;
      this.xClientResultServices
        .ClientResultTaskInvoicePost(this.TaskBidMasterModelObj)
        .subscribe(response => {
          this.isLoading = false;
          this.button = "Save";
          const message = "Data Saved...!";
          this.commonMessage(message);
          this.GetDropDownData();
          this.ClientResultTaskBidGetWorkOrderIdGet();
          this.getModelData();
        });
    }
  }

  ClientResultDamageSumbit() {
      debugger
    this.button = "Processing";
    let errCnt = 0;
    let message;

    console.log("TaskBidMasterModelObj",this.TaskBidMasterModelObj)
    this.ClientResultDamageArray.forEach(item => {
       if (item.Task_Damage_ID == 0) {
        errCnt++;
      }
      if (item.Task_Damage_Qty == 0 || item.Task_Damage_Qty == ' ') {
        errCnt++;
      }
      if (item.Task_Damage_Estimate === "") {
        errCnt++;
      }
    });
    if (errCnt > 0) {
      this.isOfficeResultDamage = true;
      this.isLoading = false;
      this.button = "Save";
      message = "Please fill all required feilds...!";
      this.commonMessage(message);
    } else {
      this.isLoading = true;
      this.isOfficeResultDamage = false;
      this.TaskBidMasterModelObj.ClientResultDamageArray = this.ClientResultDamageArray;
      this.xClientResultServices
        .ClientResultTaskDamagePost(this.TaskBidMasterModelObj)
        .subscribe(response => {
          console.log('damage', response);
          this.isLoading = false;
          this.button = "Save";
          message = "Data Saved...!";
          this.commonMessage(message);
          this.GetDropDownData()
          this.ClientResultTaskBidGetWorkOrderIdGet();
        });
    }
  }

  commonMessage(message) {
    const modalRef = this.modalService.open(IplAppModalContent, {
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.MessageFlag = message;
  }

  AddMoreRowClientResultBid() {
    this.ClientResultBidArray.push(new BidTask().data);
    //this.AddMoreClinetResultInvoice();
  }

  RemoveClientResultBid(index, Item) {
    let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
    if (Cnfm) {
      if (Item.Task_Bid_pkeyID != 0) {
        this.TaskBidMasterModelObj.ClientResultBidTaskArray = [Item];
        this.TaskBidMasterModelObj.Type = 4;
        this.xClientResultServices
          .ClientResultTaskBidPost(this.TaskBidMasterModelObj)
          .subscribe(response => {
            if (index !== -1) {
              this.ClientResultBidArray.splice(index, 1);
            }
            this.ClientResultTaskBidGetWorkOrderIdGet();
          });
      } else {
        this.ClientResultBidArray.splice(index, 1);
      }
    }

    if (this.ClientResultBidArray.length == 0) {
      this.AddMoreRowClientResultBid();
    }
  }

  AddMoreClinetResultInvoice() {
    this.ClientResultCreateCompletionArray.push(new CompletionTask().data);
  }

  clientResultInvocieRemove(index, item) {
    let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
    if (Cnfm) {
      if (item.Task_Inv_pkeyID != 0) {
        this.TaskBidMasterModelObj.ClientResultCreateCompletionArray = [item];
        this.TaskBidMasterModelObj.Type = 4;
        this.xClientResultServices
          .ClientResultTaskInvoicePost(this.TaskBidMasterModelObj)
          .subscribe(response => {
            if (index !== -1) {
              this.ClientResultCreateCompletionArray.splice(index, 1);
            }
            this.ClientResultTaskBidGetWorkOrderIdGet();
          });
      } else {
        this.ClientResultCreateCompletionArray.splice(index, 1);
      }
    }

    if (this.ClientResultCreateCompletionArray.length == 0) {
      this.AddMoreClinetResultInvoice();
    }
  }

  AddClientResultDamage() {
    // debugger
    this.ClientResultDamageArray.push(new Damage().data);
  }

  RemoveClientResultDamage(index, item) {
    let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
    if (Cnfm) {
      if (item.Task_Damage_pkeyID != 0) {
        this.TaskBidMasterModelObj.Type = 4; // for delete
        this.TaskBidMasterModelObj.ClientResultDamageArray = [item];
        this.xClientResultServices
          .ClientResultTaskDamagePost(this.TaskBidMasterModelObj)
          .subscribe(response => {
            if (index !== -1) {
              this.ClientResultDamageArray.splice(index, 1);
            }
            this.ClientResultTaskBidGetWorkOrderIdGet();
          });
      } else {
        this.ClientResultDamageArray.splice(index, 1);
      }
    }
    if (this.ClientResultDamageArray.length == 0) {
      this.AddClientResultDamage();
    }
  }

  ClientResult_DamageType(DAMAGE) {
     debugger;
    this.AddDamageModelObj.Damage_pkeyID = DAMAGE.Task_Damage_Type;
    this.xViewDamageServices
      .ViewDamageData(this.AddDamageModelObj)
      .subscribe(response => {
        for (let i = 0; i < this.ClientResultDamageArray.length; i++) {
          if (this.AddDamageModelObj.Damage_pkeyID == this.ClientResultDamageArray[i].Task_Damage_Type) {
            this.ClientResultDamageArray[i].Task_Damage_Int = response[0][0].Damage_Int;
            this.ClientResultDamageArray[i].Task_Damage_Location = response[0][0].Damage_Location;
            this.ClientResultDamageArray[i].Task_Damage_Qty = response[0][0].Damage_Qty;
            this.ClientResultDamageArray[i].Task_Damage_Estimate = response[0][0].Damage_Estimate.toFixed(2);
            this.ClientResultDamageArray[i].Task_Damage_Disc = response[0][0].Damage_Disc;

            // this.TaskNameFilterMethod(response[2][0].Damage_pkeyID);
           

            // if(response[0][0].Damage_Disc != null)
            //   {
            //     this.ClientResultDamageArray[i].Task_Damage_Disc = JSON.parse(response[0][0].Damage_Disc);
            //   }
            //   this.PresetText = this.ClientResultDamageArray[i].Task_Damage_Disc;
            
           }
           
        }
      });
  }

  ClientResultTaskBidGetWorkOrderIdGet() {
    debugger
    this.bidPrint_Disable=true;
    this.complentionPrint_Disable=true;
    this.damagePrint_Disable=true;
    this.violationPrint_Disable=true;
    this.hazardPrint_Disable=true;
    this.TaskBidMasterModelObj.Type = 3;
    this.TaskBidMasterModelObj.Task_Bid_WO_ID = this.TaskBidMasterModelObj.workOrder_ID;
    this.xClientResultServices
      .ClientResultTaskBidGetWorkOrderId(this.TaskBidMasterModelObj)
      .subscribe(response => {
        console.log('ssdata',response)
        // debugger
        if (response[0][0].length != 0) {
          this.bidPrint_Disable=false;
          this.ClientResultBidArray = response[0][0];
          // console.log('ClientResultBidArray',this.ClientResultBidArray);
          this.ClientResultBidArray.forEach(element => {
            element.Task_Bid_Clnt_Price = element.Task_Bid_Clnt_Price.toFixed(2);
            element.Task_Bid_Cont_Price = element.Task_Bid_Cont_Price.toFixed(2);
          });
        }
        if (response[1][0].length != 0) {
          this.complentionPrint_Disable=false;
          this.ClientResultCreateCompletionArray = response[1][0];
          this.ClientResultCreateCompletionArray.forEach(comdata => {
            comdata.Task_Inv_Cont_Price = comdata.Task_Inv_Cont_Price.toFixed(2);
            comdata.Task_Inv_Clnt_Price = comdata.Task_Inv_Clnt_Price.toFixed(2);
          });
        }
        if (response[2][0].length != 0) {
          this.damagePrint_Disable=false;
          this.ClientResultDamageArray = response[2][0];
          console.log('damagedata',this.ClientResultDamageArray)

          // this.TaskNameFilterMethod(response[2][0].Damage_pkeyID);
          this.ClientResultDamageArray.forEach(damage => {
            damage.Task_Damage_Estimate = parseFloat(damage.Task_Damage_Estimate).toFixed(2);
            damage.Task_Damage_PreTextHide = damage.Task_Damage_PreTextHide;


            // let myValue: string | null = null;
            if(damage.Damage_Disc != null )
             {
             damage.Task_Damage_PresetTemp = JSON.parse(damage.Damage_Disc);
            // console.log('damage11',damage.Damage_Disc)
           }else 
           {
            //damage.Damage_Disc = null
            damage.Task_Damage_PresetTemp = damage.Damage_Disc;
             //console.log('damage12',damage.Damage_Disc)
          }


            damage.PresetText = damage.Task_Damage_PresetTemp ;
            // this.PresetText = damage.Task_Damage_PresetTemp ;
          });
      }
        if (response[3][0].length != 0) {
          this.ApllianceName = response[3][0];
        }
        if (response[4][1].length != 0) {
          this.documentdetailslst = response[4][1];
        }

        if (response[5][0].length != 0) {
          this.violationPrint_Disable=false;
          this.ViolationArray = response[5][0];
           console.log('violation',this.ViolationArray)
          this.ViolationArray.forEach(violation => {
            violation.Task_Violation_Fine_Amount = parseFloat(violation.Task_Violation_Fine_Amount).toFixed(2);
          });
        }

        if (response[6][0].length != 0) {
          this.hazardPrint_Disable=false;
          this.HazardArray = response[6][0];
        }
      });

  }

  AddApplianceData(item) {
    // debugger
    this.button = "Processing";
    this.AddApplianceModelObj.Appliancearr = item;
    this.AddApplianceModelObj.Appl_Wo_Id = this.ModelObj.workOrder_ID;

    this.xViewDamageServices
      .AddApplianceData(this.AddApplianceModelObj)
      .subscribe(response => {
        const message = "Appliance Saved...!";
        this.commonMessage(message);
        this.button = "Save";
      });
  }

  appliancedata(item) {

  }

  AllSelectData(arg) {
    // debugger
    switch (arg) {
      case '1':
        {
          for (let i = 0; i < this.ApllianceName.length; i++) {
            this.ApllianceName[i].str_Appl_Status_Id = 'Yes';
          }
          break;
        }
      case '2':
        {
          for (let i = 0; i < this.ApllianceName.length; i++) {
            this.ApllianceName[i].str_Appl_Status_Id = 'No';
          }
          break;
        }
      case '3':
        {
          for (let i = 0; i < this.ApllianceName.length; i++) {
            this.ApllianceName[i].str_Appl_Status_Id = 'Missing';
          }
          break;
        }
      case '4':
        {
          for (let i = 0; i < this.ApllianceName.length; i++) {
            this.ApllianceName[i].str_Appl_Status_Id = 'Damage';
          }
          break;
        }
    }
  }

  OpenDocumentUpload(contentpop) {
    this.commonPOPUPDocument(contentpop);
  }

  commonPOPUPDocument(content) {
    this.modalService
      .open(content, { windowClass: "xlModal" })
      .result.then(
        result => {
          this.GetWorkOrderOfficeDocument();
        },
        reason => {
          this.GetWorkOrderOfficeDocument();
        }
      );
  }

  displaySuccessDocument(e) {
    if (e.operation == "upload") {
      this.processDocument(e.files[0].rawFile);
    } else {
      alert("remove img called");
    }
  }

  processDocument(documentInput) {
    if (true) {
      this.BindDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;
      this.BindDataModelObj.Client_Result_Photo_Ch_ID = 0;
      this.BindDataModelObj.Client_Result_Photo_ID = 0;
      this.BindDataModelObj.Client_PageCalled = 8;
      this.BindDataModelObj.documentx = documentInput;
      this.BindDataModelObj.Client_Result_Photo_FileName = documentInput.name;
      this.BindDataModelObj.Type = 1;
      this.xClientResultOldPhotoServices
        .CommonDocumentsUpdate(this.BindDataModelObj)
        .then((res) => {
          res.subscribe(response => {

            this.xSaveWorkOrderViewServices.PostNewAccessLog(this.ModelObj.workOrder_ID,21)
            .subscribe(res =>{})

            this.GetWorkOrderOfficeDocument();
          });
        });
    }
  }

  GetWorkOrderOfficeDocument() {
    this.BindDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;
    this.BindDataModelObj.Type = 2;
    this.xClientResultServices
      .GetOfficeDocument(this.BindDataModelObj)
      .subscribe(response => {
        this.documentdetailslst = response[1];
      });
  }

  DeleteWorkOrderOfficeDocument(item) {
    let Cnfm = confirm("Are you sure you want to delete this record..?");
    if (Cnfm) {
      this.BindDataModelObj.Wo_Office_Doc_PkeyId = item.Wo_Office_Doc_PkeyId;
      this.xClientResultServices
        .DeleteOfficeDocument(this.BindDataModelObj)
        .subscribe(response => {
          this.GetWorkOrderOfficeDocument();
        });
    }

  }


  // TaskNameList:any;
  // TaskNameListone:any;
  // TaskNameFilterMethod(val){
   
  //   if (val == 1 || val == 3) {
  //     let storeId = 1;
  //     this.TaskNameList = this.DamageList.filter((item) => item.Damage_Sys_Type === storeId);
  //     var data = {Damage_pkeyID:"other",Damage_Type:"Custom"}
  //     this.TaskNameList.push(data);
  //     this.DamageList = this.TaskNameList;
  //   }
  //   else{
  //     this.damageTypeList = this.DamageList.slice();
  //   }
   
  // }

  DamageTypeFilter(value) {
    if (value != '') {
      var filteredcustomer = this.DamageList.filter(function (el) {
        return el.Damage_Type != null;
      });
      this.damageTypeList = filteredcustomer.filter((s) => s.Damage_Type.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.damageTypeList = this.DamageList.slice();
    }
  }

  DamageTypeChange(damageId, idx) {
    // debugger;
    var selectedDamageList = _.where(this.DamageList, { Damage_pkeyID: damageId });

    // console.log('chkkk',selectedDamageList);
    if (selectedDamageList.length > 0) {
      // this.ClientResultDamageArray[idx].Task_Damage_Disc = selectedDamageList[0].Damage_Disc;

      this.ClientResultDamageArray[idx].Task_Damage_Estimate = selectedDamageList[0].Damage_Estimate;
      this.ClientResultDamageArray[idx].Task_Damage_Int = selectedDamageList[0].Damage_Int;
      this.ClientResultDamageArray[idx].Task_Damage_Location = selectedDamageList[0].Damage_Location;
      this.ClientResultDamageArray[idx].Task_Damage_Qty = selectedDamageList[0].Damage_Qty;

      if(selectedDamageList[0].Damage_Disc != null)
      {
        this.ClientResultDamageArray[idx].Task_Damage_PresetTemp = JSON.parse(selectedDamageList[0].Damage_Disc);
      }
      this.ClientResultDamageArray[idx].PresetText = this.ClientResultDamageArray[idx].Task_Damage_PresetTemp ;
           // damage.Task_Damage_PreTextHide
      //console.log(this.ClientResultDamageArray[idx]);
    }
  }
  getBidFooterSum(){
    this.contractorPriceSum_Bid =(this.ClientResultBidArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Bid_Cont_Price), 0)).toFixed(2);
    this.contractorTotalPriceSum_Bid =(this.ClientResultBidArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Bid_Cont_Total), 0)).toFixed(2);

    this.clientPriceSum_Bid =(this.ClientResultBidArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Bid_Clnt_Price), 0)).toFixed(2);
    this.clientTotalPriceSum_Bid =(this.ClientResultBidArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Bid_Clnt_Total), 0)).toFixed(2);

    this.rowCount_Bid=this.ClientResultBidArray.length;
  }
  getComplentionFooterSum(){
    this.contractorPriceSum_Complention =(this.ClientResultCreateCompletionArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Inv_Cont_Price), 0)).toFixed(2);
    this.contractorTotalPriceSum_Complention =(this.ClientResultCreateCompletionArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Inv_Cont_Total), 0)).toFixed(2);

    this.clientPriceSum_Complention =(this.ClientResultCreateCompletionArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Inv_Clnt_Price), 0)).toFixed(2);
    this.clientTotalPriceSum_Complention =(this.ClientResultCreateCompletionArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Inv_Clnt_Total), 0)).toFixed(2);
    this.rowCount_Complention=this.ClientResultCreateCompletionArray.length;
  }
  getEstimationFooterSum(){
    this.estimatonSum_Estimation =(this.ClientResultDamageArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Task_Damage_Estimate), 0)).toFixed(2);
    this.rowCount_Estimation=this.ClientResultDamageArray.length;
  }
  LoadingTimeOut(){
    this.LoadBidGrid = true;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.LoadComplentionGrid = true;
    }, 2000);
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.LoadDamageenGrid = true;
    }, 4000);
  }
  UpdateItemAndReturn(item,type){
    // if(type=="Bid")
    // {
    //   var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Task_Bid_TaskID);
    //   item.isBidPriceDisable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Disable_Default;
    // }
    if(type=="Bid")
    {
      var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Task_Bid_TaskID);
      item.isBidPriceDisable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Price_Edit;
    }
    // if(type=="Inv")
    // {
    //   var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Task_Inv_TaskID);
    //   item.isBidPriceDisable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Disable_Default;
    // }
    if(type=="Inv")
    {
      var getSelectedTask=this.TaskList.filter(x=>x.Task_pkeyID===item.Task_Inv_TaskID);
      item.isBidPriceDisable=getSelectedTask.length==0 ?false:getSelectedTask[0].Task_Price_Edit;
    }
    return item;
  }
  AddMoreRowClientResultViolation() {
   this.ViolationArray.push(new ViolationTask().data);
  }
  RemoveClientResultViolation(index, Item) {
   let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
   if (Cnfm) {
     if (Item.Task_Violation_pkeyID != 0) {
      this.TaskBidMasterModelObj.Type = 4; // for delete
      this.TaskBidMasterModelObj.ClientResultViolationArray = [Item];
      this.xClientResultServices
        .ClientResultTaskViolationPost(this.TaskBidMasterModelObj)
        .subscribe(response => {
          if (index !== -1) {
            this.ViolationArray.splice(index, 1);
          }

          this.ClientResultTaskBidGetWorkOrderIdGet();
          if (this.ViolationArray.length == 0) {
            this.AddMoreRowClientResultViolation();
          }
        });

     } else {
       this.ViolationArray.splice(index, 1);
       if (this.ViolationArray.length == 0) {
        this.AddMoreRowClientResultViolation();
      }
     }
   }
  }
  ViolationSumbit() {
    // console.log(this.ViolationArray);
    this.button = "Processing";
    let errCnt = 0;
    let message;

    if (errCnt > 0) {
      this.isLoading = false;
      this.button = "Save";
      message = "Please fill all required feilds...!";
      this.commonMessage(message);
    } else {
      this.isLoading = true;
      this.TaskBidMasterModelObj.ClientResultViolationArray = this.ViolationArray;
      this.xClientResultServices
        .ClientResultTaskViolationPost(this.TaskBidMasterModelObj)
        .subscribe(response => {
          this.isLoading = false;
          this.button = "Save";
          message = "Data Saved...!";
          this.commonMessage(message);
          this.GetDropDownData()
          this.ClientResultTaskBidGetWorkOrderIdGet();
        });
    }
  }

  AddMoreRowClientResultHazard() {
    this.HazardArray.push(new HazardTask().data);
   }
   RemoveClientResultHazard(index, Item) {
    let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
    if (Cnfm) {
      if (Item.Task_Hazard_pkeyID != 0) {
        this.TaskBidMasterModelObj.Type = 4; // for delete
        this.TaskBidMasterModelObj.ClientResultHazardArray = [Item];
        this.xClientResultServices
          .ClientResultTaskHazardPost(this.TaskBidMasterModelObj)
          .subscribe(response => {
            if (index !== -1) {
              this.HazardArray.splice(index, 1);
            }

            this.ClientResultTaskBidGetWorkOrderIdGet();
            if (this.HazardArray.length == 0) {
              this.AddMoreRowClientResultHazard();
            }
          });
      } else {
        this.HazardArray.splice(index, 1);
        if (this.HazardArray.length == 0) {
          this.AddMoreRowClientResultHazard();
        }
      }
    }
   }
   HazardSumbit() {
    // console.log(this.HazardArray);
    this.button = "Processing";
    let errCnt = 0;
    let message;

    if (errCnt > 0) {
      this.isLoading = false;
      this.button = "Save";
      message = "Please fill all required feilds...!";
      this.commonMessage(message);
    } else {
      this.isLoading = true;
      this.TaskBidMasterModelObj.ClientResultHazardArray = this.HazardArray;
      this.xClientResultServices
        .ClientResultTaskHazardPost(this.TaskBidMasterModelObj)
        .subscribe(response => {
          this.isLoading = false;
          this.button = "Save";
          message = "Data Saved...!";
          this.commonMessage(message);
          this.GetDropDownData()
          this.ClientResultTaskBidGetWorkOrderIdGet();
        });
    }
   }
   validate(e) {
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
   blobbid:any
   PrintBasedOnType(type:PrintTypes) {
    this.PrintPdfObject.workOrder_ID=this.workorder;
    this.PrintPdfObject.Type=type;
    if (this.routePage.includes('client/clientresultfield/')) {
      this.PrintPdfObject.IsOfficeResult=false;
      this.PrintPdfObject.IsFiledResult=true;
    }
    else if ('client/clientresult/') {
      this.PrintPdfObject.IsOfficeResult=true;
      this.PrintPdfObject.IsFiledResult=false;
    }

    this.xClientResultServices
    .createworkOrderPdf(this.PrintPdfObject)
    .subscribe(response => {
      if (response != null) {
        if (response != null) {
          this.blobbid = new Blob([response],{type: 'application/pdf',});
          var downloadURL = window.URL.createObjectURL(response);
          var link = document.createElement('a');
          link.href = downloadURL;
          let GetName = PrintTypes[type];
          if (GetName != null) {
            link.download = GetName + "_(" +this.ModelObj.workOrderNumber + ').pdf';
          }
          link.click();
        } else {
        }
      }
    });
    // window.print();
  }

  onClickTab(tab) {
    this.tabs.forEach((e) => {
      e.active = e === tab ? true : false;
    })
  }
  DownloadDocumentLog(){
    this.xSaveWorkOrderViewServices.PostNewAccessLog(this.ModelObj.workOrder_ID,22)
    .subscribe(res =>{})
  }
  clientrsultBid_PresetSET(damage) {
    damage.Task_Damage_Disc = damage.Task_Damage_Disc + " " + damage.Task_Damage_PresetTemp;
  }

  toggleShow(damage,indx) {
    // debugger
    damage.Task_Damage_PreTextHide = !damage.Task_Damage_PreTextHide;
  }
 
  backdropdown(damage) {
    // debugger
   damage.Task_Damage_Other_Name = "";
  }

  
}
