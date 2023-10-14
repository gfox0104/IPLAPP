import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ContactTypeColumns } from 'src/app/pages/contractor/professional-services/constants/grid-columns';
import { ProfessionalServices } from 'src/app/pages/contractor/professional-services/professional-services.service';
import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';
import { ContactTypeMasterDTO } from './constant/ipl-app-contact-type-manage.modal';

@Component({
  selector: 'app-ipl-app-contact-type-manage',
  templateUrl: './ipl-app-contact-type-manage.component.html',
  styleUrls: ['./ipl-app-contact-type-manage.component.scss']
})
export class IplAppContactTypeManageComponent implements OnInit {

  @Output() RefreshContactTypes = new EventEmitter();

  contactTypeMasterDTO:ContactTypeMasterDTO = new ContactTypeMasterDTO();
  isContactTypeValid = false;
  MessageFlag: string;
  button="Save";
  public state_grid2: State = {};
  contactTypesList:any;
  gridContactTypeColumns = ContactTypeColumns;
  constructor(private xmodalService: NgbModal,
    private professionalServices:ProfessionalServices) { }

  ngOnInit(): void {
    this.GetContactTypesList();
  }

  GetContactTypesList(IsFromSaved=false) {
    this.professionalServices
      .GetContactTypeMaster()
      .subscribe(response => {
        this.contactTypesList = response[0];
        if(IsFromSaved)
        {
          this.RefreshContactTypes.emit(this.contactTypesList);
        }
      });
  }
  SubmitContactTypeManage() {
    this.isContactTypeValid=false
    if(this.contactTypeMasterDTO.CT_Name==undefined || this.contactTypeMasterDTO.CT_Name==null)
    {
      this.isContactTypeValid=true;
    }
    if(!this.isContactTypeValid)
    {
      this.professionalServices
      .PostContactTypeMaster(this.contactTypeMasterDTO)
      .subscribe(response => {
        this.GetContactTypesList(true);
        this.MessageFlag = "Contact type Saved...!";
        this.commonMessage();
      });
    }
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
    this.contactTypeMasterDTO=new ContactTypeMasterDTO()
    this.button="Save";
  }
  CancleClick(){
    this.button="Save";
    this.isContactTypeValid=false;
    this.contactTypeMasterDTO=new ContactTypeMasterDTO();
  }
  EditContactType(data){
    this.button="Update";
    this.contactTypeMasterDTO.Type=2;
    this.contactTypeMasterDTO.CT_PkeyId=data.CT_PkeyId;
    this.contactTypeMasterDTO.CT_Name=data.CT_Name;
    this.contactTypeMasterDTO.CT_IsActive=data.CT_IsActive;
  }
  DeleteContactType(data){
    if (data.Task_Group_pkeyID != 0 && !data.Task_Group_IsDeleteAllow) {
      var cfrm = confirm("Are you want to delete this record...!");
      if (cfrm == true) {
          this.contactTypeMasterDTO.Type = 4;
          this.contactTypeMasterDTO.CT_PkeyId = data.CT_PkeyId;

          this.professionalServices
            .PostContactTypeMaster(this.contactTypeMasterDTO)
            .subscribe(response => {
              this.contactTypeMasterDTO=new ContactTypeMasterDTO();
              this.GetContactTypesList(true);
            });
      }
    }
  }
  public dataStateChange_grid2(state_grid2: DataStateChangeEvent): void {
    this.state_grid2 = state_grid2;
  }
  checkChange(event, dataItem) {
    this.contactTypeMasterDTO.CT_PkeyId = dataItem.CT_PkeyId;
    this.contactTypeMasterDTO.CT_IsActive = !dataItem.CT_IsActive;
    this.contactTypeMasterDTO.Type = 3;
    this.professionalServices
    .PostContactTypeMaster(this.contactTypeMasterDTO)
    .subscribe(response => {
      this.contactTypeMasterDTO=new ContactTypeMasterDTO();
      this.GetContactTypesList(true);
    });
  }

}
