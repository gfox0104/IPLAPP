import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CompanyServices } from './company-service';
import { CompanyModel } from './company-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';



@Component({
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  CompanyObj: CompanyModel = new CompanyModel();
  formUsrCommonGroup: UntypedFormGroup;
  submitted = false; // submitted;
  isLoading: boolean = false;
  button: string = 'Save';
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private companyServices: CompanyServices
  ) {}

  ngOnInit(): void {
    const self = this;
    this.formUsrCommonGroup = this.formBuilder.group({
      CompanyName: ['', Validators.required],
      ShortName: ['', Validators.required],
      CompanyCode: ['', Validators.required],
    });

    self.companyServices.Get().subscribe((result) => {
      if (result.HttpStatusCode == 200) {
        this.CompanyObj = result.Data;
        this.formUsrCommonGroup.enable();
      }
    });
  }
  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
  // common message modal popup
  commonMessage(Message) {
    const modalRef = this.xmodalService.open(IplAppModalContent, {
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.MessageFlag = Message;
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
  // submit form
  FormButton() {
    this.CompanyObj;
    this.submitted = true;

    // stop here if form is invalid
    if (this.formUsrCommonGroup.invalid) {
      return;
    }
    this.button = 'Progressing..';
    this.isLoading = true;
    //this.AddUserModelObj.User_Tracking_Time =
    // all valid data to save
    this.companyServices.Save(this.CompanyObj).subscribe((response) => {
      this.button = 'Save';
      this.isLoading = false;
      this.commonMessage(response.Message);
    });
  }
}
