import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, GridColumns } from '../constants';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfigurationLink } from "../constants/link";


@Component({
  templateUrl: "./client-configuration-view.component.html"
})

export class ClientConfigurationViewComponent implements OnInit {
  public griddata: any[];
  MessageFlag: string;
  
  buttons = Buttons;
  gridColumns = GridColumns;
  configurationLink = ConfigurationLink;
  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    
  ) {
    
  }

  ngOnInit() {}

 

  
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {this.xmodalService.dismissAll() });
  }  

}
