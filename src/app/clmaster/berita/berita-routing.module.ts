import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { beritaComponent } from "./berita.component";

const routes: Routes = [
  {
    path: "",
    component: beritaComponent,
    data: {
      title: "berita",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class beritaRoutingModule {}
