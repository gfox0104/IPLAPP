import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
              <div class="modal-header">
                <b>Description</b>
                <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <span>{{Description}}</span>
                  <hr>
                  <button type="button" class="btn btn-primary waves-effect waves-light pull-right"
                    (click)="activeModal.dismiss('Save click')">Close</button>
                  <br>
                  <label>&nbsp;</label>
              </div>
            `
})

export class DescriptionModalContent {

  @Input() Description;

  constructor(public activeModal: NgbActiveModal) {}

}
