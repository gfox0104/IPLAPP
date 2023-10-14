import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { RepairBaseAddRoomService } from './repair-base-add-room.service';
import { RepairBaseAddRoomModel, RepairBaseAddRepairModel, RepairBaseCharactoristicsModel, RepairBaseAddImgModel } from './repair-base-add-room.model';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppDocumentUpload } from 'src/app/components/iplapp-upload-document/iplapp-upload-document.component';
import { RepairBaseHomeService } from '../repair-base-home.service';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-repair-base-add-room',
  templateUrl: './repair-base-add-room.component.html',
  styleUrls: ['./repair-base-add-room.component.scss']
})
export class RepairBaseAddRoomComponent implements OnInit {

  formUsrCommonGroup: UntypedFormGroup;
  addRepairForm: UntypedFormGroup;
  RepairBaseAddRoomModelObj: RepairBaseAddRoomModel = new RepairBaseAddRoomModel();
  RepairBaseAddRepairModelObj: RepairBaseAddRepairModel = new RepairBaseAddRepairModel();
  RepairBaseCharactoristicsModelObj: RepairBaseCharactoristicsModel = new RepairBaseCharactoristicsModel();
  RepairBaseAddImgModelObj: RepairBaseAddImgModel = new RepairBaseAddImgModel();
  order: any;
  personalInfo: any;
  personalInfoAddress: any;
  personalInfoCity: any;
  personalInfoZip: any;
  characteristics: any;
  areaType: any;
  areas: any = [];
  areaID: any = [];
  modalOpened = false;
  repairModalOpened = false;
  isSelect = true;
  isCustom = false;
  showProfitModal = false;
  MessageFlag: string;
  phbutton = "Save and close";
  isLoading = false;
  imgbutton = "Upload";
  isImgLoading = false;
  apiGetPropertyUrl = '';
  rep_UM_TestApiUrl = '';
  rep_UM_Apikey = '';
  authHeader = '';

  public defaultCategories: Array<{ categoryId: number, name: string }> = [];
  public categories: Array<{ categoryId: number, name: string }>;

  public defaultSubCategories: Array<{ subcategoryId: number, name: string }> = [];
  public subCategories: Array<{ subcategoryId: number, name: string }>;

  public defaultPerformActions: Array<{ id: number, actionType: string }> = [];
  public performActions: Array<{ id: number, actionType: string }>;

  public defaultActionDetail: Array<{ itemXRef: number, propertyItemName: string }> = [];
  public actionDetail: Array<{ itemXRef: number, propertyItemName: string }>;

  public defaultAreaDetail: Array<{ id: number, description: string }> = [];
  public areaDetail: Array<{ id: number, description: string }>;

  public autoPrint = true;

  constructor(
    private xRepairBaseAddRoomService: RepairBaseAddRoomService,
    private xActivatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private xRouter: Router,
    private spinner: NgxSpinnerService,
    private xmodalService: NgbModal,
    private xRepairBaseHomeService : RepairBaseHomeService
  ) { }

  ngOnInit(): void {
    
    this.xActivatedRoute.params.subscribe(params => {
      this.RepairBaseAddRoomModelObj.RB_OrderID = params.id;
      this.RepairBaseAddRepairModelObj.RB_OrderID = params.id;
    });
    this.spinner.show();    

    this.formUsrCommonGroup = this.formBuilder.group({
      RB_AreaLabel: ["", Validators.required],
      RB_AreaNote: ["", Validators.required],
      RB_description: ["", Validators.required],
      RB_vendorPPU: ["", Validators.required],
      RB_quantity: ["", Validators.required],
      RB_comments: ["", Validators.required],
      RB_code: ["", Validators.required],
      RB_Profit: ["", Validators.required],
      RB_OverHead: ["", Validators.required]
    });

    this.GetCredentialData();
  }

  GetCredentialData() {
    this.xRepairBaseHomeService
      .GetRepairBaseUserMasterDetail()
      .subscribe(response => {
        //console.log("resp User", response);
        if (response[0].length > 0) {
          this.rep_UM_TestApiUrl = response[0][0].Rep_UM_TestApiUrl;
          this.rep_UM_Apikey = response[0][0].Rep_UM_Apikey;
          this.authHeader = response[0][0].Rep_UM_ApiAuthorization;
          this.getOrder();
          this.getCharacteristics();
          this.getRoomdata();
          this.getCategory();
        }   
      });
  }

  getOrder(){
    this.xRepairBaseAddRoomService
    .getOrder(this.RepairBaseAddRoomModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.personalInfoAddress = response['address'];
      this.personalInfoCity = response['city'];
      this.personalInfoZip = response['zip'];
    })
  }

  getCharacteristics(){
    this.xRepairBaseAddRoomService
    .getCharacteristics(this.RepairBaseAddRoomModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.characteristics = response;
      this.RepairBaseCharactoristicsModelObj.RB_Bedrooms = response['bedrooms'];
      this.RepairBaseCharactoristicsModelObj.RB_Fullbaths = response['fullBaths'];
      this.RepairBaseCharactoristicsModelObj.RB_Halfbaths = response['halfBaths'];
      this.RepairBaseCharactoristicsModelObj.RB_Stories = response['stories'];
      this.RepairBaseCharactoristicsModelObj.RB_YearBuilt = response['yearBuilt'];
      this.RepairBaseCharactoristicsModelObj.RB_LivingArea = response['totalLivingArea'];
      this.RepairBaseCharactoristicsModelObj.RB_StructureQuality = response['structureQuality'];
      this.RepairBaseCharactoristicsModelObj.RB_Condition = response['condition'];
      this.RepairBaseCharactoristicsModelObj.RB_Site = response['siteLotSizeInSqFt'];
      this.RepairBaseCharactoristicsModelObj.RB_AttachedGarage = response['attachedGaragesNumberOfCars'];
      this.RepairBaseCharactoristicsModelObj.RB_BuiltInGarage = response['builtInGaragesNumberOfCars'];
      this.RepairBaseCharactoristicsModelObj.RB_RoofPitch = response['roofPitch'];
      this.RepairBaseCharactoristicsModelObj.RB_BasementSize = response['basementSizeSF'];
      this.spinner.hide();
    })
  }
  getRoomdata(){
    this.xRepairBaseAddRoomService
    .getRoomData(this.RepairBaseAddRoomModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.areas = response['areas'];
      this.areas.forEach(area => {
        this.xRepairBaseAddRoomService
        .getRepairData(this.RepairBaseAddRoomModelObj.RB_OrderID, area.areaId,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
        .subscribe(response => {
          area['repairs'] = response['repairs'];
        })
      });
    })
  }
  getAreaTypesCatalog(){
    this.xRepairBaseAddRoomService
    .getAreaTypesCatalog(this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe( response => {
      this.areaType = response;
      this.areaType.forEach(element => {
        this.defaultAreaDetail.push(element);
      });
      
      this.areaDetail = this.defaultAreaDetail.slice();
    })
  }

  handleAreaFilter(value) {
    this.areaDetail = this.defaultAreaDetail.filter((s) => s.description.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  selectAreaHandler(event){
    this.areaID = event.id;
  }

  addModalClose(status) {
    this.modalOpened = false;
    this.isSelect = true;
  }

  addModalopen() {
    this.getAreaTypesCatalog();
    this.modalOpened = true;
  }

  addRepairModalClose(status) {
    this.repairModalOpened = false;
  }

  addRepairModalopen(areaID) {
    this.RepairBaseAddRepairModelObj.RB_areaId = areaID;
    this.repairModalOpened = true;
  }

  addAreaID(id){
    this.areaID = id;
  }

  selectArea(){
    this.isSelect = false;
    this.RepairBaseAddRoomModelObj.RB_AreaType = this.areaID;
  }

  createArea(){
    this.xRepairBaseAddRoomService
    .createArea(this.RepairBaseAddRoomModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.getOrder();
      this.modalOpened = false;
      this.getRoomdata();
    })
  }

  backToSelectArea(){
    this.isSelect = true;
  }

  getCategory(){
    this.xRepairBaseAddRoomService
    .getCategory(this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.RepairBaseAddRepairModelObj.RB_categoryId = response['categories'][0].categoryId;
      response['categories'].forEach(element => {
        this.defaultCategories.push(element);
      });
      this.categories = this.defaultCategories.slice();
      this.subCategory();
    })
  }

  handleFilter(value) {
    this.categories = this.defaultCategories.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  selectChangeHandler(event){
    this.RepairBaseAddRepairModelObj.RB_categoryId = event.categoryId;
    this.subCategory();
  }

  subCategory(){
    this.defaultSubCategories = [];
    this.xRepairBaseAddRoomService
    .getSubCategory(this.RepairBaseAddRepairModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.RepairBaseAddRepairModelObj.RB_subCategoryId = response['subcategories'][0].subcategoryId;
      response['subcategories'].forEach(element => {
        this.defaultSubCategories.push(element);
      });
      this.subCategories = this.defaultSubCategories.slice();
      this.performAction();
    })
  }

  subcategoryhandleFilter(value) {
    this.subCategories = this.defaultSubCategories.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  selectSubcategoryChangeHandler(event){
    this.RepairBaseAddRepairModelObj.RB_subCategoryId = event.subcategoryId;
    this.performAction();
  }

  performAction(){
    this.defaultPerformActions = [];
    this.xRepairBaseAddRoomService
    .getPerformAction(this.RepairBaseAddRepairModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.RepairBaseAddRepairModelObj.RB_performActionId = response['actionTypes'][0].id
      response['actionTypes'].forEach(element => {
        this.defaultPerformActions.push(element);
      });
      this.performActions = this.defaultPerformActions.slice();
      this.selectActionDetail();
    })
  }

  performActionhandleFilter(value) {
    this.performActions = this.defaultPerformActions.filter((s) => s.actionType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  selectPerformActionChangeHandler(event){
    this.RepairBaseAddRepairModelObj.RB_performActionId = event.id;
    this.selectActionDetail();
  }

  selectActionDetail(){
    this.defaultActionDetail= [];
    this.xRepairBaseAddRoomService
    .getActionDetail(this.RepairBaseAddRepairModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.RepairBaseAddRepairModelObj.RB_itemXRef = response['repairItems'][0].id;
      this.RepairBaseAddRepairModelObj.RB_description = response['repairItems'][0].description;
      response['repairItems'].forEach(element => {
        this.defaultActionDetail.push(element);
      });
      this.actionDetail = this.defaultActionDetail.slice();
    })
  }

  actionDetailHandleFilter(value) {
    this.actionDetail = this.defaultActionDetail.filter((s) => s.propertyItemName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  actionDetailChangeHandler(event){
    this.RepairBaseAddRepairModelObj.RB_itemXRef = event.itemXRef;
    this.RepairBaseAddRepairModelObj.RB_description = event.propertyItemName;
  }

  continueForCustom(){
    this.isCustom = true;
  }

  addRepair(){
    this.xRepairBaseAddRoomService
    .addRepair(this.RepairBaseAddRepairModelObj,this.rep_UM_TestApiUrl,this.authHeader)
    .subscribe(response => {
      this.getRoomdata();
      this.repairModalOpened = false;
      this.isCustom = false;
    })
  }

  deleteArea(areaId){
    
  }
  deleteRepair(deletePath){
    this.xRepairBaseAddRoomService
    .deleteAction(deletePath,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      this.getRoomdata();
    })
  }
  editCharacteristics(){
    this.xRouter.navigate(['repairBase/repairMain/repairHome/property', this.RepairBaseAddRepairModelObj.RB_OrderID]);
  }
  generatePdf(){
    this.xRepairBaseAddRoomService
    .generatePdf(this.RepairBaseAddRoomModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      //console.log('generate PDF', response);
    })
  }

  generateXml(){
    this.xRepairBaseAddRoomService
    .generateXml(this.RepairBaseAddRoomModelObj,this.rep_UM_TestApiUrl,this.rep_UM_Apikey,this.authHeader)
    .subscribe(response => {
      FileSaver.saveAs(response, `estimate.pdf`)
    })
  }
  previewEstimate(){
    this.xRouter.navigate(['repairBase/repairMain/repairHome/preview', this.RepairBaseAddRepairModelObj.RB_OrderID]);
  }
  
  addProfitOverhead(){
    this.showProfitModal = true;
  }

  closeProfitOverhead(){
    this.showProfitModal = false;
  }

  saveProiftOverhead(){
    this.isLoading = true;
    this.phbutton = "Processing";
   
    this.xRepairBaseAddRoomService
    .AddProfitOverhead(this.RepairBaseAddRoomModelObj)
    .subscribe(response => { 
      this.isLoading = false;
      this.phbutton = "Save and close";
      if (response[1] == "1") {
        this.showProfitModal = false;
        this.MessageFlag = "Profit and Overhead saved.";
        this.commonMessage();
      }      
    })
  }
  OpenModal(repairId,areaId,content) {
    this.RepairBaseAddImgModelObj.Rep_Base_RepairAreaId  = areaId;
    this.RepairBaseAddImgModelObj.Rep_Base_RepairId  = repairId;
    this.xmodalService
      .open(content, { windowClass: "smModal" })
      .result.then(result => { }, reason => { });
  } 

  processImage(imageInput: any) {
    if (imageInput.files.length == 1) {
      this.isImgLoading = true;
      this.imgbutton = "Processing";
      const getnamefile = imageInput.files[0].name;
      const extsn = getnamefile.split(".").pop();
      this.RepairBaseAddImgModelObj.Rep_Base_OrderId = this.RepairBaseAddRepairModelObj.RB_OrderID;
      this.RepairBaseAddImgModelObj.Rep_Base_RepairAreaId = this.RepairBaseAddImgModelObj.Rep_Base_RepairAreaId;
      this.RepairBaseAddImgModelObj.Rep_Base_RepairId = this.RepairBaseAddImgModelObj.Rep_Base_RepairId;
      this.RepairBaseAddImgModelObj.documentx = imageInput.files[0];
      this.RepairBaseAddImgModelObj.Rep_Base_Doc_File_Name = imageInput.files[0].name;
      this.RepairBaseAddImgModelObj.Rep_Base_Doc_File_Size = imageInput.files[0].size;
      this.xRepairBaseAddRoomService
        .POSTPhotosUpdate(this.RepairBaseAddImgModelObj)
        .then((res) => {
          res.subscribe(response => {
            this.xmodalService.dismissAll();
            this.isImgLoading = false;
            this.imgbutton = "Upload";
            this.MessageFlag = "Image uploaded.";
            this.commonMessage();
          });
        })
    }
    else {
      this.MessageFlag = "Please select image";
      this.commonMessage();
    }
  } 

  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

}
