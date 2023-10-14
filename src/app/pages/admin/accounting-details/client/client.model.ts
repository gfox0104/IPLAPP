export class Client {
  Acc_Client_pkeyId: Number = 0;
  Title: string = '';
  Company_Name: string = '';
  Company_First_Name: string = '';
  Company_Middle_Name: string = '';
  Company_Last_Name: string = '';
  Discount: Number = 0;
  Contractor_Discount: Number = 0;
  Billing_Address: string = '';
  Billing_Address1: string = '';
  Comments: string = '';
  Due_Date_Offset: Number = 0;
  Photo_Resize_width: Number = 0;
  Photo_Resize_height: Number = 0;
  Invoice_Total: any = 0; // explicit
  Login: boolean = false;
  Login_Id: string = '';
  Password: string = '';
  Rep_Id: string = '';
  Lock_Order: boolean = false;
  IPL_Mobile: Number = 0;
  Provider: Number = 0;
  Active: any = 0;
  IsActive: boolean = true;
  UserID: Number = 0;
  Type: Number = 1;
  IsDelete: boolean = false;
  Website: string = '';
  Other: string = '';
  PrintAsCheck: boolean = false;
  StateId: Number = 0;
  City: string = '';
  Country: string = '';
  ZipCode: Number;
  FaxNumbar: Number;
  ContactName: string = '';
  ContactEmail: string = '';
  ContactPhone: string = '';
  
 
  
}

export class AccClientfilterMasterModel {
  WhereClause: string = '';
  UserID: Number = 1;
  MenuID: Number = 1;
  Company_Name: string = '';
  City: string = '';
  Billing_Address: string = '';
  ContactName: string = '';
  ZipCode: string = '';
  IsActive: boolean = true;
  Type: Number = 1;
  Acc_Client_pkeyId: Number = 0;
  Single: boolean = false;
  StateId: Number = 0;
  IPL_StateName: string = '';
  User_CreatedBy: string = '';
  User_ModifiedBy: string = '';
}
