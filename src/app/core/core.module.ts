import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme/theme.service';

import { AuthService } from './auth/auth.mock.service';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NotificationService } from './services/notification/notification.service';

@NgModule({
  providers: [
    ThemeService,
    AuthService,
    UserService,
    AuthGuard,
    LoginGuard,
    NotificationService,
  ],
})
export class CoreModule {}
