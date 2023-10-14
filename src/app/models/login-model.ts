export class LoginModel {
  user_pkeyID: Number = 0;
  user_LoginName: string = "";
  user_Password: string = "";
  user_IsEmailActive: boolean = false;
  user_ActivationCode: string = "";
  type: Number = 2;
  user_LoginNameForgot: string = "";
  user_PasswordOld: string = "";
  user_PasswordNew: string = "";
  user_PasswordConfirm: string = "";
  tokendetails: any;
  ClientId: Number = 0;
  User_Token_val:string="";
  IP:string="";
  MacIp:string="";
  User_Source:Number;
  User_Acc_Log_Device_Name:string="";
}
