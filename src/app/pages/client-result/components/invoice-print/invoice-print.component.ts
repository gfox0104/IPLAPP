import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-print',
  template: ` 
  <style>
  
  .style2 {font-family: Verdana, Arial, Helvetica, sans-serif}
  .style3 {font-size: 10px}
  .style4 {font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px; }
  .style6 {font-size: 10px; font-weight: bold; }
  .style7 {font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px; font-weight: bold; }
  .style8 {font-size: 16px}
 
  </style>
              <div class="row">
              <div [id]='id'>
                <div class="modal-body">
                  <ng-template #clientPrintcon>
                  </ng-template>
                  <div [id]='id' [hidden]="printDivF">
                  
                    <div class="modal-body">
                      <!--start-->
                      <div>
                      <table border="1" style="width: 800;">
                  <caption><h2 class = "style8">INVOICE</h2></caption>
                      <tr>
                         <td class="style2" style="width: 50%;">
                            WILL Enterprises, LLC <br>
                            805 NE Panther Valley Street <br>
                            LEES SUMMIT, MO 64064<br>
                            (816) 365-7834<br><br>
                         </td>
                         <td style="text-align: center;" style="width: 50%;">
                            <table style="width: 400;">
                               <tr>
                                  <td bgcolor="#c8c8c8" class="style7">Invoice Date</td>
                                  <td bgcolor="#c8c8c8" class="style7"> Invoice Number #</td>
                               </tr>
                               <tr>
                   
                                  <td class="style4">{{invoice_DTOObj[keys.invDate] | date:'shortDate'}}</td>
                                  <td class="style4">{{invoice_DTOObj[keys.invNumber]}}</td>
                               </tr>
                            </table>
                         </td>
                      </tr>
                      <tr>
                         <td class="style2"style="width: 50%;">
                            Bill To:<br>
                            {{BindDataModelObj[keys.billName]}}<br>
                                  {{BindDataModelObj[keys.billAddress]}}
                         </td>
                         <td style="width: 50%;">
                            <table style="width: 400;">
                               <tr>
                                  <td bgcolor="#c8c8c8" style="text-align: center;"class="style2"> Work Order Info</td>
                               </tr>
                               <td class="style4">
                                   <strong>WO #:</strong> {{BindDataModelObj.workOrderNumber}}<br>
                                           <strong>Loan #: </strong> {{BindDataModelObj.Loan_Number}}<br>
                                          {{BindDataModelObj.address1}}<br>
                                          {{BindDataModelObj.city}},  {{BindDataModelObj.SM_Name}} {{BindDataModelObj.zip}}<br>
                                           <strong>Complete Date: </strong> {{BindDataModelObj.Complete_Date}}<br>
                               </td>
                            </table>
                          
                         </td>
                      </tr>
                      <tr>
                   <td colspan="2">
                      <table  style="width: 100%;height:100%">
                         <th style="background-color: #bcbccc;"class="style2">Description </th>
                         <th style="text-align:right; background-color: #bcbccc;"class="style2">Qty </th>
                         <th style="text-align:right; background-color: #bcbccc;"class="style2">Price</th>
                         <th style="text-align:right; background-color: #bcbccc;"class="style2">Disc</th>
                         <th style="text-align:right; background-color: #bcbccc;"class="style2">Total
                         </th>
                         <tr *ngFor="let item of printArray">
                           <td style="border:none;"class="style4"> {{item[keys.comment]}} </td>
                           <td style="text-align:right;border:none; "class="style4"> {{item[keys.qty]}}</td>
                           <td style="text-align:right;border:none;"class="style4"><span>$</span>{{item[keys.price]}} </td>
                           <td style="text-align:right;border:none;"class="style4">{{item[keys.discount]}} %</td>
                           <td style="text-align:right;border:none;"class="style4"><span>$</span>{{item[keys.total]}}</td>
                         </tr>
                         <tr>
                           <td colspan="4" style="text-align:right;background-color: #bcbccc;"class="style2"><b>Total</b></td>
                           <td style="text-align:right; background-color: #bcbccc;"class="style4"><span>$</span>{{invoice_DTOObj[keys.subTotal]}}</td>
                         </tr>
                       </table>
                   </td>
                      </tr>
                   
                   </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            `
})

export class InvoicePrintComponent implements OnInit {
  @Input() id: string;
  @Input() isContractor: boolean;
  @Input() printDivF: boolean;
  @Input() invoice_DTOObj: any;
  @Input() BindDataModelObj: any;
  @Input() printArray;
 
  keys;
  ngOnInit() {
    this.keys = !this.isContractor ? 
    {
      invDate: 'Inv_Client_Inv_Date',
      invNumber: 'Inv_Client_Invoice_Number',
      compDate: 'Inv_Client_Comp_Date',
      comment: 'Inv_Client_Ch_Comment',
      qty: 'Inv_Client_Ch_Qty',
      price: 'Inv_Client_Ch_Price',
      discount: 'Inv_Client_Ch_Discount',
      total: 'Inv_Client_Ch_Adj_Total',
      subTotal: 'Inv_Client_Sub_Total',
      billAddress:'ClientAddress',
      billName:'ClientName'
    } : 
    {
      invDate: 'Inv_Con_Inv_Date',
      invNumber: 'Inv_Con_Invoce_Num',
      compDate: 'Inv_Client_Comp_Date',
      comment: 'Inv_Con_Inv_Comment',
      qty: 'Inv_Con_Ch_Qty',
      price: 'Inv_Con_Ch_Price',
      discount: 'Inv_Con_Ch_Discount',
      total: 'Inv_Con_Ch_Adj_Total',
      subTotal: 'Inv_Con_Sub_Total',
      billAddress:'ContractorAddress',
      billName:'Cont_Name'
    }
  }
 
}
