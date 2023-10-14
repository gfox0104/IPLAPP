interface MultiDropDownModel {
  label: string;
  data: any;
  model: string;
  settings: any;
}

export const MultiDropdowns: MultiDropDownModel[] = [
  {
    label: 'Client',
    data: [],
    model: 'Task_sett_Company',
    settings: {
      singleSelection: false,
      idField: "Client_pkeyID",
      textField: "Client_Company_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true 
    }
  },
  {
    label: 'Customer',
    data: [],
    model: 'Task_sett_Customer',
    settings: {
      singleSelection: false,
      idField: "Cust_Num_pkeyId",
      textField: "Cust_Num_Number",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  },
  {
    label: 'Loan Type',
    data: [],
    model: 'Task_sett_Lone',
    settings: {
      singleSelection: false,
      idField: "Loan_pkeyId",
      textField: "Loan_Type",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  },
  {
    label: 'Work Type',
    data: [],
    model: 'WTTaskWorkType',
    settings: {
      singleSelection: false,
      idField: "WT_pkeyID",
      textField: "WT_WorkType",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  },
  {
    label: 'Work Type Group',
    data: [],
    model: 'Task_Work_TypeGroup',
    settings: {
      singleSelection: false,
      idField: "Work_Type_Cat_pkeyID",
      textField: "Work_Type_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  },
  {
    label: 'State',
    data: [],
    model: 'Task_sett_State',
    settings: {
      singleSelection: true,
      idField: "IPL_StateID",
      textField: "IPL_StateName",
      // selectAllText: "Select All",
      // unSelectAllText: "UnSelect All",
      // itemsShowLimit: 1,
      allowSearchFilter: true
    }
  }, 
  {
    label: 'County',
    data: [],
    model: 'Task_sett_Country',
    settings: {
      singleSelection: false,
      idField: "ID",
      textField: "COUNTY",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  }
]
