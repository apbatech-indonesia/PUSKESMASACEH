import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MdiagnosaComponent } from "./mdiagnosa.component";

const routes: Routes = [
  {
    path: "",
    component: MdiagnosaComponent,
    data: {
      title: "Mdiagnosa",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdiagnosaRoutingModule {}
