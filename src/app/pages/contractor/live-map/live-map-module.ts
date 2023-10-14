import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LiveMapComponent } from './live-map-component';
import { LiveMapServices } from './live-map-service';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { AgmOverlays } from "agm-overlays";
import { AgmCoreModule } from '@agm/core';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
export const mapRouts: Routes = [
  {
    path: 'livemap',
    component: LiveMapComponent,
    canActivate: [AccessGuard],
    data: { role: { number: 3, page_name: 'Live Map' } },
  },
  { path: '', redirectTo: 'livemap', pathMatch: 'full' },
];
@NgModule({
  declarations: [LiveMapComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DropDownsModule,
    RouterModule.forChild(mapRouts),
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA',
      libraries: ['places'],
    }),
  ],
  providers: [LiveMapServices],
  bootstrap: [],
})
export class LiveMapModule {}
