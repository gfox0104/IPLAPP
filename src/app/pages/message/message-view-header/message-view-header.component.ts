import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'message-view-header',
  templateUrl: './message-view-header.component.html',
  styleUrls: ['../message.component.scss']
})

export class MessageViewHeader {
  @Input() orderDetail: any;
  @Input() groupRoleID: number;
  @Input() workOrder: string;
  @Input() messageSearch: string;
  @Output() clickThread = new EventEmitter();
  @Output() changeSearch = new EventEmitter();
  @Input() User_ImagePath: string;
  @Input() userFullName: string;
  @Input() IsSearchBoxDisplay: boolean;

  threadID: string;
  threadType: string="contractor";

  selectThread(thread) {
    this.threadType=thread;
    this.clickThread.emit(thread);
  }

  onChangeEvent(e) {
    this.changeSearch.emit(e.target.value);
  }

  getActiveThreadHeaderClass() {
    if (this.threadType == "contractor") {
      return "fixed-header message-header-contractor";
    }
    else if (this.threadType == "client") {
      return "fixed-header message-header-client";
    }
    else if(this.threadType == "internal") {
      return "fixed-header message-header-internal";
    }
    else
    {
      return "fixed-header message-header-contractor";
    }
  }
}
