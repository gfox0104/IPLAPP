import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrderDrodownServices } from '../../services/common-drop-down/drop-down.service';
import { AddGroupsServices } from '../../services/AddGroupsServices';
import { GrouproleModel } from '../../models/add-groups-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentAndFormsDTO, FileMasterModel } from './document-form-model';
import { DocumentAndFormsServices } from './document-form.service';
import { ClientResultOldPhotoServices } from '../../client-result/client-result-photo/client-result-photo-old.service'
import { BindDataModel } from "../../client-result/client-result/client-result-model";
import { NgbPanelChangeEvent, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from '../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { IplAppDocumentForm } from './components/iplapp-document-form/iplapp-document-form.component';
import { IplAppFileForm } from './components/iplapp-file-form/iplapp-file-form.component';
import { AddUserServices } from '../../user/add-user/add-user.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { DescriptionModalContent } from './description-modal-content.component';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})

export class DocumentAndFormComponent implements OnInit {

  nrSelect = 'Select';
  folderhide = true;
  foldershow = true;
  folderSubmitted: boolean;
  fileSubmitted: boolean;
  MessageFlag: string;
  Description: string;
  dropCkck = false; // common dropdown
  isHelpActive = false;
  bindDataModelObj: BindDataModel = new BindDataModel();
  fileMasterModelObj: FileMasterModel = new FileMasterModel();
  documentAndFormsDTO: DocumentAndFormsDTO = new DocumentAndFormsDTO();
  groupRoleModel: GrouproleModel = new GrouproleModel();

  model = {};
  currentStep = 1;
  formArrayVal = [];
  parentlst: any;
  assinearr = [];
  checkitem: any;
  regis: boolean = true;
  inputelement: any;
  fileList: any;
  dropdownList = [];
  stateList: any;
  customerNumberList: any;
  CompanyList: any; // temp array
  CustomerList: any; // temp array
  workTypeList: any; // temp array
  CategoryList: any; // temp array
  ContractorList: any; // temp array
  CordinatorList: any;
  loanTypeList: any;
  countryList: any;
  workTypeCategory: any; //group
  groupRoleList: any;
  folderlst: any;
  flag: boolean = false;
  hidedaa: boolean = true;
  filelst: any;
  decuser: any;
  tabhide: boolean = false;

  @ViewChild('acc') accordion: NgbAccordion;
  @ViewChild('child') child: IplAppDocumentForm;
  @ViewChild('filechild') filechild: IplAppFileForm;
  folderarr: any;

  toggle(step) {
    this.currentStep = this.currentStep < step ? step : this.currentStep;
    setTimeout(() => this.accordion.toggle('toggle-' + step), 0);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    const availStep = 'toggle-' + this.currentStep;
    if ($event.panelId > availStep) {
      $event.preventDefault();
    }
  };

  constructor(
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xAddGroupsServices: AddGroupsServices,
    private xmodalService: NgbModal,
    private xDocumentAndFormsServices: DocumentAndFormsServices,
    private xAddUserServices: AddUserServices,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private EncrDecr: EncrDecrService
  ) {
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser = JSON.parse(decval);

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

    this.formArrayVal = [
      {
        Task_sett_State: [],
        Task_sett_Country: [],
        Task_sett_Zip: null,
        Task_sett_Customer: [],
        Task_sett_Company: [],
        Task_sett_Lone: [],
        Task_Work_TypeGroup: [],
        WTTaskWorkType: [],
        Task_sett_IsActive: true,
        Task_sett_IsDelete: false
      }
    ];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.GetParentModelData();
  }
  folderdrd(value) {
    //debugger
    if (value.value != '') {
      //debugger
      var filteredcustomer = this.folderarr.filter(function (el) {
        return el.Fold_Name != "";
      });
      this.folderlst = filteredcustomer.filter((s) => s.Fold_Name.toLowerCase().indexOf(value.value.toLowerCase()) !== -1);
    }
    else {
      this.folderlst = this.folderarr.slice();
    }
  }
  filedrd(value) {
    if (value.value != '') {
      //debugger
      var filteredcustomer = this.folderarr.filter(function (el) {
        return el.Fold_Name != "";
      });
      this.folderlst = filteredcustomer.filter((s) => s.Fold_Name.toLowerCase().indexOf(value.value.toLowerCase()) !== -1);
    }
    else {
      this.folderlst = this.folderarr.slice();
    }
  }
  GetParentModelData() {
    this.xDocumentAndFormsServices
      .GetParentFolder(this.documentAndFormsDTO)
      .subscribe(response => {
        ////dfebugger;
        this.parentlst = response[0];

      })
    this.GetDropDowndata();
  }

  //Edit parent Folder Details
  editData(parentDetails) {
    ////dfebugger;
    window.scroll(0, 0);
    this.folderhide = false;
    this.foldershow = true;
    this.documentAndFormsDTO.Fold_Pkey_Id = parentDetails.Fold_Pkey_Id;
    this.xDocumentAndFormsServices
      .GetsingleParentFolder(this.documentAndFormsDTO)
      .subscribe(response => {
        //console.log('arr', response);
        //this.formArrayVal = response[1];

        if (response[0].length > 0) {
          this.documentAndFormsDTO.Fold_Pkey_Id = response[0][0].Fold_Pkey_Id;
          this.documentAndFormsDTO.Fold_Name = response[0][0].Fold_Name;
          this.documentAndFormsDTO.Fold_Parent_Id = response[0][0].Fold_Parent_Id;
          this.documentAndFormsDTO.Fold_Desc = response[0][0].Fold_Desc;
          this.documentAndFormsDTO.Fold_IsActive = response[0][0].Fold_IsActive;
        }

        if (response[2].length > 0) {
          this.groupRoleList.forEach(element => {
            element.checkitem = false;
          });
          for (let i = 0; i < response[2].length; i++) {

            this.groupRoleList.find(v => v.Group_DR_PkeyID == response[2][i].Fold_Role_GroupRole_Id)
              .checkitem = response[2][i].Fold_Role_IsActive;
          }
          this.child.modelChanged();
        }
      })
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  /// end common model
  assinerole(arg, i) {
    this.assinearr = this.groupRoleList;
  }

  // submit form  start
  folderDetaisDataPost(event) {
    this.documentAndFormsDTO = event;
    this.folderSubmitted = false;
    this.xDocumentAndFormsServices
      .FolderdataPost(this.documentAndFormsDTO)
      .subscribe(response => {
        if (response[0] != "0") {
          if (this.documentAndFormsDTO.Fold_Pkey_Id > 0) {
            this.MessageFlag = "Folder Updated ...!";
            this.commonMessage();
          } else {
            this.MessageFlag = "Folder Created ...!";
            this.commonMessage();
          }

          // this.formUsrCommonGroup.reset()
          this.documentAndFormsDTO.Fold_Pkey_Id = 0;
          this.GetParentModelData();
          this.folderhide = true;
          this.foldershow = true;
          this.regis = true;
          this.folderSubmitted = true;
          this.clearForm();
          this.formArrayVal = [
            {
              Task_sett_State: [],
              Task_sett_Country: [],
              Task_sett_Zip: null,
              Task_sett_Customer: [],
              Task_sett_Company: [],
              Task_sett_Lone: [],
              Task_Work_TypeGroup: [],
              WTTaskWorkType: [],
              Task_sett_IsActive: true,
              Task_sett_IsDelete: false
            }
          ];
        }
      });
  }

  // file upload
  uploadfiledoc(documentInput: any) {
    this.inputelement = documentInput.target.files[0];
  }

  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder()
      .subscribe(response => {
        //console.log("drop down  data ", response);
        if (response.length != 0) {
          this.stateList = response[6];
          this.customerNumberList = response[9];
          this.CompanyList = response[0];
          this.workTypeList = response[1];
          this.CategoryList = response[2];
          this.ContractorList = response[3];
          this.CordinatorList = response[4];
          this.loanTypeList = response[10];
          this.dropdownList = response[0];
          this.countryList = [];
          this.workTypeCategory = response[11];
        }
      });
    this.getGroupRoleDrd();
  }

  //get role dropdown
  getGroupRoleDrd() {
    this.xAddGroupsServices.GetGroupdrd(this.groupRoleModel)
      .subscribe(response => {
        //debugger
        //console.log('drddata', response);
        this.groupRoleList = response[0];
        //this.groupRoleList = response[2][0];
        this.folderlst = [];
        let defaultdata = {
          Fold_Pkey_Id: 0,
          Fold_Name: "Select"
        }
        this.folderlst.push(defaultdata);
        response[1].forEach(element => {
          this.folderlst.push(element);
        });
        this.folderarr = this.folderlst;
      });
    // this.GetMenuDetails()
  }

  hideShowDiv(arg) {
    if (arg == 1) {
      this.regis = true;
      this.documentAndFormsDTO = new DocumentAndFormsDTO();
      this.formArrayVal = [
        {
          Task_sett_State: [],
          Task_sett_Country: [],
          Task_sett_Zip: null,
          Task_sett_Customer: [],
          Task_sett_Company: [],
          Task_sett_Lone: [],
          Task_Work_TypeGroup: [],
          WTTaskWorkType: [],
          Task_sett_IsActive: true,
          Task_sett_IsDelete: false
        }
      ];
      this.child.OnNewFolderClick();
      this.folderhide = false;
      this.foldershow = true;
      this.GetParentModelData();
    }
    else {
      this.fileMasterModelObj = new FileMasterModel();
      this.inputelement = '';
      this.formArrayVal = [
        {
          Task_sett_State: [],
          Task_sett_Country: [],
          Task_sett_Zip: null,
          Task_sett_Customer: [],
          Task_sett_Company: [],
          Task_sett_Lone: [],
          Task_Work_TypeGroup: [],
          WTTaskWorkType: [],
          Task_sett_IsActive: true,
          Task_sett_IsDelete: false
        }
      ];
      this.filechild.RemoveDocument();
      this.filechild.OnNewFileClick();
      this.folderhide = true;
      this.foldershow = false;
      this.GetParentModelData();
    }
  }

  editFileData(arg) {
    window.scroll(0, 0);
    this.folderhide = true;
    this.foldershow = false;
    this.fileMasterModelObj.Fold_File_Pkey_Id = arg.Fold_File_Pkey_Id;
    this.fileMasterModelObj.Type = 2;

    this.xDocumentAndFormsServices
      .GetFileeditDetails(this.fileMasterModelObj)
      .subscribe(response => {
        this.filelst = response[0];
        this.formArrayVal = response[1];
        this.fileMasterModelObj.Fold_File_Pkey_Id = response[0][0].Fold_File_Pkey_Id;
        this.fileMasterModelObj.Fold_File_ParentId = response[0][0].Fold_File_ParentId;
        this.fileMasterModelObj.Fold_File_Role_Folder_Id = response[0][0].Fold_File_Role_Folder_Id;
        this.fileMasterModelObj.Fold_File_Folder_Name = response[0][0].Fold_File_Folder_Name;
        this.fileMasterModelObj.Fold_File_Local_Path = response[0][0].Fold_File_Local_Path;
        this.fileMasterModelObj.Fold_File_Object_Name = response[0][0].Fold_File_Object_Name;
        this.fileMasterModelObj.Fold_File_Folder_Name = response[0][0].Fold_File_Folder_Name;
        this.fileMasterModelObj.Fold_File_Desc = response[0][0].Fold_File_Desc;
        this.fileMasterModelObj.Fold_Is_AutoAssign = response[0][0].Fold_Is_AutoAssign == null ? false : response[0][0].Fold_Is_AutoAssign;

        if (this.formArrayVal.length > 0) {
          for (let i = 0; this.formArrayVal.length > i; i++) {
            if (this.formArrayVal[i].Fold_Auto_Assine_Client) {
              this.formArrayVal[i].Task_sett_Company = JSON.parse(
                this.formArrayVal[i].Fold_Auto_Assine_Client
              );
            }

            if (this.formArrayVal[i].Fold_Auto_Assine_County) {
              this.formArrayVal[i].Task_sett_Country = JSON.parse(
                this.formArrayVal[i].Fold_Auto_Assine_County
              );
            }

            if (this.formArrayVal[i].Fold_Auto_Assine_Customer) {
              this.formArrayVal[i].Task_sett_Customer = JSON.parse(
                this.formArrayVal[i].Fold_Auto_Assine_Customer
              );
            }

            if (this.formArrayVal[i].Fold_Auto_Assine_LoneType) {
              this.formArrayVal[i].Task_sett_Lone = JSON.parse(
                this.formArrayVal[i].Fold_Auto_Assine_LoneType
              );
            }

            if (this.formArrayVal[i].Fold_Auto_Assine_State) {
              this.formArrayVal[i].Task_sett_State = JSON.parse(
                this.formArrayVal[i].Fold_Auto_Assine_State
              );
            }
            if (this.formArrayVal[i].Fold_Auto_Assine_WorkType_Group) {
              this.formArrayVal[i].Task_Work_TypeGroup = JSON.parse(
                this.formArrayVal[i].Fold_Auto_Assine_WorkType_Group
              );
            }
            if (this.formArrayVal[i].Fold_Auto_Assine_WorkType) {
              this.formArrayVal[i].WTTaskWorkType = JSON.parse(
                this.formArrayVal[i].Fold_Auto_Assine_WorkType
              );
            }
            if (this.formArrayVal[i].Task_sett_State.length > 0) {
              //console.log(this.formArrayVal[i].Task_sett_State);
              this.documentAndFormsDTO.AutoAssinArray = this.formArrayVal;
              this.documentAndFormsDTO.UserID = this.fileMasterModelObj.UserID;
              this.xAddUserServices.ContractorCountyList(this.documentAndFormsDTO).subscribe(response => {
                //console.log('countyList', response);
                this.countryList = response[0];
              });
            }

            this.formArrayVal[i].Task_sett_Zip = this.formArrayVal[i].Fold_Auto_Assine_Zip;
            this.fileMasterModelObj.Fold_Auto_Assine_PkeyId = this.formArrayVal[i].Fold_Auto_Assine_PkeyId;
          }
        } else {
          this.formArrayVal = [
            {
              Task_sett_State: [],
              Task_sett_Country: [],
              Task_sett_Zip: null,
              Task_sett_Customer: [],
              Task_sett_Company: [],
              Task_sett_Lone: [],
              Task_Work_TypeGroup: [],
              WTTaskWorkType: [],
              Task_sett_IsActive: true,
              Task_sett_IsDelete: false
            }
          ];
        }
        this.filechild.modelChanged();
      });
  }

  downloadPdf(pdfUrl: string, pdfName: string) {
    //console.log('url', pdfUrl);
    //console.log('name', pdfName)
    //const pdfUrl = './assets/sample.pdf';
    //const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  fileDatastore(inputelement) {
    //  debugger
    this.inputelement = inputelement;
    this.dropCkck = false;
    this.fileSubmitted = false;

    if (this.fileMasterModelObj.Fold_File_ParentId == 0) {
      this.dropCkck = true;

    }

    if (this.inputelement == '' || this.inputelement == undefined) {
      this.xDocumentAndFormsServices.UpdateFileDetails(this.fileMasterModelObj)
        .subscribe(response => {
          //debugger
          if (response[0] != "0") {
            this.MessageFlag = "File Details Updated Successfully ...!";
            this.fileSubmitted = true;
            this.commonMessage();
            this.folderhide = true;
            this.foldershow = true;
            this.GetParentModelData();
            this.clearFile();
          }
        });
    } else {
      this.bindDataModelObj.Client_Result_Photo_ID = this.fileMasterModelObj.Fold_File_Pkey_Id;
      this.bindDataModelObj.Client_Result_Photo_Ch_ID = this.fileMasterModelObj.Fold_File_ParentId;
      this.bindDataModelObj.Client_Result_Photo_Ch_ID = this.fileMasterModelObj.Fold_File_ParentId;
      this.bindDataModelObj.Client_PageCalled = 4;
      this.bindDataModelObj.IPLNO = 'Forms and Docs'
      this.bindDataModelObj.documentx = this.inputelement;
      this.bindDataModelObj.Client_Result_File_Desc = this.fileMasterModelObj.Fold_File_Desc;
      this.bindDataModelObj.Client_Result_Photo_FileName = this.inputelement.name;
      this.bindDataModelObj.Fold_Is_AutoAssign = this.fileMasterModelObj.Fold_Is_AutoAssign;

      this.xClientResultOldPhotoServices
        .CommonDocumentsUpdate(this.bindDataModelObj)
        .then((res) => {
          res.subscribe(response => {
            //debugger;
            if (response != null && response[0].Client_Result_Photo_ID > 0) {
              this.fileMasterModelObj.Fold_File_Pkey_Id = response[0].Client_Result_Photo_ID;
              this.xDocumentAndFormsServices.AddUpdateFileAutoAssignReference(this.fileMasterModelObj)
                .subscribe(autoResponse => {
                  if (response[0].Client_Result_Photo_ID > 0) {
                    this.MessageFlag = "File Details Save Successfully ...!";
                    this.fileSubmitted = true;
                    this.commonMessage();
                    this.folderhide = true;
                    this.foldershow = true;
                    this.GetParentModelData();
                    this.clearFile();
                  }
                });
            }
            else {
              this.MessageFlag = "Something's wrong, please try again later...!";
              this.fileSubmitted = true;
              this.commonMessage();
              this.folderhide = true;
              this.foldershow = true;
              this.GetParentModelData();
              this.clearFile();
            }
          });
        });
    }
  }


  clearForm() {
    this.folderhide = true;
    this.foldershow = true;
    this.regis = true;
    this.documentAndFormsDTO = new DocumentAndFormsDTO();
  }

  clearFile() {
    this.fileMasterModelObj = new FileMasterModel();
    this.inputelement = ''
    this.folderhide = true;
    this.foldershow = true;
    this.fileMasterModelObj.Fold_File_ParentId = 0;
    this.filechild.RemoveDocument();
  }

  //remove folder
  DeleteFolder(item) {
    let Cnfm = confirm("Are you sure you want to delete this record..?");
    if (Cnfm) {
      this.documentAndFormsDTO.Fold_Pkey_Id = item.Fold_Pkey_Id;
      this.xDocumentAndFormsServices.DeleteFolder(this.documentAndFormsDTO)
        .subscribe(res => {
          //console.log("del", res);
          this.documentAndFormsDTO.Fold_Pkey_Id = 0;
          this.GetParentModelData();
        });
    }
  }

  //remove file
  DeleteFile(item) {
    let Cnfm = confirm("Are you sure you want to delete this record..?");
    if (Cnfm) {
      this.fileMasterModelObj.Fold_File_Pkey_Id = item.Fold_File_Pkey_Id;
      this.xDocumentAndFormsServices.DeleteFile(this.fileMasterModelObj)
        .subscribe(res => {
          //console.log("del", res);
          this.documentAndFormsDTO.Fold_Pkey_Id = 0;
          this.GetParentModelData();
        });
    }
  }

  //Show Description
  ShowDescription(Desc) {
    this.Description = Desc;
    const modalRef = this.xmodalService.open(DescriptionModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title", centered: true });
    modalRef.componentInstance.Description = this.Description;
    modalRef.result.then(result => { }, reason => { });
  }

  DispalyInfo(event) {
    //debugger;
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
  TreeViewHistoryManage(data, currentSteps) {
    data.toggle = !data.toggle
    localStorage.setItem("documentTreeHistory_" + data.Fold_Pkey_Id, data.toggle);
  }
  GetTreeViewHistory(data) {
    var getHistory = localStorage.getItem("documentTreeHistory_" + data.Fold_Pkey_Id);
    var status = getHistory == "true" ? true : false;
    data.toggle = status
    return status
  }


}
