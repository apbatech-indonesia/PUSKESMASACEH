import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { McabangComponent } from "./mcabang.component";

const routes: Routes = [
  {
    path: "",
    component: McabangComponent,
    data: {
      title: "Mcabang",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McabangRoutingModule {}
