export class ViolationTask {
  data = {
    Task_Violation_pkeyID: 0,
    Task_Violation_WO_ID: 0,
    Task_Violation_Name: "",
    Task_Violation_Date:"",
    Task_Violation_Deadline :"",
    Task_Violation_Id:"",
    Task_Violation_Date_Discovered:"",
    Task_Violation_Fine_Amount:0.00,
    Task_Violation_Contact:"",
    Task_Violation_Comment:"",
  };

  public getViolationTask(dataItem) {
    Object.keys(this.data).forEach(key => {
      this.data[key] = dataItem[key] ? dataItem[key] : this.data[key];
    });

    return this.data;
  }
}
