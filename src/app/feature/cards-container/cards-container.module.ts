import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsContainerComponent } from './cards-container.component';
import { LicitationCardModule } from '../licitation-card/licitation-card.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [CardsContainerComponent],
  imports: [CommonModule, LicitationCardModule, MatIconModule],
  exports: [CardsContainerComponent],
})
export class CardsContainerModule {}
