import { Component, Input, OnInit } from '@angular/core';
import { CommonStatusDTO } from '../../../client-result/common-client-header/common-status-model'
import { ClientResultsInvoiceServices } from '../../../client-result/client-results-invoice/client-results-invoice.service';
@Component({
  selector: 'drop-down',
  template: `<select 
              class="form-control form-control-sm">
              <option value='0'>select</option>
              <option [ngValue]="item[value]" *ngFor="let item of optionList">
                {{item[key]}}
              </option>
            </select>`
})

export class DropDownComponent implements OnInit {
  @Input() model;
  @Input() value;
  @Input() modelOptions;
  @Input() key;

  optionList;
  CommonStatusDTOObj: CommonStatusDTO = new CommonStatusDTO();

  constructor(
    private xClientResultsInvoiceServices: ClientResultsInvoiceServices,
  ) {}

  ngOnInit() {
    this.getStatusDropDown();
  }

  getStatusDropDown() {
    this.CommonStatusDTOObj.Status_ID = 0;
    this.CommonStatusDTOObj.Type = 1;
    this.xClientResultsInvoiceServices
    .DropdownGetStatus(this.CommonStatusDTOObj)
    .subscribe(response => {
      this.optionList = response[0];
    });
  }
}
