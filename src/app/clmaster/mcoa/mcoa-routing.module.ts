import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { McoaComponent } from "./mcoa.component";

const routes: Routes = [
  {
    path: "",
    component: McoaComponent,
    data: {
      title: "mcoa",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McoaRoutingModule {}
