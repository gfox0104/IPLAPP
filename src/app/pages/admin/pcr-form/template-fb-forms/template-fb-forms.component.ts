import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { IplAppModalContent } from 'src/app/components';
import { PCR_FormTypesEnum } from 'src/app/models/pcr-form-type-enum';
import { DropdownModel } from 'src/app/pages/models/dropdown-model';
import { TaskConfigurationServices } from '../../Client-configuration/task-configuration/task-configuration.service';
import { formsMasterModel, TmpFbFormModel } from '../forms-master.model';
import { FormsMasterServices } from '../forms-master.service';

@Component({
  selector: 'app-template-fb-forms',
  templateUrl: './template-fb-forms.component.html',
  styleUrls: ['./template-fb-forms.component.scss']
})
export class TemplateFbFormsComponent implements OnInit {
  gridData: any[];
  tmpFbFormModelObj: TmpFbFormModel = new TmpFbFormModel();
  tmpFbFormModelSaveObj: TmpFbFormModel = new TmpFbFormModel();
  MessageFlag: string;
  public state: State = {};
  isLoading = false; // buttom loading..
  button = "Save"; // buttom loading..
  public drpWTList: Array<string>;
  public defaultWTItem: { Work_Type_Name: string, Work_Type_Cat_pkeyID: number } = { Work_Type_Name: 'Select', Work_Type_Cat_pkeyID: 0 };
  DropdownModelObj: DropdownModel = new DropdownModel();
  wtList = [];
  fbFormList = []
  pcrFormTypeEnum=PCR_FormTypesEnum;
  selectedFormObject:any;
  constructor(
    private xModalService: NgbModal,
    private xRouter: Router,
    private formsMasterServices: FormsMasterServices,
    private xTaskConfigurationServices: TaskConfigurationServices,

  ) { }

  ngOnInit(): void {
    this.GetDropDownData();
  }

  clickBack() {
    this.xRouter.navigate(['/home/forms/menu']);

  }
  async GetFBFormTemplateData() {
    await this.formsMasterServices.GetAdminFormList(1,4).subscribe(res => {
      if (res[0].length > 0) {
        this.state.take = 15;
        this.state.skip = 0;
        this.gridData = res[0];
      }
      else {
        this.state.take = 15;
        this.state.skip = 0;
        this.gridData = [];
      }
    });
  }

  async checkChange(event: any, FormId: number, fieldType: number) {
    ////dfebugger
    //console.log('clicked id', event.target.value);
    //console.log('clicked id', event + FormId);

    this.tmpFbFormModelObj.Fb_Dynamic_pkeyID = FormId;
    this.tmpFbFormModelObj.Type = fieldType;

    this.formsMasterServices.UpdateFBFormStatus(this.tmpFbFormModelObj)
      .subscribe(res => {
        this.MessageFlag = "Status updated successfully..!";
        this.commonMessage();
        this.GetFBFormTemplateData();
      });

  }

  viewFormByID(formName) {
    //debugger;

    if (formName == "Grass") {
      this.xRouter.navigate(['/home/forms/fb-pcr-form/grass-form']); // Grass
    }
    else if (formName == "Preservation") {
      this.xRouter.navigate(['/home/forms/fb-pcr-form/preservation-form']); // Grass
    }
    else {
      return;
    }


  }

  ViewFormInModel(content,formObject) {
    this.selectedFormObject=formObject;
    this.xModalService.open(content, { windowClass: 'xlModal' });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  GetDropDownData() {
    this.DropdownModelObj.Type = 2;
    this.xTaskConfigurationServices
      .GetTaskConfigurationDropDown(this.DropdownModelObj)
      .subscribe(response => {
        // debugger;
        //console.log("resp damage", response);

        this.wtList = response[1];
        this.drpWTList = this.wtList;

        this.GetFBFormTemplateData();
      });
  }

  wtFormButton() {
    ////dfebugger
    this.button = "Processing..";
    this.isLoading = true;

    this.fbFormList = [];
    this.gridData.forEach(element => {
      this.tmpFbFormModelSaveObj = new TmpFbFormModel();
      this.tmpFbFormModelSaveObj.Fb_Dynamic_pkeyID = element.Fb_Dynamic_pkeyID;
      this.tmpFbFormModelSaveObj.Fb_Dynamic_Tab_Name = element.Fb_Dynamic_Tab_Name;
      this.tmpFbFormModelSaveObj.Fb_Dynamic_Office_Results = element.Fb_Dynamic_Office_Results;
      this.tmpFbFormModelSaveObj.Fb_Dynamic_FieldResults = element.Fb_Dynamic_FieldResults;
      this.tmpFbFormModelSaveObj.Fb_Dynamic_IsActive = element.Fb_Dynamic_IsActive;
      this.tmpFbFormModelSaveObj.Fb_Dynamic_WorkTypeId = element.Fb_Dynamic_WorkTypeId;
      this.fbFormList.push(this.tmpFbFormModelSaveObj);

    });

    this.formsMasterServices
      .PostFbDynamicDetail(this.fbFormList)
      .subscribe(response => {
        ////dfebugger;
        this.button = "Save";
        this.isLoading = false;
        //console.log("resp task", response);
        this.fbFormList = []
        this.MessageFlag = "Template Form saved...!";
        this.commonMessage();
        this.isLoading = false;
        this.GetFBFormTemplateData();
      });
  }

  workTypeFilter(value) {
    if (value != '') {
      this.drpWTList = this.wtList.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    else {
      this.drpWTList = this.wtList.slice();
    }
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xModalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'OK';
    modalRef.result.then(result => { }, reason => {
    });
  }

}
