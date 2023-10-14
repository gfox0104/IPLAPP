import { Column } from '../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'Client Company',
    field: 'Client_Company_Name',
    width: '200'
  },
  {
    title: 'Header Template',
    field: 'Photo_head_HeaderTemp',
    width: '100'
  },
  {
    title: 'Photo Filename Template',
    field: 'Photo_head_FileName_Temp',
    width: '100'
  },
  {
    title: 'CreatedBy',
    field: 'Photo_head_CreatedBy',
    width: '100'
  },
  {
    title: 'LastModifiedBy',
    field: 'Photo_head_ModifiedBy',
    width: '100'
  },
 
  {
    title: 'Active',
    field: 'Photo_head_IsActive',
    width: '80'
  }
]
