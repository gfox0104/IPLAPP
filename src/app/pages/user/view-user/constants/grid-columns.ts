import { Column } from '../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'First Name',
    field: 'User_FirstName'
  },
  {
    title: 'Last Name',
    field: 'User_LastName',
  },
  {
    title: 'Company',
    field: 'User_CompanyName'
  },
    {
    title: 'Login Name',
    field: 'User_LoginName'
  },
  {
    title: 'Email',
    field: 'User_Email'
  },
  {
    title: 'Group',
    field: 'User_Group_Name'
  },
  // {
  //   title: 'Score',
  //   field: 'User_Misc_Contractor_Score'
  // },
  {
    title: 'Mobile',
    field: 'User_CellNumber'
  },
  {
    title: 'Created By',
    field: 'User_CreatedBy'
  },
  {
    title: 'Last Modified By',
    field: 'User_ModifiedBy'
  }

]
