import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuardService as AccessGuard} from '../../services/access/access-guard.service';
import {} from './contractor-mass/contractor-memo.module'
import{} from '../admin/contact-details/view-contact-us.module';


const routes: Routes =  [
  {
    path: 'contractorlinkpage',
    loadChildren: () => import('./contractor-link/contractor-link.module').then(m => m.ContractorLinkPageModule),
  },
  {
    path: "coveragemap",
    loadChildren: () => import('./contractor-map/contractor-map.module').then(m => m.ContractorMapModule),
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'Coverage Map' } }
  },
  {
    path: 'livemap',
    loadChildren: () => import('./live-map/live-map-module').then(m => m.LiveMapModule),
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'Live Map' } }
  },
  {
    path: 'document',
    loadChildren: () => import('./document-form/document-form.module').then(m => m.DocumentAndFormModule),
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'Forms And Docs' } }
  },
  {
    path: 'creatememo',
    loadChildren: () => import('./memo/memo.module').then(m => m.MemoModule),
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'Mass Mail' } }
  },
  {
    path: 'memo',
    loadChildren: () => import('./contractor-mass/contractor-memo.module').then(m => m.ContractorMemoModule),
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'Create Memo' } }
  },
  {
    path: 'scorecards',
    loadChildren: () => import('./socre-cards/scorecards.component.module').then(m => m.ScoreCardsModule),
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'ScoreCards' } }

  },
  {
    path: 'professionalservices',
    loadChildren: () => import('./professional-services/professional-services.module').then(m => m.ProfessionalServicesModule),
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'Professional Services' } }

  },

  { path: "", redirectTo: "/contractors/contractorlinkpage", pathMatch: "full" }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})

export class ContractorModule {};
