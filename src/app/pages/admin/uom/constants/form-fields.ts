import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'UOM',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'UOM_Name',
    formControlName: 'UOMName',
    placeholder: 'Enter UOM Name'
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'disuom',
    model: 'UOM_IsActive'
  }
]
