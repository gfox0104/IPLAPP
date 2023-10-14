import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AddInstructionServices } from '../add-instruction/add-Instruction.service';
import { AddInstructionModel } from '../add-instruction/add-instruction-model';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import {Filters} from '../constants/filters'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {FormFields} from '../constants/form-fields'
import { IplAppModalContent } from 'src/app/components';
import {ViewInstructionModel} from '../view-instruction/view-Instruction-model';
import {ViewInstructionServices} from '../view-instruction/view-Instruction.service';


@Component({
 selector:"app-add-instruction",
  templateUrl: "./add-instruction-componetnt.html"
})

export class AddInstructionComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  @Input() Inst_TaskId: any;
  @Output() update = new EventEmitter();
  @Output() dispalyInfoData = new EventEmitter();
  public griddata: any[];
  AddInstructionModelObj: AddInstructionModel = new AddInstructionModel();
  ViewInstructionModelObj: ViewInstructionModel = new ViewInstructionModel();
  FormFields = FormFields;
  formUsrCommonGroup: UntypedFormGroup;
  FormArrayVal = [];
  IsEditDisable = false;
  isSubmitted: boolean;
  isDrpSelected = false;
  submitted = false;
  MessageFlag:string;
  button = "Save";
  isLoading = false;
  ModelObj:any;
  isHelpActive = false;
  hidedaa: boolean = true;
  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xAddInstructionServices: AddInstructionServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xRoute: ActivatedRoute,
    private xViewInstructionServices:ViewInstructionServices,

  ) {

    this.FormArrayVal = [
        {
          Task_sett_Customer: [],
          Task_sett_Company: [],
          Task_sett_Lone: [],
          Task_Work_TypeGroup: [],
          WTTaskWorkType: [],
        }
      ];
  }

  dropdownList = [];

  selectedItems = [];
  dropdownSettings = {};
  dropdownSettingsCustomer = {};
  dropdownSettingsLoanType = {};
  dropdownSettingsWorkTypeList = {};
  dropdownSettingsWorkTypeCategory = {};

  ngOnInit() {
     this.formUsrCommonGroup = this.formBuilder.group({
      discrpval: ["", Validators.required],
      disactive: ["", Validators.required],
      disAutoAssign: ["", Validators.required],
      drdclient: ["", Validators.nullValidator],
      commentval:["", Validators.nullValidator],
      InstTaskAutoAssign:["", Validators.nullValidator],

  });


  this.GetDropDowndata();
  this.getModelData();

    // this setting for multiple drop down select values
    this.dropdownSettings = {
        singleSelection: false,
        idField: "Client_pkeyID",
        textField: "Client_Company_Name",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 1,
        allowSearchFilter: true
      };

      // this setting for multiple drop down select values Customer
      this.dropdownSettingsCustomer = {
        singleSelection: false,
        idField: "Cust_Num_pkeyId",
        textField: "Cust_Num_Number",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 1,
        allowSearchFilter: true
      };
      // this setting for multiple drop down select values Loan Type
      this.dropdownSettingsLoanType = {
        singleSelection: false,
        idField: "Loan_pkeyId",
        textField: "Loan_Type",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 1,
        allowSearchFilter: true
      };

      // this setting for multiple drop down select values Loan Type
      this.dropdownSettingsWorkTypeList = {
        singleSelection: false,
        idField: "WT_pkeyID",
        textField: "WT_WorkType",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 1,
        allowSearchFilter: true
      };

      // this setting for multiple drop down select values Loan Type
      this.dropdownSettingsWorkTypeCategory = {
        singleSelection: false,
        idField: "Work_Type_Cat_pkeyID",
        textField: "Work_Type_Name",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 1,
        allowSearchFilter: true
      };

    }
    onItemSelect(item: any) {
      //console.log(item);
    }
    onSelectAll(items: any) {
      //console.log(items);
    }

    CompanyList: any; // temp array
    CustomerList: any; // temp array
    WorkTypeList: any; // temp array
    LoanTypeList: any;
    WorkTypeCategory: any; //group

    GetDropDowndata() {
      this.xAddInstructionServices
        .DropdownDataPost(this.AddInstructionModelObj)
        .subscribe(response => {
          //console.log("drop down  data ", response);
          if (response.length != 0) {
            this.CompanyList = response[0];
            this.WorkTypeList = response[1];
            this.LoanTypeList = response[2];
            this.CustomerList = response[3];
            this.WorkTypeCategory = response[4];
          }
        });
    }
    get fx() {
      return this.formUsrCommonGroup.controls;
    }
    // submit form
    formButton() {
      debugger
      
       this.submitted = true;
       this.isLoading = true;
       if (this.formUsrCommonGroup.invalid) {
        this.isLoading = false;
        return;
      }
      this.isSubmitted = false;

      this.AddInstructionModelObj.AutoAssinArray = this.FormArrayVal;
      this.xAddInstructionServices
        .AutoInstructionDataPost(this.AddInstructionModelObj)
        .subscribe(response => {
          //debugger;
          this.isLoading = false;
            //console.log('resp',response);
          if (response[0][1] != 0) {

            this.MessageFlag = "Auto Instruction Task Data Saved...!";
            this.isSubmitted = true;
            this.commonMessage();
            this.GetsingleData();
            this.formUsrCommonGroup.disable();
            this.isDropdownDisabled = true;
            this.IsEditDisable = true;
            this.button = "Update";
            this.AddInstructionModelObj.Type = 2;
            this.update.emit();
          }
          else
          {
            this.MessageFlag = "This Record Allready Exist...!";
            this.commonMessage();
          }
        });
    }

    // common message modal popup
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.componentInstance.buttonTitle = "Ok";
      modalRef.result.then(result => { }, reason => {this.xmodalService.dismissAll() });
    }
    Back() {
        this.xRouter.navigate(["/home/autoinstruction/viewinstruction"]);
    }

    getModelData() {
      // debugger
        //const id1 = this.xRoute.snapshot.params['id'];
        const id1 = this.Inst_TaskId;

        if (id1 == 'new') {
          this.AddInstructionModelObj = new AddInstructionModel();
        } else {
          //let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
          //console.log('User_pkeyID', id);
          //this.ModelObj = parseInt(id);
          this.ModelObj = id1;
        }

        if (this.ModelObj == undefined) {
         this.AddInstructionModelObj = new AddInstructionModel();

          this.isSubmitted = false;
          this.button = "Save";
          this.isLoading = false;
        } else {
          //console.log("grid to f", this.ModelObj);
          this.AddInstructionModelObj.Type =2; //this.ModelObj.Type;
          this.AddInstructionModelObj.Inst_Task_pkeyId = this.ModelObj;
          this.ViewInstructionModelObj.Type =2 //this.ModelObj.Type;
          this.ViewInstructionModelObj.Inst_Task_pkeyId = this.ModelObj;


          this.GetsingleData();

          this.formUsrCommonGroup.disable();
          this.isDropdownDisabled = true;
          this.IsEditDisable = true;
          this.button = "Update";
          this.AddInstructionModelObj.Type = 2;
        }
      }
      isDropdownDisabled = false;
      EditForms() {
        this.IsEditDisable = false;
        this.isDropdownDisabled = false;
        this.formUsrCommonGroup.enable();
      }
      GetsingleData(){
        // debugger
        this.ViewInstructionModelObj.Type = 2;
       this.xViewInstructionServices.ViewInstructionData(this.ViewInstructionModelObj)
       .subscribe(res =>{
        // debugger;
         //console.log('editdata',res);
         //this.FormArrayVal = res[1];
         this.AddInstructionModelObj.Inst_Task_IsActive = res[0][0].Inst_Task_IsActive;
         this.AddInstructionModelObj.Inst_Task_Name = res[0][0].Inst_Task_Name;
         this.AddInstructionModelObj.Inst_Task_Desc = res[0][0].Inst_Task_Desc;
         this.AddInstructionModelObj.Inst_Task_IsAutoAssign = res[0][0].Inst_Task_IsAutoAssign;
         this.AddInstructionModelObj.Inst_Task_Type_pkeyId = res[0][0].Inst_Task_Type_pkeyId;
         this.AddInstructionModelObj.Instruction_Json_PkeyId = res[1][0].Instruction_Json_PkeyId;


         if (res[1].length > 0) {
      for (let i = 0; res[1].length > i; i++) {
        if (res[1][i].Instruction_Json_Client) {
          this.FormArrayVal[i].Task_sett_Company = JSON.parse(
            res[1][i].Instruction_Json_Client
          );
        }

        if (res[1][i].Instruction_Json_Customer) {
          this.FormArrayVal[i].Task_sett_Customer = JSON.parse(
            res[1][i].Instruction_Json_Customer
          );
        }

        if (res[1][i].Instruction_Json_LoanType) {
          this.FormArrayVal[i].Task_sett_Lone = JSON.parse(
            res[1][i].Instruction_Json_LoanType
          );
        }

        if (res[1][i].Instruction_Json_Work_Group) {
          this.FormArrayVal[i].Task_Work_TypeGroup = JSON.parse(
            res[1][i].Instruction_Json_Work_Group
          );
        }
        if (res[1][i].Instruction_Json_WorkType) {
          this.FormArrayVal[i].WTTaskWorkType = JSON.parse(
            res[1][i].Instruction_Json_WorkType
          );
        }
      }
    } else {
      this.FormArrayVal = [
        {
          Task_sett_Customer: [],
          Task_sett_Company: [],
          Task_sett_Lone: [],
          Task_Work_TypeGroup: [],
          WTTaskWorkType: [],
        }
      ];
    }

       })
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
        let isHelpActive = this.isHelpActive;
        if (this.isHelpActive) {
          event.preventDefault();
          this.dispalyInfoData.emit({event,lblName,isHelpActive});
          this.MessageFlag = "Add Information for " + lblName;
          this.commonMessage();
        }
      }

  //     DispalyInfo(event: Event, lblName)
  // { 
  //   //debugger;   
  //   let isHelpActive = this.isHelpActive;
  //   if (this.isHelpActive) {
  //     event.preventDefault();
  //     this.dispalyInfoData.emit({event,lblName,isHelpActive});
  //   }    
  // }

      hideshowDetails(arg) {
        if (arg) {
          this.hidedaa = false;
        } else {
          this.hidedaa = true;
        }
      }

}
