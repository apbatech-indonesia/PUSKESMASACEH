import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { mdokterprofilComponent } from "./mdokterprofil.component";

const routes: Routes = [
  {
    path: "",
    component: mdokterprofilComponent,
    data: {
      title: "mdokterprofil",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class mdokterprofilRoutingModule {}
