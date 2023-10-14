export class AddUserModel {
  User_pkeyID: Number = 0;
  User_FirstName: string = "";
  User_LastName: string = "";
  User_CompanyName: string = "";
  User_VendoID: Number = 0;
  User_Sys_Record: Number = 0;
  User_LoginName: string = "";
  User_Password: string = "";
  User_Email: string = "";
  User_Group: Number = 0;
  User_ClientAssignArray: string = "";
  User_Assi_Admin: Number = 0;
  User_Active: Number = 1;
  User_WorkOrder: Number = 0;
  User_Wo_History: Number = 0;
  User_Disc_percentage: string = "0.00";
  User_Tme_Zone: string = "0";
  User_Auto_Assign: Boolean = false;
  User_Leg_FirstName: string = "";
  User_Leg_LastName: string = "";
  User_Leg_CellPhone: string = "";
  User_Leg_Address: string = "";
  User_Leg_Address1: string = "";
  User_Leg_City: string = "";
  User_Leg_State: string = "0";
  User_Leg_Notes: Number = 0;
  User_Email_Note: Boolean = false;
  User_Emai_Reminders: Boolean = false;
  User_Email_New_Wo: Boolean = false;
  User_Email_UnAssigned_Wo: Boolean = false;
  User_Email_FollowUp: Boolean = false;
  User_Text_Note: Boolean = false;
  User_Text_Reminders: Boolean = false;
  User_Text_New_Wo: Boolean = false;
  User_Text_UnAssigned_Wo: Boolean = false;
  User_Text_FollowUp: Boolean = false;
  User_Alert_EmailReply: Boolean = false;
  User_Alert_Ready_Office: Boolean = false;
  User_Misc_Contractor_Score: Number = 0;
  User_Misc_Insurance_Expire: string;
  User_Misc_Pruvan_Username: string = "";
  User_Misc_PushKey: string = "";
  User_Misc_StartDate: string = "0";
  User_Misc_Device_Id: string = "";
  User_Misc_ABC: string = "";
  User_Misc_Service_Id: string = "";
  User_IsActive: Boolean = true;
  User_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 0;
  User_CellNumber: Number;
  User_Alert_minutes: Number;
  Carrier: Number = 0;
  User_Zip: string = "";
  User_Comments: string = "";
  StrAddressArray: any;
  User_Contractor: Boolean = false;
  User_Cordinator: Boolean = false;
  User_Processor: Boolean = false;
  User_OpenOrderDisCriteria: string = "1";
  User_PastWorkOrder: Boolean = false;
  User_PastOrderDisCriteria: string = "1";
  User_SelectOrderDisCriteria: string = "";
  User_BackgroundCheckProvider: Number = 0;;
  User_BackgroundCheckId: string = "";
  // new fields
  User_Email_Cancelled: Boolean = false;
  User_Email_New_Message: Boolean = false;
  User_Email_Field_Complete: Boolean = false;
  User_Email_Daily_Digest: Boolean = false;
  User_Text_Cancelled: Boolean = false;
  User_Text_New_Message: Boolean = false;
  User_Text_Field_Complete: Boolean = false;
  User_AssignClient: string = "";
  UserDocumentArray: any;
  AssociatedDevices: any;
  documentx: File;
  Client_PageCalled:Number;
  User_BackgroundDocPath: string = "";
  User_Con_Cat_Id:Number = 0;
  User_Tracking: Boolean;
  User_Tracking_Time:  Number = 0;
  User_BackgroundDocName: string;
  date:any;
  User_IspassSent: Boolean = false;
  User_ImagePath:String;

}

export class WorkOrderCustomize {
  wo_Custo_pkeyID: Number = 0;
  wo_Custo_DocType: string = "";
  wo_Custo_RecievedDate: any;
  wo_Custo_ExpDate: any;
  wo_Custo_NotificationDate: any;
  wo_Custo_AlertUser: Boolean = false;
  wo_Custo_DocPath: string = "";
  wo_Custo_FileName: string = "";
  wo_Custo_UserId: Number = 0;
  wo_Custo_IsActive: Boolean = true;
  wo_Custo_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 0;
  documentx: File;
  Client_PageCalled: Number;


}

export class ContractorMap
{
  IPL_PkeyID: Number = 0;
  IPL_Primary_radius: String = '';
  IPL_Primary_Zip_Code: Number = 0;
  IPL_Primary_Countries: Number = 0;
  IPL_Primary_Latitude: String = '';
  IPL_Primary_Longitude: String = '';
  IPL_Secondary_radius: String = '';
  IPL_Secondary_Zip_Codes: Number = 0;
  IPL_Secondary_Countries: Number = 0;
  IPL_Secondary_Latitude: String = '';
  IPL_Secondary_Longitude: String = '';
  IPL_UserID: Number = 0;
  IPL_IsActive:Boolean = true;
  IPL_Address: String = '';
  IPL_City: String = '';
  IPL_State: String = '';
  IPL_IsDelete:Boolean = false;
  IPL_County: String = '';
  IPL_Address_Val: Number = 0;
  AddressArray: String = '';
}
export class ContractorMapState{
  IPL_StateID:Number = 0;
  IPL_StateName: String = '';
  Zip_county_name: String = '';
  UserID: Number = 0;
  Type: Number = 1;

}

export class ContractorCoverageArea{
  Cont_Coverage_Area_PkeyId: Number = 0;
  Cont_Coverage_Area_UserID: Number = 0;
  Cont_Coverage_Area_State_Id: Number = 0;
  Cont_Coverage_Area_County_Id: Number = 0;
  Cont_Coverage_Area_Zip_Code: Number = 0;
  Cont_Coverage_Area_IsActive: Boolean;
  Cont_Coverage_Area_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  whereClause: String = '';
  AddressArray:any;
  chkflag:Boolean;
}
export class CountyZipModel{
  Zip_ID: Number = 0;
  Zip_county_name:String;
  Zip_zip: Number = 0;
  Zip_state_id: String;
  UserID:Number;
  Type: Number = 1;
}
