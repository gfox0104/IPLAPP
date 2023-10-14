
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { WorkOrderMapComponent } from './work-order-map.component';
import { WorkOrderMapServices } from './work-order-map.service'
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { environment } from '../../../../environments/environment';

export const mapRouts:Routes = [
  { path: "work", 
    component: WorkOrderMapComponent,
    canActivate: [AccessGuard],
    data: {role: {number: 3, page_name: 'Work Order Map'}} 
  },
  { path: '', redirectTo: 'work', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    WorkOrderMapComponent
  ],
  imports: [
    CommonModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    RouterModule.forChild(mapRouts),
    // BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  providers: [WorkOrderMapServices],
  bootstrap: []
})

export class WorkOrderMapModule { }
