import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../../shared.module";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RepairBaseLoginComponent } from "./repair-base-login.component";

export const RepairBaseLoginRoute: Routes = [
	{
		path: "Login",
		component: RepairBaseLoginComponent
	},
	{   path: "", redirectTo: "Login", pathMatch: "full" }
];

@NgModule({
	declarations: [RepairBaseLoginComponent],
	imports: [
		RouterModule.forChild(RepairBaseLoginRoute),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
        NgbModule,
        InputsModule,
        LayoutModule,
		SharedModule
	],
	providers: [],
	bootstrap: [RepairBaseLoginComponent]
})
export class RepairBaseLoginModule {}
