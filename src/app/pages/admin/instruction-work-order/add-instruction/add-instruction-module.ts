import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { AddInstructionComponent } from './add-instruction-component';
import { AddInstructionServices } from '../add-instruction/add-Instruction.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const AddInstructionComponentRouts: Routes = [
  { path: "", component: AddInstructionComponent },

];

@NgModule({
  declarations: [AddInstructionComponent],
  imports: [
    RouterModule.forChild(AddInstructionComponentRouts),
    NgbModule,
    GridModule,
    CommonModule,
    SharedModule,
    NgMultiSelectDropDownModule
  ],
  providers: [AddInstructionServices ],
  bootstrap: [AddInstructionComponent]
})

export class AddInstructionModule { }
