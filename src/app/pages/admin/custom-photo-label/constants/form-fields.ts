import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Custom Photo Label',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'PhotoLabel_Name',
    formControlName: 'CustomName',
    placeholder: 'Enter Custom Name'
  },
  {
    label: 'Custom Photo Label Group',
    required: true,
    type: 'select',
    id: 'inputphotogroup',
    model: 'PhotoLabel_Group_Id',
    formControlName: 'disbledFaltu3',
    value: 'Custom_PhotoLabel_Group_pkeyID',
    option: 'Custom_PhotoLabel_Group_Name',
    data: []
  },
  {
    label: 'Client',
    required: false,
    type: 'select',
    id: 'inputEmail4er',
    model: 'PhotoLabel_Client_Id',
    formControlName: 'disbledFaltu1',
    value: 'Client_pkeyID',
    option: 'Client_Company_Name',
    data: []
  },
  {
    label: 'Work Type',
    required: false,
    type: 'select',
    id: 'inputAddress',
    model: 'PhotoLabel_WorkType_Id',
    formControlName: 'disbledFaltu2',
    value: 'WT_pkeyID',
    option: 'WT_WorkType',
    data: []
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'disbledFaltu5',
    model: 'PhotoLabel_IsActive'
  }
]
