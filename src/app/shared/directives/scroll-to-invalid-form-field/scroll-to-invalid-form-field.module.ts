import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToInvalidFormFieldDirective } from './scroll-to-invalid-form-field';

@NgModule({
  declarations: [ScrollToInvalidFormFieldDirective],
  imports: [CommonModule],
  exports: [ScrollToInvalidFormFieldDirective],
})
export class ScrollToInvalidFormFieldModule {}
