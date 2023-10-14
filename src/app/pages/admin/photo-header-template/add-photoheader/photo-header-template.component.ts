import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderDrodownServices } from "../../../services/common-drop-down/drop-down.service";
import { AddPhotoHeaderTemplatesModel } from './photo-header-template-model';
import { FormFields } from './form-fields';
import { IplAppModalContent } from "src/app/components";
import { AddPhotoHeaderTemplatesServices } from "./photo-header-template.service";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { ViewPhotoHeaderServices } from "../view-photoheader/view-photoheader.service";

@Component({
  templateUrl: "./photo-header-template.component.html"
})

export class AddPhotoHeaderTemplatesComponent implements OnInit {
  submitted = false;
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string;
  dropdownList: any;
  AddPhotoHeaderTemplatesModelObj: AddPhotoHeaderTemplatesModel = new AddPhotoHeaderTemplatesModel();
  formFields = FormFields;
  isHelpActive = false;
  WorkOrderObj: any;
  constructor(
    private router: Router,
    private xRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xAddPhotoHeaderTemplatesServices:AddPhotoHeaderTemplatesServices,
    private xViewPhotoHeaderServices:ViewPhotoHeaderServices,
    private EncrDecr: EncrDecrService,
  ) {
    this.getModelData();
    this.GetClientDropDown();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      Clientcompany: ["", Validators.required],
      HeaderTemp: ["", Validators.nullValidator],
      PFTemp: ['',  Validators.nullValidator],
      PDFCheck: ['', Validators.nullValidator],
    });
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  getModelData() {
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.AddPhotoHeaderTemplatesModelObj = new AddPhotoHeaderTemplatesModel();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.WorkOrderObj = parseInt(id);
      this.IsEditDisable = true;
      this.GetSingleData();
    }
  }

  GetSingleData() {
    this.AddPhotoHeaderTemplatesModelObj.Photo_head_PkeyId = this.WorkOrderObj;
    this.AddPhotoHeaderTemplatesModelObj.Type = 2;
    this.xViewPhotoHeaderServices
      .ViewPhotoHeaderData(this.AddPhotoHeaderTemplatesModelObj)
      .subscribe(response => {
        //console.log('ext', response);
        this.AddPhotoHeaderTemplatesModelObj.Photo_head_PkeyId = response[0][0].Photo_head_PkeyId;
        this.AddPhotoHeaderTemplatesModelObj.Photo_head_HeaderTemp = response[0][0].Photo_head_HeaderTemp;
        this.AddPhotoHeaderTemplatesModelObj.Photo_head_Client_Company = response[0][0].Photo_head_Client_Company;
        this.AddPhotoHeaderTemplatesModelObj.Photo_head_FileName_Temp = response[0][0].Photo_head_FileName_Temp;
        this.AddPhotoHeaderTemplatesModelObj.Photo_head_Pdf_Temp = response[0][0].Photo_head_Pdf_Temp
        this.AddPhotoHeaderTemplatesModelObj.Photo_head_IsActive = response[0][0].Photo_head_IsActive;
        this.formUsrCommonGroup.disable();
        this.IsEditDisable = true;
      });
  }


  // submit form
  formButton() {
    this.submitted = false;
    if (this.formUsrCommonGroup.invalid ) {
      return;
    }
this.xAddPhotoHeaderTemplatesServices.PhotoHeaderDataPost(this.AddPhotoHeaderTemplatesModelObj)
.subscribe(res=>{
  if (res.length != 0) {
    this.IsEditDisable = false;
    // this.GetSingleData();
    this.MessageFlag = "Photo Header Data Saved...!";
    this.submitted = true;
    this.commonMessage();
  }

})

  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
      if (!this.isHelpActive) {
        this.xmodalService.dismissAll();
      }
     });
  }

  ModelObj: any;
  IsEditDisable = false;

  GetClientDropDown() {
    this.xWorkOrderDrodownServices
      .DropdownGetClientnamesData()
      .subscribe(response => {
        //console.log('company',response)
        this.dropdownList = response[0];
        this.formFields[0].data =response[0]
      });
  }
  commondrd(value){
    //debugger
    if (value.val == "Clientcompany") {
      if (value.event !='') {
        //debugger
        var filteredcustomer =  this.dropdownList.filter(function (el) {
          return el.Client_Company_Name != "";
        });
        this.formFields[0].data = filteredcustomer.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.event.toLowerCase()) !== -1);
      }
      else{
        this.formFields[0].data = this.dropdownList.slice();
      }
    }
      }

  clickBack() {
    this.router.navigate(['/home/photo/viewphotoheader'])
  }
  DispalyInfo(event) {
    //debugger;
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
}
