import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxMaskModule } from 'ngx-mask';

import { AuthComponent } from './loginauth/auth.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { MondValidateOtpComponent } from './mondValidateOtp/mondValidateOtp.component';
import { MondCreatePasswordComponent } from './mondCreatePassword/mondCreatePassword.component';

import { AuthRouting } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
    MondValidateOtpComponent,
    MondCreatePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRouting,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule
  ],
  exports: [
    AuthComponent,
    ForgotPasswordComponent,
    MondValidateOtpComponent,
    MondCreatePasswordComponent
  ]
})

export class AuthModule { }
