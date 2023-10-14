export class JournalModel {
  JrnlH_pkeyId: number = 0;
  JrnlH_Date: Date;
  JrnlH_ReferenceNo: string;
  JrnlH_Memo: string;
  JrnlH_Posted: boolean = false;
  Acc_CreatedBy:string ='';
  Acc_ModifiedBy:string = '';



  JrnlH_JournalEntry: JournalEntryModel[] = [
    {
      JrnlE_AccountId: 0,
      JrnlE_AccountIdList: null,
      JrnlE__Amount: 0,
      JrnlE_DrCr: 1,
      JrnlE_DrAmount: 0,
      JrnlE_CrAmount: 0,
      JrnlE_Name: '',
      JrnlE_Class: '',
      JrnlE_Memo: '',
      JrnlE_AccountType: 0,
    },
  ];
}

export class AccountModel {
  Acc_pkeyId: number = 0;
  Acc_Account_Name: string;
  Acc_Account_Code: string;
}

export class JournalEntryModel {
  JrnlE_AccountId: number = 0;
  JrnlE_AccountIdList: any;
  JrnlE__Amount: number = 0;
  JrnlE_DrCr: number = 1;
  JrnlE_DrAmount: number = 0;
  JrnlE_CrAmount: number = 0;
  JrnlE_Name: string;
  JrnlE_Class: string;
  JrnlE_Memo: string;
  JrnlE_AccountType: number = 0;
}
