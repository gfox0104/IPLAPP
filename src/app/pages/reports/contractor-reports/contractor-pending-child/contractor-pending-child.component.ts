import { Component, Input } from '@angular/core';
import { ChildColumns } from '../constants/columns';

@Component({
  selector: 'contractor-pending-child',
  templateUrl: './contractor-pending-child.component.html',
})
export class ContractorReportsPendingDetailComponent {
  @Input() pendingdetailData;
  childColumns = ChildColumns
  constructor() { }

  public ngOnInit(): void {
    
   
     
  }
}
