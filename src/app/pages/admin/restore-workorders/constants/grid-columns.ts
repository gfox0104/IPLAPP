interface Column {
  field: string,
  title: string,
  width?: string,
  type?: string,
  tab?:string,
}

// export const GridColumns: Column[] = [
//   {
//     title: 'First Name',
//     field: 'User_FirstName'
//   },
//   {
//     title: 'Last Name',
//     field: 'User_LastName',
//   },
//   {
//     title: 'Company',
//     field: 'User_CompanyName'
//   },
//     {
//     title: 'Login Name',
//     field: 'User_LoginName'
//   },
//   {
//     title: 'Email',
//     field: 'User_Email'
//   },
//   {
//     title: 'Group',
//     field: 'User_Group_Name'
//   },
//   // {
//   //   title: 'Score',
//   //   field: 'User_Misc_Contractor_Score'
//   // },
//   {
//     title: 'Mobile',
//     field: 'User_CellNumber'
//   }
// ]

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

    title: 'Note',
    field: 'ecdnotecount',
    width: '80',
  },
  {
    title: 'Last Modified By',
    field: 'LastModifiedBy',
    width:"100",
  },

]
