import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tabs } from './tabs';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ClientResultServices } from "../../client-result/client-result.service";
import { EventEmitterService } from '../../../../services/access/event-emitter.service';
import { TaskBidMasterModel } from "../../client-result/client-result-model";
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import {
  BidHistroyColumns,
  BidTask,
  CompletationHistroyColumns,
  DamageHistoryColumns,
  ApplianceHistoryColumns,
  ViolationHistoryColumns,
  HazardHistoryColumns,
  Damage,
  ClientInvoiceHistoryColumns,
  ContractorInvoiceHistoryColumns
} from '../constants';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { ClientService } from '../../client.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { ViolationTask } from '../constants/violation-task';
import { HazardTask } from '../constants/hazard-task';
import { HistoryActionTaskTypeEnum, HistoryActionTypeEnum, Task_Status_Damage_Violation_Hazard } from '../constants/Task_Status_Damage_Violation_Hazard';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';


@Component({
  selector: 'app-property-history',
  templateUrl: 'property-history.component.html',
  styleUrls: ['property-history.component.scss']
})



export class PropertyHistoryComponent implements OnInit {
  @Input() workOrderId: any;
  public grid: GridComponent;
  @ViewChild('gridUser', { static: false }) gridUser: GridComponent;
  pasthistory: any;
  taskcompletion: any;
  taskAppliance: any;
  taskDamage: any;
  state: any;
  taskbid: Array<any> = [];
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  tabs = Tabs;
  historyColumns = _.cloneDeep(BidHistroyColumns);
  compHistoryColumns = _.cloneDeep(CompletationHistroyColumns);
  damageHistoryColumns = DamageHistoryColumns;
  applianceHistoryColumns = ApplianceHistoryColumns;
  isLoading: boolean = false;
  ClientResultBidArray: Array<any> = [];
  isSubmitted: boolean = false;
  checkedAll: boolean;

  ClientResultDamageArray: Array<any> = [];
  newBidtasks: Array<any> = [];
  newDamagetasks: Array<any> = [];
  workorderid: number;
  taskPhotos: Array<any> = [];
  hidePH = true;

  violationHistoryColumns = ViolationHistoryColumns;
  hazardHistoryColumns = HazardHistoryColumns;

  TaskViolationHistoryList: any;
  TaskHazardHistoryList: any;

  newViolationtasks: Array<any> = [];
  newHazardtasks: Array<any> = [];

  ClientResultViolationArray: Array<any> = [];
  ClientResultHazardArray: Array<any> = [];

  historyAction_TaskTypeEnum=HistoryActionTaskTypeEnum;
  historyActionTypeEnum=HistoryActionTypeEnum;
  TaskStatusModel: Task_Status_Damage_Violation_Hazard = new Task_Status_Damage_Violation_Hazard();
  currencySymbol=environment.currencySymbol;

  ContractorInvoicesList: any;
  ClientInvoicesList: any;
  maxpagecountval:any;
  WorkOrderCount: any;


  contractorInvoiceHistoryColumns = ContractorInvoiceHistoryColumns;
  clientInvoiceHistoryColumns = ClientInvoiceHistoryColumns;

  IsInvoiceVisiable=false;
  IsDataFetched=false;
  constructor(
    private modalService: NgbModal,
    private EncrDecr: EncrDecrService,
    private router: Router,
    private xClientResultServices: ClientResultServices,
    private eventEmitterService: EventEmitterService,
    private clientService: ClientService
  ) {
    this.tabs[7].hidden = true;
    this.tabs[8].hidden = true;
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      let decuser = JSON.parse(decval);

      if (decuser[0].GroupRoleId === 1) {
        this.tabs[7].hidden = false;
        this.tabs[8].hidden = false;
      }
      if (decuser[0].GroupRoleId === 2) {
        this.historyColumns.splice(7, 1);
        // this.compHistoryColumns.splice(6, 1);
        this.compHistoryColumns.splice(8, 1);
        this.tabs[1].hidden = true;
        this.tabs[3].hidden = true;
      } else if (decuser[0].GroupRoleId === 4) {
        this.historyColumns.splice(6, 1);
        this.compHistoryColumns.splice(5, 1);
      }
    }
    this.state = {

      take: 25,
      filter: { logic: 'and', filters: [{ field: 'workOrderNumber', operator: 'contains', value: '' }] },
      sort: [{ field: "", dir: "asc" }]
    };
  }

  ngOnInit() {
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(this.workOrderId));
    this.workorderid = parseInt(workOrderID);
    this.TaskBidMasterModelObj.workOrder_ID = this.workorderid;
    this.TaskBidMasterModelObj.Type = 1;
    this.checkedAll = false;
    this.GetPastHistory();
    this.clientResultTaskBidGetWorkOrderIdGet();
    
  }

  GetPastHistory() {
    debugger
    this.IsDataFetched=false;

    this.TaskBidMasterModelObj.NoofRows = this.NoofRowscoun;
      this.TaskBidMasterModelObj.Skip = 0;
      this.TaskBidMasterModelObj.PageNumber = 1;
      this.TaskBidMasterModelObj.Type = 1;
      this.TaskBidMasterModelObj.FilterData = this.filterdata;
    
    this.xClientResultServices
      .pastHistoryPost(this.TaskBidMasterModelObj)
      .subscribe(response => {
        console.log('response12',response)
        this.IsDataFetched=true;
        this.pasthistory = response[0];

        this.gridData = this.pasthistory;
        console.log('gridData12',this.gridData)
        this.taskbid = response[1][0];
        console.log('taskbid',this.taskbid)
        this.taskcompletion = response[1][1];
        this.taskDamage = response[1][2];
        this.taskAppliance = response[1][3];
        this.TaskViolationHistoryList = response[1][4];
        this.TaskHazardHistoryList = response[1][5];
        this.ContractorInvoicesList=response[1][6];
        this.ClientInvoicesList=response[1][7];

        this.cachedData[0] = this.gridData;

        var count  = response[2][0].workordercount;
        console.log('this.GlobalVariable',count)
        this. WorkOrderCount = response[2][0].workordercount;
        var maxpagecount = this. WorkOrderCount / this.NoofRowscoun
        this.maxpagecountval = Math.ceil(maxpagecount);
        console.log('this.GlobalVariable',this. WorkOrderCount)
       
        // this. WorkOrderCount =  Response[1][0].workordercount;
        // var maxpagecount = this. WorkOrderCount / this.NoofRowscoun
        // this.maxpagecountval = Math.ceil(maxpagecount);
        // this.typeval = 1;
        setTimeout(() => {
          /** spinner ends after 5 seconds */

      this.CachedData(1,this.NoofRowscoun,1);
    
      }, 5000);
        
      
      });
  }

  NoofRowscoun = 200
  pageSize = 200; // Number of items to display per page
   skip = 0; // Number of items to skip
  //  total = 0;
  PageValue = 1;

  typeval : number =1;
  
  public gridData: GridDataResult[] =[];
  

  loadGridData(pageNumber: number, noOfRows: number,buttontype: number): void {
    debugger
    const pageIndex = pageNumber;
  
    if (this.cachedData[pageIndex-1]) 
    {
      //this.gridData = this.cachedData[pageIndex-1];
      // this.getGridData(this.cachedData[pageIndex-1]);

      this.gridData = this.cachedData[pageIndex-1];
     
      // this.GetPastHistory(this.cachedData[pageIndex-1]);
      if(buttontype ==1)
      {  this.Nextbutton=true;
        if(this.maxpagecountval > this.cachedData.length )
        {
        
          setTimeout(() => {
            /** spinner ends after 5 seconds */
        this.CachedData(pageIndex,noOfRows, this.typeval);
      
      }, 5000);
      }
      else
      {
        if( pageIndex < this.maxpagecountval )
        {
        this.Nextbutton=false;
        }
      }
     }    
      
   
    } 
  }

  Previousbutton:boolean=true;
  Nextbutton:boolean=true;
  goToPreviousPage(): void {
    debugger
    this.PageValue -= 1;
    if(this.PageValue ==1)
    {
    // disable button
    this.Previousbutton = true;
     this.Nextbutton=false;
  }
  else
  {
    // Enable button
     this.Previousbutton = false;
     this.Nextbutton=false;
  }
    this.loadGridData(this.PageValue,this.pageSize,0);
    
}

// Nextbutton:boolean

  goToNextPage(): void {
    debugger
    this.PageValue += 1;
    if( this.PageValue >=this.maxpagecountval )
    {
      //Enable button
      this.Previousbutton = false;
      this.Nextbutton= true;
    }
    else
    {
      this.Previousbutton = false;
      this.Nextbutton=false;
      //disable button
    }
    this.loadGridData(this.PageValue,this.pageSize,1);
    
  }

  public cachedData: any[] = [];
  CachedData(pageNumber: number, noOfRows: number,Type:number): void {
    debugger;
    const pageIndex = pageNumber;
    let noofrows = this.NoofRowscoun;
     
      this.TaskBidMasterModelObj.NoofRows = noofrows;
      this.TaskBidMasterModelObj.Skip = this.skip;
      this.TaskBidMasterModelObj.PageNumber = pageIndex+1;
      this.TaskBidMasterModelObj.Type = 1;
      if( pageIndex <this.maxpagecountval )
      {
        this.xClientResultServices.pastHistoryPost(this.TaskBidMasterModelObj)
        .subscribe((result:GridDataResult) => {
          console.log('result',result)
          const newData = result[0];console.log('newdata',result[0])
          const mergedData = this.cachedData.reduce((acc, val) => acc.concat(val), []).concat(newData);
          const filterdata=  mergedData.filter((value, index, self) => self.findIndex(item => item.workOrder_ID === value.workOrder_ID) === index);
          const duplicateData = mergedData.filter((value, index, self) => self.findIndex(item => item.workOrder_ID === value.workOrder_ID) !== index);
          console.log('duplicateData',duplicateData);
          this.cachedData[pageIndex] = filterdata;
          this.Nextbutton=false;
          
        });

      }
  }

  public filtersval: FilterDescriptor[] = [];
  filtervaldata = [];
  filterdata:any;

  public onFilter(event: any): void 
  {
    debugger;
    // const filter: FilterDescriptor = event.Filter;
    const filter: FilterDescriptor = event.filters;
    this.filterdata=JSON.stringify(filter);
  }
  public runFilter(): void {
    debugger;
    this.GetPastHistory();
  }
  public onFilterChange(filter: FilterDescriptor): void {
    // Retrieve the filter information for the desired column
    debugger;
    const columnFilter = filter as FilterDescriptor;
    const filterval = []; 
    filterval.push(columnFilter);
    if (columnFilter) {
      // Apply your custom logic to handle the filter for the column
      if(this.filtersval.length==0)
      {
        this.filtersval.push(filterval[0].filters);
      } 
      else
      {
        const existingIndex = this.filtersval.findIndex(f => f[0].field === filterval[0].filters[0].field);
        if (existingIndex !== -1) {
          // If filter exists, update it
          this.filtersval[existingIndex] = filterval[0].filters;
        } else 
        {
          // If filter does not exist, insert it
          this.filtersval.push(filterval[0].filters);
        }
      }   
      
     //this.filtersval.push(filterval[0].filters);
      // Make the API call or perform any necessary action with the filter value
    }
  }

  dataStateChange(state: DataStateChangeEvent): void {
    debugger
   
 // this.filtervaldata.push(this.state.filter.filters)
  // Remove the filter from the state to prevent automatic filtering
  //state.filter = null;  
  this.state = state;
 }

 public pageChange(event: any): void {
  // this.skip = event.skip;
  // this.state.skip = this.skip;
  // this.gridUser.data = this.newarray;
}

filtersvals: CompositeFilterDescriptor = {
  logic: 'and',
  filters: []
};

resetFilters() {
  debugger
  // Make sure this.gridUser is defined before accessing its properties
  if (this.gridUser) {
    // Clear the custom filter value
    this.filtersvals.filters = [];

    // Reset the grid's filter value
    this.gridUser.filter = this.filtersvals;

    // Apply the changes to the grid
    this.gridUser.filterChange.emit(this.filtersvals);
    // this.dataStateChange(this.state);
    // this.GetPastHistory();
  }
 }



  clientResultTaskBidGetWorkOrderIdGet() {

      // Comment by Mahi -- 28-10-2020 for optimization

    // let tempModelObj = _.cloneDeep(this.TaskBidMasterModelObj)
    // tempModelObj.Type = 3;
    // tempModelObj.Task_Bid_WO_ID = this.TaskBidMasterModelObj.workOrder_ID;
    // this.xClientResultServices
    //   .ClientResultTaskBidGetWorkOrderId(tempModelObj)
    //   .subscribe(response => {
    //     if (response[0][0].length != 0) {
    //       this.ClientResultBidArray = response[0][0];
    //     }
    //   });
  }

  onClickTab(tab) {
    this.tabs.forEach((e) => {
      e.active = e === tab ? true : false;
    })
  }

  showWorkOrderDetail(dataItem) {
    debugger
    this.TaskBidMasterModelObj.workOrder_ID = dataItem.workOrder_ID;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.modalService.dismissAll();
        const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
        const routeUrl = "/client/clientresultinstruction/" + btoa(encrypted);
        this.router.navigate([routeUrl]);
        this.clientService.setUpdateHeader(dataItem.workOrder_ID);
      });
  }
  getWorkOrderDetailPageUrl(dataItem) {
    // debugger
    // this.TaskBidMasterModelObj.workOrder_ID = dataItem.workOrder_ID;
    // this.xClientResultServices
    //   .WorkorderViewClient(this.TaskBidMasterModelObj)
    //   .subscribe(response => {
    //     this.modalService.dismissAll();
    //     this.clientService.setUpdateHeader(dataItem.workOrder_ID);
    //   });
    const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
    let url = "/client/clientresultinstruction/" + btoa(encrypted);
    return url
  }

  redirectOnPhotosTabs(dataItem) {
    // debugger
    
    const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
    let url = "/client/clientresultphoto/" + btoa(encrypted);
    // modal.dismiss('Cross click');
    // this.modalService.dismissAll();
    // this.closeModal()
    return url
    
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  
  // redirectOnPhotosTabs(dataItem: any, modal: any) {
  //   const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.workOrder_ID);
  //   let url = "/client/clientresultphoto/" + btoa(encrypted);

  //   // Close the modal using modal.dismiss()
  //   modal.dismiss('Cross click');

  //   return url;
  // }

  checkRowAll(event) {
    this.checkedAll = event.target.checked;
    this.newBidtasks = [];
    if (this.checkedAll) {
      this.taskbid.forEach(item => {
        let newBidTask = new BidTask().getBidTask(item);
        this.newBidtasks.push(newBidTask);
      });
    }
  }

  checkRow(dataItem) {
    let newBidTask = new BidTask().getBidTask(dataItem);

    if (this.newBidtasks.length > 0 && this.newBidtasks.find(item => item.Task_Bid_pkeyID === newBidTask.Task_Bid_pkeyID)) {
      _.remove(this.newBidtasks, {
        Task_Bid_pkeyID: newBidTask.Task_Bid_pkeyID
      });
    } else {
      this.newBidtasks.push(newBidTask);
    }
  }

  copySelectedBid() {
    this.putBid();
  }

  approveSelected() {
    if (this.newBidtasks.length === 0) {
      alert("Please select items to approve");
      return;
    }
    this.saveStatusChanges(true);
  }

  approve(dataItem) {
    this.newBidtasks = [];
    this.newBidtasks.push(dataItem);
    this.saveStatusChanges(true);
  }

  rejectSelected() {
    this.saveStatusChanges(false);
  }

  reject(dataItem) {
    this.newBidtasks = [];
    this.newBidtasks.push(dataItem);
    this.saveStatusChanges(false);
  }

  copyBidItem(dataItem) {
    this.newBidtasks = [];
    let newBidTask = new BidTask().getBidTask(_.cloneDeep(dataItem));
    if (!this.newBidtasks.find(item => item.Task_Bid_pkeyID === dataItem.Task_Bid_pkeyID)) {
      this.newBidtasks.push(newBidTask);
    }
    this.putBid();
  }

  putBid() {
    this.isSubmitted = false;
    this.isLoading = true;
    // Comment by Mahi -- 28-10-2020 for optimization
    // let array = this.ClientResultBidArray.concat(this.newBidtasks);
    let array = this.newBidtasks;
    let tempModelObj = _.cloneDeep(this.TaskBidMasterModelObj);
    tempModelObj.ClientResultBidTaskArray = array;
    this.xClientResultServices
      .ClientResultTaskBidPost(tempModelObj)
      .subscribe(response => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.clientService.setBidData();
        this.commonMessage();
        this.newBidtasks = [];
        this.checkedAll = false;
        this.clientResultTaskBidGetWorkOrderIdGet();
      });
  }

  saveStatusChanges(isApprove: boolean) {
    this.isSubmitted = false;
    this.isLoading = true;
    let postObj = {};
    let arrayOfItems = this.newBidtasks.map(item => {
      return {
        Task_Bid_pkeyID: item.Task_Bid_pkeyID,
        Task_Bid_WO_ID: this.workorderid,
        Task_Bid_Status: isApprove ? 2 : 3,
        Type: 1
      }
    })

    postObj['Task_Bid_Data'] = JSON.stringify(arrayOfItems);
    this.xClientResultServices.historyStatusUpdate(JSON.stringify(postObj)).subscribe(res => {
      this.clearSelectionData()
      this.GetPastHistory();
    });
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = "Data Saved...!";
    modalRef.result.then(result => { }, reason => { });
  }

  navToPhoto(content, data) {
    if (data.workOrderHistoryPhotoDTOs.length === 0) return;
    this.taskPhotos = data.workOrderHistoryPhotoDTOs;
    this.modalService.open(content, { windowClass: "xlModal" })
  }

  closeCurrentPhotoModal(e) {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.tabs.forEach((item, index) => item.active = index === 0 ? true : false);
  }

  hideProperty(){
    this.hidePH = !this.hidePH
  }

  //#region Action button functionality
  checkRowAll_WithType(event,type:HistoryActionTaskTypeEnum) {
    if(type==this.historyAction_TaskTypeEnum.Damage)
    {
      this.checkedAll = event.target.checked;
      this.newDamagetasks = [];
      if (this.checkedAll) {
        this.taskDamage.forEach(item => {
          let newDamageTask = new Damage().getDamage(item);
          this.newDamagetasks.push(newDamageTask);
        });
      }
    }
    else if(type==this.historyAction_TaskTypeEnum.Violation)
    {
      this.checkedAll = event.target.checked;
      this.newViolationtasks = [];
      if (this.checkedAll) {
        this.TaskViolationHistoryList.forEach(item => {
          let violationtask = new ViolationTask().getViolationTask(item);
          this.newViolationtasks.push(violationtask);
        });
      }
    }
    else if(type==this.historyAction_TaskTypeEnum.Hazard)
    {
      this.checkedAll = event.target.checked;
      this.newHazardtasks = [];
      if (this.checkedAll) {
        this.TaskHazardHistoryList.forEach(item => {
          let hazardtask = new HazardTask().getHazardTask(item);
          this.newHazardtasks.push(hazardtask);
        });
      }
    }

  }

  checkRow_WithType(dataItem,type:HistoryActionTaskTypeEnum) {
    if(type==this.historyAction_TaskTypeEnum.Damage)
    {
      let newDamageTask = new Damage().getDamage(dataItem);

      if (this.newDamagetasks.length > 0 && this.newDamagetasks.find(item => item.Task_Damage_pkeyID === newDamageTask.Task_Damage_pkeyID)) {
        _.remove(this.newDamagetasks, {
          Task_Damage_pkeyID: newDamageTask.Task_Damage_pkeyID
        });
      } else {
        this.newDamagetasks.push(newDamageTask);
      }
    }
    else if(type==this.historyAction_TaskTypeEnum.Violation)
    {
      let violationTask = new ViolationTask().getViolationTask(dataItem);

      if (this.newViolationtasks.length > 0 && this.newViolationtasks.find(item => item.Task_Violation_pkeyID === violationTask.Task_Violation_pkeyID)) {
        _.remove(this.newViolationtasks, {
          Task_Violation_pkeyID: violationTask.Task_Violation_pkeyID
        });
      } else {
        this.newViolationtasks.push(violationTask);
      }
    }
    else if(type==this.historyAction_TaskTypeEnum.Hazard)
    {
      let hazardTask = new HazardTask().getHazardTask(dataItem);

      if (this.newHazardtasks.length > 0 && this.newHazardtasks.find(item => item.Task_Hazard_pkeyID === hazardTask.Task_Hazard_pkeyID)) {
        _.remove(this.newHazardtasks, {
          Task_Hazard_pkeyID: hazardTask.Task_Hazard_pkeyID
        });
      } else {
        this.newHazardtasks.push(hazardTask);
      }
    }

  }

  CopySelection_WithType(task_type:HistoryActionTaskTypeEnum) {
    if(task_type==this.historyAction_TaskTypeEnum.Damage)
    {
      if (this.newDamagetasks.length === 0) {
        alert("Please select items to copy");
        return;
      }
      else
      {
        this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Copy_Multiple);
      }
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Violation)
    {
      if (this.newViolationtasks.length === 0) {
        alert("Please select items to copy");
        return;
      }
      else
      {
        this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Copy_Multiple);
      }
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Hazard)
    {
      if (this.newHazardtasks.length === 0) {
        alert("Please select items to copy");
        return;
      }
      else
      {
        this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Copy_Multiple);
      }
    }

  }

  ResolvedSelection_WithType(task_type:HistoryActionTaskTypeEnum) {
    if(task_type==this.historyAction_TaskTypeEnum.Damage)
    {
      if (this.newDamagetasks.length === 0) {
        alert("Please select items to resolved");
        return;
      }
      else
      {
        this.UpdateOrCopyTask_ByType(true,task_type,this.historyActionTypeEnum.Status_Multiple);
      }
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Violation)
    {
      if (this.newViolationtasks.length === 0) {
        alert("Please select items to resolved");
        return;
      }
      else
      {
        this.UpdateOrCopyTask_ByType(true,task_type,this.historyActionTypeEnum.Status_Multiple);
      }
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Hazard)
    {
      if (this.newHazardtasks.length === 0) {
        alert("Please select items to resolved");
        return;
      }
      else
      {
        this.UpdateOrCopyTask_ByType(true,task_type,this.historyActionTypeEnum.Status_Multiple);
      }
    }

  }

  IgnoreSelection_WithType(task_type:HistoryActionTaskTypeEnum) {
    if(task_type==this.historyAction_TaskTypeEnum.Damage)
    {
      if (this.newDamagetasks.length === 0) {
        alert("Please select items to Ignore");
        return;
      }
      else{
        this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Status_Multiple);
      }
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Violation)
    {
      if (this.newViolationtasks.length === 0) {
        alert("Please select items to Ignore");
        return;
      }
      else{
        this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Status_Multiple);
      }
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Hazard)
    {
      if (this.newHazardtasks.length === 0) {
        alert("Please select items to Ignore");
        return;
      }
      else{
        this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Status_Multiple);
      }
    }

  }

  Resolved_WithType(dataItem,task_type:HistoryActionTaskTypeEnum) {
    if(task_type==this.historyAction_TaskTypeEnum.Damage)
    {
      this.newDamagetasks = [];
      this.newDamagetasks.push(dataItem);
      this.UpdateOrCopyTask_ByType(true,task_type,this.historyActionTypeEnum.Status_Single);
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Violation)
    {
      this.newViolationtasks = [];
      this.newViolationtasks.push(dataItem);
      this.UpdateOrCopyTask_ByType(true,task_type,this.historyActionTypeEnum.Status_Single);
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Hazard)
    {
      this.newHazardtasks = [];
      this.newHazardtasks.push(dataItem);
      this.UpdateOrCopyTask_ByType(true,task_type,this.historyActionTypeEnum.Status_Single);
    }
  }

  Ignore_WithType(dataItem,task_type:HistoryActionTaskTypeEnum) {
    if(task_type==this.historyAction_TaskTypeEnum.Damage)
    {
      this.newDamagetasks = [];
      this.newDamagetasks.push(dataItem);
      this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Status_Single);
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Violation)
    {
      this.newViolationtasks = [];
      this.newViolationtasks.push(dataItem);
      this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Status_Single);

    }
    else if(task_type==this.historyAction_TaskTypeEnum.Hazard)
    {
      this.newHazardtasks = [];
      this.newHazardtasks.push(dataItem);
      this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Status_Single);
    }
  }

  CopyItem_WithType(dataItem,task_type:HistoryActionTaskTypeEnum) {
    if(task_type==this.historyAction_TaskTypeEnum.Damage)
    {
      this.newDamagetasks = [];
      let newDamageTask = new Damage().getDamage(_.cloneDeep(dataItem));
      if (!this.newDamagetasks.find(item => item.Task_Damage_pkeyID === dataItem.Task_Damage_pkeyID)) {
        this.newDamagetasks.push(newDamageTask);
      }
      this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Copy_Single);

    }
    else if(task_type==this.historyAction_TaskTypeEnum.Violation)
    {
      this.newViolationtasks = [];
      let Violationtasks = new ViolationTask().getViolationTask(_.cloneDeep(dataItem));
      if (!this.newViolationtasks.find(item => item.Task_Violation_pkeyID === dataItem.Task_Violation_pkeyID)) {
        this.newViolationtasks.push(Violationtasks);
      }
      this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Copy_Single);
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Hazard)
    {
      this.newHazardtasks = [];
      let Hazardtasks = new HazardTask().getHazardTask(_.cloneDeep(dataItem));
      if (!this.newHazardtasks.find(item => item.Task_Hazard_pkeyID === dataItem.Task_Hazard_pkeyID)) {
        this.newHazardtasks.push(Hazardtasks);
      }
      this.UpdateOrCopyTask_ByType(false,task_type,this.historyActionTypeEnum.Copy_Single);
    }
  }

  UpdateOrCopyTask_ByType(status: boolean,task_type:HistoryActionTaskTypeEnum,type:HistoryActionTypeEnum) {
    this.isSubmitted = false;
    this.isLoading = true;
    var taskObj=[];

    this.TaskStatusModel.Task_WO_ID=this.workorderid
    this.TaskStatusModel.Type=type;
    this.TaskStatusModel.Task_Type=task_type;
    this.TaskStatusModel.Task_Status=status ? 2 : 3;
    if(task_type==this.historyAction_TaskTypeEnum.Damage)
    {
      this.TaskStatusModel.Task_pkeyID=this.newDamagetasks[0].Task_Damage_pkeyID;
      if(this.newDamagetasks.length>0)
      {
        this.newDamagetasks.forEach(item => {
          taskObj.push({Task_pkeyID:item.Task_Damage_pkeyID})
        });
      }

      this.TaskStatusModel.TaskArrayJson=JSON.stringify(taskObj);
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Violation)
    {
      this.TaskStatusModel.Task_pkeyID=this.newViolationtasks[0].Task_Violation_pkeyID;
      if(this.newViolationtasks.length>0)
      {
        this.newViolationtasks.forEach(item => {
          taskObj.push({Task_pkeyID:item.Task_Violation_pkeyID});
        });
      }

      this.TaskStatusModel.TaskArrayJson=JSON.stringify(taskObj);
    }
    else if(task_type==this.historyAction_TaskTypeEnum.Hazard)
    {
      this.TaskStatusModel.Task_pkeyID=this.newHazardtasks[0].Task_Hazard_pkeyID;
      if(this.newHazardtasks.length>0)
      {
        this.newHazardtasks.forEach(item => {
          taskObj.push({Task_pkeyID:item.Task_Hazard_pkeyID})
        });
      }

      this.TaskStatusModel.TaskArrayJson=JSON.stringify(taskObj);
    }
    // console.log(this.TaskStatusModel);
    this.xClientResultServices.UpdateTaskStatus_DamageViolationHazard(this.TaskStatusModel).subscribe(res => {
      this.clearSelectionData()
      this.GetPastHistory();
    });
  }
  clearSelectionData(){
    this.isLoading = false;
    this.isSubmitted = true;
    this.newBidtasks = [];
    this.newDamagetasks = [];
    this.newViolationtasks = [];
    this.newHazardtasks = [];
    this.checkedAll = false;
    this.eventEmitterService.onApproveButtonClick();
    let checkBoxList = document.getElementsByClassName("check-box");
    for (let item = 0; item < checkBoxList.length; item++) {
      (checkBoxList[item] as HTMLInputElement).checked = false;
    }
    let checkboxAll = document.getElementsByClassName("checkbox-all");
    for (let item = 0; item < checkboxAll.length; item++) {
      (checkboxAll[item] as HTMLInputElement).checked = false;
    }
  }


  //#endregion
}
