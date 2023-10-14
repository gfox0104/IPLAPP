import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { RepairBaseSearchModel } from './repair-base-search.model';
import { RepairBaseSearchService } from './repair-base-search.service';

@Component({
  selector: 'app-repair-base-search',
  templateUrl: './repair-base-search.component.html',
  styleUrls: ['./repair-base-search.component.scss']
})
export class RepairBaseSearchComponent implements OnInit {

  formUsrCommonGroup: UntypedFormGroup;
  public range = { start: null, end: null };
  submitted: boolean = false;
  isLoading: boolean = false;
  button: string = "Search";
  RepairBaseSearchModelObj: RepairBaseSearchModel = new RepairBaseSearchModel();
  constructor( 
    private formBuilder: UntypedFormBuilder,
    private xRepairBaseSearchService: RepairBaseSearchService
    ) { }

  public ngOnInit(): void {
    this.formUsrCommonGroup = this.formBuilder.group({
      RB_Startdate: ["", Validators.required],
      RB_Enddate: ["", Validators.required],
      RB_BlueBook_ID: ["", Validators.required],
      RB_Reference_ID: ["", Validators.required],
      RB_Batch_ID: ["", Validators.required],
      RB_Order: ["", Validators.required],
      RB_City: ["", Validators.required],
      RB_State: ["", Validators.required],
      RB_Zip: ["", Validators.required],
      RB_Result_Num: ["", Validators.required],
    });
  }
  get fx() {
		return this.formUsrCommonGroup.controls;
	}
  FormButton() {
    this.submitted = true;
    if (this.formUsrCommonGroup.invalid) {
			return;
    }
    this.isLoading = true;
		this.button = "Searching";
  }



}
