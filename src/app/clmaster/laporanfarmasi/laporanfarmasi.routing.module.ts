import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { laporanfarmasiComponent } from "./laporanfarmasi.component";

const routes: Routes = [
  {
    path: "",
    component: laporanfarmasiComponent,
    data: {
      title: "laporanfarmasi",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class llaporanfarmasiRoutingModule {}
