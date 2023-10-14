import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ClientResultInstructionModel,
  SigleEditBoxModel,
  InstructionMasterTaskModel,
  InstructionMasterDrDNameModel,
} from '../../pages/client-result/client-result-instruction/client-result-instruction-model';
import { ClientResultInstructionServices } from '../../pages/client-result/client-result-instruction/client-result-instruction.service';
import * as $ from 'jquery';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'iplapp-task-table',
  template: `
    <table id="table" class="table table-striped module-box">
      <thead>
        <tr>
          <th rowspan="2">Task Type</th>
          <th rowspan="2">Task Name</th>
          <th rowspan="2">Qty</th>
          <th
            colspan="2"
            style="background-color:#b6babf;"
            [hidden]="processorh"
          >
            Contractor
          </th>
          <th
            colspan="2"
            style="background-color:#dcdcdc;"
            [hidden]="OfficeResulth"
          >
            Client
          </th>
          <th rowspan="2">Comments</th>
          <th rowspan="2">Action</th>
        </tr>
        <tr>
          <th style="background-color:#b6babf;" [hidden]="processorh">Price</th>
          <th style="background-color:#b6babf;" [hidden]="processorh">
            Total Price
          </th>
          <th style="background-color:#dcdcdc;" [hidden]="OfficeResulth">
            Price
          </th>
          <th style="background-color:#dcdcdc;" [hidden]="OfficeResulth">
            Total Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of InstructionDataArray; index as indx">
          <td style="width: 10%;">
            <select
              id="TaskType"
              class="form-control form-control-sm"
              [(ngModel)]="item.Instr_Task_pkeyId"
            >
              <option value="0">select</option>
              <option
                [ngValue]="kb.Inst_Task_pkeyId"
                *ngFor="let kb of taskTypeNameArrayNew"
              >
                {{ kb.Inst_Task_Name }}
              </option>
            </select>
            <div *ngIf="item.Instr_Task_pkeyId == 0" [hidden]="taskType">
              <span style="color: red;font-size: 9px;">{{ taskreq }}</span>
            </div>
          </td>
          <td style="width: 30%;">
            <div class="example-wrapper">
              <kendo-dropdownlist
                class="form-control form-control-sm"
                [data]="drptaskList"
                [defaultItem]="defaultTaskItem"
                [filterable]="true"
                [textField]="'Task_Name'"
                [valueField]="'Task_pkeyID'"
                (filterChange)="taskFilter($event)"
                [(ngModel)]="item.Instr_Task_Name"
                [valuePrimitive]="true"
                [ngModelOptions]="{ standalone: true }"
                (valueChange)="TaskNameMetaData_Method(item,indx)"
              >
              </kendo-dropdownlist>
            </div>
            <div *ngIf="item.Instr_Task_Name == 0" [hidden]="taskType">
              <span style="color: red;font-size: 9px;">{{ taskreq }}</span>
            </div>
          </td>
          <td style="width: 10%;">
         
            <input
              type="text"
              placeholder="Enter Qty"
              (blur)="ClinetResultQtyInstrucation_Method()"
              (keypress)="validate($event)"
              [(ngModel)]="item.Instr_Qty"
              class="form-control form-control-sm"
            />
          </td>
          <td
            style="background-color:#b6babf; width: 10%;"
            [hidden]="processorh"
          >
            <div class="inputWithIcon inputIconBg">
              <input
                type="text"
                (blur)="ClinetResultInstCont_Price_Method()"
                (keypress)="validate($event)"
                [(ngModel)]="item.Instr_Contractor_Price"
                placeholder=" Enter Contractor Price"
                class="form-control form-control-sm"
                [disabled]="item.isBidPriceDisable"
              />
              <i class="fa fa-dollar-sign" aria-hidden="true"></i>
              <div *ngIf="item.isBidPriceDisable" class="Mydropdown">
                Price can not be changed.
              </div>
            </div>
          </td>
          <td
            style="background-color:#b6babf; width: 10%;"
            [hidden]="processorh"
          >
            <div class="inputWithIcon inputIconBg">
              <input
                type="text"
                [(ngModel)]="item.Instr_Contractor_Total"
                placeholder="Contractor Price"
                [disabled]="true"
                class="form-control form-control-sm"
              />
              <i class="fa fa-dollar-sign" aria-hidden="true"></i>
            </div>

          </td>
          <td
            style="background-color:#dcdcdc; width: 10%;"
            [hidden]="OfficeResulth"
          >
            <div class="inputWithIcon inputIconBg">
              <input
                type="text"
                (blur)="ClinetResultInstClient_Price_Method()"
                (keypress)="validate($event)"
                [(ngModel)]="item.Instr_Client_Price"
                placeholder="Enter Client Price"
                class="form-control form-control-sm"
                [disabled]="item.isBidPriceDisable"
              />
              <i class="fa fa-dollar-sign" aria-hidden="true"></i>
              <div *ngIf="item.isBidPriceDisable" class="Mydropdown">
                Price can not be changed.
              </div>
            </div>
          </td>
          <td
            style="background-color:#dcdcdc; width: 10%;"
            [hidden]="OfficeResulth"
          >
            <div class="inputWithIcon inputIconBg">
              <input
                type="text"
                [(ngModel)]="item.Instr_Client_Total"
                placeholder="Client Price"
                [disabled]="true"
                class="form-control form-control-sm"
              />
              <i class="fa fa-dollar-sign" aria-hidden="true"></i>
            </div>
          </td>
          <td><textarea [(ngModel)]="item.Instr_Task_Comment"> </textarea></td>
          <td style="width: 10%">
            <span
              ><a
                [href]="item.TMF_Task_localPath"
                target="_blank"
                [download]="item.TMF_Task_localPath"
                ><i class="fas fa-file-pdf" style="color: black;"></i> </a
            ></span>
            &nbsp;
            <span
              ><a href="javascript:void(0)" class="up" (click)="upmethod()">
                <i class=" fas fa-arrow-up" style="color: black;"></i></a></span
            >&nbsp;
            <span
              ><a href="javascript:void(0)" class="down" (click)="upmethod()">
                <i
                  class=" fas fa-arrow-down"
                  style="color: black;"
                ></i></a></span
            >&nbsp;&nbsp;
            <span
              ><a
                href="javascript:void(0)"
                (click)="InstructionRemove(item, indx)"
              >
                <i class="fa fa-trash" style="color: black;"></i></a
            ></span>
          </td>
        </tr>
        <!--test-->
      </tbody>
      <tfoot>
        <tr>
        <th rowspan="2"></th>
          <th rowspan="2"></th>
          <th rowspan="2"></th>
          <th style="width: 10%;"[hidden]="processorh"></th>
          <th style="width: 10%;"[hidden]="processorh">
          <!-- <div class="inputWithIcon inputIconBg" style="width: 89%;">
            <input type="text" [disabled]="true" [(ngModel)]="contractorTotalPriceSum" [value]="getTaskFooterSum()" class="form-control form-control-sm textbox-as-label">
          </div> -->
          <div class="inputWithIcon inputIconBg">
              <input
                type="text"
                [disabled]="true"
                [(ngModel)]="contractorTotalPriceSum"
                [value]="getTaskFooterSum()"
                
                class="form-control form-control-sm textbox-as-label"
                style="padding-left:0px !important"
              />
              <i class="fa fa-dollar-sign" aria-hidden="true" style="background-color:white;color:#aaa"></i>
            </div>
        </th>
          <th style="width: 10%;" [hidden]="OfficeResulth"></th>
          <th style="width: 10%;" [hidden]="OfficeResulth">
          <!-- <div class="inputWithIcon inputIconBg" style="width: 89%;">
            <input type="text" [disabled]="true" [(ngModel)]="clientTotalPriceSum" [value]="getTaskFooterSum()" class="form-control form-control-sm textbox-as-label">
          </div> -->
          <div class="inputWithIcon inputIconBg">
              <input
                type="text"
                [disabled]="true"
                [(ngModel)]="clientTotalPriceSum"
                [value]="getTaskFooterSum()"
                
                class="form-control form-control-sm textbox-as-label"
                style="padding-left:0px !important"
              />
              <i class="fa fa-dollar-sign" aria-hidden="true" style="background-color:white;color:#aaa"></i>
            </div>
          </th>
          <th rowspan="2"></th>
          <th rowspan="2"></th>
          </tr>
      </tfoot>
    </table>
    <div class="row">
      <div class="col-3">
        <button
          id="client_viewdetail_1"
          type="button"
          class="btn btn-primary"
          (click)="AddMoreInstruction()"
        >
          <i class="fas fa-plus-circle"></i> Add Task
        </button>
        <button
          id="client_viewdetail_1"
          class="btn btn-primary"
          type="button"
          (click)="ClientResultInstruCSumbit()"
          [disabled]="isLoading"
          style="margin-left:6px;"
        >
          <i
            class="fa"
            [ngClass]="{
              'fa-spin fa-spinner': isLoading,
              'fa-save': !isLoading
            }"
          ></i>
          {{ button }}
        </button>
      </div>
    </div>
  `,
  styles: [``],
})
export class IplAppTaskTable implements OnInit {
  @Input() workOrderId;
  @Output() clickSave = new EventEmitter();

  processorh: boolean = false;
  OfficeResulth: boolean = false;
  InstructionMasterTaskModelObj: InstructionMasterTaskModel =
    new InstructionMasterTaskModel();
  InstructionMasterDrDNameModelObj: InstructionMasterDrDNameModel =
    new InstructionMasterDrDNameModel();
  InstructionDataArray: Array<any> = [];
  taskTypeNameArrayNew: Array<any> = [];
  taskType: boolean = false;
  taskreq: string;
  TaskNameArray: Array<any> = [];
  ClientResultInstructionModelObj: ClientResultInstructionModel =
    new ClientResultInstructionModel();
  documentdetailslst: Array<any>;
  DetailsDataArray: Array<any>;
  InstDataArray: Array<any>;
  SigleEditBoxModelObj: SigleEditBoxModel = new SigleEditBoxModel();
  ModelObj: any;
  isLoading: boolean = false;
  button: string = 'Save';
  public drptaskList: Array<string>;
  public defaultTaskItem: { Task_Name: string; Task_pkeyID: number } = {
    Task_Name: 'Select',
    Task_pkeyID: 0,
  };
  rowCount_Task=0
  contractorTotalPriceSum=0.00;
  clientTotalPriceSum=0.00;
  constructor(
    private xClientResultInstructionService: ClientResultInstructionServices
  ) {}

  ngOnInit() {
    this.getdropdownTaskName();
    this.getdropdownTaskTypeName();
    // this.AddMoreInstruction();
  }

  getdropdownTaskTypeName() {
    this.xClientResultInstructionService
      .InstructionTaskTypeName(this.InstructionMasterTaskModelObj)
      .subscribe((response) => {
        let taskArray: Array<any> = response[0];
        for (let i = 0; i < taskArray.length; i++) {
          if (taskArray[i].Inst_Task_Type_pkeyId == 1) {
            let taskTypedata = taskArray[i];
            this.taskTypeNameArrayNew.push(taskTypedata);
          }
        }
      });
  }

  getdropdownTaskName() {
    this.InstructionMasterDrDNameModelObj.WorkOrderID = this.workOrderId;
    this.xClientResultInstructionService
      .InstructionTaskNamedata(this.InstructionMasterDrDNameModelObj)
      .subscribe((response) => {
        this.TaskNameArray = response[0];
        this.drptaskList = this.TaskNameArray;
        this.GetInstuctionDataMain();
      });
  }

  AddMoreInstruction() {
    let data = {
      Instr_pkeyId: 0,
      Instr_Task_Id: 0,
      Instr_Task_pkeyId: 0,
      Instr_WO_Id: 0,
      Instr_Task_Name: 0,
      Instr_Qty: 1,
      Instr_Contractor_Price: '0.00',
      Instr_Client_Price: '0.00',
      Instr_Contractor_Total: '0.00',
      Instr_Client_Total: '0.00',
      Instr_Action: 0,
      Instr_IsActive: true,
      Instr_IsDelete: false,
      UserID: 0,
      Instr_Details_Data: '',
      Instr_ValType: 1,
      Instr_Qty_Text: 0,
      Instr_Price_Text: 0,
      Instr_Total_Text: 0,
      Instr_Ch_pkeyId: 0,
      Instr_Task_Comment: '',
      Inst_Comand_Mobile_details: '',
      isBidPriceDisable: false,
    };
    this.InstructionDataArray.push(data);
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

  ClinetResultQtyInstrucation_Method() {
    for (let i = 0; i < this.InstructionDataArray.length; i++) {
      if (this.InstructionDataArray[i].Instr_Qty != '') {
        this.InstructionDataArray[i].Instr_Contractor_Total =
          this.InstructionDataArray[i].Instr_Contractor_Price *
          this.InstructionDataArray[i].Instr_Qty;
        this.InstructionDataArray[i].Instr_Client_Total =
          this.InstructionDataArray[i].Instr_Client_Price *
          this.InstructionDataArray[i].Instr_Qty;
      } else {
        this.InstructionDataArray[i].Instr_Qty = 1;
        this.InstructionDataArray[i].Instr_Contractor_Total =
          this.InstructionDataArray[i].Instr_Contractor_Price;
        this.InstructionDataArray[i].Instr_Client_Total =
          this.InstructionDataArray[i].Instr_Client_Price;
      }
    }
  }

  ClinetResultInstCont_Price_Method() {
    for (let i = 0; i < this.InstructionDataArray.length; i++) {
      if (this.InstructionDataArray[i].Instr_Contractor_Price != '') {
        this.InstructionDataArray[i].Instr_Contractor_Total =
          this.InstructionDataArray[i].Instr_Contractor_Price;
        if (this.InstructionDataArray[i].Instr_Qty != '') {
          this.InstructionDataArray[i].Instr_Contractor_Total =
            this.InstructionDataArray[i].Instr_Contractor_Price *
            this.InstructionDataArray[i].Instr_Qty;
        }
      } else {
      }
    }
  }

  ClinetResultInstClient_Price_Method() {
    for (let i = 0; i < this.InstructionDataArray.length; i++) {
      if (this.InstructionDataArray[i].Instr_Client_Price != '') {
        this.InstructionDataArray[i].Instr_Client_Total =
          this.InstructionDataArray[i].Instr_Client_Price;
        if (this.InstructionDataArray[i].Instr_Qty != '') {
          this.InstructionDataArray[i].Instr_Client_Total =
            this.InstructionDataArray[i].Instr_Client_Price *
            this.InstructionDataArray[i].Instr_Qty;
        }
      } else {
      }
    }
  }

  InstructionRemove(item, index) {
    this.InstructionDataArray.splice(index, 1);
    if (this.InstructionDataArray.length == 0) {
      this.AddMoreInstruction();
    }
  }

  TaskNameMetaData_Method(item,indx) {
    for (let i = 0; i < this.InstructionDataArray.length; i++) {
      if (
        this.InstructionDataArray[i].Instr_Task_Name == item.Instr_Task_Name
      ) {
        for (let j = 0; j < this.TaskNameArray.length; j++) {
          if (this.TaskNameArray[j].Task_pkeyID == item.Instr_Task_Name) {
            if(i==indx)
            {
            this.InstructionDataArray[i].Instr_Contractor_Price =
              this.TaskNameArray[j].Task_Contractor_UnitPrice;
            this.InstructionDataArray[i].Instr_Client_Price =
              this.TaskNameArray[j].Task_Client_UnitPrice;
            }
            
            this.UpdateBidPriceDisable(this.InstructionDataArray[i]);
          
            }
          
        }
      }
    }
    this.ClinetResultQtyInstrucation_Method();
  }

  upmethod() {
    $(document).ready(function () {
      $('.up,.down').click(function () {
        var row = $(this).parents('tr:first');
        if ($(this).is('.up')) {
          row.insertBefore(row.prev());
        } else {
          row.insertAfter(row.next());
        }
      });
    });
  }

  ClientResultInstruCSumbit() {
    //debugger;
    let errCnt = 0;
    this.InstructionDataArray.forEach((item) => {
      item.Instr_Task_Id = item.Instr_Task_Name;
      if (item.Instr_Task_pkeyId == 0 || item.Instr_Task_Name == 0) {
        errCnt = errCnt + 1;
      }
    });

    if (errCnt > 0) {
      this.taskType = false;
      this.taskreq = 'This field is required..';
      return;
    } else {
      this.taskType = true;
      this.clickSave.emit(JSON.stringify(this.InstructionDataArray));
    }
  }
  taskFilter(value) {
    if (value != '') {
      this.drptaskList = this.TaskNameArray.filter(
        (s) => s.Task_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else {
      this.drptaskList = this.TaskNameArray.slice();
    }
  }
  GetInstuctionDataMain() {
    // debugger;
    this.ClientResultInstructionModelObj.Instr_WO_Id = this.workOrderId;
    this.InstructionDataArray = [];
    this.DetailsDataArray = [];
    this.InstDataArray = [];
    this.xClientResultInstructionService
      .InstructionGetMain(this.ClientResultInstructionModelObj)
      .subscribe((response) => {
        this.documentdetailslst = response[2];
        if (response[0].length != 0) {
          this.documentdetailslst = response[2];

          for (let i = 0; i < response[0].length; i++) {
            if (response[0][i].Instr_ValType == 1) {
              const MainInst = response[0][i];
              MainInst.Instr_Contractor_Price = parseFloat(
                MainInst.Instr_Contractor_Price
              ).toFixed(2);
              MainInst.Instr_Client_Price = parseFloat(
                MainInst.Instr_Contractor_Price
              ).toFixed(2);
              MainInst.Instr_Contractor_Total = parseFloat(
                MainInst.Instr_Contractor_Price
              ).toFixed(2);
              MainInst.Instr_Client_Total = parseFloat(
                MainInst.Instr_Client_Total
              ).toFixed(2);
              this.UpdateBidPriceDisable(MainInst);
              this.InstructionDataArray.push(MainInst);
            }

            if (response[0][i].Instr_ValType == 2) {
              const DetailsArr = response[0][i];

              this.DetailsDataArray.push(DetailsArr);
            }

            if (response[0][i].Instr_ValType == 3) {
              const InstArr = response[0][i];
              InstArr.Instr_Price_Text = parseFloat(
                InstArr.Instr_Price_Text
              ).toFixed(2);
              InstArr.Instr_Total_Text = parseFloat(
                InstArr.Instr_Total_Text
              ).toFixed(2);
              this.InstDataArray.push(InstArr);
            }
          }
        }
        if (response[1][0] && response[1][0].length != 0) {
          this.SigleEditBoxModelObj.Inst_Ch_pkeyId =
            response[1][0].Inst_Ch_pkeyId;
          this.SigleEditBoxModelObj.Inst_Ch_Wo_Id =
            response[1][0].Inst_Ch_Wo_Id;
          this.SigleEditBoxModelObj.Inst_Ch_Text = response[1][0].Inst_Ch_Text;
          this.SigleEditBoxModelObj.Inst_Ch_IsActive =
            response[1][0].Inst_Ch_IsActive;
          this.SigleEditBoxModelObj.Inst_Ch_Delete =
            response[1][0].Inst_Ch_Delete;
          this.SigleEditBoxModelObj.UserID = response[1][0].UserID;
        }
        if (
          this.InstructionDataArray != undefined &&
          this.InstructionDataArray.length == 0
        ) {
          this.AddMoreInstruction();
        }
        if (this.InstDataArray != undefined && this.InstDataArray.length == 0) {
        }
      });
  }
  UpdateBidPriceDisable(item) {
    // var getSelectedTask = this.TaskNameArray.filter(
    //   (x) => x.Task_pkeyID === item.Instr_Task_Name
    // );
    // item.isBidPriceDisable =
    //   item.Instr_Task_pkeyId == 3 && getSelectedTask.length > 0
    //     ? getSelectedTask[0].Task_Disable_Default
    //     : false;

    var getSelectedTask = this.TaskNameArray.filter(
      (x) => x.Task_pkeyID === item.Instr_Task_Name
    );
    item.isBidPriceDisable =
      item.Instr_Task_pkeyId == 3 && getSelectedTask.length > 0
        ? getSelectedTask[0].Task_Price_Edit
        : false;
  }
  getTaskFooterSum(){
    this.contractorTotalPriceSum =(this.InstructionDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Contractor_Total), 0)).toFixed(2);
    this.clientTotalPriceSum =(this.InstructionDataArray.reduce((accumulator, current) => parseFloat(accumulator) + parseFloat(current.Instr_Client_Total), 0)).toFixed(2);

    this.rowCount_Task=this.InstructionDataArray.length;
  }
}
