import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Damage Type',
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
    placeholder: 'Enter Location',
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
    label: 'Preset Text',
    required: false,
    type: 'textarea',
    id: 'hfghddaawdawsdfgh',
    model: 'item.Damage_Preset_Text',
    formControlName: 'DamagePresetText',
    placeholder: 'Enter Preset Text...',
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
