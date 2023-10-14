import { FormField } from '../../../../../models/form-field-model';

export const WorkTypeFields: FormField[] = [
  {
    label: 'Work Type',
    required: true,
    type: 'text',
    id: 'inputEmaildfsdfd4',
    model: 'WT_WorkType',
    placeholder: 'Enter Work Type',
    formControlName: 'WorkTypeVal'
  },
  // {
  //   label: 'Work Type Groups',
  //   required: true,
  //   type: 'select',
  //   id: 'inputAddgdgressqw',
  //   model: 'WT_CategoryID',
  //   formControlName: 'disbledFaltu1',
  //   data: [],
  //   value: 'Work_Type_Cat_pkeyID',
  //   option: 'Work_Type_Name'
  // },
  {
    label: 'Work Type Groups',
    required: true,
    type: 'multiselect',
    id: 'inputAddgdgressqw',
    model: 'WT_CategoryMultiple',
    formControlName: 'disbledFaltu1',
    data: [],
    multiselectdropdownSetting:{
      singleSelection: false,
      idField: "Work_Type_Cat_pkeyID",
      textField: "Work_Type_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
  },
  {
    label: 'Template',
    required: true,
    type: 'select',
    id: 'inputAddgdgress',
    model: 'WT_Template_Id',
    formControlName: 'Templatevall',
    value: 'Id',
    data: [],
    option: 'Name'
  },
  {
    label: 'Active',
    required: false,
    type: 'checkbox',
    id: 'customCheck11dcc',
    formControlName: 'disbledFaltu2',
    model: 'WT_IsActive'
  }
]

