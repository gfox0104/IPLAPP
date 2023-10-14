import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { exportPDF, pdf } from '@progress/kendo-drawing';
import { ClientResultInstructionModel, InstructionMasterTaskModel } from '../client-result-instruction/client-result-instruction-model';
import { ClientResultInstructionServices } from '../client-result-instruction/client-result-instruction.service';
import { BindDataModel, TaskBidMasterModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { ClientInfo } from '../common-client-header/constants/header';
import { saveAs } from '@progress/kendo-file-saver';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ActivatedRoute } from '@angular/router';
import  _ from 'underscore';

@Component({
  selector: 'app-client-result-instruction-print',
  templateUrl: './client-result-instruction-print.component.html',
  styleUrls: ['./client-result-instruction-print.component.scss']
})
export class ClientResultInstructionPrintComponent implements OnInit {

  @ViewChild('pdf') pdf: any;
  
  InstDataArray = [];
  InstrDrpList = [];
  WorkOrderID: Number = 0;
  pdfname = "";
  WoDataModelObj: BindDataModel = new BindDataModel();
  ModelObj: any;
  InstructionMasterTaskModelObj: InstructionMasterTaskModel = new InstructionMasterTaskModel();
  ClientResultInstructionModelObj: ClientResultInstructionModel = new ClientResultInstructionModel();
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  
  constructor(
    private xClientResultInstructionServices: ClientResultInstructionServices,
    private xClientResultServices: ClientResultServices,
    private EncrDecr: EncrDecrService,
    private xRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.WorkOrderID = parseInt(workOrderID);
    var woIds = JSON.parse(localStorage.getItem("woArray"));
    this.GetInstructionDropdown();

    // woIds.forEach(element => {
    //   this.WorkOrderID = element.WorkOrderID;
      
    // });
  }

  getModelData() {
    this.TaskBidMasterModelObj.workOrder_ID = this.WorkOrderID;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.ModelObj = response[0][0];
        if (this.ModelObj == undefined) {
        } else {          
          this.WoDataModelObj.WT_WorkType = this.ModelObj.WT_WorkType;
          this.WoDataModelObj.IPLNO = this.ModelObj.IPLNO;
          this.WoDataModelObj.workOrderNumber = this.ModelObj.workOrderNumber;
          this.pdfname = this.ModelObj.workOrderNumber + "_Instruction.pdf";
          this.WoDataModelObj.fulladdress = this.ModelObj.fulladdress;
          this.WoDataModelObj.Client_Company_Name = this.ModelObj.Client_Company_Name;
          this.WoDataModelObj.dueDate = this.ModelObj.dueDate;  
        } 
      });
  }  
  // get main Instruction data
  GetInstuctionDataMain() {
    ////dfebugger;
    this.ClientResultInstructionModelObj.Instr_WO_Id = this.WorkOrderID;
    this.InstDataArray = [];
    this.xClientResultInstructionServices
      .InstructionGetMain(this.ClientResultInstructionModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          for (let i = 0; i < response[0].length; i++) {            
            if (response[0][i].Instr_ValType == 3) {
              //debugger;
              const InstArr = response[0][i];
              InstArr.Instr_Price_Text = parseFloat( InstArr.Instr_Price_Text).toFixed(2);
              InstArr.Instr_Total_Text = parseFloat( InstArr.Instr_Total_Text).toFixed(2);
              var selectedList = _.where(this.InstrDrpList, {Inst_Task_pkeyId: InstArr.Instr_Task_pkeyId});
              if (selectedList.length > 0) {
                InstArr.Instr_Task_Name = selectedList[0].Inst_Task_Name;
              }
              this.InstDataArray.push(InstArr);
            }
          }
          this.getModelData();
        }        
      });
  }  

  GetInstructionDropdown() {
    this.InstrDrpList = [];
    this.InstructionMasterTaskModelObj.WorkOrderID = this.WorkOrderID;
    this.xClientResultInstructionServices
      .InstructionTaskTypeName(this.InstructionMasterTaskModelObj)
      .subscribe(response => {
        //console.log('tasktype',response) 
        this.InstrDrpList = response[1];
        this.GetInstuctionDataMain();
      });
  }

  DownloadPDF(pdf) {
    // enable/show the loader
    pdf.export().then(group => {
      const options = <pdf.PDFOptions>{ paperSize: "A2", landscape: true };
      exportPDF(group,options).then(data => {
        //console.log("PDF ready!");
        // disable/hide the loader
        saveAs(data, "InstPDF.pdf");
      });
    });
  }
  

}
