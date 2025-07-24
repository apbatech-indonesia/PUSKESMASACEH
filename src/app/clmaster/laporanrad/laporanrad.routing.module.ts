import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { laporanradComponent } from "./laporanrad.component";

const routes: Routes = [
  {
    path: "",
    component: laporanradComponent,
    data: {
      title: "laporanrad",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class laporanradRoutingModule {}
