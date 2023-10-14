import { Component, OnInit } from '@angular/core';
import { RepairBaseCreateService } from './repair-base-create.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RepairBaseCreatestep1Model } from './repair-base-create.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from "@angular/router";
import { RepairBaseHomeService } from '../repair-base-home.service';

@Component({
  selector: 'app-repair-base-create',
  templateUrl: './repair-base-create.component.html',
  styleUrls: ['./repair-base-create.component.scss']
})
export class RepairBaseCreateComponent implements OnInit {

  RepairBaseCreatestep1ModelObj: RepairBaseCreatestep1Model = new RepairBaseCreatestep1Model();
  formUsrCommonGroup: UntypedFormGroup;
  states: any;
  propertyTypes: any;
  orderID: any;
  estimate: any;
  apiGetStateUrl = '';
  apiGetPropertyUrl = '';
  apiPostEstimateUrl = '';
  authHeader = '';
  submitted = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xRepairBaseCreateService: RepairBaseCreateService,
    private xRouter: Router,
    private spinner: NgxSpinnerService,
    private xRepairBaseHomeService : RepairBaseHomeService
    
  ) { }
  ngOnInit(): void {
    this.spinner.show();
    this.GetCredentialData();
    this.formUsrCommonGroup = this.formBuilder.group({
      RB_PropertyType: ["", Validators.required],
      RB_PropertyAddress: ["", Validators.required],
      RB_City: ["", Validators.required],
      RB_State: ["", Validators.required],
      RB_Zip: ["", Validators.required]
    });
  }
  get fx() {
		return this.formUsrCommonGroup.controls;
  }
  GetCredentialData() {
    this.xRepairBaseHomeService
      .GetRepairBaseUserMasterDetail()
      .subscribe(response => {
        //console.log("resp User", response);
        if (response[0].length > 0) {
          this.apiGetStateUrl = response[0][0].Rep_UM_TestApiUrl + '/api/v1/usstatescatalog?api_key=' + response[0][0].Rep_UM_Apikey;
          this.apiGetPropertyUrl = response[0][0].Rep_UM_TestApiUrl + '/api/v1/propertytypescatalog?api_key=' + response[0][0].Rep_UM_Apikey;
          this.apiPostEstimateUrl = response[0][0].Rep_UM_TestApiUrl + '/api/v1/orders?api_key=' + response[0][0].Rep_UM_Apikey;
          this.authHeader = response[0][0].Rep_UM_ApiAuthorization;
          this.getPropertyTypeCatalog();
          this.getState();
        }   
      });
  }

  getState(){
    this.xRepairBaseCreateService
    .getStateData(this.apiGetStateUrl,this.authHeader)
    .subscribe(response => {
      this.states = response;
      this.spinner.hide();
    })
  }
  getPropertyTypeCatalog(){
    this.xRepairBaseCreateService
    .getPropertyType(this.apiGetPropertyUrl,this.authHeader)
    .subscribe(response => { 
      this.propertyTypes = response;
    })
  }
  changeState(e) {
    this.RepairBaseCreatestep1ModelObj.RB_State = e.target.value;
  }
  createEstimate(){
    this.submitted = true;
    if (this.formUsrCommonGroup.invalid) {
     return;
   }
    this.xRepairBaseCreateService
    .createEstimate(this.RepairBaseCreatestep1ModelObj,this.apiPostEstimateUrl,this.authHeader)
    .subscribe( response => {
      this.estimate = response;
      this.xRouter.navigate(['repairBase/repairMain/repairHome/property', this.estimate.id]);
    })
  }

}
