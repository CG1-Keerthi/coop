
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FinancialReconciliationComponent } from '../mond/financialReconciliation/financialReconciliation';
import { ProductMaintenanceComponent } from '../mond/productMaintenance/productMaintenance';
import { ReportsComponent } from '../mond/reports/reports.component';
import { NetpremiumreportComponent } from '../mond/reports/netpremiumreport/netpremiumreport.component';
import { LogicalDeleteReportComponent } from '../mond/reports/logicaldeletereport/logicaldeletereport.component';
import { ClientMaintenanceComponent } from '../mond/clientmaintenance/clientmaintenance.component';
import { RateStructureConfigurationComponent } from '../mond/rateStructureConfiguration/rateStructureConfiguration.component';
import { creditorCertificateComponent } from '../mond/creditorCertificateMaintenance/creditorCertificate.component';
import { CreditorDataAdminViewComponent } from '../mond/creditorDataAdminView/creditorDataAdminView.component';
import { CreditorDataProcessingOverviewComponent } from '../mond/creditorDataAdminView/creditorDataProcessingOverview/creditorDataProcessingOverview.component';
import { CreditorSelfAdminDashboardComponent } from '../mond/creditorSelfAdminDashboard/creditorSelfAdminDashboard.component';


const homeRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'financialReconciliation', component: FinancialReconciliationComponent },
      { path: 'productMaintenanceComponent', component: ProductMaintenanceComponent },
      { path: 'reportsComponent', component: ReportsComponent },
      { path: 'netpremiumreportComponent', component: NetpremiumreportComponent },
      { path: 'logicalDeleteReportComponent', component: LogicalDeleteReportComponent },
      { path: 'clientmaintenance', component: ClientMaintenanceComponent },
      { path: 'rateStructureConfiguration', component: RateStructureConfigurationComponent },
      { path: 'creditorCertificate', component: creditorCertificateComponent },
      { path: 'creditorDataAdminView', component: CreditorDataAdminViewComponent },
      { path: 'creditorDataProcessingOverview', component: CreditorDataProcessingOverviewComponent },
      { path: 'creditorSelfAdminDashboard', component: CreditorSelfAdminDashboardComponent },
  
      


    ]
  }
];

export const HomeRouting = RouterModule.forChild(homeRoutes);
