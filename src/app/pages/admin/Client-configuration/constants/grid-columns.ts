import { Column } from '../../../../models/grid-column-model';

export const GridColumns: Column[] = [
  {
    title: 'Name',
    field: 'Damage_Type',
    width: '200'
  },

]
export const TaskConfGridColumns: Column[] = [


  {
    title: 'Item Description',
    field: 'Task_Configuration_ItemCode_Desc',
    width: '200'
  },
  {
    title: 'Task Name',
    field: 'Task_Configuration_Task_Id',
    width: '200'
  },
  {
    title: 'Bid Category',
    field: 'Task_Configuration_BidCategory_Id',
    width: '200'
  },
  {
    title: 'CreatedBy',
    field: 'Task_Configuration_CreatedBy',
    width: '200'
  },
  {
    title: 'LastModifiedBy',
    field: 'Task_Configuration_ModifiedBy',
    width: '200'
  },

]
export const WTConfGridColumns: Column[] = [

  {
    title: 'OrderType Code',
    field: 'WorkType_Configuration_OrderType_Desc',
  },
  {
    title: 'WorkType Name',
    field: 'WorkType_Configuration_WorkType_Id'
  },
  {
    title: 'CreatedBy',
    field: 'WorkType_Configuration_CreatedBy',

  },
  {
    title: 'LastModifiedBy',
    field: 'WorkType_Configuration_ModifiedBy',

  },

]
export const MCConfGridColumns: Column[] = [
  {
    title: 'MainCategory Name',
    field: 'Main_Cat_Name'
  },
  {
    title: 'Category Code',
    field: 'MainCategoroy_Configuration_CategoryCode_Id',
  },
]
