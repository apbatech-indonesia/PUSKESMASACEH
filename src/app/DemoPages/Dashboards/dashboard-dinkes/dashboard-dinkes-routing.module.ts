import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardDinkesComponent } from "./dashboard-dinkes.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardDinkesComponent,
    data: {
      title: "DashboardDinkes",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDinkesRoutingModule {}
