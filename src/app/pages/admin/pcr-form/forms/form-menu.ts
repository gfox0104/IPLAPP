interface AdminLink {
    title: string;
    iclass: string;
    routerLink: string;
  }
  
  export const AdminLinks: AdminLink[] =[   
    {
      title: 'Dynamic Forms',
      iclass: 'fa fa-envelope-square',
      routerLink: '/home/forms'
    },
    {
      title: 'Template forms',
      iclass: 'fa fa-user',
      routerLink: '/home/client/viewclientcompanies'
    },
    {
        title: 'Allowable checklist',
        iclass: 'fa fa-user',
        routerLink: '/home/client/viewclientcompanies'
      },
      {
        title: 'MSI Grass PCR Forms',
        iclass: 'fa fa-user',
        routerLink: '/home/forms/msi-grass-pcr-form'
      }
  ]
  