export class NewClientResultPIModel{
    PI_PkeyID: Number = 0;
    PS_PkeyID: Number = 0;
    PI_WO_ID: Number = 0;
    PI_LockCode: String = "";
    PI_LockBox: String = "";
    PI_LockReason: String = "";
    PI_LotSize: String = "";
    CRPI_Lot_Size_Pricing:Number = 0;
    PI_VPSCode: String = "";
    PI_ICC: boolean = false;
    PI_ICCDate:any;
    PI_DaysInDefault: String = "";
    PI_VPRRequired: boolean = false;
    PI_VPRField: boolean = false;
    PI_VPRExpDate:any;
    PI_InitDefaultDate:any;
    PI_PtvDate:any;
    PI_InitSecureDate:any;
    PI_DidRecDate:any;
    PI_RecurringDate:any;
    PI_ConveyanceCondition:string="";
    PI_OrCovDate:any;
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
    CRPI_LoanNumber:string = '';
    CRPI_Mortgagor:string = '';

    CRPI_LoanType:number=0;
    CRPI_Loan_Status:string='';
    CRPI_Property_Status:string='';
    CRPS_Property_Type:string='';
    CRPI_Occupanct_Status:string='';
    CRPI_Property_Alert:string='';

    CRPI_Property_Locked:boolean = false;
    CRPI_Front_Of_HouseImagePath:string = '';
    CRPI_Front_Of_HouseImageName:string = '';
    CRPI_GPS_Latitude:string=''
    CRPI_GPS_longitude:string=''


    PI_Winterized:boolean = false;
    PI_WinterizedDate:string=''
    PI_Client:string=''
    CRPS_Customer:string=''

}
