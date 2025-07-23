import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { pkgComponent } from "./pkg.component";

const routes: Routes = [
  {
    path: "",
    component: pkgComponent,
    data: {
      title: "pkg",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class pkgRoutingModule {}
