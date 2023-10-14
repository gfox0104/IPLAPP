interface Column {
  field: string,
  title: string,
  width?: string,
  type?: string,
  groups?: any
}

export const BidHistroyColumns: Column[] = [
  {
    field: 'Task_Bid_Status_val',
    title: 'Status',
    width: '100'
  },
  {
    field: 'CountPhotos',
    title: 'Pics',
    width: '80'
  },
  {
    field: 'WT_WorkType',
    title: 'Work Type',
    width: '240'
  },
  {
    field: 'CORNT_User_FirstName',
    title: 'Contractor',
    width: '140'
  },
  {
    field: 'BIDDate',
    title: 'Date',
    width: '100'
  },
  {
    field: 'workOrderNumber',
    title: 'Work Order #',
    width: '140'
  },
  {
    field: 'Task_Name',
    title: 'Task',
    width: '200'
  },
  {
    field: 'Task_Bid_Qty',
    title: 'Qty',
    width: '80'
  },
  {
    field: '',
    title: 'Contractor',
    type: 'group',
    groups: [
      {
        field: 'Task_Bid_Cont_Price',
        title: 'Price',
        width: '80'
      },
      {
        field: 'Task_Bid_Cont_Total',
        title: 'Total',
        width: '80'
      },
    ]
  },
  {
    field: '',
    title: 'Client',
    type: 'group',
    groups: [
      {
        field: 'Task_Bid_Clnt_Price',
        title: 'Price',
        width: '80'
      },
      {
        field: 'Task_Bid_Clnt_Total',
        title: 'Total',
        width: '80'
      },
    ]
  },
  {
    field: 'Task_Bid_Comments',
    title: 'Comments',
    width: '140'
  }

];

export const CompletationHistroyColumns: Column[] = [
  {
    field: 'CORNT_User_FirstName',
    title: 'Contractor',
    width: '140'
  },
  {
    field: 'CountPhotos',
    title: 'Pics',
    width: '80'
  },
  {
    field: 'WT_WorkType',
    title: 'Work Type',
    width: '200'
  },
  {
    field: 'INVDate',
    title: 'Date',
    width: '100'
  },
  {
    field: 'workOrderNumber',
    title: 'Work Order #',
    width: '120'
  },
  {
    field: 'Task_Name',
    title: 'Task',
    width: '250'
  },
  {
    field: 'Task_Inv_Qty',
    title: 'Qty',
    width: '60'
  },
  {
    field: '',
    title: 'Contractor',
    type: 'group',
    groups: [
      {
        field: 'Task_Inv_Cont_Price',
        title: 'Price',
        width: '80'
      },
      {
        field: 'Task_Inv_Cont_Total',
        title: 'Total',
        width: '80'
      },
    ]
  },
  {
    field: '',
    title: 'Client',
    type: 'group',
    groups: [
      {
        field: 'Task_Inv_Clnt_Price',
        title: 'Price',
        width: '80'
      },
      {
        field: 'Task_Inv_Clnt_Total',
        title: 'Total',
        width: '80'
      },
    ]
  },
  {
    field: 'Task_Inv_Comments',
    title: 'Comments',
    width: '140'
  }
];

export const DamageHistoryColumns: Column[] = [
  {
    field: 'Task_Damage_Status_val',
    title: 'Status',
    width: '140'
  },
  {
    field: 'CountPhotos',
    title: 'Pics',
    width: '80'
  },
  {
    field: 'WT_WorkType',
    title: 'Work Type',
    width: '250'
  },
  {
    field: 'CORNT_User_FirstName',
    title: 'Contractor',
    width: '140'
  },
  {
    field: 'DamageDate',
    title: 'Date',
    width: '140'
  },
  {
    field: 'workOrderNumber',
    title: 'Work Order #',
    width: '120'
  },
  {
    field: 'Damage_Type',
    title: 'Type',
    width: '200'
  },
  {
    field: 'Task_Damage_Int_val',
    title: 'Int/Ext',
    width: '80'
  },
  {
    field: 'Task_Damage_Location',
    title: 'Location',
    width: '180'
  },
  {
    field: 'Task_Damage_Qty',
    title: 'Qty',
    width: '60'
  },
  {
    field: 'Task_Damage_Estimate',
    title: 'Estimate',
    width: '80'
  },
  {
    field: 'Task_Damage_Disc',
    title: 'Description',
    width: '240'
  }
]

export const ApplianceHistoryColumns: Column[] = [
  {
    field: 'Appl_Apliance_Name',
    title: 'Item',
    width: '140'
  },
  {
    field: 'Appl_Status_Id_val',
    title: 'Condition Status',
    width: '80'
  },
  {
    field: 'ApplDate',
    title: 'Date',
    width: '140'
  },
  {
    field: 'Appl_Comment',
    title: 'Comments',
  }
]

export const ViolationHistoryColumns: Column[] = [
  {
    field: 'Task_Violation_Status_val',
    title: 'Status',
    width: '80'
  },
  {
    field: 'Task_Violation_Name',
    title: 'Name',
    width: '200'
  },
  {
    field: 'Task_Violation_Date',
    title: 'Violation Date',
    width: '90',
    type:'Date'
  },
  {
    field: 'Task_Violation_Deadline',
    title: 'Violation Deadline',
    width: '90',
    type:'Date'
  },
  {
    field: 'Task_Violation_Id',
    title: 'Violation Id#',
    width: '90'
  },
  {
    field: 'Task_Violation_Date_Discovered',
    title: 'Date Discovered',
    width: '90',
    type:'Date'
  },
  {
    field: 'Task_Violation_Fine_Amount',
    title: 'Fine Amount',
    width: '90'
  },
  {
    field: 'Task_Violation_Contact',
    title: 'Contact',
    width: '90'
  },
  {
    field: 'Task_Violation_Comment',
    title: 'Comments',
    width: '250'
  }
]

export const HazardHistoryColumns: Column[] = [
  {
    field: 'Task_Hazard_Status_val',
    title: 'Status',
    width: '60'
  },
  {
    field: 'Task_Hazard_Name',
    title: 'Name',
    width: '300'
  },
  {
    field: 'Task_Hazard_Description',
    title: 'Description',
    width: '200'
  },

  {
    field: 'Task_Hazard_Date_Discovered',
    title: 'Date Discovered',
    width: '80',
    type:'Date'
  },
  {
    field: 'Task_Hazard_Comment',
    title: 'Comments',
    width: '300'
  }
]


export const ContractorInvoiceHistoryColumns: Column[] = [
  {
    field: 'Task_Name',
    title: 'Task Name',
    width: '300'
  },
  {
    field: 'IPLNO',
    title: 'IPLNO',
    width: '80'
  },
  {
    field: 'workOrderNumber',
    title: 'WO NO#',
    width: '80'
  },
  {
    field: 'dueDate',
    title: 'Due Date',
    width: '80',
    type:'Date'
  },
  {
    field: 'Contractor',
    title: 'Contractor',
    width: '150'
  },
  {
    field: 'ClientName',
    title: 'Client',
    width: '150'
  },
  {
    field: 'Inv_Con_Ch_Qty',
    title: 'Qty',
    width: '80'
  },
  // {
  //   field: 'Inv_Con_Ch_Price',
  //   title: 'Price',
  //   width: '140',
  //   type:'Price'
  // },

  // {
  //   field: 'Inv_Con_Ch_Total',
  //   title: 'Total',
  //   width: '140',
  //   type:'Price'
  // },
  // {
  //   field: 'Inv_Con_Ch_Adj_Price',
  //   title: 'Adj Price',
  //   width: '140',
  //   type:'Price'
  // },
  // {
  //   field: 'Inv_Con_Ch_Discount',
  //   title: 'Discount',
  //   width: '140'
  // },
  {
    field: 'Inv_Con_Ch_Adj_Total',
    title: 'Total',
    width: '80',
    type:'Price'
  },
  {
    field: 'Inv_Con_Ch_Comment',
    title: 'Comment',
    width: '300'
  }
]

export const ClientInvoiceHistoryColumns: Column[] = [
  {
    field: 'Task_Name',
    title: 'Task Name',
    width: '300'
  },
  {
    field: 'IPLNO',
    title: 'IPLNO',
    width: '80'
  },
  {
    field: 'workOrderNumber',
    title: 'WO NO#',
    width: '80'
  },
  {
    field: 'dueDate',
    title: 'Due Date',
    width: '80',
    type:'Date'
  },
  {
    field: 'Contractor',
    title: 'Contractor',
    width: '150',
  },
  {
    field: 'ClientName',
    title: 'Client',
    width: '150'
  },
  {
    field: 'Inv_Client_Ch_Qty',
    title: 'Qty',
    width: '40'
  },
  // {
  //   field: 'Inv_Client_Ch_Price',
  //   title: 'Price',
  //   width: '140',
  //   type:'Price'
  // },

  // {
  //   field: 'Inv_Client_Ch_Total',
  //   title: 'Total',
  //   width: '140',
  //   type:'Price'
  // },
  // {
  //   field: 'Inv_Client_Ch_Adj_Price',
  //   title: 'Adj Price',
  //   width: '140',
  //   type: 'Price'
  // },
  // {
  //   field: 'Inv_Client_Ch_Discount',
  //   title: 'Discount',
  //   width: '140'
  // },
  {
    field: 'Inv_Client_Ch_Adj_Total',
    title: 'Total',
    width: '80',
    type:'Price'
  },
  {
    field: 'Inv_Client_Ch_Comment',
    title: 'Comment',
    width: '300'
  }
]
