import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { mtamplatebhpComponent } from "./mtamplatebhp.component";

const routes: Routes = [
  {
    path: "",
    component: mtamplatebhpComponent,
    data: {
      title: "mtamplatebhp",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class mtamplatebhpRoutingModule {}
