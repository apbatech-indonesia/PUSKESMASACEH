import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PartografCetakComponent } from "./PartografCetak.component";

const routes: Routes = [
  {
    path: "",
    component: PartografCetakComponent,
    data: {
      title: "Partograf Cetak",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartografCetakRoutingModule {}
