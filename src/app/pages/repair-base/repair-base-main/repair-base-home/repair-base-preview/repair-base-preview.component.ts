import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { RepairBaseCharactoristicsModel, RepairBaseModel } from './repair-base-preview.model';
import { RepairBasePreviewService } from './repair-base-preview.service';
import { RepairBaseHomeService } from '../repair-base-home.service';

@Component({
  selector: 'app-repair-base-preview',
  templateUrl: './repair-base-preview.component.html',
  styleUrls: ['./repair-base-preview.component.scss']
})
export class RepairBasePreviewComponent implements OnInit {
  RepairBaseCharactoristicsModelObj: RepairBaseCharactoristicsModel = new RepairBaseCharactoristicsModel();
  RepairBaseModelObj: RepairBaseModel = new RepairBaseModel;
  areas: any = [];
  totalEstimatePrice: any = 0;
  currentDate: any;
  rep_UM_TestApiUrl = '';
  rep_UM_Apikey = '';
  authHeader = '';

  constructor(
    public datepipe: DatePipe,
    private xActivatedRoute: ActivatedRoute,
    private xRouter: Router,
    private spinner: NgxSpinnerService,
    private xRepairBasePreviewService: RepairBasePreviewService,
    private xRepairBaseHomeService : RepairBaseHomeService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    let date = new Date();
    this.currentDate =this.datepipe.transform(date, 'dd/MM/yyyy');
    this.xActivatedRoute.params.subscribe(params => {
      this.RepairBaseModelObj.RB_OrderID = params.id;
    });
   

  }
  GetCredentialData() {
    this.xRepairBaseHomeService
      .GetRepairBaseUserMasterDetail()
      .subscribe(response => {
        //console.log("resp User", response);
        if (response[0].length > 0) {
          this.rep_UM_TestApiUrl = response[0][0].Rep_UM_TestApiUrl;
          this.rep_UM_Apikey = response[0][0].Rep_UM_Apikey;
          this.authHeader = response[0][0].Rep_UM_ApiAuthorization;
          this.getCharateristics()
          this.getPropertyType();
          this.getRoomData();
        }   
      });
  }

  getCharateristics(){
    this.xRepairBasePreviewService
    .getCharacteristics(this.RepairBaseModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response =>{
      this.RepairBaseCharactoristicsModelObj.RB_Bedrooms = response['bedrooms'];
      this.RepairBaseCharactoristicsModelObj.RB_Fullbaths = response['fullBaths'];
      this.RepairBaseCharactoristicsModelObj.RB_Halfbaths = response['halfBaths'];
      this.RepairBaseCharactoristicsModelObj.RB_Stories = response['stories'];
      this.RepairBaseCharactoristicsModelObj.RB_YearBuilt = response['yearBuilt'];
      this.RepairBaseCharactoristicsModelObj.RB_LivingArea = response['totalLivingArea'];
      this.RepairBaseCharactoristicsModelObj.RB_StructureQuality = response['structureQuality'];
      this.RepairBaseCharactoristicsModelObj.RB_Condition = response['condition'];
      this.RepairBaseCharactoristicsModelObj.RB_Site = response['siteLotSizeInSqFt'];
      this.RepairBaseCharactoristicsModelObj.RB_AttachedGarage = response['attachedGaragesNumberOfCars'];
      this.RepairBaseCharactoristicsModelObj.RB_BuiltInGarage = response['builtInGaragesNumberOfCars'];
      this.RepairBaseCharactoristicsModelObj.RB_RoofPitch = response['roofPitch'];
      this.RepairBaseCharactoristicsModelObj.RB_BasementSize = response['basementSizeSF'];
    })
  }

  getPropertyType(){
    this.xRepairBasePreviewService
    .getPropertyType(this.RepairBaseModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.RepairBaseModelObj.RB_Address = response['address'];
      this.RepairBaseModelObj.RB_City = response['city'];
      this.RepairBaseModelObj.RB_PropertyType = response['propertyType'];
      this.RepairBaseModelObj.RB_Zip = response['zip'];
    })
  }

  getRoomData(){
    this.xRepairBasePreviewService
    .getRoomData(this.RepairBaseModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.areas = response['areas'];
      this.areas.forEach(area => {
        this.xRepairBasePreviewService
        .getRepairData(this.RepairBaseModelObj, area.areaId,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
        .subscribe(response => {
          area['repairs'] = response['repairs'];
          var sum = 0;
          response['repairs'].forEach(repair => {
            sum = sum + repair.totalCost;
            this.totalEstimatePrice = this.totalEstimatePrice + repair.totalCost;
          });
          area['totalPrice'] = sum;
        })
      });
      this.spinner.hide();
    })
  }

  printEstimate(){
    print();
  }

  goback() {
    this.xRouter.navigate(['repairBase/repairMain/repairHome/addRoom/'+ this.RepairBaseModelObj.RB_OrderID]);
  }
}
