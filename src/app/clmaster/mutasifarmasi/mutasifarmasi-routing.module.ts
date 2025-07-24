import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { mutasifarmasiComponent } from "./mutasifarmasi.component";

const routes: Routes = [
  {
    path: "",
    component: mutasifarmasiComponent,
    data: {
      title: "mutasifarmasi",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class mutasifarmasiRoutingModule {}
