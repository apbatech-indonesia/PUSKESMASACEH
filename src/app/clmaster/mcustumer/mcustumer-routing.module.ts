import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { McustumerComponent } from "./mcustumer.component";

const routes: Routes = [
  {
    path: "",
    component: McustumerComponent,
    data: {
      title: "mcustomer",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McustumerRoutingModule {}
