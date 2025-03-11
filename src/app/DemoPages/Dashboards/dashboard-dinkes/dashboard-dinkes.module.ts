import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgApexchartsModule } from "ng-apexcharts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TrendModule } from "ngx-trend";
import { PageTitleModule } from "../../../Layout/Components/page-title/page-title.module";
import { DashboardDinkesRoutingModule } from "./dashboard-dinkes-routing.module";
import { DashboardDinkesComponent } from "./dashboard-dinkes.component";
import { FormsModule } from "@angular/forms";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TrendModule,
    DashboardDinkesRoutingModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    PageTitleModule,
    ChartsModule,
    NgApexchartsModule,
    FormsModule
  ],
  declarations: [DashboardDinkesComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class DashboardDinkesModule {}
