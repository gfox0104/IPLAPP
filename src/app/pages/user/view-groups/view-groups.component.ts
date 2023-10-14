import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";

import { ViewGroupsServices } from "./view-groups.service";
import { ViewGroupsModel } from "./view-groups-model";
import { AddGroupsServices } from '../add-group/add-group.service';
import { AddGroupsModel, GrouproleModel } from '../add-group/add-group-model';
import { GroupFilters } from '../../../components/iplapp-filter-form/user-filter-form';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { WorkOrderDrodownServices } from "src/app/services/util/dropdown.service";


@Component({
  templateUrl: "./view-groups.component.html"
})

export class ViewGroupsComponent implements OnInit {
  viewGroupsModelObj: ViewGroupsModel = new ViewGroupsModel();
  GrouproleModelObj: GrouproleModel = new GrouproleModel();
  AddGroupsModelObj: AddGroupsModel = new AddGroupsModel();
  public griddata: any[];
  groupFilters = GroupFilters;
  MessageFlag: string;
  GroupList: any;
  constructor(
    private xViewGroupsServices: ViewGroupsServices,
    private xRouter: Router,
    private xAddGroupsServices: AddGroupsServices,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();
    this.GetGroupData();
    this.GetDropDowndata();
  }

  ngOnInit() { }

  GetGroupData() {
    this.xViewGroupsServices
      .ViewGroupsData(this.viewGroupsModelObj)
      .subscribe(response => {
        //console.log("respo group view", response);
        if (response.length > 1 && response[2].length > 0) {
          this.viewGroupsModelObj.Grp_Name = response[2][0].Group_Filter_Group_Name;
          this.viewGroupsModelObj.Grp_IsActive = response[2][0].Group_Filter_GRPIsActive;
          this.viewGroupsModelObj.Grp_CreatedBy = response[2][0].Grp_CreatedBy;
          this.viewGroupsModelObj.Grp_ModifiedBy = response[2][0].Grp_ModifiedBy;
          this.filterCall();
          this.spinner.hide();
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Grp_pkeyID);
              element.ViewUrl = "/home/group/addgroups/" + btoa(encrypted);
            });
          }
          this.spinner.hide();
        }

      });
  }

  GetDropDowndata() {
    this.xAddGroupsServices.GetGroupdrd(this.GrouproleModelObj)
    .subscribe(response => {
        //console.log('grop drop', response);
        this.GroupList = response[0];
        this.groupFilters[1].data = this.GroupList;
      });
  }

  filtergrdrd(value){
    //debugger
    if (value.event !='') {

      this.groupFilters[1].data = this.GroupList;
      //debugger
      var filteredcustomer =  this.GroupList.filter(function (el) {
        return el.Grp_Name != "";
      });
      this.groupFilters[1].data = filteredcustomer.filter((s) => s.Grp_Name.toLowerCase().indexOf(value.event.toLowerCase()) !== -1);
    }
    else{
      this.groupFilters[1].data = this.GroupList.slice();
    }

      }

  filterCall() {
    this.viewGroupsModelObj.Type = 3;
    //console.log(this.viewGroupsModelObj)
    this.xViewGroupsServices
      .ViewGroupsData(this.viewGroupsModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        //console.log("filter data", response);
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Grp_pkeyID);
            element.ViewUrl = "/home/group/addgroups/" + btoa(encrypted);
          });
        }

      });
  }

  clearData() {
    this.viewGroupsModelObj.Type = 5;
    this.xViewGroupsServices.AddUpdateFilterAdminGroupData(this.viewGroupsModelObj)
    .subscribe(response => {
      this.viewGroupsModelObj = new ViewGroupsModel();
      this.GetGroupData();
    })

  }

  saveFilterData() {
    this.viewGroupsModelObj.Type = 1;
    this.xViewGroupsServices.AddUpdateFilterAdminGroupData(this.viewGroupsModelObj)
    .subscribe(response => {
      this.MessageFlag = "Group filter saved...!";
      this.commonMessage();
      this.filterCall();
    })
  }
  filterdrd(value){
    //debugger
    if (value !='') {


      }
    }



  deleteDetails(event, dataItem) {
    var cfrm = confirm("Delete this Record...!");
    if (cfrm == true) {
      this.AddGroupsModelObj.Type = 4;
      this.AddGroupsModelObj.Grp_IsDelete = true;
      this.AddGroupsModelObj.Grp_pkeyID = dataItem.Grp_pkeyID;

      this.xAddGroupsServices
        .GruopDataPost(this.AddGroupsModelObj)
        .subscribe(response => {
          this.GetGroupData();
        });
    }
  }

  // clear data
  AddNewGroup() {
    this.xViewGroupsServices.setPathParam(undefined);
    this.xRouter.navigate(["home/group/addgroups/new"]);
  }

  //kendo check box event action

  public state: State = {
    skip: 0,
    take: 15,
  };
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddGroupsModelObj.Grp_pkeyID = dataItem.Grp_pkeyID;
    this.AddGroupsModelObj.Grp_IsActive = !dataItem.Grp_IsActive;
    this.AddGroupsModelObj.Type = 3;

    this.xAddGroupsServices
    .GruopDataPost(this.AddGroupsModelObj)
    .subscribe(response => {
      this.MessageFlag = "Group status upated...!";


      this.commonMessage();
        this.GetGroupData();
      });
  }




  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;


  }
}
