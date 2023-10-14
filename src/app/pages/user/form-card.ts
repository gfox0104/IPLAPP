interface FormCard {
  header: string;
  fields: {
    label: string,
    required: boolean,
    type: string,
    id: string,
    formControlName: string,
    placeholder?: string,
    disabled?: boolean,
    model: string,
    labelStyle?: string,
    fieldStyle?: string,
    data?: [],
    flag?: boolean,
    value?: string,
    option?: string,
    rows?: number,
    pattern?: string,
    readonly?: boolean
  } []
}

export const FormCards: FormCard[] = [
  {
    header: 'User Info',
    fields: [
      {
        label: 'First Name',
        required: true,
        type: 'input',
        id: 'klodfgkridje',
        formControlName: 'FirstName',
        placeholder: 'Enter First Name',
        model: 'User_FirstName'
      },
      {
        label: 'LastName',
        required: true,
        type: 'input',
        id: 'klokridje',
        formControlName: 'LastName',
        placeholder: 'Enter Last Name',
        model: 'User_LastName' 
      }
    ]
  }
]