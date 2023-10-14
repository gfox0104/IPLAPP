import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared.module';
import { ViewPropertyAlertComponent } from './view-property-alert.component';
import { PropertyAlertFormCardComponent } from '../property-alert-form-card/property-alert-form-card.component';



const ViewPropertyAlertRouts: Routes = [
    
    {path:'Propertys' , component:ViewPropertyAlertComponent},
    { path: '', redirectTo: 'Propertys', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [ViewPropertyAlertComponent,PropertyAlertFormCardComponent],
    imports: [
      RouterModule.forChild(ViewPropertyAlertRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [ViewPropertyAlertComponent]
  })
  
  export class ViewPropertyAlertModule { }