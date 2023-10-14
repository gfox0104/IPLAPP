interface AccountDetailLinks {
  title: string;
  images: string;
  routerLink: string;
}

export const AccountDetailLinks: AccountDetailLinks[] = [
  {
    title: 'Import Client Payment',
    images: '../../../../assets/icons/accounting/import_client_payment-icon.png',
    // routerLink: '/accounting/accountingdetails/dashboard',
    routerLink: '/accounting/accountingdetails/ImportClientPaymentOrder',

  },
  {
    title: 'IPL Accounting Portal',
    images: '../../../../assets/icons/accounting/IPL_accounting_portal.png',
    routerLink: '/accounting/accountingdetails/dashboard',
  },
  {
    title: 'QuickBooks Intergration',
    images: '../../../../assets/icons/accounting/quick_book_icon.png',
    routerLink: '#',
  },
  {
    title: 'FreshBooks Intergration',
    images: '../../../../assets/icons/accounting/fresh-book-icon.png',
    routerLink: '#',
  },
  {
    title: 'Xero Intergration',
    images: '../../../../assets/icons/accounting/xero-integration.png',
    routerLink: '#',
  },
];
