interface InfoHeader {
  title: string;
  key: string;
  width?: string;
  directive? : string;
}

export const ClientInfo: InfoHeader[] = [
  {
    title: 'Work Type',
    key: 'WT_WorkType',
    width: 'col-3'
  },
  {
    title: 'Work Order No',
    key: 'workOrderNumber',
    width: 'col-3'
  },
  {
    title: 'Address',
    key: 'fulladdress',
    width: 'col-3'
  },
  {
    title: 'Client',
    key: 'Client_Company_Name',
    width: 'col-3'
  },
  {
    title: 'Contractor',
    key: 'Cont_Name',
    width: 'col-3'
  },
  {
    title: 'Coordinator',
    key: 'Cordinator_Name',
    width: 'col-3'
  },
  {
    title: 'Due Date',
    key: 'dueDate',
    directive: `date:'MM/dd/yyyy'`,
    width: 'col-3'
  },
  {
    title: 'Estimated Date',
    key: 'EstimatedDate',
    directive: `date:'MM/dd/yyyy'`,
    width: 'col-3'
  },

]
