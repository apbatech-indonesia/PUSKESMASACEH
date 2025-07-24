import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BukuKontrasepsiComponent } from "./BukuKontrasepsi.component";

const routes: Routes = [
  {
    path: "",
    component: BukuKontrasepsiComponent,
    data: {
      title: "Kebidanan BukuKontrasepsi",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BukuKontrasepsiRoutingModule {}
