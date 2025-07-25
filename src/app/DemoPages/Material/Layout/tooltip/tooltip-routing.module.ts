import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TooltipComponent } from "./tooltip.component";

const routes: Routes = [
  {
    path: "",
    component: TooltipComponent,
    data: {
      title: "Tooltip",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TooltipRoutingModule {}
