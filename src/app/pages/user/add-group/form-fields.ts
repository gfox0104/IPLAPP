interface GroupField {
  label: string;
  type: string;
  id: string;
  model: string;
  formControlName: string;
  placeholder?: string;
  value?: string;
  option?: string;
  data?: []
}

export const GroupFields: GroupField[] =[
  {
    label: 'Group Name',
    type: 'text',
    id: 'hjhkerddfgdfs',
    model: 'Grp_Name',
    formControlName: 'FName',
    placeholder: 'Enter Group Name'
  },
  {
    label: 'Group Role',
    type: 'select',
    id: 'grouprole',
    model: 'GroupRoleId',
    formControlName: 'GroupRoleVal',
    value: 'Group_DR_PkeyID',
    option: 'Group_DR_Name',
    data: []
  },
  {
    label: 'Active',
    type: 'checkbox',
    id: 'customCdsfdsheck11c',
    model: 'Grp_IsActive',
    formControlName: 'disact',
  }
]
