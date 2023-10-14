import { Component, Injectable, OnInit, Pipe } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VideoTrainingModel } from "./video-training.model";
import { VideoTrainingServices } from "./video-training.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  templateUrl: "./video-training.component.html",
  styleUrls: ['./video-training.component.scss']
})

export class VideoTrainingComponent implements OnInit {
  VideoTrainingModelObj:VideoTrainingModel = new VideoTrainingModel();
  Vediolist=[];
  adminUrlArray=[];
  videoUrl = null;
  videolin= null;
  crUrlArray: any[];
  constructor(private xVideoTrainingServices:VideoTrainingServices,  public sanitizer: DomSanitizer,
    private xmodalService: NgbModal,) {
    this.GetVedioTraining();
  }

  ngOnInit() {
  }
  GetVedioTraining(){
this.xVideoTrainingServices.GetTrainingVedio(this.VideoTrainingModelObj).subscribe(res =>{
  //debugger
  //console.log('res',res)
  this.Vediolist = res[0];
  this.Vediolist.forEach( (element, i) => {
    let videoId = element.Training_Vedio_Path.includes('embed/') ? element.Training_Vedio_Path.split("embed/")[1] :
                  element.Training_Vedio_Path.includes('?v=') ? element.Training_Vedio_Path.split("?v=")[1] :
                  element.Training_Vedio_Path.split("youtu.be/")[1];
    this.adminUrlArray.push(videoId);

    this.Vediolist[i].VideoURL = "https://www.youtube.com/embed/" + videoId;
  });
})
  }
  photoURL(arg) {
    //debugger
   this.videolin =   this.sanitizer.bypassSecurityTrustResourceUrl(arg);
  
  }

  closeModal(){
    this.xmodalService.dismissAll();
  }
  
  openVideo(data) {
   
    this.videoUrl = data.Training_Vedio_Path;
    $('body').css('overflow-y', 'hidden');
    $('#video-overlay').addClass('open');
    this.photoURL( this.videoUrl)
  }
  closemode(){
    $('.video-overlay-close').on('click', function () {
      $('.video-overlay.open').removeClass('open');
      $('body').css('overflow-y', 'auto');
    });
  }

}
