import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SamlLoginComponent } from './samlLogin.component';

import { SamlLoginRouting } from './saml-routing.module';

@NgModule({
  declarations: [
    SamlLoginComponent
  ],
  imports: [
    CommonModule,
    SamlLoginRouting,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})

export class SamlLoginModule { }
