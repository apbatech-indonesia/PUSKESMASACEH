import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';

// // Pages

import { ForgotPasswordComponent } from './DemoPages/UserPages/forgot-password/forgot-password.component';
import { ForgotPasswordBoxedComponent } from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './DemoPages/UserPages/login-boxed/login-boxed.component';
import { LoginComponent } from './DemoPages/UserPages/login/login.component';
import { RegisterBoxedComponent } from './DemoPages/UserPages/register-boxed/register-boxed.component';
import { RegisterComponent } from './DemoPages/UserPages/register/register.component';
import { MasukappComponent } from './DemoPages/masukapp/masukapp.component';
import { LoginclComponent } from './cllogin/logincl/logincl.component';
import { KosongComponent } from './cllogin/kosong/kosong.component';
import { LoginGuard } from './auth/login.guard';
import { anjunganComponent } from './cllogin/anjungan/anjungan.component';
import { ermdisplayComponent } from './cllogin/ermdisplay/ermdisplay.component';
import { anjungansehatComponent } from './cllogin/anjungansehat/anjungansehat.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/kosong',
    pathMatch: 'full'
  },
  
  { path: 'masuk', component: LoginclComponent },
  { path: 'anjungan', component: anjunganComponent },
  { path: 'anjungans', component: anjungansehatComponent },
  { path: 'ermdisplay', component: ermdisplayComponent },
  
  { path: 'kosong', component: KosongComponent,canActivate:[LoginGuard] },
  


  {
    path: '',
    component: BaseLayoutComponent,
    children: [
    
      {
        
        path: 'dashboards',
       
        loadChildren: () => import('./DemoPages/Dashboards/Dashboards.module').then(m => m.DashboardsModule)
      },

    
      {
        path : 'master',
      
        loadChildren: () => import('./clmaster/master.module').then(m => m.MasterModule)
      },
      {
        path : 'form/element',
      
        loadChildren: () => import('./DemoPages/Forms/Elements/form-elements.module').then(m => m.FormElementModule)
      }
      
    ],
    canActivate: [LoginGuard],
  },
  {
    path: 'emrform',
       
    loadChildren: () => import('./clmaster/master.module').then(m => m.MasterModule)
  },
  
{ path: '**', component: KosongComponent },
    
  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
