import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Rush',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'rus_Name',
    formControlName: 'RushName',
    placeholder: 'Enter Rush Name'
  },
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'disbledFaltu1',
    model: 'rus_IsActive'
  }
]
