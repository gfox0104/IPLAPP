export class ClientResultPIModel{
    PI_PkeyID: Number = 0;
    PI_WO_ID: Number = 0;
    PI_LockCode: String = "";
    PI_LockBox: String = "";
    PI_LotSize: String ="";


    CRPI_Lot_Size_Pricing:Number=0;
    PI_DaysInDefault: String = "";
    PI_VPRRequired: boolean = false;
    PI_VPRField: boolean = false;
    PI_VPRExpDate:any;
    PI_PtvDate:any;
    PI_InitSecureDate:any;
    PI_DidRecDate:any;
    PI_RecurringDate:any;
    PI_ExtReqDate:any;
    PI_NewCovDate:any;
    PI_ExtReq: boolean = false;
    PI_Gason: boolean = false;
    PI_Wateron: boolean = false;
    PI_Elcton: boolean = false;
    PI_GasLR: String = "";
    PI_GasTS: String = "";
    PI_WaterLR: String = "";
    PI_WaterTS: String = "";
    PI_ElctLR: String = "";
    PI_ElctTS: String = "";
    PI_IsActive: boolean = true;
    Type:Number = 1;
    CRPI_BrokerInfo:string = '';
    CRPI_Mortgagor:string = '';
    CRPI_Property_Status:Number=0;
    CRPI_Occupanct_Status:Number=0;
    CRPI_Property_Alert:Number=0;
    CRPI_Property_Locked:boolean = false;CRPI_Property_Type: any;
;
    CRPI_Front_Of_HouseImagePath:string = '';
    CRPI_Front_Of_HouseImageName:string = '';
    CRPI_GPS_Latitude:string=''
    CRPI_GPS_longitude:string=''
    
    PI_ICC: string ='';
    PI_ICCDate:any;
    PI_VPSCode:string="";
    PI_LockReason:string = '';
    PI_Winterized:boolean = false;;
    PI_WinterizedDate:any;
    CRPI_OccupancyDate:any;
  
    CRPI_PAndM_Vendor:string="";
    CRPI_General_Contractor:string="";
    CRPI_Sales_Specialist:string="";
    CRPI_Primary_Vendor:string="";
    CRPI_Inspection_Vendor:Boolean=false;
    CRPI_Investor:string="";
    CRPI_Investor_Case_Number:string="";
    CRPI_Servicer_Family:string="";
    CRPI_Servicer_Loan:string="";

    //Loan Setting  tabs

    CRPI_LoanNumber:string = '';
    CRPI_LoanType:string='';
    CRPI_Loan_Status:Number=0;
    CRPI_Property_Mortgagee:string='';
    CRPI_Borrower_Name:string='';
    CRPI_Borrower_Email:string='';
    CRPI_Borrower_Phone:string='';
    CRPI_Unpaid_Principal_Balance:string='';


    //Services Date tabs

    CRPI_Boarding_Date:any;
    CRPI_Last_Inspected_Date:any;
    CRPI_Inspection_Cycle:any;
    CRPI_Last_Interior_Clean_Date:any;
    CRPI_Initial_Inspection_Complete:any;
    CRPI_Clean_Out_Complete:any;


    //Date Tab Section
    CRPI_Stop_Work_Date:any;
    CRPI_Stop_Work_Reason:string='';
    CRPI_DaysInDefault:any;
    CRPI_VPRExpirationDate:any;
    CRPI_VPRFiled:string='';
    CRPI_ConfirmedSaleDate:any;
    CRPI_REODate:any;
    PI_InitDefaultDate:any;
    CRPI_FirstInspectionDate:any;
    CRPI_LockChangeDate:any;
    CRPI_LastGrasscutDate:any;
    CRPI_ForeclosureSaleDate:any;
    CRPI_DeedRecordedDate:any;
    CRPI_RoutingDate:any;
    PI_OrCovDate:any;
    PI_ConveyanceCondition:string="";
    CRPI_ICC: boolean =false;
    CRPI_ICCDate: string ='';
    CRPI_DateLoanFellOutOfICC:any;
    CRPI_LatestICCDate:any;
    CRPI_ConveyanceDueDate:any;
    CRPI_ExtensionApprovalDate:any;
    CRPI_NewConveyanceDueDate:any;
    CRPI_OrgEstimatedClosingDate:any;
}
export class ClientResultPSModel{ 
    CRPS_PkeyID: Number = 0; 
    PS_WO_ID: Number = 0;
    Type:Number = 1; 
    PS_IsActive: boolean = true; 
    CRPS_Client:Number=0;
    CRPS_Customer:Number=0;
    CRPS_HOA_Name:string="";
    CRPS_HOA_Identifier:string="";
    CRPS_HOA_PhoneNo:string="";
    CRPS_Tax_Parcel_Number:string="";
    CRPS_Vacant_Land_Identifier:string="";
    CRPS_Property_Id:string="";
    CRPS_Recurring_Grass_Cuts:Boolean=false;
    CRPS_Pool_On_Site:Boolean=false;
    CRPS_Sump_Pump_On_Site:Boolean=false;
    CRPS_Sump_Pump_Operational:Boolean=false;
    CRPS_AssetID:string="";
    CRPS_Inspection_Required:Boolean=false;
    CRPS_VPR_Required:Boolean=false;
    CRPS_Environmental_Flag:Boolean=false;  
    CRPS_Property_Type:Number=0; 
}
export class ClientResultPTModel{ 
    CRPT_PkeyID: Number = 0; 
    CRPT_WO_ID: Number = 0;
    Type:Number = 1; 
    CRPT_IsActive: boolean = true; 
    CRPT_InspectionVendor: boolean = false;  
    CRPT_PMVendor:string=""; 
    CRPT_PrimaryVendor:string=""; 
    CRPT_GeneralContractor:string=""; 
    CRPT_SalesSpecialist:string="";  
    CRPT_Investor:string="";  
    CRPT_InvestorCaseNumber:string=""; 
    CRPT_ServicerFamily:string=""; 
    CRPT_ServicerLoan:string="";  
}
export class ClientResultPLSModel { 
    CRPLS_PkeyID: Number = 0; 
    CRPLS_WO_ID: Number = 0;
    Type:Number = 1; 
    CRPLS_IsActive: boolean = true;   
    CRPLS_BorrowerEmail:string="";  
    CRPLS_BorrowerName:string="";  
    CRPLS_BorrowerPhone:string="";  
    CRPLS_LoanNumber:string="";  
    CRPLS_LoanStatus:Number=0;  
    CRPLS_LoanType:Number=0;  
    CRPLS_PropertyMortgagee:string="";  
    CRPLS_UnpaidPrincipalBalance:string="";   
}
export class ClientResultPSDModel { 
    CRPSD_PkeyID: Number = 0; 
    CRPSD_WO_ID: Number = 0;
    Type:Number = 1; 
    CRPSD_IsActive: boolean = true;    
    CRPSD_BoardingDate:any;
    CRPSD_LastInspectedDate:any;
    CRPSD_InspectionCycle:any;
    CRPSD_LastInteriorCleanDate:any;
    CRPSD_InitialInspectionComplete:any;
    CRPSD_CleanOutComplete:any;

}
