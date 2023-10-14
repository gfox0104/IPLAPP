interface Column {
  field: string,
  title: string,
  width?: string,
  type?: string,
  tab?:string,
}
export const GridColumns: Column[] = [
  {
    title: 'IPLNo',
    field: 'IPLNO',
    width:"100"
  },
  {
    title: 'WO NO',
    field: 'workOrderNumber',
    width:"100"
  },
  {
    title: 'Photos',
    field: 'photocount',
    width:"80"
  },
  {
    title: 'Due',
    field: 'dueDate',
    width:"100",
    type:"Date"
  },
  {
    title: 'Address',
    field: 'address1',
    width:"160"
  },
  {
    title: 'City',
    field: 'city',
    width:"80"
  },
  {
    title: 'State',
    field: 'state',
    width:"60"
  },
  {
    title: 'Client',
    field: 'CompanyName',
    width:"120"
  },
  {
    title: 'Status',
    field: 'Status_Name',
    width:"100",
  },
  {
    title: 'Contractor',
    field: 'ContractorName',
    width:"120",
  },
  {
    title: 'Cell',
    field: 'ContractorCellNumber',
    width:"100",
  },
  {
    field: 'messagecount',
    title: 'Message',
    width: '60',
    tab:''
  },
  {
    title: 'Est. Date',
    field: 'EstimatedDate',
    width:"150",
    type:"Date"
  },
  {

    title: 'Note',
    field: 'ecdnotecount',
    width: '80',
  },
  {

    title: 'Latest Note',
    field: 'ecdnote',
    width: '350',
  },
  {

    title: 'Updated By',
    field: 'ecdnoteupdatedby',
    width: '100',
  },
  {
    title: 'Last Modified By',
    field: 'LastModifiedBy',
    width:"100",
  },

]
