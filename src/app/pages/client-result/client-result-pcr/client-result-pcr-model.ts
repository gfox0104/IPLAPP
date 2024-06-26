export class ClientResultPCRModel {

}

export class PCRPropertyInfoModel {
  PCR_Pro_PkeyID: Number = 0;
  PCR_Prop_WO_ID: Number = 0;
  PCR_Prop_MasterID: Number = 0;
  PCR_Prop_ValType: Number = 1;
  PCR_Prop_ForSale: String = "";
  PCR_Prop_Sold: String = "";
  PCR_Prop_Broker_Phone: String = "";
  PCR_Prop_Broker_Name: String = ""; // new
  PCR_Prop_Maintained: String = ""; // new
  PCR_Prop_Maintained_ByOther: String = ""; //ch
  PCR_Prop_Maintained_Items_Utilities: Boolean = false;
  PCR_Prop_Maintained_Items_Grass: Boolean = false;
  PCR_Prop_Maintained_Items_Snow_Removal: Boolean = false;
  PCR_Prop_Maintained_Items_Interior_Repaiars: Boolean = false;
  PCR_Prop_Maintained_Items_Exterior_Repairs: Boolean = false;
  PCR_Prop_Active_Listing: String = ""; //ch
  PCR_Prop_Basement_Present: String = ""; //ch
  PCR_Prop_Property_Type_Vacant_Land: Boolean = false;
  PCR_Prop_Property_Type_Single_Family: Boolean = false;
  PCR_Prop_Property_Type_Multi_Family: Boolean = false;
  PCR_Prop_Property_Type_Mobile_Home: Boolean = false;
  PCR_Prop_Property_Type_Condo: Boolean = false;
  PCR_Prop_Permit_Required: String = ""; //ch
  PCR_Prop_Permit_Number: String = ""; // new
  PCR_OurBuildings_Garages: String = ""; // new
  PCR_OurBuildings_Sheds: String = ""; // new
  PCR_OurBuildings_Caports: String = ""; // new
  PCR_OurBuildings_Bams: String = ""; // new
  PCR_OurBuildings_Pool_House: String = ""; // new
  PCR_OurBuildings_Other_Building: String = ""; // new
  PCR_Prop_Garage: String = ""; //new
  PCR_Prop_Condo_Association_Property: String = ""; //ch
  PCR_HOA_Name: String = ""; // new
  PCR_HOA_Phone: String = ""; // new
  PCR_Prop_No_Of_Unit: String = "";
  PCR_Prop_Common_Entry: String = "";
  PCR_Prop_Unit1: String = "";
  PCR_Prop_Unit1_Occupied: String = ""; //ch
  PCR_Prop_Unit2: String = "";
  PCR_Prop_Unit2_Occupied: String = ""; //ch
  PCR_Prop_Unit3: String = "";
  PCR_Prop_Unit3_Occupied: String = ""; //ch
  PCR_Prop_Unit4: String = "";
  PCR_Prop_Unit4_Occupied: String = ""; //ch
  PCR_Prop_Property_Vacant: String = ""; // new
  PCR_Prop_Property_Vacant_Notes: String = ""; // new
  PCR_Prop_Occupancy_Verified_Contact_Owner: Boolean = false;
  PCR_Prop_Occupancy_Verified_Personal_Visible: Boolean = false;
  PCR_Prop_Occupancy_Verified_Neighbor: Boolean = false;
  PCR_Prop_Occupancy_Verified_Utilities_On: Boolean = false;
  PCR_Prop_Occupancy_Verified_Visual: Boolean = false;
  PCR_Prop_Occupancy_Verified_Direct_Con_Tenant: Boolean = false;
  PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor: Boolean = false;
  PCR_Prop_Occupancy_Verified_Direct_Con_Unknown: Boolean = false;
  PCR_Prop_Owner_Maintaining_Property: Boolean = false;
  PCR_Prop_Other: Boolean = false;
  PCR_Prop_Property: string = "";
  PRC_Prop_IsActive: Boolean = true;
  PRC_Prop_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  PRC_Prop_dateCompleted:any;
  PRC_Prop_badAddress: String = "";
  PRC_Prop_orderCompleted: String = "";
  PRC_Prop_PropertyVacantBadAddressProvide_dtls: String = "";
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_FiveBrotherModel {
  PCR_FiveBro_id: Number = 0;
  PCR_FiveBro_WO_ID: Number = 0;
  PCR_FiveBro_Propertyinfo: String = "";
  PCR_FiveBro_Violations: String = "";
  PCR_FiveBro_Securing: String = "";
  PCR_FiveBro_Winterization: String = "";
  PCR_FiveBro_Yard: String = "";
  PCR_FiveBro_Debris_Hazards: String = "";
  PCR_FiveBro_Roof: String = "";
  PCR_FiveBro_Pool: String = "";
  PCR_FiveBro_Utilities: String = "";
  PCR_FiveBro_Appliances: String = "";
  PCR_FiveBro_Damages: String = "";
  PCR_FiveBro_Conveyance: String = "";
  PCR_FiveBro_Integration_Type: String = "";
  PCR_FiveBro_IsIntegration: String = "";
  PCR_FiveBro_IsActive: Boolean = true;
  PCR_FiveBro_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  PCR_FiveBro_Json: any;
  PCR_FiveBro_Valtype: Number = 1;
  ModifiedBy:string;
}

export class PCR_Violation_Model {
  PCR_Violation_pkeyId: Number = 0;
  PCR_Violation_MasterID: Number = 0;
  PCR_Violation_WO_ID: Number = 0;
  PCR_Violation_ValType: Number = 2;
  PCR_Violation_Any_Citation: string = "";
  PCR_Violation_Describe_Citation: string = "";
  PCR_Violation_High_Vandalism_Area: string = "";
  PCR_Violation_Describe_High_Vandalism_Reason: string = "";
  PCR_Violation_Any_Unusual_Circumstances: string = "";
  PCR_Violation_Attached_Proof_Path: string = "";
  PCR_Violation_Attached_Proof_Size: Number = 0;
  PCR_Violation_Attached_NoticesPosted_FilePath: string = "";
  PCR_Violation_Attached_NoticesPosted_FileName: string = "";
  PCR_Violation_Describe: string = "";
  PCR_Violation_IsActive: boolean = true;
  PCR_Violation_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_Securing_Model {
  PCR_Securing_pkeyId: Number = 0;
  PCR_Securing_MasterId: Number = 0;
  PCR_Securing_WO_Id: Number = 0;
  PCR_Securing_ValType: Number = 3;
  PCR_Securing_On_Arrival: string = "";
  PCR_Securing_On_Departure: string = "";
  PCR_Securing_Not_Secure_Reason_Missing_Doors: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Door_Open: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Missing_Locks: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Broken_Windows: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Missing_Window: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Window_Open: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Broken_Door: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Bids_Pending: Boolean = false;
  PCR_Securing_Not_Secure_Reason_Damage_Locks: Boolean = false;
  PCR_Securing_Boarded_Arrival: string = "";
  PCR_Securing_No_Of_First_Floor_Window: string = "";
  PCR_Securing_More_Boarding_Still_Required_OR_Not: string = "";
  PCR_Securing_IsActive: boolean = true;
  PCR_Securing_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors: Boolean = false;
  PCR_Securing_Depart_Not_Secure_Reason_Door_Open: Boolean = false;
  PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks: Boolean = false;
  PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows: Boolean = false;
  PCR_Securing_Depart_Not_Secure_Reason_Missing_Window: Boolean = false;
  PCR_Securing_Depart_Not_Secure_Reason_Broken_Door: Boolean = false;
  PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending: Boolean = false;
  PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks: Boolean = false;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_ApplianceModel {
  PCR_Appliance_pkeyId: Number = 0;
  PCR_Appliance_MasterId: Number = 0;
  PCR_Appliance_WO_Id: Number = 0;
  PCR_Appliance_ValType: Number = 10;
  PCR_Appliance_Refrigerator: string = "";
  PCR_Appliance_Stove: string = "";
  PCR_Appliance_Stove_Wall_Oven: string = "";
  PCR_Appliance_Dishwasher: string = "";
  PCR_Appliance_Build_In_Microwave: string = "";
  PCR_Appliance_Dryer: string = "";
  PCR_Appliance_Washer: string = "";
  PCR_Appliance_Air_Conditioner: string = "";
  PCR_Appliance_Hot_Water_Heater: string = "";
  PCR_Appliance_Dehumidifier: string = "";
  PCR_Appliance_Furnace: string = "";
  PCR_Appliance_Water_Softener: string = "";
  PCR_Appliance_Boiler: string = "";
  PCR_Appliance_IsActive: boolean = true;
  PCR_Appliance_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_WinterizationModel {
  PCR_Winterization_pkeyId: Number = 0;
  PCR_Winterization_MasterId: Number = 0;
  PCR_Winterization_WO_Id: Number = 0;
  PCR_Winterization_ValType: Number = 4;
  PCR_Winterization_Upon_Arrival: string = "";
  PCR_Winterization_Compleate_This_Order_Yes: string = "";
  //  PCR_Winterization_Compleate_This_Order_No :string ="";
  //  PCR_Winterization_Compleate_This_Order_Partial :string ="";
  PCR_Winterization_Upon_Arrival_Never_Winterized: string = "";
  //PCR_Winterization_Upon_Arrival_Breached :string ="";
  PCR_Winterization_Reason_Wint_NotCompleted_Allowable: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Out_Season: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_TernedOff: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Other: Boolean = false;
  PCR_Winterization_Reason_Wint_NotCompleted_Other_Text: string = "";
  PCR_Winterization_Heating_System: string = "";
  //  PCR_Winterization_Heating_System_Well :string ="";
  //  PCR_Winterization_Radiant_Heat_System :string ="";
  //  PCR_Winterization_Radiant_Heat_System_Well :string ="";
  //  PCR_Winterization_Steam_Heat_System :string ="";
  //  PCR_Winterization_Steam_Heat_System_Well :string ="";
  PCR_Winterization_Posted_Signs: string = "";
  PCR_Winterization_Common_Water_Line: string = "";
  PCR_Winterization_AntiFreeze_Toilet: string = "";
  PCR_Winterization_Water_Heater_Drained: string = "";
  PCR_Winterization_Water_Off_At_Curb: string = "";
  PCR_Winterization_Blown_All_Lines: string = "";
  PCR_Winterization_System_Held_Pressure: string = "";
  PCR_Winterization_Disconnected_Water_Meter_Yes: string = "";
  PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve: string = "";
  PCR_Winterization_Disconnected_Water_Meter_No_Common_Water_Line: string = "";
  // tslint:disable-next-line: typedef-whitespace
  PCR_Winterization_Disconnected_Water_Meter_No_Unable_To_Locate: string = "";
  PCR_Winterization_Disconnected_Water_Meter_No_Prohibited_Ordinance: string = "";
  PCR_Winterization_Disconnected_Water_Meter_No_Others: string = "";
  PCR_Winterization_Radiant_Heat_Boiler_Drained: string = "";
  PCR_Winterization_Radiant_Heat_Zone_Valves_Opened: string = "";
  PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler: string = "";
  PCR_Winterization_If_Well_System_Breaker_Off: string = "";
  PCR_Winterization_If_Well_System_Pressure_Tank_Drained: string = "";
  PCR_Winterization_If_Well_System_Supply_Line_Disconnect: string = "";
  PCR_Winterization_Interior_Main_Valve_Shut_Off: string = "";
  PCR_Winterization_Interior_Main_Valve_Reason: string = "";
  PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System: string = "";
  PCR_Winterization_To_Bid: string = "";
  PCR_Winterization_To_Bit_Text: string = "";
  //  PCR_Winterization_Winterize :string ="";
  //  PCR_Winterization_Thaw :string ="";
  PCR_Winterization_Description: string = "";
  PCR_Winterization_System_Type: Number = 1;
  PCR_Winterization_Reason: string = "";
  PCR_Winterization_Amount: Number = 0;
  PCR_Winterization_Winterize_Men: string = "";
  PCR_Winterization_Winterize_Hrs: string = "";
  PCR_Winterization_IsActive: boolean = true;
  PCR_Winterization_IsDelete: boolean = false;
  PCR_Winterization_Disconnected_Water_Meter_Other_Text: string = "";
  PCR_Winterization_TextArea_Comment: string = "";
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_Yard_MaintenanceModel {
  PCR_Yard_Maintenance_pkeyId: Number = 0;
  PCR_Yard_Maintenance_MasterId: Number = 0;
  PCR_Yard_Maintenance_WO_Id: Number = 0;
  PCR_Yard_Maintenance_ValType: Number = 5;
  PCR_Yard_Maintenance_Grass_Cut_Completed: String = "";
  PCR_Yard_Maintenance_Lot_Size: String = "";
  PCR_Yard_Maintenance_Cuttable_Area: String = "";
  PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght: String = "";
  PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width: String = "";
  PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height: String = "";
  PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut: String = "";
  PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut: String = "";
  PCR_Yard_Maintenance_Bid_Recut: String = "";
  PCR_Yard_Maintenance_Reason_For_Recut: String = "";
  PCR_Yard_Maintenance_Trees_Cut_Back_Order: String = "";
  PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House: String = "";
  PCR_Yard_Maintenance_Arrival_Trees_Touching_House: String = "";
  PCR_Yard_Maintenance_Depature_Trees: String = "";
  PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines: String = "";
  PCR_Yard_Maintenance_Grass_Maintained_No: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Location: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House: boolean = false;
  PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure: boolean = false;
  PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View: boolean = false;
  PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing: boolean = false;
  PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage: String = "";
  PCR_Yard_Maintenance_Bid_To_Shrubs_Describe: String = "";
  PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Quantity: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Location: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House: boolean = false; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure: boolean = false; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View: boolean = false; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing: boolean = false; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage: String = ""; // new
  PCR_Yard_Maintenance_Bid_To_Trim_Describe: String = ""; // new
  PCR_Yard_Grass_LotSize: String = ""; // new
  PCR_Yard_Maintenance_IsActive: boolean = true;
  PCR_Yard_Maintenance_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_PoolModel {
  PCR_Pool_pkeyId: Number = 0;
  PCR_Pool_MasterId: Number = 0;
  PCR_Pool_WO_Id: Number = 0;
  PCR_Pool_ValType: Number = 8;
  PCR_Pool_Info_Pool_Present: string = "";
  PCR_Pool_Diameter_Ft: string = "";
  PCR_Pool_Length_Ft: string = "";
  PCR_Pool_Width_Ft: string = "";
  PCR_Pool_Condition_Good: string = "";
  PCR_Pool_Type_InGround: string = "";
  PCR_Pool_Secure_On_This_Order: string = "";
  PCR_Pool_Is_There_Fence: string = "";
  PCR_Pool_Is_It_Locked: string = "";
  PCR_Pool_Water_Level_Full: string = "";
  PCR_Pool_Did_You_Drain_It: string = "";
  PCR_Pool_Dismantled_Removed: string = "";
  PCR_Pool_Is_There_Depression_Left: string = "";
  PCR_Pool_Secured_Per_Guidelines: string = "";
  PCR_Pool_Is_The_Pool_Converted_Prevents_Entry: string = "";
  PCR_Pool_Hot_Tub_Present: string = "";
  PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover: string = "";
  PCR_Pool_Bid_To_Install_Safety_Cover: string = "";
  PCR_Pool_Bid_To_Drain: string = "";
  PCR_Pool_Bid_To_Dismantle: string = "";
  PCR_Pool_Drain_Remove: string = "";
  PCR_Pool_Bid_To_Fill_Hole: string = "";
  PCR_Pool_Size_Of_Hole: string = "";
  PCR_Pool_Cubic_Yds_Of_Dirt: string = "";
  PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers: string = "";
  PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained: string = "";
  PCR_Pool_Hot_Tub_Did_You_Secure: string = "";
  PCR_Pool_Hot_Tub_Bids_Diameter_Ft: string = "";
  PCR_Pool_Hot_Tub_Bids_Length_Ft: string = "";
  PCR_Pool_Hot_Tub_Bids_Width_Ft: string = "";
  PCR_Pool_Hot_Tub_Bids_Bid_To_Drain: string = "";
  PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover: string = "";
  PCR_Pool_Hot_Tub_Bids_Drain_Secure: string = "";
  PCR_Pool_IsActive: boolean = true;
  PCR_Pool_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_DebrisModel {
  PCR_Debris_pkeyId: Number = 0;
  PCR_Debris_Master_Id: Number = 0;
  PCR_Debris_WO_Id: Number = 0;
  PCR_Debris_ValType: Number = 6;
  PCR_Debris_Remove_Any_Interior_Debris: String = "";
  PCR_Debris_Is_There_Interior_Debris_Present: String = "";
  PCR_Debris_Describe: String = "";
  PCR_Debris_Cubic_Yards: String = "";
  PCR_Debris_Broom_Swept_Condition: String = "";
  PCR_Debris_Broom_Swept_Condition_Describe: String = "";
  PCR_Debris_Remove_Exterior_Debris: String = "";
  PCR_Debris_Exterior_Debris_Present: String = "";
  PCR_Debris_Exterior_Debris_Describe: String = "";
  PCR_Debris_Exterior_Debris_Cubic_Yard: String = "";
  PCR_Debris_Exterior_Debris_Visible_From_Street: String = "";
  PCR_Debris_Exterior_On_The_Lawn: String = "";
  PCR_Debris_Exterior_Vehicles_Present: String = "";
  PCR_Debris_Exterior_Vehicles_Present_Describe: String = "";
  PCR_Debris_Dump_Recipt_Name: String = "";
  PCR_Debris_Dump_Recipt_Address: String = "";
  PCR_Debris_Dump_Recipt_Phone: String = "";
  PCR_Debris_Dump_Recipt_Desc_what_was_Dump: String = "";
  PCR_Debris_Dump_Recipt_Means_Of_Disposal: String = "";
  PCR_Debris_InteriorHazards_Health_Present: String = "";
  PCR_Debris_InteriorHazards_Health_Present_Describe: String = "";
  PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard: String = "";
  PCR_Debris_Exterior_Hazards_Health_Present: String = "";
  PCR_Debris_Exterior_Hazards_Health_Present_Describe: String = "";
  PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards: String = "";
  PCR_Debris_IsActive: boolean = true;
  PCR_Debris_IsDelete: boolean = false;
  UserID: Number = 0;;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}


export class PCR_UtilitiesModel {
  PCR_Utilities_pkeyId: Number = 0;
  PCR_Utilities_MasterId: Number = 0;
  PCR_Utilities_WO_Id: Number = 0;
  PCR_Utilities_ValType: Number = 9;
  PCR_Utilities_On_Arrival_Water: String = "";
  PCR_Utilities_On_Departure_Water: String = "";
  PCR_Utilities_On_Arrival_Gas: String = "";
  PCR_Utilities_On_Departure_Gas: String = "";
  PCR_Utilities_On_Arrival_Electric: String = "";
  PCR_Utilities_On_Departure_Electric: String = "";
  PCR_Utilities_Sump_Pump: String = "";
  PCR_Utilities_Sump_Pump_Commend: String = "";
  PCR_Utilities_Sump_Pump_Sump_Test: String = "";
  PCR_Utilities_Main_Breaker_And_Operational: String = "";
  PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace: String = "";
  PCR_Utilities_Transferred_Activated: String = "";
  PCR_Utilities_Reason_UtilitiesNot_Transferred: String = "";
  PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes: String = "";
  PCR_Utilities_Transferred_Water_Co_Name: String = "";
  PCR_Utilities_Transferred_Water_Address: String = "";
  PCR_Utilities_Transferred_Water_Phone: String = "";
  PCR_Utilities_Transferred_Water_Acct: String = "";
  PCR_Utilities_Transferred_Gas_Co_Name: String = "";
  PCR_Utilities_Transferred_Gas_Address: String = "";
  PCR_Utilities_Transferred_Gas_Phone: String = "";
  PCR_Utilities_Transferred_Gas_Acct: String = "";
  PCR_Utilities_Transferred_Electric_Co_Name: String = "";
  PCR_Utilities_Transferred_Electric_Address: String = "";
  PCR_Utilities_Transferred_Electric_Phone: String = "";
  PCR_Utilities_Transferred_Electric_Acct: String = "";
  PCR_Utilities_IsActive: boolean = true;
  PCR_Utilities_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}


export class PCR_Damage_MasterModel {
  PCR_Damage_pkeyId: Number = 0;
  PCR_Damage_MasterId: Number = 0;
  PCR_Damage_WO_Id: Number = 0;
  PCR_Damage_ValType: Number = 11;
  PCR_Damage_Fire_Smoke_Damage_Yes: string = "";
  PCR_Damage_Mortgagor_Neglect_Yes: string = "";
  PCR_Damage_Vandalism_Yes: string = "";
  PCR_Damage_Freeze_Damage_Yes: string = "";
  PCR_Damage_Storm_Damage_Yes: string = "";
  PCR_Damage_Flood_Damage_Yes: string = "";
  PCR_Damage_Water_Damage_Yes: string = "";
  PCR_Damage_Wear_And_Tear_Yes: string = "";
  PCR_Damage_Unfinished_Renovation_Yes: string = "";
  PCR_Damage_Structural_Damage_Yes: string = "";
  PCR_Damage_Excessive_Humidty_Yes: string = "";
  PCR_Urgent_Damages_Roof_Leak_Yes: string = "";
  PCR_Urgent_Damages_Roof_Traped_Yes: string = "";
  PCR_Urgent_Damages_Mold_Damage_Yes: string = "";
  PCR_Urgent_Damages_SeePage_Yes: string = "";
  PCR_Urgent_Damages_Flooded_Basement_Yes: string = "";
  PCR_Urgent_Damages_Foundation_Cracks_Yes: string = "";
  PCR_Urgent_Damages_Wet_Carpet_Yes: string = "";
  PCR_Urgent_Damages_Water_Stains_Yes: string = "";
  PCR_Urgent_Damages_Floors_Safety_Yes: string = "";
  PCR_Urgent_Damages_Other_Causing_Damage_Yes: string = "";
  PCR_Urgent_Damages_Other_Safety_Issue_Yes: string = "";
  PCR_System_Damages_HVAC_System_Damage_Yes: string = "";
  PCR_System_Damages_Electric_Damage_Yes: string = "";
  PCR_System_Damages_Plumbing_Damage_Yes: string = "";
  PCR_System_Damages_Uncapped_Wire_Yes: string = "";
  PCR_Damages_FEMA_Damages_Yes: string = "";
  PCR_Damages_FEMA_Neighborhood_Level_Light: string = "";
  PCR_Damages_FEMA_Trailer_Present: string = "";
  PCR_Damages_FEMA_Property_Level_Light_Moderate: string = "";
  PCR_Damages_Property_Habitable: string = "";
  PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind: boolean = false;
  PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water: boolean = false;
  PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire: boolean = false;
  PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood: boolean = false;
  PCR_Damages_FEMA_Damage_Estimate: string = "";
  PCR_Damages_Damage: Number = 0;
  PCR_Damages_Status: Number = 0;
  PCR_Damages_Cause: Number = 0;
  PCR_Damages_Int_Ext: Number = 0;
  PCR_Damages_Building: Number = 0;
  PCR_Damages_Room: Number = 0;
  PCR_Damages_Description: string = "";
  PCR_Damages_Qty: string = "";
  PCR_Damages_Estimate: string = "";
  PCR_Damages_IsActive: boolean = true;
  PCR_Damages_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_ConveyanceModel {
  PCR_Conveyance_pkeyID: Number = 0;
  PCR_Conveyance_MasterID: Number = 0;
  PCR_Conveyance_Wo_ID: Number = 0;
  PCR_Conveyance_ValType: Number = 12;
  PCR_Conveyance_Work_Order_Instruction: string = "";
  PCR_Conveyance_Secured_Per_Guidelines: string = "";
  PCR_Conveyance_Additional_Damage: string = "";
  PCR_Conveyance_Bid_On_This_Visit: string = "";
  PCR_Conveyance_Need_Maintenance: string = "";
  PCR_Conveyance_Broom_Swept_Condition: string = "";
  PCR_Conveyance_HUD_Guidelines: string = "";
  PCR_Conveyance_Accidental_Entry: string = "";
  PCR_Conveyance_Features_Are_Secure: string = "";
  PCR_Conveyance_In_Place_Operational: string = "";
  PCR_Conveyance_Property_Of_Animals: string = "";
  PCR_Conveyance_Intact_Secure: string = "";
  PCR_Conveyance_Water_Instruction: string = "";
  PCR_Conveyance_Free_Of_Water: string = "";
  PCR_Conveyance_Moisture_has_Eliminated: string = "";
  PCR_Conveyance_Orderdinance: string = "";
  PCR_Conveyance_Uneven: string = "";
  PCR_Conveyance_Conveyance_Condition: string = "";
  PCR_Conveyance_Damage: boolean = false;
  PCR_Conveyance_Debris: boolean = false;
  PCR_Conveyance_Repairs: boolean = false;
  PCR_Conveyance_Hazards: boolean = false;
  PCR_Conveyance_Other: boolean = false;
  PCR_Conveyance_Describe: string = "";
  PCR_Conveyance_Note: string = "";
  PCR_Conveyance_Work_Order_Instruction_Reason: string = "";
  PCR_Conveyance_Secured_Per_Guidelines_Reason: string = "";
  PCR_Conveyance_HUD_Guidelines_Reasponce: string = "";
  PCR_Conveyance_Shrubs_or_tree: string = "";
  PCR_Conveyance_IsActive: boolean = true;
  PCR_Conveyance_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCR_RoofModel {
  PCR_Roof_pkeyId: Number = 0;
  PCR_Roof_MasterId: Number = 0;
  PCR_Roof_WO_Id: Number = 0;
  PCR_Roof_ValType: Number = 7;
  PCR_Roof_Roof_Shape_Pitched_Roof: String = "";
  PCR_Roof_Leak: String = "";
  PCR_Roof_Leak_Case: String = "";
  PCR_Roof_Leak_Other: String = "";
  PCR_Roof_Leak_Location_Dimension: String = "";
  PCR_Roof_Roof_Damage: string = ""; //add new
  PCR_Roof_Location_Dimensions: String = "";
  PCR_Roof_Water_Strains: String = "";
  PCR_Roof_Water_Strains_Case: String = ""; //add new
  PCR_Roof_Water_Strains_Dimension: string = "" // add new
  PCR_Roof_Did_You_Perform_Roof_Repair: String = "";
  PCR_Roof_Bid_To_Repair: String = "";
  PCR_Roof_Did_You_Perform_Emergency_Traping: String = "";
  PCR_Roof_Explain_Bid_Trap: String = "";
  PCR_Roof_Bid_To_Trap_Dimension_size_x: Number = 0;
  PCR_Roof_Bid_To_Trap_Dimension_size_y: Number = 0;
  PCR_Roof_Bid_To_Trap_Location: Number = 1;
  PCR_Roof_Bid_To_Trap_Description: String = "";
  PCR_Roof_Bid_To_Trap_Bid_Amount: Number = 0;
  PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x: Number = 0;
  PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y: Number = 0;
  PCR_Roof_Bid_To_Tar_Patch_Location: Number = 1;
  PCR_Roof_Bid_To_Tar_Patch_dias: String = "";
  PCR_Roof_Bid_To_Tar_Patch_Bid_Amount: Number = 0;
  PCR_Roof_Bid_To_Replace: String = "";
  PCR_Roof_Reason_Cant_Repair_Due_To: String = "";
  PCR_Roof_Reason_Cant_Repair_Due_To_TEXT: string = "";  // new filed
  PCR_Roof_Reason_Preventive_Due_To: String = "";
  PCR_Roof_Reason_Leaking: String = "";
  PCR_Roof_Reason_Other: String = "";
  PCR_Roof_Bid_To_Description: String = "";
  PCR_Roof_Bid_To_Location_Entire_Roof: boolean = false;
  PCR_Roof_Bid_To_Location_Front: boolean = false;
  PCR_Roof_Bid_To_Location_Back: boolean = false;
  PCR_Roof_Bid_To_Location_Left_Side: boolean = false;
  PCR_Roof_Bid_To_Location_Right_Side: boolean = false;
  PCR_Roof_Building_House: boolean = false;
  PCR_Roof_Building_Garage: boolean = false;
  PCR_Roof_Building_Out_Building: boolean = false;
  PCR_Roof_Building_Pool_House: boolean = false;
  PCR_Roof_Building_Shed: boolean = false;
  PCR_Roof_Building_Bam: boolean = false;
  PCR_Roof_Item_Used_Roof_Type: String = "";
  PCR_Roof_Item_Used_DRD: Number = 1;
  PCR_Roof_Item_Used_Size: Number = 0;
  PCR_Roof_Item_Used_Amount: Number = 0;
  PCR_Roof_Item_Used_Felt_Type: String = "";
  PCR_Roof_Item_Used_Felt_Type_DRD: Number = 1;
  PCR_Roof_Item_Used_Felt_Type_Size: Number = 0;
  PCR_Roof_Item_Used_Felt_Type_Amount: Number = 0;
  PCR_Roof_Item_Used_Sheathing: String = "";
  PCR_Roof_Item_Used_Sheathing_DRD: Number = 1;
  PCR_Roof_Item_Used_Sheathing_Size: Number = 0;
  PCR_Roof_Item_Used_Sheathing_Amount: Number = 0;
  PCR_Roof_Item_Used_Deck_Thikness: String = "";
  PCR_Roof_Item_Used_Deck_Thikness_DRD: Number = 1;
  PCR_Roof_Item_Used_Drip_Edge: String = "";
  PCR_Roof_Item_Used_Drip_Edge_Size: Number = 0;
  PCR_Roof_Item_Used_Drip_Edge_Amount: Number = 0;
  PCR_Roof_Item_Used_Ice_Water_Barrier: String = "";
  PCR_Roof_Item_Used_Ice_Water_Barrier_Size: Number = 0;
  PCR_Roof_Item_Used_Ice_Water_Barrier_Amount: Number = 0;
  PCR_Roof_Item_Used_No_Of_Vents: String = "";
  PCR_Roof_Item_Used_No_Of_Vents_Text: String = "";
  PCR_Roof_Item_Used_No_Of_Vents_Amount: Number = 0;
  PCR_Roof_Item_Used_Roof_Debris: String = "";
  PCR_Roof_Item_Used_Roof_Debris_Size: Number = 0;
  PCR_Roof_Item_Used_Roof_Debris_Amount: Number = 0;
  PCR_Roof_Item_Used_Dempster_Rental: String = "";
  PCR_Roof_Item_Used_Dempster_Rental_Size: Number = 0;
  PCR_Roof_Item_Used_Dempster_Rental_Amount: Number = 0;
  PCR_Bid_Amount: Number = 0;
  PCR_Roof_IsActive: boolean = true;
  PCR_Roof_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}

export class PCRGrassInfoModel {
  Grass_PkeyID: Number = 0;
  Grass_WO_ID: Number = 0;
  Grass_MasterID: Number = 0;
  Grass_ValType: Number = 1;
  Grass_GrassCutComp: String = "";
  Grass_UnableToCut: String = "";
  Grass_LotSize: String = "";
  Grass_OtherNote: String = "";
  Grass_ForSale: String = "";
  Grass_ForRent: String = "";
  Grass_RealtorPh: String = "";
  Grass_RealtorName: String = "";
  Grass_ExtDamage: String = "";
  Grass_FireDamage: String = "";
  Grass_NeglectDamage: String = "";
  Grass_VandalDamage: String = "";
  Grass_FrezeDamage: String = "";
  Grass_StormDamage: String = "";
  Grass_FloodDamage: String = "";
  Grass_RoofLeakDamage: String = "";
  Grass_ExtDamageNote: String = "";
  Grass_Occupancy: String = "";
  Grass_PropertySecure: String = "";
  Grass_PoolSecure: String = "";
  Grass_PoolPresent: String = "";
  Grass_ViolationPost: String = "";
  Grass_NotBoarded: String = "";
  Grass_Boarded: String = "";
  Grass_ExtDebPresent: String = "";
  Grass_TreeTouching: String = "";
  Grass_ShrubsTouching: String = "";
  Grass_dateCompleted:any;
  Grass_Comment: String = "";
  Type: Number = 1;
  fwo_pkyeId: Number = 0;
  ModifiedBy:string;
}
