import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MessageTypeEnum } from '../message-model';

@Component({
  selector: 'message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})

export class MessageContent implements OnInit {
  @Input() item: any;
  @Input() username: string;
  @Input() IsDisplayShareButton: boolean;
  @Output() shareMessage = new EventEmitter();
  @Output() deleteMessage = new EventEmitter();
  isSelf: boolean = false;

  messageTypeEnum=MessageTypeEnum
  ngOnInit() {
    this.isSelf = this.username === this.item.from;
  }

  convertTime = (time) => {
    var months_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = new Date(time);
    //Year
    var year = date.getFullYear();
    //Month
    var month = months_arr[date.getMonth()];
    //Day
    var day = date.getDate();
    //Hours
    var hours = date.getHours();
    //Minutes
    var minutes = "0" + date.getMinutes();

    var convDataTime = month + "-" + day + "-" + year + " " + hours + ":" + minutes.substr(-2);
    //var convDataTime = hours + ":" + minutes.substr(-2);
    return convDataTime;

  }

  getFileName(filePath) {
    var file: any = filePath.split("/");
    var fileName = file[5];
    var afileName: any = fileName.split("?");
    var name = afileName[0];
    var fname = name.replace(/%20/g, " ");
    return fname;
  }

  getShare(message) {
    this.shareMessage.emit(message);
  };

  delete(item) {
    this.deleteMessage.emit(item);
  }

}
