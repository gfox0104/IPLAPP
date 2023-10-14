import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AddUomComponent } from "./add-UOM.component";
import { AddUOMServices } from "./add-UOM.service";
import { SharedModule } from 'src/app/shared.module';


const AddUOMComponentRouts = [
  { path: "", component: AddUomComponent }
];
@NgModule({
  declarations: [AddUomComponent],
  imports: [
    RouterModule.forChild(AddUOMComponentRouts),
    NgbModule,
    SharedModule
  ],
  providers: [AddUOMServices],
  bootstrap: [AddUomComponent]
})

export class AddUOMModule {}
