import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TrendModule } from "ngx-trend";
import { PageTitleModule } from "../../../Layout/Components/page-title/page-title.module";
import { DashboardDinkesRoutingModule } from "./dashboard-dinkes-routing.module";
import { DashboardDinkesComponent } from "./dashboard-dinkes.component";
import { FormsModule } from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TrendModule,
    DashboardDinkesRoutingModule,
    FontAwesomeModule,
    PageTitleModule,
    ChartsModule,
    NgApexchartsModule,
    FormsModule
  ],
  declarations: [DashboardDinkesComponent]})
export class DashboardDinkesModule {}



