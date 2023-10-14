import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { BidInvoiceItemModel } from "./bid-invoice-item-model";
import { Task_GroupPopupModel } from "./bid-invoice-item-model";
import { BidInvoiceItemServices } from "./bid-invoice-item.service";
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { IplAppModalContent } from 'src/app/components';
import { FormFields } from '../constants';

@Component({
  templateUrl: "./bid-invoice-item.component.html"
})

export class BidInvoiceItemComponent implements OnInit {
  submitted = false;
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string;
  popformArray = [];
  WKDivFlag = true;
  TaskGroupList: any;
  TaskUOMList: any;
  dataItemx: any;
  BidInvoiceItemModelObj: BidInvoiceItemModel = new BidInvoiceItemModel();
  Task_GroupPopupModelObj: Task_GroupPopupModel = new Task_GroupPopupModel();
  ModelObj: any;
  IsEditDisable = false;
  formFields = FormFields;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xBidInvoiceItemServices: BidInvoiceItemServices,
    private xRouter: Router,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private EncrDecr: EncrDecrService
  ) {
    this.popformArray = [{ Task_Group_Name: "", Task_Group_Name_pkeyID: 0 }];
    this.GetTaskGroup();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      TaskName: ["", Validators.required],
      ContractorUnitVal: ["", Validators.required, Validators.pattern('/^[0-9]*\.?[0-9]*$/') ],
      ClientUnitVal: ["", Validators.required, Validators.pattern('/^[0-9]*\.?[0-9]*$/')],
      TaskType:[''],
      TaskGroup: [''],
      TaskUOM: [''],
      TaskPhotoName: [''],
      activeaic: [''],
      activeatou: ['']
    });

    this.getModelData();
  }
  validate(val){
  
  }
  // submit form
  formButton() {
    //dfebugger
    this.submitted = false;
  
    this.xBidInvoiceItemServices
      .TaskMasterPost(this.BidInvoiceItemModelObj)
      .subscribe(response => {
        if (response[0].Status != "0") {
          this.BidInvoiceItemModelObj.Task_pkeyID = parseInt(
            response[0].Task_pkeyID
          );

          this.MessageFlag = "Task Data Saved...!";
          this.submitted = true;
          this.commonMessage();
          this.dataItemx = this.BidInvoiceItemModelObj;
          var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.BidInvoiceItemModelObj.Task_pkeyID);
          this.xRouter.navigate(["/task/addinvoiceitems", btoa(encrypted)]);
        }
      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  // copy name sathi
  onBlurUserName() {
    this.BidInvoiceItemModelObj.Task_Photo_Label_Name = this.BidInvoiceItemModelObj.Task_Name;
  }

  open(content) {
    this.WKDivFlag = false;
    this.xmodalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.WKDivFlag = true;
        },
        reason => {
          this.WKDivFlag = true;
        }
      );
  }

  // pop pop add
  AddMoreRowCatepop() {
    var data = { Task_Group_Name: "", Task_Group_Name_pkeyID: 0 };
    if (this.popformArray.length != 0) {
      if (
        this.popformArray[this.popformArray.length - 1].Task_Group_Name != ""
      ) {
        this.popformArray.push(data);
      }
    } else {
      this.popformArray.push(data);
    }
  }

  // popup remove
  RemovePOPdata(inx, item) {
    if (inx != 0) {
      var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
      if (cfrm == true) {
        this.popformArray.splice(inx, 1);
        this.Task_GroupPopupModelObj.Type = 4;
        this.Task_GroupPopupModelObj.Task_Group_pkeyID = item.Task_Group_pkeyID;

        this.xBidInvoiceItemServices
          .TaskGroupPOPUPPost(this.Task_GroupPopupModelObj)
          .subscribe(response => {
            this.TaskGroupList = response[0];
            this.formFields[2].data = response[0],
            this.popformArray = response[0];
          });
      }
    }
  }

  // pop form
  FormButtonPOPUp() {
    this.popformArray;
    if (this.popformArray[this.popformArray.length - 1].Task_Group_Name == "") {
      this.popformArray.splice(this.popformArray.length - 1, 1);
    }
    this.Task_GroupPopupModelObj.Task_Group_NameArray = this.popformArray;

    this.xBidInvoiceItemServices
      .TaskGroupPOPUPPost(this.Task_GroupPopupModelObj)
      .subscribe(response => {
        this.TaskGroupList = response[0];
        this.popformArray = response[0];

        this.MessageFlag = "Task Groups Saved...!";
        this.commonMessage();
      });
  }

  // get work type group
  GetTaskGroup() {
    this.xBidInvoiceItemServices
      .GetTaskGroupDetailsDropdownGet()
      .subscribe(response => {
        this.TaskGroupList = response[0];
        this.popformArray = response[0];
        this.formFields[2].data = response[0];
        this.getOUMDropdown();
      });
  }

  getModelData() {
    if (this.ModelObj == undefined) {
      this.BidInvoiceItemModelObj = new BidInvoiceItemModel();
    } else {
      this.BidInvoiceItemModelObj.Task_pkeyID = this.ModelObj.Task_pkeyID;
      this.BidInvoiceItemModelObj.Task_Name = this.ModelObj.Task_Name;
      this.BidInvoiceItemModelObj.Task_Group = this.ModelObj.Task_Group;
      this.BidInvoiceItemModelObj.Task_UOM = this.ModelObj.Task_UOM;
      this.BidInvoiceItemModelObj.Task_Type = this.ModelObj.Task_Type;
      this.BidInvoiceItemModelObj.Task_Contractor_UnitPrice = this.ModelObj.Task_Contractor_UnitPrice;
      this.BidInvoiceItemModelObj.Task_Client_UnitPrice = this.ModelObj.Task_Client_UnitPrice;
      this.BidInvoiceItemModelObj.Task_IsActive = this.ModelObj.Task_IsActive;
      this.BidInvoiceItemModelObj.Task_Photo_Label_Name = this.ModelObj.Task_Photo_Label_Name;
      this.formUsrCommonGroup.disable();
      this.IsEditDisable = true;
      this.BidInvoiceItemModelObj.Type = 2;
    }
  }

  // GetUOM
  getOUMDropdown() {
    this.xWorkOrderDrodownServices.DropdownGetUOM()
      .subscribe(response => {
        this.TaskUOMList = response[0];
        this.formFields[3].data = response[0];
      })
  }

  clickBack() {
    this.router.navigate(['/home/task/bidinvoiceitemviewtask'])
  }
}
