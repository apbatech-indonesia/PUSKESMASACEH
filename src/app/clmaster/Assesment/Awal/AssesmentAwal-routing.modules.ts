import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AssesmentAwalComponent } from "./AssesmentAwal.component";

const routes: Routes = [
  {
    path: "",
    component: AssesmentAwalComponent,
    data: {
      title: "Assesment Awal",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssesmentAwalRoutingModule {}
