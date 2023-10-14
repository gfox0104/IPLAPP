interface WorkOrderField {
  fields: {
    label: string,
    required: boolean,
    type: string,
    id: string,
    formControlName: string,
    placeholder?: string,
    disabled?: boolean,
    model: string,
    labelStyle?: string,
    fieldStyle?: string,
    data?: Array<any>,
    flag?: boolean,
    value?: string,
    option?: string,
    rows?: number,
    pattern?: string,
    readonly?: boolean
    email?: boolean,
    numbersOnly?: boolean;
  }[]
}

const WorkOrderFields1: WorkOrderField[] = [
  {
    fields: [
      {
        label: 'Work Order # ',
        required: true,
        type: 'input',
        id: 'inputEmail42',
        formControlName: 'WONumber',
        placeholder: 'Enter Order Number...',
        model: 'workOrderNumber',
      }
    ]
  },
  {
    fields: [
      {
        label: 'Client',
        required: true,
        type: 'select',
        id: 'inputEmail4er',
        formControlName: 'CompanyVal',
        model: 'Company',
        data: [{
          Client_pkeyID: 0,
          Client_Company_Name: "Select"
        }],
        flag: false,
        value: 'Client_pkeyID',
        option: 'Client_Company_Name',
      }
    ]
  },
  {
    fields: [
      {
        label: 'Work Type',
        required: true,
        type: 'select',
        id: 'inputAddress',
        formControlName: 'WorkTypeval',
        model: 'WorkType',
        data: [{
          WT_pkeyID: 0,
          WT_WorkType: "Select"
        }],
        flag: false,
        value: 'WT_pkeyID',
        option: 'WT_WorkType'
      }
    ]
  },

  {
    fields: [
      {
        label: 'Address ',
        required: true,
        type: 'textarea',
        id: 'inputEmail4fb',
        formControlName: 'AddressVal',
        placeholder: 'Enter Address',
        model: 'address1',
        rows: 3,
      }
    ]
  },
  {
    fields: [

      {
        label: 'State ',
        required: true,
        type: 'select',
        id: 'inputStatefv',
        formControlName: 'stateval',
        model: 'state',
        data: [{
          IPL_StateID: 0,
          IPL_StateName: "Select"
        }],
        flag: false,
        value: 'IPL_StateID',
        option: 'IPL_StateName'
      },
      {
        label: 'City ',
        required: true,
        type: 'input',
        id: 'inputCityxc',
        formControlName: 'cityVal',
        placeholder: 'Enter city...',
        model: 'city',
        pattern: '/^[a-zA-Z\s]*$/'
      },
      {
        label: 'Zip ',
        required: true,
        type: 'input',
        id: 'inputZipcv',
        formControlName: 'ZipVal',
        placeholder: 'Enter zip...',
        model: 'zip',
        numbersOnly:true
      }
    ]
  },

  {
    fields: [
      {
        label: 'Name',
        required: false,
        type: 'input',
        id: 'inputPassword4',
        formControlName: 'NameVal',
        placeholder: 'Enter Na..',
        model: 'Com_Name'
      },
      {
        label: 'Phone',
        required: false,
        type: 'input',
        id: 'inputEmail4f',
        formControlName: 'PhoneVal',
        placeholder: 'Enter Phone No',
        model: 'Com_Phone',
        numbersOnly:true
      },
      {
        label: 'Email',
        required: false,
        type: 'input',
        id: 'inputPassword4h',
        formControlName: 'EmailVal',
        placeholder: 'Enter Email',
        model: 'Com_Email',
        email:true
      }
    ]
  },
  {
    fields: [
      {
        label: 'Contractor',
        required: false,
        type: 'select',
        id: 'inputCityrf',
        formControlName: 'ContractorVal',
        model: 'Contractor',
        data: [{
          User_pkeyID: 0,
          User_FirstName: "Select"
        }],
        flag: false,
        value: 'User_pkeyID',
        option: 'User_FirstName'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Coordinator',
        required: false,
        type: 'select',
        id: 'inputCityrf',
        formControlName: 'CordinatorVal',
        model: 'Cordinator',
        data: [{
          User_pkeyID: 0,
          User_FirstName: "Select"
        }],
        flag: false,
        value: 'User_pkeyID',
        option: 'User_FirstName'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Processor',
        required: false,
        type: 'select',
        id: 'inputCityrfasd',
        formControlName: 'ProcessorVal',
        model: 'Processor',
        data: [{
          User_pkeyID: 0,
          User_FirstName: "Select"
        }],
        flag: false,
        value: 'User_pkeyID',
        option: 'User_FirstName'
      }

    ]

  },
  {
    fields: [
      {
        label: 'Mortgagor',
        required: false,
        type: 'input',
        id: 'inputPassword4',
        formControlName: 'MortVal',
        placeholder: 'Enter Mortgagor',
        model: 'Mortgagor'
      },

    ]


  },
  {
    fields: [
      {
        label: 'Background Provider',
        required: false,
        type: 'select',
        id: 'inputbg',
        formControlName: 'BackgroundVal',
        model: 'Background',
        flag: false,
        data: [{
          Back_Chk_ProviderID: 0,
          Back_Chk_ProviderName: "Select"
        }],
        value: 'Back_Chk_ProviderID',
        option: 'Back_Chk_ProviderName'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Office Locked',
        type: 'checkbox',
        required: false,
        id: 'customSwitch15',
        formControlName: 'IsEdit',
        model: 'IsEdit',
        fieldStyle: 'custom-switch'
      },
      {
        label: '',
        type: '',
        required: false,
        id: 'customCheck11c',
        formControlName: 'IsInspectionVal',
        model: 'ISInspection',
        fieldStyle: 'custom-checkbox'
      }
    ]
  },
]

const WorkOrderFields2: WorkOrderField[] = [
  {
    fields: [
      {
        label: 'IPL # ',
        required: true,
        type: 'input',
        id: 'jgffhgfhfg',
        formControlName: 'IPLNumberVal',
        placeholder: 'Enter Order Number...',
        model: 'IPLNO',
        readonly: true
      }
    ]
  },
  {
    fields: [
      {
        label: 'Category',
        required: false,
        type: 'select',
        id: 'inputPassword4r',
        formControlName: 'CategoryVal',
        model: 'Category',
        flag: false,
        data: [{
          Cat_ID: 0,
          Cat_Name: "Select"
        }],
        value: 'Cat_ID',
        option: 'Cat_Name'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Loan Type',
        required: false,
        type: 'select',
        id: 'inputPassword4r',
        formControlName: 'LoanVal',
        model: 'Loan_Info',
        flag: false,
        data: [{
          Loan_pkeyId: 0,
          Loan_Type: "Select"
        }],
        value: 'Loan_pkeyId',
        option: 'Loan_Type'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Loan Number',
        required: false,
        type: 'input',
        id: 'inputnum',
        formControlName: 'LoanNumberVal',
        placeholder: 'Enter Loan Number',
        model: 'Loan_Number'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Customer #',
        required: false,
        type: 'select',
        id: 'inputAddress',
        formControlName: 'CustomerVal',
        model: 'Customer_Number',
        flag: false,
        data: [{
          Cust_Num_pkeyId: 0,
          Cust_Num_Number: "Select"
        }],
        value: 'Cust_Num_pkeyId',
        option: 'Cust_Num_Number'
      }
    ]
  },
  {
    fields: [
      {
        label: 'BATF',
        type: 'checkbox',
        required: false,
        id: 'customSwitch1',
        formControlName: 'BATFVal',
        model: 'BATF',
        fieldStyle: 'custom-switch'
      },
      {
        label: '',
        type: '',
        required: false,
        id: 'customCheck11c',
        formControlName: 'IsInspectionVal',
        model: 'ISInspection',
        fieldStyle: 'custom-checkbox'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Lot Size',
        type: 'input',
        required: false,
        id: 'inputCityrfSize',
        formControlName: 'LotSizeVal',
        model: 'Lotsize',
        placeholder: 'Enter size...',
        labelStyle: 'col-md-6'
      },
      {
        label: 'Rush',
        type: 'select',
        required: false,
        id: 'inputStatwewe',
        formControlName: 'RushVal',
        model: 'Rush',
        data: [{
          rus_pkeyID: 0,
          rus_Name: "Select"
        }],
        flag: false,
        value: 'rus_pkeyID',
        option: 'rus_Name',
        labelStyle: 'col-md-6'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Lock Code',
        type: 'textarea',
        required: false,
        id: 'inputCitybnCode',
        formControlName: 'LockCodeVal',
        model: 'Lock_Code',
        placeholder: 'Enter lock code...',
        rows: 1
      }
    ]
  },
  {
    fields: [
      {
        label: 'Lock Location',
        type: 'input',
        required: false,
        id: 'inputLockLocation',
        formControlName: 'LockLocationVal',
        placeholder: 'Enter Lock Location',
        model: 'Lock_Location'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Key Code',
        type: 'input',
        required: false,
        id: 'inputkeycode',
        formControlName: 'KeyCodeVal',
        placeholder: 'Enter Key Code',
        model: 'Key_Code'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Gate Code',
        type: 'input',
        required: false,
        id: 'inputgatecode',
        formControlName: 'GateCodeVal',
        placeholder: 'Enter Gate Code',
        model: 'Gate_Code'
      }
    ]
  },
  {
    fields: [
      {
        label: 'Broker Info',
        type: 'textarea',
        required: false,
        id: 'dfsdfds',
        formControlName: 'BrokerInfoVal',
        placeholder: 'Enter Broker Info...',
        model: 'Broker_Info'
      }
    ]
  },

]


export const WorkOrderFields = [
  WorkOrderFields1,
  WorkOrderFields2
]
