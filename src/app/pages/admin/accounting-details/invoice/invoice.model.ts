export class Invoice {
  Invoice_pkeyId: number = 0;
  Invoice_Number: any;
  Invoice_CustomeId: number = 0;
  Invoice_Custome_Email: any;
  Invoice_Send_to: boolean = false;
  Invoice_Send_to_DateTime: Date = new Date();
  Invoice_Send_to_Time: any = { hour: 13, minute: 30 };
  Invoice_CcBcc: boolean = false;
  Invoice_CcBcc_Label: string = '';
  Invoice_Billing_Address: any;
  Invoice_Terms: number = 0;
  Invoice_Date: Date = new Date();
  Invoice_Due_Date: Date;
  Invoice_PO_No: any;
  Invoice_Message: any;
  Invoice_Statement: any;
  Invoice_Sub_total: any = 0.0;
  Invoice_Taxble_Sub_total: number = 0;
  Invoice_Taxble_Amount: any = 0;
  Invoice_Total: any = 0.0;
  Invoice_Balance_Due: any = 0.0;
  Invoice_Attachment: any;
  Inv_CreatedBy: string = '';
  Inv_ModifiedBy: string='';
  Invoice_Items: Invoice_Items[] = [
    {
      Invoice_Items_PkeyId: 0,
      Invoice_Id: 0,
      Task_Id: '0',
      TaskListId: [],
      QTY: '0',
      Rate: '0',
      Amount: '0',
      Tax: false,
      Class: 0,
      Descp: '',
      Inv_Client_Ch_pkeyId: 0,
      Inv_Client_Ch_Wo_Id: 0,
      Inv_Client_pkeyId: 0,
    },
  ];
  UserID: number = 0;
  Invoice_Status: number = 0;
  Inv_Client_pkeyId: any = 0;
  Inv_Client_WO_Id: any = 0;
  Invoice_Payments: any = [];
  Type = 0;
  Invoice_IsActive: boolean = true;
  Invoice_IsDelete: boolean = false;
  Receive_Invoice_Items: Receive_Invoice_Items[] = [];
}
export class Invoice_Items {
  Invoice_Items_PkeyId: number = 0;
  Invoice_Id: number = 0;
  Task_Id: any;
  TaskListId: any;
  QTY: any;
  Rate: any;
  Amount: any;
  Tax: boolean = false;
  Class: any;
  Descp: any;
  Inv_Client_Ch_pkeyId: any = 0;
  Inv_Client_Ch_Wo_Id: any = 0;
  Inv_Client_pkeyId: any = 0;
}

export class Invoice_Payment {
  Invoice_Pay_PkeyId: number = 0;
  Invoice_Pay_Invoice_Id: number = 0;
  Invoice_Pay_Customer_Id: number = 0;
  Invoice_Pay_Wo_Id: number = 0;
  Invoice_Pay_Payment_Date: Date = new Date();
  Invoice_Pay_Amount: any;
  Invoice_Pay_CheckNumber: any;
  Invoice_Pay_Comment: any;
  Invoice_Pay_Balance_Due: any;
}

export class ReceivePayment {
  Invoice_Rec_PkeyId: number = 0;
  Invoice_pkeyId: number = 0;
  Invoice_Number: any = '';
  Invoice_Rec_Customer_Id: number = 0;
  Invoice_Rec_Payment_Date: Date = new Date();
  Invoice_Rec_Payment_Method: number = 0;
  Invoice_Rec_Reference_No: any;
  Invoice_Rec_Deposit_To: number = 0;
  Payment_Deposit_To_ListId: any = [];
  Invoice_Rec_Memo: any;
  Invoice_Rec_Amount: any = 0.0;
  Amount_To_Credit: number = 0;
  Amount_Receive: number = 0;
  Receive_Attachment: any;
  Receive_Invoice_Items: Receive_Invoice_Items[] = [];
  UserID: number = 0;

  Type = 0;
  SelectAll: boolean = false;
}
export class Receive_Invoice_Items {
  Select: boolean = false;
  Invoice_Rec_Invoice_Id: any;
  DueDate: Date;
  Invoice_Rec_Original_Amount: any;
  Invoice_Rec_Payment: any;
  Pending_Amount: any;
  Invoice_Total: any;
  Invoice_Rec_Deposit_To: any;
  Invoice_Rec_Deposit_ToName: any;
}

export class BankDeposit {
  Deposit_To: number = 0;
  Deposit_To_ListId: any = [];
  PaymentDate: Date = new Date();
  Memo: string = '';
  BankDeposit_Items: BankDeposit_Items[] = [];
  TotalAmount: any = 0.0;
  SelectedAmount: any = 0.0;
  SelectAll: boolean = false;
}
export class BankDeposit_Items {
  Customer_Id: number = 0;
  Customer_Name: string;
  Date: Date;
  PaymentType: string = 'Payment';
  Payemnt_Method: number = 0;
  Memo: string;
  ReferenceNumber: any;
  Amount: any = 0.0;
  Select: boolean = false;
}
