import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseUrl } from "src/app/services/apis/rest-api";

@Component({
  selector: 'iplapp-upload-document',
  template: `
              <div class="modal-header">
                {{label}}
                <button type="button" class="close" (click)="activeModal.dismiss('Cross click')"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <div class="row"> 
                    <div class="col-md-12">
                      <kendo-upload [saveUrl]="uploadSaveUrl" [removeUrl]="uploadRemoveUrl" [(ngModel)]="myFiles"
                        (success)=displaySuccess($event);>
                      </kendo-upload>
                    </div>
                  </div>
                  <hr>
                  <button id="client_viewdetail_1" class="btn btn-primary" (click)="activeModal.dismiss('Save click')">Close</button>
                </div>
              </div>
            `
})

export class IplAppDocumentUpload {
  @Input() label: string;
  @Output() uploadSuccess = new EventEmitter();
  uploadSaveUrl = BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground";
  uploadRemoveUrl = "removeUrl";
  myFiles = [];

  constructor(public activeModal: NgbActiveModal) {}
  
  displaySuccess(event) {
    this.uploadSuccess.emit(event);
  }
}
