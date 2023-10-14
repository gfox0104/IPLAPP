import { Column } from "src/app/models/grid-column-model";


export const GridColumns: Column[] = [
  // {
  //   title: '#WO NO',
  //   field: 'ordernumber'
  // },
  // {
  //   title: 'ItemCode',
  //   field: 'itemCode'
  // },
  // {
  //   title: 'Category',
  //   field: 'category'
  // },
  // {
  //   title: 'Description',
  //   field: 'description'
  // },
  {
    title: 'Task',
    field: 'TaskName'
  },
  {
    title: 'Qty',
    field: 'quantity'
  },
  {
    title: 'Price',
    field: 'unitPrice'
  },
  {
    title: 'Amount',
    field: 'amount'
  },
  {
    title: 'Status',
    field: 'Status'
  },
  {
    title: 'Message',
    field: 'Message'
  },
]
export const InvoiceCyncColumns: Column[] = [
  // {
  //   title: '#WO NO',
  //   field: 'ordernumber'
  // },
  // {
  //   title: 'ItemCode',
  //   field: 'itemCode'
  // },
  // {
  //   title: 'Description',
  //   field: 'description'
  // },
  {
    title: 'Task',
    field: 'TaskName'
  },
  {
    title: 'Qty',
    field: 'quantity'
  },
  {
    title: 'Price',
    field: 'unitPrice'
  },
  {
    title: 'Amount',
    field: 'amount'
  },
  {
    title: 'Status',
    field: 'Status'
  },
  {
    title: 'Message',
    field: 'Message'
  },
]
export const PhotoCyncColumns: Column[] = [  
  
  // {
  //   title: 'Contractor',
  //   field: 'contractor'
  // },
  // {
  //   title: 'FormType',
  //   field: 'formType'
  // },
  {
    title: 'ItemCode',
    field: 'itemCode'
  },
  {
    title: 'Description',
    field: 'description'
  },
  {
    title: 'BeforeAfterFlag',
    field: 'beforeAfterFlag'
  },  
  {
    title: 'Status',
    field: 'Status'
  },
  {
    title: 'Message',
    field: 'Message'
  },
]
export const DamageCyncColumns: Column[] = [  
  {
    title: 'ItemCode',
    field: 'itemCode'
  },
  {
    title: 'Description',
    field: 'description'
  },
  {
    title: 'BeforeAfterFlag',
    field: 'beforeAfterFlag'
  },  
  {
    title: 'Status',
    field: 'Status'
  },
  {
    title: 'Message',
    field: 'Message'
  },
]