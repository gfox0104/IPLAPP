import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ClientPhotoRef,
  PhotoTransferModel,
} from './client-result-photo-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import _ from 'underscore';

import {
  ClientResultPhotoModel,
  TaskBidPhoto,
  Custom_PhotoLabel,
  WorkOrder_CustomPhotoLabel,
  photoStatusType,
  randomString,
} from './client-result-photo-model';
import { ClientResultOldPhotoServices } from './client-result-photo-old.service';
import {
  BindDataModel,
  TaskBidMasterModel,
} from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IplAppDocumentUpload } from 'src/app/components/iplapp-upload-document/iplapp-upload-document.component';
import { CommonMenuServices } from 'src/app/services/util/user-access/user-access.service';
import { WorkOderViewModel } from '../../work-order/work-order-view/work-order-view-model';
import { SaveWorkOrderViewServices } from '../../work-order/work-order-view/work-order-view-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Tabs } from './constants/tabs';

import * as piexif from 'piexifjs';
import moment from 'moment';
import { flowRight } from 'lodash';

declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}


@Component({
  templateUrl: './client-result-photo.component.html',
  styleUrls: ['./client-result-photo.component.scss'],
  providers: [DatePipe],
})
export class ClientResultPhotoComponent implements OnInit {
  ClientPhotoRefObj: ClientPhotoRef = new ClientPhotoRef();
  ClientResultPhotoModelObj: ClientResultPhotoModel =
    new ClientResultPhotoModel();
  BindDataModelObj: BindDataModel = new BindDataModel();
  TaskBidPhotoobj: TaskBidPhoto = new TaskBidPhoto();
  Custom_PhotoLabelObj: Custom_PhotoLabel = new Custom_PhotoLabel();
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  WorkOrder_CustomPhotoLabelObj: WorkOrder_CustomPhotoLabel =
    new WorkOrder_CustomPhotoLabel();
  workOrderId: number;
  tabhide: boolean = false;
  isSubmitted: boolean = false;
  ModelObj: any;
  button = 'Save';
  prompMessage: string;
  timeStampData = {
    date: '',
    printTime: false,
    modifyTime: "00",
    isAM: moment(new Date()).format('A'),
    lengthHours: "00",
    lengthMins: "00",
    printDateTimeExif: false,
    printDescription: false,
    stopPrinting: false,
    Description: '',
  };
  isShown: boolean = true;
  divclass = 'col-12';
  GetPhotos: any;
  unflag: Array<any>;
  taskname: Array<any>;
  documentdlst: any;
  deleteimg: any;
  popupImage: any;
  imgCurrentIndex: number;
  popImages: Array<any>;
  CustomPhotoArray = [];
  Documentshow = false;
  dataSend = [];
  dataSend_lable = [];
  GetTaskPhotos: any;
  bidItems = [];
  completionItems = [];
  inspectionItems = [];
  damageItems = [];
  violationItems = [];
  hazardItems = [];
  customItems = [];
  downloading: boolean;
  div2: any;
  workOderViewModelobj: WorkOderViewModel = new WorkOderViewModel();
  filteredOrders: Array<any>;
  infogridData: any;
  coltitile = 'Date Range';
  LabelList = [
    { lblIdId: 1, lblText: 'Bids' },
    { lblIdId: 2, lblText: 'Completion' },
    { lblIdId: 3, lblText: 'Damage' },
    { lblIdId: 4, lblText: 'Inspection' },
    { lblIdId: 5, lblText: 'Custom' },
  ];
  CompList = [
    { lblIdId: 1, lblText: 'Before' },
    { lblIdId: 2, lblText: 'During' },
    { lblIdId: 3, lblText: 'After' },
  ];
  photoTaskList = [];
  photoTransferModelObj: PhotoTransferModel = new PhotoTransferModel();
  photoTransferTask: any;
  TaskBidPhotoTransferobj: TaskBidPhoto = new TaskBidPhoto();
  TaskbtnName = '';
  IsPTIpl = false;
  IsPTTask = false;
  IsPTLable = false;
  IsPTCmpTask = false;
  IsPTCmpTaskHdn = true;
  myDate = new Date();
  //added by pradeep start
  workOrderID = 0;
  ClientResultPhotoModelGetObj: ClientResultPhotoModel =
    new ClientResultPhotoModel();
  isButtonShow = true;
  IPLList = [];

  // Photo Analysis

  taskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  clientResultPhotoModelObj: ClientResultPhotoModel =
    new ClientResultPhotoModel();
  pastPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  currentPhotos: Array<any> = [];
  pastOrders: Array<any> = [];
  pastPhotos: Array<any> = [];
  pastWorkOrderId;
  currentPhotoOpen: Boolean;
  pastPhotoOpen: Boolean;
  selectedCurrentImage: any;
  selectedPastImage: any;
  leftcnt: any;
  rightcnt: any;
  downloadData: any;

  OrderPastDTOObj = {
    WorkOrder_ID: 0,
    Type: 0,
    WorkOrder_Data: null,
    UserID: 0,
  };
  //pradeep end
  Task_Photo_Label_Name:any
  IPLNumberList: any;
  PhotoTransferIPLNo_List: any;

  tabs = Tabs;
  constructor(
    private xRouter: Router,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private modalService: NgbModal,
    private xRoute: ActivatedRoute,
    private xClientResultServices: ClientResultServices,
    private EncrDecr: EncrDecrService,
    private httpClient: HttpClient,
    private commonMenuService: CommonMenuServices,
    private workOrderService: SaveWorkOrderViewServices,
    private ref: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
   
  }

  ngOnInit() {
    this.showSpinner() ;
    this.spinner.show('loading');
    this.spinner.hide('downloading');
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workOrderId = parseInt(workOrderID);
    this.tabhide = this.commonMenuService.userRestrict()['tabhide'];
    this.clientResultPhotoModelObj.Client_Result_Photo_Wo_ID = this.workOrderId;
    this.getCurrentImages();
    this.getModelData();
    this.getTaskData();
    this.GetPhotoAnalysis();
    this.GetWorkOrderIPListDropdown();
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }
  getModelData() {
    this.TaskBidMasterModelObj.workOrder_ID = this.workOrderId;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe((response) => {
        //debugger
        this.ModelObj = response[0][0];
        this.xClientResultServices.setPathParam(this.ModelObj);
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(['/workorder']);
        } else {
          this.BindDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;
          this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
          this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID =
            this.ModelObj.workOrder_ID;
          this.ClientResultPhotoModelObj.IPLNO = this.ModelObj.IPLNO;
          this.GetClientImages();
        }
      });
  }

  getTaskData() {
    // debugger;
    this.TaskBidPhotoobj.Task_Bid_WO_ID = this.workOrderId;
    this.xClientResultOldPhotoServices
      .taskphotoClient(this.TaskBidPhotoobj)
      .subscribe((response) => {
        // debugger;
        this.GetTaskPhotos = response[1];
        this.bidItems = this.GetTaskPhotos.filter(
          (item) => item.ButtonName1 === 'Bid'
        );
        this.completionItems = this.GetTaskPhotos.filter(
          (item) => item.ButtonName1 === 'Before'
        );
        this.damageItems = this.GetTaskPhotos.filter(
          (item) => item.ButtonName1 === 'Damage'
        );
        this.inspectionItems = this.GetTaskPhotos.filter(
          (item) => item.ButtonName1 === 'Inspection'
        );
        this.violationItems = this.GetTaskPhotos.filter(
          (item) => item.ButtonName1 === 'Violation'
        );
        this.hazardItems = this.GetTaskPhotos.filter(
          (item) => item.ButtonName1 === 'Hazard'
        );
        this.customItems = this.GetTaskPhotos.filter(
          (item) => item.ButtonName1 === 'Label'
        );
      });
  }
  RefreshImageData() {
    //debugger
    this.spinner.show('Updating');
    this.xClientResultOldPhotoServices
      .ReloadCLientImagesDataMaster(this.ClientResultPhotoModelObj)
      .subscribe((response) => {
        if (response[0] > 0) {
          this.spinner.hide('Updating');
          this.commonMessage('Image Refresh Successfully...');
          this.GetClientImages();
          this.getTaskData();
        }
      });
  }

  GetClientImages() {
    debugger
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataMaster(this.ClientResultPhotoModelObj)
      .subscribe((response) => {
        debugger
        this.isSubmitted = false;
        this.GetPhotos = response[0];
        this.taskname = response[2];
        this.unflag = response[1];
        this.documentdlst = response[3];
        this.deleteimg = response[4];
        this.unflag.forEach((photo, index) => {
          photo.Client_Result_Photo_FileName =
            'Unlabeled' + (index + 1) + '.jpg';
        });
        this.GetCustomPhotoLabel();
      });
  }

  PhotoModel(data, messagecontent) {
    //debugger
    this.popupImage = data.itemval.Client_Result_Photo_FilePath;
    this.imgCurrentIndex = data.index;
    this.popImages = data.photos;
    this.commonPhoto(messagecontent);
  }

  CopyLink() {
    const el = document.createElement('textarea');
    el.value = this.popupImage;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  commonPhoto(content) {
    this.modalService.open(content, { windowClass: 'xlModal' }).result.then(
      (result) => {},
      (reason) => {}
    );

    // this.modalService
    //   .open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
    //   .result.then(
    //     (result) => {},
    //     (reason) => {}
    //   );
  }

  SaveChange(data) {
    this.isSubmitted = false;
    this.BindDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;
    this.BindDataModelObj.Client_Result_Photo_FileName =
      randomString() + '.jpg';
    this.BindDataModelObj.Type = 1;
    this.BindDataModelObj.datedetals = this.datePipe.transform(
      this.myDate,
      'MMMM dd yyyy, h:mm:ss a'
    );
    this.xClientResultOldPhotoServices
      .SinglePhotoUpdate(this.BindDataModelObj, data.image)
      .then((res) => {
        res.subscribe((response) => {
          if (data.photoLabel) {
            this.movePhoto(data.photoLabel, response[0].Client_Result_Photo_ID);
          }
          this.isSubmitted = true;
          this.commonMessage('Photo changes Saved...');
          this.GetClientImages();
        });
      });
  }

  movePhoto(photoLabel, photo_Id) {
    const taskItem = this.GetTaskPhotos.find(
      (item) => item.Task_Label_Name === photoLabel.name
    );
    this.dataSend.push({
      Client_Result_Photo_FilePath:
        this.BindDataModelObj.Client_Result_Photo_FilePath,
      Client_Result_Photo_FileName:
        this.BindDataModelObj.Client_Result_Photo_FileName,
      Client_Result_Photo_ID: photo_Id,
    });

    this.addbef(taskItem, photoLabel.buttonName);
  }

  bid(bidcontent) {
    console.log('work order id ==>  ' + this.workOrderId);
    this.modalService.open(bidcontent, { windowClass: 'xlModal' }).result.then(
      (result) => {
        this.getTaskData();
      },
      (reason) => {
        this.getTaskData();
      }
    );
  }

  Completion(invcontent) {
    this.modalService.open(invcontent, { windowClass: 'xlModal' }).result.then(
      (result) => {
        this.getTaskData();
      },
      (reason) => {
        this.getTaskData();
      }
    );
  }

  Damage(damagecontent) {
    this.modalService
      .open(damagecontent, { windowClass: 'xlModal' })
      .result.then(
        (result) => {
          this.getTaskData();
        },
        (reason) => {
          this.getTaskData();
        }
      );
  }

  OpenTimeStamp(contentpop) {
    this.modalService
      .open(contentpop, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  OpenUpload(photo: boolean) {
    // debugger;
    this.sqNo = 0;
    const modalRef = this.modalService.open(IplAppDocumentUpload, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.label = photo
      ? 'Upload Photos'
      : 'Upload Documents';
    modalRef.componentInstance.uploadSuccess.subscribe(($event) => {
      if (photo) {
        this.displaySuccess($event);
      } else {
        this.displaySuccessDocument($event);
      }
    });
    modalRef.result.then(
      (result) => {
        this.GetClientImages();
      },
      (reason) => {
        this.GetClientImages();
      }
    );
  }
  sqNo: number = 0;
  displaySuccess(e) {
    // debugger;
    if (e.operation == 'upload') {
      this.sqNo = ++this.sqNo;
      // console.log('Sq No', this.sqNo);
      const imageInput = e.files[0].rawFile;
      this.BindDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;
      this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
      this.BindDataModelObj.documentx = imageInput;
      this.BindDataModelObj.Client_Result_Photo_FileName = imageInput.name;
      this.BindDataModelObj.Client_Result_Photo_Seq = this.sqNo;
      this.BindDataModelObj.Type = 1;
      this.BindDataModelObj.datedetals = this.datePipe.transform(
        this.myDate,
        'MMMM dd yyyy, h:mm:ss a'
      );
      this.xClientResultOldPhotoServices
        .CommonPhotosUpdate(this.BindDataModelObj)
        .then((res) => {
          res.subscribe((response) => {
            this.workOrderService
              .PostNewAccessLog(this.ModelObj.workOrder_ID, 19)
              .subscribe((res) => {});

            this.GetClientImages();
          });
        });
    } else {
      alert('remove img called');
    }
  }

  displaySuccessDocument(e) {
    if (e.operation == 'upload') {
      const documentInput = e.files[0].rawFile;
      this.BindDataModelObj.Common_pkeyID = this.ModelObj.workOrder_ID;
      this.BindDataModelObj.documentx = documentInput;
      this.BindDataModelObj.Client_Result_Photo_FileName = documentInput.name;
      this.BindDataModelObj.Client_PageCalled = 3;
      this.BindDataModelObj.Type = 1;
      this.BindDataModelObj.workOrderNumber = '0';
      this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
      this.xClientResultOldPhotoServices
        .CommonDocumentsUpdate(this.BindDataModelObj)
        .then((res) => {
          res.subscribe(() => {});

          this.workOrderService
            .PostNewAccessLog(this.ModelObj.workOrder_ID, 17)
            .subscribe((res) => {});
        });
    } else {
      alert('remove img called');
    }
  }

  GoToBack() {
    this.xRouter.navigate(['/workorder']);
  }

  openNav() {
    this.isShown = false;
    this.divclass = 'col-md-9 col-lg-9 col-12';
    this.div2 = 'col-md-3 col-lg-3 col-12';
  }

  closeNav() {
    this.isShown = true;
    this.divclass = 'col-12';
  }

  addbef(arg, btnName) {
    if (this.dataSend.length != 0) {
      this.ClientResultPhotoModelObj.ImageArray = this.dataSend;
      this.ClientResultPhotoModelObj.Client_Result_Photo_TaskId =
        arg.Task_Bid_TaskID;
      this.ClientResultPhotoModelObj.Client_Result_Photo_Task_Bid_pkeyID =
        arg.Task_Bid_pkeyID;
      this.ClientResultPhotoModelObj.Client_Result_Photo_StatusType =
        photoStatusType(btnName);
      this.ClientResultPhotoModelObj.Type = 5;

      this.xClientResultOldPhotoServices
        .UpdateDataPost(this.ClientResultPhotoModelObj)
        .subscribe((response) => {
          this.commonMessage('Successfully Added...!');
          this.getTaskData();
          this.dataSend = [];
          this.ClientResultPhotoModelObj.ImageArray = [];
          this.GetClientImages();
        });
    } else {
      alert('Please select photo(s) first..!');
    }
  }

  commonMessage(message) {
    const modalRef = this.modalService.open(IplAppModalContent, {
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.MessageFlag = message;
    modalRef.componentInstance.buttonTitle = 'Continue';
    modalRef.result.then(
      (result) => {},
      (reason) => {
        this.modalService.dismissAll();
      }
    );
  }

  DocumentViseTogle() {
    this.Documentshow = !this.Documentshow;
  }

  // download call all flag images
  download() {
    //  debugger;

    if (this.downloading) return;
    if (this.dataSend.length === 0) {
      this.DownloadPhotosAll();
    }
  }

  DownloadPhotosAll() {
    // debugger;
    this.downloading = true;
    this.spinner.show('downloading');
    //this.createZip(); // was working for in angular download

    //this.downloadZipUsingSocket();
    this.downloadZipUsingBackend();

    //this.downloadZipUsingBackend();
  }

  downloadSelectedPhotos() {
    // debugger;
    // console.log(this.dataSend);

    if (this.dataSend.length > 0) {
      this.downloading = true;
      this.spinner.show('downloading');
      var _this = this;
      let DownloadImgSend = [];
      var labelArray = [];
      for (var i = 0; i < this.dataSend.length; i++) {
        var imgpath = this.dataSend[i].Client_Result_Photo_FileName;
        var label = '';
        if (this.taskname != null) {
          for (var j = 0; j < this.taskname.length; j++) {
            if (
              this.taskname[j].Items[0].Items[0]
                .Client_Result_Photo_FileName === imgpath
            ) {
              label = this.taskname[j].Items[0].Task_Photo_Button_Name + '_';
            }
          }
          labelArray.push(label);
        }
        DownloadImgSend.push(imgpath);
      }
      var req = {
        FolderName: this.ModelObj.IPLNO,
        Files: DownloadImgSend,
        Labels: labelArray,
        WorkOrderNumber: this.ModelObj.workOrderNumber,
        Address: this.ModelObj.address1,
        Client_Result_Photo_Wo_ID: this.ModelObj.workOrder_ID,
        PN_DN_Type :2,
        Type: 1,
      };

      this.xClientResultServices
        .downloadFileFromBackend(req)
        .subscribe((response) => {
          // debugger;
          this.modalService
            .open(
              'Download is in progress! We will send you notification once download is completed!',
              { ariaLabelledBy: 'modal-basic-title' }
            )
            .result.then(
              (result) => {},
              (reason) => {}
            );

          _this.downloading = false;
          _this.spinner.hide('downloading');
        });
    } else {
      this.commonMessage('No file(s) selected to download!');
    }
  }

  downloadZipUsingBackend() {
    this.downloading = true;
    this.spinner.show('downloading');
    var _this = this;
    let DownloadImgSend = [];
    var labelArray = [];
    for (var i = 0; i < this.GetPhotos.length; i++) {
      var imgpath = this.GetPhotos[i].Client_Result_Photo_FileName;
      var label = '';
      if (this.taskname != null) {
        for (var j = 0; j < this.taskname.length; j++) {
          if (
            this.taskname[j].Items[0].Items[0].Client_Result_Photo_FileName ===
            imgpath
          ) {
            label = this.taskname[j].Items[0].Task_Photo_Button_Name + '_';
          }
        }
        labelArray.push(label);
      }
      DownloadImgSend.push(imgpath);
    }
    var req = {
      FolderName: this.ModelObj.IPLNO,
      Files: DownloadImgSend,
      Labels: labelArray,
      WorkOrderNumber: this.ModelObj.workOrderNumber,
      Address: this.ModelObj.address1,
      Client_Result_Photo_Wo_ID: this.ModelObj.workOrder_ID,
      PN_DN_Type :1,
      Type: 1,
    };

    this.xClientResultServices
      .downloadFileFromBackend(req)
      .subscribe((response) => {
        // debugger;
        this.modalService
          .open(
            'Download is in progress! We will send you notification once download is completed!',
            { ariaLabelledBy: 'modal-basic-title' }
          )
          .result.then(
            (result) => {},
            (reason) => {}
          );

        _this.downloading = false;
        _this.spinner.hide('downloading');
      });
  }

  async createZip() {
    const zip = new JSZip();
    const zipName =
      this.ModelObj.workOrderNumber +
      '_' +
      this.ModelObj.address1.replace(/\s+/g, '_') +
      '_ipl.zip';
    let allPhotos: Array<any> = [];
    allPhotos = this.unflag.map((photo) => {
      return photo;
    });
    //console.log('allPhotos', allPhotos)
    var allmultiplePhotoList = [];

    this.taskname.forEach((task) => {
      task.Items.forEach((condition) => {
        condition.Items.forEach((photo) => {
          allmultiplePhotoList.push(photo);
        });
      });
    });

    this.taskname.forEach((task) => {
      task.Items.forEach((condition) => {
        condition.Items.forEach((photo) => {
          var selectedPhoto = _.where(allPhotos, {
            Client_Result_Photo_FileName: photo.Client_Result_Photo_FileName,
          });

          if (selectedPhoto.length > 0) {
            var multiplePhoto = _.where(allmultiplePhotoList, {
              Client_Result_Photo_FileName: photo.Client_Result_Photo_FileName,
            });
            var i;
            for (i = 0; i < multiplePhoto.length; i++) {
              if (i > 0) {
                var fileName = multiplePhoto[
                  i
                ].Client_Result_Photo_FileName.substr(
                  0,
                  multiplePhoto[i].Client_Result_Photo_FileName.lastIndexOf('.')
                );
                var fileExt =
                  multiplePhoto[i].Client_Result_Photo_FileName.split(
                    '.'
                  ).pop();
                multiplePhoto[i].Client_Result_Photo_FileName =
                  fileName + '_' + i + '.' + fileExt;

                var sphoto = _.where(allPhotos, {
                  Client_Result_Photo_FileName:
                    multiplePhoto[i].Client_Result_Photo_FileName,
                });
                if (sphoto.length > 0) {
                } else {
                  allPhotos.push(multiplePhoto[i]);
                }
              }
            }

            // var fileName = photo.Client_Result_Photo_FileName.substr(0, photo.Client_Result_Photo_FileName.lastIndexOf('.'));
            // var fileExt = photo.Client_Result_Photo_FileName.split('.').pop();
            // photo.Client_Result_Photo_FileName =fileName + "_1." + fileExt;
            // multiplePhotoList.push(photo);
          } else {
            allPhotos.push(photo);
          }
        });
      });
    });

    // debugger;
    const promises = allPhotos.map((photo) => {
      //debugger
      return this.getFile(photo.Client_Result_Photo_FilePath);
    });

    // debugger;
    await Promise.all(promises).then((files) => {
      files.forEach((file: any, i) => {
        const b: any = new Blob([file], { type: '' + file.type + '' });

        zip.file(allPhotos[i].Client_Result_Photo_FileName, b);
      });
      zip.generateAsync({ type: 'blob' }).then((content) => {
        if (content) {
          FileSaver.saveAs(content, zipName);
        }
        this.spinner.hide('downloading');
        this.downloading = false;
      });
    });
  }

  async getFile(url: string) {
    // debugger;
    const httpOption = {
      responseType: 'blob' as 'json',
    };

    const res = await this.httpClient
      .get(url, httpOption)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        // console.log('err', err);
        const error = err.error;
        return error;
      });
    return res;
  }

  AddCustomLabel(POPUP) {
    this.modalService
      .open(POPUP, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  CustomPhotoLabelSubmit() {
    let message;
    if (this.Custom_PhotoLabelObj.PhotoLabel_Name != '') {
      this.Custom_PhotoLabelObj.workOrder_ID =
        this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID;
      this.Custom_PhotoLabelObj.Type = 5;
      this.xClientResultOldPhotoServices
        .CustomPhotoLabelPost(this.Custom_PhotoLabelObj)
        .subscribe((response) => {
          if (response[0][0].PhotoLabel_pkeyID != '') {
            message = 'Added...!';
          } else {
            message = 'Allready Added...!';
          }
          this.commonMessage(message);
          this.getTaskData();
          this.Custom_PhotoLabelObj.PhotoLabel_Name = '';
          if (response[0][0].length != 0) {
            this.CustomPhotoArray = response[0][0];
          }
        });
    } else {
      message = 'Please Enter Name...!';
      this.commonMessage(message);
    }
  }

  GetCustomPhotoLabel() {
    this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID =
      this.ModelObj.workOrder_ID;
    this.xClientResultOldPhotoServices
      .CustomPhotoLabelGET(this.ClientResultPhotoModelObj)
      .subscribe((response) => {
        this.CustomPhotoArray = response[0];
        this.spinner.hide('loading');
      });
  }

  SingleClick_CustomPhotosDelete(items, index) {
    const cnfm = confirm('Are you Sure delete this records..?');
    if (cnfm) {
      this.Custom_PhotoLabelObj.PhotoLabel_pkeyID = items.PhotoLabel_pkeyID;
      this.Custom_PhotoLabelObj.workOrder_ID = this.ModelObj.workOrder_ID;
      this.Custom_PhotoLabelObj.Type = 6;

      this.xClientResultOldPhotoServices
        .CustomPhotoLabelPost(this.Custom_PhotoLabelObj)
        .subscribe((response) => {
          this.commonMessage('Deleted..!');

          this.Custom_PhotoLabelObj.Type = 1;
          this.CustomPhotoArray.splice(index, 1);
          this.GetClientImages();
          this.getTaskData();
        });
    }
  }

  // download particular image
  downloadDocument($event) {
    this.dataSend.push({
      Client_Result_Photo_FileName: 'AAA.docx',
    });
    this.downloadimg($event, '', 'AAA.docx');
  }

  downloadimg($event, item, fileName) {
    $event.preventDefault();
    const req = {
      FolderName: this.ModelObj.IPLNO,
      File: fileName,
    };
    this.xClientResultOldPhotoServices
      .downloadSingleDoc(req)
      .subscribe((res: any) => {
        if (window.navigator && window.navigator.msSaveBlob) {
          // Internet Explorer workaround
          const blob = new Blob([res], {
            type: 'arraybuffer',
          });

          window.navigator.msSaveBlob(blob, fileName.slice(0, -3) + 'jpg');
        } else {
          const binaryData = [];
          binaryData.push(res);
          const downloadLink = window.URL.createObjectURL(
            new Blob([res], {
              type: 'arraybuffer',
            })
          );
          const element = document.createElement('a');
          element.href = downloadLink;
          element.download = fileName.slice(0, -3) + 'jpg';
          document.body.appendChild(element);
          element.click();
        }
      });
  }

  RemoveImage() {
    //debugger
    this.GetClientImages();
    this.getTaskData();
  }

  photoTransfer(content) {
    // debugger;
    if (this.dataSend.length === 0) {
      this.commonMessage('Please select at least one photo from all photos.');
    } else {
      this.modalService
        .open(content, {
          size: 'md',
          windowClass: 'custom-class',
          ariaLabelledBy: 'modal-basic-title',
        })
        .result.then(
          (result) => {},
          (reason) => {
            this.photoTransferModelObj.IPLNO = '';
          }
        );
    }
  }

  async transferPhotos(transferType) {
    debugger
    this.IsPTIpl = false;
    this.IsPTTask = false;
    this.IsPTLable = false;
    this.IsPTCmpTask = false;
    let errCnt = 0;


    if (!this.photoTransferModelObj.IPLNO) {
      this.IsPTIpl = true;
      errCnt = errCnt + 1;
    }

    if (!this.photoTransferModelObj.LabelId) {
      this.IsPTLable = true;
      errCnt = errCnt + 1;
    }

    if (!this.photoTransferModelObj.TaskId) {
      this.IsPTTask = true;
      errCnt = errCnt + 1;
    }
    // if (
    //   this.photoTransferModelObj.LabelId > 0 && this.photoTransferModelObj.TaskId === 0
    // ) {
    //   this.IsPTTask = true;
    //   errCnt = errCnt + 1;
    // }
    if (
      this.photoTransferModelObj.LabelId === 2 &&
      this.photoTransferModelObj.CompletionLabelId === 0
    ) {
      this.IsPTCmpTask = true;
      errCnt = errCnt + 1;
    }

    if (this.isSubmitted) return;

    if (this.dataSend.length === 0) {
      this.commonMessage('No photos selected');
    } else if (errCnt > 0) {
      return;
    } 


    // if (this.photoTransferModelObj.TaskId == null){
    //   this.prompMessage="Please Select the task";
    // }

    // if(this.IsPTIpl == true)
    // {
    //   this.prompMessage="Are you sure Move To another Work Order ..?";
    // }
    // else(this.IsPTTask == true)
    // {
    //   this.prompMessage="Are you sure copy To another Work Order..?";
    // }

    // let promp = confirm(this.prompMessage);
    // if (!promp) return;

    if(transferType == 2)
    {
      this.prompMessage="Are you sure Move To another Work Order ..?";
    }
    if(transferType == 1)
    {
      this.prompMessage="Are you sure copy To another Work Order..?";
    }

    let promp = confirm(this.prompMessage);
    if (!promp) return;

    
    
    else {
      this.IsPTIpl = false;
      this.IsPTLable = false;
      this.IsPTTask = false;
      
      this.IsPTCmpTask = false;

      this.isSubmitted = true;

      var tList = this.photoTransferTask.filter(
        (item) => item.Task_Bid_pkeyID === this.photoTransferModelObj.TaskId
      );

      let param = {
        Client_Result_Photo_Wo_ID: this.TaskBidMasterModelObj.workOrder_ID,
        Client_Result_Photo_IPLNo: this.photoTransferModelObj.IPLNO,
        Client_Result_Photo_CM_Type: transferType,
        Type: 1,
        WorkOrderLabelMoveCopyPhoto: JSON.stringify(this.dataSend),
        Client_Result_Photo_TaskId: tList[0].Task_Bid_TaskID,
        Client_Result_Photo_Task_Bid_pkeyID: tList[0].Task_Bid_pkeyID,
        Client_Result_Photo_StatusType: photoStatusType(this.TaskbtnName),
      };

      this.xClientResultOldPhotoServices
        .photoTransferApi(JSON.stringify(param))
        .subscribe((response) => {
          this.commonMessage('Photo transfered successfully...!');
          this.photoTransferModelObj = new PhotoTransferModel();
          this.isSubmitted = false;
          this.dataSend = [];
          this.photoTaskList = [];
          if (transferType === 2) {
            this.GetClientImages();
          }
        });
    }
  }

  async loadImage(src: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = src;
    return new Promise((resolve) => {
      image.onload = (ev) => {
        resolve(image);
      };
    });
  }

  async addDateToImage(data) {
    let varForPath = this.GetPhotos.find(
      (photo) => photo.Client_Result_Photo_ID == data.Client_Result_Photo_ID
    );

    var description = '',
      descd = '',
      SelectedDateAndTime='';
    if(this.timeStampData.printDateTimeExif)
    {
        var getPhotoDates = new Date(varForPath.Client_Result_Photo_CreatedOn);
        SelectedDateAndTime = getPhotoDates.toLocaleDateString() +' ' +
          getPhotoDates.getHours() +
          ':' +
          getPhotoDates.getMinutes() +
          ' ' +
          getPhotoDates.toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
          }).split(' ')[1];
        // SelectedDateAndTime = this.DatetimeFormate(getPhotoDates, '', true);
        description = this.timeStampData.Description;
        descd = description.replace(/(.{66})/g, '$1/n');
    }
    else
    {
        description = this.timeStampData.Description;
        var  time = this.timeStampData.modifyTime + ':' + this.timeStampData.lengthMins +' '+ this.timeStampData.isAM;

        var date = new Date(this.timeStampData.date)
        SelectedDateAndTime = date.toLocaleDateString() + '  ' + time;
        // SelectedDateAndTime = this.DatetimeFormate(this.timeStampData.date, time, false);
        descd = description.replace(/(.{66})/g, '$1/n');
    }


    let canvas = document.createElement('canvas') as HTMLCanvasElement;
    let newImg;
    const image: HTMLImageElement = await this.loadImage(
      data.Client_Result_Photo_FilePath
    );
    let ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const text = SelectedDateAndTime;
    const fontSize = 30;

    ctx.fillStyle = 'black';

    ctx.font = `bold ${fontSize}px Arial`;
    // ctx.font = '38px Arial';
    // canvas.style.left = "100px";
    // canvas.style.top = "100px";
    // canvas.style.position = "absolute";
    const textWidth = ctx.measureText(text).width;
    const textHeight = fontSize;
    const x = canvas.width - textWidth - 10; // 10px padding from the right edge
    const y = canvas.height - textHeight - 10; // 10px padding from the bottom edge
    ctx.fillText(text, x, y);
   
    // ctx.fillText(SelectedDateAndTime, 250, 430);
    var lineheight = 15;
    var lines = descd.split('/n');

    for (var j = 0; j < lines.length; j++)
      ctx.fillText(lines[j], 250, 450 + j * lineheight);
    //ctx.fillText(desc , 450,450);

    //console.log('new',text + ',' + '' + time,canvas)
    newImg = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = newImg;
    link.download = varForPath.Client_Result_Photo_FileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  async GetImageByte(data) {

    
    //  debugger;
    let varForPath = this.GetPhotos.find((photo) => photo.Client_Result_Photo_ID == data.Client_Result_Photo_ID);
    var description = '',descd = '',SelectedDateAndTime='';
    if(this.timeStampData.printDateTimeExif)
    {
        var getPhotoDates:any;
        if(varForPath.Client_Result_Photo_UploadTimestamp!=null)
        {
          getPhotoDates= new Date(varForPath.Client_Result_Photo_UploadTimestamp);
        }
        else
        {
          getPhotoDates= new Date(varForPath.Client_Result_Photo_DateTimeOriginal);
        }

        // var getPhotoDates = new Date(varForPath.Client_Result_Photo_CreatedOn);
        // SelectedDateAndTime = getPhotoDates.toLocaleDateString() +' ' + getPhotoDates.getHours() + ':' + getPhotoDates.getMinutes() + ' ' +
        //   getPhotoDates.toLocaleString('en-US', {hour: 'numeric',hour12: true,}).split(' ')[1];
        
        SelectedDateAndTime=moment(getPhotoDates).format('MM/dd/yyyy hh:mm A')
        
        
        description = this.timeStampData.Description;
        descd = description.replace(/(.{66})/g, '$1/n');
       
    }
    else
    {
        description = this.timeStampData.Description;
        var  time = this.timeStampData.modifyTime + ':' + this.timeStampData.lengthMins +' '+ this.timeStampData.isAM;
        var date = new Date(this.timeStampData.date)
        
        SelectedDateAndTime = this.datePipe.transform(date,"MM/dd/yyyy") + '  ' + time;
        descd = description.replace(/(.{66})/g, '$1/n');
        

        // SelectedDateAndTime = date.toLocaleDateString() + '  ' + time;
        // descd = description.replace(/(.{66})/g, '$1/n');
        // console.log('descd2',descd)
    }

    let canvas = document.createElement('canvas') as HTMLCanvasElement;
    let newImg;
    const image: HTMLImageElement = await this.loadImage(data.Client_Result_Photo_FilePath);

    let ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const text = SelectedDateAndTime;
    const fontSize = 30;

    ctx.fillStyle = 'black';
    // ctx.font = '38px Arial';
    ctx.font = `bold ${fontSize}px Arial`;
    // canvas.style.left = "100px";
    // canvas.style.top = "100px";
    // canvas.style.position = "absolute";
    const textWidth = ctx.measureText(text).width;
    const textHeight = fontSize;
    const x = canvas.width - textWidth - 10; // 10px padding from the right edge
    const y = canvas.height - textHeight - 10; // 10px padding from the bottom edge
    ctx.fillText(text, x, y);
    
    // ctx.fillText(SelectedDateAndTime, 250, 430);
    
    var lineheight = 15;
    var lines = descd.split('/n');

    for (var j = 0; j < lines.length; j++)
      ctx.fillText(lines[j], 250, 450 + j * lineheight);

    newImg = canvas.toDataURL('image/jpeg');

    var imageFileBytes= this.timeStampData.printDateTimeExif ? this.changeExif(newImg,varForPath) : newImg

    var blogImageArray=this.createImageBlob(this.convertBase64ToBytes(imageFileBytes.replace('data:image/jpeg;base64,', '')));
    return blogImageArray;
  }

  // async TimeStampDetails() {
  //   //debugger
  //   if (this.downloading) return;
  //   if (this.dataSend.length != 0) {
  //     // debugger;
  //     this.downloading = true;
  //     this.spinner.show('downloading');
  //     //console.log(this.dataSend);
  //     const ImageByteList: Array<{filebyte:any, filename: string}> = [];

  //      for (let i = 0; i < this.dataSend.length; i++) {
  //       debugger;
  //        let item = this.GetPhotos.find((e) => e.Client_Result_Photo_ID == this.dataSend[i].Client_Result_Photo_ID);
  //        if (item !== null)
  //        {
  //         var filebyte=await this.GetImageByte(this.GetPhotos[i]);
  //         ImageByteList.push({filebyte:filebyte,filename:item.Client_Result_Photo_FileName});
  //        }
  //         // ImageByteList.push(await this.GetImageByte(this.GetPhotos[i]))
  //       // await this.addDateToImage(this.GetPhotos[i]);

  //     }
  //     if(ImageByteList.length>0)
  //     {
  //       this.downloadAllFiles(ImageByteList)
  //     }

  //     // this.dataSend.forEach(async (data, i) => {
  //     //   let item = this.GetPhotos.find((e) => e.Client_Result_Photo_ID == data.Client_Result_Photo_ID);
  //     //   if (item !== null)
  //     //     ImageByteList.push(await this.GetImageByte(this.GetPhotos[i]))
  //     //   // await this.addDateToImage(item)

  //     // });
  //     this.spinner.hide('downloading');
  //     this.downloading = false;
  //     this.ClientResultPhotoModelObj.Client_Result_Photo_UploadTimestamp =
  //       this.timeStampData.date;
  //     // this.ClientResultPhotoModelObj.Client_Result_Photo_UploadTimestamp = this.timeStampData.modifyTime;
  //     this.ClientResultPhotoModelObj.Dataitems = this.dataSend;
  //     this.xClientResultOldPhotoServices
  //       .updateTimeStamp(this.ClientResultPhotoModelObj)
  //       .subscribe((res) => {
  //         let message = 'TimeStamp Updated...!';
  //         this.commonMessage(message);
  //       });
  //   } else if (this.dataSend.length == 0) {
  //     //debugger

  //     this.downloading = true;
  //     this.spinner.show('downloading');
  //     const ImageByteList: Array<{filebyte:any, filename: string}> = [];

  //     for (let i = 0; i < this.GetPhotos.length; i++) {
  //       // await this.addDateToImage(this.GetPhotos[i]);
  //       var fileDetails=this.GetPhotos[i];
  //       let varForPath = this.GetPhotos.find((photo) => photo.Client_Result_Photo_ID == fileDetails.Client_Result_Photo_ID);
  //       var filebyte=await this.GetImageByte(fileDetails)
  //       ImageByteList.push({filebyte:filebyte,filename:varForPath.Client_Result_Photo_FileName});
  //     }

  //     if(ImageByteList.length>0)
  //     {
  //       this.downloadAllFiles(ImageByteList)
  //     }

  //     this.spinner.hide('downloading');
  //     this.downloading = false;
  //     this.ClientResultPhotoModelObj.Client_Result_Photo_UploadTimestamp =
  //       this.timeStampData.date;

  //     this.ClientResultPhotoModelObj.Dataitems = this.GetPhotos;
  //     this.xClientResultOldPhotoServices
  //       .updateTimeStamp(this.ClientResultPhotoModelObj)
  //       .subscribe((res) => {
  //         let message = 'TimeStamp Updated...!';
  //         this.commonMessage(message);
  //       });
  //   } else {
  //     let message = 'Please Select Image First...!';
  //     this.spinner.hide('downloading');
  //     this.downloading = false;
  //     this.commonMessage(message);
  //   }
  // }
  async PhotoTimeStampDownload(type) {
    // debugger
    if (this.downloading) return;

    //first set chunk size
    const chunkSize = 600;
    if(type==1)
    {
      this.downloading = true;
      this.spinner.show('downloading');
      

      //#region  Create chunk of 400 array item and download the zip file
      const photos_ChunkArrays=[];
      for (let i = 0; i < this.GetPhotos.length; i += chunkSize) {
        const chunk = this.GetPhotos.slice(i, i + chunkSize);
        photos_ChunkArrays.push(chunk)
      }

      var zipFileCount=1;
      for (let i = 0; i < photos_ChunkArrays.length; i++) {

        const ImageByteList: Array<{filebyte:any, filename: string}> = [];

        //Photos loop
        for (let j = 0; j < photos_ChunkArrays[i].length; j++) {
          var fileDetails=photos_ChunkArrays[i][j];
          var filebyte=await this.GetImageByte(fileDetails)
          ImageByteList.push({filebyte:filebyte,filename:fileDetails.Client_Result_Photo_FileName});
        }

        //Download files
        await this.downloadAllFiles(ImageByteList,zipFileCount)
        zipFileCount++;

      }
      //#endregion  Download Logic

      this.spinner.hide('downloading');
      this.downloading = false;
      if(this.timeStampData.date!=null && this.timeStampData.date!="")
      {
        this.ClientResultPhotoModelObj.Client_Result_Photo_UploadTimestamp=this.timeStampData.date;
        this.ClientResultPhotoModelObj.Dataitems = this.GetPhotos;
        this.xClientResultOldPhotoServices
          .updateTimeStamp(this.ClientResultPhotoModelObj)
          .subscribe((res) => {
            let message = 'TimeStamp Updated...!';
            this.commonMessage(message);
          });
      }
    }
    else if(type==2)
    {
      // debugger;
      if (this.dataSend.length != 0) {
        this.downloading = true;
        this.spinner.show('downloading');

        //#region  Create chunk of 400 array item and download the zip file
        const photos_ChunkArrays=[];
        for (let i = 0; i < this.dataSend.length; i += chunkSize) {
          const chunk = this.dataSend.slice(i, i + chunkSize);
          photos_ChunkArrays.push(chunk)
        }

        var zipFileCount=1;
        for (let i = 0; i < photos_ChunkArrays.length; i++) {

          const ImageByteList: Array<{filebyte:any, filename: string}> = [];

          //Photos loop
          for (let j = 0; j < photos_ChunkArrays[i].length; j++) {
            let item = this.GetPhotos.find((e) => e.Client_Result_Photo_ID == photos_ChunkArrays[i][j].Client_Result_Photo_ID);
            if (item !== null)
            {
              var filebyte=await this.GetImageByte(item);
              ImageByteList.push({filebyte:filebyte,filename:item.Client_Result_Photo_FileName});
            }
          }

          //Download files
          await this.downloadAllFiles(ImageByteList,zipFileCount)
          zipFileCount++;

        }
        //#endregion  Download Logic

        this.spinner.hide('downloading');
        this.downloading = false;
        if(this.timeStampData.date!=null && this.timeStampData.date!="")
        {
          this.ClientResultPhotoModelObj.Client_Result_Photo_UploadTimestamp =
          this.timeStampData.date;
          this.ClientResultPhotoModelObj.Dataitems = this.dataSend;
          this.xClientResultOldPhotoServices
          .updateTimeStamp(this.ClientResultPhotoModelObj)
          .subscribe((res) => {
            let message = 'TimeStamp Updated...!';
            this.commonMessage(message);
          });
        }

      }
      else
      {
        let message = 'Please Select Image First...!';
        this.spinner.hide('downloading');
        this.downloading = false;
        this.commonMessage(message);
      }
    }
  }

  photosInfo() {
    //debugger;
    this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID =
      this.ModelObj.workOrder_ID;
    this.ClientResultPhotoModelObj.Type = 1;
    this.xClientResultOldPhotoServices
      .GetClientResultPhotoInfoData(this.ClientResultPhotoModelObj)
      .subscribe((response) => {
        // debugger;
        this.coltitile =
          this.coltitile +
          ' : ' +
          this.getFormattedDate(response[0]) +
          ' - ' +
          this.getFormattedDate(response[1]);

        this.infogridData = response[2];
        //console.log('history', response)
      });
  }

  getFormattedDate(date) {
    date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }
  Task_Bid_pkeyID:any
  getPhotoTransferTaskData() {
    debugger
    this.TaskBidPhotoTransferobj.WO_IPLNO = this.photoTransferModelObj.IPLNO;
    this.xClientResultOldPhotoServices
      .GetPhotoTransferTask(this.TaskBidPhotoTransferobj)
      .subscribe((response) => {
        console.log('response00',response)
        this.photoTransferTask = response[0];
        this.Task_Bid_pkeyID = response[0]

        this.photoTaskList = this.Task_Bid_pkeyID; 

        console.log('sun1244',this.photoTaskList)


      });
  }
  BindPhotoTask(labelId) {
    // debugger;
    this.photoTaskList = [];
    this.IsPTCmpTaskHdn = true;
    if (labelId == 1) {
      this.photoTaskList = this.photoTransferTask.filter(
        (item) => item.ButtonName1 === 'Bid'
      );
      this.TaskbtnName = 'Bid';
    } else if (labelId == 2) {
      this.photoTaskList = this.photoTransferTask.filter(
        (item) => item.ButtonName1 === 'Before'
      );
      this.IsPTCmpTaskHdn = false;
    } else if (labelId == 3) {
      this.photoTaskList = this.photoTransferTask.filter(
        (item) => item.ButtonName1 === 'Damage'
      );
      this.TaskbtnName = 'Damage';
    } else if (labelId == 4) {
      this.photoTaskList = this.photoTransferTask.filter(
        (item) => item.ButtonName1 === 'Inspection'
      );
      this.TaskbtnName = 'Inspection';
    } else if (labelId == 5) {
      this.photoTaskList = this.photoTransferTask.filter(
        (item) => item.ButtonName1 === 'Label'
      );
      this.TaskbtnName = 'Label';
    }
  }

  BindTaskBtnName(labelId) {
    if (labelId == 1) {
      this.TaskbtnName = 'Before';
    } else if (labelId == 2) {
      this.TaskbtnName = 'During';
    } else if (labelId == 3) {
      this.TaskbtnName = 'After';
    }
  }

  blob: any;
  Photopdfgenerate(val) {
    //debugger
    this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID =
      this.ModelObj.workOrder_ID;
    this.ClientResultPhotoModelObj.Type = 1;
    this.ClientResultPhotoModelObj.valtype = val;
    this.xClientResultOldPhotoServices
    
      .GetClientResultsPhotoDetailPdf(this.ClientResultPhotoModelObj)
      .subscribe((res) => {
        //debugger
        if (res != null) {
          if (res != null) {
            this.blob = new Blob([res], {
              type: 'application/pdf',
            });

            var downloadURL = window.URL.createObjectURL(res);
            var link = document.createElement('a');
            link.href = downloadURL;
            let GetName = 'Photos_' + this.ClientResultPhotoModelObj.IPLNO;
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
           
            // self.notificationService.showSuccess(result.Message, "Success");
          } else {
          }
        
        }
      });
  }
  //added by pradeep

  public onTabSelect(e) {
    if (e.title == 'Photo Analysis') {
      this.GetPhotoAnalysis();
    }
    if (e.title == 'Photo History') {
      this.GetPhotoHistory();
    }
    if (e.title == 'Work Orders Photo') {
    }
    if (e.title == 'Photo Data') {
      this.photosInfo();
    }
    //console.log(e);
  }

  GetPhotoHistory() {
    // debugger;
    this.ClientResultPhotoModelGetObj.Client_Result_Photo_Wo_ID =
      this.workOrderId; //this.workOrderID;
    this.ClientResultPhotoModelGetObj.Type = 1;
    this.xClientResultServices
      .GetClientResultPhotoHistory(this.ClientResultPhotoModelGetObj)
      .subscribe((response) => {
        //debugger;
        if (response[0].length != 0) {
          this.IPLList = response[0];
        }
      });
  }
  hideGeneraltab(wo, idx) {
    this.IPLList[idx].IsTabHidden = !this.IPLList[idx].IsTabHidden;
    this.IPLList.forEach(function (value, i) {
      if (i != idx) {
        value.IsTabHidden = true;
      }
    });

    this.spinner.show('loading');
    this.getModelData1(wo);
  }

  getModelData1(wo) {
    //debugger;
    this.TaskBidMasterModelObj.workOrder_ID = wo;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe((response) => {
        this.ModelObj = response[0][0];
        this.xClientResultServices.setPathParam(this.ModelObj);
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(['/workorder']);
        } else {
          this.BindDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;
          this.BindDataModelObj.IPLNO = this.ModelObj.IPLNO;
          this.ClientResultPhotoModelObj.Client_Result_Photo_Wo_ID =
            this.ModelObj.workOrder_ID;
          this.ClientResultPhotoModelObj.IPLNO = this.ModelObj.IPLNO;
          this.GetClientImages1();
        }
      });
  }
  GetClientImages1() {
    debugger
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataHistory(this.ClientResultPhotoModelObj)
      .subscribe((response) => {
        //debugger
        console.log('history',response)
        this.taskname = response[0];
        this.spinner.hide('loading');
      });
  }

  PhotoModel1(data, messagecontent) {
    //debugger
    this.popupImage = data.itemval.Client_Result_Photo_FilePath;
    this.imgCurrentIndex = data.index;
    this.popImages = data.photos;
    this.commonPhoto(messagecontent);
  }

  GetPhotoAnalysis() {
    //  debugger;
    this.taskBidMasterModelObj.workOrder_ID = this.workOrderId; //this.workOrderID;

    //this.getCurrentImages();

    this.xClientResultServices
      .ClientPastDataPost({
        Type: 1,
        WorkOrder_ID: this.workOrderId, //this.workOrderID
      })
      .subscribe((response) => {
        console.log('photos past',response)
   
        
        this.pastOrders = response[0];
        if(this.pastOrders.length > 0)
        {
        this.pastWorkOrderId =
          this.pastOrders[this.pastOrders.length - 1].WorkOrder_ID;

        this.pastPhotoModelObj.Client_Result_Photo_Wo_ID = this.pastWorkOrderId;
        const order = this.pastOrders.find(
          (e) => e.WorkOrder_ID === this.pastWorkOrderId
        );
        this.pastPhotoModelObj.IPLNO = parseInt(order.IPLNO);
       
        this.getPastImages();
        }
      });
  }

  getCurrentImages() {
    debugger
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataMaster(this.clientResultPhotoModelObj)
      .subscribe((response) => {

         debugger;
         console.log('currentphoto',response)
        this.currentPhotos = response[0];
        
      });
  }

  getPastImages() {
    this.xClientResultOldPhotoServices
      .ViewCLientImagesDataMaster(this.pastPhotoModelObj)
      .subscribe((response) => {
        this.pastPhotos = response[0];
      });
  }

  changeOrder(e) {
    this.pastWorkOrderId = parseInt(e.target.value);
    const order = this.pastOrders.find(
      (e) => e.WorkOrder_ID === this.pastWorkOrderId
    );
    this.pastPhotoModelObj.Client_Result_Photo_Wo_ID = this.pastWorkOrderId;
    this.pastPhotoModelObj.IPLNO = parseInt(order.IPLNO);
    this.getPastImages();
  }

  openCurrentPhotoModal(index) {
    this.currentPhotoOpen = true;
    this.selectedCurrentImage = this.currentPhotos.indexOf(index);
    this.leftcnt = 1;
  }

  closeCurrentPhotoModal(e) {
    this.currentPhotoOpen = e;
  }

  openPastPhotoModal(img) {
    this.pastPhotoOpen = true;
    this.selectedPastImage = this.pastPhotos.indexOf(img);
    this.rightcnt = 0;
  }

  closePastPhotoModal(e) {
    this.pastPhotoOpen = e;
  }
  unlablePhotos() {
    if (this.dataSend_lable.length === 0) {
      this.commonMessage('Please select at least one photo from Label photos.');
    } else {
      this.ClientResultPhotoModelObj.UnlableArrayJson = JSON.stringify(
        this.dataSend_lable
      );
      this.ClientResultPhotoModelObj.Type = 2;
      this.xClientResultOldPhotoServices
        .AddFOhPhoto(this.ClientResultPhotoModelObj)
        .subscribe((res) => {
          this.commonMessage('Unlabel Photo...');
          this.GetClientImages();
          this.getTaskData();
        });
    }
  }
  GetWorkOrderIPListDropdown() {
    this.workOrderService
      .GetWorkOrderIPLNumberList(this.workOrderId, 1)
      .subscribe((response) => {
        console.log('sandip',response)
        this.IPLNumberList = response[0];
        this.PhotoTransferIPLNo_List = this.IPLNumberList;
      });
  }
  PastWorkOrderFilter(value) {
    if (value != '') {
      this.PhotoTransferIPLNo_List = this.IPLNumberList.filter(
        (s) => s.IPLNO.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else {
      this.PhotoTransferIPLNo_List = this.IPLNumberList.slice();
    }
  }
  DeletePhotos() {
    if (this.dataSend.length === 0) {
      this.commonMessage('Please select at least one photo from all photos.');
    } else {
      const cnfm = confirm('Are you Sure delete this records..?');
      if (cnfm) {
        // console.log(this.dataSend);
        this.ClientResultPhotoModelObj.ImageArray = JSON.stringify(
          this.dataSend
        );
        this.ClientResultPhotoModelObj.Type = 1;
        this.xClientResultOldPhotoServices
          .DeleteClientPhoto_Multiple(this.ClientResultPhotoModelObj)
          .subscribe((res) => {
            this.GetClientImages();
            this.getTaskData();
          });
      }
    }
  }
  onClickTab(tab) {
    // debugger;
    if (tab.title == 'Photo Analysis') {
      this.GetPhotoAnalysis();
    }
    if (tab.title == 'Photo History') {
      this.GetPhotoHistory();
    }
    if (tab.title == 'Work Orders Photo') {
    }
    if (tab.title == 'Photo Data') {
      this.photosInfo();
    }
    this.tabs.forEach((e) => {
      e.active = e === tab ? true : false;
    });
  }
  DeleteDocument(documentObj) {
    const cnfm = confirm('Are you Sure delete this records..?');
    if (cnfm) {
      this.ClientResultPhotoModelObj.Client_Result_Photo_ID =
        documentObj.Client_Result_Photo_ID;
      this.xClientResultOldPhotoServices
        .DeleteCLientImagesData(this.ClientResultPhotoModelObj)
        .subscribe((response) => {
          this.GetClientImages();
          this.getTaskData();
        });
    }
  }
  async downloadAllFiles(ImageByteList:any,zipFileCount) {
    // console.log("Downloading All Files of datastamp");
    var fileName = this.ClientResultPhotoModelObj.IPLNO +"["+ zipFileCount +"]"+ ".zip";
    var zip = new JSZip();
    ImageByteList.forEach(element => {
      zip.file(element.filename,element.filebyte)
    });
    zip.generateAsync({ type: "blob" }).then(function (blob) {FileSaver.saveAs(blob, fileName);});
}
convertBase64ToBytes(data: any) {
  let byteCharacters = atob(data);
  let byteNumbers = new Array(byteCharacters.length);

  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  let byteArray = new Uint8Array(byteNumbers);
  return byteArray;
}
createImageBlob(src: any) {
  const byteArrays = [];
  byteArrays.push(src);
  return new Blob(byteArrays, { type: 'image/jpeg' });
}
changeExif(fileByte,photoDetails){
  var exifObj = piexif.load(fileByte);
  // exifObj.GPS[piexif.GPSIFD.GPSLatitude] = photoDetails.Client_Result_Photo_GPSLatitude;
  // exifObj.GPS[piexif.GPSIFD.GPSLongitude] = photoDetails.Client_Result_Photo_GPSLongitude;
  exifObj.Exif[piexif.ExifIFD.DateTimeOriginal] = moment(new Date(photoDetails.Client_Result_Photo_DateTimeOriginal)).format('yyyy:MM:DD hh:mm:ss');
  var exifbytes = piexif.dump(exifObj);
  var newData = piexif.insert(exifbytes, fileByte);
  return newData;
}
}
