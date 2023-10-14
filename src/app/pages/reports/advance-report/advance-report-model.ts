export class AdvanceReportModel{
  
  Type: Number = 1;
  ReportTypeId: Number = 0;
  GroupById: Number = 0;
  StatusId: Number = 0;
  InvoiceDateFrom: String = '';
  InvoiceDateTo: String = '';
  ClientId: Number = 0;
  CustomerId: Number = 0;
  ContractorId: Number = 0;
  CordinatorId: Number = 0;
  ProcessorId: Number = 0;
  Total: any;
  Average: any;
  WoFilterId: Number = 0;
  FilterData:any;
}
export class WOFilterModel{
  Report_WO_Filter_PkeyId: Number = 0;
  Type: Number = 1;  
  Report_WO_Filter_Name: String = '';
  ArrayWOFilter: any;
  Report_WO_Filter_IsDelete:boolean = false;
  Report_WO_Filter_ChId: Number = 0;
}


