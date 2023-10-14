interface ActionContent {
  title: string;
  labelname: string;
  arr: number;
  type?: number;
}

export const ActionContents: ActionContent[] =[
  {
    title: 'Change Contractor',
    labelname: 'Contractor',
    arr: 31, 
    type: 1
  },
  {
    title: 'Change Coordinator',
    labelname: 'Coordinator',
    arr: 32,
    type: 2
  },
  {
    title: 'Change Processor',
    labelname: 'Processor',
    arr: 33,
    type: 3,
  },
  {
    title: 'Change client company on existing work order',
    labelname: 'Client Company',
    arr: 34,
    type: 4
  },
  {
    title: 'Change Work Type on existing work orders',
    labelname: 'Work Type',
    arr: 35,
    type: 5
  },
  {
    title: 'Change Due Date on existing work order',
    labelname: 'Due Date',
    arr: 36,
    type: 6
  },
  {
    title: 'Change Start Date on existing work order',
    labelname: 'Start Date',
    arr: 37,
    type: 7
  },
  {
    title: 'Change Client Due Date',
    labelname: 'Client Due Date',
    arr: 38,
    type: 8
  },
  {
    title: 'Change Recurring Order',
    labelname: 'Recurring Order',
    arr: 39
  },
  {
    title: 'Modify comments on existing work order',
    labelname: 'Modify Comments',
    arr: 40,
    type: 9
  },
  {
    title: 'Change Estimated Date',
    labelname: 'Estimated Date',
    arr: 41,
    type: 10
  },
  {
    title: 'Add task to existing work order ',
    labelname: 'Add Task',
    arr: 43,
    type: 10
  },
  {
    title: 'Add Instructions to existing work order',
    labelname: 'Add Instructions',
    arr: 44,
    type: null
  },
  {
    title: 'Change  Category',
    labelname: 'Category',
    arr: 45,
    type: 11
  },
  {
    title: 'Change Background Provider on existing work order',
    labelname: 'Background Provider',
    arr: 46
  },
  {
    title: 'Cancel Work Order',
    labelname: 'Work Order',
    arr: 48,
    type: 12
  },
  {
    title: 'Delete Work Order',
    labelname: 'Work Order',
    arr: 49,
    type: 13
  }
]