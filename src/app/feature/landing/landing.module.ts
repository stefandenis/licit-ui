import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LicitationCardModule } from '../licitation-card/licitation-card.module';
import { CardsContainerModule } from '../cards-container/cards-container.module';

const routes: Routes = [{ path: '', component: LandingComponent }];
@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    LicitationCardModule,
    CardsContainerModule,
  ],
  exports: [RouterModule, LandingComponent],
})
export class LandingModule {}
