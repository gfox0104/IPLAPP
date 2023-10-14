export class RestoreWorkOrderModel {
  User_pkeyID: Number = 0;
  workOrder_ID:Number=0;
  workOrderNumber:string;
  workOrderInfo:string;
  address1:string;
  address2:string;
  city:string;
  zip:string;
  FullAddress:string;
  status:string;
  dueDate:string;
  strdueDate:string;
  startDate:string;
  clientStatus:string;
  clientDueDate:string;
  IPLNO:string;
  IsEdit:boolean;
  IsDelete:boolean;
  IsActive:boolean;
  Type: Number = 2;
  
  MenuID: Number = 0;
  UserID: Number = 0;
  WhereClause: string = "";
  Single:boolean = false;
  CreatedBy:string = "";
  ModifiedBy:string = "";

}
