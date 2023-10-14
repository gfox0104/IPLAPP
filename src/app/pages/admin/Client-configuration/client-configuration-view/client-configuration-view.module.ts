import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from 'src/app/shared.module';
import { ClientConfigurationViewComponent } from './client-configuration-view.component';
import { ClientConfigurationViewServices } from './client-configuration-view.service';
import { TaskConfigurationServices } from '../task-configuration/task-configuration.service';

const ClientConfigurationViewComponentRouts: Routes = [
  { path: "viewclientconfiguration", component: ClientConfigurationViewComponent },
  {
    path: 'addtaskconfiguration',
    loadChildren: () => import('../task-configuration/task-configuration.module').then(m => m.AddTaskConfigurationModule)
  },
  { path: '', redirectTo: 'viewclientconfiguration', pathMatch: 'full'}
];

@NgModule({
  declarations: [ClientConfigurationViewComponent],
  imports: [
    RouterModule.forChild(ClientConfigurationViewComponentRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule
  ],
  providers: [ClientConfigurationViewServices, TaskConfigurationServices],
  bootstrap: [ClientConfigurationViewComponent]
})

export class ViewClientConfigurationModule { }
