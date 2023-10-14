export class AddGroupsModel{
  Grp_pkeyID : Number = 0;
  Grp_Name : string = "";
  Grp_IsActive: Boolean = true;
  Grp_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  IsAssignedMenu: Boolean = false;
  MenuArray:any;
  GroupRoleId: Number = 0;
}

export class MenuMasterModel{
  Ipre_MenuID : Number = 0;
  Mgr_Group_Id : Number = 0;
  Ipre_MenuName : String = "";
  Ipre_PageName : String = "";
  Ipre_PageUrl : String = "";
  Ipre_IsActive : Boolean = true;
  IsAssignedMenu: Boolean = false;
  UserID : Number = 0;
  Type : Number = 1;
}

export class GrouproleModel
{
  Group_DR_PkeyID: Number = 0;
  Group_DR_Name: Number = 0;
}

export class WoNotificationModel{
  WN_Pkey_Id : Number = 0;
  WN_UserId : Number = 0;
  WN_WoId : Number = 0;
  WN_Title : String = "";
  WN_Message : String = "";
  WN_IsRead : Boolean = true;
  WN_IsActive : Boolean = true;
  UserID : Number = 0;
  Type : Number = 1;
}

export class ClientPhotoNotificationModel{
  PN_Pkey_Id : Number = 0;
  PN_UserId : Number = 0;
  PN_WoId : Number = 0;
  PN_Title : String = "";
  PN_Message : String = "";
  PN_IsRead : Boolean = true;
  PN_DownloadLink : String = "";
  PN_IsActive : Boolean = true;
  UserID : Number = 0;
  Type : Number = 1;
}
