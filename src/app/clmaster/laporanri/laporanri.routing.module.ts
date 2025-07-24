import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { laporanriComponent } from "./laporanri.component";

const routes: Routes = [
  {
    path: "",
    component: laporanriComponent,
    data: {
      title: "laporanri",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class laporanriRoutingModule {}
