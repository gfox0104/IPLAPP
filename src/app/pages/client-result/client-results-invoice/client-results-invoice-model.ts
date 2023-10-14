export class ClientResultsInvoiceModel {
  workOrder_ID: Number = 0;
  UserID: Number = 0;
  Type: Number = 0;
}
export class Invoice_ContractorDTO {
  Inv_Con_pkeyId: Number = 0;
  Inv_Con_Invoice_Id: Number = 0;
  Inv_Con_TaskId: Number = 0;
  Inv_Con_Wo_ID: Number = 0;
  Inv_Con_Uom_Id: Number = 0;
  Inv_Con_Sub_Total: number = 0;
  Inv_Con_ContDiscount: Number = 0;
  Inv_Con_ContTotal: Number = 0;
  Inv_Con_Short_Note: string = "";
  Inv_Con_Inv_Followup: boolean = false;
  Inv_Con_Inv_Comment: string = "";
  Inv_Con_Ref_ID: string = "";
  Inv_Con_Followup_Com: boolean = false;
  Inv_Con_Invoce_Num: Number = 0;
  Inv_Con_Inv_Date: any;
  Inv_Con_Inv_Hold_Date:  any;
  Inv_Con_Status: Number = 0;
  Inv_Con_DiscountAmount: Number = 0;
  Inv_Con_IsActive: boolean = true;
  Inv_Con_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  Task_Inv_Auto_Invoice: boolean = true;
  Inv_Con_Auto_Invoice: boolean = true;
  ContractorInvoiceArrayVal: any;
  Inv_Con_Inv_Approve_Date: any = '';
  Inv_Con_Inv_Approve: boolean = false;
  WorkOrderID_mul: string = "";
}

export class Invoice_ClientDTO {
  Inv_Client_pkeyId: Number = 0;
  Inv_Client_Invoice_Id: Number = 0;
  Inv_Client_WO_Id: Number = 0;
  Inv_Client_Task_Id: Number = 0;
  Inv_Client_Uom_Id: Number = 0;
  Inv_Client_Sub_Total: number = 0;
  Inv_Client_Client_Dis: Number = 0;
  Inv_Client_Client_Total: Number = 0;
  Inv_Client_Short_Note: string = "";
  Inv_Client_Inv_Complete: boolean = false;
  Inv_Client_Credit_Memo: boolean = false;
  Inv_Client_Sent_Client: any;
  Inv_Client_Comp_Date: any;
  Inv_Client_Invoice_Number: string = "";
  Inv_Client_Internal_Note: string = "";
  Inv_Client_Status: Number = 0;
  Inv_Client_Discout_Amount: Number = 0;
  Inv_Client_IsActive: boolean = true;
  Inv_Client_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  ClientInvoiceArrayVal: any;
  Inv_Client_Auto_Invoice: boolean = false;
  Inv_Client_Inv_Date: any;
  Inv_Client_Hold_Date: any;
  Inv_Client_Followup:  boolean = false;
  Other_Task_Name:string;
  WorkOrderID_mul: string = "";
  Inv_Client_IsNoCharge:  boolean = false;
  Inv_Client_NoChargeDate:  any;
}

export class PaymentRecordModel {
  paymentDate: Date;
  amount: number;
  checkNumber: number;
  enteredBy: string;
  comment: string;
}

interface ScoreCard {
  field: string;
  title: string;
  width: string;
}

export const ScoreCards: ScoreCard[] = [
  {
    field: 'scorecard',
    title: 'Scorecard',
    width: '5%'
  },
  {
    field: 'a',
    title: 'A',
    width: '3%'
  },
  {
    field: 'b',
    title: 'B',
    width: '3%'
  },
  {
    field: 'c',
    title: 'C',
    width: '3%'
  },
  {
    field: 'd',
    title: 'D',
    width: '3%'
  },
  // {
  //   field: 'e',
  //   title: 'E',
  //   width: '10%'
  // },
  {
    field: 'f',
    title: 'F',
    width: '3%'
  }
]

// export const TempScoreCardData = [
//   {
//     scorecard: 'Picture quality',
//     a: 'default',
//     b: '',
//     c: '',
//     d: '',
//     e: '',
//     f: ''
//   },
//   {
//     scorecard: 'Followed Instructions',
//     a: '',
//     b: 'default',
//     c: '',
//     d: '',
//     e: '',
//     f: ''
//   },
//   {
//     scorecard: 'Work Quality',
//     a: '',
//     b: '',
//     c: '',
//     d: 'default',
//     e: '',
//     f: ''
//   }
// ]
export class scorecardDTO
{
  Scd_pkeyId:Number = 0;
  Scd_Wo_Id:Number = 0;
  Scd_Status_Id:Number = 0;
  Scd_IsDelete: boolean = false;
  Scd_IsActive: boolean = true;
  Scd_Con_ID: Number = 0;
  Scd_Comment: string ='';
  ScoreCard_DTO: any;

}
export class ContractInvoiceModel {
  Inv_Con_Ch_pkeyId = 0;
  Inv_Con_Ch_TaskId = 0;
  Inv_Con_Ch_Uom_Id = 0;
  Inv_Con_Ch_Qty = 1;
  Inv_Con_Ch_Price = "0.00";
  Inv_Con_Ch_Total = "0.00";
  Inv_Con_Ch_Adj_Price = "";
  Inv_Con_Ch_Adj_Total = "0.00";
  Inv_Con_Ch_Comment = "";
  Inv_Con_Ch_IsActive = true;
  Inv_Con_Ch_IsDelete = false;
  Inv_Con_Ch_InvoiceId = 0;
  Inv_Con_Ch_Client_ID = 0;
  Inv_Con_Ch_Flate_fee = false;
  Inv_Con_Ch_Discount = 0;
  Inv_Con_Ch_Temp_Total = 0;
  Inv_Con_Ch_Other_Task_Name="";
  Inv_Con_Price_Disable=false;
}

export class ClientInvoiceModel {
  Inv_Client_Ch_pkeyId = 0;
  Inv_Client_Ch_Task_Id = 0;
  Inv_Client_Ch_Uom_Id = 0;
  Inv_Client_Ch_Qty = 0;
  Inv_Client_Ch_Price = "0.00";
  Inv_Client_Ch_Total = "0.00";
  Inv_Client_Ch_Adj_Price = "";
  Inv_Client_Ch_Adj_Total = "0.00";
  Inv_Client_Ch_Comment = "";
  Inv_Client_Ch_IsActive = true;
  Inv_Client_Ch_IsDelete = false;
  Inv_Client_Ch_Invoice_Id = 0;
  Inv_Client_Ch_Flate_Fee = false;
  Inv_Client_Ch_Discount = 0;
  Inv_Client_Ch_Temp_Total = 0;
  Inv_Client_Ch_Other_Task_Name:"";
  Inv_Client_Price_Disable=false;
}

export class JobCostObj {
  conInvoice: number = 0;
  expenseTotal: number = 0;
  totalExpense: number = 0;
  clientInvoice: number = 0;
  balance: number = 0;
}

export const TempJobPLData = [
  {
    title: 'Job Costing',
    value: ''
  },
  {
    title: 'Contractor Invoice',
    field: 'conInvoice',
    value: '25.00',
  },
  {
    title: 'Expense Total',
    field: 'expenseTotal',
    value: '16.00',
  },
  {
    title: 'Total Expenses',
    value: '41.00',
    field: 'totalExpense'
  },
  {
    title: '',
    value: ''
  },
  {
    title: 'Client Invoice',
    field: 'clientInvoice',
    value: '100'
  },
  {
    title: '',
    value: ''
  },
  {
    title: 'Balance',
    field: 'balance',
    value: '59'
  }
]
