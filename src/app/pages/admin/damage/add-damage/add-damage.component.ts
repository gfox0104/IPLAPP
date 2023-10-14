import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AddDamageModel } from "./add-damage-model";
import { AddDamageServices } from "./add-damage.service";
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { ViewDamageModel } from '../view-damage/view-damage-model';
import { ViewDamageServices } from '../view-damage/view-damage.service';
import { IplAppModalContent } from 'src/app/components';
import { FormFields } from '../constants';

@Component({
  templateUrl: "./add-damage.component.html"
})

export class AddDamageComponent implements OnInit {

  AddDamageModelObj: AddDamageModel = new AddDamageModel();
  ViewDamageModelObj: ViewDamageModel = new ViewDamageModel();
  DamageTypeList: any;
  
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string;
  dropCkck = false; // common
  DamageValFlag = false;
  ExtValFlag = false;
  WorkOrderObj: any;
  IsEditDisable = false;
  formfields = FormFields;
  isHelpActive = false;
  FormArrayPresetVal: any;
  isdisable = false;
  isLoading = false;
  button = "Save";
  isSubmitted: boolean;
  submitted = false;
 
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xAddDamageServices: AddDamageServices,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xViewDamageServices: ViewDamageServices
  ) {
    this.DamageTypeList = [
      { Id: "1", Name: "Option1" },
      { Id: "2", Name: "Option2" }
    ];

    this.FormArrayPresetVal = [
      {
        Damage_Preset_pkeyId: 0,
        Damage_Preset_Text: "",
        Damage_Preset_IsActive: true,
        Damage_Preset_IsDelete: false,
        Damage_Preset_IsDefault:false,
      }
    ];
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      DamageName: ["", Validators.required],
      DamageInt: ["", Validators.nullValidator],
      DamageLocation: ["", Validators.nullValidator],
      DamageQuantity: ["", Validators.nullValidator],
      DamageEstimate: ["", Validators.nullValidator],
      DamageDiscription: ["", Validators.nullValidator],
      DamageActive: ["", Validators.nullValidator],
      PresetText:["",Validators.nullValidator],
      PresetIsDefault:["",Validators.nullValidator],
      
    });
    this.formfields[1].data = [{ Id: 1, Name: "Int" }, { Id: 2, Name: "Ext" }];
    this.getModelData();
    this.AddDamageModelObj.Damage_Int = 1;
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  // submit form
  formButton() {
    // debugger
    this.submitted = false;
    this.isLoading = true;
    if (this.formUsrCommonGroup.invalid) {
      this.isLoading = false;
      return;
    }
    this.isSubmitted = false;

   
   
    if (this.AddDamageModelObj.Damage_Int == 0) {
      this.ExtValFlag = true;
      this.dropCkck = true;
      return
    }

    if (this.WorkOrderObj !== undefined) {
      this.AddDamageModelObj.Damage_pkeyID = this.WorkOrderObj;
    } else {
      this.AddDamageModelObj.Damage_pkeyID = 0;
    }

    this.AddDamageModelObj.Damage_Disc = JSON.stringify(this.FormArrayPresetVal);
      this.xAddDamageServices
      .AddDamageDataPost(this.AddDamageModelObj)
      .subscribe(response => {
        //debugger;
        this.isLoading = false;
        if (response[0].Status != "0") {
          this.AddDamageModelObj.Damage_pkeyID = parseInt(response[0].Damage_pkeyID);
          this.WorkOrderObj = parseInt(response[0].Damage_pkeyID);
          this.MessageFlag = "Damage Data Saved...!";
          this.isSubmitted = true;
          this.commonMessage();
          this.GetSingleData();
          this.formUsrCommonGroup.disable();
          this.IsEditDisable = true;
          this.button = "Update";
          
            
          // this.submitted = true;
          
        }
        else {
          this.MessageFlag = "This Record Allready Exist...!";
          
            
           
          this.commonMessage();
          this.router.navigate(['/home/damage/viewdamage'])
        }
      });
  }

  

  EditForms() {
    this.IsEditDisable = false;
    this.formUsrCommonGroup.enable();
  }

  Damage_Method() {
    this.DamageValFlag = false;
  }

  Int_Method() {
    this.ExtValFlag = false;
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

  getModelData() {
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.AddDamageModelObj = new AddDamageModel();
      this.isLoading = false;
      this.button = "Save";
      this.isSubmitted = false;
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.WorkOrderObj = parseInt(id);
      this.GetSingleData();
      this.formUsrCommonGroup.disable();
      this.IsEditDisable = true;
      this.button = "Update";
     

     
          
    }
  }

  GetSingleData() {
    // debugger
    this.AddDamageModelObj.Damage_pkeyID = this.WorkOrderObj;
    this.AddDamageModelObj.Type = 2;
    this.xViewDamageServices
      .ViewDamageData(this.AddDamageModelObj)
      .subscribe(response => {
        // console.log('ext', response);

       
        this.AddDamageModelObj.Damage_Type = response[0][0].Damage_Type;
        this.AddDamageModelObj.Damage_Int = response[0][0].Damage_Int;
        this.AddDamageModelObj.Damage_Location = response[0][0].Damage_Location;
        this.AddDamageModelObj.Damage_Qty = response[0][0].Damage_Qty;
        this.AddDamageModelObj.Damage_Estimate = response[0][0].Damage_Estimate.toFixed(2);
        // this.AddDamageModelObj.Damage_Disc = response[0][0].Damage_Disc;

        if(response[0][0].Damage_Disc !=null && response[0][0].Damage_Disc != '')
        {
          this.AddDamageModelObj.Damage_Disc = JSON.parse(response[0][0].Damage_Disc);
        }
        this.FormArrayPresetVal = this.AddDamageModelObj.Damage_Disc;
        this.AddDamageModelObj.Damage_IsActive = response[0][0].Damage_IsActive;
        // this.formUsrCommonGroup.disable();
      });
  }

  clickBack() {
    this.router.navigate(['/home/damage/viewdamage'])
  }

  // DispalyInfo(event) {
  //   //debugger;
  //   this.isHelpActive = event.isHelpActive;
  //   this.MessageFlag = "Add Information for " + event.lblName;
  //   this.commonMessage();
  // }
  DispalyInfo(event: Event, lblName)
  {
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }

  PreTextDeleteArry = [];
  RemoveRowPreset(index, item) {
    let conf = confirm("Are you Sure you want to  Delete this Record..?");
    if (conf) {
      this.PreTextDeleteArry.push(item);
      this.FormArrayPresetVal.splice(index, 1);
    }
  }
  // Insert New Row
  AddMoreRowPreset() {
    var data = {
      Damage_Preset_pkeyId: 0,
      Damage_Preset_Text: "",
      Damage_Preset_IsActive: true,
      Damage_Preset_IsDelete: false,
      Damage_Preset_IsDefault:false,
    };
    this.FormArrayPresetVal.push(data);
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
}
