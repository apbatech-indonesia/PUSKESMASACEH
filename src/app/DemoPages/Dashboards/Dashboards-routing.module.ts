import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/auth/login.guard';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboards',
      status: false
    },
   
    children: [
      {
        path: 'analytics',
        loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
      },
      {
        path: 'advertisement',
        loadChildren: () => import('./advertisement/advertisement.module').then(m => m.AdvertisementModule)
      },
      {
        path: 'management',
        loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)
      },
      {
        path : 'skrining-ilp',
        loadChildren:() => import('./laporanskriningilp/laporanskriningilp.module').then(m => m.laporanskriningilpModule)
      },
      {
        path : 'dinkes/:dinkesloc',
        loadChildren:() => import('./dashboard-dinkes/dashboard-dinkes.module').then(m => m.DashboardDinkesModule)
      },
      {
        path: 'helpdesk',
        loadChildren: () => import('./helpdesk/helpdesk.module').then(m => m.HelpdeskModule)
      },
      {
        path: 'monitoring',
        loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule)
      },
      {
        path: 'dokterri',
        loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule)
      },
      {
        path: 'project-management',
        loadChildren: () => import('./project-management/project-management.module').then(m => m.ProjectManagementModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'managementlab',
        loadChildren: () => import('./managementlab/managementlab.module').then(m => m.ManagementlabModule)
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
