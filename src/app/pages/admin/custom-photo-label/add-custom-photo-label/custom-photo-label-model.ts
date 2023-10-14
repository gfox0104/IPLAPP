export class AddCustomLableModel {
  PhotoLabel_pkeyID: Number = 0;
  PhotoLabel_Name: String = "";
  PhotoLabel_IsCustom: Number = 1;
  PhotoLabel_IsAutoAssign: Boolean = true;
  PhotoLabel_IsActive: Boolean = true;
  PhotoLabel_IsDelete: Boolean = false;
  Type: Number = 1;
  UserID: Number = 0;
  Custom_label_Check: String = "";
  workOrder_ID: Number = 0;
  PhotoLabel_Valtype: Number = 0;
  PhotoLabel_Client_Id: string = '0';
  PhotoLabel_WorkType_Id: Number = 0;
  PhotoLabel_Customer_Id: Number = 0;
  PhotoLabel_Loan_Id: Number = 0;
  PhotoLabel_Group_Id: Number = 0;
  CustomPhotoLabel_Filter_Master_PkeyId:Number=0;
  AutoAssinArray: any;
  PhotoLable_AutoAssign: boolean = false; 
}
