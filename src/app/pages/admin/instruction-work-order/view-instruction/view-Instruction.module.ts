import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';

import { SharedModule } from 'src/app/shared.module';
import { ViewInstructionComponent } from './view-Instruction.component';
import { ViewInstructionServices } from "./view-Instruction.service";
import { AddInstructionServices } from '../add-instruction/add-Instruction.service';
import { AddInstructionComponent } from '../add-instruction/add-instruction-component';

const ViewInstructionComponentRouts: Routes = [
  { path: "viewinstruction", component: ViewInstructionComponent },
  // {
  //   path: 'addinstruction/:id',
  //   loadChildren: () => import('../add-instruction/add-instruction-module').then(m => m.AddInstructionModule)
  // },
  { path: '', redirectTo: 'viewinstruction', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewInstructionComponent],
  imports: [
    RouterModule.forChild(ViewInstructionComponentRouts),
    NgbModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewInstructionServices, AddInstructionServices],
  bootstrap: [ViewInstructionComponent]
})

export class ViewInstructionModule { }
