export class MSI_PCR_PreservationFormMasterModel{
  MSI_Preservation_PkeyId:number;
  MSI_Preservation_WO_ID:number;
  MSI_Preservation_CompanyId:number;
  MSI_Preservation_SubjectProperty:any;
  MSI_Preservation_ConditionReport:any;
  MSI_Preservation_BidItems:any;
  MSI_Preservation_PhotoManager:any;
  MSI_Preservation_Comments:any;
  MSI_Preservation_FinalReviews:any;
  MSI_Preservation_IsActive:boolean;
  MSI_Preservation_IsDelete:boolean;
  ModifiedBy:string;
  fwo_pkyeId:number;
  Type:number;

}

export class MSI_Preservation_SubjectProperty{
  MSI_SP_MapCode:string;
  MSI_SP_HomePhoneNo:string;
  MSI_SP_LawnSize:string;
  MSI_SP_keyedTo:string;
  MSI_SP_Condition:string;
  MSI_SP_AreThereDamages:string;
  MSI_SP_EyeBallEstmateofDamages:string;
  MSI_SP_DateWorkWasCompleted:string;
  MSI_SP_AspenAbcNo:string;
  MSI_SP_OccupancyStatus:string;
  MSI_SP_OccupancyVerifiedBy:string;
  MSI_SP_RealtorName:string;
  MSI_SP_RealtorPhoneNo:string;
  MSI_SP_TenentName:string;
  MSI_SP_TenentPhoneNo:string;
  MSI_SP_WinterizedBy:string;
  MSI_SP_WinterizeDate:string;
  MSI_SP_WinterizeCompleteness:string;
  MSI_SP_Reviews:string;
}

export class MSI_Preservation_ConditionReport{

  //Security
  MSI_CR_Security_WindowsBroken:string;
  MSI_CR_Security_WindowsBrokenComment:string;
  MSI_CR_Security_RoofLeak:string;
  MSI_CR_Security_RoofLeakComment:string;
  MSI_CR_Security_Vandalism:string;
  MSI_CR_Security_VandalismComment:string;
  MSI_CR_Security_FireDamage:string;
  MSI_CR_Security_FireDamageComment:string;
  MSI_CR_Security_WaterDamage:string;
  MSI_CR_Security_WaterDamageComment:string;
  MSI_CR_Security_SwimmingPool:string;
  MSI_CR_Security_SwimmingPoolComment:string;
  MSI_CR_Security_PoolAreaSecure:string;
  MSI_CR_Security_PoolAreaSecureComment:string;
  MSI_CR_Security_ForSaleSign:string;
  MSI_CR_Security_ForSaleSignComment:string;
  MSI_CR_Security_PreviousluReported:string;
  MSI_CR_Security_PreviousluReportedComment:string;
  MSI_CR_Security_PhotoAttached:string;
  MSI_CR_Security_PhotoAttachedComment:string;
  MSI_CR_Security_LockKeys:string;
  MSI_CR_Security_LockKeysComment:string;
  MSI_CR_Security_Padlocks:string;
  MSI_CR_Security_PadlocksComment:string;
  MSI_CR_Security_KeysEnclosed:string;
  MSI_CR_Security_KeysEnclosedComment:string;


  // WINTERIZATION
  MSI_CR_Winterization_UtilitiesOff:string;
  MSI_CR_Winterization_UtilitiesOffComment:string;
  MSI_CR_Winterization_WaterOff:string;
  MSI_CR_Winterization_WaterOffComment:string;
  MSI_CR_Winterization_BurstPipes:string;
  MSI_CR_Winterization_BurstPipesComment:string;
  MSI_CR_Winterization_FreezeDamage:string;
  MSI_CR_Winterization_FreezeDamageComment:string;
  MSI_CR_Winterization_AllFixturesDamage:string;
  MSI_CR_Winterization_AllFixturesDamageComment:string;
  MSI_CR_Winterization_AllPipesBrownOut:string;
  MSI_CR_Winterization_AllPipesBrownOutComment:string;
  MSI_CR_Winterization_BoilerHeatingSystemDrained:string;
  MSI_CR_Winterization_BoilerHeatingSystemDrainedComment:string;
  MSI_CR_Winterization_AntiFreezeInstalledInTraipsFixtures:string;
  MSI_CR_Winterization_AntiFreezeInstalledInTraipsFixturesComment:string;
  MSI_CR_Winterization_WinterizationAffixed:string;
  MSI_CR_Winterization_WinterizationAffixedComment:string;
  MSI_CR_Winterization_SumpPumpOnSite:string;
  MSI_CR_Winterization_SumpPumpOnSiteComment:string;

  //MOBIOLE HOME IMFORMATION

  MSI_CR_MobioleInfo_MobioleHomeYear:string;
  MSI_CR_MobioleInfo_MobioleHomeMake:string;
  MSI_CR_MobioleInfo_MobioleHomeModel:string;
  MSI_CR_MobioleInfo_MobioleHomeLenght:string;
  MSI_CR_MobioleInfo_MobioleHomeWidth:string;
  MSI_CR_MobioleInfo_MobioleHomeSize:string;
  MSI_CR_MobioleInfo_MobioleHomeVinNumber:string;
  MSI_CR_MobioleInfo_MobioleHomeHodTagNumber:string;
  MSI_CR_MobioleInfo_MobioleSerialNumber:string;
  MSI_CR_MobioleInfo_TounghsWheelsAxelsAffected:string;
  MSI_CR_MobioleInfo_TounghsWheelsAxelsAffectedComment:string;
  MSI_CR_MobioleInfo_AffectedFoundation:string;
  MSI_CR_MobioleInfo_AffectedFoundationComment:string;
  MSI_CR_MobioleInfo_Skirted:string;
  MSI_CR_MobioleInfo_SkirtedComment:string;


  //DEBRIS REMOVAL
  MSI_CR_Debris_HealthHazardMaterials:string;
  MSI_CR_Debris_HealthHazardMaterialsComment:string;
  MSI_CR_Debris_ExteriorRemoved:string;
  MSI_CR_Debris_ExteriorRemovedComment:string;
  MSI_CR_Debris_InteriorRemoved:string;
  MSI_CR_Debris_InteriorRemovedComment:string;
  MSI_CR_Debris_CityViolation:string;
  MSI_CR_Debris_CityViolationComment:string;
  MSI_CR_Debris_PersonalPropertyRemoved:string;
  MSI_CR_Debris_PersonalPropertyRemovedComment:string;
  MSI_CR_Debris_LownWovedSizeYard:string;
  MSI_CR_Debris_LownWovedSizeYardComment:string;
  MSI_CR_Debris_Comment:string;
  MSI_CR_Debris_ExteriorGeneralCondition:string;
  MSI_CR_Debris_InteriorGeneralCondition:string;
  MSI_CR_Debris_AvidenceOfMOLD:string;
  MSI_CR_Debris_RegionalAndLocalRegulation:string;
  MSI_CR_Debris_RegionalAndLocalRegulationComment:string;
  MSI_CR_Debris_BidSubmmitted:string;
  MSI_CR_Debris_PersonalPropertyLeftInHouse:string;
  MSI_CR_Debris_PropertyOccupiedOnArrival:string;
  MSI_CR_Debris_DeterminedBy:string;
  MSI_CR_Debris_PreparedBy:string;
  MSI_CR_Debris_DatePrepared:string;


  // LIVING ROOM
  MSI_CR_LivingRool_WallPannel:string;
  MSI_CR_LivingRool_WallPannelComment:string;
  MSI_CR_LivingRool_FloorCovering:string;
  MSI_CR_LivingRool_FloorCoveringComment:string;
  MSI_CR_LivingRool_SubFloor:string;
  MSI_CR_LivingRool_SubFloorComment:string;
  MSI_CR_LivingRool_Ceiling:string;
  MSI_CR_LivingRool_CeilingComment:string;
  MSI_CR_LivingRool_WindowGlass:string;
  MSI_CR_LivingRool_WindowGlassComment:string;

  //DINING ROOM
  MSI_CR_DiningRoom_WallPannel:string;
  MSI_CR_DiningRoom_WallPannelComment:string;
  MSI_CR_DiningRoom_FloorCovering:string;
  MSI_CR_DiningRoom_FloorCoveringComment:string;
  MSI_CR_DiningRoom_SubFloor:string;
  MSI_CR_DiningRoom_SubFloorComment:string;
  MSI_CR_DiningRoom_Ceiling:string;
  MSI_CR_DiningRoom_CeilingComment:string;
  MSI_CR_DiningRoom_WindowGlass:string;
  MSI_CR_DiningRoom_WindowGlassComment:string;

  //BEDROOMS
  MSI_CR_BedRoom_WallPannel:string;
  MSI_CR_BedRoom_WallPannelComment:string;
  MSI_CR_BedRoom_FloorCovering:string;
  MSI_CR_BedRoom_FloorCoveringComment:string;
  MSI_CR_BedRoom_SubFloor:string;
  MSI_CR_BedRoom_SubFloorComment:string;
  MSI_CR_BedRoom_Ceiling:string;
  MSI_CR_BedRoom_CeilingComment:string;
  MSI_CR_BedRoom_WindowGlass:string;
  MSI_CR_BedRoom_WindowGlassComment:string;

  //BATHROOMS
  MSI_CR_BathRoom_WallPannel:string;
  MSI_CR_BathRoom_WallPannelComment:string;
  MSI_CR_BathRoom_FloorCovering:string;
  MSI_CR_BathRoom_FloorCoveringComment:string;
  MSI_CR_BathRoom_SubFloor:string;
  MSI_CR_BathRoom_SubFloorComment:string;
  MSI_CR_BathRoom_Ceiling:string;
  MSI_CR_BathRoom_CeilingComment:string;
  MSI_CR_BathRoom_WindowGlass:string;
  MSI_CR_BathRoom_WindowGlassComment:string;

  //KITCHEN / UTILITY

  MSI_CR_Kitchen_Sink:string;
  MSI_CR_Kitchen_SinkComment:string;
  MSI_CR_Kitchen_Cabinents:string;
  MSI_CR_Kitchen_CabinentsComment:string;
  MSI_CR_Kitchen_WallPannel:string;
  MSI_CR_Kitchen_WallPannelComment:string;
  MSI_CR_Kitchen_FloorCovering:string;
  MSI_CR_Kitchen_FloorCoveringComment:string;
  MSI_CR_Kitchen_SubFloor:string;
  MSI_CR_Kitchen_SubFloorComment:string;
  MSI_CR_Kitchen_Ceiling:string;
  MSI_CR_Kitchen_CeilingComment:string;
  MSI_CR_Kitchen_WindowGlass:string;
  MSI_CR_Kitchen_WindowGlassComment:string;
  MSI_CR_Kitchen_Dishwasher:string;
  MSI_CR_Kitchen_DishwasherComment:string;
  MSI_CR_Kitchen_Clotheswasher:string;
  MSI_CR_Kitchen_ClotheswasherComment:string;
  MSI_CR_Kitchen_ClothesDryer:string;
  MSI_CR_Kitchen_ClothesDryerComment:string;

  //APPLIANCES
  MSI_CR_Appliances_FurnHeatPump:string;
  MSI_CR_Appliances_FurnHeatPumpComment:string;
  MSI_CR_Appliances_AirConditioner:string;
  MSI_CR_Appliances_AirConditionerComment:string;
  MSI_CR_Appliances_WaterHeater:string;
  MSI_CR_Appliances_WaterHeaterComment:string;
  MSI_CR_Appliances_Range:string;
  MSI_CR_Appliances_RangeComment:string;
  MSI_CR_Appliances_Refrigerator:string;
  MSI_CR_Appliances_RefrigeratorComment:string;

  //REVIEW AND SUBMIT
  MSI_CR_Review:string;
}
