import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RadioComponent } from "./radio.component";

const routes: Routes = [
  {
    path: "",
    component: RadioComponent,
    data: {
      title: "Radio",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadioRoutingModule {}
