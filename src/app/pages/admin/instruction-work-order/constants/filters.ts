import { FormFilter } from '../../../../models/form-filter-model';

export const Filters: FormFilter[] =[
  {
    label: 'Name',
    type: 'text',
    id: 'userName1',
    model: 'Inst_Task_Name',
    placeholder: 'Enter Name'
  },
  {
    label: 'Description',
    type: 'text',
    id: 'userName1',
    model: 'Inst_Task_Desc',
    placeholder: 'Enter Description'
  },
  {
    label: 'Active',
    type: 'checkbox',
    id: 'customCheck11dc',
    model: 'Inst_Task_IsActive',
    style: 'col-md-1'
  }
]