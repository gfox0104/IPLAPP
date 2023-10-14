import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../../../shared.module";
import { SupportTicketHistoryComponent } from "./support-ticket-history.component";
import {
	GridModule,
	PDFModule,
	ExcelModule
} from "@progress/kendo-angular-grid";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { NgxSpinnerModule } from "ngx-spinner";

export const SupportSettRouts: Routes = [
	{
		path: "history",
		component: SupportTicketHistoryComponent
	},
	
	
	{ path: "", redirectTo: "history", pathMatch: "full" }
];

@NgModule({
	declarations: [SupportTicketHistoryComponent],
	imports: [
		RouterModule.forChild(SupportSettRouts),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		GridModule,
		ChartsModule,
		InputsModule,
		PDFModule,
		ExcelModule,
		SharedModule,
		NgxSpinnerModule

	],
	providers: [],
	bootstrap: [SupportTicketHistoryComponent]
})
export class SupportTicketHistoryModule {}
