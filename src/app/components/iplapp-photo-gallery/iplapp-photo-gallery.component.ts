import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

import { ClientResultOldPhotoServices } from "../../pages/client-result/client-result-photo/client-result-photo-old.service";
import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'iplapp-photogallery',
  templateUrl: './iplapp-photo-gallery.component.html',
  styleUrls: ['./iplapp-photo-gallery.component.scss']
})

export class IplAppPhotoGallery implements OnInit {
  @Input() label: string;
  @Input() isTask: boolean;
  @Input() photos: Array<any>;
  @Input() ModelObj;
  @Input() photoObj;
  @Input() dataSend: Array<any>;
  @Output() dataSendChange = new EventEmitter();
  @Output() removephoto = new EventEmitter();
  @Output() photoModal = new EventEmitter();
  @Output() unlabe = new EventEmitter();

  isDownloading: boolean;
  isDownloadingSelected: boolean;
  selectedPhotos=[];
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

  downloadPhotosAll() {
    this.isDownloading = true;
    this.createZip();
  }
  downloadSelectedPhotos() {
    if(this.selectedPhotos.length>0)
    {
      this.isDownloadingSelected = true;
      this.createZip_Selected();
    }
    else
    {
      this.MessageFlag="No file(s) selected to download!"
      this.commonMessage()
    }
  }

  async createZip() {
    const zip = new JSZip();
    const zipName = this.ModelObj.workOrderNumber + "_" + this.ModelObj.address1.replace(/\s+/g, '_') + '_ipl.zip'

    let promises = [];
    let labelArray = [];
    if (this.isTask) {
      this.photos.forEach((task) => {
        task.Items.forEach(photo => {
          promises.push(this.getFile(photo.Client_Result_Photo_FilePath))
          labelArray.push(photo.Client_Result_Photo_FileName)
        })
      })
    } else {
      promises = this.photos.map((photo) => {
        return this.getFile(photo.Client_Result_Photo_FilePath);
      })
      labelArray = this.photos.map((photo) => {
        return photo.Client_Result_Photo_FileName
      })
    }

    await Promise.all(promises).then((files) => {
      files.forEach((file: any, i) => {
        const b: any = new Blob([file], { type: '' + file.type + '' });
        zip.file(labelArray[i], b);
      })
      zip.generateAsync({ type: 'blob' }).then((content) => {
        if (content) {
          FileSaver.saveAs(content, zipName)
        }
        this.isDownloading = false;
      })
    })
  }

  async createZip_Selected() {
    const zip = new JSZip();
    const zipName = this.ModelObj.workOrderNumber + "_" + this.ModelObj.address1.replace(/\s+/g, '_') + '_ipl.zip'

    let promises = [];
    let labelArray = [];
    if (this.isTask) {
      this.photos.forEach((task) => {
        task.Items.forEach(photo => {
          let IsContain=this.selectedPhotos.some(cobay => cobay.Client_Result_Photo_ID=== photo.Client_Result_Photo_ID)
          if(IsContain)
          {
            promises.push(this.getFile(photo.Client_Result_Photo_FilePath))
            labelArray.push(photo.Client_Result_Photo_FileName)
          }
        })
      })
    } else {
      this.photos.forEach((photo) => {
        let IsContain=this.selectedPhotos.some(sp => sp.Client_Result_Photo_ID=== photo.Client_Result_Photo_ID && sp.Client_Result_Photo_FileName===photo.Client_Result_Photo_FileName)
          if(IsContain)
          {
            promises.push(this.getFile(photo.Client_Result_Photo_FilePath))
            labelArray.push(photo.Client_Result_Photo_FileName)
          }
      });
    }

    await Promise.all(promises).then((files) => {
      files.forEach((file: any, i) => {
        const b: any = new Blob([file], { type: '' + file.type + '' });
        zip.file(labelArray[i], b);
      })
      zip.generateAsync({ type: 'blob' }).then((content) => {
        if (content) {
          FileSaver.saveAs(content, zipName)
        }
        this.isDownloadingSelected = false;
      })
    })
  }

  async getFile(url: string) {
    const corsUrl = url;
    const httpOption = {
      responseType: 'blob' as 'json',
    }

    const res = await this.httpClient.get(corsUrl, httpOption).toPromise()
      .catch((err: HttpErrorResponse) => {
        const error = err.error;
        return error;
      });

    return res;
  }

  chkimgAllPhotos(val, i) {
    // debugger;
    if (val.chkflag == true) {
      if (this.isCtrl !== true) {
        let first = 0, last = 0;
        if (this.isShift === false) {
          for (let i = 0; i < this.photos.length; i++) {
            if (this.photos[i].Client_Result_Photo_ID !== val.Client_Result_Photo_ID) {
              this.photos[i].chkflag = false;
            } else {
              first = i;
              last = i;
            }
          }
        } else {
          for (let i = 0; i < this.photos.length; i++) {
            if (this.photos[i].chkflag) {
              first = i;
              break;
            }
          }

          for (let i = this.photos.length - 1; i >= 0; i--) {
            if (this.photos[i].chkflag) {
              last = i;
              break;
            }
          }

        }

        this.dataSend = [];
        for (let i = first; i <= last; i++) {
          this.photos[i].chkflag = true;

          this.selectedPhotos.push({
            Client_Result_Photo_FileName: this.photos[i].Client_Result_Photo_FileName,
            Client_Result_Photo_ID: this.photos[i].Client_Result_Photo_ID,
            CRP_New_pkeyId: this.photos[i].CRP_New_pkeyId,
            LabelName:this.label
          });

          this.dataSend.push({
            Client_Result_Photo_FileName: this.photos[i].Client_Result_Photo_FileName,
            Client_Result_Photo_ID: this.photos[i].Client_Result_Photo_ID,
            CRP_New_pkeyId: this.photos[i].CRP_New_pkeyId,
          });
        }
      } else {
        for (let i = 0; i < this.photos.length; i++) {
          if (this.photos[i].Client_Result_Photo_ID === val.Client_Result_Photo_ID) {


            this.selectedPhotos.push({
              Client_Result_Photo_FileName: this.photos[i].Client_Result_Photo_FileName,
              Client_Result_Photo_ID: this.photos[i].Client_Result_Photo_ID,
              CRP_New_pkeyId: this.photos[i].CRP_New_pkeyId,
              LabelName:this.label
            });

            this.dataSend.push({
              Client_Result_Photo_FileName: this.photos[i].Client_Result_Photo_FileName,
              Client_Result_Photo_ID: this.photos[i].Client_Result_Photo_ID,
              CRP_New_pkeyId: this.photos[i].CRP_New_pkeyId,
            });
          }
        }
      }
    }
    else {
      this.dataSend = this.dataSend.filter(obj => {
        return obj.Client_Result_Photo_ID !== val.Client_Result_Photo_ID;
      });
    }

    this.dataSendChange.emit(this.dataSend)
  }

  downloadimg(fileUrl, fileName) {
    this.photoService.downloadSingleImage(fileUrl)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = fileName + '.jpg';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }

  PhotoModel(photos, itemval, index) {
    const data = {
      itemval: itemval,
      index: index,
      photos: photos
    }
    this.photoModal.emit(data);
  }
  PhotoModel_Task(selectedPhotos, itemval, index,allPhotos) {
    // debugger;
    var photoCollection=[];

    selectedPhotos.Items.forEach(element => {
      photoCollection.push(element);
    });

    var filteredPhotos=allPhotos.filter(x=>x.Task_Photo_Button_Id!=selectedPhotos.Task_Photo_Button_Id)

    filteredPhotos.forEach(element => {
      element.Items.forEach(photo => {
        photoCollection.push(photo)
      });
    });

    const data = {
      itemval: itemval,
      index: index,
      photos: photoCollection
    }
    this.photoModal.emit(data);
    // photoCollection=[];
  }

  RemoveImage(itemval) {
    let Cnfm = confirm("Are you sure remove this records..?");
    if (Cnfm) {
      this.photoObj.Client_Result_Photo_ID = itemval.Client_Result_Photo_ID;
      this.photoService
        .DeleteCLientImagesData(this.photoObj)
        .subscribe(response => {
          this.removephoto.emit();
        });
    }
  }

  UnlablePhoto(item) {
    if (item.CRP_New_pkeyId != 0) {
      this.photoObj.CRP_New_pkeyId = item.CRP_New_pkeyId;
      this.photoObj.Client_Result_Photo_Wo_ID = item.Client_Result_Photo_Wo_ID;
      this.photoObj.Client_Result_Photo_ID = item.Client_Result_Photo_ID;
      this.photoObj.Type = 2;
      this.photoService.AddFOhPhoto(this.photoObj).subscribe(res => {
        this.MessageFlag = 'Unlabel Photo...';
        this.commonMessage();
        this.unlabe.emit();
      })
    }
    else {
      alert('Please lable first...');
    }
  }

  removeTaskImage(val) {
    let Cnfm = confirm("Are you sure remove this records..?");
    if (Cnfm) {
      this.photoObj.CRP_New_pkeyId = val.CRP_New_pkeyId;
      this.photoService
        .DeleteTaskCLientPhotoData(this.photoObj)
        .subscribe(response => {
          this.removephoto.emit();
        });
    }
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
  chkimgLablePhotos(val, i,photoIndex){
    // debugger;
    if (val.chkflag == true) {
      if (this.isCtrl !== true) {
        let first = 0, last = 0;
        if (this.isShift === false) {
          for (let i = 0; i < this.photos[photoIndex].Items.length; i++) {
            if (this.photos[photoIndex].Items[i].Client_Result_Photo_ID !== val.Client_Result_Photo_ID) {
              this.photos[photoIndex].Items[i].chkflag = false;
            } else {
              first = i;
              last = i;
            }
          }
        } else {
          for (let i = 0; i < this.photos[photoIndex].Items.length; i++) {
            if (this.photos[photoIndex].Items[i].chkflag) {
              first = i;
              break;
            }
          }

          for (let i = this.photos[photoIndex].Items.length - 1; i >= 0; i--) {
            if (this.photos[photoIndex].Items[i].chkflag) {
              last = i;
              break;
            }
          }

        }

        this.dataSend = [];
        for (let i = first; i <= last; i++) {
          this.photos[photoIndex].Items[i].chkflag = true;

           this.selectedPhotos.push({
            Client_Result_Photo_FileName: this.photos[photoIndex].Items[i].Client_Result_Photo_FileName,
            Client_Result_Photo_ID: this.photos[photoIndex].Items[i].Client_Result_Photo_ID,
            CRP_New_pkeyId: this.photos[photoIndex].Items[i].CRP_New_pkeyId,
            LabelName:this.label
          });
          this.dataSend.push({
            Client_Result_Photo_FileName: this.photos[photoIndex].Items[i].Client_Result_Photo_FileName,
            Client_Result_Photo_ID: this.photos[photoIndex].Items[i].Client_Result_Photo_ID,
            CRP_New_pkeyId: this.photos[photoIndex].Items[i].CRP_New_pkeyId,
            LabelName:this.label
          });
        }
      } else {
        for (let i = 0; i < this.photos[photoIndex].Items.length; i++) {
          if (this.photos[photoIndex].Items[i].Client_Result_Photo_ID === val.Client_Result_Photo_ID) {

            this.selectedPhotos.push({
              Client_Result_Photo_FileName: this.photos[photoIndex].Items[i].Client_Result_Photo_FileName,
              Client_Result_Photo_ID: this.photos[photoIndex].Items[i].Client_Result_Photo_ID,
              CRP_New_pkeyId: this.photos[photoIndex].Items[i].CRP_New_pkeyId,
              LabelName:this.label
            });

            this.dataSend.push({
              Client_Result_Photo_FileName: this.photos[photoIndex].Items[i].Client_Result_Photo_FileName,
              Client_Result_Photo_ID: this.photos[photoIndex].Items[i].Client_Result_Photo_ID,
              CRP_New_pkeyId: this.photos[photoIndex].Items[i].CRP_New_pkeyId,
              LabelName:this.label
            });
          }
        }
      }
    }
    else {
      this.dataSend = this.dataSend.filter(obj => {
        return obj.Client_Result_Photo_ID !== val.Client_Result_Photo_ID;
      });
      this.selectedPhotos = this.selectedPhotos.filter(obj => {
        return obj.Client_Result_Photo_ID !== val.Client_Result_Photo_ID;
      });
    }

    this.dataSendChange.emit(this.dataSend)
  }
  IsLabelNameContains(currentLabelName){
    return this.selectedPhotos.some(x=>x.LabelName===currentLabelName)
  }
}


