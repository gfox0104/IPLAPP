export class WorkOrderSettingsPageModel {
  WO_Sett_pkeyID: Number = 0;
  WO_Sett_CompanyID: Number = 0;
  WO_Sett_Allow_Dup_Num: boolean = false;
  WO_Sett_Auto_Inc_GoBack: boolean = false;
  WO_Sett_Auto_Inc_NeedInfo: boolean = false;
  WO_Sett_Auto_Inc_Dup: boolean = false;
  WO_Sett_Auto_Inc_Recurring: boolean = false;
  WO_Sett_Auto_Assign: boolean = false;
  WO_Sett_Detect_Pricing: boolean = false;
  WO_Sett_Remove_Doller: boolean = false;
  WO_Sett_IsDelete: boolean = false;
  WO_Sett_IsActive: boolean = true;
  UserID: Number = 0;
  WO_Sett_UserId: Number = 0;
  Type: Number = 0;
  Wo_Sett_Comapny_SAlert:string = '';
  Wo_Sett_Custom_Titlebar:string = '';
  Wo_Sett_Default_Time: Number = 0;
}

export class GeneralWorkOrderSettingsModel {
  GW_Sett_pkeyID: Number = 0;
  GW_Sett_CompanyID: Number = 0;
  GW_Sett_Field_Complete: boolean = false;
  GW_Sett_Allow_Contractor: boolean = false;
  GW_Sett_Assigned_Unread: boolean = false;
  GW_Sett_Allow_Estimated: boolean = false;
  GW_Sett_Require_Estimated: boolean = false;
  GW_Sett_Sent_Ass_Cooradinator: boolean = false;
  GW_Sett_Sent_Ass_Processor: boolean = false;
  GW_Sett_Sent_Email_Multiple: boolean = false;
  GW_Sett_StaffName: boolean = false;
  GW_Sett_IsDelete: boolean = false;
  GW_Sett_IsActive: boolean = true;
  UserID: Number = 0;
  Type: Number = 0;
  GW_Sett_UserID:Number = 0;
}
