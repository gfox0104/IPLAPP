import { Column } from '../../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'Client Name',
    field: 'Client_Company_Name'
  },
  {
    title: 'Address',
    field: 'Client_Billing_Address',
  },
  {
    title: 'State',
    field: 'IPL_StateName'
  },
  {
    title: 'City',
    field: 'Client_City'
  },

  {
    title: 'Created By',
     field: 'Client_CreatedBy'
  },
  {
    title: 'Last Modified By',
     field: 'Client_ModifiedBy'
  },
  
  {
    title: 'Active',
    field: 'WT_IsActive'
  },
  
]
