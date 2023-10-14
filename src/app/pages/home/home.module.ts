import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { Routes } from '@angular/router'
import { AsyncPipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule as kendoChart } from '@progress/kendo-angular-charts';
import { HomeComponent } from './home.component';
import { HomepageServices } from './home.service';
import { environment } from '../../../environments/environment';
import { MessagingDetailsService } from '../client-result/message-details/message-details.service';

const HomeRouts: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(HomeRouts),
    CommonModule,
    FormsModule,
    AngularFireMessagingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    kendoChart,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    GridModule
  ],
  providers: [HomepageServices, AsyncPipe, MessagingDetailsService],
  bootstrap: [HomeComponent]
})

export class HomeModule { }
