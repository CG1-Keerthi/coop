
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './loginauth/auth.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { MondValidateOtpComponent } from './mondValidateOtp/mondValidateOtp.component';
import { MondCreatePasswordComponent } from './mondCreatePassword/mondCreatePassword.component';

const authRoutes: Routes = [ 
  { path: '', component: AuthComponent }, 
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
  },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'mondValidateOtp', component: MondValidateOtpComponent },
  { path: 'mondCreatePassword', component: MondCreatePasswordComponent }
]

export const AuthRouting = RouterModule.forChild(authRoutes); 
