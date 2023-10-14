import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { BindChatDataModel, MessageModelData } from './message-wo-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import md5 from "md5";
import _ from 'underscore';
import { chunk, differenceBy, findIndex, remove } from 'lodash';
import { WorkOderViewModel } from '../../work-order/work-order-view/work-order-view-model';
import { ActivatedRoute } from '@angular/router';
import { TaskBidMasterModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { WoMessageService } from './message-wo.service';
import { MessageService } from '../../message/message.service';
import { MessageTypeEnum, MessageWorkOrder, ViewUserModel } from '../../message/message-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message-wo.component.html',
  styleUrls: ['./message-wo.component.scss']
})

export class MessageWoComponent implements OnInit {
  title = 'push-notification';
  message;
  today = new Date();
  username: any;
  status: string;
  decuserr: any;
  threadID: string = '';
  threadType: string = '';
  chatWithName = '';
  groupRoleID: number = 0;
  workOrder: number = 0;
  messageList = [];
  workorderdata = [];
  workordersharemsg = [];
  fileList: { [File: string]: any; } = [];
  linkList = [];
  ChatDatecheck: string = '';
  WorkType: string;
  WorkOrderIPLNo: string;
  Address: string;
  Client: string;
  IPLNO: number = 0;
  button = "Save";
  isLoading = false;
  shareButton = "Send";
  start_conversation = false;
  selectedWorkOrder: number = 0;
  messageSearch;
  Skip: number = 0;
  Take: number = 10;
  messageForShare: string = '';
  BindChatDataModelObj: BindChatDataModel = new BindChatDataModel();
  WorkOrderNumber: string;
  MessageModelDataObj: MessageModelData = new MessageModelData();
  WorkOderViewModelobj: WorkOderViewModel = new WorkOderViewModel();
  searchText: string = "";
  userFullName: string;
  formUsrCommonGroup: UntypedFormGroup;
  submitted = false;
  searchedChannelList: Array<any> = [];
  sortedChannelList: Array<any> = [];
  ModelObj: any;
  headwodata: any;
  WomessageRef: any;
  WomessageList: Array<any> = [];
  WorkOrderID: Number = 0;
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  WoModelObj: any;
  woNotificationobj: WorkOderViewModel = new WorkOderViewModel();
  IPL_Company_ID = null;
  User_ImagePath = null;
  unreadCounts:number=0;
  RightSideBarObject:any;
  viewUserModel: ViewUserModel = new ViewUserModel();
  griddata: any;
  public state: State = {};
  checkAll: boolean;
  messageWorkOrderobj: MessageWorkOrder = new MessageWorkOrder();
  messageFlag: string;
  @ViewChild('scrollMe', { static: false }) scrollBottom: ElementRef;
 

  constructor(
    private EncrDecr: EncrDecrService,
    private authService: AuthService,
    private xdatabase: AngularFireDatabase,
    private xWoMessageService: WoMessageService,
    private xRoute: ActivatedRoute,
    private xClientResultServices: ClientResultServices,
    private xMessageService: MessageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private formBuilder: UntypedFormBuilder

  ) {
    const userDetail = this.authService.getUserDetail();
    this.groupRoleID = userDetail.GroupRoleId;
    this.IPL_Company_ID = userDetail.IPL_Company_ID;

    //debugger;
    this.User_ImagePath = userDetail.User_ImagePath
    this.userFullName = userDetail.User_FirstName + " " + userDetail.User_LastName;
    this.username = localStorage.getItem('UserName').toLowerCase();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      message:['', Validators.required]
    });
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.WorkOrderID = parseInt(workOrderID);
    this.getChatList();
    this.getModelData();
    this.showSpinner()
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }

  scrollToBottom(): void {
    if (!this.scrollBottom) return;
    this.scrollBottom.nativeElement.scroll({
      top: this.scrollBottom.nativeElement.scrollHeight,
    });
  }

  searchWorkOrderForShare(event: any) {
    this.searchText = event.target.value;
    if (this.searchText != "") {
      this.xWoMessageService
        .getWorkOrderOnSearch(this.WorkOderViewModelobj, this.searchText)
        .subscribe(Response => {
          this.workordersharemsg = Response[0]
        });
    }
  }

  onScrollShareMessageModal() {
    this.Skip = this.Skip + 10;
    this.getWorkOrderForShareMsg();
  }

  getWorkOrderForShareMsg() {
    this.xWoMessageService
      .WorkorderViewPostData(this.WorkOderViewModelobj, this.Skip, this.Take)
      .subscribe(Response => {
        this.workordersharemsg = this.workordersharemsg.concat(Response[0])
      });
  }

  onChangeSearch(text) {
    this.messageSearch = text;
  }

  loadMessageData(IPLNO) {
    this.WorkOderViewModelobj.workOrder_ID= this.WorkOrderID;
    this.WorkOderViewModelobj.Type=2
    this.xWoMessageService
      .getWorkOrderOnSearch(this.WorkOderViewModelobj, IPLNO)
      .subscribe(Response => {
        const order = Response[0][0];
        this.workOrder = order.workOrder_ID;
        this.GetWorkOrderUserDetails(order);
      });
    this.BindChatDataModelObj.IPLNO = IPLNO;
    this.IPLNO = IPLNO;
    this.selectedWorkOrder = IPLNO;
    this.start_conversation = true;
    this.messageSearch = '';
    this.messageList = [];

    this.threadType = 'contractor';
    this.chatWithName="contractor";
    switch (this.groupRoleID) {
      case 2:
        this.threadID = this.workOrder + '_contractor';
        this.threadType = 'contractor';
        this.chatWithName="Co-Ordinator";
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

    this.WomessageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    this.WomessageRef.child(IPLNO)
      .on("child_added", value => {
        //debugger;
        if (value.key === 'lastUpdate') return;
        const message = value.val();
        message['key'] = value.key;

        // if (this.selectedWorkOrder === IPLNO) {

        //   // message.status = 'read';
        // }
        this.xMessageService.SetMessageReadStatus(this.groupRoleID,message);
        this.GetUnreadCount(message);
        this.WomessageList.push(message);
        this.SetFilesAndLinksArray(message);
      });
    this.messageList = this.WomessageList;
    setTimeout(() => {
      this.scrollToBottom();
    })
  }
  SetFilesAndLinksArray(message:any) {
    if(message.messagesType === MessageTypeEnum.Images ||message.messagesType === MessageTypeEnum.Documents)
      {
        if(message.images.length>0)
        {
          message.images.forEach(documents => {
            this.fileList.push(documents);
          });
        }
      }
      else if(message.messagesType === MessageTypeEnum.Link) {
          this.linkList.push(message.message);
      }
  }
  processFile(imageInput: any) {
    if (imageInput.files.length == 1) {
      this.isLoading = true;
      this.button = "Processing";
      const getnamefile = imageInput.files[0].name;
      const extsn = getnamefile.split(".").pop();
      // here checking file extension
      if (imageInput.files[0].size <= 10485760) {
        this.BindChatDataModelObj.documentx = imageInput.files[0];
        this.BindChatDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;// work order id
        this.BindChatDataModelObj.Chat_FileName = getnamefile;
        this.BindChatDataModelObj.Type = 1;// nely entry
        if (this.BindChatDataModelObj.Chat_FilePath != "") {
          this.BindChatDataModelObj.Type = 2;// for update
        }
        this.DocumentCall();
      }
    }
    else {
      alert('Please Select File First');
    }
  }

  //enteract between save btn and document upload
  DocumentCall() {
      this.xMessageService
      .ChatFileUpLoad(this.BindChatDataModelObj)
      .then(res => {
        res.subscribe(response => {
          //console.log('message Image',response)
          this.BindChatDataModelObj.Chat_File_Ch_ID = response[0][0].Wo_Msg_Doc_PkeyId;
          this.isLoading = false;
          this.button = "Save";
          document.getElementById('drag_files').click();
          // push file path to cloud
          this.Postpathtofirebasechat();
        });
      });
    //}


  }

  Postpathtofirebasechat() {
    if (this.BindChatDataModelObj.documentx.type.startsWith("image")) {
      this.xWoMessageService
        .getChatFileDetails(this.BindChatDataModelObj)
        .then(res => {
          res.subscribe(response => {
            this.MessageModelDataObj.Message_Text = response[0][0][0].Wo_Msg_Doc_File_Path;
            // this.SentMessage(this.MessageModelDataObj)
            this.SentMessageDocuments(this.MessageModelDataObj.Message_Text,MessageTypeEnum.Images)
          });
        })
    }
    else if (this.BindChatDataModelObj.documentx.type.startsWith("application")) {
      this.xWoMessageService
        .getChatFileDetails(this.BindChatDataModelObj)
        .then(res => {
          res.subscribe(response => {
            this.MessageModelDataObj.Message_Text = response[0][0][0].Wo_Msg_Doc_File_Path;
            // this.SentMessage(this.MessageModelDataObj)
            this.SentMessageDocuments(this.MessageModelDataObj.Message_Text,MessageTypeEnum.Documents)
          });
        })
    }
  };

  getTypingActivity() {

  }

  getChatList() {
    //debugger
    const messageRef = this.xdatabase.database.ref('users').child(this.IPL_Company_ID).child(this.username).child("groups");
    messageRef.orderByChild("lastUpdate")
      .on('value', (snapshot) => {
        let newItems = [];
        let data = snapshot.val() || [];
        let keys = Object.keys(data);
        keys.forEach((key, index) => {
          if (!data[key]['lastUpdate']) return;
          data[key]['lastUpdate'] = moment(data[key]['lastUpdate']).toDate();
          data[key]['IPLNO'] = key;
          newItems.push(data[key]);
        });
        this.sortArr(newItems);
      });
  };

  sortArr(array) {
    let sortArr = array.sort((a, b) => {
      return a.lastUpdate - b.lastUpdate;
    });

    let arr = sortArr.reverse();
    this.sortedChannelList = arr;
    this.workorderdata = this.sortedChannelList;
  };

  GetWorkOrderUserDetails(workOrder) {
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
    userRef.child(this.username).update({
      id: this.username,
      avatar: `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`
    });
    this.addMembers(IPLNO);

    // delte a message
    let messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    messageRef.child(IPLNO)
      .on("child_removed", value => {
        this.messageList.splice(this.messageList.findIndex(e => e.key === value.key), 1);
      })
  }

  setLastUpdate() {
    const userRef = this.xdatabase.database.ref("users/" + this.IPL_Company_ID);
    let user1: string;
    let user2: string;
    if (this.threadType === 'contractor') {
      user1 = this.ModelObj.CordinatorLoginName.replace('.', '');
      user2 = this.ModelObj.ContractorLoginName.replace('.', '');

      if (user1 != null && user1 != "") {
        userRef.child(user1)
        .child("groups")
        .child(this.ModelObj.IPLNO)
        .update({ IPLNO: this.ModelObj.IPLNO, lastUpdate: firebase.database.ServerValue.TIMESTAMP });
      }
      if (user2 != null && user2 != "") {
        userRef.child(user2)
        .child("groups")
        .child(this.ModelObj.IPLNO)
        .update({ IPLNO: this.ModelObj.IPLNO, lastUpdate: firebase.database.ServerValue.TIMESTAMP });
      }
    }


  }

  addMembers(IPLNO) {
    let updates = {};
    let member = {
      member: this.username,
    };
    updates[IPLNO + "/" + this.username + "/"] = member;
    this.xdatabase.database.ref("groups/"+ this.IPL_Company_ID).update(updates);
  }

  displayMessages(IPLNO) {
    let messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    messageRef.child(IPLNO)
      .on("child_added", value => {
        const message = value.val();
        message['key'] = value.key;
        this.messageList.push(message);
      });
  }

  selectThread(thread) {
    this.threadID = this.workOrder + '_' + thread;
    this.threadType = thread;
    if (this.threadType === 'contractor' && this.groupRoleID === 2)
    {
      this.chatWithName = 'Co-Ordinator';
    }
    else
    {
      this.chatWithName = thread;
    }
    setTimeout(() => {
      this.scrollToBottom();
    })
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  show1:boolean=false;
  messages: string;
  async SentMessage(item, event?) {

    if (!this.MessageModelDataObj.Message_Text) {
      
      this.show1 = true;
      
    }else {
       this.show1 = false ;
    }
    this.submitted = true;
    // debugger;
    var messagesType=item.Message_Text.toString().includes('https') || item.Message_Text.toString().includes('http')?MessageTypeEnum.Link:MessageTypeEnum.Text;
    this.messages = item.Message_Text;
    let messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    if (this.messages.length > 0) {
      let messageId = (await messageRef.push()).key;
      let message = {
        message: this.messages,
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
        .child(this.ModelObj.IPLNO)
        .child(messageId)
        .update(message)

      if (messageId != undefined) {
        this.SendWoMsgNotification();
        this.SendTriggerEmail();
      }
      this.setLastUpdate();


    }

    this.MessageModelDataObj.Message_Text = '';
    setTimeout(() => {
      this.scrollToBottom();
    })
  }


  getShare = (message) => {
    this.messageForShare = message;
  };

  shareMessage(message) {
    this.messageForShare = message;
  }

  ShareMessage = (workorderdata) => {
    this.isLoading = true;
    this.shareButton = "Sending";
    this.messages = this.messageForShare;
    let messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    if (this.messages.length > 0) {
      let messageId = (messageRef.push()).key;
      let message = {
        message: this.messages,
        from: this.username,
        time: firebase.database.ServerValue.TIMESTAMP,
        avatar: '',
        name: this.userFullName,
        threadtype: this.threadType,
        threadid: workorderdata.workOrder_ID + '_' + this.threadType,
      }
      messageRef
        .child(workorderdata.IPLNO)
        .child(messageId)
        .update(message);
      this.setLastUpdate();
    }
    this.messageForShare = '';
    this.isLoading = false;
    this.shareButton = "Send";
  }

  deleteMessage(message) {
    //debugger
    let messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    messageRef.child(this.ModelObj.IPLNO).child(message.key).remove();


  }

  decuser: any;
  storemsgrecordsql() {
    if (localStorage.getItem('usertemp_') != null || localStorage.getItem('usertemp_') != "") {
      var encryptuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encryptuser));
      this.decuser = JSON.parse(decval);
    }
    this.MessageModelDataObj.Msg_Wo_Id = this.ModelObj.workOrder_ID;
    this.MessageModelDataObj.Msg_Message_text = this.messages;
    this.MessageModelDataObj.Msg_From_UserId = this.decuser[0].User_pkeyID;
    this.MessageModelDataObj.Msg_To_UserId = 0;
    this.MessageModelDataObj.Msg_To_UserId_A = 0;
    this.MessageModelDataObj.Msg_To_UserId_B = 0;
    this.MessageModelDataObj.Msg_Time = '';
    this.MessageModelDataObj.Msg_Status = 1;
    this.MessageModelDataObj.Msg_Message_Id = '';
  }

  checkStatus = async () => {
    let status = '';
    this.xdatabase.database.ref(
      "Users/"+ this.IPL_Company_ID + "/" + this.username + "/" + this.ModelObj.CORNT_User_LoginName
    ).on(
      "value", (snapshot) => {
        status = snapshot.val().status;
        if (status !== "online") {
          // this.sentNotification();
        }
      }
    )
  }

  getFileName = (filePath) => {
    var file: any = filePath.split("/");
    var fileName = file[5];
    var afileName: any = fileName.split("?");
    var name = afileName[0];
    var fname = name.replace(/%20/g, " ");
    return fname;

  }
  public trackItem(i, msg) {
    return msg.time;
  }

  triggerFunction(event) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.MessageModelDataObj.Message_Text += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.SentMessage(this.MessageModelDataObj);
    }
  }

  getModelData() {
    this.TaskBidMasterModelObj.workOrder_ID = this.WorkOrderID;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.WoModelObj = response[0][0];
        if (this.WoModelObj == undefined) {
        } else {
          this.UpdateReadStatus(this.WoModelObj.IPLNO);
          this.loadMessageData(this.WoModelObj.IPLNO);
        }
      });
  }

  SendWoMsgNotification() {
    // debugger;
    if (this.threadType === 'contractor') {
      this.woNotificationobj.workOrder_ID = this.workOrder;
      this.xMessageService
        .SendMessageNotoficationData(this.woNotificationobj)
        .subscribe(Response => {
          //debugger;

        });
    }
  }
  UpdateReadStatus(iplNumber) {
    this.unreadCounts=0;
    const messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    if(this.groupRoleID==1)
    {
      messageRef.child(iplNumber).orderByChild('readByAdmin').equalTo(false)
      .once("value", (snapshots) => {
        snapshots.forEach(snapshot => {
          snapshot.ref.update({...snapshot.val(),
            readByAdmin: true
          })
        })
      });

    }
    else if(this.groupRoleID==2)
    {
      messageRef.child(iplNumber).orderByChild('readByContractor').equalTo(false)
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
      messageRef.child(iplNumber).orderByChild('readByCoordinator').equalTo(false)
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
      messageRef.child(iplNumber).orderByChild('readByProcessor').equalTo(false)
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
      messageRef.child(iplNumber).orderByChild('readByClient').equalTo(false)
      .once("value", (snapshots) => {
        snapshots.forEach(snapshot => {
          snapshot.ref.update({...snapshot.val(),
            readByClient: true
          })
        })
      });
    }
  }
  GetUnreadCount(message) {
    // debugger;
    if (this.groupRoleID==1 && message.readByAdmin===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==2 && message.readByContractor===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==3 && message.readByCoordinator===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==4 && message.readByProcessor===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    else if (this.groupRoleID==5 && message.readByClient===false && message.from !== this.username) {
      this.unreadCounts++;
    }
    this.xMessageService.setUnreadCounts_ForWorkOrder(this.unreadCounts);
  }
  arrdoc= [];
  async SentMessageDocuments(path, messagesType) {
    // debugger;
    //console.log('====', this.ModelObj, this.workOrder);
    this. arrdoc= [];
    this.messages = path;
    let messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
    this.arrdoc.push(path)
    this.MessageModelDataObj.Message_Text = '';
    if (this.messages.length > 0) {
      let messageId = (await messageRef.push()).key;
      let message = {
        message: '',
        images:this.arrdoc,
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
        .child(this.ModelObj.IPLNO)
        .child(messageId)
        .update(message)

      if (messageId != undefined) {
        this.SendWoMsgNotification();
        this.SendTriggerEmail()
      }
      this.setLastUpdate();


    }
    setTimeout(() => {
      this.scrollToBottom();
    })
  }
  onAddmemberclick(content) {
    this.modalService.open(content, { windowClass: "xlModal" });
    this.getUsersModelData();
  }
  getUsersModelData() {
    this.viewUserModel.MWU_workOrder_ID = this.workOrder;
    this.viewUserModel.Type = 1;
    this.xMessageService.getUserModelData(this.viewUserModel).subscribe(response => {
      // console.log('bg', response);
      this.griddata = response[0];

    });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  checkRowAll() {
    this.checkAll = !this.checkAll;
    this.griddata.forEach(item => item.MWU_IsRead = this.checkAll ? true : false);
  }
  ziparr = [];
  checkzipRow(val, item, index) {
    // debugger
    let data = {};
    data = {"User_pkeyID": item.User_pkeyID,"MWU_IsRead": val}
    if (val == true) {
      this.ziparr.push(data)
    }
    else {
      this.ziparr.splice(index, 1);
      this.ziparr.push(data)
    }
  }
  SubmitConMap() {

    // debugger
    this.messageWorkOrderobj.lstmessage_Admin_UserDTO = this.ziparr
    if (this.messageWorkOrderobj.MWU_pkeyID != 0) {
      this.messageWorkOrderobj.Type=2;
      }
      else
      {
        this.messageWorkOrderobj.Type=1;
      }

      this.messageWorkOrderobj.lstmessage_Admin_UserDTO =  this.ziparr,

      this.messageWorkOrderobj.MWU_workOrder_ID = this.workOrder,
      this.xMessageService.SaveMessageModelData(this.messageWorkOrderobj).subscribe(res => {
        this.messageFlag = "Save Message Data...";
        this.commonMessage();
      })
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.messageFlag;
    modalRef.result.then(result => { this.modalService.dismissAll() }, reason => {
      this.modalService.dismissAll()
    });
  }
  SendTriggerEmail(){
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
      // var subject=this.ModelObj.Subject==null?"IPL Message Notification":this.ModelObj.Subject;
      var body=(this.ModelObj.Body==null?"":this.ModelObj.Body) +"</br>"+ this.messages;
      var attachments=this.arrdoc.length>0?this.arrdoc[0]:null;
      // this.xMessageService.SendEmailNotification(allEmails, "IPL Message Notification", this.messages,attachments);
      this.xMessageService.SendEmailNotification(allEmails, subject, body,attachments);
    }
  }
}
