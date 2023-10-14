
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from "agm-overlays";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ContractorMapComponent } from './contractor-map.component';
import { ContractorMapServices } from './contractor-map.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { environment } from '../../../../environments/environment';

export const mapRouts:Routes = [
  { path: "map", 
    component: ContractorMapComponent,
    canActivate: [AccessGuard],
    data: {role: {number: 3, page_name: 'Coverage Map'}} 
  },
  { path: '', redirectTo: 'map', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    ContractorMapComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    DropDownsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    RouterModule.forChild(mapRouts),
    // BrowserModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  providers: [ContractorMapServices],
  bootstrap: []
})

export class ContractorMapModule { }
