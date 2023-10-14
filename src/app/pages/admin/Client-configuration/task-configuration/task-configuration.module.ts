import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonDirectiveModule } from '../../../../directives/common-directive.module';
import { SharedModule } from 'src/app/shared.module';
import { AddTaskConfigurationComponent } from './task-configuration.component';
import { TaskConfigurationServices } from './task-configuration.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TabStripModule } from '@progress/kendo-angular-layout';
const AddTaskConfigurationComponentRouts = [
  { path: "", component: AddTaskConfigurationComponent }
];

@NgModule({
  declarations: [AddTaskConfigurationComponent],
  imports: [
    RouterModule.forChild(AddTaskConfigurationComponentRouts),
    SharedModule,
    NgbModule,
    HttpClientModule,
    CommonDirectiveModule,
    GridModule,
    DropDownsModule,
    TabStripModule
  ],
  providers: [TaskConfigurationServices],
  bootstrap: [AddTaskConfigurationComponent]
})

export class AddTaskConfigurationModule { }
