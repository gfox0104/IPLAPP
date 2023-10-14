import { Component, OnInit } from '@angular/core';

import { EmailTemplateService } from './email-template.service';
import { EmailTemplateModel } from './email-template.model';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import{environment} from '../../../../environments/environment'
@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {
  EmailList;
  emailmeta;
  isSubmitted: boolean;
  public contentx;
  MessageFlag: string;
  dropCkck = false;
  formUsrCommonGroup: UntypedFormGroup; // create obj
  EmailTemplateModelObj: EmailTemplateModel = new EmailTemplateModel();
  isHelpActive = false;
url:string;
  constructor(
    
    private xEmailTemplateService: EmailTemplateService,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formBuilder.group({
      drdval: ["", Validators.required],
      EmailTempSubject: ["", Validators.required],
      EmailTempHTML: ["", Validators.nullValidator],
    });
    this.getemaildropdrown();
  }

  getemaildropdrown(){
   this.xEmailTemplateService.getdrddata()
.subscribe(res =>{
  this.EmailList = res[0];
  this.emailmeta = res[1][0];
 
})
}
get fx() {
  return this.formUsrCommonGroup.controls;
}
valflag=0;
changeTemplate(arg){
  // debugger
  this.EmailTemplateModelObj.Val_Type = arg;
  this.xEmailTemplateService.GetBodyEmailTemplate(this.EmailTemplateModelObj)
  .subscribe(res =>{
    // debugger
    if(res[0].length > 0)
    {
      this.EmailTemplateModelObj = res[0][0];
    }  
    else
    
    {
  this.url=environment.URL;
  this.EmailTemplateModelObj.Email_Temp_HTML = '';
      this.EmailTemplateModelObj.Email_Temp_HTML = '<div style ="background-color:#f3f3f3;width:50%;"><div style="margin-left: 7px;padding-top: 6px;padding-bottom: 13px;font-size:14px;font-family: Verdana, Arial, Helvetica, sans-serif;"><img src = "../../../../assets/images/logo.jpg"style ="width:193px;"/> </div><div style = "margin-left: 12px;padding-top: 2px;padding-bottom: 13px; font-size:14px; font-family: Verdana, Arial, Helvetica, sans-serif"> ' + this.EmailTemplateModelObj.Email_Temp_HTML + ' <div style = "text-align: left;"><a href = "'+this.url+'">Ipreservation</a></div></div> </div>';
      this.EmailTemplateModelObj.Email_Temp_Subject='';
      this.EmailTemplateModelObj.Val_Type=arg;
      this.EmailTemplateModelObj.Email_Temp_IsActive=true;
      this.EmailTemplateModelObj.Email_Temp_Delete=false;
      this.EmailTemplateModelObj.Email_Temp_PkeyId=0;
    }
    
   
    

    //console.log("emailbody", this.EmailTemplateModelObj.Type);
})
}
preview(){
  //debugger
  var newWin = window.open('', '');
  newWin.document.open();
  if (this.EmailTemplateModelObj.Type == 1) {
    newWin.document.write( '<html><body ><div style ="background-color:#f3f3f3;width:50%;"><div style="margin-left: 7px;padding-top: 6px;padding-bottom: 13px;font-size:14px;font-family: Verdana, Arial, Helvetica, sans-serif;"><img src = "../../../../assets/images/logo.jpg"style ="width:193px;"/> </div><div style = "margin-left: 12px;padding-top: 2px;padding-bottom: 13px; font-size:14px; font-family: Verdana, Arial, Helvetica, sans-serif"> ' + this.EmailTemplateModelObj.Email_Temp_HTML + ' <div style = "text-align: left;"><a href = "https://testui.ipreservationlive.com/">Ipreservation</a></div></div> </div> </body></html>');
  }
  else{
    newWin.document.write(''+ this.EmailTemplateModelObj.Email_Temp_HTML) ;
  }
  

}
FormButton(content){
  // debugger
  this.contentx = content;
  this.isSubmitted = false;
  this.dropCkck = false;

  if (this.dropCkck) {
    return;
  }

  // stop here if form is invalid
  
  if (this.formUsrCommonGroup.invalid) {
    return;
  }
  //console.log('chek details',this.EmailTemplateModelObj);
  if ( this.EmailTemplateModelObj.Type == 1) {
    this.url=environment.URL;
   // this.EmailTemplateModelObj.Email_Temp_HTML = '<div style ="background-color:#f3f3f3;width:50%;"><div style="margin-left: 7px;padding-top: 6px;padding-bottom: 13px;font-size:14px;font-family: Verdana, Arial, Helvetica, sans-serif;"><img src = "../../../../assets/images/logo.jpg"style ="width:193px;"/> </div><div style = "margin-left: 12px;padding-top: 2px;padding-bottom: 13px; font-size:14px; font-family: Verdana, Arial, Helvetica, sans-serif"> ' + this.EmailTemplateModelObj.Email_Temp_HTML + ' <div style = "text-align: left;"><a href = "'+this.url+'">Ipreservation</a></div></div> </div>';

  }
  else{
    this.EmailTemplateModelObj.Email_Temp_HTML;
  }

  this.xEmailTemplateService
    .UpdateEmailTemplate(this.EmailTemplateModelObj)
    .subscribe(response => {
      this.MessageFlag = "Email template upated...!";
      this.commonMessage(this.contentx);
    });
  }
  commonMessage(tent) {
    this.xmodalService
      .open(tent, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => { },
        reason => { }
      );
  }

  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonInfoMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonInfoMessage();
    }
  }

  DispalyInfo(event: Event, lblName)
  {    
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonInfoMessage();
    }    
  }

  commonInfoMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'OK';
    modalRef.result.then(result => { }, reason => {      
     });
  }

}
