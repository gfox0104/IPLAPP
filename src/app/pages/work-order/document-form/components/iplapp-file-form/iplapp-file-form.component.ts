import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { ContractorMapState } from 'src/app/pages/user/add-user/add-user-model';
import { AddUserServices } from 'src/app/pages/user/add-user/add-user.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { DocumentAndFormsDTO, FileMasterModel } from '../../document-form-model';
import { MultiDropdowns } from './multi-dropdowns';

@Component({
  selector: 'iplapp-file-form',
  templateUrl: './iplapp-file-form.component.html'
})

export class IplAppFileForm implements OnInit {
  decuser:any;
  tabhide:boolean = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xAddUserServices: AddUserServices,
    private EncrDecr: EncrDecrService
    
  ) { 
    if(localStorage.getItem('usertemp_') != null)
    {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval  = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser  =JSON.parse(decval) ;

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
  }

  @Input() fileMasterModelObj : FileMasterModel;
  @Input() formArrayVal;
  @Input() folderlst;
  @Input() filelst;
  @Input() fileSubmitted;
  @Input() inputelement;
  @Input() dropdownList;
  @Input() customerNumberList;
  @Input() loanTypeList;
  @Input() workTypeList;
  @Input() workTypeCategory;
  @Input() stateList;
  @Input() countryList;

  @Output() onSubmit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  multiDropdowns = MultiDropdowns;
  formUsrCommonGroup: UntypedFormGroup;
  filevalFlag= false;
  isFileSelected = false;
  isDrpSelected = false;
  isLoading: boolean;
  button: string = 'Save';
  flag: boolean = false;
  hidedaa: boolean = true;
  isRequired = true;
  IsEditDisable = false;
  ContractorMapStateObj: ContractorMapState = new ContractorMapState();
  DocumentAndFormsDTO: DocumentAndFormsDTO = new DocumentAndFormsDTO();
  
  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      GroupRoleVal:["", Validators.nullValidator],
      Folderval: ["", Validators.nullValidator],
      FoldValName: ["", Validators.nullValidator],
      FileDataval:["", Validators.required],
      FileDesc:["", Validators.nullValidator],
      FileAutoAssign:["", Validators.nullValidator],
      FileSelection:["", Validators.nullValidator],
      FoldDesc:["", Validators.nullValidator]
    });
  }

  ngOnChanges(changes: SimpleChanges) {   
    if (changes['fileSubmitted'] && changes['fileSubmitted'].currentValue === true) {
      this.isLoading = false;
      this.button = "Save";
    }

    if (changes['countryList']) {
      let tempMultiDropList = [
        this.dropdownList,
        this.customerNumberList,
        this.loanTypeList,
        this.workTypeList,
        this.workTypeCategory,
        this.stateList,
        this.countryList
      ]

      tempMultiDropList.forEach((list, index) => {
        //console.log(list, index)
        this.multiDropdowns[index].data = list;          
      });
    }  
  }

  modelChanged()
  {  
    ////dfebugger;  
    //console.log(this.fileMasterModelObj);
    if (this.fileMasterModelObj.Fold_File_Pkey_Id > 0) {
      this.IsEditDisable = true;
      this.isFileSelected = false;
      this.filevalFlag = false;
      this.isDrpSelected = false;
      this.formUsrCommonGroup.disable();
      this.button = "Update";
    }
    else{
      this.IsEditDisable = false;
      this.button = "Save";
    }
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  file_Method() {

  }

  uploadfiledoc(documentInput: any) {
    this.inputelement = documentInput.target.files[0]
  }

  EditForms() {
    this.IsEditDisable = false;
    this.formUsrCommonGroup.enable();
  }

  downloadPdf(pdfUrl: string, pdfName: string ) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  
  
  onSubmitForm() {
    if (this.fileMasterModelObj.Fold_File_ParentId == 0 && (this.fileMasterModelObj.Fold_File_Pkey_Id == 0 && (this.inputelement == '' || this.inputelement == undefined))) {
      this.filevalFlag = true;
      this.isFileSelected = true;
      this.checkArrayValue();
      return;
    }
    else if (this.fileMasterModelObj.Fold_File_ParentId == 0) {
      this.filevalFlag = true;
      this.isFileSelected = false;
      this.checkArrayValue();
      return;
    }
    else if (this.fileMasterModelObj.Fold_File_Pkey_Id == 0 && (this.inputelement == '' || this.inputelement == undefined)) {
      this.filevalFlag = false;
      this.isFileSelected = true;
      this.checkArrayValue();
      return;
    }    
    else{
      this.checkArrayValue();
      if (this.isDrpSelected) {
        this.isFileSelected = false;
        this.filevalFlag = false;        
        return;
      } else {
        this.isFileSelected = false;
        this.filevalFlag = false;
        this.isDrpSelected = false;
        this.isRequired = false;
      }      
    }
    // if (this.formUsrCommonGroup.invalid) {
    //   return;
    // }
    this.isLoading = true;
    this.button = "Processing";
    this.fileMasterModelObj.AutoAssinArray = this.formArrayVal;
    this.onSubmit.emit(this.inputelement);
  }

  onCancel(form: any) {
    window.location.reload();
  }

  hideshowDetails(arg) {
    if (arg) {
      this.hidedaa = false;
    } else {
      this.hidedaa = true;
    }
  }

   onItemSelect(item: any) {
   if (item.IPL_StateID != undefined) {
    if (this.formArrayVal[0].Task_sett_State.length > 0) {
     this.bindCountyDropDown();
    } else {
      this.multiDropdowns[6].data = []; 
      this.formArrayVal[0].Task_sett_Country = [];
    }
     
   }    
  }

  onSelectAll(items: any) {
    //console.log(items);
  }

  onItemDeSelect(item: any) {
   if (item.IPL_StateID != undefined) {    
    if (this.formArrayVal[0].Task_sett_State.length > 0) {
      this.bindCountyDropDown();
    } else {
      this.multiDropdowns[6].data = []; 
      this.formArrayVal[0].Task_sett_Country = [];
    }
   }    
  }

  bindCountyDropDown()
  {
    //console.log(this.formArrayVal[0].Task_sett_State);
    this.DocumentAndFormsDTO.AutoAssinArray = this.formArrayVal;
    this.DocumentAndFormsDTO.UserID = this.fileMasterModelObj.UserID;
     this.xAddUserServices.ContractorCountyList(this.DocumentAndFormsDTO).subscribe(response => {
       //console.log('countyList',response);        
       this.multiDropdowns[6].data = response[0];        
    });
  }

  checkArrayValue()
  {
    if (this.fileMasterModelObj.Fold_Is_AutoAssign == true) {
      if (this.formArrayVal[0].Task_sett_Company.length > 0 || this.formArrayVal[0].Task_sett_Customer.length > 0 || this.formArrayVal[0].Task_sett_Lone.length > 0 ||
        this.formArrayVal[0].WTTaskWorkType.length > 0 || this.formArrayVal[0].Task_Work_TypeGroup.length > 0 || this.formArrayVal[0].Task_sett_State.length > 0
        || this.formArrayVal[0].Task_sett_Country.length > 0) {
          this.isDrpSelected = false;
      } else {
        this.isDrpSelected = true;
      }
    } else {
      this.isDrpSelected = false;
    }
  }
  RemoveDocument()
  {
    this.inputelement = '';
    this.formUsrCommonGroup.reset();
  }
  OnNewFileClick()
  {
    this.formUsrCommonGroup.enable();
    this.IsEditDisable = false;
    this.button = "Save";
  }
}
