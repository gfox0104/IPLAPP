interface Record {
  field: string;
  title: string;
  type?: string;
  required?: boolean;
  formControlName?: string;
}

export const ConRecordColumns: Record[] = [
  {
    field: 'Con_Pay_Payment_Date',
    title: 'Payment Date',
    type: 'date',
    formControlName: 'paymentDateN'
  },
  {
    field: 'Con_Pay_Amount',
    title: 'Amount',
    type: 'number',
    required: true,
    formControlName: 'amountN'
  },
  {
    field: 'Con_Pay_CheckNumber',
    title: 'Check Number',
    type: 'number',
    required: true,
    formControlName: 'checkNumberN'
  },
  {
    field: 'Con_Pay_EnteredBy',
    title: 'Entered By',
    type: 'string'
  },
  {
    field: 'Con_Pay_Comment',
    title: 'Comment',
    type: 'string',
    required: true,
    formControlName: 'commentN'
  }
];

export const ClientRecordColumns: Record[] = [
  {
    field: 'Client_Pay_Payment_Date',
    title: 'Payment Date',
    type: 'date',
    formControlName: 'paymentDateN'
  },
  {
    field: 'Client_Pay_Amount',
    title: 'Amount',
    type: 'number',
    required: true,
    formControlName: 'amountN'
  },
  {
    field: 'Client_Pay_CheckNumber',
    title: 'Check Number',
    type: 'number',
    required: true,
    formControlName: 'checkNumberN'
  },
  {
    field: 'Client_Pay_EnteredBy',
    title: 'Entered By',
    type: 'string'
  },
  {
    field: 'Client_Pay_Comment',
    title: 'Comment',
    type: 'string',
    required: false,
    formControlName: 'commentN'
  }
];

export const FormFields: Record[] = [
  {
    field: 'paymentDate',
    title: 'Payment Date',
    type: 'date',
    formControlName: 'paymentDateN'
  },
  {
    field: 'amount',
    title: 'Amount',
    type: 'number',
    required: true,
    formControlName: 'amountN'
  },
  {
    field: 'checkNumber',
    title: 'Check Number',
    //type: 'number',
    //type:'text',
    type: 'string',
    required: true,
    formControlName: 'checkNumberN'
  },
  {
    field: 'comment',
    title: 'Comment',
    type: 'string',
    required: false,
    formControlName: 'commentN'
  }
];
