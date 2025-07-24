import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { tulisermComponent } from "./tuliserm.component";

const routes: Routes = [
  {
    path: "",
    component: tulisermComponent,
    data: {
      title: "tuliserm",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class tulisermRoutingModule {}
