import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AddUOMModel } from "./add-UOM-model";
import { AddUOMServices } from './add-UOM.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewUOMServices } from '../view-UOM/view-UOM.service';
import { ViewUOMModel } from '../view-UOM/view-UOM-model';
import { FormFields } from '../constants';
import { IplAppModalContent } from 'src/app/components';

@Component({
  templateUrl: "./add-UOM.component.html"
})

export class AddUomComponent implements OnInit {

  AddUOMModelobj: AddUOMModel = new AddUOMModel();
  ViewUOMModelobj: ViewUOMModel = new ViewUOMModel();
  submitted = false; // submitted
  formUsrCommonGroup: FormGroup;
  MessageFlag: string;
  formFields = FormFields;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private xAddUOMServices: AddUOMServices,
    private xmodalService: NgbModal,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xViewUOMServices: ViewUOMServices
  ) { }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      UOMName: ["", Validators.required],
      disuom: ["", Validators.nullValidator],
    });
    this.getModelData();
  }

  // submit form
  formButton() {
    this.submitted = false;

    if (this.WorkOrderObj !== undefined) {
      this.AddUOMModelobj.UOM_pkeyId = this.WorkOrderObj;
    } else {
      this.AddUOMModelobj.UOM_pkeyId = 0;
    }

    this.xAddUOMServices
      .UOMDataPost(this.AddUOMModelobj)
      .subscribe(response => {
        if (response[0].Status != "0") {
          this.AddUOMModelobj.UOM_pkeyId = parseInt(response[0].UOM_pkeyId);
          this.MessageFlag = "UOM Data Saved...!";
          this.submitted = true;
          this.commonMessage();
        }
      });
  }

  //get data
  WorkOrderObj: any;
  IsEditDisable = false;

  getModelData() {
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.AddUOMModelobj = new AddUOMModel();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.WorkOrderObj = parseInt(id);
      this.GetSingleData();
    }
  }

  GetSingleData() {
    this.AddUOMModelobj.UOM_pkeyId = this.WorkOrderObj;
    this.AddUOMModelobj.Type = 2;

    this.xViewUOMServices.ViewUOMData(this.AddUOMModelobj)
      .subscribe(response => {
        this.AddUOMModelobj.UOM_Name = response[0][0].UOM_Name;
        this.AddUOMModelobj.UOM_IsActive = response[0][0].UOM_IsActive;
      });

    this.formUsrCommonGroup.disable();
    this.IsEditDisable = true;
  }

  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  clickBack() {
    this.router.navigate(['/home/uom/viewuom'])
  }
}
