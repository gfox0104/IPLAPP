import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Background Provider',
    required: true,
    type: 'text',
    id: 'userNfuuiame1',
    model: 'Back_Chk_ProviderName',
    formControlName: 'BackgroundProviderName',
    placeholder: 'Enter Background Provider Name',
    AlphabetOnly: false
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'BackgroundActive',
    model: 'Back_Chk_IsActive'
  }
]