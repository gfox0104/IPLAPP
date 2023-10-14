export class ViewCustomPhotoLabelModel {
  PhotoLabel_pkeyID: Number = 0;
  Type: Number = 1;
  workOrder_ID: Number = 0;
  PhotoLabel_IsActive: Boolean = true;
  PhotoLabel_Name: String = "";
  PhotoLabel_CreatedBy: String ="";
  PhotoLabel_ModifiedBy: String = "";
}
export class CustomPhotoLabelGroupModel{
  Custom_PhotoLabel_Group_pkeyID: Number = 0;
  Custom_PhotoLabel_Group_Name:String;
  Custom_PhotoLabel_Group_Arr:any;
  Custom_PhotoLabel_Group_IsActive: boolean = true;
  Custom_PhotoLabel_Group_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 0;

}
