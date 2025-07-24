import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ermdokterpasienriComponent } from "./ermdokterpasienri.component";

const routes: Routes = [
  {
    path: "",
    component: ermdokterpasienriComponent,
    data: {
      title: "ermdokterpasienri",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ermdokterpasienriRoutingModule {}
