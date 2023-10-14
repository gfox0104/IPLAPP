export class Bill {
  Bill_pkeyId: number = 0;
  Bill_Number: any;
  Bill_VendorId: number = 0;
  Bill_Vendor_Email: any;
  Bill_Send_to: boolean = false;
  Bill_Send_to_DateTime: Date = new Date();
  Bill_Send_to_Time: any = { hour: 13, minute: 30 };
  Bill_CcBcc: boolean = false;
  Bill_CcBcc_Label: string = '';
  Bill_Billing_Address: any;
  Bill_Terms: number = 0;
  Bill_Date: Date = new Date();
  Bill_Due_Date: Date;
  Bill_PO_No: any;
  Bill_Message: any;
  Bill_Statement: any;
  Bill_Sub_total: any = 0.0;
  Bill_Taxble_Sub_total: number = 0;
  Bill_Taxble_Amount: any = 0;
  Bill_Total: any = 0.0;
  Bill_Balance_Due: any = 0.0;
  Bill_Attachment: any;
  Bill_CreatedBy: any;
  Bill_ModifiedBy: any;
  Bill_Items: Bill_Items[] = [
    {
      Bill_Items_PkeyId: 0,
      Bill_Id: 0,
      Task_Id: '0',
      TaskListId: [],
      QTY: '0',
      Rate: '0',
      Amount: '0',
      Tax: false,
      Class: 0,
      Descp: '',
      Bill_Con_Ch_pkeyId: 0,
      Bill_Con_Ch_Wo_Id: 0,
      Bill_Con_pkeyId: 0,
    },
  ];
  UserID: number = 0;
  Bill_Status: number = 0;
  Bill_Con_pkeyId: any = 0;
  Bill_Con_WO_Id: any = 0;
  Bill_Payments: any = [];
  Type = 0;
  Receive_Bill_Items: Receive_Bill_Items[] = [];
}
export class Bill_Items {
  Bill_Items_PkeyId: number = 0;
  Bill_Id: number = 0;
  Task_Id: any;
  TaskListId: any;
  QTY: any;
  Rate: any;
  Amount: any;
  Tax: boolean = false;
  Class: any;
  Descp: any;
  Bill_Con_Ch_pkeyId: any = 0;
  Bill_Con_Ch_Wo_Id: any = 0;
  Bill_Con_pkeyId: any = 0;
}

export class Bill_Payment {
  Bill_Pay_PkeyId: number = 0;
  Bill_Pay_Bill_Id: number = 0;
  Bill_Pay_Vendor_Id: number = 0;
  Bill_Pay_Wo_Id: number = 0;
  Bill_Pay_Payment_Date: Date = new Date();
  Bill_Pay_Amount: any;
  Bill_Pay_CheckNumber: any;
  Bill_Pay_Comment: any;
  Bill_Pay_Balance_Due: any;
}
export class ReceivePayment {
  Bill_Rec_PkeyId: number = 0;
  Bill_pkeyId: number = 0;
  Bill_Number: any = '';
  Bill_Rec_Vendor_Id: number = 0;
  Bill_Rec_Payment_Date: Date = new Date();
  Bill_Rec_Payment_Method: number = 0;
  Bill_Rec_Reference_No: any;
  Bill_Rec_Deposit_To: number = 0;
  Payment_Deposit_To_ListId: any = [];
  Bill_Rec_Memo: any;
  Bill_Rec_Amount: any = 0.0;
  Amount_To_Credit: number = 0;
  Amount_Receive: number = 0;
  Receive_Attachment: any;
  Receive_Bill_Items: Receive_Bill_Items[] = [];
  UserID: number = 0;

  Type = 0;
  SelectAll: boolean = false;
}
export class Receive_Bill_Items {
  Select: boolean = false;
  Bill_Rec_Bill_Id: any;
  DueDate: Date;
  Bill_Rec_Original_Amount: any;
  Bill_Rec_Payment: any;
  Pending_Amount: any;
  Bill_Total: any;
  Bill_Rec_Deposit_To: any;
  Bill_Rec_Deposit_ToName: any;
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
