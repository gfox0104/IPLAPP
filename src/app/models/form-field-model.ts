export interface FormField
{
  label: string,
  required: boolean,
  type: string,
  id: string,
  formControlName?: string,
  placeholder?: string,
  disabled?: boolean,
  model: string,
  labelStyle?: string,
  fieldStyle?: string,
  data?: Array<any>,
  flag?: boolean,
  value?: string,
  option?: string,
  rows?: number,
  pattern?: string,
  readonly?: boolean,
  numbersOnly?: boolean;
  AlphabetOnly?: boolean;
  tabhide?: boolean;
  multiselectdropdownSetting?:any;
}
