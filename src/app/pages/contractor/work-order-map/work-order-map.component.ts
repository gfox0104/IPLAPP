
import { Component, OnInit } from '@angular/core';
import { WorkOrderMapServices } from './work-order-map.service'
import { WorkOrderMapModel } from './work-order-map-model'
import { AngularFireDatabase } from '@angular/fire/database';
import { SaveWorkOrderViewServices } from '../../work-order/work-order-view/work-order-view-service';
import * as _ from 'lodash';

@Component({
  // selector: '',
  templateUrl: './work-order-map.component.html',
  styleUrls: ['./work-order-map.component.css']
})
export class WorkOrderMapComponent implements OnInit {
  WorkOrderMapModelObj: WorkOrderMapModel = new WorkOrderMapModel();
  LatLongData = [];
  latedefault: any;
  lagedef: any;
  latlogdetails = [];
  name: string;
  cellNumber: string;
  zoom: any;
  defaultlat: any;
  defaultlng: any;

  constructor(
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
    private xdatabase: AngularFireDatabase,
  ) { }

  ngOnInit() {
    
    if (history.state.data !== undefined) {
      this.LatLongData = history.state.data;
      if(this.LatLongData.length>1){
        this.zoom = 2;
        this.defaultlat = 55.5815245;
        this.defaultlng = 36.8251383;
      }
      else{
        this.zoom = 17;
        this.defaultlat = this.LatLongData[0].latitude;
        this.defaultlng = this.LatLongData[0].longitude;
      }
    } else {
      this.getFireDataBaseuser();
    }
  }

  getFireDataBaseuser() {
    if (localStorage.getItem('UserName') != '') {
      var encuser = localStorage.getItem('UserName');
    }

    let userRef = this.xdatabase.database.ref("users");
    userRef.child(encuser);
    this.displaylocation(encuser);
  }
  displaylocation(encuser) {
    let num = 0;
    let locationRef = this.xdatabase.database.ref("locations");
    locationRef
      .on("child_added", value => {
        const coordinate = value.val();
        num++;
        this.LatLongData.push({
          latitude: parseFloat(coordinate.latitude),
          longitude: parseFloat(coordinate.longitude),
          address: '71409 Training Work Order 303 RENEE LANE Garden City, MO 64747'
        });
      })
  }
}
