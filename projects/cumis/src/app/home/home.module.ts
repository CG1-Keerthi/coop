// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home-routing.module';
import { DateAdapter, MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FinancialReconciliationComponent } from '../mond/financialReconciliation/financialReconciliation';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../mond/shared/shared.module';
import { TableModule} from 'primeng/table';
import { DropdownModule} from 'primeng/dropdown'
import { AddRowDirective } from '../mond/directives/add-row.directive';
import {MultiSelectModule} from 'primeng/multiselect';
import { ProductMaintenanceComponent } from '../mond/productMaintenance/productMaintenance';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductDetailsComponent } from '../mond/productDetails/productDetails';

@NgModule({
  declarations: [
    HomeComponent,
    ProductMaintenanceComponent,
    FinancialReconciliationComponent,
    AddRowDirective,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HomeRouting,
    SharedModule,
    MatAutocompleteModule,
    ReactiveFormsModule, 
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TableModule,
    DropdownModule,
    MultiSelectModule
  ], 
  exports: [
  ]
})
export class HomeModule { }
