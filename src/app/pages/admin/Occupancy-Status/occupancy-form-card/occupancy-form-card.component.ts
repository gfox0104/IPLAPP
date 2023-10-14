import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';


@Component({
  selector: 'app-occupancy-form-card',
  templateUrl: './occupancy-form-card.component.html',
  styleUrls: ['./occupancy-form-card.component.scss']
})
export class OccupancyFormCardComponent implements OnInit {

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
    // debugger;
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
