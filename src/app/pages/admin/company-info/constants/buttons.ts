import { Button } from '../../../../models/button-model';

export const Buttons: Button[] = [
  {
    title: 'Add Company Info',
    iclass: 'fas fa-plus-circle',
    routerLink: '/home/company/companyinfo/new',
  }, 
  {
    title: 'Back',
    iclass: 'fas fa-arrow-alt-circle-left',
    routerLink: '/home/adminlinkpage'
  }
]
