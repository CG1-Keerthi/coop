
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FinancialReconciliationComponent } from '../mond/financialReconciliation/financialReconciliation';
import { ProductMaintenanceComponent } from '../mond/productMaintenance/productMaintenance';
import { ReportsComponent } from '../mond/reports/reports.component';
import { NetpremiumreportComponent } from '../mond/reports/netpremiumreport/netpremiumreport.component';
import { LogicalDeleteReportComponent } from '../mond/reports/logicaldeletereport/logicaldeletereport.component';

const homeRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'financialReconciliation', component: FinancialReconciliationComponent },
      { path: 'productMaintenanceComponent', component: ProductMaintenanceComponent },
      { path: 'reportsComponent', component: ReportsComponent },
      { path: 'netpremiumreportComponent', component: NetpremiumreportComponent },
      { path: 'logicalDeleteReportComponent', component: LogicalDeleteReportComponent }

    ]
  }
];

export const HomeRouting = RouterModule.forChild(homeRoutes);
