import { Component, Injectable, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FileInfo } from "@progress/kendo-angular-upload";
import { BindDataModel, TaskBidMasterModel } from "../client-result/client-result-model";
import {
  ClientResultInstructionModel,
  InstructionMasterDrDNameModel,
  InstructionMasterTaskTypeModel,
  InstructionMasterTaskModel,
  SigleEditBoxModel,
  InstructionAcessLogModel
} from "./client-result-instruction-model";
import { ClientResultInstructionServices } from "./client-result-instruction.service";
import * as $ from "jquery";
import { ClientResultServices } from '../client-result/client-result.service';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { ClientResultOldPhotoServices } from '../client-result-photo/client-result-photo-old.service';
import { AccessLog, NewAccessLog } from "./constants/fileds"
import { AddInstructionModel } from "../../admin/instruction-work-order/add-instruction/add-instruction-model";
import { AddInstructionServices } from "../../admin/instruction-work-order/add-instruction/add-Instruction.service";
import { debug } from "console";
import { NgxSpinnerService } from "ngx-spinner";
import { parse } from "path";


@Component({
  templateUrl: "./client-result-instruction.component.html",
  styleUrls: ["./client-result-instruction.component.scss"]
  // styles:[`
  //     .onSmall{
  //       display:none;
  //     }
  //     @media(max-width:800px){
  //       .onSmall{
  //         display:block;
  //       }
  //       .onLarge{
  //         display:none;
  //       }
  //     }

      /* input[type="text"] {
  width: 100%;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}



.inputWithIcon input[type="text"] {
  padding-left: 25px;
}

.inputWithIcon {
  position: relative;
}

.inputWithIcon i {
  position: absolute;
  left: 0;
  top: 8px;
  padding: 9px 8px;
  color: #aaa;
  transition: 0.3s;
}


.inputWithIcon.inputIconBg i {
  background-color: #aaa;
  color: #fff;
  padding: 9px 4px;
  border-radius: 4px 0 0 4px;
}

.inputWithIcon.inputIconBg input[type="text"]:focus + i {
  color: #fff;
  background-color: dodgerBlue;
} */

  // `]
})

export class ClientResultInstructionComponent implements OnInit {
  BindDataModelObj: BindDataModel = new BindDataModel();
  // ClientResultInstructionModelObj: ClientResultInstructionModel = new ClientResultInstructionModel();
  // InstructionMasterTaskTypeModelObj: InstructionMasterTaskTypeModel = new InstructionMasterTaskTypeModel();
  // InstructionMasterDrDNameModelObj: InstructionMasterDrDNameModel = new InstructionMasterDrDNameModel();
  // InstructionMasterTaskModelObj: InstructionMasterTaskModel = new InstructionMasterTaskModel();
  InstructionAcessLogModelObj: InstructionAcessLogModel = new InstructionAcessLogModel();
  // InstructionDataArray = [];
  DetailsDataArray = [];
  // InstDataArray = [];

  // show = false;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  public contentx; // for common msg argument pass sathi
  MessageFlag: string; // custom msg sathi
  tempInstr_Task_Id = 0;
  // SigleEditBoxModelObj: SigleEditBoxModel = new SigleEditBoxModel();
  private apiUrlGet = BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground"; // get document
  uploadSaveUrl = ""; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint
  decuser: any;
  OfficeResulth: boolean = false;
  processorh: boolean = false;
  tabhide: boolean = false;
  myFiles: string[] = [];
  // taskType = true;
  accessLog = NewAccessLog;
  // isTaskInstruction = false;
  // public taskList1: Array<string>;
  // public taskList2: Array<string>;
  // public defaultTaskItem: { Task_Name: string, Task_pkeyID: number } = { Task_Name: 'Select', Task_pkeyID: 0 };
  // public defaultInsTaskItem: { Inst_Task_Name: string, Inst_Task_pkeyId: number } = { Inst_Task_Name: 'Select', Inst_Task_pkeyId: 0 };
  commentBox = true;
  // instructionBox = true;
  // taskBox = true;
  // taskTypeNameArrayNewTwo = [];
  // InstrDrpList = [];
  AddInstructionModelObj: AddInstructionModel = new AddInstructionModel();

  // contractorPriceSum=0;
  // contractorTotalPriceSum=0.00;
  // clientPriceSum=0.00;
  // clientTotalPriceSum=0.00;

  // instructionPriceSum=0.00;
  // instructionTotalPriceSum=0.00;

  // rowCount_Task=0;
  // rowCount_Instruction=0
  constructor(
    private xRouter: Router,
    private xClientResultInstructionServices: ClientResultInstructionServices,
    private modalService: NgbModal,
    private xRoute: ActivatedRoute,
    private xClientResultServices: ClientResultServices,
    private EncrDecr: EncrDecrService,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private spinner: NgxSpinnerService,

  ) {
    this.uploadSaveUrl = this.apiUrlGet;
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);
     //console.log(this.decuser[0].GroupRoleId)
      switch (this.decuser[0].GroupRoleId) {
        case 1:
          {
            this.OfficeResulth = false;
            this.processorh = false;
            this.tabhide = false;
            break;
          }
        case 2:
          {
            this.OfficeResulth = true;
            this.processorh = false;
            this.tabhide = true;
            break;
          }
        case 3:
          {
            this.OfficeResulth = false;
            this.processorh = false;
            this.tabhide = false;
            break;
          }
        case 4:
          {
            this.OfficeResulth = false;
            this.processorh = true;
            this.tabhide = false;
            break;
          }
      }
    }
  }

  ngOnInit() {
    this.spinner.show();
    this.getModelData();
   // this.initTasks();

  }

  //strip html
  instcom: any;
  removeTags(str) {
    ////dfebugger
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return this.instcom = str.replace(/(<([^>]+)>)/ig, '');
  }
  // countx = 0;
  onearray = [];
  twoarray = [];
  threearray = [];


  // common message modal popup
  commonMessage(content) {
    this.modalService
      .open(content, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(result => { }, reason => { });
  }
  /// end common model

  ModelObj: any;
  BindData: any;
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();

  getModelData() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    const workorder = parseInt(workOrderID);
    this.TaskBidMasterModelObj.workOrder_ID = workorder;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.BindData = response[0][0];
        this.xClientResultServices.setPathParam(this.BindData);
        this.ModelObj = this.BindData;
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(["/workorder"]);
        } else {
          this.BindDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;
          this.BindDataModelObj.address1 = this.ModelObj.address1;
          this.BindDataModelObj.Cont_Name = this.ModelObj.Cont_Name;
          this.BindDataModelObj.Cordinator_Name = this.ModelObj.Cordinator_Name;
          this.BindDataModelObj.Lock_Code = this.ModelObj.Lock_Code;
          this.BindDataModelObj.startDate = this.ModelObj.startDate;
          this.BindDataModelObj.Work_Type_Name = this.ModelObj.Work_Type_Name;
          this.BindDataModelObj.Lock_Location = this.ModelObj.Lock_Location;
          this.BindDataModelObj.Cust_Num_Number = this.ModelObj.Cust_Num_Number;
          this.BindDataModelObj.Key_Code = this.ModelObj.Key_Code;
          this.BindDataModelObj.Client_Company_Name = this.ModelObj.Client_Company_Name;
          this.BindDataModelObj.Gate_Code = this.ModelObj.Gate_Code;
          this.BindDataModelObj.BATF = this.ModelObj.BATF;
          this.BindDataModelObj.Lotsize = this.ModelObj.Lotsize;
          this.BindDataModelObj.rus_Name = this.ModelObj.rus_Name;
          this.BindDataModelObj.ClientMetaData = this.ModelObj.ClientMetaData;
          this.BindDataModelObj.Loan_Info = this.ModelObj.Loan_Info;
          this.BindDataModelObj.Broker_Info = this.ModelObj.Broker_Info;
          this.BindDataModelObj.Received_Date = this.ModelObj.Received_Date;
          this.BindDataModelObj.clientDueDate = this.ModelObj.clientDueDate;
          this.BindDataModelObj.Complete_Date = this.ModelObj.Complete_Date;
          this.BindDataModelObj.Cancel_Date = this.ModelObj.Cancel_Date;
          this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
          this.BindData = this.ModelObj;

          this.GetInstructionAcessdata();
        }
      });
  }

  showComment(){
    //debugger
    this.commentBox=!this.commentBox;
  }

  taskdetails = [];


  DetailsRemove(index) {
    let promp = confirm("Are you Sure you want to  Delete this Record..?");
    if (promp) {
      this.DetailsDataArray.splice(index, 1);
    }
    if (this.DetailsDataArray.length == 0) {
      // this.AddMoreInstruction();
    }
  }

  // for access log
  AccessLogData: any;
  ImportArr: any;
  documentdetailslst: any;
  GetInstructionAcessdata() {
    this.InstructionAcessLogModelObj.Alm_workOrder_ID = this.ModelObj.workOrder_ID;
    this.xClientResultInstructionServices.InsructionAcessLogData(this.InstructionAcessLogModelObj)
      .subscribe(response => {
        // debugger;
        // console.log('import data', response)
        this.AccessLogData = response[0];
        this.ImportArr = response[1][0];
        this.documentdetailslst = response[2]
      });
  }

  //document upload code
  OpenDocumentUpload(contentpop) {
    this.commonPOPUPDocument(contentpop);
  }
  commonPOPUPDocument(content) {
    this.modalService
      .open(content, { windowClass: "xlModal" })
      .result.then(
        result => {

        },
        reason => {

        }
      );
  }
  public displayErrorDocument(e: ErrorEvent) {
  }

  public displaySuccessDocument(e) {
    if (e.operation == "upload") {
      this.processDocument(e.files[0].rawFile);
    } else {
      alert("remove img called");
    }
  }


  //document upload

  processDocument(documentInput) {
    if (true) {
     // debugger;
      this.BindDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;
      this.BindDataModelObj.Client_Result_Photo_Ch_ID = 0;
      this.BindDataModelObj.Client_Result_Photo_ID = this.ModelObj.Inst_Doc_PkeyID;
      this.BindDataModelObj.Client_PageCalled = 1;
      this.BindDataModelObj.documentx = documentInput;
      this.BindDataModelObj.Client_Result_Photo_FileName = documentInput.name;
      this.BindDataModelObj.Type = 1;
      this.xClientResultOldPhotoServices
        .CommonDocumentsUpdate(this.BindDataModelObj)
        .then((res) => {
          res.subscribe(() => { });
        });
    }
  }
  //remove file
  removeinstructionfile(item) {
    let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
    if (Cnfm) {
      this.InstructionAcessLogModelObj.Inst_Doc_PkeyID = item.Inst_Doc_PkeyID;
      this.xClientResultInstructionServices.delinstructionfile(this.InstructionAcessLogModelObj)
        .subscribe(res => {
          //console.log("del", res);
          this.getModelData();
        });
    }
  }
}
