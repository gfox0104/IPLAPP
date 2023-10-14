interface Column {
  field: string,
  title: string,
  width?: string,
  type?: string,
  tab?:string,
}
export const InitialColumns: Column[] = [
  {
    field: 'Status_Name',
    title: 'Status',
    width: '140'
  },
  {
    field: 'workOrderNumber',
    title: 'Work Order #',
    width: '140'
  },
  {
    field: 'dueDate',
    title: 'Due Date ',
    width: '100',
    type: 'date'
  },
  {
    field: 'address1',
    title: 'Address',
    width: '200'
  },
  {
    field: 'city',
    title: 'City',
    width: '120'
  },
  {
    field: 'state',
    title: 'State',
    width: '80'
  },
  {
    field: 'zip',
    title: 'Zip',
    width: '100'
  },
  {
    field: 'Lotsize',
    title: 'Lot Size',
    width: '180'
  },
  {
    field: 'Lock_Code',
    title: 'Lock Code',
    width: '100'
  },
  {
    field: 'IPLNO',
    title: 'IPL #',
    width: '100'
  },
  {
    field: 'addresscount',
    title: 'History',
    width: '100'
  },
  {
    field: 'photocount',
    title: 'Photos',
    width: '100'
  },
  {
    field: 'ContractorName',
    title: 'Contractor',
    width: '160'
  },
  {
    field: 'CordinatorName',
    title: 'Coordinator',
    width: '180'
  },
  {
    field: 'Main_Cat_Name',
    title: 'Category',
    width: '180'
  },
  {
    field: 'WT_WorkType',
    title: 'Work Type',
    width: '230',
  },
  {
    field: 'clientDueDate',
    title: 'Client Due Date',
    width: '100',
    type: 'date'
  },
  {
    field: 'Mortgagor',
    title: 'Mortgagor',
    width: '180'
  },
  // {
  //   field: '',
  //   title: 'Client Paid Amount',
  //   width: '100'
  // },
  // {
  //   field: '',
  //   title: 'Client Import ID',
  //   width: '100'
  // },
  {
    field: 'Cancel_Date',
    title: 'Cancel Date',
    width: '100',
    type: 'date'
  },
  {
    field: 'DateCreated',
    title: 'Created Date',
    width: '100',
    type: 'date'
  },
  {
    field: 'Field_complete_date',
    title: 'Field Complete Date',
    width: '100',
    type: 'date'
  },
  {
    field: 'SentToClient_date',
    title: 'Sent to Client Date',
    width: '100',
    type: 'date'
  },
  {
    field: 'Loan_Info',
    title: 'Loan',
    width: '100'
  },
  {
    field: 'Loan_Number',
    title: 'Loan Type',
    width: '100',
  },
  {
    field: 'Cust_Num_Number',
    title: 'Customer',
    width: '160'
  },
  {
    field: 'ProcessorName',
    title: 'Processor',
    width: '160'
  },
  {
    field: 'startDate',
    title: 'Start Date',
    width: '100',
    type: 'date'
  },
  {
    field: 'Client_Company_Name',
    title: 'Client',
    width: '180',
    tab:''
  },
  {
    field: 'messagecount',
    title: 'Message',
    width: '60',
    tab:''
  },
  {
    field: 'ecdnotecount',
    title: 'ECD Note',
    width: '80',
    tab:''
  },

  {
    field: 'Complete_Date',
    title: 'Complete Date',
    width: '80',
    tab:'',
    type: 'date'
  },
  {
    field: 'Mortgagor',
    title: 'Mortgagor Name',
    width: '80',
    tab:''
  },
  {
    field: 'CountyName',
    title: 'County Name',
    width: '80',
    tab:''
  },

  {
    field: 'LastCutDate',
    title: 'Last cut date',
    width: '80',
    tab:'',
    type: 'date'
  },

  {
    field: 'NextCutDate',
    title: 'Next cut date',
    width: '80',
    tab:'',
    type: 'date'
  },

  {
    field: 'ImportID',
    title: 'Import ID',
    width: '100',
    tab:''
  },
  {
    field: 'ImportName',
    title: 'Import Name',
    width: '100',
    tab:''
  },
  {
    field: 'Property_Status',
    title: 'Property Status',
    width: '80',
    tab:''
  },

  {
    field: 'Loan_Status',
    title: 'Loan Status',
    width: '80',
    tab:''
  },
  {
    field: 'propertyfrozen',
    title: 'Property Frozen',
    width: '80',
    tab:''
  },
  {
    field: 'Occupancy_Status',
    title: 'Occupancy Status',
    width: '80',
    tab:''
  },

  {
    field: 'EstimatedDate',
    title: 'Estimated Completion Date',
    width: '80',
    tab:'',
    type: 'date'
  },
  {
    field: 'Inv_Con_Status',
    title: 'Contractor Paid Status',
    width: '80',
    tab:''
  },
  {
    field: 'Inv_Con_Sub_Total',
    title: 'Contractor invoice total',
    width: '80',
    tab:'',
    type:'amount'
  },
  {
    field: 'Contractor_Balance',
    title: 'Contractor Invoice Balance',
    width: '80',
    tab:'',
    type:'amount'
  },
  {
    field: 'Contractor_Payment',
    title: 'Contractor Invoice Paid',
    width: '80',
    tab:'',
    type:'amount'
  },
  {
    field: 'Inv_Client_Status',
    title: 'Client Paid Status',
    width: '80',
    tab:''
},
  {
    field: 'Inv_Client_Sub_Total',
    title: 'Client invoice total',
    width: '80',
    tab:'',
    type:'amount'
  },
  {
    field: 'Client_Payment',
    title: 'Client Invoice Paid',
    width: '80',
    tab:'',
    type:'amount'
  },
  {
    field: 'Client_Balance',
    title: 'Client Invoice Balance',
    width: '80',
    tab:'',
    type:'amount'
  }
];
