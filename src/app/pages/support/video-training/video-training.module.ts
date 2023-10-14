import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {VideoTrainingComponent} from './video-training.component';


export const TrainingRouts: Routes = [
  { 
    path: "training", 
    component: VideoTrainingComponent 
  },
  { path: '', redirectTo: 'training', pathMatch: 'full'}
];

@NgModule({
  declarations: [VideoTrainingComponent],
  imports: [
    RouterModule.forChild(TrainingRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [VideoTrainingComponent]
})

export class VideoTrainingModule {}
