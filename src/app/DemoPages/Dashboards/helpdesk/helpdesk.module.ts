import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TrendModule } from 'ngx-trend';
import { GaugeModule } from 'angular-gauge';
import { HelpdeskComponent } from './helpdesk.component';
import { HelpdeskRoutingModule } from './helpdesk-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule, GaugeModule.forRoot(), NgApexchartsModule, SlickCarouselModule, TrendModule,
    HelpdeskRoutingModule, PageTitleModule, FontAwesomeModule, ChartsModule
  ],
  declarations: [HelpdeskComponent]})
export class HelpdeskModule { }



