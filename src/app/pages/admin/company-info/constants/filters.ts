import { FormFilter } from '../../../../models/form-filter-model';

export const Filters: FormFilter[] =[
  {
    label: 'Company Name',
    type: 'text',
    id: 'userName1',
    model: 'YR_Company_Name',
    placeholder: 'Enter Client Name'
  },
  {
    label: 'Contact Name',
    type: 'text',
    id: 'LasClienttx',
    model: 'YR_Company_Con_Name',
    placeholder: 'Enter Contact'
  },
  {
    label: 'Company Email',
    type: 'text',
    id: 'LaEmailstx',
    model: 'YR_Company_Email',
    placeholder: 'Enter Email'
  },
  {
    label: 'Company Phone Number',
    type: 'number',
    id: 'LastxNumber',
    model: 'YR_Company_Phone',
    placeholder: 'Enter Number'
  },
  {
    label: 'Company Address',
    type: 'text',
    id: 'LastxAddress',
    model: 'YR_Company_Address',
    placeholder: 'Enter Address'
  },
  {
    label: 'City',
    type: 'text',
    id: 'LastxCity',
    model: 'YR_Company_City',
    placeholder: 'Enter City',
    style: 'col-md-1'
  },
  {
    label: 'Active',
    type: 'checkbox',
    id: 'customCheck11dc',
    model: 'YR_Company_IsActive',
    style: 'col-md-1'
  }
]
