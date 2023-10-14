import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
              <div class="modal-header">
                Message
                <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="text-center">
                  <span>{{MessageFlag}}</span>
                  <hr>
                  <button type="button" class="btn btn-primary waves-effect waves-light"
                    (click)="activeModal.dismiss('Save click')">{{buttonTitle ? buttonTitle : 'Close..'}}</button>
                </div>
              </div>
            `
})

export class IplAppModalContent {

  @Input() MessageFlag;
  @Input() buttonTitle;

  constructor(public activeModal: NgbActiveModal) {}

}
