import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { kasirrjComponent } from "./kasirrj.component";

const routes: Routes = [
  {
    path: "",
    component: kasirrjComponent,
    data: {
      title: "kasirrj",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class kasirrjRoutingModule {}
