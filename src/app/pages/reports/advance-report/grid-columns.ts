import { Column } from "src/app/models/grid-column-model"


export const FilterReportColumns: Column[] = [
  {
    title: 'WO #',
    field: 'workOrderNumber'
  },  
  {
    title: 'Status',
    field: 'Status_Name',
  },
  {
    title: 'IPL #',
    field: 'IPLNO'
  },
  {
    title: 'Contractor',
    field: 'ContractorName'
  },
  {
    title: 'Address',
    field: 'address1',
  },
  {
    title: 'WorkType',
    field: 'WT_WorkType'
  },
  {
    title: 'Client',
    field: 'Client_Company_Name'
  },
  {
    title: 'Due Date',
    field: 'dueDate'
  },
  {
    title: 'Coordinator',
    field: 'CordinatorName'
  },
  {
    title: 'Processor',
    field: 'ProcessorName'
  },
]
export const GroupByReportColumn: Column[] = [
  {
    title: 'Invoice #',
    field: 'Client_Invoice_Number'
  },
  {
    title: 'Invoice Date',
    field: 'Client_InvoiceDate',
  },
  {
    title: 'IPL #',
    field: 'IPLNO'
  },
  {
    title: 'Contractor',
    field: 'ContractorName'
  },
  {
    title: 'WO #',
    field: 'workOrderNumber'
  },
  {
    title: 'Status',
    field: 'Status_Name',
  },
  {
    title: 'Address',
    field: 'address1',
  },
  {
    title: 'WorkType',
    field: 'WT_WorkType'
  },
  {
    title: 'Client',
    field: 'Client_Company_Name'
  },
  {
    title: 'Client Total',
    field: 'Client_InvoiceTotal'
  },
]
