

export class Task_Status_Damage_Violation_Hazard {
  Task_pkeyID: Number = 0;
  Task_WO_ID: Number = 0;
  Task_IsActive: boolean = true;
  Task_IsDelete: boolean = false;
  Task_Status:Number;
  Type:Number;
  Task_Type:Number;
  TaskArrayJson:String;
}
export enum HistoryActionTaskTypeEnum
{
   Damage=1,
   Violation=2,
   Hazard=3
}

export enum HistoryActionTypeEnum
{
   Status_Single=1,
   Status_Multiple=2,
   Copy_Single=3,
   Copy_Multiple=4,
}
