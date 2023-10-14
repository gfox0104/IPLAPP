export class PCR_MCS_Grass_Cut_Form_Master_Model{
  MG_PkeyID:number;
  MG_WO_ID:number;
  MG_Company_ID:number;
  MG_Property_Info:any;
  MG_Completion_Info:any;
  MG_Access_Issue:any;
  MG_Validation:any;
  MG_Check_Ins:any;
  MG_Notes:any;
  MG_Expected_Completion_Date:any;
  MG_IsActive:boolean;
  MG_IsDelete:boolean;
  fwo_pkyeId:number;
  ModifiedBy:string;
  Type:number;
}

export class MG_Property_Info{
  MG_PI_IsCompletionsNeeded:string;
  MG_PI_PropertyType :string="";
  MG_PI_NumberOfUnits:string="";
  MG_PI_UnableAccessProperty?:string;
  MG_PI_ReasonWhy:string="";
  MG_PI_IsPropertyOccupied:string;
  MG_PI_IsPropertyVacant:string;
  MG_PI_IsEnvironmentalHazardsPresent:string;
  MG_PI_IsPropertyHaveDamages:string;
  MG_PI_IsMoldPresent:string;
  MG_PI_IsPropertyHavePool:string;
  MG_PI_IsPropertyHaveAdditionalBuildings:string;
  MG_PI_IsPropertyOpenTheElements:string;
  MG_PI_IsThereViolation:string;
  MG_PI_IsRoofTraped:string="";
  MG_PI_DescribeExposureIssue:string;
  MG_PI_IsYouAbleGainEntry:string;
  MG_PI_LockboxCode:string="";
  MG_PI_Keycode1:string="";
  MG_PI_DoorSecure1:string="";
  MG_PI_Keycode2:string="";
  MG_PI_DoorSecure2:string="";
  MG_PI_ABI_Barn:string;
  MG_PI_ABI_DetachedGarage:string;
  MG_PI_ABI_GuestHouse:string;
  MG_PI_ABI_MotherInLawSute:string;
  MG_PI_ABI_WorkShop:string;
  MG_PI_ABI_Other:string;
}

export class MG_Completion_Info{
  MG_CI_PropertyLotSize:string;
  MG_CI_MaintainedArea:string;
  MG_CI_LotConditionUponArrival:string;
  MG_CI_TotalLawnArea:string;
  MG_CI_SnowRemovalInformation:string;
  MG_CI_SnowRemovalInformation_Other:string;
}

export class MG_Access_Issue{
  MG_AI_WhyNoAccess:string="";
  MG_AI_WhyNoAccess_Other:string;
  MG_AI_ContactInfoPosted:string="";
  MG_AI_CommunityName:string;
  MG_AI_PhoneNumber:string;
  MG_AI_ContactPerson:string;
  MG_AI_EMail:string;
  MG_AI_DoormanPresent:string="";
  MG_AI_ConversationOfDoorman:string;
  MG_AI_KeypadPresent:string="";
  MG_AI_KeypadInformation:string="";
  MG_AI_KeypadInformation_Other:string;
  MG_AI_AccessLetterUsed:string="";
  MG_AI_AccessLetterUsed_Explain:string;
  MG_AI_MCSStaffContacted:string="";
  MG_AI_StaffMemberName:string;
  MG_AI_NoAccess_InformationExplain:string;
  MG_AI_WhyBadAddress:string="";
  MG_AI_MCSStaffContacted_ForBadAddress:string="";
  MG_AI_NameOfMCSStaff:string;
  MG_AI_AbleToDetermineCorrectAddress:string="";
  MG_AI_WhatIsCorrectAddress:string;
  MG_AI_ResourceOfBadAddress_MCSStaff:string;
  MG_AI_ResourceOfBadAddress_OnlineMaps:string;
  MG_AI_ResourceOfBadAddress_GPS:string;
  MG_AI_OtherInfomation_BadAddress:string;
}

export class MG_Validation{
  MG_V_Validation:string="";
}

export class MG_Check_Ins{
  MG_CheckIns_DateCreated:string;
  MG_CheckIns_Lattude:string;
  MG_CheckIns_Longtude:string;
  MG_CheckIns_HasVolations:string;
  MG_CheckIns_RoofNeedsRepair:string;
  MG_CheckIns_HasExteriorDebris:string;
  MG_CheckIns_IsVacant:string;
  MG_CheckIns_InLawnMaintained:string;
  MG_CheckIns_HasVandalism:string;
  MG_CheckIns_HasEacalatedEvents:string;
  MG_CheckIns_HasHeathandSafetyIssues:string;
  MG_CheckIns_IsUnsecured:string;
  MG_CheckIns_HasBigSixDamages:string;
}

export class MG_Notes{
  MG_NoteType:string;
  MG_NoteToAdd:string;
  MG_ExistingNotes:string;
}

export class MG_Expected_Completion_Date{
  MG_ECD_WorkOrder:string;
  MG_ECD_Phase:string;
  MG_ECD_OriginalDueDate:string;
  MG_ECD_DelayReason:string="";
  MG_ECD_ExpectedCompletionDate:string;
  MG_ECD_DateSubmitted:string;
  MG_ECD_By:string;
  MG_ECD_Comment:string;
}
