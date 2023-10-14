import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RepairBasePropertyInformationService } from './repair-base-property-information.service';
import { RepairBasePropertyInformation } from './repair-base-property-information.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RepairBaseHomeService } from '../repair-base-home.service';

@Component({
  selector: 'app-repair-base-property-information',
  templateUrl: './repair-base-property-information.component.html',
  styleUrls: ['./repair-base-property-information.component.scss']
})
export class RepairBasePropertyInformationComponent implements OnInit {

  propertyTypes: any;
  RepairBasePropertyInformationObj: RepairBasePropertyInformation = new RepairBasePropertyInformation();
  formCharacteristicGroup: UntypedFormGroup;
  stories = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  roofPitchs = ['Flat', 'Moderate', 'Steep'];
  structureQuality = ['Q1 - Designer', 'Q2 - Custom', 'Q3 - Builder Plus', 'Q4 - Builder', 'Q5 - Basic', 'Q6 - Economy'];
  attachedGaragesNumberOfCars = ['N/A', '1 cars', '2 cars', '3 cars', '4 cars', '5 cars', '6 cars', '7 cars', '8 cars'];
  builtInGaragesNumberOfCars = ['N/A', '1 cars', '2 cars', '3 cars', '4 cars', '5 cars', '6 cars', '7 cars', '8 cars'];
  conditions = ['C1 - New', 'C2 - Excellent', 'C3 - Good', 'C4 - Average', 'C5 - Fair', 'C6 - Poor'];
  bedRooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  bathRooms = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
  orderID: any;
  apiGetPropertyUrl = '';
  rep_UM_TestApiUrl = '';
  rep_UM_Apikey = '';
  authHeader = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private xActivatedRoute: ActivatedRoute,
    private xRouter: Router,
    private xRepairBasePropertyInformationService: RepairBasePropertyInformationService,
    private xRepairBaseHomeService : RepairBaseHomeService
  ) { }

  ngOnInit(): void {    
    
    this.xActivatedRoute.params.subscribe(params => {
      this.orderID = params.id
      this.RepairBasePropertyInformationObj.RB_OrderID = params.id;
    });    
    this.formCharacteristicGroup = this.formBuilder.group({
      RB_StructureType: ["", Validators.required],
      RB_StructureQuality: ["", Validators.required],
      RB_Condition: ["", Validators.required],
      RB_LivingArea: ["", Validators.required],
      RB_Stories: ["", Validators.required],
      RB_YearBuilt: ["", Validators.required],
      RB_Bedrooms: ["", Validators.required],
      RB_Fullbaths: ["", Validators.required],
      RB_Halfbaths: ["", Validators.required],
      RB_BasementSize: ["", Validators.required],
      RB_Site: ["", Validators.required],
      RB_AttachedGarage: ["", Validators.required],
      RB_BuiltInGarage: ["", Validators.required],
      RB_RoofPitch: ["", Validators.required]
    });
    this.GetCredentialData();
  }
  GetCredentialData() {
    this.xRepairBaseHomeService
      .GetRepairBaseUserMasterDetail()
      .subscribe(response => {
        //console.log("resp User", response);
        if (response[0].length > 0) {
          this.apiGetPropertyUrl = response[0][0].Rep_UM_TestApiUrl + '/api/v1/propertytypescatalog?api_key=MCCO';
          this.rep_UM_TestApiUrl = response[0][0].Rep_UM_TestApiUrl;
          this.rep_UM_Apikey = response[0][0].Rep_UM_Apikey;
          this.authHeader = response[0][0].Rep_UM_ApiAuthorization;
          this.getPropertyTypeCatalog();
          this.getCharacteristics();
        }   
      });
  }
  
  getPropertyTypeCatalog(){
    this.xRepairBasePropertyInformationService
    .getPropertyType(this.apiGetPropertyUrl,this.authHeader)
    .subscribe(response => { 
      this.propertyTypes = response;
    })
  }
  getCharacteristics(){
    this.xRepairBasePropertyInformationService
    .getCharacteristics(this.RepairBasePropertyInformationObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.RepairBasePropertyInformationObj.RB_Bedrooms = response['bedrooms'];
      this.RepairBasePropertyInformationObj.RB_Fullbaths = response['fullBaths'];
      this.RepairBasePropertyInformationObj.RB_Halfbaths = response['halfBaths'];
      this.RepairBasePropertyInformationObj.RB_Stories = response['stories'];
      this.RepairBasePropertyInformationObj.RB_YearBuilt = response['yearBuilt'];
      this.RepairBasePropertyInformationObj.RB_LivingArea = response['totalLivingArea'];
      this.RepairBasePropertyInformationObj.RB_StructureQuality = response['structureQuality'];
      this.RepairBasePropertyInformationObj.RB_Condition = response['condition'];
      this.RepairBasePropertyInformationObj.RB_Site = response['siteLotSizeInSqFt'];
      this.RepairBasePropertyInformationObj.RB_AttachedGarage = response['attachedGaragesNumberOfCars'];
      this.RepairBasePropertyInformationObj.RB_BuiltInGarage = response['builtInGaragesNumberOfCars'];
      this.RepairBasePropertyInformationObj.RB_RoofPitch = response['roofPitch'];
      this.RepairBasePropertyInformationObj.RB_BasementSize = response['basementSizeSF'];
    })
  }
  addCharacteristics(){
    this.xRepairBasePropertyInformationService
    .addCharacteristics(this.RepairBasePropertyInformationObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.xRouter.navigate(['repairBase/repairMain/repairHome/addRoom', this.orderID]);
    })
  }
}
