import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { FormsMasterServices } from '../forms-master.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {
  isLoading = false;
  questionId: any = 0;
  formsMaster: UntypedFormGroup;
  answersForm: UntypedFormGroup;
  photoRuleForm: UntypedFormGroup;
  alertsForm: UntypedFormGroup;
  fieldRulesForm: UntypedFormGroup;
  actionRulesForm: UntypedFormGroup;
  optionArray: UntypedFormArray;
  photoRuleArray: UntypedFormArray;
  alertsArray: UntypedFormArray;
  fieldRulesArray: UntypedFormArray;
  actionRulesArray: UntypedFormArray;
  actionArray: UntypedFormArray;
  questionData: any;
  questionAddAtList: any[] = []
  Questions: any[] = []
  Options: any[] = [];
  formId: number;
  IsQuestionEditDisable = false;
  IsAnswerEditDisable = false;
  IsPhotoRuleEditDisable = false;
  IsAlertsEditDisable = false;
  IsfieldRuleDisable = false;
  IsActionRuleDisable = false;
  MessageFlag: String;
  response: any;

  QuestionTypeId: number;

  buttonMainEdit = "Save";

  buttonEditQue = "Save";

  buttonEditAnswer = "Save";
  drpPDFFieldArray: any[];
  dropdownListQuestionInputs: any[];

  constructor(
    private formsMasterServices: FormsMasterServices,
    private xRouter: Router,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal) {
    this.questionId = Number(this.EncrDecr.get('123456$#@$^@1ERF', atob(this.xRoute.snapshot.params['id'])));
  }

  async ngOnInit() {
    //debugger
    this.isLoading = true;

    await this.getdataOfEditForm();
    await this.getIPLDropdownData()
    this.isLoading = false;
  }

  IsFormEditDisable = false;
  async EditMainForm() {
//debugger
    if (!this.IsFormEditDisable) {

      this.buttonMainEdit = "Save";
      this.IsFormEditDisable = !this.IsFormEditDisable;
      //this.IsFormEditDisable = true;
      this.isLoading = false;

      this.IsQuestionEditDisable = false;
      this.IsAnswerEditDisable = false;
      this.IsPhotoRuleEditDisable = false;
      this.IsAlertsEditDisable = false;
      this.IsfieldRuleDisable = false;
      this.IsActionRuleDisable = false;

      if (this.formsMaster != undefined) {
        this.formsMaster.enable();
      }

      if (this.answersForm != undefined) {
        this.answersForm.enable();
      }
      if (this.photoRuleForm != undefined) {
        this.photoRuleForm.enable();
      }
      if (this.alertsForm != undefined) {
        this.alertsForm.enable();
      }
      if (this.actionRulesForm != undefined) {
        this.actionRulesForm.enable();
      }
      if (this.fieldRulesForm != undefined) {
        this.fieldRulesForm.enable();
      }
    }
    else {
      try {

        this.IsFormEditDisable = !this.IsFormEditDisable;
        this.submitFormMaster();
        if (this.formsMaster != undefined) {
          this.formsMaster.disable();
        }
        if (this.QuestionTypeId == 1 || this.QuestionTypeId == 3 || this.QuestionTypeId == 4) {
          if (this.answersForm != undefined) {
            this.answersForm.disable();
          }
        }
        if (this.photoRuleForm != undefined) {
          this.photoRuleForm.disable();
        }
        if (this.alertsForm != undefined) {
          this.alertsForm.disable();
        }
        if (this.actionRulesForm != undefined) {
          this.actionRulesForm.disable();
        }


      }
      catch
      {
        this.getdataOfEditForm();
      }
    }
  }

  viewFormByID() {
    //debugger
    if (this.formId) {
      var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.formId);
      this.xRouter.navigate(["home/forms/edit-form/", btoa(encrypted)]);
      return
    }
  }

  async submitFormMaster() {
//debugger
    await this.submitAnswer();
    await this.submitPhotoOption();
    await this.submitAlertRules();
    await this.submitActionRules();
    await this.submitFieldRules();
    await this.submitQuestion();

    await this.formsMaster.disable();

    this.questionAddAtList = [];

    if (!this.IsFormEditDisable) {
      // //dfebugger
      this.buttonMainEdit = "Edit";

      this.IsAnswerEditDisable = true;
      this.IsPhotoRuleEditDisable = true;
      this.IsAlertsEditDisable = true;
      this.IsfieldRuleDisable = true;
      this.IsActionRuleDisable = true;
    }
    else {
      this.buttonMainEdit = "Save";
      this.formsMaster.disable();
      //this.IsFormEditDisable = true;
    }
    this.formsMaster.disable();
  }

  async submitQuestion() {

    //debugger
    this.isLoading = true;
    if (this.formsMaster.invalid) {
      this.isLoading = false;
      return;
    }
    else {

      let data = this.formsMaster.controls;
      let formsMasterModelObject: any = new Object();
      formsMasterModelObject.Question = data.question.value;
      formsMasterModelObject.QuestionTypeId = data.questionType.value;
      formsMasterModelObject.Instructions = data.instruction.value;
      formsMasterModelObject.Que_Photo_Label_Name = data.Que_Photo_Label_Name.value;
      formsMasterModelObject.Que_Photo_min_count = data.Que_Photo_min_count.value;
      formsMasterModelObject.Que_Show = data.isShow.value;
      formsMasterModelObject.Que_OfficeResults = data.isOfficeResults.value;
      formsMasterModelObject.Que_Required = data.isRequired.value;
      formsMasterModelObject.Que_FieldResults = data.isFindResults.value;
      formsMasterModelObject.Que_ClonePrevAnswer = data.clonePrevAnswer.value;
      formsMasterModelObject.Que_IsActive = data.isActive.value;
      formsMasterModelObject.Que_Camera = data.isCamera.value;
      formsMasterModelObject.Type = 2;
      formsMasterModelObject.QuestionId = this.questionId;
      formsMasterModelObject.Que_PdfFiels = data.questionpdfField.value;
      // //dfebugger
      await this.formsMasterServices.UpdateQuestion(formsMasterModelObject)
        .subscribe(response => {
          this.isLoading = false;
          this.MessageFlag = "Question updated successfully..!";
          this.commonMessage();
          this.getdataOfEditForm();
          // this.EditQuestionForms();
        });
    }
  }

  async submitAnswer() {
    //debugger
    this.isLoading = true;
    this.IsFormEditDisable = false;
    if (this.answersForm != undefined && this.answersForm.invalid) {
      this.isLoading = false;
      return;
    }
    else {

      if (this.answersForm != undefined) {
        let data = this.answersForm.controls;

        this.formsMasterServices.PostOptions(data.options.value)
          .subscribe(response => {
            this.formsMasterServices.GetFormQuestion(this.questionId, 6).toPromise().then(
              response => {
                this.questionData.Options = response[0];
                //console.log('test data ==> ', response[0]);
                this.setAnswer(response[0]);

                //console.log('new options form', this.answersForm.controls['options']);
              }
            );

            if (this.questionData.Options.length > 0) {

              this.optionArray = this.questionData.Options;

              this.optionArray.patchValue = this.questionData.Options;

              this.optionArray.controls['options'] = this.formBuilder.array(this.questionData.Options.map(address => {
                const group = this.createNewAnswer();
                group.patchValue(address);
                return group;
              }));


              this.Options = this.optionArray.value;


              if (this.QuestionTypeId == 1 || this.QuestionTypeId == 3 || this.QuestionTypeId == 4) {
                this.createAnswersOptionsForm();

              }
              this.isLoading = false;
            }
          }
          );
      }
      else {
        this.isLoading = false;
        return;
      }
    }
  }

  async submitPhotoOption() {
    //debugger
    this.isLoading = true;
    if (this.photoRuleForm != undefined && this.photoRuleForm.invalid) {
      this.isLoading = false;
      return;
    }
    else {
      if (this.photoRuleForm != undefined) {
        let data = this.photoRuleForm.controls;
        //console.log('photo rule data =>', data.photoRule.value);
        await this.formsMasterServices.PostPhotoRule(data.photoRule.value)
          .subscribe(response => {
            this.formsMasterServices.GetFormQuestion(this.questionId, 2).toPromise().then(
              response => {
                this.questionData.PhotoRules = response[0];
                //console.log('test data ==> ', response[0]);
                this.setPhotoRule(response[0]);
              }
            );

            if (this.questionData.PhotoRules.length > 0) {
              this.photoRuleArray = this.questionData.PhotoRules;
            }
            this.isLoading = false;
          });
      }
      else {
        this.isLoading = false;
        return;
      }

    }
  }

  async submitAlertRules() {
   // debugger
    this.isLoading = true;
    if (this.alertsForm != undefined && this.alertsForm.invalid) {
      this.isLoading = false;
      return;
    }
    else {
      if (this.alertsForm != undefined) {
        let data = this.alertsForm.controls;
        await this.formsMasterServices.PostAlertsRule(data.alert.value)
          .subscribe(response => {
            this.formsMasterServices.GetFormQuestion(this.questionId, 4).toPromise().then(
              response => {
                this.questionData.AlertRules = response[0];
                //console.log('test alert ==> ', response[0]);
                this.setAlert(response[0]);
              }
            );
            if (this.questionData.AlertRules.length > 0) {
              this.alertsArray = this.questionData.AlertRules;
            }
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
        return;
      }

    }
  }

  async submitFieldRules() {
    //debugger;
    this.isLoading = true;
    if (this.fieldRulesForm != undefined && this.fieldRulesForm.invalid) {
      this.isLoading = false;
      return;
    }
    else {

      if (this.fieldRulesForm != undefined) {

        let data = this.fieldRulesForm.controls;

        this.formsMasterServices.PostFieldRule(data.fieldRule.value)

          .subscribe(response => {
            this.formsMasterServices.GetFormQuestion(this.questionId, 3).toPromise().then(
              response => {
                this.questionData.FieldRules = response[0];
                //console.log('test field ==> ', response[0]);
                this.setFieldRules(response[0]);
              }
            );
            if (this.questionData.FieldRules.length > 0) {
              this.fieldRulesArray = this.questionData.FieldRules;
            }
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
        return;
      }

    }
  }

  async submitActionRules() {


    this.isLoading = true;
    if (this.actionRulesForm != undefined && this.actionRulesForm.invalid) {
      this.isLoading = false;
      return;
    }
    else {

      if (this.actionRulesForm != undefined) {
        let data = this.actionRulesForm.controls;
        let formsMasterModelObject: any = []
        formsMasterModelObject = data.actionRule.value;
        //@ts-ignore
        for (let i = 0; i < data.actionRule.length; i++) {
          //@ts-ignore
          formsMasterModelObject[i].ActionRules = data.actionRule.controls[i].controls.ActionRules.value
        }
        this.formsMasterServices.PostActionRule(formsMasterModelObject)
          .subscribe(response => {
            this.formsMasterServices.GetFormQuestion(this.questionId, 5).toPromise().then(
              response => {
                this.questionData.ActionRulesMaster = response[0];
                //console.log('test action rules ==> ', response[0]);
                this.setActionRules(response[0]);
              }
            );
            if (this.questionData.ActionRulesMaster.length > 0) {
              this.actionRulesArray = this.questionData.ActionRulesMaster;
            }
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
        return;
      }

    }
  }
  async getIPLDropdownData() {
    this.formsMasterServices.GetIPLDropdowmnData(this.formId).subscribe(response => {
      ////dfebugger
      this.dropdownListQuestionInputs = response[5] ? response[5] : [];
      this.drpPDFFieldArray = response[6] ? response[6] : [];
    });
  }

  async getdataOfEditForm() {
    try {
      //debugger
      this.questionAddAtList = [];
      let response = await this.formsMasterServices.GetFormQuestion(this.questionId, 1).toPromise();

// console .log(response);
      if (response.length > 0) {
        this.questionData = response[0];
        // bind add at array
        this.formId = this.questionData.FormId;
        this.questionAddAtList.push({ questionId: '0', question: 'At the Start' });
        this.questionData.Questions.forEach(q => {
          this.questionAddAtList.push({ questionId: q.QuestionId, question: q.Question });
        });
        this.questionAddAtList.push({ questionId: '-1', question: 'At the End' });
        // bind add at array

        this.QuestionTypeId = response[0].QuestionTypeId as number;
        //console.log('Que Type Id', this.QuestionTypeId);

        this.createForm(response[0].QuestionTypeId, response[0].Question, response[0].
          Instructions, '0',response[0].Que_Photo_Label_Name,response[0].Que_Photo_min_count, response[0].Que_Show, response[0].Que_OfficeResults, response[0].Que_Required,
          response[0].Que_FieldResults, response[0].Que_ClonePrevAnswer, response[0].Que_IsActive,
          response[0].Que_Camera,response[0].Que_PdfFiels)
        this.Questions = this.questionData.Questions;

        this.Options = this.questionData.Options;

        // if (this.questionData.Options.length > 0) {
          //debugger;
        if (this.QuestionTypeId == 1 || this.QuestionTypeId == 3 || this.QuestionTypeId == 4) {
          this.createAnswersOptionsForm();
          if (this.questionData.Options.length > 0) {
            this.setAnswer(this.questionData.Options);
          }

          this.createPhotoRuleForm();
          if (this.questionData.PhotoRules.length > 0) {
            this.setPhotoRule(this.questionData.PhotoRules);
          }

          this.createActionRulesForm();
          if (this.questionData.ActionRulesMaster.length > 0) {
            this.setActionRules(this.questionData.ActionRulesMaster);
          }

          this.createfieldRulesForm();
          //debugger;
          if (this.questionData.FieldRules.length > 0) {
            this.setFieldRules(this.questionData.FieldRules);
          }
        }
        if (this.QuestionTypeId == 2 || this.QuestionTypeId == 5 || this.QuestionTypeId == 6 || this.QuestionTypeId == 8 ) {
          this.createfieldRulesForm();
          if (this.questionData.FieldRules.length > 0) {
            this.setFieldRules(this.questionData.FieldRules);
          }

          this.createActionRulesForm();
          if (this.questionData.ActionRulesMaster.length > 0) {
            this.setActionRules(this.questionData.ActionRulesMaster);
          }
        }
        if (this.QuestionTypeId == 1) {
          this.createAlertsForm();
          if (this.questionData.AlertRules.length > 0) {
            this.setAlert(this.questionData.AlertRules);
          }
        }


      }

      if (!this.IsFormEditDisable) {

        //debugger
        this.buttonMainEdit = "Edit";
        if (this.formsMaster != undefined) {
          this.formsMaster.disable();
        }
        if (this.answersForm != undefined) {
          this.answersForm.disable();
        }
        if (this.photoRuleForm != undefined) {
          this.photoRuleForm.disable();
        }
        if (this.alertsForm != undefined) {
          this.alertsForm.disable();
        }
        if (this.actionRulesForm != undefined) {
          this.actionRulesForm.disable();
        }
        if (this.fieldRulesForm != undefined) {
          this.fieldRulesForm.disable();
        }
        this.IsFormEditDisable = false;

        this.IsAnswerEditDisable = true;
        this.IsPhotoRuleEditDisable = true;
        this.IsAlertsEditDisable = true;
        this.IsfieldRuleDisable = true;
        this.IsActionRuleDisable = true;
      }
      else {
        this.buttonMainEdit = "Save";
        this.formsMaster.disable();
        //this.IsFormEditDisable = true;
      }
      this.formsMaster.disable();
    }
    catch (err) {
      //console.log(err);
    }
  }

  createForm(questionType: string, question: string, instructions?: string, insertAfter?: string,Que_Photo_Label_Name?: string,Que_Photo_min_count?: string, isShow?: boolean,
    isOfficeResults?: boolean, isRequired?: boolean, isFindResults?: boolean, clonePrev?: string, isActive?: boolean,
    isCamera?: boolean,questionpdfField?: string) {
    this.formsMaster = this.formBuilder.group({
      questionType: [questionType, [Validators.required]],
      question: [question, [Validators.required]],
      instruction: [instructions || ''],
      insertAfter: [insertAfter || ''],
      Que_Photo_Label_Name: [Que_Photo_Label_Name || ''],
      Que_Photo_min_count: [Que_Photo_min_count || ''],
      isShow: [isShow || ''],
      isOfficeResults: [isOfficeResults || ''],
      isRequired: [isRequired || ''],
      isFindResults: [isFindResults || ''],
      clonePrevAnswer: [clonePrev || ''],
      isActive: [isActive || ''],
      isCamera: [isCamera || ''],
      questionpdfField: [questionpdfField || '']
    })
  }

  // optionsDataStart

  createAnswersOptionsForm() {
    this.answersForm =
      this.formBuilder.group({
        options:
          this.formBuilder.array(
            [this.createNewAnswer()]
          )
      })
  }

  createNewAnswer() {
    return this.formBuilder.group({
      OptionName: [''],
      optionId: [0],
      Option_QuestionId: this.questionId,
      Type: 1
    })
  }

  addNewAnswer() {
    this.optionArray = this.answersForm.get('options') as UntypedFormArray;
    this.optionArray.push(this.createNewAnswer());
  }

  removeAnswer(id, optionId: number) {
    //debugger
    var cfrm = confirm('Are you sure you want to delete this record...!');
    if (cfrm == true) {
      //debugger
      this.optionArray = this.answersForm.get('options') as UntypedFormArray;

      let questionMasterModelObject: any = new Object();
      questionMasterModelObject.Id = optionId;
      questionMasterModelObject.Type = 1;

      this.formsMasterServices.DeleteEditQuestionItems(questionMasterModelObject)
        .subscribe(response => {
          this.isLoading = false;
        });
      this.optionArray.removeAt(id);
    }
  }

  setAnswer(answerList?) {

    this.answersForm.controls['options'] = this.formBuilder.array(
      answerList.map(
        i =>

          this.formBuilder.group({

            OptionName: [i.OptionName],
            optionId: [i.OptionId],
            Option_QuestionId: this.questionId,
            Type: 1
          })
      )
    )
    this.answersForm.controls['options'].updateValueAndValidity();
  }
  // optionsDataEnd
  // PhotoRulesDataStart

  createPhotoRuleForm() {
    this.photoRuleForm =
      this.formBuilder.group({
        photoRule:
          this.formBuilder.array(
            [this.createPhotoRule()]
          )
      })
  }

  createPhotoRule() {
    //debugger
    return this.formBuilder.group(
      {
        PhotoRuleId: [0],
        PhotoRule_Operator: [],
        PhotoRule_Value: [''],
        PhotoRule_Min: [''],
        PhotoRule_Max: [''],
        QuestionId: this.questionId,
        Type: 1
      })
  }

  addPhotoRule() {
    //debugger
    this.photoRuleArray = this.photoRuleForm.get('photoRule') as UntypedFormArray;
    this.photoRuleArray.push(this.createPhotoRule());
  }

  removePhotoRule(id, photoRuleId) {
    //debugger
    var cfrm = confirm('Are you sure you want to delete this record...!');
    if (cfrm == true) {
      this.photoRuleArray = this.photoRuleForm.get('photoRule') as UntypedFormArray;

      let questionMasterModelObject: any = new Object();
      questionMasterModelObject.Id = photoRuleId;
      questionMasterModelObject.Type = 2;

      this.formsMasterServices.DeleteEditQuestionItems(questionMasterModelObject)
        .subscribe(response => {
          this.isLoading = false;
        });
      this.photoRuleArray.removeAt(id);
    }
  }

  setPhotoRule(photoRuleList?) {
    //debugger
    if (photoRuleList != undefined && photoRuleList != null && photoRuleList.length > 0) {
      let defaultValue = photoRuleList.find((x: any) => x.PhotoRule_Operator == 'Default');
      let defaultPhotoRule: any;
      if (defaultValue != undefined && defaultValue.PhotoRuleId != 0) {
        defaultPhotoRule = {
          PhotoRuleId: defaultValue.PhotoRuleId,
          PhotoRule_Operator: 'Default',
          PhotoRule_Value: '0',
          PhotoRule_Min: defaultValue.PhotoRule_Min,
          PhotoRule_Max: defaultValue.PhotoRule_Max,
          QuestionId: this.questionId,
          Type: 1
        }
        const index: number = photoRuleList.indexOf(photoRuleList.find((x: any) => x.PhotoRule_Operator == 'Default'));
        if (index !== -1) {
          photoRuleList.splice(index, 1);
        }
      }
      else {
        defaultPhotoRule = {
          PhotoRuleId: '0',
          PhotoRule_Operator: 'Default',
          PhotoRule_Value: 'Default',
          PhotoRule_Min: '0',
          PhotoRule_Max: '0',
          QuestionId: this.questionId,
          Type: 1
        }
      }

      photoRuleList.splice(0, 0, defaultPhotoRule);

      this.photoRuleForm.controls['photoRule'] = this.formBuilder.array(
        photoRuleList.map(
          i => this.formBuilder.group({
            PhotoRuleId: [i.PhotoRuleId],
            PhotoRule_Operator: [i.PhotoRule_Operator],
            PhotoRule_Value: [i.PhotoRule_Value],
            PhotoRule_Min: [i.PhotoRule_Min],
            PhotoRule_Max: [i.PhotoRule_Max],
            QuestionId: this.questionId,
            Type: 1
          })
        )
      )
      this.photoRuleForm.controls['photoRule'].updateValueAndValidity();
    }
  }
  // PhotoRulesDataEnd

  // AlertsDataStart
  createAlertsForm() {
    //debugger
    this.alertsForm =
      this.formBuilder.group({
        alert:
          this.formBuilder.array(
            [this.createAlerts()]
          )
      })
  }

  createAlerts() {
    //debugger
    return this.formBuilder.group({
      AlertRuleId: [0],
      AlertRule_Operator: [],
      AlertRule_Value: [''],
      QuestionId: this.questionId,
      Type: 1
    })
  }

  addAlerts() {
    //debugger
    this.alertsArray = this.alertsForm.get('alert') as UntypedFormArray;
    this.alertsArray.push(this.createAlerts());
  }

  removeAlert(id, optionId) {
    var cfrm = confirm('Are you sure you want to delete this record...!');
    if (cfrm == true) {
      this.alertsArray = this.alertsForm.get('alert') as UntypedFormArray;

      let questionMasterModelObject: any = new Object();
      questionMasterModelObject.Id = optionId;
      questionMasterModelObject.Type = 3;

      this.formsMasterServices.DeleteEditQuestionItems(questionMasterModelObject)
        .subscribe(response => {
          this.isLoading = false;
        });

      this.alertsArray.removeAt(id);
    }
  }

  setAlert(AlertsList?) {
    this.alertsForm.controls['alert'] = this.formBuilder.array(
      AlertsList.map(
        i => this.formBuilder.group({
          AlertRuleId: [i.AlertRuleId],
          AlertRule_Operator: [i.AlertRule_Operator],
          AlertRule_Value: [i.AlertRule_Value],
          QuestionId: this.questionId,
          Type: 1
        })
      )
    )
    //console.log('alert log', this.alertsForm.controls['alert']);
    this.alertsForm.controls['alert'].updateValueAndValidity();
  }
  // AlertsDataEnd

  // AlertsDataStart
  createfieldRulesForm() {

    this.fieldRulesForm =
      this.formBuilder.group({
        fieldRule:
          this.formBuilder.array(
            [this.createfieldRules()]
          )
      })
  }

  createfieldRules() {

    return this.formBuilder.group({
      FieldRuleId: [0],
      FieldRule_Operator: [],
      FieldRule_Value: [''],
      QuestionId: this.questionId,
      Type: 1
    })
  }

  addfieldRules() {

    this.fieldRulesArray = this.fieldRulesForm.get('fieldRule') as UntypedFormArray;
    this.fieldRulesArray.push(this.createfieldRules());
  }

  removefieldRule(i, fieldRuleId) {

    var cfrm = confirm('Are you sure you want to delete this record...!');
    if (cfrm == true) {
      this.fieldRulesArray = this.fieldRulesForm.get('fieldRule') as UntypedFormArray;

      let questionMasterModelObject: any = new Object();
      questionMasterModelObject.Id = fieldRuleId;
      questionMasterModelObject.Type = 6;

      this.formsMasterServices.DeleteEditQuestionItems(questionMasterModelObject)
        .subscribe(response => {
          this.isLoading = false;
        });
      this.fieldRulesArray.removeAt(i);
    }
  }

  setFieldRules(FieldRulesList?) {

    if (FieldRulesList != undefined && FieldRulesList != null && FieldRulesList.length > 0) {
      this.fieldRulesForm.controls['fieldRule'] = this.formBuilder.array(
        FieldRulesList.map(
          i => this.formBuilder.group({
            FieldRuleId: [i.FieldRuleId],
            FieldRule_Operator: [i.FieldRule_Operator],
            FieldRule_Value: [i.FieldRule_Value],
            QuestionId: this.questionId,
            Type: 1

          })

        )

      )

    }
  }
  // FieldRulesDataEnd

  // ActionrulessDataStart
  createActionRulesForm() {

    this.actionRulesForm =
      this.formBuilder.group({
        actionRule:
          this.formBuilder.array(
            [this.createActionRules()]
          )
      })
  }

  createActionRules() {

    return this.formBuilder.group({
      ActionRuleId: [0],
      ActionRule_Operator: [''],
      ActionRule_Value: [''],
      QuestionId: this.questionId,
      Type: 1,
      ActionRules: this.formBuilder.array([this.createAction()])
    })
  }

  createAction() {

    return this.formBuilder.group({
      ActionId: [0],
      ActionQuestionId: [''],
      ActionValue: [''],
      QuestionId: this.questionId,
      Type: 1
    })
  }

  addAction(actionRuleId) {

    // @ts-ignore
    this.actionArray = this.actionRulesForm.controls.actionRule.controls[actionRuleId].get('ActionRules') as UntypedFormArray;
    // @ts-ignore
    this.actionArray.push(this.createAction());
  }

  removeAction(i, j, actionId) {

    var cfrm = confirm('Are you sure you want to delete this record...!');
    if (cfrm == true) {
      // @ts-ignore
      this.actionArray = this.actionRulesForm.controls.actionRule.controls[i].get('ActionRules') as UntypedFormArray;
      // @ts-ignore
      let questionMasterModelObject: any = new Object();
      questionMasterModelObject.Id = actionId;
      questionMasterModelObject.Type = 5;

      this.formsMasterServices.DeleteEditQuestionItems(questionMasterModelObject)
        .subscribe(response => {
          this.isLoading = false;
        });
      this.actionArray.removeAt(j);
    }
  }

  addActionRules() {

    this.actionRulesArray = this.actionRulesForm.get('actionRule') as UntypedFormArray;
    this.actionRulesArray.push(this.createActionRules());
  }

  removeActionRule(i, actionRuleId) {

    var cfrm = confirm('Are you sure you want to delete this record...!');
    if (cfrm == true) {
      this.actionRulesArray = this.actionRulesForm.get('actionRule') as UntypedFormArray;

      let questionMasterModelObject: any = new Object();
      questionMasterModelObject.Id = actionRuleId;
      questionMasterModelObject.Type = 4;

      this.formsMasterServices.DeleteEditQuestionItems(questionMasterModelObject)
        .subscribe(response => {
          this.isLoading = false;
        });

      this.actionRulesArray.removeAt(i);
    }
  }

  setActionRules(ActionRuleList?) {
    if (ActionRuleList != undefined && ActionRuleList != null && ActionRuleList.length > 0) {
      this.actionRulesForm.controls['actionRule'] = this.formBuilder.array(
        ActionRuleList.map(
          i => this.formBuilder.group({
            ActionRuleId: [i.ActionRuleId],
            ActionRule_Operator: [i.ActionRule_Operator],
            ActionRule_Value: [i.ActionRule_Value],
            QuestionId: this.questionId,
            Type: 1
          })
        )
      )
      for (let i = 0; i < ActionRuleList.length; i++) {
        this.setActions(i, ActionRuleList[i].ActionRules);
      }

    }
  }

  setActions(formId, actions?) {
    // @ts-ignore
    this.actionRulesForm.controls.actionRule.controls[formId].controls['ActionRules'] = this.formBuilder.array(
      actions.map(
        i => this.formBuilder.group({
          ActionId: [i.ActionId],
          ActionQuestionId: [i.ActionQuestionId],
          ActionValue: [i.ActionValue],
          QuestionId: this.questionId,
          Type: 1
        })
      )
    );
    this.actionRulesForm.updateValueAndValidity();
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  // ActionrulessDataEnd

  ChangeInstruction() {
    let formData = this.formsMaster.controls;
    this.formsMaster.patchValue({ instruction: formData.question.value });
    this.formsMaster.patchValue({ Que_Photo_Label_Name: formData.question.value });

  }

}
