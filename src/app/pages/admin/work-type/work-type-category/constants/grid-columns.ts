import { Column } from '../../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'Work Type Name',
    field: 'WT_WorkType',
    width:"200"
  },
  {
    title: 'WT Group',
    field: 'WT_CategoryJson',
    width:"40"
  },
  {
    title: 'Created By',
    field: 'WT_CreatedBy',
    width:"100"
  },
  {
    title: 'Last Modified By',
    field: 'WT_Type_ModifiedBy',
    width:"100"
  },

  {
    title: 'Active',
    field: 'WT_IsActive',
    width:"80"
  }
]
export const GridWorkTypeGroupColumns: Column[] = [
  {
    title: 'Group Name',
    field: 'Work_Type_Name',
    width: '200'
  },
  {
    title: 'Client Name',
    field: 'Client_Company_Name',
    width: '80'
  },
  {
    title: 'Created By',
    field: 'Work_Type_CreatedBy',
    width: '80'
  },
  {
    title: 'Last Modified By',
    field: 'Work_Type_ModifiedBy',
    width: '80'
  },
  {
    title: 'Active',
    field: 'Work_Type_IsActive',
    width: '80'
  }
]
