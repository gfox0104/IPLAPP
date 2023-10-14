export class AddClientCompaniesModel {
  Client_pkeyID: Number = 0;
  Client_Company_Name: string = "";
  Client_Discount: string = "0.00";
  Client_Contractor_Discount:string = "0.00";
  Client_Billing_Address: string = "";
  Client_Billing_Address1: string = "";
  Client_Comments: string = "";
  Client_Due_Date_Offset: Number = 0;
  Client_Photo_Resize_width: Number = 0;
  Client_Photo_Resize_height: Number = 0;
  Client_Invoice_Total: boolean = false; // explicit
  Client_Login: boolean = false;
  Client_Login_Id: string = "";
  Client_Password: string = "";
  Client_Rep_Id: string = "";
  Client_Lock_Order: boolean = false;
  Client_Lock_Order_Reason: string = "";
  Client_IPL_Mobile: Number = 0;
  Client_Provider: Number = 0;
  //Client_Active: Number = 0;
  Client_Active: boolean = true;
  Client_IsActive: boolean = true;
  Client_IsDeleteAllow: boolean = false;
  UserID: Number = 0;
  Type: Number = 0;
  Client_IsDelete: boolean = false;

  Client_StateId: Number = 0;
  Client_City: string = "";
  Client_ZipCode: Number;
  Client_BackgroundProvider: string = "0";
  Client_ContactTypex: string = "";
  Client_ContactNamex: string = "";
  Client_ContactEmailx: string = "";
  Client_ContactPhonex: string = "";
  Client_Website_Link: string = "";
  Client_ContactName: string = "";
  Client_ContactEmail: string = "";
  Client_ContactPhone: string = "";

  ClientContactList: any;

  Client_ClientPhone: Number;
  Client_FaxNumbar: Number;
  Client_Tech_Suport: Number;
  CompaniesMultiAddress: any;

  MainClnt_Con_List_IsDelete:boolean = false;
  MainClnt_Con_List_Active:boolean = true;
  Client_Photo_Resize_HeightWidth: string="640x480";
  Client_DateTimeOverlay: Number=0;
}

export class AddClientCompaniesStateMultipleModel {
  State_pkeyID: Number = 0;
  Client_pkeyID: Number = 0;
  StrFormArrayVal: any;
  Client_IsActive: boolean = true;
  UserID: Number = 0;
  Type: Number = 0;
}

export class ClientContactList {

  Clnt_Con_List_pkeyID: Number = 0;
  Clnt_Con_List_ClientComID: Number = 0;
  Clnt_Con_List_Name: string = "";
  Clnt_Con_List_Email: string = "";
  Clnt_Con_List_Phone: string = "";
  Clnt_Con_List_TypeName: string = "";
  Clnt_Con_List_IsActive: boolean = true;
  Clnt_Con_List_IsDelete: boolean = false;
  UserID: Number = 0;
  Type: Number = 0;
}
