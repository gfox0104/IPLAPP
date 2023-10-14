import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
    selector: 'my-app',
    templateUrl: "./repair-base-login.component.html",
    styleUrls: ['./repair-base-login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RepairBaseLoginComponent {
    constructor(
		private xRouter: Router
	) {}
    public form: UntypedFormGroup = new UntypedFormGroup({
        username: new UntypedFormControl(),
        password: new UntypedFormControl(),
        loggedin: new UntypedFormControl()
    });

    public onSubmit(): void {
        this.form.markAllAsTouched();
    }

    public clearForm(): void {
        this.form.reset();
    }
    repairbaseLogin() {
        this.xRouter.navigate(["/repairBase/repairMain"]);
    }
}