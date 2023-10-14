interface Column {
  field: string,
  title: string,
  width?: string,
  type?: string,
  tab?:string,
}
export const Columns: Column[] = [
  {
    field: 'Inv_Con_Invoce_Num',
    title: 'Invoice#',
    width: '140'
  },
  {
    field: 'Inv_Con_Inv_Date',
    title: 'Invoice Date',
    width: '100',
    type: 'date'
  },
  {
    field: 'IPLNO',
    title: 'IPL#',
    width: '100',
   
  },
  {
    field: 'ContractorName',
    title: 'Contractor',
    width: '100'
  },
  {
    field: 'address1',
    title: 'Address',
    width: '150'
  },
  {
    field: 'city',
    title: 'City',
   width: '100'
  },
  {
    field: 'SM_Name',
    title: 'State',
    width: '80'
  },
  {
    field: 'zip',
    title: 'Zip',
    width: '80'
  },
  {
    field: 'workOrderNumber',
    title: 'WO#',
    width: '100'
  },
  {
    field: 'WT_WorkType',
    title: 'Work Type',
    width: '100'
  },
  {
    field: 'dueDate',
    title: 'Date Due',
    width: '100',
    type: 'date'
  },
  {
    field: 'Inv_Con_Sub_Total',
    title: 'Invoice Total',
    width: '100'
  },
  {
    field: 'Con_Pay_Amount',
    title: 'Amount Paid',
    width: '160'
  },
 
];

export const ChildColumns: Column[] = [
  {
    field: 'Task_Name',
    title: 'Task name#',
    width: '140'
  },
  {
    field: 'Inv_Con_Ch_Qty',
    title: 'QTY',
    width: '100',
  },
  {
    field: 'Inv_Con_Ch_Price',
    title: 'Price',
    width: '100',
  },
  {
    field: 'Inv_Con_Ch_Discount',
    title: 'Dis',
    width: '100',
  },
  {
    field: 'Inv_Con_Ch_Total',
    title: 'Total Price',
    width: '100',
  },
 
];
