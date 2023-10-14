export class Account {
  Acc_pkeyId: Number = 0;
  Acc_Account_Type: any;
  Acc_Account_TypeList: any;
  Acc_Account_Details: any;
  Acc_Account_DetailsList: any;
  Acc_Account_Type_Description: String = '';
  Acc_Account_Name: string;
  Acc_Account_Code: string;
  Acc_Account_Description: string;
  Acc_Parent_Account_Id: number = 0;
  Acc_Parent_Account_IdList: any;
  Acc_Is_Sub_Account: boolean = false;
  UserID: number = 0;
}
export class AccountType {
  Acc_Type_pkeyId: Number = 0;
  Acc_Account_Type: string;
  Acc_Detail_Type: string;
  Acc_Parent_Account_Type_Id: number = 0;
}
