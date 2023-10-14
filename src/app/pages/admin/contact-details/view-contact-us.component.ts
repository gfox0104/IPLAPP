import { Component, Injectable, OnInit } from "@angular/core";
import { UntypedFormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {ContactUsModel} from "../../support/contact-us/contact-us-model";
import { ViewContactUsServices } from "./view-contact-us.service";
import { GridColumns } from './constants/grid-columns';

@Component({
  templateUrl: "./view-contact-us.component.html"

})
export class ViewContactUsComponent implements OnInit {
  gridColumns = GridColumns;
  griddata:any;
  ContactUsModelObj: ContactUsModel = new ContactUsModel();
  constructor(private formBuilder: UntypedFormBuilder,private xViewContactUsServices:ViewContactUsServices) {
  }

  ngOnInit() {
   this.GetGridData();
  }
GetGridData(){
  this.xViewContactUsServices.ViewContactDetail(this.ContactUsModelObj)
  .subscribe(res =>{
    //console.log('grid',res)
    this.griddata = res[0];
  })
}


}
