interface ReportsModel {
  field: string;
  title: string;
  type?: string;
  required?: boolean;
  formControlName?: string;
}

export const ReportDetails: ReportsModel[] =[
  // {
  //   from: 'Invoice Date From',
  // },
  // {
  //   from: 'Sent To Client From'
  // },
  // {
  //   from: 'Ready For Office From'
  // }
]

export const FormFields: ReportsModel[] = [
  {
    field: 'paymentDate',
    title: 'Payment Date',
    type: 'date',
    formControlName: 'paymentDateN'
  },
  {
    field: 'checkNumber',
    title: 'Check Number',
    type: 'number',
    required: true,
    formControlName: 'checkNumberN'
  }
];

export class reportmodeldata{
  workOrder_ID: Number = 0;
    IPLNO: String = '';
    workOrderNumber: String = '';
    Contractor: String = '';
    address1: String = '';
    city: String = '';
    state: String = '';
    zip: Number = 0;
    WorkType: String = '';
    Loan_Number: String = '';
    dueDate: String = '';
    clientDueDate: String = '';
    Sent_to_Client: String = '';
    Inv_Client_Invoice_Number: String = '';
    Inv_Client_CreatedOn: String = '';
    Inv_Client_Client_Total: String = '';
    Inv_Client_Client_Dis: String = '';
    Inv_Client_Discout_Amount: String = '';
    Name: String = '';
    Client_Company_Name: String = '';
    whereClause: String = '';
    IsActive: boolean = true;
    IsDelete: boolean = false;
    InvoiceDateFrom: String = '';
    InvoiceDateTo: String = '';
    ReadyOfficeDateFrom: String = '';
    ReadyOfficeDateTo: String = '';
    SentToClientDateFrom: String = '';
    SentToClientDateTo: String = '';
    CompletedDateFrom: String = '';
    CompletedDateTo: String = '';
    CreatedDateFrom: String = '';
    CreatedDateTo: String = '';
    OfficeApproveDateFrom : String = '';
    OfficeApproveDateTo : String = '';
    ClientCheckDateFrom : String = '';
    ClientCheckDateTo : String = '';
    Type: Number = 1;
    GroupByData: Number = 0;
    ProcessorName : String = '';
    CordinatorName:  String = '';
    Processor : Number = 0;
    Cordinator : Number = 0;
    IPL_StateName: String = '';
    WT_WorkType: String = '';
    Valtype:Number = 0;
    IsClientCheck:  boolean = false;
    IsContractorCheck:  boolean = false;
    LabelData: Number = 0;
    LableFromDate: any;
    LableFromTo: any;
    InvoiceRangeStart: String = '';
    InvoiceRangeEnd: String = '';
    ClientInvoiceRangeStart: String = '';
    ClientInvoiceRangeEnd: String = '';
    ReportAutoAssinArray: any;
    ExtraColumnData:any;
}


