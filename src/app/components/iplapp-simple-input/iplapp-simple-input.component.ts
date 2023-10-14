import { Component, Input } from '@angular/core';

@Component({
  selector: 'iplapp-simple-input',
  template: `
              <div class="form-group col-md-3">
                <label class="col-form-label" [for]="props.id">{{props.label}} 
                  <span style="color: red">*</span>
                </label>
              </div>
              <div class="form-group col-md-3">
                <input type="text" [id]="props.id" class="form-control form-control-sm"
                  [placeholder]="props.placeholder" [(ngModel)]="modelObj[props.model]" [formControlName]="props.formControlName"
                  [ngClass]="{ 'is-invalid': submitted && fx.FName.errors }">
                <div *ngIf="submitted && fx.FName.errors" class="invalid-feedback">
                  <div *ngIf="fx.FName.errors.required">this field is required</div>
                  <div *ngIf="fx.FName.errors.email">Email must be a valid email address</div>
                </div>
            </div>
  `
})

export class IplAppSimpleInput {
  @Input() props;
  @Input() modelObj;
}
