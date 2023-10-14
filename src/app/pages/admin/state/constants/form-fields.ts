import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'State',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'IPL_StateName',
    formControlName: 'StateName',
    placeholder: 'Enter State Name',
    AlphabetOnly: true
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'disstatea',
    model: 'IPL_State_IsActive'
  }
]
