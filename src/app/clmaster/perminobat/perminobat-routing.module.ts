import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { perminobatComponent } from "./perminobat.component";

const routes: Routes = [
  {
    path: "",
    component: perminobatComponent,
    data: {
      title: "perminobat",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class perminobatRoutingModule {}
