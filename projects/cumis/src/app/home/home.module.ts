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
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../mond/shared/shared.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown'
import { AddRowDirective } from '../mond/directives/add-row.directive';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProductMaintenanceComponent } from '../mond/productMaintenance/productMaintenance';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductDetailsComponent } from '../mond/productDetails/productDetails';
import { ReportsComponent } from '../mond/reports/reports.component';
import { NetpremiumreportComponent } from '../mond/reports/netpremiumreport/netpremiumreport.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { LogicalDeleteReportComponent } from '../mond/reports/logicaldeletereport/logicaldeletereport.component';
import { ClientMaintenanceComponent } from '../mond/clientmaintenance/clientmaintenance.component';
import { ClientDetailComponent } from '../mond/clientmaintenance/clientdetail/clientdetail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    HomeComponent,
    ProductMaintenanceComponent,
    FinancialReconciliationComponent,
    AddRowDirective,
    ProductDetailsComponent,
    ReportsComponent,
    NetpremiumreportComponent,
    LogicalDeleteReportComponent,
    ClientMaintenanceComponent,
    ClientDetailComponent
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
    MultiSelectModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSlideToggleModule


  ],
  exports: [
  ]
})
export class HomeModule { }
