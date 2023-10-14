export class SupportSettingReplyModel {
	Support_Rep_PkeyId:Number= 0;
	Support_Rep_Support_Id:Number= 0;
	Support_Rep_Reply:String;
	Support_Rep_Status:Number;
	Support_Rep_IsActie:boolean = true;
	Support_Rep_IsDelete:boolean = false;
	User_LastName:String;
	User_FirstName:String;
	Type: Number = 2;
	Support_Rep_CreatedOn:String;
	fullname:String;
	Support_Rep_IsComment:boolean = false;
	Support_Rep_CommentId:Number= 0;

}
export class SupportTicketDataModel {
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
	Sup_Tickets_ID:Number = 0;
	Sup_Tickets_Relation_Id:Number;
	Type: Number = 3;
	SupportTicketFileArr:any;
	Support_Docs_File_Path:String;
	Sup_Tickets_reply:String;
	Support_Rep_PkeyId: Number = 0;
	AddDate:Date;
	LastUpdate:Date;
	User_fullname:String;
	Reply_User_fullname:String;
	Support_Rep_CreatedOn:Date;
	Sup_Comment_Show:boolean = false;

}



