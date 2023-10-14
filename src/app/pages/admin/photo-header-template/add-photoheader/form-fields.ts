import { FormField } from '../../../../models/form-field-model';

export const FormFields: FormField[] = [
  {
    label: 'Client Company',
    required: true,
    type: 'select',
    id: 'gessfdfsfs',
    model: 'Photo_head_Client_Company',
    formControlName: 'Clientcompany',
    value: 'Client_pkeyID',
    option: 'Client_Company_Name',
    data: []
  },
  {
    label: 'Header Template',
    required: false,
    type: 'textarea',
    id: 'dfsfdsfdsfsd',
    model: 'Photo_head_HeaderTemp',
    formControlName: 'HeaderTemp',
    placeholder: 'Enter Header Template'
  },
  {
    label: 'Photo Filename Template',
    required: false,
    type: 'text',
    id: 'userName1',
    formControlName: 'PFTemp',
    model: 'Photo_head_FileName_Temp',
    placeholder: 'Enter Photo Filename Template'
  },
  {
    label: 'PDF Header Template',
    required: false,
    type: 'checkbox',
    id: 'customCheck11c',
    formControlName: 'PDFCheck',
    model: 'Photo_head_Pdf_Temp'
  }
]
