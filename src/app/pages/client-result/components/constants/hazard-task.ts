export class HazardTask {
  data = {
    Task_Hazard_pkeyID: 0,
    Task_Hazard_WO_ID: 0,
    Task_Hazard_Name: "",
    Task_Hazard_Description:"",
    Task_Hazard_Date_Discovered:"",
    Task_Hazard_Comment:"",
  };

  public getHazardTask(dataItem) {
    Object.keys(this.data).forEach(key => {
      this.data[key] = dataItem[key] ? dataItem[key] : this.data[key];
    });

    return this.data;
  }
}
