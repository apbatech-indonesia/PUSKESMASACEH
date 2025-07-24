import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { bayarhutangfarmasiComponent } from "./bayarhutangfarmasi.component";

const routes: Routes = [
  {
    path: "",
    component: bayarhutangfarmasiComponent,
    data: {
      title: "bayarhutangfarmasi",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class bayarhutangfarmasiRoutingModule {}
