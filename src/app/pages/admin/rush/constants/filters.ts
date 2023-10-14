import { FormFilter } from '../../../../models/form-filter-model';

export const Filters: FormFilter[] =[
  {
    label: 'Rush Name',
    type: 'text',
    id: 'userName1',
    model: 'rus_Name',
    placeholder: 'Enter Rush Name'
  },
  {
    label: 'Active',
    type: 'checkbox',
    id: 'customCheck11dc',
    model: 'rus_IsActive',
    style: 'col-md-1'
  }
]