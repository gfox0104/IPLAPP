import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { ViewLotPricingFilterComponent } from './view-lot-pricing-filter.component';
import { LotPricingFilterFormCardComponent } from '../lot-pricing-filter-form-card/lot-pricing-filter-form-card.component';




const ViewLotPricingfilterRouts: Routes = [
    
    {path:'LotPricing' , component:ViewLotPricingFilterComponent},
    { path: '', redirectTo: 'LotPricing', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [ViewLotPricingFilterComponent,LotPricingFilterFormCardComponent],
    imports: [
      RouterModule.forChild(ViewLotPricingfilterRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [ViewLotPricingFilterComponent]
  })
  
  export class ViewLotPricingfilterModule { }