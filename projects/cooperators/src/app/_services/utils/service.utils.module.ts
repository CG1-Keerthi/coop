// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { KebabcasePipe } from './kebabcase.pipe';
import { ArrayFilterPipe } from './MDArrayFilter.pipe';
import { currencyFormatterPipe } from './MDCurrencyFormatter.pipe';
import { HighhlightFilterPipe } from './MDHighlightFilter.pipe';
import { NumberFormatterPipe } from './MDNumberFormatter.pipe';

@NgModule({
  declarations: [
    KebabcasePipe,
    ArrayFilterPipe,
    currencyFormatterPipe,
    HighhlightFilterPipe,
    NumberFormatterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  exports: [
    KebabcasePipe,
    ArrayFilterPipe,
    currencyFormatterPipe,
    HighhlightFilterPipe,
    NumberFormatterPipe
  ]
})
export class ServiceUtilsModule { }
