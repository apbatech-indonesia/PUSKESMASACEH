import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MgudangComponent } from "./mgudang.component";

const routes: Routes = [
  {
    path: "",
    component: MgudangComponent,
    data: {
      title: "Mgudang",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MgudangRoutingModule {}
