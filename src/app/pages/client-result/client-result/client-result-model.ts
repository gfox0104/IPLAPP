export class TaskBidMasterModel {
  workOrder_ID: Number = 0;
  Task_Bid_pkeyID: Number = 0;
  Task_Bid_TaskID: Number = 0;
  Task_Bid_WO_ID: Number = 0;
  Task_Bid_Qty: String = "";
  Task_Bid_Uom_ID: Number = 0;
  Task_Bid_Cont_Price: Number = 0;
  Task_Bid_Cont_Total: Number = 0;
  Task_Bid_Clnt_Price: Number = 0;
  Task_Bid_Clnt_Total: Number = 0;
  Task_Bid_Comments: String = "";
  Task_Bid_Violation: boolean = true;
  Task_Bid_damage: boolean = true;
  Task_Bid_IsActive: boolean = true;
  Task_Bid_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  PageNumber:number = 0;
    NoofRows: number = 0;
    Skip:number = 0;
    FilterData:string ='';

  ///// carefully
  Task_Damage_Type: Number = 0;
  ClientResultBidTaskArray: any;
  ClientResultCreateCompletionArray: any;
  ClientResultDamageArray: any;
  ClientResultViolationArray: any;
  ClientResultHazardArray: any;
}

export class Task_Invoice_MasterModel {
  Task_Inv_pkeyID: Number = 0;
  Task_Inv_TaskID: Number = 0;
  Task_Inv_WO_ID: Number = 0;
  Task_Inv_Qty: String = "";
  Task_Inv_Uom_ID: Number = 0;
  Task_Inv_Cont_Price: Number = 0;
  Task_Inv_Cont_Total: Number = 0;
  Task_Inv_Clnt_Price: Number = 0;
  Task_Inv_Clnt_Total: Number = 0;
  Task_Inv_Comments: String = "";
  Task_Inv_Violation: boolean = true;
  Task_Inv_damage: boolean = true;
  Task_Inv_IsActive: boolean = true;
  Task_Inv_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  Task_Inv_Status: boolean = false;
}

export class TaskDamageMasterModel {
  Task_Damage_pkeyID: Number = 0;
  Task_Damage_WO_ID: Number = 0;
  Task_Damage_Task_ID: Number = 0;
  Task_Damage_ID: Number = 0;
  Task_Damage_Type: Number = 0;
  Task_Damage_Int: String = "0";
  Task_Damage_Location: String = "";
  Task_Damage_Qty: String = "";
  Task_Damage_Estimate: String = "";
  Task_Damage_Disc: String = "";
  Task_Damage_IsActive: boolean = true;
  Task_Damage_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
}

export class BindDataModel {
  workOrderNumber: String = "";
  address1: String = "";
  Cont_Name: String = "";
  Cordinator_Name: String = "";
  Lock_Code: String = "";
  startDate: any;
  Work_Type_Name: String = "";
  Lock_Location: String = "";
  Cust_Num_Number: String = "";
  Back_Chk_ProviderName: String = "";
  Key_Code: String = "";
  Client_Company_Name: String = "";
  Gate_Code: String = "";
  BATF: boolean = false;
  Lotsize: String = "";
  rus_Name: String = "";
  ClientMetaData: String = "";
  Loan_Info: String = "";
  Loan_Type: String = "";
  Broker_Info: String = "";
  Received_Date: any;
  clientDueDate: any;
  Complete_Date: any;
  Cancel_Date: any;
  IPLNO: String = "";
  fulladdress: String = "";
  Loan_Number: String = "";
  dueDate: any;
  Client_Result_File_Desc: String = "";
  Common_pkeyID: Number = 0;
  documentx: File;
  Client_Result_Photo_StatusType: Number = 0;
  Client_Result_Photo_FileName: string = "";
  Client_Result_Photo_FilePath: string = "";
  Type: Number = 1;
  Client_Result_Photo_Type: Number = 0;
  Client_Result_Photo_Ch_ID: Number = 0;
  WT_WorkType: string = "";
  Processor_Name: string = "";
  Processor: Number = 0;
  ContentType: Number = 0;
  Client_PageCalled: Number = 0;
  Client_Result_Photo_ID: Number = 0;
  Inst_Doc_PkeyID: Number = 0;
  SentToClient_date: any;
  OfficeApproved_date: any;
  Field_complete_date: any;
  Status_Name: String = '';
  city: String = '';
  SM_Name: String = '';
  Mortgagor: String = '';
  assigned_date:any;
  Fold_File_Pkey_Id: Number = 0;
  zip: Number = 0;
  FileData: any;
  WorkOrder_ID_Data:string ='';
  Fold_Is_AutoAssign: boolean = false;
  Wo_Office_Doc_PkeyId: Number = 0;
  EstimatedDate:any;
  datedetals:any;
  Client_Result_Photo_Seq:number;
  GPSLatitude:string;
  GPSLongitude:string
  Client_Discount:number=0;
  Client_Contractor_Discount:number=0;
  Category:number=0;
}

export class CopyWorkOderModel {
  workOrder_ID: Number = 0;
  WorkOderInfo: Number = 0;
  UserID: Number = 0;
  Type: Number = 1;
}

export class TaskPresetModel
{
  Task_Preset_pkeyId: Number = 0;
  Task_Preset_ID: Number = 0;
  UserID: Number = 0;
  Type: Number = 2;
}

export class AddPcrFormModel
{
  Pcr_FormId: Number = 0;
  Pcr_FormWoId: Number = 0;
  UserID: Number = 0;
  Type: Number = 1;
  Fwo_IsOfficeResult:boolean = false;
  Fwo_IsFieldResult : boolean = false;
  fwo_IsPcrAdd: boolean = false;
  IsDynamicForm:boolean=false
}
export class PrintPdfObject
{
  workOrder_ID: Number = 0;
  Type: Number = 0;
  IsOfficeResult:boolean = false;
  IsFiledResult : boolean = false;
}
