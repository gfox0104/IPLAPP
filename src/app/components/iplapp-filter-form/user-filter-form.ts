interface UserFilterForm {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  model: string;
  data?: Array<any>,
  value?: string;
  option?: string;
  style?: string;
  defaultdropdown?:any;
}

export const UserViewFilters: UserFilterForm[] =[
  {
    label: 'First Name',
    id: 'userName1',
    type: 'text',
    placeholder: 'Enter User Name',
    model: 'User_FirstName'
  },
  {
    label: 'Last Name',
    id: 'LasClienttx',
    type: 'text',
    placeholder: 'Enter Last Name',
    model: 'User_LastName'
  },
  {
    label: 'Company',
    id: 'LaEmailstx',
    type: 'text',
    placeholder: 'Enter Company',
    model: 'User_CompanyName',
    style: 'col-md-1.6'
  },
  {
    label: 'Login Name',
    id: 'LasClienttxt',
    type: 'text',
    placeholder: 'Enter Login Name',
    model: 'User_LoginName',
    style: 'col-md-1.6'
  },
  {
    label: 'Login Email',
    id: 'LasClienttx',
    type: 'text',
    placeholder: 'Enter Email Id',
    model: 'User_Email',
    style: 'col-md-1.6'
  },
  {
    label: 'Group',
    id: 'LastxNdfdsumber',
    type: 'select',
    placeholder: '',
    model: 'User_Group',
    data: [],
    value: 'Grp_pkeyID',
    option: 'Grp_Name',
    style: 'col-md-1',
    defaultdropdown:{Grp_Name:'Select',Grp_pkeyID:0}
  },
  {
    label: 'Mobile',
    id: 'LastxCity',
    type: 'number',
    placeholder: 'Enter Mobile No.',
    model: 'User_CellNumber'
  },
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'User_IsActive',
    style: 'col-md-1 custom-control'
  }
]

export const GroupFilters: UserFilterForm[] = [
  {
    label: 'Group Name',
    id: 'userName1',
    type: 'text',
    model: 'Grp_Name',
    placeholder: 'Enter Group Name'
  },
  {
    label: 'Group',
    id: 'LastxNdfdsumber',
    type: 'select',
    placeholder: '',
    model: 'User_Group',
    data: [],
    value: 'Group_DR_PkeyID',
    option: 'Group_DR_Name',
    defaultdropdown:{Group_DR_Name:'Select',Group_DR_PkeyID:0}

  },
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Grp_IsActive',
    style: 'col-md-1 custom-control'
  }
]

export const WorkTypeFilters: UserFilterForm[] = [
  {
    label: 'Work Type Name',
    id: 'userName1',
    type: 'text',
    model: 'WT_WorkType',
    placeholder: 'Enter Work Type Name'
  },
  {
    label: 'Work Type Groups',
    id: 'inputAddgdgress',
    type: 'select',
    model: 'WT_CategoryID',
    data: [],
    value: 'Work_Type_Cat_pkeyID',
    option: 'Work_Type_Name',
    defaultdropdown:{Work_Type_Name:'Select',Work_Type_Cat_pkeyID:0}

  },
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'WT_IsActive',
  }
]

export const TaskFilters: UserFilterForm[] = [
  {
    label: 'Client Name',
    id: 'userName1',
    type: 'text',
    model: 'Client_Company_Name',
    placeholder: 'Enter Client Name '
  },
  {
    label: 'Address',
    id: 'LastxAddress',
    type: 'text',
    model: 'Client_Billing_Address',
    placeholder: 'Enter Address'
  },
  {
    label: 'State',
    id: 'inputCityrfSizwdweaafss',
    type: 'select',
    model: 'Client_StateId',
    data: [],
    value: 'IPL_StateID',
    option: 'IPL_StateName',
    defaultdropdown:{IPL_StateName:'Select',IPL_StateID:0}
  },
  {
    label: 'City',
    id: 'LastxCity',
    type: 'text',
    model: 'Client_City',
    placeholder: 'Enter City'
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Client_IsActive',
  }
]

export const CustomerFilters: UserFilterForm[] = [
  {
    label: 'Customer ',
    id: 'userName1',
    type: 'text',
    model: 'Cust_Num_Number',
    placeholder: 'Enter Customer'
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Cust_Num_IsActive',
  }
]

export const StateFilters: UserFilterForm[] = [
  {
    label: 'State',
    id: 'userName1',
    type: 'text',
    model: 'IPL_StateName',
    placeholder: 'Enter State Name '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'IPL_State_IsActive',
  }
]

export const OccupancyStatusFilters: UserFilterForm[] = [
  {
    label: 'Occupancy Status',
    id: 'userName1',
    type: 'text',
    model: 'OS_Name',
    placeholder: 'Enter Occupancy Status Name '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'OS_IsActive',
  }
]

export const LotPricingFilters: UserFilterForm[] = [
  {
    label: 'Lot Pricing Filter',
    id: 'userName1',
    type: 'text',
    model: 'Lot_Pricing_Name',
    placeholder: 'Enter Lot Pricing Filter Name '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Lot_Pricing_IsActive',
  }
]

export const AccessUserLogFilters: UserFilterForm[] = [
  {
    label: 'Access User Action Filter',
    id: 'userName1',
    type: 'text',
    model: 'Acc_UserAction',
    placeholder: 'Enter Access User Action Filter Name '
  },
  {
    label: 'Access Log Data Filter',
    id: 'userName2',
    type: 'text',
    model: 'Acc_Access_Log_Data',
    placeholder: 'Enter Access Log Data Filter Name '
  },
  {
    label: 'Access Type of Log Filter',
    id: 'userName3',
    type: 'text',
    model: 'Acc_Type_of_Log',
    placeholder: 'Enter Access Type of Log Filter Name '
  },
  {
    label: 'Access Log Details Filter',
    id: 'userName4',
    type: 'text',
    model: 'Acc_Log_Details',
    placeholder: 'Enter Access Log Details Filter Name '
  },

]

export const BackgroundProviderFilters: UserFilterForm[] = [
  {
    label: 'Background Provider Filter',
    id: 'userName1',
    type: 'text',
    model: 'Back_Chk_ProviderName',
    placeholder: 'Enter Background Provider Filter Name '
  },

]

export const LoanStatusFilters: UserFilterForm[] = [
  {
    label: 'Loan Status',
    id: 'userName1',
    type: 'text',
    model: 'LS_Name',
    placeholder: 'Enter Loan Status Name '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'LS_IsActive',
  }
]

export const PropertyAlertFilters: UserFilterForm[] = [
  {
    label: 'Property Alert',
    id: 'userName1',
    type: 'text',
    model: 'PA_Name',
    placeholder: 'Enter Property Alert Name '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'PA_IsActive',
  }
]

export const PropertyFilters: UserFilterForm[] = [
  {
    label: 'Property',
    id: 'userName1',
    type: 'text',
    model: 'PT_Name',
    placeholder: 'Enter Property Type Name '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'PT_IsActive',
  }
]

export const UOMFilters: UserFilterForm[] = [
  {
    label: 'UOM',
    id: 'userName1',
    type: 'text',
    model: 'UOM_Name',
    placeholder: 'Enter UOM Name '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'UOM_IsActive',
  }
]

export const DamageFilters: UserFilterForm[] = [
  {
    label: 'Damage Name',
    id: 'userName1',
    type: 'text',
    model: 'Damage_Type',
    placeholder: 'Enter Damage Name '
  },
  {
    label: 'Int/Ext',
    type: 'select',
    id: 'userNfuuiame2',
    model: 'Damage_Int',
    value: 'Id',
    option: 'Name',
    data: [{ Id: '1', Name: "Int" }, { Id: '2', Name: "Ext" }],
    defaultdropdown:{Name:'Select',Id:0}

  },
  {
    label: 'Location',
    id: 'userName1',
    type: 'text',
    model: 'Damage_Location',
    placeholder: 'Enter Location '
  },
  // {
  //   label: 'Description',
  //   id: 'userName1',
  //   type: 'text',
  //   model: 'Damage_Disc',
  //   placeholder: 'Enter Description '
  // },
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Damage_IsActive',
  }
]
export const AutoImportFilters: UserFilterForm[] = [

  {
    label: 'Import From',
    id: 'userName2',
    type: 'select',
    model: 'Import_Form_Name',
    data: [],
    value: 'Import_Form_Name',
    option: 'Import_Form_Name',
    defaultdropdown:{Import_Form_Name:'Select',Import_Form_PkeyId:0}
  },
  {
    label: 'Client Name',
    id: 'userName1',
    type: 'text',
    model: 'Client_Company_Name',
    placeholder: 'Enter Client Name '
  },
  {
    label: 'Import Id',
    id: 'userName1',
    type: 'text',
    model: 'WI_LoginName',
    placeholder: 'Enter Import Id '
  },
  {
    label: 'Import Name',
    id: 'userName1',
    type: 'text',
    model: 'WI_FriendlyName',
    placeholder: 'Enter Import Name '
  },
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'WI_IsActive',
  }
]
export const CustomPhototFilters: UserFilterForm[] = [
  {
    label: 'Label Name ',
    id: 'userName1',
    type: 'text',
    model: 'PhotoLabel_Name',
    placeholder: 'Enter Custom Photo Name'
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'PhotoLabel_IsActive',
  }
]
export const CustomFormFilters: UserFilterForm[] = [
  {
    label: 'Form Name ',
    id: 'userName1',
    type: 'text',
    model: 'FormName',
    placeholder: 'Enter Form Name'
  },
  {
    label: 'Added By',
    id: 'LastxNdfdsumber',
    type: 'select',
    placeholder: '',
    model: 'FormAddedby',
    data: [],
    value: 'User_pkeyID',
    option: 'User_FirstName',
    defaultdropdown:{User_FirstName:'Select',User_pkeyID:0}

  },
  {
    label: 'Version',
    id: 'Form_Version_No',
    type: 'text',
    model: 'Version',
    placeholder: 'Enter Version No',
    style: 'col-md-1.2'
  },
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Form_IsActive',
    style: 'col-md-1.2'
  },

  {
    label: 'Required',
    id: 'IsRequired',
    type: 'checkbox',
    model: 'IsRequired',
    style: 'col-md-1.2'
  },
  {
    label: 'Office Results',
    id: 'OfficeResults',
    type: 'checkbox',
    model: ' OfficeResults',
    style: 'col-md-1.2'
  },
  {
    label: 'Field Result',
    id: 'FieldResults',
    type: 'checkbox',
    model: 'FieldResults',
    style: 'col-md-1.2'
  },
  {
    label: 'Published',
    id: 'Published',
    type: 'checkbox',
    model: 'Published',
    style: 'col-md-1.2'
  },


]


export const TaskInvFilters: UserFilterForm[] = [
  {
    label: 'Task Name ',
    id: 'userName1',
    type: 'text',
    model: 'Task_Name',
    placeholder: 'Enter Task Name'
  },
  {
    label: 'Task Type',

    type: 'select',
    id: 'userName1',
    model: 'Task_Type',
    value: 'Id',
    option: 'Name',
    data: [
      { Id: 1, Name: "Work" },
      { Id: 2, Name: "Inspection" }
    ],
    defaultdropdown:{Id: 0, Name: "Select"}

  },
  // {
  //   label: 'Task Photo Name',
  //   id: 'userName1',
  //   type: 'text',
  //   model: 'Task_Photo_Label_Name',
  //   placeholder: 'Enter Task Photo Name'
  // },
  
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Task_IsActive',
  }
]
export const IplCompanyFilters:UserFilterForm[] = [
  {
    label: 'Company Name ',
    id: 'userName1',
    type: 'text',
    model: 'IPL_Company_Name',
    placeholder: 'Enter Company Name'
  },
  {
    label: 'Address',
    id: 'userName1',
    type: 'text',
    model: 'IPL_Company_Address',
    placeholder: 'Enter Address Name'
  },
  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'IPL_Company_IsActive',
  },

]
export const AllowableFilters: UserFilterForm[] = [
  {
    label: 'Category Name',
    id: 'userName1',
    type: 'text',
    model: 'Allowables_Cat_Name',
    placeholder: 'Enter Category  '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Allowables_Cat_IsActive',
  }
]
export const AddAllowableFilters: UserFilterForm[] = [
  {
    label: 'Allowables',
    id: 'userName1',
    type: 'text',
    model: 'Allowable_Name',
    placeholder: 'Enter Allowables  '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Allowable_IsActive',
  }
]

export const AddPhotoHeaderFilters: UserFilterForm[] = [
  {
    label: 'Header Template',
    id: 'userName1',
    type: 'text',
    model: 'Photo_head_HeaderTemp',
    placeholder: 'Enter Header  '
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'Photo_head_IsActive',
  }
]
export const PropertyLockReasonFilter: UserFilterForm[] = [
  {
    label: 'Lock Reason Name',
    id: 'userName1',
    type: 'text',
    model: 'LockReason_Name',
    placeholder: 'Enter Lock Reason Name'
  },

  {
    label: 'Active',
    id: 'customCheck11dc',
    type: 'checkbox',
    model: 'LockReason_IsActive',
  }
]
