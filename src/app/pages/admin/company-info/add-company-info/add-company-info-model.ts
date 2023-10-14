export class CompanyInfoModel {
  YR_Company_pkeyID: Number = 0;
  YR_Company_Name: string = "";
  YR_Company_Con_Name: string = "";
  YR_Company_Email: string = "";
  YR_Company_Phone: string = "";
  YR_Company_Address: string = "";
  YR_Company_City: string = "";
  YR_Company_State: Number = 0;
  YR_Company_Zip: Number;
  YR_Company_Logo: string = "";
  YR_Company_App_logo: string = "";
  YR_Company_Support_Email: string = "";
  YR_Company_Support_Phone: string = "";
  YR_Company_PDF_Heading: string = "";
  YR_Company_IsActive: Boolean = true;
  YR_Company_IsDelete: Boolean = false;
  UserID: Number = 0;
  Type: Number = 1;
  Filedata: any;
}

export class Documentmodel{

  Pkey_Id:string = "";
  documentx:File;
  Doc_Path:string = "";
  Doc_Name:string = "";
  Type: Number = 1;
  Filedata: any;
  App_Com_Img_FilePath:string = "";
  App_Com_Img_pkeyID:Number = 0;
  date:any;
 
}
