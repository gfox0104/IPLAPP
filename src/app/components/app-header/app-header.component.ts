import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menus } from './menu';
import { AuthService } from '../../services/auth/auth.service';
import { EncrDecrService } from '../../services/util/encr-decr.service';
import { UserAccessModel } from '../../services/util/user-access/user-access-model';
import { CommonMenuServices } from '../../services/util/user-access/user-access.service';
import {
  ClientPhotoNotificationModel,
  MenuMasterModel,
  WoNotificationModel,
} from '../../pages/user/add-group/add-group-model';
import { AddGroupsServices } from '../../pages/user/add-group/add-group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../pages/message/message.service';
import { HttpResponse } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import moment from 'moment';
import { SaveWorkOrderViewServices } from 'src/app/pages/work-order/work-order-view/work-order-view-service';
import { WorkOderViewModel } from 'src/app/pages/work-order/work-order-view/work-order-view-model';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  menus = Menus;
  isSecondMenu: boolean = false;
  subMenus: any;
  url: string;
  UserAccessModelObj: UserAccessModel = new UserAccessModel();
  MenuMasterModelObj: MenuMasterModel = new MenuMasterModel();
  WoNotificationModelObj: WoNotificationModel = new WoNotificationModel();
  groupRoles: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    null
  );
  badge;
  wonotData = [];
  wonotCnt = 0;

  ClientResultPhotoNotificationModelObj: ClientPhotoNotificationModel =
    new ClientPhotoNotificationModel();
  WorkOderViewModelobj: WorkOderViewModel = new WorkOderViewModel();
  // photoDownloadNotificationData = [];
  // photoDownloadNotificationCnt = 0;
  photoDownloadNotificationData_Firebase = [];

  currentDate = new Date().toLocaleString();
  IPL_Company_ID: any;
  User_LoginName: any;
  User_LoginName_withouth_specialChar: any;
  groupRoleID: number = 0;
  unreadCounts: number = 0;
  unreadMessageNotification: any =[];
  username: string;
  AssignedWorkOrderList:any=[];
  constructor(
    private route: Router,
    private authService: AuthService,
    private EncrDecr: EncrDecrService,
    private xAddGroupsServices: AddGroupsServices,
    private xmodalService: NgbModal,
    private messageService: MessageService,
    private xdatabase: AngularFireDatabase,
    private workOrderService: SaveWorkOrderViewServices,
  ) {
    const userDetail = this.authService.getUserDetail();
    // console.log(userDetail);
    this.IPL_Company_ID = userDetail.IPL_Company_ID;
    this.User_LoginName = userDetail.User_LoginName;
    this.User_LoginName_withouth_specialChar = this.RemoveSpecialChar(userDetail.User_LoginName);
    this.username = localStorage.getItem('UserName').toLowerCase();
    this.groupRoleID = userDetail.GroupRoleId;
    this.LoadFirebaseDownloadNotification();
  }

  ngOnInit() {
    this.getLoggedinUser();
    this.GetAssignedWorkOrderList();
    this.route.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.isSecondMenu = false;
        this.subMenus = [];
        this.url = event.url;
        if (this.url == '/message/workordermessage') return;
        let activeMenu = this.menus.find((menu) =>
          this.url.includes(menu.routerLink)
        );
        if (!activeMenu) return;
        this.isSecondMenu = true;
        this.subMenus = activeMenu.subMenus;
      }
    });
    this.messageService.unreadCounts.subscribe((value) => {
      this.badge = value;
    });
    this.messageService.unreadCounts_MessageNotification.subscribe((value) => {
      this.unreadMessageNotification = value;
    });


    this.LoadNotification();
    // this.LoadDownloadPhotosNotification();
  }

  subMenuClick(item, subItem) {
    this.isSecondMenu = true;
  }
  profile(content) {
    this.xmodalService.open(content, { windowClass: 'xlModal' });
  }
  changepassword(contentx) {
    this.xmodalService.open(contentx);
  }
  logout() {
    //debugger;
    this.authService.AddUserAccessLogLogoutPost().subscribe((response) => {
      // debugger;
      this.authService.logout();
      localStorage.removeItem('usertemp_');
      localStorage.removeItem('tempadmin');
      localStorage.removeItem('trackfoldername');
      localStorage.removeItem('UserTracking');
      localStorage.removeItem('UserTrackingTime');
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('TOKEN');
      localStorage.clear();
    });
    //this.authService.AddUserAccessLogLogoutPost();
  }

  User_FirstName: any;
  usersx: any;
  decuser: any;

  getLoggedinUser() {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', encuser);
      this.decuser = JSON.parse(decval);
      this.usersx = this.decuser;
      if (
        this.usersx != undefined &&
        this.usersx != null &&
        this.usersx != 'undefined'
      ) {
        this.User_FirstName = this.usersx[0].User_FirstName;
      } else {
        this.User_FirstName = null;
        this.route.navigate(['/admin/login']);
      }

      var groupRoleId = this.usersx[0].GroupRoleId;

      switch (groupRoleId) {
        case 1:
          this.MenuMasterModelObj.Mgr_Group_Id = 47;
          break;
        case 2:
          this.MenuMasterModelObj.Mgr_Group_Id = 48;
          break;
        case 3:
          this.MenuMasterModelObj.Mgr_Group_Id = 50;
          break;
        case 4:
          this.MenuMasterModelObj.Mgr_Group_Id = 49;
          break;
        case 5:
          this.MenuMasterModelObj.Mgr_Group_Id = 4;
          break;
        default:
          break;
      }

      this.MenuMasterModelObj.Type = 1;
      this.xAddGroupsServices
        .GetMenuData(this.MenuMasterModelObj)
        .subscribe((response) => {
          localStorage.setItem('groupRoles', JSON.stringify(response[1]));
        });
    }
  }
  LoadNotification() {
    this.WoNotificationModelObj.Type = 3;
    this.authService
      .GetWoNotificationData(this.WoNotificationModelObj)
      .subscribe((Response) => {
        //debugger;

        this.wonotData = Response[0];
        this.wonotCnt != Response[0].length;
      });
  }

  // LoadDownloadPhotosNotification(){
  //   //debugger;
  //   this.ClientResultPhotoNotificationModelObj.Type = 1;
  //   this.authService
  //     .GetPhotoDownloadNotificationData(this.ClientResultPhotoNotificationModelObj)
  //     .subscribe(Response => {
  //       //debugger;

  //       this.photoDownloadNotificationData = Response[0];
  //       this.photoDownloadNotificationCnt = Response[0].length;

  //     });
  // }

  UpdateDownloadNotification(woItem) {
    // debugger;
    if (woItem.PN_IsExpired) {
      //won't be able to download as link has expired
    } else {
      window.open(woItem.PN_DownloadLink, '_blank');
    }
  }

  UpdateNotification(woItem) {
    //debugger;
    // debugger;
    if (!woItem.WN_Title.includes('download')) {
      this.WoNotificationModelObj.Type = 5;
      this.WoNotificationModelObj.WN_Pkey_Id = woItem.WN_Pkey_Id;
      this.WoNotificationModelObj.WN_IsRead = true;
      this.authService
        .AddUpdateWorkorderNotificationData(this.WoNotificationModelObj)
        .subscribe((Response) => {
          //debugger;

          const encrypted = this.EncrDecr.set(
            '123456$#@$^@1ERF',
            woItem.WN_WoId
          );
          this.route.navigate([
            '/client/clientresultinstruction/' + btoa(encrypted),
          ]);
          this.LoadNotification();
        });
    } else {
      // console.log(woItem.WN_Message);
      window.open(woItem.WN_Message, '_blank');
    }
  }

  ClearNotification() {
    if (this.wonotData.length > 0) {
      this.wonotData.forEach((element) => {
        this.WoNotificationModelObj.Type = 5;
        this.WoNotificationModelObj.WN_Pkey_Id = element.WN_Pkey_Id;
        this.WoNotificationModelObj.WN_IsRead = true;
        this.authService
          .AddUpdateWorkorderNotificationData(this.WoNotificationModelObj)
          .subscribe((Response) => {
            this.LoadNotification();
          });
      });
    }
  }

  ClearDownloadNotification() {
    // if (this.photoDownloadNotificationData.length>0)
    // {
    //   this.WoNotificationModelObj.Type = 6;
    //   this.WoNotificationModelObj.WN_Pkey_Id = 0;
    //   this.WoNotificationModelObj.WN_IsRead = true;
    //   this.authService
    //   .AddUpdateWorkorderNotificationData(this.WoNotificationModelObj)
    //   .subscribe(Response => {
    //     // this.LoadDownloadPhotosNotification();
    //   });
    // }

    //Delete Download Notification from database
    this.WoNotificationModelObj.Type = 6;
    this.WoNotificationModelObj.WN_Pkey_Id = 0;
    this.WoNotificationModelObj.WN_IsRead = true;
    this.authService
      .AddUpdateWorkorderNotificationData(this.WoNotificationModelObj)
      .subscribe((Response) => {});

    //Delete Download Notification from Firebase
    let downloadNotificationRef = this.xdatabase.database.ref(
      'DownloadNotification/' + this.IPL_Company_ID
    );
    downloadNotificationRef.child(this.User_LoginName_withouth_specialChar).remove();
    this.photoDownloadNotificationData_Firebase = [];
  }
  LoadFirebaseDownloadNotification() {
    let downloadNotificationRef = this.xdatabase.database.ref(
      'DownloadNotification/' + this.IPL_Company_ID
    );
    var closeModal = true;
    downloadNotificationRef
      .child(this.User_LoginName_withouth_specialChar)
      .on('child_added', (sitem) => {
        var data = sitem.val();
        data.PN_IsExpired = moment(new Date()).isAfter(
          new Date(data.PN_ExpireOn)
        );
        this.photoDownloadNotificationData_Firebase.push(data);
        if (closeModal) {
          if (this.route.url.includes('client/clientresultphoto/')) {
            this.xmodalService.dismissAll();
          }
        } else closeModal = false;
      });
  }
  dateSortBy(array, sortKey: string) {
    return array.sort((a, b) => new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime())
  }
  sortBy(array, sortKey: string) {
   return array.sort((a, b) =>
    a[sortKey] < b[sortKey] ? 0 : a[sortKey] === b[sortKey] ? -1 :0
    );
  }
  getMessageCount() {
    var messageRef = this.xdatabase.database.ref('messages/' + this.IPL_Company_ID);
    messageRef.once('value', (value) => {
      const data = value.val();
      const IPLNO_list = Object.keys(data);

      IPLNO_list.map((item) => {
        //Check Workorder assigned to this user
        var isContain=this.AssignedWorkOrderList.filter(x=>x.IPLNO===item)
        if(isContain.length>0)
        {
          messageRef.child(item).on('child_added', (sitem) => {
            var messages = sitem.val();
            this.GetUnreadCount(messages,item);
          });
        }
      });
    });
  }
  GetUnreadCount(message,iplNumber) {
    var msgText="You have received a new message from this IPL : <b>" +iplNumber+"</b>";
    var date = new Date(message.time)
    var msgobj={IPLNo:iplNumber,msgText:msgText,msgTime:date};
    if (
      message.readByAdmin != undefined &&
      message.readByContractor != undefined &&
      message.readByCoordinator != undefined &&
      message.readByProcessor != undefined &&
      message.readByClient != undefined
    ) {
      if (
        this.groupRoleID == 1 &&
        message.readByAdmin === false &&
        message.from !== this.username
      ) {
        this.unreadMessageNotification.push(msgobj);
        this.unreadCounts++;
      } else if (
        this.groupRoleID == 2 &&
        message.readByContractor === false &&
        message.from !== this.username
      ) {
        this.unreadMessageNotification.push(msgobj);
        this.unreadCounts++;
      } else if (
        this.groupRoleID == 3 &&
        message.readByCoordinator === false &&
        message.from !== this.username
      ) {
        this.unreadMessageNotification.push(msgobj);
        this.unreadCounts++;
      } else if (
        this.groupRoleID == 4 &&
        message.readByProcessor === false &&
        message.from !== this.username
      ) {
        this.unreadMessageNotification.push(msgobj);
        this.unreadCounts++;
      } else if (
        this.groupRoleID == 5 &&
        message.readByClient === false &&
        message.from !== this.username
      ) {
        this.unreadMessageNotification.push(msgobj);
        this.unreadCounts++;
      }
      this.messageService.setUnreadCounts(this.unreadCounts);
      this.messageService.setUnreadMessageNotification(this.unreadMessageNotification);
    }
  }
  UpdateMessage(msgobj) {
    this.workOrderService
    .GetWorkOrderIPLNumberList(0,2,msgobj.IPLNo)
    .subscribe(response => {
      if(response[0].length>0)
      {
        var workOrder_ID=response[0][0].workOrder_ID
        const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', workOrder_ID);
        this.route.navigate(["client/messages/", btoa(encrypted)]);
      }
      else
      {
        alert("Something went wrong");
      }
    });
  }
  // ngDoCheck() {
  //   debugger;
  //   this.getMessageCount();
  // }
  ClearMessageNotification() {
    this.unreadCounts=0;
    const messageRef = this.xdatabase.database.ref("messages/"+ this.IPL_Company_ID);
    var executedIPLNo=[];
    this.unreadMessageNotification.forEach(msg => {
      var iplNumber= msg.IPLNo;
      var IsContain=executedIPLNo.filter(x=>x==iplNumber)
      if(IsContain.length==0)
      {
        executedIPLNo.push(iplNumber)
        // console.log(iplNumber);
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
    });
    this.getMessageCount()
    executedIPLNo=[];
  }

  GetAssignedWorkOrderList() {
    this.messageService
      .MsgWorkorderLeftBarData(this.WorkOderViewModelobj)
      .subscribe(Response => {
        this.AssignedWorkOrderList = Response[0];
        this.getMessageCount();
        // console.log('Assigned Workorder', this.AssignedWorkOrderList)
      });
  }
  RemoveSpecialChar(text){
    var filter_text=text.toString().replace('@','')
    filter_text=filter_text.toString().replace('.','')
    return filter_text
  }
}
