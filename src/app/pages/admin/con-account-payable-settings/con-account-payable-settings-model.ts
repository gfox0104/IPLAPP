export class ContractorAccountSettingModel {
  Con_Account_Pay_PkeyID:Number = 0;
  Inv_Payout_Criteria:Number= 0;
  Inv_Age_Criteria: Number= 1;
  Payout_Frequency:Number= 0;
  Next_Payout_End_Date: String;
  Sent_Contractor_Pay_Report:Number= 0;
  CompanyID:Number;
  IsActive:boolean = true;
  IsDelete:boolean = false;
  CreatetedBy: String;
  ModifiedBy: String;
  UserID:Number= 0;
  Type:Number = 1;
}

