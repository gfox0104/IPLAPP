import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';
import { MessageComponent } from './message.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MessageSearchPipe } from '../../pipes/message.search.pipe';
import { WorkOrderSearchPipe } from '../../pipes/work.order.search.pipe'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageViewHeader } from './message-view-header/message-view-header.component';
import { MessageContent } from './message-content/message-content.component';
import { MessageChannel } from './message-channel/message-channel.component';
import { MessageRightSideBarComponent } from './message-right-side-bar/message-right-side-bar.component';


export const MessageRouts = [
  {
    path: "workordermessage", component: MessageComponent,
  }
];

@NgModule({
  declarations: [
    MessageComponent,
    MessageViewHeader,
    MessageContent,
    MessageChannel,
    MessageSearchPipe,
    WorkOrderSearchPipe,
    MessageRightSideBarComponent
  ],
  imports: [
    RouterModule.forChild(MessageRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    GridModule,
    NgMultiSelectDropDownModule,
    InfiniteScrollModule
  ],
  exports: [
    MessageContent,
    MessageViewHeader,
    MessageRightSideBarComponent
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [MessageComponent]
})

export class MessageModule { }
