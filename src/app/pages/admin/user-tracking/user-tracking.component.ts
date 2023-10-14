import { Component, Injectable, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ReportDetails} from "../../reports/report-details/report-details-model";
import { ViewUserServices } from '../../user/view-user/view-user.service';
import { ViewUserModel } from '../../user/view-user/view-user-model';
import { trackmodeldata } from './user-tracking-model';
import { UserTrackingServices } from './user-tracking.service';
import  _ from 'underscore';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { IEvent, Lightbox, LightboxConfig, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { Subscription } from 'rxjs';
import { IplAppModalContent } from "src/app/components";

@Component({
  selector: 'app-user-tracking',
  templateUrl: './user-tracking.component.html',
  styleUrls: ['./user-tracking.component.scss'],
  host: {
    class: 'columns'
  }
})

export class UserTrackingComponent implements OnInit {
  viewUserModelObj: ViewUserModel = new ViewUserModel();
  
  reports:any;
  datalist:any; 
 formTrackGroup: UntypedFormGroup;
 TrackModelObj : trackmodeldata = new trackmodeldata();
 Errormsg : boolean = false;
  userlist: any;
  trackingData: any;
  MessageFlag: string;
  testExtArray:any;
  reportDetails = ReportDetails;
  totalHour: any = '00';
  workingHour: any = '00';
  idalHour: any = '00';
  config:any;
  imageData:any= [];
  spin: boolean = false;
  isHelpActive = false;
  private _subscription: Subscription;
  userfilterlst: any;
  constructor(private _lightbox: Lightbox,private formBuilder: UntypedFormBuilder,private modalService: NgbModal,
    private xReportsServices: UserTrackingServices,
    private xViewUserServices: ViewUserServices,
    private _lightboxEvent: LightboxEvent,
    private _lighboxConfig: LightboxConfig ,
    private xmodalService: NgbModal, ) {
  }

  
  
  ngOnInit() {
    this.getautoUserdata();
    this.config = {
      itemsPerPage: parseInt(this.TrackModelObj.NoofRows.toString()),
      currentPage: parseInt(this.TrackModelObj.PageNumber.toString()),
      totalItems: 0
    };
    
    this.formTrackGroup = this.formBuilder.group({
    });
  }
  get fx() {
    return this.formTrackGroup.controls;
  }

  UserFilter(value){
    if (value!='') {
      var filteredcustomer = this.userlist.filter(function (el) {
        return el.User_FirstName != null;
      });
      this.userfilterlst = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.userfilterlst = this.userlist.slice();
   }
  }


  getautoUserdata() {
    this.xReportsServices
      .ViewUserData()
      .subscribe(response => {
        this.userlist = response[0];
        this.userfilterlst = this.userlist
      });
  }
  FormButton() {
    if(this.TrackModelObj.fromDate == "" || this.TrackModelObj.toDate == "" || this.TrackModelObj.User_Track_UserID == 0)
    {
       this.Errormsg = true;
    }else{
      this.spin = true;
      this.trackingData = null;
      this.imageData = [];
      this.TrackModelObj.fromDate = moment(this.TrackModelObj.fromDate.toString()).format('MM/DD/yyyy');
      this.TrackModelObj.toDate = moment(this.TrackModelObj.toDate.toString()).format('MM/DD/yyyy');
       this.TrackModelObj.PageNumber = parseInt(this.TrackModelObj.PageNumber.toString());
       this.TrackModelObj.NoofRows = parseInt(this.TrackModelObj.NoofRows.toString());
      this.Errormsg = false;
      this.xReportsServices
    .GetReportDetail(this.TrackModelObj)
    .subscribe(res =>{
     this.trackingData = res[0];
     for (let i = 0; i < this.trackingData.length; i++) {
      const src = this.trackingData[i].User_Track_File_Path;
      const caption = '<p>FileName: <span>' + this.trackingData[i].User_Track_File_Name + '</span></p>'+
      '<p> DateTimeOriginal: <span>'+ moment(this.trackingData[i].User_Track_Created_Date.toString()).format('dd/MM/yyyy hh:mm a') + "</span></p>"+
      '<p>Total Mouse: <span>' +   this.trackingData[i].User_Track_Mouse_Captured_Count + '</span></p>' +
      '<p>Total Keyboard: <span>' +   this.trackingData[i].User_Track_Keyboard_Captured_Count + '</span></p>'+
      '<p>Url : <span>' +   this.trackingData[i].User_Track_Page_Url + '</span></p>';
      const thumb = this.trackingData[i].User_Track_File_Path;
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
 
      this.imageData.push(album);
    }
    
    
     this.config = {
      itemsPerPage: parseInt(this.TrackModelObj.NoofRows.toString()),
      currentPage: parseInt(this.TrackModelObj.PageNumber.toString()),
      totalItems: parseInt(res[1])
    };
     if(this.trackingData.length > 0){

      var totalHour = _.reduce(this.trackingData, function(memo, num){
         return memo + num.User_Track_Time_Frequency; }
          , 0);
       this.totalHour = Math.floor(totalHour/60) + ":" +  totalHour % 60;


       var workingHour = _.reduce(this.trackingData, function(memo, num){
        if(num.User_Track_Keyboard_Captured_Count > 0 || num.User_Track_Mouse_Captured_Count > 0){
          return memo + num.User_Track_Time_Frequency; 
         }else{
          return memo + 0;
         }
        }
         , 0);

       this.workingHour = Math.floor(workingHour/60) + ":" +  workingHour % 60;

       var idalHour = _.reduce(this.trackingData, function(memo, num){
        if(num.User_Track_Keyboard_Captured_Count ==  0 && num.User_Track_Mouse_Captured_Count == 0){
          return memo + num.User_Track_Time_Frequency; 
         }else{
          return memo + 0;
         }
        }
         , 0);

       this.idalHour = Math.floor(idalHour/60) + ":" +  idalHour % 60;
       this.spin = false;
       }else{
       this.totalHour = '00';
      this.workingHour = '00';
      this.idalHour = '00';
      this.spin = false;

       }
    })
  }
}
  changedata:any;
  GroupByChangeEvent(val)
  {
    this.changedata = val;
  }
  
  closeResult: string;
  popupImage:string;
  contentPhotox :any;
  imgCurrentIndex:number;
  openImage(index){
   
    this._lightbox.open(this.imageData, index,{
      wrapAround: true,
      showImageNumberLabel: false,
      disableScrolling: false,
      showZoom: true,
      showRotate: false,
    });

  }
  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }

  commonPhoto(content) {
    this.modalService.open(content, { windowClass: "xlModal" }).result.then( result => {
      this.closeResult = `Closed with: ${result}`;
    }, reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  deleteImage(id,index){
    //dfebugger;
    if(confirm("Are you sure to delete this image")) {
      this.xReportsServices
      .DeleteImage(id)
      .subscribe(response => {
        //console.log(response)
      this.trackingData.splice(index , 1);
      });
    }
  }
 
  onPageChange(event){
    //console.log(event);
    this.config.currentPage = event;
    this.TrackModelObj.PageNumber = parseInt(event.toString());
    this.FormButton();
  }
  PageChange(){
    this.FormButton();
    this.TrackModelObj.PageNumber =1;
  }
   ClearData(){
         this.TrackModelObj.fromDate = "";
         this.TrackModelObj.toDate = "";
         this.TrackModelObj.User_Track_UserID = 0;
         this.trackingData = null;
         this.totalHour = '00';
         this.workingHour = '00';
         this.idalHour = '00';
         this.TrackModelObj.NoofRows = 20;
       }
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => { });
    }

    SetHelpFlag()
    {
      this.isHelpActive = !this.isHelpActive
      if (this.isHelpActive) {
        this.MessageFlag = "Item Help mode is on...!";
        this.commonMessage();
      }
      else
      {
        this.MessageFlag = "Item Help mode is off...!";
        this.commonMessage();
      }
    }
  
    DispalyInfo(event: Event, lblName)
    {    
      if (this.isHelpActive) {
        event.preventDefault();
        this.MessageFlag = "Add Information for " + lblName;
        this.commonMessage();
      }    
    }
}
