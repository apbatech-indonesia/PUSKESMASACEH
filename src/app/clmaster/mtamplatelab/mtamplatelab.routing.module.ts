import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MtamplatelabComponent } from "./mtamplatelab.component";

const routes: Routes = [
  {
    path: "",
    component: MtamplatelabComponent,
    data: {
      title: "mlab",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtamplatelabRoutingModule {}
