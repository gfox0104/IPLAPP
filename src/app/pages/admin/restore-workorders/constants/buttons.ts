import { Button } from '../../../../models/button-model';

export const Buttons: Button[] = [
  {
    title: 'User Groups',
    iclass: 'fas fa-plus-circle',
    routerLink: '/home/group/viewgroups'
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
    routerLink: '/home/adminlinkpage'
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
