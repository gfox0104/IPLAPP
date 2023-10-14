import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPcrFormComponent } from './new-pcr-form/new-pcr-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { FormsMasterServices } from './forms-master.service'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { TemplateFormComponent } from './template-forms/template-form/template-form.component';
import { FormsComponent } from './forms/forms.component';
import { TemplateFbFormsComponent } from './template-fb-forms/template-fb-forms.component';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrassFormComponent } from './fb-pcr-form/grass-form/grass-form.component';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PreservationFormComponent } from './fb-pcr-form/preservation-form/preservation-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientResultPhotoServices } from '../../client-result/client-result-photo/client-result-photo.service';
import { CyprexxFbFormsComponent } from './cyprexx-fb-forms/cyprexx-fb-forms.component';
import { CyprexxFbPcrFormComponent } from './cyprexx-fb-pcr-form/cyprexx-fb-pcr-form.component';
import { CyprexxGrassChecklistComponent } from './cyprexx-grass-checklist/cyprexx-grass-checklist.component';
import { CyprexxWinterizationPressureCkecklistComponent } from './cyprexx-winterization-pressure-ckecklist/cyprexx-winterization-pressure-ckecklist.component';
import { CyprexxUniversalDamageChecklistComponent } from './cyprexx-universal-damage-checklist/cyprexx-universal-damage-checklist.component';
import { MSIGarassSubjectPropertyPcrFormComponent } from '../msi-forms/msi-grass-pcr-form/msi-grass-pcr-form.component';
import { MsiTemplateFormComponent } from './msi-template-form/msi-template-form.component';
import { MsiPreservationPcrFormComponent } from '../msi-forms/msi-preservation-pcr-form/msi-preservation-pcr-form.component';
import { McsFormComponent } from './mcs-form/mcs-form.component';
import { InspectionFormComponent } from './fb-pcr-form/inspection-form/inspection-form.component';
import { McsGrassCutFormComponent } from './mcs-grass-cut-form/mcs-grass-cut-form.component';
import { McsMaintenanceVendorChecklistComponent } from './mcs-maintenance-vendor-checklist/mcs-maintenance-vendor-checklist.component';
import { MCSTemplateFbFormsComponent } from './mcs-template-fb-forms/mcs-template-fb-forms.component';
import { NFRProcessingFormComponent } from './nfr-processing-form/nfr-processing-form.component';
import { NFRTemplateFbFormsComponent } from './nfr-template-fb-forms/nfr-template-fb-forms.component';
import { CyprexxJobDocumentationChecklistComponent } from './cyprexx-job-documentation-checklist/cyprexx-job-documentation-checklist.component';
import { NfrDumpReceiptFormComponent } from './nfr-dump-receipt-form/nfr-dump-receipt-form.component';
import { CyprexxPropertyConditionChecklistComponent } from './cyprexx-property-condition-checklist/cyprexx-property-condition-checklist.component';

export const PcrRouts = [
  { path: "", component: ViewFormsComponent },
  { path: "new-form", component: NewPcrFormComponent },
  { path: "edit-form/:id", component: NewPcrFormComponent },
  { path: "view-forms", component: ViewFormsComponent },
  { path: "edit-question/:id", component: EditQuestionComponent },
  { path: "preview/:id", component: PreviewFormComponent },
  { path: "template-forms", component: TemplateFormComponent },
  { path: "menu", component: FormsComponent },
  { path: "template-fb-forms", component: TemplateFbFormsComponent },
  { path: "fb-pcr-form/grass-form", component: GrassFormComponent },
  { path: "fb-pcr-form/preservation-form", component: PreservationFormComponent },
  { path: "cyprexx-fb-forms", component: CyprexxFbFormsComponent },
  { path: "cyprexx-fb-pcr-form", component: CyprexxFbPcrFormComponent },
  { path: "cyprexx-grass-checklist", component: CyprexxGrassChecklistComponent },
  { path: "cyprexx-Winterization-Pressure-Ckecklist", component: CyprexxWinterizationPressureCkecklistComponent },
  { path: "cyprexx-universal-damage-checklist", component: CyprexxUniversalDamageChecklistComponent },
  { path: "msi-grass-pcr-form", component: MSIGarassSubjectPropertyPcrFormComponent },
  { path: "msi-template-form", component: MsiTemplateFormComponent },
  { path: "msi-preservation-pcr-form", component: MsiPreservationPcrFormComponent },
  {path:"mcs-form", component:McsFormComponent},
  {path:"Inspection-form", component:InspectionFormComponent},
  {path:"mcs-grass-cut-form", component:McsGrassCutFormComponent},
  {path:"mcs-Maintenance-Vendor-Checklist", component:McsMaintenanceVendorChecklistComponent},
  {path:"mcs-template-fb-forms", component:MCSTemplateFbFormsComponent},
  {path:"NFR-processing-form",component:NFRProcessingFormComponent},
  {path:"NFR-template-fb-forms",component:NFRTemplateFbFormsComponent},
  {path:"cyprexx-documentation",component:CyprexxJobDocumentationChecklistComponent},
  {path:"NFR-Dump-receipt-form",component:NfrDumpReceiptFormComponent},
  {path:"cyprexx-property-condition-checklist",component:CyprexxPropertyConditionChecklistComponent}

];

@NgModule({
  declarations: [NewPcrFormComponent, ViewFormsComponent, EditQuestionComponent, PreviewFormComponent, TemplateFormComponent, FormsComponent,
    TemplateFbFormsComponent, GrassFormComponent, PreservationFormComponent, CyprexxFbFormsComponent, CyprexxFbPcrFormComponent, CyprexxGrassChecklistComponent, CyprexxWinterizationPressureCkecklistComponent, CyprexxUniversalDamageChecklistComponent, MSIGarassSubjectPropertyPcrFormComponent,
    MsiTemplateFormComponent, MsiPreservationPcrFormComponent,McsFormComponent,InspectionFormComponent,McsGrassCutFormComponent, McsMaintenanceVendorChecklistComponent, MCSTemplateFbFormsComponent, NFRProcessingFormComponent, NFRTemplateFbFormsComponent, CyprexxJobDocumentationChecklistComponent, NfrDumpReceiptFormComponent, CyprexxPropertyConditionChecklistComponent],

  imports: [
    RouterModule.forChild(PcrRouts),
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    PanelBarModule,
    DropDownsModule,
    HttpClientModule,
  ],
  exports: [TemplateFbFormsComponent,
    GrassFormComponent,
    CyprexxFbFormsComponent,
    CyprexxFbPcrFormComponent,
    CyprexxGrassChecklistComponent,
    CyprexxWinterizationPressureCkecklistComponent,
    CyprexxUniversalDamageChecklistComponent,
    MSIGarassSubjectPropertyPcrFormComponent,
    MsiTemplateFormComponent,
    MsiPreservationPcrFormComponent,
    McsFormComponent,
    InspectionFormComponent,
    McsGrassCutFormComponent,
    McsMaintenanceVendorChecklistComponent,
    NFRProcessingFormComponent,
    CyprexxJobDocumentationChecklistComponent,
    NfrDumpReceiptFormComponent,
    CyprexxPropertyConditionChecklistComponent
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ClientResultPhotoServices,
    multi: true
  },
    FormsMasterServices],
  bootstrap: [NewPcrFormComponent]
})
export class PcrFormModule {

}
