//  Main category

export class AddCategoryModel {
  WT_pkeyID: Number = 0;
  WT_WorkType: string = "";
  WT_CategoryID: Number = 0;
  WT_CategoryMultiple:any;
  WT_YardMaintenance: boolean = false;
  WT_Active: Number = 0;
  WT_Always_recurring: boolean = false;
  WT_Recurs_Every: string = "";
  WT_Recurs_WeekID: Number = 0;
  WT_Limit_to: string = "";
  WT_Cutoff_Date: AnalyserNode;
  WT_WO_ItemID: Number = 0;
  WT_Contractor_AssignmentID: Number = 0;
  WT_Ready_for_FieldID: Number = 0;
  WT_IsInspection: boolean = false;
  WT_AutoInvoice: boolean = false;
  WT_IsActive: boolean = true;
  WT_IsDelete: boolean = false;

  UserID: Number = 0;
  Type: Number = 1;
  WT_Template_Id: Number = 1;
  WT_assign_upon_comple: boolean = false;
}
export class CategoryPopupModel{
  Work_Type_Cat_pkeyID: Number = 0;
  Work_Type_Name:String;
  Work_Type_Client_pkeyID:Number = 0;
  Work_Type_NameArr:any;
  Work_Type_IsActive: boolean = true;
  UserID: Number = 0;
  Type: Number = 0;

}

export class WorkTypeAutoInvoice{
  Auto_Inv_Itm_PkeyID: Number = 0;
  Auto_Inv_Itm_WorkTypeID: Number = 0;
  Auto_Inv_Itm_StringArr:any;
  UserID: Number = 0;
  Type: Number = 0;
}

export class WorkTypeGroupObject{
  Work_Type_Cat_pkeyID: Number = 0;
  Work_Type_Name: string;
  Work_Type_IsActive:boolean=true;
  Work_Type_Client_pkeyID:Number = 0;
  UserID: Number = 0;
  Type: Number = 0;
}
