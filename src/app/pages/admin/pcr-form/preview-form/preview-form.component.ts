import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { FormsMasterServices } from '../forms-master.service';
import _ from 'underscore';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {

  questionList: any[] = [];
  id: any;
  formId: any;
  selectedItem: any;
  AllquestionList: any[] = [];
  constructor(private xRoute: ActivatedRoute,
    private xRouter: Router,
    private formsMasterServices: FormsMasterServices,
    private EncrDecr: EncrDecrService
  ) {

    this.id = this.xRoute.snapshot.params['id'];

  }

  ngOnInit(): void {

    this.id = this.EncrDecr.get('123456$#@$^@1ERF', atob(this.id));
    this.formId = this.id;
    if (this.id) {
      this.loadFormData(this.formId);
    }
  }

  viewFormByID() {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.formId);
    this.xRouter.navigate(["home/forms/edit-form/", btoa(encrypted)]);
    return
  }

  async loadFormData(formId) {
    ////dfebugger
    await this.formsMasterServices.GetformsPreviewData(1, formId, 0, '').subscribe(res => {
      if (res.length > 0) {
       

        this.AllquestionList = res[0] && res[0].length > 0 ? res[0] : [];
        if (this.AllquestionList.length) {
          var selectedList = _.where(this.AllquestionList, { Que_ParentId: 0 });
          if (selectedList.length > 0) {
            this.questionList = selectedList;
          }
        } else {
          this.questionList = [];
        }
        
      }
    })
  }

  async textChange(ev, que, idx) {
    //debugger;
    que.InvalidFR = false;
    this.ClearChildQuestion(que.QuestionId);

    if (ev.target.value != null) {
      this.ApplyActionRule(ev.target.value, que, idx);
      this.ApplyFieldRule(ev.target.value, que);
    }

  }

  ddlChange(ev, que, idx) {
   
    que.InvalidFR = false;
    this.ClearChildQuestion(que.QuestionId);

    this.ApplyActionRule(parseInt(ev.target.value), que, idx);

    this.ApplyFieldRule(ev.target.value, que);
  }

  radioQueChange(optionId, que, idx) {

    que.InvalidFR = false;
    this.ClearChildQuestion(que.QuestionId);

    this.ApplyActionRule(optionId, que, idx);
    this.ApplyFieldRule(optionId, que);
  }

  checkChange(ev, optionId, que, idx) {

    

    if (ev.target.checked == true) {
      this.ApplyActionRule(optionId, que, idx);
    }
    else {
      que.ActionRulesMaster.forEach(eleARM => {
        if (eleARM.ActionRule_Operator == 'Equals') {
          if (optionId == eleARM.ActionRule_Value) {
            eleARM.ActionRules.forEach(eleARC => {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            });
          }
        }
        else if (eleARM.ActionRule_Operator == 'Not Equals') {
          if (optionId != eleARM.ActionRule_Value) {
            eleARM.ActionRules.forEach(eleARC => {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            });
          }
        }
        else if (eleARM.ActionRule_Operator == 'Not Empty') {
          if (optionId != "") {
            eleARM.ActionRules.forEach(eleARC => {              
                this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            });
          }
        }
      });
    }

    if (ev.target.checked == true && que.InvalidFR_OptionId == 0) {      
      this.ApplyFieldRule(optionId, que);
    } else {
      if (que.InvalidFR_OptionId == optionId && ev.target.checked == false) {
        que.InvalidFR = false;
        que.InvalidFR_OptionId = 0;
      }
    }
  }

  ApplyActionRule(optionId, que, idx) {
    //debugger;
    que.ActionRulesMaster.forEach(eleARM => {
      if (eleARM.ActionRule_Operator == 'Equals') {
        if (optionId == eleARM.ActionRule_Value) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Not Equals') {
        if (optionId != eleARM.ActionRule_Value) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Not Empty') {
        if (optionId != "") {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      // For textbox/textarea
      else if (eleARM.ActionRule_Operator == 'Contains') {
        if (optionId.includes(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Length equals') {
        if (optionId.length == parseInt(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Length greater than') {
        if (optionId.length > parseInt(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Length less than') {
        if (optionId.length < parseInt(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      // For textbox numeric input
      else if (eleARM.ActionRule_Operator == 'Greater than') {
        if (parseInt(optionId) > parseInt(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Less than') {
        if (parseInt(optionId) < parseInt(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Numeric Integer') {
        if (Number.isInteger(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
      else if (eleARM.ActionRule_Operator == 'Numeric Decimal') {
        if (this.isNumeric(eleARM.ActionRule_Value)) {
          eleARM.ActionRules.forEach(eleARC => {
            if (eleARC.ActionValue == 'Show') {
              var selectedList = _.where(this.questionList, { QuestionId: eleARC.ActionQuestionId });
              if (selectedList.length == 0) {
                var selectedque = this.AllquestionList.find((x: any) => x.QuestionId == eleARC.ActionQuestionId);
                this.questionList.splice(idx + 1, 0, selectedque);
              }
            } else {
              this.questionList = _.without(this.questionList, _.findWhere(this.questionList, { QuestionId: eleARC.ActionQuestionId }));
            }
          });
        }
      }
    });
  }
  isNumeric(num) { // check decimal number
    return !isNaN(num)
  }
  ClearChildQuestion(QuestionId) {
    var ChildList = _.where(this.questionList, { Que_ParentId: QuestionId });

    if (ChildList.length > 0) {
      this.questionList = this.questionList.filter(function (el) {
        return el.Que_ParentId != QuestionId;
      });

      ChildList.forEach(ch => { // child level 1
        var Child1List = _.where(this.questionList, { Que_ParentId: ch.QuestionId });

        this.questionList = this.questionList.filter(function (el) {
          return el.Que_ParentId != ch.QuestionId;
        });

        Child1List.forEach(ch1 => { // child level 2
          var Child2List = _.where(this.questionList, { Que_ParentId: ch1.QuestionId });

          this.questionList = this.questionList.filter(function (el) {
            return el.Que_ParentId != ch1.QuestionId;
          });

          Child2List.forEach(ch2 => { // child level 3
            var Child3List = _.where(this.questionList, { Que_ParentId: ch2.QuestionId });

            this.questionList = this.questionList.filter(function (el) {
              return el.Que_ParentId != ch2.QuestionId;
            });

            Child3List.forEach(ch3 => { // child level 4
              var Child4List = _.where(this.questionList, { Que_ParentId: ch3.QuestionId });

              this.questionList = this.questionList.filter(function (el) {
                return el.Que_ParentId != ch3.QuestionId;
              });

              Child4List.forEach(ch4 => {
                this.questionList = this.questionList.filter(function (el) {
                  return el.Que_ParentId != ch4.QuestionId;
                });
              });
            });
          });
        });
      });
    }

  }

  ApplyFieldRule(ans, question) {
    //debugger;
    if (question.FieldRules.length > 0) {
      var whereClause = "";
      question.FieldRules.forEach(fr => {
        if (fr.FieldRule_Operator == 'Equals') {
          whereClause = whereClause != "" ? whereClause + ' && ans == ' + fr.FieldRule_Value : 'ans == ' + fr.FieldRule_Value;
        }
        else if (fr.FieldRule_Operator == 'Not Equals') {
          whereClause = whereClause != "" ? whereClause + ' && ans != ' + fr.FieldRule_Value : 'ans != ' + fr.FieldRule_Value;
        }
        else if (fr.FieldRule_Operator == 'Not Empty') {
          whereClause = whereClause != "" ? whereClause + ' && ans != ""' : 'ans != ""';
        }
        // For textbox/textarea
        else if (fr.FieldRule_Operator == 'Contains') {
          whereClause = whereClause != "" ? whereClause + ' && ans.includes(' + fr.FieldRule_Value + ')' : 'ans.includes(' + fr.FieldRule_Value + ')';
        }
        else if (fr.FieldRule_Operator == 'Length equals') {
          whereClause = whereClause != "" ? whereClause + ' && ans.length == parseInt(' + fr.FieldRule_Value + ')' : 'ans.length == parseInt(' + fr.FieldRule_Value +')';
        }
        else if (fr.FieldRule_Operator == 'Length greater than') {
          whereClause = whereClause != "" ? whereClause + ' && ans.length > parseInt(' + fr.FieldRule_Value + ')' : 'ans.length > parseInt(' +fr.FieldRule_Value +')';
        }
        else if (fr.FieldRule_Operator == 'Length less than') {
          whereClause = whereClause != "" ? whereClause + ' && ans.length < parseInt('+ fr.FieldRule_Value +')' : 'ans.length < parseInt(' + fr.FieldRule_Value + ')';
        }
        // For textbox numeric input
        else if (fr.FieldRule_Operator == 'Greater than') {
          whereClause = whereClause != "" ? whereClause + ' && parseInt(ans) > parseInt(' + fr.FieldRule_Value + ')' : 'parseInt(ans) > parseInt(' + fr.FieldRule_Value + ')';
        }
        else if (fr.FieldRule_Operator == 'Less than') {
          whereClause = whereClause != "" ? whereClause + ' && parseInt(ans) < parseInt(' + fr.FieldRule_Value + ')' : 'parseInt(ans) < parseInt(' + fr.FieldRule_Value + ')';
        }
        else if (fr.FieldRule_Operator == 'Numeric Integer') {
          whereClause = whereClause != "" ? whereClause + ' && Number.isInteger(' + fr.FieldRule_Value + ')' : 'Number.isInteger(' + fr.FieldRule_Value + ')';
        }
        else if (fr.FieldRule_Operator == 'Numeric Decimal') {
          whereClause = whereClause != "" ? whereClause + ' && this.isNumeric(' + fr.FieldRule_Value + ')' : 'this.isNumeric(' + fr.FieldRule_Value + ')';
        }
      });

      //console.log(whereClause);
      //debugger;
      var valid = eval(whereClause);
      if (valid) {
        question.InvalidFR = false;
        question.InvalidFR_OptionId = 0;
      }
      else{
        question.InvalidFR = true;
        question.InvalidFR_OptionId = parseInt(ans) ;
      }
    }
  }
}
