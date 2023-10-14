import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { ViewPropertyTypeComponent } from './view-property-type.component';
import { PropertyFormCardComponent } from '../property-form-card/property-form-card.component';



const ViewpropertyRouts: Routes = [
    
    {path:'PropertyType' , component:ViewPropertyTypeComponent},
    { path: '', redirectTo: 'PropertyType', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [ViewPropertyTypeComponent,PropertyFormCardComponent],
    imports: [
      RouterModule.forChild(ViewpropertyRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [ViewPropertyTypeComponent]
  })
  
  export class viewpropertyModule { }