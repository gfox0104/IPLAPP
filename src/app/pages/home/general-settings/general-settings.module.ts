import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GeneralSettingsComponent } from './general-settings.component';
import { SharedModule } from 'src/app/shared.module';

const GeneralSettingsRouts = [
  { path: '', component: GeneralSettingsComponent }
]

@NgModule({
  declarations: [GeneralSettingsComponent],
  imports: [
    RouterModule.forChild(GeneralSettingsRouts),
    SharedModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [GeneralSettingsComponent]
})

export class GeneralSettingsModule { }
