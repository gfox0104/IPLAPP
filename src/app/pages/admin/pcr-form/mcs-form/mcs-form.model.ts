export class PCR_MCS_Forms_Master_Model{
  MCS_PkeyID:number;
  MCS_WO_ID:number;
  MCS_CompanyID:number;
  MCS_Property_Info:any;
  MCS_Completion_Info:any;
  MCS_Utilities:any;
  MCS_VCL:any;
  MCS_Check_Ins:any;
  MCS_IsActive:Boolean;
  MCS_IsDelete:Boolean;
  ModifiedBy:string;
  fwo_pkyeId:number;
  Type:number;
}

export class MCS_Property_Info{
  MCS_PI_IsCompletionsNeeded:string;
  MCS_PI_PropertyType :string="";
  MCS_PI_NumberOfUnits:string="";
  MCS_PI_UnableAccessProperty?:string;
  MCS_PI_ReasonWhy:string="";
  MCS_PI_IsPropertyOccupied:string;
  MCS_PI_IsPropertyVacant:string;
  MCS_PI_IsEnvironmentalHazardsPresent:string;
  MCS_PI_IsPropertyHaveDamages:string;
  MCS_PI_IsMoldPresent:string;
  MCS_PI_IsPropertyHavePool:string;
  MCS_PI_IsPropertyHaveAdditionalBuildings:string;
  MCS_PI_IsPropertyOpenTheElements:string;
  MCS_PI_IsThereViolation:string;
  MCS_PI_IsRoofTraped:string="";
  MCS_PI_DescribeExposureIssue:string;
  MCS_PI_IsYouAbleGainEntry:string;
  MCS_PI_LockboxCode:string="";
  MCS_PI_Keycode1:string="";
  MCS_PI_DoorSecure1:string="";
  MCS_PI_Keycode2:string="";
  MCS_PI_DoorSecure2:string="";
  MCS_PI_ABI_Barn:string;
  MCS_PI_ABI_DetachedGarage:string;
  MCS_PI_ABI_GuestHouse:string;
  MCS_PI_ABI_MotherInLawSute:string;
  MCS_PI_ABI_WorkShop:string;
  MCS_PI_ABI_Other:string;
}
export class MCS_Completion_Info{
  MCS_CI_PropertyLotSize:string;
  MCS_CI_MaintainedArea:string;
  MCS_CI_LotConditionUponArrival:string;
  MCS_CI_TotalLawnArea:string;
  MCS_CI_SnowRemovalInformation:string;
  MCS_CI_SnowRemovalInformation_Other:string;
}
export class MCS_Utilities{
  Electric_AnivalStatus:string;
  Electric_AreBreakersOff:string;
  Electric_MeterReading:string;
  Electric_Shared:string
  Electric_NoMeter:string;
  Electric_MeterSerialNumber:string;
  Electric_NotAvailable:string;
  Electric_AnivalStatus2:string;
  Electric_WhyNotTransformed:string;
  Electric_ActivationReason:string;
  Electric_CompanyName:string;
  Electric_CompanyContact:string;
  Gas_AnivalStatus:string;
  Gas_AreBreakersOff:string;
  Gas_MeterReading:string;
  Gas_Shared:string
  Gas_NoMeter:string;
  Gas_MeterSerialNumber:string;
  Gas_NotAvailable:string;
  Gas_AnivalStatus2:string;
  Gas_WhyNotTransformed:string;
  Gas_ActivationReason:string;
  Gas_CompanyName:string;
  Gas_CompanyContact:string;
  Water_AnivalStatus:string;
  Water_AreBreakersOff:string;
  Water_MeterReading:string;
  Water_Shared:string
  Water_NoMeter:string;
  Water_MeterSerialNumber:string;
  Water_NotAvailable:string;
  Water_AnivalStatus2:string;
  Water_WhyNotTransformed:string;
  Water_ActivationReason:string;
  Water_CompanyName:string;
  Water_CompanyContact:string;
  DoesPropertyRequireASumpPump:string;
  IsSupmPumpCrockVisble:string;
  ConditionSumpPump:string;
  UtilitesTransformed:string;
  IsDehumidferPresent:string;
  IsDehumidferNeeded:string;
}
export class MCS_VCL{
  MCS_VCL_ICC:string;
  MCS_VCL_VacancyDate:string;
  MCS_VCL_IfNotICCWhy:string;
  MCS_VCL_Waterized:string;
  MCS_VCL_LockChanged:string;
  MCS_VCL_Keycode1:string="";
  MCS_VCL_WritDamage:string;
  MCS_VCL_Keycode2:string="";
  MCS_VCL_LockboxCode:string;
  MCS_VCL_Damage:string;
  MCS_VCL_DescribeDamage:string;
  MCS_VCL_Refrigerator:string;
  MCS_VCL_Heater:string;
  MCS_VCL_Dishwasher:string;
  MCS_VCL_Stove:string;
  MCS_VCL_AC:string;
  MCS_VCL_BreakerBox:string;
  MCS_VCL_Boarded:string;
  MCS_VCL_AllDoors:string;
  MCS_VCL_HighVandalArea:string;
  MCS_VCL_SecuredPleaseExplain:string;
  MCS_VCL_GrassCut:string;
  MCS_VCL_GrassLength:string="";
  MCS_VCL_Violations:string;
  MCS_VCL_IntDebris:string;
  MCS_VCL_ExtDebris:string;
  MCS_VCL_IntSwept:string;
  MCS_VCL_RawGarbage:string;
  MCS_VCL_HazardousWasteExplain:string;
  MCS_VCL_HazardousWaste:string;
}
export class MCS_Check_Ins {
  MCS_CI_WorkOrderNumber: string;
  MCS_CI_ABCNumber: string;
  MCS_CI_AdditionalABCNumber: string;
  MCS_CI_DateCreated: string;
  MCS_CI_Lattude: string;
  MCS_CI_Longtude: string;
  MCS_CI_HasVolations: string;
  MCS_CI_RoofNeedsRepair: string;
  MCS_CI_HasExteriorDebris: string;
  MCS_CI_IsVacant: string;
  MCS_CI_InLawnMaintained: string;
  MCS_CI_HasVandalism: string;
  MCS_CI_HasEacalatedEvents: string;
  MCS_CI_HasHeathandSafetyIssues: string;
  MCS_CI_IsUnsecured: string;
  MCS_CI_HasBigSixDamages: string;
}
