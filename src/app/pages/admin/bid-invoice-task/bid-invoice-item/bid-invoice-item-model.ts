export class BidInvoiceItemModel {

Task_pkeyID:Number = 0;
Task_Name:string = "";
Task_Type:Number = 0;
Task_Photo_Label_Name:String = "";
Task_Group:Number = 0;
Task_UOM:Number = 0;
Task_Contractor_UnitPrice:String = "0.00";
Task_Client_UnitPrice:String = "0.00";
Task_IsActive:Boolean = true;
Task_IsDelete:Boolean = false;
Task_AutoInvoiceComplete:Boolean = true;
UserID:Number = 0;
Type: Number = 1;
Task_File_Array: String = '';
WorkOrderID:Number = 0;
Task_Flat_Free: Boolean=false;
Task_Price_Edit: Boolean=true;
Task_Disable_Default: Boolean=true;
Task_Auto_Assign: Boolean=true;
Task_CreatedBy: String = "";
Task_ModifiedBy: String ="";
Task_Auto_Assign_str: String="";
Task_AutoInvoiceComplete_str: String="";

}


export class Task_GroupPopupModel{
  Task_Group_pkeyID: Number = 0;
  Task_Group_Name:String;
  Task_Group_Client_pkeyID:Number=0;
  Task_Group_Client_data:String;
  Task_Group_NameArray:any;
  Task_Group_IsActive: boolean = true;
  UserID: Number = 0;
  Type: Number = 1;

}
