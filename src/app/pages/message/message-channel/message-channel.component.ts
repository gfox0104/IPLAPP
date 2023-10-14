import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'message-channel',
  templateUrl: './message-channel.component.html',
  styleUrls: ['./message-channel.component.scss']
})

export class MessageChannel implements OnInit {
  @Input() item: any;
  @Input() selectedWorkOrder: number;
  @Input() username: string;
  @Input() MasterUnreadCounts: number;
  @Output() messageEvent = new EventEmitter();
  @Output() MasterCountSum = new EventEmitter();

  messageRef: any;
  messageList: Array<any> = [];
  unreadCounts: number = 0;
  unreadMessageNotification: any =[];
  IPL_Company_ID = null;
  groupRoleID: number = 0;
  constructor(
    private xdatabase: AngularFireDatabase,
    private messageService: MessageService,
    private authService: AuthService,
  ) {
    const userDetail = this.authService.getUserDetail();
    this.groupRoleID = userDetail.GroupRoleId;
    this.IPL_Company_ID = userDetail.IPL_Company_ID;
  }

  ngOnInit() {
    this.messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    this.messageRef.child(this.item.IPLNO)
      .on("child_added", value => {
        if (value.key === 'lastUpdate') return;
        const message = value.val();
        message['key'] = value.key;

        if (this.selectedWorkOrder === this.item.IPLNO) {
          this.messageService.SetMessageReadStatus(this.groupRoleID,message);
           //message.status = 'read';
        }
        this.messageList.push(message);
        // this.checkMessageStatus(message);
        this.GetUnreadCount(message,this.item.IPLNO);
      });
  }

  // checkMessageStatus(message) {
  //   if (message.status === 'unread' && message.from !== this.username) {
  //     this.unreadCounts++;
  //     this.messageService.setUnreadCounts(this.unreadCounts);
  //   }
  // }

  // loadMessageData() {
  //   this.unreadCounts = 0;
  //   const messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
  //   messageRef.child(this.item.IPLNO).orderByChild('status').equalTo('unread')
  //     .once("value", (snapshots) => {
  //       snapshots.forEach(snapshot => {
  //         snapshot.ref.update({...snapshot.val(),
  //           status: 'read'
  //         })
  //       })
  //     })
  //   this.messageEvent.emit(this.messageList);
  // }
  UpdateReadStatus() {
    this.unreadCounts=0;
    this.unreadMessageNotification=[];
    const messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    if(this.groupRoleID==1)
    {
      messageRef.child(this.item.IPLNO).orderByChild('readByAdmin').equalTo(false)
      .once("value", (snapshots) => {
        snapshots.forEach(snapshot => {
          snapshot.ref.update({...snapshot.val(),
            readByAdmin: true
          });
        });
      });

    }
    else if(this.groupRoleID==2)
    {
      messageRef.child(this.item.IPLNO).orderByChild('readByContractor').equalTo(false)
      .once("value", (snapshots) => {
        snapshots.forEach(snapshot => {
          snapshot.ref.update({...snapshot.val(),
            readByContractor: true
          })
        })
      });
    }
    else if(this.groupRoleID==3)
    {
      messageRef.child(this.item.IPLNO).orderByChild('readByCoordinator').equalTo(false)
      .once("value", (snapshots) => {
        snapshots.forEach(snapshot => {
          snapshot.ref.update({...snapshot.val(),
            readByCoordinator: true
          })
        })
      });
    }
    else if(this.groupRoleID==4)
    {
      messageRef.child(this.item.IPLNO).orderByChild('readByProcessor').equalTo(false)
      .once("value", (snapshots) => {
        snapshots.forEach(snapshot => {
          snapshot.ref.update({...snapshot.val(),
            readByProcessor: true
          })
        })
      });
    }
    else if(this.groupRoleID==5)
    {
      messageRef.child(this.item.IPLNO).orderByChild('readByClient').equalTo(false)
      .once("value", (snapshots) => {
        snapshots.forEach(snapshot => {
          snapshot.ref.update({...snapshot.val(),
            readByClient: true
          })
        })
      });
    }
    this.messageEvent.emit(this.messageList);
  }
  GetUnreadCount(message,iplNumber) {
    var msgText="You have received a new message from this IPL : <b>" +iplNumber+"</b>";
    var msgobj={IPLNo:iplNumber,msgText:msgText};

    if (
      message.readByAdmin != undefined &&
      message.readByContractor != undefined &&
      message.readByCoordinator != undefined &&
      message.readByProcessor != undefined &&
      message.readByClient != undefined
    ) {
    if (this.groupRoleID==1 && message.readByAdmin===false && message.from !== this.username) {
      this.unreadCounts++;
      this.unreadMessageNotification.push(msgobj);
      this.MasterUnreadCounts++;
      this.MasterCountSum.emit();
    }
    else if (this.groupRoleID==2 && message.readByContractor===false && message.from !== this.username) {
      this.unreadCounts++;
      this.unreadMessageNotification.push(msgobj);
      this.MasterUnreadCounts++;
      this.MasterCountSum.emit();
    }
    else if (this.groupRoleID==3 && message.readByCoordinator===false && message.from !== this.username) {
      this.unreadCounts++;
      this.unreadMessageNotification.push(msgobj);
      this.MasterUnreadCounts++;
      this.MasterCountSum.emit();
    }
    else if (this.groupRoleID==4 && message.readByProcessor===false && message.from !== this.username) {
      this.unreadCounts++;
      this.unreadMessageNotification.push(msgobj);
      this.MasterUnreadCounts++;
      this.MasterCountSum.emit();
    }
    else if (this.groupRoleID==5 && message.readByClient===false && message.from !== this.username) {
      this.unreadCounts++;
      this.unreadMessageNotification.push(msgobj);
      this.MasterUnreadCounts++;
      this.MasterCountSum.emit();
    }
    this.messageService.setUnreadCounts(this.MasterUnreadCounts);
    this.messageService.setUnreadMessageNotification(this.unreadMessageNotification);
  }
}
}
