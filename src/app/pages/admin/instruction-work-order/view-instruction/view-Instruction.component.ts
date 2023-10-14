import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { ViewInstructionServices } from "./view-Instruction.service";
import { ViewInstructionModel } from "./view-Instruction-model";
import { AddInstructionServices } from '../add-instruction/add-Instruction.service';
import { AddInstructionModel } from '../add-instruction/add-instruction-model';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { Buttons } from '../constants';
import {Filters} from '../constants/filters'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {FormFields} from '../constants/form-fields'
import { IplAppModalContent } from 'src/app/components';
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector:'app-view-Instruction',
  templateUrl: "./view-Instruction.component.html",
  styleUrls:["./view-Instruction.component.scss"],
  template:'{{ convertedText }}'
})

export class ViewInstructionComponent implements OnInit {

  // public value: string;
  // public myPlugins = (defaultPlugins: Plugin[]): Plugin[] => [
  //   ...defaultPlugins,
  //   inputRule(),
  // ];

 


  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  public griddata: any[];
  ViewInstructionModelObj: ViewInstructionModel = new ViewInstructionModel();
  AddInstructionModelObj: AddInstructionModel = new AddInstructionModel();
  buttons = Buttons;
  filters = Filters;
  FormFields = FormFields;
  formUsrCommonGroup: UntypedFormGroup;
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag:string;
  Inst_TaskId:any;

  originalText = "This is a sentence";
  convertedText: string;

 

  public state: State = {};
  constructor(
    private xViewInstructionServices: ViewInstructionServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddInstructionServices: AddInstructionServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {
   
    this.spinner.show();
    this.GetGridData();
  }
  
  // longText= this.ViewInstructionModelObj.Inst_Task_Desc;
  // shortText = '';

  ngOnInit() {
  
   
     this.formUsrCommonGroup = this.formBuilder.group({
      discrpval: ["", Validators.required],
      disactive: ["", Validators.required]
  });
  
  // this.shortText = this.longText.slice(0, 100);
}

  addloan(event, content) {
    if (event === 'Create Instruction') {
      this.isEditDisable = false;
      this.AddInstructionModelObj = new AddInstructionModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }

  checkButtonEvent(event,content) {
    // debugger;
    if (event === 'Create Instruction') {
      // this.isEditDisable = false;
      // this.AddCustomLableModelObj = new AddCustomLableModel();
      // this.modalService.open(content,{ size: 'md' });
      // this.formUsrCommonGroup.enable();

      this.openPhotoLableModal('new',content);
    } else {
      //this.openPhotoLableModal('new',content);
       this.modalService.open(this.contentCateFORM);
    }
  }


  // EditEvent(event,content,modaldata) {
  //   debugger;
  //   if (event === 'Create Instruction') {
  //     // this.isEditDisable = false;
  //     // this.AddCustomLableModelObj = new AddCustomLableModel();
  //     // this.modalService.open(content,{ size: 'md' });
  //     // this.formUsrCommonGroup.enable();

  //     this.openPhotoLableModal('new',content);
  //   } else {
  //     this.openPhotoLableModal('new',content);
  //     // this.modalService.open(this.photoLableGroupForm);
  //   }
  // }
  openPhotoLableModal(photoLable,moodalContent) {
    // debugger
    this.Inst_TaskId=photoLable
    this.modalService.open(moodalContent, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  // openPhotoLableModal(photoLable,moodalContent) {
  //   this.Inst_TaskId=photoLable
  //   this.modalService.open(moodalContent, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  // }


    // submit form
    formButton() {
      this.isSubmitted = false;
      this.xAddInstructionServices
        .AutoInstructionDataPost(this.AddInstructionModelObj)
        .subscribe(response => {
          if (response[0].Status != "0") {
            this.AddInstructionModelObj.Inst_Task_pkeyId = parseInt(response[0].Inst_Task_pkeyId);
            this.MessageFlag = "Auto Instruction Task Data Saved...!";
            this.isSubmitted = true;
            this.commonMessage();
            this.GetGridData();
          }
        });
    }

    // common message modal popup
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => {this.xmodalService.dismissAll() });
    }
    closeModal() {
      this.xmodalService.dismissAll();
    }
  //get grid
  GetGridData() {
    this.xViewInstructionServices
      .ViewInstructionData(this.ViewInstructionModelObj)
      .subscribe(response => {
        // console.log('inst task',response);
        //debugger;
        if (response.length > 1 && response[1].length > 0) {
          this.ViewInstructionModelObj.Inst_Task_Name = response[1][0].Ins_Filter_InsName;
          this.ViewInstructionModelObj.Inst_Task_Desc = response[1][0].Ins_Filter_InsDesc
          this.ViewInstructionModelObj.Inst_Task_IsActive = response[1][0].Ins_Filter_InsIsActive;
          this.ViewInstructionModelObj.Inst_Task_CreatedBy = response[1][0].Inst_Task_CreatedBy;
          this.ViewInstructionModelObj.Inst_Task_ModifiedBy = response[1][0].Inst_Task_ModifiedBy;
          // this.ViewInstructionModelObj.Inst_Task_Desc =  this.ViewInstructionModelObj.Inst_Task_Desc
          this.filterCall();
          this.spinner.hide();

          // let longText= response[1][0].Ins_Filter_InsDesc;
          // this.shortText = longText.slice(0, 10);
          // console.log(this.ViewInstructionModelObj.Inst_Task_Desc)
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Inst_Task_pkeyId);
              element.ViewUrl = "/home/autoinstruction/addinstruction/" + btoa(encrypted);
            });
            // console.log('griddata',this.griddata)
          }
          this.spinner.hide();
        }

      });
  }



  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddInstructionModelObj.Inst_Task_pkeyId = dataItem.Inst_Task_pkeyId;
      this.AddInstructionModelObj.Inst_Task_IsDelete = true;

      this.xAddInstructionServices
        .DeleteInstructionData(this.AddInstructionModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  filterCall() {

    this.ViewInstructionModelObj.Type = 4;
    this.xViewInstructionServices
    .ViewInstructionData(this.ViewInstructionModelObj)
    .subscribe(response => {
      //console.log('inst task',response);
      this.state.take = 15;
      this.state.skip = 0;
      if(response[0]!=undefined)
      {
        this.griddata = response[0];
        this.griddata.forEach(element => {
          var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Inst_Task_pkeyId);
          element.ViewUrl = "/home/autoinstruction/addinstruction/" + btoa(encrypted);
        });

      }

    });

   }

   clearData() {
    this.ViewInstructionModelObj.Type = 5;
    this.xViewInstructionServices
    .AddUpdateFilterAdminInstructionData(this.ViewInstructionModelObj)
    .subscribe(response => {
      //debugger;
      //console.log('inst task',response);
      this.ViewInstructionModelObj = new ViewInstructionModel();
      this.GetGridData();
    });

   }

   saveFilterData() {
    this.ViewInstructionModelObj.Type = 1;
    this.xViewInstructionServices
    .AddUpdateFilterAdminInstructionData(this.ViewInstructionModelObj)
    .subscribe(response => {
      //debugger;
      //console.log('inst task',response);
      this.MessageFlag = "Instruction filter saved...!";
      this.commonMessage();
      this.filterCall();
    });
   }

   checkChange(event, dataItem) {
  ////dfebugger;
    this.AddInstructionModelObj.Inst_Task_pkeyId = dataItem.Inst_Task_pkeyId;
    this.AddInstructionModelObj.Inst_Task_IsActive = !dataItem.Inst_Task_IsActive;
    this.AddInstructionModelObj.Type = 3;
    this.xAddInstructionServices
    .AutoInstructionDataPost(this.AddInstructionModelObj)
    .subscribe(response => {
      this.MessageFlag = "Instruction status update...!";
      this.commonMessage();
        this.GetGridData();
      });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
arr:any=[]
  public showDetails(dataItem: any,content): void {
    this.modalService.open(content, { windowClass: "small" }).result.then(result => { }, reason => { window.scroll(0, 0); });
    console.log('Product Details:', dataItem);
    this.arr=[]
   this.arr.push(dataItem)
  }

  afterRecordUpdate() {
    this.GetGridData();
  }

}

