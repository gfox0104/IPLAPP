import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, DebugElement } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ContractorMapState } from 'src/app/pages/user/add-user/add-user-model';
import { AddUserServices } from 'src/app/pages/user/add-user/add-user.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';

import { DocumentAndFormsDTO } from '../../document-form-model';
import { MultiDropdowns } from './multi-dropdowns';

@Component({
  selector: 'iplapp-document-form',
  templateUrl: './iplapp-document-form.component.html'
})

export class IplAppDocumentForm implements OnInit {

  @Input() documentAndFormsDTO: DocumentAndFormsDTO;
  @Input() folderlst;
  @Input() groupRoleList;
  @Input() folderSubmitted;

  @Output() onSubmit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  multiDropdowns = MultiDropdowns;
  formUsrCommonGroup: UntypedFormGroup;
  foldervalFlag: boolean;
  flag: boolean = false;
  hidedaa: boolean = true;
  isLoading = false;
  isdisable = false;
  regis: boolean = true;
  button = "Save";
  submitted: boolean;
  ConstateList:any;
  County:any;
  IsEditDisable = false;
  isFoldName = false;
  isRequired = true;
  decuser:any;
  tabhide:boolean = false;
  ContractorMapStateObj: ContractorMapState = new ContractorMapState();
  constructor(
    private xAddUserServices: AddUserServices,
    private formBuilder: UntypedFormBuilder,
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
   };
  

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      GroupRoleVal: ["", Validators.nullValidator],
      Folderval: ["", Validators.nullValidator],
      FoldValName: ["", Validators.nullValidator],
      FileDataval: ["", Validators.nullValidator],
      FileDesc: ["", Validators.nullValidator],
      FoldDesc: ["", Validators.nullValidator]
    });
  }

  ngOnChanges(changes: SimpleChanges) {  
    //console.log(this.documentAndFormsDTO);
    

    if (changes['folderSubmitted'] && changes['folderSubmitted'].currentValue === true) {
      this.isLoading = false;
      this.button = "Save";
    }   
  }
  modelChanged()
  {  
    //console.log(this.documentAndFormsDTO);
    if (this.documentAndFormsDTO.Fold_Pkey_Id > 0) {
      this.IsEditDisable = true;
      this.isFoldName = false;
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

  folder_Method() {
    this.foldervalFlag = false;
  }
  EditForms() {
    this.IsEditDisable = false;
    this.formUsrCommonGroup.enable();
  }

  hideshowDetails(arg) {
    if (arg) {
      this.hidedaa = false;
    } else {
      this.hidedaa = true;
    }
  } 

  onCancel(form: any) { 
    window.location.reload();
  }

  onSubmitForm() {    
    //this.contentx = content;
    this.submitted = true;
    this.isdisable = false;
    
    if (this.documentAndFormsDTO.Fold_Name == '' || this.documentAndFormsDTO.Fold_Name == null) {
      this.isFoldName = true;
      return;
    }

    this.isRequired = false;

    this.documentAndFormsDTO.PermisionArray = this.groupRoleList;

   

    this.isLoading = true;
    this.button = "Processing";
    this.onSubmit.emit(this.documentAndFormsDTO);
  }
  OnNewFolderClick()
  {
    this.formUsrCommonGroup.enable();
    this.IsEditDisable = false;
    this.button = "Save";
  }
}
