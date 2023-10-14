import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AddGroupsModel, MenuMasterModel, GrouproleModel } from "./add-group-model";
import { AddGroupsServices } from "./add-group.service";
import { IplAppModalContent } from '../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { ViewGroupsServices } from '../view-groups/view-groups.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ActivatedRoute } from '@angular/router';
import { ViewGroupsModel } from '../view-groups/view-groups-model';

@Component({
  templateUrl: "./add-group.component.html"
})

export class AddGroupsComponent implements OnInit {
  submitted = false; // submitted;
  formUsrCommonGroup: UntypedFormGroup;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  IsAssigned = false;
  MessageFlag: string; // custom msg sathi
  GroupRoleValFlag = false;
  dropCkck = false;
  AddGroupsModelObj: AddGroupsModel = new AddGroupsModel();
  MenuMasterModelObj: MenuMasterModel = new MenuMasterModel();
  GrouproleModelObj: GrouproleModel = new GrouproleModel();
  viewGroupsModelObj: ViewGroupsModel = new ViewGroupsModel();
  Menuarr = [];
  Menulst: any;
  isHelpActive = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xAddGroupsServices: AddGroupsServices,
    private xViewGroupsServices: ViewGroupsServices,
    private EncrDecr: EncrDecrService,
    private xRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      FName: ["", Validators.required],
      disact: ["", Validators.nullValidator],
      IsAssigned: ["", Validators.nullValidator],
      GroupRoleVal: ["", Validators.nullValidator],
    });

    this.getModelData();
  }

  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  // submit form
  FormButton() {
    this.submitted = true;
    this.AddGroupsModelObj;
    this.dropCkck = false;

    if (this.AddGroupsModelObj.GroupRoleId == 0) {
      this.GroupRoleValFlag = true;
      this.dropCkck = true;
    }

    if (this.dropCkck) {
      return;
    }

    // stop here if form is invalid
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    // all valid data to save
    this.AddGroupsModelObj.MenuArray = this.Menuarr;
    this.xAddGroupsServices
      .GruopDataPost(this.AddGroupsModelObj)
      .subscribe(response => {

        //debugger
        if (response[0] != null) {
          this.AddGroupsModelObj.Grp_pkeyID = parseInt(response[0]);
          this.MessageFlag = "Group information Saved...!";
          this.isLoading = false;
          this.button = "Update";
          this.commonMessage();
        }else if(this.AddGroupsModelObj.Type == 2){
          this.MessageFlag = "This Group Record Updated...!";
          this.isLoading = false;
          this.button = "Update";
          this.commonMessage();
        }
        else{
          this.MessageFlag = "This Group Record Allready Exist";
          this.isLoading = false;
          this.button = "Save";
          this.commonMessage();
        }
      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  ModelObj: any;
  IsEditDisable = false;
  getModelData() {
    ////dfebugger

    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.AddGroupsModelObj = new AddGroupsModel();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.ModelObj = parseInt(id);
      this.viewGroupsModelObj.Grp_pkeyID = this.ModelObj;
      this.viewGroupsModelObj.Type = 2;
      this.xViewGroupsServices
      .ViewGroupsData(this.viewGroupsModelObj)
      .subscribe(response => {

        this.AddGroupsModelObj.Grp_IsActive = response[0][0].Grp_IsActive
        this.AddGroupsModelObj.Grp_Name = response[0][0].Grp_Name
        this.AddGroupsModelObj.Grp_pkeyID = response[0][0].Grp_pkeyID;
        this.AddGroupsModelObj.GroupRoleId = response[0][0].GroupRoleId;
        this.formUsrCommonGroup.disable();
        this.IsEditDisable = true;
        this.IsAssigned = true;
        this.button = "Update";
        this.AddGroupsModelObj.Type = 2;
      })
    }


    this.getGroupRoleDrd();
  }

  EditForms() {
    this.IsEditDisable = false;
    this.IsAssigned = false;
    this.formUsrCommonGroup.enable();
  }

  Group_Method() {
    this.GroupRoleValFlag = false;
  }

  // for Group Menu
  GetMenuDetails() {
    // debugger
    this.MenuMasterModelObj.Ipre_MenuID = 0;
    if (this.ModelObj == undefined) {
      this.MenuMasterModelObj.Mgr_Group_Id = 0;
    } else {
      this.MenuMasterModelObj.Mgr_Group_Id = this.ModelObj;

    }
    console.log('DATAPASS',this.MenuMasterModelObj.Mgr_Group_Id);
    this.MenuMasterModelObj.Type = 1;
    this.xAddGroupsServices
      .GetMenuGroupData(this.MenuMasterModelObj)
      .subscribe(response => {
        // console.log('menugroup333',response);
        this.Menulst = response[1];
      });
  }

  //Menu Selection
  menuselection(item, i) {
    ////dfebugger;

    if (item.IsAssignedMenu == true) {
      this.Menuarr.push(item)
    } else {
      this.Menuarr.push(item)
    }
  }

  //get role dropdown
  GroupRoleList: any;
  getGroupRoleDrd() {
    this.xAddGroupsServices.GetGroupdrd(this.GrouproleModelObj)
      .subscribe(response => {
        // console.log('drddata', response);
        this.GroupRoleList = response[0];
      });

    this.GetMenuDetails()
  }

  // called when checkbox changes, push the chnaged menu to Menuarr
  checkboxChanges(event) {
    let menu = event;
    menu.ChildMenu.forEach(item =>  {
      if (this.Menuarr.indexOf(item) === -1) {
        this.Menuarr.push(item);
      }
    });
  }

  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }
  DispalyInfo(event: Event, lblName)
  {
    //debugger
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }
  lblName: String;
  DispalyInfoChild(event){

    //debugger
    if (event != undefined) {
     let arg = event.event;
     if (event.item.MenuName != undefined) {
       this.lblName = event.item.MenuName;
     }else{
      this.lblName = event.item;
     }

      if (this.isHelpActive) {
        arg.preventDefault();
        this.MessageFlag = "Add Information for " +  this.lblName;
        this.commonMessage();
      }
    }

  }
}
