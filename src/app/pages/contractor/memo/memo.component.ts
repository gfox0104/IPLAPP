
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { MemoServices } from './memo.service'
import { SaveTemplateModel, SaveMailModel, MassTemplateModel } from './memo-model'
import { WorkOrderDrodownServices } from "../../../services/util/dropdown.service";
import { ViewGroupsServices } from "../../user/view-groups/view-groups.service";
import { ViewGroupsModel } from "../../user/view-groups/view-groups-model";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { FileInfo } from "@progress/kendo-angular-upload";
import { SelectEvent, RemoveEvent, FileRestrictions } from '@progress/kendo-angular-upload';
import * as _ from 'lodash';
import { IplAppModalContent } from 'src/app/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { PreviouslySentModel } from './previously-sent/previously-sent.model';
import { PreviouslySentService } from './previously-sent/previously-sent.service';
import { BindDataModel } from '../../client-result/client-result/client-result-model';
import { ClientResultOldPhotoServices } from '../../client-result/client-result-photo/client-result-photo-old.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  // selector: '',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  @Output() folderdrd= new EventEmitter<any>();
public griddata: any[];

public defaultItem1:{ Grp_Name: string, Grp_pkeyID: number } = { Grp_Name: 'Select', Grp_pkeyID: 0 };
  MessageFlag: string;
  subject1= false;
  PreviouslySentModelObj: PreviouslySentModel = new PreviouslySentModel();
  viewGroupsModelObj: ViewGroupsModel = new ViewGroupsModel();
  SaveTemplateModelObj: SaveTemplateModel = new SaveTemplateModel();
  SaveMailModelObj: SaveMailModel = new SaveMailModel();
  MassTemplateModelObj:MassTemplateModel = new MassTemplateModel();
  BindDataModelObj: BindDataModel = new BindDataModel();
  public defaultData: Array<{ Grp_pkeyID: number, Grp_Name: string, GroupRoleId: number }>;
  public sourceGroup: Array<{ Grp_pkeyID: number, Grp_Name: string, GroupRoleId: number }> = [];
  public dataGroup: Array<{ Grp_pkeyID: number, Grp_Name: string, GroupRoleId: number }>;
  uploadSaveUrl = BaseUrl + "api/FileUpload/EmailFileUpload";
  uploadRemoveUrl = 'removeUrl';
  subject = '';
  submitted = false;
  templateName: string = '';
  group: Number = 0;
  griddetails:any;
  isHelpActive = false;
  public myFiles:Array<File> = [];
  public value: Date = new Date();
  public format: string = 'MM/dd/yyyy HH:mm';
  public templateOpened = false;
  public previouslySentOpened= false;
  public templateSaveOpened = false;
  public schedOpened = false;
  public events: string = '';
  public mailContent = '';
  formUsrCommonGroup: UntypedFormGroup;
  public fileRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png', 'jpeg', 'pdf', 'doc']
  };
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xMemoServices: MemoServices,
    private xmodalService: NgbModal,
    private xViewGroupsServices: ViewGroupsServices,
    private xPreviouslySentService: PreviouslySentService,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices
  ) { }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      Subjectfile:["",Validators.required],
      selectGroup:["",Validators.required]
    })
    this.GetGroupData();
    this.GetMassTemplateDetails();
    this.GetMassEmail();
  }

  GetGroupData() {
    this.xViewGroupsServices
      .ViewGroupsData(this.viewGroupsModelObj)
      .subscribe(response => {
        if (response.length != 0) {
          this.sourceGroup = [];
          response[0].forEach(element => {
            this.sourceGroup.push(element);
          });
          this.dataGroup = this.sourceGroup.slice();
        }
      });
  }
  previouslySentOpen() {
    this.previouslySentOpened = true;
  }
  Emaildataclose(status){
    this.previouslySentOpened = false;
  }
  templateclose(status) {
    this.templateOpened = false;
  }

  templateopen() {
    this.templateOpened = true;
  }
  templateSaveclose(status) {
    this.templateSaveOpened = false;
  }

  templateSaveopen() {
    this.templateSaveOpened = true;
  }
  schedclose(status) {
    this.schedOpened = false;
  }
  schedopen() {
    this.schedOpened = true;
  }
  public mailContentChange(value: any): void {
    this.log(value);
  }
  private log(arg: any): void {
    this.events = `${arg || ''}`;
  }
  uploadEventHandler(e) {
    //console.log('uploadEventHandler', e)
    // e.headers = e.headers.append('X-Foo', 'Bar');
  }
  public displayErrorDocument(e: ErrorEvent) {
  }
  public displaySuccessDocument(e) {
  var FileSize = e.files[0].size / 1024 / 1024;
  if (FileSize > 2) {
    this.MessageFlag = "File size exceeds 2 MiB";
    this.commonMessage()
  } else {
    this.processDocument(e.files[0].rawFile);
  }

  }
  FileFilter(value){
    this.folderdrd.emit({value})
  
  }
  removeTags(str) {
    ////dfebugger
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return this.events = str.replace(/(<([^>]+)>)/ig, '');
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
 show1:boolean=false;
  saveMail() {
    // debugger
    //  if (this.formUsrCommonGroup.invalid) {
    //   return;
    // }
    // if (!this.SaveMailModelObj.ST_subject) {
      
    //   this.show1 = true;
      
    // }else {
    //    this.show1 = false ;
    // }
    
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    this.submitted = true;
    this.SaveMailModelObj.ST_group = this.group;
    this.SaveMailModelObj.ST_dateTime = this.value
    this.SaveMailModelObj.ST_subject = this.subject;

    if(this.docx != null && this.docx.length > 0)
    {
      this.SaveMailModelObj.filepath =  this.docx[0];
    }
  
    this.SaveMailModelObj.filename =  this.BindDataModelObj.Client_Result_Photo_FileName;
    this.SaveMailModelObj.ST_content = this.removeTags(this.events);
    this.xMemoServices
    .SaveMail(this.SaveMailModelObj)
    .subscribe(response => {
    //debugger
    if (response.length != 0) {
      this.docx="";
      this.BindDataModelObj=new BindDataModel();
      this.MessageFlag = "Memo has been sent succesfully";
      this.commonMessage()
    }});
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  saveTemplate() {
    this.SaveTemplateModelObj.ST_content = this.events;
    this.SaveTemplateModelObj.ST_name = this.templateName;
    this.xMemoServices
    .SaveMailTemplate(this.SaveTemplateModelObj)
    .subscribe(response => {
      //console.log(response);
    })
    this.templateSaveOpened = false;
  }
  saveMassTemplate() {
   ////dfebugger
   this.MassTemplateModelObj.Type = 1;
    this.xMemoServices
    .AddMassTemplate(this.MassTemplateModelObj)
    .subscribe(response => {
      //console.log(response);
      this.GetMassTemplateDetails();

    })

  }
  GetMassTemplateDetails(){
    this.xMemoServices.GetMassTemplate(this.MassTemplateModelObj).subscribe(res =>{
      //console.log('tempgrid',res);
      this.griddetails = res[0];
    })
  }

  groupChange(event) {
    this.group = event.Grp_pkeyID;
  }
  showDetails(item){
    //console.log('assine',item);
   this.subject = item.Mass_Template_Subject;
    this.mailContent = item.Mass_Template_Contant;
   this.templateclose("cancel");
  }
  deleteDetails(item){
    this.MassTemplateModelObj.Mass_Template_PkeyId = item.Mass_Template_PkeyId;
    this.MassTemplateModelObj.Type = 4;
    this.xMemoServices
    .AddMassTemplate(this.MassTemplateModelObj)
    .subscribe(response => {
      //console.log(response);
      this.GetMassTemplateDetails();

    })
  }

  GetMassEmail(){
    this.PreviouslySentModelObj.Type = 4;
    this.xPreviouslySentService.GetEmailData(this.PreviouslySentModelObj).subscribe(res =>{
      this.griddata = res[0];
    //console.log('emaillist',res);
    })
      }

  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
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

docx:any;
processDocument(documentInput) {
  if (true) {
    this.BindDataModelObj.Common_pkeyID = 0;
    this.BindDataModelObj.Client_Result_Photo_Ch_ID = 0;
    this.BindDataModelObj.Client_Result_Photo_ID = 0;
    this.BindDataModelObj.Client_PageCalled = 11;
    this.BindDataModelObj.documentx = documentInput;
    this.BindDataModelObj.Client_Result_Photo_FileName = documentInput.name;
    this.BindDataModelObj.Type = 2;
    this.xClientResultOldPhotoServices
      .CommonDocumentsUpdate(this.BindDataModelObj)
      .then((res) => {
        res.subscribe(response => {
          // console.log("Photo Upload",response)
          this.docx=response
        });
      });
  }
}

}


