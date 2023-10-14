export class WorkOderViewModel{
    workOrder_ID:Number = 0;
    workOrderNumber:string = "";
    Status_Name:string = "";
    dueDate:string = "";
    Received_Date:string = "";
    clientDueDate:string = "";
    EstimatedDate:string = "";
    Com_Name:string = "";
    Complete_Date :string = "";
    address1:string = "";
    city :string = "";
    Cancel_Date:string = "";
    DateCreated :string = "";
    startDate:string = "";
    Loan_Number :string = "";
    Loan_Info:string = "";
    country:string = "";
    Lotsize :string = "";
    Lock_Code :string = "";
    assigned_admin :Number = 0;
    state :string = "";
    zip:Number = 0;
    IPLNO :string = "";

    Type:number =1;
    UserID:Number = 0;
    PageNumber:number = 0;
    NoofRows: number = 0;
    Skip:number = 0;
  }
  export class WorOrderColumn
  {
    Wo_Column_Name:string = "";
    Wo_Column_parameter:string = "";
    Keydata:string = "";
    WC_UserId:Number = 0;
    Type : Number = 1;
 
  }
  export class WorOrderColumnjson
  {
    WC_PeyID:Number = 0;
    WC_UserId:Number = 0;
    WC_Show_Column_Json:string = "";
    WC_Hide_Column_Json:string = "";
    WC_IsActive:boolean = true;
    WC_IsDelete:boolean = false;
    Type:Number;
    WC_Show_Column_Jsonarr:any;
    WC_Hide_Column_Jsonarr: any;
    WF_QueryName:String = "";
    WhereClause:any;
    WF_PkeyID:Number = 0;
    Wc_Grid_ShortID:Number = 0;
    PageNumber:number = 0;
    NoofRows: number = 0;
    Skip:number = 0;
    
  }
   export class WorkOrderActions
   {
    Wo_Column_PkeyId: Number = 0;
    Wo_Column_Name: String ='';
    Wo_Column_IsActive: boolean = false;
    Auto_Assine: boolean = true;
    Type: Number = 2;
   }
   export class ActionSentStore
   {
    Assign_Contractor: Number = 0;
    Assign_Coordinator : Number = 0;
    Assign_Processor : Number = 0;
    Client_Company: Number = 0;
    Work_Type: Number = 0;
    Due_Date:String = '';
    Start_Date:String = '';
    Client_Due_Date:String = '';
    Recurring_Order:String = '';
    Comments:String = '';
    Estimated_Date:String = '';
    Send_Message:String = '';
    Task: String = '';
    Instructions: String = '';
    Category : Number = 0;
    Background_Provider: Number = 0;
    Assign_PCR:String = '';
    Cancel_Work_Order:String = '';
    Delete_Work_Order:String = '';
    Mark_Client_Invoice_Paid:String = '';
    Write_off_Invoice:String = '';
    Mark_Contractor_Invoice_Paid:String = '';
    Print_WO_Instructions:String = '';
    Print_Client_Invoice:String = '';
    Export_to_Excel:String = '';
    Download_Photos:String = '';
    Attach_Document:String = '';
    Route:String = '';
    WorkActionArray:any;

   }
   export class SaveFilterWorkOrder{
    workOrderNumber: String ='';
    status:Number = 0;
    dueDate:String ='';
    city:String ='';
    state:Number = 0;
    zip: Number;
    IPLNO:String ='';
    Lotsize:String ='';
    Lock_Code:String ='';
    Loan_Number:String ='';
    Loan_Info:Number = 0;
    address1:String ='';
    client: Number = 0;
    contractor: Number = 0;
    coordinator: Number = 0;
    processor: Number = 0;
    category: Number = 0;
    customer: Number = 0;
    Work_Type: Number = 0;
    Filter_Name: String ='';
    Work_Type_Group:Number = 0;
    County:Number = 0;
    WF_PkeyID:Number = 0
    
   }