import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LiveMapModel } from './live-map-model';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Location } from './live-map-model';

@Component({
  templateUrl: './live-map-component.html',
  styleUrls: ['./live-map.css'],
})
export class LiveMapComponent implements OnInit {
  LiveMapModelObj: LiveMapModel = new LiveMapModel();
  locations: Array<Location>;
  mapLat: number = 37.0902; //7.119082288502541//37.0902;
  mapLong: number = -95.7129; //-73.120029012106//-95.7129;
zoom=5;
filteredState: string = '';
public paths = [];
LatLongData = [];
public defaultStateItem: { name: string, id: number } = { name: 'Select Name', id: 0 };
public selectedState: Array<{ id: number, name: string }>;
icon = {
  url: 'https://www.clipartsfree.net/vector/large/45454-google-maps-icon-green-clipart.png',
  scaledSize: {height: 40, width: 25}
}
  userarray:any;
  usersLocationsList=[]

  constructor(private xDatabase: AngularFireDatabase) {}

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    let locationRef = this.xDatabase.database.ref('locations');
    locationRef.on('value', (snapshot) => {
      this.locations = Object.values(snapshot.val());
      // console.log('location data', this.locations);
      this.locations.forEach(
        (location) =>
          (
            location.loggedTime =
            location.loggedTime && this.timeConvert(location.loggedTime)
            )
      );
    });

    // console.log('location data', this.locations)
    // console.log('userlist data', this.usersLocationsList)
    if(this.usersLocationsList.length>0)
    {
      this.userarray=this.usersLocationsList
    }

  }

  timeConvert(value: number) {
    const currentDate = moment();
    const prevDate = moment(value);
    return currentDate.diff(prevDate, 'days') <= 4 ? prevDate.format('MM/DD/YYYY HH:mm:ss') : null;
  }

  StateFilter(value){
    if (value!='') {
      var filteredcustomer = this.usersLocationsList.filter(function (el) {
        return el.name != null;
      });
      this.userarray = filteredcustomer.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.userarray = this.usersLocationsList.slice();
   }
  }

  public valueChange(value: any): void {
    // debugger
    this.filteredState = value;
    this.selectedState = value;
    // console.log("valueChange", value);
  }

  public selectionChange(value: any): void {
    // debugger
    // this.mapLat=value.latitude//19.076090//;
    // this.mapLong=value.longitude//72.877426//;
    this.LatLongData = [];
    this.paths = [];

    // this.locations.forEach(
    //   (location) =>
    //     (
    //       location.loggedTime =
    //       location.loggedTime && this.timeConvert(location.loggedTime)
    //       )
    // );

    this.locations.forEach(location => {

      if(value.name==location.name)
      {
        // debugger
        this.LatLongData.push(location);
        let data = {
          lat : parseFloat(location.latitude),
          lng : parseFloat(location.longitude)
        };
        this.paths.push(data);
      }
    });
    // console.log("selectionChange", value);
  }
}
