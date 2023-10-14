
import { NgModule } from '@angular/core';
import { NumberDirective } from './numbers-only.directive';
import { AlphabetDirective } from './alphabet-check.directive';
import { StatusWithColor } from './status-color.directive';
import { AlphanumericDirective } from './alphanumeric-check.directive';

@NgModule({
  declarations: [
    NumberDirective, AlphabetDirective, StatusWithColor,AlphanumericDirective
  ],
  exports: [
    NumberDirective, AlphabetDirective, StatusWithColor,AlphanumericDirective
  ]
})

export class CommonDirectiveModule { }
