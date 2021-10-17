import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotificationComponent } from './notification.component';
import { NotificationDirective } from './notification.directive';
import { NotificationCardComponent } from './notification-card/notification-card.component';

@NgModule({
  declarations: [NotificationComponent, NotificationDirective, NotificationCardComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [NotificationComponent],
})
export class NotificationModule {}
