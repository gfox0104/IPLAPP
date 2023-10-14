export class ClientResultInstructionModel {
    Instr_pkeyId: Number = 0;
    Instr_Task_Id: Number = 0;
    Instr_Task_pkeyId: Number = 0;
    Instr_WO_Id: Number = 0;
    Instr_Task_Name: Number = 0;
    Instr_Qty: Number = 0;
    Instr_Contractor_Price: Number = 0.00;
    Instr_Client_Price: Number = 0.00;
    Instr_Contractor_Total: Number = 0.00;
    Instr_Client_Total: Number = 0.00;
    Instr_Action: Number = 0;
    Instr_IsActive: boolean = true;
    Instr_IsDelete: boolean = true;
    UserID: Number = 0;
    Type: Number = 1;
    InstructionDataArray: any;
    DetailsDataArray: any;
    InstDataArray: any;
    Instr_ValType: Number = 0;
    SingleEditBox: any;
    Instr_Comand_Mobile: String = "";
    Instr_Task_Comment: String = "";
    Inst_Comand_Mobile_details: String = "";
    Instr_Other_Task_Name: String = "";
}
export class InstructionMasterDrDNameModel {
    Inst_Task_pkeyId: Number = 0;
    Inst_Task_Type_pkeyId: Number = 0;
    Task_Name: String = "";
    Type: Number = 1;
    WorkOrderID: Number = 0;
}

export class InstructionMasterTaskModel {
    Task_pkeyID: Number = 0;
    Inst_Task_pkeyId: Number = 0;
    Inst_Task_Name: String = "";
    Inst_Task_IsActive: boolean = true;
    UserID: Number = 0;
    Type: Number = 1;
    WorkOrderID: Number = 0;
}

export class InstructionMasterTaskTypeModel {
    Ins_Type_pkeyId: Number = 0;
    Ins_Type_Name: String = "";
    Ins_Type_IsActive: boolean = true;
    UserID: Number = 0;
    Type: Number = 1;
}

export class SigleEditBoxModel {
    Inst_Ch_pkeyId: Number = 0;
    Inst_Ch_Wo_Id: Number = 0;
    Inst_Ch_Text: String = "";
    Inst_Ch_IsActive: boolean = true;
    Inst_Ch_Delete: boolean = false;
    UserID: Number = 0;
    Instr_Comand_Mobile: String = "";
}

export class InstructionAcessLogModel {
    Alm_Pkey: Number = 0;
    Alm_workOrder_ID: Number = 0;
    Alm_userID: Number = 0;
    Alm_Remark: String = "";
    Alm_AccessDate: String = "";
    Alm_Status: Number = 0;
    Alm_log: String = "";
    Alm_IsActive: boolean = true;
    Type: number = 1;
    UserId: Number = 0;
    Status_Name: String = "";
    LogUserName: String = "";
    LogDate: String = "";
    Inst_Doc_PkeyID: Number = 0;
    
}
