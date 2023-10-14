export class ViewWorkTypeCategoryModel {
  WT_pkeyID: Number = 0;
  WT_WorkType: string = "";
  WT_CategoryID: Number = 0;
  WT_YardMaintenance: boolean = false;
  WT_Active: Number = 0;
  WT_Always_recurring: boolean = true;
  WT_Recurs_Every: string = "";
  WT_Recurs_WeekID: Number = 0;
  WT_Limit_to: string = "";
  WT_Cutoff_Date: AnalyserNode;
  WT_WO_ItemID: Number = 0;
  WT_Contractor_AssignmentID: Number = 0;
  WT_Ready_for_FieldID: Number = 0;
  WT_IsInspection: boolean = true;
  WT_AutoInvoice: boolean = false;
  WT_IsActive: boolean = true;
  MenuID: Number = 0;
  UserID: Number = 0;
  WhereClause: string = "";
  Type: Number = 3;
  WT_Template_Id: Number = 0;
  WT_IsDelete: boolean = false;
  WT_CreatedBy:String = "";
  WT_Type_ModifiedBy: String = "";
}
