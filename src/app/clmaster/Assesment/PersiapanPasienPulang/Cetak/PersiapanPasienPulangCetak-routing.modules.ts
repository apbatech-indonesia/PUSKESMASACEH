import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PersiapanPasienPulangCetakComponent } from "./PersiapanPasienPulangCetak.component";

const routes: Routes = [
  {
    path: "",
    component: PersiapanPasienPulangCetakComponent,
    data: {
      title: "Cetak Transfer Intra",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersiapanPasienPulangCetakRoutingModule {}
