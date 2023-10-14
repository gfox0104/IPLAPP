export class WorkOrderImportQueueModel {
  WorkOrderItem_PkeyId: Number = 0;
  Description: String = '';
  Qty: String = '';
  Price: String = '';
  Total: String = '';
  Additional_Instructions: String = '';
  WorkOrderMaster_API_Data_Pkey_Id: Number = 0;
  IsActive: boolean = false;
  IsDeleted: boolean = false;
  UserId: Number = 0;
  Type: Number = 1;

}

export class ImportWorkOrderDataModel {
  Pkey_Id: Number = 0;
  UserID: Number = 0;
  Type: Number = 1;
  Imrt_Wo_Import_ID:Number = 0;
  Imrt_PkeyId:Number = 0;

  ImportWoArray: any;
  Imrt_Import_From_ID: Number = 0;
}
