import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { rkasirriComponent } from "./rkasirri.component";

const routes: Routes = [
  {
    path: "",
    component: rkasirriComponent,
    data: {
      title: "rkasirri",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class rkasirriRoutingModule {}
