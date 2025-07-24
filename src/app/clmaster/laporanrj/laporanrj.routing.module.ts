import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { laporanrjComponent } from "./laporanrj.component";

const routes: Routes = [
  {
    path: "",
    component: laporanrjComponent,
    data: {
      title: "laporanrj",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class laporanrjRoutingModule {}
