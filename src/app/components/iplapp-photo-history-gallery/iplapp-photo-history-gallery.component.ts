import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

import { ClientResultOldPhotoServices } from "../../pages/client-result/client-result-photo/client-result-photo-old.service";
import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'iplapp-photohistorygallery',
  templateUrl: './iplapp-photo-history-gallery.component.html',
  styleUrls: ['./iplapp-photo-history-gallery.component.scss']
})

export class IplAppPhotoHistoryGallery implements OnInit {
  @Input() label: string;
  @Input() isTask: boolean;
  @Input() photos: Array<any>;
  @Input() ModelObj;
  @Input() photoObj;
  @Output() photoModal = new EventEmitter();
  
  status: 'Download';
  expanded: boolean;
  isCtrl: boolean = false;
  isShift: boolean = false;
  MessageFlag: string;
  numLoading: number = 0;

  constructor(
    private httpClient: HttpClient,
    private photoService: ClientResultOldPhotoServices,
    private modalService: NgbModal,
    private SpinnerService: NgxSpinnerService,
  ) { }

  ngOnInit() {

    if (this.isTask) {
      this.photos.forEach(task => {
        task.Items.forEach((photo, index) => {
          photo.Client_Result_Photo_FileName = this.label + ' ' + task.Task_Photo_Button_Name + (index + 1) + '.jpg';
        })
      });
    }

    this.SpinnerService.show();
    window.addEventListener('keydown', (e) => {
      if (e.key === "Shift") {
        this.isShift = true;

      }
      if (e.key === 'Control') {
        this.isCtrl = true;
      }
    })

    window.addEventListener('keyup', (e) => {
      if (e.key === "Shift") {
        this.isShift = false;
      }
      if (e.key === "Control") {
        this.isCtrl = false;
      }
    })
  }
 

 
  PhotoModel(photos, itemval, index) {
    const data = {
      itemval: itemval,
      index: index,
      photos: photos
    }
    this.photoModal.emit(data);
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Continue';
    modalRef.result.then(result => { }, reason => { });
  }

  checkloading() {
    this.numLoading = this.numLoading + 1;
    if (this.photos.length > 0 && this.photos.length <= (this.numLoading * 2)) {
      this.SpinnerService.hide();
    } else {
      this.SpinnerService.show();
    }
  }
}
