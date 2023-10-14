export class AddDamageModel {
  Damage_pkeyID: Number = 0;
  Damage_Type: String = "";
  Damage_Int:  Number = 0;
  Damage_IntName: String = "";
  Damage_Location: String = "";
  Damage_Qty: String = "";
  Damage_Estimate: String = "0.00";
  Damage_Disc: String = "";
  Damage_IsActive: boolean = true;
  Damage_IsDelete: boolean = false;
  Damage_CreatedBy : string = "";
  Damage_ModifiedBy: string = "";
  Type: Number = 1;
  UserID: Number = 0;
  ArrayPreset:any
  Damage_Preset_pkeyId: Number = 0;
}

export class AddApplianceModel {
  Appl_pkeyId: Number = 0;
  Appl_Wo_Id: Number = 0;
  Appl_App_Id: Number = 0;
  Appl_Comment: String = "";
  Appl_Status_Id: Number = 0;
  Appl_IsActive: boolean = true;
  Appl_IsDelete: boolean = false;
  Type: Number = 1;
  UserID: Number = 0;
  Appliancearr: any;
  str_Appl_Status_Id: String = "";
}
