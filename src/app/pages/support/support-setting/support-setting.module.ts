import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../../shared.module";
import { SupportSettingComponent } from "./support-setting.component";
import {
	GridModule,
	PDFModule,
	ExcelModule
} from "@progress/kendo-angular-grid";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UploadModule } from "@progress/kendo-angular-upload";

export const SupportSettRouts: Routes = [
	{
		path: "setting",
		component: SupportSettingComponent
	},
	{
		path: "ticketdetail",
		loadChildren: () =>
			import("./support-ticket-detail/support-ticket-detail.module").then(
				m => m.SupportTicketDetailModule
			)
	},
	{
		path: "tickethistory",
		loadChildren: () =>
			import("./support-ticket-history/support-ticket-history.module").then(
				m => m.SupportTicketHistoryModule
			)
	},
	{ path: "", redirectTo: "setting", pathMatch: "full" }
];

@NgModule({
	declarations: [SupportSettingComponent],
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
		UploadModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [SupportSettingComponent]
})
export class SupportSettingModule {}
