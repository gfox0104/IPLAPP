import { Button } from '../../../../models/button-model';

export const Buttons: Button[] = [
  {
    title: 'Create Task',
    iclass: 'fas fa-plus-circle',
    routerLink: '/home/task/addinvoiceitems/new',
    //routerLink: '/home/task/bidinvoiceitem/new',
    param: 'new'
  }, 
  {
    title: 'Add Task Group',
    iclass: 'fas fa-plus-circle'
  },
  {
    title: 'Back',
    iclass: 'fas fa-arrow-alt-circle-left',
    routerLink: '/home/adminlinkpage'
  }
]
