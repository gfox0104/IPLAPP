interface MultiDropDownModel {
  label: string;
  data: any;
  model: string;
  settings: any;
}

export const MultiDropdowns: MultiDropDownModel[] = [
  {
    label: 'Client Company',
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
    label: 'Contractor',
    data: [],
    model: 'Task_sett_Contractor',
    settings: {
      singleSelection: false,
      idField: "User_pkeyID",
      textField: "User_FirstName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  },
  {
    label: 'Coordinator',
    data: [],
    model: 'Task_sett_Admin',
    settings: {
      singleSelection: false,
      idField: "User_pkeyID",
      textField: "User_FirstName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  },
  {
    label: 'Category',
    data: [],
    model: 'Task_sett_Category',
    settings: {
      singleSelection: false,
      idField: "Cat_ID",
      textField: "Cat_Name",
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
      singleSelection: false,
      idField: "IPL_StateID",
      textField: "IPL_StateName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  }
]
