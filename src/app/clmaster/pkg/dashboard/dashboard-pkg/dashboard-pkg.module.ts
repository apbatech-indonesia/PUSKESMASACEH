import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardPkgRoutingModule } from "./dashboard-pkg-routing.module";
import { DashboardPkgComponent } from "./dashboard-pkg.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataKehadiranComponent } from "./data-kehadiran/data-kehadiran.component";
import { DataLayananComponent } from "./data-layanan/data-layanan.component";
import { DataPendaftaranComponent } from "./data-pendaftaran/data-pendaftaran.component";

@NgModule({
  declarations: [
    DashboardPkgComponent,
    DataKehadiranComponent,
    DataLayananComponent,
    DataPendaftaranComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardPkgRoutingModule,
    NgApexchartsModule,
    NgbModule,
  ],
})
export class DashboardPkgModule {}
