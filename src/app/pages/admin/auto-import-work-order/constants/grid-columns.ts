import { Column } from '../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'Import From',
    field: 'Import_Form_Name'
  },
  {
    title: 'Client',
    field: 'Client_Company_Name',
  },
  {
    title: 'Import Id',
    field: 'WI_LoginName'
  },
  // {
  //   title: 'Alert Email',
  //   field: 'WI_AlertEmail'
  // },
  {
    title: 'Import Name',
    field: 'WI_FriendlyName'
  },
  {
    title: 'Skip Comments',
    field: 'WI_SkipCommentsDec'
  },
  {
    title: 'Skip Line Items',
    field: 'WI_SkipLineItemsDec'
  },
  {
    title: 'Created By',
    field: 'WI_Createdby'
  },
  {
    title: 'Last Modified By',
    field: 'WI_Modifiedby'
  }
]
