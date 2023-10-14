export class WorkOrderModel {
  workOrder_ID: Number = 0;
  workOrderNumber: string = "";
  clientName: string = "";
  clientPhone: string = "";
  clientEmail: string = "";
  clientTypeName: string = "";
  Company: Number = 0;
  CustomerNumber: Number = 0;
  WorkType: Number = 0;
  Category: Number = 0;
  address1: string = "";
  LoanNumber: string = "";
  LoanType: string = "";
  address2: string = "";
  state: Number = 0;
  city: string = "";
  zip: Number;
  country: string = "";
  Contractor: Number = 0;
  Processor: Number = 0;
  AssignedAdmin: Number = 0;
  Rush: Number = 0;
  BATF: boolean = false;
  // OfficeLocked:boolean = false;
  IsEdit:boolean = false;
  LotSize: string = "";
  LockCode: string = "";
  Mortgagor: string = "";
  KeyCode: string = "";
  Background: Number = 0;
  LockLocation: string = "";
  GateCode: string = "";
  EstimatedDate: any;
  ReceivedDate: any;
  startDate: any;
  dueDate: any;
  DateCreated: any;
  clientDueDate: any;
  CompleteDate: any;
  CancelDate: any;
  Comments: string = "";
  Office_Approved: string = "";
  workOrderInfo: string = "";
 
  status: String = "";
  clientInstructions: string = "";
  clientStatus: string = "";
  gpsLatitude: string = "";
  gpsLongitude: string = "";
 
  IsActive: boolean = true;
  IsDelete: boolean = true;
  currUserId: Number = 0;
  Type: Number = 0;
  IPLNumber: string = "";
  Cordinator: Number = 0;
  Com_Name: string = "";
  Com_Phone: string = "";
  Com_Email: string = "";
  Received_Date: any;
  Complete_Date: string = "";
  Cancel_Date: string = "";
  IPLNO: string = "";
  
  Loan_Info: Number = 0;
  Customer_Number: string = "";
  ISInspection: string = "";
  Lotsize: string = "";
  Lock_Code: string = "";
  Broker_Info: string = "";
  Lock_Location: string = "";
  Key_Code: string = "";
  Gate_Code: string = "";
  Loan_Number: string = "";
  valdef: Number = 0;
  Edit:String;
  
  Recurring: boolean = false;
  Recurs_CutOffDate: any;
  Recurs_Day: any;
  Recurs_Period: Number = 0;
  Recurs_Limit: Number = 0;  

  Recurs_ReceivedDateArray: any;
  Recurs_DueDateArray: any;

}

export class GetUserMetaDataModel {
  client_pkyeId: Number = 0;
  Type: Number = 1;
}
 
export class UpdateStausDataModel {
  workOrder_ID: Number = 0;
  status:String = '';
  IsActive: boolean = true;
  UserId: Number = 0;
  Type: Number = 1;
}

export class ActionRecurringModel {
  Received_Date: any;
  Recurs_CutOffDate: any;
  Recurs_Day: any;
  Recurs_Period: Number = 0;
  Recurs_Limit: Number = 0;  
  dueDate: any;
  workOrder_ID: Number = 0;
}

