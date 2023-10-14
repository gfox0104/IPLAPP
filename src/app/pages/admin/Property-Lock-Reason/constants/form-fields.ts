import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Lock Reason',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'LockReason_Name',
    formControlName: 'Propertyname',
    placeholder: 'Enter Lock Reason',
    AlphabetOnly: false
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'protype',
    model: 'LockReason_IsActive'
  }
]
