import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Task_GroupPopupModel } from 'src/app/pages/admin/bid-invoice-task/bid-invoice-item/bid-invoice-item-model';
import { BidInvoiceItemServices } from 'src/app/pages/admin/bid-invoice-task/bid-invoice-item/bid-invoice-item.service';
import { GridTaskGroupColumns } from 'src/app/pages/admin/bid-invoice-task/constants/grid-columns';
import { filterMasterModel } from 'src/app/pages/admin/client-companies/view-client-companies/view-client-companies-model';
import { ViewClientCompaniesServices } from 'src/app/pages/admin/client-companies/view-client-companies/view-client-companies.service';

import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';

@Component({
  selector: 'app-ipl-app-task-group-manage',
  templateUrl: './ipl-app-task-group-manage.component.html',
  styleUrls: ['./ipl-app-task-group-manage.component.scss']
})
export class IplAppTaskGroupManageComponent implements OnInit {


  @Output() RefreshTaskGroup = new EventEmitter();

  isHelpActive = false;
  Task_GroupPopupModelObj:Task_GroupPopupModel = new Task_GroupPopupModel();
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  isTaskGroupValid = false;
  MessageFlag: string;
  button="Save";
  drdClientlist_temp=[];
  drdClientlist=[];
  formArrayVal: any[];
  public defaultClientItem: { Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name: 'Select Client', Client_pkeyID: 0 };
  public state_grid2: State = {};
  gridTaskGroupColumns = GridTaskGroupColumns;
  dropdownSettings = {};
  dropdownList = [];
  constructor(private xBidInvoiceItemServices: BidInvoiceItemServices,
    private xmodalService: NgbModal,
    private xViewClientCompaniesServices: ViewClientCompaniesServices) {
      this.dropdownSettings = {
        singleSelection: false,
        idField: "Client_pkeyID",
        textField: "Client_Company_Name",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 1,
        allowSearchFilter: true
      };
     }
  ngOnInit(): void {
    this.GetClientList()
    this.GetTaskGroup()
  }

  
  popformArray:any;
  GetTaskGroup() {
    // debugger
    this.xBidInvoiceItemServices
      .GetTaskGroupDetailsDropdownGet()
      .subscribe(response => {
        // console.log("result",response)
        this.popformArray = response[0];

        // if (response[0][0].Task_Group_Client_data != null)
        // {
        //   this.Task_GroupPopupModelObj.Task_Group_Client_data =  JSON.parse(response[0][0].Task_Group_Client_data);
        // } 
       
      });
  }
  GetClientList() {
    this.filterMasterModelObj.Type = 6;
    this.xViewClientCompaniesServices
      .ClientComapnyViewData(this.filterMasterModelObj)
      .subscribe(response => {
        this.drdClientlist = response[0];
        this.drdClientlist_temp=response[0]
      });
  }
  FilterClientDropdowen(value) {
    if (value!='') {
      var filteredclient = this.drdClientlist_temp.filter(function (el) {return el.Client_Company_Name != null;});
      this.drdClientlist = filteredclient.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drdClientlist = this.drdClientlist_temp.slice();
   }
  }
  SubmitTaskGroupManage() {
    // debugger
    this.isTaskGroupValid=false
    if(this.Task_GroupPopupModelObj.Task_Group_Name==undefined || this.Task_GroupPopupModelObj.Task_Group_Name==null)
    {
      this.isTaskGroupValid=true;
    }

    this.Task_GroupPopupModelObj.Task_Group_Client_data = JSON.stringify(this.Task_GroupPopupModelObj.Task_Group_Client_data);
    if(!this.isTaskGroupValid)
    {
      this.xBidInvoiceItemServices
      .TaskGroupPOPUPPost(this.Task_GroupPopupModelObj)
      .subscribe(response => {
        // console.log('test',response)
        this.popformArray = response[0];
        this.RefreshTaskGroup.emit(this.popformArray);
        this.MessageFlag = "Task Groups Saved...!";
        this.commonMessage();
      });
    }
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
    this.Task_GroupPopupModelObj=new Task_GroupPopupModel()
    this.button="Save";
  }
  CancleClick(){
    this.button="Save";
    this.isTaskGroupValid=false;
    this.Task_GroupPopupModelObj=new Task_GroupPopupModel();
  }
  EditTaskGroupManage(data){
    this.button="Update";
    this.Task_GroupPopupModelObj.Task_Group_pkeyID=data.Task_Group_pkeyID
    this.Task_GroupPopupModelObj.Task_Group_Name=data.Task_Group_Name
    // this.Task_GroupPopupModelObj.Task_Group_Client_data=data.Task_Group_Client_data
    if (data.Task_Group_Client_data != null){
    this.Task_GroupPopupModelObj.Task_Group_Client_data =  JSON.parse(data.Task_Group_Client_data);
    }
    
    this.Task_GroupPopupModelObj.Task_Group_IsActive=data.Task_Group_IsActive
    this.Task_GroupPopupModelObj.Type=2;
  }
  DeleteTaskGroupManage(data){
    if (data.Task_Group_pkeyID != 0 && !data.Task_Group_IsDeleteAllow) {
      var cfrm = confirm("Are you want to delete this record...!");
      if (cfrm == true) {
          this.Task_GroupPopupModelObj.Type = 4;
          this.Task_GroupPopupModelObj.Task_Group_pkeyID = data.Task_Group_pkeyID;

          this.xBidInvoiceItemServices
            .TaskGroupPOPUPPost(this.Task_GroupPopupModelObj)
            .subscribe(response => {
              this.popformArray = response[0];
            });
      }
    }
  }
  public dataStateChange_grid2(state_grid2: DataStateChangeEvent): void {
    this.state_grid2 = state_grid2;
  }
  checkChange(event, dataItem) {
    // debugger;
    this.Task_GroupPopupModelObj.Task_Group_pkeyID = dataItem.Task_Group_pkeyID;
    this.Task_GroupPopupModelObj.Task_Group_IsActive = !dataItem.Task_Group_IsActive;
    this.Task_GroupPopupModelObj.Type = 3;

    this.xBidInvoiceItemServices
      .TaskGroupPOPUPPost(this.Task_GroupPopupModelObj)
      .subscribe(response => {
        this.popformArray = response[0];
        this.RefreshTaskGroup.emit(this.popformArray);
        this.MessageFlag = "Task Groups Status updated...!";
        this.commonMessage();
      });
  }
  DispalyInfo(event: Event, lblName) {
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }
  onItemSelect(item: any) {
    this.formArrayVal = item;
    //console.log('a',item);

  }
  onSelectAll(items: any) {
    this.formArrayVal = items;
    //console.log(items);

  }
}
