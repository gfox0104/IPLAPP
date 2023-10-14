export interface Menu {
  name: string,
  routerLink: string,
  index?: number
  subMenus: {
    iclass: string,
    displayName: string,
    routerLink: string,
    index?: number
  }[]
}

export const Menus: Menu[] =[
  {
    name: 'Work Orders',
    routerLink: '/workorder',
    subMenus: [
      {
        iclass: 'fe-briefcase',
        displayName: 'Create Work Order',
        routerLink: 'workorder/createworkorder/new'
      },
      {
        iclass: 'fe-bar-chart-line-',
        displayName: 'Import Orders',
        routerLink: 'workorder/importqueue'
      },
      {
        iclass: 'fe-user',
        displayName: 'Auto Import Orders',
        routerLink: 'workorder/queueworkorder',
      },
      // {
      //   iclass: 'fe-settings',
      //   displayName: 'Documents',
      //   routerLink: 'workorder/formdoc'
      // }
    ]
  },
  {
    name: 'Resources',
    routerLink: '/contractors',
    subMenus: [
      {
        iclass: 'fas fa-file',
        displayName: 'Documents',
        routerLink: '/contractors/document'
      },
      {
        iclass: 'fas fa-edit',
        displayName: 'Memos',
        routerLink: '/contractors/memo'
      }
    ]
  },
  {
    name: 'Message',
    routerLink: '/message/workordermessage',
    subMenus: []
  },
 
  {
    name: 'Reports',
    routerLink: '/report/reportslink',
    subMenus: [
      {
        iclass: 'fe-briefcase',
        displayName: 'Contractor Reports',
        routerLink: 'report/contractorreports/reports'
      },
      {
        iclass: 'fe-bar-chart-line-',
        displayName: 'Accounts Payable',
        routerLink: 'report/accountpayable/reportsdetails'
      }
    ]
    
  },
  {
    name: 'Accounting',
    routerLink: '/accounting',
    subMenus: []
  },
  {
    name: 'Admin',
    routerLink: 'home',
    index: 8,
    subMenus: [
      {
        iclass: 'fas fa-user-plus',
        displayName: 'Add User',
        routerLink: 'home/user'
      },
      {
        iclass: 'fe-briefcase',
        displayName: 'Add Work Type',
        routerLink: '/home/worktype'
      },
      {
        iclass: 'fas fa-tasks',
        displayName: 'Add Task',
        routerLink: '/home/task'
      },
      {
        iclass: 'fas fa-user-tag',
        displayName: 'Add Client',
        routerLink: '/home/client'
      }
    ]
  },
  {
    name: 'Support',
    routerLink: '/support',
    subMenus: [
      {
        iclass: 'fe-settings',
        displayName: 'Support',
        routerLink: '/support'
      },
      {
        iclass: 'fe-download',
        displayName: 'Downloads',
        routerLink: '/support/download/downloaddata'
      },
      {
        iclass: 'fe-mail',
        displayName: 'Contact us',
        routerLink: '/support/contact/contactus',
      },
      {
        iclass: 'fe-video',
        displayName: 'Video Training',
        routerLink: '/support/video/training'
      }
    ]
  },
  {
    name: 'RepairBase',
    routerLink: '/repairBase/repairMain',
    subMenus: [
      {
        iclass: 'fe-settings',
        displayName: 'Proxy Server',
        routerLink: '/repairBase/repairMain/repairBaseProxyserver'
      },
      {
        iclass: 'fe-settings',
        displayName: 'Home',
        routerLink: '/repairBase/repairMain/repairHome'
      },
      { 
        iclass: 'fe-download',
        displayName: 'User Information',
        routerLink: '/repairBase/repairMain/repairUser'
      },
      {
        iclass: 'fe-mail',
        displayName: 'Change Password',
        routerLink: '/repairBase/repairMain/repairChangepassword',
      },
      {
        iclass: 'fe-video',
        displayName: 'Logout',
        routerLink: '/logout'
      }
    ]
    
  }
]
