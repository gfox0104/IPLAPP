import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Task Name',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'Task_Name',
    formControlName: 'TaskName',
    placeholder: 'Enter Task Name'
  },
  {
    label: 'Task Type',
    required: false,
    type: 'select',
    id: 'userName1',
    model: 'Task_Type',
    formControlName: 'TaskType',
    value: 'Id',
    option: 'Name',
    data: [
      { Id: 1, Name: "Work" },
      { Id: 2, Name: "Inspection" }
    ],
    flag: false,
  },
  {
    label: 'Task Group',
    required: false,
    type: 'select',
    id: 'userName1',
    model: 'Task_Group',
    formControlName: 'TaskGroup',
    value: 'Task_Group_pkeyID',
    option: 'Task_Group_Name',
    data: [],
    flag: false,
  },
  {
    label: 'Unit Of Measure',
    required: false,
    type: 'select',
    id: 'userName1',
    model: 'Task_UOM',
    formControlName: 'TaskUOM',
    value: 'UOM_pkeyId',
    option: 'UOM_Name',
    data: [],
    flag: false,
  },
  {
    label: 'Default Contractor Unit Price',
    required: true,
    type: 'text',
    id: 'fsdfsdfds',
    model: 'Task_Contractor_UnitPrice',
    formControlName: 'ContractorUnitVal',
    placeholder: 'Enter Unit Price',
    //numbersOnly: true,
    pattern:'/^[0-9]*\.?[0-9]*$/'
  },
  {
    label: 'Default Client Unit Price',
    required: true,
    type: 'text',
    id: 'fsdfsdfds',
    model: 'Task_Client_UnitPrice',
    formControlName: 'ClientUnitVal',
    placeholder: 'Enter Unit Price',
    //numbersOnly: true
    pattern:'/^[0-9]*\.?[0-9]*$/'
  },
  {
    label: 'Task Photo Label Name',
    required: false,
    type: 'text',
    id: 'trdsdthf4',
    model: 'Task_Name', //Task_Photo_Label_Name
    formControlName: 'TaskPhotoName',
    placeholder: 'Enter Label Name'
  },
  {
    label: 'Auto Invoice Complete',
    required: false,
    type: 'checkbox',
    id: 'customCheckdsfds11c',
    model: 'Task_AutoInvoiceComplete',
    formControlName: 'activeaic',
  },
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'activeatou',
    model: 'Task_IsActive'
  }
]
