import { Component, OnInit } from '@angular/core';
import { TaskServices } from './task-service';

import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Task } from './task-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { finalize } from 'rxjs/operators';
import { BidInvoiceItemServices } from '../../bid-invoice-task/bid-invoice-item/bid-invoice-item.service';
import { WorkOrderDrodownServices } from 'src/app/pages/services/common-drop-down/drop-down.service';
import { AccountingServices } from '../accounting-details.service';
@Component({
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  isHelpActive = false;

  Task: Task = new Task();
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string; // custom msg
  isLoading: boolean = false;
  button: string = 'Save';
  Task_Type_List = [];
  TaskList = [];
  TaskGroupList: any;
  TaskUOMList: any;
  IsLoad: boolean = false;
  constructor(
    private taskServices: TaskServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xBidInvoiceItemServices: BidInvoiceItemServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    public AccountingServices: AccountingServices
  ) {}
  ngOnInit(): void {
    const self = this;
    this.formUsrCommonGroup = this.formBuilder.group({
      Task_Name: ['', Validators.required],
      Task_Contractor_UnitPrice: ['', Validators.required],
      Task_Client_UnitPrice: ['', Validators.required],
      //journalref: ['', Validators.required],
    });
    this.Task_Type_List = [
      { Id: 1, Name: 'work' },
      { Id: 2, Name: 'inspection' },
    ];
    this.GetTaskGroup();
    this.getOUMDropdown();
    this.GetGridData();
  }
  GetTaskGroup() {
    this.xBidInvoiceItemServices
      .GetTaskGroupDetailsDropdownGet()
      .subscribe((response) => {
        this.TaskGroupList = response[0];
      });
  }
  addNewTask(TaskFORM) {
    this.Task = new Task();
    this.open(TaskFORM);
  }
  getOUMDropdown() {
    this.xWorkOrderDrodownServices.DropdownGetUOM().subscribe((response) => {
      this.TaskUOMList = response[0];
    });
  }
  GetGridData() {
    this.IsLoad = true;
    this.taskServices
      .GetTaskall()
      .pipe(finalize(() => (this.IsLoad = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.TaskList = result.Data[0];
        }
      });
  }
  RemovewhiteSpace(event, field) {
    this.Task[field] = this.AccountingServices.RemoveWhiteSpace(
      event.target.value
    );
  }
  deleteDetails(Id) {
    var cfrm = confirm('Are you Sure you want to  Delete this Record...!');
    if (cfrm == true) {
      this.taskServices.DeleteTask(Id).subscribe((response) => {
        if (response.HttpStatusCode == 200) {
          this.GetGridData();
        }
        this.commonMessage(response.Message);
      });
    }
  }
  editDetails(Id, TaskFORM) {
    //dfebugger;
    this.taskServices.GetTask(Id).subscribe((result) => {
      if (
        result.HttpStatusCode == 200 &&
        result.Data != null &&
        result.Data.length > 0
      ) {
        this.Task = result.Data[0][0];
        this.open(TaskFORM);
      }
    });
  }
  open(content) {
    this.xmodalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  close() {
    this.xmodalService.dismissAll();
    this.reset();
  }
  reset() {
    this.Task = new Task();
  }
  checkChangeTask(dataItem) {
    this.Task.Acc_Task_pkeyId = dataItem.Acc_Task_pkeyId;
    this.Task.Task_IsActive = !dataItem.Task_IsActive;
    this.Task.Type = 3;
    this.taskServices.CreateUpdateTask(this.Task).subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.commonMessage('Service Status Updated..');
        this.GetGridData();
      } else {
        this.commonMessage(result.Message);
      }
    });
  }

  FormButtonPOPUp(taskEditForm) {
    if (taskEditForm.invalid) {
      return;
    }
    if (Number(this.Task.Task_Type) == 0) {
      return;
    }
    if (this.Task.Acc_Task_pkeyId == 0) {
      this.Task.Type = 1;
      this.Task.Task_IsActive = true;
    } else {
      this.Task.Type = 2;
    }
    this.button = 'Progressing..';
    this.isLoading = true;
    this.Task.Task_Photo_Label_Name = this.Task.Task_Name;
    this.taskServices
      .CreateUpdateTask(this.Task)
      .pipe(finalize(() => (this.isLoading = false)))
      .pipe(finalize(() => (this.button = 'Save')))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          this.GetGridData();
          this.close();
        }
        this.commonMessage(result.Message);
      });
  }

  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
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
  // common message modal popup
  commonMessage(Message) {
    const modalRef = this.xmodalService.open(IplAppModalContent, {
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.MessageFlag = Message;
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  commMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commMessage();
    }
  }

  DispalyInfo(event: Event, lblName)
  {    
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commMessage();
    }    
  }
}
