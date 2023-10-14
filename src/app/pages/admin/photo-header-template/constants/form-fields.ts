import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: '',
    required: true,
    type: 'text',
    id: 'hgfhgfhdsfgfhgf',
    model: 'Damage_Type',
    formControlName: 'DamageName',
    placeholder: 'Enter Damage Type'
  },
  {
    label: 'Int/Ext',
    required: true,
    type: 'select',
    id: 'userNfuuiame2',
    model: 'Damage_Int',
    formControlName: 'DamageInt',
    value: 'Id',
    option: 'Name',
    data: [],
    flag: false,
  },
  {
    label: 'Location',
    required: false,
    type: 'text',
    id: 'hgfhgfhdsfgfhgf',
    model: 'Damage_Location',
    formControlName: 'DamageLocation',
    placeholder: 'Enter Locatiion',
  },
  {
    label: 'Quantity',
    required: false,
    type: 'text',
    id: 'Quantityfe',
    model: 'Damage_Qty',
    formControlName: 'DamageQuantity',
    placeholder: 'Enter Quantity',
    numbersOnly: true
  },
  {
    label: 'Estimate',
    required: false,
    type: 'email',
    id: 'Estimatedf',
    model: 'Damage_Estimate',
    formControlName: 'DamageEstimate',
    placeholder: 'Enter Estimate'
  },
  {
    label: 'Description',
    required: false,
    type: 'textarea',
    id: 'dsaddsd',
    model: 'Damage_Disc',
    formControlName: 'DamageDiscription',
    placeholder: 'Enter Description...',
    rows: 4
  },
  {
    label: 'Active',
    required: true,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'DamageActive',
    model: 'Damage_IsActive'
  }
]
