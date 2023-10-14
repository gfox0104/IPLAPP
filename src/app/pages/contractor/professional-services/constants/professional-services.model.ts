export class Professional_Service_DTO{
  PS_PkeyId:Number=0;
  PS_ContactName:String;
  PS_CompanyName:String;
  PS_Address:String;
  PS_Phone:string;
  PS_Email:Date;
  PS_Website:String;
  PS_Notes:String;
  PS_ContactType:Number;
  PS_IsActive:boolean;
  PS_IsDeleted:boolean;
}
export class ProfessionalServiceObject{
  PS_PkeyId:Number=0;
  PS_ContactName:String;
  PS_CompanyName:String="";
  PS_Address:String;
  PS_Phone:string;
  PS_Email:Date;
  PS_Website:String;
  PS_Notes:String;
  PS_ContactType:Number;
  PS_IsActive:boolean;
  Type:Number=1
}

