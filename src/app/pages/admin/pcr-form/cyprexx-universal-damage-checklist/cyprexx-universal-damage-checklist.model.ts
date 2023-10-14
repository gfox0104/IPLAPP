export class PCR_Cyprexx_Universal_Damage_Modal{
  PCR_CU_PkeyID:number;
  PCR_CU_WO_ID:number;
  PCR_CU_CompanyID:number;
  PCR_CU_General_Info:any;
  PCR_CU_Interior_Access_Information:any;
  PCR_CU_Upload_Photos:any;
  PCR_CU_IsActive:Boolean;
  PCR_CU_IsDelete:Boolean;
  ModifiedBy:string;
  fwo_pkyeId:number;
  Type:number;
}


export class PCR_CU_General_Info{
  PCR_GI_Vendor:string;
  PCR_GI_LoanNumber:string;
  PCR_GI_PropertyAddress:string;
  PCR_GI_LockBoxCode:string;
  PCR_GI_GateCode:string;

  PCR_GI_LocateProperty:string;
  PCR_GI_LocateProperty_AccessDenied:string;
  PCR_GI_LocateProperty_AccessDeniedOther:string;

  PCR_GI_AccessProperty:string;
  PCR_GI_AccessProperty_AccessDenied:string;
  PCR_GI_AccessProperty_AccessDeniedOther:string;

  PCR_GI_IsPropertyForSale:string;
  PCR_GI_PropertyType:string;
  PCR_GI_PropertyTypeOtherExplain:string;
  PCR_GI_IsMissingAddressNumber:string;
  PCR_GI_ComcensExistOnProperty:string;
  PCR_GI_IsPropertyOccupiedOrVacant:string;

  PCR_GI_HowasOccupancyVerified:string;
  PCR_GI_Name_Of_Occupant : string;
  PCR_GI_Occupar_Phone : string;
  PCR_GI_property_threaten_your_life_physically_assault:string;
  PCR_GI_WhichUnitAreVacant:string;
  PCR_GI_MobileHome:string;

  PCR_GI_IsNoFuenitureInHouse:string;
  PCR_GI_IsNoticesPostedAtProperty:string;
  PCR_GI_IsFlyersNewspapersOnPorch:string;
  PCR_GI_IsDecorationNotInSeason:string;
  PCR_GI_IsOverflowingMailbox:string;
  PCR_GI_IsBoardedOpenings:string;
  PCR_GI_IsPropertyDamageVandalism:string;
  PCR_GI_IsUtilitiesOff:string;
  PCR_GI_IsInoperableVehlcles:string;
  PCR_GI_IsConfirmedByNeighbor:string;
  PCR_GI_IsStructurallyUnsafe:string;
  PCR_GI_IsMeterRremoved:string;
  PCR_GI_IsUnsecureProperty:string;
  PCR_GI_IsNoWindowCoverings:string;
  PCR_GI_IsLargeCobwebsOverTheEntryDoor:string;
  PCR_GI_IsPoolOnSiteAndNotMaintained:string;
  PCR_GI_IsOther:string;



  PCR_GI_DoorsOrWindowsBrokenOrBoarded:string;
  PCR_GI_BoardupDamageLocation:string;
  PCR_GI_DatachedStructures_BoardedOrSecured:string;
  PCR_GI_IsPoolOrHotTubPresent:string;

  PCR_GI_PoolType_InGroundPool:string;
  PCR_GI_PoolType_AboveGroundPool:string;
  PCR_GI_PoolType_HotTub:string;
  PCR_GI_PoolType_Other:string;
  PCR_GI_PoolDamage:string;
  PCR_GI_Pool_LocationAndDesc:string;
  PCR_GI_Pool_Dimensions:string;
  PCR_GI_Pool_EquipmentMissing:string;


  PCR_GI_ExteriorDamage_Gutters:string;
  PCR_GI_ExteriorDamage_Soffit:string;
  PCR_GI_ExteriorDamage_Drainage:string;
  PCR_GI_ExteriorDamage_Trap:string;
  PCR_GI_ExteriorDamage_Roof:string;
  PCR_GI_ExteriorDamage_Foundation:string;
  PCR_GI_ExteriorDamage_Paint:string;
  PCR_GI_ExteriorDamage_Masonry:string;
  PCR_GI_ExteriorDamage_Siding:string;
  PCR_GI_ExteriorDamage_Electrical:string;
  PCR_GI_ExteriorDamage_Plumbing:string;
  PCR_GI_ExteriorDamage_DecksOrPorches:string;
  PCR_GI_ExteriorDamage_Fences:string;
  PCR_GI_ExteriorDamage_None:string;
  PCR_GI_ExteriorDamage_Other:string;


  PCR_GI_Gutter_Description:string;
  PCR_GI_Gutter_Damage:string;

  PCR_GI_Soffit_Description:string;
  PCR_GI_Soffit_Damage:string;

  PCR_GI_Drainage_Description:string;
  PCR_GI_Drainage_Damage:string;

  PCR_GI_Trap_Description:string;
  PCR_GI_Trap_Damage:string;

  PCR_GI_Roof_Description:string;
  PCR_GI_Roof_Damage:string;

  PCR_GI_Foundation_Description:string;
  PCR_GI_Foundation_Damage:string;

  PCR_GI_Paint_Description:string;
  PCR_GI_Paint_Damage:string;

  PCR_GI_Masonry_Description:string;
  PCR_GI_Masonry_Damage:string;

  PCR_GI_Siding_Description:string;
  PCR_GI_Siding_Damage:string;

  PCR_GI_Electrical_Description:string;
  PCR_GI_Electrical_Damage:string;

  PCR_GI_Plumbing_Description:string;
  PCR_GI_Plumbing_Damage:string;

  PCR_GI_DecksOrPorches_Description:string;
  PCR_GI_DecksOrPorches_Damage:string;

  PCR_GI_Fences_Description:string;
  PCR_GI_Fences_Damage:string;

}
export class PCR_CU_Interior_Access_Information{
  PCR_IAI_IsAccessInterior:string;
  PCR_IAI_IsAccessInterior_Sub:string;
  PCR_IAI_IsAccessInterior_Explain:string;

  PCR_IAI_KnoblockKeycode:string;
  PCR_IAI_KnoblockLocation_Front:string;
  PCR_IAI_KnoblockLocation_Secondary:string;
  PCR_IAI_KnoblockLocation_Other:string;

  PCR_IAI_KnoblockLocation_OtherText:string;


  PCR_IAI_DeadboltKeycode:string;
  PCR_IAI_DeadboltLocation_Front:string;
  PCR_IAI_DeadboltLocation_Secondary:string;
  PCR_IAI_DeadboltLocation_Other:string;
  PCR_IAI_DeadboltLocation_OtherText:string;


  PCR_IAI_LockboxKeycode:string;
  PCR_IAI_LockboxLocation_Front:string;
  PCR_IAI_LockboxLocation_Secondary:string;
  PCR_IAI_LockboxLocation_Other:string;


  PCR_IAI_PadlockKeycode:string;
  PCR_IAI_PadlockLocation_Front:string;
  PCR_IAI_PadlockLocation_Secondary:string;
  PCR_IAI_PadlockLocation_Other:string;
  PCR_IAI_PadlockLocation_OtherExplain:string;


  PCR_IAI_WinterizationType:string;
  PCR_IAI_the_Winterization_is_compromised:String;
  PCR_IAI_Utility_Heat_Source:string;
  PCR_IAI_WaterTurnedAtMainInterior :string;
  PCR_IAI_IsAtticPresent :string;

  PCR_IAI_IsInteriorDamages :string;
  PCR_IAI_InteriorDamage_Kitchen :string;
  PCR_IAI_InteriorDamage_DiningRoom :string;
  PCR_IAI_InteriorDamage_Utility :string;
  PCR_IAI_InteriorDamage_Garage :string;
  PCR_IAI_InteriorDamage_Basement :string;
  PCR_IAI_InteriorDamage_Stairs :string;
  PCR_IAI_InteriorDamage_Foyer :string;
  PCR_IAI_InteriorDamage_Hall :string;
  PCR_IAI_InteriorDamage_Bedrooms :string;
  PCR_IAI_InteriorDamage_Bathrooms :string;
  PCR_IAI_InteriorDamage_Closet :string;
  PCR_IAI_InteriorDamage_LivingRoom :string;
  PCR_IAI_InteriorDamage_Attic :string;
  PCR_IAI_InteriorDamage_Other :string;


  PCR_IAI_DiningRoom_Location :string;
  PCR_IAI_DiningRoom_Dimensions :string;

  PCR_IAI_Utility_Location :string;
  PCR_IAI_Utility_Dimensions :string;

  PCR_IAI_Garage_Location :string;
  PCR_IAI_Garage_Dimensions :string;

  PCR_IAI_Basement_Location :string;
  PCR_IAI_Basement_Dimensions :string;

  PCR_IAI_Stairs_Location :string;
  PCR_IAI_Stairs_Dimensions :string;

  PCR_IAI_Foyer_Location :string;
  PCR_IAI_Foyer_Dimensions :string;

  PCR_IAI_Hall_Location :string;
  PCR_IAI_Hall_Dimensions :string;


  PCR_IAI_Bathrooms_Location :string;
  PCR_IAI_Bathrooms_Dimensions :string;

  PCR_IAI_Closet_Location :string;
  PCR_IAI_Closet_Dimensions :string;

  PCR_IAI_LivingRoom_Location :string;
  PCR_IAI_LivingRoom_Dimensions :string;

  PCR_IAI_Attic_Location :string;
  PCR_IAI_Attic_Dimensions :string;

  PCR_IAI_Other_Location :string;
  PCR_IAI_Other_Dimensions :string;



  PCR_IAI_AppliancesPresent_BuiltInMicrowave :string;
  PCR_IAI_AppliancesPresent_CookTop :string;
  PCR_IAI_AppliancesPresent_Dishwasher :string;
  PCR_IAI_AppliancesPresent_GarbageDisposal :string;
  PCR_IAI_AppliancesPresent_Range :string;
  PCR_IAI_AppliancesPresent_Refrigerator :string;
  PCR_IAI_AppliancesPresent_VentilationHood :string;
  PCR_IAI_AppliancesPresent_ClothesWasherOrDryer :string;
  PCR_IAI_AppliancesPresent_OtherAppliances :string;
  PCR_IAI_AppliancesPresent_NoAppliances :string;


  PCR_IAI_KitchenDamagesLocation :string;
  PCR_IAI_KitchenDamagesDimensions :string;
  PCR_IAI_BedroomsDamagesLocation :string;
  PCR_IAI_BedroomsDamagesDimensions :string;
  PCR_IAI_OtherRoomInteriorDamageLocation :string;
  PCR_IAI_OtherRoomInteriorDamageDimensions :string;
  PCR_IAI_IsPropertyHaveBasement :string;
  PCR_IAI_IsPropertyHaveBasement_Footage :string;

  PCR_IAI_Issupmpumppresent :String;
  PCR_IAI_crockpresentandusableforsupmpump :String;
  PCR_IAI_supmpumpoperational:string;
  PCR_IAI_Damaged:string;
  PCR_IAI_Electric_Off:string;
  PCR_IAI_Missing:string;
  PCR_IAI_Ifsupmpump_required:String;
  PCR_IAI_IsWaterHeaterMissing :string;

  PCR_IAI_PresentUtilityMeters_ElectricMeter:string;
  PCR_IAI_PresentUtilityMeters_GasMeter:string;
  PCR_IAI_PresentUtilityMeters_WaterMeter:string;


  PCR_IAI_UtilityMetersRunning_ElectricMeter:string;
  PCR_IAI_UtilityMetersRunning_GasMeter:string;
  PCR_IAI_UtilityMetersRunning_WaterMeter:string;
  PCR_IAI_UtilityMetersRunning_NA:string;


  PCR_IAI_SharedUtilities_Electric:string;
  PCR_IAI_SharedUtilities_Gas:string;
  PCR_IAI_SharedUtilities_Water:string;
  PCR_IAI_SharedUtilities_Other:string;
  PCR_IAI_SharedUtilities_NA:string;

  PCR_IAI_other_shared_utility:string;

  PCR_IAI_IsPropertyConnectedToSewerOrSeptic:string;
  PCR_IAI_IsElectricalBreakerPanel_MissingOrDamage:string;
  PCR_IAI_Is_HVAC_UnitsMissing:string;
  PCR_IAI_IsLeakingGroundHeatingOilTank :string;
  PCR_IAI_IsAboveGroundPropaneGasTank :string;
  PCR_IAI_IsSharedWall :string;
  PCR_IAI_EnvironmentalHazardExists :string;
  PCR_IAI_ApproximateCostOfRepairs :string;
  PCR_IAI_GeneralDescription_ExteriorOrInterior :string;
  PCR_IAI_CompletionDate :string;
  PCR_IAI_VendorSignature :string;
  PCR_IAI_Company :string;
}
