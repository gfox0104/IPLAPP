import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HomeModel } from '../../models/home-model';
import { WorkOderViewModel } from '../work-order-view/work-order-view-model';
import { HomepageServices } from '../../home/home.service';
import { WorkOrderDrodownServices } from '../../../services/util/dropdown.service';
import * as XLSX from 'xlsx';
import { ImportQueueServices } from './import-queue-order.service';
type AOA = any[][];
import * as pdfjsLib from 'pdfjs-dist';
import * as worksrc from 'pdfjs-dist/build/pdf.worker.js'
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IplAppModalContent } from "src/app/components";
import { DropdownModel } from "../../models/dropdown-model";

@Component({
  templateUrl: "./import-queue-order.component.html"
})

export class ImportQueueComponent implements OnInit {

  homeModel: HomeModel = new HomeModel();
  workOrderViewModel: WorkOderViewModel = new WorkOderViewModel();
  formUsrLoginGroup: UntypedFormGroup; // create obj
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  Test: string;
  button = 'Get Order'; // buttom loading..
  isLoading = false; // buttom loading..
  public griddata: any[];
  public GridShow = false;
  public LoginDiv = true;
  data: AOA = [[1, 2], [3, 4]];
  CompanyList: any;
  MessageFlag: string;
  inputelement: any;
  isFileSelected = false;
  isFileTypeSelected = false;
  isClientSelected = false;
  ClientId: Number = 0;
  isHelpActive = false;
  public defaultComItem: { Client_Company_Name: string, Client_pkeyID: number} = { Client_Company_Name: 'Select', Client_pkeyID: 0};
  fileTypeList = [
    {
      ext: '.xlsx',
      type: 'Excel'
    },
    {
      ext: '.pdf',
      type: 'PDF'
    }
  ];
  public drpComList: Array<string>;
  fileFormat;

  constructor(
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xHomeServices: HomepageServices,
    private formBuilder: UntypedFormBuilder,
    private xRoute: Router,
    private pdfReader: ImportQueueServices,
    private xmodalService: NgbModal,

  ) {
    var chk = localStorage.getItem('tempadmin');
    if (chk !== 'QWERTYUIOP') {
      this.xRoute.navigate(["/admin/login"]);
    }
  }

  async ngOnInit() {

    // this.pdfReader.AddBidCodes()
    // .subscribe(response =>{
    // })
    localStorage.removeItem("ExcelData");
    localStorage.removeItem("ExcelClientId");
    this.GetDropDowndata();
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  }

  GetDropDowndata() {
    this._drpdownmodelObj.Type=1;      //change by sandip
    this.xWorkOrderDrodownServices     //change by sandip
      .DropdownGetWorkOrder(this._drpdownmodelObj)
      .subscribe(response => {
        // console.log(response)
        if (response.length != 0) {
          this.CompanyList = response[0];
          this.drpComList = response[0];
        }
      });
  }

  onFileChange(evt: any) {
    //debugger;
    this.inputelement = evt.target.files[0]
    /* wire up file reader */
    if (this.fileFormat === '.xlsx') {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        const newData = XLSX.utils.sheet_to_json(ws);
        localStorage.setItem("ExcelData", JSON.stringify(newData));
        
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  onFileChangee(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
    }
    reader.readAsBinaryString(file);
  }

  ExcelDataFile() {
    //debugger;
    this.isFileTypeSelected = false;
    this.isFileTypeSelected = false;
    this.isClientSelected = false;
    let errCnt = 0;
    if (this.ClientId == 0 || this.ClientId == undefined)
    {
      errCnt = errCnt + 1;
      this.isClientSelected = true;
    }
    if (this.fileFormat == '' || this.fileFormat == undefined)
    {
      errCnt = errCnt + 1;
      this.isFileTypeSelected = true;
    }
    if (this.inputelement == '' || this.inputelement == undefined)
    {
      errCnt = errCnt + 1;
      this.isFileSelected = true;
    }
    else {
      const getnamefile = this.inputelement.name;
      let extsn = getnamefile.split(".").pop();
      extsn = "." + extsn;

      if (extsn != this.fileFormat ) {
        errCnt = errCnt + 1;
        this.MessageFlag = this.fileFormat === '.xlsx' ? "please select excel file ...!" : "please select pdf file ...!" ;
        this.commonMessage();
      }
    }
    if(errCnt > 0)
    {
      
    }
    else{
      this.isFileTypeSelected = false;
      this.isFileTypeSelected = false;
      this.isClientSelected = false;
      localStorage.setItem("ExcelClientId", this.ClientId.toString());
      this.xRoute.navigate(["workorder/importqueue/exceldata"]);
    }
    
  }

  onPdfFileChange(documentInput) {
    let reader = new FileReader();
    reader.readAsDataURL(documentInput.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      let loadingTask = pdfjsLib.getDocument(event.target.result);
      loadingTask.promise.then((pdf) => {
        this.parsePdf(pdf);
      });
    }
  }

  onSelectChange(event) {
    this.fileFormat = this.fileTypeList.find(item => item.type === event.target.value).ext;
  }

  async parsePdf(pdf) {
    const countPromises = []; // collecting all page promises
    for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      countPromises.push(textContent.items.map((s) => s.str).join(''));
    }

    const pageContents = await Promise.all(countPromises);

    return pageContents.join('');
  }
  companyFilter(value) {
    var filteredcom = this.CompanyList.filter(function (el) {
      return el.Client_Company_Name != null;
    });
    if (value!='') {      
      this.drpComList = filteredcom.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpComList = this.CompanyList.slice();
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
