export class DocumentAndFormsDTO {
  Fold_Pkey_Id: Number = 0;
  Fold_Auto_Assine_PkeyId: Number = 0;
  Fold_Name: String = '';
  Fold_Desc: String = '';
  Fold_Parent_Id: Number = 0;
  Fold_IsActive: Boolean = true;
  Fold_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  AutoAssinArray: any;
  PermisionArray: any;
  checkitem: any;
}

export class FileMasterModel {
  Fold_File_Pkey_Id: Number = 0;
  Fold_File_ParentId: Number = 0;
  Fold_File_Role_Folder_Id: Number = 0;
  Fold_File_Name: String = '';
  Fold_File_Local_Path: String = '';
  Fold_File_Bucket_Name: String = '';
  Fold_File_ProjectId: String = '';
  Fold_File_Object_Name: String = '';
  Fold_File_Folder_Name: String = '';
  Fold_File_IsActive: boolean = true;
  Fold_File_IsDelete: boolean = false;
  FileData: any;
  UserID: Number = 0;
  Type: Number = 1;
  Fold_File_Desc: String = '';
  AutoAssinArray: any;
  Fold_Auto_Assine_PkeyId: Number = 0;
  Fold_Is_AutoAssign: boolean = false; 
}
