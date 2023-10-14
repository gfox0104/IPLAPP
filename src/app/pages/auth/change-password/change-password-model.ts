export class ChangePasswordModel {
  User_pkeyID: Number = 0;
  User_LoginName: string = "";
  User_Password: string = "";
  User_IsEmailActive: boolean = false;
  User_ActivationCode: string = "";
  Type: Number = 1;
  User_LoginNameForgot: string = "";
  User_PasswordOld: string = "";
  User_PasswordNew: string = "";
  User_PasswordConfirm: string = "";
}
