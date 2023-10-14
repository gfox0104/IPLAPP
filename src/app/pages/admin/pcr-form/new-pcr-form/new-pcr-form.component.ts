import { Component, OnInit } from '@angular/core';
import { Buttons } from './constants/buttons';
import { Button } from '@progress/kendo-angular-buttons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { FormsMasterServices } from "../forms-master.service";
import { formDocumentModel, formsMasterModel } from "../forms-master.model";
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { InputField } from './input-field';
import { async } from '@angular/core/testing';
import { ClientResultOldPhotoServices } from 'src/app/pages/client-result/client-result-photo/client-result-photo-old.service';
import { BindDataModel } from 'src/app/pages/client-result/client-result/client-result-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { Console, debug } from 'console';

@Component({
  selector: 'app-new-pcr-form',
  templateUrl: './new-pcr-form.component.html',
  styleUrls: ['./new-pcr-form.component.scss']
})
export class NewPcrFormComponent implements OnInit {

  uploadSaveUrl = BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground";
  uploadRemoveUrl = "removeUrl";
  myFiles: string[] = [];
  selectedWOItems: any[] = [];
  selectedWorkTypeItems: any[] = [];
  selectedWorkTypeGroupItems: any[] = [];
  selectedCustomerItems: any[] = [];
  selectedLoanItems: any[] = [];
  formId: number = 0;
  buttons = Buttons;
  addQuestionForm: UntypedFormGroup;
  formsMaster: UntypedFormGroup;
  workOrderFilter: UntypedFormArray;
  options: UntypedFormArray;
  dropdownSettings = {};
  dropdownSettingsWorkType = {};
  dropdownSettingsGroup = {};
  dropdownSettingsCustomer = {};
  dropdownSettingsLoanType = {};
  dropdownListCompany: any[];
  dropdownListWorkType: any[];
  dropdownListGroup: any[];
  dropdownListCustomer: any[];
  dropdownListLoanType: any[];
  isHelpActive = false;
  MessageFlag: String;
  isSubmitted: boolean;

  formsMasterModelObject: formsMasterModel = new formsMasterModel();
  formPublishObj: formsMasterModel = new formsMasterModel();
  isLoading: boolean = false;
  formName: string = "Create";
  formNameValue:string;
  formVeriosnValue: number;
  button = "Save"; // buttom loading..
  isdisable = false;
  //question master start from here
  questionMaster: UntypedFormGroup;
  dropdownListQuestionInputs: any[];
  questionAddAtList: any[] = []
  questionType: number;
  textAreaWidth: string;
  textAreaHeight: string;
  textBoxSize: string;
  id: any;
  questionList: any[] = [];

  isQueLoading = false; // buttom loading..
  queButton = "Save"; // buttom loading..
  optionList: InputField[] = [];

  documentdetailslst:any=[];
  formDocumentModelObj: formDocumentModel = new formDocumentModel();
  formDocStatusObj: formDocumentModel = new formDocumentModel();
  BindDataModelObj: BindDataModel = new BindDataModel();
  isFormPublish = false;
  drpPDFFieldArray: any[];
  actionRuleList: any[] = [];
  fieldRuleList: any[] = [];
  fieldformversionList = [];
  invalidFormName = false;
  invalidFormNo = false;

  constructor(private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private questionFormBuilder: UntypedFormBuilder,
    private formsMasterServices: FormsMasterServices,
    private xRouter: Router,
    private xmodalService: NgbModal,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private spinner: NgxSpinnerService,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices) {
    this.id = this.xRoute.snapshot.params['id'];

    //this.id= this.xRoute.paramMap['id'];
    this.modalService.dismissAll();
  }


  async ngOnInit() {
    // debugger

    this.isLoading = true;
    if (this.id) {

      var valueid = localStorage.getItem('chkform')
      if (valueid != "")
      {
        this.id = valueid
      }
      else
      {

        this.spinner.show();
        this.id = this.EncrDecr.get('123456$#@$^@1ERF', atob(this.id));

      }
      this.formId = this.id;
      //console.log("formid", this.formId);
      await this.getIPLDropdownData();
      this.formName = "Edit";
      this.button = "Update";
    }


    else
    {
      this.createForm('', '', '0', '0', '0', '0','','0');
      await this.getIPLDropdownData();
    }

    // this setting for multiple drop down select values
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Client_pkeyID',
      textField: "Client_Company_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this setting for multiple drop down select values
    this.dropdownSettingsWorkType = {
      singleSelection: false,
      idField: "WT_pkeyID",
      textField: "WT_WorkType",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this setting for multiple drop down select values
    this.dropdownSettingsGroup = {
      singleSelection: false,
      idField: "Work_Type_Cat_pkeyID",
      textField: "Work_Type_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this setting for multiple drop down select values
    this.dropdownSettingsCustomer = {
      singleSelection: false,
      idField: "Cust_Num_pkeyId",
      textField: "Cust_Num_Number",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this setting for multiple drop down select values
    this.dropdownSettingsLoanType = {
      singleSelection: false,
      idField: "Loan_pkeyId",
      textField: "Loan_Type",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.isLoading = false;
  }

  async getIPLDropdownData() {
    this.formsMasterServices.GetIPLDropdowmnData(this.id).subscribe(response => {
      // debugger;
      this.dropdownListCompany = response[0] ? response[0] : [];
      this.dropdownListWorkType = response[1] ? response[1] : [];
      this.dropdownListLoanType = response[2] ? response[2] : [];
      this.dropdownListCustomer = response[3] ? response[3] : [];
      this.dropdownListGroup = response[4] ? response[4] : [];
      this.dropdownListQuestionInputs = response[5] ? response[5] : [];
      this.drpPDFFieldArray = response[6] ? response[6] : [];
      if (this.id) {
        this.loadFormData(this.id);
        this.GetFormDocumentDetail()
      }
    });
  }


  previewFormByID(id) {
    if(id==0)
    {
      var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.formId);
      this.xRouter.navigate(["home/forms/preview/", btoa(encrypted)]);
      return
    }
    else
    {
      var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', id);
      this.xRouter.navigate(["home/forms/preview/", btoa(encrypted)]);
      return
    }

  }



  closeModal() {
    this.modalService.dismissAll();
  }

  addEditQuestion(content) {
    //debugger
    this.modalService.open(content);

    this.questionAddAtList.push({ questionId: '0', question: 'At the Start' });
    this.questionList.forEach(q => {
      this.questionAddAtList.push({ questionId: q.QuestionId, question: q.Question });
    });
    this.questionAddAtList.push({ questionId: '-1', question: 'At the End' });
    this.createQuestionForm('', '', '', '-1','','', true, true, true, true, '0', true, true);
  }

  createQuestionForm(questiontype?: string, question?: string, instruction?: string, insertAfter?: string,Que_Photo_Label_Name?: string,Que_Photo_min_count?: string, show?: boolean,
    officResult?: boolean, required?: boolean, fieldResults?: boolean, clonePrev?: string, isActive?: boolean, switchCamera?: boolean,
    textAreaHeight?: string, textAreaWidth?: string, textBoxSize?: string, questionpdfField?: string) {
    this.questionMaster = this.questionFormBuilder.group({
      questionType: [questiontype || '', [Validators.required]],
      question: [question || '', [Validators.required]],
      instruction: [instruction || '', [Validators.required]],
      insertAfter: [insertAfter || ''],
      Que_Photo_Label_Name: [Que_Photo_Label_Name || '', [Validators.required]],
      Que_Photo_min_count: [Que_Photo_min_count || ''],
      show: [show || ''],
      officeResults: [officResult || ''],
      Required: [required || ''],
      fieldResults: [fieldResults || ''],
      clonePrev: [clonePrev || ''],
      isActive: [isActive || ''],
      switchCamera: [switchCamera || ''],
      textAreaHeight: [textAreaHeight || ''],
      textAreaWidth: [textAreaWidth || ''],
      textBoxSize: [textBoxSize || ''],
      questionpdfField: [questionpdfField || ''],
      Options: this.questionFormBuilder.array([this.createOption()])
    })
  }
  createOption() {
    return this.questionFormBuilder.group({
      OptionName: ['']
    })
  }

  createForm(formName?: string, formId?: string, IsRequired?: string, OfficeResults?: string, FieldResults?: string, Form_IsActive?: string, formNumber?: string,Form_IsAutoAssign?: string) {
    //debugger
    this.formsMaster = this.formBuilder.group({
      formName: [formName || '', [Validators.required]],
      formId: [formId || ''],
      IsRequired: [IsRequired || ''],
      OfficeResults: [OfficeResults || ''],
      FieldResults: [FieldResults || ''],
      Form_IsActive: [Form_IsActive || ''],
      Form_IsAutoAssign: [Form_IsAutoAssign || ''],
      formNumber: [formNumber || ''],
      workOrderFilters: this.formBuilder.array([this.createWorkOrderFilter()])
    })
  }

  createWorkOrderFilter() {
    return this.formBuilder.group({
      FiltersCompany: [''],
      FiltersWorkType: [''],
      FiltersWorkTypeGroup: [''],
      FiltersCustomer: [''],
      FiltersLoanType: [''],
    })
  }

  addNewWorkOrderFilter() {
    //this.isLoading = true;
    this.workOrderFilter = this.formsMaster.get('workOrderFilters') as UntypedFormArray;
    this.workOrderFilter.push(this.createWorkOrderFilter());
    // this.isLoading = false;
  }

  setWOList(woFilterList) {
    this.formsMaster.controls['workOrderFilters'] = this.formBuilder.array(
      woFilterList.map(
        i => this.formBuilder.group({
          FiltersCompany: [i.FiltersCompany],
          FiltersWorkType: [i.FiltersWorkType],
          FiltersWorkTypeGroup: [i.FiltersWorkTypeGroup],
          FiltersCustomer: [i.FiltersCustomer],
          FiltersLoanType: [i.FiltersLoanType]
        })
      )
    )
    this.formsMaster.controls['workOrderFilters'].updateValueAndValidity();

  }

  onSubmit() {
    //debugger
    this.invalidFormName = false;
    this.invalidFormNo = false;

    this.isLoading = true;
    let data = this.formsMaster.controls;
    // stop here if form is invalid
    if (this.formsMaster.invalid) {
      this.isLoading = false;
      if (data.formName.value === "") {
        this.invalidFormName = true;
      }
      if (data.formNumber.value === "") {
        this.invalidFormNo = true;
      }
      return;
    }
    else if (data.formNumber.value === "") {
      this.isLoading = false;
      this.invalidFormNo = true;
      return;
    }
    else {
      this.isdisable = false;

      this.formsMasterModelObject;
      this.formsMasterModelObject.FieldResults = data.FieldResults.value ? data.FieldResults.value == '1' ? true : false : false;;
      this.formsMasterModelObject.FormName = data.formName.value;
      this.formsMasterModelObject.FormNumber_Id = data.formNumber.value;
      this.formsMasterModelObject.Form_IsActive = data.Form_IsActive.value ? data.Form_IsActive.value == '1' ? true : false : false;
      this.formsMasterModelObject.IsRequired = data.IsRequired.value ? data.IsRequired.value == '1' ? true : false : false;
      this.formsMasterModelObject.OfficeResults = data.OfficeResults.value ? data.OfficeResults.value == '1' ? true : false : false;
      this.formsMasterModelObject.Form_IsAutoAssign = data.Form_IsAutoAssign.value ? data.Form_IsAutoAssign.value == '1' ? true : false : false;
      this.formsMasterModelObject.Type = this.formId > 0 ? 2 : 1;
      if (this.formId > 0) {
        this.formsMasterModelObject.FormId = Number(this.formId);
      }
      this.formsMasterModelObject.WO_Filters = data.workOrderFilters.value;

      this.formsMasterServices.PostFormsMasterData(this.formsMasterModelObject).subscribe(response => {
        this.isLoading = false;

        this.isdisable = false;
        this.button = "Update";
        var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', response[0]);


        this.MessageFlag = "Form Saved!";
        this.isSubmitted = true;
        this.commonMessage(true, "home/forms/view-forms");




      });
    }

  }

  async loadFormData(formId) {

// debugger
    await this.formsMasterServices.GetformsMaster(2, formId).subscribe(res => {

      // console.log('loadFormData', res);

      if (res.length > 0) {


        //binding form data
        if (res[0].length > 0) {
          localStorage.setItem('chkform',res[0][0].FormId);
          this.id = res[0][0].FormId;
          this.formId = res[0][0].FormId;
          this.isFormPublish = res[0][0].Form_IsPublished;
        }

        let woFilterObj: any = {};
        (res[0].length > 0 ?

          this.createForm(res[0][0].FormName, '', (res[0][0].IsRequired == true ? '1' : '0'), (res[0][0].OfficeResults == true ? '1' : '0'), (res[0][0].FieldResults == true ? '1' : '0'), (res[0][0].Form_IsActive == true ? '1' : '0'), res[0][0].FormNumber_Id,(res[0][0].Form_IsAutoAssign == true ? '1' : '0'))
          : this.createForm('', '', '0', '0', '0', '0', '','0'));
        (res[1].length > 0 ?
          this.setWOList(res[1]) : []);
        //binding company selected array
        (res[1].length > 0 ?
          res[1].forEach(element => {
            woFilterObj = new Object();
            woFilterObj.WO_FilterId = element.WO_FilterId;
            woFilterObj.selectedCompanyItems = [];
            if (element.FiltersCompany != null) {
              element.FiltersCompany.forEach(cmp => {
                if (cmp.Client_pkeyID) {
                  woFilterObj.selectedCompanyItems.push(
                    { Client_pkeyID: cmp.Client_pkeyID, Client_Company_Name: this.dropdownListCompany.filter(x => x.Client_pkeyID == cmp.Client_pkeyID)[0].Client_Company_Name }
                  );
                }
              });
            }
            woFilterObj.selectedWorkTypeItems = [];
            if (element.FiltersWorkType != null) {
              element.FiltersWorkType.forEach(wt => {
                if (wt.WT_pkeyID != 0) {
                  woFilterObj.selectedWorkTypeItems.push(
                    { WT_pkeyID: wt.WT_pkeyID, WT_WorkType: this.dropdownListWorkType.filter(x => x.WT_pkeyID == wt.WT_pkeyID)[0]?.WT_WorkType }
                  );
                }
              });
            }
            woFilterObj.selectedCustomerItems = [];
            if (element.FiltersCustomer != null) {
              element.FiltersCustomer.forEach(wt => {
                if (wt.Cust_Num_pkeyId != 0) {
                  woFilterObj.selectedCustomerItems.push(
                    { Cust_Num_pkeyId: wt.Cust_Num_pkeyId, Cust_Num_Number: this.dropdownListCustomer.filter(x => x.Cust_Num_pkeyId == wt.Cust_Num_pkeyId)[0]?.Cust_Num_Number }
                  );
                }
              });
            }
            woFilterObj.selectedWorkTypeGroupItems = [];
            if (element.FiltersWorkTypeGroup != null) {
              element.FiltersWorkTypeGroup.forEach(wt => {
                if (wt.Work_Type_Cat_pkeyID != 0) {
                  woFilterObj.selectedWorkTypeGroupItems.push(
                    { Work_Type_Cat_pkeyID: wt.Work_Type_Cat_pkeyID, Work_Type_Name: this.dropdownListGroup.filter(x => x.Work_Type_Cat_pkeyID == wt.Work_Type_Cat_pkeyID)[0]?.Work_Type_Name }
                  );
                }
              });
            }
            woFilterObj.selectedLoanItems = [];
            if (element.FiltersLoanType != null) {
              element.FiltersLoanType.forEach(wt => {
                if (wt.Loan_pkeyId != 0) {
                  woFilterObj.selectedLoanItems.push(
                    { Loan_pkeyId: wt.Loan_pkeyId, Loan_Type: this.dropdownListLoanType.filter(x => x.Loan_pkeyId == wt.Loan_pkeyId)[0]?.Loan_Type }
                  );
                }
              });
            }
            this.selectedWOItems.push(woFilterObj);
          })
          :
          this.selectedWOItems = []
        );
        (this.questionList = res[2] && res[2].length > 0 ? res[2] : []);
        (this.actionRuleList = res[3] && res[3].length > 0 ? res[3] : []);
        (this.fieldRuleList = res[4] && res[4].length > 0 ? res[4] : []);

        this.fieldformversionList = res[5];
      //  console.log('frmdata',this.fieldformversionList);
      //  console.log('QUESTIUON LIST',this.questionList);

      }
      else {
        this.createForm('', '', '0', '0', '0', '0','','0');
      }

      this.formsMaster.disable();
      this.IsEditDisable = true;
    })
    this.spinner.hide();
  }

  IsEditDisable = false;
  EditForms() {
    // debugger
    this.IsEditDisable = false;
    this.isLoading = false;
    this.formsMaster.enable();
  }

  EditQuestion(questionId) {
    //debugger
    //console.log('questionId', questionId);
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', questionId);
    this.xRouter.navigate(["home/forms/edit-question/", btoa(encrypted)]);
  }

  async deleteFilter(index, filterItem) {
    var cfrm = confirm('Are you sure you want to delete this record...!');
    if (cfrm == true) {

      if (filterItem != undefined && filterItem.WO_FilterId != 0) {
        await this.formsMasterServices.DeleteFilter(filterItem.WO_FilterId).subscribe(res => {
          let wo_filters_list = this.formsMaster.get('workOrderFilters') as UntypedFormArray;
          wo_filters_list.removeAt(index);
          this.selectedWOItems.splice(index, 1);

        });
      }
      else {
        let wo_filters_list = this.formsMaster.get('workOrderFilters') as UntypedFormArray;
        wo_filters_list.removeAt(index);
      }
    }
  }

  redirectToList() {
    this.xRouter.navigate(["home/forms"]);
  }

  async submitQuestion() {
    // debugger

    // if(this.questionList.length>0)
    // {
    //   this.questionList.filter(x=>x.)
    // }
    this.isQueLoading = true;
    this.queButton = "Processing";
    // stop here if form is invalid

    if (this.questionMaster.invalid) {
      this.isQueLoading = false;
      this.queButton = "Save";
      this.MessageFlag = "Please fill all required Fields..!";
      this.popupMessage();
      return;
    }
    let formData = this.questionMaster.controls;
    let questionMasterData: any = {};

    //debugger
    questionMasterData.Question = formData.question.value;
    questionMasterData.QuestionTypeId = Number(formData.questionType.value);
    questionMasterData.Instructions = formData.instruction.value;
    questionMasterData.Que_Photo_Label_Name = formData.Que_Photo_Label_Name.value;
    questionMasterData.Que_Photo_min_count = formData.Que_Photo_min_count.value;
    questionMasterData.Que_Show = formData.show.value;
    questionMasterData.Que_OfficeResults = formData.officeResults.value;
    questionMasterData.Que_Required = formData.Required.value;
    //questionMasterData.Que_Alert = formData.Que_Alert.value;
    questionMasterData.Que_FieldResults = formData.fieldResults.value;
    questionMasterData.Que_ClonePrevAnswer = formData.clonePrev.value;
    questionMasterData.Que_IsActive = formData.isActive.value;
    questionMasterData.Que_Camera = formData.switchCamera.value;
    questionMasterData.SequenceNo = Number(formData.insertAfter.value);
    questionMasterData.QueType_IsMultiple = false;
    questionMasterData.Que_PdfFiels = Number(formData.questionpdfField.value);

    if (this.questionType == 2) {
      questionMasterData.TextAreaWidth = Number(formData.textAreaWidth.value);
      questionMasterData.TextAreaHeight = Number(formData.textAreaHeight.value);
    }
    if (this.questionType == 5) {
      questionMasterData.TextBoxSize = Number(formData.textBoxSize.value);
    }
    if (this.questionType == 1 || this.questionType == 3 || this.questionType == 4) {
      questionMasterData.Options = formData.Options.value;
      questionMasterData.QueType_IsMultiple = true;
    }
    questionMasterData.Type = 1;
    questionMasterData.FormId = Number(this.formId);


    await this.formsMasterServices.PostQuestionMasterData(questionMasterData).subscribe(response => {

      //debugger
      this.isQueLoading = false;
      this.queButton = "Save";
      this.MessageFlag = "Question Added successfully..!";
      this.isSubmitted = true;
      this.commonMessage(false, '');
      this.loadFormData(this.formId);
      this.EditForms();
    });

  }

  // common message modal popup
  commonMessage(redirect: boolean, url: string) {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'OK';
    modalRef.result.then(result => { }, reason => {
      this.xmodalService.dismissAll();
      if (redirect) {
        this.xRouter.navigate([url]);
      }
    });
  }

  onQuestionTypeChange() {
    //debugger
    this.optionList = [];
    if (this.questionType == 1 || this.questionType == 3 || this.questionType == 4) {
      //this.addOptionField();
    }
  }
  //dynamic option add
  addOptionField() {

    //debugger
    this.options = this.questionMaster.get('Options') as UntypedFormArray;
    this.options.push(this.createOption());

  }

  refreshForm() {
    this.questionMaster.addControl('optionList', this.formBuilder.array([this.optionList.forEach(input => {
      this.questionMaster.addControl(input.formControlName, this.formBuilder.control(''));
    })
    ])
    )
  }
  removeOptionField(inputField: InputField) {
    this.optionList = this.optionList.filter(field => field !== inputField);
    this.refreshForm();
  }

  updateCheckedOptions(option, questionId, e) {

    //debugger
    let obj: any = {};
    obj.UpdateField = option;
    obj.Status = e.currentTarget.checked;
    obj.QuestionId = questionId;
    obj.Type = 1;
    this.formsMasterServices.UpdateQuestionData(obj).subscribe(response => {
      ////dfebugger
    });
    ////dfebugger
  }



  deleteQuestion(questionId) {
    //debugger
    var cfrm = confirm("Are you Sure you want to delete this Record...!");
    if (cfrm == true) {
      let obj: any = {};

      obj.UpdateField = 'Delete';
      obj.Status = '';
      obj.QuestionId = questionId;
      obj.Type = 1;
      this.formsMasterServices.UpdateQuestionData(obj).subscribe(response => {
        ////dfebugger
        this.formsMasterServices.GetformsMaster(2, this.formId).subscribe(res => {
          ////dfebugger
          if (res.length > 0) {
            //binding form data
            this.questionList = res[2] && res[2].length > 0 ? res[2] : [];
          }
          else {

          }
          this.formsMaster.disable();
          this.IsEditDisable = true;
        })


      });
    }
  }
  clickBack() {
    this.xRouter.navigate(['/home/forms/view-forms']);

  }
  ChangeInstruction() {
    //debugger
    let formData = this.questionMaster.controls;
    this.questionMaster.patchValue({ instruction: formData.question.value });
    this.questionMaster.patchValue({ Que_Photo_Label_Name: formData.question.value });

  }
  popupMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  docsupload(DocmentUpload) {
    this.POPUPPhoto(DocmentUpload);
    this.GetFormDocumentDetail();
  }
  POPUPPhoto(DocmentUpload) {
    this.modalService
      .open(DocmentUpload, { windowClass: "xlModal" })
      .result.then(
        result => {
        },
        reason => {

        }
      );
  }


  public displayErrorDocument(e: ErrorEvent) {
  }

  public displaySuccessDocument(e) {
    //debugger
    if (e.operation == "upload") {
      this.processDocument(e.files[0].rawFile);
    } else {
      alert("remove img called");
    }
  }
  processDocument(documentInput) {
    //debugger
    if (true) {

      this.BindDataModelObj.Common_pkeyID = 0;
      this.BindDataModelObj.Client_Result_Photo_Ch_ID = this.id;
      this.BindDataModelObj.Client_Result_Photo_ID = 0;
      this.BindDataModelObj.Client_PageCalled = 10;
      this.BindDataModelObj.documentx = documentInput;
      this.BindDataModelObj.Client_Result_Photo_FileName = documentInput.name;
      this.BindDataModelObj.Type = 1;
      this.xClientResultOldPhotoServices
        .CommonDocumentsUpdate(this.BindDataModelObj)
        .then((res) => {
          res.subscribe(response => {
            //debugger;
            //console.log(response[0][0]);
            this.formsMasterServices
              .AddUpdateQuePDFFieldData(response[0][0])
              .subscribe(resp => {
                this.GetFormDocumentDetail();
              });


          });
        });
    }
  }

  GetFormDocumentDetail() {
    //debugger
    this.formDocumentModelObj.FMFI_FormId = this.id;
    this.formDocumentModelObj.FMFI_Pkey = 0;
    this.formDocumentModelObj.Type = 3;
    this.formsMasterServices
      .GetFormDocumentData(this.formDocumentModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.documentdetailslst = response[0];
        }
        else {
          this.documentdetailslst = [];
        }
      });
  }
  DeleteFormDocument(doc) {
    //debugger
    var cfrm = confirm("Are you Sure you want to delete this Record...!");
    if (cfrm == true) {
      this.formDocumentModelObj.FMFI_FormId = this.id;
      this.formDocumentModelObj.FMFI_Pkey = doc.FMFI_Pkey;
      this.formDocumentModelObj.Type = 4;
      this.formsMasterServices
        .UpdateFormDocumentData(this.formDocumentModelObj)
        .subscribe(response => {
          this.GetFormDocumentDetail();
        });
    }
  }
  async checkChange(fieldType: number) {
//debugger
    this.formPublishObj;
    this.formPublishObj.FormId = this.id;
    this.formPublishObj.Type = 1;
    this.formsMasterServices.PostUpdateFormStatus(this.id, fieldType)
      .subscribe(res => {
        this.MessageFlag = "Form updated successfully..!";
        this.commonMessage(false, '');
        this.isFormPublish = !this.isFormPublish;
      });

  }
  UpdateDocStatus(docId, formId) {
    //debugger
    this.formDocStatusObj.FMFI_FormId = formId;
    this.formDocStatusObj.FMFI_Pkey = docId;
    this.formDocStatusObj.Type = 5;
    this.formsMasterServices
      .UpdateFormDocumentData(this.formDocStatusObj)
      .subscribe(response => {
        this.MessageFlag = "Please map PDF Field with the active document..!";
        this.popupMessage();
        this.GetFormDocumentDetail();
      });
  }

  SetHelpFlag() {

    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.popupMessage();
    }
    else {
      this.MessageFlag = "Item Help mode is off...!";
      this.popupMessage();
    }
  }

  DispalyInfo(event: Event, lblName) {

    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.popupMessage();
    }
  }

}
