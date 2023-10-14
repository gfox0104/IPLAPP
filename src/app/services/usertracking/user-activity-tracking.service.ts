import { Injectable, Directive, Renderer2, HostListener, Component } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import { EncrDecrService } from '../util/encr-decr.service';

@Directive({
  selector: '[mousekeyboard]'
})

@Injectable({
  providedIn: "root"
})


export class UserActivityTrackingService {
  baseUrl = environment.domain;
    token: any;
    public keypressedcount = 0;
    public mouseCount = 0;
    public ipAddress: any;
    
  constructor( private _http: HttpClient,private renderer: Renderer2, private encrDecr: EncrDecrService) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    this.renderer.listen('window', 'click',(e:Event)=>{
      this.mouseCount = this.mouseCount+ 1;
      
   });
  }
  ngOnInit() {
  }
  
  public CaptureTrackImage() {
 
    var that = this;
    var defaultTab = that.encrDecr.set('123456$#@$^@1ERF',1 );
    sessionStorage.getItem("Tab") == null ? defaultTab : sessionStorage.getItem("Tab");
    if(sessionStorage.getItem("Tab") == null){
      var defaultTab = that.encrDecr.set('123456$#@$^@1ERF',1 );
      sessionStorage.setItem("Tab",that.encrDecr.set('123456$#@$^@1ERF',1 ));
    }
    const tab = that.encrDecr.get('123456$#@$^@1ERF',sessionStorage.getItem("Tab"));
    const userTracking = that.encrDecr.get('123456$#@$^@1ERF',localStorage.getItem("UserTracking"));
    if(tab == "1" && localStorage.getItem("UserName") != null && userTracking == "true"){
    let ANYDTO: any = {};
    this._http.get('https://jsonip.com')
        .subscribe(data => {
          this.ipAddress = data;
          this.ipAddress = this.ipAddress.ip;
        });
        var userId;
        if(localStorage.getItem('usertemp_') != null){
        var encuser = JSON.parse(localStorage.getItem('usertemp_'));
        var decval = that.encrDecr.get('123456$#@$^@1ERF', (encuser));
        userId = JSON.parse(decval)[0].User_pkeyID;
        }
        else{
          userId =0;
        }
     var userTrackingTime = that.encrDecr.get('123456$#@$^@1ERF', localStorage.getItem("UserTrackingTime"));
     var trackfoldername = that.encrDecr.get('123456$#@$^@1ERF', localStorage.getItem("trackfoldername"));
     var keypressedcount = that.encrDecr.get('123456$#@$^@1ERF', localStorage.getItem("keypressedcount"));
     html2canvas(document.getElementsByTagName('html')[0], { width: 1680, height: 1050 }).then(function (canvas) {
   
      var imgDataBase64= canvas.toDataURL("image/jpeg", 1);
 
    ANYDTO.Type = 1;
    ANYDTO.ReqType = 1;
    ANYDTO.ContentType = 1;
    ANYDTO.User_Track_Time_Frequency = parseInt(userTrackingTime);
    ANYDTO.User_Track_UserID = userId;
    ANYDTO.User_Track_Folder_Name  = trackfoldername;
    ANYDTO.User_Track_File_Name = Math.random().toString(36).substr(2, 9) + ".png";
    ANYDTO.User_Track_Captured_On =new Date();
    ANYDTO.User_Track_Mouse_Captured_Count = that.mouseCount;
    ANYDTO.User_Track_Keyboard_Captured_Count = keypressedcount;
    ANYDTO.User_Track_Page_Url = window.location.href;
    ANYDTO.User_Track_Screen_Shot_Name = Math.random().toString(36).substr(2, 9) + ".png";
    ANYDTO.User_Track_Created_Date = new Date();
    ANYDTO.User_Track_Captured_From_Ip = that.ipAddress;
    ANYDTO.Image = imgDataBase64;
    const uploadapi = environment.cloudUrl + 'uploadactivitytracker';
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${that.token}`);
    that._http.post<any>(uploadapi, ANYDTO, { headers: headers }).subscribe(x=>{
      that.mouseCount = 0;
      localStorage.setItem('keypressedcount', that.encrDecr.set('123456$#@$^@1ERF',0))
    });
  });
  
  }
  else{
  

   }
  }
}