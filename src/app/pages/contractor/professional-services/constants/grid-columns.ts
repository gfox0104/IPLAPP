import { Column } from "src/app/models/grid-column-model";


export const GridColumns: Column[] = [
  {
    title: 'Contact Name',
    field: 'PS_ContactName',
    width:"100"
  },
  {
    title: 'Company Name',
    field: 'PS_CompanyName',
    width:"100"
  },
  {
    title: 'Address',
    field: 'PS_Address',
    width:"100"
  },
  {
    title: 'Phone',
    field: 'PS_Phone',
    width:"100"
  },
  {
    title: 'Email',
    field: 'PS_Email',
    width:"100"
  },
  {
    title: 'Website',
    field: 'PS_Website',
    width:"100"
  },
  {
    title: 'Notes',
    field: 'PS_Notes',
    width:"100"
  },
  {
    title: 'Contact Type',
    field: 'ContactType',
    width:"100",
  },
  {
    title: 'Created By',
    field: 'PS_CreatedBy',
    width:"100",
  },
  {
    title: 'Modified By',
    field: 'PS_ModifiedBy',
    width:"100",
  },
  {
    title: 'Active',
    field: 'PS_IsActive',
    width:"60",
  },


]
export const ContactTypeColumns: Column[] = [
  {
    title: 'Contact Type Name',
    field: 'CT_Name',
    width: '200'
  },
  {
    title: 'Created By',
    field: 'CT_CreatedBy',
    width: '80'
  },
  {
    title: 'Last Modified By',
    field: 'CT_ModifiedBy',
    width: '80'
  },
  {
    title: 'Active',
    field: 'CT_IsActive',
    width: '80'
  }
]
