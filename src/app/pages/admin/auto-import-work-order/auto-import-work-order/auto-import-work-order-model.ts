export class AutoImportWorkorderModel{
  
    WI_Pkey_ID :Number = 0;
    WI_ImportFrom :Number = 0;
    WI_SetClientCompany :Number = 0;
    WI_LoginName :string = '';
    WI_Password :string = '';
    WI_AlertEmail :string = '';
    WI_FriendlyName :string = '';
    WI_SkipComments :Boolean= false;
    WI_SkipLineItems :Boolean= false;
    WI_SetCategory :Number = 0;
    WI_StateFilter :Number = 0;
    WI_Discount_Import :String = '0.00';
    WI_IsActive :Boolean = true;
    WI_IsDeleted :Boolean = false;
    WI_Processor :Number = 0;
    WI_Coordinator :Number = 0;
    Type :Number = 1;
    UserId :Number = 0;
    WI_Access_UserName :string = '';
    WI_Access_Password :string = '';
    WI_Res_Code:string = '';
    WI_Changed_Order_Alert : string = '';
    WI_Cancelled_Order_Alert: string ='';
    EmailAutoAssign :any;
    
}