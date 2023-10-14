import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { BindDataModel } from '../../client-result/client-result/client-result-model';
import { BulkUploadServices } from './bulk-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent   {
  BindDataModelObj: BindDataModel = new BindDataModel();
  MessageFlag: string;
  images = [];
  photoarr =[]
   myForm = new UntypedFormGroup({
    file: new UntypedFormControl('', [Validators.required]),
    fileSource: new UntypedFormControl('', [Validators.required])
  });
   
  constructor(private xBulkUploadServices:BulkUploadServices,
    private xmodalService: NgbModal,) { }
   
  get f(){
    return this.myForm.controls;
  }
   
  onFileChange(event) {
    //debugger
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files;
        for (let i = 0; i < filesAmount.length; i++) {
                
             
                let data =  this.readFile(filesAmount[i], 1024, 768)
                let details = {
                  path:data,
                  name:filesAmount[i].name
                }
                this.images.push(details)
                    
        }
    }
  }

  public readFile(file, w, h) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = async() => {
        const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');

        // set its dimension to target size
        canvas.width = w;
        canvas.height = h;

        const image = new Image();
        image.src = fr.result.toString();
        image.onload = function () {
          // draw source image into the off-screen canvas:
          ctx.drawImage(image, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg'));
        }
      }

      fr.readAsDataURL(file);
    });
  }

    
  submit(){
    //debugger
    // console.log(this.images);
   
    for (let i = 0; i < this.images.length; i++) {
    this.BindDataModelObj.Common_pkeyID = 973;
    this.BindDataModelObj.IPLNO = '202341';
    this.BindDataModelObj.documentx = this.images[0].path;
    this.BindDataModelObj.Client_Result_Photo_FileName =this.images[i].name;
    this.BindDataModelObj.Type = 1;
    this.BindDataModelObj.datedetals = '8/26/2021';
this.xBulkUploadServices.MultiBulkUpdate(this.BindDataModelObj)
.then((res) => {
  res.subscribe(response => {
        this.MessageFlag = "Photo Uploaded...!";
        this.commonMessage();
     
    })
   
  })
}
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
}
