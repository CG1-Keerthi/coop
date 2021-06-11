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
import { ClientDetailFormBuilderModule } from '../form-builder/clientMaintenance/clientDetails/client-detail-form.module';
import { ClientAddressDetailFormBuilderModule } from '../form-builder/clientMaintenance/clientAddressdetails/client-address-detail-form.module';
import { RateStructureConfigurationComponent } from '../mond/rateStructureConfiguration/rateStructureConfiguration.component';
import { RatingDetailsComponent } from '../mond/rateStructureConfiguration/ratingDetails/ratingDetails.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RateDetailFormBuilderModule } from '../form-builder/rateDetails/rate-detail-form.module';
import { creditorCertificateComponent } from '../mond/creditorCertificateMaintenance/creditorCertificate.component';
import { CreditorCertificateFormBuilderModule } from '../form-builder/creditorCertificateMaintenance/creditor-certificate-form.module';
import { certificateDetailsComponent } from '../mond/creditorCertificateMaintenance/certificateDetails/certificateDetails.component';
import { additionalDetailsComponent } from '../mond/creditorCertificateMaintenance/additionalDetails/additionalDetails.component';
import { CertificateAuditLogComponent } from '../mond/creditorCertificateMaintenance/certificateAuditLog/certificateauditLog.component';
import { OnlyNumberDirective } from '../mond/directives/only-number.directive';
import { AlphabetOnlyDirective } from '../mond/directives/alphabet-only.directive';

// for date picker formate
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../_services/constants/MDDateFormate';
import { CreditorDataAdminViewComponent } from '../mond/creditorDataAdminView/creditorDataAdminView.component';
import { SplitFilesComponent } from '../mond/creditorDataAdminView/splitFiles/splitFiles.component';
import { CreditorDataProcessingOverviewComponent } from '../mond/creditorDataAdminView/creditorDataProcessingOverview/creditorDataProcessingOverview.component';
import { lgmTwoComponent } from '../mond/creditorDataAdminView/creditorDataProcessingOverview/lgmTwo/lgmTwo.component';
import { CreLogixComponent } from '../mond/creditorDataAdminView/creditorDataProcessingOverview/creLogix/creLogix.component';
import { LAISComponent } from '../mond/creditorDataAdminView/creditorDataProcessingOverview/LAIS/lais.component';
import { LGMComponent } from '../mond/creditorDataAdminView/creditorDataProcessingOverview/LGM/lgm.component';
import { CreditorSelfAdminDashboardComponent } from '../mond/creditorSelfAdminDashboard/creditorSelfAdminDashboard.component';
import { ChartsModule } from 'ng2-charts';
import { CumisHomePageComponent } from '../mond/cumisHomePage/cumisHomePage.component';
import { NgxMaskModule } from 'ngx-mask';

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
    ClientDetailComponent,
    RateStructureConfigurationComponent,
    RatingDetailsComponent,
    creditorCertificateComponent,
    certificateDetailsComponent,
    additionalDetailsComponent,
    CertificateAuditLogComponent,
    OnlyNumberDirective,
    AlphabetOnlyDirective,
    CreditorDataAdminViewComponent,
    SplitFilesComponent,
    CreditorDataProcessingOverviewComponent,
    lgmTwoComponent,
    CreLogixComponent,
    LAISComponent,
    LGMComponent,
    CreditorSelfAdminDashboardComponent,
    CumisHomePageComponent
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
    MatSlideToggleModule,
    ClientDetailFormBuilderModule,
    ClientAddressDetailFormBuilderModule,
    MatProgressSpinnerModule,
    RateDetailFormBuilderModule,
    CreditorCertificateFormBuilderModule,
    ChartsModule,
    NgxMaskModule


  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [
  ]
})
export class HomeModule { }
