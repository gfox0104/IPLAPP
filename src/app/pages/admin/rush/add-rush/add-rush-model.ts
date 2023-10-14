
export class AddRushModel {
  rus_pkeyID:Number = 0;
  rus_Name:string= "";
  rus_Active:boolean = true;
  rus_IsActive:boolean = true;
  rus_IsDelete:boolean = false;
  UserID:Number = 0;
  Type:Number = 1;
}


export interface IAddRushModel{

  rus_pkeyID:Number;
  rus_Name:string;
  rus_Active:boolean;
  rus_IsActive:boolean;
  rus_IsDelete:boolean ;
  UserID:Number;
  Type:Number;
}


namespace Validation {
  export interface StringValidator {
      isAcceptable(s: string): boolean;
  }
}
