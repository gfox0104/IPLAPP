import { FormFilter } from '../../../../models/form-filter-model';

export const Filters: FormFilter[] =[
  {
    label: 'Loan Type',
    type: 'text',
    id: 'userName1',
    model: 'Loan_Type',
    placeholder: 'Enter Loan Type'
  },
  {
    label: 'Active',
    type: 'checkbox',
    id: 'customCheck11dc',
    model: 'Loan_IsActive',
    style: 'col-md-1'
  }
]