import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { IplAppModalContent } from 'src/app/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import {PreviouslySentService} from './previously-sent.service'
import{PreviouslySentModel} from './previously-sent.model'

@Component({
  selector: 'app-previously-sent',
  templateUrl: './previously-sent.component.html',
  styleUrls: ['./previously-sent.component.scss']
})
export class PreviouslySentComponent implements OnInit {
  PreviouslySentModelObj: PreviouslySentModel = new PreviouslySentModel();
  griddata: any;
  constructor(
    private xPreviouslySentService: PreviouslySentService, 
    private xmodalService: NgbModal,
    private xRouter: Router,
   ) { 
     this.GetMassEmail();
   }

  ngOnInit(): void {
  }

  GetMassEmail(){
this.xPreviouslySentService.GetEmailData(this.PreviouslySentModelObj).subscribe(res =>{
  this.griddata = res[0];
//console.log('emaillist',res);
})
  }

}
