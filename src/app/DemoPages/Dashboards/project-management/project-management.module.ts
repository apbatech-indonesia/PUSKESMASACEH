import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from 'ngx-trend';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
import { DynamicModule } from '../../Tables/dynamic/dynamic.module';
@NgModule({
  imports: [
    CommonModule, TrendModule, NgApexchartsModule, ChartsModule, FontAwesomeModule,
    ProjectManagementRoutingModule, PageTitleModule, DynamicModule
  ],
  declarations: [ProjectManagementComponent]})
export class ProjectManagementModule { }



