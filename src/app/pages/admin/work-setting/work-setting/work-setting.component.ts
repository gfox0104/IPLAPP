import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { WorkSettingsPageModel } from './work-setting-model';
import { WorkSettingsPageServices } from './work-setting-serivce';

@Component({
  selector: 'app-work-setting',
  templateUrl: './work-setting.component.html',
  styleUrls: ['./work-setting.component.scss']
})
export class WorkSettingComponent implements OnInit {
  WorkSettingsPageModelObj: WorkSettingsPageModel = new WorkSettingsPageModel();
  MessageFlag: String;
  formUsrCommonGroup: UntypedFormGroup;
  submitted = false;
  isLoading = false;
  button = "Save";
  IsEditDisable = false;
   isdisable= false;

  constructor(private xWorkSettingsPageServices:WorkSettingsPageServices,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formBuilder.group({
      
      num1to30:['',[Validators.min(1),Validators.max(30)]],
      num1to31:['',[Validators.min(1),Validators.max(31)]],
      num1to100:['',[Validators.min(1),Validators.max(100)]],
      switchisActive:[],
      switchisActive1:[],
      switchisActive2:[],
      switchisActive3:[],
      userNfuuiame1:[],
      switchisActive5:[],
      userNfuuiame5:[],
      Printcompanyname:[],
      DefaultTimezone:[],
      clientname:[],
      pricingfromcomments:[],
      Highlightpricing:[],
      Loan:[],
      ClientCompany:[],
      customer:[],
      QueSettings:[],
      DocumentsExpiration:[],
      ContractorAvailability:[],
      EscalatedWork:[],
      Cancelledorder:[],
      WorkorderChanged:[],
      Allowsduplicate:[],
      recurrigwork:[],
      RecomendedContractorlist:[],
      Customerdata:[],
      LoanNumber:[],
      LockBoxCode:[],
      KeyCode:[],
      LotSize:[],
      newworkorder:[],
      assignedProcessor:[],
      settings:[],
      UreadOrders:[],
      Lateorders:[],
      Opensorders:[],
      Property_Alert_App:[],
      Occpancy_App:[],
      labeled:[],
      datestamps:[],
      Metadata:[],
      stampformat:[],
      Number_of_Photos:[],
      photolabels:[],
      completionphoto:[],
      damagephoto:[],
      Inspectionphoto:[],
      Customphoto:[],
      invoicenumber:[],
      invoiceitems:[],
      Metadatabe:[],
      taskitems:[],
      Flat_Fee:[],
      InvoiceFlat_Fee:[],
      CompanyLogo:[],
      ABCnumber:[],
      InvoiceDate:[],
      Approved_Invoice:[]
    });
   this.GetWorkSetting();
  }

 
  GetWorkSetting() {
    // debugger
    this.WorkSettingsPageModelObj.Type=3
    this.xWorkSettingsPageServices
      .GetWorkOrderSettingDataDetails(this.WorkSettingsPageModelObj)
      .subscribe(response => {
        // console.log('sun',response)
        if (response[0].length > 0 ){
          this.WorkSettingsPageModelObj.WOS_PkeyID = response[0][0].WOS_PkeyID;
          this.WorkSettingsPageModelObj.WOS_Contractor_Work_Order_Rejection = response[0][0].WOS_Contractor_Work_Order_Rejection;
          this.WorkSettingsPageModelObj.WOS_Work_Order_To_Previous_Contractor = response[0][0].WOS_Work_Order_To_Previous_Contractor;
          this.WorkSettingsPageModelObj.WOS_Contractor_Compancy_Name = response[0][0].WOS_Contractor_Compancy_Name;
          this.WorkSettingsPageModelObj.WOS_Contractor_Vendor_Id= response[0][0].WOS_Contractor_Vendor_Id;
          this.WorkSettingsPageModelObj.WOS_Contractor_list_Sorting= response[0][0].WOS_Contractor_list_Sorting;
          this.WorkSettingsPageModelObj.WOS_EST_Completion_Date = response[0][0].WOS_EST_Completion_Date;
          this.WorkSettingsPageModelObj.WOS_EST_Date_Allowed_Past = response[0][0].WOS_EST_Date_Allowed_Past;
          this.WorkSettingsPageModelObj.WOS_EST_Date_List_Shows = response[0][0].WOS_EST_Date_List_Shows;
          this.WorkSettingsPageModelObj.WOS_Browser_Tab_Name = response[0][0].WOS_Browser_Tab_Name;
          this.WorkSettingsPageModelObj.WOS_Company_Name_On_Work_Order = response[0][0].WOS_Company_Name_On_Work_Order;

          this.WorkSettingsPageModelObj.WOS_Default_Timezone = response[0][0].WOS_Default_Timezone;
          this.WorkSettingsPageModelObj.WOS_Client_Name_To_Office_Staff = response[0][0].WOS_Client_Name_To_Office_Staff;
          this.WorkSettingsPageModelObj.WOS_Remove_Pricing = response[0][0].WOS_Remove_Pricing;
          this.WorkSettingsPageModelObj.WOS_Highlight_Pricing  = response[0][0].WOS_Highlight_Pricing;
          this.WorkSettingsPageModelObj.WOS_Loan_On_Work_Orders = response[0][0].WOS_Loan_On_Work_Orders;
          this.WorkSettingsPageModelObj.WOS_Client_Company_On_Work_Orders = response[0][0].WOS_Client_Company_On_Work_Orders;
          this.WorkSettingsPageModelObj.WOS_Customer_On_Work_Orders = response[0][0].WOS_Customer_On_Work_Orders;
          this.WorkSettingsPageModelObj.WOS_Documents_Expiration = response[0][0].WOS_Documents_Expiration;
          this.WorkSettingsPageModelObj.WOS_Escalated_Work_Order = response[0][0].WOS_Escalated_Work_Order;
          this.WorkSettingsPageModelObj.WOS_Allows_Duplicate_Work_Order = response[0][0].WOS_Allows_Duplicate_Work_Order; 
          this.WorkSettingsPageModelObj.WOS_Work_Orders_To_Previous_Contractor = response[0][0].WOS_Work_Orders_To_Previous_Contractor;
          this.WorkSettingsPageModelObj.WOS_Work_Order_Assigned_Coordinator = response[0][0].WOS_Work_Order_Assigned_Coordinator;
          this.WorkSettingsPageModelObj.WOS_Work_Order_Assigned_Processor = response[0][0].WOS_Work_Order_Assigned_Processor;
          this.WorkSettingsPageModelObj.WOS_Work_Order_Email = response[0][0].WOS_Work_Order_Email;
          this.WorkSettingsPageModelObj.WOS_Contractor_Alert_for_U_read = response[0][0].WOS_Contractor_Alert_for_U_read;
          this.WorkSettingsPageModelObj.WOS_Contractor_Late_Orders = response[0][0].WOS_Contractor_Late_Orders;
          this.WorkSettingsPageModelObj.WOS_Contractor_Opens_Orders = response[0][0].WOS_Contractor_Opens_Orders;
          this.WorkSettingsPageModelObj.WOS_Photos_be_Labeled = response[0][0].WOS_Photos_be_Labeled;
          this.WorkSettingsPageModelObj.WOS_Allow_Date_Stamps = response[0][0].WOS_Allow_Date_Stamps;
          this.WorkSettingsPageModelObj.WOS_Allow_Metadata  = response[0][0].WOS_Allow_Metadata ;
          this.WorkSettingsPageModelObj.WOS_Date_Stamp_Format = response[0][0].WOS_Date_Stamp_Format;
          this.WorkSettingsPageModelObj.WOS_Minimum_Number_of_Photos = response[0][0].WOS_Minimum_Number_of_Photos;
          this.WorkSettingsPageModelObj.WOS_Bid_Photo_Labels = response[0][0].WOS_Bid_Photo_Labels;
          this.WorkSettingsPageModelObj.WOS_Completion_Photo_Lables = response[0][0].WOS_Completion_Photo_Lables;
          this.WorkSettingsPageModelObj.WOS_Damage_Photo_Lables = response[0][0].WOS_Damage_Photo_Lables;
          this.WorkSettingsPageModelObj.WOS_Inspection_Photo_Lables = response[0][0].WOS_Inspection_Photo_Lables;
          this.WorkSettingsPageModelObj.WOS_Custom_Photo_Lables = response[0][0].WOS_Custom_Photo_Lables;
          this.WorkSettingsPageModelObj.WOS_Allow_Invoice_Number = response[0][0].WOS_Allow_Invoice_Number;
          this.WorkSettingsPageModelObj.WOS_Show_Completion_Comments = response[0][0].WOS_Show_Completion_Comments;
          this.WorkSettingsPageModelObj.WOS_Allow_Metadata_To_Modified = response[0][0].WOS_Allow_Metadata_To_Modified;
          this.WorkSettingsPageModelObj.WOS_Dafault_Transfer_Completion_Task = response[0][0].WOS_Dafault_Transfer_Completion_Task;
          this.WorkSettingsPageModelObj.WOS_Contractor_Invoice_Flat_Fee = response[0][0].WOS_Contractor_Invoice_Flat_Fee;
          this.WorkSettingsPageModelObj.WOS_Client_Invoice_Flat_Fee = response[0][0].WOS_Client_Invoice_Flat_Fee;
          this.WorkSettingsPageModelObj.WOS_Print_Company_Logo_Invoice = response[0][0].WOS_Print_Company_Logo_Invoice;
          this.WorkSettingsPageModelObj.WOS_Print_ABC_Number_on_Invoice  = response[0][0].WOS_Print_ABC_Number_on_Invoice ;
          this.WorkSettingsPageModelObj.WOS_Print_Invoice_Date = response[0][0].WOS_Print_Invoice_Date;  
          this.WorkSettingsPageModelObj.WOS_Property_Alert_App = response[0][0].WOS_Property_Alert_App;     
          this.WorkSettingsPageModelObj.WOS_Occpancy_App = response[0][0].WOS_Occpancy_App; 
          this.WorkSettingsPageModelObj.WOS_Work_Order_Assigned_Coordinator = response[0][0].WOS_Work_Order_Assigned_Coordinator;
          this.WorkSettingsPageModelObj.WOS_Work_Order_Assigned_Processor = response[0][0].WOS_Work_Order_Assigned_Processor;
          this.WorkSettingsPageModelObj.WOS_Work_Order_Email = response[0][0].WOS_Work_Order_Email;
          this.WorkSettingsPageModelObj.WOS_Contractor_Alert_for_U_read = response[0][0].WOS_Contractor_Alert_for_U_read;
          this.WorkSettingsPageModelObj.WOS_Contractor_Late_Orders = response[0][0].WOS_Contractor_Late_Orders;
          this.WorkSettingsPageModelObj.WOS_Contractor_Opens_Orders = response[0][0].WOS_Contractor_Opens_Orders;
          this.WorkSettingsPageModelObj.WOS_Priorty_WorkOrder_Que = response[0][0].WOS_Priorty_WorkOrder_Que;
          this.WorkSettingsPageModelObj.WOS_Client_Cancelled_order = response[0][0].WOS_Client_Cancelled_order;
          this.WorkSettingsPageModelObj.WOS_Client_Workorder_Changed = response[0][0].WOS_Client_Workorder_Changed;
          this.WorkSettingsPageModelObj.WOS_Show_Recomended_Contractorlist = response[0][0].WOS_Show_Recomended_Contractorlist;
          this.WorkSettingsPageModelObj.WOS_Customerdata = response[0][0].WOS_Customerdata;
          this.WorkSettingsPageModelObj.WOS_Loan_Number = response[0][0].WOS_Loan_Number;
          this.WorkSettingsPageModelObj.WOS_LockBox_Code = response[0][0].WOS_LockBox_Code;
          this.WorkSettingsPageModelObj.WOS_Key_Code = response[0][0].WOS_Key_Code;
          this.WorkSettingsPageModelObj.WOS_LotSize = response[0][0].WOS_LotSize;
          this.WorkSettingsPageModelObj.WOS_Approved_Invoice = response[0][0].WOS_Approved_Invoice;
          this.WorkSettingsPageModelObj.WOS_New_Contractor_Priorty_WorkOrders = response[0][0].WOS_New_Contractor_Priorty_WorkOrders;
        }

      });
  }


  onSubmit() {
    //  debugger
      this.submitted = true;
     
      
        if (this.formUsrCommonGroup.invalid) {
        return;
      }
      
      this.isLoading = true;
      // this.button = "Processing";
      if(this.WorkSettingsPageModelObj.WOS_PkeyID>0)
      {
        this.WorkSettingsPageModelObj.Type=2;
      }
      else
      {
        this.WorkSettingsPageModelObj.Type=1;
      }
      
      this.xWorkSettingsPageServices
        .CreateUpdateWorkOrderSettingMaster(this.WorkSettingsPageModelObj)
        .subscribe(response => {
          if (response[0].Status != "0") {
            this.WorkSettingsPageModelObj.WOS_PkeyID = parseInt(response[0].WOS_PkeyID);
             this.MessageFlag = "Work order settings Saved...!";
             this.button = "Update";
             this.IsEditDisable = true;
             this.isdisable= true;
              this.formUsrCommonGroup.disable(); 
           
           
            this.isLoading = false;
          
            this.commonMessage();
          }
        });
    }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }


   // common message modal popup
   commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  EditForms() {
    this.IsEditDisable = false;
    this.isdisable= false; 
    this.formUsrCommonGroup.enable();
  }
}
