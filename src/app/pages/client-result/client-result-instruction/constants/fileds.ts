interface InfoAccess {
  title: string;
  key: string;
  width?: string;
  directive? : string;
  type? : string;

}

export const AccessLog: InfoAccess[] = [
  {
    title: 'Remark',
    key: 'Alm_Remark'
  },
  {
    title: 'Log Date',
    key: 'LogDate',
    directive: `date:'MM/dd/yyyy'`
  },
  {
    title: 'Status',
    key: 'Status_Name',

  },
  {
    title: 'User Name',
    key: 'LogUserName'
  }

]

export const NewAccessLog: InfoAccess[] = [
  // {
  //   title: 'Platform',
  //   key: 'Access_Platform'
  // },
  // {
  //   title: 'User Action',
  //   key: 'Access_User_Action',
  // },
  // {
  //   title: 'Access Log data',
  //   key: 'Access_Log_data',
  // },
  {
    title: 'Type of Log',
    key: 'Access_Type_of_Log'
  },
  {
    title: 'Log Details',
    key: 'Access_Log_Details'
  },
  {
    title: 'Access Date',
    key: 'Access_Date',
    type:'date'
  },
  {
    title: 'Access By',
    key: 'Access_CreatedBy'
  }

]
