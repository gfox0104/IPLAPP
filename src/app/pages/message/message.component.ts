import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { BindChatDataModel, MessageModelData, ViewUserModel, MessageWorkOrder,MessageTypeEnum } from './message-model';
import { MessageService } from './message.service';
import { WorkOderViewModel } from '../../pages/work-order/work-order-view/work-order-view-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import md5 from "md5";
import _ from 'underscore';
import { chunk, differenceBy, findIndex, remove } from 'lodash';
import { runInThisContext } from 'vm';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {
  title = 'push-notification';
  message;
  today = new Date();
  username: any;
  status: string;
  decuserr: any;
  threadID: string = '';
  threadType: string = '';
  groupRoleID: number = 0;
  workOrder: number = 0;
  messageList = [];
  workorderdata = [];
  messageFlag: string;
  isHelpActive: false;
  popformArray = [];
  CategoryList: any;
  workordersharemsg = [];
  fileList: { [File: string]: any; } = [];
  linkList = [];
  ChatDatecheck: string = '';
  WorkType: string;
  WorkOrderIPLNo: string;
  Address: string;
  Client: string;
  IPLNO: number = 0;
  button = "Submit";
  griddata: any;

  isLoading = false;
  shareButton = "Send";
  lstmessage_Admin_UserDTO: any;
  IsPasswordDisable = false;
  submitted = false;
  start_conversation = false;
  selectedWorkOrder: number = 0;
  messageSearch;
  Skip: number = 0;
  Take: number = 10;
  formUsrCommonGroup: UntypedFormGroup;
  messageForShare: string = '';
  BindChatDataModelObj: BindChatDataModel = new BindChatDataModel();
  WorkOrderNumber: string;
  MessageModelDataObj: MessageModelData = new MessageModelData();
  WorkOderViewModelobj: WorkOderViewModel = new WorkOderViewModel();
  woNotificationobj: WorkOderViewModel = new WorkOderViewModel();
  viewUserModel: ViewUserModel = new ViewUserModel();
  messageWorkOrderobj: MessageWorkOrder = new MessageWorkOrder();
  // ContractorMapStateObj: ContractorMapState = new ContractorMapState();
  searchText: string = "";
  userFullName: string;
  searchedChannelList: Array<any> = [];
  sortedChannelList: Array<any> = [];
  ModelObj: any;
  headwodata: any;
  ConstateList: any;
  isStateInValid = false;
  isCountyInValid = false;
  IPL_Company_ID = null;
  chatWithName = '';
  User_ImagePath = null;
  public state: State = {};
  MasterUnreadCounts:number=0
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  @ViewChild('scrollMe', { static: false }) scrollBottom: ElementRef;

  checkAll: boolean;




  constructor(formbuilder: UntypedFormBuilder,
    private EncrDecr: EncrDecrService,
    private authService: AuthService,
    private xdatabase: AngularFireDatabase,
    private modalService: NgbModal,
    private xRouter: Router,
    private xRoute: ActivatedRoute,
    private xmodalService: NgbModal,
    private xMessageService: MessageService,
    private formBuilder: UntypedFormBuilder
  ) {
    const userDetail = this.authService.getUserDetail();
    this.groupRoleID = userDetail.GroupRoleId;
    this.IPL_Company_ID = userDetail.IPL_Company_ID;
    this.userFullName = userDetail.User_FirstName + " " + userDetail.User_LastName;
    //debugger;
    this.User_ImagePath = userDetail.User_ImagePath
    this.username = localStorage.getItem('UserName').toLowerCase();
    console.log('this.username',this.username)
    this.getautoworkorderviewdata();

  }
  //   valCountydata:String;
  //   stateval:Number;
  // valstatedata:String;
  getautoworkorderviewdata() {
    // this.xMessageService
    //   .WorkorderViewPostData(this.WorkOderViewModelobj, this.Skip, this.Take)
    //   .subscribe(Response => {
    //     this.workordersharemsg = Response[0];
    //   });

    // this.xMessageService.allWorkOrderData(this.WorkOderViewModelobj)
    //   .subscribe(response => {
    //     //console.log(response[0]);
    //   })
  }

  ngOnInit() {

    this.formUsrCommonGroup = this.formBuilder.group({
      message:['', Validators.required]
    });
    //this.getChatList();
    this.GetGridDetails(),

      this.GetLeftBarWoMsgList();
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  scrollToBottom(): void {
    if (!this.scrollBottom) return;
    this.scrollBottom.nativeElement.scroll({
      top: this.scrollBottom.nativeElement.scrollHeight,
    });
  }

  searchWorkOrderMain(event: any) {
    this.searchText = event.target.value;
    if (this.searchText != "") {
      this.workorderdata = this.sortedChannelList.filter(item => item.IPLNO.includes(this.searchText));
    } else {
      this.workorderdata = this.sortedChannelList;
    }
  }

  searchWorkOrderForShare(event: any) {
    this.searchText = event.target.value;
    if (this.searchText != "") {
      this.xMessageService
        .getWorkOrderOnSearch(this.WorkOderViewModelobj, this.searchText)
        .subscribe(Response => {
          this.workordersharemsg = Response[0]
        });
    } else {
      this.getautoworkorderviewdata();
    }
  }

  onScrollDown() {
    // this.Skip = this.Skip + 10;
    // this.getautoworkorderviewdatanew();
  }

  onScrollShareMessageModal() {
    this.Skip = this.Skip + 10;
    this.getWorkOrderForShareMsg();
  }

  getautoworkorderviewdatanew() {
    this.xMessageService
      .WorkorderViewPostData(this.WorkOderViewModelobj, this.Skip, this.Take)
      .subscribe(Response => {
        // debugger
        const differences = differenceBy(Response[0], this.workorderdata, 'IPLNO');
        this.workorderdata = this.workorderdata.concat(differences);
      });
  }

  getWorkOrderForShareMsg() {
    this.xMessageService
      .WorkorderViewPostData(this.WorkOderViewModelobj, this.Skip, this.Take)
      .subscribe(Response => {
        this.workordersharemsg = this.workordersharemsg.concat(Response[0])
      });
  }

  onChangeSearch(text) {
    this.messageSearch = text;
  }

  loadMessageData(channel, messages?) {
    // debugger;
    this.fileList = [];
    this.linkList = [];
    this.WorkOderViewModelobj.workOrder_ID=channel.workOrder_ID;
    this.xMessageService
      .getWorkOrderOnSearch(this.WorkOderViewModelobj, channel.IPLNO)
      .subscribe(Response => {
        //debugger;
        const order = Response[0][0];
        console.log(order);
        this.workOrder = order.workOrder_ID;
        this.GetWorkOrderUserDetails(order);
      });
    this.BindChatDataModelObj.IPLNO = channel.IPLNO;
    this.IPLNO = channel.IPLNO;
    this.selectedWorkOrder = channel.IPLNO;
    this.start_conversation = true;
    this.messageSearch = '';
    this.messageList = [];


    this.threadType = 'contractor';
    this.chatWithName = 'contractor';
    switch (this.groupRoleID) {
      case 2:
        this.threadID = this.workOrder + '_contractor';
        this.threadType = 'contractor';
        this.chatWithName = 'Co-Ordinator';
        break;
      case 1:
        this.threadID = this.workOrder + '_contractor';
        this.chatWithName = 'contractor';
        this.threadType = 'contractor';
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
    // debugger;
    this.messageList = messages;
    console.log('this.messageList',this.messageList);
    setTimeout(() => {
      this.scrollToBottom();
    })
    this.SetFilesAndLinksArray();
  }

  // setFileAndLinkList() {
  //   debugger;
  //   this.messageList.forEach(item => {
  //     if (item.message.includes("https")) {
  //       if (item.message.includes(".pdf") || item.message.includes(".docx") || item.message.includes(".xlsx")) {

  //         this.fileList.push(item.message);
  //       }
  //       else if (!item.message.includes('rare-lambda-245821')) {
  //         this.linkList.push(item.message);
  //       }
  //     }
  //   })
  // }
  SetFilesAndLinksArray() {
    this.messageList.forEach(item => {
      if(item.messagesType===undefined)
      {
        if (item.message.includes("https")) {
          if (item.message.includes(".pdf") || item.message.includes(".docx") || item.message.includes(".xlsx")) {
            this.fileList.push(item.message);
          }
          else if (!item.message.includes('rare-lambda-245821')) {
            this.linkList.push(item.message);
          }
        }
      }
      else if(item.messagesType === MessageTypeEnum.Images ||item.messagesType === MessageTypeEnum.Documents)
      {
        if(item.images.length>0)
        {
          item.images.forEach(documents => {
            this.fileList.push(documents);
          });
        }
      }
      else if(item.messagesType === MessageTypeEnum.Link) {
          this.linkList.push(item.message);
      }
    })
  }

  processFile(imageInput: any) {
    if (imageInput.files.length == 1) {
      // debugger;
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
  //  debugger;
    // if (this.BindChatDataModelObj.documentx.type.startsWith("image")) {
    //   this.xMessageService
    //   .ChatImageUpLoad(this.BindChatDataModelObj)
    //   .then(res => {
    //     res.subscribe(response => {
    //       //console.log('img url',response)
    //       this.BindChatDataModelObj.Chat_File_Ch_ID = response[0][0].Wo_Msg_Doc_PkeyId;
    //       this.isLoading = false;
    //       this.button = "Save";
    //       document.getElementById('drag_files').click();
    //       // push file path to cloud
    //       this.Postpathtofirebasechat();
    //     });
    //   })

    // }
    //if (this.BindChatDataModelObj.documentx.type.startsWith("application")) {
      // debugger
      this.xMessageService
      .ChatFileUpLoad(this.BindChatDataModelObj)
      .then(res => {
        //console.log('messahe file url',res)
        res.subscribe(response => {
          //debugger
          //console.log('messahe file url',response)
          if(response != null)
          {
            this.BindChatDataModelObj.Chat_File_Ch_ID = response[0][0].Wo_Msg_Doc_PkeyId;
            this.isLoading = false;
            this.button = "Save";
            document.getElementById('drag_files').click();
            // push file path to cloud
            this.Postpathtofirebasechat();
          }

        });
      });
  //}


  }

  Postpathtofirebasechat() {
    if (this.BindChatDataModelObj.documentx.type.startsWith("image")) {
      this.xMessageService
        .getChatFileDetails(this.BindChatDataModelObj)
        .then(res => {
          res.subscribe(response => {
            this.MessageModelDataObj.Message_Text = response[0][0][0].Wo_Msg_Doc_File_Path;
            this.SentMessageDocuments(this.MessageModelDataObj.Message_Text,MessageTypeEnum.Images)
          });
        })
    }
    else if (this.BindChatDataModelObj.documentx.type.startsWith("application")) {
      this.xMessageService
        .getChatFileDetails(this.BindChatDataModelObj)
        .then(res => {
          res.subscribe(response => {
            this.MessageModelDataObj.Message_Text = response[0][0][0].Wo_Msg_Doc_File_Path;
            this.SentMessageDocuments(this.MessageModelDataObj.Message_Text,MessageTypeEnum.Documents)
          });
        })
    }
  };

  getTypingActivity() {

  }

  getChatList() {
    // debugger
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
    // debugger;
    let sortArr = array.sort((a, b) => {
      return a.lastUpdate - b.lastUpdate;
    });

    let arr = sortArr.reverse();
    this.sortedChannelList = arr;
    this.workorderdata = this.sortedChannelList;
    console.log('sortarray', this.workorderdata)
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

  setLastUpdate() {
    // debugger
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
    // debugger
    let updates = {};
    let member = {
      member: this.username,
    };
    updates[IPLNO + "/" + this.username + "/"] = member;
    this.xdatabase.database.ref("groups/" + this.IPL_Company_ID).update(updates);
  }

  displayMessages(IPLNO) {
    // debugger
    let messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
    messageRef.child(IPLNO)
      .on("child_added", value => {
        const message = value.val();
        message['key'] = value.key;
        this.messageList.push(message);
      });
  }

  getUsersModelData() {

    // debugger
    this.viewUserModel.MWU_workOrder_ID = this.workOrder;
    this.viewUserModel.Type = 1;

    this.xMessageService.getUserModelData(this.viewUserModel).subscribe(response => {
      //console.log('bg',response);
      // debugger
      console.log('bg', response);
      this.griddata = response[0];

    });
  }
  getMessageData() {
    //dfebugger;

    //  this.viewUserModel.User_pkeyID = val.User_pkeyID;
    //  this.viewUserModel.User_FirstName = val.User_FirstName;
    //  this.viewUserModel.User_LastName= val.User_LastName;
    //  this.viewUserModel.User_LoginName = val.User_LoginName;

    // debugger
    // this.xMessageService.getUserModelData(this.viewUserModel).subscribe(response => {
    //   //console.log('bg',response);
    //   debugger
    //    console.log('bg',response);
    //    this.griddata = response[0];

    // });

    this.getUsersModelData();
  }
  selectThread(thread) {
    // debugger;
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




show1:boolean=false;
  messages: string;
  async SentMessage(item, event?) {
    // debugger
    
    if (!this.MessageModelDataObj.Message_Text) {
      
      this.show1 = true;
      
    }else {
       this.show1 = false ;
    }

    this.submitted = true;
    
    // debugger;
    //console.log('====', this.ModelObj, this.workOrder);
    this.messages = item.Message_Text;

    var messagesType=item.Message_Text.toString().includes('https') || item.Message_Text.toString().includes('http')?MessageTypeEnum.Link:MessageTypeEnum.Text;

    let messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
    this.arrdoc= [];
    this.arrdoc.push('');
    this.MessageModelDataObj.Message_Text = '';
    if (this.messages.length > 0) {
      let messageId = (await messageRef.push()).key;
      let message = {
        message: this.messages,
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
        this.SendTriggerEmail();
      }
      this.setLastUpdate();
      this.formUsrCommonGroup.reset();

    }
      setTimeout(() => {
      this.scrollToBottom();
    })
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
        this.SendTriggerEmail();
      }
      this.setLastUpdate();


    }
    setTimeout(() => {
      this.scrollToBottom();
    })
  }



  getShare = (message) => {
    this.messageForShare = message;
  };

  shareMessage(message) {
    this.messageForShare = message;
    this.getWorkOrderForShareMsg();
  }

  ShareMessage = (workorderdata) => {
    this.isLoading = true;
    this.shareButton = "Sending";
    this.messages = this.messageForShare;
    let messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
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
    this.messageFlag = "Are you sure you want to Delete this Record...!";
    let messageRef = this.xdatabase.database.ref("messages/" + this.IPL_Company_ID);
    messageRef.child(this.ModelObj.IPLNO).child(message.key).remove();
    this.commonMessage();
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
      "Users/" + this.IPL_Company_ID + "/" + this.username + "/" + this.ModelObj.CORNT_User_LoginName
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
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  checkRowAll() {
    this.checkAll = !this.checkAll;
    this.griddata.forEach(item => item.MWU_IsRead = this.checkAll ? true : false);
  }
  GetGridDetails() {
    // debugger
    // this.xMessageService.getUserModelData(this.viewUserModel)
    // //this.xMessageService.getMessageModelData(this.messageWorkOrderobj)
    // .subscribe(res =>{
    //   console.log('unnati',res)
    //   this.griddata = res[0];
    // })
    this.getUsersModelData();
  }

  ziparr = [];
  checkzipRow(val, item, index) {
    // debugger
    let data = {};
    data = {
      "User_pkeyID": item.User_pkeyID,
      "MWU_IsRead": val
    }
    if (val == true) {

      //this.ziparr.push(item)
      this.ziparr.push(data)

    }
    else {
      this.ziparr.splice(index, 1);
      //this.ziparr.push(item)
      this.ziparr.push(data)
    }
    // console.log('zip', this.ziparr)
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
      // this.viewUserModel.Cont_Coverage_Area_State_Id = this.stateval;
      // this.viewUserModel.Cont_Coverage_Area_County_Id = this.countyval;
      this.messageWorkOrderobj.lstmessage_Admin_UserDTO =  this.ziparr,
      //this.viewUserModel.User_pkeyID =  this.viewUserModel.User_pkeyID,
      // this.messageWorkOrderobj.MWU_pkeyID = this.messageWorkOrderobj.MWU_pkeyID,
      // this.messageWorkOrderobj.MWU_User_ID = this.messageWorkOrderobj.MWU_User_ID,
      this.messageWorkOrderobj.MWU_workOrder_ID = this.workOrder,
      // this.messageWorkOrderobj.MWU_IsRead = this.messageWorkOrderobj.MWU_IsRead,
      // this.messageWorkOrderobj.MWU_Role = this.messageWorkOrderobj.MWU_Role,
      this.xMessageService.SaveMessageModelData(this.messageWorkOrderobj).subscribe(res => {
        this.messageFlag = "Save Message Data...";
        this.commonMessage();
      })

    // else{
    //   this.MessageFlag = "Please Add User Data First...";
    //   this.commonMessage();
    // }
  }
  closeModal() {
    this.xmodalService.dismissAll();
  }
  showDetails(val) {
    // debugger
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', val.User_PkeyID);
    this.xRouter.navigate(["", btoa(encrypted)]);

  }
  deleteDetails(event, item) {
    this.viewUserModel.User_pkeyID = item.User_PkeyID;
    this.messageWorkOrderobj.MWU_pkeyID = item.MWU_pkeyID;
    this.messageWorkOrderobj.MWU_User_ID = item.MWU_User_ID;
    this.messageWorkOrderobj.MWU_workOrder_ID = item.MWU_workOrder_ID;
    this.viewUserModel.Type = 4;
    this.messageWorkOrderobj.Type = 4;

    //  this.xMessageService.getUserModelData(this.viewUserModel)
    // // this.xMessageService.getMessageModelData(this.messageWorkOrderobj)
    //  .subscribe(respose =>{
    //    console.log('res',respose)

    //     this.GetGridDetails()

    //  })
    this.getUsersModelData();
    this.GetGridDetails();
    this.commonMessage();
  }
  // addconaddress(content){
  //   ////dfebugger;
  //     this.valstatedata = undefined;
  //     this.valCountydata = undefined;
  //     this.isStateInValid = false;
  //     this.isCountyInValid = false;
  //     this.xmodalService.open(content, { windowClass: "xlModal" });
  //   }

  onAddmemberclick(content) {
    // debugger
    //this.modalService.open(content);
    this.modalService.open(content, { windowClass: "xlModal" });
    this.getUsersModelData();
    this.getMessageData();


  }
  // // submit manage work type form
  // manageFormSubumit() {
  //   this.popformArray;
  //   if (this.popformArray[this.popformArray.length - 1]) {
  //     this.popformArray.splice(this.popformArray.length - 1, 1);
  //   }
  //   // this.CategoryPopupModelObj.MWU_workOrder_ID = this.popformArray;

  //   this.xMessageService
  //     // .WorkCategoryPOPUPPost(this.CategoryPopupModelObj)
  //     .subscribe(response => {
  //       this.CategoryList = response[0];
  //       this.popformArray = response[0];

  //       this.messageFlag = "Add Users Saved...!";
  //       this.commonMessage();
  //       // this.GetWorkTypeGroup();
  //     });
  // }

  // // remove work type from manage popup form
  // removePOPdata(item, inx) {
  //   if (item.MWU_pkeyID != 0) {
  //     var cfrm = confirm("Are you want to delete this record...!");
  //     if (cfrm == true) {
  //       // this.CategoryPopupModelObj.MWU_pkeyID = item.MWU_pkeyID;
  //       // this.CategoryPopupModelObj.MWU_IsActive = false;
  //       // this.CategoryPopupModelObj.Type = 3;
  //       this.xMessageService
  //         // .DeleteWorkCategoryPOPUP(this.CategoryPopupModelObj)
  //         .subscribe(response => {
  //           // this.GetWorkTypeGroup();
  //         })
  //     }
  //   }
  //   else {
  //     this.popformArray.splice(inx, 1);
  //   }
  // }
  // addMoreRowCatepop() {

  //   var data = { MWU_User_ID: "", MWU_pkeyID: 0 };
  //   if (this.popformArray.length != 0) {
  //     if (
  //       this.popformArray[this.popformArray.length - 1].MWU_User_ID != ""
  //     ) {
  //       this.popformArray.push(data);

  //     }
  //   } else {
  //     this.popformArray.push(data);

  //   }
  // }
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.messageFlag;
    modalRef.result.then(result => { this.modalService.dismissAll() }, reason => {
      //debugger;
      if (!this.isHelpActive) {
        this.modalService.dismissAll()
      }

    });
  }
  formButton() {
    // debugger
    // console.log('check', this.viewUserModel)
    //this.xMessageService.getUserModelData(this.viewUserModel)
    this.getUsersModelData();
    this.xMessageService.SaveMessageModelData(this.messageWorkOrderobj)
      .subscribe(respose => {
        // console.log('res', respose)

      })
  }


  GetLeftBarWoMsgList() {
    this.xMessageService
      .MsgWorkorderLeftBarData(this.WorkOderViewModelobj)
      .subscribe(Response => {
        // debugger;
        this.sortedChannelList = Response[0];
        this.workorderdata = Response[0];
        // console.log('msglst', this.workorderdata)
      });
  }
  handleFilter(value) {
    ////dfebugger;
    //console.log(value)
    if (value != '') {
      this.ConstateList = this.ConstateList.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.ConstateList = this.ConstateList.slice();
    }
  }

  DispalyInfo(event: Event, lblName) {
    if (this.isHelpActive) {
      event.preventDefault();
      this.messageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }
  // changestate(val){
  //   //dfebugger;
  // this.stateval = val.IPL_StateID;
  // this.valstatedata = val.IPL_StateName;
  //   this.ContractorMapStateObj.IPL_StateID = val.IPL_StateID;
  //   this.ContractorMapStateObj.IPL_StateName = val.IPL_StateName;
  //   this.xAddUserServices.ContractorCounty(this.ContractorMapStateObj).subscribe(response => {
  //     //console.log('bg',response);
  //      this.County = response[0];
  //      this.griddata = response[1];

  //   });
  // }
  IsEditDisable = false;
  getModelData() {
    // this.ModelObj = this.xMasterlayoutComponent.masterFunctionGetdata();
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.viewUserModel = new ViewUserModel();
      this.messageWorkOrderobj = new MessageWorkOrder();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      //console.log('User_pkeyID', id);
      this.ModelObj = parseInt(id);
    }

    if (this.ModelObj == undefined) {
      this.viewUserModel = new ViewUserModel();
      this.messageWorkOrderobj = new MessageWorkOrder();

      this.submitted = false; // submitted;
      this.button = "Submit"; // buttom loading..
      this.isLoading = false; // buttom loading.
    } else {
      //console.log("grid to f", this.ModelObj);
      this.viewUserModel.Type = this.ModelObj.Type;
      this.viewUserModel.UserID = this.ModelObj.UserID;
      this.viewUserModel.MWU_workOrder_ID = this.ModelObj.MWU_workOrder_ID;
      this.messageWorkOrderobj.Type = this.ModelObj.Type;
      this.messageWorkOrderobj.UserID = this.ModelObj.UserID;

      this.viewUserModel.User_pkeyID = this.ModelObj;
      this.viewUserModel.MWU_pkeyID = this.ModelObj;
      this.messageWorkOrderobj.MWU_pkeyID = this.ModelObj;

      this.GetSingleData();

      //this.formUsrCommonGroup.disable();
      this.IsEditDisable = true;
      this.formUsrCommonGroup.disable();
      this.IsPasswordDisable = true;
      this.button = "Update";
      this.viewUserModel.Type = 2;
      this.messageWorkOrderobj.Type = 2;
    }
  }
  GetSingleData() {
    // debugger


    this.viewUserModel.MWU_workOrder_ID = this.workOrder;
    this.viewUserModel.Type = 1;
    this.xMessageService.getUserModelData(this.viewUserModel).subscribe(res => {
      // console.log('edit', res)
      this.viewUserModel.User_pkeyID = res[0][0].User_PkeyID;
      this.viewUserModel.User_FirstName = res[0][0].User_FirstName;
      this.viewUserModel.User_LastName = res[0][0].User_LastName;
      this.viewUserModel.User_LoginName = res[0][0].User_LoginName;
      this.viewUserModel.MWU_workOrder_ID = res[0][0].MWU_workOrder_ID;
      this.viewUserModel.MWU_pkeyID = res[0][0].MWU_pkeyID;

      this.viewUserModel.Type = 2;
    });
    // messageworkorder
    this.messageWorkOrderobj.MWU_pkeyID = this.ModelObj;
    this.messageWorkOrderobj.Type = 2;
    this.xMessageService.SaveMessageModelData(this.messageWorkOrderobj).subscribe(res => {
      // console.log('edit', res)
      this.messageWorkOrderobj.MWU_pkeyID = res[0][0].MWU_pkeyID;
      this.messageWorkOrderobj.MWU_User_ID = res[0][0].MWU_User_ID;
      this.messageWorkOrderobj.MWU_workOrder_ID = res[0][0].MWU_workOrder_ID;
      this.messageWorkOrderobj.MWU_IsRead = res[0][0].MWU_IsRead;
      this.messageWorkOrderobj.MWU_Role = res[0][0].MWU_Role;
      this.messageWorkOrderobj.Type = 2;

    });
  }




  SendWoMsgNotification() {
    if (this.threadType === 'contractor') {
      this.woNotificationobj.workOrder_ID = this.workOrder;

      this.xMessageService
        .SendMessageNotoficationData(this.woNotificationobj)
        .subscribe(Response => {
          //debugger;
          //console.log("Message Notification", Response);
        });
    }
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
  MasterCountSum(){
    this.MasterUnreadCounts++;
  }
}
