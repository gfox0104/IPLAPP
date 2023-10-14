import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from '../../../shared.module';
import { ContractorScoreCardSettingComponent } from './contractor-scorecard.component';
import { ContractorScoreCardSettingServices } from './contractor-scorecard.service';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { CommonDirectiveModule } from '../../../directives/common-directive.module';

const ContractorScoreCardRouts = [
  { 
    path:'', component: ContractorScoreCardSettingComponent,
    canActivate: [AccessGuard],
    data: {role: {number: 1, page_name: 'Scorecard settings'}}
  }
]

@NgModule({
  declarations: [ContractorScoreCardSettingComponent],
  imports: [
    RouterModule.forChild(ContractorScoreCardRouts),
    HttpClientModule,
    NgbModule,
    SharedModule,
    CommonDirectiveModule
  ],
  providers: [ContractorScoreCardSettingServices],
  bootstrap: [ContractorScoreCardSettingComponent]
})

export class  ContractorScoreCardSettingModule { }
