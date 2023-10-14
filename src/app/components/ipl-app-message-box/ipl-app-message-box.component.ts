import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BindChatDataModel, MessageModelData, MessageTypeEnum } from 'src/app/pages/message/message-model';
import { SaveWorkOrderViewServices } from 'src/app/pages/work-order/work-order-view/work-order-view-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';
import md5 from "md5";

import { MessageService } from 'src/app/pages/message/message.service';
import { WorkOderViewModel } from 'src/app/pages/work-order/work-order-view/work-order-view-model';
import firebase from 'firebase';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ipl-app-message-box',
  templateUrl: './ipl-app-message-box.component.html',
  styleUrls: ['./ipl-app-message-box.component.scss']
})
export class IplAppMessageBoxComponent implements OnInit {

  @Input() IPLNumbers: any;
  IPL_Company_ID = null;
  messageList = [];
  username: any;
  messageRef: any;
  decuserr: any;
  MessageFlag: string;
  MessageModelDataObj: MessageModelData = new MessageModelData();


  WorkOderViewModelobj: WorkOderViewModel = new WorkOderViewModel();

  workOrder: number = 0;
  ModelObj: any;

  threadID: string = '';
  threadType: string = '';
  chatWithName = '';
  groupRoleID: number = 0;
  messageSearch;
  User_ImagePath = null;
  userFullName: string;
  headwodata: any;
  BindChatDataModelObj: BindChatDataModel = new BindChatDataModel();
  WorkType: string;
  WorkOrderIPLNo: string;
  Address: string;
  Client: string;
  WorkOrderNumber: string;
  formUsrCommonGroup: UntypedFormGroup;
  submitted = false;
  @ViewChild('scrollMe', { static: false }) scrollBottom: ElementRef;
  constructor(private xdatabase: AngularFireDatabase,
    private authService: AuthService,
    private EncrDecr: EncrDecrService,
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
    private modalService: NgbModal,
    public xMessageService: MessageService,
    private formBuilder: UntypedFormBuilder
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuserr = JSON.parse(decval);
    }

    const userDetail = this.authService.getUserDetail();
    this.groupRoleID = userDetail.GroupRoleId;
    this.User_ImagePath = userDetail.User_ImagePath
    this.userFullName = userDetail.User_FirstName + " " + userDetail.User_LastName;
    this.IPL_Company_ID = userDetail.IPL_Company_ID;
    this.username = localStorage.getItem('UserName').toLowerCase();



  }

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formBuilder.group({
      message:['', Validators.required]
    });

    this.loadMessageData(this.IPLNumbers[0]);
    this.LoadMessage();
  }

  LoadMessage() {
    var getIplNumber = this.IPLNumbers[0]
    this.messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
    var tempMessage = []
    this.messageRef.child(getIplNumber.IPLNO)
      .on("child_added", value => {
        if (value.key === 'lastUpdate') return;
        const message = value.val();
        message['key'] = value.key;
        tempMessage.push(message);
      });
    this.messageList = tempMessage;
    setTimeout(() => {
      this.scrollToBottom();
    });
  }
  shareMessage(event) {

  }
  deleteMessage(message) {
    let messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
    messageRef.child(this.IPLNumbers[0].IPLNO).child(message.key).remove();
    this.LoadMessage();
  }
  scrollToBottom(): void {
    if (!this.scrollBottom) return;
    this.scrollBottom.nativeElement.scroll({
      top: this.scrollBottom.nativeElement.scrollHeight,
    });
  }
  // SentMessage(messageModelData: MessageModelData) {
  //   let msgList = [];
  //   var messagesType=messageModelData.Message_Text.toString().includes('https') || messageModelData.Message_Text.toString().includes('http')?MessageTypeEnum.Link:MessageTypeEnum.Text;
  //   let messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);

  //   this.IPLNumbers.forEach(element => {
  //     let data = {
  //       message: messageModelData.Message_Text,
  //       from: this.username,
  //       time: "",
  //       avatar: `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`,
  //       name: name,
  //       threadtype: this.threadType,
  //       threadid: this.threadID,
  //       status: "unread",
  //       IPLNo: element.IPLNO,
  //       messagesType:messagesType
  //     }
  //     msgList.push(data);
  //   });
  //   this.xSaveWorkOrderViewServices.AddFirebaseWoMessage(msgList)
  //     .subscribe(response => {
  //       if (response.length > 0) {
  //         this.messageList = [];
  //         this.LoadMessage();
  //         this.SendTriggerEmail(this.MessageModelDataObj.Message_Text);
  //         this.MessageModelDataObj.Message_Text = "";
  //       }
  //     })
  // }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  show1:boolean=false;
  SentMessageNew(messageModelData: MessageModelData) {
    if (!this.MessageModelDataObj.Message_Text) {
      
      this.show1 = true;
      
    }else {
       this.show1 = false ;
    }
    this.submitted = true;
    let msgList = [];

    var messagesType=messageModelData.Message_Text.toString().includes('https') || messageModelData.Message_Text.toString().includes('http')?MessageTypeEnum.Link:MessageTypeEnum.Text;
    let messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    var Message_Text=messageModelData.Message_Text;

    this.IPLNumbers.forEach(async element => {
    //  console.log("IPL Number Element log",element)
      if (Message_Text.length > 0) {
        let messageId = (await messageRef.push()).key;
        let message = {
          message: Message_Text,
          from: this.username,
          time: firebase.database.ServerValue.TIMESTAMP,
          avatar: '',
          name: this.userFullName,
          threadtype: this.threadType,
          threadid: this.threadID,
          status: 'unread',
          readByAdmin:this.groupRoleID==1?true:false,
          readByContractor:this.groupRoleID==2?true:false,
          readByCoordinator:this.groupRoleID==3?true:false,
          readByProcessor:this.groupRoleID==4?true:false,
          readByClient:this.groupRoleID==5?true:false,
          messagesType:messagesType
        }
        messageRef
          .child(element.IPLNO)
          .child(messageId)
          .update(message)

        if (messageId != undefined) {
          this.SendTriggerEmail(Message_Text);
          this.SendWoMsgNotification(element.WorkOrder_Id)
        }
      }
    });

    this.messageList = [];
    this.LoadMessage();
    this.MessageModelDataObj.Message_Text = "";
  }
  triggerFunction(event) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.MessageModelDataObj.Message_Text += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.SentMessageNew(this.MessageModelDataObj);
    }
  }
  defaultModal(closeAllPopup) {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Close';
    modalRef.result.then(result => { }, reason => {
      if (closeAllPopup) {
        this.modalService.dismissAll();
      }
    });
  }
  selectThread(thread) {
    this.threadID = this.workOrder + '_' + thread;
    this.threadType = thread;
    if (this.threadType === 'contractor' && this.groupRoleID === 2) {
      this.chatWithName = 'Admin';
    }
    else {
      this.chatWithName = thread;
    }
    setTimeout(() => {
      this.scrollToBottom();
    })
  }
  onChangeSearch(text) {
    this.messageSearch = text;
  }
  loadMessageData(channel) {
    this.WorkOderViewModelobj.workOrder_ID=channel.WorkOrder_Id;
    this.xMessageService.
      getWorkOrderOnSearch(this.WorkOderViewModelobj, channel.IPLNO)
      .subscribe(Response => {
        const order = Response[0][0];
        // console.log(order);
        this.workOrder = order.workOrder_ID;
        this.GetWorkOrderUserDetails(order);
        setTimeout(() => {
          this.scrollToBottom();
        })
      });
    // this.BindChatDataModelObj.IPLNO = channel.IPLNO;
    // this.IPLNO = channel.IPLNO;
    // this.selectedWorkOrder = channel.IPLNO;
    // this.start_conversation = true;
    this.messageSearch = '';
    this.threadType = 'contractor';
    this.chatWithName = 'contractor';
    switch (this.groupRoleID) {
      case 2:
        this.threadID = this.workOrder + '_contractor';
        this.threadType = 'contractor';
        this.chatWithName = 'Admin';
        break;
      case 1:
        this.threadID = this.workOrder + '_contractor';
        this.threadType = 'contractor';
        this.chatWithName = 'contractor';
        break;
      case 3:
      case 4:
        this.threadID = this.workOrder + '_internal';
        this.chatWithName = 'internal';
        this.threadType = 'internal';
        break;
      case 5:
        this.threadID = this.workOrder + '_client';
        this.threadType = 'client';
        this.chatWithName = 'client';
        break;
      default:
    }
    setTimeout(() => {
      this.scrollToBottom();
    })
  }
  GetWorkOrderUserDetails(workOrder) {
    // debugger
    this.ModelObj = workOrder;
    this.headwodata = workOrder;
    this.BindChatDataModelObj.Processor = this.ModelObj.Processor;
    this.BindChatDataModelObj.Customer_Number = parseInt(this.ModelObj.Company);
    this.BindChatDataModelObj.Cordinator = this.ModelObj.Cordinator;
    this.BindChatDataModelObj.Contractor = this.ModelObj.Contractor;
    this.WorkType = this.ModelObj.WT_WorkType;
    this.WorkOrderIPLNo = this.ModelObj.IPLNO;
    this.Address = this.ModelObj.address1;
    this.Client = this.ModelObj.Client_Company_Name;
    this.WorkOrderNumber = this.ModelObj.workOrderNumber;

    this.SaveFireDataBaseChate();
  }
  SaveFireDataBaseChate() {
    // debugger
    let userRef = this.xdatabase.database.ref("users/" + this.IPL_Company_ID);
    let IPLNO = this.ModelObj.IPLNO;
    userRef.child(this.username).update({
      id: this.username,
      avatar: `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`
    });
    this.addMembers(IPLNO);

    // delte a message
    let messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
    messageRef.child(IPLNO)
      .on("child_removed", value => {
        this.messageList.splice(this.messageList.findIndex(e => e.key === value.key), 1);
      })
  }
  addMembers(IPLNO) {
    let updates = {};
    let member = {
      member: this.username,
    };
    updates[IPLNO + "/" + this.username + "/"] = member;
    this.xdatabase.database.ref("groups/" + this.IPL_Company_ID).update(updates);
  }
  SendTriggerEmail(message){
    // debugger;
    var allEmails = "";
    var Contractor_Email=this.username == this.ModelObj.Contractor_LoginName ? null : this.ModelObj.Contractor_Email;
    if(Contractor_Email!=null)
    {
      allEmails += Contractor_Email+";"
    }

    var Cordinator_Email= this.username == this.ModelObj.Cordinator_LoginName ? null : this.ModelObj.Cordinator_Email;
    if(Cordinator_Email!=null)
    {
      allEmails += Cordinator_Email + ';';
    }

    var Processor_Email=this.username == this.ModelObj.Processor_LoginName ? null : this.ModelObj.Processor_Email;
    if(Processor_Email!=null)
    {
      allEmails += Processor_Email + ';';
    }

    if(allEmails!=null)
    {
      // debugger;
      var subject=this.ModelObj.Subject==null || this.ModelObj.Subject=="" ||this.ModelObj.Subject==" "?"IPL Message Notification":this.ModelObj.Subject;
      var body=(this.ModelObj.Body==null?"":this.ModelObj.Body) +"</br>"+ message;
      this.xMessageService.SendEmailNotification(allEmails, subject,body,null);
    }
  }
  SendWoMsgNotification(workorderId) {
    // debugger;
    if (this.threadType === 'contractor') {
      this.WorkOderViewModelobj.workOrder_ID = workorderId;
      this.xMessageService
        .SendMessageNotoficationData(this.WorkOderViewModelobj)
        .subscribe(Response => {
          //debugger;

        });
    }
  }
}
