import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckmarkModule } from '../checkmark/checkmark.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollToInvalidFormFieldModule } from 'src/app/shared/directives/scroll-to-invalid-form-field/scroll-to-invalid-form-field.module';

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    CheckmarkModule,
    ReactiveFormsModule,
    ScrollToInvalidFormFieldModule,
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
