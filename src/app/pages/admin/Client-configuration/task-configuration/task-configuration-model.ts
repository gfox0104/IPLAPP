export class AddTaskConfigurationModel {
  Task_Configuration_PkeyId: Number = 0;
  Task_Configuration_LoanType: String = "";
  Task_Configuration_Task_Id: Number = 0;
  Task_Configuration_ItemCode_Id: Number = 0;
  Task_Configuration_BidCategory_Id: Number = 0;
  Task_Configuration_BidDamage_Id: Number = 0;
  Task_Configuration_CategoryCode_Id: Number = 0;
  Task_Configuration_IsActive: boolean = true;
  Task_Configuration_IsDelete: boolean = false;
  Task_Configuration_ItemCode: String = "";
  Task_Configuration_ItemCode_Price: String = "";
  Type: Number = 1;
  UserID: Number = 0;
}
export class AddWorkTypeConfigurationModel {
  WorkType_Configuration_PkeyId: Number = 0;
  WT_WorkType: String = "";
  WorkType_Configuration_OrderType_Id: Number = 0;
  WorkType_Configuration_WorkType_Id: Number = 0;
  WorkType_Configuration_IsActive: boolean = true;
  WorkType_Configuration_IsDelete: boolean = false;
  Type: Number = 1;
  UserID: Number = 0;
}
export class AddMainCatConfigurationModel {
  MainCategoroy_Configuration_PkeyId: Number = 0;
  Main_Cat_Name: String = "";
  MainCategoroy_Configuration_MainCategoroy_Id: Number = 0;
  MainCategoroy_Configuration_CategoryCode_Id: Number = 0;
  MainCategoroy_Configuration_IsActive: boolean = true;
  MainCategoroy_Configuration_IsDelete: boolean = false;
  Type: Number = 1;
  UserID: Number = 0;
}
