import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from './components/nav/nav.module';
import { PresentationModule } from './components/presentation/presentation.module';

@NgModule({
  imports: [CommonModule, NavModule, PresentationModule],
  exports: [CommonModule, NavModule, PresentationModule],
  declarations: [],
})
export class SharedModule {}
