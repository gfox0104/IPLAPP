import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { ViewAccessUserLogComponent } from './view-access-user-log.component';




const ViewAccessuserlogRouts: Routes = [
    
    {path:'Viewaccessuserlog' , component:ViewAccessUserLogComponent},
    { path: '', redirectTo: 'Viewaccessuserlog', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [ViewAccessUserLogComponent],
    imports: [
      RouterModule.forChild(ViewAccessuserlogRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [ViewAccessUserLogComponent]
  })
  
  export class ViewAccessuserlogModule { }