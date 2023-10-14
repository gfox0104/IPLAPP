import { Component, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SuggestionServices } from './suggestion-box.service';
import {SuggestionModel, SuggestionVoteModel} from './suggestion-box.model'
import { IplAppModalContent } from "src/app/components";

@Component({
  templateUrl: "./suggestion-box.component.html",
  styleUrls: ['./suggestion-box.component.css']
})
export class SuggestionComponent implements OnInit {
  SuggestionModelObj:SuggestionModel = new SuggestionModel();
  SuggestionVoteModelObj:SuggestionVoteModel = new SuggestionVoteModel();
  suggestionGroup: Array<any> = [];
  suggestionTitle: String = '';
  suggestionDesc: String = '';
  ipAddress: String = '';
  title: String = 'test';
  config:any;
  MessageFlag: string;
	isHelpActive = false;
  constructor(private xSuggestionServices:SuggestionServices,
    private xmodalService: NgbModal,) {
    this.getIP();
  }

  ngOnInit() {
    this.config = {
      itemsPerPage: parseInt(this.SuggestionModelObj.NoofRows.toString()),
      currentPage: parseInt(this.SuggestionModelObj.PageNumber.toString()),
      totalItems: 0
    };
  }
  sendRequest(){
   
    this.xSuggestionServices.AddSuggestion(this.SuggestionModelObj).subscribe(res => {
      //console.log('suggestion',res);
        this.SuggestionModelObj.Sug_Tittle = '';
        this.SuggestionModelObj.Sug_Description = '';
      this.getIP();
    })
    // this.suggestionGroup.push({'title': this.suggestionTitle, 'desc': this.suggestionDesc});
    // this.suggestionTitle = '';
    // this.suggestionDesc = '';
   
  }
  getIP()  
  {  
    this.SuggestionModelObj.PageNumber = parseInt(this.SuggestionModelObj.PageNumber.toString());
    this.SuggestionModelObj.NoofRows = parseInt(this.SuggestionModelObj.NoofRows.toString());
    this.xSuggestionServices.GetSuggestion(this.SuggestionModelObj).subscribe(res => {
      this.suggestionGroup = res[0];
      this.config = {
        itemsPerPage: parseInt(this.SuggestionModelObj.NoofRows.toString()),
        currentPage: parseInt(this.SuggestionModelObj.PageNumber.toString()),
        totalItems: parseInt(res[1])
      };
      //console.log('getsugg',res);
    })
    // this.ip.getIPAddress().subscribe((res:any)=>{  
    //   this.ipAddress=res.ip; 
    //   //console.log('client IP', res.ip);
    // });  
  }  
  AddSuggestionVote(item){
    if (item.flag = 'true') {
      
    }
    this.SuggestionVoteModelObj.Sug_Vote_Sug_PkeyID = item.Sug_PkeyID;
this.xSuggestionServices.AddSuggestionVote(this.SuggestionVoteModelObj).subscribe(res=>{
  this. getIP();  
})
  }
  onPageChange(event){
    //console.log(event);
    this.config.currentPage = event;
    this.SuggestionModelObj.PageNumber = parseInt(event.toString());
     this.getIP();  
  }
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
