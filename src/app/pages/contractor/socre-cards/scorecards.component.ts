import { Component, OnInit , ViewChild, ElementRef, Input} from "@angular/core";
import { Router } from "@angular/router";
import { SortDescriptor, State } from "@progress/kendo-data-query";
import {GridComponent, DataStateChangeEvent, 
  GridDataResult,PageChangeEvent } from "@progress/kendo-angular-grid";
import { IplAppModalContent } from 'src/app/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import {ScoreCardsModel} from './scorecards.component-model';
// import {ScoreCardsServices} from './scorecards.component.service';
import { DatePipe } from '@angular/common';
import { FilterdataPipe } from '../../services/filterdata.pipe';
import { Observable } from 'rxjs';
import { MemoServices } from '../memo/memo.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';

@Component({
  templateUrl: "./scorecards.component.html",
  providers:[DatePipe,FilterdataPipe]
})

export class ScoreCardsComponent implements OnInit {
  ScoreCardsModelObj:ScoreCardsModel = new ScoreCardsModel();
  public defaultItemcon: { Cont_Name: string, Wo_Con_FScore_ConID: number } = { Cont_Name: 'Select', Wo_Con_FScore_ConID: 0 };
  public griddata: any[];
  public gridDetails: any[];
  isSubmitted: boolean;
  MessageFlag:String;
  MonthList:any;
  YearList:any;
  ConList:any;
  isHelpActive = false;
  formUsrCommonGroup: UntypedFormGroup;
  public view: Observable<GridDataResult>;
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;
  //@ViewChild(GridComponent) grid: GridComponent;
  public gridData: any[];
  public gridView: any[];
  @Input() public category: Object;
  list: any=[];
  @ViewChild(GridComponent, { static: true })
    public grid: GridComponent;
    decuser: any;
    tabhide: boolean = true;
  constructor(
 
    private xRouter: Router,
    // private xScoreCardsServices: ScoreCardsServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xMemoServices : MemoServices,
    public datepipe: DatePipe,
    private EncrDecr: EncrDecrService,
   
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);
      //console.log('userdata', this.decuser);
   this.ScoreCardsModelObj.Wo_Con_FScore_ConID = this.decuser[0].User_pkeyID;
      switch (this.decuser[0].GroupRoleId) {
        case 1:
          {
            this.tabhide = false;
            break;
          }
        case 2:
          {
            this.tabhide = true;
            break;
          }
        case 3:
          {
            this.tabhide = false;
            break;
          }
        case 4:
          {
            this.tabhide = false;
            break;
          }
      }
    }
   this.GetDRDData();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      monthval: ["", Validators.required],
      yearval: ["", Validators.required],
      //Conval: ["", Validators.nullValidator],
      
    }); 
    this.currentMonth();
    this. bydefaultPastData();
  }
  private loadData(): void {
    ////dfebugger
    this.currentMonth();
}

  public pageChange({ skip, take }: PageChangeEvent): void {
    ////dfebugger
    this.category;
    this.skip = skip;
    
    this.currentMonth();
}


public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
  // Save the current state of the Grid component
  this.skip = skip;
  this.pageSize = take;
  this.sort = sort;

  // Reload the data with the new state
  this.loadData();


  // Expand the first row initially
  this.grid.expandRow(0);
}
  currentMonth(){
    this.ScoreCardsModelObj.Type = 3;
    this.xMemoServices.currentMonthdata(this.ScoreCardsModelObj)
    .subscribe(res =>{
      //console.log('current',res)
      this.griddata = res[0];
      this.list = res[0];
      this.gridView=res[0];
      for (var i = 0; i < this.gridView.length; i++)
      {
        if(this.gridView[i]["Um_IsPaid"]==false)
        {
          this.gridView[i]["Um_IsPaid"] = "No";
        }
        else{
          this.gridView[i]["Um_IsPaid"] = "Yes"; 
        }
        this.gridView[i]["Um_SubscriptionDate"]=this.datepipe.transform(this.gridView[i]["Um_SubscriptionDate"], 'yyyy-MM-dd');
      }
    })
  }

  bydefaultPastData(){
    if (this.decuser[0].GroupRoleId == 2) {
      this.ScoreCardsModelObj.Type = 2;
      this.ScoreCardsModelObj.Wo_Con_FScore_ConID = this.decuser[0].User_pkeyID;
    this.xMemoServices.ViewFinalScoreCardDetails(this.ScoreCardsModelObj)
    .subscribe(res =>{
      //console.log('find',res)
      this.gridDetails = res[0];
     
    })
    }
    else{
      this.ScoreCardsModelObj.Type = 1;
      this.xMemoServices.currentMonthdata(this.ScoreCardsModelObj)
      .subscribe(res =>{
        //console.log('pastby',res)
        this.gridDetails = res[0];
      })
    }
   
  }
  FormButton(){
    this.ScoreCardsModelObj.Type = 2;
    this.xMemoServices.ViewFinalScoreCardDetails(this.ScoreCardsModelObj)
    .subscribe(res =>{
    
      this.gridDetails = res[0];
     
    })
  }
  GetDRDData(){
    this.xMemoServices.FinalScoreCardDropDown().subscribe(response =>{
      //console.log('check',response)
      this.MonthList = response[0];
      this.YearList = response[1];
      this.ConList = response[2];
      this.conList2 = this.ConList;
    })
  }
  showDetails(event, dataItem){

  }

  conList2:any;
  ConList2Filter(value) {
    //debugger;
      if (value!='') {
        var filteredcustomer = this.ConList.filter(function (el) {
          return el.Cont_Name != null;
        });
        this.conList2 = filteredcustomer.filter((s) => s.Cont_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
     else{
      this.conList2 = this.ConList.slice();
     }
    }
    
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => {this.xmodalService.dismissAll() });
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
