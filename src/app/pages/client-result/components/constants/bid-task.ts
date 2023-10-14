export class BidTask {
  data = {
    Task_Bid_pkeyID: 0,
    Task_Bid_TaskID: 0,
    Task_Bid_WO_ID: 0,
    Task_Bid_Qty: 1,
    Task_Bid_Uom_ID: 0,
    Task_Bid_Cont_Price: "0.00",
    Task_Bid_Cont_Total: "0.00",
    Task_Bid_Clnt_Price:"0.00",
    Task_Bid_Clnt_Total: "0.00",
    Task_Bid_Comments: "",
    Task_Bid_Violation: false,
    Task_Bid_damage: false,
    Task_Bid_IsActive: true,
    Task_Bid_IsDelete: false,
    Task_Bid_PresetTemp: "other",
    Task_Bid_PreTextHide: false,
    Bid_Other_Task_Name: "",
    Task_Bid_Hazards: false,
    isBidPriceDisable: false,
    //Task_Bid_DamageItem:0,
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

  public getBidTask(dataItem) {
    Object.keys(this.data).forEach(key => {
      this.data[key] = dataItem[key] ? dataItem[key] : this.data[key];
    });

    return this.data;
  }
}