import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";

import { ViewUserServices } from "./view-user.service";
import { ViewUserModel } from "./view-user-model";
import { AddUserModel } from '../add-user/add-user-model';
import { AddUserServices } from '../add-user/add-user.service';
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
import { EncrDecrService } from '../../../services/util/encr-decr.service';
import { Buttons, GridColumns } from './constants';
import { UserViewFilters } from '../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./view-user.component.html"
})

export class ViewUserComponent implements OnInit {

  viewUserModelObj: ViewUserModel = new ViewUserModel();
  addUserModelObj: AddUserModel = new AddUserModel();

  public griddata: any[];
  userViewFilters = UserViewFilters;
  GroupList: any;
  buttons = Buttons;
  gridColumns = GridColumns;
  public state: State = {};
  MessageFlag: string;
  constructor(
    private xViewUserServices: ViewUserServices,
    private xAddUserServices: AddUserServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this.getautoUserdata();
    this.GetDropDowndata();
  }

  ngOnInit() {
    //console.log(this.buttons)
  }

  getautoUserdata() {
    this.xViewUserServices
      .ViewUserData(this.viewUserModelObj)
      .subscribe(response => {
        // console.log("User Details", response);
        if (response.length > 1 && response[2].length > 0) {
          this.viewUserModelObj.User_FirstName = response[2][0].User_Filter_First_Name;
          this.viewUserModelObj.User_LastName = response[2][0].User_Filter_Last_Name;
          this.viewUserModelObj.User_CompanyName = response[2][0].User_Filter_Company;
          this.viewUserModelObj.User_Email = response[2][0].User_Filter_Login_email;
          this.viewUserModelObj.User_Group = response[2][0].User_Filter_Group;
          this.viewUserModelObj.User_CellNumber = response[2][0].User_Filter_Mobile;
          this.viewUserModelObj.User_IsActive = response[2][0].User_Filter_USRIsActive;
          this.filterCall();
          this.spinner.hide();
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.User_pkeyID);
              element.ViewUrl = "/home/user/adduser/" + btoa(encrypted);
            });
          }
          this.spinner.hide();
        }

      });
  }


  // clear data
  AddNewUser() {
    this.xRouter.navigate(["/user/adduser", 'new']);
  }

  // common code
  filterCall() {
    this.viewUserModelObj.Type = 4;
    this.xViewUserServices
      .ViewUserData(this.viewUserModelObj)
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
    this.viewUserModelObj.Type = 5;
    this.xViewUserServices
    .AddUpdateFilterAdminuserData(this.viewUserModelObj)
    .subscribe(response => {
      this.viewUserModelObj = new ViewUserModel();
      this.getautoUserdata();
    })

  }

  saveFilterData() {
    this.viewUserModelObj.Type = 1;
    this.xViewUserServices
    .AddUpdateFilterAdminuserData(this.viewUserModelObj)
    .subscribe(response => {
      this.MessageFlag = "User filter saved...!";
      this.commonMessage();
      this.filterCall();
    })
  }
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


  // common code End
  deleteDetails(event, dataItem) {
    var cfrm = confirm("Delete this Record...!");

    if (cfrm == true) {
      this.addUserModelObj.User_pkeyID = dataItem.User_pkeyID;
      this.addUserModelObj.User_IsDelete = true;

      this.xAddUserServices.UsertDataPost(this.addUserModelObj)
        .subscribe(response => {
          //console.log('delete response', response);
          this.getautoUserdata();
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
  ////dfebugger;
    this.addUserModelObj.User_pkeyID = dataItem.User_pkeyID;
    this.addUserModelObj.User_IsActive = !dataItem.User_IsActive;
    this.addUserModelObj.Type = 3;

    this.xAddUserServices
    .UsertDataPost(this.addUserModelObj)
    .subscribe(response => {
      this.MessageFlag = "user status Update...!";
      this.commonMessage();
        this.getautoUserdata();
      });
  }


  //kendo check box event action
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
