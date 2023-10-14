import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewOccupancyStatusComponent } from './view-occupancy-status.component';
import { SharedModule } from 'src/app/shared.module';
import { OccupancyFormCardComponent } from '../occupancy-form-card/occupancy-form-card.component';


const ViewOccupancyRouts: Routes = [
    
    {path:'OccupancyStatus' , component:ViewOccupancyStatusComponent},
    { path: '', redirectTo: 'OccupancyStatus', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [ViewOccupancyStatusComponent, OccupancyFormCardComponent],
    imports: [
      RouterModule.forChild(ViewOccupancyRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [ViewOccupancyStatusComponent]
  })
  
  export class ViewOccupancyModule { }