import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PersetujuanTindakanMedisCetakComponent } from "./PersetujuanTindakanMedisCetak.component";

const routes: Routes = [
  {
    path: "",
    component: PersetujuanTindakanMedisCetakComponent,
    data: {
      title: "Cetak Resume Medis Rawat Inap Cetak",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersetujuanTindakanMedisCetakRoutingModule {}
