import { Button } from '../../../../models/button-model';

export const Buttons: Button[] = [
  {
    title: 'New Ticket',
    iclass: 'fas fa-plus-circle',
    routerLink: '/support/supportdetail/setting'
  },
  {
    title: 'Create User',
    iclass: 'fas fa-plus-circle',
    routerLink: '/home/user/adduser/new',
    param: 'new'
  }, 
  {
    title: 'Back',
    iclass: 'fas fa-arrow-alt-circle-left',
    routerLink: '/home/workordersettings'
  },
  {
    title: 'Filter',
    iclass: 'fas fa-filter',
  },
  {
    title: 'Clear',
    iclass: 'fas fa-eraser'
  },
  {
    title: 'Save',
    iclass: 'fas fa-save'
  }
]
