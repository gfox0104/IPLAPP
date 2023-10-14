import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'iplapp-photo-view',
  template: `
    <div style="border-radius:1%;overflow-y:auto;overflow-x:hidden" [ngClass]="{'container': openImgLeft == undefined, 'containerLeft': openImgLeft == 1, 'containerRight': openImgLeft == 0 }" >
      <div class="closex" (click)="close()">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <hr>
      <div class="content row justify-content-center">
        <div class="col-9">
          <div class="row">
            <div class="col-2"></div>
            <img [src]="photo.Client_Result_Photo_FilePath" class="col-md-12 col-lg-8 p-0 img-fluid mb-2 image" alt="work-thumbnail">
            <div class="col-2"></div>
          </div>
          <div class="row justify-content-md-center">
            <div class="col-md-6 d-flex align-items-center justify-content-between">
              <button class="btn btn-xs" (click)="movePrevious()"><i class="fas fa-angle-left"></i></button>
              <span> {{(index+1)}} / {{photos.length}} </span>
              <button class="btn btn-xs" (click)="moveNext()"><i class="fas fa-angle-right"></i></button>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-lg-3 col-12">
          <p style="font-size: 13px;"><b>UploadBy:</b> {{photo.Client_Result_Photo_UploadBy}}</p>
          <p style="font-size: 13px;"><b>UploadTimeStamp:</b> {{photo.Client_Result_Photo_UploadTimestamp}}</p>
          <p style="font-size: 13px;"><b>FileName:</b> {{photo.Client_Result_Photo_FileName}}</p>
          <p style="font-size: 13px;"><b>DateTimeOriginal:</b>
              {{ photo.Client_Result_Photo_CreatedOn | date: 'dd/MM/yyyy hh:mm a' }}</p>
          <p style="font-size: 13px;"><b>GPSLatitude:</b> {{ photo.Client_Result_Photo_GPSLatitude }}</p>
          <p style="font-size: 13px;"><b>GPSLongitude:</b> {{ photo.Client_Result_Photo_GPSLongitude }}</p>
          <p style="font-size: 13px;"><b>Make:</b> {{photo.Client_Result_Photo_Make}}</p>
          <p style="font-size: 13px;"><b>Model:</b> {{photo.Client_Result_Photo_Model}}</p>
          <p style="font-size: 13px;"><b>UploadFrom:</b> {{photo.Client_Result_Photo_UploadFrom}}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      position: fixed;
      width: 50%;
      left:25%;
      top: 15%;
      border-radius: 5px;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
      background: white;
      padding: 10px;
      z-index:100000;
    }
    .containerLeft {
      position: fixed;
      width: 40%;
      left:5%;
      top: 15%;
      border-radius: 5px;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
      background: white;
      padding: 10px;
      z-index:100000;
    }
    .containerRight {
      position: fixed;
      width: 40%;
      left:50%;
      top: 15%;
      border-radius: 5px;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, .5);
      background: white;
      padding: 10px;
      z-index:100000;
    }
    @media(max-width:1000px){
      .container{
        top:10%;
        left:25%;
        height:90%;
        width:60%
      }
    }
    @media(max-width:768px){
      .container{
        top: 20%;
        left: 12.5%;
        height: 75%;
        width: 75%;
    }

    .closex {
      display: flex;
      justify-content: flex-end;
    }
    .fa-times {
      font-size: 24px;
      cursor: pointer;
    }
    .content {
      display: flex;
    }
    img {
      width: 540px;
    }
    p {
      font-size: 12px;
      margin-bottom: 8px;
    }
    span {
      font-size: 12px;
      color: #6C757D;
    }
    .image {
      border-radius:2%;
      box-shadow: 0 0 4px gray;
    }
  }`]
})

export class IplPhotoViewComponent implements OnInit {
  @Input() photos;
  @Input() index;
  @Input() openImgLeft;
  @Output() closeModal = new EventEmitter;
  photo;

  ngOnInit() {
    this.photo = this.photos[this.index];
  }

  close() {
    this.closeModal.emit(false);
  }

  moveNext() {
    if (this.index === this.photos.length - 1) return;
    this.index++;
    this.photo = this.photos[this.index];
  }

  movePrevious() {
    if (this.index === 0) return;
    this.index--;
    this.photo = this.photos[this.index];
  }
}
