import { Component, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'iplapp-loading-button',
  template: `
            <button class="btn btn-primary btn-sm" style="font-size: 11px; padding: 5px" [ngStyle]="{'background-color': bgColor, 'border-color': bgColor}" (click)="onClick()" [disabled]="isLoading">
            <i class="fa fa-spin fa-spinner mr-2" *ngIf="isLoading"></i><span>{{isLoading ? '' : title}}</span></button>
            `
})

export class IplAppLoadingButton {
  @Input() title: string;
  @Input() bgColor: string;
  @Input() isSubmitted: boolean;
  @Output() onButtonClick = new EventEmitter();
  isLoading: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSubmitted'] && changes['isSubmitted'].currentValue === true) {
      this.isLoading = false;
    }
  }

  onClick() {
    this.isLoading = true;
    this.onButtonClick.emit();
  }
}
