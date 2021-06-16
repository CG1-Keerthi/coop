
import { Routes, RouterModule } from '@angular/router';

import { SamlLoginComponent } from './samlLogin.component';

const samlRoutes: Routes = [ 
  { path: 'samllogin', component: SamlLoginComponent }
]
export const SamlLoginRouting = RouterModule.forChild(samlRoutes); 
