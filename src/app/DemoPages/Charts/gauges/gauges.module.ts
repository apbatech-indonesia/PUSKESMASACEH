import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaugeModule } from 'angular-gauge';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GaugesComponent } from './gauges.component';
import { GaugesRoutingModule } from './gauges-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule, GaugeModule,
    RoundProgressModule, NgbModule,
    GaugesRoutingModule, PageTitleModule, FontAwesomeModule
  ],
  declarations: [GaugesComponent]})
export class GaugesModule { }



