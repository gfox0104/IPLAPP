import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { ViewBackgroundProviderComponent } from './view-background-provider.component';
import { BackgroundProviderFormCardComponent } from '../background-provider-form-card/background-provider-form-card.component';




const ViewLotPricingfilterRouts: Routes = [
    
    {path:'BackgroundProviders' , component:ViewBackgroundProviderComponent},
    { path: '', redirectTo: 'ViewBackgroundProvider', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [ViewBackgroundProviderComponent,BackgroundProviderFormCardComponent],
    imports: [
      RouterModule.forChild(ViewLotPricingfilterRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [ViewBackgroundProviderComponent]
  })
  
  export class ViewBackgroundProviderModule { }