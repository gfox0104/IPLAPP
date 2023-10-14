export class Damage {
  data = {
    Task_Damage_pkeyID: 0,
    Task_Damage_WO_ID: 0,
    Task_Damage_Task_ID: 0,
    Task_Damage_ID: 0,
    Task_Damage_Type: 0,
    Task_Damage_Int: "1",
    Task_Damage_Location: "",
    Task_Damage_Qty: 1,
    Task_Damage_Estimate: "0.00",
    Task_Damage_Disc: "",
    Task_Damage_IsActive: true,
    Task_Damage_IsDelete: false,
    Task_Damage_PreTextHide:false,
    Task_Damage_PresetTemp: "other",
    PresetText:'',
    Task_Damage_Status: 0,
    Task_Damage_Other_Name: "",
  }
  static Task_Damage_PreTextHide: string;

  public getDamage(dataItem) {
    debugger;
    Object.keys(this.data).forEach(key => {
      this.data[key] = dataItem[key] ? dataItem[key] : this.data[key];
    })

    return this.data;
  }
}