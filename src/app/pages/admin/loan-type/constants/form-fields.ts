import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Loan Type',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'Loan_Type',
    formControlName: 'ComName',
    placeholder: 'Enter Loan Type'
  },
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'loanactive',
    model: 'Loan_IsActive'
  }
]
