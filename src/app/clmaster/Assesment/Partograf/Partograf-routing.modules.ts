import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PartografComponent } from "./Partograf.component";

const routes: Routes = [
  {
    path: "",
    component: PartografComponent,
    data: {
      title: "Partograf",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartografRoutingModule {}
