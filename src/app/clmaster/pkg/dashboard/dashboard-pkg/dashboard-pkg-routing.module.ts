import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardPkgComponent } from "./dashboard-pkg.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardPkgComponent,
    data: {
      title: "Dashboard PKG",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPkgRoutingModule {}
