import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { IplAppModalContent } from 'src/app/components';

import { GridColumns } from '../professional-services/constants/grid-columns';
import { ProfessionalServiceObject, Professional_Service_DTO } from './constants/professional-services.model';
import { ProfessionalServices } from './professional-services.service';

@Component({
  selector: 'app-professional-services',
  templateUrl: './professional-services.component.html',
  styleUrls: ['./professional-services.component.scss']
})
export class ProfessionalServicesComponent implements OnInit {

  gridColumns=GridColumns
  ProfessionalServiceList :Professional_Service_DTO[]
  public state: State = {};

  submitted = false; // submitted;
  isLoading = false; // buttom loading..
  button="Save";
  title="Add";
  professionalServiceObject:ProfessionalServiceObject=new ProfessionalServiceObject();
  formUsrCommonGroup: UntypedFormGroup; // create obj
  drdContactTypes_temp=[];
  drdContactTypes=[];
  public defaultcontactTypes: { CT_Name: string, CT_PkeyId: number } = { CT_Name: 'Select Contact Type', CT_PkeyId: 0 };

  MessageFlag:string;
  CompanyList: any;
  constructor(private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private professionalService:ProfessionalServices) { }

  ngOnInit(): void {

    this.GetContactTypesDropdownList();
    this.GetProfessionalService();

    this.formUsrCommonGroup = this.formBuilder.group({
      PS_ContactName: ["", Validators.required],
      PS_CompanyName: ["", Validators.required],
      PS_Address: ["",Validators.nullValidator],
      PS_Phone: ["",Validators.nullValidator],
      PS_Email: ["",Validators.nullValidator],
      PS_Website: ["",Validators.nullValidator],
      PS_Notes: ["",Validators.nullValidator],
      PS_ContactType: ["",Validators.nullValidator],
    });
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  GetProfessionalService(){
    this.professionalServiceObject.Type = 1;
      this.professionalService
      .GetProfessionalService(this.professionalServiceObject)
      .subscribe(Response => {
        //debugger;
        this.ProfessionalServiceList=Response[0];
      });
  }
  GetContactTypesDropdownList() {
    this.professionalService
      .GetContactTypeMaster()
      .subscribe(response => {
        this.drdContactTypes = response[0];
        this.drdContactTypes_temp=this.drdContactTypes
      });
  }
  FilterContactTypeDropdown(value) {
    if (value!='') {
      var filteredContactType = this.drdContactTypes_temp.filter(function (el) {return el.CT_Name != null;});
      this.drdContactTypes = filteredContactType.filter((s) => s.CT_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drdContactTypes = this.drdContactTypes_temp.slice();
   }
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  OpenProfessionalServiceModal(modalContent,psData:Professional_Service_DTO){
    this.formUsrCommonGroup.reset();
    this.isLoading = false;
    this.submitted = false;
    this.professionalServiceObject=new ProfessionalServiceObject();
    if(psData!=null)
    {
      this.button = "Update";
      this.title="Edit";
      this.professionalServiceObject.PS_PkeyId=psData.PS_PkeyId;
      this.professionalServiceObject.PS_Address=psData.PS_Address;
      this.professionalServiceObject.PS_CompanyName=psData.PS_CompanyName;
      this.professionalServiceObject.PS_ContactName=psData.PS_ContactName;
      this.professionalServiceObject.PS_ContactType=psData.PS_ContactType;
      this.professionalServiceObject.PS_Email=psData.PS_Email;
      this.professionalServiceObject.PS_Notes=psData.PS_Notes;
      this.professionalServiceObject.PS_Phone=psData.PS_Phone;
      this.professionalServiceObject.PS_Website=psData.PS_Website;
      this.professionalServiceObject.Type=2;
      this.modalService.open(modalContent, { windowClass: "sm-model" }).result.then(result => { }, reason => { window.scroll(0, 0); });
    }
    else
    {
      this.button = "Save";
      this.title="Add";
      this.professionalServiceObject.Type=1;
      this.modalService.open(modalContent, { windowClass: "sm-model" }).result.then(result => { }, reason => { window.scroll(0, 0); });
    }

  }
  FormButton(){
    this.submitted = true;
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    this.professionalService
    .PostProfessionalService(this.professionalServiceObject)
    .subscribe(async response => {
      this.MessageFlag="Professional Service added successfully";
      this.commonMessage();
      this.button = "Save";
      this.submitted = false;
      this.professionalServiceObject=new ProfessionalServiceObject();
      this.GetProfessionalService();

    });
  }
  Delete(id){

    let comf = confirm('Are you Sure you want to delete this record?');
    if (comf) {
      // debugger;
      this.professionalServiceObject.PS_PkeyId=id;
      this.professionalServiceObject.Type=4;
    this.professionalService
      .PostProfessionalService(this.professionalServiceObject)
      .subscribe(async response => {
        this.GetProfessionalService();
        this.MessageFlag="Professional Service deleted successfully";
        this.commonMessage();
      });
    }
  }
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
      this.modalService.dismissAll();
     });
  }
  OpenContactTypeMasterManager(modalContent){
    this.modalService.open(modalContent, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  RefreshContactTypes(data)
  {
    this.drdContactTypes=data;
    this.drdContactTypes_temp=this.drdContactTypes_temp;
  }
  checkChange(event, dataItem) {
    this.professionalServiceObject.PS_PkeyId = dataItem.PS_PkeyId;
    this.professionalServiceObject.Type = 3;
    this.professionalService
      .PostProfessionalService(this.professionalServiceObject)
      .subscribe(async response => {
        this.GetProfessionalService();
        this.MessageFlag="Professional Service Status Updated";
        this.commonMessage();
      });
  }
}
