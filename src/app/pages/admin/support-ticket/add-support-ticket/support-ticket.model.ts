export class SupportTicketModel {
	Sup_Tickets_Pkey_ID:Number= 0;
	Sup_Tickets_Phone:String;
	Sup_Tickets_Email:String;
	Sup_Tickets_Subject:String;
	Sup_Tickets_Message:String;
	Sup_Tickets_Ticket_Status:Number;
	Sup_Tickets_IsActive:boolean = true;
	Sup_Tickets_IsDelete:boolean = false;
	Sup_Tickets_CompanyID:Number;
	Sup_Tickets_UserID:Number;
	Sup_Tickets_ID:Number;
	Sup_Tickets_Relation_Id:Number;
	Type: Number = 1;
	SupportTicketFileArr:any;
}

