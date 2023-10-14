export class ContractorReportsModel{
    Inv_Con_pkeyId:Number = 0;
    Inv_Con_Wo_ID:Number = 0;
    Inv_Con_Status:Number = 0;
    Inv_Con_Inv_Followup:boolean;
    Type:Number = 1;
    FromDatePaidInvoice:any;
    ToDateDatePaidInvoice:any;
    PageNumber : number = 1;
    NoofRows:number = 15;
    Contractorarr:any[];
    ContractorID:Number = 0;
    From_InvoiceDate: any;
    To_InvoiceDate: any;
    PendingTabCon:any[];
}
