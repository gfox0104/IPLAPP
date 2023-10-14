import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairBaseProxyserverComponent } from './repair-base-proxyserver.component';
import { RouterModule, Routes } from '@angular/router';

export const RepairBaseProxyserverRoute: Routes = [
	{
		path: "",
		component: RepairBaseProxyserverComponent
	}
];


@NgModule({
  declarations: [RepairBaseProxyserverComponent],
  imports: [
    RouterModule.forChild(RepairBaseProxyserverRoute),
    CommonModule
  ]
})
export class RepairBaseProxyserverModule { }
