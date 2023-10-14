import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../../shared.module";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RepairBaseSignupComponent } from "./repair-base-signup.component";

export const RepairBaseSignupRoute: Routes = [
	{
		path: "Signup",
		component: RepairBaseSignupComponent
	},
	{ path: "", redirectTo: "Signup", pathMatch: "full" }
];

@NgModule({
	declarations: [RepairBaseSignupComponent],
	imports: [
		RouterModule.forChild(RepairBaseSignupRoute),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
    NgbModule,
    InputsModule,
    LayoutModule,
		SharedModule
	],
	providers: [],
	bootstrap: [RepairBaseSignupComponent]
})
export class RepairBaseSignupModule {}
