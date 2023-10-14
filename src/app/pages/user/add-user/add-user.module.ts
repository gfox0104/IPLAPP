import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GridModule } from '@progress/kendo-angular-grid';
import { SharedModule } from '../../../shared.module';
import { AddUserComponent } from './add-user.component';
import { AddUserServices } from './add-user.service';
import { ColorDirective } from '../../../directives/color-change.directive';
import { CommonDocumentServices } from '../../services/document-upload/document-upload.service';
import { CommonDirectiveModule } from '../../../directives/common-directive.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
export const AdduserRouts = [

  { path: '', component: AddUserComponent }

]

@NgModule({
  declarations: [AddUserComponent, ColorDirective],
  imports: [
    RouterModule.forChild(AdduserRouts),
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    CommonDirectiveModule,
    SharedModule,
    DropDownsModule,
    GridModule
  ],

  providers: [
    AddUserServices, 
    CommonDocumentServices,
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    }
  ],
  bootstrap: [AddUserComponent]
})

export class AddUserModule { }
