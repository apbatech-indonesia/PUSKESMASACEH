import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';

@NgModule({
  imports: [
    CommonModule, FontAwesomeModule, ChartsModule,
    StatisticsRoutingModule, PageTitleModule, NgApexchartsModule
  ],
  declarations: [StatisticsComponent],
  providers: [
  ],

})
export class StatisticsModule { }

