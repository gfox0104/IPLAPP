//import { CommonStatusDTO } from '../../../client-result/common-client-header/common-status-model';
// import {SaveFilterWorkOrder} from '../../../work-order/work-order-view/work-order-view-model';

interface Filter {
  label: string,
  type: string,
  model?: any,
  value?: string,
  optionKey?: string,
  data?: Array<any>,
  keyflag?:boolean,
  placeholder?:string,
}

export const Filters: Filter[] = [
  {
    label: 'Status',
    type: 'select',
    model:  'status',
    data: [],
    value: 'Status_ID',
    optionKey: 'Status_Name',
    keyflag:false
  },

 
  {
    label: 'Due Date',
    type: 'date',
    model:'dueDate'
  },
  {
    label: 'Client',
    type: 'select',
    model:'client',
    data: [],
    value: 'Client_pkeyID',
    optionKey: 'Client_Company_Name',
    keyflag:false
  },
    {
    label: 'Customer',
    type: 'select',
    model:'customer',
    data: [],
    value: 'Cust_Num_pkeyId',
    optionKey: 'Cust_Num_Number',
    keyflag:false
  },
   {
    label: 'Loan Type',
    type: 'select',
    model:'Loan_Info',
    data: [],
    value: 'Loan_pkeyId',
    optionKey: 'Loan_Type',
    keyflag:false

  },
  {
    label: 'Work Type',
    type: 'select',
    model:'Work_Type',
    data: [],
    value: 'WT_pkeyID',
    optionKey: 'WT_WorkType',
    keyflag:false
  },
  {
    label: 'Work Type Group',
    type: 'select',
    model:'Work_Type_Group',
    data: [],
    value: 'Work_Type_Cat_pkeyID',
    optionKey: 'Work_Type_Name',
    keyflag:false
  },
  
   {
    label: 'Coordinator',
    type: 'select',
    model:'coordinator',
    data: [],
    value: 'User_pkeyID',
    optionKey: 'User_FirstName',
    keyflag:false
  },
  {
    label: 'Processor',
    type: 'select',
    model:'processor',
    data: [],
    value: 'User_pkeyID',
    optionKey: 'User_FirstName',
    keyflag:false
  },
  {
    label: 'Contractor',
    type: 'select',
    model:'contractor',
    data: [],
    value: 'User_pkeyID',
    optionKey: 'User_FirstName',
    keyflag:false
  },
  {
    label: 'Address',
    type: 'textarea',
    model:'address1',
    placeholder:'Please Enter Address'
  },
 
  {
    label: 'State',
    type: 'select',
    model:  'state',
    data: [],
    value: 'IPL_StateID',
    optionKey: 'IPL_StateName',
    keyflag:true
  },
  {
    label: 'County',
    type: 'select',
    model:  'County',
    data: [{ID:0,COUNTY:'Select'}],
    value: 'ID',
    optionKey: 'COUNTY',
    keyflag:false
  },
  {
    label: 'Zip',
    type: 'text',
    model:'zip',
    placeholder:'Please Enter Zip'
  },

  
]
