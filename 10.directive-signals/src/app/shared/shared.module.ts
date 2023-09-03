import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';
import { ErrorLabelDirective } from './directives/error-label.directive';

@NgModule({
  declarations: [
    CustomLabelDirective,
    ErrorLabelDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CustomLabelDirective,
    ErrorLabelDirective,
  ]
})
export class SharedModule {}
