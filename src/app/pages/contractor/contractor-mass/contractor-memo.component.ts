import { Component, Injectable, OnInit } from "@angular/core";
import { UntypedFormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PreviouslySentModel } from '../memo/previously-sent/previously-sent.model';
import { PreviouslySentService } from '../memo/previously-sent/previously-sent.service';
import { GridColumns } from './constants';
import { ContractorMemoModel } from './contractor-mass.model';
import {ContractorMemoServices} from './contractor-memo.service'

@Component({
  templateUrl: "./contractor-memo.component.html"

})
export class ContractorMemoComponent implements OnInit {
  gridColumns = GridColumns;
  griddata:any;
  PreviouslySentModelObj: PreviouslySentModel = new PreviouslySentModel();
  constructor(private formBuilder: UntypedFormBuilder, private xPreviouslySentService:PreviouslySentService) {
  }

  ngOnInit() {
  this.GetGridData();
  }
GetGridData(){
  this.PreviouslySentModelObj.Type = 5;
  this.xPreviouslySentService.GetEmailData(this.PreviouslySentModelObj).subscribe(res =>{
    this.griddata = res[0];
  //console.log('emaillist',res);
  })
}


}
