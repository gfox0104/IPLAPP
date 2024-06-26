export class MessageModelData {
    Message_Text : string = '';
    Key: string = '';
    timestemp :string = '';
    Msg_PkeyId:Number = 0;
    Msg_Wo_Id:Number = 0;
    Msg_From_UserId:Number = 0;
    Msg_To_UserId:Number = 0;
    Msg_To_UserId_A:Number = 0;
    Msg_To_UserId_B:Number = 0;
    Msg_Message_text:string = '';
    Msg_Time:string = '';
    Msg_Status:Number = 0;
    Msg_Message_Id:string = '';
    Msg_IsActive:boolean = true;
    Msg_IsDelete:boolean = false;
    UserID:Number = 0;
    Type:Number = 1;

}

export class BindChatDataModel {
    workOrderNumber: String = "";
    address1: String = "";
    Cont_Name: String = "";
    Cordinator_Name: String = "";
    Lock_Code: String = "";
    startDate: any;
    Work_Type_Name: String = "";
    Lock_Location: String = "";
    Cust_Num_Number: String = "";
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
    Chat_File_Desc: String = "";
    Common_pkeyID: Number = 0;
    documentx: File;
    Chat_File_StatusType: Number = 0;
    Chat_FileName: string = "";
    Chat_FilePath: string = "";
    Type: Number = 1;
    Chat_File_Type: Number = 0;
    Chat_File_Ch_ID: Number = 0;
    WT_WorkType: string = "";
    Processor_Name: string = "";
    Processor: Number = 0;
    ContentType: Number = 0;
    Client_PageCalled: Number = 0;
    Chat_File_ID: Number = 0;
    Inst_Doc_PkeyID: Number = 0;
    SentToClient_date: String = '';
    OfficeApproved_date: String = '';
    Field_complete_date: String = '';
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
    Customer_Number:Number = 0;
    Cordinator:Number = 0;
    Contractor:Number = 0;
    Client_Result_Photo_ID :Number = 0;
  }
  export class ViewUserModel{
    User_pkeyID: Number = 0;
    User_FirstName:String;
    User_LastName:String;
    User_LoginName:String;
    MWU_workOrder_ID:Number =0;
    MWU_pkeyID: Number = 0;
    MWU_IsRead :boolean = true;
    User_IsActive:boolean = true;
    UserID:Number;
  Type: Number = 1;
    lstmessage_Admin_UserDTO: any[];

  }
  export class MessageWorkOrder{
    MWU_pkeyID:Number = 0;
    MWU_User_ID:Number = 0;
    MWU_workOrder_ID:Number = 0;
    MWU_IsRead :boolean = true;
    MWU_Role:Number = 0;
    MWU_IsActive:boolean = true;
    MWU_IsDelete:boolean = false;
    lstmessage_Admin_UserDTO: any;
    UserID:Number = 0;
    Type:Number = 1;
  }
  export enum MessageTypeEnum{
    Default_Text=0,
    Text=1,
    Link=2,
    Images=3,
    Documents=4
  }


