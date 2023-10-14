import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AddDamageComponent } from './add-damage.component';
import { AddDamageServices } from './add-damage.service';
import { CommonDirectiveModule } from '../../../../directives/common-directive.module';
import { SharedModule } from 'src/app/shared.module';

const AddDamageComponentRouts = [
  { path: "", component: AddDamageComponent }
];

@NgModule({
  declarations: [AddDamageComponent],
  imports: [
    RouterModule.forChild(AddDamageComponentRouts),
    SharedModule,
    NgbModule,
    HttpClientModule,
    CommonDirectiveModule,
  ],
  providers: [AddDamageServices],
  bootstrap: [AddDamageComponent]
})

export class AddDamageModule { }
