import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Customer',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'Cust_Num_Number',
    formControlName: 'CustomerNUM',
    placeholder: 'Enter Customer'
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'discost',
    model: 'Cust_Num_IsActive'
  }
]
