import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';

@Component({
  selector: 'iplapp-form-card',
  template: `
            <form [formGroup]="formUsrCommonGroup" (ngSubmit)="formButton()">
              <div class="form-row">
                <div class="form-group col-md-12 text-center module-subheader" >
                  <h5>{{title}}
                    <a class="pull-right mr-2" data-toggle="tooltip" (click)="SetHelpFlag()" data-placement="top"
                    title="Item Help" style="cursor: pointer;">Need Help
                    <i class="fas fa-question"></i>&nbsp;&nbsp;
                    </a>
                  </h5>
                </div>
                <br>
              </div>

              <div class="form-row" *ngFor="let item of fields">
                <div class="form-group col-md-4">
                  <label for="inputEmaildfsdfd4" class="col-form-label"
                  [ngClass]="{ 'HelpCursor': isHelpActive }"
                    (click)="DispalyInfo($event,item.label)">{{item.label}}
                    <span style="color: red" *ngIf="item.required">*</span></label>
                </div>
                <div class="form-group col-md-8">
                  <ng-template  [ngIf]="item.type === 'select' || item.type === 'multiselect'" [ngIfElse]="inputBlock">
                  <div *ngIf="item.type==='select'">
                    <kendo-dropdownlist class="form-control form-control-sm"
                      [data]="item.data"
                      [filterable]="true"
                      [textField]="item.option"
                      [valueField]="item.value"
                      [formControlName]="item.formControlName"
                      [(ngModel)]="modelObj[item.model]"
                      [valuePrimitive]="true"
                      (filterChange)="dropdownmethod($event,item.formControlName)"
                      [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)"
                    >
                      </kendo-dropdownlist>
                      <div *ngIf="item.flag" class="Mydropdown">this field is required</div>
                  </div>
                  <div *ngIf="item.type==='multiselect'">
                    <ng-multiselect-dropdown [placeholder]="'Select'" [formControlName]="item.formControlName"
                          [settings]="item.multiselectdropdownSetting" [data]="item.data"
                          [(ngModel)]="modelObj[item.model]"
                          [ngClass]="{ 'HelpCursor': isHelpActive }"
                          (click)="DispalyInfo($event,'Loan Type')">
                      </ng-multiselect-dropdown>
                      <div *ngIf="item.flag" class="Mydropdown">this field is required</div>
                  </div>

                  </ng-template>

                  <ng-template #inputBlock>
                    <div [ngClass]="{'custom-control custom-checkbox': item.type==='checkbox'}">
                      <ng-container [ngSwitch]="item.type">
                        <input *ngSwitchCase="'checkbox'" type="checkbox" class="custom-control-input" style="margin-top: 7px" [id]="item.id"
                          [(ngModel)]="modelObj[item.model]" [formControlName]="item.formControlName"
                          [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)">

                        <textarea *ngSwitchCase="'textarea'" type="text" class="form-control form-control-sm" [id]="item.id" [rows]="item.rows"
                          [(ngModel)]="modelObj[item.model]" [formControlName]="item.formControlName"
                          [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)" [readonly]="isHelpActive"></textarea>

                        <ng-container *ngSwitchDefault>
                          <input *ngIf="item.numbersOnly" [type]="item.type" class="form-control form-control-sm" [id]="item.id" numbersOnly maxlength="6"
                            [(ngModel)]="modelObj[item.model]" [placeholder]="item.placeholder"
                            [formControlName]="item.formControlName" [ngClass]="{ 'is-invalid': submitted && fx[item.formControlName].errors }"
                            [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)" [readonly]="isHelpActive">

                          <input *ngIf="item.AlphabetOnly" [type]="item.type" class="form-control form-control-sm" [id]="item.id" AlphabetOnly
                            [(ngModel)]="modelObj[item.model]" [placeholder]="item.placeholder"
                            [formControlName]="item.formControlName" [ngClass]="{ 'is-invalid': submitted && fx[item.formControlName].errors }"
                            [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)" [readonly]="isHelpActive">

                          <input *ngIf="!item.numbersOnly && !item.AlphabetOnly" [type]="item.type" class="form-control form-control-sm" [id]="item.id"
                            [(ngModel)]="modelObj[item.model]" [placeholder]="item.placeholder"
                            [formControlName]="item.formControlName" [ngClass]="{ 'is-invalid': submitted && fx[item.formControlName].errors }"
                            [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)" [readonly]="isHelpActive">
                        </ng-container>
                          <div *ngIf="item.required && submitted && fx[item.formControlName].errors" class="invalid-feedback">
                            <div *ngIf="fx[item.formControlName].errors.required">this field is required</div>
                          </div>
                      </ng-container>
                      <label class="custom-control-label" [for]="item.id" *ngIf="item.type==='checkbox'"
                      [ngClass]="{ 'HelpCursor': isHelpActive }"
                    (click)="DispalyInfo($event,item.label)"></label>
                    </div>
                  </ng-template>
                </div>
              </div>

              <div class="form-row">
                <div class="float-right">
                  <label for="InvestmentSihhhze" *ngIf="formUsrCommonGroup.invalid || dropCkck" style="color:red">*
                    fields is required
                  </label> <br>
                  <button class="btn btn-primary mr-1" *ngIf="isEditDisable"  (click)="editForms()">
                    <i class="far fa-edit mr-1"></i> Edit</button>
                  <button class="btn btn-primary mr-1" type="submit" *ngIf="!isEditDisable" [disabled]="isLoading">
                    <i class="fa mr-1" [ngClass]="{'fa-spin fa-spinner': isLoading, 'fa-save': !isLoading}"></i>
                     {{ button}}
                  </button>
                  <button class="btn btn-primary" (click)="onBack()">
                    <i class="fas fa-arrow-alt-circle-left mr-1"></i> Back</button>
                </div>
              </div>
            </form>
            `
})

export class IplAppFormCard implements OnInit {
  @Input() title;
  @Input() fields;
  @Input() modelObj;
  @Input() isEditDisable;
  @Input() isSubmitted;
  @Input() formUsrCommonGroup;

  @Output() submitForm = new EventEmitter();
  @Output() onchange = new EventEmitter();
  @Output() back = new EventEmitter();
  @Output() commondrd = new EventEmitter<any>();
  @Output() dispalyInfoData = new EventEmitter();

  isLoading: boolean;
  submitted: boolean;
  button: string;
  dropCkck: boolean = true;
  isHelpActive = false;
  MessageFlag: string;
  constructor(private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,) { }

  ngOnChanges(changes: SimpleChanges) {
    this.fields.forEach(field => {
      field.flag = false;
    });

    if (changes['isSubmitted'] && changes['isSubmitted'].currentValue === true) {
      this.isLoading = false;
      this.button = " Update";
    }
  }

  ngOnInit() {
    let temp = 0;
    this.fields.forEach(field => {

      if (field.type === 'select' && field.required && (this.modelObj[field.model] === 0 || this.modelObj[field.model] === '0')) {
        temp++;
      }
    });
    //debugger;
    this.dropCkck = (this.fields.filter(item => item.type === 'select').length === 0 || temp === 0) || this.isEditDisable ? false : true;
    this.button = this.isEditDisable ? 'Update' : ' Save';
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  dropdownmethod(event, val) {
    //debugger
    this.commondrd.emit({ event, val })
  }
  onSelectChange(item) {
    if (this.modelObj[item.model] === 0 && item.required) {
      item.flag = true;
    } else {
      item.flag = false;
    }

    let temp = 0;
    this.fields.forEach(field => {
      if (field.type === 'select' && field.required && (this.modelObj[field.model] === 0 || this.modelObj[field.model] === '0')) {
        temp++;
      }
    });

    this.dropCkck = temp > 0 ? true : false;
    this.onchange.emit();
  }

  invalidate() {
    let tempFlag: boolean;
    this.fields.forEach(field => {
      if (field.type === 'select' && field.flag && field.required) {
        tempFlag = tempFlag || field.flag
      }
    });

  }

  formButton() {
    //debugger;
    let temp = 0;
    this.submitted = true;
    this.fields.forEach(field => {
      if (field.type === 'select' && this.modelObj[field.model] === 0 && field.required) {
        field.flag = true;
        temp++;
      }
    });

    this.dropCkck = temp > 0 ? true : false;

    if (this.formUsrCommonGroup.invalid || this.dropCkck) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";
    this.submitForm.emit();
  }

  editForms() {
    this.formUsrCommonGroup.enable();
    this.isEditDisable = false;
  }

  onBack() {
    this.back.emit();
  }

  SetHelpFlag() {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonInfoMessage();
    }
    else {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonInfoMessage();
    }
  }
  DispalyInfo(event: Event, lblName)
  {
    //debugger;
    let isHelpActive = this.isHelpActive;
    if (this.isHelpActive) {
      event.preventDefault();
      this.dispalyInfoData.emit({event,lblName,isHelpActive});
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
