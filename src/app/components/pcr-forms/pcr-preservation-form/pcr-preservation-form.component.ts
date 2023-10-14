import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PcrAplianceExterModel, PcrConveyanceExterModel, PcrDamagesExterModel, PcrDebrisExterModel, PcrExterSecuringModel, PcrExterVoilationModel, PcrExterWinterizationModel, PCRForm_ExtProInfo_Model, PcrPoolExterModel, PcrRoofExterModel, PcrYardExterModel, Pcr_UtilitiesExterModel } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr-external-model';
import { PCRPropertyInfoModel, PCR_ApplianceModel, PCR_ConveyanceModel, PCR_Damage_MasterModel, PCR_DebrisModel, PCR_FiveBrotherModel, PCR_PoolModel, PCR_RoofModel, PCR_Securing_Model, PCR_UtilitiesModel, PCR_Violation_Model, PCR_WinterizationModel, PCR_Yard_MaintenanceModel } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr-model';
import { ClientResultPCRServices } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr.service';
import { IplAppModalContent } from '../../iplapp-modal-content/iplapp-modal-content.component';
import { BindDataModel } from 'src/app/pages/client-result/client-result/client-result-model';
import { ClientResultOldPhotoServices } from 'src/app/pages/client-result/client-result-photo/client-result-photo-old.service';

@Component({
  selector: 'app-pcr-preservation-form',
  templateUrl: './pcr-preservation-form.component.html',
  styleUrls: ['./pcr-preservation-form.component.scss']
})
export class PcrPreservationFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;
  @Input() IPLNO;
  @Input() inputelement;
  // fwo_pkyeId: Number = 0;



  PCRForm_ExtProInfo_ModelObj: PCRForm_ExtProInfo_Model = new PCRForm_ExtProInfo_Model();
  PCRPropertyInfoModelObj: PCRPropertyInfoModel = new PCRPropertyInfoModel();
  PCR_History_PropertyInfo: PCRPropertyInfoModel[]=[];

  PCR_FiveBrotherModelObj: PCR_FiveBrotherModel = new PCR_FiveBrotherModel();
  PcrExterVoilationModelObj: PcrExterVoilationModel = new PcrExterVoilationModel();

  PCR_Violation_ModelObj: PCR_Violation_Model = new PCR_Violation_Model();
  PCR_History_Violation: PCR_Violation_Model[]=[];

  PCR_Securing_ModelObj: PCR_Securing_Model = new PCR_Securing_Model();
  PCR_History_Securing: PCR_Securing_Model[]=[]

  PcrExterSecuringModelObj: PcrExterSecuringModel = new PcrExterSecuringModel();
  PcrAplianceExterModelObj: PcrAplianceExterModel = new PcrAplianceExterModel();

  PCR_Histroy_Appliance: PCR_ApplianceModel[];
  PCR_ApplianceModelObj: PCR_ApplianceModel = new PCR_ApplianceModel();

  PCR_WinterizationModelObj: PCR_WinterizationModel = new PCR_WinterizationModel();
  PCR_History_Winterization: PCR_WinterizationModel[]=[]

  PCR_History_Yard_Maintenance: PCR_Yard_MaintenanceModel[]=[]
  PCR_Yard_MaintenanceModelObj: PCR_Yard_MaintenanceModel = new PCR_Yard_MaintenanceModel();

  PCR_PoolModelObj: PCR_PoolModel = new PCR_PoolModel();
  PCR_History_Pool: PCR_PoolModel[]=[]

  PCR_DebrisModelObj: PCR_DebrisModel = new PCR_DebrisModel();
  PCR_History_Debris: PCR_DebrisModel[]=[]

  PCR_UtilitiesModelObj: PCR_UtilitiesModel = new PCR_UtilitiesModel();
  PCR_History_Utilities: PCR_UtilitiesModel[]=[]

  PCR_ConveyanceModelObj: PCR_ConveyanceModel = new PCR_ConveyanceModel();
  PCR_History_Conveyance: PCR_ConveyanceModel[]=[]

  PCR_Damage_MasterModelObj: PCR_Damage_MasterModel = new PCR_Damage_MasterModel();
  PCR_History_Damage: PCR_Damage_MasterModel[]=[]

  PCR_RoofModelObj: PCR_RoofModel = new PCR_RoofModel();
  PCR__History_Roof: PCR_RoofModel[]=[]

  PcrExterWinterizationModelObj: PcrExterWinterizationModel = new PcrExterWinterizationModel();


  PcrYardExterModelObj: PcrYardExterModel = new PcrYardExterModel();
  PcrDebrisExterModelObj: PcrDebrisExterModel = new PcrDebrisExterModel();
  PcrPoolExterModelObj: PcrPoolExterModel = new PcrPoolExterModel();
  PcrRoofExterModelObj: PcrRoofExterModel = new PcrRoofExterModel();

  PcrDamagesExterModelObj: PcrDamagesExterModel = new PcrDamagesExterModel();
  PcrConveyanceExterModelObj: PcrConveyanceExterModel = new PcrConveyanceExterModel();
  Pcr_UtilitiesExterModelObj: Pcr_UtilitiesExterModel = new Pcr_UtilitiesExterModel();
  bindDataModelObj: BindDataModel = new BindDataModel();

  submitted = false; // submitted;
  isLoading = false; // buttom loading..
  button = "Save"; // buttom loading..
  MessageFlag: string;
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
  BidToReplaceSumpPump: boolean = true;
  UnabletocheckNotes: boolean = true;
  messageopen1: boolean = false;

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
  SystemType = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "DRY" },
    { id: 3, name: "DRY W/ WELL" },
    { id: 4, name: "RADIANT" },
    { id: 5, name: "RADIANT W/ WELL" },
    { id: 6, name: "STEAM" },
    { id: 7, name: "STEAM W/ WELL" },
  ];
  constructor(private xClientResultPCRServices: ClientResultPCRServices,
    private modalService: NgbModal,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,) { }

  ngOnInit(): void {
    // debugger
    if(this.WorkorderId>0)
    {
      this.GetPropertyInfoData();
      // console.log('s55',this.IPLNO)
      
    }

  
 
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

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'OK';
    modalRef.result.then(result => { }, reason => { });
  }
  FormButton1(msgShow: boolean) {
     debugger
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
    this.submitted = true;

    // stop here if form is invalid
    // if (this.formUsrCommonGroup.invalid) {
    //   return;
    // }

    this.isLoading = true;
    this.button = "Processing";

    this.PCRPropertyInfoModelObj.PCR_Prop_WO_ID = this.WorkorderId;
    this.PCRPropertyInfoModelObj.fwo_pkyeId=this.FWO_PkyeId
    this.xClientResultPCRServices
      .PropertyInfoPost(this.PCRPropertyInfoModelObj)
      .subscribe(response => {
        // console.log('first',response)
        if (response[0].PCR_Pro_PkeyID != "") {
          this.PCRPropertyInfoModelObj.PCR_Pro_PkeyID = Number(
            response[0].PCR_Pro_PkeyID
          );

          this.isLoading = false;
          this.button = "Update";
          if (msgShow) {
            this.MessageFlag = "Property Information Saved...!";
            this.commonMessage();
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
    this.PCR_FiveBrotherModelObj.PCR_FiveBro_WO_ID = this.WorkorderId;
    this.xClientResultPCRServices
      .FiveBroDataPost(this.PCR_FiveBrotherModelObj)
      .subscribe(response => {
      });
  }
  GetPropertyInfoData() {
    // debugger
    this.PCRPropertyInfoModelObj.PCR_Prop_WO_ID = this.WorkorderId;
    this.xClientResultPCRServices
      .GetPropertyInfo(this.PCRPropertyInfoModelObj)
      .subscribe(response => {
        // console.log('abc',response)
// debugger
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

            this.PCRPropertyInfoModelObj.PCR_Prop_Property = response[0][0].PCR_Prop_Property;

          this.PCRPropertyInfoModelObj.PRC_Prop_dateCompleted =
            response[0][0].PRC_Prop_dateCompleted;
          this.PCRPropertyInfoModelObj.PRC_Prop_badAddress =
            response[0][0].PRC_Prop_badAddress;
          this.PCRPropertyInfoModelObj.PRC_Prop_orderCompleted =
            response[0][0].PRC_Prop_orderCompleted;
            this.PCRPropertyInfoModelObj.PRC_Prop_PropertyVacantBadAddressProvide_dtls =
            response[0][0].PRC_Prop_PropertyVacantBadAddressProvide_dtls

          if (this.PCRPropertyInfoModelObj.PCR_Prop_Other) {
            this.ProNoteHide = false;
          }
          // if(this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant){
          //   this.ProAddress = false;
          // }

          this.PCRPropertyInfoModelObj.PCR_Prop_Permit_Number =
            response[0][0].PCR_Prop_Permit_Number;
        }
          if (response[1].length != 0) {
          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCRPropertyInfoModel();

           convertedData.PCR_Pro_PkeyID =
            element.PCR_Pro_PkeyID;
         convertedData.PCR_Prop_MasterID =
            element.PCR_Prop_MasterID;
         convertedData.PCR_Prop_ValType =
            element.PCR_Prop_ValType;
         convertedData.PCR_Prop_ForSale =
            element.PCR_Prop_ForSale;
         convertedData.PCR_Prop_Sold =
            element.PCR_Prop_Sold;
         convertedData.PCR_Prop_Broker_Phone =
            element.PCR_Prop_Broker_Phone;
         convertedData.PCR_Prop_Broker_Name =
            element.PCR_Prop_Broker_Name;
         convertedData.PCR_Prop_Maintained =
            element.PCR_Prop_Maintained;
         convertedData.PCR_Prop_Maintained_ByOther =
            element.PCR_Prop_Maintained_ByOther;
         convertedData.PCR_Prop_Maintained_Items_Utilities =
            element.PCR_Prop_Maintained_Items_Utilities;
         convertedData.PCR_Prop_Maintained_Items_Grass =
            element.PCR_Prop_Maintained_Items_Grass;
         convertedData.PCR_Prop_Maintained_Items_Snow_Removal =
            element.PCR_Prop_Maintained_Items_Snow_Removal;
         convertedData.PCR_Prop_Maintained_Items_Interior_Repaiars =
            element.PCR_Prop_Maintained_Items_Interior_Repaiars;
         convertedData.PCR_Prop_Maintained_Items_Exterior_Repairs =
            element.PCR_Prop_Maintained_Items_Exterior_Repairs;
         convertedData.PCR_Prop_Active_Listing =
            element.PCR_Prop_Active_Listing;
         convertedData.PCR_Prop_Basement_Present =
            element.PCR_Prop_Basement_Present;
         convertedData.PCR_OurBuildings_Garages =
            element.PCR_OurBuildings_Garages;
         convertedData.PCR_OurBuildings_Sheds =
            element.PCR_OurBuildings_Sheds;
         convertedData.PCR_OurBuildings_Caports =
            element.PCR_OurBuildings_Caports;
         convertedData.PCR_OurBuildings_Bams =
            element.PCR_OurBuildings_Bams;
         convertedData.PCR_OurBuildings_Pool_House =
            element.PCR_OurBuildings_Pool_House;
         convertedData.PCR_OurBuildings_Other_Building =
            element.PCR_OurBuildings_Other_Building;
         convertedData.PCR_Prop_Property_Type_Vacant_Land =
            element.PCR_Prop_Property_Type_Vacant_Land;
         convertedData.PCR_Prop_Property_Type_Single_Family =
            element.PCR_Prop_Property_Type_Single_Family;
         convertedData.PCR_Prop_Property_Type_Multi_Family =
            element.PCR_Prop_Property_Type_Multi_Family;
         convertedData.PCR_Prop_Property_Type_Mobile_Home =
            element.PCR_Prop_Property_Type_Mobile_Home;
         convertedData.PCR_Prop_Property_Type_Condo =
            element.PCR_Prop_Property_Type_Condo;
         convertedData.PCR_Prop_Permit_Required =
            element.PCR_Prop_Permit_Required;
         convertedData.PCR_Prop_Condo_Association_Property =
            element.PCR_Prop_Condo_Association_Property;
         convertedData.PCR_HOA_Name =
            element.PCR_HOA_Name;
         convertedData.PCR_HOA_Phone =
            element.PCR_HOA_Phone;
         convertedData.PCR_Prop_No_Of_Unit =
            element.PCR_Prop_No_Of_Unit;
         convertedData.PCR_Prop_Common_Entry =
            element.PCR_Prop_Common_Entry;
         convertedData.PCR_Prop_Garage =
            element.PCR_Prop_Garage;
         convertedData.PCR_Prop_Unit1 =
            element.PCR_Prop_Unit1;
         convertedData.PCR_Prop_Unit1_Occupied =
            element.PCR_Prop_Unit1_Occupied;
         convertedData.PCR_Prop_Unit2 =
            element.PCR_Prop_Unit2;
         convertedData.PCR_Prop_Unit2_Occupied =
            element.PCR_Prop_Unit2_Occupied;
         convertedData.PCR_Prop_Unit3 =
            element.PCR_Prop_Unit3;
         convertedData.PCR_Prop_Unit3_Occupied =
            element.PCR_Prop_Unit3_Occupied;
         convertedData.PCR_Prop_Unit4 =
            element.PCR_Prop_Unit4;
         convertedData.PCR_Prop_Unit4_Occupied =
            element.PCR_Prop_Unit4_Occupied;
         convertedData.PCR_Prop_Property_Vacant =
            element.PCR_Prop_Property_Vacant;
         convertedData.PCR_Prop_Property_Vacant_Notes =
            element.PCR_Prop_Property_Vacant_Notes;
         convertedData.PCR_Prop_Occupancy_Verified_Personal_Visible =
            element.PCR_Prop_Occupancy_Verified_Personal_Visible;
         convertedData.PCR_Prop_Occupancy_Verified_Neighbor =
            element.PCR_Prop_Occupancy_Verified_Neighbor;
         convertedData.PCR_Prop_Occupancy_Verified_Utilities_On =
            element.PCR_Prop_Occupancy_Verified_Utilities_On;
         convertedData.PCR_Prop_Occupancy_Verified_Visual =
            element.PCR_Prop_Occupancy_Verified_Visual;
         convertedData.PCR_Prop_Occupancy_Verified_Direct_Con_Tenant =
            element.PCR_Prop_Occupancy_Verified_Direct_Con_Tenant;
         convertedData.PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor =
            element.PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor;
         convertedData.PCR_Prop_Occupancy_Verified_Direct_Con_Unknown =
            element.PCR_Prop_Occupancy_Verified_Direct_Con_Unknown;
         convertedData.PCR_Prop_Owner_Maintaining_Property =
            element.PCR_Prop_Owner_Maintaining_Property;
         convertedData.PCR_Prop_Other =
            element.PCR_Prop_Other;

         convertedData.PRC_Prop_dateCompleted =
            element.PRC_Prop_dateCompleted;
         convertedData.PRC_Prop_badAddress =
            element.PRC_Prop_badAddress;
         convertedData.PRC_Prop_orderCompleted =
            element.PRC_Prop_orderCompleted;
           convertedData.PRC_Prop_PropertyVacantBadAddressProvide_dtls =
            element.PRC_Prop_PropertyVacantBadAddressProvide_dtls

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_History_PropertyInfo=convertedDataList;
        }


        this.GetViolationData();
      });
  }

  // violation FORM CHA
  ViolationSubmit(msgShow: boolean) {
    //  debugger
    this.PcrExterVoilationModelObj.AnyCitiation = this.PCR_Violation_ModelObj.PCR_Violation_Any_Citation;
    this.PcrExterVoilationModelObj.DescribeCitation = this.PCR_Violation_ModelObj.PCR_Violation_Describe_Citation;
    this.PcrExterVoilationModelObj.VandalismArea = this.PCR_Violation_ModelObj.PCR_Violation_High_Vandalism_Area;
    this.PcrExterVoilationModelObj.VandalismReason = this.PCR_Violation_ModelObj.PCR_Violation_Describe_High_Vandalism_Reason;
    this.PcrExterVoilationModelObj.Circumstances = this.PCR_Violation_ModelObj.PCR_Violation_Any_Unusual_Circumstances;
    this.PcrExterVoilationModelObj.Describe = this.PCR_Violation_ModelObj.PCR_Violation_Describe;


    this.PCR_Violation_ModelObj;
    this.PCR_Violation_ModelObj.PCR_Violation_WO_ID = this.WorkorderId;
    //alert(JSON.stringify(this.PCR_Violation_ModelObj));

    this.isLoadingVio = true;
    this.buttonVio = "Processing";
    this.PCR_Violation_ModelObj.fwo_pkyeId=this.FWO_PkyeId
    this.xClientResultPCRServices
      .VoilationDataPost(this.PCR_Violation_ModelObj)
      .subscribe(response => {
        // console.log('violation',response)
        if (response[0].length != 0) {
          this.PCR_Violation_ModelObj.PCR_Violation_pkeyId = Number(
            response[0].PCR_Violation_pkeyId
          );
          this.isLoadingVio = false;
          this.buttonVio = "Update";

          if (msgShow) {
            this.MessageFlag = "Violations Saved...!";
            this.commonMessage();
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
    // debugger
    this.PCR_Violation_ModelObj.PCR_Violation_WO_ID = this.WorkorderId;
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
            if(reponse[0][0].PCR_Violation_Attached_NoticesPosted_FilePath !=null)
            {
              this.PCR_Violation_ModelObj.PCR_Violation_Attached_NoticesPosted_FilePath =
              reponse[0][0].PCR_Violation_Attached_NoticesPosted_FilePath;
              this.PCR_Violation_ModelObj.PCR_Violation_Attached_NoticesPosted_FileName =
              reponse[0][0].PCR_Violation_Attached_NoticesPosted_FileName;
            }

        }
        if (reponse[1].length != 0) {

          var convertedDataList=[];
          reponse[1].forEach(element => {
            var convertedData=new PCR_Violation_Model();
         convertedData.PCR_Violation_pkeyId =
            element.PCR_Violation_pkeyId;
         convertedData.PCR_Violation_MasterID =
            element.PCR_Violation_MasterID;
         convertedData.PCR_Violation_WO_ID =
            element.PCR_Violation_WO_ID;
         convertedData.PCR_Violation_ValType =
            element.PCR_Violation_ValType;
         convertedData.PCR_Violation_Any_Citation =
            element.PCR_Violation_Any_Citation;
         convertedData.PCR_Violation_Describe_Citation =
            element.PCR_Violation_Describe_Citation;
         convertedData.PCR_Violation_High_Vandalism_Area =
            element.PCR_Violation_High_Vandalism_Area;
         convertedData.PCR_Violation_Describe_High_Vandalism_Reason =
            element.PCR_Violation_Describe_High_Vandalism_Reason;
         convertedData.PCR_Violation_Any_Unusual_Circumstances =
            element.PCR_Violation_Any_Unusual_Circumstances;
         convertedData.PCR_Violation_Attached_Proof_Path =
            element.PCR_Violation_Attached_Proof_Path;
         convertedData.PCR_Violation_Attached_Proof_Size =
            element.PCR_Violation_Attached_Proof_Size;
         convertedData.PCR_Violation_Describe =
            element.PCR_Violation_Describe;
            if(element.PCR_Violation_Attached_NoticesPosted_FilePath !=null)
            {
             convertedData.PCR_Violation_Attached_NoticesPosted_FilePath =
              element.PCR_Violation_Attached_NoticesPosted_FilePath;
             convertedData.PCR_Violation_Attached_NoticesPosted_FileName =
              element.PCR_Violation_Attached_NoticesPosted_FileName;
            }

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });

          this.PCR_History_Violation=convertedDataList;

          // this.PCR_History_Violation.PCR_Violation_pkeyId =
          //   reponse[1][0].PCR_Violation_pkeyId;
          // this.PCR_History_Violation.PCR_Violation_MasterID =
          //   reponse[1][0].PCR_Violation_MasterID;
          // this.PCR_History_Violation.PCR_Violation_WO_ID =
          //   reponse[1][0].PCR_Violation_WO_ID;
          // this.PCR_History_Violation.PCR_Violation_ValType =
          //   reponse[1][0].PCR_Violation_ValType;
          // this.PCR_History_Violation.PCR_Violation_Any_Citation =
          //   reponse[1][0].PCR_Violation_Any_Citation;
          // this.PCR_History_Violation.PCR_Violation_Describe_Citation =
          //   reponse[1][0].PCR_Violation_Describe_Citation;
          // this.PCR_History_Violation.PCR_Violation_High_Vandalism_Area =
          //   reponse[1][0].PCR_Violation_High_Vandalism_Area;
          // this.PCR_History_Violation.PCR_Violation_Describe_High_Vandalism_Reason =
          //   reponse[1][0].PCR_Violation_Describe_High_Vandalism_Reason;
          // this.PCR_History_Violation.PCR_Violation_Any_Unusual_Circumstances =
          //   reponse[1][0].PCR_Violation_Any_Unusual_Circumstances;
          // this.PCR_History_Violation.PCR_Violation_Attached_Proof_Path =
          //   reponse[1][0].PCR_Violation_Attached_Proof_Path;
          // this.PCR_History_Violation.PCR_Violation_Attached_Proof_Size =
          //   reponse[1][0].PCR_Violation_Attached_Proof_Size;
          // this.PCR_History_Violation.PCR_Violation_Describe =
          //   reponse[1][0].PCR_Violation_Describe;
          //   if(reponse[1][0].PCR_Violation_Attached_NoticesPosted_FilePath !=null)
          //   {
          //     this.PCR_History_Violation.PCR_Violation_Attached_NoticesPosted_FilePath =
          //     reponse[1][0].PCR_Violation_Attached_NoticesPosted_FilePath;
          //     this.PCR_History_Violation.PCR_Violation_Attached_NoticesPosted_FileName =
          //     reponse[1][0].PCR_Violation_Attached_NoticesPosted_FileName;
          //   }
        }

        this.GetSecurity();
        //this.GetApplienceData();
      });
  }

  // securing ode here
  SecuringSubmit(msgShow: boolean) {
    // debugger
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

    this.isLoadingSecur = true;
    this.buttonSecur = "Processing";

    this.PCR_Securing_ModelObj.PCR_Securing_WO_Id = this.WorkorderId;

    //alert(JSON.stringify(this.PCR_Securing_ModelObj));
    this.PCR_Securing_ModelObj.fwo_pkyeId=this.FWO_PkyeId;
    this.xClientResultPCRServices
      .SecurityDataPost(this.PCR_Securing_ModelObj)
      .subscribe(response => {
        // console.log('respon',response)
        if (response[0].length != 0) {
          this.PCR_Securing_ModelObj.PCR_Securing_pkeyId = Number(
            response[0].PCR_Securing_pkeyId
          );
          this.isLoadingSecur = false;
          this.buttonSecur = "Update";
          if (msgShow) {
            this.MessageFlag = "Securing Saved...!";
            this.commonMessage();
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
    debugger
    this.PCR_Securing_ModelObj.PCR_Securing_WO_Id = this.WorkorderId;

    this.xClientResultPCRServices
      .GetSecuring(this.PCR_Securing_ModelObj)
      .subscribe(response => {
        // console.log('sa233',response)
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
           if (response[1].length != 0) {

        var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_Securing_Model();



          convertedData.PCR_Securing_pkeyId =
            element.PCR_Securing_pkeyId;
          convertedData.PCR_Securing_MasterId =
            element.PCR_Securing_MasterId;
          convertedData.PCR_Securing_WO_Id =
            element.PCR_Securing_WO_Id;
          convertedData.PCR_Securing_ValType =
            element.PCR_Securing_ValType;
          convertedData.PCR_Securing_On_Arrival =
            element.PCR_Securing_On_Arrival;
          convertedData.PCR_Securing_On_Departure =
            element.PCR_Securing_On_Departure;
          convertedData.PCR_Securing_Not_Secure_Reason_Missing_Doors =
            element.PCR_Securing_Not_Secure_Reason_Missing_Doors;
          convertedData.PCR_Securing_Not_Secure_Reason_Door_Open =
            element.PCR_Securing_Not_Secure_Reason_Door_Open;
          convertedData.PCR_Securing_Not_Secure_Reason_Missing_Locks =
            element.PCR_Securing_Not_Secure_Reason_Missing_Locks;
          convertedData.PCR_Securing_Not_Secure_Reason_Broken_Windows =
            element.PCR_Securing_Not_Secure_Reason_Broken_Windows;
          convertedData.PCR_Securing_Not_Secure_Reason_Missing_Window =
            element.PCR_Securing_Not_Secure_Reason_Missing_Window;
          convertedData.PCR_Securing_Not_Secure_Reason_Window_Open =
            element.PCR_Securing_Not_Secure_Reason_Window_Open;
          convertedData.PCR_Securing_Not_Secure_Reason_Broken_Door =
            element.PCR_Securing_Not_Secure_Reason_Broken_Door;
          convertedData.PCR_Securing_Not_Secure_Reason_Bids_Pending =
            element.PCR_Securing_Not_Secure_Reason_Bids_Pending;
          convertedData.PCR_Securing_Not_Secure_Reason_Damage_Locks =
            element.PCR_Securing_Not_Secure_Reason_Damage_Locks;
          convertedData.PCR_Securing_Boarded_Arrival =
            element.PCR_Securing_Boarded_Arrival;
          convertedData.PCR_Securing_No_Of_First_Floor_Window =
            element.PCR_Securing_No_Of_First_Floor_Window;
          convertedData.PCR_Securing_More_Boarding_Still_Required_OR_Not =
            element.PCR_Securing_More_Boarding_Still_Required_OR_Not;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors =
            element.PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Door_Open =
            element.PCR_Securing_Depart_Not_Secure_Reason_Door_Open;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks =
            element.PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows =
            element.PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Missing_Window =
            element.PCR_Securing_Depart_Not_Secure_Reason_Missing_Window;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Broken_Door =
            element.PCR_Securing_Depart_Not_Secure_Reason_Broken_Door;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending =
            element.PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending;
          convertedData.PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks =
            element.PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks;


            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });

          this.PCR_History_Securing=convertedDataList;


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

  show:boolean = false
  showthat(){
    this.show = !this.show
    this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant_Notes = "";
  }
  messageopen: boolean = false;
  messagetext(val){
    if(val=='no')
    {
      this.messageopen = false;
    }
    else
    {
      this.messageopen = !this.messageopen;
    }

  }


  messagetext1(val){
    // debugger

    if(val=='no')
    {
      this.messageopen1 = false;
    }
    else
    {
      this.messageopen1 = !this.messageopen1;
    }

  }
  messageopen2 : boolean = false;
  messagetext2(){
    this.messageopen2= !this.messageopen2;
  }
  messageopen3 : boolean = false;
  messagetext3(){
    this.messageopen3= !this.messageopen3;
  }


  uplodfile(documentInput: any){
    debugger
    // var iplno=localStorage.getItem('getIPLNO')
    var responseData:any;
    this.inputelement = documentInput.target.files[0]
    // this.PCR_Violation_ModelObj.PCR_Violation_Attached_NoticesPosted_FilePath
    // this.PCR_Violation_ModelObj.PCR_Violation_Attached_NoticesPosted_FileName
      this.bindDataModelObj.ContentType=7;
      this.bindDataModelObj.Type = 7;
    this.bindDataModelObj.Client_Result_Photo_ID = 0;
    this.bindDataModelObj.Client_Result_Photo_Ch_ID = 0;
    this.bindDataModelObj.Client_PageCalled = 13;
      this.bindDataModelObj.IPLNO = this.IPLNO;
      this.bindDataModelObj.documentx = this.inputelement;
      this.bindDataModelObj.Client_Result_Photo_FileName = this.inputelement.name;

      this.xClientResultOldPhotoServices
      .CommonDocumentsUpdatePCR(this.bindDataModelObj)
      .then((res) => {
        res.subscribe(response => {
          // console.log('sandip23',response)
          responseData = response;
        });
      });
      return responseData;
  }

  fileEventChange(documentInput: any){
    debugger
    // var iplno=localStorage.getItem('getIPLNO')
    this.inputelement = documentInput.target.files[0]
    // this.PCR_Violation_ModelObj.PCR_Violation_Attached_NoticesPosted_FilePath
    // this.PCR_Violation_ModelObj.PCR_Violation_Attached_NoticesPosted_FileName
      this.bindDataModelObj.ContentType=7;
      this.bindDataModelObj.Type = 7;
    this.bindDataModelObj.Client_Result_Photo_ID = 0;
    this.bindDataModelObj.Client_Result_Photo_Ch_ID = 0;
    this.bindDataModelObj.Client_PageCalled = 13;
      this.bindDataModelObj.IPLNO = this.IPLNO;
      this.bindDataModelObj.documentx = this.inputelement;
      this.bindDataModelObj.Client_Result_Photo_FileName = this.inputelement.name;
      this.xClientResultOldPhotoServices
      .CommonDocumentsUpdatePCR(this.bindDataModelObj)
      .then((res) => {
        res.subscribe(response => {
          // console.log('sandip22',response)
          
        });
      });
   
  }

  fileEventChange1(event){
    
    debugger
    this.PCR_Violation_ModelObj.PCR_Violation_Attached_Proof_Path
    var data = this.uplodfile(event);
   
  }
  // messagetext(arg:any):void{
  // if(arg){
  //   this.messageopen = false ;
  // }else{
  //   this.messageopen = true;
  // }
  // }
  // ProAddress: boolean = true;
  // OccupancyAddress(agr){
  //   if (agr){
  //     this.ProAddress = false;
  //    } else{
  //     this.ProAddress = true;

  //     this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant_Notes = "";
  //    }
  // }




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
  ApplianceSubmit(msgShow: boolean) {
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

    this.PCR_ApplianceModelObj;
    //alert(JSON.stringify(this.PCR_ApplianceModelObj));

    this.isLoadingApplinace = true;
    this.buttonApplinace = "Processing";

    this.PCR_ApplianceModelObj.PCR_Appliance_WO_Id = this.WorkorderId;
    this.PCR_ApplianceModelObj.fwo_pkyeId = this.FWO_PkyeId;
    this.xClientResultPCRServices
      .PostAppliance(this.PCR_ApplianceModelObj)
      .subscribe(response => {
        // console.log('appliance',response)
        if (response[0].length != 0) {
          this.PCR_ApplianceModelObj.PCR_Appliance_pkeyId = Number(
            response[0].PCR_Appliance_pkeyId
          );

          this.isLoadingApplinace = false;
          this.buttonApplinace = "Update";
          if (msgShow) {
            this.MessageFlag = "Appliances Saved...!";
            this.commonMessage();
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 10;//this.PCR_ApplianceModelObj.PCR_Appliance_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrAplianceExterModelObj);
          this.PostFiveBrother();

        }
      });
  }

  GetApplienceData() {
    this.PCR_ApplianceModelObj.PCR_Appliance_WO_Id = this.WorkorderId;
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
      if (response[1].length != 0) {

          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_ApplianceModel();

            convertedData.PCR_Appliance_pkeyId =
            element.PCR_Appliance_pkeyId;
          convertedData.PCR_Appliance_MasterId =
            element.PCR_Appliance_MasterId;
          convertedData.PCR_Appliance_WO_Id =
            element.PCR_Appliance_WO_Id;
          convertedData.PCR_Appliance_ValType =
            element.PCR_Appliance_ValType;
          convertedData.PCR_Appliance_Refrigerator =
            element.PCR_Appliance_Refrigerator;
          convertedData.PCR_Appliance_Stove =
            element.PCR_Appliance_Stove;
          convertedData.PCR_Appliance_Stove_Wall_Oven =
            element.PCR_Appliance_Stove_Wall_Oven;
          convertedData.PCR_Appliance_Dishwasher =
            element.PCR_Appliance_Dishwasher;
          convertedData.PCR_Appliance_Build_In_Microwave =
            element.PCR_Appliance_Build_In_Microwave;
          convertedData.PCR_Appliance_Dryer =
            element.PCR_Appliance_Dryer;
          convertedData.PCR_Appliance_Washer =
            element.PCR_Appliance_Washer;
          convertedData.PCR_Appliance_Air_Conditioner =
            element.PCR_Appliance_Air_Conditioner;
          convertedData.PCR_Appliance_Hot_Water_Heater =
            element.PCR_Appliance_Hot_Water_Heater;
          convertedData.PCR_Appliance_Dehumidifier =
            element.PCR_Appliance_Dehumidifier;
          convertedData.PCR_Appliance_Furnace =
            element.PCR_Appliance_Furnace;
          convertedData.PCR_Appliance_Water_Softener =
            element.PCR_Appliance_Water_Softener;
          convertedData.PCR_Appliance_Boiler =
            element.PCR_Appliance_Boiler;

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });

          this.PCR_Histroy_Appliance=convertedDataList;
        }


        this.GetWinterization();
      });
  }


  GetWinterization() {
    this.PCR_WinterizationModelObj.PCR_Winterization_WO_Id = this.WorkorderId;
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

          this.PCR_WinterizationModelObj.PCR_Winterization_System_Held_Pressure =
            response[0][0].PCR_Winterization_System_Held_Pressure;
          this.PCR_WinterizationModelObj.PCR_Winterization_System_Type =
            response[0][0].PCR_Winterization_System_Type;

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
        if (response[1].length != 0) {

        var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_WinterizationModel();


          convertedData.PCR_Winterization_pkeyId =
            element.PCR_Winterization_pkeyId;
          convertedData.PCR_Winterization_WO_Id =
            element.PCR_Winterization_WO_Id;
          convertedData.PCR_Winterization_MasterId =
            element.PCR_Winterization_MasterId;
          convertedData.PCR_Winterization_ValType =
            element.PCR_Winterization_ValType;
          convertedData.PCR_Winterization_Amount =
            element.PCR_Winterization_Amount;
          convertedData.PCR_Winterization_AntiFreeze_Toilet =
            element.PCR_Winterization_AntiFreeze_Toilet;
          convertedData.PCR_Winterization_Blown_All_Lines =
            element.PCR_Winterization_Blown_All_Lines;
          convertedData.PCR_Winterization_Common_Water_Line =
            element.PCR_Winterization_Common_Water_Line;
          // this.PCR_WinterizationModelObj.PCR_Winterization_Compleate_This_Order_No = response[0][0].PCR_Winterization_Compleate_This_Order_No;
          //this.PCR_WinterizationModelObj.PCR_Winterization_Compleate_This_Order_Partial = response[0][0].PCR_Winterization_Compleate_This_Order_Partial;
          convertedData.PCR_Winterization_Compleate_This_Order_Yes =
            element.PCR_Winterization_Compleate_This_Order_Yes;
          convertedData.PCR_Winterization_Description =
            element.PCR_Winterization_Description;
          convertedData.PCR_Winterization_Disconnected_Water_Meter_No_Common_Water_Line =
            element.PCR_Winterization_Disconnected_Water_Meter_No_Common_Water_Line;
          convertedData.PCR_Winterization_Disconnected_Water_Meter_No_Others =
            element.PCR_Winterization_Disconnected_Water_Meter_No_Others;
          convertedData.PCR_Winterization_Disconnected_Water_Meter_No_Prohibited_Ordinance =
            element.PCR_Winterization_Disconnected_Water_Meter_No_Prohibited_Ordinance;
          convertedData.PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve =
            element.PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve;
          convertedData.PCR_Winterization_Disconnected_Water_Meter_No_Unable_To_Locate =
            element.PCR_Winterization_Disconnected_Water_Meter_No_Unable_To_Locate;
          convertedData.PCR_Winterization_Disconnected_Water_Meter_Yes =
            element.PCR_Winterization_Disconnected_Water_Meter_Yes;
          convertedData.PCR_Winterization_Heating_System =
            element.PCR_Winterization_Heating_System;
          //this.PCR_WinterizationModelObj.PCR_Winterization_Heating_System_Well = response[0][0].PCR_Winterization_Heating_System_Well;
          convertedData.PCR_Winterization_If_Well_System_Breaker_Off =
            element.PCR_Winterization_If_Well_System_Breaker_Off;
          convertedData.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
            element.PCR_Winterization_If_Well_System_Pressure_Tank_Drained;
          convertedData.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
            element.PCR_Winterization_If_Well_System_Supply_Line_Disconnect;
          convertedData.PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System =
            element.PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System;
          convertedData.PCR_Winterization_Interior_Main_Valve_Reason =
            element.PCR_Winterization_Interior_Main_Valve_Reason;
          convertedData.PCR_Winterization_Interior_Main_Valve_Shut_Off =
            element.PCR_Winterization_Interior_Main_Valve_Shut_Off;
          convertedData.PCR_Winterization_IsActive =
            element.PCR_Winterization_IsActive;
          convertedData.PCR_Winterization_Posted_Signs =
            element.PCR_Winterization_Posted_Signs;
          convertedData.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
            element.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler;
          convertedData.PCR_Winterization_Radiant_Heat_Boiler_Drained =
            element.PCR_Winterization_Radiant_Heat_Boiler_Drained;

          convertedData.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
            element.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened;
          convertedData.PCR_Winterization_Reason =
            element.PCR_Winterization_Reason;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized =
            element.PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Allowable =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Allowable;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Other =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Other;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Out_Season =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Out_Season;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_TernedOff =
            element.PCR_Winterization_Reason_Wint_NotCompleted_TernedOff;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival;

          convertedData.PCR_Winterization_System_Held_Pressure =
            element.PCR_Winterization_System_Held_Pressure;
          convertedData.PCR_Winterization_System_Type =
            element.PCR_Winterization_System_Type;

          convertedData.PCR_Winterization_To_Bid =
            element.PCR_Winterization_To_Bid;
          convertedData.PCR_Winterization_To_Bit_Text =
            element.PCR_Winterization_To_Bit_Text;
          convertedData.PCR_Winterization_Upon_Arrival =
            element.PCR_Winterization_Upon_Arrival;

          convertedData.PCR_Winterization_Upon_Arrival_Never_Winterized =
            element.PCR_Winterization_Upon_Arrival_Never_Winterized;
          convertedData.PCR_Winterization_Water_Heater_Drained =
            element.PCR_Winterization_Water_Heater_Drained;
          convertedData.PCR_Winterization_Water_Off_At_Curb =
            element.PCR_Winterization_Water_Off_At_Curb;

          convertedData.PCR_Winterization_Winterize_Hrs =
            element.PCR_Winterization_Winterize_Hrs;
          convertedData.PCR_Winterization_Winterize_Men =
            element.PCR_Winterization_Winterize_Men;
          convertedData.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text =
            element.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text;
          convertedData.PCR_Winterization_Disconnected_Water_Meter_Other_Text =
            element.PCR_Winterization_Disconnected_Water_Meter_Other_Text;
          convertedData.PCR_Winterization_TextArea_Comment =
            element.PCR_Winterization_TextArea_Comment;

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });

          this.PCR_History_Winterization=convertedDataList;


        }
        this.GetYardmaintanance();
      });
  }
  GetYardmaintanance() {
    this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_WO_Id = this.WorkorderId;
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
            this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Grass_LotSize =
            response[0][0].PCR_Yard_Grass_LotSize
          // this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_IsActive  = response[0][0].PCR_Yard_Maintenance_IsActive
          // this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_IsDelete  = response[0][0].PCR_Yard_Maintenance_IsDelete
        }
         if (response[1].length != 0) {

           var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_Yard_MaintenanceModel();


          convertedData.PCR_Yard_Maintenance_pkeyId =
            element.PCR_Yard_Maintenance_pkeyId;
          convertedData.PCR_Yard_Maintenance_MasterId =
            element.PCR_Yard_Maintenance_MasterId;
          convertedData.PCR_Yard_Maintenance_WO_Id =
            element.PCR_Yard_Maintenance_WO_Id;
          convertedData.PCR_Yard_Maintenance_ValType =
            element.PCR_Yard_Maintenance_ValType;

          convertedData.PCR_Yard_Maintenance_Grass_Cut_Completed =
            element.PCR_Yard_Maintenance_Grass_Cut_Completed;
          convertedData.PCR_Yard_Maintenance_Lot_Size =
            element.PCR_Yard_Maintenance_Lot_Size;
          convertedData.PCR_Yard_Maintenance_Cuttable_Area =
            element.PCR_Yard_Maintenance_Cuttable_Area;
          convertedData.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght =
            element.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght;
          convertedData.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width =
            element.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width;
          convertedData.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height =
            element.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height;
          convertedData.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut =
            element.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut;
          convertedData.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut =
            element.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut;
          convertedData.PCR_Yard_Maintenance_Bid_Recut =
            element.PCR_Yard_Maintenance_Bid_Recut;
          convertedData.PCR_Yard_Maintenance_Reason_For_Recut =
            element.PCR_Yard_Maintenance_Reason_For_Recut;
          convertedData.PCR_Yard_Maintenance_Trees_Cut_Back_Order =
            element.PCR_Yard_Maintenance_Trees_Cut_Back_Order;
          convertedData.PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House =
            element.PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House;
          convertedData.PCR_Yard_Maintenance_Arrival_Trees_Touching_House =
            element.PCR_Yard_Maintenance_Arrival_Trees_Touching_House;
          convertedData.PCR_Yard_Maintenance_Depature_Trees =
            element.PCR_Yard_Maintenance_Depature_Trees;
          convertedData.PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines =
            element.PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines;

          convertedData.PCR_Yard_Maintenance_Grass_Maintained_No =
            element.PCR_Yard_Maintenance_Grass_Maintained_No;

          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Location =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Location;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage;
          convertedData.PCR_Yard_Maintenance_Bid_To_Shrubs_Describe =
            element.PCR_Yard_Maintenance_Bid_To_Shrubs_Describe;

          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Quantity =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Quantity;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Location =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Location;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage;
          convertedData.PCR_Yard_Maintenance_Bid_To_Trim_Describe =
            element.PCR_Yard_Maintenance_Bid_To_Trim_Describe;
            convertedData.PCR_Yard_Grass_LotSize =
            element.PCR_Yard_Grass_LotSize

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });

          this.PCR_History_Yard_Maintenance=convertedDataList;
        }

        this.GetPCRPOOLDATA();
      });
  }
  GetPCRPOOLDATA() {
    this.PCR_PoolModelObj.PCR_Pool_WO_Id = this.WorkorderId;
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
        if (response[1].length != 0) {


          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_PoolModel();


          convertedData.PCR_Pool_pkeyId =
            element.PCR_Pool_pkeyId;
          convertedData.PCR_Pool_WO_Id = element.PCR_Pool_WO_Id;
          convertedData.PCR_Pool_MasterId =
            element.PCR_Pool_MasterId;
          convertedData.PCR_Pool_ValType =
            element.PCR_Pool_ValType;
          convertedData.PCR_Pool_Bid_To_Dismantle =
            element.PCR_Pool_Bid_To_Dismantle;
          convertedData.PCR_Pool_Bid_To_Drain =
            element.PCR_Pool_Bid_To_Drain;
          convertedData.PCR_Pool_Bid_To_Fill_Hole =
            element.PCR_Pool_Bid_To_Fill_Hole;
          convertedData.PCR_Pool_Bid_To_Install_Safety_Cover =
            element.PCR_Pool_Bid_To_Install_Safety_Cover;
          convertedData.PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover =
            element.PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover;
          convertedData.PCR_Pool_Condition_Good =
            element.PCR_Pool_Condition_Good;
          convertedData.PCR_Pool_Cubic_Yds_Of_Dirt =
            element.PCR_Pool_Cubic_Yds_Of_Dirt;
          convertedData.PCR_Pool_Diameter_Ft =
            element.PCR_Pool_Diameter_Ft;
          convertedData.PCR_Pool_Did_You_Drain_It =
            element.PCR_Pool_Did_You_Drain_It;
          convertedData.PCR_Pool_Dismantled_Removed =
            element.PCR_Pool_Dismantled_Removed;
          convertedData.PCR_Pool_Drain_Remove =
            element.PCR_Pool_Drain_Remove;
          convertedData.PCR_Pool_Hot_Tub_Bids_Bid_To_Drain =
            element.PCR_Pool_Hot_Tub_Bids_Bid_To_Drain;
          convertedData.PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover =
            element.PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover;
          convertedData.PCR_Pool_Hot_Tub_Bids_Diameter_Ft =
            element.PCR_Pool_Hot_Tub_Bids_Diameter_Ft;
          convertedData.PCR_Pool_Hot_Tub_Bids_Drain_Secure =
            element.PCR_Pool_Hot_Tub_Bids_Drain_Secure;
          convertedData.PCR_Pool_Hot_Tub_Bids_Length_Ft =
            element.PCR_Pool_Hot_Tub_Bids_Length_Ft;
          convertedData.PCR_Pool_Hot_Tub_Bids_Width_Ft =
            element.PCR_Pool_Hot_Tub_Bids_Width_Ft;
          convertedData.PCR_Pool_Hot_Tub_Did_You_Secure =
            element.PCR_Pool_Hot_Tub_Did_You_Secure;
          convertedData.PCR_Pool_Hot_Tub_Present =
            element.PCR_Pool_Hot_Tub_Present;
          convertedData.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained =
            element.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained;
          convertedData.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained =
            element.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained;
          convertedData.PCR_Pool_Info_Pool_Present =
            element.PCR_Pool_Info_Pool_Present;
          convertedData.PCR_Pool_Is_It_Locked =
            element.PCR_Pool_Is_It_Locked;
          convertedData.PCR_Pool_Is_The_Pool_Converted_Prevents_Entry =
            element.PCR_Pool_Is_The_Pool_Converted_Prevents_Entry;
          convertedData.PCR_Pool_Is_There_Depression_Left =
            element.PCR_Pool_Is_There_Depression_Left;
          convertedData.PCR_Pool_Is_There_Fence =
            element.PCR_Pool_Is_There_Fence;
          convertedData.PCR_Pool_Length_Ft =
            element.PCR_Pool_Length_Ft;
          convertedData.PCR_Pool_Secure_On_This_Order =
            element.PCR_Pool_Secure_On_This_Order;
          convertedData.PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers =
            element.PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers;
          convertedData.PCR_Pool_Secured_Per_Guidelines =
            element.PCR_Pool_Secured_Per_Guidelines;
          convertedData.PCR_Pool_Size_Of_Hole =
            element.PCR_Pool_Size_Of_Hole;
          convertedData.PCR_Pool_Type_InGround =
            element.PCR_Pool_Type_InGround;
          convertedData.PCR_Pool_Water_Level_Full =
            element.PCR_Pool_Water_Level_Full;
          convertedData.PCR_Pool_Width_Ft =
            element.PCR_Pool_Width_Ft;

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });

          this.PCR_History_Pool=convertedDataList
        }

        this.GetDebrisData();
      });
  }
  GetDebrisData() {
    this.PCR_DebrisModelObj.PCR_Debris_WO_Id = this.WorkorderId;
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
        if (response[1].length != 0) {

          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_DebrisModel();


         convertedData.PCR_Debris_pkeyId =
            element.PCR_Debris_pkeyId;

          convertedData.PCR_Debris_pkeyId =
            element.PCR_Debris_pkeyId;
          convertedData.PCR_Debris_Master_Id =
            element.PCR_Debris_Master_Id;
          convertedData.PCR_Debris_WO_Id =
            element.PCR_Debris_WO_Id;
          convertedData.PCR_Debris_ValType =
            element.PCR_Debris_ValType;

          convertedData.PCR_Debris_Remove_Any_Interior_Debris =
            element.PCR_Debris_Remove_Any_Interior_Debris;
          convertedData.PCR_Debris_Is_There_Interior_Debris_Present =
            element.PCR_Debris_Is_There_Interior_Debris_Present;
          convertedData.PCR_Debris_Describe =
            element.PCR_Debris_Describe;
          convertedData.PCR_Debris_Cubic_Yards =
            element.PCR_Debris_Cubic_Yards;

          convertedData.PCR_Debris_Broom_Swept_Condition =
            element.PCR_Debris_Broom_Swept_Condition;
          convertedData.PCR_Debris_Broom_Swept_Condition_Describe =
            element.PCR_Debris_Broom_Swept_Condition_Describe;

          convertedData.PCR_Debris_Remove_Exterior_Debris =
            element.PCR_Debris_Remove_Exterior_Debris;
          convertedData.PCR_Debris_Exterior_Debris_Present =
            element.PCR_Debris_Exterior_Debris_Present;

          convertedData.PCR_Debris_Exterior_Debris_Describe =
            element.PCR_Debris_Exterior_Debris_Describe;
          convertedData.PCR_Debris_Exterior_Debris_Cubic_Yard =
            element.PCR_Debris_Exterior_Debris_Cubic_Yard;

          convertedData.PCR_Debris_Exterior_Debris_Visible_From_Street =
            element.PCR_Debris_Exterior_Debris_Visible_From_Street;
          convertedData.PCR_Debris_Exterior_On_The_Lawn =
            element.PCR_Debris_Exterior_On_The_Lawn;
          convertedData.PCR_Debris_Exterior_Vehicles_Present =
            element.PCR_Debris_Exterior_Vehicles_Present;
          convertedData.PCR_Debris_Exterior_Vehicles_Present_Describe =
            element.PCR_Debris_Exterior_Vehicles_Present_Describe;

          convertedData.PCR_Debris_Dump_Recipt_Name =
            element.PCR_Debris_Dump_Recipt_Name;
          convertedData.PCR_Debris_Dump_Recipt_Address =
            element.PCR_Debris_Dump_Recipt_Address;
          convertedData.PCR_Debris_Dump_Recipt_Phone =
            element.PCR_Debris_Dump_Recipt_Phone;
          convertedData.PCR_Debris_Dump_Recipt_Desc_what_was_Dump =
            element.PCR_Debris_Dump_Recipt_Desc_what_was_Dump;
          convertedData.PCR_Debris_Dump_Recipt_Means_Of_Disposal =
            element.PCR_Debris_Dump_Recipt_Means_Of_Disposal;

          convertedData.PCR_Debris_InteriorHazards_Health_Present =
            element.PCR_Debris_InteriorHazards_Health_Present;
          convertedData.PCR_Debris_InteriorHazards_Health_Present_Describe =
            element.PCR_Debris_InteriorHazards_Health_Present_Describe;
          convertedData.PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard =
            element.PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard;

          convertedData.PCR_Debris_Exterior_Hazards_Health_Present =
            element.PCR_Debris_Exterior_Hazards_Health_Present;
          convertedData.PCR_Debris_Exterior_Hazards_Health_Present_Describe =
            element.PCR_Debris_Exterior_Hazards_Health_Present_Describe;
          convertedData.PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards =
            element.PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards;
          convertedData.PCR_Debris_IsActive =
            element.PCR_Debris_IsActive;

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });

          this.PCR_History_Debris=convertedDataList
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
  GetutilitiesData() {
    this.PCR_UtilitiesModelObj.PCR_Utilities_WO_Id = this.WorkorderId;
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
        if (response[1].length != 0) {

          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_UtilitiesModel();


         convertedData.PCR_Utilities_pkeyId =
            element.PCR_Utilities_pkeyId;

          convertedData.PCR_Utilities_pkeyId =
            element.PCR_Utilities_pkeyId;
          convertedData.PCR_Utilities_MasterId =
            element.PCR_Utilities_MasterId;
          convertedData.PCR_Utilities_WO_Id =
            element.PCR_Utilities_WO_Id;
          convertedData.PCR_Utilities_ValType =
            element.PCR_Utilities_ValType;

          convertedData.PCR_Utilities_On_Arrival_Water =
            element.PCR_Utilities_On_Arrival_Water;
          convertedData.PCR_Utilities_On_Departure_Water =
            element.PCR_Utilities_On_Departure_Water;

          convertedData.PCR_Utilities_On_Arrival_Gas =
            element.PCR_Utilities_On_Arrival_Gas;
          convertedData.PCR_Utilities_On_Departure_Gas =
            element.PCR_Utilities_On_Departure_Gas;

          convertedData.PCR_Utilities_On_Arrival_Electric =
            element.PCR_Utilities_On_Arrival_Electric;
          convertedData.PCR_Utilities_On_Departure_Electric =
            element.PCR_Utilities_On_Departure_Electric;

          convertedData.PCR_Utilities_Sump_Pump =
            element.PCR_Utilities_Sump_Pump;
          convertedData.PCR_Utilities_Sump_Pump_Commend =
            element.PCR_Utilities_Sump_Pump_Commend;
          convertedData.PCR_Utilities_Sump_Pump_Sump_Test =
            element.PCR_Utilities_Sump_Pump_Sump_Test;

          convertedData.PCR_Utilities_Main_Breaker_And_Operational =
            element.PCR_Utilities_Main_Breaker_And_Operational;
          convertedData.PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace =
            element.PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace;

          convertedData.PCR_Utilities_Transferred_Activated =
            element.PCR_Utilities_Transferred_Activated;

          convertedData.PCR_Utilities_Reason_UtilitiesNot_Transferred =
            element.PCR_Utilities_Reason_UtilitiesNot_Transferred;
          convertedData.PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes =
            element.PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes;

          convertedData.PCR_Utilities_Transferred_Water_Co_Name =
            element.PCR_Utilities_Transferred_Water_Co_Name;
          convertedData.PCR_Utilities_Transferred_Water_Address =
            element.PCR_Utilities_Transferred_Water_Address;
          convertedData.PCR_Utilities_Transferred_Water_Phone =
            element.PCR_Utilities_Transferred_Water_Phone;
          convertedData.PCR_Utilities_Transferred_Water_Acct =
            element.PCR_Utilities_Transferred_Water_Acct;

          convertedData.PCR_Utilities_Transferred_Gas_Co_Name =
            element.PCR_Utilities_Transferred_Gas_Co_Name;
          convertedData.PCR_Utilities_Transferred_Gas_Address =
            element.PCR_Utilities_Transferred_Gas_Address;
          convertedData.PCR_Utilities_Transferred_Gas_Phone =
            element.PCR_Utilities_Transferred_Gas_Phone;
          convertedData.PCR_Utilities_Transferred_Gas_Acct =
            element.PCR_Utilities_Transferred_Gas_Acct;

          convertedData.PCR_Utilities_Transferred_Electric_Co_Name =
            element.PCR_Utilities_Transferred_Electric_Co_Name;
          convertedData.PCR_Utilities_Transferred_Electric_Address =
            element.PCR_Utilities_Transferred_Electric_Address;
          convertedData.PCR_Utilities_Transferred_Electric_Phone =
            element.PCR_Utilities_Transferred_Electric_Phone;
          convertedData.PCR_Utilities_Transferred_Electric_Acct =
            element.PCR_Utilities_Transferred_Electric_Acct;

          convertedData.PCR_Utilities_IsActive =
            element.PCR_Utilities_IsActive;

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_History_Utilities=convertedDataList


        }
        this.GetPCRDRDDATA();
      });
  }
  Doesnworkbidreplace(arg: any) {
    if (arg == "Doesn't work -bid to replace") {
      this.BidToReplaceSumpPump = false;
    } else {
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
  GetPCRDamageDATA() {
    this.PCR_Damage_MasterModelObj.PCR_Damage_WO_Id = this.WorkorderId;
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
        if (response[1].length != 0) {

          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_Damage_MasterModel();

         convertedData.PCR_Damage_pkeyId =
            element.PCR_Damage_pkeyId;
          convertedData.PCR_Damage_MasterId =
            element.PCR_Damage_MasterId;
          convertedData.PCR_Damage_WO_Id =
            element.PCR_Damage_WO_Id;
          convertedData.PCR_Damage_ValType =
            element.PCR_Damage_ValType;
          convertedData.PCR_Damage_Excessive_Humidty_Yes =
            element.PCR_Damage_Excessive_Humidty_Yes;
          convertedData.PCR_Damage_Fire_Smoke_Damage_Yes =
            element.PCR_Damage_Fire_Smoke_Damage_Yes;
          convertedData.PCR_Damage_Flood_Damage_Yes =
            element.PCR_Damage_Flood_Damage_Yes;
          convertedData.PCR_Damage_Freeze_Damage_Yes =
            element.PCR_Damage_Freeze_Damage_Yes;
          convertedData.PCR_Damage_Mortgagor_Neglect_Yes =
            element.PCR_Damage_Mortgagor_Neglect_Yes;
          convertedData.PCR_Damage_Storm_Damage_Yes =
            element.PCR_Damage_Storm_Damage_Yes;
          convertedData.PCR_Damage_Structural_Damage_Yes =
            element.PCR_Damage_Structural_Damage_Yes;
          convertedData.PCR_Damage_Unfinished_Renovation_Yes =
            element.PCR_Damage_Unfinished_Renovation_Yes;
          convertedData.PCR_Damage_Vandalism_Yes =
            element.PCR_Damage_Vandalism_Yes;
          convertedData.PCR_Damage_Water_Damage_Yes =
            element.PCR_Damage_Water_Damage_Yes;
          convertedData.PCR_Damage_Wear_And_Tear_Yes =
            element.PCR_Damage_Wear_And_Tear_Yes;
          convertedData.PCR_Damages_Building =
            element.PCR_Damages_Building;
          convertedData.PCR_Damages_Cause =
            element.PCR_Damages_Cause;
          convertedData.PCR_Damages_Damage =
            element.PCR_Damages_Damage;
          convertedData.PCR_Damages_Description =
            element.PCR_Damages_Description;
          convertedData.PCR_Damages_Estimate =
            element.PCR_Damages_Estimate;
          convertedData.PCR_Damages_FEMA_Damage_Estimate =
            element.PCR_Damages_FEMA_Damage_Estimate;
          convertedData.PCR_Damages_FEMA_Damages_Yes =
            element.PCR_Damages_FEMA_Damages_Yes;
          convertedData.PCR_Damages_FEMA_Neighborhood_Level_Light =
            element.PCR_Damages_FEMA_Neighborhood_Level_Light;
          convertedData.PCR_Damages_FEMA_Property_Level_Light_Moderate =
            element.PCR_Damages_FEMA_Property_Level_Light_Moderate;
          convertedData.PCR_Damages_FEMA_Trailer_Present =
            element.PCR_Damages_FEMA_Trailer_Present;
          convertedData.PCR_Damages_Int_Ext =
            element.PCR_Damages_Int_Ext;
          convertedData.PCR_Damages_Property_Habitable =
            element.PCR_Damages_Property_Habitable;
          convertedData.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire =
            element.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire;
          convertedData.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood =
            element.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood;
          convertedData.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water =
            element.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water;
          convertedData.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind =
            element.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind;
          convertedData.PCR_Damages_Qty =
            element.PCR_Damages_Qty;
          convertedData.PCR_Damages_Room =
            element.PCR_Damages_Room;
          convertedData.PCR_Damages_Status =
            element.PCR_Damages_Status;
          convertedData.PCR_System_Damages_Electric_Damage_Yes =
            element.PCR_System_Damages_Electric_Damage_Yes;
          convertedData.PCR_System_Damages_HVAC_System_Damage_Yes =
            element.PCR_System_Damages_HVAC_System_Damage_Yes;
          convertedData.PCR_System_Damages_Plumbing_Damage_Yes =
            element.PCR_System_Damages_Plumbing_Damage_Yes;
          convertedData.PCR_System_Damages_Uncapped_Wire_Yes =
            element.PCR_System_Damages_Uncapped_Wire_Yes;
          convertedData.PCR_Urgent_Damages_Flooded_Basement_Yes =
            element.PCR_Urgent_Damages_Flooded_Basement_Yes;
          convertedData.PCR_Urgent_Damages_Floors_Safety_Yes =
            element.PCR_Urgent_Damages_Floors_Safety_Yes;
          convertedData.PCR_Urgent_Damages_Foundation_Cracks_Yes =
            element.PCR_Urgent_Damages_Foundation_Cracks_Yes;
          convertedData.PCR_Urgent_Damages_Mold_Damage_Yes =
            element.PCR_Urgent_Damages_Mold_Damage_Yes;
          convertedData.PCR_Urgent_Damages_Other_Causing_Damage_Yes =
            element.PCR_Urgent_Damages_Other_Causing_Damage_Yes;
          convertedData.PCR_Urgent_Damages_Other_Safety_Issue_Yes =
            element.PCR_Urgent_Damages_Other_Safety_Issue_Yes;
          convertedData.PCR_Urgent_Damages_Roof_Leak_Yes =
            element.PCR_Urgent_Damages_Roof_Leak_Yes;
          convertedData.PCR_Urgent_Damages_Roof_Traped_Yes =
            element.PCR_Urgent_Damages_Roof_Traped_Yes;
          convertedData.PCR_Urgent_Damages_SeePage_Yes =
            element.PCR_Urgent_Damages_SeePage_Yes;
          convertedData.PCR_Urgent_Damages_Water_Stains_Yes =
            element.PCR_Urgent_Damages_Water_Stains_Yes;
          convertedData.PCR_Urgent_Damages_Wet_Carpet_Yes =
            element.PCR_Urgent_Damages_Wet_Carpet_Yes;


            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
		      this.PCR_History_Damage=convertedDataList

        }

        this.GetConveyanceData(); //change here
      });
  }
  GetConveyanceData() {
    this.PCR_ConveyanceModelObj.PCR_Conveyance_Wo_ID = this.WorkorderId;
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
        if (response[1].length != 0) {

          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_ConveyanceModel();

         convertedData.PCR_Conveyance_pkeyID =
            element.PCR_Conveyance_pkeyID;
          convertedData.PCR_Conveyance_MasterID =
            element.PCR_Conveyance_MasterID;
          convertedData.PCR_Conveyance_Wo_ID =
            element.PCR_Conveyance_Wo_ID;
          convertedData.PCR_Conveyance_ValType =
            element.PCR_Conveyance_ValType;
          convertedData.PCR_Conveyance_Work_Order_Instruction =
            element.PCR_Conveyance_Work_Order_Instruction;
          convertedData.PCR_Conveyance_Secured_Per_Guidelines =
            element.PCR_Conveyance_Secured_Per_Guidelines;
          convertedData.PCR_Conveyance_Additional_Damage =
            element.PCR_Conveyance_Additional_Damage;
          convertedData.PCR_Conveyance_Bid_On_This_Visit =
            element.PCR_Conveyance_Bid_On_This_Visit;
          convertedData.PCR_Conveyance_Need_Maintenance =
            element.PCR_Conveyance_Need_Maintenance;
          convertedData.PCR_Conveyance_Broom_Swept_Condition =
            element.PCR_Conveyance_Broom_Swept_Condition;
          convertedData.PCR_Conveyance_HUD_Guidelines =
            element.PCR_Conveyance_HUD_Guidelines;
          convertedData.PCR_Conveyance_Accidental_Entry =
            element.PCR_Conveyance_Accidental_Entry;
          convertedData.PCR_Conveyance_Features_Are_Secure =
            element.PCR_Conveyance_Features_Are_Secure;
          convertedData.PCR_Conveyance_In_Place_Operational =
            element.PCR_Conveyance_In_Place_Operational;
          convertedData.PCR_Conveyance_Property_Of_Animals =
            element.PCR_Conveyance_Property_Of_Animals;
          convertedData.PCR_Conveyance_Intact_Secure =
            element.PCR_Conveyance_Intact_Secure;
          convertedData.PCR_Conveyance_Water_Instruction =
            element.PCR_Conveyance_Water_Instruction;
          convertedData.PCR_Conveyance_Free_Of_Water =
            element.PCR_Conveyance_Free_Of_Water;
          convertedData.PCR_Conveyance_Moisture_has_Eliminated =
            element.PCR_Conveyance_Moisture_has_Eliminated;
          convertedData.PCR_Conveyance_Orderdinance =
            element.PCR_Conveyance_Orderdinance;
          convertedData.PCR_Conveyance_Uneven =
            element.PCR_Conveyance_Uneven;
          convertedData.PCR_Conveyance_Conveyance_Condition =
            element.PCR_Conveyance_Conveyance_Condition;
          convertedData.PCR_Conveyance_Damage =
            element.PCR_Conveyance_Damage;
          convertedData.PCR_Conveyance_Debris =
            element.PCR_Conveyance_Debris;
          convertedData.PCR_Conveyance_Repairs =
            element.PCR_Conveyance_Repairs;
          convertedData.PCR_Conveyance_Hazards =
            element.PCR_Conveyance_Hazards;
          convertedData.PCR_Conveyance_Other =
            element.PCR_Conveyance_Other;
          convertedData.PCR_Conveyance_Describe =
            element.PCR_Conveyance_Describe;
          convertedData.PCR_Conveyance_Note =
            element.PCR_Conveyance_Note;
          convertedData.PCR_Conveyance_Work_Order_Instruction_Reason =
            element.PCR_Conveyance_Work_Order_Instruction_Reason;
          convertedData.PCR_Conveyance_Secured_Per_Guidelines_Reason =
            element.PCR_Conveyance_Secured_Per_Guidelines_Reason;
          convertedData.PCR_Conveyance_HUD_Guidelines_Reasponce =
            element.PCR_Conveyance_HUD_Guidelines_Reasponce;
          convertedData.PCR_Conveyance_Shrubs_or_tree =
            element.PCR_Conveyance_Shrubs_or_tree;

          convertedData.PCR_Conveyance_IsActive =
            element.PCR_Conveyance_IsActive;


            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
		      this.PCR_History_Conveyance=convertedDataList
        }
        this.GetPCRROOFDATA();
      });
  }

  GetPCRROOFDATA() {
    this.PCR_RoofModelObj.PCR_Roof_WO_Id = this.WorkorderId;
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
        if (response[1].length != 0) {

          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCR_RoofModel();


        convertedData.PCR_Roof_pkeyId =
            element.PCR_Roof_pkeyId;
          convertedData.PCR_Roof_MasterId =
            element.PCR_Roof_MasterId;
          convertedData.PCR_Roof_WO_Id = element.PCR_Roof_WO_Id;
          convertedData.PCR_Roof_ValType =
            element.PCR_Roof_ValType;
          convertedData.PCR_Roof_Roof_Shape_Pitched_Roof =
            element.PCR_Roof_Roof_Shape_Pitched_Roof;
          convertedData.PCR_Roof_Leak = element.PCR_Roof_Leak;
          convertedData.PCR_Roof_Leak_Case =
            element.PCR_Roof_Leak_Case;
          convertedData.PCR_Roof_Leak_Other =
            element.PCR_Roof_Leak_Other;
          convertedData.PCR_Roof_Leak_Location_Dimension =
            element.PCR_Roof_Leak_Location_Dimension;
          convertedData.PCR_Roof_Roof_Damage =
            element.PCR_Roof_Roof_Damage;
          convertedData.PCR_Roof_Location_Dimensions =
            element.PCR_Roof_Location_Dimensions;
          convertedData.PCR_Roof_Water_Strains =
            element.PCR_Roof_Water_Strains;
          convertedData.PCR_Roof_Water_Strains_Case =
            element.PCR_Roof_Water_Strains_Case;
          convertedData.PCR_Roof_Water_Strains_Dimension =
            element.PCR_Roof_Water_Strains_Dimension;
          convertedData.PCR_Roof_Did_You_Perform_Roof_Repair =
            element.PCR_Roof_Did_You_Perform_Roof_Repair;
          convertedData.PCR_Roof_Bid_To_Repair =
            element.PCR_Roof_Bid_To_Repair;
          convertedData.PCR_Roof_Did_You_Perform_Emergency_Traping =
            element.PCR_Roof_Did_You_Perform_Emergency_Traping;
          convertedData.PCR_Roof_Explain_Bid_Trap =
            element.PCR_Roof_Explain_Bid_Trap;
          convertedData.PCR_Roof_Bid_To_Trap_Dimension_size_x =
            element.PCR_Roof_Bid_To_Trap_Dimension_size_x;
          convertedData.PCR_Roof_Bid_To_Trap_Dimension_size_y =
            element.PCR_Roof_Bid_To_Trap_Dimension_size_y;
          convertedData.PCR_Roof_Bid_To_Trap_Location =
            element.PCR_Roof_Bid_To_Trap_Location;
          convertedData.PCR_Roof_Bid_To_Trap_Description =
            element.PCR_Roof_Bid_To_Trap_Description;
          convertedData.PCR_Roof_Bid_To_Trap_Bid_Amount =
            element.PCR_Roof_Bid_To_Trap_Bid_Amount;
          convertedData.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x =
            element.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x;
          convertedData.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y =
            element.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y;
          convertedData.PCR_Roof_Bid_To_Tar_Patch_Location =
            element.PCR_Roof_Bid_To_Tar_Patch_Location;
          convertedData.PCR_Roof_Bid_To_Tar_Patch_dias =
            element.PCR_Roof_Bid_To_Tar_Patch_dias;
          convertedData.PCR_Roof_Bid_To_Tar_Patch_Bid_Amount =
            element.PCR_Roof_Bid_To_Tar_Patch_Bid_Amount;
          convertedData.PCR_Roof_Bid_To_Replace =
            element.PCR_Roof_Bid_To_Replace;
          convertedData.PCR_Roof_Reason_Cant_Repair_Due_To =
            element.PCR_Roof_Reason_Cant_Repair_Due_To;
          convertedData.PCR_Roof_Reason_Cant_Repair_Due_To_TEXT =
            element.PCR_Roof_Reason_Cant_Repair_Due_To_TEXT;
          convertedData.PCR_Roof_Reason_Preventive_Due_To =
            element.PCR_Roof_Reason_Preventive_Due_To;
          convertedData.PCR_Roof_Reason_Preventive_Due_To =
            element.PCR_Roof_Reason_Preventive_Due_To;
          convertedData.PCR_Roof_Reason_Leaking =
            element.PCR_Roof_Reason_Leaking;
          convertedData.PCR_Roof_Reason_Other =
            element.PCR_Roof_Reason_Other;
          convertedData.PCR_Roof_Bid_To_Description =
            element.PCR_Roof_Bid_To_Description;
          convertedData.PCR_Roof_Bid_To_Location_Entire_Roof =
            element.PCR_Roof_Bid_To_Location_Entire_Roof;
          convertedData.PCR_Roof_Bid_To_Location_Front =
            element.PCR_Roof_Bid_To_Location_Front;
          convertedData.PCR_Roof_Bid_To_Location_Back =
            element.PCR_Roof_Bid_To_Location_Back;
          convertedData.PCR_Roof_Bid_To_Location_Left_Side =
            element.PCR_Roof_Bid_To_Location_Left_Side;
          convertedData.PCR_Roof_Bid_To_Location_Right_Side =
            element.PCR_Roof_Bid_To_Location_Right_Side;
          convertedData.PCR_Roof_Building_House =
            element.PCR_Roof_Building_House;
          convertedData.PCR_Roof_Building_Garage =
            element.PCR_Roof_Building_Garage;
          convertedData.PCR_Roof_Building_Out_Building =
            element.PCR_Roof_Building_Out_Building;
          convertedData.PCR_Roof_Building_Pool_House =
            element.PCR_Roof_Building_Pool_House;
          convertedData.PCR_Roof_Building_Shed =
            element.PCR_Roof_Building_Shed;
          convertedData.PCR_Roof_Building_Bam =
            element.PCR_Roof_Building_Bam;
          convertedData.PCR_Roof_Item_Used_Roof_Type =
            element.PCR_Roof_Item_Used_Roof_Type;
          convertedData.PCR_Roof_Item_Used_DRD =
            element.PCR_Roof_Item_Used_DRD;
          convertedData.PCR_Roof_Item_Used_Size =
            element.PCR_Roof_Item_Used_Size;
          convertedData.PCR_Roof_Item_Used_Amount =
            element.PCR_Roof_Item_Used_Amount;
          convertedData.PCR_Roof_Item_Used_Felt_Type =
            element.PCR_Roof_Item_Used_Felt_Type;
          convertedData.PCR_Roof_Item_Used_Felt_Type_DRD =
            element.PCR_Roof_Item_Used_Felt_Type_DRD;
          convertedData.PCR_Roof_Item_Used_Felt_Type_Size =
            element.PCR_Roof_Item_Used_Felt_Type_Size;
          convertedData.PCR_Roof_Item_Used_Felt_Type_Amount =
            element.PCR_Roof_Item_Used_Felt_Type_Amount;
          convertedData.PCR_Roof_Item_Used_Sheathing =
            element.PCR_Roof_Item_Used_Sheathing;
          convertedData.PCR_Roof_Item_Used_Sheathing_DRD =
            element.PCR_Roof_Item_Used_Sheathing_DRD;
          convertedData.PCR_Roof_Item_Used_Sheathing_Size =
            element.PCR_Roof_Item_Used_Sheathing_Size;
          convertedData.PCR_Roof_Item_Used_Sheathing_Amount =
            element.PCR_Roof_Item_Used_Sheathing_Amount;
          convertedData.PCR_Roof_Item_Used_Deck_Thikness =
            element.PCR_Roof_Item_Used_Deck_Thikness;
          convertedData.PCR_Roof_Item_Used_Deck_Thikness_DRD =
            element.PCR_Roof_Item_Used_Deck_Thikness_DRD;
          convertedData.PCR_Roof_Item_Used_Drip_Edge =
            element.PCR_Roof_Item_Used_Drip_Edge;
          convertedData.PCR_Roof_Item_Used_Drip_Edge_Size =
            element.PCR_Roof_Item_Used_Drip_Edge_Size;
          convertedData.PCR_Roof_Item_Used_Drip_Edge_Amount =
            element.PCR_Roof_Item_Used_Drip_Edge_Amount;
          convertedData.PCR_Roof_Item_Used_Ice_Water_Barrier =
            element.PCR_Roof_Item_Used_Ice_Water_Barrier;
          convertedData.PCR_Roof_Item_Used_Ice_Water_Barrier_Size =
            element.PCR_Roof_Item_Used_Ice_Water_Barrier_Size;
          convertedData.PCR_Roof_Item_Used_Ice_Water_Barrier_Amount =
            element.PCR_Roof_Item_Used_Ice_Water_Barrier_Amount;
          convertedData.PCR_Roof_Item_Used_No_Of_Vents =
            element.PCR_Roof_Item_Used_No_Of_Vents;
          convertedData.PCR_Roof_Item_Used_No_Of_Vents_Text =
            element.PCR_Roof_Item_Used_No_Of_Vents_Text;
          convertedData.PCR_Roof_Item_Used_No_Of_Vents_Amount =
            element.PCR_Roof_Item_Used_No_Of_Vents_Amount;
          convertedData.PCR_Roof_Item_Used_Roof_Debris =
            element.PCR_Roof_Item_Used_Roof_Debris;
          convertedData.PCR_Roof_Item_Used_Roof_Debris_Size =
            element.PCR_Roof_Item_Used_Roof_Debris_Size;
          convertedData.PCR_Roof_Item_Used_Roof_Debris_Amount =
            element.PCR_Roof_Item_Used_Roof_Debris_Amount;
          convertedData.PCR_Roof_Item_Used_Dempster_Rental =
            element.PCR_Roof_Item_Used_Dempster_Rental;
          convertedData.PCR_Roof_Item_Used_Dempster_Rental_Size =
            element.PCR_Roof_Item_Used_Dempster_Rental_Size;
          convertedData.PCR_Roof_Item_Used_Dempster_Rental_Amount =
            element.PCR_Roof_Item_Used_Dempster_Rental_Amount;
          convertedData.PCR_Bid_Amount = element.PCR_Bid_Amount;

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
		      this.PCR__History_Roof=convertedDataList

        }
        this.GetFiveBrotherData();
      });
  }

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

  propertyinfojson: any;
  //get fivebrother json data
  GetFiveBrotherData() {

    this.PCR_FiveBrotherModelObj.PCR_FiveBro_WO_ID = this.WorkorderId;
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
  SubmitWinterization(msgShow: boolean) {
    // debugger

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

    this.PCR_WinterizationModelObj.PCR_Winterization_WO_Id = this.WorkorderId;
    this.PCR_WinterizationModelObj.fwo_pkyeId = this.FWO_PkyeId;

    this.xClientResultPCRServices
      .WinterizationDataPost(this.PCR_WinterizationModelObj)
      .subscribe(response => {
        // console.log('winterizatirespon',response)
        if (response[0].length != 0) {
          this.PCR_WinterizationModelObj.PCR_Winterization_pkeyId = Number(
            response[0].PCR_Winterization_pkeyId
          );

          if (msgShow) {
            this.MessageFlag = "Winterization Saved...!";
            this.commonMessage();
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
  YardMaintananceSubmit(msgShow: boolean) {
    // debugger
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
    this.PcrYardExterModelObj.PCR_Yard_Grass_LotSize = this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Grass_LotSize
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

    this.isLoadingYard = true;
    this.buttonYard = "Processing";

    this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_WO_Id = this.WorkorderId;
    this.PCR_Yard_MaintenanceModelObj.fwo_pkyeId = this.FWO_PkyeId;
    this.xClientResultPCRServices
      .postyard(this.PCR_Yard_MaintenanceModelObj)
      .subscribe(response => {
        // console.log('yardresponse',response)
        if (response[0].length != 0) {
          this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_pkeyId = Number(
            response[0].PCR_Yard_Maintenance_pkeyId
          );
          this.isLoadingYard = false;
          this.buttonYard = "Update";
          if (msgShow) {
            this.MessageFlag = "Yard Maintanance Saved...!";
            this.commonMessage();
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 5; // this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PcrYardExterModelObj
          );
          this.PostFiveBrother();
        }
      });
  }
  DebrisSubmit(msgShow: boolean) {
    // debugger
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


    this.Loadingdebris = true;
    this.buttondebris = "Processing";

    this.PCR_DebrisModelObj.PCR_Debris_WO_Id = this.WorkorderId;
    this.PCR_DebrisModelObj.fwo_pkyeId = this.FWO_PkyeId;
    this.xClientResultPCRServices
      .postdebris(this.PCR_DebrisModelObj)
      .subscribe(response => {
        // console.log('debrisrespon',response)
        if (response[0].length != 0) {
          this.PCR_DebrisModelObj.PCR_Debris_pkeyId = Number(
            response[0].PCR_Debris_pkeyId
          );
          this.Loadingdebris = false;
          this.buttondebris = "Update";
          if (msgShow) {
            this.MessageFlag = "Debris/Hazards Saved...!";
            this.commonMessage();
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = this.PCR_DebrisModelObj.PCR_Debris_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(
            this.PcrDebrisExterModelObj
          );
          this.PostFiveBrother();
        }
      });
  }
  PcrRoofData(msgShow: boolean) {

// debugger
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

    this.roofLoading = true;
    this.roofbutton = "Processing";
    this.PCR_RoofModelObj.PCR_Roof_WO_Id = this.WorkorderId;
    this.PCR_RoofModelObj.fwo_pkyeId = this.FWO_PkyeId;

    this.xClientResultPCRServices
      .PostRoofData(this.PCR_RoofModelObj)
      .subscribe(response => {
        // console.log('roofresponse',response)
        if (response[0].length != 0) {
          this.PCR_RoofModelObj.PCR_Roof_pkeyId = Number(
            response[0].PCR_Roof_pkeyId
          );
          this.roofLoading = false;
          this.roofbutton = "Update";
          if (msgShow) {
            this.MessageFlag = "PCR Roof Data Saved...!";
            this.commonMessage();
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 7;// this.PCR_RoofModelObj.PCR_Roof_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrRoofExterModelObj);
          this.PostFiveBrother();
        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }
  // Add Pool Data
  PcrPoolData(msgShow: boolean) {
// debugger
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

    this.poorLoading = true;
    this.poorbutton = "Processing";

    this.PCR_PoolModelObj.PCR_Pool_WO_Id = this.WorkorderId;
    this.PCR_PoolModelObj.fwo_pkyeId = this.FWO_PkyeId;

    this.xClientResultPCRServices
      .PoolDataPost(this.PCR_PoolModelObj)
      .subscribe(response => {
        // console.log('poolresponn',response)
        if (response[0].length != 0) {
          this.PCR_PoolModelObj.PCR_Pool_pkeyId = Number(
            response[0].PCR_Pool_pkeyId
          );

          this.poorLoading = false;
          this.poorbutton = "Update";

          if (msgShow) {
            this.MessageFlag = "Pcr Pool Data Saved...!";
            this.commonMessage();
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 8;// this.PCR_PoolModelObj.PCR_Pool_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrPoolExterModelObj);
          this.PostFiveBrother();
        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }
  // utilities code start herre
  PostUtilitiesSubmit(msgShow: boolean) {
    // debugger


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

    this.LoadingdeUtilites = true;
    this.buttonUtilites = "Processing";
    this.PCR_UtilitiesModelObj.PCR_Utilities_WO_Id = this.WorkorderId;
    this.PCR_UtilitiesModelObj.fwo_pkyeId = this.FWO_PkyeId;
    this.xClientResultPCRServices
      .PostUtilities(this.PCR_UtilitiesModelObj)
      .subscribe(response => {
        // console.log('utilitesrespon',response)
        if (response[0].length != 0) {
          this.PCR_UtilitiesModelObj.PCR_Utilities_pkeyId = Number(
            response[0].PCR_Utilities_pkeyId
          );

          this.LoadingdeUtilites = false;
          this.buttonUtilites = "Update";

          if (msgShow) {
            this.MessageFlag = "Utilites Information Saved...!";
            this.commonMessage();
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 9; //this.PCR_UtilitiesModelObj.PCR_Utilities_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.Pcr_UtilitiesExterModelObj);
          this.PostFiveBrother();


        }
      });
  }

  // Add PCR Damage Master Data

  AddPCRDamage(msgShow: boolean) {
    // debugger
  
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

    this.isLoadingDamage = true;
    this.buttonDamage = "Processing";

    this.PCR_Damage_MasterModelObj.PCR_Damage_WO_Id = this.WorkorderId;
    this.PCR_Damage_MasterModelObj.fwo_pkyeId = this.FWO_PkyeId;

    this.xClientResultPCRServices
      .PCRDamageDataPost(this.PCR_Damage_MasterModelObj)
      .subscribe(response => {
        // console.log('damagerespon',response)
        if (response[0].length != 0) {
          this.PCR_Damage_MasterModelObj.PCR_Damage_pkeyId = Number(
            // response[0].PCR_Pool_pkeyId
            response[0].PCR_Damage_pkeyId
          );
          this.isLoadingDamage = false;
          this.buttonDamage = "Update";
          if (msgShow) {
            this.MessageFlag = "PCR Damage Data Saved...!";
            this.commonMessage();
          }

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 11;// this.PCR_Damage_MasterModelObj.PCR_Damage_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrDamagesExterModelObj);
          this.PostFiveBrother();

        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
      });
  }
  //save the conveyance data
  PCRConveyancesave(msgShow: boolean) {
// debugger

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

    this.isLoadingcoveyance = true;
    this.buttonconveyance = "Processing";

    this.PCR_ConveyanceModelObj.PCR_Conveyance_Wo_ID = this.WorkorderId;
    this.PCR_ConveyanceModelObj.fwo_pkyeId = this.FWO_PkyeId;

    this.xClientResultPCRServices
      .PCRConveyanceDataPost(this.PCR_ConveyanceModelObj)
      .subscribe(response => {
        // console.log('conveyrespons',response)
        if (response[0].length != 0) {
          this.PCR_ConveyanceModelObj.PCR_Conveyance_pkeyID = Number(
            response[0].PCR_Conveyance_pkeyID
          );
          this.isLoadingcoveyance = false;
          this.buttonconveyance = "Update";

          if (msgShow) {
            this.MessageFlag = "PCR Conveyance Data Saved...!";
            this.commonMessage();
          }


          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Valtype = 12//;this.PCR_ConveyanceModelObj.PCR_Conveyance_ValType;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Json = JSON.stringify(this.PcrConveyanceExterModelObj);
          this.PostFiveBrother();

        } else {
          alert("ENTERNAL SERVER ERROR ");
        }
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
  BidToRemoveVines:boolean = false;
  UponArrivalwereRemove(arg :any): void{
    if(arg == "Yes"){
      this.BidToRemoveVines = false;
    }else{
      this.BidToRemoveVines = true;
    }
    this.insurerguidelinesCall(arg);
  }

  insurerguidelinesCall(arg: any) {
    if (this.BidToTrimShrubs == this.BidToTrimTrees == this.BidToRemoveVines) {
      if (arg == "No") {
        this.insurerguidelines = true;
      }
    } else {
      this.insurerguidelines = false;
    }
  }
  UponDeparture(arg: any): void {
    if (arg == "Yes") {
      this.BidToTrimShrubs = false;
      this.BidToTrimTrees = false;
      this.BidToRemoveVines = false;
    } else {
      this.BidToTrimShrubs = true;
      this.BidToTrimTrees = true;
      this.BidToRemoveVines = true;
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
  Breached: boolean = true;
  Winterizationarrival(arg: any): void {
    if (arg == "No") {
      this.Breached = false;
    } else {
      this.Breached = true;
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
}
