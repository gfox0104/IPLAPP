export class NFR_Processing_Form_Master{
  PCR_PkeyID:number;
  PCR_WO_ID:number;
  PCR_Company_ID:number;
  PCR_General:any;
  PCR_Utilities:any;
  PCR_Securing:any;
  PCR_Winterization:any;
  PCR_Bording:any;
  PCR_Debris:any;
  PCR_Roof:any;
  PCR_Moisture:any;
  PCR_Yard:any;
  PCR_Damages:any;
  PCR_Others:any;
  PCR_PhotoCheckList:any;
  PCR_Summary:any;
  PCR_IsActive:boolean;
  PCR_IsDelete:boolean;
  ModifiedBy:string;
  fwo_pkyeId:number;
  Type:number;
}

export class NRFP_General
{
  DateWorkStartedAtProperty:string;
  DateWorkCompletedAtProperty:string;
  DoYouLocateTheProperty:string='';
  CouldYouProceedWithThisPCR:string='';
  WasThereContactWithAnyOnSite:string='';
  ConfirmYouWereAtTheCorrectProperty:string='';
  IsTheHouseNumberOnTheProperty:string='';
  IsThePropertyInHighVandalismArea:string='';
  IsThePropertyLocatedInGatedCommunity:string='';
  IsThePropertyPartOfHomeownersAssociation:string='';
  IsThisMultifamilyUnitProperty:string='';
  Occupancy:string='';
  Furnished:string='';
  SecureOnArrival:string='';
  AreAnyWindowsBoarded:string='';
  VerifiedBy:string='';
  SecureOnDeparture:string='';
  AreAnyDoorsBorded:string='';
  AreThereCommonLines:string='';
  IsThereFireSuppressionSystemInstalled:string='';
  AreThereAnyPostedViolationsOrNotices:string='';
  IsTherePoolOnTheProperty:string='';
  IsThereHotTubOrSpaOnTheProperty:string='';
  IsTherePondWaterGardenOrOtherWaterFeature:string='';
  Name:string;
  GarageStyle:string='';
  SecureOnArrival2:string='';
  Dimensions:string;
  Feet:string;
  SecureOnDeparture2:string='';
  AreThereAnyShedsOutbuildingOnTheProperty:string='';
}
export class NRFP_Utilities
{
  Water:string='';
  Water_Building:string='';
  Water_CurbValve:string='';
  Water_MainValve:string='';
  Water_IsWaterNeeded:string='';
  Water_Meter :string;
  Water_Provider1 :string;
  Water_Provider2 :string;

  Electric_Building :string='';
  Electric_Status :string='';
  Electric_IsElectricityNeeded :string='';
  Electric_Meter  :string;
  Electric_Provider1  :string;
  Electric_Provider2  :string;

  Heating_Building :string='';
  Heating_Fuel :string='';
  Heating_IsHeatNeeded :string='';
  Heating_SystemStatus :string='';
}
export class NRFP_Securing
{
  Building:string='';
  Completed:string='';
  Location_Fornt:string;
  Location_Crawlspace:string;
  Location_Slider:string;
  Location_GarageOverhead:string;
  Location_Rear:string;
  Location_Basement:string;
  Location_PoolGeat:string;
  Location_GarageMandoor:string;
  Location_Side:string;
  Location_BulkheadOrBilco:string;
  Location_HottubOrSpa:string;
  Location_Other:string;
  WasThereLockboxOnSideUponArrival:string='';
  LockStyle:string='';
  Quantity:string='';
  WereAllLocksChanged:string='';
  LockCode:string='';
  PriceEach:string='';
}
export class NRFP_Winterization
{
  Building:string='';
  Completed:string='';
  Status:string='';
  PleaseExplain:string;
}
export class NRFP_Boarding
{
  Completed:string='';
  Action:string='';
  Reason:string='';
  Building:string='';
  Room:string='';
  Quantity:string='';
  PriceEach:string;
  OpeningType:string='';
  Level:string='';
  Dimensions:string;
  Inches:string;
}
export class NRFP_Debris
{
  StateRequires:string='';
}
export class NRFP_Roof
{
  IsThereATrapPresent:string;
  IsThereAnActiveLeak:string;
  IsThereAnyVisibleDamage:string;
}
export class NRFP_Moisture
{
  IsThereMoisture:string='';
  IsMoldPresent:string='';
  SumpPumpOnSite:string='';
  IsSumpPumpPitPresent:string='';
  IsThereEvidenceOfPreviouslyInstalledSumpPump:string='';
  Dehumidifiers:string='';
}

export class NRFP_Yard
{
  Completed:string='';
  WhywereyouunabletoComplete:string='';
  CutType:string='';
  Pleasedescribethecuttype:string='';
  Price:string='';
  LotSize:string='';
  feet:string='';
  GrassHeight:string='';
  Grassdifferentheights:string='';
  RecutBid:string='';
  shrubberyCompleted:string='';
  Type:string='';
  Description:string='';
  Location:string='';
  CausingDamage:string='';
  Whatisbeingdamaged:string='';
  Howisthedamagebeingcaused:string='';
  Whatextentisthedamage:string='';
  Pleasedescribetheshrublocation:string='';
  Comments:string='';
  Clippings:string='';
  shrubberyPrice:string='';
  Pleasedescribetheshrubtype:string='';
  ShrubsHeight:string='';
  ShrubsLength:string='';
  ShrubsWidth:string='';
  ShrubsQuantity:string='';
  TreesHeight:string='';
  TreesDiameter:string='';
  TreesQuantity:string='';
  VinesHeight:string='';
  VinesLength:string='';
  VinesongroundHeight:string='';
  VinesongroundCoverage:string='';



}
export class NRFP_Damages
{
  DamageReport_Fire:string;
  DamageReport_FoodNaturalDisaster:string;
  DamageReport_Storm:string;
  DamageReport_Earthquake:string;
  DamageReport_Hurricane:string;
  DamageReport_Tornado:string;
  DamageReport_BoilerExplosion:string;
  DamageReport_OilSpill:string;
  DamageReport_Vandalism:string;
  DamageReport_UnfinishedRemodeling:string;
  DamageReport_HVACCentralAirDamagedOrMissing:string;
  DamageReport_WaterHeaterDamagedOrMissing:string;
  DamageReport_HeatSourceDamagedOrMissing:string;
  DamageReport_BrokenOrMissingElectricalFixtures:string;
  DamageReport_MissingOutletCovers:string;
  DamageReport_ExposedElectricalWires:string;
  DamageReport_ElectricalWiring:string;
  DamageReport_DamageToPlumbingSystemOrFixtures:string;
  DamageReport_WaterDamage:string;
  DamageReport_DamagedDrywallCosmetic:string;
  DamageReport_DamagedOrMissingGuttersOrDownspouts:string;
  DamageReport_TripHazardInteriorExterior:string;
  DamageReport_HandrailsAndSafetyRails:string;
  DamageReport_EvidenceOfPestInfestations:string;
  DamageReport_EvidenceOfSignificantStructuralDamage:string;
  DamageReport_Other:string;

  DamageReport_ActiveRoofLeak:string;
  DamageReport_OpenGasAndPlumbingLines :string;
  DamageReport_StandingWater :string;
  DamageReport_MoldTreatmentAndRemoving :string;

  DamageReport_DamagesWereNoted :string;
}
export class NRFP_PhotoChecklist
{
  VerificationPhotos_SecuringSticker:string;
  VerificationPhotos_ViolationsOrOtherPostings:string;
  VerificationPhotos_StreetSign:string;
  VerificationPhotos_HouseNumber:string;
  VerificationPhotos_FrontHouse:string;

  ExteriorConditionPhotos_HeatingCoolingMechanicals:string;
  ExteriorConditionPhotos_UtilityMeters:string;
  ExteriorConditionPhotos_AllSidesOfHouse:string;
  ExteriorConditionPhotos_ExteriorGrounds:string;
  ExteriorConditionPhotos_RoofChimney:string;
  ExteriorConditionPhotos_GarageOutbuildingsExterior:string;

  SecuringConditionPhotos_KnobLock:string;
  SecuringConditionPhotos_Deadbolt:string;
  SecuringConditionPhotos_KeyFromLockboxInKnobLockDeadbolt:string;
  SecuringConditionPhotos_Lockbox:string;
  SecuringConditionPhotos_LockboxCode:string;
  SecuringConditionPhotos_LockboxOpenWithKeys:string;
  SecuringConditionPhotos_PadlockHasp:string;
  SecuringConditionPhotos_IfCCOrderedAllSecuredDoors:string;

  InteriorConditionPhotos_HeatingCoolingMechanicals:string;
  InteriorConditionPhotos_Appliances:string;
  InteriorConditionPhotos_ElectricPanel:string;
  InteriorConditionPhotos_SumpPump:string;
  InteriorConditionPhotos_Dehumidifier:string;
  InteriorConditionPhotos_InteriorOfAllRooms:string;
  InteriorConditionPhotos_ClosetsOpenDrawersOpenCabinets:string;
  InteriorConditionPhotos_GarageGarageDoorOpener:string;
  InteriorConditionPhotos_Attic:string;
  InteriorConditionPhotos_BasementCarwlspace:string;
  InteriorConditionPhotos_OutbuildingInterior:string;
  InteriorConditionPhotos_UtilityMeters:string;

  WinterizationConditionPhotos_Antifreeze:string;

  PhotosDamages_AnyAndAllDamages:string;

  EslimatePhotos_PhotosToJustifyAllEstimatesSubmitted:string;
  EslimatePhotos_PhotosTapeMeasureShowingDimensionsForSubmittedEstimateItems:string;

  AllCompletedWorkPhotos_Before:string;
  AllCompletedWorkPhotos_During:string;
  AllCompletedWorkPhotos_After:string;
  AllCompletedWorkPhotos_PhotosTapeMeasureForDimensionsItems:string;
  AllCompletedWorkPhotos_DebrisPhotos:string;
  AllCompletedWorkPhotos_LoadPhotos:string;
}


