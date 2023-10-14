import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChildColumns } from './constants/columns';

@Component({
  selector: 'contractor-reports-detail',
  templateUrl: './contractor-reports-detail.component.html',
})
export class ContractorReportsDetailComponent {
  @Input() detailData;
  childColumns = ChildColumns
  currencySymbol=environment.currencySymbol;
  constructor() { }

  public ngOnInit(): void {

    //   //dfebugger
    //   let id= this.detailData['Inv_Con_pkeyId']
    // console.log('id',id);

  }
}
