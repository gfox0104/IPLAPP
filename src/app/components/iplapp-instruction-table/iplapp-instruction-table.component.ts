import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  ClientResultInstructionModel,
  InstructionMasterTaskModel,
  SigleEditBoxModel,
} from '../../pages/client-result/client-result-instruction/client-result-instruction-model';
import { ClientResultInstructionServices } from "../../pages/client-result/client-result-instruction/client-result-instruction.service";

@Component({
  selector: 'iplapp-instruction-table',
  template: `
    <table class=" module-box" style="text-align: center;width:100%">
      <tr  *ngFor="let item of InstDataArray;index as indx">
        <td style="width: 30%;">

          <kendo-dropdownlist class="form-control form-control-sm"
          [data]="InstrDrpList"
          [defaultItem]="defaultInsTaskItem"
          [filterable]="true"
          [textField]="'Inst_Task_Name'"
          [valueField]="'Inst_Task_pkeyId'"
          (filterChange)="InstTaskList2Filter($event)"
          [(ngModel)]="item.Instr_Task_pkeyId"
          [valuePrimitive]="true"
          [ngModelOptions]="{standalone: true}"
          (valueChange) = "onSelectChange(item, indx)"
         >
          </kendo-dropdownlist>

          <div *ngIf="item.Instr_Task_pkeyId == 0" [hidden]="taskType">
            <span style="color: red;font-size: 9px;">{{taskreq}}</span></div>
        </td>
        <td  colspan="3">
          <kendo-editor [(ngModel)]="item.Instr_Details_Data"></kendo-editor>
        </td>
        <td>
          <div style="width:5rem">Qty</div>
          <input type="text" (blur)="ClinetResultQtyInstrucationISTRUNEW_Method()"
            [(ngModel)]="item.Instr_Qty_Text" style="width: 90px; text-align: center" (keypress)="validate($event)"
            placeholder="Qty" class="form-control form-control-sm">
        </td>
        <td>
          <div style="width:5rem">Price</div>
          <input type="text" (blur)="ClinetResultPriceInstrucationISTRUNEW_Method()"
            [(ngModel)]="item.Instr_Price_Text" style="width: 90px;text-align: center" (keypress)="validate($event)"
            placeholder="Price" class="form-control form-control-sm">
        </td>
        <td>
          <div style="width:5rem">Total</div>
          <input type="text" [(ngModel)]="item.Instr_Total_Text" [disabled]="true"
            (keypress)="validate($event)" style="width: 90px;text-align: center" placeholder="Total"
            class="form-control form-control-sm">
        </td>
        <td style="width: 10%;">
          <span><a href="javascript:void(0)"><i class="fa fa-arrow-up" (click)="taskcommentdata(item)"
                style="color: black;" aria-hidden="true"></i> </a></span>
          &nbsp;
          <span><a href="javascript:void(0)"><i class="fa fa-eye" style="color: black;"></i> </a></span>
          &nbsp;
          <span><a href="javascript:void(0)" (click)='InstRemove(item,indx)'> <i class="fa fa-trash"
                style="color: black;"></i></a></span>
        </td>
      </tr>
    </table>
    <div class="mt-1">
      <button type="button" id="client_viewdetail_1" class="btn btn-primary" (click)='AddMoreInstruction()'><i
          class="fas fa-plus-circle"></i> Add Instruction</button>
      <button type="button" id="client_viewdetail_1" class="btn btn-primary"
        (click)='ClientResultInstruCSumbit()' [disabled]="isLoading" style="margin-left: 6px;">
        <i class="fa" [ngClass]="{'fa-spin fa-spinner': isLoading, 'fa-save': !isLoading}"></i>
        {{button}}</button>
    </div>
  `
})

export class IplAppInstructionTable implements OnInit {
  @Input() workOrderId;
  @Output() clickSave = new EventEmitter;

  InstDataArray: Array<any> = [];
  taskTypeNameArrayNewTwo: Array<any> = [];
  taskType: boolean = false;
  taskreq: string;
  instcom: any;
  ClientResultInstructionModelObj: ClientResultInstructionModel = new ClientResultInstructionModel();
  InstructionMasterTaskModelObj: InstructionMasterTaskModel = new InstructionMasterTaskModel();
  isLoading: boolean = false;
  button: string = 'Save';
  InstrDrpList = [];


  SigleEditBoxModelObj: SigleEditBoxModel = new SigleEditBoxModel();
  public defaultInsTaskItem: { Inst_Task_Name: string, Inst_Task_pkeyId: number } = { Inst_Task_Name: 'Select', Inst_Task_pkeyId: 0 };
  constructor(
    private xClientResultInstructionService: ClientResultInstructionServices
  ) {

  }

  ngOnInit() {
    this.getdropdownTaskTypeName();
    // this.AddMoreInstruction();
  }




  getdropdownTaskTypeName() {
    this.xClientResultInstructionService
      .InstructionTaskTypeName(this.InstructionMasterTaskModelObj)
      .subscribe(response => {
        //debugger;
        const taskArray = response[0];
        this.taskTypeNameArrayNewTwo = response[1];
        this.InstrDrpList = response[1];
        this.GetInstuctionDataMain();

      });
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

  AddMoreInstruction() {
    let data = {
      Instr_pkeyId: 0,
      Instr_Task_Id: 0,
      Instr_Task_pkeyId: 0,
      Instr_WO_Id: 0,
      Instr_Task_Name: 0,
      Instr_Qty: 1,
      Instr_Action: 0,
      Instr_IsActive: true,
      Instr_IsDelete: false,
      UserID: 0,
      Instr_Contractor_Price: 0,
      Instr_Client_Price: 0,
      Instr_Contractor_Total: 0,
      Instr_Client_Total: 0,
      Instr_Details_Data: "",
      Instr_ValType: 3,
      Instr_Qty_Text: 0,
      Instr_Price_Text: "0.00",
      Instr_Total_Text: "0.00",
      Instr_Ch_pkeyId: 0,
      Instr_Task_Comment: "",
      Inst_Comand_Mobile_details: '',
    };

    this.InstDataArray.push(data);
  }

  ClinetResultQtyInstrucationISTRUNEW_Method() {
    for (let i = 0; i < this.InstDataArray.length; i++) {
      if (this.InstDataArray[i].Instr_Qty_Text != "") {
        this.InstDataArray[i].Instr_Total_Text = this.InstDataArray[i].Instr_Price_Text * this.InstDataArray[i].Instr_Qty_Text;
      } else {
        this.InstDataArray[i].Instr_Total_Text = this.InstDataArray[i].Instr_Price_Text;
        this.InstDataArray[i].Instr_Qty_Text = 1;
      }
    }
  }

  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  ClinetResultPriceInstrucationISTRUNEW_Method() {

    for (let i = 0; i < this.InstDataArray.length; i++) {
      if (this.InstDataArray[i].Instr_Price_Text != "") {
        this.InstDataArray[i].Instr_Total_Text = this.InstDataArray[i].Instr_Price_Text;

        if (this.InstDataArray[i].Instr_Qty_Text != "") {
          this.InstDataArray[i].Instr_Total_Text = this.InstDataArray[i].Instr_Price_Text * this.InstDataArray[i].Instr_Qty_Text;
        }
      } else {

      }
    }
  }

  taskcommentdata(item) {
    this.removeTags(item.Instr_Details_Data);
    let taskcomm = this.instcom;

    let data = {
      Instr_pkeyId: 0,
      Instr_Task_Id: 0,
      Instr_Task_pkeyId: 0,
      Instr_WO_Id: 0,
      Instr_Task_Name: 0,
      Instr_Qty: 1,
      Instr_Contractor_Price: 0,
      Instr_Client_Price: 0,
      Instr_Contractor_Total: 0,
      Instr_Client_Total: 0,
      Instr_Action: 0,
      Instr_IsActive: true,
      Instr_IsDelete: false,
      UserID: 0,
      Instr_Details_Data: "",
      Instr_ValType: 3,
      Instr_Qty_Text: 0,
      Instr_Price_Text: 0,
      Instr_Total_Text: 0,
      Instr_Ch_pkeyId: 0,
      Instr_Task_Comment: taskcomm,
    };


  }

  removeTags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return this.instcom = str.replace(/(<([^>]+)>)/ig, '');
  }

  InstRemove(item, index) {
    this.InstDataArray.splice(index, 1);
    if (this.InstDataArray.length == 0) {
      this.AddMoreInstruction();
    }
  }

  ClientResultInstruCSumbit() {
    this.InstDataArray.forEach(item => {
      if (item.Instr_Task_pkeyId == 0) {
        this.taskType = false;
        this.taskreq = 'This field is required..'
        return;
      } else {
        this.taskType = true;
      }
    });

    if (!this.taskType) return;
    this.clickSave.emit(JSON.stringify(this.InstDataArray));
  }
  onSelectChange(item,idx) {
    //debugger
    let task = this.taskTypeNameArrayNewTwo.find(titem => titem.Inst_Task_pkeyId == item.Instr_Task_pkeyId);
    this.InstDataArray[idx].Instr_Details_Data = task.Inst_Task_Desc
  }
  GetInstuctionDataMain() {
    this.ClientResultInstructionModelObj.Instr_WO_Id = this.workOrderId;
    this.InstDataArray = [];
    this.xClientResultInstructionService
      .InstructionGetMain(this.ClientResultInstructionModelObj)
      .subscribe(response => {
        // debugger;
        // this.GetInstructionDropdown();
        // console.log('instruction',response)
        if (response[0].length != 0) {
          for (let i = 0; i < response[0].length; i++) {
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
        if (this.InstDataArray != undefined && this.InstDataArray.length == 0  ) {
          this.AddMoreInstruction();
        }

      });
    // this.GetInstructionAcessdata();
  }
}
