interface AccountSidebarLinks {
  title: string;
  iclass: string;
  routerLink: string;
}

export const AccountSidebarLinks: AccountSidebarLinks[] = [
  {
    title: 'Dashboard',
    iclass: 'fa fa-bar-chart',
    routerLink: '/accounting/accountingdetails/dashboard',
  },
  {
    title: 'Account',
    iclass: 'fa fa-bar-chart',
    routerLink: '/accounting/accountingdetails/account',
  },
  {
    title: 'Coa',
    iclass: 'fa fa-sitemap',
    routerLink: '/accounting/accountingdetails/coa',
  },
  {
    title: 'Ledger',
    iclass: 'fa fa-calculator',
    routerLink: '/accounting/accountingdetails/ledger',
  },
  {
    title: 'Reports',
    iclass: 'fa fa-bookmark',
    routerLink: '/accounting/accountingdetails/report',
  },
  {
    title: 'Company',
    iclass: 'fab fa-building',
    routerLink: '/accounting/accountingdetails/company',
  },
  {
    title: 'Invoice',
    iclass: 'fa fa-history',
    routerLink: '/accounting/accountingdetails/invoice',
  },
];
