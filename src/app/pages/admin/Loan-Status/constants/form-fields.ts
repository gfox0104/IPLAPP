import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Loan status',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'LS_Name',
    formControlName: 'LoanstatusName',
    placeholder: 'Enter Loan status Name',
    AlphabetOnly: false
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'loansta',
    model: 'LS_IsActive'
  }
]
