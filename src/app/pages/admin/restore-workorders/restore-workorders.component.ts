import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";

import { RestoreWorkOrderServices } from "./restore-workorders.service";
import { RestoreWorkOrderModel } from "./restore-workorders.model";
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
import { EncrDecrService } from '../../../services/util/encr-decr.service';
import { Buttons, GridColumns } from './constants';
import { UserViewFilters } from '../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgxSpinnerService } from "ngx-spinner";
import { Tabs } from './tabs';
@Component({
  templateUrl: "./restore-workorders.component.html",
  styleUrls: ['./restore-workorders.component.scss']
})

export class RestoreWorkOrderComponent implements OnInit {

  _restoreWorkOrderModelObj: RestoreWorkOrderModel = new RestoreWorkOrderModel();
  restoreWorkOrderList: any;
  hidePH = true;
  public griddata: any[];
  userViewFilters = UserViewFilters;
  GroupList: any;
  buttons = Buttons;
  gridColumns = GridColumns;
  public state: State = {};
  MessageFlag: string;
  tabs = Tabs;
  actionIPLNOs: Array<any>;
  user;
  constructor(
    private _restoreWorkOrderServices: RestoreWorkOrderServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {


    var encuser = JSON.parse(localStorage.getItem('usertemp_'));
    var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
    this.user = JSON.parse(decval);

    this.spinner.show();
    this.GetRestoreWorkOrderData();
    // this.getautoUserdata();
    this.GetDropDowndata();
  }

  ngOnInit() {
    //console.log(this.buttons)
    //this.GetRestoreWorkOrderData();
  }
  OnworkOrderclick(tabId){
   // debugger
    let tId=tabId
    if(tId=='deleted-tab'){
      this._restoreWorkOrderModelObj.Type=1;
      this.spinner.show();
      this.GetRestoreWorkOrderData();
    }
    else if(tId=='edit-tab')
    {
      this._restoreWorkOrderModelObj.Type=2;
      this.spinner.show();
      this.GetRestoreWorkOrderData();
    }
  }
  onClickTab(tab) {
    this.tabs.forEach((e) => {
      e.active = e === tab ? true : false;
    })
  }
  GetRestoreWorkOrderData() {

    this._restoreWorkOrderServices
      .getRestroredWorkOrderData(this._restoreWorkOrderModelObj)
      .subscribe(response => {
        this.spinner.hide();
        if(response.length>0)
        {
          var orignaldata=response[0];
          orignaldata.forEach(item => {
            const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', item.workOrder_ID);
            if (this.user[0].GroupRoleId === 2) {
              item.ViewUrl = "/client/clientresultinstruction/" + btoa(encrypted);
            } else {
              item.ViewUrl = "/client/clientresultinstruction/" + btoa(encrypted);
            }
            item.ViewPhotosUrl = "/client/clientresultphoto/" + btoa(encrypted);
          });
          this.restoreWorkOrderList = orignaldata;
        }
        else
        {
          this.restoreWorkOrderList=[]
        }

      });
  }

  hideProperty(){
    this.hidePH = !this.hidePH
  }

  getWorkOrderDetailPageUrl(dataItem){
    // debugger
    this._restoreWorkOrderModelObj.workOrder_ID=dataItem.workOrder_ID;
    // this._restoreWorkOrderServices
    // .workOrdderEditDelteData(this._restoreWorkOrderModelObj)
    // .subscribe(response => {
    //   //this.spinner.hide();
    //   debugger
    //   if(response.length>0)
    //   {
    //     this.restoreWorkOrderList = response[0];
    //   }
    //   else
    //   {
    //     this.restoreWorkOrderList=[]
    //   }

    // });

  }

  // getautoUserdata() {
  //   this._restoreWorkOrderServices
  //     .ViewUserData(this._restoreWorkOrderModelObj)
  //     .subscribe(response => {
  //       //console.log("User Details", response);
  //       if (response.length > 1 && response[2].length > 0) {
  //         this._restoreWorkOrderModelObj.User_FirstName = response[2][0].User_Filter_First_Name;
  //         this._restoreWorkOrderModelObj.User_LastName = response[2][0].User_Filter_Last_Name;
  //         this._restoreWorkOrderModelObj.User_CompanyName = response[2][0].User_Filter_Company;
  //         this._restoreWorkOrderModelObj.User_Email = response[2][0].User_Filter_Login_email;
  //         this._restoreWorkOrderModelObj.User_Group = response[2][0].User_Filter_Group;
  //         this._restoreWorkOrderModelObj.User_CellNumber = response[2][0].User_Filter_Mobile;
  //         this._restoreWorkOrderModelObj.User_IsActive = response[2][0].User_Filter_USRIsActive;
  //         this.filterCall();
  //         this.spinner.hide();
  //       }
  //       else{
  //         this.griddata = response[0];
  //         this.griddata.forEach(element => {
  //           var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.User_pkeyID);
  //           element.ViewUrl = "/home/user/adduser/" + btoa(encrypted);
  //         });
  //         this.spinner.hide();
  //       }

  //     });
  // }


  // clear data
  AddNewUser() {
    this.xRouter.navigate(["/user/adduser", 'new']);
  }

  // common code
  filterCall() {
    this._restoreWorkOrderModelObj.Type = 4;
    this._restoreWorkOrderServices
      .ViewUserData(this._restoreWorkOrderModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        //console.log("User Details", response);
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.User_pkeyID);
            element.ViewUrl = "/home/user/adduser/" + btoa(encrypted);
          });
        }
      });
  }

  clearData() {
    this._restoreWorkOrderModelObj.Type = 5;
    // this._restoreWorkOrderServices
    // .AddUpdateFilterAdminuserData(this._restoreWorkOrderModelObj)
    // .subscribe(response => {
    //   this._restoreWorkOrderModelObj = new RestoreWorkOrderModel();
    //   this.getautoUserdata();
    // })

  }

  // saveFilterData() {
  //   this._restoreWorkOrderModelObj.Type = 1;
  //   this._restoreWorkOrderServices
  //   .AddUpdateFilterAdminuserData(this._restoreWorkOrderModelObj)
  //   .subscribe(response => {
  //     this.MessageFlag = "User filter saved...!";
  //     this.commonMessage();
  //     this.filterCall();
  //   })
  // }
  filterdrd(value){
    //debugger
    if (value.event !='') {

      this.userViewFilters[5].data = this.GroupList;
      //debugger
      var filteredcustomer =  this.GroupList.filter(function (el) {
        return el.Grp_Name != "";
      });
      this.userViewFilters[5].data = filteredcustomer.filter((s) => s.Grp_Name.toLowerCase().indexOf(value.event.toLowerCase()) !== -1);
    }
    else{
      this.userViewFilters[5].data = this.GroupList.slice();
    }

      }

      cfrm:boolean;
  // common code End
  deleteDetails(event, dataItem) {
    // debugger
    if(event){
       this.cfrm = confirm("Are you sure you want to Restore WorkOrder ?");

    }
    else
    {
      this.cfrm = confirm("Are you Sure you Want to Unlock the Work order ?");
    }



    if (this.cfrm == true) {
      this._restoreWorkOrderModelObj.workOrder_ID = dataItem.workOrder_ID;
    this._restoreWorkOrderModelObj.IsActive = false;
    this._restoreWorkOrderModelObj.IsDelete = true;
    this._restoreWorkOrderModelObj.Type = 10;

    this._restoreWorkOrderServices
    .workOrdderEditDelteData(this._restoreWorkOrderModelObj)
    .subscribe(response => {
      this.MessageFlag = "Work order Restore Sucessfully...!";
      this.commonMessage();
        this._restoreWorkOrderModelObj.Type = 1;
        this.GetRestoreWorkOrderData();
      });
     }
  }

  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetGroupDetails()
      .subscribe(response => {
        //console.log('grop drop', response);
        this.GroupList = response[0];
        this.userViewFilters[5].data = this.GroupList;
      });
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  checkChange(event, dataItem) {
  // debugger;
    this._restoreWorkOrderModelObj.workOrder_ID = dataItem.workOrder_ID;
    this._restoreWorkOrderModelObj.IsEdit = event;//dataItem.IsEdit;
    this._restoreWorkOrderModelObj.Type = 9;

    this._restoreWorkOrderServices
    .workOrdderEditDelteData(this._restoreWorkOrderModelObj)
    .subscribe(response => {
      this.MessageFlag = "user status upated...!";
      this.commonMessage();
      this._restoreWorkOrderModelObj.Type = 2;
        this.GetRestoreWorkOrderData();
      });
  }


  //kendo check box event action
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  openECDNotesModal(dataItem,content) {
    this.actionIPLNOs =[{ IPLNO: dataItem.IPLNO,WorkOrder_Id:dataItem.workOrder_ID }]
    this.xmodalService.open(content, { windowClass: "lgModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  SetColor(color){
    if(color==null || color=="" || color==" " || color=="#FFFFFF" || color=="FFFFFF")
    {
      return "black"
    }
    else
    {
      return "#"+color;
    }
  }
}
