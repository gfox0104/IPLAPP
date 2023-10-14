import { Component, OnInit } from '@angular/core';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ClientResultPITModel } from './client-result-property-info-test-model';
import { ClientResultPITServices } from './client-result-property-info-test.service';
import { IplAppModalContent } from 'src/app/components';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-result-property-info-test',
  templateUrl: './client-result-property-info-test.component.html',
  styleUrls: ['./client-result-property-info-test.component.scss']
})
export class ClientResultPropertyInfoTestComponent implements OnInit {
  isCRPITLoading = false;
  crpitButton = "Save";
  ClientResultPITModel: ClientResultPITModel = new ClientResultPITModel()
  
  MessageFlag: string;
  isPLSLoading = false;
  workOrderID = 0;

  constructor(private xClientResultPITServices:ClientResultPITServices,private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,private xmodalService: NgbModal,) { }
  

  ngOnInit(): void {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workorder = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    this.workOrderID = parseInt(workorder);
    this.GetCRPITetail(); 
  }
  



  SaveCRPITForm() {
    debugger
    this.isCRPITLoading = true;
    this.crpitButton = "Processing";
     if(this.ClientResultPITModel.CRPIM_PkeyID ==0)
     {
      this.ClientResultPITModel.Type = 1;
     }
     else
     {
      this.ClientResultPITModel.Type = 2;
     }
    this.ClientResultPITModel.CRPIM_WO_ID = this.workOrderID;
    this.ClientResultPITModel.CRPIM_IsActive = true; 
    
    this.xClientResultPITServices
      .PostClientResultPropertyInfoMasterTest(this.ClientResultPITModel)
      .subscribe(response => {
        this.isCRPITLoading = false;
        this.crpitButton = "Save";
        if (response.length > 0) {   
          console.log('fh',this.ClientResultPITModel.CRPIM_PkeyID)
          this.MessageFlag = this.ClientResultPITModel.CRPIM_PkeyID == 0 ? "Client Result Property Info Test Saved...!" : "Client Result Property Info Test Saved Updated...!";
          console.log('message',this.MessageFlag)
           this.commonMessage();
          this.GetCRPITetail(); 
        }
      });
  }


  GetCRPITetail() { 
    debugger
    this.ClientResultPITModel.CRPIM_WO_ID = this.workOrderID;
    this.ClientResultPITModel.Type = 3;
    this.xClientResultPITServices
      .GetClientResultPropertyInfoMasterTest(this.ClientResultPITModel)
      .subscribe(response => {   
        // console.log("respon34",response)
        if (response.length != 0)
        {
        if (response[0].length != 0) {  
          this.ClientResultPITModel.CRPIM_PkeyID = response[0][0].CRPIM_PkeyID; 
          this.ClientResultPITModel.CRPIM_Lock_Box_Code = response[0][0].CRPIM_Lock_Box_Code; 
          this.ClientResultPITModel.CRPIM_LotSize = response[0][0].CRPIM_LotSize; 
          this.ClientResultPITModel.CRPIM_GPS_Latitude = response[0][0].CRPIM_GPS_Latitude; 
          this.ClientResultPITModel.CRPIM_GPS_Longitude = response[0][0].CRPIM_GPS_Longitude;  
        }  
        if(response[0][0].CRPIM_PkeyID > 0) 
          this.crpitButton = "Update" 
        else
          this.crpitButton = "Save" 
      }
      });
    
  }

  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
     
     });
  }

}
