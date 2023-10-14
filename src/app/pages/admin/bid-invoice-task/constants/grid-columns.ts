import { Column } from '../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'Task Name',
    field: 'Task_Name',
    width: '240'
  },
  {
    title: 'Task Type',
    field: 'Task_TypeName',
    width: '100'
  },
  {
    title: 'Task Groups',
    field: 'Task_Group_Name',
    width: '100'
  },
  // {
  //   title: 'Auto Assign',
  //   field: 'Task_Auto_Assign_str',
  //   width: '80'
  // },
  {
    title: 'Created By',
    field: 'Task_CreatedBy',
    width: '100'
  },
  {
    title: 'Last Modified By',
    field: 'Task_ModifiedBy',
    width: '100'
  },
  {
    title: 'Contr.Unit Price',
    field: 'Task_Contractor_UnitPrice',
    width: '100'
  },
  {
    title: 'Client.Unit Price',
    field: 'Task_Client_UnitPrice',
    width: '100'
  },
  {
    title: 'Auto Invoice',
    field: 'Task_AutoInvoiceComplete',
    width: '100'
  },
  {
    title: 'Doc Attached',
    field: 'Task_Document',
    width: '100'
  },
  
  {
    title: 'Active',
    field: 'Task_IsActive',
    width: '100'
  },
  {
    title: 'Auto Assign',
    field: 'Task_Auto_Assign',
    width: '100'
  }
]
export const GridTaskGroupColumns: Column[] = [
  {
    title: 'Group Name',
    field: 'Task_Group_Name',
    width: '200'
  },
  // {
  //   title: 'Client Name',
  //   field: 'Client_Company_Name',
  //   width: '80'
  // },
  {
    title: 'Created By',
    field: 'Task_Group_CreatedBy',
    width: '80'
  },
  {
    title: 'Last Modified By',
    field: 'Task_Group_ModifiedBy',
    width: '80'
  },
  {
    title: 'Active',
    field: 'Task_Group_IsActive',
    width: '80'
  }
]
