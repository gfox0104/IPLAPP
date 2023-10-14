
import { Component, OnInit } from '@angular/core';
import { ContractorMapServices } from './contractor-map.service'
import { ContractorMapModel } from './contractor-map-model'
import { WorkOrderDrodownServices } from "../../../services/util/dropdown.service";

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge
} from "rxjs/operators";
// import * as _ from 'lodash';
import { ResponsiveService } from '@progress/kendo-angular-grid';
import { ContractorMapState } from '../../user/add-user/add-user-model';
import { AddUserServices } from '../../user/add-user/add-user.service';
import  _ from 'underscore';
import { IplAppModalContent } from 'src/app/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModel } from '../../models/dropdown-model';

@Component({
  // selector: '',
  templateUrl: './contractor-map.component.html',
  styleUrls: ['./contractor-map.component.css']
})
export class ContractorMapComponent implements OnInit {
  ContractorMapModelObj: ContractorMapModel = new ContractorMapModel();
  ContractorMapStateObj: ContractorMapState = new ContractorMapState();
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  isHelpActive = false;
  // public defaultData: Array<{ IPL_StateID: number, IPL_StateName: string }>;
  public defaultStateItem: { IPL_StateName: string, IPL_StateID: number } = { IPL_StateName: 'Select', IPL_StateID: 0 };
  public defaultCountyItem: { COUNTY: string, ID: number } = { COUNTY: 'Select', ID: 0 };
  public defaultConItem: { User_FirstName: string, User_pkeyID: number } = { User_FirstName: 'Select', User_pkeyID: 0 };
  public defaultCatItem: { Con_Cat_Name: string, Con_Cat_PkeyID: number } = { Con_Cat_Name: 'Select', Con_Cat_PkeyID: 0 };

  public sourceState: Array<{ IPL_StateID: number, IPL_StateName: string }> = [];
  public dataState: Array<{ IPL_StateID: number, IPL_StateName: string }>;
  public selectedState: Array<{ IPL_StateID: number, IPL_StateName: string }>;

  public sourceCatName: Array<{ User_pkeyID: number, User_FirstName: string }> = [];
  public dataCatName: Array<{ User_pkeyID: number, User_FirstName: string }>;
  public selectedCatName: Array<{ User_pkeyID: number, User_FirstName: string }>;

  public dataCounty: Array<{ ID: number, COUNTY: string }>;
  public selectedCounty: Array<{ ID: number, COUNTY: string }>;
  public sourceCounty: Array<{ ID: number, COUNTY: string }> = [];
  MessageFlag: string;
  ConCatList:any;
  icon = {
    url: 'https://www.clipartsfree.net/vector/large/45454-google-maps-icon-green-clipart.png',
    scaledSize: {height: 40, width: 25}
}
  OriginData = [];
  LatLongData = [];
  defaultLatLong: boolean = true;
  mapLat: number = 37.0902//7.119082288502541//37.0902;
  mapLong: number = -95.7129//-73.120029012106//-95.7129;
  name: string;
  State = [];
  zipSearchData: any;
  ContractorName = [];
  contractorCat_name = [];
  filteredState: string = '';
  filteredCategory: string = '';
  filteredCounty: string = '';
  emptyIcon: string = 'something..';
  searchFilter: string = '';
  public paths = [];

  public items: Array<{ WF_QueryName: string, WF_PkeyID: number }>;
  Concatarr: any;
  constructor(
    private xContractorMapServices: ContractorMapServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xAddUserServices: AddUserServices,
    private xmodalService: NgbModal,
  ) { }

  ngOnInit() {


    this.getContractorData();
    this.GetDropDowndata();

  }
  onMapReady(map) {
    //dfebugger;
    var bounds = map.getBounds();
    var ne = bounds.getNorthEast(); // LatLng of the north-east corner
    var sw = bounds.getSouthWest(); // LatLng of the south-west corder
  }

  getContractorData() {
    this.xContractorMapServices
    .GetContractorData(this.ContractorMapModelObj)
    .subscribe(Response => {
      //dfebugger;
      this.OriginData = Response[0];
      this.LatLongData = [];//Response[0];
    })
  }
  GetDropDowndata() {
    this._drpdownmodelObj.Type=1;    //change by sandip
    this.xWorkOrderDrodownServices   //change by sandip
      .DropdownGetWorkOrder(this._drpdownmodelObj)
      .subscribe(response => {
        // console.log('sun',response)
        if (response.length != 0) {
          this.sourceState = [];
          response[6].forEach(element => {
            this.sourceState.push(element);
          });
          response[14].forEach(element => {
            this.sourceCatName.push(element);
          });

          this.dataState = this.sourceState.slice();
          this.dataCatName = this.sourceCatName.slice();
        }
      });
      this.xWorkOrderDrodownServices
      .DropdownGetGroupDetails()
      .subscribe(response => {
        //console.log('group',response)
        this.ConCatList = response[1];
        this.Concatarr = this.ConCatList;
      });

  }
  handleFilter(value) {
    this.dataState = this.sourceState.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  handleCatNameFilter(value) {
    this.dataCatName = this.sourceCatName.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  selectChangeHandler(event){
    this.filteredState = event.IPL_StateName;
    this.selectedState = event;
    this.ContractorMapStateObj.IPL_StateID = event.IPL_StateID;
    this.ContractorMapStateObj.IPL_StateName = event.IPL_StateName;
    this.xAddUserServices.ContractorCounty(this.ContractorMapStateObj).subscribe(response => {
      //console.log('bg',response);
       this.sourceCounty = response[0];
       this.dataCounty = response[0];
    });
    if (this.filteredState != "" && this.filteredState != "Select") {
      this.dataCatName = [];
      this.OriginData.forEach(origin => {
        if(origin.IPL_State == this.filteredState){
          let data = {
            User_pkeyID : origin.IPL_UserID,
            User_FirstName : origin.FirstName
          };
          if (this.dataCatName.length > 0) {
            var selectedGroupList = _.where(this.dataCatName, {User_pkeyID: origin.IPL_UserID});
            if (selectedGroupList.length > 0) {
            }
            else{
              this.dataCatName.push(data);
            }
          }
          else{
            this.dataCatName.push(data);
          }
        }
      });
    } else {
      this.dataCatName = [];
      this.dataCatName = this.sourceCatName.slice();;
    }

  }
  selectCategoryHandler(event){
    this.filteredCategory = event.User_FirstName;
    this.selectedCatName = event;
  }
  CategoryhandleFilter(event){
    if (event!='') {
      this.ConCatList = this.Concatarr.filter((s) => s.Con_Cat_Name.toLowerCase().indexOf(event.toLowerCase()) !== -1);
    }
   else{
    this.ConCatList = this.Concatarr.slice();
   }
  }

  filtercontrator(){
    // debugger;
    this.LatLongData = [];
    this.paths = [];
    this.defaultLatLong = true;
    if(this.filteredCategory!="" && this.filteredCategory != "Select" ){
      this.OriginData.forEach(origin => {
        if(origin.FirstName == this.filteredCategory){
          this.LatLongData.push(origin);
          let data = {
            lat : parseFloat(origin.IPL_Primary_Latitude),
            lng : parseFloat(origin.IPL_Primary_Longitude)
          };
          this.paths.push(data);
        }
      });
      if (this.LatLongData.length == 0) {
        this.MessageFlag = "No zip code assign to selected contractor.";
        this.commonMessage();
      }
    }
    else if(this.filteredState!="" && this.filteredState != "Select" && this.ContractorMapModelObj.Con_Cat_Id == 0  && (this.filteredCounty=="" || this.filteredCounty=="Select") && (this.filteredCategory=="" || this.filteredCategory=="Select")){
      this.OriginData.forEach(origin => {
        if(origin.IPL_State == this.filteredState){
          this.LatLongData.push(origin);
        }
      });
      if (this.LatLongData.length == 0) {
        this.MessageFlag = "No contractor available for selected state.";
        this.commonMessage();
      }
    }
    else if(this.filteredState!="" && this.filteredState != "Select" && this.ContractorMapModelObj.Con_Cat_Id == 0 && this.filteredCounty!="" && this.filteredCounty != "Select" && (this.filteredCategory=="" || this.filteredCategory=="Select")){
      this.OriginData.forEach(origin => {
        if(origin.IPL_State == this.filteredState && origin.IPL_City == this.filteredCounty){
          this.LatLongData.push(origin);
        }
      });
      if (this.LatLongData.length == 0) {
        this.MessageFlag = "No contractor available for selected state and county.";
        this.commonMessage();
      }
    }
    else if(this.ContractorMapModelObj.Con_Cat_Id > 0 && (this.filteredState=="" || this.filteredState == "Select") && (this.filteredCounty=="" || this.filteredCounty=="Select") && (this.filteredCategory=="" || this.filteredCategory=="Select")){
      this.OriginData.forEach(origin => {
        if(origin.User_Con_Cat_Id == this.ContractorMapModelObj.Con_Cat_Id){
          this.LatLongData.push(origin);
        }
      });
      if (this.LatLongData.length == 0) {
        this.MessageFlag = "No contractor available for selected contractor category.";
        this.commonMessage();
      }
    }
    else if(this.ContractorMapModelObj.Con_Cat_Id > 0 && this.filteredState!="" && this.filteredState != "Select" && this.filteredCounty!="" && this.filteredCounty != "Select" && (this.filteredCategory=="" || this.filteredCategory=="Select")){
      this.OriginData.forEach(origin => {
        if(origin.IPL_State == this.filteredState && origin.IPL_City == this.filteredCounty && origin.User_Con_Cat_Id == this.ContractorMapModelObj.Con_Cat_Id){
          this.LatLongData.push(origin);
        }
      });
      if (this.LatLongData.length == 0) {
        this.MessageFlag = "No contractor available for selected state,county and contractor category.";
        this.commonMessage();
      }
    }
    else if(this.ContractorMapModelObj.Con_Cat_Id > 0 && this.filteredState!="" && this.filteredState != "Select" && (this.filteredCounty=="" || this.filteredCounty == "Select") && (this.filteredCategory=="" || this.filteredCategory=="Select")){
      this.OriginData.forEach(origin => {
        if(origin.IPL_State == this.filteredState && origin.User_Con_Cat_Id == this.ContractorMapModelObj.Con_Cat_Id){
          this.LatLongData.push(origin);
        }
      });
      if (this.LatLongData.length == 0) {
        this.MessageFlag = "No contractor available for selected state and contractor category.";
        this.commonMessage();
      }
    }
  }
  zipSearch(){
    this.xContractorMapServices
    .GetLatLngData(this.searchFilter)
    .subscribe(Response => {
      this.mapLat = Response[0][0].Zip_lat;
      this.mapLong = Response[0][0].Zip_lng;
      this.zipSearchData = Response[0][0];
      this.defaultLatLong = false;
    })
  }
  clearFilter(){
    this.selectedState = [];
    this.selectedCounty = [];
    this.selectedCatName = [];
    this.paths = [];
    this.filteredState = "";
    this.filteredCounty = "";
    this.filteredCategory = "";
    this.dataState = this.sourceState;
    this.dataCatName = this.sourceCatName;
    this.dataCounty = [];
    this.LatLongData = [];
    this.mapLat = 37.0902;
    this.mapLong =  -95.7129;
    this.searchFilter = "";
    this.zipSearchData = [];
    this.defaultLatLong = true;
    this.ContractorMapModelObj.Con_Cat_Id = 0;
  }
  CountyhandleFilter(value) {
    //dfebugger;
    console.log(value);
    if (value!='') {
      this.dataCounty = this.sourceCounty.filter((s) => s.COUNTY.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.dataCounty = this.sourceCounty.slice();
   }
  }
  changeCounty(event){
    this.filteredCounty = event.COUNTY;
    this.selectedCounty = event;
    if (this.filteredState!="" && this.filteredState != "Select" && this.filteredCounty!="" && this.filteredCounty != "Select") {
      this.dataCatName = [];
      this.OriginData.forEach(origin => {
        if(origin.IPL_State == this.filteredState && origin.IPL_City == this.filteredCounty){
          let data = {
            User_pkeyID : origin.IPL_UserID,
            User_FirstName : origin.FirstName
          };
          if (this.dataCatName.length > 0) {
            var selectedGroupList = _.where(this.dataCatName, {User_pkeyID: origin.IPL_UserID});
            if (selectedGroupList.length > 0) {
            }
            else{
              this.dataCatName.push(data);
            }
          }
          else{
            this.dataCatName.push(data);
          }
        }
      });
    } else {
        this.dataCatName = [];
        this.dataCatName = this.sourceCatName.slice();;
      }
    }

    changeCategory(catId){
      //dfebugger;
      if (catId > 0) {
        this.dataCatName = [];
        this.OriginData.forEach(origin => {
          if(origin.User_Con_Cat_Id == catId){
            let data = {
              User_pkeyID : origin.IPL_UserID,
              User_FirstName : origin.FirstName
            };
            if (this.dataCatName.length > 0) {
              var selectedGroupList = _.where(this.dataCatName, {User_pkeyID: origin.IPL_UserID});
              if (selectedGroupList.length > 0) {
              }
              else{
                this.dataCatName.push(data);
              }
            }
            else{
              this.dataCatName.push(data);
            }
          }
        });
      } else {
          this.dataCatName = [];
          this.dataCatName = this.sourceCatName.slice();;
        }
      }
    // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

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

DispalyInfo(event: Event, lblName)
{
  if (this.isHelpActive) {
    event.preventDefault();
    this.MessageFlag = "Add Information for " + lblName;
    this.commonMessage();
  }
}

}
