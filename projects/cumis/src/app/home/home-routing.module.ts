
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FinancialReconciliationComponent } from '../mond/financialReconciliation/financialReconciliation';
import { ProductMaintenanceComponent } from '../mond/productMaintenance/productMaintenance';

const homeRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'financialReconciliation', component: FinancialReconciliationComponent },
      { path: 'productMaintenanceComponent', component: ProductMaintenanceComponent }
    ]
  }
];

export const HomeRouting = RouterModule.forChild(homeRoutes); 
