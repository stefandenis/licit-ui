import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { CheckmarkModule } from '../checkmark/checkmark.module';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, CheckmarkModule],
  exports: [LoadingComponent],
})
export class LoadingModule {}
