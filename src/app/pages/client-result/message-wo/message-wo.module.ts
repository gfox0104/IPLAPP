import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';
import { MessageWoComponent } from './message-wo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
//import { MessageSearchPipe } from '../../pipes/message.search.pipe';
//import { WorkOrderSearchPipe } from '../../pipes/work.order.search.pipe'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { MessageViewHeader } from './message-wo-view-header/message-view-header.component';
// import { MessageContent } from './message-wo-content/message-content.component';
import { WoMessageSearchPipe } from 'src/app/pipes/wo-message.search.pipe';
import { MessageModule } from '../../message/message.module';
import { NgxSpinnerModule } from 'ngx-spinner';
export const MessageRouts = [
  {
    path: "workordermessage", component: MessageWoComponent,
  }
];

@NgModule({
  declarations: [
    MessageWoComponent,
    // MessageViewHeader,
    // MessageContent,
    WoMessageSearchPipe,
    // WorkOrderSearchPipe
  ],
  imports: [
    RouterModule.forChild(MessageRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    GridModule,
    NgMultiSelectDropDownModule,
    InfiniteScrollModule,
    MessageModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [MessageWoComponent]
})

export class MessageWoModule { }
