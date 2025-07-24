import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { kelompokComponent } from "./kelompok.component";

const routes: Routes = [
  {
    path: "",
    component: kelompokComponent,
    data: {
      title: "berita",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class kelompokRoutingModule {}
