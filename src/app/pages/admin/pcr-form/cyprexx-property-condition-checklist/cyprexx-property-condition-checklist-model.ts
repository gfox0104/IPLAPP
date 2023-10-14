export class PCR_Cyprexx_Property_Condition_Checklist{
    PCR_PC_PkeyID:number;
    PCR_PC_WO_ID:number;
    PCR_PC_CompanyID:number;
    PCR_PC_General_Property_Questions:any;
    PCR_PC_Signature:any;
    PCR_PC_IsActive:boolean;
    PCR_PC_IsDelete:boolean;
    ModifiedBy:string;
    fwo_pkyeId:number;
    Type:number;
  }

  export class PCR_PC_General_Property_Questions{
    PCR_GPQ_Appliancesmissing:String;
    PCR_GPQ_Listmissingappliances:String;
    PCR_GPQ_Lockboxpresent:String;
    PCR_GPQ_KeyPresent:String;
    PCR_GPQ_Propertydamages:String;
    PCR_GPQ_Listpropertydamages:String;
    PCR_GPQ_Sumppumppresent:String;
    PCR_GPQ_sumppumppresentoperational:String;
    PCR_GPQ_Missinghandrails:String;
    PCR_GPQ_Missinghandrailsbiddetails:String;
    PCR_GPQ_Linescapped:String;
    PCR_GPQ_Propertyfreebrokenglass:String;
    PCR_GPQ_presenttriphazardsrequiringbid:String;
    PCR_GPQ_presenttriphazardsrequiringbiddetails:String;
    PCR_GPQ_Missingfloorvents:String;
    PCR_GPQ_Loosesteps:String;
    PCR_GPQ_Interiorwallsandexteriorstructures:String;
    PCR_GPQ_Smokedetectorspresentperlocalordinance:String;
    PCR_GPQ_Electricalbreakerboxcoverpresent:String;
    PCR_GPQ_Boardupsrequired:String;
    PCR_GPQ_Measurementscoordinator:String;
    PCR_GPQ_Utilitieson:String;
    PCR_GPQ_55degreesFahrenheit:String;
    PCR_GPQ_Wetheatingsystem:String;
    PCR_GPQ_Propertybeenwinterized:String;
    PCR_GPQ_Wintzintact:String;
    PCR_GPQ_Violationsproperty:String;
    PCR_GPQ_Violationdetails:String;
    PCR_GPQ_Decorativepondssecured:String;
    PCR_GPQ_Discolorationpresent:String;
    PCR_GPQ_Locationdiscoloration:String;
    PCR_GPQ_Doorswindowsoutbuildingsgarages:String;
    PCR_GPQ_Ongoingrehabcurrentlyproperty:String;
    PCR_GPQ_Commentsotherissues:String;
  }

  export class PCR_PC_Signature{
    PCR_SIGN_CompletionDate:String;
    PCR_SIGN_InspectorSignature:String;
  }