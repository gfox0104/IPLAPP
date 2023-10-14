import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Name',
    required: true,
    type: 'text',
    id: 'allowablesname',
    model: 'Allowables_Cat_Name',
    formControlName: 'allowablesnameVal',
    placeholder: 'Enter Category Name',
    //AlphabetOnly: true
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheckallow',
    formControlName: 'allowcheckboxval',
    model: 'Allowables_Cat_IsActive'
  }
]
