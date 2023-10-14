import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { ImportWorkOrderComponent } from './import-work-order.component';

const ImportWorkOrderRouts =[
  {
    path: 'importworkorder',
    component: ImportWorkOrderComponent
  }
]

@NgModule({
  declarations: [ImportWorkOrderComponent],
  imports: [
    RouterModule.forChild(ImportWorkOrderRouts),
    CommonModule

  ],
  providers: [],
  bootstrap: [ImportWorkOrderComponent]
})

export class ImportWorkOrderModule {}
