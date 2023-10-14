export class IplRegisterModel{
    IPL_Company_PkeyId:Number = 0;  
    IPL_Company_Name:String = '';  
    IPL_Company_Address:String = '';  
    IPL_Company_Mobile:String = '';  
    IPL_Company_City:String = '';  
    IPL_Company_State:String = '';  
    IPL_Company_PinCode:String = '';  
    IPL_Company_IsActive:Boolean = true;  
    IPL_Company_IsDelete:Boolean = false;  
    IPL_Company_County:String = '';  
    IPL_Contact_Name:String = '';  
    IPL_Company_Email:String = '';  
    IPL_Company_Company_Link:String = '';  
    IPL_Company_ID:String = '';  
    Type :Number = 1; 
    IPL_Company_Phone:String = ''; 
    
    User_pkeyID:Number = 0; 
    User_FirstName :String = '';
    User_LastName :String = '';
    User_Address :String = '';
    User_City :String = '';
    User_State :String = '';
    User_Zip :String = '';
    User_CellNumber :String = '';
    User_CompanyName :String = '';
    User_LoginName :string = '';
    User_Password :string = '';
    User_Email :String = '';
    User_IsActive :Boolean = true;  
    User_IsDelete:Boolean = false; 
    IPL_County:String = '';
    Confirm_Password:String = '';
    flag:any;
}

export class RegisterState{
    IPL_StateID:Number = 0;
    IPL_StateName: String = '';
    Zip_county_name: String = '';
    Type: Number = 1;
  
  }
