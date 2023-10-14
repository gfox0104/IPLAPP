import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'iplapp-filter-form',
  template: `
              <form>
                <div class="row" >
                  <div class="col-lg-12">
                    <div class="form-row">
                      <div class="form-group" [ngClass]="{'col-md-2': !item.style, 'col-md-1': item.style }"
                        *ngFor="let item of formFilters">
                        <label class="col-form-label" [for]="item.id">{{item.label}}</label>
                          <ng-template [ngIf]="item.type === 'select'" [ngIfElse]="inputBlock">

                            <kendo-dropdownlist class="form-control form-control-sm"
                              [data]="item.data"
                              [defaultItem]="item.defaultdropdown"
                              [filterable]="true"
                              [textField]="item.option"
                              [valueField]="item.value"
                              [ngModelOptions]="{standalone: true}"
                              [(ngModel)]="modelObj[item.model]"
                              [valuePrimitive]="true"
                              (filterChange)="Filtermethod($event)"
                             >
                          </kendo-dropdownlist>

                          </ng-template>
                          <ng-template #inputBlock>
                            <div [ngClass]="{'custom-control custom-checkbox': item.type==='checkbox'}">
                              <ng-container [ngSwitch]="item.type">
                                <input *ngSwitchCase="'checkbox'" type="checkbox" class="custom-control-input" [id]="item.id"
                                  [(ngModel)]="modelObj[item.model]" [ngModelOptions]="{standalone: true}"
                                  >
                                <input *ngSwitchDefault [type]="item.type" class="form-control form-control-sm" [id]="item.id"
                                  [(ngModel)]="modelObj[item.model]" [ngModelOptions]="{standalone: true}" [placeholder]="item.placeholder">
                              </ng-container>
                              <label class="custom-control-label" [for]="item.id" *ngIf="item.type==='checkbox'"></label>
                            </div>
                          </ng-template>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-row">
                      <div class="form-group col-md-1 col-sm-2 col-4">
                        <button id="client_viewdetail_1" class="btn btn-primary" (click)="filter()"><i
                            class="fas fa-filter mr-1"></i>Filter</button>
                      </div>

                      <div class="form-group col-md-1 col-sm-2 col-4">
                        <button id="client_viewdetail_1" class="btn btn-primary" (click)="clear()"><i
                            class="fas fa-eraser mr-1"></i>Clear</button>
                      </div>

                      <div class="form-group col-md-1 col-sm-2 col-4">
                        <button id="client_viewdetail_1" class="btn btn-primary" (click)="save()"><i
                            class="fas fa-save mr-1"></i>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            `
})

export class IplAppFilterForm implements OnInit {

  @Input() formFilters;
  @Input() modelObj;

  @Output() filterCall = new EventEmitter();
  @Output() clearData = new EventEmitter();
  @Output() saveFilterData = new EventEmitter();
  //@Output() filterdrd = new EventEmitter();
  @Output() filterdrd= new EventEmitter<any>();
  isActive: boolean = true;
  ngOnInit() {
    //debugger
   }
  save() {
    this.saveFilterData.emit();
  }

  clear() {
    this.clearData.emit();
  }

  filter() {
    this.filterCall.emit();
  }
  Filtermethod(event){
    //debugger
    this.filterdrd.emit({event})
  }

}
