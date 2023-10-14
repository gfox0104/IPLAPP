import { Component, OnInit } from '@angular/core';
import { PCRPropertyInfoModel,
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
  PCR_RoofModel, } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr-model';
import { ClientResultPCRServices } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr.service';

@Component({
  selector: 'app-preservation-form',
  templateUrl: './preservation-form.component.html',
  styleUrls: ['./preservation-form.component.scss']
})
export class PreservationFormComponent implements OnInit {

  PCRPropertyInfoModelObj: PCRPropertyInfoModel = new PCRPropertyInfoModel();
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
  DebrisHideDiv: boolean = false;
  HotTub: boolean = false;
  ordt: boolean = false;
  grounds: boolean = true;
  intrer: boolean = false;
  isdisable: boolean = false;
  poolprnt: boolean = false;
  ProNoteHide: boolean = true;
  OccupancyVerified: boolean = false;
  MaintainedItems: boolean = false;
  Permitrequired: boolean = false;
  HOADiv: boolean = false;
  BrokerPhone: boolean = false;
  roofleafd: boolean = true;
  perdata: boolean = true;
  Wateras: boolean = true;
  drddisable: boolean = true; 
  repair: boolean = false;
  replace: boolean = true;
  emergancy: boolean = true;
  SecureReason2Div: boolean = false;
  SecureReason3Div: boolean = false;
  SecureReasonDiv: boolean = false;
  TestSumpPump: boolean = false;
  BidToReplaceSumpPump: boolean = true;
  UnabletocheckNotes: boolean = true;
  Breached: boolean = true;
  winhide: boolean = true;
  ReasonsWinterization: boolean = false;
  DryHeatWinterization: boolean = false;
  WellSystem: boolean = false;
  SystemType = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "DRY" },
    { id: 3, name: "DRY W/ WELL" },
    { id: 4, name: "RADIANT" },
    { id: 5, name: "RADIANT W/ WELL" },
    { id: 6, name: "STEAM" },
    { id: 7, name: "STEAM W/ WELL" },
  ];
  insurerguidelines: boolean = false;
  WasGrassCutDiv: boolean = false;
  BidToTrimShrubs: boolean = false;
  BidToTrimTrees: boolean = false;

  constructor(
    private xClientResultPCRServices: ClientResultPCRServices,
  ) { }

  ngOnInit(): void {
  }
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
  instruct: boolean = true;
  woinstructionyes(arg: any): void {
    if (arg == "No") {
      this.instruct = false;
    } else {
      this.instruct = true;
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
  hub: boolean = true;
  hudguidelinedata(arg: any): void {
    if (arg == "No") {
      this.hub = false;
    } else {
      this.hub = true;
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
    
    });
  }

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

  HotTubPresent(arg: any): void {
    if (arg == "No") {
      this.HotTub = true;
    } else {
      this.HotTub = false;
    }
  }
  thisorderdata(arg: any): void {
    if (arg == "Yes") {
      this.ordt = true;
    } else {
      this.ordt = false;
    }
  }
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

  PoolPresentData(arg: any): void {
    if (arg == "No") {
      this.poolprnt = true;
    } else {
      this.poolprnt = false;
    }
  }

  OccupancyOther(agr) {
    //alert(agr);
    if (agr) {
      this.ProNoteHide = false;
    } else {
      this.ProNoteHide = true;

      this.PCRPropertyInfoModelObj.PCR_Prop_Property_Vacant_Notes = "";
    }
  }
  
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

  HomeOweners(arg: any): void {
    if (arg == "Yes") {
      this.HOADiv = false;
    } else {
      this.HOADiv = true;

      this.PCRPropertyInfoModelObj.PCR_HOA_Name = "";
      this.PCRPropertyInfoModelObj.PCR_HOA_Phone = "";
    }
  }  
  

  ForSale(arg: any): void {
    if (arg == "Yes") {
      this.BrokerPhone = false;
    } else {
      this.BrokerPhone = true;
      this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Phone = "";
      this.PCRPropertyInfoModelObj.PCR_Prop_Broker_Name = "";
    }
  }

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
  Thiknessdrd = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "1/2" },
    { id: 3, name: "3/4" },
    { id: 4, name: "3/8" },
    { id: 5, name: "5/8" },
    { id: 6, name: "OTHER" },
    { id: 7, name: "None" }
  ];
  Sheathingtypedrd = [
    { id: 1, name: "-Select-" },
    { id: 2, name: "OSB" },
    { id: 3, name: "PLAYWOOD" },
    { id: 4, name: "OTHER" },
    { id: 5, name: "None" }
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

  roofleakhide(arg: any): void {
    if (arg == "Yes") {
      this.roofleafd = false;
    } else {
      this.roofleafd = true;
    }
  }
  performpcr(arg: any): void {
    if (arg == "Yes") {
      this.perdata = true;
    } else {
      this.perdata = false;
    }
  }
  WaterStains(arg: any): void {
    if (arg == "Yes") {
      this.Wateras = false;
    } else {
      this.Wateras = true;
    }
  }
  rooftypedrddata(arg: any): void {
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
  Sheathingdata(arg: any): void {
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
  bittopcr(arg: any): void {
    if (arg == "Repair") {
      this.repair = false;
      this.replace = true;
    } else {
      this.repair = true;
      this.replace = false;
    }
  }
  Emergencypcr(arg: any): void {
    if (arg == "Yes") {
      this.emergancy = true;
    } else {
      this.emergancy = false;
    }
  }

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
  
  Boadedonarrival(arg: any) {
    if (arg == "Yes") {
      this.SecureReason3Div = false;
    } else {
      this.SecureReason3Div = true;
    }
  }

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
Winterizationarrival(arg: any): void {
    if (arg == "No") {
      this.Breached = false;
    } else {
      this.Breached = true;
    }
  }
  
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

  // yard funcationality

  WasGrassCut(arg: any): void {
    if (arg == "Yes") {
      this.WasGrassCutDiv = true;
      this.PCR_Yard_MaintenanceModelObj.PCR_Yard_Maintenance_Grass_Maintained_No =
        "";
    } else {
      this.WasGrassCutDiv = false;
    }
  }

  
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
}
