import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendModule } from 'ngx-trend';
import { LaporanantrolRoutingModule } from './laporanantrol.routing.module';
import { PageTitleModule } from 'src/app/Layout/Components/page-title/page-title.module';
import { laporanantrolComponent } from './laporanantrol.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    FormsModule,
    CommonModule, 
    NgbModule, 
    TrendModule,
    LaporanantrolRoutingModule, 
    FontAwesomeModule, 
    PageTitleModule, 
    ChartsModule, 
    MatPaginatorModule,
    NgApexchartsModule
  ],
  declarations: [laporanantrolComponent]})
export class laporanantrolModule { }



