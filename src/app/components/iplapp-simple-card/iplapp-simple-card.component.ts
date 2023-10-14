import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'iplapp-simple-card',
  template: `
              <div class="module-box p-2" style="height:71.6vh;max-height:71.6vh;overflow-y:auto">
                <div class="form-row mb-3">
                  <div class="form-group col-md-12 text-center module-subheader">
                    <h5>{{title}}</h5>
                  </div>
                </div>
                <div class="form-row" [ngClass]="{'mb-1': item.type==='link', 'mb-2': item.type==='checkbox'}" *ngFor="let item of content">
                  <ng-template [ngIf]="item.type === 'link'" [ngIfElse]="elseBlock">
                    <a [routerLink]="[item.routerLink]" [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)"> 
                      <span class="link" [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)">{{item.label}}</span>
                    </a>
                  </ng-template>
                  <ng-template #elseBlock>
                    <div class="custom-control custom-switch">
                      <input type="checkbox" [(ngModel)]="modelObj[item.model]"
                        [ngModelOptions]="{standalone: true}" class="custom-control-input" [id]="item.id"
                        [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)">
                        <label class="custom-control-label" [for]="item.id"
                        [ngClass]="{ 'HelpCursor': isHelpActive }" (click)="DispalyInfo($event,item.label)">{{item.label}}</label>
                    </div>
                  </ng-template>
                </div>
              </div>
            `,
  styles: [`
            .card-background {
              background-color: #f7f7f7;
            }
            .header {
              color: black;
              background-color: #9b9b9b;
            }
            .link {
              color: rgba(15, 15, 15, 0.548);
              font-weight: bolder;
              font-size:larger;
            }
            `
          ]
})

export class IplAppSimpleCard {

  @Input() title;
  @Input() content;
  @Input() modelObj;
  @Input() isHelpActive;

  @Output() dispalyInfoData = new EventEmitter();

  DispalyInfo(event: Event, lblName)
  { 
   // debugger; 
    if (this.isHelpActive) {
      event.preventDefault();
      this.dispalyInfoData.emit({event,lblName});
    }    
  }
} 
