export class SupportSettingModel {
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
	Sup_Tickets_CreatedBy: string ="";
	Sup_Tickets_ModifiedBy: string ="";
}
export class SupportTicketDocumentModel {
	Support_Docs_PkeyID:Number = 0;
	Support_Docs_Ticket_ID:Number;
	Support_Docs_File_Path: String = "";
	Support_Docs_File_Size: String = "";
	Support_Docs_File_Name: String = "";
	Support_Docs_Bucket_Name: String = "";
	Support_Docs_Project_Id: String = "";
	Support_Docs_Object_Name: String = "";
	Support_Docs_Folder_Name: String = "";
	Support_Docs_UploadedBy: String = "";
	Support_Docs_IsActive:boolean = true;
	Support_Docs_IsDelete:boolean = false;
	Support_Docs_User_ID:Number;
	Support_Docs_Company_ID:Number;
	Type: Number = 1;
	documentx:any;
	Support_Docs_Type:any;
}
export class SupportTicketModel {
	ST_Phone_Number: String = "";
	ST_Ext: String = "";
	ST_Subject: String = "";
	ST_Attach: File;
	ST_Message: String = "";
}
