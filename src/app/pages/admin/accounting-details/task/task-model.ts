export class Task {
  Acc_Task_pkeyId: Number = 0;
  Task_Name: string = '';
  Task_Type: Number = 0;
  Task_Photo_Label_Name: String = '';
  Task_Group: Number = 0;
  Task_UOM: Number = 0;
  Task_Contractor_UnitPrice: Number;
  Task_Client_UnitPrice: Number;
  Task_IsActive: Boolean = true;
  Task_IsDelete: Boolean = false;
  Task_AutoInvoiceComplete: Boolean = true;
  UserID: Number = 0;
  Type: Number = 1;
  Task_File_Array: String = '';
  Task_CreatedBy: string = '';
  Task_ModifiedBy: string = '';
}
