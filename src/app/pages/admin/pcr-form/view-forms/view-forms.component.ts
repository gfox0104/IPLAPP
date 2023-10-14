import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import { FormsMasterServices } from '../forms-master.service'
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { formsMasterModel, importFormModel } from '../forms-master.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkOrderDrodownServices } from 'src/app/services/util/dropdown.service';
import { IplAppModalContent } from 'src/app/components';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CustomFormFilters } from 'src/app/components/iplapp-filter-form/user-filter-form';
import { NgxSpinnerService } from "ngx-spinner";
import { UntypedFormGroup } from '@angular/forms';
import { Buttons } from '../../custom-photo-label/constants/buttons';
import { DropdownModel } from 'src/app/pages/models/dropdown-model';



@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.scss']
})
export class ViewFormsComponent implements OnInit {
  noData: boolean = true;
  gridData: any[];
  button = "Save";
  isLoading = false;
  inputelement: any;
  imrtFromList: any;
  formUsrCommonGroup: UntypedFormGroup;
  //formFields = FormFields;
  buttons = Buttons;
  //button: string;
  CustomFormFilters = CustomFormFilters;
  importFormModelObj: importFormModel = new importFormModel();
  MessageFlag: string;
  formsMasterModelObject: formsMasterModel = new formsMasterModel();
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  isFileSelected = false;
  isFileInValid = false;
  public state: State = {};
  userfilterlst: any;
  isHelpActive = false;
  isEditDisable: boolean;
  public
  @ViewChild('photoLableGroupForm') photoLableGroupForm: ElementRef;
  addForm: any;
  userlist: any;
  constructor(private modalService: NgbModal,
    private formsMasterServices: FormsMasterServices,
    private EncrDecr: EncrDecrService,
    private xRouter: Router,
    private spinner: NgxSpinnerService,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getFormsMasterData();
    this.getautoUserdata();
  }

  async getFormsMasterData() {
    //debugger
    await this.formsMasterServices.GetformsMaster(1).subscribe(res => {
      // console.log('sun1',res)

      if (res[0].length > 0)
      {
        this.gridData = res[0];
        console.log('this.gridData',this.gridData);
        this.noData = false;
      }
      else
      {
        this.noData = true;
      }

      if (res.length > 1)
      { this.formsMasterModelObject = new formsMasterModel();

        this.formsMasterModelObject.FormAddedby= res[1][0].Form_Filter_FormAddedby
        this.formsMasterModelObject.Form_IsActive=res[1][0].Form_Filter_FormIsActive
        this.formsMasterModelObject.FieldResults = res[1][0].Form_Filter_FormIsFieldResult
        this.formsMasterModelObject.OfficeResults = res[1][0].Form_Filter_FormIsOfficeResult
        this.formsMasterModelObject.Published= res[1][0].Form_Filter_FormIsPublished
        this.formsMasterModelObject.IsRequired= res[1][0].Form_Filter_FormIsRequired
        this.formsMasterModelObject.FormName= res[1][0].Form_Filter_FormName
        this.formsMasterModelObject.Form_CreatedBy= res[1][0].Form_CreatedBy
        this.formsMasterModelObject.Form_ModifiedBy= res[1][0].Form_ModifiedBy
        if(res[1][0].Form_Filter_FormVersion ==0)
        {
          this.formsMasterModelObject.Form_Version_No = null

        }
        else
        {
          this.formsMasterModelObject.Form_Version_No= res[1][0].Form_Filter_FormVersion
        }



      }
    });
    this.spinner.hide();
  }

  // this code selected event row
  viewFormByID(formId) {
    localStorage.setItem('chkform',"");
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', formId);
    this.xRouter.navigate(["home/forms/edit-form/", btoa(encrypted)]);
    return
  }

  async DeleteForm(formId) {
    //debugger
    ////dfebugger
    var cfrm = confirm("Are you Sure you want to delete this Record...!");
    if (cfrm == true) {

      await this.formsMasterServices.DeleteForm(formId).subscribe(res => {
        ////dfebugger
        //debugger
        this.getFormsMasterData();
      });
    }

  }

  async CopyForm(formId) {

    await this.formsMasterServices.CopyForm(formId).subscribe(res => {
      this.MessageFlag = "Form copy successfully..!";
      this.commonMessage();
      this.getFormsMasterData();
    });
  }

  async checkChange(event: any, FormId: number, fieldType: number) {
    ////dfebugger



    this.formsMasterModelObject;
    this.formsMasterModelObject.FormId = FormId;
    this.formsMasterModelObject.Type = 1;



    this.formsMasterServices.PostUpdateFormStatus(FormId, fieldType)

      .subscribe(res => {

        this.getFormsMasterData();

      });

  }

  clickBack() {
    this.xRouter.navigate(['/home/forms/menu']);

  }

  async uploadfiledoc(documentInput: any) {
    //debugger;
    this.inputelement = documentInput.target.files[0];
    this.importFormModelObj.Imtr_File = await this.readDoc(this.inputelement);
    //console.log(this.importFormModelObj.Imtr_File);
  }

  docsupload(importForm) {
    this.GetDropdownValue();
    this.modalService.open(importForm);
  }

  GetDropdownValue() {
    this._drpdownmodelObj.Type=1;  //change by sandip
    this.xWorkOrderDrodownServices.DropdownGetWorkOrder(this._drpdownmodelObj).subscribe(response => {
      //console.log('drdlst', response)
      this.imrtFromList = response[12];
    });
  }

  formButton() {
    // debugger;
    this.isLoading = true;
    this.button = "Processing";

    let errCnt = 0;
    if (this.inputelement == '' || this.inputelement == undefined) {
      this.isFileSelected = true;
      errCnt++;
    }
    else {
      this.isFileSelected = false;
      var fileExt = this.inputelement.name.split('.').pop();
      if (fileExt != "json") {
        errCnt++;
        this.isFileInValid = true;
      }
      else{
        this.isFileInValid = false;
      }
    }
    if (errCnt > 0) {
      this.isLoading = false;
      this.button = "Save";
    }
    else {
      this.importFormModelObj.Imtr_FileName = this.inputelement.name;
      this.importFormModelObj.Type = 1;
      this.formsMasterServices
        .ImportPCRFormData(this.importFormModelObj)
        .subscribe(response => {
          // debugger
          this.isLoading = false;
          this.button = "Save";
          this.MessageFlag = "Import form saved..!";
          this.commonMessage();
          this.importFormModelObj = new importFormModel();
          this.getFormsMasterData();
        });
    }
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'OK';
    modalRef.result.then(result => { }, reason => {
      if (!this.isHelpActive) {
        this.modalService.dismissAll();
      }
    });
  }
  public readDoc(file) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = () => {
        resolve(fr.result);
      }

      fr.readAsText(file);
    });
  }

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
    //debugger
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }



Reset(){
//debugger
this.formsMasterModelObject.FormName= '';
this.formsMasterModelObject.FormId = 0;
this.getFormsMasterData();
}


 filterCall() {

  this.spinner.show();
  this.formsMasterModelObject.Type = 6;
  this.formsMasterServices.GetformsMasterFilter(this.formsMasterModelObject).subscribe(res => {

    if (res.length > 0)
    {
      this.gridData = res[0];
      // console.log('this.gridData',this.gridData);
      this.noData = false;
    }
    else
    {
      this.gridData = res[0];
      this.noData = true;
    }
  });
  this.spinner.hide();
}


clearData() {

  this.formsMasterModelObject = new formsMasterModel();

  this.formsMasterModelObject.Type = 5;
  this.formsMasterServices.AddFilterFormMaster(this.formsMasterModelObject).subscribe(res => {

    if (res.length > 0)
    {
      this.noData = false;
      this.MessageFlag = "Filter Data Cleared successfully";
      this.commonMessage();
      this.getFormsMasterData();
    }

  });

}

saveFilterData() {
  //debugger
  this.formsMasterModelObject.Type = 1;
  this.formsMasterServices.AddFilterFormMaster(this.formsMasterModelObject).subscribe(res => {

    if (res.length > 0)
    {
      this.MessageFlag = "Filter Data Saved Sucessfully";
      this.commonMessage();
      this.filterCall();
    }

  });
}

checkButtonEvent(event,content) {
  //debugger
  if (event === 'Create Form') {
    this.isEditDisable = false;
    this.formsMasterModelObject = new formsMasterModel();
    this.modalService.open(content,{ size: 'md' });
    this.formUsrCommonGroup.enable();
  } else {
    this.modalService.open(this.addForm);
  }
}



//for filter added by unnati
getautoUserdata() {
  this.formsMasterServices.ViewUserData()
    .subscribe(response => {
      this.CustomFormFilters[1].data = response[0];

      // console.log('testy',this.CustomFormFilters);
    });
}

SaveForm(){
  // debugger
  this.xRouter.navigate(["home/forms/new-form/"]);
}

}

//for filter in form list


