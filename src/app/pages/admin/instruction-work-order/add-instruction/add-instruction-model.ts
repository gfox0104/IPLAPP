export class AddInstructionModel {
  Inst_Task_pkeyId: Number = 0;
  Inst_Task_Type_pkeyId: Number = 2;
  Inst_Task_Name:String = '';
  Inst_Task_Desc: String = '';
  Inst_Task_IsAutoAssign: Boolean = true;
  Inst_Task_IsActive:Boolean = true;
  Inst_Task_IsDelete:Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  AutoAssinArray:any;
  Instruction_Json_PkeyId:Number = 0;
}
