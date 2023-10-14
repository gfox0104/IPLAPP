export class AddInvoiceItemsModel {
  Item_pkeyID: Number = 0;
  Item_Name: String = "";
  Item_Bid: Number = 0;
  Item_AlwaysShowClientWo: Boolean = true;
  Item_RequiredClientWO: Boolean = false;
  Item_LotSize: Number = 0;
  Item_Through: String = "";
  Item_AutoInvoiceClient: Number = 0;
  Item_Active: Number = 0;
  Item_IsActive: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  Task_pkeyID: Number = 0;
  Task_Pkey: Number = 0;
  Client_compay: Number = 0;
  ArrayCustomPriceFilter: any;
  ArrayDocument: any;
  ArrayPreset: any;
  WT_Task_ID: Number = 0;
  Task_Preset_pkeyId: Number = 0;
  Task_sett_pkeyID: Number = 0;
  WT_Task_pkeyID: Number = 0;
  docarr:any;
  Task_File_Array:any;
  AutoAssignTask:any;
  TaskPhotoSetting:any;
  Task_Auto_Assign: boolean = false; 
}
export class TaskDocDetail
{
  TMF_Task_Pkey: Number= 0;
  TMF_Task_IsDelete: Boolean= false;
  Type: Number = 4;
  valflag: String = '';
}
export class StateDetail
{
  StateMaster: any;
  Type: Number = 1;

}

export class TaskPhotoSettingsVm
{
  TPS_MeasurementBidStatus: boolean=false;
  TPS_MeasurementCompletionStatus: boolean=false;
  TPS_LoadPhotosCompletionStatus:boolean=false;
  TPS_PhotoRequirementMin:any=0;
  TPS_PhotoRequirementMax:any=1000;
  TPS_PhotoRequirementStatus: boolean=false;

  TPS_Inspection:any=0;
  TPS_Bid:any=0;
  TPS_BidMeasurement:any=0;
  TPS_CompletionBefore:any=0;
  TPS_CompletionDuring:any=0;
  TPS_CompletionAfter:any=0;
  TPS_CompletionLoad:any=0;
  TPS_CompletionMeasurement:any=0;

}
