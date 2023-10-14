import { Component, Input, OnInit } from '@angular/core';
import { NFR_Dump_Receipt_Form_Master, NF_NFR_Dump_Receipt } from './nfr-dump-receipt-form.model';
import { NRFDumpReceiptFormService } from './nfr-dump-receipt-form.service';

@Component({
  selector: 'app-nfr-dump-receipt-form',
  templateUrl: './nfr-dump-receipt-form.component.html',
  styleUrls: ['./nfr-dump-receipt-form.component.scss']
})
export class NfrDumpReceiptFormComponent implements OnInit {


  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:NFR_Dump_Receipt_Form_Master[];
  PCR_History:NFR_Dump_Receipt_Form_Master=new NFR_Dump_Receipt_Form_Master();
  nfr_Dump_Receipt_Form_Master:NFR_Dump_Receipt_Form_Master=new NFR_Dump_Receipt_Form_Master();
  nf_nfr_dump_receipt:NF_NFR_Dump_Receipt=new NF_NFR_Dump_Receipt();

  isLoading: boolean;
  button: string = 'Save';
  constructor(private _nfrDumpFormService:NRFDumpReceiptFormService) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.Get_NFR_Dump_ReceiptFormMaster();
    }
  }


  jsonModelObjStringify() {
    this.nfr_Dump_Receipt_Form_Master.NF_NFR_Dump_Receipt =JSON.stringify(this.nf_nfr_dump_receipt);
  }

  SaveForm(){
     debugger
    this.jsonModelObjStringify();
    this.Post_NFR_Dump_ReceiptFormMaster();
  }
  Post_NFR_Dump_ReceiptFormMaster() {
     debugger
    if (this.nfr_Dump_Receipt_Form_Master.NF_PkeyID > 0) {
      this.nfr_Dump_Receipt_Form_Master.Type = 2;
    } else {
      this.nfr_Dump_Receipt_Form_Master.Type = 1;
    }
    this.nfr_Dump_Receipt_Form_Master.NF_IsActive = true;
    this.nfr_Dump_Receipt_Form_Master.NF_IsDelete = false;
    this.nfr_Dump_Receipt_Form_Master.fwo_pkyeId = this.FWO_PkyeId;
    this._nfrDumpFormService
      .PostNRFDumpReceiptFormMaster(this.nfr_Dump_Receipt_Form_Master)
      .subscribe((res) => {
        if (res[0]!=undefined && res[0]!=null) {

          var NF_PkeyID = res[0].PCR_PkeyID
          this.nfr_Dump_Receipt_Form_Master.NF_PkeyID= parseInt(NF_PkeyID)
          // this.nfr_Dump_Receipt_Form_Master.NF_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  Get_NFR_Dump_ReceiptFormMaster() {
    this.nfr_Dump_Receipt_Form_Master.NF_PkeyID = 0;
    this.nfr_Dump_Receipt_Form_Master.NF_NFR_WO_ID = this.WorkorderId;
    this.nfr_Dump_Receipt_Form_Master.Type = 3;
    this._nfrDumpFormService
      .GetNRFDumpReceiptFormMaster(this.nfr_Dump_Receipt_Form_Master)
      .subscribe((res) => {
        if (res[0].length > 0) {
          this.nfr_Dump_Receipt_Form_Master.NF_PkeyID=res[0][0].NF_PkeyID;
          this.nfr_Dump_Receipt_Form_Master.NF_NFR_WO_ID=res[0][0].NF_NFR_WO_ID;

          this.nfr_Dump_Receipt_Form_Master.NF_NFR_Dump_Receipt =JSON.parse(res[0][0].NF_NFR_Dump_Receipt);
          this.nf_nfr_dump_receipt =this.nfr_Dump_Receipt_Form_Master.NF_NFR_Dump_Receipt;
        }
        if (res[1].length > 0) {
             
          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new NFR_Dump_Receipt_Form_Master();
            convertedData.NF_NFR_Dump_Receipt=JSON.parse(element.NF_NFR_Dump_Receipt);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;


          // this.PCR_History.NF_NFR_Dump_Receipt =JSON.parse(res[1][0].NF_NFR_Dump_Receipt);
        }
      });
  }
}
