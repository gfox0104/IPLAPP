import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { LiveUserLocationComponent } from './live-user-location.component';




const LiveuserRouts: Routes = [
    
    {path:'Liveuser' , component:LiveUserLocationComponent},
    { path: '', redirectTo: 'Liveuser', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [LiveUserLocationComponent],
    imports: [
      RouterModule.forChild(LiveuserRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [LiveUserLocationComponent]
  })
  
  export class LiveUserLocationModule { }