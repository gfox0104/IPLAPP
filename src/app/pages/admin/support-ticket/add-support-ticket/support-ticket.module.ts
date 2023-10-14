import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../../../shared.module";
import{SupportTicketComponent} from './support-ticket.component';

import {
	GridModule,
	PDFModule,
	ExcelModule
} from "@progress/kendo-angular-grid";


export const SupporttickRouts: Routes = [
	{
		path: "ticketdetails",
		component: SupportTicketComponent
	}];

@NgModule({
	declarations: [SupportTicketComponent],
	imports: [
		RouterModule.forChild(SupporttickRouts),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		GridModule,
		PDFModule,
		ExcelModule,
		SharedModule,
		
	],
	providers: [],
	bootstrap: [SupportTicketComponent]
})
export class SupportTicketModule {}
