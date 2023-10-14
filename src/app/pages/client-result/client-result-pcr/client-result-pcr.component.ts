import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import _ from 'underscore';

import { ClientResultPCRServices } from "./client-result-pcr.service";
import {
  PCRPropertyInfoModel,
  PCR_FiveBrotherModel,
  PCR_Violation_Model,
  PCR_Securing_Model,
  PCR_ApplianceModel,
  PCR_WinterizationModel,
  PCR_Yard_MaintenanceModel,
  PCR_PoolModel,
  PCR_DebrisModel,
  PCR_UtilitiesModel,
  PCR_ConveyanceModel,
  PCR_Damage_MasterModel,
  PCR_RoofModel,
  PCRGrassInfoModel,
} from "./client-result-pcr-model";

import {
  PCRForm_ExtProInfo_Model,
  PcrExterVoilationModel,
  PcrExterSecuringModel,
  PcrExterWinterizationModel,
  PcrYardExterModel,
  PcrDebrisExterModel,
  PcrRoofExterModel,
  PcrPoolExterModel,
  PcrAplianceExterModel,
  PcrDamagesExterModel,
  PcrConveyanceExterModel,
  Pcr_UtilitiesExterModel
} from "./client-result-pcr-external-model";

// import { MasterlayoutComponent } from "../../Home/MasterComponent";
import { TaskBidMasterModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { FormsMasterServices } from "../../admin/pcr-form/forms-master.service";

@Component({
  templateUrl: "./client-result-pcr.component.html",
  styleUrls: ["./client-result-pcr.component.scss"]
})

export class ClientResultPCRComponent implements OnInit {
  submitted = false; // submitted;
  formUsrCommonGroup: UntypedFormGroup;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  buttonVio = "Save"; // buttom loading..
  isLoadingVio = false; // buttom loading..
  buttonSecur = "Save"; // buttom loading..
  isLoadingSecur = false; // buttom loading..
  buttonApplinace = "Save"; // buttom loading..
  isLoadingApplinace = false; // buttom loading..
  buttonYard = "Save"; // buttom loading..
  isLoadingYard = false; // buttom loading..
  poorLoading = false;
  poorbutton = "Save";
  Loadingdebris = false;
  buttondebris = "Save";
  LoadingdeUtilites = false;
  buttonUtilites = "Save";
  isLoadingDamage = false;
  buttonDamage = "Save";
  isLoadingcoveyance = false;
  buttonconveyance = "Save";
  roofLoading = false;
  roofbutton = "Save";
  public contentx; // for common msg argument pass sathi
  MessageFlag: string; // custom msg sathi
  model: Boolean = true;
  PCRPropertyInfoModelObj: PCRPropertyInfoModel = new PCRPropertyInfoModel();
  PCRForm_ExtProInfo_ModelObj: PCRForm_ExtProInfo_Model = new PCRForm_ExtProInfo_Model();
  PCR_FiveBrotherModelObj: PCR_FiveBrotherModel = new PCR_FiveBrotherModel();
  PCR_Violation_ModelObj: PCR_Violation_Model = new PCR_Violation_Model();
  PCR_Securing_ModelObj: PCR_Securing_Model = new PCR_Securing_Model();
  PCR_ApplianceModelObj: PCR_ApplianceModel = new PCR_ApplianceModel();
  PCR_WinterizationModelObj: PCR_WinterizationModel = new PCR_WinterizationModel();
  PCR_Yard_MaintenanceModelObj: PCR_Yard_MaintenanceModel = new PCR_Yard_MaintenanceModel();
  PCR_PoolModelObj: PCR_PoolModel = new PCR_PoolModel();
  PCR_DebrisModelObj: PCR_DebrisModel = new PCR_DebrisModel();
  PCR_UtilitiesModelObj: PCR_UtilitiesModel = new PCR_UtilitiesModel();
  PCR_ConveyanceModelObj: PCR_ConveyanceModel = new PCR_ConveyanceModel();
  PCR_Damage_MasterModelObj: PCR_Damage_MasterModel = new PCR_Damage_MasterModel();
  PCR_RoofModelObj: PCR_RoofModel = new PCR_RoofModel();

  //external model for save five brother
  PcrExterVoilationModelObj: PcrExterVoilationModel = new PcrExterVoilationModel();
  PcrExterSecuringModelObj: PcrExterSecuringModel = new PcrExterSecuringModel();
  PcrExterWinterizationModelObj: PcrExterWinterizationModel = new PcrExterWinterizationModel();
  PcrYardExterModelObj: PcrYardExterModel = new PcrYardExterModel();
  PcrDebrisExterModelObj: PcrDebrisExterModel = new PcrDebrisExterModel();
  PcrPoolExterModelObj: PcrPoolExterModel = new PcrPoolExterModel();
  PcrRoofExterModelObj: PcrRoofExterModel = new PcrRoofExterModel();
  PcrAplianceExterModelObj: PcrAplianceExterModel = new PcrAplianceExterModel();
  PcrDamagesExterModelObj: PcrDamagesExterModel = new PcrDamagesExterModel();
  PcrConveyanceExterModelObj: PcrConveyanceExterModel = new PcrConveyanceExterModel();
  Pcr_UtilitiesExterModelObj: Pcr_UtilitiesExterModel = new Pcr_UtilitiesExterModel();

  isPrsvVisible = false;
  isGrassVisible = false;
  fbFormList = [];

  PCRGrassInfoModelObj: PCRGrassInfoModel = new PCRGrassInfoModel();
  OtherNote: boolean = true;
  LotSize: boolean = true;
  RealtorInfo: boolean = true;
  DamageNote: boolean = true;
  buttonGrass = "Save"; // buttom loading..
  isLoadingGrass = false; // buttom loading..
  constructor(
    private xRouter: Router,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    // private xMasterlayoutComponent: MasterlayoutComponent,
    private xClientResultPCRServices: ClientResultPCRServices,
    private xRoute: ActivatedRoute,
    private xClientResultServices: ClientResultServices,
    private EncrDecr: EncrDecrService,
    private formsMasterServices: FormsMasterServices
  ) { }

  ngOnInit() {
    this.getModelData();
  }

  ModelObj: any;
  BindData: any;
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();

  getModelData() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    const workorder = parseInt(workOrderID);
    this.TaskBidMasterModelObj.workOrder_ID = workorder;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(async response => {
        this.BindData = response[0][0];
        this.xClientResultServices.setPathParam(this.BindData);
        this.ModelObj = this.BindData;
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(["/workorder"]);
        } else {
          await this.GetFBFormTemplateData();
        }
      });
  }

  // common message modal popup
  commonMessage(content) {
    this.xmodalService
      .open(content, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => { },
        reason => { }
      );
  }

  //test code
  FormButton1(content: any, msgShow: boolean) {
    this.PCRForm_ExtProInfo_ModelObj.ForSale = this.PCRPropertyInfoModelObj.PCR_Prop_ForSale;
    this.PCRForm_ExtProInfo_ModelObj.Sold = this.PCRPropertyInfoModelObj.PCR_Prop_Sold;
    this.PCRForm_ExtProInfo_ModelObj.BrokerPhone = this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Phone;
    this.PCRForm_ExtProInfo_ModelObj.BrokerName = this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Name;
    this.PCRForm_ExtProInfo_ModelObj.PropertyMaintained = this.PCRPropertyInfoModelObj.PCR_Prop_Maintained;
    this.PCRForm_ExtProInfo_ModelObj.MaintainedItems = {
      Utilities: this.PCRPropertyInfoModelObj
        .PCR_Prop_Maintained_Items_Utilities,
      Grss: this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Grass,
      SnowRemoval: this.PCRPropertyInfoModelObj
        .PCR_Prop_Maintained_Items_Snow_Removal,
      InteriorRepairs: this.PCRPropertyInfoModelObj
        .PCR_Prop_Maintained_Items_Interior_Repaiars,
      ExteriorRepairs: this.PCRPropertyInfoModelObj
        .PCR_Prop_Maintained_Items_Exterior_Repairs
    };

    this.PCRForm_ExtProInfo_ModelObj.ActiveListing = this.PCRPropertyInfoModelObj.PCR_Prop_Active_Listing;
    this.PCRForm_ExtProInfo_ModelObj.BasementPresent = this.PCRPropertyInfoModelObj.PCR_Prop_Basement_Present;
    this.PCRForm_ExtProInfo_ModelObj.PropertyType = {
      VacantLand: this.PCRPropertyInfoModelObj
        .PCR_Prop_Property_Type_Vacant_Land,
      MultiFamilyHOA: this.PCRPropertyInfoModelObj
        .PCR_Prop_Property_Type_Multi_Family,
      TownHouse: this.PCRPropertyInfoModelObj.PCR_Prop_Property_Type_Condo,
      SingleFamily: this.PCRPropertyInfoModelObj
        .PCR_Prop_Property_Type_Single_Family,
      MobileHome: this.PCRPropertyInfoModelObj
        .PCR_Prop_Property_Type_Mobile_Home
    };
    this.PCRForm_ExtProInfo_ModelObj.PermitNo = this.PCRPropertyInfoModelObj.PCR_Prop_Permit_Number;
    this.PCRForm_ExtProInfo_ModelObj.Permitrequiredorder = this.PCRPropertyInfoModelObj.PCR_Prop_Permit_Required;
    this.PCRForm_ExtProInfo_ModelObj.OurBuildings = {
      Garages: this.PCRPropertyInfoModelObj.PCR_OurBuildings_Garages,
      Sheds: this.PCRPropertyInfoModelObj.PCR_OurBuildings_Sheds,
      Caports: this.PCRPropertyInfoModelObj.PCR_OurBuildings_Caports
    };

    this.PCRForm_ExtProInfo_ModelObj.Garage = this.PCRPropertyInfoModelObj.PCR_Prop_Garage;
    this.PCRForm_ExtProInfo_ModelObj.HOA = this.PCRPropertyInfoModelObj.PCR_Prop_Condo_Association_Property;
    this.PCRForm_ExtProInfo_ModelObj.HOAPhone = this.PCRPropertyInfoModelObj.PCR_HOA_Phone;
    this.PCRForm_ExtProInfo_ModelObj.HOAName = this.PCRPropertyInfoModelObj.PCR_HOA_Name;
    this.PCRForm_ExtProInfo_ModelObj.NoOfUnits = this.PCRPropertyInfoModelObj.PCR_Prop_No_Of_Unit;
    this.PCRForm_ExtProInfo_ModelObj.CommonEntry = this.PCRPropertyInfoModelObj.PCR_Prop_Common_Entry;
    this.PCRForm_ExtProInfo_ModelObj.Occupied = {
      Unit1: this.PCRPropertyInfoModelObj.PCR_Prop_Unit1,
      Unit2: this.PCRPropertyInfoModelObj.PCR_Prop_Unit2,
      Unit3: this.PCRPropertyInfoModelObj.PCR_Prop_Unit3,
      Unit4: this.PCRPropertyInfoModelObj.PCR_Prop_Unit4,

      Unit1Condition: this.PCRPropertyInfoModelObj.PCR_Prop_Unit1_Occupied,
      Unit2Condition: this.PCRPropertyInfoModelObj.PCR_Prop_Unit2_Occupied,
      Unit3Condition: this.PCRPropertyInfoModelObj.PCR_Prop_Unit3_Occupied,
      Unit4Condition: this.PCRPropertyInfoModelObj.PCR_Prop_Unit4_Occupied
    };
    this.PCRForm_ExtProInfo_ModelObj.IsThePropertyVacant = this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant;
    this.PCRForm_ExtProInfo_ModelObj.OccupancyVerified = {
      ContactWithOwner: this.PCRPropertyInfoModelObj
        .PCR_Prop_Occupancy_Verified_Contact_Owner,
      PersonalsVisible: this.PCRPropertyInfoModelObj
        .PCR_Prop_Occupancy_Verified_Personal_Visible,
      Neighbor: this.PCRPropertyInfoModelObj
        .PCR_Prop_Occupancy_Verified_Neighbor,
      UtilitiesOn: this.PCRPropertyInfoModelObj
        .PCR_Prop_Occupancy_Verified_Utilities_On,
      Visual: this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Visual,
      DirectContactWithTenant: this.PCRPropertyInfoModelObj
        .PCR_Prop_Occupancy_Verified_Direct_Con_Tenant,
      DirectContactWithMortgagor: this.PCRPropertyInfoModelObj
        .PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor,
      DirectContactWithUnknown: this.PCRPropertyInfoModelObj
        .PCR_Prop_Occupancy_Verified_Direct_Con_Unknown,
      OwnerMaintainingProperty: this.PCRPropertyInfoModelObj
        .PCR_Prop_Owner_Maintaining_Property,
      Other: this.PCRPropertyInfoModelObj.PCR_Prop_Other
    };
    this.PCRForm_ExtProInfo_ModelObj.NewaddressNotes = this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant_Notes;

    //window.alert('Called');

    this.contentx = content;
    this.submitted = true;

    // stop here if form is invalid
    // if (this.formUsrCommonGroup.invalid) {
    //   return;
    // }

    this.isLoading = true;
    this.button = "Processing";

    this.PCRPropertyInfoModelObj.PCR_Prop_WO_ID = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .PropertyInfoPost(this.PCRPropertyInfoModelObj)
      .subscribe(response => {
        if (response[0].PCR_Pro_PkeyID != "") {
          this.PCRPropertyInfoModelObj.PCR_Pro_PkeyID = Number(
            response[0].PCR_Pro_PkeyID
          );

          this.isLoading = false;
          this.button = "Update";
          if (msgShow) {
            this.MessageFlag = "Property Information Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 1;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PCRForm_ExtProInfo_ModelObj
          );
          this.PostFiveBrother();
        }
      });
  }
  PostFiveBrother() {
    this.PCR_FiveBrotherModelObj.PCR_FiveBro_id = 0;
    this.PCR_FiveBrotherModelObj.PCR_FiveBro_WO_ID = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .FiveBroDataPost(this.PCR_FiveBrotherModelObj)
      .subscribe(response => {
      });
  }

  GetPropertyInfoData() {
    this.PCRPropertyInfoModelObj.PCR_Prop_WO_ID = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetPropertyInfo(this.PCRPropertyInfoModelObj)
      .subscribe(response => {

        if (response[0].length != 0) {
          this.PCRPropertyInfoModelObj.PCR_Pro_PkeyID =
            response[0][0].PCR_Pro_PkeyID;
          this.PCRPropertyInfoModelObj.PCR_Prop_MasterID =
            response[0][0].PCR_Prop_MasterID;
          this.PCRPropertyInfoModelObj.PCR_Prop_ValType =
            response[0][0].PCR_Prop_ValType;
          this.PCRPropertyInfoModelObj.PCR_Prop_ForSale =
            response[0][0].PCR_Prop_ForSale;
          this.PCRPropertyInfoModelObj.PCR_Prop_Sold =
            response[0][0].PCR_Prop_Sold;
          this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Phone =
            response[0][0].PCR_Prop_Broker_Phone;
          this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Name =
            response[0][0].PCR_Prop_Broker_Name;
          this.PCRPropertyInfoModelObj.PCR_Prop_Maintained =
            response[0][0].PCR_Prop_Maintained;
          this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_ByOther =
            response[0][0].PCR_Prop_Maintained_ByOther;
          this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Utilities =
            response[0][0].PCR_Prop_Maintained_Items_Utilities;
          this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Grass =
            response[0][0].PCR_Prop_Maintained_Items_Grass;
          this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Snow_Removal =
            response[0][0].PCR_Prop_Maintained_Items_Snow_Removal;
          this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Interior_Repaiars =
            response[0][0].PCR_Prop_Maintained_Items_Interior_Repaiars;
          this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Exterior_Repairs =
            response[0][0].PCR_Prop_Maintained_Items_Exterior_Repairs;
          this.PCRPropertyInfoModelObj.PCR_Prop_Active_Listing =
            response[0][0].PCR_Prop_Active_Listing;
          this.PCRPropertyInfoModelObj.PCR_Prop_Basement_Present =
            response[0][0].PCR_Prop_Basement_Present;
          this.PCRPropertyInfoModelObj.PCR_OurBuildings_Garages =
            response[0][0].PCR_OurBuildings_Garages;
          this.PCRPropertyInfoModelObj.PCR_OurBuildings_Sheds =
            response[0][0].PCR_OurBuildings_Sheds;
          this.PCRPropertyInfoModelObj.PCR_OurBuildings_Caports =
            response[0][0].PCR_OurBuildings_Caports;
          this.PCRPropertyInfoModelObj.PCR_OurBuildings_Bams =
            response[0][0].PCR_OurBuildings_Bams;
          this.PCRPropertyInfoModelObj.PCR_OurBuildings_Pool_House =
            response[0][0].PCR_OurBuildings_Pool_House;
          this.PCRPropertyInfoModelObj.PCR_OurBuildings_Other_Building =
            response[0][0].PCR_OurBuildings_Other_Building;
          this.PCRPropertyInfoModelObj.PCR_Prop_Property_Type_Vacant_Land =
            response[0][0].PCR_Prop_Property_Type_Vacant_Land;
          this.PCRPropertyInfoModelObj.PCR_Prop_Property_Type_Single_Family =
            response[0][0].PCR_Prop_Property_Type_Single_Family;
          this.PCRPropertyInfoModelObj.PCR_Prop_Property_Type_Multi_Family =
            response[0][0].PCR_Prop_Property_Type_Multi_Family;
          this.PCRPropertyInfoModelObj.PCR_Prop_Property_Type_Mobile_Home =
            response[0][0].PCR_Prop_Property_Type_Mobile_Home;
          this.PCRPropertyInfoModelObj.PCR_Prop_Property_Type_Condo =
            response[0][0].PCR_Prop_Property_Type_Condo;
          this.PCRPropertyInfoModelObj.PCR_Prop_Permit_Required =
            response[0][0].PCR_Prop_Permit_Required;
          this.PCRPropertyInfoModelObj.PCR_Prop_Condo_Association_Property =
            response[0][0].PCR_Prop_Condo_Association_Property;
          this.PCRPropertyInfoModelObj.PCR_HOA_Name =
            response[0][0].PCR_HOA_Name;
          this.PCRPropertyInfoModelObj.PCR_HOA_Phone =
            response[0][0].PCR_HOA_Phone;
          this.PCRPropertyInfoModelObj.PCR_Prop_No_Of_Unit =
            response[0][0].PCR_Prop_No_Of_Unit;
          this.PCRPropertyInfoModelObj.PCR_Prop_Common_Entry =
            response[0][0].PCR_Prop_Common_Entry;
          this.PCRPropertyInfoModelObj.PCR_Prop_Garage =
            response[0][0].PCR_Prop_Garage;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit1 =
            response[0][0].PCR_Prop_Unit1;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit1_Occupied =
            response[0][0].PCR_Prop_Unit1_Occupied;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit2 =
            response[0][0].PCR_Prop_Unit2;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit2_Occupied =
            response[0][0].PCR_Prop_Unit2_Occupied;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit3 =
            response[0][0].PCR_Prop_Unit3;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit3_Occupied =
            response[0][0].PCR_Prop_Unit3_Occupied;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit4 =
            response[0][0].PCR_Prop_Unit4;
          this.PCRPropertyInfoModelObj.PCR_Prop_Unit4_Occupied =
            response[0][0].PCR_Prop_Unit4_Occupied;
          this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant =
            response[0][0].PCR_Prop_Property_Vacant;
          this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant_Notes =
            response[0][0].PCR_Prop_Property_Vacant_Notes;
          this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Personal_Visible =
            response[0][0].PCR_Prop_Occupancy_Verified_Personal_Visible;
          this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Neighbor =
            response[0][0].PCR_Prop_Occupancy_Verified_Neighbor;
          this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Utilities_On =
            response[0][0].PCR_Prop_Occupancy_Verified_Utilities_On;
          this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Visual =
            response[0][0].PCR_Prop_Occupancy_Verified_Visual;
          this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Direct_Con_Tenant =
            response[0][0].PCR_Prop_Occupancy_Verified_Direct_Con_Tenant;
          this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor =
            response[0][0].PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor;
          this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Direct_Con_Unknown =
            response[0][0].PCR_Prop_Occupancy_Verified_Direct_Con_Unknown;
          this.PCRPropertyInfoModelObj.PCR_Prop_Owner_Maintaining_Property =
            response[0][0].PCR_Prop_Owner_Maintaining_Property;
          this.PCRPropertyInfoModelObj.PCR_Prop_Other =
            response[0][0].PCR_Prop_Other;

          this.PCRPropertyInfoModelObj.PRC_Prop_dateCompleted =
            response[0][0].PRC_Prop_dateCompleted;
          this.PCRPropertyInfoModelObj.PRC_Prop_badAddress =
            response[0][0].PRC_Prop_badAddress;
          this.PCRPropertyInfoModelObj.PRC_Prop_orderCompleted =
            response[0][0].PRC_Prop_orderCompleted;


          if (this.PCRPropertyInfoModelObj.PCR_Prop_Other) {
            this.ProNoteHide = false;
          }

          this.PCRPropertyInfoModelObj.PCR_Prop_Permit_Number =
            response[0][0].PCR_Prop_Permit_Number;
        }

        this.GetViolationData();
      });
  }

  // violation FORM CHA
  ViolationSubmit(content, msgShow: boolean) {
    this.PcrExterVoilationModelObj.AnyCitiation = this.PCR_Violation_ModelObj.PCR_Violation_Any_Citation;
    this.PcrExterVoilationModelObj.DescribeCitation = this.PCR_Violation_ModelObj.PCR_Violation_Describe_Citation;
    this.PcrExterVoilationModelObj.VandalismArea = this.PCR_Violation_ModelObj.PCR_Violation_High_Vandalism_Area;
    this.PcrExterVoilationModelObj.VandalismReason = this.PCR_Violation_ModelObj.PCR_Violation_Describe_High_Vandalism_Reason;
    this.PcrExterVoilationModelObj.Circumstances = this.PCR_Violation_ModelObj.PCR_Violation_Any_Unusual_Circumstances;
    this.PcrExterVoilationModelObj.Describe = this.PCR_Violation_ModelObj.PCR_Violation_Describe;

    this.contentx = content;
    this.PCR_Violation_ModelObj;
    this.PCR_Violation_ModelObj.PCR_Violation_WO_ID = this.ModelObj.workOrder_ID;
    //alert(JSON.stringify(this.PCR_Violation_ModelObj));

    this.isLoadingVio = true;
    this.buttonVio = "Processing";

    this.xClientResultPCRServices
      .VoilationDataPost(this.PCR_Violation_ModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_Violation_ModelObj.PCR_Violation_pkeyId = Number(
            response[0].PCR_Violation_pkeyId
          );
          this.isLoadingVio = false;
          this.buttonVio = "Update";

          if (msgShow) {
            this.MessageFlag = "Violations Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = this.PCR_Violation_ModelObj.PCR_Violation_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PcrExterVoilationModelObj
          );
          this.PostFiveBrother();
        }
      });
  }

  GetViolationData() {
    this.PCR_Violation_ModelObj.PCR_Violation_WO_ID = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetViolation(this.PCR_Violation_ModelObj)
      .subscribe(reponse => {
        if (reponse[0].length != 0) {
          this.PCR_Violation_ModelObj.PCR_Violation_pkeyId =
            reponse[0][0].PCR_Violation_pkeyId;
          this.PCR_Violation_ModelObj.PCR_Violation_MasterID =
            reponse[0][0].PCR_Violation_MasterID;
          this.PCR_Violation_ModelObj.PCR_Violation_WO_ID =
            reponse[0][0].PCR_Violation_WO_ID;
          this.PCR_Violation_ModelObj.PCR_Violation_ValType =
            reponse[0][0].PCR_Violation_ValType;
          this.PCR_Violation_ModelObj.PCR_Violation_Any_Citation =
            reponse[0][0].PCR_Violation_Any_Citation;
          this.PCR_Violation_ModelObj.PCR_Violation_Describe_Citation =
            reponse[0][0].PCR_Violation_Describe_Citation;
          this.PCR_Violation_ModelObj.PCR_Violation_High_Vandalism_Area =
            reponse[0][0].PCR_Violation_High_Vandalism_Area;
          this.PCR_Violation_ModelObj.PCR_Violation_Describe_High_Vandalism_Reason =
            reponse[0][0].PCR_Violation_Describe_High_Vandalism_Reason;
          this.PCR_Violation_ModelObj.PCR_Violation_Any_Unusual_Circumstances =
            reponse[0][0].PCR_Violation_Any_Unusual_Circumstances;
          this.PCR_Violation_ModelObj.PCR_Violation_Attached_Proof_Path =
            reponse[0][0].PCR_Violation_Attached_Proof_Path;
          this.PCR_Violation_ModelObj.PCR_Violation_Attached_Proof_Size =
            reponse[0][0].PCR_Violation_Attached_Proof_Size;
          this.PCR_Violation_ModelObj.PCR_Violation_Describe =
            reponse[0][0].PCR_Violation_Describe;
        }

        this.GetSecurity();
        //this.GetApplienceData();
      });
  }

  // securing ode here
  SecuringSubmit(content, msgShow: boolean) {
    this.PcrExterSecuringModelObj.SecureOnArrival = this.PCR_Securing_ModelObj.PCR_Securing_On_Arrival;
    this.PcrExterSecuringModelObj.SecureReason = {
      MissingDoors: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Missing_Doors,
      DoorOpen: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Door_Open,
      MissingLocks: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Missing_Locks,
      WindowsOpenMortgagor: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Window_Open,
      BrokenWindows: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Broken_Windows,
      BrokenDoor: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Broken_Door,
      MissingWindows: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Missing_Window,
      BidsPendingProperty: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Bids_Pending,
      DamagedLocks: this.PCR_Securing_ModelObj
        .PCR_Securing_Not_Secure_Reason_Damage_Locks
    };
    this.PcrExterSecuringModelObj.Propertyboadedonarrival = this.PCR_Securing_ModelObj.PCR_Securing_Boarded_Arrival;
    this.PcrExterSecuringModelObj.Moreboardingstillrequired = this.PCR_Securing_ModelObj.PCR_Securing_More_Boarding_Still_Required_OR_Not;
    this.PcrExterSecuringModelObj.FirstFloorWindows = this.PCR_Securing_ModelObj.PCR_Securing_No_Of_First_Floor_Window;
    this.PcrExterSecuringModelObj.PropertyIsNotSecureReason = {
      Missing_Door: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors,
      Door_Open: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Door_Open,
      Missing_Locks: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks,
      Broken_Windows: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows,
      Broken_Door: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Broken_Door,
      Missing_Windows: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Missing_Window,
      Bids_Pending_Property: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending,
      Damaged_Locks: this.PCR_Securing_ModelObj
        .PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks
    };

    this.contentx = content;

    this.isLoadingSecur = true;
    this.buttonSecur = "Processing";

    this.PCR_Securing_ModelObj.PCR_Securing_WO_Id = this.ModelObj.workOrder_ID;

    //alert(JSON.stringify(this.PCR_Securing_ModelObj));

    this.xClientResultPCRServices
      .SecurityDataPost(this.PCR_Securing_ModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_Securing_ModelObj.PCR_Securing_pkeyId = Number(
            response[0].PCR_Securing_pkeyId
          );
          this.isLoadingSecur = false;
          this.buttonSecur = "Update";
          if (msgShow) {
            this.MessageFlag = "Securing Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = this.PCR_Securing_ModelObj.PCR_Securing_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PcrExterSecuringModelObj
          );
          this.PostFiveBrother();
        }
      });
  }

  GetSecurity() {
    this.PCR_Securing_ModelObj.PCR_Securing_WO_Id = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .GetSecuring(this.PCR_Securing_ModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_Securing_ModelObj.PCR_Securing_pkeyId =
            response[0][0].PCR_Securing_pkeyId;
          this.PCR_Securing_ModelObj.PCR_Securing_MasterId =
            response[0][0].PCR_Securing_MasterId;
          this.PCR_Securing_ModelObj.PCR_Securing_WO_Id =
            response[0][0].PCR_Securing_WO_Id;
          this.PCR_Securing_ModelObj.PCR_Securing_ValType =
            response[0][0].PCR_Securing_ValType;
          this.PCR_Securing_ModelObj.PCR_Securing_On_Arrival =
            response[0][0].PCR_Securing_On_Arrival;
          this.PCR_Securing_ModelObj.PCR_Securing_On_Departure =
            response[0][0].PCR_Securing_On_Departure;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Missing_Doors =
            response[0][0].PCR_Securing_Not_Secure_Reason_Missing_Doors;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Door_Open =
            response[0][0].PCR_Securing_Not_Secure_Reason_Door_Open;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Missing_Locks =
            response[0][0].PCR_Securing_Not_Secure_Reason_Missing_Locks;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Broken_Windows =
            response[0][0].PCR_Securing_Not_Secure_Reason_Broken_Windows;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Missing_Window =
            response[0][0].PCR_Securing_Not_Secure_Reason_Missing_Window;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Window_Open =
            response[0][0].PCR_Securing_Not_Secure_Reason_Window_Open;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Broken_Door =
            response[0][0].PCR_Securing_Not_Secure_Reason_Broken_Door;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Bids_Pending =
            response[0][0].PCR_Securing_Not_Secure_Reason_Bids_Pending;
          this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Damage_Locks =
            response[0][0].PCR_Securing_Not_Secure_Reason_Damage_Locks;
          this.PCR_Securing_ModelObj.PCR_Securing_Boarded_Arrival =
            response[0][0].PCR_Securing_Boarded_Arrival;
          this.PCR_Securing_ModelObj.PCR_Securing_No_Of_First_Floor_Window =
            response[0][0].PCR_Securing_No_Of_First_Floor_Window;
          this.PCR_Securing_ModelObj.PCR_Securing_More_Boarding_Still_Required_OR_Not =
            response[0][0].PCR_Securing_More_Boarding_Still_Required_OR_Not;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Door_Open =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Door_Open;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Window =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Missing_Window;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Broken_Door =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Broken_Door;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending;
          this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks =
            response[0][0].PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks;
        }

        this.GetApplienceData();
      });
  }

  SecureReasonDiv: boolean = false;
  SecureOnArrival(arg: any) {
    if (arg == "Yes") {
      this.SecureReasonDiv = true;

      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Missing_Doors = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Door_Open = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Missing_Locks = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Broken_Windows = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Missing_Window = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Window_Open = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Broken_Door = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Bids_Pending = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Not_Secure_Reason_Damage_Locks = false;
    } else {
      this.SecureReasonDiv = false;
    }
  }

  SecureReason2Div: boolean = false;
  SecureOnDeparture(arg: any) {
    if (arg == "Yes") {
      this.SecureReason2Div = true;

      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Door_Open = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Window = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Broken_Door = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending = false;
      this.PCR_Securing_ModelObj.PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks = false;
    } else {
      this.SecureReason2Div = false;
    }
  }

  SecureReason3Div: boolean = false;
  Boadedonarrival(arg: any) {
    if (arg == "Yes") {
      this.SecureReason3Div = false;
    } else {
      this.SecureReason3Div = true;
    }
  }

  // end code here

  /// property info

  BrokerPhone: boolean = false;

  ForSale(arg: any): void {
    if (arg == "Yes") {
      this.BrokerPhone = false;
    } else {
      this.BrokerPhone = true;
      this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Phone = "";
      this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Name = "";
    }
  }

  MaintainedItems: boolean = false;
  PropertyMaintained(arg: any) {
    if (arg == "Not Maintained") {
      //alert('called');

      this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Utilities = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Grass = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Snow_Removal = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Interior_Repaiars = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Maintained_Items_Exterior_Repairs = false;

      this.MaintainedItems = true;
    } else {
      this.MaintainedItems = false;
    }
  }

  Permitrequired: boolean = false;
  PropertyType(arg: any): void {
    if (arg == "Multi Family") {
      //alert('yes');

      this.Permitrequired = false;
    } else {
      //alert('No');

      this.PCRPropertyInfoModelObj.PCR_Prop_Permit_Number = "";
      this.PCRPropertyInfoModelObj.PCR_Prop_Permit_Required = "";

      this.Permitrequired = true;
    }
  }

  OccupancyVerified: boolean = false;
  PropertyVacant(arg: any): void {
    if (arg == "No") {
      this.OccupancyVerified = false;
    } else {
      this.OccupancyVerified = true;

      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Contact_Owner = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Personal_Visible = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Neighbor = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Utilities_On = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Visual = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Direct_Con_Tenant = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Occupancy_Verified_Direct_Con_Unknown = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Owner_Maintaining_Property = false;
      this.PCRPropertyInfoModelObj.PCR_Prop_Other = false;
    }
  }

  ProNoteHide: boolean = true;
  OccupancyOther(agr) {
    //alert(agr);
    if (agr) {
      this.ProNoteHide = false;
    } else {
      this.ProNoteHide = true;

      this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant_Notes = "";
    }
  }

  HOADiv: boolean = false;

  HomeOweners(arg: any): void {
    if (arg == "Yes") {
      this.HOADiv = false;
    } else {
      this.HOADiv = true;

      this.PCRPropertyInfoModelObj.PCR_HOA_Name = "";
      this.PCRPropertyInfoModelObj.PCR_HOA_Phone = "";
    }
  }

  // appliance
  ApplianceSubmit(content, msgShow: boolean) {
    this.PcrAplianceExterModelObj.Refrigerator = this.PCR_ApplianceModelObj.PCR_Appliance_Refrigerator;
    this.PcrAplianceExterModelObj.Stove = this.PCR_ApplianceModelObj.PCR_Appliance_Stove;
    this.PcrAplianceExterModelObj.StoveWallOven = this.PCR_ApplianceModelObj.PCR_Appliance_Stove_Wall_Oven;
    this.PcrAplianceExterModelObj.Dishwasher = this.PCR_ApplianceModelObj.PCR_Appliance_Dishwasher;
    this.PcrAplianceExterModelObj.BuildInMicrowave = this.PCR_ApplianceModelObj.PCR_Appliance_Build_In_Microwave;
    this.PcrAplianceExterModelObj.Dryer = this.PCR_ApplianceModelObj.PCR_Appliance_Dryer;
    this.PcrAplianceExterModelObj.Washer = this.PCR_ApplianceModelObj.PCR_Appliance_Washer;
    this.PcrAplianceExterModelObj.AirConditioner = this.PCR_ApplianceModelObj.PCR_Appliance_Air_Conditioner;
    this.PcrAplianceExterModelObj.HotWaterHeater = this.PCR_ApplianceModelObj.PCR_Appliance_Hot_Water_Heater;
    this.PcrAplianceExterModelObj.Dehumidifier = this.PCR_ApplianceModelObj.PCR_Appliance_Dehumidifier;
    this.PcrAplianceExterModelObj.Furnace = this.PCR_ApplianceModelObj.PCR_Appliance_Furnace;
    this.PcrAplianceExterModelObj.WaterSoftener = this.PCR_ApplianceModelObj.PCR_Appliance_Water_Softener;
    this.PcrAplianceExterModelObj.Boiler = this.PCR_ApplianceModelObj.PCR_Appliance_Boiler;
    this.contentx = content;

    this.PCR_ApplianceModelObj;
    //alert(JSON.stringify(this.PCR_ApplianceModelObj));

    this.isLoadingApplinace = true;
    this.buttonApplinace = "Processing";

    this.PCR_ApplianceModelObj.PCR_Appliance_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .PostAppliance(this.PCR_ApplianceModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_ApplianceModelObj.PCR_Appliance_pkeyId = Number(
            response[0].PCR_Appliance_pkeyId
          );

          this.isLoadingApplinace = false;
          this.buttonApplinace = "Update";
          if (msgShow) {
            this.MessageFlag = "Appliances Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 10;//this.PCR_ApplianceModelObj.PCR_Appliance_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrAplianceExterModelObj);
          this.PostFiveBrother();

        }
      });
  }

  GetApplienceData() {
    this.PCR_ApplianceModelObj.PCR_Appliance_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetApplience(this.PCR_ApplianceModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_ApplianceModelObj.PCR_Appliance_pkeyId =
            response[0][0].PCR_Appliance_pkeyId;
          this.PCR_ApplianceModelObj.PCR_Appliance_MasterId =
            response[0][0].PCR_Appliance_MasterId;
          this.PCR_ApplianceModelObj.PCR_Appliance_WO_Id =
            response[0][0].PCR_Appliance_WO_Id;
          this.PCR_ApplianceModelObj.PCR_Appliance_ValType =
            response[0][0].PCR_Appliance_ValType;
          this.PCR_ApplianceModelObj.PCR_Appliance_Refrigerator =
            response[0][0].PCR_Appliance_Refrigerator;
          this.PCR_ApplianceModelObj.PCR_Appliance_Stove =
            response[0][0].PCR_Appliance_Stove;
          this.PCR_ApplianceModelObj.PCR_Appliance_Stove_Wall_Oven =
            response[0][0].PCR_Appliance_Stove_Wall_Oven;
          this.PCR_ApplianceModelObj.PCR_Appliance_Dishwasher =
            response[0][0].PCR_Appliance_Dishwasher;
          this.PCR_ApplianceModelObj.PCR_Appliance_Build_In_Microwave =
            response[0][0].PCR_Appliance_Build_In_Microwave;
          this.PCR_ApplianceModelObj.PCR_Appliance_Dryer =
            response[0][0].PCR_Appliance_Dryer;
          this.PCR_ApplianceModelObj.PCR_Appliance_Washer =
            response[0][0].PCR_Appliance_Washer;
          this.PCR_ApplianceModelObj.PCR_Appliance_Air_Conditioner =
            response[0][0].PCR_Appliance_Air_Conditioner;
          this.PCR_ApplianceModelObj.PCR_Appliance_Hot_Water_Heater =
            response[0][0].PCR_Appliance_Hot_Water_Heater;
          this.PCR_ApplianceModelObj.PCR_Appliance_Dehumidifier =
            response[0][0].PCR_Appliance_Dehumidifier;
          this.PCR_ApplianceModelObj.PCR_Appliance_Furnace =
            response[0][0].PCR_Appliance_Furnace;
          this.PCR_ApplianceModelObj.PCR_Appliance_Water_Softener =
            response[0][0].PCR_Appliance_Water_Softener;
          this.PCR_ApplianceModelObj.PCR_Appliance_Boiler =
            response[0][0].PCR_Appliance_Boiler;
        }

        this.GetWinterization();
      });
  }

  // set function  appliance
  ApplianceSetButton(NameArg: string): void {
    //alert(NameArg);

    this.PCR_ApplianceModelObj.PCR_Appliance_Refrigerator = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Stove = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Stove_Wall_Oven = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Dishwasher = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Build_In_Microwave = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Dryer = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Washer = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Air_Conditioner = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Hot_Water_Heater = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Dehumidifier = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Furnace = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Water_Softener = NameArg;
    this.PCR_ApplianceModelObj.PCR_Appliance_Boiler = NameArg;
  }

  // SubmitWinterization
  SubmitWinterization(content, msgShow: boolean) {
    this.contentx = content;

    this.PcrExterWinterizationModelObj.Winterizationintactuponarrival = this.PCR_WinterizationModelObj.PCR_Winterization_Upon_Arrival;
    this.PcrExterWinterizationModelObj.Completethisorder = this.PCR_WinterizationModelObj.PCR_Winterization_Compleate_This_Order_Yes;
    this.PcrExterWinterizationModelObj.NeverWinterized = this.PCR_WinterizationModelObj.PCR_Winterization_Upon_Arrival_Never_Winterized;
    this.PcrExterWinterizationModelObj.ReasonsWinterizationNotCompleted = {
      Couldnotbecompletedforallowable: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Allowable,
      Propertyfrozenuponarrival: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival,
      OutofSeason: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Out_Season,
      Waterneedstoturnedoff: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_TernedOff,
      PropertyisDamaged: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged,
      Plumbingisdamaged: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage,
      PlimbingisMissing: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing,
      AlreadyWinterized: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized,
      CommonWaterLine: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line,
      Realtomaintainingutilities: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities,
      Other: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Other,
      OtherText: this.PCR_WinterizationModelObj
        .PCR_Winterization_Reason_Wint_NotCompleted_Other_Text
    };

    this.PcrExterWinterizationModelObj.Typeofheatingsystem = this.PCR_WinterizationModelObj.PCR_Winterization_Heating_System;
    this.PcrExterWinterizationModelObj.PostedSings = this.PCR_WinterizationModelObj.PCR_Winterization_Posted_Signs;
    this.PcrExterWinterizationModelObj.CommonWaterLine = this.PCR_WinterizationModelObj.PCR_Winterization_Common_Water_Line;
    this.PcrExterWinterizationModelObj.AntifreezeinToilet = this.PCR_WinterizationModelObj.PCR_Winterization_AntiFreeze_Toilet;
    this.PcrExterWinterizationModelObj.WaterHeaterDrained = this.PCR_WinterizationModelObj.PCR_Winterization_Water_Heater_Drained;
    this.PcrExterWinterizationModelObj.WaterOffAtCurb = this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb;
    this.PcrExterWinterizationModelObj.BlownAllLine = this.PCR_WinterizationModelObj.PCR_Winterization_Blown_All_Lines;
    this.PcrExterWinterizationModelObj.SystemHeldPressure = this.PCR_WinterizationModelObj.PCR_Winterization_System_Held_Pressure;
    this.PcrExterWinterizationModelObj.DisconnectedWaterMeter = this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve;
    this.PcrExterWinterizationModelObj.DisconnectedWaterMetertext = this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_Other_Text;
    this.PcrExterWinterizationModelObj.Commentbox = this.PCR_WinterizationModelObj.PCR_Winterization_TextArea_Comment;
    this.PcrExterWinterizationModelObj.ShutOffandZipTied = this.PCR_WinterizationModelObj.PCR_Winterization_Interior_Main_Valve_Shut_Off;
    this.PcrExterWinterizationModelObj.Reasonziptied = this.PCR_WinterizationModelObj.PCR_Winterization_Interior_Main_Valve_Reason;
    this.PcrExterWinterizationModelObj.Isthereafiresuppressionsystem = this.PCR_WinterizationModelObj.PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System;
    this.PcrExterWinterizationModelObj.BoilerDrained = this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained;
    this.PcrExterWinterizationModelObj.ZoneValvesOpened = this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened;
    this.PcrExterWinterizationModelObj.AntiFreezeinBoiler = this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler;
    this.PcrExterWinterizationModelObj.WellPumbBreakerOff = this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off;
    this.PcrExterWinterizationModelObj.PressureTankDrained = this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained;
    this.PcrExterWinterizationModelObj.SupplyLineDisconnected = this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect;
    this.PcrExterWinterizationModelObj.Bid = this.PCR_WinterizationModelObj.PCR_Winterization_To_Bid;
    this.PcrExterWinterizationModelObj.Bidtext = this.PCR_WinterizationModelObj.PCR_Winterization_To_Bit_Text;
    this.PcrExterWinterizationModelObj.Discriptionbid = this.PCR_WinterizationModelObj.PCR_Winterization_Description;
    this.PcrExterWinterizationModelObj.SystemType = this.PCR_WinterizationModelObj.PCR_Winterization_System_Type;
    this.PcrExterWinterizationModelObj.Reason = this.PCR_WinterizationModelObj.PCR_Winterization_Reason;
    this.PcrExterWinterizationModelObj.Amount = this.PCR_WinterizationModelObj.PCR_Winterization_Amount;
    this.PcrExterWinterizationModelObj.Men = this.PCR_WinterizationModelObj.PCR_Winterization_Winterize_Men;
    this.PcrExterWinterizationModelObj.Hrs = this.PCR_WinterizationModelObj.PCR_Winterization_Winterize_Hrs;

    this.PCR_WinterizationModelObj.PCR_Winterization_WO_Id = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .WinterizationDataPost(this.PCR_WinterizationModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_WinterizationModelObj.PCR_Winterization_pkeyId = Number(
            response[0].PCR_Winterization_pkeyId
          );

          if (msgShow) {
            this.MessageFlag = "Winterization Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 4; // this.PCR_WinterizationModelObj.PCR_Winterization_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PcrExterWinterizationModelObj
          );
          this.PostFiveBrother();
        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }

  //dropdown winterization
  SystemType = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "DRY" },
    { id: 3, name: "DRY W/ WELL" },
    { id: 4, name: "RADIANT" },
    { id: 5, name: "RADIANT W/ WELL" },
    { id: 6, name: "STEAM" },
    { id: 7, name: "STEAM W/ WELL" },
  ];

  // Get Winterization
  GetWinterization() {
    this.PCR_WinterizationModelObj.PCR_Winterization_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetWinterizationDetails(this.PCR_WinterizationModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_WinterizationModelObj.PCR_Winterization_pkeyId =
            response[0][0].PCR_Winterization_pkeyId;
          this.PCR_WinterizationModelObj.PCR_Winterization_WO_Id =
            response[0][0].PCR_Winterization_WO_Id;
          this.PCR_WinterizationModelObj.PCR_Winterization_MasterId =
            response[0][0].PCR_Winterization_MasterId;
          this.PCR_WinterizationModelObj.PCR_Winterization_ValType =
            response[0][0].PCR_Winterization_ValType;
          this.PCR_WinterizationModelObj.PCR_Winterization_Amount =
            response[0][0].PCR_Winterization_Amount;
          this.PCR_WinterizationModelObj.PCR_Winterization_AntiFreeze_Toilet =
            response[0][0].PCR_Winterization_AntiFreeze_Toilet;
          this.PCR_WinterizationModelObj.PCR_Winterization_Blown_All_Lines =
            response[0][0].PCR_Winterization_Blown_All_Lines;
          this.PCR_WinterizationModelObj.PCR_Winterization_Common_Water_Line =
            response[0][0].PCR_Winterization_Common_Water_Line;
          // this.PCR_WinterizationModelObj.PCR_Winterization_Compleate_This_Order_No = response[0][0].PCR_Winterization_Compleate_This_Order_No;
          //this.PCR_WinterizationModelObj.PCR_Winterization_Compleate_This_Order_Partial = response[0][0].PCR_Winterization_Compleate_This_Order_Partial;
          this.PCR_WinterizationModelObj.PCR_Winterization_Compleate_This_Order_Yes =
            response[0][0].PCR_Winterization_Compleate_This_Order_Yes;
          this.PCR_WinterizationModelObj.PCR_Winterization_Description =
            response[0][0].PCR_Winterization_Description;
          this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_No_Common_Water_Line =
            response[0][0].PCR_Winterization_Disconnected_Water_Meter_No_Common_Water_Line;
          this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_No_Others =
            response[0][0].PCR_Winterization_Disconnected_Water_Meter_No_Others;
          this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_No_Prohibited_Ordinance =
            response[0][0].PCR_Winterization_Disconnected_Water_Meter_No_Prohibited_Ordinance;
          this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve =
            response[0][0].PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve;
          this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_No_Unable_To_Locate =
            response[0][0].PCR_Winterization_Disconnected_Water_Meter_No_Unable_To_Locate;
          this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_Yes =
            response[0][0].PCR_Winterization_Disconnected_Water_Meter_Yes;
          this.PCR_WinterizationModelObj.PCR_Winterization_Heating_System =
            response[0][0].PCR_Winterization_Heating_System;
          //this.PCR_WinterizationModelObj.PCR_Winterization_Heating_System_Well = response[0][0].PCR_Winterization_Heating_System_Well;
          this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off =
            response[0][0].PCR_Winterization_If_Well_System_Breaker_Off;
          this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
            response[0][0].PCR_Winterization_If_Well_System_Pressure_Tank_Drained;
          this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
            response[0][0].PCR_Winterization_If_Well_System_Supply_Line_Disconnect;
          this.PCR_WinterizationModelObj.PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System =
            response[0][0].PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System;
          this.PCR_WinterizationModelObj.PCR_Winterization_Interior_Main_Valve_Reason =
            response[0][0].PCR_Winterization_Interior_Main_Valve_Reason;
          this.PCR_WinterizationModelObj.PCR_Winterization_Interior_Main_Valve_Shut_Off =
            response[0][0].PCR_Winterization_Interior_Main_Valve_Shut_Off;
          this.PCR_WinterizationModelObj.PCR_Winterization_IsActive =
            response[0][0].PCR_Winterization_IsActive;
          this.PCR_WinterizationModelObj.PCR_Winterization_Posted_Signs =
            response[0][0].PCR_Winterization_Posted_Signs;
          this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
            response[0][0].PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler;
          this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained =
            response[0][0].PCR_Winterization_Radiant_Heat_Boiler_Drained;
          //this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_System = response[0][0].PCR_Winterization_Radiant_Heat_System;
          // this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_System_Well = response[0][0].PCR_Winterization_Radiant_Heat_System_Well;
          this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
            response[0][0].PCR_Winterization_Radiant_Heat_Zone_Valves_Opened;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason =
            response[0][0].PCR_Winterization_Reason;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Allowable =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Allowable;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Other =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Other;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Out_Season =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Out_Season;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_TernedOff =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_TernedOff;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival;
          //this.PCR_WinterizationModelObj.PCR_Winterization_Steam_Heat_System = response[0][0].PCR_Winterization_Steam_Heat_System;
          // this.PCR_WinterizationModelObj.PCR_Winterization_Steam_Heat_System_Well = response[0][0].PCR_Winterization_Steam_Heat_System_Well;
          this.PCR_WinterizationModelObj.PCR_Winterization_System_Held_Pressure =
            response[0][0].PCR_Winterization_System_Held_Pressure;
          this.PCR_WinterizationModelObj.PCR_Winterization_System_Type =
            response[0][0].PCR_Winterization_System_Type;
          //this.PCR_WinterizationModelObj.PCR_Winterization_Thaw = response[0][0].PCR_Winterization_Thaw;
          this.PCR_WinterizationModelObj.PCR_Winterization_To_Bid =
            response[0][0].PCR_Winterization_To_Bid;
          this.PCR_WinterizationModelObj.PCR_Winterization_To_Bit_Text =
            response[0][0].PCR_Winterization_To_Bit_Text;
          this.PCR_WinterizationModelObj.PCR_Winterization_Upon_Arrival =
            response[0][0].PCR_Winterization_Upon_Arrival;

          this.PCR_WinterizationModelObj.PCR_Winterization_Upon_Arrival_Never_Winterized =
            response[0][0].PCR_Winterization_Upon_Arrival_Never_Winterized;
          this.PCR_WinterizationModelObj.PCR_Winterization_Water_Heater_Drained =
            response[0][0].PCR_Winterization_Water_Heater_Drained;
          this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb =
            response[0][0].PCR_Winterization_Water_Off_At_Curb;

          this.PCR_WinterizationModelObj.PCR_Winterization_Winterize_Hrs =
            response[0][0].PCR_Winterization_Winterize_Hrs;
          this.PCR_WinterizationModelObj.PCR_Winterization_Winterize_Men =
            response[0][0].PCR_Winterization_Winterize_Men;
          this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text =
            response[0][0].PCR_Winterization_Reason_Wint_NotCompleted_Other_Text;
          this.PCR_WinterizationModelObj.PCR_Winterization_Disconnected_Water_Meter_Other_Text =
            response[0][0].PCR_Winterization_Disconnected_Water_Meter_Other_Text;
          this.PCR_WinterizationModelObj.PCR_Winterization_TextArea_Comment =
            response[0][0].PCR_Winterization_TextArea_Comment;
        }
        this.GetYardmaintanance();
      });
  }

  //for  Winterization hide & show
  Breached: boolean = true;
  Winterizationarrival(arg: any): void {
    if (arg == "No") {
      this.Breached = false;
    } else {
      this.Breached = true;
    }
  }
  ReasonsWinterization: boolean = false;
  Completethisorder(arg: any): void {
    if (arg == "Yes") {
      this.ReasonsWinterization = true;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Allowable = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Out_Season = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Other = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_TernedOff = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text =
        "";
    } else {
      this.ReasonsWinterization = false;
    }
  }
  DryHeatWinterization: boolean = false;
  WellSystem: boolean = false;
  DryHeatSystem(arg: any): void {
    if (arg == "Dry Heat System") {
      this.DryHeatWinterization = true;
      this.WellSystem = true;
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb = "";
    } else {
      this.DryHeatWinterization = false;
      this.WellSystem = false;
    }
  }

  DryHeatSystemwell(arg: any): void {
    if (arg == "Dry Heat System W/ Well") {
      this.DryHeatWinterization = true;
      this.WellSystem = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb = "No";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained =
        "";
    } else {
      this.DryHeatWinterization = false;
      this.WellSystem = false;
    }
  }
  SteemHeatSystem(arg: any): void {
    if (arg == "Steem Heat System") {
      this.DryHeatWinterization = false;
      this.WellSystem = true;
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb = "";
    } else {
      this.DryHeatWinterization = false;
      this.WellSystem = false;
    }
  }
  SteamHeatSystemW(arg: any): void {
    if (arg == "Steam Heat System W/ Well") {
      this.DryHeatWinterization = false;
      this.WellSystem = false;
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb = "No";
    }
  }
  RadiantHeatSystem(arg: any): void {
    if (arg == "Radiant Heat System") {
      this.DryHeatWinterization = false;
      this.WellSystem = true;
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb = "";
    }
  }

  RadiantHeatSystemWell(arg: any): void {
    if (arg == "Radiant Heat System W/ Well") {
      this.DryHeatWinterization = false;
      this.WellSystem = false;

      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_If_Well_System_Breaker_Off =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Radiant_Heat_Boiler_Drained =
        "";
      this.PCR_WinterizationModelObj.PCR_Winterization_Water_Off_At_Curb = "No";
    }
  }

  winhide: boolean = true;
  Winterizedata(arg: any): void {
    if (arg == "Winterize") {
      this.winhide = false;
    }
  }
  Biddata(arg: any): void {
    if (arg == "Bid") {
      this.winhide = true;
    }
  }
  Thawdata(arg: any): void {
    if (arg == "Thaw") {
      this.winhide = true;
    }
  }

  // end code

  // yard code here

  YardMaintananceSubmit(content, msgShow: boolean) {
    this.PcrYardExterModelObj.WasGrassCutCompleted = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Grass_Cut_Completed;
    this.PcrYardExterModelObj.LotSize = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Lot_Size;
    this.PcrYardExterModelObj.CuttableArea = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Cuttable_Area;
    this.PcrYardExterModelObj.GrassmaintainedbyHOA = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Grass_Maintained_No;
    this.PcrYardExterModelObj.LotDimensionLength = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght;
    this.PcrYardExterModelObj.LotDimensionWidth = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width;
    this.PcrYardExterModelObj.LotDimensionheight = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height;
    this.PcrYardExterModelObj.BidForInitalCut = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut;
    this.PcrYardExterModelObj.BidRecut = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_Recut;
    this.PcrYardExterModelObj.ReasonForinitalCut = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut;
    this.PcrYardExterModelObj.ReasonForRecut = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Reason_For_Recut;
    this.PcrYardExterModelObj.Tressshrubscutbackonthisorder = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Trees_Cut_Back_Order;
    this.PcrYardExterModelObj.UponArrivalwereShrubstouchinghouseorotherstructures = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House;
    this.PcrYardExterModelObj.UponArrivalwereTreestouchinghouseorotherstructures = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Arrival_Trees_Touching_House;
    this.PcrYardExterModelObj.Weretheytrimmedperinsurerguidelines = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines;
    this.PcrYardExterModelObj.UponDeparturewereTreesShrubstouchinghouseorotherstrucures = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Depature_Trees;
    this.PcrYardExterModelObj.DimensionsLength = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length;
    this.PcrYardExterModelObj.DimensionsWidth = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width;
    this.PcrYardExterModelObj.DimensionsHeight = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height;
    this.PcrYardExterModelObj.Quantity = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity;
    this.PcrYardExterModelObj.UnitPrice = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price;
    this.PcrYardExterModelObj.BidAmount = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount;
    this.PcrYardExterModelObj.Location = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Location;
    this.PcrYardExterModelObj.Reasons = {
      TouchingHouse: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House,
      ouchingOherStructure: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure,
      WithinStreetView: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View,
      AffectingFencingLanai: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing
    };
    this.PcrYardExterModelObj.CausingDamage = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage;
    this.PcrYardExterModelObj.Describe = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Describe;
    this.PcrYardExterModelObj.BidToTrimTreesDimensionsLength = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length;
    this.PcrYardExterModelObj.BidToTrimTreesDimensionsWidth = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width;
    this.PcrYardExterModelObj.BidToTrimTreesDimensionsHeight = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height;
    this.PcrYardExterModelObj.BidToTrimTreesQuantity = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Quantity;
    this.PcrYardExterModelObj.BidToTrimTreesUnitPrice = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price;
    this.PcrYardExterModelObj.BidToTrimTreesBidAmount = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount;
    this.PcrYardExterModelObj.BidToTrimTreesLocation = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Location;
    this.PcrYardExterModelObj.BidToTrimTreesReasons = {
      TouchingHouse: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House,
      ouchingOherStructure: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure,
      WithinStreetView: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View,
      AffectingFencingLanai: this.PCR_Yard_MaintenanceModelObj
        .PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing
    };
    this.PcrYardExterModelObj.BidToTrimCausingDamage = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage;
    this.PcrYardExterModelObj.BidToTrimDescribe = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Describe;

    this.contentx = content;

    this.isLoadingYard = true;
    this.buttonYard = "Processing";

    this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_WO_Id = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .postyard(this.PCR_Yard_MaintenanceModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_pkeyId = Number(
            response[0].PCR_Yard_Maintenance_pkeyId
          );
          this.isLoadingYard = false;
          this.buttonYard = "Update";
          if (msgShow) {
            this.MessageFlag = "Yard Maintanance Saved...!";
            this.commonMessage(this.contentx);
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 5; // this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PcrYardExterModelObj
          );
          this.PostFiveBrother();
        }
      });
  }

  GetYardmaintanance() {
    this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetYardMaintain(this.PCR_Yard_MaintenanceModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_pkeyId =
            response[0][0].PCR_Yard_Maintenance_pkeyId;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_MasterId =
            response[0][0].PCR_Yard_Maintenance_MasterId;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_WO_Id =
            response[0][0].PCR_Yard_Maintenance_WO_Id;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_ValType =
            response[0][0].PCR_Yard_Maintenance_ValType;

          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Grass_Cut_Completed =
            response[0][0].PCR_Yard_Maintenance_Grass_Cut_Completed;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Lot_Size =
            response[0][0].PCR_Yard_Maintenance_Lot_Size;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Cuttable_Area =
            response[0][0].PCR_Yard_Maintenance_Cuttable_Area;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght =
            response[0][0].PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width =
            response[0][0].PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height =
            response[0][0].PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut =
            response[0][0].PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut =
            response[0][0].PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_Recut =
            response[0][0].PCR_Yard_Maintenance_Bid_Recut;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Reason_For_Recut =
            response[0][0].PCR_Yard_Maintenance_Reason_For_Recut;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Trees_Cut_Back_Order =
            response[0][0].PCR_Yard_Maintenance_Trees_Cut_Back_Order;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House =
            response[0][0].PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Arrival_Trees_Touching_House =
            response[0][0].PCR_Yard_Maintenance_Arrival_Trees_Touching_House;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Depature_Trees =
            response[0][0].PCR_Yard_Maintenance_Depature_Trees;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines =
            response[0][0].PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines;

          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Grass_Maintained_No =
            response[0][0].PCR_Yard_Maintenance_Grass_Maintained_No;

          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Location =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Location;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Shrubs_Describe =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Shrubs_Describe;

          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Quantity =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Quantity;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Location =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Location;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage;
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Bid_To_Trim_Describe =
            response[0][0].PCR_Yard_Maintenance_Bid_To_Trim_Describe;

          // this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_IsActive  = response[0][0].PCR_Yard_Maintenance_IsActive
          // this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_IsDelete  = response[0][0].PCR_Yard_Maintenance_IsDelete
        }

        this.GetPCRPOOLDATA();
      });
  }

  // yard funcationality
  insurerguidelines: boolean = false;
  WasGrassCutDiv: boolean = false;
  WasGrassCut(arg: any): void {
    if (arg == "Yes") {
      this.WasGrassCutDiv = true;
      this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Grass_Maintained_No =
        "";
    } else {
      this.WasGrassCutDiv = false;
    }
  }

  BidToTrimShrubs: boolean = false;
  UponArrivalwere(arg: any): void {
    if (arg == "Yes") {
      if (
        this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Depature_Trees ==
        "Yes"
      ) {
        this.BidToTrimShrubs = false;
      }
    } else {
      this.BidToTrimShrubs = true;
    }
    this.insurerguidelinesCall(arg);
  }

  BidToTrimTrees: boolean = false;
  UponArrivalwereTree(arg: any): void {
    if (arg == "Yes") {
      if (
        this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Depature_Trees ==
        "Yes"
      ) {
        this.BidToTrimTrees = false;
      }
    } else {
      this.BidToTrimTrees = true;
    }
    this.insurerguidelinesCall(arg);
  }

  UponDeparture(arg: any): void {
    if (arg == "Yes") {
      this.BidToTrimShrubs = false;
      this.BidToTrimTrees = false;
    } else {
      this.BidToTrimShrubs = true;
      this.BidToTrimTrees = true;
    }
  }

  insurerguidelinesCall(arg: any) {
    if (this.BidToTrimShrubs == this.BidToTrimTrees) {
      if (arg == "No") {
        this.insurerguidelines = true;
      }
    } else {
      this.insurerguidelines = false;
    }
  }

  // code end

  // Add Pool Data
  PcrPoolData(content, msgShow: boolean) {

    this.PcrPoolExterModelObj.PoolPresent = this.PCR_PoolModelObj.PCR_Pool_Info_Pool_Present;
    this.PcrPoolExterModelObj.Diameter = this.PCR_PoolModelObj.PCR_Pool_Diameter_Ft;
    this.PcrPoolExterModelObj.Length = this.PCR_PoolModelObj.PCR_Pool_Length_Ft;
    this.PcrPoolExterModelObj.Width = this.PCR_PoolModelObj.PCR_Pool_Width_Ft;
    this.PcrPoolExterModelObj.PoolCondition = this.PCR_PoolModelObj.PCR_Pool_Condition_Good;
    this.PcrPoolExterModelObj.Didyousecureonthisorder = this.PCR_PoolModelObj.PCR_Pool_Secure_On_This_Order;
    this.PcrPoolExterModelObj.TypeGround = this.PCR_PoolModelObj.PCR_Pool_Type_InGround;
    this.PcrPoolExterModelObj.IsthereaFence = this.PCR_PoolModelObj.PCR_Pool_Is_There_Fence;
    this.PcrPoolExterModelObj.DidyousecureonthisorderPreviouslySecuredbyFiveBro = this.PCR_PoolModelObj.PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers;
    this.PcrPoolExterModelObj.IsItLocked = this.PCR_PoolModelObj.PCR_Pool_Is_It_Locked;
    this.PcrPoolExterModelObj.WaterLavel = this.PCR_PoolModelObj.PCR_Pool_Water_Level_Full;
    this.PcrPoolExterModelObj.DidYouDrainIt = this.PCR_PoolModelObj.PCR_Pool_Did_You_Drain_It;
    this.PcrPoolExterModelObj.DismantleRemoved = this.PCR_PoolModelObj.PCR_Pool_Dismantled_Removed;
    this.PcrPoolExterModelObj.Isthereadespressionleft = this.PCR_PoolModelObj.PCR_Pool_Is_There_Depression_Left;
    this.PcrPoolExterModelObj.Securedperguidelines = this.PCR_PoolModelObj.PCR_Pool_Secured_Per_Guidelines;
    this.PcrPoolExterModelObj.Isthepoolconvertedsothatitpreventsentery = this.PCR_PoolModelObj.PCR_Pool_Is_The_Pool_Converted_Prevents_Entry;
    this.PcrPoolExterModelObj.BidtoDrain = this.PCR_PoolModelObj.PCR_Pool_Bid_To_Drain;
    this.PcrPoolExterModelObj.BidtoDismantle = this.PCR_PoolModelObj.PCR_Pool_Bid_To_Dismantle;
    this.PcrPoolExterModelObj.DrainRemove = this.PCR_PoolModelObj.PCR_Pool_Drain_Remove;
    this.PcrPoolExterModelObj.BitToFillHole = this.PCR_PoolModelObj.PCR_Pool_Bid_To_Fill_Hole;
    this.PcrPoolExterModelObj.SizeOfHole = this.PCR_PoolModelObj.PCR_Pool_Size_Of_Hole;
    this.PcrPoolExterModelObj.CubicYdsofDirt = this.PCR_PoolModelObj.PCR_Pool_Cubic_Yds_Of_Dirt;
    this.PcrPoolExterModelObj.DrainShockandInstallSafetyCover = this.PCR_PoolModelObj.PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover;
    this.PcrPoolExterModelObj.BidtoInstallSafetyCover = this.PCR_PoolModelObj.PCR_Pool_Bid_To_Install_Safety_Cover;
    this.PcrPoolExterModelObj.Present = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Present;
    this.PcrPoolExterModelObj.convertedDrained = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained;
    this.PcrPoolExterModelObj.DidYouSecure = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Did_You_Secure;
    this.PcrPoolExterModelObj.HotTubBidsDiameter = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Diameter_Ft;
    this.PcrPoolExterModelObj.HotTubBidsLength = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Length_Ft;
    this.PcrPoolExterModelObj.HotTubBidswidth = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Width_Ft;
    this.PcrPoolExterModelObj.BidToInstallCover = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover;
    this.PcrPoolExterModelObj.DrainSecure = this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Drain_Secure;

    this.contentx = content;
    this.poorLoading = true;
    this.poorbutton = "Processing";

    this.PCR_PoolModelObj.PCR_Pool_WO_Id = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .PoolDataPost(this.PCR_PoolModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_PoolModelObj.PCR_Pool_pkeyId = Number(
            response[0].PCR_Pool_pkeyId
          );

          this.poorLoading = false;
          this.poorbutton = "Update";

          if (msgShow) {
            this.MessageFlag = "Pcr Pool Data Saved...!";
            this.commonMessage(this.contentx);
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 8;// this.PCR_PoolModelObj.PCR_Pool_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrPoolExterModelObj);
          this.PostFiveBrother();
        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }

  //Get Pcr Pool Data
  GetPCRPOOLDATA() {
    this.PCR_PoolModelObj.PCR_Pool_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetPcrPoolDetails(this.PCR_PoolModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_PoolModelObj.PCR_Pool_pkeyId =
            response[0][0].PCR_Pool_pkeyId;
          this.PCR_PoolModelObj.PCR_Pool_WO_Id = response[0][0].PCR_Pool_WO_Id;
          this.PCR_PoolModelObj.PCR_Pool_MasterId =
            response[0][0].PCR_Pool_MasterId;
          this.PCR_PoolModelObj.PCR_Pool_ValType =
            response[0][0].PCR_Pool_ValType;
          this.PCR_PoolModelObj.PCR_Pool_Bid_To_Dismantle =
            response[0][0].PCR_Pool_Bid_To_Dismantle;
          this.PCR_PoolModelObj.PCR_Pool_Bid_To_Drain =
            response[0][0].PCR_Pool_Bid_To_Drain;
          this.PCR_PoolModelObj.PCR_Pool_Bid_To_Fill_Hole =
            response[0][0].PCR_Pool_Bid_To_Fill_Hole;
          this.PCR_PoolModelObj.PCR_Pool_Bid_To_Install_Safety_Cover =
            response[0][0].PCR_Pool_Bid_To_Install_Safety_Cover;
          this.PCR_PoolModelObj.PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover =
            response[0][0].PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover;
          this.PCR_PoolModelObj.PCR_Pool_Condition_Good =
            response[0][0].PCR_Pool_Condition_Good;
          this.PCR_PoolModelObj.PCR_Pool_Cubic_Yds_Of_Dirt =
            response[0][0].PCR_Pool_Cubic_Yds_Of_Dirt;
          this.PCR_PoolModelObj.PCR_Pool_Diameter_Ft =
            response[0][0].PCR_Pool_Diameter_Ft;
          this.PCR_PoolModelObj.PCR_Pool_Did_You_Drain_It =
            response[0][0].PCR_Pool_Did_You_Drain_It;
          this.PCR_PoolModelObj.PCR_Pool_Dismantled_Removed =
            response[0][0].PCR_Pool_Dismantled_Removed;
          this.PCR_PoolModelObj.PCR_Pool_Drain_Remove =
            response[0][0].PCR_Pool_Drain_Remove;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Bid_To_Drain =
            response[0][0].PCR_Pool_Hot_Tub_Bids_Bid_To_Drain;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover =
            response[0][0].PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Diameter_Ft =
            response[0][0].PCR_Pool_Hot_Tub_Bids_Diameter_Ft;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Drain_Secure =
            response[0][0].PCR_Pool_Hot_Tub_Bids_Drain_Secure;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Length_Ft =
            response[0][0].PCR_Pool_Hot_Tub_Bids_Length_Ft;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Bids_Width_Ft =
            response[0][0].PCR_Pool_Hot_Tub_Bids_Width_Ft;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Did_You_Secure =
            response[0][0].PCR_Pool_Hot_Tub_Did_You_Secure;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Present =
            response[0][0].PCR_Pool_Hot_Tub_Present;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained =
            response[0][0].PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained;
          this.PCR_PoolModelObj.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained =
            response[0][0].PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained;
          this.PCR_PoolModelObj.PCR_Pool_Info_Pool_Present =
            response[0][0].PCR_Pool_Info_Pool_Present;
          this.PCR_PoolModelObj.PCR_Pool_Is_It_Locked =
            response[0][0].PCR_Pool_Is_It_Locked;
          this.PCR_PoolModelObj.PCR_Pool_Is_The_Pool_Converted_Prevents_Entry =
            response[0][0].PCR_Pool_Is_The_Pool_Converted_Prevents_Entry;
          this.PCR_PoolModelObj.PCR_Pool_Is_There_Depression_Left =
            response[0][0].PCR_Pool_Is_There_Depression_Left;
          this.PCR_PoolModelObj.PCR_Pool_Is_There_Fence =
            response[0][0].PCR_Pool_Is_There_Fence;
          this.PCR_PoolModelObj.PCR_Pool_Length_Ft =
            response[0][0].PCR_Pool_Length_Ft;
          this.PCR_PoolModelObj.PCR_Pool_Secure_On_This_Order =
            response[0][0].PCR_Pool_Secure_On_This_Order;
          this.PCR_PoolModelObj.PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers =
            response[0][0].PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers;
          this.PCR_PoolModelObj.PCR_Pool_Secured_Per_Guidelines =
            response[0][0].PCR_Pool_Secured_Per_Guidelines;
          this.PCR_PoolModelObj.PCR_Pool_Size_Of_Hole =
            response[0][0].PCR_Pool_Size_Of_Hole;
          this.PCR_PoolModelObj.PCR_Pool_Type_InGround =
            response[0][0].PCR_Pool_Type_InGround;
          this.PCR_PoolModelObj.PCR_Pool_Water_Level_Full =
            response[0][0].PCR_Pool_Water_Level_Full;
          this.PCR_PoolModelObj.PCR_Pool_Width_Ft =
            response[0][0].PCR_Pool_Width_Ft;
        }

        this.GetDebrisData();
      });
  }
  // pool functionality hide and show
  poolprnt: boolean = false;

  PoolPresentData(arg: any): void {
    if (arg == "No") {
      this.poolprnt = true;
    } else {
      this.poolprnt = false;
    }
  }
  grounds: boolean = true;
  intrer: boolean = false;
  isdisable: boolean = false;
  InGroundData(arg: any): void {
    if (arg == "In Ground") {
      this.intrer = true;
      this.grounds = false;
      this.isdisable = true;
    } else {
      this.intrer = false;
      this.grounds = true;
      this.isdisable = false;
    }
  }
  ordt: boolean = false;
  thisorderdata(arg: any): void {
    if (arg == "Yes") {
      this.ordt = true;
    } else {
      this.ordt = false;
    }
  }
  HotTub: boolean = false;
  HotTubPresent(arg: any): void {
    if (arg == "No") {
      this.HotTub = true;
    } else {
      this.HotTub = false;
    }
  }

  // debris code here
  DebrisSubmit(content, msgShow: boolean) {
    this.PcrDebrisExterModelObj.DidyouremoveanyInteriorDebris = this.PCR_DebrisModelObj.PCR_Debris_Remove_Any_Interior_Debris;
    this.PcrDebrisExterModelObj.IsthereinteriorDebrispresent = this.PCR_DebrisModelObj.PCR_Debris_Is_There_Interior_Debris_Present;
    this.PcrDebrisExterModelObj.Describe = this.PCR_DebrisModelObj.PCR_Debris_Describe;
    this.PcrDebrisExterModelObj.CubicYards = this.PCR_DebrisModelObj.PCR_Debris_Cubic_Yards;
    this.PcrDebrisExterModelObj.Ispropertyinbroomsweptcondition = this.PCR_DebrisModelObj.PCR_Debris_Broom_Swept_Condition;
    this.PcrDebrisExterModelObj.broomsweptconditionDescribe = this.PCR_DebrisModelObj.PCR_Debris_Broom_Swept_Condition_Describe;
    this.PcrDebrisExterModelObj.FullName = this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Name;
    this.PcrDebrisExterModelObj.Phone = this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Phone;
    this.PcrDebrisExterModelObj.Address = this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Address;
    this.PcrDebrisExterModelObj.DecriptionOfWhatWasDumped = this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Desc_what_was_Dump;
    this.PcrDebrisExterModelObj.MeansOfDisposal = this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Means_Of_Disposal;
    this.PcrDebrisExterModelObj.DidyouremoveanyExteriorDebris = this.PCR_DebrisModelObj.PCR_Debris_Remove_Exterior_Debris;
    this.PcrDebrisExterModelObj.IsthereExteriorDebrispresent = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Present;
    this.PcrDebrisExterModelObj.ExteriorDebrisDescribe = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Describe;
    this.PcrDebrisExterModelObj.ExteriorDebrisCubicYards = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Cubic_Yard;
    this.PcrDebrisExterModelObj.ExteriorDebrisVisiblefromStreet = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Visible_From_Street;
    this.PcrDebrisExterModelObj.ArethereExteriorDebrisontheLawn = this.PCR_DebrisModelObj.PCR_Debris_Exterior_On_The_Lawn;
    this.PcrDebrisExterModelObj.ArethereVehicleRVsPresent = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Vehicles_Present;
    this.PcrDebrisExterModelObj.ArethereVehicleDescribe = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Vehicles_Present_Describe;
    this.PcrDebrisExterModelObj.ArethereInteriorHealthHazardspresent = this.PCR_DebrisModelObj.PCR_Debris_InteriorHazards_Health_Present;
    this.PcrDebrisExterModelObj.InteriorHazardsDescribe = this.PCR_DebrisModelObj.PCR_Debris_InteriorHazards_Health_Present_Describe;
    this.PcrDebrisExterModelObj.InteriorHazardsCubicYards = this.PCR_DebrisModelObj.PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard;
    this.PcrDebrisExterModelObj.ExteriorHazardsArethereExteriorHealthHazardspresent = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Hazards_Health_Present;
    this.PcrDebrisExterModelObj.ExteriorHazardsDescribe = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Hazards_Health_Present_Describe;
    this.PcrDebrisExterModelObj.ExteriorHazardsCubicYards = this.PCR_DebrisModelObj.PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards;

    this.contentx = content;

    this.Loadingdebris = true;
    this.buttondebris = "Processing";

    this.PCR_DebrisModelObj.PCR_Debris_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .postdebris(this.PCR_DebrisModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_DebrisModelObj.PCR_Debris_pkeyId = Number(
            response[0].PCR_Debris_pkeyId
          );
          this.Loadingdebris = false;
          this.buttondebris = "Update";
          if (msgShow) {
            this.MessageFlag = "Debris/Hazards Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = this.PCR_DebrisModelObj.PCR_Debris_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PcrDebrisExterModelObj
          );
          this.PostFiveBrother();
        }
      });
  }

  GetDebrisData() {
    this.PCR_DebrisModelObj.PCR_Debris_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GETdebris(this.PCR_DebrisModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_DebrisModelObj.PCR_Debris_pkeyId =
            response[0][0].PCR_Debris_pkeyId;

          this.PCR_DebrisModelObj.PCR_Debris_pkeyId =
            response[0][0].PCR_Debris_pkeyId;
          this.PCR_DebrisModelObj.PCR_Debris_Master_Id =
            response[0][0].PCR_Debris_Master_Id;
          this.PCR_DebrisModelObj.PCR_Debris_WO_Id =
            response[0][0].PCR_Debris_WO_Id;
          this.PCR_DebrisModelObj.PCR_Debris_ValType =
            response[0][0].PCR_Debris_ValType;

          this.PCR_DebrisModelObj.PCR_Debris_Remove_Any_Interior_Debris =
            response[0][0].PCR_Debris_Remove_Any_Interior_Debris;
          this.PCR_DebrisModelObj.PCR_Debris_Is_There_Interior_Debris_Present =
            response[0][0].PCR_Debris_Is_There_Interior_Debris_Present;
          this.PCR_DebrisModelObj.PCR_Debris_Describe =
            response[0][0].PCR_Debris_Describe;
          this.PCR_DebrisModelObj.PCR_Debris_Cubic_Yards =
            response[0][0].PCR_Debris_Cubic_Yards;

          this.PCR_DebrisModelObj.PCR_Debris_Broom_Swept_Condition =
            response[0][0].PCR_Debris_Broom_Swept_Condition;
          this.PCR_DebrisModelObj.PCR_Debris_Broom_Swept_Condition_Describe =
            response[0][0].PCR_Debris_Broom_Swept_Condition_Describe;

          this.PCR_DebrisModelObj.PCR_Debris_Remove_Exterior_Debris =
            response[0][0].PCR_Debris_Remove_Exterior_Debris;
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Present =
            response[0][0].PCR_Debris_Exterior_Debris_Present;

          this.ExteriorDebrispresent(
            this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Present
          );
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Describe =
            response[0][0].PCR_Debris_Exterior_Debris_Describe;
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Cubic_Yard =
            response[0][0].PCR_Debris_Exterior_Debris_Cubic_Yard;

          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Visible_From_Street =
            response[0][0].PCR_Debris_Exterior_Debris_Visible_From_Street;
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_On_The_Lawn =
            response[0][0].PCR_Debris_Exterior_On_The_Lawn;
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Vehicles_Present =
            response[0][0].PCR_Debris_Exterior_Vehicles_Present;
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Vehicles_Present_Describe =
            response[0][0].PCR_Debris_Exterior_Vehicles_Present_Describe;

          this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Name =
            response[0][0].PCR_Debris_Dump_Recipt_Name;
          this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Address =
            response[0][0].PCR_Debris_Dump_Recipt_Address;
          this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Phone =
            response[0][0].PCR_Debris_Dump_Recipt_Phone;
          this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Desc_what_was_Dump =
            response[0][0].PCR_Debris_Dump_Recipt_Desc_what_was_Dump;
          this.PCR_DebrisModelObj.PCR_Debris_Dump_Recipt_Means_Of_Disposal =
            response[0][0].PCR_Debris_Dump_Recipt_Means_Of_Disposal;

          this.PCR_DebrisModelObj.PCR_Debris_InteriorHazards_Health_Present =
            response[0][0].PCR_Debris_InteriorHazards_Health_Present;
          this.PCR_DebrisModelObj.PCR_Debris_InteriorHazards_Health_Present_Describe =
            response[0][0].PCR_Debris_InteriorHazards_Health_Present_Describe;
          this.PCR_DebrisModelObj.PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard =
            response[0][0].PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard;

          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Hazards_Health_Present =
            response[0][0].PCR_Debris_Exterior_Hazards_Health_Present;
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Hazards_Health_Present_Describe =
            response[0][0].PCR_Debris_Exterior_Hazards_Health_Present_Describe;
          this.PCR_DebrisModelObj.PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards =
            response[0][0].PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards;
          this.PCR_DebrisModelObj.PCR_Debris_IsActive =
            response[0][0].PCR_Debris_IsActive;
        }

        this.GetutilitiesData(); // change this code here
      });
  }

  DebrisHideDiv: boolean = false;
  ExteriorDebrispresent(arg: any): void {
    if (arg == "Yes") {
      this.DebrisHideDiv = false;
    } else {
      this.DebrisHideDiv = true;

      this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Visible_From_Street =
        "";
      this.PCR_DebrisModelObj.PCR_Debris_Exterior_On_The_Lawn = "";
      this.PCR_DebrisModelObj.PCR_Debris_Exterior_Vehicles_Present = "";
      this.PCR_DebrisModelObj.PCR_Debris_Exterior_Vehicles_Present_Describe =
        "";
      this.PCR_DebrisModelObj.PCR_Debris_Exterior_Debris_Visible_From_Street =
        "";
    }
  }

  // end code debris

  // utilities code start herre
  PostUtilitiesSubmit(content, msgShow: boolean) {


    this.Pcr_UtilitiesExterModelObj.UtilitiesOnArrivalWater = this.PCR_UtilitiesModelObj.PCR_Utilities_On_Arrival_Water;
    this.Pcr_UtilitiesExterModelObj.UtilitiesOnArrivalGas = this.PCR_UtilitiesModelObj.PCR_Utilities_On_Arrival_Gas;
    this.Pcr_UtilitiesExterModelObj.UtilitiesOnArrivalElectric = this.PCR_UtilitiesModelObj.PCR_Utilities_On_Arrival_Electric;
    this.Pcr_UtilitiesExterModelObj.UtilitiesOnDepartureWater = this.PCR_UtilitiesModelObj.PCR_Utilities_On_Departure_Water;
    this.Pcr_UtilitiesExterModelObj.UtilitiesOnDepartureGas = this.PCR_UtilitiesModelObj.PCR_Utilities_On_Departure_Gas;
    this.Pcr_UtilitiesExterModelObj.UtilitiesOnDepartureElectric = this.PCR_UtilitiesModelObj.PCR_Utilities_On_Departure_Electric;
    this.Pcr_UtilitiesExterModelObj.SumpPump = this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump;
    this.Pcr_UtilitiesExterModelObj.SumpPumpUnabletocheckNote = this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump_Commend;
    this.Pcr_UtilitiesExterModelObj.TestSumpPump = this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump_Sump_Test;
    this.Pcr_UtilitiesExterModelObj.MainBreakerOnandOperational = this.PCR_UtilitiesModelObj.PCR_Utilities_Main_Breaker_And_Operational;
    this.Pcr_UtilitiesExterModelObj.BidToReplaceSumpPump = this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferred = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Activated;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredWaterCoName = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Co_Name;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredWaterCoAddress = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Address;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredWaterCoPhone = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Phone;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredWaterCoAcct = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Acct;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredGasCoName = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Co_Name;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredGasCoAddress = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Address;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredGasCoPhone = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Phone;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredGasCoAcct = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Acct;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredElectricCoName = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Co_Name;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredElectricCoAddress = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Address;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredElectricCoPhone = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Phone;
    this.Pcr_UtilitiesExterModelObj.UtilityTransferredElectricCoAcct = this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Acct;
    this.Pcr_UtilitiesExterModelObj.ReasonUtilitiesNotTransferred = this.PCR_UtilitiesModelObj.PCR_Utilities_Reason_UtilitiesNot_Transferred;
    this.Pcr_UtilitiesExterModelObj.ReasonNotes = this.PCR_UtilitiesModelObj.PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes;



    this.contentx = content;
    this.LoadingdeUtilites = true;
    this.buttonUtilites = "Processing";
    this.PCR_UtilitiesModelObj.PCR_Utilities_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .PostUtilities(this.PCR_UtilitiesModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_UtilitiesModelObj.PCR_Utilities_pkeyId = Number(
            response[0].PCR_Utilities_pkeyId
          );

          this.LoadingdeUtilites = false;
          this.buttonUtilites = "Update";

          if (msgShow) {
            this.MessageFlag = "Utilites Information Saved...!";
            this.commonMessage(this.contentx);
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 9; //this.PCR_UtilitiesModelObj.PCR_Utilities_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.Pcr_UtilitiesExterModelObj);
          this.PostFiveBrother();


        }
      });
  }

  // get utilities

  GetutilitiesData() {
    this.PCR_UtilitiesModelObj.PCR_Utilities_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GETUtilities(this.PCR_UtilitiesModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_UtilitiesModelObj.PCR_Utilities_pkeyId =
            response[0][0].PCR_Utilities_pkeyId;

          this.PCR_UtilitiesModelObj.PCR_Utilities_pkeyId =
            response[0][0].PCR_Utilities_pkeyId;
          this.PCR_UtilitiesModelObj.PCR_Utilities_MasterId =
            response[0][0].PCR_Utilities_MasterId;
          this.PCR_UtilitiesModelObj.PCR_Utilities_WO_Id =
            response[0][0].PCR_Utilities_WO_Id;
          this.PCR_UtilitiesModelObj.PCR_Utilities_ValType =
            response[0][0].PCR_Utilities_ValType;

          this.PCR_UtilitiesModelObj.PCR_Utilities_On_Arrival_Water =
            response[0][0].PCR_Utilities_On_Arrival_Water;
          this.PCR_UtilitiesModelObj.PCR_Utilities_On_Departure_Water =
            response[0][0].PCR_Utilities_On_Departure_Water;

          this.PCR_UtilitiesModelObj.PCR_Utilities_On_Arrival_Gas =
            response[0][0].PCR_Utilities_On_Arrival_Gas;
          this.PCR_UtilitiesModelObj.PCR_Utilities_On_Departure_Gas =
            response[0][0].PCR_Utilities_On_Departure_Gas;

          this.PCR_UtilitiesModelObj.PCR_Utilities_On_Arrival_Electric =
            response[0][0].PCR_Utilities_On_Arrival_Electric;
          this.PCR_UtilitiesModelObj.PCR_Utilities_On_Departure_Electric =
            response[0][0].PCR_Utilities_On_Departure_Electric;

          this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump =
            response[0][0].PCR_Utilities_Sump_Pump;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump_Commend =
            response[0][0].PCR_Utilities_Sump_Pump_Commend;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump_Sump_Test =
            response[0][0].PCR_Utilities_Sump_Pump_Sump_Test;

          this.PCR_UtilitiesModelObj.PCR_Utilities_Main_Breaker_And_Operational =
            response[0][0].PCR_Utilities_Main_Breaker_And_Operational;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace =
            response[0][0].PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace;

          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Activated =
            response[0][0].PCR_Utilities_Transferred_Activated;

          this.PCR_UtilitiesModelObj.PCR_Utilities_Reason_UtilitiesNot_Transferred =
            response[0][0].PCR_Utilities_Reason_UtilitiesNot_Transferred;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes =
            response[0][0].PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes;

          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Co_Name =
            response[0][0].PCR_Utilities_Transferred_Water_Co_Name;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Address =
            response[0][0].PCR_Utilities_Transferred_Water_Address;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Phone =
            response[0][0].PCR_Utilities_Transferred_Water_Phone;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Acct =
            response[0][0].PCR_Utilities_Transferred_Water_Acct;

          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Co_Name =
            response[0][0].PCR_Utilities_Transferred_Gas_Co_Name;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Address =
            response[0][0].PCR_Utilities_Transferred_Gas_Address;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Phone =
            response[0][0].PCR_Utilities_Transferred_Gas_Phone;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Acct =
            response[0][0].PCR_Utilities_Transferred_Gas_Acct;

          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Co_Name =
            response[0][0].PCR_Utilities_Transferred_Electric_Co_Name;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Address =
            response[0][0].PCR_Utilities_Transferred_Electric_Address;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Phone =
            response[0][0].PCR_Utilities_Transferred_Electric_Phone;
          this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Acct =
            response[0][0].PCR_Utilities_Transferred_Electric_Acct;

          this.PCR_UtilitiesModelObj.PCR_Utilities_IsActive =
            response[0][0].PCR_Utilities_IsActive;

          this.Doesnworkbidreplace(
            this.PCR_UtilitiesModelObj.PCR_Utilities_Sump_Pump_Sump_Test
          );
          this.UtilityTransferredMethos(
            this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Activated
          );
        }

        this.GetPCRDRDDATA();
      });
  }

  TestSumpPump: boolean = false;
  SumpPumpMethod(arg: any) {
    this.UnabletocheckNotes = true;
    this.BidToReplaceSumpPump = true;

    if (arg == "Yes") {
      this.TestSumpPump = false;
    } else {
      this.TestSumpPump = true;
    }
  }

  BidToReplaceSumpPump: boolean = true;
  UnabletocheckNotes: boolean = true;
  MissingMethodVal(arg: any) {
    this.TestSumpPump = true;
    if (arg == "Missing") {
      this.BidToReplaceSumpPump = false;
      this.UnabletocheckNotes = true;
    } else {
      this.UnabletocheckNotes = false;
      this.BidToReplaceSumpPump = true;
    }
  }

  WaterDiv: boolean = false;
  ReasonUtilitiesNotTransferred: boolean = true;
  UtilityTransferredMethos(arg: any) {
    if (arg == "No") {
      this.WaterDiv = true;
      this.ReasonUtilitiesNotTransferred = false;

      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Co_Name = "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Address = "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Phone = "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Water_Acct = "";

      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Co_Name = "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Address = "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Phone = "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Gas_Acct = "";

      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Co_Name =
        "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Address =
        "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Phone = "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Transferred_Electric_Acct = "";
    } else {
      this.WaterDiv = false;
      this.ReasonUtilitiesNotTransferred = true;

      this.PCR_UtilitiesModelObj.PCR_Utilities_Reason_UtilitiesNot_Transferred =
        "";
      this.PCR_UtilitiesModelObj.PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes =
        "";
    }
  }

  Doesnworkbidreplace(arg: any) {
    if (arg == "Doesn't work -bid to replace") {
      this.BidToReplaceSumpPump = false;
    } else {
      this.BidToReplaceSumpPump = true;
    }
  }

  // end code utilities

  // PCR Damage DropDown Data
  status = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "New" },
    { id: 3, name: "Cosmetic" },
    { id: 4, name: "Existing" },
    { id: 5, name: "Prograssing" }
  ];
  EXTDATA = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "Interior" },
    { id: 3, name: "Exterior" }
  ];
  //get dynimically dropdown
  pcrdamage: any;
  pcrcause: any;
  pcrbuild: any;
  damageroomdrd = true;
  GetPCRDRDDATA() {
    this.xClientResultPCRServices.GetPcrDRDDetails().subscribe(response => {
      if (response[0].length != 0) {
        this.pcrdamage = response[0];
        this.pcrcause = response[1];
        this.pcrbuild = response[2];
      }

      this.GetPCRDamageDATA();
    });
  }

  // PCR Damage Functionality

  AllSelectData(DamageArg: string): void {
    this.PCR_Damage_MasterModelObj.PCR_Damage_Fire_Smoke_Damage_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Mortgagor_Neglect_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Vandalism_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Freeze_Damage_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Storm_Damage_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Flood_Damage_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Water_Damage_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Wear_And_Tear_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Unfinished_Renovation_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Structural_Damage_Yes = DamageArg;
    this.PCR_Damage_MasterModelObj.PCR_Damage_Excessive_Humidty_Yes = DamageArg;
  }

  UregentDamageData(uregarg: string): void {
    if (uregarg == "No") {
      this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Water_Stains_Yes = "";
    } else {
      this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Water_Stains_Yes = uregarg;
    }
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Roof_Leak_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Roof_Traped_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Mold_Damage_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_SeePage_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Flooded_Basement_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Foundation_Cracks_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Wet_Carpet_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Floors_Safety_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Other_Causing_Damage_Yes = uregarg;
    this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Other_Safety_Issue_Yes = uregarg;
  }

  SystemDamageData(styarg: string): void {
    this.PCR_Damage_MasterModelObj.PCR_System_Damages_HVAC_System_Damage_Yes = styarg;
    this.PCR_Damage_MasterModelObj.PCR_System_Damages_Electric_Damage_Yes = styarg;
    this.PCR_Damage_MasterModelObj.PCR_System_Damages_Plumbing_Damage_Yes = styarg;
    this.PCR_Damage_MasterModelObj.PCR_System_Damages_Uncapped_Wire_Yes = styarg;
  }

  // Add PCR Damage Master Data

  AddPCRDamage(content, msgShow: boolean) {

    this.PcrDamagesExterModelObj.SmokeDamage = this.PCR_Damage_MasterModelObj.PCR_Damage_Fire_Smoke_Damage_Yes;
    this.PcrDamagesExterModelObj.MortgagorNeglect = this.PCR_Damage_MasterModelObj.PCR_Damage_Mortgagor_Neglect_Yes;
    this.PcrDamagesExterModelObj.Vandalism = this.PCR_Damage_MasterModelObj.PCR_Damage_Vandalism_Yes;
    this.PcrDamagesExterModelObj.FreezeDamage = this.PCR_Damage_MasterModelObj.PCR_Damage_Freeze_Damage_Yes;
    this.PcrDamagesExterModelObj.StormDamage = this.PCR_Damage_MasterModelObj.PCR_Damage_Storm_Damage_Yes;
    this.PcrDamagesExterModelObj.FloodDamage = this.PCR_Damage_MasterModelObj.PCR_Damage_Flood_Damage_Yes;
    this.PcrDamagesExterModelObj.WaterDamage = this.PCR_Damage_MasterModelObj.PCR_Damage_Water_Damage_Yes;
    this.PcrDamagesExterModelObj.WearTear = this.PCR_Damage_MasterModelObj.PCR_Damage_Wear_And_Tear_Yes;
    this.PcrDamagesExterModelObj.UnfinishedRenovation = this.PCR_Damage_MasterModelObj.PCR_Damage_Unfinished_Renovation_Yes;
    this.PcrDamagesExterModelObj.StructuralDamage = this.PCR_Damage_MasterModelObj.PCR_Damage_Structural_Damage_Yes;
    this.PcrDamagesExterModelObj.ExcessiveHumidity = this.PCR_Damage_MasterModelObj.PCR_Damage_Excessive_Humidty_Yes;
    this.PcrDamagesExterModelObj.RoofLeak = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Roof_Leak_Yes;
    this.PcrDamagesExterModelObj.RoofTraped = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Roof_Traped_Yes;
    this.PcrDamagesExterModelObj.MoldDamage = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Mold_Damage_Yes;
    this.PcrDamagesExterModelObj.Seepage = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_SeePage_Yes;
    this.PcrDamagesExterModelObj.FloodedBasement = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Flooded_Basement_Yes;
    this.PcrDamagesExterModelObj.FoundationCracks = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Foundation_Cracks_Yes;
    this.PcrDamagesExterModelObj.WetCarpet = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Wet_Carpet_Yes;
    this.PcrDamagesExterModelObj.WaterStains = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Water_Stains_Yes;
    this.PcrDamagesExterModelObj.DamageFloors = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Floors_Safety_Yes;
    this.PcrDamagesExterModelObj.OtherCausingDamage = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Other_Causing_Damage_Yes;
    this.PcrDamagesExterModelObj.OtherSafetyIssue = this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Other_Safety_Issue_Yes;
    this.PcrDamagesExterModelObj.HVACSystemDamage = this.PCR_Damage_MasterModelObj.PCR_System_Damages_HVAC_System_Damage_Yes;
    this.PcrDamagesExterModelObj.ElectricDamage = this.PCR_Damage_MasterModelObj.PCR_System_Damages_Electric_Damage_Yes;
    this.PcrDamagesExterModelObj.PlumbingDamage = this.PCR_Damage_MasterModelObj.PCR_System_Damages_Plumbing_Damage_Yes;
    this.PcrDamagesExterModelObj.UncappedWire = this.PCR_Damage_MasterModelObj.PCR_System_Damages_Uncapped_Wire_Yes;
    this.PcrDamagesExterModelObj.FEMADamage = this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Damages_Yes;
    this.PcrDamagesExterModelObj.FEMATrailerPresent = this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Trailer_Present;
    this.PcrDamagesExterModelObj.PropertyHabitable = this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable;
    this.PcrDamagesExterModelObj.FEMADamageEstimate = this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Damage_Estimate;
    this.PcrDamagesExterModelObj.FEMANeighborhoodLevel = this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Neighborhood_Level_Light;
    this.PcrDamagesExterModelObj.FEMAPropertyLevel = this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Property_Level_Light_Moderate;
    this.PcrDamagesExterModelObj.FEMADamageCausedby = {
      wind: this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind,
      Water: this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water,
      Fire: this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire,
      Flood: this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood,
    }
    this.PcrDamagesExterModelObj.Damage = this.PCR_Damage_MasterModelObj.PCR_Damages_Damage;
    this.PcrDamagesExterModelObj.Status = this.PCR_Damage_MasterModelObj.PCR_Damages_Status;
    this.PcrDamagesExterModelObj.Cause = this.PCR_Damage_MasterModelObj.PCR_Damages_Cause;
    this.PcrDamagesExterModelObj.IntExt = this.PCR_Damage_MasterModelObj.PCR_Damages_Int_Ext;
    this.PcrDamagesExterModelObj.Building = this.PCR_Damage_MasterModelObj.PCR_Damages_Building;
    this.PcrDamagesExterModelObj.Room = this.PCR_Damage_MasterModelObj.PCR_Damages_Room;
    this.PcrDamagesExterModelObj.Discription = this.PCR_Damage_MasterModelObj.PCR_Damages_Description;
    this.PcrDamagesExterModelObj.QtySize = this.PCR_Damage_MasterModelObj.PCR_Damages_Qty;
    this.PcrDamagesExterModelObj.Estimate = this.PCR_Damage_MasterModelObj.PCR_Damages_Estimate;

    this.contentx = content;

    this.isLoadingDamage = true;
    this.buttonDamage = "Processing";

    this.PCR_Damage_MasterModelObj.PCR_Damage_WO_Id = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .PCRDamageDataPost(this.PCR_Damage_MasterModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_Damage_MasterModelObj.PCR_Damage_pkeyId = Number(
            response[0].PCR_Pool_pkeyId
          );
          this.isLoadingDamage = false;
          this.buttonDamage = "Update";
          if (msgShow) {
            this.MessageFlag = "PCR Damage Data Saved...!";
            this.commonMessage(this.contentx);
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 11;// this.PCR_Damage_MasterModelObj.PCR_Damage_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrDamagesExterModelObj);
          this.PostFiveBrother();

        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }

  //Get PCR Damage Master Data

  //Get Pcr  Data
  GetPCRDamageDATA() {
    this.PCR_Damage_MasterModelObj.PCR_Damage_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetPcrDamageDetails(this.PCR_Damage_MasterModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_Damage_MasterModelObj.PCR_Damage_pkeyId =
            response[0][0].PCR_Damage_pkeyId;
          this.PCR_Damage_MasterModelObj.PCR_Damage_MasterId =
            response[0][0].PCR_Damage_MasterId;
          this.PCR_Damage_MasterModelObj.PCR_Damage_WO_Id =
            response[0][0].PCR_Damage_WO_Id;
          this.PCR_Damage_MasterModelObj.PCR_Damage_ValType =
            response[0][0].PCR_Damage_ValType;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Excessive_Humidty_Yes =
            response[0][0].PCR_Damage_Excessive_Humidty_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Fire_Smoke_Damage_Yes =
            response[0][0].PCR_Damage_Fire_Smoke_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Flood_Damage_Yes =
            response[0][0].PCR_Damage_Flood_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Freeze_Damage_Yes =
            response[0][0].PCR_Damage_Freeze_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Mortgagor_Neglect_Yes =
            response[0][0].PCR_Damage_Mortgagor_Neglect_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Storm_Damage_Yes =
            response[0][0].PCR_Damage_Storm_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Structural_Damage_Yes =
            response[0][0].PCR_Damage_Structural_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Unfinished_Renovation_Yes =
            response[0][0].PCR_Damage_Unfinished_Renovation_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Vandalism_Yes =
            response[0][0].PCR_Damage_Vandalism_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Water_Damage_Yes =
            response[0][0].PCR_Damage_Water_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damage_Wear_And_Tear_Yes =
            response[0][0].PCR_Damage_Wear_And_Tear_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Building =
            response[0][0].PCR_Damages_Building;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Cause =
            response[0][0].PCR_Damages_Cause;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Damage =
            response[0][0].PCR_Damages_Damage;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Description =
            response[0][0].PCR_Damages_Description;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Estimate =
            response[0][0].PCR_Damages_Estimate;
          this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Damage_Estimate =
            response[0][0].PCR_Damages_FEMA_Damage_Estimate;
          this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Damages_Yes =
            response[0][0].PCR_Damages_FEMA_Damages_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Neighborhood_Level_Light =
            response[0][0].PCR_Damages_FEMA_Neighborhood_Level_Light;
          this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Property_Level_Light_Moderate =
            response[0][0].PCR_Damages_FEMA_Property_Level_Light_Moderate;
          this.PCR_Damage_MasterModelObj.PCR_Damages_FEMA_Trailer_Present =
            response[0][0].PCR_Damages_FEMA_Trailer_Present;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Int_Ext =
            response[0][0].PCR_Damages_Int_Ext;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable =
            response[0][0].PCR_Damages_Property_Habitable;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire =
            response[0][0].PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood =
            response[0][0].PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water =
            response[0][0].PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind =
            response[0][0].PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Qty =
            response[0][0].PCR_Damages_Qty;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Room =
            response[0][0].PCR_Damages_Room;
          this.PCR_Damage_MasterModelObj.PCR_Damages_Status =
            response[0][0].PCR_Damages_Status;
          this.PCR_Damage_MasterModelObj.PCR_System_Damages_Electric_Damage_Yes =
            response[0][0].PCR_System_Damages_Electric_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_System_Damages_HVAC_System_Damage_Yes =
            response[0][0].PCR_System_Damages_HVAC_System_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_System_Damages_Plumbing_Damage_Yes =
            response[0][0].PCR_System_Damages_Plumbing_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_System_Damages_Uncapped_Wire_Yes =
            response[0][0].PCR_System_Damages_Uncapped_Wire_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Flooded_Basement_Yes =
            response[0][0].PCR_Urgent_Damages_Flooded_Basement_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Floors_Safety_Yes =
            response[0][0].PCR_Urgent_Damages_Floors_Safety_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Foundation_Cracks_Yes =
            response[0][0].PCR_Urgent_Damages_Foundation_Cracks_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Mold_Damage_Yes =
            response[0][0].PCR_Urgent_Damages_Mold_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Other_Causing_Damage_Yes =
            response[0][0].PCR_Urgent_Damages_Other_Causing_Damage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Other_Safety_Issue_Yes =
            response[0][0].PCR_Urgent_Damages_Other_Safety_Issue_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Roof_Leak_Yes =
            response[0][0].PCR_Urgent_Damages_Roof_Leak_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Roof_Traped_Yes =
            response[0][0].PCR_Urgent_Damages_Roof_Traped_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_SeePage_Yes =
            response[0][0].PCR_Urgent_Damages_SeePage_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Water_Stains_Yes =
            response[0][0].PCR_Urgent_Damages_Water_Stains_Yes;
          this.PCR_Damage_MasterModelObj.PCR_Urgent_Damages_Wet_Carpet_Yes =
            response[0][0].PCR_Urgent_Damages_Wet_Carpet_Yes;
        }

        this.GetConveyanceData(); //change here
      });
  }

  // conveyance functionality

  instruct: boolean = true;
  woinstructionyes(arg: any): void {
    if (arg == "No") {
      this.instruct = false;
    } else {
      this.instruct = true;
    }
  }
  securedss: boolean = true;
  secureguideline(arg: any): void {
    if (arg == "No") {
      this.securedss = false;
    } else {
      this.securedss = true;
    }
  }

  hub: boolean = true;
  hudguidelinedata(arg: any): void {
    if (arg == "No") {
      this.hub = false;
    } else {
      this.hub = true;
    }
  }

  convenxyz: boolean = true;
  conveyancedata(arg: any): void {
    if (arg == "No") {
      this.convenxyz = false;
    } else {
      this.convenxyz = true;
      this.PCR_ConveyanceModelObj.PCR_Conveyance_Conveyance_Condition = "";
    }
  }

  //save the conveyance data
  PCRConveyancesave(content, msgShow: boolean) {


    this.PcrConveyanceExterModelObj.Wasallworkcompletedasperworkorderinstruction = this.PCR_ConveyanceModelObj.PCR_Conveyance_Work_Order_Instruction;
    this.PcrConveyanceExterModelObj.IspropertySecuredperGuidelines = this.PCR_ConveyanceModelObj.PCR_Conveyance_Secured_Per_Guidelines;
    this.PcrConveyanceExterModelObj.PropertyisfreeofanyDamagesthatareorCouldpotentiallycauseadditionaldamage = this.PCR_ConveyanceModelObj.PCR_Conveyance_Additional_Damage;
    this.PcrConveyanceExterModelObj.Whereanynewissuefoundrequiringabidonthisvisit = this.PCR_ConveyanceModelObj.PCR_Conveyance_Bid_On_This_Visit;
    this.PcrConveyanceExterModelObj.AreGrassWeedtallandneedmaintainance = this.PCR_ConveyanceModelObj.PCR_Conveyance_Need_Maintenance;
    this.PcrConveyanceExterModelObj.ArethereanyOvergrownShrubsortrees = this.PCR_ConveyanceModelObj.PCR_Conveyance_Shrubs_or_tree;
    this.PcrConveyanceExterModelObj.IspropertyincludingallstructuresAtticsandExteriorfreeofDebrispersonalhazardsandisinbroomsweptcondition = this.PCR_ConveyanceModelObj.PCR_Conveyance_Broom_Swept_Condition;
    this.PcrConveyanceExterModelObj.PropertyhasbeenthoroughlywinterizedperHUDguidelines = this.PCR_ConveyanceModelObj.PCR_Conveyance_HUD_Guidelines;
    this.PcrConveyanceExterModelObj.PoolhottubsSpassecuredwithacoverthatpreventsunauthorizedoraccidentalentry = this.PCR_ConveyanceModelObj.PCR_Conveyance_Accidental_Entry;
    this.PcrConveyanceExterModelObj.Smallpondswatergardensandwaterfeaturesaresecure = this.PCR_ConveyanceModelObj.PCR_Conveyance_Features_Are_Secure;
    this.PcrConveyanceExterModelObj.Sumppumpsareinplaceandoperational = this.PCR_ConveyanceModelObj.PCR_Conveyance_In_Place_Operational;
    this.PcrConveyanceExterModelObj.Thepropertyisfreeofanimalsverminandinsects = this.PCR_ConveyanceModelObj.PCR_Conveyance_Property_Of_Animals;
    this.PcrConveyanceExterModelObj.FencesandgatespresentatFTVareintactandsecure = this.PCR_ConveyanceModelObj.PCR_Conveyance_Intact_Secure;
    this.PcrConveyanceExterModelObj.Allroofarefreeofleaksorothersourcesofwaterinstrusion = this.PCR_ConveyanceModelObj.PCR_Conveyance_Water_Instruction;
    this.PcrConveyanceExterModelObj.Thefoundationisstructurallyintactandfreeofwater = this.PCR_ConveyanceModelObj.PCR_Conveyance_Free_Of_Water;
    this.PcrConveyanceExterModelObj.Propertyisfreeofmoldandthesourceofwaterormoisturehasbeeneliminated = this.PCR_ConveyanceModelObj.PCR_Conveyance_Moisture_has_Eliminated;
    this.PcrConveyanceExterModelObj.YardisMaintainedandsnowremovedincompliancewithlocalcodeordinance = this.PCR_ConveyanceModelObj.PCR_Conveyance_Orderdinance;
    this.PcrConveyanceExterModelObj.Areanyfloorssoftwarpedunevenetc = this.PCR_ConveyanceModelObj.PCR_Conveyance_Uneven;
    this.PcrConveyanceExterModelObj.Upondeparturewaspropertyleftinconveyancecondition = this.PCR_ConveyanceModelObj.PCR_Conveyance_Conveyance_Condition;
    this.PcrConveyanceExterModelObj.Notes = this.PCR_ConveyanceModelObj.PCR_Conveyance_Note;


    this.contentx = content;
    this.isLoadingcoveyance = true;
    this.buttonconveyance = "Processing";

    this.PCR_ConveyanceModelObj.PCR_Conveyance_Wo_ID = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .PCRConveyanceDataPost(this.PCR_ConveyanceModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_ConveyanceModelObj.PCR_Conveyance_pkeyID = Number(
            response[0].PCR_Conveyance_pkeyID
          );
          this.isLoadingcoveyance = false;
          this.buttonconveyance = "Update";

          if (msgShow) {
            this.MessageFlag = "PCR Conveyance Data Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 12//;this.PCR_ConveyanceModelObj.PCR_Conveyance_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrConveyanceExterModelObj);
          this.PostFiveBrother();

        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }

  GetConveyanceData() {
    this.PCR_ConveyanceModelObj.PCR_Conveyance_Wo_ID = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetConveyanceDetails(this.PCR_ConveyanceModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_ConveyanceModelObj.PCR_Conveyance_pkeyID =
            response[0][0].PCR_Conveyance_pkeyID;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_MasterID =
            response[0][0].PCR_Conveyance_MasterID;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Wo_ID =
            response[0][0].PCR_Conveyance_Wo_ID;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_ValType =
            response[0][0].PCR_Conveyance_ValType;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Work_Order_Instruction =
            response[0][0].PCR_Conveyance_Work_Order_Instruction;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Secured_Per_Guidelines =
            response[0][0].PCR_Conveyance_Secured_Per_Guidelines;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Additional_Damage =
            response[0][0].PCR_Conveyance_Additional_Damage;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Bid_On_This_Visit =
            response[0][0].PCR_Conveyance_Bid_On_This_Visit;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Need_Maintenance =
            response[0][0].PCR_Conveyance_Need_Maintenance;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Broom_Swept_Condition =
            response[0][0].PCR_Conveyance_Broom_Swept_Condition;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_HUD_Guidelines =
            response[0][0].PCR_Conveyance_HUD_Guidelines;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Accidental_Entry =
            response[0][0].PCR_Conveyance_Accidental_Entry;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Features_Are_Secure =
            response[0][0].PCR_Conveyance_Features_Are_Secure;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_In_Place_Operational =
            response[0][0].PCR_Conveyance_In_Place_Operational;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Property_Of_Animals =
            response[0][0].PCR_Conveyance_Property_Of_Animals;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Intact_Secure =
            response[0][0].PCR_Conveyance_Intact_Secure;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Water_Instruction =
            response[0][0].PCR_Conveyance_Water_Instruction;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Free_Of_Water =
            response[0][0].PCR_Conveyance_Free_Of_Water;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Moisture_has_Eliminated =
            response[0][0].PCR_Conveyance_Moisture_has_Eliminated;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Orderdinance =
            response[0][0].PCR_Conveyance_Orderdinance;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Uneven =
            response[0][0].PCR_Conveyance_Uneven;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Conveyance_Condition =
            response[0][0].PCR_Conveyance_Conveyance_Condition;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Damage =
            response[0][0].PCR_Conveyance_Damage;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Debris =
            response[0][0].PCR_Conveyance_Debris;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Repairs =
            response[0][0].PCR_Conveyance_Repairs;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Hazards =
            response[0][0].PCR_Conveyance_Hazards;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Other =
            response[0][0].PCR_Conveyance_Other;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Describe =
            response[0][0].PCR_Conveyance_Describe;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Note =
            response[0][0].PCR_Conveyance_Note;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Work_Order_Instruction_Reason =
            response[0][0].PCR_Conveyance_Work_Order_Instruction_Reason;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Secured_Per_Guidelines_Reason =
            response[0][0].PCR_Conveyance_Secured_Per_Guidelines_Reason;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_HUD_Guidelines_Reasponce =
            response[0][0].PCR_Conveyance_HUD_Guidelines_Reasponce;
          this.PCR_ConveyanceModelObj.PCR_Conveyance_Shrubs_or_tree =
            response[0][0].PCR_Conveyance_Shrubs_or_tree;

          this.PCR_ConveyanceModelObj.PCR_Conveyance_IsActive =
            response[0][0].PCR_Conveyance_IsActive;
        }
        this.GetPCRROOFDATA();
      });
  }

  //Roof Functionality  start here

  Location = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "BATHROOM" },
    { id: 3, name: "BEDROOM" },
    { id: 4, name: "DEN" },
    { id: 5, name: "DINING ROOM" },
    { id: 6, name: "FAMILY ROOM" },
    { id: 7, name: "KITCHEN ROOM" },
    { id: 8, name: "LAUNDRY ROOM" },
    { id: 9, name: "LIVING ROOM" }
  ];

  rooftypedrd = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "Asphalt 20 years" },
    { id: 3, name: "Asphalt 25 years" },
    { id: 4, name: "Asphalt 30 years" }
  ];

  felttypedrd = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "20" },
    { id: 3, name: "25" },
    { id: 4, name: "30" },
    { id: 5, name: "None" },
    { id: 6, name: "Other" }
  ];
  Sheathingtypedrd = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "OSB" },
    { id: 3, name: "PLAYWOOD" },
    { id: 4, name: "OTHER" },
    { id: 5, name: "None" }
  ];

  Thiknessdrd = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "1/2" },
    { id: 3, name: "3/4" },
    { id: 4, name: "3/8" },
    { id: 5, name: "5/8" },
    { id: 6, name: "OTHER" },
    { id: 7, name: "None" }
  ];
  //add roof data
  PcrRoofData(content, msgShow: boolean) {


    this.PcrRoofExterModelObj.RoofShape = this.PCR_RoofModelObj.PCR_Roof_Roof_Shape_Pitched_Roof;
    this.PcrRoofExterModelObj.RoofLeak = this.PCR_RoofModelObj.PCR_Roof_Leak;
    this.PcrRoofExterModelObj.Cause = this.PCR_RoofModelObj.PCR_Roof_Leak_Case;
    this.PcrRoofExterModelObj.RoofDamage = this.PCR_RoofModelObj.PCR_Roof_Roof_Damage;
    this.PcrRoofExterModelObj.WaterStainsontheCeiling = this.PCR_RoofModelObj.PCR_Roof_Water_Strains;
    this.PcrRoofExterModelObj.Other = this.PCR_RoofModelObj.PCR_Roof_Leak_Other;
    this.PcrRoofExterModelObj.RoofLeakLocationDimension = this.PCR_RoofModelObj.PCR_Roof_Leak_Location_Dimension;
    this.PcrRoofExterModelObj.RoofDamageLocationDimensions = this.PCR_RoofModelObj.PCR_Roof_Location_Dimensions;
    this.PcrRoofExterModelObj.WaterStainsontheCeilingCause = this.PCR_RoofModelObj.PCR_Roof_Water_Strains;
    this.PcrRoofExterModelObj.WaterStainsontheCeilingLocationDimensions = this.PCR_RoofModelObj.PCR_Roof_Water_Strains_Case;
    this.PcrRoofExterModelObj.DidyouperformaRoofRepair = this.PCR_RoofModelObj.PCR_Roof_Did_You_Perform_Roof_Repair;
    this.PcrRoofExterModelObj.DidyouperformaRoofRepairExplain = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Repair;
    this.PcrRoofExterModelObj.DidyouperformEmergencytarping = this.PCR_RoofModelObj.PCR_Roof_Did_You_Perform_Emergency_Traping;
    this.PcrRoofExterModelObj.DidyouperformEmergencytarpingExplain = this.PCR_RoofModelObj.PCR_Roof_Explain_Bid_Trap;
    this.PcrRoofExterModelObj.BidToTarpDimensionheight = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Dimension_size_x;
    this.PcrRoofExterModelObj.BidToTarpDimensionwidth = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Dimension_size_y;
    this.PcrRoofExterModelObj.BidToTarpDimensionLocation = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Location;
    this.PcrRoofExterModelObj.BidToTarpDimensionDiscription = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Description;
    this.PcrRoofExterModelObj.BidToTarpDimensionBidAmount = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Bid_Amount;
    this.PcrRoofExterModelObj.BidToTarPatchDimensionheight = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x;
    this.PcrRoofExterModelObj.BidToTarPatchDimensionwidth = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y;
    this.PcrRoofExterModelObj.BidToTarPatchDimensionlocation = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Location;
    this.PcrRoofExterModelObj.BidToTarPatchDimensionDiscripsion = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_dias;
    this.PcrRoofExterModelObj.BidToTarPatchDimensionBidAmount = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Bid_Amount;
    this.PcrRoofExterModelObj.BidtoRepair = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Replace;
    this.PcrRoofExterModelObj.BidtoRepaceCantRepairDueTo = this.PCR_RoofModelObj.PCR_Roof_Reason_Cant_Repair_Due_To;
    this.PcrRoofExterModelObj.BidtoRepaceCantRepairDueTotext = this.PCR_RoofModelObj.PCR_Roof_Reason_Cant_Repair_Due_To_TEXT;
    this.PcrRoofExterModelObj.BidtoRepaceCantPreventDueTotext = this.PCR_RoofModelObj.PCR_Roof_Reason_Preventive_Due_To;
    this.PcrRoofExterModelObj.leaking = this.PCR_RoofModelObj.PCR_Roof_Reason_Leaking;
    this.PcrRoofExterModelObj.leakingothertext = this.PCR_RoofModelObj.PCR_Roof_Reason_Other;

    this.PcrRoofExterModelObj.Discription = this.PCR_RoofModelObj.PCR_Roof_Bid_To_Description;
    this.PcrRoofExterModelObj.Location = {
      EntireRoof: this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Entire_Roof,
      front: this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Front,
      Back: this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Back,
      LeftSide: this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Left_Side,
      RightSide: this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Right_Side,
    }
    this.PcrRoofExterModelObj.Building = {
      House: this.PCR_RoofModelObj.PCR_Roof_Building_House,
      Garage: this.PCR_RoofModelObj.PCR_Roof_Building_Garage,
      OutBuilding: this.PCR_RoofModelObj.PCR_Roof_Building_Out_Building,
      PoolHouse: this.PCR_RoofModelObj.PCR_Roof_Building_Pool_House,
      Shed: this.PCR_RoofModelObj.PCR_Roof_Building_Shed,
      Bam: this.PCR_RoofModelObj.PCR_Roof_Building_Bam,
    }
    this.PcrRoofExterModelObj.RoofTypeItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Type;
    this.PcrRoofExterModelObj.RoofTypeItemUseDrd = this.PCR_RoofModelObj.PCR_Roof_Item_Used_DRD;
    this.PcrRoofExterModelObj.RoofTypeItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Size;
    this.PcrRoofExterModelObj.RoofTypeItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Amount;
    this.PcrRoofExterModelObj.FeltTypeItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type;
    this.PcrRoofExterModelObj.FeltTypeItemUseDrd = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type_DRD;
    this.PcrRoofExterModelObj.FeltTypeItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type_Size;
    this.PcrRoofExterModelObj.FeltTypeItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type_Amount;
    this.PcrRoofExterModelObj.SheathingItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing;
    this.PcrRoofExterModelObj.SheathingItemUseDrd = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing_DRD;
    this.PcrRoofExterModelObj.SheathingItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing_Size;
    this.PcrRoofExterModelObj.SheathingItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing_Amount;
    this.PcrRoofExterModelObj.DeckThicknessItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Deck_Thikness;
    this.PcrRoofExterModelObj.DeckThicknessItemUseDrd = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Deck_Thikness_DRD;
    this.PcrRoofExterModelObj.DripEdgeItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Drip_Edge;
    this.PcrRoofExterModelObj.DripEdgeItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Drip_Edge_Size;
    this.PcrRoofExterModelObj.DripEdgeItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Drip_Edge_Amount;
    this.PcrRoofExterModelObj.IceWaterBarrierItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Ice_Water_Barrier;
    this.PcrRoofExterModelObj.IceWaterBarrierItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Ice_Water_Barrier_Size;
    this.PcrRoofExterModelObj.IceWaterBarrierItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Ice_Water_Barrier_Amount;
    this.PcrRoofExterModelObj.NoofVentsItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_No_Of_Vents;
    this.PcrRoofExterModelObj.NoofVentsItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_No_Of_Vents_Text;
    this.PcrRoofExterModelObj.NoofVentsItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_No_Of_Vents_Amount;
    this.PcrRoofExterModelObj.RoofDebrisItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Debris;
    this.PcrRoofExterModelObj.RoofDebrisItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Debris_Size;
    this.PcrRoofExterModelObj.RoofDebrisItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Debris_Amount;
    this.PcrRoofExterModelObj.DumpsterRentalItemUse = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Dempster_Rental;
    this.PcrRoofExterModelObj.DumpsterRentalItemUseSize = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Dempster_Rental_Size;
    this.PcrRoofExterModelObj.DumpsterRentalItemUseAmount = this.PCR_RoofModelObj.PCR_Roof_Item_Used_Dempster_Rental_Amount;
    this.PcrRoofExterModelObj.bidAmount = this.PCR_RoofModelObj.PCR_Bid_Amount;


    this.contentx = content;
    this.roofLoading = true;
    this.roofbutton = "Processing";
    this.PCR_RoofModelObj.PCR_Roof_WO_Id = this.ModelObj.workOrder_ID;

    this.xClientResultPCRServices
      .PostRoofData(this.PCR_RoofModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_RoofModelObj.PCR_Roof_pkeyId = Number(
            response[0].PCR_Roof_pkeyId
          );
          this.roofLoading = false;
          this.roofbutton = "Update";
          if (msgShow) {
            this.MessageFlag = "PCR Roof Data Saved...!";
            this.commonMessage(this.contentx);
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 7;// this.PCR_RoofModelObj.PCR_Roof_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrRoofExterModelObj);
          this.PostFiveBrother();



        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }

  //get pcr data
  GetPCRROOFDATA() {
    this.PCR_RoofModelObj.PCR_Roof_WO_Id = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetPcrRoofDetails(this.PCR_RoofModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_RoofModelObj.PCR_Roof_pkeyId =
            response[0][0].PCR_Roof_pkeyId;
          this.PCR_RoofModelObj.PCR_Roof_MasterId =
            response[0][0].PCR_Roof_MasterId;
          this.PCR_RoofModelObj.PCR_Roof_WO_Id = response[0][0].PCR_Roof_WO_Id;
          this.PCR_RoofModelObj.PCR_Roof_ValType =
            response[0][0].PCR_Roof_ValType;
          this.PCR_RoofModelObj.PCR_Roof_Roof_Shape_Pitched_Roof =
            response[0][0].PCR_Roof_Roof_Shape_Pitched_Roof;
          this.PCR_RoofModelObj.PCR_Roof_Leak = response[0][0].PCR_Roof_Leak;
          this.PCR_RoofModelObj.PCR_Roof_Leak_Case =
            response[0][0].PCR_Roof_Leak_Case;
          this.PCR_RoofModelObj.PCR_Roof_Leak_Other =
            response[0][0].PCR_Roof_Leak_Other;
          this.PCR_RoofModelObj.PCR_Roof_Leak_Location_Dimension =
            response[0][0].PCR_Roof_Leak_Location_Dimension;
          this.PCR_RoofModelObj.PCR_Roof_Roof_Damage =
            response[0][0].PCR_Roof_Roof_Damage;
          this.PCR_RoofModelObj.PCR_Roof_Location_Dimensions =
            response[0][0].PCR_Roof_Location_Dimensions;
          this.PCR_RoofModelObj.PCR_Roof_Water_Strains =
            response[0][0].PCR_Roof_Water_Strains;
          this.PCR_RoofModelObj.PCR_Roof_Water_Strains_Case =
            response[0][0].PCR_Roof_Water_Strains_Case;
          this.PCR_RoofModelObj.PCR_Roof_Water_Strains_Dimension =
            response[0][0].PCR_Roof_Water_Strains_Dimension;
          this.PCR_RoofModelObj.PCR_Roof_Did_You_Perform_Roof_Repair =
            response[0][0].PCR_Roof_Did_You_Perform_Roof_Repair;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Repair =
            response[0][0].PCR_Roof_Bid_To_Repair;
          this.PCR_RoofModelObj.PCR_Roof_Did_You_Perform_Emergency_Traping =
            response[0][0].PCR_Roof_Did_You_Perform_Emergency_Traping;
          this.PCR_RoofModelObj.PCR_Roof_Explain_Bid_Trap =
            response[0][0].PCR_Roof_Explain_Bid_Trap;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Dimension_size_x =
            response[0][0].PCR_Roof_Bid_To_Trap_Dimension_size_x;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Dimension_size_y =
            response[0][0].PCR_Roof_Bid_To_Trap_Dimension_size_y;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Location =
            response[0][0].PCR_Roof_Bid_To_Trap_Location;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Description =
            response[0][0].PCR_Roof_Bid_To_Trap_Description;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Trap_Bid_Amount =
            response[0][0].PCR_Roof_Bid_To_Trap_Bid_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x =
            response[0][0].PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y =
            response[0][0].PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Location =
            response[0][0].PCR_Roof_Bid_To_Tar_Patch_Location;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_dias =
            response[0][0].PCR_Roof_Bid_To_Tar_Patch_dias;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Tar_Patch_Bid_Amount =
            response[0][0].PCR_Roof_Bid_To_Tar_Patch_Bid_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Replace =
            response[0][0].PCR_Roof_Bid_To_Replace;
          this.PCR_RoofModelObj.PCR_Roof_Reason_Cant_Repair_Due_To =
            response[0][0].PCR_Roof_Reason_Cant_Repair_Due_To;
          this.PCR_RoofModelObj.PCR_Roof_Reason_Cant_Repair_Due_To_TEXT =
            response[0][0].PCR_Roof_Reason_Cant_Repair_Due_To_TEXT;
          this.PCR_RoofModelObj.PCR_Roof_Reason_Preventive_Due_To =
            response[0][0].PCR_Roof_Reason_Preventive_Due_To;
          this.PCR_RoofModelObj.PCR_Roof_Reason_Preventive_Due_To =
            response[0][0].PCR_Roof_Reason_Preventive_Due_To;
          this.PCR_RoofModelObj.PCR_Roof_Reason_Leaking =
            response[0][0].PCR_Roof_Reason_Leaking;
          this.PCR_RoofModelObj.PCR_Roof_Reason_Other =
            response[0][0].PCR_Roof_Reason_Other;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Description =
            response[0][0].PCR_Roof_Bid_To_Description;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Entire_Roof =
            response[0][0].PCR_Roof_Bid_To_Location_Entire_Roof;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Front =
            response[0][0].PCR_Roof_Bid_To_Location_Front;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Back =
            response[0][0].PCR_Roof_Bid_To_Location_Back;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Left_Side =
            response[0][0].PCR_Roof_Bid_To_Location_Left_Side;
          this.PCR_RoofModelObj.PCR_Roof_Bid_To_Location_Right_Side =
            response[0][0].PCR_Roof_Bid_To_Location_Right_Side;
          this.PCR_RoofModelObj.PCR_Roof_Building_House =
            response[0][0].PCR_Roof_Building_House;
          this.PCR_RoofModelObj.PCR_Roof_Building_Garage =
            response[0][0].PCR_Roof_Building_Garage;
          this.PCR_RoofModelObj.PCR_Roof_Building_Out_Building =
            response[0][0].PCR_Roof_Building_Out_Building;
          this.PCR_RoofModelObj.PCR_Roof_Building_Pool_House =
            response[0][0].PCR_Roof_Building_Pool_House;
          this.PCR_RoofModelObj.PCR_Roof_Building_Shed =
            response[0][0].PCR_Roof_Building_Shed;
          this.PCR_RoofModelObj.PCR_Roof_Building_Bam =
            response[0][0].PCR_Roof_Building_Bam;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Type =
            response[0][0].PCR_Roof_Item_Used_Roof_Type;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_DRD =
            response[0][0].PCR_Roof_Item_Used_DRD;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Size =
            response[0][0].PCR_Roof_Item_Used_Size;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Amount =
            response[0][0].PCR_Roof_Item_Used_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type =
            response[0][0].PCR_Roof_Item_Used_Felt_Type;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type_DRD =
            response[0][0].PCR_Roof_Item_Used_Felt_Type_DRD;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type_Size =
            response[0][0].PCR_Roof_Item_Used_Felt_Type_Size;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Felt_Type_Amount =
            response[0][0].PCR_Roof_Item_Used_Felt_Type_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing =
            response[0][0].PCR_Roof_Item_Used_Sheathing;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing_DRD =
            response[0][0].PCR_Roof_Item_Used_Sheathing_DRD;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing_Size =
            response[0][0].PCR_Roof_Item_Used_Sheathing_Size;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Sheathing_Amount =
            response[0][0].PCR_Roof_Item_Used_Sheathing_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Deck_Thikness =
            response[0][0].PCR_Roof_Item_Used_Deck_Thikness;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Deck_Thikness_DRD =
            response[0][0].PCR_Roof_Item_Used_Deck_Thikness_DRD;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Drip_Edge =
            response[0][0].PCR_Roof_Item_Used_Drip_Edge;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Drip_Edge_Size =
            response[0][0].PCR_Roof_Item_Used_Drip_Edge_Size;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Drip_Edge_Amount =
            response[0][0].PCR_Roof_Item_Used_Drip_Edge_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Ice_Water_Barrier =
            response[0][0].PCR_Roof_Item_Used_Ice_Water_Barrier;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Ice_Water_Barrier_Size =
            response[0][0].PCR_Roof_Item_Used_Ice_Water_Barrier_Size;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Ice_Water_Barrier_Amount =
            response[0][0].PCR_Roof_Item_Used_Ice_Water_Barrier_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_No_Of_Vents =
            response[0][0].PCR_Roof_Item_Used_No_Of_Vents;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_No_Of_Vents_Text =
            response[0][0].PCR_Roof_Item_Used_No_Of_Vents_Text;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_No_Of_Vents_Amount =
            response[0][0].PCR_Roof_Item_Used_No_Of_Vents_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Debris =
            response[0][0].PCR_Roof_Item_Used_Roof_Debris;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Debris_Size =
            response[0][0].PCR_Roof_Item_Used_Roof_Debris_Size;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Roof_Debris_Amount =
            response[0][0].PCR_Roof_Item_Used_Roof_Debris_Amount;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Dempster_Rental =
            response[0][0].PCR_Roof_Item_Used_Dempster_Rental;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Dempster_Rental_Size =
            response[0][0].PCR_Roof_Item_Used_Dempster_Rental_Size;
          this.PCR_RoofModelObj.PCR_Roof_Item_Used_Dempster_Rental_Amount =
            response[0][0].PCR_Roof_Item_Used_Dempster_Rental_Amount;
          this.PCR_RoofModelObj.PCR_Bid_Amount = response[0][0].PCR_Bid_Amount;

          this.roofleakhide(this.PCR_RoofModelObj.PCR_Roof_Leak);
          this.WaterStains(this.PCR_RoofModelObj.PCR_Roof_Water_Strains);
        }
        this.GetFiveBrotherData();
      });
  }
  //functionality roof pcr

  roofleafd: boolean = true;
  roofleakhide(arg: any): void {
    if (arg == "Yes") {
      this.roofleafd = false;
    } else {
      this.roofleafd = true;
    }
  }
  Wateras: boolean = true;
  WaterStains(arg: any): void {
    if (arg == "Yes") {
      this.Wateras = false;
    } else {
      this.Wateras = true;
    }
  }
  perdata: boolean = true;
  performpcr(arg: any): void {
    if (arg == "Yes") {
      this.perdata = true;
    } else {
      this.perdata = false;
    }
  }
  emergancy: boolean = true;
  Emergencypcr(arg: any): void {
    if (arg == "Yes") {
      this.emergancy = true;
    } else {
      this.emergancy = false;
    }
  }
  repair: boolean = false;
  replace: boolean = true;
  bittopcr(arg: any): void {
    if (arg == "Repair") {
      this.repair = false;
      this.replace = true;
    } else {
      this.repair = true;
      this.replace = false;
    }
  }
  drddisable: boolean = true;
  rooftypedrddata(arg: any): void {
    if (arg == "Yes") {
      this.drddisable = false;
    } else {
      this.drddisable = true;
    }
  }
  felttypedata(arg: any): void {
    if (arg == "Yes") {
      this.drddisable = false;
    } else {
      this.drddisable = true;
    }
  }
  Sheathingdata(arg: any): void {
    if (arg == "Yes") {
      this.drddisable = false;
    } else {
      this.drddisable = true;
    }
  }
  DeckThickness(arg: any): void {
    if (arg == "Yes") {
      this.drddisable = false;
    } else {
      this.drddisable = true;
    }
  }

  TabVal: Number = 1;
  TxtName = "";

  TabClickMethod(content: any, TabNo: Number): void {
    switch (this.TabVal) {
      case 1:
        //alert('this tab '+this.TabVal);
        this.FormButton1(content, false); //property form
        break;

      case 2:
        this.ViolationSubmit(content, false);
        break;

      case 3:
        this.SecuringSubmit(content, false);
        break;

      case 4:
        this.SubmitWinterization(content, false);
        break;

      case 5:
        this.YardMaintananceSubmit(content, false);
        break;

      case 6:
        this.DebrisSubmit(content, false);
        break;

      case 7:
        this.PcrRoofData(content, false);
        break;

      case 8:
        this.PcrPoolData(content, false);
        break;

      case 9:
        this.PostUtilitiesSubmit(content, false);
        break;

      case 10:
        this.ApplianceSubmit(content, false);
        break;

      case 11:
        this.AddPCRDamage(content, false);
        break;

      case 12:
        this.PCRConveyancesave(content, false);
        break;

      default:
        break;
    }
    this.TabVal = TabNo;
  }
  propertyinfojson: any;
  //get fivebrother json data
  GetFiveBrotherData() {

    this.PCR_FiveBrotherModelObj.PCR_FiveBro_WO_ID = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetFiveBrotherDetails(this.PCR_FiveBrotherModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_id = response[0][0].PCR_FiveBro_id;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_WO_ID = response[0][0].PCR_FiveBro_WO_ID;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Propertyinfo = JSON.parse(response[0][0].PCR_FiveBro_Propertyinfo);

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Violations = JSON.parse(response[0][0].PCR_FiveBro_Violations);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Securing = JSON.parse(response[0][0].PCR_FiveBro_Securing);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Winterization = JSON.parse(response[0][0].PCR_FiveBro_Winterization);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Yard = JSON.parse(response[0][0].PCR_FiveBro_Yard);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Debris_Hazards = JSON.parse(response[0][0].PCR_FiveBro_Debris_Hazards);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Roof = JSON.parse(response[0][0].PCR_FiveBro_Roof);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Pool = JSON.parse(response[0][0].PCR_FiveBro_Pool);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Utilities = JSON.parse(response[0][0].PCR_FiveBro_Utilities);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Appliances = JSON.parse(response[0][0].PCR_FiveBro_Appliances);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Damages = JSON.parse(response[0][0].PCR_FiveBro_Damages);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Conveyance = JSON.parse(response[0][0].PCR_FiveBro_Conveyance);

        }
      });

  }

  back() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];

    this.xRouter.navigate(["/client/clientresult/" + workorder1]);
  }

  async GetFBFormTemplateData() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    await this.formsMasterServices.GetWorkOrdersFormList(3,workOrderID).subscribe(res => {
      if (res[0].length) {
        this.fbFormList = res[0];

        var selectedElement = _.where(this.fbFormList, { Fb_Dynamic_WorkTypeId: this.BindData.Work_Type_Cat_pkeyID })

        if (selectedElement.length > 0) {
          var activeTab = localStorage.getItem("ActiveWoTab");

          if (activeTab != undefined && activeTab == "1") { //field result
            if (selectedElement[0].Fb_Dynamic_Tab_Name == "Grass" && selectedElement[0].Fb_Dynamic_IsActive && selectedElement[0].Fb_Dynamic_FieldResults) {
              this.isGrassVisible = true;
              this.isPrsvVisible = false;
              this.GetGrassDetail();
            }
            else if (selectedElement[0].Fb_Dynamic_Tab_Name == "Preservation" && selectedElement[0].Fb_Dynamic_IsActive && selectedElement[0].Fb_Dynamic_FieldResults) {
              this.isGrassVisible = false;
              this.isPrsvVisible = true;
              this.GetPropertyInfoData();
            }
          }
          else if (activeTab != undefined && activeTab == "2") {   // office result
            if (selectedElement[0].Fb_Dynamic_Tab_Name == "Grass" && selectedElement[0].Fb_Dynamic_IsActive && selectedElement[0].Fb_Dynamic_Office_Results) {
              this.isGrassVisible = true;
              this.isPrsvVisible = false;
              this.GetGrassDetail();
            }
            else if (selectedElement[0].Fb_Dynamic_Tab_Name == "Preservation" && selectedElement[0].Fb_Dynamic_IsActive && selectedElement[0].Fb_Dynamic_Office_Results) {
              this.isGrassVisible = false;
              this.isPrsvVisible = true;
              this.GetPropertyInfoData();
            }
          }
        }
      }
      else {
        this.fbFormList = [];
      }
    });
  }
  IsUnableToCut(arg: any): void {
    if (arg == "Other") {
      this.OtherNote = false;
    } else {
      this.OtherNote = true;
      this.PCRGrassInfoModelObj.Grass_OtherNote = "";
    }
  }

  IsGrassCutCompleted(arg: any): void {
    if (arg == "Yes - Completed") {
      this.LotSize = false;
    } else {
      this.LotSize = true;
      this.PCRGrassInfoModelObj.Grass_LotSize = "";

    }
  }

  IsForSale(arg: any): void {
    if (arg == "Realtor") {
      this.RealtorInfo = false;
    } else {
      this.RealtorInfo = true;
      this.PCRGrassInfoModelObj.Grass_RealtorPh = "";
      this.PCRGrassInfoModelObj.Grass_RealtorName = "";
    }
  }

  IsExteriorDamages(arg: any): void {
    if (arg == "Yes") {
      this.DamageNote = false;
    } else {
      this.DamageNote = true;
      this.PCRGrassInfoModelObj.Grass_ExtDamageNote = "";
    }
  }

  AllSelectGrassData(DamageArg: string): void {
    this.PCRGrassInfoModelObj.Grass_FireDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_NeglectDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_VandalDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_FrezeDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_StormDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_FloodDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_RoofLeakDamage = DamageArg
  }

  GrassSubmit(content) {
    //debugger;
    this.isLoadingGrass = true;
    this.buttonGrass = "Processing";
    this.contentx = content;
    this.PCRGrassInfoModelObj.Grass_WO_ID = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .PCRGrassCutDataPost(this.PCRGrassInfoModelObj)
      .subscribe(response => {
        //debugger;
        if (response[0].length != 0) {

          this.isLoadingGrass = false;
          this.buttonGrass = "Update";

          this.MessageFlag = "Grass Detail saved...!";
          this.commonMessage(this.contentx);
        }
      });
  }
  GetGrassDetail() {
    //debugger;
    this.PCRGrassInfoModelObj.Grass_WO_ID = this.ModelObj.workOrder_ID;
    this.PCRGrassInfoModelObj.Type = 3;
    this.xClientResultPCRServices
      .PCRGrassCutDataGet(this.PCRGrassInfoModelObj)
      .subscribe(response => {
        //debugger;
        if (response[0].length != 0) {
          this.PCRGrassInfoModelObj.Grass_PkeyID = response[0][0].Grass_Cut_PkeyID;
          this.PCRGrassInfoModelObj.Grass_WO_ID = response[0][0].Grass_Cut_WO_ID;
          this.PCRGrassInfoModelObj.Grass_GrassCutComp = response[0][0].Grass_Cut_Completed;
          this.PCRGrassInfoModelObj.Grass_UnableToCut = response[0][0].Grass_Cut_Unable_To_Cut;
          this.PCRGrassInfoModelObj.Grass_LotSize = response[0][0].Grass_Cut_LotSize;
          this.PCRGrassInfoModelObj.Grass_OtherNote = response[0][0].Grass_Cut_Other;
          this.PCRGrassInfoModelObj.Grass_ForSale = response[0][0].Grass_Cut_ForSale;
          this.PCRGrassInfoModelObj.Grass_ForRent = response[0][0].Grass_Cut_ForRent;
          this.PCRGrassInfoModelObj.Grass_RealtorPh = response[0][0].Grass_Cut_Realtor_Phone;
          this.PCRGrassInfoModelObj.Grass_RealtorName = response[0][0].Grass_Cut_Realtor_Name;
          this.PCRGrassInfoModelObj.Grass_ExtDamage = response[0][0].Grass_Cut_New_Damage_Found;
          this.PCRGrassInfoModelObj.Grass_FireDamage = response[0][0].Grass_Cut_Damage_Fire;
          this.PCRGrassInfoModelObj.Grass_NeglectDamage = response[0][0].Grass_Cut_Damage_Neglect;
          this.PCRGrassInfoModelObj.Grass_VandalDamage = response[0][0].Grass_Cut_Damage_Vandal;
          this.PCRGrassInfoModelObj.Grass_FrezeDamage = response[0][0].Grass_Cut_Damage_Freeze;
          this.PCRGrassInfoModelObj.Grass_StormDamage = response[0][0].Grass_Cut_Damage_Storm;
          this.PCRGrassInfoModelObj.Grass_FloodDamage = response[0][0].Grass_Cut_Damage_Flood;
          this.PCRGrassInfoModelObj.Grass_RoofLeakDamage = response[0][0].Grass_Cut_Roof_Leak;
          this.PCRGrassInfoModelObj.Grass_ExtDamageNote = response[0][0].Grass_Cut_Explain_New_Damage;
          this.PCRGrassInfoModelObj.Grass_Occupancy = response[0][0].Grass_Cut_Occupancy;
          this.PCRGrassInfoModelObj.Grass_PropertySecure = response[0][0].Grass_Cut_Property_Secure;
          this.PCRGrassInfoModelObj.Grass_PoolSecure = response[0][0].Grass_Cut_Pool_Secured;
          this.PCRGrassInfoModelObj.Grass_PoolPresent = response[0][0].Grass_Cut_Pool_Present;
          this.PCRGrassInfoModelObj.Grass_ViolationPost = response[0][0].Grass_Cut_Violation_Posted;
          this.PCRGrassInfoModelObj.Grass_NotBoarded = response[0][0].Grass_Cut_Opening_Not_Boarded;
          this.PCRGrassInfoModelObj.Grass_Boarded = response[0][0].Grass_Cut_Opening_Boarded;
          this.PCRGrassInfoModelObj.Grass_ExtDebPresent = response[0][0].Grass_Cut_Debris_Present;
          this.PCRGrassInfoModelObj.Grass_TreeTouching = response[0][0].Grass_Cut_Trees_Touching_House;
          this.PCRGrassInfoModelObj.Grass_ShrubsTouching = response[0][0].Grass_Cut_Vines_Touching_House;
          this.PCRGrassInfoModelObj.Grass_dateCompleted = response[0][0].Grass_Cut_Completion_Date;
          this.PCRGrassInfoModelObj.Grass_Comment = response[0][0].Grass_Cut_Explain_violations;
          this.IsUnableToCut(this.PCRGrassInfoModelObj.Grass_UnableToCut);
          this.IsGrassCutCompleted(this.PCRGrassInfoModelObj.Grass_GrassCutComp);
          this.IsForSale(this.PCRGrassInfoModelObj.Grass_ForSale);
          this.IsExteriorDamages(this.PCRGrassInfoModelObj.Grass_ExtDamage);
          this.buttonGrass = "Update";
        }
        else{
          this.buttonGrass = "Save";
        }
      });
  }
}
