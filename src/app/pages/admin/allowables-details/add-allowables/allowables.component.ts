import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { PostAllowablesDetails } from './allowables-details.model';
import { DatePipe } from '@angular/common';
import { AllowablesServices } from '../view-allowables/allowables-details.service';
import { AllowablesDetails } from '../view-allowables/allowables-details.model';

@Component({
  templateUrl: './allowables.component.html',
  styleUrls: ['./allowables.component.scss'],
  providers: [DatePipe]
})
export class AddAllowablesDetailsComponent implements OnInit {

  PostAllowablesDetailsObj:PostAllowablesDetails = new PostAllowablesDetails();
  AllowablesDetailsObj:AllowablesDetails = new AllowablesDetails();
  defaultTypeItem: { Allowables_Cat_Name: string, Allowables_Cat_PkeyId: number } = { Allowables_Cat_Name: 'Select', Allowables_Cat_PkeyId: 0 };
  defaultItem: { Cust_Num_Number: string, Cust_Num_pkeyId: number } = { Cust_Num_Number: 'Select', Cust_Num_pkeyId: 0 };
  formUsrCommonGroup: UntypedFormGroup;
  isEditDisable = false;
  IsEditDisable = false;
  isdisable= false;
  MessageFlag:string;
  AllowablesDataArray= [];
  submitted = false; 
  button = "Save"; 
  isLoading = false;
  ModelObj: any;
  isHelpActive = false;
  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xAllowablesServices :AllowablesServices,
    public datepipe: DatePipe,
    private xRoute: ActivatedRoute,
  ) {
    this.initallowable();
    this.getModelData();
    this.GetAllowableDRD();
  }

  ngOnInit() { 
     this.formUsrCommonGroup = this.formBuilder.group({
      allowablesVal: ["", Validators.required],
      allowcheckboxval: ["", Validators.nullValidator],
    
  });
 
}

getModelData() {
  //debugger
  const id1 = this.xRoute.snapshot.params['id'];
  if (id1 == 'new') {
    this.PostAllowablesDetailsObj = new PostAllowablesDetails();
  } else {
    let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
    
    this.ModelObj = parseInt(id);
    this.GetsingleData();
    
    this.IsEditDisable = true;
    this.isdisable= true;
    this.button = "Update";
    this.PostAllowablesDetailsObj.Type = 2;
  }
}
GetsingleData() {
  //debugger
  this.AllowablesDataArray = [];
  this.AllowablesDetailsObj.Type = 2;
  this.AllowablesDetailsObj.Allowable_PKeyId =  this.ModelObj;
  if (this.AllowablesDetailsObj.Allowable_PKeyId != 0) {
    this.xAllowablesServices.GetAllowablesDetail(this.AllowablesDetailsObj)
    .subscribe(response =>{
    
     if (response.length != 0) {
       if (response[0].length != 0) {
        this.PostAllowablesDetailsObj.Allowable_PKeyId = response[0][0].Allowable_PKeyId;
        this.PostAllowablesDetailsObj.Allowable_Name = response[0][0].Allowable_Name;
        this.PostAllowablesDetailsObj.Allowable_StartDate = this.datepipe.transform(response[0][0].Allowable_StartDate,'yyyy-MM-dd');
        this.PostAllowablesDetailsObj.Allowable_EndDate = this.datepipe.transform(response[0][0].Allowable_EndDate,'yyyy-MM-dd');
        this.PostAllowablesDetailsObj.Allowable_IsActive = response[0][0].Allowable_IsActive;
        this.PostAllowablesDetailsObj.Allowable_Cust_ID = response[0][0].Allowable_Cust_ID;
       }
       if (response[1].length != 0) {
         response[1].forEach(element => {
          element.Allow_Child_StartDate =  this.datepipe.transform(element.Allow_Child_StartDate,'yyyy-MM-dd');
          element.Allow_Child_EndDate =  this.datepipe.transform(element.Allow_Child_EndDate,'yyyy-MM-dd');
          this.AllowablesDataArray.push(element)
           
         });
       }

     }
    })
  }
}

  initallowable() {
    //debugger
    let data = {
      Allow_Child_PkeyId: 0,
      Allow_Child_Allowables_PkeyId: 0,
      Allow_Child_Allowables_Cat_PkeyId: 0,
      Allow_Child_StartDate: '',
      Allow_Child_EndDate: '',
      Allow_Child_OverallAllowables: 0,
      Allow_Child_IsActive:true,
      Allow_Child_IsDelete:false
     };
     this.AllowablesDataArray.push(data)
   }
   get fx() {
    return this.formUsrCommonGroup.controls;
  }
  category:any;
  categoryList:any;
  customer:any;
  customerList:any;
GetAllowableDRD(){
  this.xAllowablesServices.GetAllowableCategoryDRD().subscribe(res=>{

this.category = res[0];
this.categoryList = this.category;
this.customer = res[1];
this.customerList = this.customer;
  })
}
AddAllowables(){
  //debugger
  let data = {
    Allow_Child_PkeyId: 0,
    Allow_Child_Allowables_PkeyId: 0,
    Allow_Child_Allowables_Cat_PkeyId: 0,
    Allow_Child_StartDate: '',
    Allow_Child_EndDate: '',
    Allow_Child_OverallAllowables: 0,
    Allow_Child_IsActive:true,
    Allow_Child_IsDelete:false
   };
   this.AllowablesDataArray.push(data)
}
RemoveAllowables(index, item){
  let Cnfm = confirm("Are you Sure you want to  Delete this Record..?");
  if (Cnfm) {
    if (item.Allow_Child_PkeyId != 0) {
      this.PostAllowablesDetailsObj.Type = 4; // for delete
      this.PostAllowablesDetailsObj.Allowable_PKeyId = item.Allow_Child_PkeyId;
      this.xAllowablesServices
      .DeleteAllowablesChildDetail(this.PostAllowablesDetailsObj)
      .subscribe(response =>{
          if (index !== -1) {
            this.AllowablesDataArray.splice(index, 1);
          }
     
        });
    } else {
      this.AllowablesDataArray.splice(index, 1);
    }


}
}
CategoryFilter(value){
  if (value != '') {
    var filteredcustomer = this.category.filter(function (el) {
      return el.Allowables_Cat_Name != null;
    });
    this.categoryList = filteredcustomer.filter((s) => s.Allowables_Cat_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  else {
    this.categoryList = this.category.slice();
  }
}
    // submit form
    formButton() {
      //debugger
  
      let errCnt = 0;
      this.AllowablesDataArray.forEach(item => {
        if (item.Allow_Child_Allowables_Cat_PkeyId == 0) {
          errCnt++;
        }
      });
      if (errCnt > 0) {
      
        this.button = "Save";
        this.MessageFlag = "Please fill Allowables Category feilds...!";
        this.commonMessage();
      }
      else{
        this.submitted = true;
        this.isLoading = true;
        this.button = "Processing";
        if (this.AllowablesDataArray != null) {
          this.PostAllowablesDetailsObj.AllowablesArray = this.AllowablesDataArray;
        }
      
        if (this.formUsrCommonGroup.invalid) {
          this.isLoading=false
          return;
        }
        this.xAllowablesServices
        .PostAllowableMasterData(this.PostAllowablesDetailsObj)
        .subscribe(response =>{
            if (response[0].Status != "0") {
              this.PostAllowablesDetailsObj.Allowable_PKeyId = parseInt(response[0].Allowable_PKeyId);
              this.ModelObj = parseInt(response[0].Allowable_PKeyId);
              this.MessageFlag = "Allowables Data Saved...!";
              this.isLoading = false;
              this.button = "update";
              this.commonMessage();
              this.GetsingleData();
            }
          
          });
      }
   

    }
  
    // common message modal popup
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => {this.xmodalService.dismissAll() });
    }
    closeModal() {
      this.xmodalService.dismissAll();
    }

    EditForms() {
      this.IsEditDisable = false;
      this.isdisable= false;
      this.formUsrCommonGroup.enable();
    }
    reset() {
      this.PostAllowablesDetailsObj = new PostAllowablesDetails();
      this.AllowablesDataArray = [];
    }
    CustomerFilter(value){
      if (value != '') {
        var filteredcustomer = this.customer.filter(function (el) {
          return el.Cust_Num_Number != null;
        });
        this.customerList = filteredcustomer.filter((s) => s.Cust_Num_Number.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
      else {
        this.customerList = this.customer.slice();
      }
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
