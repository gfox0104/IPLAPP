import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';
import { IconPickerModule } from 'ngx-icon-picker';
import {ScoreCardsComponent} from './scorecards.component'
import{ChildDetailsComponent} from './child-score-details/child-score-details.component'
import { SharedModule } from 'src/app/shared.module';

const ScorecardsRouts: Routes = [
  { path: "", component: ScoreCardsComponent ,
  // canActivate: [AccessGuard],
  // data: {role: {number: 3, page_name: 'Score Cards'}} 
},
  
];

@NgModule({
  declarations: [ScoreCardsComponent, ChildDetailsComponent],
  imports: [
    RouterModule.forChild(ScorecardsRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule,
    IconPickerModule
  ],
  providers: [],
  bootstrap: [ScoreCardsComponent]
})

export class ScoreCardsModule { }
