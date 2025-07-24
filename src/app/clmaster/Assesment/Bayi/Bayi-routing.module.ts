import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BayiComponent } from "./Bayi.component";

const routes: Routes = [
  {
    path: "",
    component: BayiComponent,
    data: {
      title: "Bayi",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BayiRoutingModule {}
