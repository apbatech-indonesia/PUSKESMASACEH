import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { KeperawatanComponent } from "./Keperawatan.component";

const routes: Routes = [
  {
    path: "",
    component: KeperawatanComponent,
    data: {
      title: "Keperawatan",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeperawatanRoutingModule {}
