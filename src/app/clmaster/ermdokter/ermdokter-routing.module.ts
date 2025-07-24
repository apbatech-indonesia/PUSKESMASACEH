import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ermdokterComponent } from "./ermdokter.component";

const routes: Routes = [
  {
    path: "",
    component: ermdokterComponent,
    data: {
      title: "ermdokter",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ermdokterRoutingModule {}
