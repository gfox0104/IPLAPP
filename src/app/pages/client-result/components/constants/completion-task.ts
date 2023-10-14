export class CompletionTask {
  data = {
    Task_Inv_pkeyID: 0,
    Task_Inv_TaskID: 0,
    Task_Inv_WO_ID: 0,
    Task_Inv_Qty: 1,
    Task_Inv_Uom_ID: 0,
    Task_Inv_Cont_Price: "0.00",
    Task_Inv_Cont_Total: "0.00",
    Task_Inv_Clnt_Price: "0.00",
    Task_Inv_Clnt_Total: "0.00",
    Task_Inv_Comments: '',
    Task_Inv_Violation: false,
    Task_Inv_damage: false,
    Task_Inv_IsActive: true,
    Task_Inv_Status: 0,
    Com_Other_Task_Name: '',
    Task_Inv_Hazards: false,
    Task_Inv_Auto_Invoice: 0,

    Task_Ext_pkeyID: 0,
    Task_Ext_BidID: 0,
    Task_Ext_WO_ID: 0,
    Task_Ext_Location: "",
    Task_Ext_DamageCauseId: 0,
    Task_Ext_Length: "",
    Task_Ext_Width: "",
    Task_Ext_Height: "",
    Task_Ext_Men: "",
    Task_Ext_Hours: "",
    Task_Ext_IsActive: true,
  };

  public getCompletionTask(dataItem) {
    Object.keys(this.data).forEach(key => {
      this.data[key] = dataItem[key] ? dataItem[key] : this.data[key];
    });

    return this.data;
  }
}