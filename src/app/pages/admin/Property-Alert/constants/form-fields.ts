import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Property Alert',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'PA_Name',
    formControlName: 'Propertyname',
    placeholder: 'Enter StateName',
    AlphabetOnly: false
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'protype',
    model: 'PA_IsActive'
  }
]
