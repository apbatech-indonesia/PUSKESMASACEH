import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TrendModule } from "ngx-trend";
import { PageTitleModule } from "src/app/Layout/Components/page-title/page-title.module";
import { FormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { laporanskriningilpRoutingModule } from "./laporanskriningilp.routing.module";
import { laporanskriningilpComponent } from "./laporanskriningilp.component";
import { MasterSelectModule } from "src/app/satusehat/satusehat-master/master-select/master-select.module";
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    TrendModule,
    laporanskriningilpRoutingModule,
    FontAwesomeModule,
    PageTitleModule,
    ChartsModule,
    MatPaginatorModule,
    NgApexchartsModule,
    MasterSelectModule
  ],
  declarations: [laporanskriningilpComponent]})
export class laporanskriningilpModule {}



