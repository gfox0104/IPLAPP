export class ViewClientCompaniesModel {
  Client_pkeyID: Number = 0;
  Type: Number = 1;
}

export class filterMasterModel {
  WhereClause: string = "";
  UserID: Number = 1;
  MenuID: Number = 1;
  Client_Company_Name: string = "";
  Client_City: string = "";
  Client_Billing_Address: string = "";
  Client_ContactName: string = "";
  Client_ZipCode: string = "";
  Client_IsActive: boolean = true;
  Type: Number = 1;
  Client_pkeyID: Number = 0;
  Single: boolean = false;
  Client_StateId: Number = 0;
  IPL_StateName: string = "";
  Client_CreatedBy:string ="";
  Client_ModifiedBy:string = "";
}
