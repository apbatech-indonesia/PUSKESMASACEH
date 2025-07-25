import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IconsComponent } from "./icons.component";

const routes: Routes = [
  {
    path: "",
    component: IconsComponent,
    data: {
      title: "Icons",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconsRoutingModule {}
