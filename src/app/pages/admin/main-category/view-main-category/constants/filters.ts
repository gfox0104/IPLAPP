import { FormFilter } from '../../../../../models/form-filter-model';

export const Filters: FormFilter[] =[
  {
    label: 'Category Name',
    type: 'text',
    id: 'userName1',
    model: 'Main_Cat_Name',
    placeholder: 'Enter Category Name'
  },
  {
    label: 'Active',
    type: 'checkbox',
    id: 'customCheck11dc',
    model: 'Main_Cat_Active',
    style: 'col-md-1'
  }
]
