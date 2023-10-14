import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
import { AddPhotoHeaderTemplatesModel } from './photo-header-template-model';
import { FormFields } from './form-fields';
import { IplAppModalContent } from "src/app/components";

@Component({
  templateUrl: "./photo-header-template.component.html"
})

export class AddPhotoHeaderTemplatesComponent implements OnInit {
  submitted = false;
  formUsrCommonGroup: FormGroup;
  MessageFlag: string;
  dropdownList: any;
  AddPhotoHeaderTemplatesModelObj: AddPhotoHeaderTemplatesModel = new AddPhotoHeaderTemplatesModel();
  formFields = FormFields;
  isHelpActive = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private xmodalService: NgbModal,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices
  ) {
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

  // submit form
  formButton() {
    this.submitted = false;
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
        this.dropdownList = response[0];
        this.formFields[0].data =response[0]
      });
  }
  commondrd(value){
    // debugger
    if (value.val == "Clientcompany") {
      if (value.event !='') {
        // debugger
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
    this.router.navigate(['/home/adminlinkpage'])
  }
  DispalyInfo(event) {
    // debugger;
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
}
