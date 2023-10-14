export class ImportClientPayment {
  ICP_PkeyID = 0;
  Client_Pay_CheckNumber = '';     // Check_Number = '';
  Client_Pay_Payment_Date = '';   // Check_date = '';
 
  Client_Pay_Invoice_Id = '';    // Client_invoice = '';
  Inv_Client_Inv_Date = '' ;    // Invoice_date = '';
  Client_Pay_Amount = '' ;     // Payment_Amount = '';
  Client_Pay_Comment = '' ;   // Comments = '';
  IPLNO = '' ;               // IPL_No = '';
  workOrderNumber = '' ;    // WorkOrderNumber = '';

  Initial_Comments = '';
  Write_Off :Boolean = false;
  
  ICP_IsActive : Boolean = true;
  ICP_IsDelete :Boolean = false;
}

export class WorOrderColumn
  {
    Wo_Column_Name:string = "";
    Wo_Column_parameter:string = "";
    Keydata:string = "";
    WC_UserId:Number = 0;
    Type : Number = 1;
 
  }