import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';

import { SharedModule } from '../../../../shared.module';
import { ViewCustomPhotoLabelComponent } from './view-custom-photo-label.component';

const NameRouts: Routes = [
  { path: "labelview", component: ViewCustomPhotoLabelComponent },
  {
    path: 'lableAdd/:id',
    loadChildren: () => import('../add-custom-photo-label/custom-photo-label.module').then(m => m.CustomPhotoLableModule)
  },
  { path: '', redirectTo: 'labelview', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewCustomPhotoLabelComponent],
  imports: [
    RouterModule.forChild(NameRouts),
    NgbModule,
    GridModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ViewCustomPhotoLabelComponent]
})

export class ViewCustomPhotoLabelModule {}
