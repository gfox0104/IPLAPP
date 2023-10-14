import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuardService as AccessGuard} from '../../services/access/access-guard.service';
import {} from '../support/billing-details/billing-details.module'

const routes: Routes =  [
  {
    path: 'supportlink',
    loadChildren: () => import('../support/support-details/support-details.module').then(m => m.SupportlinkModule),
    // canActivate: [AccessGuard],
    // data: { role: { number: 1, page_name: '' } },
  },
  {
    path: 'contact',
    loadChildren: () => import('../support/contact-us/contact-us.module').then(m => m.ContactUsModule),
    canActivate: [AccessGuard],
    data: { role: { number: 6, page_name: 'Contact Us' } },
  },
  {
    path: 'supportdetail',
    loadChildren: () => import('../support/support-setting/support-setting.module').then(m => m.SupportSettingModule),
    canActivate: [AccessGuard],
    data: { role: { number: 6, page_name: 'Supports' } },
  },
  {
    path: 'video',
    loadChildren: () => import('../support/video-training/video-training.module').then(m => m.VideoTrainingModule),
    canActivate: [AccessGuard],
    data: { role: { number: 6, page_name: 'Video Training' } },
  },
  {
    path: 'doc',
    loadChildren: () => import('../support/documentation/documentation.module').then(m => m.DocumentationModule),
    canActivate: [AccessGuard],
    data: { role: { number: 6, page_name: 'Documentation' } },
  },
  {
    path: 'download',
    loadChildren: () => import('../support/downloads/downloads.module').then(m => m.DownloadsModule),
    canActivate: [AccessGuard],
    data: { role: { number: 6, page_name: 'Downloads' } },
  },
  {
    path: 'box',
    loadChildren: () => import('../support/suggestion-box/suggestion-box.module').then(m => m.SuggestionModule),
    canActivate: [AccessGuard],
    data: { role: { number: 6, page_name: 'Suggestion Box' } },
  },
  {
    path: 'billingdetails',
    loadChildren: () => import('../support/billing-details/billing-details.module').then(m => m.BillingModule),
    canActivate: [AccessGuard],
    data: { role: { number: 6, page_name: 'Billing' } },
  },
  {
    path: '', redirectTo: 'supportlink', pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class SupportModule {};