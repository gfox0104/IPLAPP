import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Name',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'Inst_Task_Name',
    formControlName: 'discrpval',
    placeholder: 'Enter Name'
  },
  {
    label: 'Description',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'Inst_Task_Desc',
    formControlName: 'commentval',
    placeholder: 'Enter Description'
  },
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'disactive',
    model: 'Inst_Task_IsActive'
  }
]
