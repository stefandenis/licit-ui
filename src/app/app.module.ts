import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from './core/core.module';
import { LandingModule } from './feature/landing/landing.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './feature/login/login.module';
import { ROUTING } from './app.routing';
import { LoadingModule } from './feature/loading/loading.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducer, appEffects } from './store/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './feature/notification/notification.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    CoreModule,
    LandingModule,
    SharedModule,
    LoginModule,
    ROUTING,
    LoadingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule,
    HttpClientModule,
    NotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
