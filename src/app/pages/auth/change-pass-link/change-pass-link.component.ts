import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';

@Component({
  selector: 'app-change-pass-link',
  templateUrl: './change-pass-link.component.html',
  styleUrls: ['./change-pass-link.component.scss']
})
export class ChangePassLinkComponent implements OnInit {
  UserSource:number;
  constructor(  private router: Router,  
    private xRoute: ActivatedRoute,
     private EncrDecr: EncrDecrService,) {
       this.getModelData();
      }

  ngOnInit(): void {
  }
  getModelData() {
    //debugger;
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 !='') {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      if(id != "")
      {
        this.UserSource = parseInt(id);
        console.log('check', this.UserSource)
      }
      else
      {
        this.UserSource = 0;
      }    
      
    } 
  }
  redirect(){
    //debugger
    if ( this.UserSource == 1 ||  this.UserSource == 2 ||  this.UserSource ==3) {
      this.router.navigate(["/dashboard"]);
    }
    else
    {
      this.router.navigate(["admin/login"]);

    }
   
  }

}
