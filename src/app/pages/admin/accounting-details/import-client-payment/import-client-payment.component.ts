import { Component, OnInit } from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { ImportClientPaymentService } from './import-client-payment.service';
import { ViewClientCompaniesModel, filterMasterModel } from "../../client-companies/view-client-companies/view-client-companies-model";
import { ViewClientCompaniesServices } from '../../client-companies/view-client-companies/view-client-companies.service'
import { ClientPaymentModel } from './import-client-payment-model';

@Component({
  selector: 'app-import-client-payment',
  templateUrl: './import-client-payment.component.html',
  styleUrls: ['./import-client-payment.component.scss']
})
export class ImportClientPaymentComponent implements OnInit {
	ViewClientCompaniesModelObj: ViewClientCompaniesModel = new ViewClientCompaniesModel();
	filterMasterModelObj: filterMasterModel = new filterMasterModel();
	formUsrCommonGroup: UntypedFormGroup;
	uploadSaveUrl =
		BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground";
	submitted = false;
	button = "Submit";
	isLoading = false;
	ClientPaymentModelObj: ClientPaymentModel = new ClientPaymentModel();

	
	public ICP_Companies: Array<{}> = [];
	public myRestrictions: FileRestrictions = {
		allowedExtensions: ['jpg', 'jpeg', 'png']
	};
  	uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
	public ICP_Company: { Client_Company_Name: string, Client_pkeyID: number };
  	public registerForm: UntypedFormGroup = new UntypedFormGroup({
		ICP_Number: new UntypedFormControl(),
		ICP_Attach: new UntypedFormControl(),
		ICP_Date: new UntypedFormControl(new Date(2020, 10, 10)),
		ICP_Company: new UntypedFormControl()
	});
	public submitForm(): void {
		// this.registerForm.markAllAsTouched();
	}

	public clearForm(): void {
		this.registerForm.reset();
	}
  constructor(
    private formBuilder: UntypedFormBuilder,
		private xImportClientPaymentService: ImportClientPaymentService,
		private xViewClientCompaniesServices: ViewClientCompaniesServices,
		
  ) { }

  ngOnInit(): void {
   

	this.filterMasterModelObj.Type = 3;
	this.xViewClientCompaniesServices
		.ClientComapnyViewData(this.filterMasterModelObj)
		.subscribe(response => {
			this.ICP_Companies = response[0];
		})
  }


}
