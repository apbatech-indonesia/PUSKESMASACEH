import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TrendModule } from 'ngx-trend';

import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
import { DynamicModule } from '../../Tables/dynamic/dynamic.module';


// import { PageTitleComponent } from '../../../Layout/Components/page-title/page-title.component';
@NgModule({
  imports: [
    CommonModule, NgbModule,
    AnalyticsRoutingModule,
    FontAwesomeModule,
    SlickCarouselModule,
    ChartsModule, NgApexchartsModule, TrendModule, PageTitleModule, DynamicModule
  ],
  declarations: [AnalyticsComponent],
  bootstrap: [AnalyticsComponent]
})
export class AnalyticsModule { }



