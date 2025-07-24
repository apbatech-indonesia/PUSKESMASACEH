import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TrendModule } from 'ngx-trend';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
import { DynamicModule } from '../../Tables/dynamic/dynamic.module';
@NgModule({
  imports: [
    CommonModule, NgbModule,
    AdvertisementRoutingModule,
    SlickCarouselModule, FontAwesomeModule,
    ChartsModule, NgApexchartsModule, TrendModule, DynamicModule, PageTitleModule
  ],
  declarations: [AdvertisementComponent]})
export class AdvertisementModule { }



