import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventEmitter } from 'protractor';
import { ClientResultInstructionModel, InstructionAcessLogModel, InstructionMasterDrDNameModel, InstructionMasterTaskModel, InstructionMasterTaskTypeModel, SigleEditBoxModel } from 'src/app/pages/client-result/client-result-instruction/client-result-instruction-model';
import { ClientResultInstructionServices } from 'src/app/pages/client-result/client-result-instruction/client-result-instruction.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';

@Component({
  selector: 'app-ipl-app-work-order-details-tabs',
  templateUrl: './ipl-app-work-order-details-tabs.component.html',
  styleUrls: ['./ipl-app-work-order-details-tabs.component.scss']
})
export class IplAppWorkOrderDetailsTabsComponent implements OnInit {
  @Input() workOrder_ID;

  ClientResultInstructionModelObj: ClientResultInstructionModel = new ClientResultInstructionModel();
  InstructionMasterTaskTypeModelObj: InstructionMasterTaskTypeModel = new InstructionMasterTaskTypeModel();
  InstructionMasterDrDNameModelObj: InstructionMasterDrDNameModel = new InstructionMasterDrDNameModel();
  InstructionMasterTaskModelObj: InstructionMasterTaskModel = new InstructionMasterTaskModel();
  InstructionAcessLogModelObj: InstructionAcessLogModel = new InstructionAcessLogModel();
  SigleEditBoxModelObj: SigleEditBoxModel = new SigleEditBoxModel();

  public taskList1: Array<string>;
  public taskList2: Array<string>;
  InstrDrpList = [];
  public defaultTaskItem: { Task_Name: string, Task_pkeyID: number } = { Task_Name: 'Select', Task_pkeyID: 0 };
  public defaultInsTaskItem: { Inst_Task_Name: string, Inst_Task_pkeyId: number } = { Inst_Task_Name: 'Select', Inst_Task_pkeyId: 0 };


  tabhide: boolean = false;
  commentBox = true;
  show = false;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  taskType = true;
  taskBox = true;
  instructionBox = true;

  public contentx; // for common msg argument pass sathi
  MessageFlag: string; // custom msg sathi

  processorh: boolean = false;
  OfficeResulth: boolean = false;

  InstructionDataArray = [];
  DetailsDataArray = [];
  InstDataArray = [];
  taskTypeNameArrayNew = [];
  taskTypeNameArrayNewTwo = [];

  taskreq: String;
  isTaskInstruction = false;

  rowCount_Task=0;
  rowCount_Instruction=0

  contractorPriceSum=0;
  contractorTotalPriceSum=0.00;
  clientPriceSum=0.00;
  clientTotalPriceSum=0.00;

  instructionPriceSum=0.00;
  instructionTotalPriceSum=0.00;

  countx = 0;
  decuser: any;
  constructor(private xClientResultInstructionServices: ClientResultInstructionServices,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private EncrDecr: EncrDecrService) {
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

  ngOnInit(): void {
    this.getdropdownTaskTypeName();
  }
  showComment(){
    this.commentBox=!this.commentBox;
  }
  initTasks() {
    let data = {
       Instr_pkeyId: 0,
       Instr_Task_Id: 0,
       Instr_Task_pkeyId: 0,
       Instr_WO_Id: 0,
       Instr_Task_Name: 0,
       Instr_Qty: 1,
       Instr_Contractor_Price: "0.00",
       Instr_Client_Price: "0.00",
       Instr_Contractor_Total: "0.00",
       Instr_Client_Total: "0.00",
       Instr_Action: 0,
       Instr_IsActive: true,
       Instr_IsDelete: false,
       UserID: 0,
       Instr_ValType: 1,
       Instr_Details_Data: "",
       Instr_Qty_Text: 0,
       Instr_Price_Text: "0.00",
       Instr_Total_Text: "0.00",
       Instr_Ch_pkeyId: 0,
       Instr_Task_Comment: "",
       Inst_Comand_Mobile_details: '',
       Instr_Other_Task_Name: '',
       isBidPriceDisable: false,
     };
     this.InstructionDataArray.push(data)
   }
   instructiontask() {
     let data = {
        Instr_pkeyId: 0,
        Instr_Task_Id: 0,
        Instr_Task_pkeyId: 0,
        Instr_WO_Id: 0,
        Instr_Task_Name: 0,
        Instr_Qty: 1,
        Instr_Contractor_Price: "0.00",
        Instr_Client_Price: "0.00",
        Instr_Contractor_Total: "0.00",
        Instr_Client_Total: "0.00",
        Instr_Action: 0,
        Instr_IsActive: true,
        Instr_IsDelete: false,
        UserID: 0,
        Instr_ValType: 3,
        Instr_Details_Data: "",
        Instr_Qty_Text: 0,
        Instr_Price_Text: "0.00",
        Instr_Total_Text: "0.00",
        Instr_Ch_pkeyId: 0,
        Instr_Task_Comment: "",
        Inst_Comand_Mobile_details: '',
        Instr_Other_Task_Name: '',
      };
      this.InstDataArray.push(data)
    }

  // common message modal popup
  commonMessage(content) {
    this.modalService
      .open(content, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(result => { }, reason => { });
  }
  instcom: any;
  removeTags(str) {
    ////dfebugger
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return this.instcom = str.replace(/(<([^>]+)>)/ig, '');
  }

  //get dropdown for Type Name
  taskTypeNameArray: any;
  InstTaskArray: any;
  getdropdownTaskTypeName() {
    debugger
    this.taskTypeNameArrayNew=[];
    this.taskTypeNameArray=[];
    this.InstTaskArray=[];
    this.InstrDrpList=[];
    this.InstrDrpList=[];
    this.taskTypeNameArrayNewTwo=[];
    this.InstructionMasterTaskModelObj.WorkOrderID = this.workOrder_ID;
    this.xClientResultInstructionServices
      .InstructionTaskTypeName(this.InstructionMasterTaskModelObj)
      .subscribe(response => {
        this.taskTypeNameArray = response[0];
        console.log('taskTypeNameArray',this.taskTypeNameArray)
        this.InstTaskArray = response[1];
        console.log('InstTaskArray',this.InstTaskArray)
        this.taskTypeNameArrayNewTwo = response[1];
        this.InstrDrpList = response[1];
        var data = {Inst_Task_pkeyId:-99,Inst_Task_Name:"Custom"};
        this.InstrDrpList.push(data);
        console.log('sandip99',this.InstrDrpList)
        this.CommonMethodCall_Array();
        this.getdropdownTaskName();
      });
  }
  CommonMethodCall_Array() {
    for (let i = 0; i < this.taskTypeNameArray.length; i++) {
      if (this.taskTypeNameArray[i].Inst_Task_Type_pkeyId == 1) {
        let taskTypedata = this.taskTypeNameArray[i];
        this.taskTypeNameArrayNew.push(taskTypedata);
      }
    }
    this.spinner.hide();
  }
  TaskNameArray: any;
  valflag:any;
  getdropdownTaskName() {
    debugger
    this.InstructionMasterDrDNameModelObj.WorkOrderID = this.workOrder_ID;
    this.xClientResultInstructionServices
      .InstructionTaskNamedata(this.InstructionMasterDrDNameModelObj)
      .subscribe(response => {
        //console.log('task',response);
        this.valflag = response;
        this.TaskNameArray = response[0];
        this.GetInstuctionDataMain();
      });
  }
  documentdetailslst: any;
  GetInstuctionDataMain() {
    this.ClientResultInstructionModelObj.Instr_WO_Id = this.workOrder_ID;
     this.InstructionDataArray = [];
    this.DetailsDataArray = [];
    this.InstDataArray = [];
    this.xClientResultInstructionServices
      .InstructionGetMain(this.ClientResultInstructionModelObj)
      .subscribe(response => {
        this.documentdetailslst = response[2];
        if (response[0].length != 0) {
          this.documentdetailslst = response[2];
          // this.ReturnDocumentList.emit(JSON.stringify(this.documentdetailslst));
          for (let i = 0; i < response[0].length; i++) {
            if (response[0][i].Instr_ValType == 1) {
              const MainInst = response[0][i];
              MainInst.Instr_Contractor_Price = parseFloat(MainInst.Instr_Contractor_Price).toFixed(2);
              MainInst.Instr_Client_Price = parseFloat(MainInst.Instr_Client_Price).toFixed(2);
              MainInst.Instr_Contractor_Total = parseFloat(MainInst.Instr_Contractor_Total).toFixed(2);
              MainInst.Instr_Client_Total = parseFloat(MainInst.Instr_Client_Total).toFixed(2);
              this.UpdateBidPriceDisable(MainInst);
              this.InstructionDataArray.push(MainInst);
              this.TaskNameFilterMethod(response[0][i].Instr_Task_pkeyId);
            }

            if (response[0][i].Instr_ValType == 2) {
              const DetailsArr = response[0][i];

              this.DetailsDataArray.push(DetailsArr);
            }

            if (response[0][i].Instr_ValType == 3) {
              const InstArr = response[0][i];
              InstArr.Instr_Price_Text = parseFloat( InstArr.Instr_Price_Text).toFixed(2);
              InstArr.Instr_Total_Text = parseFloat( InstArr.Instr_Total_Text).toFixed(2);
              this.InstDataArray.push(InstArr);
            }
          }

        }
        if (response[1][0] && response[1][0].length != 0) {
          ////dfebugger;
          this.SigleEditBoxModelObj.Inst_Ch_pkeyId = response[1][0].Inst_Ch_pkeyId;
          this.SigleEditBoxModelObj.Inst_Ch_Wo_Id = response[1][0].Inst_Ch_Wo_Id;
          this.SigleEditBoxModelObj.Inst_Ch_Text = response[1][0].Inst_Ch_Text;
          this.SigleEditBoxModelObj.Inst_Ch_IsActive = response[1][0].Inst_Ch_IsActive;
          this.SigleEditBoxModelObj.Inst_Ch_Delete = response[1][0].Inst_Ch_Delete;
          this.SigleEditBoxModelObj.UserID = response[1][0].UserID;

        }
        if (this.InstructionDataArray != undefined && this.InstructionDataArray.length == 0  ) {
          this.initTasks();
        }
        if (this.InstDataArray != undefined && this.InstDataArray.length == 0  ) {
          this.instructiontask();
        }

      });
  }
  ClientResultInstruCSumbit(content, arg) {
     debugger
    this.contentx = content;
    this.countx = 0;
    let errCnt = 0;
    this.isLoading = true;
    this.button = "Processing";
    if (arg == 1) {
      this.InstructionDataArray.forEach(item => {
        if(item.Instr_Task_pkeyId == 0)
        {
          errCnt++;
        }
        if(item.Instr_Task_Name == 0)
        {
          errCnt++;
        }

      })
    }
    if (arg == 2) {
      this.InstDataArray.forEach(element => {
        if(element.Instr_Task_pkeyId == 0)
        {
          errCnt++;
        }
      });
    }

    if(errCnt > 0)
    {
      this.isTaskInstruction = true;
      this.isLoading = false;
      this.button = "Save";
      this.MessageFlag = "Please fill all required feilds...!";
      this.commonMessage(this.contentx);
    }
    else{
      this.isTaskInstruction = false;
      for (let i = 0; i < this.InstructionDataArray.length; i++) {
        this.countx++;
        this.InstructionDataArray[i].Instr_Action = this.countx;
      }
      this.ClientResultInstructionModelObj.Instr_WO_Id = this.workOrder_ID;
      this.ClientResultInstructionModelObj.InstructionDataArray = this.InstructionDataArray.concat(
        this.DetailsDataArray,
        this.InstDataArray
      );
      this.SigleEditBoxModelObj.Inst_Ch_Wo_Id = this.workOrder_ID;
      this.SigleEditBoxModelObj.Instr_Comand_Mobile = this.removeTags(this.SigleEditBoxModelObj.Inst_Ch_Text);
      this.ClientResultInstructionModelObj.SingleEditBox = this.SigleEditBoxModelObj;

      this.xClientResultInstructionServices
        .InstructionPost(this.ClientResultInstructionModelObj)
        .subscribe(response => {
          if (response[0][0].Inst_Ch_pkeyId != 0) {
          ////dfebugger;
            this.SigleEditBoxModelObj.Inst_Ch_pkeyId = response[0][0].Inst_Ch_pkeyId;
          }

          this.isLoading = false;
          this.button = "Save";
          this.MessageFlag = "Data Saved...!";
          this.commonMessage(this.contentx);
           this.getdropdownTaskTypeName()
        });
    }

  }

  TaskNameList:any;
  TaskNameListone:any;
  TaskNameFilterMethod(val){
    debugger
    // console.log(val);
    // console.log('this.TaskNameArray',this.TaskNameArray)
    if (val == 1 || val == 3) {
      let storeId = 1;
      this.TaskNameList = this.TaskNameArray.filter((item) => item.Task_Type === storeId);
      var data = {Task_pkeyID:"other",Task_Name:"Custom"}
      this.TaskNameList.push(data);
      this.taskList1 = this.TaskNameList;
    }
    else
    {
      let storeId = 2;
      this.TaskNameListone = this.TaskNameArray.filter((item) => item.Task_Type === storeId);
      var data = {Task_pkeyID:"other",Task_Name:"Custom"}
      this.TaskNameListone.push(data);
      this.taskList2 = this.TaskNameListone;
    }
  }
  TaskList1Filter(value) {
    if (value!='') {
      var filteredcustomer = this.TaskNameList.filter(function (el) {
        return el.Task_Name != null;
      });
      this.taskList1 = filteredcustomer.filter((s) => s.Task_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.taskList1 = this.TaskNameList.slice();
   }
  }
  TaskList2Filter(value) {
    if (value!='') {
      var filteredcustomer = this.TaskNameListone.filter(function (el) {
        return el.Task_Name != null;
      });
      this.taskList2 = filteredcustomer.filter((s) => s.Task_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.taskList2 = this.TaskNameListone.slice();
   }
  }
  InstTaskList2Filter(value) {
    if (value!='') {
      var filteredcustomer = this.taskTypeNameArrayNewTwo.filter(function (el) {
        return el.Inst_Task_Name != null;
      });
      this.InstrDrpList = filteredcustomer.filter((s) => s.Inst_Task_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else{
      this.InstrDrpList = this.taskTypeNameArrayNewTwo.slice();
    }
  }




  TaskNameMetaData_Method(item, ind) {
    // debugger
    this.InstructionDataArray;
    if (this.valflag[1].Flag == 0) {
      for (let i = 0; i < this.InstructionDataArray.length; i++) {
        if (
          this.InstructionDataArray[i].Instr_Task_Name == item.Instr_Task_Name
        ) {
          for (let j = 0; j < this.TaskNameArray.length; j++) {
            if (this.TaskNameArray[j].Task_pkeyID == item.Instr_Task_Name) {
              if(i==ind)
              {
              this.InstructionDataArray[i].Instr_Contractor_Price = parseFloat(this.TaskNameArray[j].Task_Contractor_UnitPrice).toFixed(2);
              this.InstructionDataArray[i].Instr_Client_Price =  parseFloat(this.TaskNameArray[j].Task_Client_UnitPrice).toFixed(2);

              
                this.InstructionDataArray[i].Instr_Task_Comment="";
                if(this.TaskNameArray[j].TaskPreset!=null && this.TaskNameArray[j].TaskPreset.length>0)
                {
                  this.InstructionDataArray[i].Instr_Task_Comment=this.TaskNameArray[j].TaskPreset[0].Task_Preset_Text
                }
              }
              this.UpdateBidPriceDisable(this.InstructionDataArray[i]);
            }
          }
        }
      }
    }
    else if (this.valflag[1].Flag == 1) {
      for (let i = 0; i < this.InstructionDataArray.length; i++) {
        if (
          this.InstructionDataArray[i].Instr_Task_Name == item.Instr_Task_Name
        ) {
          for (let j = 0; j <   this.valflag[2].length; j++) {
            if (this.valflag[j].Task_pkeyID == item.Instr_Task_Name) {
              this.InstructionDataArray[i].Instr_Contractor_Price =   parseFloat(this.valflag[2][j].Task_Contractor_UnitPrice).toFixed(2);
              this.InstructionDataArray[i].Instr_Client_Price =   parseFloat(this.valflag[2].Task_Client_UnitPrice).toFixed(2);
            }
            else{
              for (let j = 0; j < this.TaskNameArray.length; j++) {
                if (this.TaskNameArray[j].Task_pkeyID == item.Instr_Task_Name) {
                  this.InstructionDataArray[i].Instr_Contractor_Price = parseFloat(this.TaskNameArray[j].Task_Contractor_UnitPrice).toFixed(2);
                  this.InstructionDataArray[i].Instr_Client_Price = parseFloat(this.TaskNameArray[j].Task_Client_UnitPrice).toFixed(2);
                }
              }
            }
          }
        }


      }
    }
    this.ClinetResultQtyInstrucation_Method();
  }

  // TaskNameMetaData_Method(item, ind) {
  //   debugger
  //   this.InstructionDataArray;
  //   if (this.valflag[1].Flag == 0) {
  //     for (let i = 0; i < this.InstructionDataArray.length; i++) {
  //       if (
  //         this.InstructionDataArray[i].Instr_Task_Name == item.Instr_Task_Name
  //       ) {
  //         for (let j = 0; j < this.TaskNameArray.length; j++) {
  //           if (this.TaskNameArray[j].Task_pkeyID == item.Instr_Task_Name) {
  //             this.InstructionDataArray[i].Instr_Contractor_Price = parseFloat(this.TaskNameArray[j].Task_Contractor_UnitPrice).toFixed(2);
  //             this.InstructionDataArray[i].Instr_Client_Price =  parseFloat(this.TaskNameArray[j].Task_Client_UnitPrice).toFixed(2);

  //             if(i==ind)
  //             {
  //               this.InstructionDataArray[i].Instr_Task_Comment="";
  //               if(this.TaskNameArray[j].TaskPreset!=null && this.TaskNameArray[j].TaskPreset.length>0)
  //               {
  //                 this.InstructionDataArray[i].Instr_Task_Comment=this.TaskNameArray[j].TaskPreset[0].Task_Preset_Text
  //               }
  //             }
  //             this.UpdateBidPriceDisable(this.InstructionDataArray[i]);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   else if (this.valflag[1].Flag == 1) {
  //     for (let i = 0; i < this.InstructionDataArray.length; i++) {
  //       if (
  //         this.InstructionDataArray[i].Instr_Task_Name == item.Instr_Task_Name
  //       ) {
  //         for (let j = 0; j <   this.valflag[2].length; j++) {
  //           if (this.valflag[j].Task_pkeyID == item.Instr_Task_Name) {
  //             this.InstructionDataArray[i].Instr_Contractor_Price =   parseFloat(this.valflag[2][j].Task_Contractor_UnitPrice).toFixed(2);
  //             this.InstructionDataArray[i].Instr_Client_Price =   parseFloat(this.valflag[2].Task_Client_UnitPrice).toFixed(2);
  //           }
  //           else{
  //             for (let j = 0; j < this.TaskNameArray.length; j++) {
  //               if (this.TaskNameArray[j].Task_pkeyID == item.Instr_Task_Name) {
  //                 this.InstructionDataArray[i].Instr_Contractor_Price = parseFloat(this.TaskNameArray[j].Task_Contractor_UnitPrice).toFixed(2);
  //                 this.InstructionDataArray[i].Instr_Client_Price = parseFloat(this.TaskNameArray[j].Task_Client_UnitPrice).toFixed(2);
  //               }
  //             }
  //           }
  //         }
  //       }


  //     }
  //   }
  //   this.ClinetResultQtyInstrucation_Method();
  // }


  ClinetResultQtyInstrucation_Method() {
    for (let i = 0; i < this.InstructionDataArray.length; i++) {
      if (this.InstructionDataArray[i].Instr_Qty != "") {
        this.InstructionDataArray[i].Instr_Contractor_Total = this.InstructionDataArray[i].Instr_Contractor_Price * this.InstructionDataArray[i].Instr_Qty;
        this.InstructionDataArray[i].Instr_Contractor_Total = parseFloat(this.InstructionDataArray[i].Instr_Contractor_Total).toFixed(2);
        this.InstructionDataArray[i].Instr_Client_Total = this.InstructionDataArray[i].Instr_Client_Price * this.InstructionDataArray[i].Instr_Qty;
        this.InstructionDataArray[i].Instr_Client_Total = parseFloat( this.InstructionDataArray[i].Instr_Client_Total).toFixed(2);
      } else {
        this.InstructionDataArray[i].Instr_Qty = 1;
        this.InstructionDataArray[i].Instr_Contractor_Total = parseFloat(this.InstructionDataArray[i].Instr_Contractor_Price).toFixed(2);
        this.InstructionDataArray[i].Instr_Client_Total = parseFloat(this.InstructionDataArray[i].Instr_Client_Price).toFixed(2);
      }
    }
  }
  ClinetResultInstCont_Price_Method() {
    for (let i = 0; i < this.InstructionDataArray.length; i++) {
      if (this.InstructionDataArray[i].Instr_Contractor_Price != "") {
        this.InstructionDataArray[i].Instr_Contractor_Total = this.InstructionDataArray[i].Instr_Contractor_Price;
        if (this.InstructionDataArray[i].Instr_Qty != "") {
          this.InstructionDataArray[i].Instr_Contractor_Total = this.InstructionDataArray[i].Instr_Contractor_Price * this.InstructionDataArray[i].Instr_Qty;
        }
      } else {
      }
    }
  }
  ClinetResultInstClient_Price_Method() {
    for (let i = 0; i < this.InstructionDataArray.length; i++) {
      if (this.InstructionDataArray[i].Instr_Client_Price != "") {
        this.InstructionDataArray[i].Instr_Client_Total = this.InstructionDataArray[i].Instr_Client_Price;
        if (this.InstructionDataArray[i].Instr_Qty != "") {
          this.InstructionDataArray[i].Instr_Client_Total =
            this.InstructionDataArray[i].Instr_Client_Price *
            this.InstructionDataArray[i].Instr_Qty;
        }
      } else {
      }
    }
  }
  ClinetResultQtyInstrucationISTRUNEW_Method() {
    for (let i = 0; i < this.InstDataArray.length; i++) {
      if (this.InstDataArray[i].Instr_Qty_Text != "") {
        this.InstDataArray[i].Instr_Total_Text = this.InstDataArray[i].Instr_Price_Text * this.InstDataArray[i].Instr_Qty_Text;
      } else {
        //alert('plz enter number only');

        // care fully
        this.InstDataArray[i].Instr_Total_Text = this.InstDataArray[i].Instr_Price_Text;
        this.InstDataArray[i].Instr_Qty_Text = 1;

      }
    }
  }

  ClinetResultPriceInstrucationISTRUNEW_Method() {

    for (let i = 0; i < this.InstDataArray.length; i++) {
      if (this.InstDataArray[i].Instr_Price_Text != "") {
        this.InstDataArray[i].Instr_Total_Text =  parseFloat(this.InstDataArray[i].Instr_Price_Text).toFixed(2);

        if (this.InstDataArray[i].Instr_Qty_Text != "") {
          this.InstDataArray[i].Instr_Total_Text = this.InstDataArray[i].Instr_Price_Text * this.InstDataArray[i].Instr_Qty_Text;
          this.InstDataArray[i].Instr_Total_Text = parseFloat(this.InstDataArray[i].Instr_Total_Text).toFixed(2);;
        }
      } else {
        //alert('plz enter number only');
      }
    }
  }

  backdropdown(item){
    let data = {
     Inst_Comand_Mobile_details: item.Inst_Comand_Mobile_details,
     Inst_Task_Name: item.Inst_Task_Name,
     Inst_Task_Type_pkeyId: item.Inst_Task_Type_pkeyId,
     Instr_Action: item.Instr_Action,
     Instr_Ch_pkeyId: item.Instr_Ch_pkeyId,
     Instr_Client_Price: item.Instr_Client_Price,
     Instr_Client_Total:item.Instr_Client_Total,
     Instr_Comand_Mobile: item.Instr_Comand_Mobile,
     Instr_Contractor_Price: item.Instr_Contractor_Price,
     Instr_Contractor_Total: item.Instr_Contractor_Total,
     Instr_Details_Data: item.Instr_Details_Data,
     Instr_IsActive: item.Instr_IsActive,
     Instr_IsDelete: item.Instr_IsDelete,
     Instr_Other_Task_Name: item.Instr_Other_Task_Name,
     Instr_Price_Text: item.Instr_Price_Text,
     Instr_Qty: item.Instr_Qty,
     Instr_Qty_Text: item.Instr_Qty_Text,
     Instr_Task_Comment:item.Instr_Task_Comment,
     Instr_Task_Id:item.Instr_Task_Id,
     Instr_Task_Name: "",
     Instr_Task_pkeyId: item.Instr_Task_pkeyId,
     Instr_Total_Text: item.Instr_Total_Text,
     Instr_ValType: item.Instr_ValType,
     Instr_WO_Id: item.Instr_WO_Id,
     Instr_pkeyId: item.Instr_pkeyId,
     TMF_Task_FileName: item.TMF_Task_FileName,
     TMF_Task_localPath: item.TMF_Task_localPath,
     Task_Name: item.Task_Name,
     }
     const index = this.InstructionDataArray.indexOf(item);
     this.InstructionDataArray[index] = data;
  }
  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^\d*\.?\d*$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  UpdateBidPriceDisable(item){
    // var getSelectedTask= this.TaskNameArray.filter(x=>x.Task_pkeyID===item.Instr_Task_Name);
    // item.isBidPriceDisable=item.Instr_Task_pkeyId==3 && getSelectedTask.length>0 ?getSelectedTask[0].Task_Disable_Default:false;
    var getSelectedTask= this.TaskNameArray.filter(x=>x.Task_pkeyID===item.Instr_Task_Name);
    item.isBidPriceDisable=item.Instr_Task_pkeyId==3 && getSelectedTask.length>0 ?getSelectedTask[0].Task_Price_Edit:false;
  }
  getTaskFooterSum(){
    // debugger;
    if(this.InstructionDataArray != null)
    {
    this.contractorPriceSum =(this.InstructionDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Contractor_Price), 0)).toFixed(2);
    this.contractorTotalPriceSum =(this.InstructionDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Contractor_Total), 0)).toFixed(2);

    this.clientPriceSum =(this.InstructionDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Client_Price), 0)).toFixed(2);
    this.clientTotalPriceSum =(this.InstructionDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Client_Total), 0)).toFixed(2);

    
      this.rowCount_Task=this.InstructionDataArray.length;
    }
   
  }
  getInstructionFooterSum(){
    this.instructionPriceSum =(this.InstDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Price_Text), 0)).toFixed(2);
    this.instructionTotalPriceSum =(this.InstDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Total_Text), 0)).toFixed(2);

    this.rowCount_Instruction=this.InstDataArray.length;
  }
  // for table row up & down
// for table row up & down
upmethod(taskItem,indx) {
  if (indx > 0) {
    [this.InstructionDataArray[indx-1], this.InstructionDataArray[indx]] = [this.InstructionDataArray[indx], this.InstructionDataArray[indx-1]]
  }
}
// for table row up & down
downMethod(taskItem,indx) {
  if (indx < this.InstructionDataArray.length - 1) {
    [this.InstructionDataArray[indx], this.InstructionDataArray[indx + 1]] = [this.InstructionDataArray[indx + 1], this.InstructionDataArray[indx]]
  }
}
taskdetails = [];
InstructionRemove(item, index) {
  let promp = confirm("Are you Sure you want to  Delete this Record..?");
  if (promp) {
    if (item.Instr_pkeyId != "") {
      this.ClientResultInstructionModelObj.Instr_pkeyId = item.Instr_pkeyId;
      this.ClientResultInstructionModelObj.Instr_WO_Id = item.Instr_WO_Id;
      this.ClientResultInstructionModelObj.Type = 4;
      this.xClientResultInstructionServices
      .DeleteInstructionPost(this.ClientResultInstructionModelObj)
      .subscribe(response => {
        this.GetInstuctionDataMain();
      });
    }
    else {
      this.InstructionDataArray.splice(index, 1);
    }
  }
  if (this.InstructionDataArray.length == 0) {
    // this.AddMoreInstruction();
  }
}
Instr_ValType: Number = 0;
AddMoreInstruction(arg) {
  //debugger
  //console.log
  this.Instr_ValType = arg;

  let data = {
    Instr_pkeyId: 0,
    Instr_Task_Id: 0,
    Instr_Task_pkeyId: 0,
    Instr_WO_Id: 0,
    Instr_Task_Name: 0,
    Instr_Qty: 1,
    Instr_Contractor_Price: "0.00",
    Instr_Client_Price: "0.00",
    Instr_Contractor_Total: "0.00",
    Instr_Client_Total: "0.00",
    Instr_Action: 0,
    Instr_IsActive: true,
    Instr_IsDelete: false,
    UserID: 0,
    Instr_Details_Data: "",
    Instr_ValType: this.Instr_ValType,
    Instr_Qty_Text: 0,
    Instr_Price_Text: "0.00",
    Instr_Total_Text: "0.00",
    Instr_Ch_pkeyId: 0,
    Instr_Task_Comment: "",
    Inst_Comand_Mobile_details: '',
    Instr_Other_Task_Name: '',
  };

  if (arg == 1) {
    this.InstructionDataArray.push(data);
  }
  if (arg == 2) {
    this.DetailsDataArray.push(data);
  }
  if (arg == 3) {
    this.InstDataArray.push(data);
  }
  //this.CommonMethodCall_Array();
}
getdescription(event){
  //debugger

let task = this.InstTaskArray.find(item => item.Inst_Task_pkeyId == event.Instr_Task_pkeyId);

let data = {
Inst_Comand_Mobile_details: event.Inst_Comand_Mobile_details,
Instr_Action : event.Instr_Action,
Instr_Ch_pkeyId: event.Instr_Ch_pkeyId,
Instr_Client_Price:event.Instr_Client_Price,
Instr_Client_Total:event.Instr_Client_Total,
Instr_Contractor_Price:event.Instr_Contractor_Price,
Instr_Contractor_Total: event.Instr_Contractor_Total,
Instr_Details_Data: task.Inst_Task_Desc,
Instr_IsActive:event.Instr_IsActive,
Instr_IsDelete: event.Instr_IsDelete,
Instr_Price_Text: event.Instr_Price_Text,
Instr_Qty: event.Instr_Qty,
Instr_Qty_Text: event.Instr_Qty_Text,
Instr_Task_Comment: event.Instr_Task_Comment,
Instr_Task_Id: event.Instr_Task_Id,
Instr_Task_Name: event.Instr_Task_Name,
Instr_Task_pkeyId: event.Instr_Task_pkeyId,
Instr_Total_Text: event.Instr_Total_Text,
Instr_ValType: event.Instr_ValType,
Instr_WO_Id: event.Instr_WO_Id,
Instr_pkeyId: event.Instr_pkeyId,
UserID: event.UserID,
}

const index = this.InstDataArray.indexOf(event);
this.InstDataArray[index] = data;
//this.InstDataArray.push(data);

}
backInsdropdown(item){

  let data = {
    Inst_Comand_Mobile_details: item.Inst_Comand_Mobile_details,
    Inst_Task_Name: item.Inst_Task_Name,
    Inst_Task_Type_pkeyId: item.Inst_Task_Type_pkeyId,
    Instr_Action: item.Instr_Action,
    Instr_Ch_pkeyId: item.Instr_Ch_pkeyId,
    Instr_Client_Price: item.Instr_Client_Price,
    Instr_Client_Total:item.Instr_Client_Total,
    Instr_Comand_Mobile: item.Instr_Comand_Mobile,
    Instr_Contractor_Price: item.Instr_Contractor_Price,
    Instr_Contractor_Total: item.Instr_Contractor_Total,
    Instr_Details_Data: item.Instr_Details_Data,
    Instr_IsActive: item.Instr_IsActive,
    Instr_IsDelete: item.Instr_IsDelete,
    Instr_Other_Task_Name: item.Instr_Other_Task_Name,
    Instr_Price_Text: item.Instr_Price_Text,
    Instr_Qty: item.Instr_Qty,
    Instr_Qty_Text: item.Instr_Qty_Text,
    Instr_Task_Comment:item.Instr_Task_Comment,
    Instr_Task_Id:item.Instr_Task_Id,
    Instr_Task_Name: "",
    Instr_Task_pkeyId: 0,
    Instr_Total_Text: item.Instr_Total_Text,
    Instr_ValType: item.Instr_ValType,
    Instr_WO_Id: item.Instr_WO_Id,
    Instr_pkeyId: item.Instr_pkeyId,
    TMF_Task_FileName: item.TMF_Task_FileName,
    TMF_Task_localPath: item.TMF_Task_localPath,
    Task_Name: item.Task_Name,
  }

  const index = this.InstDataArray.indexOf(item);
  this.InstDataArray[index] = data;
}
taskcommentdata(item,indx) {
  if (indx > 0) {
    [this.InstDataArray[indx-1], this.InstDataArray[indx]] = [this.InstDataArray[indx], this.InstDataArray[indx-1]]
  }
}
InstRemove(item, index) {
  let promp = confirm("Are you Sure you want to  Delete this Record..?");
  if (promp) {
    if (item.Instr_pkeyId != "") {
      this.ClientResultInstructionModelObj.Instr_pkeyId = item.Instr_pkeyId;
      this.ClientResultInstructionModelObj.Instr_WO_Id = item.Instr_WO_Id;
      this.ClientResultInstructionModelObj.Type = 4;
      this.xClientResultInstructionServices
        .DeleteInstructionPost(this.ClientResultInstructionModelObj)
        .subscribe(response => {
          this.GetInstuctionDataMain()
        });
    }
    else {
      this.InstDataArray.splice(index, 1);
    }
  }
  if (this.InstDataArray.length == 0) {
    // this.AddMoreInstruction();
  }
}
}
