import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Import From',
    required: true,
    type: 'select',
    id: 'userNfuuiame1',
    model: 'WI_ImportFrom',
    formControlName: 'Importval',
    value: 'Import_Form_PkeyId',
    option: 'Import_Form_Name',
    data: [],
    flag: false,
  },
  {
    label: 'Set Client',
    required: true,
    type: 'kendo select',
    id: 'userNfuuiame2',
    model: 'WI_SetClientCompany',
    formControlName: 'clientcompanyval',
    value: 'Client_pkeyID',
    option: 'Client_Company_Name',
    data: [],
    flag: false,
  },
  {
    label: 'Import Id',
    required: true,
    type: 'email',
    id: 'userNfuuiame3',
    model: 'WI_LoginName',
    formControlName: 'LoginName',
    placeholder: 'Enter Import Id'
  },
  {
    label: 'Coordinator',
    required: false,
    type: 'kendo select',
    id: 'userNfuu1',
    model: 'WI_Coordinator',
    formControlName: 'clientcoordival',
    value: 'User_pkeyID',
    option: 'User_FirstName',
    data: [],
    flag: false,
  },
  {
    label: 'Password',
    required: true,
    type: 'password',
    id: 'userNfuuiame4',
    model: 'WI_Password',
    formControlName: 'Password',
    placeholder: 'Enter Password'
  }, 
  {
    label: 'Processor',
    required: false,
    type: 'kendo select',
    id: 'userNfuu2',
    model: 'WI_Processor',
    formControlName: 'clientprocval',
    value: 'User_pkeyID',
    option: 'User_FirstName',
    data: [],
    flag: false,
  },
  
  {
    label: 'Import Name',
    required: true,
    type: 'text',
    id: 'userNfuuiame6',
    model: 'WI_FriendlyName',
    formControlName: 'friendlyname',
    placeholder: 'Enter Import Name'
  },
  {
    label: 'Set Category',
    required: false,
    type: 'kendo select',
    id: 'userNfuuiame9',
    model: 'WI_SetCategory',
    formControlName: 'setcategory',
    value: 'Cat_ID',
    data: [],
    option: 'Cat_Name',
    flag: false,
  },
  {
    label: 'Rep Code',
    required: false,
    type: 'text',
    id: 'userCode',
    model: 'WI_Res_Code',
    formControlName: 'ResCode',
    placeholder: 'Enter Code'
  },
  {
    label: 'Discount % for this Import',
    required: false,
    type: 'text',
    id: 'userNfuuiame4',
    model: 'WI_Discount_Import',
    formControlName: 'thisimport',
  },
  {
    label: 'Skip Comments',
    required: false,
    type: 'checkbox',
    id: 'switchisActive',
    model: 'WI_SkipComments',
    formControlName: 'skipcomments',
    value: 'id',
    data: [
      { id: 1, name: "Yes" },
      { id: 2, name: "No" }
    ],
    option: 'name'
  },
  // {
  //   label: 'New Order Alert',
  //   required: false,
  //   type: 'email',
  //   id: 'userNfuuiame5',
  //   model: 'WI_AlertEmail',
  //   formControlName: 'alertemail',
  //   placeholder: 'Enter Alert Email'
  // },

  {
    label: 'New Order Alert',
    required: false,
    type: 'kendo select',
    id: 'userNfuu22',
    model: 'WI_AlertEmail',
    formControlName: 'alertemail',
    data: [],
    flag: false,
  },
 
  
  {
    label: 'State Filter',
    required: false,
    type: 'kendo select',
    id: 'userNfuuiame10',
    model: 'WI_StateFilter',
    formControlName: 'statefilter',
    value: 'id',
    data: [],
    option: 'name',
    flag: false,
  },
  
  
  // {
  //   label: 'Changed Order Alert',
  //   required: false,
  //   type: 'email',
  //   id: 'userNfuuiame6',
  //   model: 'WI_Changed_Order_Alert',
  //   formControlName: 'ChangedOrderAlert',
  //   placeholder: 'Enter Alert Email'
  // },

  {
    label: 'Changed Order Alert',
    required: false,
    type: 'kendo select',
    id: 'userNfuuiame6',
    model: 'WI_Changed_Order_Alert',
    formControlName: 'ChangedOrderAlert',
    data: [],
    flag: false,
  },
  // {
  //   label: 'Skip Line Items',
  //   required: false,
  //   type: 'select',
  //   id: 'userNfuuiame8',
  //   model: 'WI_SkipLineItems',
  //   formControlName: 'skipline',
  //   value: 'id',
  //   data: [
  //     { id: 1, name: "Yes" },
  //     { id: 2, name: "No" }
  //   ],
  //   option: 'name'
  // },
  {
    label: 'Skip Line Items',
    required: false,
    type: 'checkbox',
    id: 'userNfuuiame8',
    model: 'WI_SkipLineItems',
    formControlName: 'skipline',
    value: 'id',
    data: [
      { id: 1, name: "Yes" },
      { id: 2, name: "No" }
    ],
    option: 'name'
  },
  // {
  //   label: 'Cancelled Order Alert',
  //   required: false,
  //   type: 'email',
  //   id: 'userNfuuiame7',
  //   model: 'WI_Cancelled_Order_Alert',
  //   formControlName: 'CancelledOrderAlert',
  //   placeholder: 'Enter Alert Email'
  // },
  {
    label: 'Cancelled Order Alert',
    required: false,
    type: 'kendo select',
    id: 'userNfuuiame7',
    model: 'WI_Cancelled_Order_Alert',
    formControlName: 'CancelledOrderAlert',
    data: [],
    flag: false,
  },
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'autoimport',
    formControlName: 'activeatou',
    model: 'WI_IsActive'
  }
]
export const FormFieldsone: FormField[] = [
  {
    label: 'Import From',
    required: true,
    type: 'select',
    id: 'userNfuuiame1',
    model: 'WI_ImportFrom',
    formControlName: 'Importval',
    value: 'Import_Form_PkeyId',
    option: 'Import_Form_Name',
    data: [],
    flag: false,
  },
  {
    label: 'Set Client',
    required: true,
    type: 'kendo select',
    id: 'userNfuuiame2',
    model: 'WI_SetClientCompany',
    formControlName: 'clientcompanyval',
    value: 'Client_pkeyID',
    option: 'Client_Company_Name',
    data: [],
    flag: false,
  },
  {
    label: 'Login Name',
    required: true,
    type: 'email',
    id: 'userNfuuiame3',
    model: 'WI_LoginName',
    formControlName: 'LoginName',
    placeholder: 'Enter Login Name'
  },
  {
    label: 'Password',
    required: true,
    type: 'password',
    id: 'userNfuuiame4',
    model: 'WI_Password',
    formControlName: 'Password',
    placeholder: 'Enter Password'
  },
  {

    label: 'Five Brothers UserName',
    required: false,
    type: 'text',
    id: 'userNfuuiame13',
    model: 'WI_Access_UserName',
    formControlName: 'accessusername',
    placeholder: 'Enter Five Brothers UserName',
    
  },
  {
    
    label: 'Five Brothers Password',
    required: false,
    type: 'password',
    id: 'userNfuuiame14',
    model: 'WI_Access_Password',
    formControlName: 'AccessPassword',
    placeholder: 'Enter Five Brothers UserName',
   
  },
  {
    label: 'Alert Email',
    required: false,
    type: 'email',
    id: 'userNfuuiame5',
    model: 'WI_AlertEmail',
    formControlName: 'alertemail',
    placeholder: 'Enter Alert Email'
  },
  {
    label: 'Import Name',
    required: true,
    type: 'text',
    id: 'userNfuuiame6',
    model: 'WI_FriendlyName',
    formControlName: 'friendlyname',
    placeholder: 'Enter Import Name'
  },
  {
    label: 'Skip Comments',
    required: false,
    type: 'select',
    id: 'userNfuuiame7',
    model: 'WI_SkipComments',
    formControlName: 'skipcomments',
    value: 'id',
    data: [
      { id: 1, name: "Yes" },
      { id: 2, name: "No" }
    ],
    option: 'name'
  },
  {
    label: 'Coordinator',
    required: false,
    type: 'kendo select',
    id: 'userNfuu1',
    model: 'WI_Coordinator',
    formControlName: 'clientcoordival',
    value: 'User_pkeyID',
    option: 'User_FirstName',
    data: [],
    flag: false,
  },
  {
    label: 'Processor',
    required: false,
    type: 'kendo select',
    id: 'userNfuu2',
    model: 'WI_Processor',
    formControlName: 'clientprocval',
    value: 'User_pkeyID',
    option: 'User_FirstName',
    data: [],
    flag: false,
  },
  {
    label: 'Skip Line Items',
    required: false,
    type: 'select',
    id: 'userNfuuiame8',
    model: 'WI_SkipLineItems',
    formControlName: 'skipline',
    value: 'id',
    data: [
      { id: 1, name: "Yes" },
      { id: 2, name: "No" }
    ],
    option: 'name'
  },
  {
    label: 'Set Category',
    required: false,
    type: 'kendo select',
    id: 'userNfuuiame9',
    model: 'WI_SetCategory',
    formControlName: 'setcategory',
    value: 'Cat_ID',
    data: [],
    option: 'Cat_Name',
    flag: false,
  },
  {
    label: 'State Filter',
    required: false,
    type: 'kendo select',
    id: 'userNfuuiame10',
    model: 'WI_StateFilter',
    formControlName: 'statefilter',
    value: 'id',
    data: [],
    option: 'name',
    flag: false,
  },
  {
    label: 'Discount % for this Import',
    required: false,
    type: 'text',
    id: 'userNfuuiame4',
    model: 'WI_Discount_Import',
    formControlName: 'thisimport',
  },
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'autoimport',
    formControlName: 'activeatou',
    model: 'WI_IsActive'
  }
]

