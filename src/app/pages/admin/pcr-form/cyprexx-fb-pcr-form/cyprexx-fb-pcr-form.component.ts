import { Component, Input, OnInit } from '@angular/core';
import {
  ConveyanceConditionModel,
  DamagesModel,
  DebrisHazzardsModel,
  GeneralCommentsModel,
  GeneralInformationModel,
  GrageShedOutbuildingSecuringModel,
  HazardAbatementModel,
  OccupancyInformationModel,
  PCR_CyperexxFormsMasterModel,
  PoolModel,
  PropertyAccessibilityModel,
  PropertyTypeModel,
  SecuringLockChangesModel,
  SignageModel,
  UtilitiesModel,
  VendorSignatureModel,
  WindowSecuringBoardingReglazingModel,
  WinterizationModel,
  YardModel,
} from './cyprexx-fb-pcr-form.model';
import { PCRCyperexxFormsMasterServices } from './cyprexx-fb-pcr-form.service';

@Component({
  selector: 'app-cyprexx-fb-pcr-form',
  templateUrl: './cyprexx-fb-pcr-form.component.html',
  styleUrls: ['./cyprexx-fb-pcr-form.component.scss'],
})
export class CyprexxFbPcrFormComponent implements OnInit {
  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:PCR_CyperexxFormsMasterModel[];
  // PCR_History: PCR_CyperexxFormsMasterModel =new PCR_CyperexxFormsMasterModel();

  _pcrCyperexxFormsMasterModelpbj: PCR_CyperexxFormsMasterModel =
    new PCR_CyperexxFormsMasterModel();
  _generalInformationModelobj: GeneralInformationModel =
    new GeneralInformationModel();
  _propertyAccessibilityModelobj: PropertyAccessibilityModel =
    new PropertyAccessibilityModel();
  _propertyTypeModelobj: PropertyTypeModel = new PropertyTypeModel();
  _occupancyInformationModelobj: OccupancyInformationModel =
    new OccupancyInformationModel();
  _utilitiesModelobj: UtilitiesModel = new UtilitiesModel();
  _securingLockChangesModelobj: SecuringLockChangesModel =
    new SecuringLockChangesModel();
  _grageShedOutbuildingSecuringModelobj: GrageShedOutbuildingSecuringModel =
    new GrageShedOutbuildingSecuringModel();
  _windowSecuringBoardingReglazingModelobj: WindowSecuringBoardingReglazingModel =
    new WindowSecuringBoardingReglazingModel();
  _poolModelobj: PoolModel = new PoolModel();
  _debrisHazzardsModelobj: DebrisHazzardsModel = new DebrisHazzardsModel();
  _yardModelobj: YardModel = new YardModel();
  _hazardAbatementModelobj: HazardAbatementModel = new HazardAbatementModel();
  _winterizationModelobj: WinterizationModel = new WinterizationModel();
  _damagesModelobj: DamagesModel = new DamagesModel();
  _signageModelobj: SignageModel = new SignageModel();
  _conveyanceConditionModelobj: ConveyanceConditionModel =
    new ConveyanceConditionModel();
  _generalCommentsModelobj: GeneralCommentsModel = new GeneralCommentsModel();
  _vendorSignatureModelobj: VendorSignatureModel = new VendorSignatureModel();

  arrayObj: any = [{}];
  jsonObj: any = {};

  ButtonProType: string;
  isLoadingProType: boolean;
  isLoadingProIAcc: boolean;
  ButtonProIAcc: string;
  isLoading: boolean;
  button: string = 'Save';
  constructor(
    private _pcrCyperexxFormsMasterServices: PCRCyperexxFormsMasterServices
  ) {
    this._generalInformationModelobj = new GeneralInformationModel();
  }

  ngOnInit(): void {
    if (this.WorkorderId > 0) {
      this.getPcrcyperexxMasterData();
    }
  }

  getPcrcyperexxMasterData() {
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_WO_Id = this.WorkorderId;
    this._pcrCyperexxFormsMasterModelpbj.Type = 3;
    this._pcrCyperexxFormsMasterServices
      .getPCRCYPREXXFORMSMasterData(this._pcrCyperexxFormsMasterModelpbj)
      .subscribe((res) => {
        // debugger;
        if (res[0].length > 0) {
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_pkeyId =
            res[0][0].PCR_PCFM_pkeyId;
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_WO_Id =
            res[0][0].PCR_PCFM_WO_Id;

          let General_Inf = JSON.parse(res[0][0].PCR_PCFM_General_Information);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Information =
            General_Inf;
          this._generalInformationModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Information;

          let Property_Accessibility = JSON.parse(
            res[0][0].PCR_PCFM_Property_Accessibility
          );
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Accessibility =
            Property_Accessibility;
          this._propertyAccessibilityModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Accessibility;

          let Property_type = JSON.parse(res[0][0].PCR_PCFM_Property_Type);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Type =
            Property_type;
          this._propertyTypeModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Type;

          let Utilities = JSON.parse(res[0][0].PCR_PCFM_Utilities);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Utilities = Utilities;
          this._utilitiesModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Utilities;

          let Occupancy_Info = JSON.parse(
            res[0][0].PCR_PCFM_Occupancy_Information
          );
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Occupancy_Information =
            Occupancy_Info;
          this._occupancyInformationModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Occupancy_Information;

          let _securingLock = JSON.parse(
            res[0][0].PCR_PCFM_Securing__Lock_Changes
          );
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Securing__Lock_Changes =
            _securingLock;
          this._securingLockChangesModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Securing__Lock_Changes;

          let Grage_shed = JSON.parse(
            res[0][0].PCR_PCFM_Grage_shed_outbuilding_securing
          );
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Grage_shed_outbuilding_securing =
            Grage_shed;
          this._grageShedOutbuildingSecuringModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Grage_shed_outbuilding_securing;

          let Window_securing = JSON.parse(res[0][0].PCR_PCFM_Window_securing);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Window_securing =
            Window_securing;
          this._windowSecuringBoardingReglazingModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Window_securing;

          let PCFM_Pool = JSON.parse(res[0][0].PCR_PCFM_Pool);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Pool = PCFM_Pool;
          this._poolModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Pool;

          let Debris = JSON.parse(res[0][0].PCR_PCFM_Debris_Hazzards);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Debris_Hazzards =
            Debris;
          this._debrisHazzardsModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Debris_Hazzards;

          let yard = JSON.parse(res[0][0].PCR_PCFM_Yard);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Yard = yard;
          this._yardModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Yard;

          let hazardAbatement = JSON.parse(res[0][0].PCR_PCFM_Hazard_Abatement);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Hazard_Abatement =
            hazardAbatement;
          this._hazardAbatementModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Hazard_Abatement;

          let Winterization = JSON.parse(res[0][0].PCR_PCFM_Winterization);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Winterization =
            Winterization;
          this._winterizationModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Winterization;

          let Damages = JSON.parse(res[0][0].PCR_PCFM_Damages);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Damages = Damages;
          this._damagesModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Damages;

          let Signage = JSON.parse(res[0][0].PCR_PCFM_Signage);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Signage = Signage;
          this._signageModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Signage;

          let Canveyance = JSON.parse(res[0][0].PCR_PCFM_Canveyance);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Canveyance = Canveyance;
          this._conveyanceConditionModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Canveyance;

          let General_Comment = JSON.parse(res[0][0].PCR_PCFM_General_Comment);
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Comment =
            General_Comment;
          this._generalCommentsModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Comment;

          let Vendor_Signature = JSON.parse(
            res[0][0].PCR_PCFM_Vendor_Signature
          );
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Vendor_Signature =
            Vendor_Signature;
          this._vendorSignatureModelobj =
            this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Vendor_Signature;
        }
        if (res[1].length > 0) {


          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_CyperexxFormsMasterModel();
            convertedData.PCR_PCFM_General_Information=JSON.parse(element.PCR_PCFM_General_Information);
            convertedData.PCR_PCFM_Property_Accessibility=JSON.parse(element.PCR_PCFM_Property_Accessibility);
            convertedData.PCR_PCFM_Property_Type=JSON.parse(element.PCR_PCFM_Property_Type);
            convertedData.PCR_PCFM_Utilities=JSON.parse(element.PCR_PCFM_Utilities);
            convertedData.PCR_PCFM_Occupancy_Information=JSON.parse(element.PCR_PCFM_Occupancy_Information);
            convertedData.PCR_PCFM_Securing__Lock_Changes=JSON.parse(element.PCR_PCFM_Securing__Lock_Changes);
            convertedData.PCR_PCFM_Grage_shed_outbuilding_securing=JSON.parse(element.PCR_PCFM_Grage_shed_outbuilding_securing);
            convertedData.PCR_PCFM_Window_securing=JSON.parse(element.PCR_PCFM_Window_securing);
            convertedData.PCR_PCFM_Pool=JSON.parse(element.PCR_PCFM_Pool);
            convertedData.PCR_PCFM_Debris_Hazzards=JSON.parse(element.PCR_PCFM_Debris_Hazzards);
            convertedData.PCR_PCFM_Yard=JSON.parse(element.PCR_PCFM_Yard);
            convertedData.PCR_PCFM_Hazard_Abatement=JSON.parse(element.PCR_PCFM_Hazard_Abatement);
            convertedData.PCR_PCFM_Winterization=JSON.parse(element.PCR_PCFM_Winterization);
            convertedData.PCR_PCFM_Damages=JSON.parse(element.PCR_PCFM_Damages);
            convertedData.PCR_PCFM_Signage=JSON.parse(element.PCR_PCFM_Signage);
            convertedData.PCR_PCFM_Canveyance=JSON.parse(element.PCR_PCFM_Canveyance);
            convertedData.PCR_PCFM_General_Comment=JSON.parse(element.PCR_PCFM_General_Comment);
            convertedData.PCR_PCFM_Vendor_Signature=JSON.parse(element.PCR_PCFM_Vendor_Signature);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;


          // this.PCR_History.PCR_PCFM_General_Information = JSON.parse(res[1][0].PCR_PCFM_General_Information);
          // this.PCR_History.PCR_PCFM_Property_Accessibility = JSON.parse(res[1][0].PCR_PCFM_Property_Accessibility);
          // this.PCR_History.PCR_PCFM_Property_Type = JSON.parse(res[1][0].PCR_PCFM_Property_Type);
          // this.PCR_History.PCR_PCFM_Utilities = JSON.parse(res[1][0].PCR_PCFM_Utilities);
          // this.PCR_History.PCR_PCFM_Occupancy_Information = JSON.parse(res[1][0].PCR_PCFM_Occupancy_Information);
          // this.PCR_History.PCR_PCFM_Securing__Lock_Changes = JSON.parse(res[1][0].PCR_PCFM_Securing__Lock_Changes);
          // this.PCR_History.PCR_PCFM_Grage_shed_outbuilding_securing = JSON.parse(res[1][0].PCR_PCFM_Grage_shed_outbuilding_securing);
          // this.PCR_History.PCR_PCFM_Window_securing = JSON.parse(res[1][0].PCR_PCFM_Window_securing);
          // this.PCR_History.PCR_PCFM_Pool = JSON.parse(res[1][0].PCR_PCFM_Pool);
          // this.PCR_History.PCR_PCFM_Debris_Hazzards = JSON.parse(res[1][0].PCR_PCFM_Debris_Hazzards);
          // this.PCR_History.PCR_PCFM_Yard = JSON.parse(res[1][0].PCR_PCFM_Yard);
          // this.PCR_History.PCR_PCFM_Hazard_Abatement = JSON.parse(res[1][0].PCR_PCFM_Hazard_Abatement);
          // this.PCR_History.PCR_PCFM_Winterization = JSON.parse(res[1][0].PCR_PCFM_Winterization);
          // this.PCR_History.PCR_PCFM_Damages = JSON.parse(res[1][0].PCR_PCFM_Damages);
          // this.PCR_History.PCR_PCFM_Signage = JSON.parse(res[1][0].PCR_PCFM_Signage);
          // this.PCR_History.PCR_PCFM_Canveyance = JSON.parse(res[1][0].PCR_PCFM_Canveyance);
          // this.PCR_History.PCR_PCFM_General_Comment = JSON.parse(res[1][0].PCR_PCFM_General_Comment);
          // this.PCR_History.PCR_PCFM_Vendor_Signature = JSON.parse(res[1][0].PCR_PCFM_Vendor_Signature);
        }
      });
  }

  TabVal: Number = 1;
  TabClickMethod(TabNo: Number): void {
    switch (this.TabVal) {
      case 1:
        //alert('this tab '+this.TabVal);
        this.FormButton1(false); //property form
        break;

      case 2:
        this.ViolationSubmit(false);
        break;

      case 3:
        this.SecuringSubmit(false);
        break;

      case 4:
        this.SubmitWinterization(false);
        break;

      case 5:
        this.YardMaintananceSubmit(false);
        break;

      case 6:
        this.DebrisSubmit(false);
        break;

      case 7:
        this.PcrRoofData(false);
        break;

      case 8:
        this.PcrPoolData(false);
        break;

      case 9:
        this.PostUtilitiesSubmit(false);
        break;

      case 10:
        this.ApplianceSubmit(false);
        break;

      case 11:
        this.AddPCRDamage(false);
        break;

      case 12:
        this.PCRConveyancesave(false);
        break;

      default:
        break;
    }
    this.TabVal = TabNo;
  }
  FormButton1(arg0: boolean) {
    //  debugger
    //this.jsonObj=this._generalInformationModelobj
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Information=JSON.stringify(this._generalInformationModelobj)
    //let jsonObj = JSON.parse(this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Information)
    //let name: string = jsonObj.name
    //let property: string = jsonObj.property
    //this.savePCR_Cyperexx_FormsMasterData();
  }
  ViolationSubmit(arg0: boolean) {
    // debugger
    var val = this._generalInformationModelobj;
  }
  SecuringSubmit(arg0: boolean) {}
  SubmitWinterization(arg0: boolean) {}
  YardMaintananceSubmit(arg0: boolean) {}
  DebrisSubmit(arg0: boolean) {}
  PcrRoofData(arg0: boolean) {}
  PcrPoolData(arg0: boolean) {}
  PostUtilitiesSubmit(arg0: boolean) {}
  ApplianceSubmit(arg0: boolean) {}
  AddPCRDamage(arg0: boolean) {}
  PCRConveyancesave(arg0: boolean) {}

  savePCR_Cyperexx_FormsMasterData() {
    if (this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_pkeyId > 0) {
      this._pcrCyperexxFormsMasterModelpbj.Type = 2;
    } else {
      this._pcrCyperexxFormsMasterModelpbj.Type = 1;
    }
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_IsActive = true;
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_IsDelete = false;
    this._pcrCyperexxFormsMasterModelpbj.fwo_pkyeId = this.FWO_PkyeId;
    this._pcrCyperexxFormsMasterServices
      .PostPCRCYPREXXFORMSMasterData(this._pcrCyperexxFormsMasterModelpbj)
      .subscribe((res) => {
        // debugger
        if (res[0] > 0) {
          this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_pkeyId = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }

  save() {
    this.jsonObj = {
      '': '',
    };
  }
  saveGenInfo() {
    // debugger;
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Information=JSON.stringify(this._generalInformationModelobj);
    this.jsonModelObjStringify();
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveProIAccessbility() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Accessibility=JSON.stringify(this._propertyAccessibilityModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveProType() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Type=JSON.stringify(this._propertyTypeModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveUtilities() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Utilities=JSON.stringify(this._utilitiesModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveOccupancy() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Occupancy_Information=JSON.stringify(this._occupancyInformationModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveSecuringLock() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Securing__Lock_Changes=JSON.stringify(this._securingLockChangesModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveGrageShed() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Grage_shed_outbuilding_securing=JSON.stringify(this._grageShedOutbuildingSecuringModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveWindowSecuring() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Window_securing=JSON.stringify(this._windowSecuringBoardingReglazingModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  savePool() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Pool=JSON.stringify(this._poolModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveDebrisHazzards() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Debris_Hazzards=JSON.stringify(this._debrisHazzardsModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveYard() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Yard=JSON.stringify(this._yardModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveHazardAbatement() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Hazard_Abatement=JSON.stringify(this._hazardAbatementModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveWinterization() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Winterization=JSON.stringify(this._winterizationModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveDamages() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Damages=JSON.stringify(this._damagesModelobj);
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveSignage() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Signage=JSON.stringify(this._signageModelobj)
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveConveyance() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Canveyance=JSON.stringify(this._conveyanceConditionModelobj)
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveGeneralComments() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Comment=JSON.stringify(this._generalCommentsModelobj)
    this.savePCR_Cyperexx_FormsMasterData();
  }
  saveVendorSignature() {
    // debugger;
    this.jsonModelObjStringify();
    //this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Vendor_Signature=JSON.stringify(this._vendorSignatureModelobj)
    this.savePCR_Cyperexx_FormsMasterData();
  }

  jsonModelObjStringify() {
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Information =
      JSON.stringify(this._generalInformationModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Accessibility =
      JSON.stringify(this._propertyAccessibilityModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Property_Type =
      JSON.stringify(this._propertyTypeModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Utilities = JSON.stringify(
      this._utilitiesModelobj
    );
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Occupancy_Information =
      JSON.stringify(this._occupancyInformationModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Securing__Lock_Changes =
      JSON.stringify(this._securingLockChangesModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Grage_shed_outbuilding_securing =
      JSON.stringify(this._grageShedOutbuildingSecuringModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Window_securing =
      JSON.stringify(this._windowSecuringBoardingReglazingModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Pool = JSON.stringify(
      this._poolModelobj
    );
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Debris_Hazzards =
      JSON.stringify(this._debrisHazzardsModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Yard = JSON.stringify(
      this._yardModelobj
    );
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Hazard_Abatement =
      JSON.stringify(this._hazardAbatementModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Winterization =
      JSON.stringify(this._winterizationModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Damages = JSON.stringify(
      this._damagesModelobj
    );
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Signage = JSON.stringify(
      this._signageModelobj
    );
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Canveyance = JSON.stringify(
      this._conveyanceConditionModelobj
    );
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_General_Comment =
      JSON.stringify(this._generalCommentsModelobj);
    this._pcrCyperexxFormsMasterModelpbj.PCR_PCFM_Vendor_Signature =
      JSON.stringify(this._vendorSignatureModelobj);
  }
  PctHistoryConfigureObj: { ColumnName: string, KeyName: string } = { ColumnName: '', KeyName: '' };
  DisplayHistory(ColumnName,KeyName){
    this.PctHistoryConfigureObj.ColumnName=ColumnName;
    this.PctHistoryConfigureObj.KeyName=KeyName;
  }

}
