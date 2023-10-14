import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Property',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'PT_Name',
    formControlName: 'PropertyName',
    placeholder: 'Enter Property Name',
    AlphabetOnly: false
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'proacsdf',
    model: 'PT_IsActive'
  }
]