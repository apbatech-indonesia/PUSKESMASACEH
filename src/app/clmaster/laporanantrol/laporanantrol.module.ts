import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendModule } from 'ngx-trend';
import { LaporanantrolRoutingModule } from './laporanantrol.routing.module';
import { PageTitleModule } from 'src/app/Layout/Components/page-title/page-title.module';
import { laporanantrolComponent } from './laporanantrol.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    FormsModule,
    CommonModule, 
    NgbModule, 
    TrendModule,
    LaporanantrolRoutingModule, 
    FontAwesomeModule, 
    PerfectScrollbarModule, 
    PageTitleModule, 
    ChartsModule, 
    MatPaginatorModule,
    NgApexchartsModule
  ],
  declarations: [laporanantrolComponent],
  providers: [
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    }
  ],
})
export class laporanantrolModule { }
