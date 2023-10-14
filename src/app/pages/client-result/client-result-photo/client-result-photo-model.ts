export class ClientResultPhotoModel {
  Client_Result_Photo_ID: Number = 0;
  Client_Result_Photo_Wo_ID: Number = 0;
  IPLNO: Number = 0;
  Client_Result_Photo_FileName: String = "";
  Client_Result_Photo_FilePath: String = "";
  Client_Result_Photo_IsActive: boolean = true;
  Client_Result_Photo_IsDelete: boolean = true;
  Client_Result_Photo_FileType: String = "";
  Client_Result_Photo_FileSize: String = "";
  Client_Result_Photo_TaskId: Number = 0;
  Client_Result_Photo_Invoice_Id: Number = 0;
  Client_Result_Photo_Bid_Id: Number = 0;
  Client_Result_Photo_TaskLable_Name: String = "";
  Client_Result_Photo_Lable_Status: Number = 0;
  UserID: Number = 0;
  Type: Number = 1;
  valtype : Number = 1;
  ImageArray: any;
  Client_Result_Photo_Task_Bid_pkeyID: Number = 0;
  Client_Result_Photo_StatusType: Number = 0;
  keycount: Number = 0;
  Client_Result_Photo_Type: Number = 0;
  CRP_New_pkeyId: Number = 0;
  Client_Result_Photo_UploadTimestamp:string;
  Client_Result_Photo_DateTimeOriginal:string;
  Dataitems:any;
  UnlableArrayJson:any
}

export class FileUploadmodel {
  Pkey_Id: string = "";
  documentx: File;
  Doc_Path: string = "";
  Doc_Name: string = "";
  Type: Number = 1;
}

export class TaskBidPhoto {
  Task_Bid_TaskID: Number = 0;
  Task_Bid_WO_ID: Number = 0;
  Task_Photo_Label_Name: string = "";
  Task_Bid_pkeyID: Number = 0;
  ButtonName1: string = "";
  ButtonName2: string = "";
  ButtonName3: string = "";
  WO_IPLNO: string = "";
}

export class Custom_PhotoLabel {
  PhotoLabel_pkeyID: Number = 0;
  PhotoLabel_Name: string = "";
  PhotoLabel_IsCustom: Number = 0;
  PhotoLabel_IsActive: boolean = true;
  PhotoLabel_IsDelete: boolean = false;
  Type: Number = 1;
  workOrder_ID: Number = 0;
  UserID: Number = 0;
  Custom_label_Check: String = "";
  PhotoLabel_Valtype: Number = 0;
  PhotoLabel_Client_Id: string = '0';
  PhotoLabel_WorkType_Id: Number = 0;
  PhotoLabel_Customer_Id: Number = 0;
  PhotoLabel_Loan_Id: Number = 0;
}

export class WorkOrder_CustomPhotoLabel {
  WorkOrderPhotoLabel_pkeyID: Number = 0;
  WorkOrderPhotoLabel_WO_ID: Number = 0;
  WorkOrderPhotoLabel_IsActive: boolean = true;
  WorkOrderPhotoLabel_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  Custom_PhotoLabel_MasterDTO: any;
}

export class ClientPhotoRef {
  CRP_New_pkeyId: Number = 0;
  CRP_New_Photo_ID: Number = 0;
  CRP_New_Bid_Id: Number = 0;
  CRP_New_Inv_Id: Number = 0;
  CRP_New_Damage_Id: Number = 0;
  CRP_New_Status_Type: Number = 0;
  CRP_New_Task_Bid_pkeyID: Number = 0;
  CRP_New_IsActive: boolean = false;
  CRP_New_Task_ID: Number = 0;
  CRP_WorkOrderPhotoLabel_ID: Number = 0;
  CRP_Inspection_Id: Number = 0;
  Type: Number = 0;
}

export const photoStatusType = (name) => {
  switch (name) {
    case "Bid":
      return 4;
    case "Before":
      return 1
    case "During":
      return 2;
    case "After":
      return 3;
    case "Damage":
      return 5;
    case "Label":
      return 6;
    case "Inspection":
      return 7;
    case "Violation":
      return 8;
    case "Hazard":
      return 9;
  }
}

export const randomString = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const stringLength = 10;
  let randomstring = '';
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

export class PhotoTransferModel {
  IPLNO: string = "";
  LabelId: number = 0;
  TaskId: Number = 0;
  CompletionLabelId: Number = 0;
}

