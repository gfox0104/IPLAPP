import { Column } from '../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'Damage Name',
    field: 'Damage_Type',
    width: '200'
  },
  {
    title: 'Int/Ext',
    field: 'Damage_IntName',
    width: '100'
  },
  {
    title: 'Location',
    field: 'Damage_Location',
    width: '100'
  },
  {
    title: 'Quantity',
    field: 'Damage_Qty',
    width: '100'
  },
  {
    title: 'Estimate',
    field: 'Damage_Estimate',
    width: '200'
  },
  // {
  //   title: 'Description',
  //   field: 'Damage_Disc',
  //   width: '200'
  // },
  {
    title: 'Created By',
    field: 'Damage_CreatedBy',
    width: '200'
  },
  {
    title: 'Last Modified By',
    field: 'Damage_ModifiedBy',
    width: '200'
  },
  {
    title: 'Active',
    field: 'WT_IsActive',
    width: '80'
  }
]
