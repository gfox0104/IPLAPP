import { Component, Input, Output, EventEmitter,  } from '@angular/core';



@Component({
  selector: 'iplapp-Work-bulk-checkbox',
  template: `
              <div class="module-box box p-1" style="box-shadow:0 0 4px gray !important">

              
              <!-- <div class="header" *ngFor="let abc of arr;">
              <h5 class="p-1 mb-0" *ngIf="abc.id === 2"> {{abc.name}}</h5>
              </div> -->


              <!-- <div *ngFor="let item of arr">
  <p *ngIf="item.id === 1|| item.name=='admin'">Admin</p>
  <p *ngIf="item.id === 2">Contractor</p>
  <p *ngIf="item.id === 3">Processor</p>
  <p *ngIf="item.id === 4">Client</p>
  <p *ngIf="item.id === 5">Coordinator</p>
</div> -->
              <div class="row">
                <div class="col-lg-3 col-2">
                  <input type="checkbox" class="select-all" (change)="selectall(props)" [(ngModel)]="props.checked"
                    [ngModelOptions]="{standalone: true}" [disabled]="disable" 
                    (click)="DispalyInfo($event,'Select All') ">
                </div>
                <div class="col-lg-9 col-10">
                  <span  (click)="DispalyInfo($event,'Select All')">Select All</span>
                </div>
              </div>
              <hr>
              <div class="row" *ngFor="let itemc of props; index as inx">

              <div class="col-lg-3 col-2">
                  <input type="checkbox" [(ngModel)]="itemc.ACG_PKeyID_sel"
                    [ngModelOptions]="{standalone: true}" [disabled]="disable"
                    (change)="menuSelection()" 
                    (click)="DispalyInfo($event,itemc)">
                </div>
                <div class="col-lg-9 col-10">
                  <label  (click)="DispalyInfo($event,itemc)">{{itemc.Wo_Column_Name}}</label>
                </div>
              </div>
              </div>
`,
  styles: [
            `
              .header {
                margin-top:-3%;
                margin-bottom:3%;
                color: black;
                background-color: #d6d6d6;
                text-align: center;
                border-radius:10px;
              }
              /* .box {
                height:31vh;
                max-height:31vh;
                overflow-y:auto;
                overflow-x:hidden !important;
              } */
              .select-all {
                top: 0.15625rem;
                display: block;
                width: 1rem;
                height: 1rem;
                background: no-repeat 50%/50% 50%;
                color: #6658dd;
                border-color: #6658dd;
                background-color: #6658dd;
              }
              hr {
                color: black;
              }
            `
          ]

})


export class IplAppWorkBulkCheckbox {
  @Input() props;
  @Input() disable;
  @Output() selectbox = new EventEmitter();
  @Output() Selectclick = new EventEmitter();

  

 

   

  selectall(props) {
    debugger
    props.forEach(item => item.ACG_PKeyID_sel = props.checked);
    this.selectbox.emit(props);
    // console.log('data2',props)


  }

  menuSelection() {
    this.selectbox.emit(this.props);
  }
  DispalyInfo(event ,item) {
    this.Selectclick.emit({event, item});
  }
}
