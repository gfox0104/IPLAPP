
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from "agm-overlays";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemoComponent } from './memo.component';
import { MemoServices } from './memo.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { environment } from '../../../../environments/environment';
import { EditorModule } from '@progress/kendo-angular-editor';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FileSelectModule } from '@progress/kendo-angular-upload';
import { PreviouslySentComponent } from './previously-sent/previously-sent.component';

export const mapRouts:Routes = [
  { path: "memoHistory", 
    component: MemoComponent,
    // canActivate: [AccessGuard],
    // data: {role: {number: 3, page_name: 'Memo History'}} 
  },
  { 
    path: 'viewTemplate',
    loadChildren: () => import('./view-template/view-template.module').then(m => m.ViewTemplateModule)
  },
  // { 
  //   path: 'previouslySent/:id',
  //   loadChildren: () => import('./previously-sent/previously-sent.module').then(m => m.PreviouslySentModule)
  // },
  { path: '', redirectTo: 'memoHistory', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    MemoComponent,
    PreviouslySentComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UploadModule,
    FileSelectModule,
    DateInputsModule ,
    DialogModule,
    GridModule,
    ExcelModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    DropDownsModule,
    EditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    RouterModule.forChild(mapRouts),
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  providers: [MemoServices],
  bootstrap: []
})

export class MemoModule { }
