import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { EcdNoteFilter, ECDNotesObject, ECD_Notes_DTO } from './dist/ecd_notes_model';
import { EcdNotesService } from './Service/ecd-notes.service';

@Component({
  selector: 'app-ipl-app-ecd-notes-box',
  templateUrl: './ipl-app-ecd-notes-box.component.html',
  styleUrls: ['./ipl-app-ecd-notes-box.component.scss']
})
export class IplAppEcdNotesBoxComponent implements OnInit {
  @Input() workOrderId;
  @Output() NoteRefresh = new EventEmitter();

  EcdNoteFilter :EcdNoteFilter=new EcdNoteFilter();
  ECD_Note_List :ECD_Notes_DTO[]
  formUsrCommonGroup: UntypedFormGroup; // create obj
  ecdNotesObject:ECDNotesObject=new ECDNotesObject()
  submitted = false; // submitted;
  isLoading = false; // buttom loading..
  button="Save";
  tital="Add";
  public contentx; // for common msg argument pass sathi
  decuser:any;
  IsAddEditDeleteVisible=true;
  constructor(
    private xEcdNotesService: EcdNotesService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private EncrDecr: EncrDecrService
    ) {
      if(localStorage.getItem('usertemp_') != null)
      {
        var encuser = JSON.parse(localStorage.getItem('usertemp_'));
        var decval  = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
        this.decuser  =JSON.parse(decval) ;

        switch (this.decuser[0].GroupRoleId) {
          case 1:
            {
              break;
            }
            case 2:
            {
              this.IsAddEditDeleteVisible=false;
              break;
            }
            case 3:
            {
              break;
            }
            case 4:
            {
              break;
            }
            case 5:
            {
              break;
            }
          }
      }


     }

  ngOnInit(): void {
    this.EcdNoteFilter.ECD_Note_WorkOrderId=this.workOrderId;
    this.GetEcdNoteList();

    this.formUsrCommonGroup = this.formBuilder.group({
      ECD_Note_Comment: ["", Validators.required]
    });
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  GetEcdNoteList(){
    this.EcdNoteFilter.Type = 1;
      this.xEcdNotesService
      .GetEcdNoteList(this.EcdNoteFilter)
      .subscribe(Response => {
        //debugger;
        this.ECD_Note_List=Response[0];
      });
  }
  OpenAddEcdPopup(modalContent){
    this.ecdNotesObject.ECD_Note_WorkOrderId=this.workOrderId;
    this.ecdNotesObject.ECD_Note_pkeyID=0;
    this.ecdNotesObject.ECD_Note_Comment="";
    this.ecdNotesObject.ECD_Note_Date=null;
    this.ecdNotesObject.Type=1;
    this.isLoading = false;
    this.button = "Save";
    this.submitted = false;
    this.formUsrCommonGroup.reset();
    this.tital="Add";
    this.modalService.open(modalContent, { windowClass: "sm-model" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  FormButton(){
    this.ecdNotesObject;
    this.submitted = true;
    if (!this.ecdNotesObject.ECD_Note_Date) {
      return;

    }
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    this.xEcdNotesService
      .PostECDNoteData(this.ecdNotesObject)
      .subscribe(async response => {
        this.button = "Save";
        this.submitted = false;
        this.ecdNotesObject=new ECDNotesObject();
        this.GetEcdNoteList();
        document.getElementById('btnNotesModalClose').click();
        this.NoteRefresh.emit();
      });
  }
  DeleteNote(model:ECD_Notes_DTO){
    let comf = confirm('Are you Sure you want to  Delete this Record?');
    if (comf) {
    this.ecdNotesObject.ECD_Note_WorkOrderId=model.ECD_Note_WorkOrderId;
    this.ecdNotesObject.ECD_Note_pkeyID=model.ECD_Note_pkeyID;
    this.ecdNotesObject.Type=4;

    this.xEcdNotesService
      .PostECDNoteData(this.ecdNotesObject)
      .subscribe(async response => {
        this.NoteRefresh.emit();
        this.GetEcdNoteList();
      });
    }
  }
  EditNote(modalContent,model:ECD_Notes_DTO){
    this.ecdNotesObject.ECD_Note_WorkOrderId=model.ECD_Note_WorkOrderId;
    this.ecdNotesObject.ECD_Note_pkeyID=model.ECD_Note_pkeyID;
    this.ecdNotesObject.ECD_Note_Comment=model.ECD_Note_Comment;
    this.ecdNotesObject.ECD_Note_Date=model.ECD_Note_Date;
    this.ecdNotesObject.Type=2;

    this.isLoading = false;
    this.button = "Update";
    this.submitted = false;
    this.formUsrCommonGroup.reset();
    this.tital="Edit";
    this.modalService.open(modalContent, { windowClass: "sm-model" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
   commonMessage(content) {
    this.modalService
      .open(content, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(result => { }, reason => { });
  }
}
