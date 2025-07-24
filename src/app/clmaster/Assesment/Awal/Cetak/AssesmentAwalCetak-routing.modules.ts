import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AssesmentAwalCetakComponent } from "./AssesmentAwalCetak.component";

const routes: Routes = [
  {
    path: "",
    component: AssesmentAwalCetakComponent,
    data: {
      title: "Cetak Asesmen Awal",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssesmentAwalCetakRoutingModule {}
