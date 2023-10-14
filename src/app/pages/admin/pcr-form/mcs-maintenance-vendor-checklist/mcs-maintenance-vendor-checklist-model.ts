export class PCR_MCS_Maintenance_Vendor_Checklist_Model{
  MVC_PkeyID:number;
  MVC_WO_ID:number;
  MVC_Company_ID:number;
  MVC_Property_Info:any;
  MVC_Completion_Info:any;
  MVC_Utilities:any;
  MVC_Damage:any;
  MVC_Winterization_Info:any;
  MVC_Violation:any;
  MVC_Validation:any;
  MVC_Check_Ins:any;
  MVC_Notes:any;
  MVC_IsActive:boolean;
  MVC_IsDelete:boolean;
  fwo_pkyeId:number;
  ModifiedBy:string;
  Type:number;
}

export class MVC_Property_Info{
  MVC_PI_IsCompletionsNeeded:string;
  MVC_PI_PropertyType :string="";
  MVC_PI_NumberOfUnits:string="";
  MVC_PI_UnableAccessProperty?:string;
  MVC_PI_ReasonWhy:string="";
  MVC_PI_IsPropertyOccupied:string;
  MVC_PI_IsPropertyVacant:string;
  MVC_PI_IsEnvironmentalHazardsPresent:string;
  MVC_PI_IsPropertyHaveDamages:string;
  MVC_PI_IsMoldPresent:string;
  MVC_PI_IsPropertyHavePool:string;
  MVC_PI_IsPropertyHaveAdditionalBuildings:string;
  MVC_PI_IsPropertyOpenTheElements:string;
  MVC_PI_IsThereViolation:string;
  MVC_PI_IsRoofTraped:string="";
  MVC_PI_DescribeExposureIssue:string;
  MVC_PI_IsYouAbleGainEntry:string;
  MVC_PI_LockboxCode:string="";
  MVC_PI_Keycode1:string="";
  MVC_PI_DoorSecure1:string="";
  MVC_PI_Keycode2:string="";
  MVC_PI_DoorSecure2:string="";
  MVC_PI_ABI_Barn:string;
  MVC_PI_ABI_DetachedGarage:string;
  MVC_PI_ABI_GuestHouse:string;
  MVC_PI_ABI_MotherInLawSute:string;
  MVC_PI_ABI_WorkShop:string;
  MVC_PI_ABI_Other:string;
}

export class MVC_Completion_Info{
  MVC_CI_PropertyLotSize:string;
  MVC_CI_MaintainedArea:string;
  MVC_CI_LotConditionUponArrival:string;
  MVC_CI_TotalLawnArea:string;
  MVC_CI_SnowRemovalInformation:string;
  MVC_CI_SnowRemovalInformation_Other:string;
}


export class MVC_Utilities{
  Electric_AnivalStatus:string;
  Electric_AreBreakersOff:string;
  Electric_MeterReading:string;
  Electric_Shared:string
  Electric_NoMeter:string;
  Electric_MeterSerialNumber:string;
  Electric_NotAvailable:string;
  Electric_WasUtilityActivated:string;
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
  Gas_WasUtilityActivated:string;
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
  Water_WasUtilityActivated:string;
  Water_WhyNotTransformed:string;
  Water_ActivationReason:string;
  Water_CompanyName:string;
  Water_CompanyContact:string;

  DoesPropertyRequireASumpPump:string;
  IsSupmPumpCrockVisble:string;
  ConditionSumpPump:string="";
  UtilitesTransformed:string;
  IsDehumidferPresent:string;
  IsDehumidferNeeded:string;
}

export class MVC_Damage{
  MVC_NDR_DamageType:string="";
  MVC_NDR_Condition:string="";
  MVC_NDR_Location:string="";
  MVC_NDR_CauseSource:string="";
}

export class MVC_Winterization_Info{
  MVC_WI_Wintaraization_Info_Saved:string;
  MVC_WI_Pending:string;
  MVC_WI_Done:string;
  MVC_WI_Bid:string;
  MVC_WI_NA:string;
  MVC_WI_Completion_Date:string;
  MVC_WI_Description:string;

  MVC_WI_SystemType:string="";
  MVC_WI_SystemHoldPressure:string="";
  MVC_WI_IsLicensedPlumberNeeded:string="";
  MVC_WI_SystemHaveWell:string="";
  MVC_WI_NumberOfUnitsWinterized:string;
  MVC_WI_WinterizationCompleted:string="";

  MVC_WI_Reason_CompletedByUnknown:string;
  MVC_WI_Reason_EntirePlumbingStripped:string;
  MVC_WI_Reason_MissingWaterHeater:string;
  MVC_WI_Reason_PlumbingDamage:string;
  MVC_WI_Reason_SharedPlumbingOrCondo:string;
  MVC_WI_Reason_Other:string;
  MVC_WI_ExplainOther:string;
}

export class MVC_Violation{
  MVC_Violation_ViolationDate:string;
  MVC_Violation_DiscoveredDate:string;
  MVC_Violation_RemediationDate:string;
  MVC_Violation_ReceivedDate:string;
  MVC_Violation_ViolationType:string="";
  MVC_Violation_ViolationAmount:string;
  MVC_Violation_OfficersName:string;
  MVC_Violation_ContactNumber:string;
  MVC_Violation_ViolationComplaintNumber:string;
  MVC_Violation_IsHearingScheduled:string;
  MVC_Violation_HearingDate:string;
  MVC_Violation_ViolationCaseNumber:string;
  MVC_Violation_ViolationDescription:string;
  MVC_Violation_ActionRequriedToCorrectViolation:string;
}

export class MVC_Validation{
  MVC_Validation:string="";
}

export class MVC_Check_Ins{
  MVC_CheckIns_DateCreated:string;
  MVC_CheckIns_Lattude:string;
  MVC_CheckIns_Longtude:string;
  MVC_CheckIns_HasVolations:string;
  MVC_CheckIns_RoofNeedsRepair:string;
  MVC_CheckIns_HasExteriorDebris:string;
  MVC_CheckIns_IsVacant:string;
  MVC_CheckIns_InLawnMaintained:string;
  MVC_CheckIns_HasVandalism:string;
  MVC_CheckIns_HasEacalatedEvents:string;
  MVC_CheckIns_HasHeathandSafetyIssues:string;
  MVC_CheckIns_IsUnsecured:string;
  MVC_CheckIns_HasBigSixDamages:string;
}

export class MVC_Notes{
  MG_NoteType:string;
  MG_NoteToAdd:string;
  MG_ExistingNotes:string;
}
