import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database'
import md5 from "md5";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { ClientResultServices } from "../client-result/client-result.service";
import { TaskBidMasterModel } from '../client-result/client-result-model';
import { MessageModelData } from './message-details-model'
import { MessagingDetailsService } from './message-details.service'
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  templateUrl: "./message-details.component.html",
  styleUrls: ['./message-details.component.css']
})

export class MessageDetailsComponent {
  message;
  encuser: any;
  status: string;
  threadID: string = '';
  threadType: string = 'contractor';
  groupRoleID: number = 0;
  workOrder: number = 0;
  messageList = [];
  smessageList = [];
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  MessageModelDataObj: MessageModelData = new MessageModelData();
  ModelObj: any;
  headwodata: any;
  messages: string;
  decuser: any;
  IPL_Company_ID:any;
  constructor(
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xClientResultServices: ClientResultServices,
    private xdatabase: AngularFireDatabase,
    private xMessagingDetailsService: MessagingDetailsService,
    private authService: AuthService,
  ) {
    const userDetail = this.authService.getUserDetail();
    this.IPL_Company_ID = userDetail.IPL_Company_ID;
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);
      this.groupRoleID = this.decuser[0].GroupRoleId;
      const workorder1 = this.xRoute.snapshot.params['workorder'];
      let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
      this.workOrder = parseInt(workOrderID);

      switch (this.groupRoleID) {
        case 2:
          this.threadID = this.workOrder + '_contractor';
          this.threadType = 'contractor';
          break;
        case 1:
          this.threadID = this.workOrder + '_contractor';
          this.threadType = 'contractor';
          break;
        case 3:
        case 4:
          this.threadID = this.workOrder + '_internal';
          this.threadType = 'internal';
          break;
        case 5:
          this.threadID = this.workOrder + '_client';
          this.threadType = 'client';
          break;
        default:
      }
    }
  }

  ngOnInit() {
    this.encuser = localStorage.getItem('UserName').toLowerCase();
    this.GetAllMessages();
    this.GetWorkOrderUserDetails();
  }

  GetWorkOrderUserDetails() {
    this.TaskBidMasterModelObj.workOrder_ID = this.workOrder;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.ModelObj = response[0][0];
        this.headwodata = response[0][0];
        this.SaveFireDataBaseChate();
        this.displayMessages(this.ModelObj.IPLNO);
        this.setLastUpdate();
      });
  }

  GetAllMessages() {
   // let messageRef = this.xdatabase.database.ref("messages/this.IPL_Company_ID");
   let messageRef = this.xdatabase.database.ref("messages/"+this.IPL_Company_ID);
    messageRef.once("value", value => {
      const data = value.val();
      const IPLNO_list = Object.keys(data);
      IPLNO_list.map(item => {
        messageRef.child(item)
          .on('child_added', sitem => {
            let ssmessagList = this.smessageList.slice();
            ssmessagList.push(sitem.val());
            ssmessagList.sort(this.compare);
            this.smessageList = ssmessagList;
          })
      })
    })
  }

  compare(a: any, b: any) {
    let comparison = 0;
    if (a.time > b.time) {
      comparison = 1;
    } else if (a.time < b.time) {
      comparison = -1;
    }
    return comparison;
  }

  SaveFireDataBaseChate() {
    let userRef = this.xdatabase.database.ref("users");
    let IPLNO = this.ModelObj.IPLNO;
    userRef.child(this.encuser).update({
      id: this.encuser,
      avatar: `http://gravatar.com/avatar/${md5(this.encuser)}?d=identicon`
    });
    this.addMembers(this.encuser, IPLNO);
    this.displayMessages(IPLNO);
  }

  setLastUpdate() {
    let userRef = this.xdatabase.database.ref("users");
    userRef.child(this.encuser)
      .child("groups")
      .child(this.ModelObj.IPLNO)
      .set({
        lastUpdate: firebase.database.ServerValue.TIMESTAMP,
        IPLNO: this.ModelObj.IPLNO,
      });
  }

  addMembers(encuser, IPLNO) {
    let updates = {};
    let member = {
      member: encuser,
    };
    updates[IPLNO + "/" + encuser + "/"] = member;
    this.xdatabase.database.ref("groups").update(updates)
      .then(() => console.log("member added"))
      .catch(err => console.error("Error while adding members: ", err));
  }


  displayMessages(IPLNO) {
    let messageRef = this.xdatabase.database.ref("messages");
    messageRef.child(IPLNO)
      .on("child_added", value => {
        this.messageList.push(value.val());
      })
  }

  selectThread(thread) {
    this.threadID = this.workOrder + '_' + thread;
    this.threadType = thread;
  }

  async SentMessage(item) {
    let name = this.decuser[0].User_FirstName + " " + this.decuser[0].User_LastName;

    console.log('com',this.IPL_Company_ID)
    this.messages = item.Message_Text;
    //let messageRef = this.xdatabase.database.ref("messages/this.IPL_Company_ID");
    let messageRef = this.xdatabase.database.ref("messages/"+this.IPL_Company_ID);
    if (this.messages.length > 0) {
      this.MessageModelDataObj.Message_Text = '';

      let messageId = (await messageRef.push()).key;
      let message = {
        message: this.messages,
        from: this.encuser,
        time: firebase.database.ServerValue.TIMESTAMP,
        // avatar: `http://gravatar.com/avatar/${md5(logged_in_user)}?d=identicon`,
        avatar: '',
        name: name,
        threadtype: this.threadType,
        threadid: this.threadID
      }
      messageRef
        .child(this.ModelObj.IPLNO)
        .child(messageId)
        .update(message)
        .then(() => console.log("Message added"))
        .catch((err) => console.error("Error while entering text: ", err));

      this.setLastUpdate();
    }


  }

  storemsgrecordsql() {
    this.MessageModelDataObj.Msg_Wo_Id = this.ModelObj.workOrder_ID;
    this.MessageModelDataObj.Msg_Message_text = this.messages;
    this.MessageModelDataObj.Msg_From_UserId = this.decuser[0].User_pkeyID;
    this.MessageModelDataObj.Msg_To_UserId = 0;
    this.MessageModelDataObj.Msg_To_UserId_A = 0;
    this.MessageModelDataObj.Msg_To_UserId_B = 0;
    this.MessageModelDataObj.Msg_Time = '';
    this.MessageModelDataObj.Msg_Status = 1;
    this.MessageModelDataObj.Msg_Message_Id = '';
    this.xMessagingDetailsService
      .WorkorderMessagePost(this.MessageModelDataObj)
      .subscribe(response => {
        // console.log("message send :", response)
      })
  }

  checkStatus = async () => {
    let status = '';
    this.xdatabase.database.ref(
      "Users/" + this.encuser + "/" + this.ModelObj.CORNT_User_LoginName
    ).on(
      "value", (snapshot) => {
        status = snapshot.val().status;
        if (status !== "online") {
          // this.sentNotification();
        }
      }
    )
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
    return convDataTime;

  }

  GetMessageDetailsData() {
    this.xdatabase.database.ref('messages').child(this.encuser)
      .child(this.ModelObj.CORNT_User_LoginName).on('child_added', (value) => {
        this.messageList.push(value.val())
      });
  }

  public trackItem(i, msg) {
    return msg.time;
  }

  ngOnDestroy() {
    if (this.ModelObj != undefined && this.ModelObj.CORNT_User_LoginName != undefined) {
      this.xdatabase.object('Users/' + this.ModelObj.CORNT_User_LoginName + '/' + this.encuser).set({
        user_name: this.encuser,
        status: 'away'
      })
    }
  }
}
