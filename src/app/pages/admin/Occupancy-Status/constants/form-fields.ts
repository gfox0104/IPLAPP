import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Occupancy',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'OS_Name',
    formControlName: 'OccupancyName',
    placeholder: 'Enter StateName',
    AlphabetOnly: false
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'occcactive',
    model: 'OS_IsActive'
  }
]
