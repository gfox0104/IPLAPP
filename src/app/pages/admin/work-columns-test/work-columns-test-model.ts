export class workColumnsMenuMasterModel{

    Wo_Column_PkeyId : Number = 0;
    Wo_Column_Name : String = "";
    UserId : Number = 0;
    ACG_PKeyID_sel:Boolean = false;
  Type : Number = 1;
}

export class AddWorkColumnModel{
    ACG_PkeyID : Number = 0;
    ACG_GroupID: Number = 0;
    ACG_ColumnID: Number = 0;
    ACG_IsActive: Boolean = true;
    ACG_IsDelete: Boolean = false;
    ACG_PKeyID_sel:Boolean = false;
    UserID: Number = 0;
    Type: Number = 1;
    MenuArray:any;
    Access_Colum_str:string ="";
    
  }