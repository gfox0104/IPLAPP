import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { CommonClientHeaderModule } from './common-client-header/common-client-header.module';
import { ClientService } from './client.service';
import { ClientResultInstructionPrintComponent } from './client-result-instruction-print/client-result-instruction-print.component';
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared.module";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { InvoicePrintComponent } from "./components/invoice-print/invoice-print.component";
import { ButtonsModule } from '@progress/kendo-angular-buttons';

const routes: Routes = [
  { path: "client-result-instruction-print/:workorder", component: ClientResultInstructionPrintComponent },
  { path: "InvoicePrintComponent/:workorder", component: InvoicePrintComponent },
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./client-result/client-result.module').then(m => m.ClientResultModule),
      }
    ]
  }
];

@NgModule({
  declarations: [ClientComponent, ClientResultInstructionPrintComponent],
  imports: [
    CommonClientHeaderModule,
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule,
    DropDownsModule,
    PDFExportModule,
    ButtonsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ClientService],
  bootstrap: [ClientComponent]
})
export class ClientModule {
  
}
