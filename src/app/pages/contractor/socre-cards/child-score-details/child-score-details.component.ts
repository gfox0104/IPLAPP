import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { MemoServices } from '../../memo/memo.service';
import { ScoreCardsModel } from '../scorecards.component-model';
import { ProductsService } from '../scorecards.component.service';

@Component({
  selector: 'app-datalist-details',
  templateUrl: './child-score-details.component.html',
  styleUrls: ['./child-score-details.component.scss'],
  providers:[ProductsService]
})
export class ChildDetailsComponent implements OnInit {

  @Input() public category: number;//Object;
  public gridView: any[];
    public view: Observable<GridDataResult>;
    ScoreCardsModelobj: ScoreCardsModel = new ScoreCardsModel();
    public skip = 0;
catid:number=5;
    constructor(private service: ProductsService,private xMemoServices: MemoServices,
      private xRouter: Router,
      private EncrDecr: EncrDecrService,) { }

    public ngOnInit(): void {
        this.view = this.service;

        
        let id= this.category['Wo_Con_FScore_PkeyID']
       
        this.GetModelData(id);
    }

    public pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        let id= this.category['Wo_Con_FScore_PkeyID']
        
        this.GetModelData(id);
    }

    /****/

    GetModelData(id:number) {
      
    
        this.ScoreCardsModelobj.Wo_Con_FScore_PkeyID = id;//1this.ModelObj;
        this.ScoreCardsModelobj.Type = 1;
        this.xMemoServices.childscoredata(this.ScoreCardsModelobj).subscribe(
          response => {
           
            if (response[0].length > 0) {
              
              this.gridView= response[0];
            
            }
          });
      }

      showDetails(event, dataItem){
        var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.Wo_Con_Score_Wo_Id);
   
    let url ="/client/clientresultinvoice/" + btoa(encrypted);
    window.open(url,'_blank');
      }
    }
  