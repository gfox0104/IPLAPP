import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LocationModel } from './live-user-location-model';
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import _ from 'underscore';

import { LiveUserLocationServices } from './live-user-location.service';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-live-user-location',
  templateUrl: './live-user-location.component.html',
  styleUrls: ['./live-user-location.component.scss']
})
export class LiveUserLocationComponent implements OnInit {
  locationGridData = [];
  gridData = [];
  isHelpActive = false; // for set help tag flag
  MessageFlag: string; // custom msg sathi
  fallbackIcon = 'fas fa-user';
  isLoading: boolean;
  conId: Number = 0;
  chkclick = true;
  iconCss = new UntypedFormControl();

  LocationModelObj: LocationModel = new LocationModel();
  public state: State = {};
  userName = "";

  constructor(
    private xDatabase: AngularFireDatabase,
    private xRouter: Router,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,
    private xLiveUserLocationServices: LiveUserLocationServices,
  ) {
    this.GetGridData();
  }

  ngOnInit(): void {
  }

  GetGridData() {
    this.xLiveUserLocationServices
      .GetFirebaseLocationData(this.LocationModelObj)
      .subscribe(response => {
        //debugger;
        if (response.length > 0 && response[0].length > 0) {
          this.locationGridData = response[0];
          this.gridData = response[0];
          this.state.take = 15;
          this.state.skip = 0;
        }
      });
  }


  Delete(deleteItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.xLiveUserLocationServices
        .DeleteFirebaseLocationData(deleteItem)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }


  DeleteAll() {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      var selectedCom = _.where(this.locationGridData, { IsDeleteChecked: true });
      if (selectedCom.length > 0) {
        this.xLiveUserLocationServices
          .DeleteFirebaseLocationListData(selectedCom)
          .subscribe(response => {
            this.GetGridData();
          });
      }
    }
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  clickBack() {
    this.xRouter.navigate(['/home/adminlinkpage']);
  }
  checkChange(ev, idx) {
    this.locationGridData[idx].IsDeleteChecked = ev.target.checked;
  }
  filter() {
    var selectedCom = this.gridData.filter((item) => {
      return item.Name.toLowerCase().includes(this.userName);
    });

    // var selectedCom = _.where(this.gridData, { Name: this.userName });
    this.locationGridData = selectedCom;
    this.state.take = 15;
    this.state.skip = 0;
  }
  clear() {
    this.userName = "";
    this.locationGridData = this.gridData;
    this.state.take = 15;
    this.state.skip = 0;
  }

  // addede by unnati
SetHelpFlag()
{
  this.isHelpActive = !this.isHelpActive
  if (this.isHelpActive) {
    this.MessageFlag = "Item Help mode is on...!";
    this.commonMessage();
  }
  else
  {
    this.MessageFlag = "Item Help mode is off...!";
    this.commonMessage();
  }
}


 // common message modal popup
 commonMessage() {
  const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
  modalRef.componentInstance.MessageFlag = this.MessageFlag;
  modalRef.result.then(result => { }, reason => { });
}

DispalyInfo(event: Event, lblName)
	  {    
		if (this.isHelpActive) {
		  event.preventDefault();
		  this.MessageFlag = "Add Information for " + lblName;
		  this.commonMessage();
		}    
	  }
}
