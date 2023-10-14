export class PCR_Cyprexx_Grass_Checklist_Master_Model{
  CG_PkeyID:number;
  CG_WO_Id:number;
  CG_CompanyID:number;
  CG_Property_Maintenance:any;
  CG_General_Property_Info:any;
  CG_Pool_Information:any;
  CG_Utilities:any;
  CG_Recommended_Services:any;
  CG_General_Comments:any;
  CG_Order_Completion:any;
  CG_IsActive:Boolean;
  CG_IsDelete:Boolean;
  ModifiedBy:string;
  fwo_pkyeId:number
  Type:number;
}

export class CG_Property_Maintenance_Model{
  ProMnt_WasGrassoutCompleted:string;
  ProMnt_GrassHeightPriorToCutting:string;
  ProMnt_Unableproperty:string;
  ProMnt_DescribeWhyproperty:string;
  ProMnt_Grass2inches:string;

  ProMnt_PropertyOccupied:string;
  ProMnt_Ifpropertyprovidecomments:string;
  ProMnt_Other:string;
  ProMnt_IfOtherexplain:string;
  ProMnt_Wassnowcompleted:string;
  ProMnt_Wassnowdriveway:string;
  ProMnt_Wassnowdriveway_Explain:string;
  ProMnt_Unableaccessproperty:string;
  ProMnt_CannotlocateProperty:string;
  ProMnt_CannotlocateProperty2:string;
  ProMnt_Snowneeded2inches:string;
  ProMnt_PropertyOccupied2:string;
  ProMnt_Ifpropertyoccupiedcomments:string;
  ProMnt_Other2:string;
  ProMnt_IfOtherpleaseexplain:string;
}
export class CG_General_Property_Info_Model{
  GnProp_Isdamage:string;

  GnProp_DamageTypeBrokenWindow:string;
  GnProp_DamageTypeFire:string;
  GnProp_DamageTypeGraffiti:string;
  GnProp_DamageTypeGutters:string;
  GnProp_DamageTypeBrokenRoof:string;
  GnProp_DamageTypeSiding:string;
  GnProp_DamageTypeStructural:string;
  GnProp_DamageTypeOther:string;

  GnProp_IfOtherexplain:string;
  GnProp_Isthereposted:string;
  GnProp_IsthereSalesign:string;
  GnProp_IsCyprexxsignposted:string;
  GnProp_Waspropertyuponarrival:string;
  GnProp_Ifyouafterthefact:string;
  GnProp_IfNoexplain:string;
  GnProp_IsalockboxPresent:string;
}
export class CG_Pool_Information_Model{
  PoolInfo_Ispoolpresent:string;
  PoolInfo_Isfencelockedsecured:string;
}
export class CG_Utilities_Model{
  Utilities_Gason:string;
  Utilities_IfUnknownexplain:string;
  Utilities_Wateron:string;
  Utilities_IfUnknownexplain2:string;
  Utilities_Electricon:string;
  Utilities_IfUnknownexplain3:string;
  Utilities_Iswaterturnedoffcurb:string;
  Utilities_Isthecurbsideziptied:string;
}
export class CG_Recommended_Services_Model{
  RecmdService_Doyouservices:string;
  RecmdService_IfYesexplain:string;
}
export class CG_General_Comments_Model{
  GnCmts_Comments:string;
}
export class CG_Order_Completion_Model{
  OrderComp_CompletionDate:string;
  OrderComp_VendorSignature:string;
}
