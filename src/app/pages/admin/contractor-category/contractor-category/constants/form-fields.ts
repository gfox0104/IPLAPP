import { FormField } from '../../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Category Name',
    required: true,
    type: 'text',
    id: 'userName1',
    model: 'Con_Cat_Name',
    formControlName: 'CategoryName',
    placeholder: 'Enter Category Name'
  },
  {
    label: 'Background Color',
    required: false,
    type: 'color',
    id: 'hgfhgfhgfhgf',
    model: 'Con_Cat_Back_Color',
    formControlName: 'disbledFaltu2'
  },
  
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'disbledFaltu1',
    model: 'Con_Cat_IsActive'
  }
]
