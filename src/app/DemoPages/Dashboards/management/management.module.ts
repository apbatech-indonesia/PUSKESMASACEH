import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendModule } from 'ngx-trend';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule, NgbModule, TrendModule,
    ManagementRoutingModule, FontAwesomeModule, PageTitleModule, ChartsModule, NgApexchartsModule
  ],
  declarations: [ManagementComponent]})
export class ManagementModule { }



