export class IPLDropdown {
    FiltersWorkType: FiltersWorkType[]
    FiltersCompany: FiltersCompany[]
    FiltersLoanType: FiltersLoanType[]
    FiltersCustomer: FiltersCustomer[]
    FiltersWorkTypeGroup: FiltersWorkTypeGroup[]
}
export class FiltersCompany {
    Client_Company_Name: string
    Client_pkeyID: number
}
export class FiltersWorkType {
    WT_WorkType: string
    WT_pkeyID: number
}
export class FiltersLoanType {
    FilterData?: string
    Loan_IsActive?: boolean
    Loan_IsDelete?: boolean
    Loan_Type: string
    Loan_pkeyId: number
    Type: number
    UserID?: number
    WhereClause?: string
}
export class FiltersCustomer {
    Cust_Num_Active?: boolean
    Cust_Num_IsActive?: boolean
    Cust_Num_IsDelete?: boolean
    Cust_Num_Number: string
    Cust_Num_pkeyId: number
    FilterData?: string
    Type: number
    UserID?: number
    WhereClause?: string
}
export class FiltersWorkTypeGroup {
    Type: number
    UserID: number
    Work_Type_Cat_pkeyID: number
    Work_Type_IsActive: boolean
    Work_Type_Name: string
    Work_Type_NameArr?: string
}

export class formsMasterModel {
    FormId: number = 0;
    FormName: string = ''
    IsRequired: boolean = false
    OfficeResults: boolean = false
    FieldResults: boolean = false
    Form_IsActive: boolean = false
    Form_IsAutoAssign: boolean = false
    Published: boolean = false
    WO_FormId: number = 0
    Type: number = 1;
    WO_Filters: IPLDropdown;
    FormNumber_Id: string = '';
    FormAddedby: number ;
    Where:string = '';
    Form_Version_No: number ;
    User_FirstName:string = 'Select';
    Form_CreatedBy:String = "";
    Form_ModifiedBy:String = "";
}

export class formsQuestionAnswersModel {
    AnswerId?: number = 0
    QuestionId?: number = 0
    Question?: string = ''
    OptionId?: number = 0
    AnswerValue?: string = ''
    QuestionTypeId?: number = 0
    FormId?: number = 0
    Type?: number = 1
    Answer_IsActive?: boolean = false
    WorkOrderId: number = 0
    Address?: string = ''
}

export class formDocumentModel {
    FMFI_Pkey: number = 0;
    FMFI_FormId: number = 0;
    Type: number = 1;
}

export class importFormModel {
    Imtr_FromId: number = 0;
    Imtr_FileName: string = ''
    Imtr_FilePath: string = ''
    Imtr_File: any
    Type: number = 1;
}

export class TmpFbFormModel {
    Fb_Dynamic_pkeyID: number = 0;
    Fb_Dynamic_Tab_Name: string = ''
    Fb_Dynamic_Office_Results: boolean = false
    Fb_Dynamic_FieldResults: boolean = false
    Fb_Dynamic_IsActive: boolean = false
    Fb_Dynamic_WorkTypeId: number = 0;
    Type: number = 0;
}
