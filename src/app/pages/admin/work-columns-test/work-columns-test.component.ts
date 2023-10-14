import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";



import { IplAppModalContent } from '../../../components/iplapp-modal-content/iplapp-modal-content.component';

import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ActivatedRoute } from '@angular/router';

import { WorkColumnsTestServices } from "./work-columns-test.service";
import {  AddWorkColumnModel,workColumnsMenuMasterModel } from "./work-columns-test-model";



@Component({
  selector: 'app-work-columns-test',
  templateUrl: './work-columns-test.component.html',
  styleUrls: ['./work-columns-test.component.scss']
})
export class WorkColumnsTestComponent implements OnInit {

  submitted = false; // submitted;
  formUsrCommonGroup: UntypedFormGroup;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  IsAssigned = false;
  MessageFlag: string; // custom msg sathi
  GroupRoleValFlag = false;
  dropCkck = false;
  workColumnsMenuMasterModelObj: workColumnsMenuMasterModel = new workColumnsMenuMasterModel();
  AddWorkColumnModelObj : AddWorkColumnModel = new AddWorkColumnModel();
  Menuarr = [];
  Menulst: any =[];
  isHelpActive = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private EncrDecr: EncrDecrService,
    private xRoute: ActivatedRoute,
    private xWorkColumnsTestServices:WorkColumnsTestServices
  ) { }

  ngOnInit() {
  
    this.formUsrCommonGroup = this.formBuilder.group({
     
    });

    
    this.GetMenuDetails()
  }


  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  // submit form
  FormButton() {
    // debugger
    this.submitted = true;
    
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    this.AddWorkColumnModelObj;


    this.isLoading = true;
    this.button = "Processing";

    // all valid data to save
     this.AddWorkColumnModelObj.MenuArray = this.Menuarr;


    this.AddWorkColumnModelObj.Access_Colum_str = JSON.stringify(this.AddWorkColumnModelObj.MenuArray);
    this.xWorkColumnsTestServices
      .WorkColumnDataPost(this.AddWorkColumnModelObj)
      .subscribe(response => {

        //debugger
        if (response[0] != null) 
        {
          
          this.MessageFlag = "Work Column information Saved...!";
          this.isLoading = false;
          this.button = "Update";
          this.commonMessage();
          this.AddWorkColumnModelObj.MenuArray = [];
          this.Menuarr = [];
          this.GetMenuDetails()
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



    
  

  EditForms() {
    this.IsEditDisable = false;
    this.IsAssigned = false;
    this.formUsrCommonGroup.enable();
  }

    arr:any
  // for Group Menu
  GetMenuDetails() {
    // debugger
    this.workColumnsMenuMasterModelObj.Wo_Column_PkeyId = 0;
    if (this.ModelObj == undefined) {
      this.workColumnsMenuMasterModelObj.Wo_Column_Name = "";
    } else {
      this.workColumnsMenuMasterModelObj.Wo_Column_Name = this.ModelObj;

    }
   this.Menulst = [];
    console.log('DATAPASS',this.workColumnsMenuMasterModelObj.Wo_Column_Name);
    this.workColumnsMenuMasterModelObj.Type = 1;
    this.xWorkColumnsTestServices
      .GetMenuGroupData(this.workColumnsMenuMasterModelObj)
      .subscribe(response => {
        // console.log('menugroup',response)
        this.Menulst.push (response[0]);

        
        this.Menulst.push (response[1]);
        this.Menulst.push (response[2]);
        this.Menulst.push (response[3]);
       this.Menulst.push (response[4]);
       
      });
  }

  //Menu Selection
  menuselection(item, i) {
    // debugger;

    if (item.ACG_PKeyID_sel == true) {
      this.Menuarr.push(item)
    } else {
      this.Menuarr.push(item)
    }
  }

  //get role dropdown
  GroupRoleList: any;

  // called when checkbox changes, push the chnaged menu to Menuarr
  checkboxChanges(event) {
    // debugger
    // console.log('event')
    let menu = event;
    menu.forEach(item =>  {
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
