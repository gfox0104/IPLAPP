import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceLinkFormComponent } from './service-link-form/service-link-form.component';
import { ServiceLinkTemplateComponent } from './service-link-template/service-link-template.component';



const ServiceLinkFormRouts: Routes = [

    {path:'servicelinkform', component:ServiceLinkFormComponent},
    { path: '', redirectTo: 'servicelinkform', pathMatch: 'full'},
    {path:'servicelinktemplate',component:ServiceLinkTemplateComponent}

  ];

@NgModule({
    declarations: [ServiceLinkFormComponent,ServiceLinkTemplateComponent],
    imports: [
      RouterModule.forChild(ServiceLinkFormRouts),
      NgbModule,
      GridModule,
      FormsModule,ReactiveFormsModule,
      SharedModule
    ],
    exports:[ServiceLinkFormComponent],
    providers: [],
    bootstrap: [ServiceLinkFormComponent]
  })

  export class ServiceLinkModule{ }
