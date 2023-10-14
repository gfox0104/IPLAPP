import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Lot Pricing Filter',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'Lot_Pricing_Name',
    formControlName: 'LotPricingName',
    placeholder: 'Enter Lot Pricing Filter Name',
    AlphabetOnly: false
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'Lotpri',
    model: 'Lot_Pricing_IsActive'
  }
]