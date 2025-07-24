import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { mcuComponent } from "./mcu.component";

const routes: Routes = [
  {
    path: "",
    component: mcuComponent,
    data: {
      title: "berita",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class mcuRoutingModule {}
