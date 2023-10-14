import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'importqueuedata',
    loadChildren: () => import('./auto-import-order/auto-import-order.module').then(m => m.ImportWorkOrderImportQueueDetailsModule)
  },
  {
    path: 'importworkorderqueue',
    loadChildren: () => import('./work-order-import-queue/order-import-queue.module').then(m => m.WorkOrderImportQueueModule),
  },
  {path: '', redirectTo: 'importqueuedata', pathMatch: 'full'}
]
