import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Allowables',
    required: true,
    type: 'text',
    id: 'allowablesname',
    model: 'Allowable_Name',
    formControlName: 'allowablesVal',
    placeholder: 'Enter Allowable Name',
    AlphabetOnly: true
  },
  {
    label: 'Start Date',
    required: true,
    type: 'date',
    id: 'allowablesdate',
    model: 'Allowable_StartDate',
    formControlName: 'startallowablesVal',
  },
  {
    label: 'End Date',
    required: true,
    type: 'date',
    id: 'allowablesedate',
    model: 'Allowable_EndDate',
    formControlName: 'endallowablesVal',
  },
  {
    label: 'Allowable Category',
    required: true,
    type: 'select',
    id: 'allowablescate',
    model: 'Allowable_OverallAllowables',
    data: [],
    value: 'Allowables_Cat_PkeyId',
    option: 'Allowables_Cat_Name',
    formControlName: 'catallowablesVal',
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheckallows',
    formControlName: 'allowcheckboxval',
    model: 'Allowable_IsActive'
  }
]
