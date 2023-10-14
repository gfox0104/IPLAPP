import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ViewPhotoHeaderComponent } from './view-photoheader.component';
import { ViewPhotoHeaderServices } from './view-photoheader.service';
import { AddPhotoHeaderTemplatesServices } from '../add-photoheader/photo-header-template.service';
import { SharedModule } from 'src/app/shared.module';

const ViewPhotoheaderRouts: Routes = [
  { path: "viewphotoheader", component: ViewPhotoHeaderComponent },
  {
    path: 'addPhotoHeader/:id',
    loadChildren: () => import('../add-photoheader/photo-header-template.module').then(m => m.AddPhotoHeaderTemplatesModule)
  },
  { path: '', redirectTo: 'viewphotoheader', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewPhotoHeaderComponent],
  imports: [
    RouterModule.forChild(ViewPhotoheaderRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewPhotoHeaderServices,AddPhotoHeaderTemplatesServices],
  bootstrap: [ViewPhotoHeaderComponent]
})

export class ViewPhotoHeaderModule { }
