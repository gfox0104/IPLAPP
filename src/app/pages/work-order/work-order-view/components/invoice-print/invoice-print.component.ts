import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-print',
  template: `
              <div class="row" style="height: 100%;">
              <div [id]='id' style="height: 100%;">
                
              </div>
            </div>
            `
})

export class InvoicePrintComponent implements OnInit {
  @Input() id: string;
  @Input() isContractor: boolean;
  @Input() printDivF: boolean;
  
  @Input() invoice_OBJ: any;

  // keys;
  ngOnInit() {
   
  }

}
