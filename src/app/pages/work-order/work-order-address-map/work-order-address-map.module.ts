
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddressMapComponent } from './work-order-address-map.component';

export const routes:Routes = [
  { path: '', 
    component: AddressMapComponent,
  }
];

@NgModule({
  declarations: [
    AddressMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  bootstrap: []
})

export class WorkOrderAddressMapModule { }
