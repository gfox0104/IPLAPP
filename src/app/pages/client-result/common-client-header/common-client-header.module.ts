import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonClientHeaderComponent } from "./common-client-header.component";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { CommonClientResultModule } from "../common-client-result/common-client-result.module";

@NgModule({
  declarations: [CommonClientHeaderComponent],
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule, 
    CommonClientResultModule,                                  
  ],
  exports: [
    CommonClientHeaderComponent
  ],

  providers: [],
  bootstrap: [CommonClientHeaderComponent]
})

export class CommonClientHeaderModule {}
