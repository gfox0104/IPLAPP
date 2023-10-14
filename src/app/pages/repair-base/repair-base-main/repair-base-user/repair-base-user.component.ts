import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repair-base-user',
  templateUrl: './repair-base-user.component.html',
  styleUrls: ['./repair-base-user.component.scss']
})
export class RepairBaseUserComponent implements OnInit {

  formUsrCommonGroup:UntypedFormGroup;
  submitted=false;

  constructor( private formbuilder:UntypedFormBuilder) { }

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formbuilder.group({
      email:["",Validators.required],
      fname:["",Validators.required],
      lname:["",Validators.required],
      mobileNumber:["",Validators.required]

    })
  }
 
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  changepassword(){
    this.submitted = true;
    if(this.formUsrCommonGroup.invalid){
      return;
    }
      }
}
