import { FormFilter } from '../../../../../models/form-filter-model';

export const Filters: FormFilter[] =[
  {
    label: 'Category Name',
    type: 'text',
    id: 'userName1',
    model: 'Con_Cat_Name',
    placeholder: 'Enter Category Name'
  },
  {
    label: 'Active',
    type: 'checkbox',
    id: 'customCheck11dc',
    model: 'Con_Cat_IsActive',
    style: 'col-md-1'
  }
]
