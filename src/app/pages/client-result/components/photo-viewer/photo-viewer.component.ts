import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientResultOldPhotoServices } from '../../client-result-photo/client-result-photo-old.service';

@Component({
  selector: 'client-photo-viewer',
  template: `
              <div class="row"  
                style="padding-top: 6px; height: 35px;background-color: #bdbbb3; width: 100%; font-size: 14px; color: black;">
                <div class="col-7"> <strong>{{title}}<span *ngIf="getPhotos"> ({{getPhotos.length}}) </span>
                  </strong>
                </div>
                <div class="col-5" style="text-align: right; color: black;">
                  <span> <a style="color: black;" href="javascript:void(0)" (click)="allPhotosToggle()"> 
                    <i class="fa fa-eye"></i>&nbsp;View&nbsp;</a>
                  </span>
                  <span><a style="color: black;" href="javascript:void(0)" *ngIf="getPhotos.length !== 0"
                      (click)="downloadPhotosAll()"><i class="fas fa-cloud-download-alt"></i>&nbsp;|&nbsp; Download </a></span>
                </div>
              </div>
              <br>
              <div class="row" [hidden]="!allPhotosToggleShow">
                <div class="col-lg-2 col-md-3 col-xs-6 thumb " *ngFor="let item of getPhotos; let i=index">
                  <div class="jab">
                    <div class="overlay">
                      <ul>
                        <li class="mdl"><a style="color:white;cursor: pointer;"
                            (click)="downloadimg($event,item.Client_Result_Photo_FilePath, item.Client_Result_Photo_FileName)"
                            [href]="item.Client_Result_Photo_FilePath"
                            [download]="item.Client_Result_Photo_FileName">Get </a>|</li>
                        <li class="mdl"><a href="javascript:void(0)" style="color:white"
                            (click)="PhotoModel(item,i)">Zoom </a>|</li>
                        <li class="mdl"><a href="javascript:void(0)" style="color:white">unlabel </a>|</li>
                        <li class="mdl"><a href="javascript:void(0)" (click)="RemoveImage(item)"
                            style="color:white"><i class="fas fa-minus-circle"></i></a></li>
                      </ul>
                    </div>
                    <div class="nopad text-center">
                      <label class="image-checkbox">
                        <img [src]="item.Client_Result_Photo_FilePath" class="img-fluid" alt="work-thumbnail">
                        <div [hidden]="!item.chkflag">
                          <input type="checkbox" [(ngModel)]="item.chkflag" (change)="chkimgAllPhotos(item,i)"
                            [ngClass]="name" style="text-align: left;
                          position: absolute;
                          margin-left: 115px;
                          overflow: auto;
                          z-index: auto;
                          width: 18px;
                          height: 17px;" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            `
})

export class PhotoViewerComponent { 
  @Input() title;
  @Input() getPhotos;
  @Input() taskname;
  @Input() ModelObj: any;
  @Output() photoDialog = new EventEmitter();

  allPhotosToggleShow: boolean;
  downloadImgSend = [];
  timeStampData = {
    date: '',
    printTime: false,
    modifyTime: '',
    isAM: true,
    lengthHours: 0,
    lengthMins: 0,
    printDateTimeExif: false,
    printDescription: false,
    stopPrinting: false,
  }

  constructor(
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
  ) {

  }

  allPhotosToggle() {
    this.allPhotosToggleShow = !this.allPhotosToggleShow;
  }

  downloadPhotosAll() {
    if (this.title === 'All Photos') {
      this.downloadImgSend = [];
      const labelArray = [];

      for (let i = 0; i < this.getPhotos.length; i++) {
        const imgpath = this.getPhotos[i].Client_Result_Photo_FileName;
        let label = '';
        for (let j = 0; j < this.taskname.length; j++) {
          if (this.taskname[j].Items[0].Items[0].Client_Result_Photo_FileName === imgpath) {
            label = this.taskname[j].Items[0].Task_Photo_Button_Name + '_';
          }
        }
        labelArray.push(label);

        this.downloadImgSend.push(imgpath);
      }

      if (this.timeStampData.stopPrinting) {
        const req = {
          FolderName: this.ModelObj.IPLNO,
          Files: this.downloadImgSend,
          Labels: labelArray
        };
        this.xClientResultOldPhotoServices.downloadImages(req).subscribe(res => {
          if (window.navigator && window.navigator.msSaveBlob) {
            // Internet Explorer workaround
            const blob = new Blob([res], {
              type: 'arraybuffer'
            });

            window.navigator.msSaveBlob(blob, this.ModelObj.IPLNO + '-ipl.zip');
          } else {
            const binaryData = [];
            binaryData.push(res);
            const downloadLink = window.URL.createObjectURL(
              new Blob([res], {
                type: 'arraybuffer'
              })
            );
            const element = document.createElement('a');
            element.href = downloadLink;
            element.download = this.ModelObj.IPLNO + '-ipl.zip';
            document.body.appendChild(element);
            element.click();
          }
        });
      } else {
        const req = {
          FolderName: this.ModelObj.IPLNO,
          Files: this.downloadImgSend,
          Labels: labelArray,
          TimeStamps: this.timeStampData
        };
        this.xClientResultOldPhotoServices.downloadImagesWithTimeStamp(req).subscribe(res => {
          if (window.navigator && window.navigator.msSaveBlob) {
            // Internet Explorer workaround
            const blob = new Blob([res], {
              type: 'arraybuffer'
            });

            window.navigator.msSaveBlob(blob, this.ModelObj.IPLNO + '-ipl.zip');
          } else {
            const binaryData = [];
            binaryData.push(res);
            const downloadLink = window.URL.createObjectURL(
              new Blob([res], {
                type: 'arraybuffer'
              })
            );
            const element = document.createElement('a');
            element.href = downloadLink;
            element.download = this.ModelObj.IPLNO + '-ipl.zip';
            document.body.appendChild(element);
            element.click();
          }
        });
      }
    } else {
      this.downloadImgSend = [];
      for (let i = 0; i < this.getPhotos.length; i++) {
        let imgpath = this.getPhotos[i].Client_Result_Photo_FilePath;
  
        this.downloadImgSend.push(imgpath);
      }
      window.open("/DownloadFile/DownloadZipFile?ImgPath=" + this.downloadImgSend, "_blank");
    }
  }

  
  downloadimg($event, item, fileName) {
    $event.preventDefault();
    const req = {
      FolderName: this.ModelObj.IPLNO,
      File: fileName
    };
    this.xClientResultOldPhotoServices.downloadSingleImage(req).subscribe((res: any) => {
      if (window.navigator && window.navigator.msSaveBlob) {
        // Internet Explorer workaround
        const blob = new Blob([res], {
          type: 'arraybuffer'
        });

        window.navigator.msSaveBlob(blob, fileName.slice(0, -3) + 'png');
      } else {
        const binaryData = [];
        binaryData.push(res);
        const downloadLink = window.URL.createObjectURL(
          new Blob([res], {
            type: 'arraybuffer'
          })
        );
        const element = document.createElement('a');
        element.href = downloadLink;
        element.download = fileName.slice(0, -3) + 'png';
        document.body.appendChild(element);
        element.click();
      }
    });
  }

  PhotoModel(itemval, index) {
    this.photoDialog.emit({
      itemval: itemval,
      index: index
    });
  }

  RemoveImage(itemval) {

  }

  chkimgAllPhotos(val, i) {

  }
}
